# CURRENT — MATRIX Supplement Order System — Staging V1.2
Project: FACIAL WEB SEO PW. Verified November 14, 2026 (America/Chicago).

## Latest result
SAVED / VERIFIED: Installed the exact three Apps Script files from source commit 42ff5b9a796c284abc5cbf600efb11cf52a0eca9 into a newly created script bound to the existing private tracker. Created and saved one inactive Wix builder draft. Reopened both the script and the Wix draft to verify persistence.

BLOCKED: Google consent for the new Apps Script and Wix-to-Google account connection. No live health check completed, and no live dry-run or transport test completed.

NOT CONNECTED: Customer order UI/intake, Google Sheets action mapping, catalog synchronization, actual invoice API, and payment reconciliation. Adding products/prices alone will NOT complete the current code.

NOT PUBLISHED: No Wix page, automation activation, public order release, real invoice, customer email, payment, or wholesale order was initiated in this pass. Production gates remain OFF.

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

## Saved and verified this pass
1. Existing private sheet opened through Extensions > Apps Script. The route created a new bound Untitled project with only Google's empty myFunction placeholder. No existing project source was overwritten.
2. Named the project and verified Triggers UI explicitly showed 0 triggers. None were added.
3. Installed Code.gs, Core.gs, appsscript.json. Reloaded editor and copied each full file through the UI. All three exactly matched fetched GitHub content after CRLF-to-LF normalization.
4. Manifest: America/Chicago; V8; STACKDRIVER; only https://www.googleapis.com/auth/spreadsheets OAuth scope. No credentials or script properties added. No deployment created.
5. Git blob identities of installed source:
   - Code.gs: 8c6950e6cd3c8d10acc8bbfb7ea0fb38e71be16b
   - Core.gs: c9102021a10e5d7a93f35b8ad62ef7c46644714e
   - appsscript.json: 1a08fe2912195674d4a4a4ec1e99ae98551f97b1
6. Ran only matrixStagingHealthCheck as a first attempt; Google stopped before authorization with a consent prompt. No successful runtime result is claimed. matrixProcessIntakeDryRun has not been run in Google.
7. Wix custom automation list had one unrelated abandoned_cart entry and no supplement draft before creation. API separately found 44 saved automations and no supplement match.
8. Created CMS Item added trigger using Matrix Supplement Order Intake V2 — PRIVATE STAGING. Added Update Google Sheets action. Google connection is absent.
9. Clicked Save and reopened the exact draft URL in a second tab. Name, trigger, and action persisted; Save was disabled after reopening and Activate remained available. Reopened trigger and verified the exact collection filter. Never clicked Activate or Test.

## Read-only state and offline QA
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

The Google action requires the provider-owned accountId, spreadsheetId, sheetId and contentMapping (index, header, value). Configure with the UI. Never fabricate accountId or grant public collection access.

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

## Consent handoff
- Apps Script consent is open for the business Google account. Visible request: "See, edit, create, and delete all your Google Sheets spreadsheets." This is Google's spreadsheet scope, not a grant limited to the two sheets. The code itself targets only the two existing IDs and contains no write/send operations.
- Wix Google connection is at the business Google account chooser. Account selection did not advance during inspection. No consent was granted and no accountId obtained.
- The owner must review these new grants. Do not bypass consent, switch accounts, or introduce broader scopes.
- Keep the script and Wix draft. Continue from them after consent; do not rebuild.

## Remaining work and acceptance criteria
1. After owner grants script consent, run matrixStagingHealthCheck and matrixProcessIntakeDryRun manually. Record actual output; expected all quote/invoice/public gates false, zero approved catalog/intake rows, SAFE_HOLD / QUOTE_GATE_OFF and zero external calls/writes. Current functions return objects rather than log them: do not claim a generic "execution completed" message proves every expected value; obtain debugger or separately reviewed read-only QA logging evidence.
2. Finish existing Wix draft Google connection, select the exact private tracker and Cart Intake V2 (sheetId 211), map the 12 source values above and leave E/M/O blank, save inactive, reopen and read back every field. No Test or Activate yet.
3. Customer-facing multi-item order UI is NOT supplied as an executable UI in this package. supplementOrders.web.js is not installed; submission is hard disabled and still throws STAGING_CODE_REQUIRES_SECURITY_REVIEW if its top flag is changed. Anti-bot validation and duplicate submission handling remain unimplemented. Do not represent this as an installation-only gap.
4. Public catalog export is preview-only; real synchronization is unimplemented.
5. matrixBuildSandboxInvoiceSpecification returns only a fixture specification. It makes no provider request, and actual sandbox credentials, invoice lifecycle, payment/refund reconciliation and retry/idempotency integration remain unimplemented/untested.
6. No new paid services. No production credentials, real customer tests, scheduled triggers, emails, payments, supplier purchases, permission changes, or sitewide publishing.
7. The R8 Supplements redesign, SEO slug redirect and Infrared Sauna submenu remain separate pending work; no change in this pass.

## Stop conditions
Wrong target, conflicting existing script/draft, changed checkpoint, incomplete required mapping, consent expansion, subscription prompt, customer data, live transaction or unknown save result. Verify a save before retrying. Preserve existing live pages and unrelated automations.
