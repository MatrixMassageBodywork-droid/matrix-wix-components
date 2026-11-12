# Wellness and Infrared Sauna metadata candidates

Current copy-bound candidate: **review-3-ready**, bound to Wellness `main/review-2` and Sauna `infrared-sauna/review-2`. Prepared only; no Wix metadata mutation performed.

- Wellness body SHA256: `44137ce6a35d8487f4046e24444c5adeebdf862fd66fafd6ce0708f3093ca820`; 7 exact visible FAQs. Review 2 moves the final FAQ punctuation into its anchor so extracted schema text matches visible text precisely.
- Sauna body SHA256: `a5d3b42bcd4fe58c6169e64cef73740d299f8293013d3f060086b02d59f5ea7e`; 8 exact visible FAQs. Review 2 optimizes the existing hero image URL; FAQ bytes/copy are unchanged.
- Protected native metadata unchanged. Existing schema identities retained.
- Breadcrumb names match the visible “Wellness & Biotech” label.
- Sauna Offer verified against visible $35/30-minute add-on copy and captured Square catalog.
- Generated function SHA256: `a40318cec2e23f15e72fe7fb058ac6011c4d11505b47c6cd79ba007cdcabe69a`.
- The missing native-installation-evidence test passed with zero API calls.

`review-1`, `review-1-ready` and `review-2-ready` are earlier preparation snapshots superseded by `review-3-ready`. No preparation snapshot has been executed. Do not execute an earlier snapshot.

After the native drafts are read back, regenerate a fresh candidate with actual installation evidence as described in `../seo-baseline/DRAFT_PATCH_INSTRUCTIONS.md`. The current function deliberately refuses to call Wix without that evidence. Root controls execution and records the returned per-item outcome.
