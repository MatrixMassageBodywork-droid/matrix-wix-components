# CURRENT — MATRIX Supplement Order System — Staging V1.3
Project: FACIAL WEB SEO PW. Verified November 14, 2026 (America/Chicago).

## Latest result
SAVED / VERIFIED: Existing bound Apps Script is authorized. Wix now recognizes the business Google connection. The existing inactive builder draft targets the private tracker's Cart Intake V2 sheet (sheetId 211), with all 12 required source mappings and E/M/O blank. Reopened the draft in a fresh tab and read back every mapping plus the collection trigger.

TESTED: Actual Apps Script read-only health check and gate-off dry run completed successfully on November 14, 2026, 17:48:06–17:48:08 America/Chicago. Zero catalog/approved/intake rows; quote, invoice-send and public-offer gates false; SAFE_HOLD / QUOTE_GATE_OFF; processed=0; externalCalls=0.

NOT TESTED: Wix CMS-to-Sheets runtime delivery. The automation remains an inactive builder draft; neither Test nor Activate was used. Saved configuration is not evidence of end-to-end delivery.

NOT CONNECTED: Customer order UI/secure intake, catalog synchronization, actual invoice API, and payment reconciliation. Adding products/prices alone will NOT complete the current code.

NOT PUBLISHED / RELEASED: No Wix page, automation activation, public order release, real invoice, customer email, payment, or wholesale order was initiated. Production gates remain OFF.

## Canonical resources
- Wix Classic site: cdec8df6-d518-4859-9f1e-f06bf5346d41
- Existing Supplements page: aeh8h, /supplements
- Master catalog: https://docs.google.com/spreadsheets/d/15swQj97kKIeEa1DWUyMFnwf_gIXgssswRoYLzv0lSOw/edit
- Private tracker: https://docs.google.com/spreadsheets/d/16hwNkp_gobTw2wHyb6N6_aTzmtOgIIPLPa5tIPdnxUY/edit
- Project documentation folder: https://drive.google.com/drive/folders/1jthRMAHOoockNm8hAVBK6mz4iaHbhNK8
- Original staging instructions: https://drive.google.com/file/d/1ILpKU_OBVTtDuEZfSU3srd-WZYn552su/view
- Source package: https://github.com/MatrixMassageBodywork-droid/matrix-wix-components/tree/42ff5b9a796c284abc5cbf600efb11cf52a0eca9/pages/wellness/supplements/order-integration/staging-v1
- Existing branch: review/supplements-no-api-2026-11-13
- Apps Script title: Matrix Supplement Orders STAGING v1
- Bound script ID: 1sBQUrkPpZaIlHeuNAMNdsiePX17HEgoGLZqMSOfcqpG_8ALTPgO2TaFG
- Script editor: https://script.google.com/u/0/home/projects/1sBQUrkPpZaIlHeuNAMNdsiePX17HEgoGLZqMSOfcqpG_8ALTPgO2TaFG/edit
- Wix builder draft name: Matrix Supplement Intake V2 — STAGING OFF
- Wix builder draft ID: e0b16020-55b5-46d0-a890-645d277b0c86
- Exact observed draft URL: https://manage.wix.com/dashboard/cdec8df6-d518-4859-9f1e-f06bf5346d41/triggers/create?withPayload=true&dataCapsuleId=1794699280178&referralInfo=creation+modal&draftId=e0b16020-55b5-46d0-a890-645d277b0c86
- This is a builder draft ID, not a published automation ID. Do not recreate it.

## Installation baseline, retained from V1.2
1. Existing private sheet opened through Extensions > Apps Script. The route created a new bound Untitled project with only Google's empty myFunction placeholder. No existing project source was overwritten.
2. Named the project and verified Triggers UI explicitly showed 0 triggers. None were added.
3. Installed Code.gs, Core.gs, appsscript.json. Reloaded editor and copied each full file through the UI. All three exactly matched fetched GitHub content after CRLF-to-LF normalization.
4. Manifest: America/Chicago; V8; STACKDRIVER; only https://www.googleapis.com/auth/spreadsheets OAuth scope. No credentials or script properties added. No deployment created.
5. Git blob identities of installed source:
   - Code.gs: 8c6950e6cd3c8d10acc8bbfb7ea0fb38e71be16b
   - Core.gs: c9102021a10e5d7a93f35b8ad62ef7c46644714e
   - appsscript.json: 1a08fe2912195674d4a4a4ec1e99ae98551f97b1
6. Initial run stopped at Google consent. That earlier block is now resolved; successful runtime results are recorded below.
7. Wix custom automation list had one unrelated abandoned_cart entry and no supplement draft before creation. API separately found 44 saved automations and no supplement match.
8. Created CMS Item added trigger using Matrix Supplement Order Intake V2 — PRIVATE STAGING. Added Update Google Sheets action. The Google connection was absent at that checkpoint; it is now connected and mapped below.
9. Clicked Save and reopened the exact draft URL in a second tab. Name, trigger, and action persisted; Save was disabled after reopening and Activate remained available. Reopened trigger and verified the exact collection filter. Never clicked Activate or Test.

## Read-only state and offline QA
The collection revision/count observations in this section are from the initial November 14 preflight. The Google sheet counts and gates were additionally verified by the live check below.
- Master/private native spreadsheets verified in place, America/Chicago. Original tabs preserved.
- Cart Intake V2 headers A1:O1 match the contract; sampled following rows empty.
- Master Orderable Items V2 placeholder still DRAFT / NOT_APPROVED / UNVERIFIED. Savings formulas present; no products or prices invented.
- Launch Gate V2 owner controls remain OFF.
- MatrixSupplementCatalogSnapshotV2 and MatrixSupplementOrderIntakeV2: revision 1, 0 items each including drafts.
- Legacy collection API reports insert/update/remove/read=ADMIN. New Data Permissions API reports CMS_EDITOR for all operations and specialPermissions=[].
- Accurate privacy wording is "private, no public access." Do not claim owner-exclusive access from these API results. No ACLs were changed.
- Reran source tests locally: 17 order-core tests PASS and 4 Apps Script safety tests PASS, 21 total. These are offline tests, not a live connection test.
- Actual public Supplements page UI was not independently tested in this pass. No page/editor mutation was performed.

## Exact transport contract verified from Wix trigger schema
Trigger appId: e593b0bd-b783-45b8-97c2-873d42aacaf4
Trigger key: domain_events_wix.data.v2.data_item-created
Required collection filter ID: e8c0bb9c-7b28-4ad0-8c13-32905ada6a07
Collection filter field: dataCollectionId
Collection ID: MatrixSupplementOrderIntakeV2
Action appId: 139ef4fa-c108-8f9a-c7be-d5f492a2c939
Action key: spreadsheets-action

The Google action requires the provider-owned accountId, spreadsheetId, sheetId and contentMapping (index, header, value). These were configured through Wix's authenticated UI. Account credentials and provider-owned IDs are not copied into documentation. Never fabricate accountId or grant public collection access.

| Column | Header | Actual trigger path |
|---|---|---|
| A | submission_id | data.submissionId |
| B | submitted_utc | data.createdUtc.$date |
| C | customer_name | data.customerName |
| D | email | data.customerEmail |
| E | phone_optional | leave blank |
| F | fulfillment_preference | data.fulfillment |
| G | items_json | data.cartJson |
| H | cycle_choice | data.cycleId |
| I | marketing_opt_in | data.marketingOptIn |
| J | terms_accepted | data.termsAccepted |
| K | source_url | data.sourcePage |
| L | intake_status | data.intakeStatus |
| M | order_id | leave blank |
| N | public_order_ref | data.orderRef |
| O | validation_note | leave blank |

## Authorization and inactive wiring verified in V1.3
- The owner reported consent complete. Apps Script ran successfully without another consent prompt. Wix displayed the connected business Google account, allowed private spreadsheet selection, and retained that connection after reopening.
- Selected existing Matrix Supplement Preorders — Private Order Tracker, Cart Intake V2. No sheet, collection, script project or automation was recreated.
- Saved all 12 mappings using these actual trigger UI labels: Submission ID, Received UTC, Customer Name, Customer Email, Fulfillment Preference, Item IDs And Quantities JSON, Cycle ID, Marketing Opt-In, Terms Accepted, Source Page, Intake Status, Order Reference. E/M/O intentionally remain blank.
- Mapping dialog Save and action Apply completed. Top-level Save displayed a technical error. Before retrying, reopened the same draft URL in a fresh tab: all 12 mappings, spreadsheet, tab and exact private collection trigger were persisted; top Save was disabled; Activate remained available. No redundant retry or recreation was performed.
- Draft remains inactive and no delivery event was emitted. No customer records or synthetic CMS records were added.

## Live read-only QA evidence
Added QA.gs containing matrixStagingEvidenceCheck. This wrapper calls the existing health and dry-run functions, refuses processing if any release/send/quote gate is on, and logs only counts, gate values and fixed safe dry-run fields. No external request, write or customer details were added. Source was committed before installation:
https://github.com/MatrixMassageBodywork-droid/matrix-wix-components/commit/a465e35ab0e138ecc9254d26adb5e3e16b6d720a

QA.gs was saved, editor reloaded and full UI clipboard read-back matched the committed source after newline normalization. Original Code.gs/Core.gs/manifest were unchanged. No triggers, deployments, properties or broader permissions were added.

Actual execution log, November 14, 2026, America/Chicago:
```text
17:48:06 Execution started
MATRIX_STAGING_HEALTH {"mode":"STAGING","catalogRows":0,"approvedCatalogRows":0,"intakeRows":0,"quoteGate":false,"invoiceSendGate":false,"publicOfferGate":false,"productionPaymentCallsInThisVersion":false}
MATRIX_STAGING_DRY_RUN {"state":"SAFE_HOLD","reason":"QUOTE_GATE_OFF","processed":0,"externalCalls":0}
17:48:08 Execution completed
```

Acceptance results: PASS for all gates off, empty eligible catalog/intake, zero processing/external calls and deliberate SAFE_HOLD. This checks the disabled system; it does not test enabled quotes or provider invoice/payment behavior.

Offline evidence: existing 21 tests previously passed (17 core + 4 Apps Script). The added QA wrapper additionally passed two local checks: output excludes unexpected private response fields, and an enabled gate aborts before calling the dry runner.

## Remaining work and acceptance criteria
1. DONE: Actual health and gate-off dry-run evidence obtained using the reviewed read-only QA wrapper.
2. DONE: Existing draft Google connection and mapping saved and independently reopened. Runtime transport remains NOT TESTED. No Test or Activate is authorized by this execution package.
3. Customer-facing multi-item order UI is NOT supplied as an executable UI in this package. supplementOrders.web.js is not installed; submission is hard disabled and still throws STAGING_CODE_REQUIRES_SECURITY_REVIEW if its top flag is changed. Anti-bot validation and duplicate submission handling remain unimplemented. Do not represent this as an installation-only gap.
4. Public catalog export is preview-only; real synchronization is unimplemented.
5. matrixBuildSandboxInvoiceSpecification returns only a fixture specification. It makes no provider request, and actual sandbox credentials, invoice lifecycle, payment/refund reconciliation and retry/idempotency integration remain unimplemented/untested.
6. No new paid services. No production credentials, real customer tests, scheduled triggers, emails, payments, supplier purchases, permission changes, or sitewide publishing.
7. The R8 Supplements redesign, SEO slug redirect and Infrared Sauna submenu remain separate pending work; no change in this pass.

## Stop conditions
Wrong target, conflicting existing script/draft, changed checkpoint, incomplete required mapping, consent expansion, subscription prompt, customer data, live transaction or unknown save result. Verify a save before retrying. Preserve existing live pages and unrelated automations.
