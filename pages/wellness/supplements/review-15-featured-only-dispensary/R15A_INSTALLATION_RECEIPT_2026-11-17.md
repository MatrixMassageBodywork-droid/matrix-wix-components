# Matrix Supplements R15A — Installed Draft & QA Receipt
Date: November 17, 2026 (America/Chicago)
Project: FACIAL WEB SEO PW

**SAVED / VERIFIED:** R15 installed in the existing Supplements page. Final saved Wix revision **1268**. **NOT PUBLISHED**; published revision remains **1182**. Ordering, invoice submission and payment settings were not activated.

## Checkpoints
| Checkpoint | Saved revision | Result |
|---|---:|---|
| Fresh R12 preflight | 1262 (10:17 AM history display) | Full page code and renderer URL exactly matched R12; one verified host |
| B — R15 Velo | 1265 (10:19 AM history display) | Saved, fully reloaded, entire source copied back; exact R15 equality |
| C — R15 renderer | 1268 | Saved, fully reloaded; exact R15 URL and complete Velo equality; final history rechecked |

Revision growth was accepted under the R15A amendment. No site-history restoration or overwriting of unrelated pages was performed.

## Exact source verification
R12 readback: 25,352 characters / 25,394 UTF-8 bytes.
SHA-256: `a8b175c3f08697f4cb08d1f6ca076ec37f8e7c84d209a3fcb3966eb698b35337`
Git blob: `a504aa751809497fd0e981170dac57837d209b38`.

R15 Checkpoint B and final readbacks: 25,827 characters / 25,881 UTF-8 bytes.
SHA-256 (both): `b19a0da8cd2943d69dd956f43e9ee8fcd653a87f868a10baa61d8534063b8ed3`
Git blob: `a5353c84ea85af096e7112871de1d58eef943e27`.
Source commit: `ce7d6fdf7aca0509472c9707ace802aeed775410`.

Final complete renderer Server URL:
https://cdn.jsdelivr.net/gh/MatrixMassageBodywork-droid/matrix-wix-components@ce7d6fdf7aca0509472c9707ace802aeed775410/pages/wellness/supplements/review-15-featured-only-dispensary/renderer-v51-featured-only.js

The current Wix UI used an **Update** confirmation button for the URL, rather than the green check described in the instructions. Update was clicked before Save; complete URL equality was verified after reload.

## Unique host and scope
- Site: `cdec8df6-d518-4859-9f1e-f06bf5346d41`; editor document `a276c9bf-bc17-4680-959b-a24ebe7370f6`.
- Page `aeh8h` / SUPPLEMENTS & WELLNESS / `/supplements`.
- Exactly **one** custom-element preview host in the page DOM.
- Internal component ID verified: `comp-mwhxvav5`.
- Velo ID: `matrixSupplementsPageV1`; tag: `matrix-supplements-page`.
- Parent `section5` / `comp-mwhxubu7`.
- Existing desktop editor dimensions W980 × H9069, X0 / Y134 remained unchanged.
- Only complete page Velo and that host’s Server URL were changed. No create, duplication, move, resize, retag or restore.
- Header, footer, testimonials, native SEO settings, other pages and sitewide code were not edited.
- Backend module import remains `backend/supplementRequestsV4.web`. The entire backend-call and closed-gate portion of the Velo source is identical to R12.
- No database/catalog edits, external protocol edits, permission changes, invoices, payment transactions, automations, customer-data writes or publication were performed.
- Existing deferred collections archive remains at the pinned R15 commit; no archived source or protocol was modified. A full sitewide unpublished-change audit remains separate from this scoped draft installation.

## Native desktop and 320px QA
| Test | Actual result |
|---|---|
| Featured offers | PASS — exactly two feature cards, four individual supplements and two bundle prices |
| Real photos | PASS — all four approved Wix images loaded; nonzero intrinsic dimensions and meaningful alt text |
| Prices | PASS — adult $159.99; kids $59.95; Family Pair $208.95; InfiniWell $104.99; Colostrum+ $66.99; Vitality/Gut Pair $162.99 |
| Savings copy | PASS — Family $20.99 versus MSRP / $10.99 versus feature singles; Vitality/Gut $16.99 / $8.99 |
| Dispensary section | PASS — one prominent “All Your Wellness Essentials. 20% Off.” section follows the featured-offer section |
| External shop link | Exact single href verified; destination opens directly at https://us.fullscript.com/s/matrix_massage_wellness/shop |
| Visible provider branding | PASS — no “Fullscript” in the Supplements rendered text or image alt text; original external hostname retained |
| Deferred collections | PASS — zero /shop/plans/ links and no six individual collection listings; redundant two-shopping-options section absent |
| SEO/body structure | PASS — one H1, eight FAQ details, local-area and related-service links; native metadata not changed |
| Desktop width | PASS — body client width 1348px / scroll width 1348px |
| Actual mobile width | PASS — body and host 320px / scroll width 320px; no measured overflowing headings, paragraphs, links, buttons or photos |
| Mobile images | PASS — all four loaded; 108px image widths, within the 320px content bounds |
| Preorder controls | PASS — both real preorder buttons disabled; customer submit button disabled; no real customer request sent |
| Owner-only preview | Existing private synthetic QA panel is visible to the signed-in owner; three TEST ONLY items remain distinct from customer offers |
| Order dates/invoice | PASS — November 30, 2026 at 5 PM CT request cutoff; planned November 30 11:59 PM CT invoice deadline; December 1 group order |
| Pickup | PASS — approximately December 8–15 / 1–2 weeks; Matrix texts when ready; free studio pickup only, no shipping |
| Fee wording | PASS — one $2 non-taxable order-handling fee, 5.5% product tax, applicable 3% credit-card fee |

## Synthetic in-memory billing QA
Used two TEST ONLY Vitamin samples and one TEST ONLY Curated duo. No customer information was entered.

| Calculation | Observed |
|---|---:|
| Product subtotal | $42.00 |
| One non-taxable handling fee | $2.00 |
| Product tax, 5.5% | $2.31 |
| Total before eligible card fee | $46.31 |
| Eligible credit-card estimate | $47.78 |
| Everyday comparison | $62.00 |
| Savings | $20.00 |

The native Wix console recorded `MATRIX_V4_QUOTE_QA` with totalCents=4631, comparisonCents=6200, savingsCents=2000 and requestSaved=false. This success log is reached only after the unchanged Velo guard confirms previewOnly=true, requestSaved=false and invoiceCreated=false; invoiceCreated was not separately displayed in the console payload. The UI displayed “No request was sent.”

After clearing the synthetic cart, handling, tax and both totals returned to $0.00. The synthetic selection was left empty.

## Outstanding QA limitations — publication remains disabled
1. **Discount qualification mismatch:** the external storefront states “Up to 20% off” and “Discounts may vary by order. Labs and select products not eligible.” This does **not** substantiate 20% off every available supplement. Checkout application is **NOT TESTED**; no login, order or storefront-setting change was performed. Prepared R15 copy was installed exactly, without improvising a correction.
2. **Preview navigation:** hero/closing links have the correct `#ms-dispensary` targets, and the sole external CTA has the exact approved destination. Clicks within Wix’s sandboxed custom-element preview did not demonstrate scrolling/navigation. End-to-end CTA behavior is therefore **NOT VERIFIED** in native Preview. The destination itself was opened separately and verified.
3. **Known Maps error:** the existing Google Maps Preview TypeError recurred in `google-map.min.9a2bea98.js`: “Cannot read properties of undefined (reading 'undefined')”. Map functionality is **NOT TESTED**. No Maps changes were made.
4. No new renderer-specific runtime error was observed in the inspected logs. The renderer initially appeared blank while loading, then rendered correctly without source changes. This does not constitute a complete runtime certification.
5. Public anonymous runtime and real checkout were not tested because publication and ordering were explicitly prohibited.

## Final disposition
**Installation SAVED and source VERIFIED. Desktop/mobile visual and synthetic arithmetic checks TESTED. Release/checkout and preview-navigation limitations remain open. NOT PUBLISHED / NOT RELEASED.**
No further live changes were made after QA. Do not reinstall R15 or restore an older draft: resume from verified revision 1268 or a newer saved draft after targeted readback.
