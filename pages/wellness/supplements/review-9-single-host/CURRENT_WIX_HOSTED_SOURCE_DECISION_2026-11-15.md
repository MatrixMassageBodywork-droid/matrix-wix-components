# CURRENT — Matrix Supplements R9: use Wix-hosted Velo source

**Project:** FACIAL WEB SEO PW  
**Checkpoint:** November 15, 2026, America/Chicago  
**Status:** TECHNICAL ROUTE VERIFIED / SOURCE INTEGRITY VERIFIED / WORK AMENDMENT PREPARED / WIX INSTALLATION NOT YET PERFORMED / NOT PUBLISHED.

## Latest authoritative decision

R9's independent CDN request returned HTTP 200 and the exact expected 48,990-byte script. Connected Chrome nevertheless displayed `ERR_BLOCKED_BY_CLIENT` when navigating to `cdn.jsdelivr.net`. The cause within the browser was not established, and it is not necessary to change browser protections to proceed.

**Use Wix's documented first-party source route:** Create `public/custom-elements/matrixSupplementsR9.js` as a Wix Velo Public custom-element file with the **exact original R9 renderer bytes**, then choose `Velo File` instead of `Server URL` when binding the custom element. This is explicitly supported for Wix Editor: https://dev.wix.com/docs/velo/velo-only-apis/%24w/custom-element/add-a-custom-element . No change to the approved R8/R9 design, copy, renderer bytes, nested closed cart or backend architecture is required. The earlier R9 Work instruction's mandatory `cdn.jsdelivr.net` Chrome-tab load is **superseded**.

## Exact source and identity

- GitHub original approved R9 revision: `5bdcbe560b11e4b5573193f9517c80bcbeed8cf6`.
- Source path: `pages/wellness/supplements/review-9-single-host/renderer.js` (unchanged).
- R9 renderer SHA-256: `63f0f0f35c3968b1855f20eae09244c02bf690c4fae55c6cc86bbc97518b6706`; size 48,990 bytes. Extracted from the verified R9 ZIP, independently checked locally with SHA-256 and `node --check`.
- First-install page-code SHA-256: `43d0c664a1cf751fb4cb44a19d11ec0ae600cd9e83970cdc428031c184e0a185`; size 20,539 bytes; `node --check` passed.
- Site: `cdec8df6-d518-4859-9f1e-f06bf5346d41` (Wix Classic). Existing page `aeh8h`, current route `/supplements`.
- Single host: `matrixSupplementsPageV1` / `matrix-supplements-page`, with nested CLOSED `matrix-monthly-order-selector` included in the same renderer. No second native cart.
- Verified source-block receipt: https://drive.google.com/file/d/1WbBwE4H3wmWjpo_4fRW7ziVovb7kgirY/view . Saved revision 1195 at Nov 14 8:59 p.m. CT is historical, not new installation.

## Remaining Work-only changes

Follow the new `WORK_R9_WIX_HOSTED_SOURCE_AMENDMENT.md` in the same Drive package. Wix editor creates the Wix-hosted Velo file, binds one host to it, saves/reopens/reads back, then installs the full page, preserves genuine testimonials and site SEO, runs desktop/mobile QA, and (if available) tests anonymous CLOSED access. **Do not Publish.**

Retain the installed Phase 3A backend source and verified Sandbox refund. Preserve all customer data, auth, API credentials, original Wix sections until host preview succeeds, unrelated draft pages, global navigation, old URL/SEO, and R8 positive marketing copy. No customer ordering, email, invoice, payment, automation or wholesale step is authorized.

Status terms: Original R9 source `SAVED/VERIFIED`; source-route correction `PREPARED`, Wix-hosted file `NOT INSTALLED`; native page `NOT INSTALLED`; desktop/mobile native preview and anonymous QA `NOT TESTED`; site `NOT PUBLISHED`. Do not advance these statuses without Work evidence.
