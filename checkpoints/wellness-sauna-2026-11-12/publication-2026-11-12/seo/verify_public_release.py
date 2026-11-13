"""Fetch and verify published Wellness/Sauna content. Read-only public HTTP only."""
from __future__ import annotations
import argparse
import concurrent.futures
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import re
import urllib.request
import urllib.robotparser
from urllib.parse import urlsplit, urldefrag
import xml.etree.ElementTree as ET
from public_html import inspect, parse, Node


BASE = Path(__file__).resolve().parents[2]
EVIDENCE = Path(__file__).resolve().parent
SITE = "https://www.matrixmassage.net"
BOOKING = "https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services"
UAS = {
    "browser": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "googlebot": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    "oai-searchbot": "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)",
}
TARGETS = {
    "wellness": {"id": "hfzq0", "url": SITE + "/wellness-biotech-services-salem-wi", "body": "main/review-2/body.html", "root": "matrix-wellness", "faqs": 7},
    "sauna": {"id": "nf4iw", "url": SITE + "/infrared-sauna-salem-wi", "body": "infrared-sauna/review-2/body.html", "root": "matrix-sauna", "faqs": 8},
}


def sha(value):
    if isinstance(value, str):
        value = value.encode()
    return hashlib.sha256(value).hexdigest()


def stable(value):
    return json.dumps(value, sort_keys=True, separators=(",", ":"), ensure_ascii=False)


def fetch(url, user_agent=UAS["browser"]):
    started = datetime.now(timezone.utc).isoformat()
    request = urllib.request.Request(url, headers={"User-Agent": user_agent})
    try:
        with urllib.request.urlopen(request, timeout=35) as response:
            body = response.read()
            return {"url": url, "finalUrl": response.url, "status": response.status,
                    "startedAt": started, "capturedAt": datetime.now(timezone.utc).isoformat(),
                    "bytes": len(body), "sha256": sha(body), "headers": dict(response.headers), "body": body}
    except Exception as error:
        return {"url": url, "startedAt": started, "capturedAt": datetime.now(timezone.utc).isoformat(), "error": str(error)}


def site_revisions(facts):
    paths = {"wix-viewer-model.site.siteRevision", "wix-viewer-model.commonConfig.siteRevision",
             "wix-essential-viewer-model.commonConfig.siteRevision", "wix-fedops.data.site.siteRevision"}
    return [{"path": hit["path"], "revision": str(hit["value"])} for hit in facts["revisionHits"] if hit["path"] in paths]


def meta_map(facts):
    result = {}
    for meta in facts["headMeta"]:
        name = meta.get("name") or meta.get("property")
        if name:
            result.setdefault(name, []).append(meta.get("content", ""))
    return result


def schema_docs(root):
    out, errors = [], []
    for node in root.nodes("script"):
        if node.attrs.get("type") == "application/ld+json":
            try:
                out.append(json.loads(node.raw_text()))
            except ValueError as error:
                errors.append(str(error))
    return out, errors


def schema_nodes(docs):
    for doc in docs:
        if isinstance(doc, list):
            yield from schema_nodes(doc)
        elif isinstance(doc, dict):
            if "@graph" in doc:
                yield from schema_nodes(doc["@graph"])
            if "@type" in doc:
                yield doc


def faq_from_body(body_root):
    questions = []
    for detail in body_root.nodes("details"):
        summaries = list(detail.nodes("summary"))
        if len(summaries) != 1:
            raise ValueError("FAQ summary count mismatch")
        summary = summaries[0]
        answer = " ".join(" ".join(child.text() if isinstance(child, Node) else child
                                  for child in detail.children if child is not summary).split())
        questions.append({"@type": "Question", "name": summary.text(),
                          "acceptedAnswer": {"@type": "Answer", "text": answer}})
    return questions


def homepage_guard(html):
    root, facts = inspect(html)
    markups = [{"path": row["path"], "sha256": row["sha256"], "bytes": row["bytes"]}
               for row in facts["seoMarkup"] if "matrix-home" in row["value"]]
    inline = []
    for node in root.nodes():
        if node.tag == "script" and node.attrs.get("type") != "application/json" and "__matrixHomeStartup_" in node.raw_text():
            part = re.search(r"state\.parts\[(\d+)\]", node.raw_text())
            inline.append({"kind": "script", "key": "startup-part-" + (part.group(1) if part else "other"), "sha256": sha(node.raw_text())})
        elif node.tag == "style" and node.attrs.get("id") in {"matrix-home-footer-access", "matrix-home-critical-styles"}:
            inline.append({"kind": "style", "key": node.attrs["id"], "sha256": sha(node.raw_text())})
    docs, errors = schema_docs(root)
    canonical = [x.get("href") for x in facts["headLinks"] if x.get("rel") == "canonical"]
    return {"seoMarkup": markups, "inlineBlocks": sorted(inline, key=lambda x: x["key"]),
            "title": facts["title"], "meta": meta_map(facts), "canonical": canonical,
            "schemaJson": sorted(stable(x) for x in docs), "schemaParseErrors": errors}


def assess_page(target, response, native, expected_revision, ua):
    html = response["body"].decode()
    root, facts = inspect(html)
    body = (BASE / target["body"]).read_text()
    expected_root = parse(body)
    expected_faq = faq_from_body(expected_root)
    expected_schema = [json.loads(tag["children"]) for tag in native["tags"] if tag["type"] == "script"]
    observed_schema, schema_errors = schema_docs(root)
    observed_nodes = list(schema_nodes(observed_schema))
    observed_faq = [node for node in observed_nodes if node.get("@type") == "FAQPage"]
    metas = meta_map(facts)
    head_checks, head_differences = {}, []
    for entry in native["resolvedTags"]:
        tag = entry["tag"]
        if tag["type"] == "title":
            ok = facts["title"] == tag["children"]
            head_checks["title"] = ok
            if not ok:
                head_differences.append({"key": "title", "expected": tag["children"], "actual": facts["title"]})
        elif tag["type"] == "meta":
            name = tag["props"].get("name") or tag["props"].get("property")
            expected = tag["props"].get("content", "")
            ok = metas.get(name) == [expected]
            head_checks[name] = ok
            if not ok:
                head_differences.append({"key": name, "expected": expected, "actual": metas.get(name)})
        elif tag["type"] == "link" and tag["props"].get("rel") == "canonical":
            actual = [x.get("href") for x in facts["headLinks"] if x.get("rel") == "canonical"]
            ok = actual == [tag["props"]["href"]]
            head_checks["canonical"] = ok
            if not ok:
                head_differences.append({"key": "canonical", "expected": tag["props"]["href"], "actual": actual})
    root_nodes = [n for n in root.nodes() if target["root"] in n.attrs.get("class", "").split()]
    exact_markups = [x for x in facts["seoMarkup"] if x["value"] == body]
    semantic_match = len(root_nodes) == 1 and root_nodes[0].text() == expected_root.text()
    expected_links = sorted(set(n.attrs["href"] for n in expected_root.nodes("a")))
    published_content_root = root_nodes[0] if len(root_nodes) == 1 else parse(exact_markups[0]["value"]) if exact_markups else None
    published_links = sorted(set(n.attrs["href"] for n in published_content_root.nodes("a")
                                 if isinstance(n.attrs.get("href"), str))) if published_content_root else []
    null_href_contacts = [{"text": n.text(), "attributes": n.attrs} for n in published_content_root.nodes("a")
                          if n.attrs.get("href") is None] if published_content_root else []
    # Wix's crawler serializer removes sms: actions while retaining phone text.
    # Check crawlable web/fragment destinations separately from device actions.
    web_link = lambda href: href.startswith(("https://", "http://", "/", "#"))
    expected_web_links = [href for href in expected_links if web_link(href)]
    published_web_links = [href for href in published_links if web_link(href)]
    revision_evidence = site_revisions(facts)
    revision_values = sorted(set(row["revision"] for row in revision_evidence))
    robots = " ".join(metas.get("robots", [])).lower()
    xrobots = " ".join(v for k, v in response.get("headers", {}).items() if k.lower() == "x-robots-tag").lower()
    checks = {
        "http200": response["status"] == 200,
        "permanentUrlUnchanged": response["finalUrl"] == target["url"],
        "expectedSiteRevision": revision_values == [str(expected_revision)],
        "allProtectedHeadMatches": all(head_checks.values()),
        "noNoindex": not any(word in robots + " " + xrobots for word in ["noindex", "none"]),
        "structuredDataParses": not schema_errors,
        "allExpectedSchemaExact": all(any(obj == observed for observed in observed_schema) for obj in expected_schema),
        "oneFAQPage": len(observed_faq) == 1,
        "faqExactVisibleSourceMatch": len(observed_faq) == 1 and observed_faq[0]["mainEntity"] == expected_faq,
        "expectedFAQCount": len(observed_faq) == 1 and len(observed_faq[0]["mainEntity"]) == target["faqs"],
        "fullBodySeoMarkupExact": bool(exact_markups),
        "publishedWebLinksMatchReviewedBody": published_web_links == expected_web_links,
        "correctSquareBookingLinkPresent": BOOKING in published_links,
        "noMassageBookLink": not any("massagebook" in link.lower() for link in published_links),
    }
    if ua != "browser":
        checks["semanticBodyDeliveredToCrawlerUA"] = semantic_match
        checks["oneSemanticBodyH1"] = len(root_nodes) == 1 and len(list(root_nodes[0].nodes("h1"))) == 1
        checks["semanticFAQCount"] = len(root_nodes) == 1 and len(list(root_nodes[0].nodes("details"))) == target["faqs"]
    return {
        "target": target["id"], "userAgentProfile": ua, "url": target["url"],
        "checks": checks, "allPassed": all(checks.values()),
        "failures": [key for key, value in checks.items() if not value],
        "protectedHeadChecks": head_checks, "protectedHeadDifferences": head_differences,
        "revisionEvidence": revision_evidence, "schemaTypes": [n.get("@type") for n in observed_nodes],
        "expectedSchemaCount": len(expected_schema), "observedSchemaCount": len(observed_schema),
        "observedFaqCount": len(observed_faq[0]["mainEntity"]) if len(observed_faq) == 1 else None,
        "seoMarkup": [{k: v for k, v in row.items() if k != "value"} for row in facts["seoMarkup"]],
        "expectedBodySha256": sha(body), "semanticBodyPresent": len(root_nodes) == 1,
        "semanticBodyTextMatches": semantic_match,
        "publishedLinks": published_links,
        "crawlerContactActionsWithoutHref": null_href_contacts,
        "runtimePinPresentInRawResponse": "eaac30097ff251d67dbb1507a9449feb5618e409" in html,
    }


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--out", type=Path, required=True)
    ap.add_argument("--expected-revision", required=True)
    ap.add_argument("--agents", nargs="+", choices=list(UAS), default=list(UAS))
    ap.add_argument("--links", action="store_true")
    args = ap.parse_args()
    out = args.out.resolve()
    if out.exists():
        raise SystemExit("Use a new output directory; historical evidence must not be overwritten.")
    out.mkdir(parents=True)
    native_read = json.loads((BASE / "seo/review-4-native-bound/WIX_DRAFT_READBACK_RESULT.json").read_text())
    natives = {row["itemId"]: row["item"] for row in native_read["results"]}
    jobs = [(key, ua, target["url"]) for key, target in TARGETS.items() for ua in args.agents]
    jobs += [("home", "browser", SITE + "/"), ("robots", "browser", SITE + "/robots.txt"),
             ("sitemap", "browser", SITE + "/pages-sitemap.xml")]
    def run(job):
        key, ua, url = job
        response = fetch(url, UAS[ua])
        if "body" in response:
            (out / f"{key}-{ua}.html").write_bytes(response["body"])
        return key, ua, response
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        responses = list(pool.map(run, jobs))
    (out / "HTTP_RESPONSES.json").write_text(json.dumps([
        {"key": key, "agent": ua, **{k: v for k, v in response.items() if k != "body"}}
        for key, ua, response in responses
    ], indent=2) + "\n")
    page_results, transport = [], []
    for key, ua, response in responses:
        transport.append({"key": key, "agent": ua, **{k: v for k, v in response.items() if k != "body"}})
        if key in TARGETS:
            if "body" in response:
                page_results.append(assess_page(TARGETS[key], response, natives[TARGETS[key]["id"]], args.expected_revision, ua))
            else:
                page_results.append({"target": TARGETS[key]["id"], "userAgentProfile": ua, "allPassed": False, "failures": [response["error"]]})
    lookup = {(key, ua): response for key, ua, response in responses}
    home_before = homepage_guard((EVIDENCE / "preflight-home.html").read_text())
    home_after = homepage_guard(lookup[("home", "browser")]["body"].decode())
    protected_meta_names = {"description", "og:title", "og:description", "og:image", "twitter:title", "twitter:description", "twitter:image", "robots"}
    home_checks = {
        "homeSeoMarkupUnchanged": home_before["seoMarkup"] == home_after["seoMarkup"],
        "homeStartupAndStyleBlocksUnchanged": home_before["inlineBlocks"] == home_after["inlineBlocks"] and len(home_after["inlineBlocks"]) == 4,
        "homeTitleCanonicalUnchanged": home_before["title"] == home_after["title"] and home_before["canonical"] == home_after["canonical"],
        "homeProtectedMetadataUnchanged": all(home_before["meta"].get(k) == home_after["meta"].get(k) for k in protected_meta_names),
        "homeSchemaUnchanged": home_before["schemaJson"] == home_after["schemaJson"] and not home_after["schemaParseErrors"],
    }
    robots_body = lookup[("robots", "browser")]["body"].decode()
    rp = urllib.robotparser.RobotFileParser()
    rp.parse(robots_body.splitlines())
    crawl = [{"page": key, "agent": agent, "allowed": rp.can_fetch(agent, target["url"])}
             for key, target in TARGETS.items() for agent in ["Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User"]]
    sitemap_xml = lookup[("sitemap", "browser")]["body"].decode()
    sitemap_root = ET.fromstring(sitemap_xml)
    locs = [el.text for el in sitemap_root.iter() if el.tag.endswith("}loc") or el.tag == "loc"]
    sitemap_checks = {key: target["url"] in locs for key, target in TARGETS.items()}
    destinations = []
    if args.links:
        urls = {BOOKING}
        for target in TARGETS.values():
            body_root = parse((BASE / target["body"]).read_text())
            urls.update(urldefrag(node.attrs["href"])[0] for node in body_root.nodes("a") if node.attrs["href"].startswith(SITE))
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
            for response in pool.map(fetch, sorted(urls)):
                destinations.append({k: v for k, v in response.items() if k not in {"body", "headers"}})
    renderer_evidence = []
    installation = json.loads((BASE / "qa/native/installation-evidence.json").read_text())
    for target in installation["pages"]:
        response = fetch(target["sourceUrl"])
        expected_renderer = BASE / ("main/review-2/renderer.js" if target["pageId"] == "hfzq0" else "infrared-sauna/review-2/renderer.js")
        renderer_evidence.append({"pageId": target["pageId"], "url": target["sourceUrl"], "status": response.get("status"),
                                  "sha256": response.get("sha256"), "matchesReviewedRenderer": response.get("body") == expected_renderer.read_bytes()})
    passed = all(row["allPassed"] for row in page_results) and all(home_checks.values()) and all(row["allowed"] for row in crawl) and all(sitemap_checks.values()) and all(row["matchesReviewedRenderer"] for row in renderer_evidence) and all(row.get("status") == 200 for row in destinations)
    result = {"status": "PUBLIC SEO AND CRAWLER DELIVERY VERIFIED" if passed else "PUBLIC VERIFICATION HAS REMAINING DIFFERENCES",
              "capturedAt": datetime.now(timezone.utc).isoformat(), "expectedSiteRevision": str(args.expected_revision),
              "pages": page_results, "homeGuard": {"checks": home_checks, "before": home_before, "after": home_after},
              "robots": crawl, "sitemap": sitemap_checks, "destinationChecks": destinations, "rendererChecks": renderer_evidence,
              "transport": transport,
              "limitations": ["User-agent checks simulate crawler requests; they do not prove actual crawler visits, indexing, rankings or AI inclusion.",
                              "Public HTTP verifies returned metadata/content. Root's browser QA verifies rendered layout, interactions and the consumed runtime pin.",
                              "Wix's crawler HTML strips sms: action hrefs while retaining contact text; crawlable web links are compared separately, and the exact seoMarkup retains the original phone actions.",
                              "HOME checks compare delivered public body, inline startup/style blocks and metadata; they do not inspect dashboard entry enablement."]}
    (out / "PUBLIC_VERIFICATION.json").write_text(json.dumps(result, indent=2) + "\n")
    print(json.dumps({"status": result["status"], "capturedAt": result["capturedAt"],
                      "pages": [{"target": x["target"], "agent": x["userAgentProfile"], "passed": x["allPassed"], "failures": x["failures"], "schemaTypes": x.get("schemaTypes"), "faqCount": x.get("observedFaqCount")} for x in page_results],
                      "homeGuard": home_checks, "robotsAllAllowed": all(x["allowed"] for x in crawl), "sitemap": sitemap_checks,
                      "destinations": len(destinations), "destinationFailures": [x for x in destinations if x.get("status") != 200],
                      "renderers": renderer_evidence}, indent=2))


if __name__ == "__main__":
    main()
