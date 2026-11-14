# Matrix Supplement Orders — Connected Staging Architecture v1

## Current systems (checked November 14, 2026)

- Existing Wix Classic site ID: `cdec8df6-d518-4859-9f1e-f06bf5346d41`.
- Existing published Supplements page: `/supplements`; R8 redesigned candidate (NOT installed), with proposed later slug `/supplements-vitamins-salem-wi`. No unrelated site content should change during this integration.
- Existing native Google Sheets master: `15swQj97kKIeEa1DWUyMFnwf_gIXgssswRoYLzv0lSOw`.
- Existing private native Google Sheet: `16hwNkp_gobTw2wHyb6N6_aTzmtOgIIPLPa5tIPdnxUY`.
- Two NEW empty Wix staging CMS collections, verified after creation: `MatrixSupplementCatalogSnapshotV2` and `MatrixSupplementOrderIntakeV2`. All CRUD roles `ADMIN`, including read, for both. No records created; no public read permission granted.
- Wix has 1 existing Wix Forms schema, 44 automations, and originally 18 CMS collections. None identified as supplement-specific. No existing relevant Google Sheets automation action found. Do not modify or duplicate unrelated automations.

## Data flow (approved for STAGING ONLY)

### Catalog publishing path
1. Owner enters each exact SKU, size, public description, everyday price and monthly price **in USD dollars** and approval status in `Orderable Items V2` (master); private validation converts dollars to **integer cents** for order/invoice snapshots. Bundle components and versions in `Bundle Components V2`.
2. A future owner-triggered, read-only preview of approved records generates an allowlisted catalog snapshot. Do not export wholesale costs, customer data, or raw Sheets URLs.
3. After actual owner approval, securely synchronize only approved snapshot fields to `MatrixSupplementCatalogSnapshotV2`. Site visitors should receive only a sanitized backend method response from currently `ACTIVE` records. Collection stays ADMIN-only, so visitor cannot query it directly.
4. The existing monthly feature IDs stay `SUP-MONTHLY-A`, `SUP-MONTHLY-B`. No product or price is active yet. The R8 public design and existing dispensary links remain unchanged until an approved Wix save/publish action.

### Customer request path (to be installed/tested in Wix Classic)
1. Display a cart in the monthly Savings Event section: single products and/or bundles, quantities, customer name/email, and fulfillment preference.
2. Customer sees itemized price, order deadline and checkbox for terms; optional marketing opt-in is separate and unchecked.
3. Frontend invokes a Wix backend web method; NEVER trust the price supplied by the browser.
4. After bot protection and unique submission-key validation, backend writes one submission to owner-only `MatrixSupplementOrderIntakeV2` with `cartJson` containing ONLY IDs and quantities.
5. Wix built-in Automations **CMS item added → Update Google Sheets** maps that collection's fields to A–D, F–L and N in `Cart Intake V2`; leave E, M and O blank, reserved for optional phone and backend-generated fields. See exact mapping in `WORK_EXECUTION_ONLY.md`. This action requires signed-in Wix dashboard Google OAuth and must stay INACTIVE until mapped/tested.
6. Private Apps Script, running as owner, validates approved catalog SKUs/quantities/policy, generates immutable order/line snapshots, and prepares an invoice request. The provided version is intentionally DRY RUN ONLY and writes no orders, invoices, emails or supplier purchases.

### Future invoice path — after explicit QA and release
- Use the existing payment provider's Orders, Customers and Invoices APIs to prepare one invoice for the verified total and email it to the customer. Initial testing uses the provider's Sandbox environment and **synthetic identities only**.
- Only authenticated provider readback proving paid status, amount, currency, refund/dispute status and cutoff qualifies a request for the paid-only batch. A customer click or spreadsheet status cannot prove payment.
- Owner confirms the exact supplier purchasing quantities and initiates each wholesale order. No automatic supplier purchase.
- The PUBLIC site copy says **“An invoice will be sent by email”**, not provider or integration names. Keep supplier brand names off the public page.

## Security/validation invariants
- All production sending, customer ingestion, public CMS read, raw backend key access and supplier ordering are OFF at this checkpoint.
- Never store API keys in Google Sheets, Wix frontend, GitHub, contact form fields or HTML source.
- Do not collect diagnosis, medication history, health questionnaires or card credentials in the order form.
- Mixed bundle + individual orders must freeze both invoice-line prices and component-level supplier SKU quantities at quote time; historical orders do not change when the catalog changes.
- No duplicate invoices for a repeated submission ID. Do not publish the same invoice twice; provider requests must use deterministic idempotency keys.
- Testing uses synthetic SKU/identity fixtures and sandbox methods only. Do not run live email tests or charge real customers without explicit authorization.
- No extra paid connector, Fullscript API, Google Sheets public sharing, or extra site.

## Current completion levels

**VERIFIED:** Existing native Sheets upgraded in place, two ADMIN-only empty Wix staging collections created and read back (0 records each), 17 core logic tests and 4 mocked Apps Script tests passed offline.
**NOT CONNECTED:** A site-facing multi-item form, Wix-to-Google OAuth action, Apps Script deployment/trigger, external sandbox payment credentials, and invoice/payment lifecycle.
**NOT TESTED:** Actual Wix form submission, actual Google Sheets automation mapping, Wix native mobile behavior, sandbox invoice lifecycle, any production payment.
**NOT PUBLISHED:** R8 website redesign, proposed SEO slug redirect and pending Infrared Sauna submenu addition remain separate.
