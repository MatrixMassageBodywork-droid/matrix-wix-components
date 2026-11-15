# CURRENT — MATRIX Supplement Order System — Staging V2 intake tested
Project: FACIAL WEB SEO PW. Verified 2026-11-15 UTC / November 14, 2026 America/Chicago.

## What is implemented and verified
SAVED / VERIFIED: RuntimeV2.gs and StageV2QA.gs were added to the existing tracker-bound Apps Script project. Existing Code.gs, Core.gs, QA.gs and the spreadsheet-only manifest remain intact. Both new files were reloaded and copied back; exact matches after Windows CRLF normalization.

SAVED / VERIFIED / TESTED: backend/supplementStaging.web.js is installed in the existing Wix Classic Editor draft. The Admin-only synthetic submission method returned CREATED, then ALREADY_EXISTS on replay. Public ordering reports false. The final module was saved, reloaded and copied back exactly. No website publication occurred.

TESTED: The existing inactive Wix automation draft delivered synthetic data to the existing private tracker's Cart Intake V2 through Test Automation. This verifies the action/mapping path, not a customer form or an active CMS event trigger. The first test exposed a blank DATETIME value. A new TEXT field receivedUtcIso was added to the same private collection; all 16 previous fields and permissions were verified preserved. Column B now maps to Received UTC ISO. A second test delivered the exact synthetic ISO timestamp successfully. All 12 mappings persist after reload; E/M/O remain unmapped.

TESTED: The installed Google processor validated the Wix-delivered carts, journaled immutable quote snapshots, projected Orders V2 / Order Lines V2 / Invoice Queue V2, and recognized replays without duplicate orders. Final state: 3 synthetic orders, 6 lines, 3 queue entries, each order $42.00 (aggregate $126.00), owner NOT_APPROVED, invoice create/email OFF, invoices NOT_CREATED. No real customer record was changed.

TESTED LOCALLY: 52 local test cases (21 prior checks plus 31 new tests), including mixed carts, unapproved/expired bundle components, client-price tampering, immutable snapshots, duplicate payload conflict, provider-timeout replay, exact provider totals/identity, refunds/disputes and exclusion of sandbox orders from purchasing eligibility. These are not 52 provider/live end-to-end tests.

## Still unfinished
NOT CONNECTED / NOT TESTED: The customer-facing order form/CAPTCHA and approved-catalog synchronization are not implemented. The current Wix endpoint submits a fixed Admin-only fixture, not arbitrary customer orders. The processor remains manual and accepts synthetic TEST-* orders only. No recurring processor trigger was installed.

SAVED / NOT REMOTELY TESTED: The sandbox-only Square customer/order/DRAFT-invoice adapter is installed but disabled. Square Developer Console is at sign-in. No token/location is configured; no external-request scope or new consent was added. The code cannot call production, publish an invoice, email a customer, or charge a card. Sandbox publish/payment/refund testing, provider reconciliation polling, production invoice email, approved tax/fulfillment/cycle configuration and final public release remain unfinished. Adding final products/prices alone will NOT complete the current implementation.

No products, prices, tax rules, fulfillment terms or order windows have been approved by this pass. The $42 quote and zero tax/fee are synthetic test fixtures, not business pricing or tax decisions.

NOT PUBLISHED / RELEASED: Website and automation remain unpublished/inactive for this integration. All production/public gates remain OFF. No real invoice, email, payment, wholesale order or subscription purchase was initiated.

## Evidence
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
- Source package: https://github.com/MatrixMassageBodywork-droid/matrix-wix-components/tree/b1059fb2180a46ef8714cc73ac30e253c43275dd/pages/wellness/supplements/order-integration/staging-v2
- Previous verified checkpoint is preserved in staging-v1/docs/CURRENT_INSTALLATION_2026-11-14.md at 191d206c1576f82747cb3ffc291bda59f541d0aa. Original staging source remains at 42ff5b9a796c284abc5cbf600efb11cf52a0eca9.

## Safe continuation
Continue from this checkpoint; do not recreate the sheets, collections, bound project, files or automation. Read docs/EXECUTION.md and docs/TIMESTAMP_CORRECTION.md with this receipt as the latest outcome. Use the existing Square sign-in tab for Sandbox access; never put credentials in chat, source, Sheets, logs or GitHub. Implement and verify the remaining customer UI, policy/catalog configuration, activation strategy and full sandbox lifecycle before describing products/prices as the final setup step. Public publication and production sending remain separately gated.

