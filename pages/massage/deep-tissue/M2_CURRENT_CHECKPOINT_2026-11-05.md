# M2 Deep Tissue — current saved draft checkpoint

Status: **SAVED / VERIFIED / PREVIEW TESTED / NOT PUBLISHED**.

The owner approved the complete design and authorized beginning installation on 2026-11-05. The scope is the body of the existing Deep Tissue subpage, between the existing global header and footer. No production publication or Test Site deployment was performed.

## Saved installation

- Wix site: Matrix Massage & Bodywork, `cdec8df6-d518-4859-9f1e-f06bf5346d41`.
- Existing static page: DEEP TISSUE MASSAGE, `cib7o`.
- Existing URL: `https://www.matrixmassage.net/deep-tissue-massage-salem-wi`.
- Body element: `matrixDeepTissuePage`, tag `matrix-deep-tissue-page`, in existing `section4`.
- Source: `https://cdn.jsdelivr.net/gh/MatrixMassageBodywork-droid/matrix-wix-components@1e14a9b4cef60f3d8c8d35d141adc931652657fa/pages/massage/deep-tissue/renderer.js`.
- The pinned source returned HTTP 200 and matched local bytes: SHA-256 `47e95d0507edb6cabb820979aef2c1a2e95735664dcbad23870bca405ba391d1`.
- Desktop element and section: 980 × 5666 px; element X 0, Y 132.
- Mobile element and section: 320 × 9364 px; element X 0, Y 62.
- Native old hero `Section1RegularMediaImage1RuleNoFaceImage` and old body `section2` were removed after the new component rendered correctly.
- Original `Section3SlideShow` reviews, global header, global footer and masterPage.js were retained without edits.
- Other service pages, M1 renderer, shared component files, booking services and customer data were not changed.
- One accidental text element added during source-field entry was removed; only the intended custom element remains in section4.

## SEO preservation

- Existing native title retained: **Deep Tissue Massage Salem WI | Matrix Massage & Bodywork**.
- Existing description, canonical URL, social tags and indexing-related tags were preserved.
- Page Code contains the exact component body as `seoMarkup`; the saved code was copied back after an editor reload and matched the supplied file after CRLF normalization.
- One H1 in the new body, nine content sections and seven visible FAQ questions.
- Existing FAQ schema `6jjGrWJ6` updated to match all seven visible questions and answers exactly.
- Old standalone Question schema `3LTKCBia` disabled in the draft; its original contents were preserved in the before-state backup.
- Native SEO update used `publish: false`; readback returned HTTP 200, matching FAQ content and unchanged non-target tags. Full before/after evidence is in `seo-verified-readback.json`.
- No ranking guarantee is implied. Published-source and post-publication indexing checks remain future work.

## Verification completed

1. Saved successfully in Wix, reloaded the editor, reopened Deep Tissue and verified the saved page code and rendered design.
2. Desktop Preview: width 980 px; default body height 5665.11 px; no horizontal overflow; nine sections; one H1; seven FAQs; old price text absent.
3. Desktop FAQ stress test: all seven expanded; body 6341.11 px; Wix container and section expanded to 6341 px; reviews followed immediately below without overlap.
4. Mobile Preview: width 320 px; default body height 9363.03 px; no horizontal overflow or headings, links or summaries extending beyond the body.
5. Mobile FAQ expansion: two questions open; body 9630.23 px; Wix container and section expanded to 9630 px; reviews followed correctly.
6. All image assets loaded during visual QA; lazy-loaded images appear as their sections enter view. The correct approved logo is used.
7. Booking button was clicked with a new-tab modifier and opened the expected Square booking menu for Matrix Massage & Bodywork. No service was selected and no appointment was created.
8. Main massage, Swedish, science, directions and text links were checked against their intended destinations in rendered markup. SMS sending and appointment completion were not tested.

## Files and recovery

- `WIX_PAGE_CODE.js`: exact installed page code.
- `renderer.js`, `body.html`, `style.css`, `assets/`: approved page renderer and scoped fonts.
- `faq-schema.json`: exact matching FAQ structured data.
- `manifest.json`: final IDs, source URL, dimensions and checksums.
- `qa-evidence.json`: captured desktop/mobile measurements.
- Before-state archive: https://drive.google.com/file/d/1TZjy3nx9QZn8NB5jEoufGDNVyIS8cXBd/view
- Canonical package folder: https://drive.google.com/drive/folders/1NojtXBjA36hxTAt_EBCcOc5NvUh05BDi
- Governing scope: https://docs.google.com/document/d/14NDrwuldZnlengsGIaNKAy6vU8Axj9EBriBq2rJUo9I/edit
- M2 source specification: https://docs.google.com/document/d/1FaWI5HDkd_FR-nHUJEgxSZrYId0CoQBgDMjfs7Gs1to/edit

## Continuation boundaries

This is a continuation of a completed draft installation. Do not reinstall, restore site history, delete native reviews, regenerate the design or replace the logo. Use this checkpoint and the pinned source above. Production publish and Test Site deployment were not performed. If publication is later authorized, review the scope of the Wix draft, publish through the agreed route and verify the live URL, rendered body, booking destination, canonical, one H1, matching FAQ JSON-LD, desktop/mobile layout and crawler-visible SEO markup. Do not describe Preview QA as live-site verification.
