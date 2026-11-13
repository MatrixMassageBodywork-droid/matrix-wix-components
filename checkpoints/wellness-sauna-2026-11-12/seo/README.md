> **Subsequent public release verified:** both approved page revisions and this saved SEO are live at Wix revision1131. See [public SEO verification](../publication-2026-11-12/seo/PUBLIC_VERIFICATION.md) and [the publication receipt](../publication-2026-11-12/PUBLICATION_RECEIPT.md). Draft preparation/execution records below remain historical evidence.

# Wellness and Infrared Sauna metadata candidates

## Current status: SAVED / READBACK VERIFIED / NOT PUBLISHED

Root executed **review-4-native-bound** once as a two-page bulk **draft** write at `2026-11-13T01:34:15.437Z`–`01:34:18.381Z`. Wix accepted both entries with two successes and zero failures. Two subsequent read-only GETs at `01:34:42.335Z` supplied the resolved-head evidence absent from the write response. No second write was made. These timestamps are November 12, 2026 at approximately 7:34 p.m. America/Chicago.

The saved schema is bound to Wellness `main/review-2`, Sauna `infrared-sauna/review-2`, and the verified native installation evidence captured at `2026-11-13T01:28:30.435586+00:00`. Independent local audit passed all 18 per-page checks. Do not rerun the executed draft candidate.

- Wellness body SHA256: `44137ce6a35d8487f4046e24444c5adeebdf862fd66fafd6ce0708f3093ca820`; 7 exact visible FAQs. Review 2 moves the final FAQ punctuation into its anchor so extracted schema text matches visible text precisely.
- Sauna body SHA256: `a5d3b42bcd4fe58c6169e64cef73740d299f8293013d3f060086b02d59f5ea7e`; 8 exact visible FAQs. Review 2 optimizes the existing hero image URL; FAQ bytes/copy are unchanged.
- Protected native metadata unchanged. Existing schema identities retained.
- Breadcrumb names match the visible “Wellness & Biotech” label.
- Sauna Offer verified against visible $35/30-minute add-on copy and captured Square catalog.
- Generated function SHA256: `aa86872e2f81ba5c7a30add777c08cf0240c040bf2873d59218848a6e529e419`.
- Actual saved native code file hashes match the supplied installation evidence.
- Local mocked execution tests passed: valid evidence and unchanged baselines produce one draft bulk request; changed metadata prevents the request. No real API or network calls occurred during these tests.

`review-1`, `review-1-ready`, `review-2-ready` and `review-3-ready` are earlier unexecuted preparation snapshots superseded by the saved `review-4-native-bound` draft. Do not execute an earlier snapshot.

## Authoritative evidence

All final records are in `review-4-native-bound`:

- `WIX_DRAFT_WRITE_RESULT.json`: retained complete request and successful per-item acceptance.
- `WIX_DRAFT_READBACK_RESULT.json`: read-only GET records containing saved tags and resolved head.
- `FINAL_DRAFT_SEO_VERIFICATION.json`: root's final verification.
- `INDEPENDENT_DRAFT_VERIFICATION.json`: independent comparison against the baseline, candidate and actual saved native body/code.
- `VERIFICATION.md`: concise current result and limits.

The bulk response returned **empty** `resolvedTags` arrays. Its initial `protectedHeadUnchanged: false` values mean that evidence was unavailable in that response; they do not establish metadata drift. Subsequent readback confirmed protected head tags unchanged for both pages. Original focus keywords, canonicals, non-script overrides and schema IDs also remain preserved.

The executed function was hardcoded to `publish: false`; saved native metadata is not evidence of public release. Future publication requires root's scope review and the owner's explicit authorization, followed by actual permanent-URL verification. Preserve the existing immutable runtime source pin and reviewed bodies; a later body change requires newly bound schema. Do not republish or reinstall merely to update this receipt.
