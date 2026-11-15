# VERIFIED — Square Sandbox draft + replay — 2026-11-15 UTC

Google consent completed. Actual provider test passed November 14, 2026 19:56:42–55 America/Chicago.

- Selected submission TEST-STAGE2-TRANSPORT-002; internal order TEST-ORDER-67b5d53207aaf384c57d3941fa14b082.
- Existing Sandbox customer AQSJ3T62RK7MMGEFGDKBAA8598 reused.
- Square order CnfTXiQJla29bpSccU6V2PUvta4F; invoice inv:0-ChBvEd2_INMsq2DAPxPhNm2cELIN, version 0.
- GET invoice + GET order verified before and after replay: DRAFT, total 4200 cents USD, paid 0, SHARE_MANUALLY, automatic payment source NONE, example.invalid recipient, paymentEligible false.
- Replay returned SAME_INVOICE; no replacement customer/order/invoice created by replay.
- Final log MATRIX_SANDBOX_API_ENABLED false; execution completed.
- Connected-sheet readback: 3 existing synthetic orders, selected row now DRAFT/AWAITING_INVOICE, other rows unchanged. All queue create/email gates OFF; all owner releases NOT_APPROVED.
- RuntimeV2.gs and SandboxV2QA.gs saved, reloaded, copied back exactly after CRLF normalization. Source correction commit 3f1498caf0dc4236cb48258c0dc13b2fb3a8a196. 40 V2 local tests passed (plus 21 prior V1 cases already verified).

The prior 400 was conclusively diagnosed in Square API logs: VALUE_TOO_LONG, field order.reference_id, detail “Field must not be greater than 40 length.” Only the Square reference mapping changed from 43 to 37 characters, preserving all digest bits and existing provider retry keys. The initial rejected request created no order. The installed diagnostic now returns allowlisted codes/field paths only.

No production invoice, email, payment, wholesale order, subscription, website publication or automation activation. The sandbox invoice remains an unsent DRAFT. Payment/refund lifecycle, customer form/CAPTCHA, approved-catalog synchronization, recurring reconciliation, final policies and release remain unfinished.
