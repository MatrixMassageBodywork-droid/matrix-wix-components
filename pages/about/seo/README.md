# About page native SEO candidate

Status: **LOCAL CANDIDATE / STATIC AND MOCK QA PASSED. NOT APPLIED TO WIX.**

Target: existing About page `yzabl`, `https://www.matrixmassage.net/about-5`, site `cdec8df6-d518-4859-9f1e-f06bf5346d41`. Prepared from review-3 and the read-only native baseline captured 2026-11-12T15:02:35Z. The source hashes and revision are recorded in `native-seo-patch-candidate.json`.

## Exact intended changes

- Title: **About Matrix Massage & Bodywork | Salem, WI** (43 characters).
- Description: **Meet DaNelle, licensed massage therapist and owner of Matrix Massage & Bodywork in Salem, WI. Discover our story, care philosophy, and spa services.** (148 characters).
- Replace the existing FAQ script's content using its observed native identity `meta.schemaType: Bp05JGMH`. Preserve all its other attributes. Its seven questions and answers exactly match the visible review-3 text.
- Add one JSON-LD graph with AboutPage, Person, HealthAndBeautyBusiness and BreadcrumbList. These describe the visible page and establish relationships between the owner, studio and page.
- Preserve all unrelated page tags. Leave canonical, robots and social-image inheritance intact. OG/Twitter title and description are expected to inherit the page's title and description; the function checks the returned resolved values rather than freezing duplicate overrides.

The baseline has one native tag; the candidate has four. There is exactly one FAQPage. No hours, rating, reviews, price range, license number, educational credential or medical credential is introduced.

## Identifier distinction

The original FAQ native Wix identifier `Bp05JGMH` was observed in the actual page read. It remains on that tag.

The **new** graph omits optional `meta` entirely. The current documented Tag schema permits this. No native Wix `schemaType` identifier is invented for the new tag. Capture any identity Wix assigns in its accepted Set response.

JSON-LD `@id` values are semantic identifiers, not Wix IDs. `https://www.matrixmassage.net/#business` is a **proposed** stable business identity for this About graph. Audited public Home, Spa & Beauty and Red Light schemas had no stable business `@id`; none of those pages are changed. Page, person and breadcrumb identifiers remain scoped to `/about-5`.

## Identity evidence and limits

The portrait and approved logo URLs come from the existing About page and approved Matrix design sources. The body supplies the studio name, owner, qualifications, address, phone, service communities and visible breadcrumb.

Facebook `https://www.facebook.com/411300892070855` uses the owner-confirmed business Page ID. Instagram is `https://www.instagram.com/matrixmassagewi/`. These are studio identities, so `sameAs` belongs to HealthAndBeautyBusiness, not the owner's Person. Facebook's public destination was not independently readable during this preparation. Do not claim this URL has been publicly verified or that the old NPE profile ID necessarily belongs to a different business. Verify via the authorized browser/session before release when available.

## When and how to run the candidate

1. Install the matching review-3 body and immutable renderer into the existing native About page. Read back the source/tag, page code and complete `seoMarkup`; confirm the seven visible FAQ answers and save the native draft.
2. Create `native-about-installation-evidence.json` from the supplied **template**, replacing its false flags and blank fields only with observed readback evidence. The source commit must equal the 40-character immutable CDN URL pin. This file records the executor's actual evidence; the API cannot independently inspect native layout. Do not submit the unfilled template.
3. Use `EXECUTE_NATIVE_SEO_DRAFT_CANDIDATE.js` as the `code` string of ExecuteWixAPI. Pass `siteId` exactly as above, `hasMutations: true`, and the first two documentation URLs below. Supply the evidence file as UTF-8 through the structured `files` parameter:

   `=== FILE: native-about-installation-evidence.json ===`

   followed by the complete observed JSON, with real newlines. The function is an async expression; do not invoke or wrap it.
4. The function stops without a write if evidence is incomplete, hashes differ, the target identity/canonical is wrong, baseline tags changed, or protected inherited SEO changed. It performs one fresh Get and, only on an exact match, one complete-array Set with `fieldMask: "tags"` and **`publish: false`**.
5. Save its complete before/request/after result. Verification uses the accepted Set response and resolved fields. Missing best-effort social fields are reported as unverified. Stop on a mismatch/error; do not repeat a write or publish the site automatically.
6. Publication remains a separate owner-approved action after native visual/functional QA. Public HTML schema and metadata validation happens after that actual publication.

If review-3 changes, regenerate the candidate using the matching new review directory before execution. This script only prepares files; it makes no network request:

```sh
python seo/generate_candidate.py --review-dir /absolute/path/to/review-N --baseline-dir /absolute/path/to/baseline
```

## QA evidence

`qa-results.json` confirms exact visible FAQ text, unique questions, schema relationships, one preserved FAQ entry, absence of stale destinations in the proposed request, and preservation of inherited SEO.

`execution-guard-qa.json` records six local mock cases: missing evidence, wrong body hash, concurrent native tag changes, inherited image changes, accepted draft payload, and write failure. The first four make no PATCH; an accepted write makes exactly one PATCH with publication false; failure is not retried. No live Wix call occurred during these tests.

## Sources

- [Wix SEO recipe — complete-array writes, inheritance, draft publication rules](https://dev.wix.com/docs/api-reference/business-management/seo/skills/manage-a-wix-site-s-seo-tags)
- [Wix Set Item SEO Tags — exact method and optional Tag meta contract](https://dev.wix.com/docs/api-reference/business-management/seo/item-seo-tags-v1/set-item-seo-tags)
- [Schema.org AboutPage](https://schema.org/AboutPage)
- [Schema.org Person](https://schema.org/Person)
- [Schema.org HealthAndBeautyBusiness](https://schema.org/HealthAndBeautyBusiness)
- [Google Search Central — BreadcrumbList](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)

These sources were checked on 2026-11-12. The exact observed Wix Tag contract is retained in `about-baseline/wix-tag-contract-confirmed.json`; public cross-page schema audit is in `about-baseline/red-light-schema-audit.txt` and the existing Home/Spa parsed files.
