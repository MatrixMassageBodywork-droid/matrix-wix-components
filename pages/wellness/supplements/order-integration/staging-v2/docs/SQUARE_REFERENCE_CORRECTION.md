# Square order reference correction — 2026-11-15 UTC

## Evidence and diagnosis
The owner completed Google consent and ran the installed test. Apps Script execution November 14 19:51:22–27 Chicago failed with SQUARE_SANDBOX_HTTP_400 at RuntimeV2.gs:77 (CreateOrder). The finally block logged MATRIX_SANDBOX_API_ENABLED false. The Event Log was inspected first: selected TEST-STAGE2-TRANSPORT-002 has one saved customer ID AQSJ3T62RK7MMGEFGDKBAA8598, no Square order ID and no invoice ID. The earlier 01:05 UTC attempt saved only location; do not infer its result beyond the journal.

Square Order.reference_id has documented maximum length 40. Our internal TEST-ORDER- plus 32 hexadecimal digits is 43 characters. Keep that internal ID and ALL existing provider idempotency keys. Map only Square Order.reference_id to TEST- plus the same full 32 hexadecimal digits (37 characters). No truncation of digest/uniqueness, no new fixture, no customer recreation. Update the provider-readback assertions consistently. Use the existing order idempotency key for the corrected rejected request. If Square rejects reuse, inspect exact error and provider logs; never switch to a new key blindly.

Primary contract: https://developer.squareup.com/reference/square/objects/Order and https://developer.squareup.com/reference/square/orders-api/create-order (reference max 40; idempotency max 192).

## Deterministic installation and QA
1. In the same existing Apps Script project, verify the current runtime/QA code before editing. Replace only RuntimeV2.gs and SandboxV2QA.gs with this correction. All other files, properties, gates, fixtures, sheet formulas, triggers and external app settings remain unchanged.
2. Save each file, reload, copy back both files, compare after CRLF normalization. Stop on mismatch; inspect persistence before retry.
3. Run matrixStageV2TestSandboxDraft once. It reuses the saved customer and retained order/invoice retry keys. Expected provider readback DRAFT, 4200 USD cents, paid 0, SHARE_MANUALLY, same invoice/order on replay, productionEnabled false. The test must close its Sandbox flag even if an error occurs.
4. Read Event Log, Orders V2 and Invoice Queue V2 through the connected sheet tool. Confirm 3 existing synthetic orders/6 lines/3 queues; only selected fixture gains provider IDs. No production data, invoice sending, publishing, payment, website publication or Wix automation activation.
5. Record actual provider IDs, timestamps and read-back status in current checkpoint. This is a draft-only provider test, not full invoice/payment lifecycle or customer website flow.

The correction includes regression coverage of the real 40-character provider boundary and unchanged idempotency keys. Provider errors now retain allowlisted machine codes/field paths only, never detail text, credentials, response bodies or customer data.
