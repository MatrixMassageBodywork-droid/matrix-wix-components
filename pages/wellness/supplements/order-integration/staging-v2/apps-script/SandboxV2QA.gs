/* Manual Sandbox verification. No production endpoint, publish, email or payment. */
function matrixStageV2SandboxAssert_(ok, code) { if (!ok) throw new Error(code); }
function matrixStageV2SandboxJob_() {
  var p = PropertiesService.getScriptProperties();
  var id = p.getProperty('MATRIX_SANDBOX_SUBMISSION_ID');
  matrixStageV2SandboxAssert_(id === 'TEST-STAGE2-TRANSPORT-002', 'SELECTED_FIXTURE_MISMATCH');
  var job = matrixStageV2States_()[id];
  matrixStageV2SandboxAssert_(job && job.environment === 'SANDBOX' && job.quote.totalCents === 4200 && job.paymentEligible === false && /@example\.invalid$/.test(job.request.email), 'SANDBOX_FIXTURE_MISMATCH');
  matrixStageV2SandboxAssert_(p.getProperty('SQUARE_SANDBOX_LOCATION_ID') === 'LNP57TAA5YGP0', 'SANDBOX_LOCATION_MISMATCH');
  matrixStageV2SandboxAssert_(!!p.getProperty('SQUARE_SANDBOX_ACCESS_TOKEN'), 'SANDBOX_TOKEN_MISSING');
  return job;
}
function matrixStageV2ReadDraft_() {
  var j = matrixStageV2SandboxJob_();
  matrixStageV2SandboxAssert_(j.invoiceId && j.squareOrderId, 'DRAFT_NOT_CREATED');
  var i = matrixStageV2SandboxCall_('GET', '/v2/invoices/' + encodeURIComponent(j.invoiceId)).invoice;
  var o = matrixStageV2SandboxCall_('GET', '/v2/orders/' + encodeURIComponent(j.squareOrderId)).order;
  matrixStageV2SandboxAssert_(i && i.id === j.invoiceId && i.order_id === j.squareOrderId && i.location_id === j.locationId, 'INVOICE_IDENTITY_MISMATCH');
  matrixStageV2SandboxAssert_(o && o.id === j.squareOrderId && o.reference_id === MatrixStageV2.squareReference(j) && o.location_id === j.locationId && o.total_money.amount === 4200 && o.total_money.currency === 'USD', 'ORDER_READBACK_MISMATCH');
  matrixStageV2SandboxAssert_(i.status === 'DRAFT' && i.delivery_method === 'SHARE_MANUALLY' && i.store_payment_method_enabled === false, 'INVOICE_SAFETY_MISMATCH');
  matrixStageV2SandboxAssert_(i.primary_recipient.customer_id === j.customerId && i.primary_recipient.email_address === j.request.email, 'RECIPIENT_MISMATCH');
  matrixStageV2SandboxAssert_(i.payment_requests.length === 1 && i.payment_requests[0].automatic_payment_source === 'NONE' && i.payment_requests[0].computed_amount_money.amount === 4200 && i.payment_requests[0].computed_amount_money.currency === 'USD' && i.payment_requests[0].total_completed_amount_money.amount === 0, 'PAYMENT_REQUEST_MISMATCH');
  return { environment: 'SANDBOX', orderId: j.orderId, squareOrderId: o.id, invoiceId: i.id, status: i.status, totalCents: o.total_money.amount, paidCents: 0, deliveryMethod: i.delivery_method, paymentEligible: false };
}
/** Explicit manual test; always closes Sandbox gate, including failure paths. */
function matrixStageV2TestSandboxDraft() {
  var p = PropertiesService.getScriptProperties();
  matrixStageV2Verify(); matrixStageV2SandboxJob_();
  p.setProperty('MATRIX_SANDBOX_API_ENABLED', 'true');
  try {
    var first = matrixStageV2CreateSandboxDraft();
    var before = matrixStageV2ReadDraft_();
    var second = matrixStageV2CreateSandboxDraft();
    var after = matrixStageV2ReadDraft_();
    matrixStageV2SandboxAssert_(first.invoiceId === second.invoiceId && before.invoiceId === after.invoiceId && before.squareOrderId === after.squareOrderId, 'REPLAY_CREATED_DIFFERENT_OBJECT');
    var result = Object.assign(after, { duplicateReplay: 'SAME_INVOICE', productionEnabled: false, invoiceEmailsSent: 0 });
    console.log('MATRIX_SANDBOX_PROVIDER_VERIFIED ' + JSON.stringify(result));
    return result;
  } finally {
    p.setProperty('MATRIX_SANDBOX_API_ENABLED', 'false');
    console.log('MATRIX_SANDBOX_API_ENABLED false');
  }
}
