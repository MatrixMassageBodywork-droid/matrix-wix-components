# Full-width subpage correction — November 5, 2026

Owner requirement: backgrounds, hero image and headline panel must span the browser width like the main Massage hub. Preserve everything else on existing subpages.

Status: width-only proofs prepared and locally verified. Wix layout change NOT EXECUTED; publication NOT EXECUTED. This is a review package, not a claim that the live gutters have been removed.

## Protected baselines

| Existing page | Page ID | Element ID | Tag | Section |
| --- | --- | --- | --- | --- |
| Deep Tissue | cib7o | matrixDeepTissuePage | matrix-deep-tissue-page | section4 |
| Swedish | l014i | matrixSwedishPage | matrix-swedish-page | section4 |

Published desktop hosts are 980 px wide. Their component CSS already paints its backgrounds across 100% of the host. The correct change is native full-width stretching, not replacing the content or using a 100vw breakout inside a clipped 980 px host.

`deep-tissue-preview.html` and `swedish-preview.html` use the exact existing body and CSS with a 100% proof wrapper. At the 1348 px content viewport, both roots measured 1348 px and neither produced horizontal overflow. The source hashes in `unchanged-source-hashes.json` must remain unchanged.

## Exact proposed Wix execution after review

1. Open the existing Matrix Massage & Bodywork Classic Editor, site `cdec8df6-d518-4859-9f1e-f06bf5346d41`. Confirm it is the existing editor, not a new site.
2. Pages & Menu → DEEP TISSUE MASSAGE (`cib7o`). Select `matrixDeepTissuePage` within `section4`. Read back current source, tag, desktop layout and section height against the latest M2 receipt. Stop on a source/tag/page mismatch; do not reinstall.
3. Open the selected custom element's **Stretch** control. Enable full-width stretch and set side margins to **0 px**. Keep source/tag, top position and height unchanged at this checkpoint. If this control is unavailable or its labels/semantics differ, return a screenshot and current layout; do not invent a replacement element.
4. Save once, reopen this page, and read back the stretch setting and zero margins. Do not repeat a save after a timeout before checking persistence.
5. Pages & Menu → SWEDISH MASSAGE (`l014i`). Apply the identical Stretch/0 px change to existing `matrixSwedishPage` in `section4`. Save once and reopen/read back.
6. In a rendering-capable Wix preview, measure the rendered body and its containing section. Full width can change wrapping and therefore height. Preserve the original top position; adjust only excess/insufficient vertical container space to the measured body height (rounded up), retaining the current end alignment with the following native reviews. Record old and new numbers. If the preview is blank because of the documented Wix custom-element issue, use the existing permitted Test Site flow; do not rewrite a working renderer.
7. Check desktop widths 1280, 1440 and 1920: section/hero left edge 0 and right edge equal content viewport (±2 px), no black side gutters, no horizontal scroll, legible text, no image distortion, no overlap or large trailing blank region.
8. Check the existing Wix mobile layouts at 320 and 390 px. Keep the current mobile setup unless this width change causes an observable regression. Validate full content, FAQ expansion, native reviews and footer adjacency.
9. Confirm page URL, title, description, canonical, indexability, existing FAQ schema and `seoMarkup` are unchanged. Verify booking and internal links remain identical. Do not change content, fonts, colors, imagery, header, footer, navigation, other pages or integrations.
10. Return a SAVED/VERIFIED receipt with screenshots, exact desktop/mobile dimensions, native stretch readback and SEO comparison. Publish only within the user's explicit approval for the reviewed release; after publication verify the two permanent public URLs.

No M2/M3 content edits or renderer replacement are required for this correction. Build their complete offline review proofs using the M4 `build.py`.
