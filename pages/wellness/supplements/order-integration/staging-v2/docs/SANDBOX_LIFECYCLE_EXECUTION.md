# Sandbox lifecycle execution — 2026-11-15 UTC

Prerequisite: SQUARE_DRAFT_VERIFIED_2026-11-15.md. Existing test invoice inv:0-ChBvEd2_INMsq2DAPxPhNm2cELIN, order CnfTXiQJla29bpSccU6V2PUvta4F, fixture TEST-STAGE2-TRANSPORT-002 only. This is the user's authorized Sandbox invoice/payment test, not production release. No products or policy approval is inferred.

## Installation and boundaries
Add only SandboxLifecycleV2.gs to the same Apps Script project. Do not replace other files, change properties/permissions, add triggers or deployments, activate Wix automation or publish the website. Source adds only manual test functions. The code fixes the exact fixture/provider IDs, uses hardcoded connect.squareupsandbox.com, requires all production gates OFF, temporarily enables Sandbox API inside a script lock, and closes the flag in finally. Store credentials only in existing properties. No card token, card data, billing data or customer data in journal/logs; only synthetic provider IDs/status/money.

Save, reload, copy back and compare exact after CRLF normalization before running. Stop on source mismatch. Previous draft-only QA expects DRAFT; do not run it after lifecycle publication.

## Execution order and expected results
1. Run matrixStageV2PublishSandboxInvoice. It reads the existing draft/order, validates total 4200 USD cents, recipient example.invalid, SHARE_MANUALLY and automatic payment NONE. It journals a stable publish version/key before one publish request; GET recovers after lost response. Expected UNPAID/AWAITING_PAYMENT, same invoice/order, no email, Sandbox-only public_url. Run again to verify unchanged ID and no duplicate publication.
2. Open only the returned squareupsandbox.com invoice URL. Verify TEST ONLY title, $42.00, sample bundle $18 + sample product 2 x $12. Use official Sandbox Visa 4111 1111 1111 1111, CVV111, future expiration12/30, postal94103, synthetic name Matrix Test. Do not save card or request receipt/email. If CAPTCHA or account/terms authorization appears, hand off that exact final control; never bypass it. No real card or live payment. Inspect the outcome before retrying an uncertain payment.
3. Run matrixStageV2ReconcileSandboxInvoice. GET invoice/order/payment and all pages of location disputes; expected invoice PAID, order COMPLETED, one COMPLETED payment4200 USD cents, SANDBOX_PAID_VERIFIED, purchase eligibility FALSE. Payment_ids come from provider tenders; no client status is trusted. Any mismatch/API failure stops the check.
4. Run matrixStageV2RefundSandboxPayment only after verified full payment. Fixed one-payment/full$42 refund, deterministic35-character key, freeze request beforePOST, markHOLD beforeAPI, journal refundID then GET refund. Expected provider REFUNDED/COMPLETED after settlement, HOLD, purchase eligibilityFALSE. If PENDING, read again later; do not create a second refund. Replay must reuse recordedrefundID or exact frozen request/key after timeout.
5. Read back existing synthetic tracker rows. Preserve other fixtures and production/userdata. All queue gates/ownerrelease remainOFF/NOT_APPROVED; payment-confirmed projection deliberately remainsFALSE for Sandbox. Journal holds actual paid/refund evidence. No wholesale inclusion.
6. Save actual provider evidence, timestamps, sourcehashes, screenshots and remainingdependencies in existing canonical checkpoint and repository. Distinguish successful localtests, providerQA, siteUIQA and productionrelease.

## Primary contracts
- https://developer.squareup.com/reference/square/invoices-api/PublishInvoice — POST invoice/id/publish, version, idempotency max128.
- https://developer.squareup.com/docs/invoices-api/pay-refund-invoices — APIs cannot pay invoice orders; use hosted invoice; SHARE_MANUALLY sends no receipt. TenderID is paymentID. Refund via RefundsAPI.
- https://developer.squareup.com/docs/devtools/sandbox/payments — official test cards only; no real charging.
- https://developer.squareup.com/reference/square/payments-api/GetPayment — authenticated payment GET.
- https://developer.squareup.com/reference/square/disputes-api/ListDisputes — location filter, cursor pagination.
- https://developer.squareup.com/reference/square/refunds/refund-payment — POST/v2/refunds, payment_id,amount_money,idempotency maximum45; no location_id for linkedrefund.
- https://developer.squareup.com/reference/square/refunds-api/GetPaymentRefund — GET/v2/refunds/id.

## Observed sandbox URL compatibility correction
First publication succeeded HTTP200 at 20:02:13 Chicago, invoice UNPAID version1. Square returned https://app.squareupsandbox.com/pay-invoice/... rather than the root-host URL shown in its walkthrough. The code stopped before opening this URL and closed the Sandbox flag. After inspecting the actual provider response in the existing Sandbox API log, the allowlist now permits only root squareupsandbox.com and app.squareupsandbox.com; production/lookalike hosts still fail. A new regression test covers both accepted and rejected domains. Resume by rerunning publication function: GET detects existing UNPAID and skips POST, then reconciles the same invoice. Do not create or republish it.
