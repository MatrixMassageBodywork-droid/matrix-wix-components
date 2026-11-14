# Work-only deterministic deployment: Matrix Supplements order staging

## Source order and references
1. Read this implementation plan and the current canonical FACIAL WEB SEO PW Project Sources.
2. Check latest checkpoint at https://drive.google.com/drive/folders/1jthRMAHOoockNm8hAVBK6mz4iaHbhNK8; use newer verified owner-approved checkpoints if they supersede it.
3. Confirm the already-verified Wix site is `cdec8df6-d518-4859-9f1e-f06bf5346d41`. Use Wix Classic (NOT Harmony/Studio/Headless). Verify current saved editor state and unrelated pending drafts before any edit. Do NOT republish sitewide changes.
4. Verify existing private Google Sheet IDs in ARCHITECTURE.md; do NOT create duplicates.
5. Reopen the two empty CMS collections and verify `read/insert/update/remove=ADMIN`; do not loosen permissions. Preserve all other collections and automations.

## Existing staging resources
- Master Google Sheet — `Orderable Items V2` (`A5:P`; owner-entered USD prices converted to integer cents by `matrixUsdToCents_`), `Bundle Components V2` (`A5:J`), `Order Windows V2`, `Public Release V2`. All product pricing/status placeholders remain unapproved.
- Private Sheet — `Cart Intake V2` (`A1:O` first-row mapping), `Orders V2` (`A5:X`), `Order Lines V2` (`A5:P`), `Invoice Queue V2` (`A5:M`), `Batch SKUs V2`, `Launch Gate V2`, `QA Scenarios V2`.
- Wix CMS IDs — `MatrixSupplementCatalogSnapshotV2`, `MatrixSupplementOrderIntakeV2`.
- Existing page is `/supplements`; R8 rewrite remains a separate NOT PUBLISHED design, do not inadvertently publish it or change the SEO slug.

## Operation sequence and save checkpoints
1. **READ FIRST:** Inspect Google Sheet formula/validation readback, Wix collections and all existing Wix Automations. Search exact identifiers; do not create another similarly named form, automation or collection. Capture pre-state and pending public Wix drafts.
2. **Apps Script:** Open the existing *private preorder tracker* Google Sheet → Extensions → Apps Script. If any script/project already exists, inspect files/triggers and STOP before overwrite; return evidence for a targeted merge. Otherwise create/rename a bound Apps Script project `Matrix Supplement Orders STAGING v1`, add exact `Code.gs` and `Core.gs` supplied with package, and apply `appsscript.json` with timezone America/Chicago and only spreadsheet OAuth scope. Do not add real credentials. SAVE; reopen both code files and verify content and function list. Do NOT create/install any time-driven triggers yet; staging functions are manual-only until their no-op behavior is proven. Run only explicitly named health-check/dry-run functions.
3. **Safe code QA:** Run `matrixStagingHealthCheck()` from Apps Script. Authorize the minimal spreadsheet scopes using the connected owner's account; do not share credentials. Expected: both sheets readable, all send/public gates OFF, invoice send false, no customer records, no external calls. Run `matrixProcessIntakeDryRun()`; expected `SAFE_HOLD`, `QUOTE_GATE_OFF`, zero writes. Capture execution logs without emails/names.
4. **Wix CMS:** Do not write real records. Read both ADMIN-only collections again. If the current Classic page already contains an intended order UI integration, inspect and compare it to the supplied package before proceeding. Do not duplicate or replace published components. If no dedicated UI exists, prepare a saved *unpublished draft* only using the current page's existing code merge rules; the supplied `supplementOrders.web.js` has explicit `ORDER_ACCEPTANCE_ENABLED=false` and is NOT ready to receive customer PII. Do not activate customer form submission.
5. **Wix integration draft:** In Dashboard → Automations, use CMS `Item added` trigger for collection `MatrixSupplementOrderIntakeV2`; add `Update Google Sheets`, select the existing private preorder tracker in the existing Google account, and map by the **exact column-to-CMS key contract below** into `Cart Intake V2`. No other Google Sheet or collection may be selected. Build the action as an **unpublished/inactive draft**, if Wix supports saving it in that state. If it would turn on immediately, STOP without saving/activating and report that constraint. If any REQUIRED source key cannot be mapped, STOP and report the UI schema; do not improvise or fill columns with incorrect substitutes. Verify draft/inactive state by readback. Note Google’s integration may request access; owner must explicitly grant consent in UI without sharing credentials.

   | Destination column | Private Sheet header | CMS source field | Required |
   | --- | --- | --- | --- |
   | A | `submission_id` | `submissionId` | YES |
   | B | `submitted_utc` | `createdUtc` | YES |
   | C | `customer_name` | `customerName` | YES |
   | D | `email` | `customerEmail` | YES |
   | E | `phone_optional` | **leave blank** | NO — source has no phone field |
   | F | `fulfillment_preference` | `fulfillment` | YES |
   | G | `items_json` | `cartJson` | YES |
   | H | `cycle_choice` | `cycleId` | YES |
   | I | `marketing_opt_in` | `marketingOptIn` | YES |
   | J | `terms_accepted` | `termsAccepted` | YES |
   | K | `source_url` | `sourcePage` | YES |
   | L | `intake_status` | `intakeStatus` | YES |
   | M | `order_id` | **leave blank** | NO — generated later by private order backend |
   | N | `public_order_ref` | `orderRef` | YES |
   | O | `validation_note` | **leave blank** | NO — generated later by private backend |

   The Wix CMS must not grant public CRUD access. No test request with a real customer identity may be submitted. Do not create synthetic CMS items if creating them would activate the automation or write into a real subscriber list.
6. **Invoice Sandbox prerequisites:** In the existing Square developer account, look only for an existing relevant application first; do not create another if one exists. Obtain Sandbox-only IDs and token through its own UI and store in authorized private script properties IF AND ONLY IF required for a later owner-approved sandbox payment test. Never paste a token into chat, Sheets, Wix pages, GitHub or screenshots. The supplied staging script contains NO calls to any invoice API, so do not enable invoice sending or create invoice resources now.
7. **Pre-launch QA:** Run `node tests/order-core.test.js` (17 pass expected) and `node tests/apps-script-off.test.js` (4 pass expected) locally. Confirm current live customer page is unchanged; both feature CTAs remain disabled and existing dispensary links unaffected. Confirm Wix CMS collections remain empty, no customer records, no automated emails, no invoices or wholesale orders. Save and re-read each checkpoint.

## Stop conditions
Wrong Wix site/editor; an existing conflicting form/automation/script; unrecognized code or pending draft; a sheet header/ID mismatch; authorization or subscription prompt beyond current plan; any unexpected data/customer/credential; unsafe permission exposure; missing key field mapping; partial save; attempted real email, charge, preorder or supplier purchase. Preserve state, return actual evidence, then request a targeted correction in Chat. Never try broad restoration/rebuild.

## Required receipt
Provide actual Wix site ID, CMS collection IDs and permissions, exact Google Sheet URLs/tabs, Apps Script script ID / bound file title (if created), saved code file readback/hash, existing Wix automation draft ID (if available), Google account connection state (never credentials), dry-run output, 17 core tests + 4 mock Apps Script test receipt, zero real customer/payment/communication proof, and precise blocked step with screenshots or screen captures where available. Distinguish SAVED / VERIFIED / TESTED / NOT CONNECTED / NOT PUBLISHED / BLOCKED. Do not report full connection or go-live until real end-to-end tests later pass.
