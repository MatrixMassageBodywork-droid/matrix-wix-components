# CURRENT — MATRIX Supplement Order System — Sandbox payment and refund verified
Project: FACIAL WEB SEO PW. Verified 2026-11-15 UTC / November 14, 2026 America/Chicago.

## What is implemented and verified
SAVED / VERIFIED: RuntimeV2.gs and StageV2QA.gs were added to the existing tracker-bound Apps Script project. Existing Code.gs, Core.gs and QA.gs remain intact. The manifest now additionally requests script.external_request for the authorized Sandbox connection; Google consent is complete and the connection was tested. Both new files were reloaded and copied back; exact matches after Windows CRLF normalization.

SAVED / VERIFIED / TESTED: backend/supplementStaging.web.js is installed in the existing Wix Classic Editor draft. The Admin-only synthetic submission method returned CREATED, then ALREADY_EXISTS on replay. Public ordering reports false. The final module was saved, reloaded and copied back exactly. No website publication occurred.

TESTED: The existing inactive Wix automation draft delivered synthetic data to the existing private tracker's Cart Intake V2 through Test Automation. This verifies the action/mapping path, not a customer form or an active CMS event trigger. The first test exposed a blank DATETIME value. A new TEXT field receivedUtcIso was added to the same private collection; all 16 previous fields and permissions were verified preserved. Column B now maps to Received UTC ISO. A second test delivered the exact synthetic ISO timestamp successfully. All 12 mappings persist after reload; E/M/O remain unmapped.

TESTED: The installed Google processor validated the Wix-delivered carts, journaled immutable quote snapshots, projected Orders V2 / Order Lines V2 / Invoice Queue V2, and recognized replays without duplicate orders. Final state: 3 synthetic orders, 6 lines, 3 queue entries, each order $42.00 (aggregate $126.00), owner NOT_APPROVED, invoice create/email OFF, invoices NOT_CREATED. No real customer record was changed.

TESTED LOCALLY: 73 cases passed in the combined run: 21 original, 34 runtime, 7 provider draft checks, 11 lifecycle checks. These include price tampering, immutable mixed-cart quotes, timeout/replay recovery, provider identity and exact amounts, paginated disputes, refund exclusion and the existing strict sheet-state enum. Local tests are separate from the actual Sandbox tests below.

## Still unfinished
NOT CONNECTED / NOT TESTED: The customer-facing order form/CAPTCHA and approved-catalog synchronization are not implemented. The current Wix endpoint submits a fixed Admin-only fixture, not arbitrary customer orders. The processor remains manual and accepts synthetic TEST-* orders only. No recurring processor trigger was installed.

SAVED / VERIFIED / TESTED: Square Sandbox draft creation and duplicate replay passed 19:56:42–55 Chicago on November 14, 2026. Existing Matrix Clinical OS application / Default Test Account / location LNP57TAA5YGP0; existing selected TEST-STAGE2-TRANSPORT-002. Square order CnfTXiQJla29bpSccU6V2PUvta4F and invoice inv:0-ChBvEd2_INMsq2DAPxPhNm2cELIN. Provider GET readbacks confirmed DRAFT, 4200 USD cents, zero paid, SHARE_MANUALLY, NONE automatic payment, matching synthetic recipient, same invoice/order on replay, purchase eligibility false. Sandbox flag closed in finally. Connected-sheet readback confirmed selected row DRAFT/AWAITING_INVOICE, other fixtures unchanged, all queue/create/email/owner gates closed. See SQUARE_DRAFT_VERIFIED_2026-11-15.md and evidence/square-draft-verified.jpg.

The owner's screenshot showed an earlier HTTP 400. Square logs confirmed VALUE_TOO_LONG at order.reference_id (40 maximum); the correction maps internal 43-character ID to a 37-character reference without changing digest bits, internal IDs or retry keys. Existing customer reused. Correction source 3f1498caf0dc4236cb48258c0dc13b2fb3a8a196. Both affected files were reloaded and copied back exactly; 40 V2 local tests passed, plus 21 prior V1 cases. The initial 59-test count above predates these two regression tests.

SAVED / VERIFIED / TESTED: Existing Sandbox invoice published SHARE_MANUALLY and received one simulated $42 payment on Square's hosted Sandbox page. Authenticated invoice/order/payment read-backs passed 20:10:12–18 Chicago; sheet projection read-back matched. Full $42 refund was created once at20:10:35 and read back COMPLETED at20:11:05; retry reused the same refundID. Payment refunded_money=4200, orderHOLD, refund holdTRUE, purchasing eligibilityFALSE, all owner/create/email gatesclosed. The other two fixtures remainunchanged. APIenable flagclosed aftereveryrun. See SANDBOX_LIFECYCLE_VERIFIED_2026-11-15.md for full IDs and objective evidence.

LIMITATION: Square Sandbox invoice itself remainsPAID/version2 despite COMPLETED refund and fullyrefundedpayment. Square's developerforum documents this paritygap. The tracker correctly relies on refund/payment evidence and holds theorder; invoiceREFUNDED transition has NOT beenverified. We didnot alterproviderstatus, retrya secondrefund, createanotherinvoice or useproduction.

SAVED / VERIFIED: Added SandboxLifecycleV2.gs with selectedfixture-only publication, reconciliation and fullrefund helpers. RuntimeV2.gs additionally maps journal SANDBOX_PAID_VERIFIED to existing sheetenum PAID_VERIFIED, preserving all purchasingexclusions. Latestcode correction32cd1654b3aa4b6e8863dbd8461d94265263015d. Savedsource reloadedandcopiedbackexactly. No newtrigger, deployment or permissionchange.

NOT IMPLEMENTED / NOT TESTED: Customer-facing cart/CAPTCHA, approved-catalog synchronization, generic approved-product processor, recurring reconciliation, production invoice email, approved tax/fulfillment/cycle configuration and final publicrelease remainunfinished. Current code accepts only syntheticTEST fixtures and hardcodes the Sandboxhost. Adding final products/prices alone will NOT complete the implementation.

No products, prices, tax rules, fulfillment terms or order windows have been approved by this pass. The $42 quote and zero tax/fee are synthetic test fixtures, not business pricing or tax decisions.

NOT PUBLISHED / RELEASED: Website and automation remain unpublished/inactive for this integration. All production/public gates remain OFF. No real invoice, email, payment, wholesale order or subscription purchase was initiated.

## Evidence
- Sandbox connection code/spec/tests source commit: a57ca51a73db36688d58524476c03d54f8d81e7f. Seven new local tests passed, including incorrect provider total/recipient, email or automatic charging settings, network failure, and wrong location. Source read-back results: manifestExact=true, qaExact=true. All 59 local cases passed in the combined run.
- Google consent observed for the exact existing Matrix Supplement Orders STAGING v1 project and MatrixMassage.Bodywork@matrixmassage.net account. Only the additional external-service permission is requested; the existing spreadsheet access is listed separately. No grant was performed by the agent.
- Direct Google QA ran November 14 18:22:58–18:23:06 America/Chicago. One order/two lines remained after replay.
- Wix draft tests: TEST-STAGE2-TRANSPORT-001 (initial blank timestamp) and TEST-STAGE2-TRANSPORT-002 (corrected ISO mapping). The supplied timestamp 2026-11-15T00:40:00.000Z is deliberately synthetic.
- Processor ran 18:34:55–18:35:01 Chicago: processed=2, duplicates=1, rejected=0. Replay 18:35:45–18:35:51: processed=0, duplicates=3, rejected=0.
- Final verification 18:36:19–18:36:21 Chicago: testOrders=3, totalCents=12600, productionEnabled=false, publicOffers=false, emailsSentByRuntime=0, externalCalls=0.
- One synthetic CMS record was created via the Wix backend test console; the second call returned ALREADY_EXISTS. Automation remains inactive, so this record did not trigger a further sheet append.
- During editing, a clipboard paste briefly created a stray draft HOME text element (text72). It was removed, saved and verified absent after reload. It was never published; no existing content was intentionally modified. Final backend source was pasted using editor-focused keyboard operations and independently read back.

## Canonical resources
- Project folder: https://drive.google.com/drive/folders/1jthRMAHOoockNm8hAVBK6mz4iaHbhNK8
- Master catalog: https://docs.google.com/spreadsheets/d/15swQj97kKIeEa1DWUyMFnwf_gIXgssswRoYLzv0lSOw/edit
- Private tracker: https://docs.google.com/spreadsheets/d/16hwNkp_gobTw2wHyb6N6_aTzmtOgIIPLPa5tIPdnxUY/edit
- Wix site: cdec8df6-d518-4859-9f1e-f06bf5346d41. Supplements page aeh8h, /supplements; current R8 design remains uninstalled/unpublished by this pass. Do not alter its six Fullscript category links or perform the pending slug migration as part of integration.
- Apps Script: https://script.google.com/u/0/home/projects/1sBQUrkPpZaIlHeuNAMNdsiePX17HEgoGLZqMSOfcqpG_8ALTPgO2TaFG/edit
- Wix draft: Matrix Supplement Intake V2 — STAGING OFF, e0b16020-55b5-46d0-a890-645d277b0c86.
- Intake collection: MatrixSupplementOrderIntakeV2, revision 2; catalog snapshot collection MatrixSupplementCatalogSnapshotV2 remains separate/private.
- Source branch: review/supplements-no-api-2026-11-13.
- Runtime source commit: cea19fdb8a81228e60ffa4987379c9566ff93668.
- Final backend correction commit: b1059fb2180a46ef8714cc73ac30e253c43275dd.
- Source package: https://github.com/MatrixMassageBodywork-droid/matrix-wix-components/tree/a57ca51a73db36688d58524476c03d54f8d81e7f/pages/wellness/supplements/order-integration/staging-v2
- Previous verified checkpoint is preserved in staging-v1/docs/CURRENT_INSTALLATION_2026-11-14.md at 191d206c1576f82747cb3ffc291bda59f541d0aa. Original staging source remains at 42ff5b9a796c284abc5cbf600efb11cf52a0eca9.

## Safe continuation
Read SANDBOX_LIFECYCLE_VERIFIED_2026-11-15.md and current source before execution. The selected invoice is fully refunded at payment/refund level andheld; do not recreate, repay, republish or refund it again. Earlier DRAFT-only QA is historical and will correctly fail afterpublication. Continue the remaining customerUI/catalog/processor work as a separate specified phase with gatesclosed, preserving the existing R8design, six dispensarylinks, sheets, collections and inactiveautomation. No products/policies or publicrelease are approved by this checkpoint. Production lifecycleverification remains a separate authorized launchrequirement.
