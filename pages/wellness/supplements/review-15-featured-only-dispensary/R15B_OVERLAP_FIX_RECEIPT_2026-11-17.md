# Matrix Supplements R15B — published layout correction
November 17, 2026 · America/Chicago

**SAVED / VERIFIED / TESTED / PUBLISHED — live revision 1274.**

The featured-product descriptions and benefit labels no longer overlap. The previous flex rules gave text boxes a zero starting height and allowed paragraphs to shrink below their contents. Exactly two scoped CSS declarations now use `flex: 0 0 auto`.

Live page: https://www.matrixmassage.net/supplements

## Source and installation verification

- Existing Supplements page `aeh8h`; one existing custom element `comp-mwhxvav5`, Velo ID `matrixSupplementsPageV1`, tag `matrix-supplements-page`, parent `comp-mwhxubu7`.
- Existing native dimensions observed W980/H9122/X0/Y134; no manual layout-dimension edits.
- The existing Server URL field was updated, committed with Update, saved, and read back after a full editor reload.
- Page Velo unchanged before/after: 25,827 characters, SHA-256 `b19a0da8cd2943d69dd956f43e9ee8fcd653a87f868a10baa61d8534063b8ed3`.
- Corrected renderer: 68,025 bytes, SHA-256 `346cd000c8c194123fd15aad59e3f7736bc8ada7160ab5c7c9b459894ebb34b0`. Exact GitHub/CDN equality and JavaScript syntax check passed.
- Renderer commit: https://github.com/MatrixMassageBodywork-droid/matrix-wix-components/commit/cfc57297f7619c301fa21ecfc3bd6f1199c39e91
- Installed URL: https://cdn.jsdelivr.net/gh/MatrixMassageBodywork-droid/matrix-wix-components@cfc57297f7619c301fa21ecfc3bd6f1199c39e91/pages/wellness/supplements/review-15-featured-only-dispensary/renderer-v51-natural-text-flow.js
- One Publish Site request returned HTTP 200. Wix Release Manager independently confirmed live version 1274 at 100% exposure, displayed Nov 17, 2026, 2:34 PM. Test Site 1181 remains at 0%. An initial cached public response was old; a subsequent reload after publication confirmed the new renderer and corrected computed styles. No duplicate Publish request was made.

## QA results

| Check | Result |
|---|---|
| Public desktop, 1348px | PASS: no paragraph overflow; both descriptions 158.34px high; 22px gap before benefit labels |
| Native Wix mobile preview, 320px | PASS: descriptions 316.69px / 343.08px high; no text overflow; 22px gap before benefit labels; no horizontal overflow |
| Product photos | All four loaded |
| Six prices | $159.99, $59.95, $208.95, $104.99, $66.99, $162.99 |
| Two bundles and one dispensary section | Preserved |
| Fullscript in visible page body / deferred collection links | None / none |
| Public preorder controls | All disabled, including monthly selector |
| SEO | Title, description, canonical and JSON-LD exactly unchanged; one H1 and eight FAQs |
| Preorder instructions and fees | Byte-for-byte source unchanged; live November 30 cutoff, December 1 group order, invoice deadline and pickup estimate retained; $2 non-taxable handling, 5.5% product tax and applicable 3% card-fee text retained |
| Backend and business settings | No changes; no orders, invoices, payments, customer records, permissions or automation activated |

This small CSS correction did not rerun invoice/payment transactions or external discount checkout. Mobile evidence is native Wix preview, not a production mobile-user-agent test. The separate external discount application remains unverified beyond the earlier storefront observation.

## Content spreadsheet

**Matrix Website Master Catalog — Supplements Pilot**
https://docs.google.com/spreadsheets/d/15swQj97kKIeEa1DWUyMFnwf_gIXgssswRoYLzv0lSOw/edit

- **Monthly Features:** two offer headlines and summaries (rows 6–7).
- **Orderable Items V2:** four products, two bundles, descriptions and draft prices (rows 6–11).

Fresh readback: Website Placements says NOT_CONNECTED; Public Release V2 Wix sync is OFF. The currently published R15 marketing content and featured prices are static source. Editing the spreadsheet alone does not automatically change the live page. No spreadsheet cells were changed during this correction.

Current project checkpoint:
https://docs.google.com/document/d/1_AIi4UjE8yy6xHNkIHlVm3dJYIFA0_sxhrE_xzym3GA/edit

## Screenshots
- Matrix_R15B_Live_Desktop.jpg — actual published desktop page.
- Matrix_R15B_Mobile320.jpg — native Wix 320px preview with paragraph and benefit labels.
- Matrix_R15B_Published_1274.jpg — Wix publication confirmation.
