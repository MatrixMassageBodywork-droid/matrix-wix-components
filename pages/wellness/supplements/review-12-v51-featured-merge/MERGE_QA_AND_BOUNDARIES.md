# MATRIX Supplements R12 — V5.1 billing + R11 featured offers
Date: 2026-11-16. Project: FACIAL WEB SEO PW. Source preparation only; NOT installed or published.

## Authoritative baseline
- Wix draft 1238 (4:56 PM), currently pinned to billing V5.1 renderer from GitHub 7cdd837c3dbcc04b72cfff2dffb4968d2d791301.
- Current full page Velo code matched frozen V4 exactly in the R11 read-only preflight; verify unchanged again immediately before execution.
- Published site revision 1182 as of the R11 receipt. Do not restore Site History.

## Safe merge construction
- Renderer is byte-identical to frozen billing V5.1 except its sole `const body` HTML string, which is replaced with the previously prepared R11 featured display.
- Original V5.1 static body HTML was byte-identical to frozen V4 body. R11 body differs from that original solely within the two featured-offer sections; all other DOM markup remains unchanged.
- **All billing quote math, handling-fee tax treatment, pickup-only controls, private cart, disabled customer ordering, invoice restrictions and runtime event handlers are preserved from V5.1.**
- New page adapter is byte-for-byte the R11 prepared adapter; compared with current V4 adapter, it alters only the `seoMarkup` HTML string to mirror the two cards. No backend code is edited.
- Feature prices: 159.99, 59.95, 208.95; 104.99, 66.99, 162.99 USD.

## Source checks (all PASS)
- v5bodyMatchesFrozenV4: PASS
- cssIdentical: PASS
- nonFeaturedBillingUntouched: PASS
- pageAdapterOnlySEOChanged: PASS
- seoEqualsRenderedMarkup: PASS
- twoFeaturedCards: PASS
- fourProductTitles: PASS
- sixFeaturePrices: PASS
- twoDisabledPreorderButtons: PASS
- oneH1: PASS
- eightFAQs: PASS
- sixFullscriptLinks: PASS
- quoteCentsCorrect: PASS
- zeroNoFee: PASS
- noApiInvoice: PASS
- rendererParses: PASS
- veloAdapterParses: PASS

## Closed draft acceptance
- 42.00 USD synthetic product subtotal + 2.00 USD handling + 2.31 USD product-only 5.5% tax + free pickup = **46.31 USD** before eligible card surcharge.
- Eligible-credit estimated total 47.78 USD is **display-only**, not a working native Square surcharge or invoice. 3% charge must not be assumed collected.
- Anonymous public order is disabled, draft Fullscript six links preserved, no invoice or marketing emails, no automation or recurring cycle activated.
- No payment/refund/live backend test performed in this source-preparation step.

## Installation boundary
- In Wix Classic Editor update only the existing Supplements page code and existing custom-element Server URL, after verifying V5.1 exact baseline and complete original V4 page code.
- Save and read back each step; native Preview desktop/320px mobile and link validation are still required. Never create another host.
- Publication remains gated on separate sitewide unpublished-change inventory; if uncertain stop SAVED / NOT PUBLISHED.
- No changes to Wix, Square, Apps Script, Sheets, Fullscript, invoices, users, credentials, triggers or releases were made by this GitHub change.

## Inputs
- V5.1 billing renderer SHA: 362301424aed89a4988941c29b9532738dcaceab
- R11 renderer SHA: 01aed3b6cc633d621aad6a539b49fd78f48c34cb
- R11 page adapter SHA: a504aa751809497fd0e981170dac57837d209b38
- R11 preflight receipt: https://drive.google.com/file/d/1ADxnb2q-7UufE6XV20IIB5w8tU4BG_qo/view
- Handling fee correction: https://drive.google.com/file/d/1Qg1fVrs1lBJ-Y5ylxiJ_949GtFS2S5il/view