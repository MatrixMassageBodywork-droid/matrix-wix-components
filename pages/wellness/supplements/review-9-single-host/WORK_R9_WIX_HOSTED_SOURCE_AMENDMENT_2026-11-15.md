# Work execution — Matrix Supplements R9, Wix-hosted Velo source

**Project:** FACIAL WEB SEO PW  
**Date:** November 15, 2026, America/Chicago  
**Task:** Resume the already-approved UNPUBLISHED R9 draft installation. This amendment supersedes ONLY the earlier external-jsDelivr source-binding requirement. All existing Wix page and backend preservation boundaries remain in force. **Do not publish.**

## 0. Authority and exact prepared source

Read before editing:
1. Current R9 source-binding stop receipt: https://drive.google.com/file/d/1WbBwE4H3wmWjpo_4fRW7ziVovb7kgirY/view
2. R9 approved page/install checkpoint: https://drive.google.com/file/d/1rqZsDyAY1ZmgQiUdlIPrjJIC8xHZWf2G/view
3. Original native section map and first-install steps: https://drive.google.com/file/d/1GNMFLgguQOEyK38Ql5gU7pCJpq7YZNxA/view
4. This amended instruction and bundled exact source file from its Drive package (link supplied in current companion checkpoint).

Existing Wix Classic site `cdec8df6-d518-4859-9f1e-f06bf5346d41`, editor document `a276c9bf-bc17-4680-959b-a24ebe7370f6`, existing page `aeh8h` / `SUPPLEMENTS & WELLNESS`, current route `/supplements`.

**Use exactly the R9 bytes already approved; never rebuild or edit the renderer:**
- GitHub immutable source: https://github.com/MatrixMassageBodywork-droid/matrix-wix-components/blob/5bdcbe560b11e4b5573193f9517c80bcbeed8cf6/pages/wellness/supplements/review-9-single-host/renderer.js
- Bundled file name: `matrixSupplementsR9.js` (byte-for-byte copy of that `renderer.js`).
- SHA-256 **`63f0f0f35c3968b1855f20eae09244c02bf690c4fae55c6cc86bbc97518b6706`**; exact **48,990 UTF-8 bytes**.
- Page-specific Velo candidate `WIX_PAGE_CODE_FIRST_INSTALL.js`: SHA-256 **`43d0c664a1cf751fb4cb44a19d11ec0ae600cd9e83970cdc428031c184e0a185`**; exact **20,539 bytes**. Use only if live page Velo remains the previously recorded starter. Do not copy the full HTML proof into Wix.
- Wix's supported source route: https://dev.wix.com/docs/velo/velo-only-apis/%24w/custom-element/add-a-custom-element . The **Wix Editor** permits creating a `public/custom-elements/` JavaScript file and selecting **Choose Source → Velo File** for a custom element.

**Why this amendment:** the external CDN gave HTTP 200 and matched the exact SHA-256, but connected Chrome blocked domain navigation (`ERR_BLOCKED_BY_CLIENT`). This is not a missing or corrupt script. **Do not revisit `cdn.jsdelivr.net`, disable browser protection, change browser permissions, create a new external host, or rotate any credentials.** Bind the same code to a Wix-hosted **Velo File** instead of a **Server URL**.

## 1. Checkpoint A — fresh readback; no mutation

1. Open the existing Wix Classic Editor, Pages & Menu → `SUPPLEMENTS & WELLNESS` page `aeh8h`. Confirm the site/page identity and current saved/published revision. The prior saved baseline was revision **1195**, November 14, 8:59 p.m. CT; this is historical, not proof of the current revision.
2. Read the complete page Velo; expected Wix starter `$w.onReady(function () { ... })` with comments and no custom handlers. Capture any difference rather than overwriting it.
3. Inspect existing page sections, exact IDs, child content and hierarchy. Earlier page-local old hero `comp-mexcv2yg`, intro `comp-mexcv316`, protocol cards `comp-mexcv32a1`, unknown/possibly empty `comp-mexcv3141`, `comp-mexcv31t`, `comp-mpq2lvoh`, protected testimonial section `comp-mexcv396` and nested `comp-mexcv39b1`. Preserve any unclassified section with actual content. Do not create a second page.
4. Confirm the three already installed V3 backend files and the earlier tested payment/refund system remain present. **Read only, no reinstallation or re-running sandbox payments/refunds.** Check the inactive automation and public ordering gate remain OFF. Do not audit unrelated content except to avoid an unintended site-wide publication.
5. Check in Public / `public/custom-elements/` whether `matrixSupplementsR9.js` already exists. If identical hash, reuse. If present but different, stop SOURCE_FILE and return full diff/source evidence. If absent, proceed.

## 2. Checkpoint B — Wix-hosted R9 source (new file only)

1. Open Velo Code Files → Public. Locate or create folder **`custom-elements`** and create exactly one new JavaScript file **`matrixSupplementsR9.js`** inside it, resulting in `public/custom-elements/matrixSupplementsR9.js`.
2. Paste the exact complete `matrixSupplementsR9.js` supplied in the package (48,990 bytes). The script registers `matrix-supplements-page` and its nested `matrix-monthly-order-selector`. Do not edit strings, HTML, CSS, source names, prices, attributes or marketing text.
3. Save; close and reopen the saved file; copy/read back all bytes, normalizing Windows CRLF only for hash comparison. Verify full SHA-256 `63f0f0f35c3968b1855f20eae09244c02bf690c4fae55c6cc86bbc97518b6706`; confirm first line `/* Matrix R9: one native Wix custom-element host; nested monthly cart always CLOSED. */` and last line `})();`.
4. If Wix automatically creates `wix-default-custom-element.js`, preserve it unchanged. The new source file is the only file to create or edit in this checkpoint. No external CDN source is required.
5. Save and read back again. **Checkpoint B passes on Wix-hosted file readback; do not require independent Chrome navigation to the blocked domain.**

## 3. Checkpoint C — one Wix-native page host

1. In the existing Supplements page, create one blank *page-local* strip immediately **above** genuine testimonials `comp-mexcv396`, with native full-width stretch and zero side margins. Keep existing old page content temporarily.
2. Add exactly ONE Wix **Custom Element** in that strip: element ID **`matrixSupplementsPageV1`**, tag **`matrix-supplements-page`**. Choose Source → **Velo File** → `matrixSupplementsR9.js` (from `public/custom-elements/`), **not Server URL**. Do not create `matrixMonthlyOrderV3`, a second host, separate cart strip, or another handler.
3. Save, close/reopen element properties. Verify source mode **Velo File**, exact file name, tag, ID, parent strip, native widths/margins and exactly one page host.
4. In Wix Preview verify the new complete R9 page mounts; check approved logo/water, two featured cards and nested CLOSED cart, and that old page content still appears temporarily. It is normal to see both only at this intermediate draft step; **do not publish**.
5. Measure the actual rendered content and adjust only the new host/strip height to avoid clipping. Never use hardcoded offline page heights or a 100vw CSS hack. Save/reopen and verify no large blank area before testimonials.
6. If the Wix-hosted file did not mount, capture the file/source selection, console/screenshot, element dimensions and exact failure. **Stop only the host step**; leave the old page intact and do not try new hosting services.

## 4. Checkpoint D — switch visible content without affecting shared shell

1. If Velo still equals the previously captured starter, replace that starter *once* with exact approved `WIX_PAGE_CODE_FIRST_INSTALL.js`, which assigns the complete R9 HTML to `#matrixSupplementsPageV1.seoMarkup`. If the current Velo differs, stop CODE_MERGE with a saved full copy; do not overwrite nonstarter code. Save/reopen and hash-check.
2. Move the new full-width host strip ahead of the old page-local hero `comp-mexcv2yg`; verify the new R9 hero is at the top of local content. Save/read back.
3. Confirm identity/content of and remove **only** `comp-mexcv2yg` (old hero), `comp-mexcv316` (old intro), `comp-mexcv32a1` (old protocol cards), **one section at a time** with separate Save/readback. Preserve anything changed from baseline rather than guessing.
4. Inspect `comp-mexcv3141`, `comp-mexcv31t`, `comp-mpq2lvoh`; remove one only if independently verified truly empty with no nested items, behavior or integration. Otherwise preserve it and report it for targeted review. Never touch genuine testimonials `comp-mexcv396` / `comp-mexcv39b1`, global header/footer, menus, or unrelated site pages.
5. Save/reopen. Confirm exactly one R9 page H1, no old duplicate hero/old protocol cards, correct testimonial adjacency, and preserved SEO head, analytics, site navigation, and current `/supplements` slug.

## 5. Checkpoint E — native preview, privacy and safety QA

1. Wix native desktop Preview at approximately 1440 and 1280 widths, mobile at 320, 375 and 390. Inspect logo, teal water, full-width layout, cart directly below two feature cards, testimonials and footer; ensure readable layout, no clipping, no horizontal overflow or blank gap. Change only new section sizing as needed; save/read back.
2. Verify both offer IDs `SUP-MONTHLY-A`, `SUP-MONTHLY-B`, exactly 8 expandable FAQs, original six dispensary destinations, local SEO headings, approved positive sales copy, and **customer-facing invoice-by-email wording only**. Do not add named supplier or payment-processor explanations.
3. Closed-state test: nested `matrix-monthly-order-selector` has `preview-mode="CLOSED"` and `catalog-json="[]"`; it cannot accept or submit a real order, reveals no TEST IDs, synthetic prices, private catalog, contact capture, invoice or checkout. Confirm there is no second native cart host.
4. If an actual unpublished anonymous visitor test surface exists, verify `orderingEnabled:false`, zero catalog items and anonymous denial of admin endpoints. Do not publish or weaken permissions just for this test. If unavailable, record **ANONYMOUS QA NOT TESTED**.
5. READ ONLY: verify private catalog still holds exactly three synthetic TEST-only items, intake and invoice queue prior counts, existing refunded Sandbox fixture HOLD, inactive automation and no recurring triggers. Do not rerun an invoice, payment, refund, customer communication or API-key operation.
6. Save final unpublished draft; reopen and read back source file, host mode/file/tag/ID, complete page code hash, native layout, preserved testimonials and current saved revision. Capture before/after screenshots, desktop/mobile QA, count results, exactly what was NOT TESTED, and explicit **NOT PUBLISHED** receipt in the canonical project folder.

## Hard boundaries and stop rules

- **No Publish**, no Test Site release, no new site/page, no SEO slug/canonical/schema change, no shared menu (including Sauna), no original public `/supplements` rewrite other than the saved draft, no unrelated draft release.
- Preserve all installed V2/V3 backend files, Apps Script, existing invoice/refund records, CMS collections and permissions, automation/trigger states, keys, Script Properties, and six existing dispensary links.
- No active customer cart, no customer records, no marketing, invoices, payments, refunds, wholesale purchasing or paid subscriptions. Leave all customer-facing ordering gates OFF.
- On incorrect site/section identity, nonstarter page code, source hash mismatch, unexpected live customer functionality, failed/uncertain save, or new unrelated draft conflict: stop only that affected mutation; return evidence. Do not recreate or restore historical work. If Save times out, reopen/read back before any retry.

## Final evidence receipt

Site ID, page ID, pre/post saved revision, unchanged published status, script source GitHub commit/hash, Velo file path/hash/readback, one native element ID/tag/source, host placement/size, section IDs removed/preserved, page Velo hash, screenshots at desktop/mobile, H1/FAQs/links, nested CLOSED cart and privacy/visitor test status, untouched backend/triggers/payment data, and exact `SAVED / VERIFIED / TESTED / NOT TESTED / NOT PUBLISHED` distinctions. Record actual dates/times. Work should execute and QA, not design or choose approaches.
