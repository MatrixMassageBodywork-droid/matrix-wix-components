# Matrix master-catalog → existing invoice engine bridge

Project: FACIAL WEB SEO PW. Prepared November 16, 2026, America/Chicago.

**LOCAL TESTED / NOT INSTALLED / NOT LIVE.** This is one additive Apps Script file, not a new ordering platform. It reads the existing approved master-catalog format and prepares selected synthetic orders for the already verified Sandbox invoice engine. It does not finish or activate the public customer ordering workflow.

## Current verified baseline

- Wix R9 displays correctly in saved draft 1213. Receipt: `pages/wellness/supplements/review-9-single-host/R9_DRAFT_1213_VERIFIED_2026-11-15.md` at repository commit `5fa4e85c59bb6df006a1529dd6b145bf7b694f73`. The receipt says NOT PUBLISHED; no later publication was verified in this pass.
- Master sheet `15swQj97kKIeEa1DWUyMFnwf_gIXgssswRoYLzv0lSOw`: Orderable Items V2 has a blank-SKU template only, with zero approved real products/prices. Bundle Components V2 is also a template. Existing order-window and fulfillment policies remain proposals.
- Private tracker `16hwNkp_gobTw2wHyb6N6_aTzmtOgIIPLPa5tIPdnxUY`: three existing synthetic orders and invoice-queue records; create/email switches OFF; the refunded fixture remains HOLD and owner NOT_APPROVED.
- Fresh Wix read: three TEST_ONLY_NEVER_PUBLIC catalog items; one synthetic intake record; existing automation `e0b16020-55b5-46d0-a890-645d277b0c86` is INACTIVE. No records were changed.
- Prior Sandbox creation/payment/refund and duplicate-protection receipt remains authoritative: https://drive.google.com/file/d/1vJ3MBCGOl-qVK01gOo7dgIJq_hshOgyO/view . Do not repeat the refunded test.

## Targeted work completed in this pass

Updated only status/evidence text in existing Master Settings C12:D15 and Private Launch Gate V2 B10:E13, B15:E15, B20:E23. Every release switch remains OFF; existing order, invoice, payment, pricing and validation data are preserved. No tabs/workbooks were created.

Prepared `src/MasterInvoiceBridgeV4.gs`. The bridge uses the installed `MatrixCatalogCoreV3` normalizer, `MatrixOrderCore` quote engine, and existing V2 Sandbox invoice adapter and projections. Its journal marker is distinct, preventing old-runtime replay. No prior backend source is replaced.

Thirty-six local Node tests passed. Tests cover mixed/individual/bundle quotes, price snapshots, replay conflicts, catalog and component validation, restricted test identities, API-OFF behavior, refund preservation, and closing the Sandbox switch after failure. These are local tests, not installed Apps Script execution, provider-response testing or customer-email delivery testing.

## Scope and isolation

This version accepts only explicitly selected `MV4-TEST-*` requests and `@example.invalid` recipients. It is OFF unless separately set to `SANDBOX_SELECTED_ONLY`. Initial installation runs only in-memory synthetic checks and a read-only master dry run. No settings need opening for those checks.

The optional selected-record and Sandbox-draft functions are supplied for a later specifically authorized test. They use existing credentials, never print secrets, never publish an invoice, never email, never charge/refund a card, and never release purchasing. No new API key, subscription, trigger or deployment is required for the installation task.

The zero tax/fulfillment fee in synthetic checks is not a business policy or tax determination.

## Still required for a live launch

1. Approved real catalog entries, bundle components, fulfillment/tax terms, ordering and payment cutoffs.
2. Live customer form validation/CAPTCHA and request submission, connected to the existing private intake path. The current R9 selector remains CLOSED.
3. Authorized recurring catalog synchronization and processing; current private sync code is installed but OFF. Do not assume an API-fed sheet edit triggers an ordinary edit handler.
4. Production-capable invoicing, actual transactional email verification, payment/refund reconciliation and explicit owner release. The existing tested runtime remains Sandbox-only.
5. A separately approved public release. No hidden or incomplete step is represented as finished.

## Reproducible tests

Run `node --test tests/master-bridge.test.cjs` from this folder. The archive includes the exact two baseline dependencies solely to run the tests; **do not reinstall either baseline file**. Their Git blobs match the current repository source:
- Core.gs: `c9102021a10e5d7a93f35b8ad62ef7c46644714e`
- CatalogRulesV3.gs: `14e9bb2144bc0d9ed4fca8dd77949eb14c140541`

The production source and tests contain no credentials or real customer records.
