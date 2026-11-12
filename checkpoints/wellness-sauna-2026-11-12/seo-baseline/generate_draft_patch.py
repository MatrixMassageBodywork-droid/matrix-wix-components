"""Prepare guarded Wellness/Sauna SEO draft candidates. No network or Wix writes."""
from __future__ import annotations

import argparse
import copy
import hashlib
import importlib.util
import json
from pathlib import Path
import re


ROOT = "https://www.matrixmassage.net/"
WELLNESS = ROOT + "wellness-biotech-services-salem-wi"
SAUNA = ROOT + "infrared-sauna-salem-wi"
MASSAGE = ROOT + "massage-therapy-services-salem-wi"
RED_LIGHT = ROOT + "red-light-therapy-salem-wi"
SUPPLEMENTS = ROOT + "supplements"
LOGO = "https://static.wixstatic.com/media/e4cc43_c35a32fb07bc4445bb822ed185350e25~mv2.jpg"
DIRECTIONS = "https://www.google.com/maps/dir/?api=1&destination=24804+75th+St%2C+Salem%2C+WI+53168"
BOOKING = "https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services"


def require(condition, message):
    if not condition:
        raise ValueError(message)


def sha(data):
    return hashlib.sha256(data.encode("utf-8")).hexdigest()


def jld_tag(obj, schema_id, name):
    return {
        "type": "script",
        "props": {"type": "application/ld+json"},
        "meta": {"schemaType": schema_id, "displayName": name},
        "children": json.dumps(obj, ensure_ascii=False, separators=(",", ":")),
        "custom": False,
        "disabled": False,
    }


def schema_type(tag):
    if tag.get("type") != "script" or tag.get("props", {}).get("type") != "application/ld+json":
        return None
    return json.loads(tag["children"]).get("@type")


def replace_schema(tags, replacements, schema_id, kind, new_object, reason):
    matches = [i for i, tag in enumerate(tags) if schema_type(tag) == kind
               and (not schema_id or tag.get("meta", {}).get("schemaType") == schema_id)]
    require(len(matches) == 1, f"Expected one {kind} schema with native ID {schema_id}")
    index = matches[0]
    before = copy.deepcopy(tags[index])
    after = copy.deepcopy(before)
    after["children"] = json.dumps(new_object, ensure_ascii=False, separators=(",", ":"))
    tags[index] = after
    replacements.append({"index": index, "before": before, "after": after, "reason": reason})


def load_body(base, path, page_url):
    directory = (base / path).resolve()
    body = (directory / "body.html").read_text()
    faq = json.loads((directory / "faq-schema.json").read_text())
    manifest = json.loads((directory / "build-manifest.json").read_text())
    spec = importlib.util.spec_from_file_location("matrix_builder", base / "tools/build_page.py")
    builder = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(builder)
    parser = builder.PageParser()
    parser.feed(body)
    parser.close()
    require(len(parser.stack) == 1, f"Unbalanced HTML in {directory}")
    nodes = list(parser.root.nodes())
    headings = [node.text() for node in nodes if node.tag == "h1"]
    require(len(headings) == 1, "Exactly one H1 required")
    questions = []
    for detail in parser.root.nodes("details"):
        summaries = list(detail.nodes("summary"))
        require(len(summaries) == 1 and summaries[0] in detail.children, "Invalid FAQ summary")
        summary = summaries[0]
        answer = " ".join(" ".join(child.text() if isinstance(child, builder.Node) else child
                                  for child in detail.children if child is not summary).split())
        questions.append({"@type": "Question", "name": summary.text(),
                          "acceptedAnswer": {"@type": "Answer", "text": answer}})
    require(questions and questions == faq.get("mainEntity"), "FAQ schema differs from visible HTML")
    require(faq.get("@type") == "FAQPage", "Expected FAQPage file")
    require(manifest["seo"]["canonical"] == page_url, "Build manifest canonical mismatch")
    require(manifest["files"]["body.html"] == sha(body), "Body changed after build")
    return {
        "body": body,
        "bodySha256": sha(body),
        "faq": faq,
        "h1": headings[0],
        "links": {node.attrs["href"] for node in nodes if node.tag == "a"},
        "images": {node.attrs["src"] for node in nodes if node.tag == "img"},
        "text": parser.root.text(),
        "manifest": manifest,
        "directory": str(directory),
    }


def make_page(base, kind, body_path):
    page_url = WELLNESS if kind == "wellness" else SAUNA
    baseline = json.loads((base / f"seo-baseline/{kind}.json").read_text())["baseline"]
    expected_id = "hfzq0" if kind == "wellness" else "nf4iw"
    require(baseline["itemId"] == expected_id, "Native identity mismatch")
    current = copy.deepcopy(baseline["tags"])
    tags = copy.deepcopy(current)
    require(not any(schema_type(tag) == "FAQPage" for tag in tags), "Baseline unexpectedly contains FAQPage")
    content = load_body(base, body_path, page_url)
    required_links = [ROOT, WELLNESS, SAUNA, BOOKING, DIRECTIONS]
    if kind == "wellness":
        required_links += [RED_LIGHT, MASSAGE, SUPPLEMENTS]
    # A current breadcrumb item can be unlinked; each sibling relationship is still explicit.
    required_links = [url for url in required_links if url != page_url]
    for url in required_links:
        require(url in content["links"], f"Required visible link missing: {url}")
    title = next(tag["children"] for tag in current if tag["type"] == "title")
    description = next(tag["props"]["content"] for tag in current
                       if tag["type"] == "meta" and tag.get("props", {}).get("name") == "description")
    require(content["manifest"]["seo"]["title"] == title, "Build title does not match preservation baseline")
    require(content["manifest"]["seo"]["description"] == description, "Build description does not match preservation baseline")
    replacements, additions = [], []
    business_ref = {"@id": ROOT + "#business"}
    breadcrumbs = [{"@type": "ListItem", "position": 1, "name": "Home", "item": ROOT},
                   {"@type": "ListItem", "position": 2, "name": "Wellness & Biotech", "item": WELLNESS}]
    if kind == "infrared-sauna":
        breadcrumbs.append({"@type": "ListItem", "position": 3, "name": "Infrared Sauna", "item": SAUNA})
    breadcrumb = {"@context": "https://schema.org", "@type": "BreadcrumbList",
                  "@id": page_url + "#breadcrumb", "itemListElement": breadcrumbs}

    if kind == "wellness":
        require("Matrix Wellness & Biotech" in content["text"] and "Matrix Massage & Bodywork" in content["text"],
                "Both visible brand names required for alternateName")
        require(LOGO in content["images"], "Business logo must be present in visible page")
        business = {
            "@context": "https://schema.org", "@type": "HealthAndBeautyBusiness", "@id": ROOT + "#business",
            "name": "Matrix Massage & Bodywork", "alternateName": "Matrix Wellness & Biotech", "url": ROOT,
            "image": LOGO, "logo": LOGO, "telephone": "+12629399325",
            "address": {"@type": "PostalAddress", "streetAddress": "24804 75th St", "addressLocality": "Salem",
                        "addressRegion": "WI", "postalCode": "53168", "addressCountry": "US"},
            "areaServed": ["Salem, Wisconsin", "Salem Lakes, Wisconsin", "Paddock Lake, Wisconsin",
                           "Bristol, Wisconsin", "Pleasant Prairie, Wisconsin", "Twin Lakes, Wisconsin",
                           "Kenosha County, Wisconsin", "Union Grove, Wisconsin", "Trevor, Wisconsin",
                           "Genoa City, Wisconsin", "Antioch, Illinois"],
            "hasMap": DIRECTIONS,
            "sameAs": ["https://www.facebook.com/411300892070855", "https://www.instagram.com/matrixmassagewi/"],
            "description": "Matrix Wellness & Biotech at Matrix Massage & Bodywork offers infrared sauna, red light therapy, recovery enhancements, and supplement resources in Salem, Wisconsin.",
        }
        services = [
            ("Red Light Therapy", RED_LIGHT, "Explore red light therapy appointments and service information at Matrix in Salem, Wisconsin."),
            ("Infrared Sauna", SAUNA, "Private infrared sauna appointments for comfortable warmth and quiet time, available as an add-on to an eligible visit."),
            ("Recovery Enhancements", MASSAGE, "Explore massage and eligible comfort-focused enhancements at Matrix Massage & Bodywork."),
            ("Supplements & Wellness", SUPPLEMENTS, "Explore Matrix's existing supplements and wellness resources through its supplements page."),
        ]
        catalog = {"@context": "https://schema.org", "@type": "OfferCatalog", "@id": WELLNESS + "#services",
                   "name": "Wellness & Biotech Services", "url": WELLNESS,
                   "itemListElement": [{"@type": "Offer", "itemOffered": {"@type": "Service", "name": name,
                                        "url": url, "description": desc, "provider": business_ref}}
                                       for name, url, desc in services]}
        replace_schema(tags, replacements, "clav5h85", "HealthAndBeautyBusiness", business,
                       "Use the shared business identity, correct the image URL, and describe verified visible offerings.")
        replace_schema(tags, replacements, "4rWCmYq6", "OfferCatalog", catalog,
                       "Align catalog with four visible offerings and verified canonical service links; remove unlaunched labs/memberships.")
        replace_schema(tags, replacements, None, "BreadcrumbList", breadcrumb,
                       "Match the visible Home to Wellness breadcrumb and add its stable page identifier.")
        webpage = {"@context": "https://schema.org", "@type": "CollectionPage", "@id": WELLNESS + "#webpage",
                   "url": WELLNESS, "name": title, "description": description, "inLanguage": "en-US",
                   "about": business_ref, "mainEntity": {"@id": WELLNESS + "#services"},
                   "breadcrumb": {"@id": WELLNESS + "#breadcrumb"}}
        additions.append(jld_tag(webpage, "matrixWellnessPage20261112", "Wellness Collection Page"))
        faq_id, faq_name = "matrixWellnessFaq20261112", "Wellness FAQs"
    else:
        service_tag = next(tag for tag in tags if tag.get("meta", {}).get("schemaType") == "6e4jQmZM")
        service = json.loads(service_tag["children"])
        service["@id"] = SAUNA + "#service"
        service["provider"]["@id"] = ROOT + "#business"
        service["provider"]["hasMap"] = DIRECTIONS
        service["mainEntityOfPage"] = {"@id": SAUNA + "#webpage"}
        price_visible = bool(re.search(r"\$35(?:\.00)?\b", content["text"]))
        duration_visible = bool(re.search(r"30(?:-|\s)+(?:minute|minutes|min)\b", content["text"], re.I))
        add_on_visible = bool(re.search(r"add[ -]on", content["text"], re.I))
        if price_visible and duration_visible and add_on_visible:
            menu = json.loads((base / "public-audit/square-service-summaries.json").read_text())
            matched = [item for item in menu if item.get("id") == "XZHCM4X3WESRK7MU5HT2VDQD"]
            require(len(matched) == 1 and matched[0]["price_cents"] == 3500
                    and matched[0]["duration_minutes"] == 30, "Current Square evidence does not support Sauna Offer")
            service["offers"] = {"@type": "Offer", "name": "Infrared Sauna (Add-On) — 30-minute appointment",
                                 "price": "35.00", "priceCurrency": "USD", "url": BOOKING,
                                 "description": "A 30-minute appointment added to an eligible visit. Heat and actual sauna use time are adapted to comfort and equipment instructions."}
        replace_schema(tags, replacements, "6e4jQmZM", "Service", service,
                       "Keep the existing Service schema and provider; add stable identity, map link, and a visible/current add-on Offer when supported.")
        replace_schema(tags, replacements, "U6QYwSDN", "BreadcrumbList", breadcrumb,
                       "Match the visible Home to Wellness to Infrared Sauna trail.")
        webpage = {"@context": "https://schema.org", "@type": "WebPage", "@id": SAUNA + "#webpage",
                   "url": SAUNA, "name": title, "description": description, "inLanguage": "en-US",
                   "about": business_ref, "mainEntity": {"@id": SAUNA + "#service"},
                   "breadcrumb": {"@id": SAUNA + "#breadcrumb"}}
        additions.append(jld_tag(webpage, "matrixSaunaPage20261112", "Infrared Sauna Web Page"))
        faq_id, faq_name = "matrixSaunaFaq20261112", "Infrared Sauna FAQs"
    faq = copy.deepcopy(content["faq"])
    faq["@id"] = page_url + "#faq"
    additions.append(jld_tag(faq, faq_id, faq_name))
    tags.extend(additions)
    require([tag for tag in tags if tag["type"] != "script"] == [tag for tag in current if tag["type"] != "script"],
            "A protected metadata tag changed")
    require(sum(schema_type(tag) == "FAQPage" for tag in tags) == 1, "Expected exactly one FAQPage")
    return {
        "itemId": expected_id, "pageUrl": page_url, "sourceDirectory": content["directory"],
        "bodySha256": content["bodySha256"], "faqCount": len(faq["mainEntity"]), "h1": content["h1"],
        "expectedBaselineTags": current,
        "expectedProtectedHead": [entry["tag"] for entry in baseline["resolvedTags"] if entry["tag"]["type"] != "script"],
        "replacements": replacements, "appendTags": additions, "candidateTags": tags,
    }


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--base", type=Path, default=Path(__file__).resolve().parents[1])
    ap.add_argument("--wellness", default="main/review-1")
    ap.add_argument("--sauna", default="infrared-sauna/review-1")
    ap.add_argument("--out", type=Path, required=True)
    ap.add_argument("--installation-evidence", type=Path)
    args = ap.parse_args()
    base, out = args.base.resolve(), args.out.resolve()
    require(not out.exists(), "Use a new output directory to preserve prior candidate evidence")
    pages = [make_page(base, "wellness", args.wellness), make_page(base, "infrared-sauna", args.sauna)]
    plan = {"status": "PREPARED; NOT EXECUTED", "publish": False, "pages": pages}
    evidence = (json.loads(args.installation_evidence.read_text()) if args.installation_evidence
                else {"status": "NOT_VERIFIED", "pages": []})
    code = (base / "seo-baseline/execute-draft-template.js").read_text()
    code = code.replace("__PLAN__", json.dumps(plan, ensure_ascii=False, indent=2))
    code = code.replace("__INSTALLATION_EVIDENCE__", json.dumps(evidence, ensure_ascii=False, indent=2))
    out.mkdir(parents=True)
    (out / "native-seo-draft-plan.json").write_text(json.dumps(plan, ensure_ascii=False, indent=2) + "\n")
    (out / "EXECUTE_DRAFT_SEO_CANDIDATE.js").write_text(code)
    for page in pages:
        stem = "wellness" if page["itemId"] == "hfzq0" else "infrared-sauna"
        (out / f"{stem}-candidate-tags.json").write_text(json.dumps(page["candidateTags"], ensure_ascii=False, indent=2) + "\n")
    report = {"status": "PREPARED / STATIC VALIDATED; NOT EXECUTED OR SAVED TO WIX", "publish": False,
              "executionEvidenceStatus": evidence["status"], "codeSha256": sha(code), "codeBytes": len(code.encode()),
              "pages": [{"itemId": page["itemId"], "pageUrl": page["pageUrl"], "bodySha256": page["bodySha256"],
                         "faqCount": page["faqCount"], "protectedMetadataUnchanged": True,
                         "existingSchemaIdentitiesPreserved": True,
                         "schemaTypes": [schema_type(tag) for tag in page["candidateTags"] if schema_type(tag)]}
                        for page in pages]}
    (out / "preparation-qa.json").write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
