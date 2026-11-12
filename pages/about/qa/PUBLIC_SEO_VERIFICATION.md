# About review 3 — public SEO verification

**Status: PUBLIC SEO AND CRAWLER HTML VERIFIED.**

Permanent URL: https://www.matrixmassage.net/about-5

Expected source: `about-review-3-2026-11-12`, source commit `bf6fc01d51baf3ec797af57f17716860df7754e7`.

Root verified native body publication revision 1109. One targeted About SEO publication then released the already-approved four saved tags; the accepted targeted response is `targeted-seo-publication-result.json`. This verification performed only public reads and made no Wix mutation or publication request.

## Final public head

The ordinary permanent URL returned HTTP 200 and the approved SEO on the final read. No cache-busting URL was needed for the final result.

| Check | Result |
| --- | --- |
| Title | About Matrix Massage & Bodywork \| Salem, WI |
| Description | Meet DaNelle, licensed massage therapist and owner of Matrix Massage & Bodywork in Salem, WI. Discover our story, care philosophy, and spa services. |
| Canonical | https://www.matrixmassage.net/about-5 |
| Page/header indexing directives | No blocking noindex/none directive observed |
| OG title and description | Exact approved values |
| Twitter title and description | Exact approved values |
| Social image | Original inherited image preserved |
| Structured data | Exactly one FAQPage plus the approved AboutPage, Person, HealthAndBeautyBusiness and BreadcrumbList graph |
| FAQ data | All seven questions and answers exactly match the approved visible text |
| Robots.txt | Allows this route for Googlebot, Bingbot, OAI-SearchBot and ChatGPT-User in the observed file |

## Body and crawler delivery

Ordinary browser HTML contains the complete body as a Wix `seoMarkup` configuration string. That string is byte-identical to review 3: SHA-256 `e195738430d214d323f65190725e58dff4121656c934bb461613bf227cd6724f` (13,123 bytes). In the ordinary response it is configuration data, rather than an already-parsed H1/body element. Root's public browser QA separately confirms the actual rendered body, one H1, seven FAQs, all ten arrows, the preserved portrait and the correct runtime source pin.

The Googlebot user-agent simulation returned actual semantic body HTML with one About root and one H1. Its embedded SEO markup matched the same review-3 body hash.

The OAI-SearchBot user-agent simulation returned actual semantic HTML, with:

- One About body root and one H1: **About Matrix Massage & Bodywork**.
- Complete body text matching review 3 exactly.
- All seven FAQ questions and answers matching exactly.
- The correct title, description, canonical, social tags and approved JSON-LD.

**Limits:** These requests simulate crawler User-Agent strings; they do not establish an authentic Google/OpenAI crawl, actual indexing, rankings or AI recommendations. The page supplies the checked content and permits the checked crawlers. Search engines control when they revisit and use it.

## Evidence and historical diagnostics

Current authoritative HTTP evidence:

- `public-seo-verification.json` — final ordinary URL, OAI response and integrated checks; all checks pass.
- `public-oai-searchbot-verification.json` — exact OAI user-agent simulation response fields and semantic body checks.
- `public-ssr-markup-check.json` — earlier ordinary versus Googlebot HTML comparison.
- `public-seoMarkup-0.html` and `public-seoMarkup-1.html` — extracted byte-identical body snippets, not separate deployments.
- Root's `public-body-verification.json` and `about-live-final-seo-dom.json` — independent actual-browser evidence.

Historical diagnostics retained: `public-seo-first-read.json`, `public-seo-cache-comparison.json`, and `native-seo-post-publication-get.json`. They recorded the initial state where native body revision 1109 was public but SEO tags were still saved only in the draft. The targeted About SEO publication corrected that mismatch. Do not treat those historical failures as current status.

The generic `siteRevisionValues` field in the earlier SSR comparison came from an unscoped raw-text regex that also matches bundled applications. It does **not** establish Matrix's native revision. Matrix revision 1109 is grounded in root's native history evidence; the deployed About source/body is established by the exact source and content checks above.

The initial `verify_public_seo.py` diagnostic assumed ordinary-response semantic HTML and is not the final verification methodology. Treat it as superseded; the final evidence distinguishes ordinary configuration markup from crawler-response semantic HTML explicitly.
