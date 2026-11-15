# Matrix Supplements — Phase 3 catalog + mixed-cart architecture

Date: November 14, 2026, America/Chicago. Project: FACIAL WEB SEO PW.

## Authoritative continuity
- Existing page: Wix Classic site `cdec8df6-d518-4859-9f1e-f06bf5346d41`, Supplements page `aeh8h`, published path `/supplements`. R8 approved draft design at GitHub commit `28c2eaa357db7c698290f4d0f8cbea0fb12919e6`; **not installed/published** by this phase.
- Existing private Wix order fixture backend `backend/supplementStaging.web.js`, installed and verified in draft; do not replace.
- Existing tracker-bound Apps Script `1sBQUrkPpZaIlHeuNAMNdsiePX17HEgoGLZqMSOfcqpG_8ALTPgO2TaFG`; keep existing `Code.gs`, `Core.gs`, `QA.gs`, `RuntimeV2.gs`, `StageV2QA.gs`, `SandboxLifecycleV2.gs` and their known existing script properties untouched.
- Master Google Sheet `15swQj97kKIeEa1DWUyMFnwf_gIXgssswRoYLzv0lSOw` and private tracker `16hwNkp_gobTw2wHyb6N6_aTzmtOgIIPLPa5tIPdnxUY` are authoritative. No new master Sheets.
- Sandbox payment/refund checkpoint: `https://drive.google.com/file/d/1vJ3MBCGOl-qVK01gOo7dgIJq_hshOgyO/view`. Do not create, repay or refund that invoice again.

## Flow and data contract

`Master Sheet (owner editable)` → `CatalogRulesV3.gs validates approved product rows + bundle component rows + public release schema` → `CatalogSyncV3.gs dry-run (safe)` → **future separately authorized private upsert** into existing owner-only `MatrixSupplementCatalogSnapshotV2` → `Wix Admin-only test catalog read/quote` → `Monthly selector custom element` → **future secure customer request + CAPTCHA** → existing owner-only `MatrixSupplementOrderIntakeV2` → existing inactive Wix-to-Google-Sheets automation draft → existing private tracker `Cart Intake V2`, `Orders V2`, `Order Lines V2`, `Invoice Queue V2` → existing provider sandbox/production invoice process (production OFF) → payment + refund reconciliation → owner-only wholesale batch.

The existing Wix automation's synthetic transport and sandbox invoice lifecycle were verified in the preceding phase. No live customer sender or production payment implementation is added in Phase 3.

### Sheet ranges and fields
- Master `Orderable Items V2!A5:P`: header row 5, data from row 6. A stable SKU; B `PRODUCT` or `BUNDLE`; C/D/E public name/variant/description; F/G everyday/monthly prices **in USD**; J offer revision; K must equal `APPROVED`; N must equal `REVIEWED`; O must equal `APPROVED`. H/I are display formulas, **not** invoice sources.
- Master `Bundle Components V2!A5:J`: A bundle ID; B revision equal to parent J; C product SKU; D integer units per bundle; H `APPROVED`. No automatic substitutions or unknown component IDs.
- Master `Public Release V2!A5:J`: remains `Wix sync=OFF`, public `INACTIVE`; this Phase 3 package **never changes live release state**.
- Private staging collection `MatrixSupplementCatalogSnapshotV2` remains ADMIN READ/INSERT/UPDATE/REMOVE. Three recorded test fixtures are `TEST_ONLY_NEVER_PUBLIC`; no current real approved rows.
- Customer intake `MatrixSupplementOrderIntakeV2` is owner-only. Current existing Wix→Sheets automation draft `e0b16020-55b5-46d0-a890-645d277b0c86` is **inactive**; do not create duplicates.

### Price and integrity model
- Amounts are parsed as decimal USD with zero to two decimal places and converted to exact integer cents. No accepting client-supplied totals, tax or unit prices.
- A monthly eligible SKU requires per-item owner, catalog and manufacturer-resale review approval; a bundle additionally requires exact approved components.
- Duplicate item IDs, invalid prices, invalid quantity, missing bundle parts, invalid release versions and unreviewed records fail closed.
- UI supplies item IDs and quantities only. Server recomputes totals from a pinned approved catalog version before any future order acceptance. A locked quote and invoice-line snapshot are never rewritten when pricing changes.
- Overdue/unpaid/refunded/disputed requests do not contribute to purchasing. Only the owner manually places supplier orders. Existing V2 refund precedence and lifecycle are preserved.
- No customer health history, diagnoses, medical conditions, payment card numbers, wholesale costs or credentials are stored in the public catalog.
- A production web method requires server verification of an anti-bot token, per-session throttles, consent, and a strict idempotency key **before** any submission gate can be enabled. The current Phase 3 module has *no* public write path.

### Outbound access
A future recurring direct Google Apps Script → Wix private CMS synchronization can use the existing approved `script.external_request` OAuth scope plus a narrowly scoped Wix API key securely stored in Script Properties. The owner must explicitly approve creating or modifying an API key/permissions; this project does not create one or set a recurring trigger. `matrixCatalogV3SyncPrivate()` defaults OFF and is restricted to approved private staging rows. Sandbox fixture transfer is already verified directly through the connected Wix API (3/3 inserted; 3/3 read back).

### Customer-facing design
- Keep R8 logo, teal-water hero, both Monthly Savings Feature slots and the six existing dispensary destination links unchanged.
- Add a single independent custom element `matrix-monthly-order-selector` to the Monthly Savings Event section **only in a verified saved Wix draft**; the local proof uses three synthetic `TEST ONLY` items.
- Customer language: “Choose a curated bundle, individual supplements, or both. When the event opens, submit your request and your invoice will be emailed.” No supplier or payment processor brand names.
- The prototype has working quantity controls and order/savings preview; customer name/email/fulfillment/consent fields are disabled previews and Submit is disabled. `matrixMonthlyCatalogStatusV3()` always reports `orderingEnabled:false`.

## State distinctions
- SAVED: the Phase 3 source files and reference proof exist locally and are committed to GitHub (when commit/readback succeeds).
- VERIFIED: 3 private Wix synthetic fixtures read back and matched, with $42 monthly test and $20 synthetic savings.
- TESTED: 28 unit/safety cases and seven Chromium viewport checks plus interactive cart assertion.
- NOT INSTALLED: new Apps Script and Velo module are not yet installed through Wix Classic / script editor.
- NOT CONNECTED: automatic Google Sheets→Wix upsert, actual user form submission, production invoice delivery.
- NOT PUBLISHED: original Supplements page and R8 candidate are untouched by this phase.
