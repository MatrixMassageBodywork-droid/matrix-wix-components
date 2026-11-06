# Spa & Beauty subpages — Review 2 — 2026-11-06

DESIGNED / SAVED TO GITHUB / VERIFIED / BROWSER TESTED. NOT INSTALLED / NOT PUBLISHED.

This revision addresses the owner feedback on Facials, Japanese Head Spa and Waxing. It continues the existing drafts and preserves the published main hub.

## Changes
- Prominent intact Matrix water texture immediately after hero/navigation on every page, plus the closing booking section.
- Exact approved Matrix logo retained with a 4px black frame; assets embedded in the downloadable proofs to avoid failed phone image requests.
- Facials: four existing treatment/product photos. Head Spa: four existing treatment/product photos. Waxing: two new documentary-style illustrations and the existing preparation illustration, with accurate imagery disclosure.
- Removed “with Lexy” from facial page copy. Existing Square booking identity is preserved; Square itself was not edited.
- Human-centered introductions and dedicated local-visit sections mentioning Salem, Union Grove, Twin Lakes, Trevor, Bristol and Antioch. One Salem location is stated explicitly.
- Acne-prone/anti-acne facial content and all six existing skin-goal links retained.
- Permanent URLs and titles preserved; proposed descriptions recorded in page-config.json. Visible FAQ copy generates matching JSON-LD.

## Files
Each existing service folder contains a new review-2 build. The original review-1 source remains untouched. Full self-contained proof files are under proofs/; *-online.html uses the same source with pinned public assets.

## Release boundary
These are complete page-body proofs for owner review. No native Wix changes or publication are authorized by a source save. Shared header/footer, genuine reviews, current native SEO identities, indexing, analytics and other pages must be preserved during a later authorized installation. Candidate SEO snippets are not full page-code replacements. Capture existing native bindings/code before a precise merge.

## Source references
- Original verified checkpoint: https://drive.google.com/file/d/1kRbucLm4LeG5cWeRIzlUGmnhoxiLuQot/view
- Existing approved asset commit: f9c063da3d7970ff13667252772af99c2874585e
- Photo provenance: IMAGE_PROVENANCE.json in this directory.
- Clinical copy references: https://www.aad.org/public/everyday-care/skin-care-basics/hair/how-to-wax and https://www.aad.org/public/diseases/acne/skin-care/tips (rechecked November 6).

## Verified review and QA

Source/proof commit: https://github.com/MatrixMassageBodywork-droid/matrix-wix-components/commit/143a56d2eb86306386085d2cb4a57cc5967f06b8

- Fresh Git fetch and exact Git blob readback matched every changed source/proof file (54 files; this subsequently updated receipt excluded).
- All 15 responsive checks passed: three pages at nominal 320, 390, 1280, 1440 and 1920px iframe widths. Browser scrollbars yielded actual document widths 305, 375, 1265, 1425 and 1905px. Every section fills its document width; no horizontal overflow; exactly one H1; 4px black logo frame.
- All 14 desktop content images including logos loaded. The visible water texture was inspected in the browser.
- All FAQs expanded (6 Facials, 8 Head Spa, 8 Waxing) at desktop and narrow-mobile widths with no horizontal overflow or overlap with the following section.
- All three complete page bodies are accessible through the review navigation. Desktop and mobile screenshots and machine-readable QA are in qa/.
- Full-page screenshot export timed out. Complete scrollable HTML proofs are provided; saved screenshots show representative desktop/mobile views and the water treatment.
- HTTP audit: 32 of 38 destinations returned 200. Six Square booking URLs returned HTTP 429; the observed existing destinations were retained. This is a rate-limit verification gap, not evidence of a broken booking URL.
- All requested town names are in each visible page. Existing links, titles and permanent URLs are preserved. “with Lexy” is removed. Acne-prone/anti-acne content remains in the facial draft.
- Updated proposed metadata/schema package is SEO_PRESERVATION_AND_PROPOSED_PATCH.json. Its single FAQPage per page matches current visible answers. Existing unrelated schema is retained; Union Grove and Trevor extend existing areaServed arrays where present.

## Complete online previews

- Facials: https://raw.githack.com/MatrixMassageBodywork-droid/matrix-wix-components/143a56d2eb86306386085d2cb4a57cc5967f06b8/pages/spa-beauty/subpage-review-2-2026-11-06/proofs/facials-online.html
- Head Spa: https://raw.githack.com/MatrixMassageBodywork-droid/matrix-wix-components/143a56d2eb86306386085d2cb4a57cc5967f06b8/pages/spa-beauty/subpage-review-2-2026-11-06/proofs/head-spa-online.html
- Waxing: https://raw.githack.com/MatrixMassageBodywork-droid/matrix-wix-components/143a56d2eb86306386085d2cb4a57cc5967f06b8/pages/spa-beauty/subpage-review-2-2026-11-06/proofs/waxing-online.html

These exact HTTPS URLs were opened and visually verified. The preview host may present an “Open the page” notice. The previews are noindex, use no forms, and do not change the Matrix production website. Self-contained versions are in the same proofs folder without the -online suffix.

## Remaining before production

Owner review of this exact revision, then fresh native Wix code/binding/SEO capture and precise installation merge. Recheck the six rate-limited Square destinations. Test native Wix desktop/mobile layouts, expanded FAQ height, crawlable seoMarkup, metadata and schema before authorized release. Do not reuse placeholder custom-element IDs without fresh native verification.
