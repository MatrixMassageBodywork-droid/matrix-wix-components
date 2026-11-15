/* Matrix supplemental staging runtime. Additive to V1 Core.gs/Code.gs.
 * Only TEST-* submissions and @example.invalid identities can enter this runtime.
 * No production URL, email sender, card charge, trigger installer or wholesale writer.
 */
var MatrixStageV2 = (function () {
  'use strict';
  function requireValue(ok, code) { if (!ok) { var e = new Error(code); e.code = code; throw e; } }
  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function fixtureCatalog() {
    return [
      { itemId: 'TEST-PRODUCT-A', kind: 'PRODUCT', displayName: 'TEST ONLY — sample product', monthlyPriceCents: 1200 },
      { itemId: 'TEST-PRODUCT-B', kind: 'PRODUCT', displayName: 'TEST ONLY — second sample', monthlyPriceCents: 800 },
      { itemId: 'TEST-BUNDLE-AB', kind: 'BUNDLE', displayName: 'TEST ONLY — sample bundle', monthlyPriceCents: 1800 }
    ].map(function (x) { return Object.assign(x, { revision: 'TEST-V2-1', variant: 'Synthetic fixture', status: 'APPROVED', ownerApproval: 'APPROVED', resaleReview: 'REVIEWED' }); });
  }
  function fixtureComponents() {
    return ['A', 'B'].map(function (suffix) { return { bundleId: 'TEST-BUNDLE-AB', bundleRevision: 'TEST-V2-1', productSku: 'TEST-PRODUCT-' + suffix, quantityPerBundle: 1, approval: 'APPROVED', activeFrom: '', activeTo: '' }; });
  }
  function request(raw, core) {
    requireValue(raw && /^TEST-[A-Za-z0-9_-]{8,100}$/.test(raw.submissionId || ''), 'TEST_SUBMISSION_REQUIRED');
    var email = String(raw.email || '').trim().toLowerCase();
    requireValue(/^[a-z0-9._+-]{1,64}@example\.invalid$/.test(email), 'TEST_EMAIL_REQUIRED');
    requireValue(raw.termsAccepted === true || raw.termsAccepted === 'true' || raw.termsAccepted === 'TRUE', 'TERMS_REQUIRED');
    requireValue(raw.cycleId === 'TEST-CYCLE-V2' && raw.fulfillment === 'TEST_PICKUP', 'TEST_POLICY_REQUIRED');
    var cart = typeof raw.cart === 'string' ? JSON.parse(raw.cart) : raw.cart;
    requireValue(Array.isArray(cart), 'INVALID_CART');
    cart.forEach(function (line) {
      requireValue(line && Object.keys(line).every(function (k) { return k === 'itemId' || k === 'quantity'; }), 'CLIENT_PRICE_OR_UNKNOWN_FIELD');
      requireValue(String(line.itemId || '').startsWith('TEST-'), 'TEST_ITEM_REQUIRED');
    });
    cart = core.normalizeCart(cart).sort(function (a, b) { return a.itemId.localeCompare(b.itemId); });
    return { submissionId: raw.submissionId, customerName: 'Matrix synthetic test', email: email, cart: cart, cycleId: raw.cycleId, fulfillment: raw.fulfillment, termsAccepted: true, marketingOptIn: false };
  }
  function quoted(request, catalog, components, core, atUtc) {
    var at = Date.parse(atUtc);
    requireValue(Number.isFinite(at), 'INVALID_TEST_TIME');
    var selectedBundles = new Set(request.cart.map(function (x) { return x.itemId; }));
    components.filter(function (p) { return selectedBundles.has(p.bundleId); }).forEach(function (p) {
      requireValue(p.approval === 'APPROVED', 'COMPONENT_NOT_APPROVED');
      requireValue(!p.activeFrom || (Number.isFinite(Date.parse(p.activeFrom)) && Date.parse(p.activeFrom) <= at), 'COMPONENT_NOT_ACTIVE');
      requireValue(!p.activeTo || (Number.isFinite(Date.parse(p.activeTo)) && Date.parse(p.activeTo) > at), 'COMPONENT_EXPIRED');
    });
    return clone(core.quote(request.cart, catalog, components, { catalogApproved: true, taxPolicyApproved: true, fulfillmentApproved: true, cycleApproved: true, taxCents: 0, fulfillmentFeeCents: 0, cycleId: request.cycleId, priceVersion: 'TEST-V2-1' }));
  }
  function prepare(raw, existing, deps) {
    var normalized = request(raw, deps.core);
    var fingerprint = deps.hash(JSON.stringify(normalized));
    if (existing) {
      requireValue(existing.fingerprint === fingerprint, 'DUPLICATE_PAYLOAD_CONFLICT');
      return clone(existing);
    }
    var now = deps.now;
    return { schema: 2, environment: 'SANDBOX', orderId: 'TEST-ORDER-' + deps.hash(normalized.submissionId).slice(0, 32), submissionId: normalized.submissionId, fingerprint: fingerprint, request: normalized, createdUtc: now, dueDate: new Date(Date.parse(now) + 7 * 86400000).toISOString().slice(0, 10), quote: quoted(normalized, deps.catalog, deps.components, deps.core, now), state: 'VALIDATED', ownerRelease: 'NOT_APPROVED', paymentEligible: false };
  }
  function invoiceBodies(job, locationId) {
    requireValue(job.environment === 'SANDBOX' && job.orderId.startsWith('TEST-ORDER-'), 'SANDBOX_ONLY');
    requireValue(job.quote.taxCents === 0 && job.quote.fulfillmentFeeCents === 0, 'TEST_ZERO_TAX_FEE_ONLY');
    return {
      customer: { idempotency_key: job.orderId + '-customer', given_name: 'Matrix synthetic test', email_address: job.request.email, reference_id: job.orderId },
      order: { idempotency_key: job.orderId + '-order', order: { location_id: locationId, reference_id: job.orderId, line_items: job.quote.lines.map(function (line) { return { name: line.nameSnapshot, quantity: String(line.quantity), base_price_money: { amount: line.unitPriceCents, currency: 'USD' } }; }) } },
      invoice: { idempotency_key: job.orderId + '-invoice', invoice: { location_id: locationId, order_id: job.squareOrderId, primary_recipient: { customer_id: job.customerId }, delivery_method: 'SHARE_MANUALLY', title: 'TEST ONLY — Matrix supplement order', payment_requests: [{ request_type: 'BALANCE', due_date: job.dueDate, tipping_enabled: false, automatic_payment_source: 'NONE' }], accepted_payment_methods: { card: true, square_gift_card: false, bank_account: false, buy_now_pay_later: false, cash_app_pay: false }, store_payment_method_enabled: false } }
    };
  }
  // Each provider result is journaled before the next call. Replays use identical body/key.
  function createDraft(job, io) {
    requireValue(io.enabled === true && io.locationId, 'SANDBOX_API_DISABLED');
    job = clone(job);
    requireValue(!job.locationId || job.locationId === io.locationId, 'LOCATION_CHANGED');
    job.locationId = io.locationId;
    if (!job.customerId) {
      io.save(job);
      var c = io.call('POST', '/v2/customers', invoiceBodies(job, io.locationId).customer);
      requireValue(c.customer && c.customer.id, 'CUSTOMER_RESPONSE_INVALID');
      job.customerId = c.customer.id; io.save(job);
    }
    if (!job.squareOrderId) {
      var o = io.call('POST', '/v2/orders', invoiceBodies(job, io.locationId).order).order;
      requireValue(o && o.id && o.location_id === io.locationId && o.reference_id === job.orderId && o.total_money && o.total_money.amount === job.quote.totalCents && o.total_money.currency === 'USD', 'ORDER_RESPONSE_MISMATCH');
      job.squareOrderId = o.id; io.save(job);
    }
    if (!job.invoiceId) {
      var i = io.call('POST', '/v2/invoices', invoiceBodies(job, io.locationId).invoice).invoice;
      requireValue(i && i.id && i.order_id === job.squareOrderId && i.location_id === io.locationId && i.status === 'DRAFT', 'INVOICE_RESPONSE_MISMATCH');
      job.invoiceId = i.id; job.invoiceVersion = i.version; job.invoiceStatus = i.status; job.state = 'AWAITING_INVOICE'; io.save(job);
    }
    return job;
  }
  // Purchase eligibility deliberately remains false in all sandbox states.
  function inspectPayment(job, invoice, order, payments, disputes) {
    requireValue(invoice && invoice.id === job.invoiceId && invoice.order_id === job.squareOrderId && invoice.location_id === job.locationId, 'INVOICE_IDENTITY_MISMATCH');
    requireValue(order && order.id === job.squareOrderId && order.reference_id === job.orderId && order.location_id === job.locationId, 'ORDER_IDENTITY_MISMATCH');
    requireValue(Array.isArray(payments) && Array.isArray(disputes), 'PROVIDER_EVIDENCE_REQUIRED');
    var hold = false, paid = 0, seen = new Set();
    payments.forEach(function (p) {
      requireValue(p.id && !seen.has(p.id) && p.order_id === job.squareOrderId && p.location_id === job.locationId, 'PAYMENT_IDENTITY_MISMATCH');
      seen.add(p.id);
      requireValue(p.amount_money && p.amount_money.currency === 'USD' && Number.isSafeInteger(p.amount_money.amount), 'PAYMENT_MONEY_INVALID');
      if ((p.refunded_money && p.refunded_money.amount > 0) || (p.refund_ids && p.refund_ids.length)) hold = true;
      if (p.status === 'COMPLETED') paid += p.amount_money.amount;
    });
    if (disputes.some(function (d) { return d.disputed_payment && seen.has(d.disputed_payment.payment_id); })) hold = true;
    if (/REFUND|CANCEL/.test(invoice.status || '')) hold = true;
    return { state: hold ? 'HOLD' : invoice.status === 'PAID' && paid === job.quote.totalCents ? 'SANDBOX_PAID_VERIFIED' : 'AWAITING_PAYMENT', refundOrDisputeHold: hold, paidCents: paid, paymentEligible: false };
  }
  return { request: request, prepare: prepare, fixtureCatalog: fixtureCatalog, fixtureComponents: fixtureComponents, invoiceBodies: invoiceBodies, createDraft: createDraft, inspectPayment: inspectPayment };
})();

function matrixStageV2Hash_(text) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, text, Utilities.Charset.UTF_8).map(function (b) { return ('0' + (b & 255).toString(16)).slice(-2); }).join('');
}
function matrixStageV2Sheet_(name) { return matrixGetSheet_(MATRIX_ORDER_IDS.PRIVATE, name); }
function matrixStageV2Rows_(name, header, width) {
  var s = matrixStageV2Sheet_(name), last = s.getLastRow();
  if (last > 5000) throw new Error('STAGING_ROW_LIMIT_REVIEW_REQUIRED');
  return last > header ? s.getRange(header + 1, 1, last - header, width).getValues() : [];
}
function matrixStageV2Lock_(fn) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) throw new Error('STAGING_BUSY_RETRY');
  try { return fn(); } finally { lock.releaseLock(); }
}
function matrixStageV2States_() {
  var states = {};
  matrixStageV2Rows_('Event Log', 5, 9).forEach(function (r) {
    if (r[3] === 'MATRIX_STAGE_V2_STATE') {
      var job = JSON.parse(String(r[8]));
      if (job.schema !== 2 || !job.submissionId.startsWith('TEST-')) throw new Error('STAGING_JOURNAL_INVALID');
      states[job.submissionId] = job;
    }
  });
  return states;
}
function matrixStageV2Save_(job) {
  var payload = JSON.stringify(job);
  if (payload.length > 45000) throw new Error('STAGING_SNAPSHOT_TOO_LARGE');
  var s = matrixStageV2Sheet_('Event Log');
  s.getRange(Math.max(6, s.getLastRow() + 1), 1, 1, 9).setValues([[Utilities.getUuid(), job.orderId, 'MATRIX_STAGING_V2', 'MATRIX_STAGE_V2_STATE', new Date().toISOString(), job.state, false, 'SANDBOX_ONLY', payload]]);
  SpreadsheetApp.flush();
}
function matrixStageV2Upsert_(name, header, row, keys) {
  var s = matrixStageV2Sheet_(name), rows = matrixStageV2Rows_(name, header, row.length);
  var matches = [];
  rows.forEach(function (r, i) { if (keys.every(function (k) { return r[k] === row[k]; })) matches.push(header + 1 + i); });
  if (matches.length > 1) throw new Error('DUPLICATE_PROJECTION_REVIEW_REQUIRED');
  s.getRange(matches.length ? matches[0] : Math.max(header + 1, s.getLastRow() + 1), 1, 1, row.length).setValues([row]);
}
function matrixStageV2Project_(j) {
  var q = j.quote;
  matrixStageV2Upsert_('Orders V2', 5, [j.orderId, j.submissionId, j.createdUtc, j.request.customerName, j.request.email, j.request.fulfillment, q.cycleId, j.dueDate + 'T23:59:59Z', q.subtotalCents, q.taxCents, q.fulfillmentFeeCents, q.totalCents, q.currency, q.priceVersion, j.state, j.invoiceStatus || 'NOT_CREATED', j.invoiceId || '', j.invoiceVersion === undefined ? '' : j.invoiceVersion, j.invoiceUrl || '', '', '', j.refundOrDisputeHold ? 'HOLD' : '', '', 'NOT_APPROVED'], [0]);
  q.lines.forEach(function (l) {
    matrixStageV2Upsert_('Order Lines V2', 5, [j.orderId, l.lineId, l.kind, l.itemId, l.nameSnapshot, l.variantSnapshot, l.quantity, l.unitPriceCents, l.lineSubtotalCents, l.catalogRevision, 'TEST_MONTHLY', 'TEST_ONLY', 'SYNTHETIC_FIXTURE', 'Not approved for purchasing', JSON.stringify(l.componentSnapshot), l.kind === 'BUNDLE' ? l.catalogRevision : ''], [0, 1]);
  });
  matrixStageV2Upsert_('Invoice Queue V2', 5, [j.orderId, 'SANDBOX', 'OFF', 'OFF', j.orderId + '-invoice', j.invoiceId || '', j.invoiceStatus || 'NOT_CREATED', new Date().toISOString(), false, !!j.refundOrDisputeHold, 0, '', 'MATRIX_STAGE_V2_STATE'], [0]);
}
/** Manual processor. Ignores every non-test row; never contacts Square. */
function matrixStageV2ProcessIntake() {
  return matrixStageV2Lock_(function () {
    var states = matrixStageV2States_(), result = { mode: 'STAGING_V2', processed: 0, duplicates: 0, rejected: 0, externalCalls: 0, productionEnabled: false };
    var sheet = matrixStageV2Sheet_('Cart Intake V2');
    matrixStageV2Rows_('Cart Intake V2', 1, 15).forEach(function (r, index) {
      if (!String(r[0]).startsWith('TEST-')) return;
      try {
        var raw = { submissionId: String(r[0]), email: String(r[3]), cart: String(r[6]), cycleId: String(r[7]), fulfillment: String(r[5]), termsAccepted: r[9] };
        var previous = states[raw.submissionId];
        var job = MatrixStageV2.prepare(raw, previous, { core: MatrixOrderCore, hash: matrixStageV2Hash_, now: new Date().toISOString(), catalog: MatrixStageV2.fixtureCatalog(), components: MatrixStageV2.fixtureComponents() });
        if (!previous) { matrixStageV2Save_(job); states[raw.submissionId] = job; result.processed++; } else { result.duplicates++; }
        matrixStageV2Project_(job);
        sheet.getRange(index + 2, 12, 1, 4).setValues([['PROCESSED', job.orderId, job.orderId, 'TEST ONLY — validated; invoice not sent']]);
      } catch (error) {
        // Whitelist only machine error codes; never put provider bodies/credentials in cells.
        var code = /^[A-Z0-9_]{3,80}$/.test(error.code || error.message) ? (error.code || error.message) : 'STAGING_PROCESSING_ERROR';
        sheet.getRange(index + 2, 12).setValue('HOLD'); sheet.getRange(index + 2, 15).setValue(code); result.rejected++;
      }
    });
    console.log('MATRIX_STAGE_V2_PROCESS ' + JSON.stringify(result));
    return result;
  });
}
function matrixStageV2SandboxCall_(method, path, body) {
  var p = PropertiesService.getScriptProperties();
  if (p.getProperty('MATRIX_SANDBOX_API_ENABLED') !== 'true') throw new Error('SANDBOX_API_DISABLED');
  var token = p.getProperty('SQUARE_SANDBOX_ACCESS_TOKEN');
  if (!token) throw new Error('SANDBOX_TOKEN_MISSING');
  if (!/^\/v2\/(customers|orders|invoices)(\/[^?#]+)?$/.test(path) || !['GET', 'POST'].includes(method)) throw new Error('SANDBOX_ENDPOINT_NOT_ALLOWED');
  var options = { method: method.toLowerCase(), headers: { Authorization: 'Bearer ' + token, 'Square-Version': '2026-09-16' }, contentType: 'application/json', muteHttpExceptions: true, followRedirects: false };
  if (body) options.payload = JSON.stringify(body);
  var response = UrlFetchApp.fetch('https://connect.squareupsandbox.com' + path, options);
  if (response.getResponseCode() < 200 || response.getResponseCode() >= 300) throw new Error('SQUARE_SANDBOX_HTTP_' + response.getResponseCode());
  return JSON.parse(response.getContentText());
}
/** Manual, sandbox DRAFT only; credential and external-request scope required. */
function matrixStageV2CreateSandboxDraft() {
  return matrixStageV2Lock_(function () {
    var p = PropertiesService.getScriptProperties();
    var selected = p.getProperty('MATRIX_SANDBOX_SUBMISSION_ID');
    var job = matrixStageV2States_()[selected];
    if (!job) throw new Error('SELECT_EXISTING_TEST_SUBMISSION');
    var result = MatrixStageV2.createDraft(job, { enabled: p.getProperty('MATRIX_SANDBOX_API_ENABLED') === 'true', locationId: p.getProperty('SQUARE_SANDBOX_LOCATION_ID'), call: matrixStageV2SandboxCall_, save: matrixStageV2Save_ });
    matrixStageV2Project_(result);
    console.log('MATRIX_SANDBOX_DRAFT ' + JSON.stringify({ orderId: result.orderId, invoiceId: result.invoiceId, status: result.invoiceStatus, emailsSent: 0, productionEnabled: false }));
    return { orderId: result.orderId, invoiceId: result.invoiceId, status: result.invoiceStatus };
  });
}
/** Live Google read-back, no writes or provider calls. */
function matrixStageV2Verify() {
  var states = matrixStageV2States_(), ids = Object.keys(states), health = matrixStagingHealthCheck();
  if (health.quoteGate || health.invoiceSendGate || health.publicOfferGate) throw new Error('PRODUCTION_GATE_UNEXPECTEDLY_OPEN');
  var report = { runtime: 'STAGING_V2', testOrders: ids.length, totalCents: ids.reduce(function (n, id) { return n + states[id].quote.totalCents; }, 0), productionEnabled: false, publicOffers: false, emailsSentByRuntime: 0, externalCalls: 0 };
  console.log('MATRIX_STAGE_V2_VERIFY ' + JSON.stringify(report)); return report;
}
if (typeof module !== 'undefined' && module.exports) module.exports = MatrixStageV2;
