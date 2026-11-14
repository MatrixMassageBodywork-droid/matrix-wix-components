/*
 * Matrix supplement staging controller — deploy only into the existing private
 * Google Sheet's Apps Script project, after inspecting current scripts/triggers.
 * DO NOT overwrite any existing Apps Script project or enable production invoicing.
 * All gates default OFF in the sheet; no emails are sent by this code.
 */
const MATRIX_ORDER_IDS = Object.freeze({
  MASTER: '15swQj97kKIeEa1DWUyMFnwf_gIXgssswRoYLzv0lSOw',
  PRIVATE: '16hwNkp_gobTw2wHyb6N6_aTzmtOgIIPLPa5tIPdnxUY'
});
const MATRIX_ORDER_TABS = Object.freeze({
  CATALOG: 'Orderable Items V2',
  COMPONENTS: 'Bundle Components V2',
  INTAKE: 'Cart Intake V2',
  ORDERS: 'Orders V2',
  LINES: 'Order Lines V2',
  GATES: 'Launch Gate V2',
  EVIDENCE: 'Event Log'
});

function matrixGetSheet_(spreadsheetId, name) {
  const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(name);
  if (!sheet) throw new Error('Required sheet missing: ' + name);
  return sheet;
}
function matrixGetRows_(sheet, headerRow, columnCount) {
  const last = sheet.getLastRow();
  if (last <= headerRow) return [];
  return sheet.getRange(headerRow + 1, 1, Math.min(last - headerRow, 2000), columnCount).getValues();
}
function matrixReadGates_() {
  const rows = matrixGetRows_(matrixGetSheet_(MATRIX_ORDER_IDS.PRIVATE, MATRIX_ORDER_TABS.GATES), 5, 5);
  const out = {};
  rows.forEach(r => { if (r[0]) out[String(r[0])] = { state: r[2], owner: r[3] }; });
  return out;
}
function matrixGate_(gates, name) {
  return gates[name]?.owner === 'ON' && gates[name]?.state === 'READY';
}
function matrixUsdToCents_(value) {
  if (value === '' || value === null || !Number.isFinite(Number(value))) return NaN;
  const amount = Number(value);
  const cents = Math.round(amount * 100);
  if (amount <= 0 || Math.abs(amount * 100 - cents) > 0.000001) return NaN;
  return cents;
}
function matrixReadCatalog_() {
  const rows = matrixGetRows_(matrixGetSheet_(MATRIX_ORDER_IDS.MASTER, MATRIX_ORDER_TABS.CATALOG), 5, 16);
  return rows.filter(r => r[0]).map(r => ({
    itemId: String(r[0]).toUpperCase(),
    kind: String(r[1]).toUpperCase(),
    displayName: String(r[2] || ''),
    variant: String(r[3] || ''),
    monthlyPriceCents: matrixUsdToCents_(r[6]),
    revision: String(r[9] || ''),
    status: String(r[10] || ''),
    resaleReview: String(r[13] || ''),
    ownerApproval: String(r[14] || '')
  }));
}
function matrixReadComponents_() {
  const rows = matrixGetRows_(matrixGetSheet_(MATRIX_ORDER_IDS.MASTER, MATRIX_ORDER_TABS.COMPONENTS), 5, 10);
  return rows.filter(r => r[0] && r[2]).map(r => ({
    bundleId: String(r[0]).toUpperCase(),
    bundleRevision: String(r[1] || ''),
    productSku: String(r[2]).toUpperCase(),
    quantityPerBundle: Number(r[3])
  }));
}

/** Safe to run with gates OFF; no records created and no external API calls. */
function matrixStagingHealthCheck() {
  const gates = matrixReadGates_();
  const catalog = matrixReadCatalog_();
  return {
    mode: 'STAGING',
    catalogRows: catalog.length,
    approvedCatalogRows: catalog.filter(r => r.status === 'APPROVED' && r.ownerApproval === 'APPROVED' && r.resaleReview === 'REVIEWED').length,
    intakeRows: matrixGetRows_(matrixGetSheet_(MATRIX_ORDER_IDS.PRIVATE, MATRIX_ORDER_TABS.INTAKE), 1, 15).length,
    quoteGate: matrixGate_(gates, 'Backend quote validation'),
    invoiceSendGate: matrixGate_(gates, 'Production invoice sending'),
    publicOfferGate: matrixGate_(gates, 'Public offers'),
    productionPaymentCallsInThisVersion: false
  };
}

/**
 * The intake poll is deliberately NO-OP until explicitly enabled and verified.
 * This initial staging version processes only email addresses ending @example.invalid,
 * and never calls a payment provider or sends an email.
 */
function matrixProcessIntakeDryRun() {
  const gates = matrixReadGates_();
  if (!matrixGate_(gates, 'Backend quote validation')) {
    return { state: 'SAFE_HOLD', reason: 'QUOTE_GATE_OFF', processed: 0, externalCalls: 0 };
  }
  if (!(matrixGate_(gates, 'Approved offer catalog') &&
        matrixGate_(gates, 'Bundle component map') &&
        matrixGate_(gates, 'Taxes and fulfillment') &&
        matrixGate_(gates, 'Resale / advertised prices'))) {
    return { state: 'SAFE_HOLD', reason: 'CATALOG_OR_POLICY_GATE_OFF', processed: 0, externalCalls: 0 };
  }
  const catalog = matrixReadCatalog_();
  const components = matrixReadComponents_();
  const intake = matrixGetRows_(matrixGetSheet_(MATRIX_ORDER_IDS.PRIVATE, MATRIX_ORDER_TABS.INTAKE), 1, 15);
  const results = [];
  for (const row of intake) {
    const submissionId = String(row[0] || '').trim();
    if (!submissionId || String(row[11] || '').toUpperCase() === 'PROCESSED') continue;
    // Never use real customer information in this test-only script.
    const email = String(row[3] || '').trim().toLowerCase();
    if (!email.endsWith('@example.invalid')) {
      results.push({ submissionId, state: 'HOLD', reason: 'TEST_ADDRESSES_ONLY' });
      continue;
    }
    try {
      const cart = JSON.parse(String(row[6] || '[]'));
      const quote = MatrixOrderCore.quote(cart, catalog, components, {
        catalogApproved: true,
        cycleApproved: true,
        taxPolicyApproved: true,
        fulfillmentApproved: true,
        taxCents: 0,
        fulfillmentFeeCents: 0,
        cycleId: String(row[7] || 'TEST'),
        priceVersion: 'STAGING-CATALOG'
      });
      results.push({ submissionId, state: 'DRY_RUN_QUOTED', totalCents: quote.totalCents, lines: quote.lines.length });
    } catch (error) {
      results.push({ submissionId, state: 'HOLD', reason: error.code || 'INVALID_INPUT' });
    }
  }
  return { state: 'DRY_RUN', processed: results.length, results, externalCalls: 0, sheetsWritten: 0 };
}

/**
 * Invoice side effects are absent from this staging version by design.
 * The adapter below produces only an inspectable sandbox draft spec and cannot send.
 */
function matrixBuildSandboxInvoiceSpecification(orderSnapshot, testCustomerId, testLocationId) {
  if (!orderSnapshot || !Array.isArray(orderSnapshot.lines) || !orderSnapshot.lines.length) throw new Error('ORDER_LINES_REQUIRED');
  if (!String(testCustomerId || '').startsWith('TEST-') || !String(testLocationId || '').startsWith('TEST-')) throw new Error('SANDBOX_FIXTURE_ONLY');
  return {
    mode: 'SANDBOX_DRAFT_SPEC_ONLY',
    order: {
      location_id: testLocationId,
      idempotency_key: MatrixOrderCore.stableActionKey(orderSnapshot.orderId, 'CREATE_ORDER'),
      line_items: orderSnapshot.lines.map(l => ({
        name: l.nameSnapshot,
        quantity: String(l.quantity),
        base_price_money: { amount: l.unitPriceCents, currency: 'USD' }
      }))
    },
    invoice: {
      delivery_method: 'SHARE_MANUALLY',
      primary_recipient: { customer_id: testCustomerId },
      payment_requests: [{ request_type: 'BALANCE', due_date: 'SET_FROM_APPROVED_CYCLE', automatic_payment_source: 'NONE', tipping_enabled: false }]
    },
    maySend: false,
    mayCharge: false
  };
}

/** Preview only the exact public catalog fields that could be synchronized into Wix CMS. */
function matrixPreviewPublicCatalogPayload() {
  const gates = matrixReadGates_();
  if (!matrixGate_(gates, 'Public offers')) {
    return { state: 'SAFE_HOLD', reason: 'PUBLIC_OFFERS_GATE_OFF', records: [], externalCalls: 0 };
  }
  const items = matrixReadCatalog_().filter(item =>
    item.status === 'APPROVED' && item.ownerApproval === 'APPROVED' && item.resaleReview === 'REVIEWED'
  );
  return {
    state: 'PREVIEW_ONLY',
    records: items.map(item => ({
      itemId: item.itemId,
      kind: item.kind,
      publicName: item.displayName,
      monthlyPriceCents: item.monthlyPriceCents,
      offerVersion: item.revision,
      releaseState: 'DRAFT_NOT_PUBLISHED'
    })),
    externalCalls: 0
  };
}
