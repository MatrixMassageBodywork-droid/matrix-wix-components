# MATRIX Supplements — V4 closed customer-order and catalog integration
## Source checkpoint, 2026-11-16 America/Chicago

Status: **SAVED IN GITHUB / SOURCE SYNTAX AND IN-MEMORY CHECKS PASS / NOT INSTALLED IN WIX / NOT PUBLISHED / CUSTOMER ORDERING OFF**.

### Authoritative starting point
- Canonical project folder: https://drive.google.com/drive/folders/1jthRMAHOoockNm8hAVBK6mz4iaHbhNK8
- Existing R9 Wix saved draft **1213**, receipt: https://github.com/MatrixMassageBodywork-droid/matrix-wix-components/blob/5fa4e85c59bb6df006a1529dd6b145bf7b694f73/pages/wellness/supplements/review-9-single-host/R9_DRAFT_1213_VERIFIED_2026-11-15.md
- Existing MasterInvoiceBridgeV4 **SAVED / VERIFIED / TESTED** with two Apps Script runtime checks: https://drive.google.com/file/d/1Mo3RVe4o_3sRw5kkerr-tPW-8u4tbf05/view
- Existing master sheet: https://docs.google.com/spreadsheets/d/15swQj97kKIeEa1DWUyMFnwf_gIXgssswRoYLzv0lSOw/edit
- Existing private tracker: https://docs.google.com/spreadsheets/d/16hwNkp_gobTw2wHyb6N6_aTzmtOgIIPLPa5tIPdnxUY/edit
- Existing Sandbox payment/refund receipt: https://drive.google.com/file/d/1vJ3MBCGOl-qVK01gOo7dgIJq_hshOgyO/view
- Existing Apps Script and V3 catalog sync files are installed. Do not reinstall or rerun the refunded fixture.

### Live read-only observations this phase
- Master 'Orderable Items V2' has **0 approved real products**. Row 6 is a blank SKU DRAFT template.
- Master 'Public Release V2' has 3 placeholder placements: LEFT, RIGHT, COLLECTIONS, all Wix sync OFF / public INACTIVE / approvals HOLD.
- Private Wix catalog `MatrixSupplementCatalogSnapshotV2`: 3 records, all TEST_ONLY_NEVER_PUBLIC, publicSlot NONE; IDs TEST-SUP-V3-VITC, TEST-SUP-V3-MAG, TEST-SUP-V3-BUNDLE.
- Private Wix intake `MatrixSupplementOrderIntakeV2`: 1 synthetic fixture TEST-STAGE2-TRANSPORT-001, status NEW_TEST.
- Both collections retain **ADMIN** permissions for read, insert, update and delete.
- Current existing intake schema contains 13 business fields; `quoteSnapshotJson` and `termsVersion` are **NOT PRESENT**. Do not enable public requests without a safe, explicitly specified additive schema/quote-journal migration.
- Wix draft automation e0b16020-55b5-46d0-a890-645d277b0c86 remains INACTIVE per current verified checkpoint. No recurring trigger installed.

### Newly saved additive source files
Frozen source snapshot commit: **cf9c09cf1e7a5fcc2a3744147e39216d9e0ce3fd**.
- `wix/supplementRequestsV4.web.js`: new backend module, reuses existing private CMS collections, strict server-side catalog quote, admin-only catalog/quote QA and visitor-closed request. Compile-time CUSTOMER_REQUESTS_ENABLED=false; approved terms and cycle blank; public method returns CLOSED before touching CMS.
- `wix/renderer-v4-qa.js`: derived from existing R9 1-host renderer; preserves R9 copy/style/sections while adding catalog-json and preview-mode attributes. Anonymous default CLOSED. Admin-owned DEMO_ONLY and PRIVATE_REVIEW modes allow read-only cart previews, with disabled customer submission.
- `wix/WIX_PAGE_CODE_V4_ADMIN_QA.js`: derived from existing R9 page code with original SEO HTML assignment preserved, adds Admin web-method retrieval and private attribute transfer. Does not call the submit web method.

These files were **not** installed in Wix by this Chat phase. The working draft, published site, CMS data, credentials, Script properties and triggers were not modified.

### Source-level QA executed using isolated V8 harness (NOT live Wix)
All 3 new source files parsed successfully after stripping import/export syntax for isolated parsing. New backend admin-only pure checks returned:
- state PASS; totalCents=4200; comparisonCents=6200; savingsCents=2000
- externalCalls=0; customerRecordsWritten=0; emailsSent=0; publicOrderingEnabled=false
- simulated catalog read: staged 0 / synthetic 3
- synthetic quote: $42.00 / $62.00 / $20.00, requestSaved=false
- anonymous status: orderingEnabled=false, items=[]
- public submit attempt returns CLOSED, requestSaved=false, invoiceCreated=false
- attempted client-supplied price field rejected with UNEXPECTED_INPUT_FIELD
- mock CMS write count: **0**

These simulated checks do not certify Wix web method permissions, ordinary Preview, native CAPTCHA, live form submission, catalog sync, real-world product pricing, customer email or production invoicing.

### Unresolved dependencies and explicit future gates
1. Native Wix Classic Editor installation and exact source readback; run admin/visitor methods in actual Wix runtime.
2. The V4 UI still displays a **disabled form preview**; real visitor CAPTCHA lifecycle, real data-entry UX, and client-to-backend write wiring are **not installed/tested**. Avoid interpreting the closed method as an operational customer form.
3. Master → Wix private catalog V3 gated sync requires approved real product rows and a separately approved narrowly scoped Wix site API key stored in Script Properties. Existing direct connector can inspect private catalog without new key, but cannot establish an automatic trigger. Do not create or enable a key/trigger in this phase.
4. Monthly feature slots must be projected from approved master placement/release records in a separate safely gated addition. Static feature cards remain placeholders until those approvals. No automatic featured-offer release is currently implemented.
5. Approved tax, fulfillment, order windows/deadlines, privacy terms and final retail prices; safe quote snapshot persistence/journaling in V4 intake; new generic real-order processor; production Square invoice creation and actual transactional email delivery verification.
6. Explicit owner release before any real order, mail, customer payment, publication or scheduled processing.

### Preservation
Do not change existing R9 desktop/mobile layout, SEO, logo, Fullscript links, shared header/footer or testimonials. Do not replace prior Wix backend modules, private CMS permissions, old Google scripts, trigger configuration, existing synthetic records or refunded Square fixture. Never insert synthetic records into approved public catalog or show test prices to visitors.
