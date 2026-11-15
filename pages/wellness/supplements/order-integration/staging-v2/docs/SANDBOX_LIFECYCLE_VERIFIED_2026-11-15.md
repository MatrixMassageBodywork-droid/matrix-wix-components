# Sandbox payment/refund receipt — 2026-11-15 UTC

Project FACIAL WEB SEO PW. All provider activity used the existing Square Sandbox Default Test Account and synthetic TEST-STAGE2-TRANSPORT-002, matrix.stage2@example.invalid. No production invoice, customer communication, real payment, wholesale order, new account or subscription purchase occurred.

## Objective results

| Check | Observed result |
| --- | --- |
| Draft creation and replay | Same Square order CnfTXiQJla29bpSccU6V2PUvta4F and invoice inv:0-ChBvEd2_INMsq2DAPxPhNm2cELIN; 4200 USD cents; no email |
| Sandbox invoice publication | POST succeeded 20:02:13 Chicago, November14; recovery read at20:04:39 found existing UNPAID/version1 and skipped POST |
| Hosted simulated payment | Official Square test card paid $42 once; hosted page confirmed Default Test Account paid, invoice000001; no receipt requested |
| Authenticated payment read-back | 20:10:12–18 Chicago: invoicePAID, orderCOMPLETED, one COMPLETED payment E5IoVc878Qoh0twHCSBOKQKvMELZY, 4200USD; journalSANDBOX_PAID_VERIFIED; projectedOrders PAID_VERIFIED/PAID |
| Full simulated refund | 20:10:30–42: one $42 refund created, initialPENDING; HOLD applied before POST |
| Refund replay/read-back | 20:11:00–06: same refundID, GET-only recovery; COMPLETED4200USD; payment refunded_money4200; one refundID |
| Purchasing exclusion | OrderHOLD; refund/dispute holdTRUE; paymentEligibleFALSE; Queue payment-confirmedFALSE; ownerNOT_APPROVED; create/email gatesOFF |
| Other fixtures | Still3orders/6lines/3queue entries; other two remainVALIDATED/NOT_CREATED |
| API switch | MATRIX_SANDBOX_API_ENABLED=false in finally after every completed/failed execution |

Refund ID: E5IoVc878Qoh0twHCSBOKQKvMELZY_DXvehY3OIsbHAPwMmcTh5A4NC0rO6p8x2EFRXXyPs9D.

## Corrections and read-back

1. Earlier HTTP400 was VALUE_TOO_LONG at order.reference_id. Internal TEST-ORDER- plus32hex was43characters; Square permits40. Square-specific reference is now TEST- plus the same32hex (37characters). Existing internal IDs, customer, action retry keys and quote remain unchanged. Source3f1498caf0dc4236cb48258c0dc13b2fb3a8a196.
2. Actual published Sandbox URL uses app.squareupsandbox.com. Strict allowlist now accepts root or app subdomain only, rejects production/lookalikes. Publication persisted before this validation error; recovery detected existingUNPAID rather than duplicate publication. Source723934a1e3431651849cccf4c93ff4843b3a4659.
3. First paid reconciliation safely journaled verified payment but sheet rejected SANDBOX_PAID_VERIFIED. Existing strict columnO enum uses PAID_VERIFIED. Runtime projection now maps that label, preserving explicit Sandbox journal state and purchasing exclusions. No sheet-validation or permission change. Source32cd1654b3aa4b6e8863dbd8461d94265263015d. Runtime saved, reloaded and copied back with exact equality after CRLF normalization. Final source uses the existing lifecycle module and credentials.

73 local cases pass:21original,34runtime,7draft-provider QA,11lifecycle. Node runner reports54 test entries because the21original cases are wrapped in2 files. These local tests are separate from the live Sandbox results above.

## Provider discrepancy — not a production certification

The authenticated refund is COMPLETED and payment refunded_money equals4200; however, Square invoice remainsPAID/version2 and the hosted screen still sayspaid. We did not overwrite or infer its invoice status. The implementation already gives refund evidence precedence and keepsHOLD.

Square's September17,2026 developer-forum response describes this exact Sandbox parity gap: https://developer.squareup.com/forums/t/sandbox-invoice-remains-paid-after-the-full-payment-refund-is-completed/27863/3 . Its normal invoice contract says a full refund changes invoice status: https://developer.squareup.com/docs/invoices-api/pay-refund-invoices . Therefore refund-object/payment verification and exclusion areTESTED; invoice REFUNDED transition isNOT VERIFIED inSandbox. No production account or alternate live tender test was initiated.

## Evidence and boundaries

- evidence/sandbox-lifecycle-verified.json: execution logs and connected-sheet read-backs; synthetic IDs/status/money only.
- evidence/square-payment-verified.jpg: hosted paid confirmation.
- evidence/square-refund-verified.jpg: completed refund, HOLD and APIflagfalse.
- No secrets, real card details or real customer data in source/evidence. Public source uses synthetic identifiers only.
- Existing Wix automation remainsinactive; site integrationunpublished; no recurringprocessor or newdeployment installed.
- Customer cart/CAPTCHA, approved-catalogsync, generic approved-productprocessor, policyconfiguration, productioninvoiceemail and finalpublication still needimplementation/QA. This receipt does not mean addingproductsalone enablesordering.
