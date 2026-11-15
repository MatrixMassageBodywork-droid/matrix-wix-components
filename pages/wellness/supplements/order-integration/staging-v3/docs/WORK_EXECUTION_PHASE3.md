# Work-only execution: Matrix Supplements Phase 3, TEST MODE

**No research/design/diagnosis in Work. Chat has completed source architecture, validation and QA.** Perform only the following authenticated editor operations with exact readback. If the observed state differs, stop safely with evidence rather than choosing new architecture or improvising.

## Source and scope
- Latest previous verified checkpoint: `https://drive.google.com/file/d/1vJ3MBCGOl-qVK01gOo7dgIJq_hshOgyO/view`, plus latest Phase 3 CURRENT checkpoint in canonical folder.
- Matrix Supplements source branch: `review/supplements-no-api-2026-11-13`. Install Phase 3 files from the immutable source commit recorded in the new CURRENT checkpoint, **not** from a mutable branch HEAD, prior V1/V2 source or the R8 standalone preview HTML.
- Wix Classic site `cdec8df6-d518-4859-9f1e-f06bf5346d41`; page `aeh8h`; existing public `/supplements`. Preserve published page and proposed future `/supplements-vitamins-salem-wi` migration.
- Script project `https://script.google.com/u/0/home/projects/1sBQUrkPpZaIlHeuNAMNdsiePX17HEgoGLZqMSOfcqpG_8ALTPgO2TaFG/edit` bound to private tracker `16hwNkp_gobTw2wHyb6N6_aTzmtOgIIPLPa5tIPdnxUY`.
- Wix CMS `MatrixSupplementCatalogSnapshotV2` admin-only, containing TEST-only IDs `TEST-SUP-V3-VITC`, `TEST-SUP-V3-MAG`, `TEST-SUP-V3-BUNDLE`; expected readback is exactly 3, all `TEST_ONLY_NEVER_PUBLIC`/`publicSlot=NONE`.
- Existing Wix private intake `MatrixSupplementOrderIntakeV2`, V2 backend `supplementStaging.web.js`, inactive automation draft `e0b16020-55b5-46d0-a890-645d277b0c86` and existing refund fixture remain unchanged.

## Hard do-not-touch boundaries
No Wix Publish, no site menu, slug, redirect, header/footer, SEO schema, existing R8 page source or six dispensary links; no Wix permissions, APIs keys or automation activation; no trigger installation; no real customer submission; no production invoice, email, payment, refund or wholesale order. Do not rerun or edit the existing $42 paid/refunded sandbox fixture. Do not rotate credentials, reinstall or recreate previous code/files/records. No client health information. Do not create paid subscriptions.

## Checkpoint 0 — verify before writing
1. Read latest canonical project checkpoint and current GitHub Phase 3 commit. Confirm source file names/digests.
2. In Google Apps Script open project above, list existing scripts and confirm V2 files exist and are saved. Read existing `RuntimeV2.gs`, `SandboxLifecycleV2.gs` and current manifest only; preserve all code and settings.
3. In Wix Classic Editor open the exact site and verify current draft/publication state. Note any unrelated unpublished changes. Do not publish or alter the Supplements page.
4. Read private Wix CMS snapshot via the existing connected API or dashboard. Confirm 3 test-only records and admin-only permissions; stop if any real/unknown catalog record appears in that collection.

## Checkpoint 1 — install the two additive Apps Script files
1. If `CatalogRulesV3.gs` or `CatalogSyncV3.gs` already exists, **read it back and compare exact source first**; do not duplicate it. If exact, skip. If different, stop with diff evidence.
2. Create `CatalogRulesV3.gs` from the GitHub Phase 3 path `catalog-sync/CatalogRulesV3.gs` exactly, with the existing manifest unchanged. Save. Reopen and copy back full source; confirm normalized LF/CRLF hash matches.
3. Create `CatalogSyncV3.gs` exactly from GitHub path `catalog-sync/CatalogSyncV3.gs`. Save and reread; confirm hash. Preserve Script Properties, installed scopes, files and triggers.
4. Run `matrixCatalogV3SyntheticChecks()` once. Expected `items:3`, `totalCents:4200`, `savingsCents:2000`, `externalCalls:0`, `invoices:0`, `publicReleaseEnabled:false`.
5. Run `matrixCatalogV3DryRun()` once. With unchanged master data expect `approvedForPrivateStaging:0`, `externalCalls:0`, and `publicReleaseEnabled:false`. If real items are approved in the meantime, record count without changing or synchronizing them.
6. Check `MATRIX_CATALOG_V3_PUSH_ENABLED` is absent or not equal to `ALLOW_PRIVATE_ONLY`. Run `matrixCatalogV3SyncPrivate()` once **only under the default OFF state**; expected `{state:'OFF',externalCalls:0}`. If already ON, do not call; stop and return observed configuration (not the credential value).
7. Checkpoint receipt: exact saved files/hashes, execution timestamps and outputs. No code/permission changes outside those two files.

## Checkpoint 2 — install the isolated, read-only Velo test module
1. Open Wix Editor → Dev Mode / Code Files → Backend. Confirm `supplementStaging.web.js` exists unchanged. If `supplementCatalogV3.web.js` already exists, compare its full content and skip if exact; stop if different.
2. Create `supplementCatalogV3.web.js` with source `wix/supplementCatalogV3.web.js` exactly. Save, close, reopen and compare source. Do not replace the V2 backend file.
3. In the backend test console using an admin context call `matrixAdminCatalogPreviewV3()`; expected `environment:'TEST_ONLY'`, `publicEnabled:false`, 3 TEST-only items and no customer data.
4. Call `matrixAdminQuotePreviewV3([{itemId:'TEST-PRODUCT-A',quantity:2},{itemId:'TEST-BUNDLE-AB',quantity:1}])`; expected `$42.00` (`4200` cents), everyday comparison `$62.00`, savings `$20.00`, `previewOnly:true`, `invoiceCreated:false`, `requestSaved:false`.
5. Call `matrixMonthlyCatalogStatusV3()` in visitor context; expected `orderingEnabled:false`, empty items, `COMING_SOON`.
6. Confirm `MatrixSupplementOrderIntakeV2` and invoice queue row count unchanged. Do not call any payment or refund functions.

## Checkpoint 3 — cart visual proof / page dependency
1. This Phase 3 standalone local demo has been tested in Chat at widths 320/375/390/700/1280/1440/1920. Optional: open the saved review HTML from the accompanying Drive archive. Confirm plus/minus, combined $42 sample quote, disabled Submit and no customer-data capture.
2. The actual R8 public page design is **not installed per latest verified checkpoint**. Unless Wix has a now-verified, explicitly authorized R8 draft installation, do **not** insert or publish this cart inside the existing live `/supplements` page. Save the custom-element source `ui/monthly-order-selector.js` in GitHub only and return `NATIVE_CART_INSERTION_PENDING_R8`.
3. If current native page is confirmed to contain the exact approved R8 source and no conflicting concurrent changes, in Wix Editor add the new custom element as a separate **saved draft only** immediately after the two Monthly Savings Feature cards. Set ID `matrixMonthlyOrderV3`, tag `matrix-monthly-order-selector`, source to a verified immutable pinned GitHub CDN URL for `ui/monthly-order-selector.js`. Do not use a mutable source. Merge `wix/VELO_PAGE_MERGE_CANDIDATE.js` with existing page Velo without replacing unrelated handlers or SEO; it forces `preview-mode:CLOSED` and empty catalog. Save, reopen, read back tag/source/ID and ensure customer controls remain disabled. **No Publish**.
4. Do not place synthetic catalog data in visitor page code or set `preview-mode:DEMO_ONLY` on any live page.

## Checkpoint 4 — connected data / future sync authorization
1. The private Wix catalog connector has already been live-tested with three synthetic TEST-only records and private readback; do not reinsert them.
2. **Do not create or expand a Wix API key or alter its permissions without explicit owner authorization.** Exact future allowed scopes: the selected Wix site, CMS Data Items Read/Write only. Store in the existing Apps Script's Script Properties, never Google Sheets/GitHub/logs/browser snippets. If not already approved, leave scheduled Sheet→Wix sync OFF and report `NEEDS_OWNER_AUTHORIZATION_FOR_API_KEY`.
3. Never enable production invoice sending, trigger installs or public cart submission in this phase. Mark each requirement separate (sheets present vs transport tested vs deployed vs published).

## Acceptance and stop conditions
PASS iff: two new scripts saved and reread exactly; dry run and synthetic QA return expected; new Wix backend file saved/reloaded, admin and visitor methods return stated closed results; all preexisting script files/collections/automation flags unchanged; no real customer record/invoice/email/payment/wholesale operation; a dated evidence receipt is saved to the canonical QA folder. A failed save must be read back before retry. Unexpected permissions, new site identity, source changes, active public order paths, malformed real data or pending release conflict → STOP affected operation with screenshots/source snippets, no improvisation.

## Required receipt fields
`siteId`, `pageId`, `scriptProjectId`, `sourceCommit`, `sourceSha256`, `scriptFileHashes`, `wixBackendFileHash`, `catalogFixtureIds`, `adminPreviewCounts`, `testQuoteCents`, `dryRunApprovedCount`, `publicOrderingEnabled`, `automationActive`, `productionEmailsSent`, `invoiceCalls`, `nativePageSave`, `publicPublished`, `errors`, `evidenceLinks`, timestamp America/Chicago. Use `SAVED / VERIFIED / TESTED / NOT TESTED / NOT PUBLISHED` separately. Do not mark anything released without a public readback.
