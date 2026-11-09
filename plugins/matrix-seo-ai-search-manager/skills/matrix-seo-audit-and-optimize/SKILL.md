---
name: matrix-seo-audit-and-optimize
description: Audit and improve Matrix Massage & Bodywork Wix pages for Google and AI search, review page performance using available free Wix, Search Console and GA4 reports, prepare exact owner approval plans, and execute and verify approved changes. Use for existing-page audits, new-page SEO requirements, local landing pages, internal linking, structured data, crawlability and follow-up performance reviews.
---

# Matrix SEO & AI Search Manager

Deliver useful evidence, a concrete approval plan, and verified execution. The default request to audit or optimize authorizes research and preparation, not changes to the live site. The owner approves the exact proposed changes before execution. Carry existing approval forward; do not ask again for the same approved scope.

This plugin uses existing Wix, Google Drive, GitHub and browser capabilities. It does not install a reporting server, automatically connect GA4/Search Console, or run on a schedule. Use free sources and existing accounts. Do not require SiteGuru, paid keyword tools, a subscription, a new analytics property or a new tracking tag.

## Start and select the mode

1. Read [project-and-scope.md](references/project-and-scope.md). Consult the current canonical project documents, latest verified checkpoint and relevant source files. Distinguish source intent, saved Wix state, published state and actual reporting evidence. Continue completed work; never reinstall or republish simply because status is uncertain.
2. Identify the request as **AUDIT**, **NEW PAGE**, **APPLY APPROVED**, or **FOLLOW-UP**. Infer URLs from the request/current checkpoint and discover missing project facts before asking the owner. For a sitewide audit, inventory sitemap URLs and Wix pages first, classify each, then work in documented batches until every in-scope page is accounted for. A sample is not a full-site audit.
3. Discover available tools. Use sufficient connected tools before browser access. Read the relevant Wix/browser skills before using them. Use live browsing only for explicit site tasks or allowed fallback; follow browser authentication/handoff rules. Never bypass access controls or silently fall back after a sufficient connector's repeated authorization failure. Missing Google reporting access must not block public-page analysis.
4. Read [page-checklists.md](references/page-checklists.md) and [free-performance-sources.md](references/free-performance-sources.md). Consult current official documentation when behavior or requirements may have changed; [sources.md](references/sources.md) is the starting map, not a frozen authority.

## Audit and performance collection

Create one inventory row per canonical URL with page type, intent, live/saved/source references, baseline hash, audit status, source availability and last verified time. Record redirects and URL variants separately; do not rewrite canonicals during discovery.

Collect available evidence in parallel only when independent and read-only:
- Public response, title/description/canonical/robots, rendered headings/content, JSON-LD, internal links in and out, images, mobile layout, booking destinations and visible business facts.
- Wix saved SEO fields, indexing state, page identity, custom element and page-code bindings. The saved editor is not proof of publication.
- GSC page/query performance and URL Inspection where accessible; GA4 landing-page and conversion behavior; Wix reports where available; free PageSpeed/CrUX diagnostics. Record precise scope, dates, source, filters, freshness and limitations.
- Existing performance before changing anything. Never interpret missing access or missing rows as zero traffic, indexing failure, or a reason to replace a page.

Use `scripts/inspect_html.py` for repeatable observations from downloaded HTML, not a rendered-browser substitute. For Wix custom elements, compare visible content with the existing `seoMarkup` path. A browser-response shell alone does not prove missing crawler content. User-agent diagnostic requests do not prove an actual Google/OpenAI crawl or indexation. Search Console's inspected crawled/rendered evidence is stronger.

Use `scripts/performance_summary.py` with the documented normalized input when calculating period changes. Keep unavailable values null and zero denominators undefined. Separate observations, interpretations and recommendations. Correlation is not causation; a post-edit gain is not proof the edit caused it.

Classify each finding **required fix**, **recommended improvement**, **optional experiment**, **already satisfied**, **not applicable**, or **not tested**. Prioritize confirmed blockers first, then high-opportunity pages and clear booking friction. Do not manufacture an SEO score, keyword density target, mandatory word count, AI visibility score or ranking promise.

## Prepare the owner approval package

Read [approval-and-execution.md](references/approval-and-execution.md) and [report-template.md](references/report-template.md).

Before asking for approval, complete everything available through reasoning and tools: dependency map, exact copy, actual verified link destinations, metadata, schema, source diff, validation and deterministic execution instructions. Do not ask the owner to approve a vague promise to optimize.

Present a short useful summary first: what works, actual page performance, the highest-priority issues, and the changes proposed. Include stable change IDs, exact before/after values, supporting evidence, expected benefit with uncertainty, scope and risks. Attach the complete page-by-page appendix when long. Distinguish saving a draft from publishing it. An approval question should name concrete change IDs and the requested outcome, for example: “Approve A01–A04 to save as Wix drafts?” or “Approve A01–A04 and publish those changes?”

Record the owner's actual response as approval evidence against the plan ID, revision, digest, URLs and selected change IDs. Do not create consent yourself. Approval may come from prior conversation when unambiguous. A broad prior request does not authorize new, materially different proposals. Use `scripts/check_approval.py` as a consistency check, not as a substitute for consent or a server-enforced permission boundary.

## Apply approved changes

Only enter this phase when approval exists for the concrete plan. Re-read current source and saved state immediately before editing. If an approved change's baseline differs, preserve the newer work and regenerate only the affected proposal; keep independent approved changes progressing where safe. If a timeout occurs, read back before retrying.

Use the existing architecture and Matrix Page Builder companion for approved layout/build work. Prefer minimal targeted edits. For a new page, use the approved Page Builder design and incorporate this plugin's page-type checklist before installation; this plugin is not permission to redesign an existing page. Store code/diffs/proofs/checkpoints in the existing Matrix repository, and private performance reports and approvals in the canonical Drive project folder. Do not publish private analytics or customer data in a public repository.

Generate exact execution steps naming navigation, page/element IDs, fields and values, order, protected boundaries, small save checkpoints, read-back tests, stop conditions and required evidence. Perform tool-capable work first. Browser execution is only the remainder requiring live application state. Stop the affected operation if the observed UI or architecture requires a new design decision; return evidence and resolve it before continuing.

Saving a Wix draft and publishing are different actions. Publish only when the approval includes publication and Wix's sitewide publish will not release unrelated pending work. If the owner already approved the same publication and the evidence is unchanged, proceed without redundant confirmation.

## Verify and close

Read back saved values and compare with the exact approved candidate. If published, verify the permanent public URL independently: response/metadata/schema, desktop and mobile content, crawlable links, full FAQ expansion, imagery, custom-element SEO parity, map if applicable, and working booking navigation without placing a real booking. Confirm shared header/footer and protected content remained intact. Check indexing/crawlability and performance as distinct facts.

Return statuses precisely: **SAVED**, **VERIFIED**, **TESTED**, **PUBLISHED**, **BLOCKED**, **NOT TESTED**. Include the evidence and any remaining limitations. Never claim publication, Google indexing, rank improvement, GA4/GSC connection or AI recommendations merely because code was saved or a plugin installed.

For FOLLOW-UP, compare consistent reporting periods and annotate release dates; avoid premature judgments from a few days or tiny samples. Explain when a later check would be useful. Schedule only if the owner asks and a scheduling tool is actually available; otherwise this is an on-demand workflow.
