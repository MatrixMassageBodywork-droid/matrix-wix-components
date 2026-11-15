# CURRENT — Matrix Supplements Phase 3 staging build

Project: FACIAL WEB SEO PW. Date: November 14, 2026 America/Chicago.

**Scope:** Approved catalog sync code, synthetic Wix catalog transport, mixed bundle + individual item selector, fail-closed integration scaffolding. Keep R8 design, prior $42 sandbox payment/refund, site release, and all customer/production gates untouched.

### Completed in Chat
- Consulted latest canonical checkpoint and current branch; reused existing master, private tracker, two private Wix collections and V2 sandbox pipeline.
- Created three **TEST_ONLY_NEVER_PUBLIC** records in the existing Wix private supplement catalog; bulk insert succeeded 3/3, confirmed private readback 3/3. Real approved product count remains unverified and no product was claimed for sale.
- Reread actual Wix CMS records and recomputed synthetic mixed cart: two TEST-PRODUCT-A + one TEST-BUNDLE-AB = $42 monthly, $62 everyday reference, $20 simulated savings; **zero order writes and zero invoice calls**.
- Built complete validated catalog projection and draft private sync Apps Script source with explicit OFF gates; future Wix API key/permission work remains separately gated.
- Built additive ADMIN-only Wix Velo catalog preview/quote method and public closed-status method. Existing V2 order/reconciliation code unchanged.
- Built a self-contained static, interactive customer selector demo that preserves R8 styling, supports multiple quantities and bundle + individual combinations, and previews a request without sending anything. The short order form fields are present but disabled in demo; no actual customer submission path exists.
- Node test suite: 28 pure/safety tests passed. Offline Chromium visual checks: seven viewport widths passed, one H1, 2 original monthly feature cards, 8 existing FAQs, no horizontal overflow, approved logo/water decoded, supplier/payment brand absent in visible text. Interactive sample total and event assertion passed.

### Status boundary
- **SAVED / VERIFIED**: 3 synthetic items in admin-only Wix CMS. Source package saved locally; GitHub and Drive checkpoint links must be readback-verified before calling remotely saved.
- **TESTED**: private Wix catalog readback + synthetic price arithmetic, local UI and calculation tests.
- **NOT INSTALLED**: CatalogRulesV3.gs, CatalogSyncV3.gs, supplementCatalogV3.web.js, selector custom element in actual Wix.
- **NOT CONNECTED**: automatic approved-catalog Google Sheet→Wix update, public form, CAPTCHA, customer intake to live invoices, production catalog and payment pipeline.
- **NOT PUBLISHED**: R8 design, proposed URL migration, sauna menu insertion and Phase 3 UI remain untouched.
- **No customer data, messages, invoices or wholesale orders created.** Original sandbox refunded fixture remains held.

### Next exact execution
Use `WORK_EXECUTION_PHASE3.md` with current native state readback. No new subscriptions, payments, credentials or permission changes without approval. Do not repeat prior V2 refund test. Stop before public launch and return evidence. After products/price/fulfillment terms are approved, finish generic backend, anti-bot controls, automatic catalog sync credential and end-to-end staging test under separate approval.
