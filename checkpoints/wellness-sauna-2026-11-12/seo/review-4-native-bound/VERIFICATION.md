# Wellness and Infrared Sauna SEO draft verification

**Status: SAVED / READBACK VERIFIED / NOT PUBLISHED**

The retained bulk request saved SEO drafts for Wellness (`hfzq0`) and Infrared Sauna (`nf4iw`). Wix returned **2 successes, 0 failures**. The request contains `publish: false`, `returnEntity: true`, and only the `tags` field mask for each page.

Write completed November 12, 2026 at **7:34:18 p.m. America/Chicago** (`2026-11-13T01:34:18.381Z`). Read-only verification captured at **7:34:42 p.m.** (`2026-11-13T01:34:42.335Z`). Independent local audit completed at `2026-11-13T01:36:29.096573+00:00`.

## Verified outcome

| Check | Wellness | Infrared Sauna |
| --- | --- | --- |
| Accepted request and readback match exact reviewed schema | Pass | Pass |
| Title, description, canonical and social metadata preserved | Pass | Pass |
| Original focus keywords preserved | Pass | Pass |
| Existing native schema identities retained | Pass | Pass |
| Exactly one FAQPage, matching actual saved native body | 7 FAQs | 8 FAQs |
| Actual saved seoMarkup equals reviewed body | Pass | Pass |
| Actual saved native code hashes match installation evidence | Pass | Pass |
| Exactly one H1 in saved native body | Pass | Pass |
| Draft-only request | Verified | Verified |

The independent audit checked the actual retained native code: decoded its `seoMarkup` string, compared it byte-for-byte with the reviewed HTML, extracted its FAQ questions/answers, and compared those with the saved FAQPage. It also checked request-to-response correlation, full candidate tags, all protected resolved head tags and the original baseline focus keywords. All 18 checks passed for each page.

Wellness now has HealthAndBeautyBusiness, OfferCatalog, BreadcrumbList, CollectionPage and FAQPage schema. Sauna has Service, BreadcrumbList, WebPage and FAQPage schema. The Sauna Offer represents the verified **$35, 30-minute appointment added to an eligible visit**; it does not claim guaranteed standalone availability or a fixed exposure duration.

## Why the readback followed the successful write

The bulk response returned exact accepted tags but empty `resolvedTags` arrays. The initial `protectedHeadUnchanged: false` values therefore represented missing evidence, not confirmed metadata changes. Root did not repeat the successful write. Two read-only GETs supplied the resolved head, and all protected metadata matched the original baseline.

## Bound source

- Wellness body SHA256: `44137ce6a35d8487f4046e24444c5adeebdf862fd66fafd6ce0708f3093ca820`
- Sauna body SHA256: `a5d3b42bcd4fe58c6169e64cef73740d299f8293013d3f060086b02d59f5ea7e`
- Executed function SHA256: `aa86872e2f81ba5c7a30add777c08cf0240c040bf2873d59218848a6e529e419`
- Runtime source commit: `eaac30097ff251d67dbb1507a9449feb5618e409`

## Scope and limits

This report establishes saved native draft content and metadata through retained readback evidence. It does not establish publication, live crawler delivery, indexing, rankings or public mobile behavior. No network request, Wix write or publication was performed during this independent audit. The executed candidate is historical evidence and should not be rerun.

See `INDEPENDENT_DRAFT_VERIFICATION.json` for the complete check matrix and evidence hashes. Preserve the raw write/readback records unchanged.
