# Billing V5.1 — handling fee correction
Date: November 16, 2026. Project: FACIAL WEB SEO PW.

Latest owner direction: $2 supplement order handling fee, once per combined order regardless of payment method; no tax on this fee. 5.5% applies to supplement products only. Pickup only, no shipping. This supersedes V5 convenience-fee naming and taxation. No publication, customer ordering, invoice send, payment/refund or recurring automation release.

Starting checkpoint: Wix draft 1234; backend SHA256 972b99e5376e12529e5d572d4c004d6b9bcb939dad40b6c965422533da47a26f. Apps Script SupplementBillingV5.gs SHA256 6e3d4ad66f15e794ce8406b10be6da15a39bd0198dd74f464bc3a410412c32c6. Renderer pinned to c94e2ea547df447349c709d56322c816c6045113. Preserve page adapter, all gates and unrelated changes.

1. Update existing SupplementBillingV5.gs only, after source match. Save/reload/copy/read back exactly. Run matrixBillingV5SyntheticChecks: PASS, subtotal4200, handling200, tax231, before-card4631, estimated-credit4778, zero provider calls/writes/emails. Existing legacy V4 fixtures and frozen orders unchanged.
2. Update existing Wix supplementRequestsV4.web.js after baseline match. Save/reload/read back exactly. Run matrixAdminSyntheticChecksV4: same totals, ordering false. Preserve page adapter SHA256 138c6c45b1571aa85dbf15cfa3269c996526196736851b4245fef7a55b277557, all public gates false.
3. Update same host matrixSupplementsPageV1 / comp-mwhxvav5 on aeh8h to immutable V5.1 renderer URL. Save/reload/read back binding. Preview mixed $42 cart shows one $2 handling fee, tax $2.31, total $46.31 before eligible-card estimate, free Matrix pickup. No shipping, no enabled submission. No publication.
4. Square: save DRAFT — Matrix Supplements — Monthly Pickup template, one $2 Supplement order handling fee with NO tax assigned. Message says 5.5% tax on supplements only. Share link, reminders off, shipping off. Preview $42 taxable temporary item yields $2.31 tax and $46.31 total; remove temporary item before saving template. Reload/read back. No actual invoice or customer record created.
5. Master Settings A20:D21 and Tracker Cycle Rules A16:D17 record product-only tax and non-taxable handling fee. Other rules remain unchanged.

Automatic 3% credit-card surcharge is not activated: Square setting applies to full-payment invoices and in-person POS location-wide, existing manual 3% charges remain untouched. No invoice-only selection observed. API-created invoices do not inherit native surcharge. Preserve blocked API route; do not claim a complete released invoice pipeline.

Stop only affected mutation on baseline mismatch, customer write, permission requirement, or save failure. Verify persisted state before repeating timeouts. Record actual saved revision, source hashes, tests and remaining dependency. Do not duplicate installed code or completed tests/payment records.
