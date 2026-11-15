# Matrix Supplements — R9 single-host correction (draft only)

**Project:** FACIAL WEB SEO PW. **Date:** 2026-11-14 America/Chicago.

This is the surgical correction for the Wix R8 first-install + Phase 3B cart mismatch recorded in `Matrix_Phase3B_Preinstallation_Receipt_2026-11-14.md` (Drive ID `1lfTN1LeEItmKeg02NhyqoLaZFvucuxF4`).

## Exactly what changed
- Create the R8 host for the first time. The existing Wix page `aeh8h` has no `matrixSupplementsPageV1` element or previous R8 installation; no attempt to reuse or replace an absent host.
- Retain **one** Wix-native custom element host: `matrixSupplementsPageV1` with tag `matrix-supplements-page`.
- Place the existing V3 `matrix-monthly-order-selector` *as nested HTML* immediately after R8's two monthly offer cards, ahead of the monthly savings note. Both custom element classes are registered by **one combined renderer** (`renderer.js`). There is no second Wix-native element or second page-code handler.
- Keep the nested selector in `preview-mode="CLOSED"` with `catalog-json="[]"`. A client-friendly closed-state message appears; no test products/prices, customer details, invoice button, or live order forms are displayed. The selector's existing `DEMO_ONLY` path is preserved for isolated future QA but is not enabled on the Wix page.
- Keep all R8 copy, layout, water/logo references, two offer IDs, **eight FAQ answers**, one H1, all six current dispensary collection links, SEO metadata, and other internal links unchanged. Add only a small margin/layout rule around the nested selector.
- The R8 site route and metadata are **not** changed by this correction. The proposed `/supplements-vitamins-salem-wi` migration is a separate release.

## Source files
- `body.html` — full R8 markup with a single nested closed cart slot.
- `style.css` — R8 styling plus cart-slot spacing only.
- `renderer.js` — single pinned production Wix custom element JavaScript containing both classes. Uses official remote HTTPS logo/water assets; no base64 images or fonts in production.
- `monthly-order-selector-integrated.js` — nested component source, closed by default. Derived from existing approved Phase 3 source.
- `WIX_PAGE_CODE_FIRST_INSTALL.js` — complete first-install candidate for the **observed starter Velo code**, with complete visible body `.seoMarkup` for `#matrixSupplementsPageV1`.
- `preview.html` — standalone offline proof with base64 approved logo/water; **noindex**, not production code.
- `manifest.json` — hashes and source lineage.
- `evidence/qa_browser.json` and screenshots — seven-width local Chromium proof tests.

## Source authority and preservation
- R8 design source: `28c2eaa357db7c698290f4d0f8cbea0fb12919e6/pages/wellness/supplements/review-8`.
- Existing V3 cart source: `3731bc69f5fd164c784764dededcea57290cffad/pages/wellness/supplements/order-integration/staging-v3/ui/monthly-order-selector.js`.
- Existing V2/V3 backend, private Wix CMS collections, Google Apps Script, Square Sandbox paid/refunded fixture, inactive automation and all live production settings are outside this change. Do not reinstall, duplicate, republish or mutate any of them.

## Verified locally
Chromium offline desktop/mobile widths 320, 375, 390, 700, 1280, 1440, 1920: no overflow or JS errors, original logo loaded, single R8 host and nested selector, cart strictly CLOSED with no enabled submit, nested cart visually after the two monthly offer cards, one H1, eight expandable FAQs, six preserved dispensary plan cards, correct full-width layout. Hash comparisons confirm unchanged R8 links and FAQ text. Node syntax checks pass.

**NOT YET INSTALLED:** Wix editor first-time host/section, page Velo, native desktop/mobile preview, anonymous visitor QA and publication. Work instructions must use the latest native editor readback and treat the native section IDs as immutable scope boundaries. No Wix Publish.
