# MATRIX Supplement Order Staging V1 — Status

Date: 2026-11-14 America/Chicago

## Verified completed
- Reused both existing native, owner-only Google Sheets. Added 4 master tabs: Orderable Items V2; Bundle Components V2; Order Windows V2; Public Release V2. Added 7 private tracker tabs: Cart Intake V2; Orders V2; Order Lines V2; Invoice Queue V2; Batch SKUs V2; Launch Gate V2; QA Scenarios V2. Preserved every original tab and value.
- `Order Lines V2` includes the `Bundle component snapshot JSON` and `Bundle revision` fields for immutable supplier quantities.
- Both existing owner-only Wix CMS collections (new and empty) were created and verified with all four data permissions set to ADMIN.
- Read-only Wix inventory detected no existing supplements form, automation, or CMS collection prior to the two creations. No Wix page/site publication occurred.
- 17 local pure-order core tests passed, including mixed cart, tampered client prices, duplicates, unpaid/refund holds, late payment, and paid-only supplier quantities.

## Not yet connected or released
- Wix page customer-facing cart UI, Wix CMS Item Added→Google Sheets automation and Google account authorization, bound Apps Script deployment, sandbox invoice credentials and payment lifecycle all remain unconnected.
- No actual Fullscript SKUs/prices were entered; all production and public gates are OFF.
- No customer data, client emails, payments, invoices or supplier purchase occurred.
- No legacy forms/automations or unrelated existing business systems changed.
- Four offline Apps Script tests passed with a mocked spreadsheet: health check, quote dry-run safe hold, public release safe hold, and owner-entered dollar-to-cents validation.
- Wix CMS readback: both new collections have exactly zero records (`pagingMetadata.total=0`).
- Master `START HERE` now identifies V2 supplement product/catalog tabs as current. Private `Launch Gate V2` records CMS staging status and code QA with all release controls OFF.
- Source code and documentation are staging-only, and are not yet installed in the Google Apps Script or Wix Velo editors.
