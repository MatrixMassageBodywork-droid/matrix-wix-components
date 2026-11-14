# Supplements R5 — Matrix dispensary copy, positive local text, sauna nav

**Project:** FACIAL WEB SEO PW. **Date:** November 13, 2026 CT.
**Status:** `DESIGNED / LOCAL SOURCE SAVED / STATIC & LOCAL VISUAL TESTED / WIX NOT INSTALLED / MENU NOT CHANGED / NOT PUBLISHED`.

Current source baseline: R4 `d1f4f37f174efe9a4a97cf6edc3fc77f2ae31102` at `pages/wellness/supplements/review-4`. Existing R3 approved logo and teal-water design are reused without visual asset changes.

## Requested and implemented in R5 candidate
- Removed highlighted sentence about neighboring communities not being additional locations. Local paragraph now starts “Visit Matrix in Salem, conveniently located for guests from ...”.
- Removed every visible mention of `Fullscript` from the page body, cards, headings, FAQs and CTA labels. Private vendor platform remains unchanged and original eight `us.fullscript.com` ordering URLs were intentionally retained as link destinations.
- Public marketing identity is “Matrix Supplement & Vitamin Dispensary.” Metadata description, social descriptions, structured-data names/descriptions, and the eight FAQ answers match that brand-neutral copy.
- Both monthly features remain placeholders with disabled ordering; six existing collection destinations and SEO target towns were preserved.
- Infrared Sauna missing from Wellness submenu is **verified** by live page text. Existing native Wix Sauna page ID `nf4iw` and self-canonical `/infrared-sauna-salem-wi` were read from Wix SEO API. `navigation-patch.json` and `WORK_EXECUTION.md` specify precise native menu edit; it is **NOT INSTALLED**.

## Local QA
Run `node --check renderer.js` and `node --check WIX_SEO_SNIPPET_CANDIDATE.js`, then inspect `preview.html`. Local Chromium script checked widths 320, 375, 390, 700, 1280, 1440, 1920; responsive cards, full-width, image decode, FAQ expansion, disabled buttons, no browser errors/overflow. Screenshots in `evidence/`.

## Protected scope
Do not create duplicate pages/menus; do not change existing Fullscript plan destinations, activate preorder forms, publish pricing, send email, collect payment, contact the vendor, or install a new API. Preserve live site's shared header/footer, reviews, permissions, Square, Google Sheets, and unrelated drafts. Current `R5` local proof is not the published Wix site. Proposed user URL `/supplements-vitamins-salem-wi` remains a coordinated release, not a live link.

R5 `renderer.js` is a production-candidate custom element with served image assets; standalone `preview.html` uses self-contained visual assets for deterministic offline proof, and must not be installed as page code. `WIX_SEO_SNIPPET_CANDIDATE.js` must be merged rather than replacing existing handlers.
