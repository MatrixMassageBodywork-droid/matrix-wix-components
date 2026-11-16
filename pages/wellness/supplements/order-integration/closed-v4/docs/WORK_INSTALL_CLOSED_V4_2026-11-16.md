# WORK — MATRIX SUPPLEMENTS V4: install closed catalog/ordering adapters (NO PUBLIC RELEASE)

**Execute live Wix Classic Editor installation only.** Chat has completed the new additive source and isolated QA. Do not research, rewrite code, choose another architecture, troubleshoot broadly or activate customer-facing commerce. New source is frozen at commit **cf9c09cf1e7a5fcc2a3744147e39216d9e0ce3fd**. If Wix editor state differs materially from the checkpoint, stop with precise evidence.

## Read-first / identity
1. Canonical project folder: https://drive.google.com/drive/folders/1jthRMAHOoockNm8hAVBK6mz4iaHbhNK8 .
2. Verified Wix R9 checkpoint: https://github.com/MatrixMassageBodywork-droid/matrix-wix-components/blob/5fa4e85c59bb6df006a1529dd6b145bf7b694f73/pages/wellness/supplements/review-9-single-host/R9_DRAFT_1213_VERIFIED_2026-11-15.md .
3. Verified V4 script installation: https://drive.google.com/file/d/1Mo3RVe4o_3sRw5kkerr-tPW-8u4tbf05/view .
4. Chat's current source/safety review: https://github.com/MatrixMassageBodywork-droid/matrix-wix-components/blob/aeaa490170e0e374f052dc1dc9cc86a83f166549/pages/wellness/supplements/order-integration/closed-v4/docs/CURRENT_CLOSED_QA_2026-11-16.md .
5. Current site: Wix Classic Matrix Massage & Bodywork ID `cdec8df6-d518-4859-9f1e-f06bf5346d41`, Supplements page ID `aeh8h`, route `/supplements`. Last Wix SAVED draft **1213**, not published, latest verified Nov 15.
6. Existing sole custom host component `comp-mwhxvav5`, Velo ID `matrixSupplementsPageV1`, tag `matrix-supplements-page`, one host in first body section before existing testimonials; parent `comp-mwhxubu7`.
7. Existing Server URL (known working; record and preserve for recovery):
`https://cdn.jsdelivr.net/gh/MatrixMassageBodywork-droid/matrix-wix-components@5bdcbe560b11e4b5573193f9517c80bcbeed8cf6/pages/wellness/supplements/review-9-single-host/renderer.js`.
8. Existing R9 page Velo source SHA-256 `43d0c664a1cf751fb4cb44a19d11ec0ae600cd9e83970cdc428031c184e0a185`, LF-normalized, 20,539 UTF-8 bytes. Preserve all SEO markup.

## Immutable new source
- New backend file `supplementRequestsV4.web.js`:
`https://github.com/MatrixMassageBodywork-droid/matrix-wix-components/blob/cf9c09cf1e7a5fcc2a3744147e39216d9e0ce3fd/pages/wellness/supplements/order-integration/closed-v4/wix/supplementRequestsV4.web.js`.
- New renderer:
`https://github.com/MatrixMassageBodywork-droid/matrix-wix-components/blob/cf9c09cf1e7a5fcc2a3744147e39216d9e0ce3fd/pages/wellness/supplements/order-integration/closed-v4/wix/renderer-v4-qa.js`.
- Renderer immutable Server URL:
`https://cdn.jsdelivr.net/gh/MatrixMassageBodywork-droid/matrix-wix-components@cf9c09cf1e7a5fcc2a3744147e39216d9e0ce3fd/pages/wellness/supplements/order-integration/closed-v4/wix/renderer-v4-qa.js`.
- Approved candidate R9 page Velo replacement:
`https://github.com/MatrixMassageBodywork-droid/matrix-wix-components/blob/cf9c09cf1e7a5fcc2a3744147e39216d9e0ce3fd/pages/wellness/supplements/order-integration/closed-v4/wix/WIX_PAGE_CODE_V4_ADMIN_QA.js`.
Do not derive, approximate or manually rewrite source. If a source URL is inaccessible, STOP that install; do not switch host schemes, create a new host, use an alternate CDN, or copy a truncated file.

## Hard boundaries
- **NO PUBLISH, NO TEST SITE publication, NO Wix automation activation, NO trigger, NO key, NO permission/consent change, NO production email, invoice, payment, refund, wholesale order.**
- Never enable CUSTOMER_REQUESTS_ENABLED or populate approved terms/cycle in the code; remain hard OFF. Never insert fake approved real products or public prices.
- Do not change Wix site menu, page slug, redirection, SEO metadata/schema, canonical/indexing, header/footer, logo, water visuals, six Fullscript dispensary links, testimonials, published site or the three previously deleted legacy sections. Do not add a second custom host.
- Preserve existing backend `supplementStaging.web.js`, `supplementCatalogV3.web.js`, existing Apps Script files, V4 bridge, manifest/properties, private Wix collection fields/permissions and all 4 prior synthetic order fixtures (3 tracker and 1 Wix intake). Do not touch prior $42 paid/refunded Square fixture. No client personal data.
- Do not add `quoteSnapshotJson`/`termsVersion` to private CMS during this closed QA; those are known **missing schema fields** to specify/test separately before real order launch.

## Checkpoint 0 — read-only verify
1. Open Wix Classic Editor exact site and page; inspect Site History; confirm latest saved draft 1213 (or newer saved only if documented and reconciled), and current source still the old pinned R9 URL. Do not restore any history item.
2. In code panel read existing page Velo; normalize CRLF to LF and verify baseline hash; if different, stop and capture source/diff rather than overwrite.
3. Confirm old V2 and V3 web backend modules exist and record exact file names, do not edit them.
4. The latest Chat live connected API read already established Wix catalog 3 TEST-only items, intake 1 synthetic, both ADMIN-only. Do not repeat those API reads in Work. If the editor itself shows unexpected live records or active ordering, stop with evidence.
5. Record before-change saved revision, exact host ID/tag/URL, page-code hash and all protecting boundaries, then begin.

## Checkpoint 1 — additive V4 Wix backend
1. Editor → Code Files → Backend. If `supplementRequestsV4.web.js` exists, read and compare exact with immutable source; if identical, skip write; if different, STOP. Otherwise create **one** file named `supplementRequestsV4.web.js` with exact source above; no other backend file changes.
2. SAVE, reload editor, reopen new file and copy full content back. Compare its complete source to immutable GitHub file, normalize CRLF to LF. Do not call it VERIFIED unless exact.
3. Through the authenticated Wix backend test method, run `matrixAdminSyntheticChecksV4()`. EXPECT `state=PASS,totalCents=4200,comparisonCents=6200,savingsCents=2000,customerRecordsWritten=0,publicOrderingEnabled=false`.
4. Run `matrixAdminCatalogPreviewV4()`. EXPECT `staged.length=0,synthetic.length=3,orderingEnabled=false`.
5. Run `matrixAdminQuotePreviewV4([{itemId:'TEST-PRODUCT-A',quantity:2},{itemId:'TEST-BUNDLE-AB',quantity:1}],'TEST')`. EXPECT `totalCents=4200,comparisonCents=6200,savingsCents=2000,previewOnly=true,requestSaved=false`.
6. In visitor context run `matrixMonthlyCatalogStatusV4()`. EXPECT `orderingEnabled=false,items=[]`. Run `matrixSubmitOrderRequestV4({requestId:'not-a-valid-request'})` in visitor test context. EXPECT `state=CLOSED,requestSaved=false,invoiceCreated=false`. It must not reach validation/CMS. Do not input real customer data or create records.
7. Check actual Wix editor execution results for zero customer writes/emails/real invoice calls; preserve screenshots/logs. Chat will independently re-read CMS and tracker counts through connected tools after Work execution. Stop if runtime reports any unexpected write.

## Checkpoint 2 — patch existing R9 host as SAVED DRAFT only
Perform only after Checkpoint 1 SAVED/VERIFIED and critical tests pass.
1. Reopen existing page `aeh8h`. Select the **same** existing `matrixSupplementsPageV1` custom element; confirm tag `matrix-supplements-page`. Record old source URL, do not duplicate element.
2. Change just source Server URL from old immutable R9 to the new immutable V4 renderer URL above. Preserve ID/tag/section and its location. SAVE; reload, reopen settings and read back exact URL. Do not test URL by opening it as a separate browser page.
3. Install the exact new `WIX_PAGE_CODE_V4_ADMIN_QA.js` source as replacement of exactly the old verified R9 page Velo code. Do NOT modify shared site code or any other page. New source includes full identical original `seoMarkup` and adds only closed admin preview plumbing. SAVE/reload/reopen/read back full new source; compare exactly with GitHub.
4. Ordinary Wix desktop Preview. EXPECT one `matrix-supplements-page`, `data-matrix-mounted=true`, exactly one rendered main page/one H1, two monthly features, eight FAQ details, six correct Fullscript links, no legacy content, preserved testimonials. No public submission possible and no test prices rendered to anonymous visitors. Run native mobile Preview 320px and desktop 1280px; no substantive clipping or horizontal overflow. Expand all FAQs and test movement to testimonials.
5. In an authorized Admin context, if Velo Admin web methods are available from that preview, EXPECT private QA render with the 3 TEST ONLY rows; clicking plus/minus and preview gives 4200/6200/2000 cents and no request submission. If Admin web methods are unavailable to Preview, record exact permission error, verify visitor view remains CLOSED and record `OWNER_PREVIEW_NOT_TESTED`; **do not** impersonate admin, open permissions or publish.
6. SAVE/reload/reopen the page and source one more time. Verify no changes to other site pages, links, SEO or the R9 layout.
7. If the new host fails to mount/fit, revert ONLY the source URL and page Velo back to the exact previously captured R9 values, save/reload/verify, and report `V4_FRONTEND_INSTALL_BLOCKED, R9_RESTORED`. Do not restore whole site or redo the previously completed R9 installation.

## Checkpoint 3 — Wix editor evidence/receipt only
1. In the Wix editor, confirm the site still has a saved draft rather than an agent-initiated publication. No Publish, Test Site, automation, payment, email or trigger controls should have been used.
2. Reopen the three new editor artifacts, capture exact saved-source readbacks, run timestamps and every supported desktop/mobile/visitor QA check above. Capture screenshots and concise execution logs without customer or secret data.
3. Save the dated **Wix editor execution receipt and screenshots** in the canonical FACIAL WEB SEO PW Drive folder. Include site/page/host IDs, old and new source URL, saved revision, source exactness evidence, actual QA outputs, the rollback state if any, and distinct `SAVED / VERIFIED / TESTED / NOT TESTED / NOT PUBLISHED` labels.
4. **Return execution evidence to Chat.** Chat will use the connected Wix and Google Sheets APIs to independently re-check the CMS counts, admin permissions, master release gates, inactive automation, Apps Script triggers/properties and existing order/invoice integrity. Work must not spend access time on those API and spreadsheet reads.

## Stop conditions
- Newer unverified Wix code, unknown host/changed site/page identity, source mismatch, backend compile error, test nonzero writes, permissions change request, new consent prompts, save readback failure, unsafe public ordering, active automation/gates, unexpected real CMS records or charges: **STOP affected step immediately**. Inspect a timed-out save before retry.
- If missing authorized admin Preview context, do not assume backend method failed; report it as a limited test, keep visitor path closed and do not turn on anything.
- **Step 2 is only SAVED INSTALLATION / PRIVATE-QA READY, not production syncing**, until approved products/prices and a separately authorized key/trigger exist.
- **Step 1 is only fail-closed handler implementation / preflight QA**, not a working customer form, until verified native CAPTCHA, capture UI, intake quote snapshot/schema migration, generic real-order processor and production email/invoice behavior are complete.
