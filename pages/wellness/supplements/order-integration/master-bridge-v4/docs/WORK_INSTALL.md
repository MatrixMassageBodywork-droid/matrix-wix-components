# WORK — Install one master-catalog invoice bridge; keep the working page untouched

**Scope:** Add one file to the existing tracker-bound Apps Script project; save/read back and run two non-mutating checks. No Wix work, new platform, redesign, customer invoice, publication, trigger or API credential change.

## Read first
- Current audit/README in this package.
- Existing invoice checkpoint: https://drive.google.com/file/d/1vJ3MBCGOl-qVK01gOo7dgIJq_hshOgyO/view
- Existing R9 draft 1213 receipt in `pages/wellness/supplements/review-9-single-host/R9_DRAFT_1213_VERIFIED_2026-11-15.md`; preserve it and any newer saved site state.
- Exact new source: `src/MasterInvoiceBridgeV4.gs` in this package. SHA-256 **2ae1dafdf2d1446588dc497943d76cd84923dd3ad69b9ca39162421c6046157e**, **14040 UTF-8 bytes**. Do not derive code from this prompt.

## Exact execution

1. Open the existing Apps Script project:
   https://script.google.com/u/0/home/projects/1sBQUrkPpZaIlHeuNAMNdsiePX17HEgoGLZqMSOfcqpG_8ALTPgO2TaFG/edit
   Confirm it is the existing supplement tracker project bound to spreadsheet `16hwNkp_gobTw2wHyb6N6_aTzmtOgIIPLPa5tIPdnxUY`. Do not create another project.
2. Verify installed files include Core.gs, Code.gs, RuntimeV2.gs, SandboxLifecycleV2.gs, CatalogRulesV3.gs and CatalogSyncV3.gs. Preserve them, the manifest, scopes, properties and triggers. Check only the two new property names `MATRIX_MASTER_BRIDGE_V4_ENABLED` and `MATRIX_MASTER_BRIDGE_V4_SUBMISSION_ID`: expected absent or disabled/empty. Do not copy credentials into evidence. If either indicates prior active V4 work, stop for continuity reconciliation instead of changing it.
3. Add one Script file named **MasterInvoiceBridgeV4** with the complete provided source. If already present and identical, skip creation. If present but different, capture its hash/diff and stop that write. Do not overwrite a newer implementation.
4. Save, reload the editor, reopen the file, copy back its full content and compare SHA-256 after normalizing CRLF to LF. Expected hash above. Record SAVED and VERIFIED only when exact. If saving times out, inspect the actual saved file before retrying.
5. Run **matrixMasterBridgeV4SyntheticChecks** once. Expected logged result:
   `state=PASS, items=3, orderLines=2, totalCents=4200, comparisonCents=6200, savingsCents=2000, externalCalls=0, sheetsWritten=0, invoicesCreated=0, emailsSent=0, productionEnabled=false`.
   This function uses in-memory rows only; no product needs entering in the master sheet.
6. Run **matrixMasterBridgeV4DryRun** once. With the current empty master, expect:
   `mode=READ_ONLY, approvedMasterItems=0, selectedRequestPresent=false, bridgeEnabled=false, productionEnabled=false, emailsEnabled=false, externalCalls=0, sheetsWritten=0`.
   If genuine approved catalog rows were entered meanwhile, report the returned count without deleting, replacing, approving or sending them. The dry run reads only.
7. Do **not** run `matrixMasterBridgeV4StageSelected` or `matrixMasterBridgeV4CreateSelectedSandboxDraft` during this installation. Do not set the enable properties, activate the Wix automation, add a recurring trigger, send email, publish an invoice, run a payment/refund, or rerun the old $42 fixture.
8. Reopen the new file once more and verify its hash. Confirm no other script file, manifest, property or trigger changed. Return the saved file hash, exact execution outputs/timestamps, and evidence that no production or website changes occurred.

## Stop conditions
Wrong project identity, different existing V4 code, missing dependency, unexplained concurrent change, save/readback failure, new consent/permission requirement, unexpected nonzero writes/external calls or open gates: stop the affected action with the exact evidence. Do not change permissions or rebuild any existing system to get a PASS.

## Receipt
Save a dated receipt in the existing FACIAL WEB SEO PW canonical project folder, with script project ID, source hash, saved/reloaded verification, both function results, timestamp America/Chicago, unchanged prior modules/gates and **NOT PUBLISHED / CUSTOMER ORDERING OFF**. Mark these new functions TESTED only after actual runtime results. A successful installation does not certify the future public form, recurring processing, production invoicing or customer email delivery.
