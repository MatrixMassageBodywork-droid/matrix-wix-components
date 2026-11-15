/* Manual Sandbox lifecycle for one existing synthetic fixture. No production calls,
 * emails, automatic payment, card storage, triggers or purchasing eligibility. */
function matrixStageV2LifecycleCall_(method, path, body) {
  if (/^\/v2\/(invoices|orders)\//.test(path)) return matrixStageV2SandboxCall_(method, path, body);
  var allowed = method === 'GET' && (/^\/v2\/(payments|refunds)\/[^/?#]+$/.test(path) || /^\/v2\/disputes\?location_id=[A-Z0-9]+(&cursor=[A-Za-z0-9_.!~*'()%\-]+)?$/.test(path));
  allowed = allowed || method === 'POST' && path === '/v2/refunds';
  matrixStageV2SandboxAssert_(allowed, 'LIFECYCLE_ENDPOINT_NOT_ALLOWED');
  var p = PropertiesService.getScriptProperties();
  matrixStageV2SandboxAssert_(p.getProperty('MATRIX_SANDBOX_API_ENABLED') === 'true', 'SANDBOX_API_DISABLED');
  var token = p.getProperty('SQUARE_SANDBOX_ACCESS_TOKEN');
  matrixStageV2SandboxAssert_(!!token, 'SANDBOX_TOKEN_MISSING');
  var options = { method: method.toLowerCase(), headers: { Authorization: 'Bearer ' + token, 'Square-Version': '2026-09-16' }, contentType: 'application/json', muteHttpExceptions: true, followRedirects: false };
  if (body) options.payload = JSON.stringify(body);
  var response = UrlFetchApp.fetch('https://connect.squareupsandbox.com' + path, options);
  matrixStageV2SandboxAssert_(response.getResponseCode() >= 200 && response.getResponseCode() < 300, 'SQUARE_SANDBOX_HTTP_' + response.getResponseCode());
  return JSON.parse(response.getContentText());
}
function matrixStageV2LifecycleRun_(fn) {
  return matrixStageV2Lock_(function () {
    var p = PropertiesService.getScriptProperties();
    matrixStageV2Verify();
    var j = matrixStageV2SandboxJob_();
    matrixStageV2SandboxAssert_(j.invoiceId === 'inv:0-ChBvEd2_INMsq2DAPxPhNm2cELIN' && j.squareOrderId === 'CnfTXiQJla29bpSccU6V2PUvta4F', 'SELECTED_PROVIDER_FIXTURE_MISMATCH');
    p.setProperty('MATRIX_SANDBOX_API_ENABLED', 'true');
    try { return fn(j); }
    finally { p.setProperty('MATRIX_SANDBOX_API_ENABLED', 'false'); console.log('MATRIX_SANDBOX_API_ENABLED false'); }
  });
}
function matrixStageV2LifecycleRead_(j) {
  var call = matrixStageV2LifecycleCall_;
  var i = call('GET', '/v2/invoices/' + encodeURIComponent(j.invoiceId)).invoice;
  var o = call('GET', '/v2/orders/' + encodeURIComponent(j.squareOrderId)).order;
  matrixStageV2SandboxAssert_(i && i.id === j.invoiceId && i.order_id === j.squareOrderId && i.location_id === j.locationId, 'INVOICE_IDENTITY_MISMATCH');
  matrixStageV2SandboxAssert_(o && o.id === j.squareOrderId && o.reference_id === MatrixStageV2.squareReference(j) && o.location_id === j.locationId && o.total_money.amount === j.quote.totalCents && o.total_money.currency === 'USD', 'ORDER_READBACK_MISMATCH');
  matrixStageV2SandboxAssert_(i.delivery_method === 'SHARE_MANUALLY' && i.store_payment_method_enabled === false && i.primary_recipient.customer_id === j.customerId && i.primary_recipient.email_address === j.request.email, 'INVOICE_SAFETY_MISMATCH');
  matrixStageV2SandboxAssert_(i.payment_requests.length === 1 && i.payment_requests[0].automatic_payment_source === 'NONE' && i.payment_requests[0].computed_amount_money.amount === j.quote.totalCents && i.payment_requests[0].computed_amount_money.currency === 'USD', 'PAYMENT_REQUEST_MISMATCH');
  if (i.public_url) matrixStageV2SandboxAssert_(/^https:\/\/(app\.)?squareupsandbox\.com\//.test(i.public_url), 'NON_SANDBOX_INVOICE_URL');
  var tenders = o.tenders || [];
  matrixStageV2SandboxAssert_(tenders.length <= 20, 'TENDER_LIMIT');
  var payments = tenders.map(function (t) {
    matrixStageV2SandboxAssert_(t.id && (!t.payment_id || t.id === t.payment_id), 'TENDER_ID_MISMATCH');
    return call('GET', '/v2/payments/' + encodeURIComponent(t.payment_id || t.id)).payment;
  });
  var disputes = [], cursor = '', seen = {}, pages = 0;
  do {
    matrixStageV2SandboxAssert_(pages++ < 20 && !seen[cursor], 'DISPUTE_PAGINATION_INCOMPLETE'); seen[cursor] = true;
    var d = call('GET', '/v2/disputes?location_id=' + encodeURIComponent(j.locationId) + (cursor ? '&cursor=' + encodeURIComponent(cursor) : ''));
    matrixStageV2SandboxAssert_(!d.errors && (!d.disputes || Array.isArray(d.disputes)), 'DISPUTE_READBACK_INVALID');
    disputes = disputes.concat(d.disputes || []); cursor = d.cursor || '';
  } while (cursor);
  var result = MatrixStageV2.inspectPayment(j, i, o, payments, disputes);
  var completed = i.payment_requests[0].total_completed_amount_money;
  matrixStageV2SandboxAssert_(completed && completed.currency === 'USD' && Number.isSafeInteger(completed.amount), 'INVOICE_PAID_MONEY_INVALID');
  if (i.status === 'PAID') matrixStageV2SandboxAssert_(completed.amount === j.quote.totalCents && result.paidCents === j.quote.totalCents && o.state === 'COMPLETED', 'PAID_READBACK_MISMATCH');
  return { invoice: i, order: o, payments: payments, result: result, invoicePaidCents: completed.amount, disputesChecked: disputes.length };
}
function matrixStageV2LifecycleSave_(j, evidence) {
  j.invoiceStatus = evidence.invoice.status; j.invoiceVersion = evidence.invoice.version;
  j.invoiceUrl = evidence.invoice.public_url || j.invoiceUrl || '';
  j.refundOrDisputeHold = !!(evidence.result.refundOrDisputeHold || j.refundIntent || j.refundId);
  j.state = j.refundOrDisputeHold ? 'HOLD' : evidence.invoice.status === 'DRAFT' ? 'AWAITING_INVOICE' : evidence.result.state;
  j.paymentEligible = false;
  j.lastProviderCheckedUtc = new Date().toISOString();
  // Record only payment IDs/status/money; never card, billing or token data.
  j.paymentEvidence = evidence.payments.map(function (p) { return { id: p.id, status: p.status, amountCents: p.amount_money.amount, refundedCents: p.refunded_money ? p.refunded_money.amount : 0, refundIds: p.refund_ids || [] }; });
  matrixStageV2Save_(j); matrixStageV2Project_(j);
  var result = { environment: 'SANDBOX', invoiceId: j.invoiceId, orderId: j.orderId, invoiceStatus: j.invoiceStatus, state: j.state, totalCents: j.quote.totalCents, providerPaidCents: evidence.result.paidCents, paymentCount: evidence.payments.length, refundOrDisputeHold: j.refundOrDisputeHold, paymentEligible: false, productionEnabled: false, invoiceEmailsSent: 0, publicUrl: j.invoiceUrl };
  console.log('MATRIX_SANDBOX_LIFECYCLE ' + JSON.stringify(result)); return result;
}
/** Publishes only the existing test invoice, SHARE_MANUALLY; never sends it. */
function matrixStageV2PublishSandboxInvoice() {
  return matrixStageV2LifecycleRun_(function (j) {
    var e = matrixStageV2LifecycleRead_(j);
    if (e.invoice.status === 'DRAFT') {
      if (j.publishVersion === undefined) { j.publishVersion = e.invoice.version; matrixStageV2Save_(j); }
      matrixStageV2SandboxAssert_(e.invoice.version === j.publishVersion, 'PUBLISH_VERSION_CHANGED');
      matrixStageV2LifecycleCall_('POST', '/v2/invoices/' + encodeURIComponent(j.invoiceId) + '/publish', { version: j.publishVersion, idempotency_key: j.orderId + '-publish' });
      e = matrixStageV2LifecycleRead_(j);
    }
    matrixStageV2SandboxAssert_(['UNPAID', 'PAID', 'REFUNDED', 'PARTIALLY_REFUNDED'].includes(e.invoice.status), 'PUBLISHED_STATE_UNEXPECTED');
    return matrixStageV2LifecycleSave_(j, e);
  });
}
/** Read provider state and project only this existing synthetic order. */
function matrixStageV2ReconcileSandboxInvoice() {
  return matrixStageV2LifecycleRun_(function (j) { return matrixStageV2LifecycleSave_(j, matrixStageV2LifecycleRead_(j)); });
}
/** Refunds exactly one $42 test payment after verified full payment. Replay safe. */
function matrixStageV2RefundSandboxPayment() {
  return matrixStageV2LifecycleRun_(function (j) {
    var e = matrixStageV2LifecycleRead_(j);
    if (!j.refundIntent) {
      matrixStageV2SandboxAssert_(e.invoice.status === 'PAID' && e.result.state === 'SANDBOX_PAID_VERIFIED' && e.payments.length === 1 && e.payments[0].amount_money.amount === 4200, 'PAID_TEST_REQUIRED');
      j.refundIntent = { idempotency_key: 'RF-' + matrixStageV2Hash_(j.orderId + ':full-refund').slice(0, 32), payment_id: e.payments[0].id, amount_money: { amount: 4200, currency: 'USD' }, reason: 'TEST ONLY - Matrix staging refund validation' };
      j.refundOrDisputeHold = true; j.state = 'HOLD'; matrixStageV2Save_(j); matrixStageV2Project_(j);
    }
    matrixStageV2SandboxAssert_(e.payments.some(function (p) { return p.id === j.refundIntent.payment_id; }) && j.refundIntent.amount_money.amount === 4200 && j.refundIntent.amount_money.currency === 'USD', 'REFUND_INTENT_MISMATCH');
    if (!j.refundId) {
      var r = matrixStageV2LifecycleCall_('POST', '/v2/refunds', j.refundIntent).refund;
      matrixStageV2SandboxAssert_(r && r.id && r.payment_id === j.refundIntent.payment_id && r.amount_money.amount === 4200 && r.amount_money.currency === 'USD', 'REFUND_RESPONSE_MISMATCH');
      j.refundId = r.id; matrixStageV2Save_(j);
    }
    var refund = matrixStageV2LifecycleCall_('GET', '/v2/refunds/' + encodeURIComponent(j.refundId)).refund;
    matrixStageV2SandboxAssert_(refund && refund.id === j.refundId && refund.payment_id === j.refundIntent.payment_id && refund.amount_money.amount === 4200 && refund.amount_money.currency === 'USD' && refund.location_id === j.locationId, 'REFUND_READBACK_MISMATCH');
    j.refundStatus = refund.status;
    var result = matrixStageV2LifecycleSave_(j, matrixStageV2LifecycleRead_(j));
    console.log('MATRIX_SANDBOX_REFUND ' + JSON.stringify({ refundId: j.refundId, status: j.refundStatus, amountCents: 4200, paymentEligible: false }));
    return result;
  });
}
