# Product and price entry — deterministic supplement launch map

STATUS: DRAFT DATA ENTRY SPEC ONLY; no actual Fullscript products/SKUs, costs, prices or collection memberships have been authorized yet.

## Master sheet — owner inputs

Open the existing **Matrix Website Master Catalog — Supplements Pilot**, tab `Orderable Items V2` (A5:P). Enter one SKU or bundle ID per row, from row 6 onward:

- A: exact stable ID/SKU (uppercase letters/numbers/dash/underscore/dot, 2–80 characters); **do not reuse** IDs for different packs.
- B: `PRODUCT` or `BUNDLE`.
- C: Matrix display name. D: exact size/variant. E: concise customer description consistent with approved product label and Matrix marketing rules.
- F: approved **everyday customer price, in dollars** (e.g., 24.99). G: approved **monthly event price, in dollars** (e.g., 19.99); no invented discount percentage. H/I calculate savings automatically when both exist.
- J: stable offer version, initially `DRAFT-01`; publish a new version for material product, price or bundle component changes.
- K: `DRAFT`, `READY_FOR_REVIEW`, `APPROVED`, or `PAUSED`.
- L: public image URL from an approved source; M: verified product/collection URL (if applicable).
- N: brand resale/MAP status (`UNVERIFIED`, `REVIEWED`, `RESTRICTED`). O: separate owner approval (`NOT_APPROVED`, `APPROVED`). P: source review date/reference.

Only catalog rows with **K APPROVED, N REVIEWED, O APPROVED** are eligible for quotation. The Wix public snapshot additionally requires the individual feature release gate; do not sync the full sheet or expose wholesale costs.

## Bundle definition

For every `BUNDLE`, go to `Bundle Components V2` (A5:J) and enter stable bundle ID, matching bundle revision, each **individual product SKU**, positive quantity per bundle, verified size, and approval status. Every component must itself be eligible to order; products used in multiple bundles are not duplicated in the catalog. No automatic substitutions.

## Private pricing information

Open **Matrix Supplement Preorders — Private Order Tracker**, tab `Private Costs`, for verified wholesale, freight/packaging and net contribution calculations. Record cost sources and manufacturer restrictions privately. Do not add cost fields to public snapshots or screenshots.

## Release and test

1. Confirm exact SKU/size/pricing from signed-in vendor platform; use a source timestamp. Do not infer missing wholesale costs, MSRP or discount from a title alone.
2. Approve policy, pickup/shipping/tax rules, order cutoffs and invoice wording. Select one test cycle with exact America/Chicago dates.
3. Run synthetic tests offline, Wix staging, Google Sheet mapping, and provider Sandbox before touching live customer flows. The order selector must allow bundles + individual SKUs in the same cart, use backend prices, and produce one invoice per unique submission.
4. Only after a written positive QA receipt may an owner explicitly authorize public product release or real invoice sending. Wholesale order remains owner-reviewed.

## Public-facing copy

“**Choose a curated bundle, individual vitamins or supplements, or both.** Submit your request and we’ll email an invoice with your total and payment due date.”

Never name supplier, processor, internal backend systems, or wholesale mechanics in public copy. Keep product-quality claims positive and source-grounded.
