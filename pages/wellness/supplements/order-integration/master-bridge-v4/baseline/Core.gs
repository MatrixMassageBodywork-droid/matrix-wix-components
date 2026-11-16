/*
 * MATRIX supplement order validation, pricing and paid-batch calculation.
 * Pure logic only. No external calls, emails, charges, storage, or live credentials.
 * Compatible with Node tests and Apps Script V8 global loading.
 */
var MatrixOrderCore = (function () {
  'use strict';
  const MAX_DISTINCT_LINES = 24;
  const MAX_QUANTITY_PER_LINE = 20;
  const SKU = /^[A-Z0-9][A-Z0-9_.-]{1,79}$/;
  const VALID_KINDS = new Set(['PRODUCT', 'BUNDLE']);

  function fail(code, message) {
    const error = new Error(message || code);
    error.code = code;
    throw error;
  }
  function assertSafeCents(value, field, allowZero) {
    if (!Number.isSafeInteger(value) || value < (allowZero ? 0 : 1) || value > 100000000) {
      fail('INVALID_MONEY', field + ' must be integer cents');
    }
    return value;
  }
  function normalizeCart(input) {
    if (!Array.isArray(input) || input.length === 0 || input.length > MAX_DISTINCT_LINES) {
      fail('INVALID_CART', 'Cart must have between 1 and 24 distinct lines');
    }
    const seen = new Map();
    input.forEach((entry) => {
      if (!entry || typeof entry !== 'object') fail('INVALID_LINE', 'Invalid item selection');
      const itemId = String(entry.itemId || '').trim().toUpperCase();
      if (!SKU.test(itemId)) fail('INVALID_SKU', 'Invalid item ID');
      const quantity = Number(entry.quantity);
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY_PER_LINE) {
        fail('INVALID_QUANTITY', 'Invalid quantity');
      }
      const sum = (seen.get(itemId) || 0) + quantity;
      if (sum > MAX_QUANTITY_PER_LINE) fail('QUANTITY_LIMIT', 'Quantity limit per item exceeded');
      seen.set(itemId, sum);
    });
    return Array.from(seen, ([itemId, quantity]) => ({ itemId, quantity }));
  }
  function buildItemsIndex(items) {
    const idx = new Map();
    items.forEach((item) => {
      const key = String(item.itemId || '').trim().toUpperCase();
      if (!SKU.test(key) || idx.has(key)) fail('INVALID_CATALOG', 'Missing or duplicate catalog item ID');
      idx.set(key, item);
    });
    return idx;
  }
  function bundleComponents(bundleId, revision, components, itemsIndex) {
    const matches = components.filter((c) => String(c.bundleId || '').toUpperCase() === bundleId && String(c.bundleRevision || '') === revision);
    if (matches.length === 0) fail('BUNDLE_NOT_READY', 'No reviewed bundle component map');
    const totals = new Map();
    matches.forEach(c => {
      const sku = String(c.productSku || '').trim().toUpperCase();
      if (!SKU.test(sku) || !itemsIndex.has(sku) || itemsIndex.get(sku).kind !== 'PRODUCT') {
        fail('BUNDLE_COMPONENT_MISSING', 'Bundle contains an invalid product SKU');
      }
      const component = itemsIndex.get(sku);
      if (component.status !== 'APPROVED' || component.ownerApproval !== 'APPROVED' || component.resaleReview !== 'REVIEWED') {
        fail('BUNDLE_COMPONENT_NOT_APPROVED', 'Bundle component is not approved for ordering');
      }
      if (!Number.isSafeInteger(c.quantityPerBundle) || c.quantityPerBundle < 1 || c.quantityPerBundle > 50) {
        fail('INVALID_BUNDLE_QUANTITY', 'Invalid bundle component quantity');
      }
      totals.set(sku, (totals.get(sku) || 0) + c.quantityPerBundle);
    });
    return [...totals].map(([productSku, quantityPerBundle]) => ({ productSku, quantityPerBundle }));
  }
  function quote(cart, catalog, components, options) {
    if (!options || options.catalogApproved !== true || options.taxPolicyApproved !== true || options.fulfillmentApproved !== true || options.cycleApproved !== true) {
      fail('RELEASE_HOLD', 'Catalog, tax, fulfillment and cycle rules must all be approved');
    }
    const items = buildItemsIndex(catalog);
    const lines = normalizeCart(cart).map((selection, i) => {
      const item = items.get(selection.itemId);
      if (!item || !VALID_KINDS.has(item.kind)) fail('ITEM_UNAVAILABLE', 'Selected item is not in the catalog');
      if (item.status !== 'APPROVED' || item.ownerApproval !== 'APPROVED' || item.resaleReview !== 'REVIEWED') {
        fail('ITEM_NOT_APPROVED', 'Selected item is not ready for ordering');
      }
      const cents = assertSafeCents(item.monthlyPriceCents, 'Monthly unit price', false);
      const snapshot = item.kind === 'BUNDLE'
        ? bundleComponents(selection.itemId, item.revision, components, items)
        : [{ productSku: selection.itemId, quantityPerBundle: 1 }];
      return {
        lineId: 'LINE-' + String(i + 1).padStart(2, '0'),
        itemId: selection.itemId,
        kind: item.kind,
        nameSnapshot: String(item.displayName || '').slice(0, 160),
        variantSnapshot: String(item.variant || '').slice(0, 160),
        quantity: selection.quantity,
        unitPriceCents: cents,
        lineSubtotalCents: cents * selection.quantity,
        catalogRevision: String(item.revision || ''),
        componentSnapshot: snapshot
      };
    });
    const subtotalCents = lines.reduce((n, l) => n + l.lineSubtotalCents, 0);
    const taxCents = assertSafeCents(options.taxCents, 'Tax', true);
    const fulfillmentFeeCents = assertSafeCents(options.fulfillmentFeeCents, 'Fulfillment fee', true);
    const totalCents = subtotalCents + taxCents + fulfillmentFeeCents;
    assertSafeCents(totalCents, 'Total', false);
    return Object.freeze({
      currency: 'USD',
      priceVersion: String(options.priceVersion || ''),
      cycleId: String(options.cycleId || ''),
      subtotalCents,
      taxCents,
      fulfillmentFeeCents,
      totalCents,
      lines
    });
  }
  function paymentGate(order, payment, cutoffUtc) {
    if (!order || !payment) return { eligible: false, reason: 'NO_PAYMENT_EVIDENCE' };
    if (payment.status !== 'PAID') return { eligible: false, reason: 'NOT_PAID' };
    if (payment.refundHold === true || payment.disputeHold === true) return { eligible: false, reason: 'REFUND_OR_DISPUTE_HOLD' };
    if (payment.currency !== 'USD' || payment.amountPaidCents !== order.totalCents) {
      return { eligible: false, reason: 'PAYMENT_AMOUNT_MISMATCH' };
    }
    if (!payment.verifiedProviderId || !payment.paidUtc) return { eligible: false, reason: 'PROVIDER_READBACK_MISSING' };
    const paid = Date.parse(payment.paidUtc);
    const cutoff = Date.parse(cutoffUtc);
    if (!Number.isFinite(paid) || !Number.isFinite(cutoff)) return { eligible: false, reason: 'INVALID_DEADLINE' };
    if (paid > cutoff) return { eligible: false, reason: 'PAID_AFTER_CUTOFF' };
    if (order.ownerApproval !== 'APPROVED' || order.cycleId !== payment.cycleId) {
      return { eligible: false, reason: 'OWNER_OR_CYCLE_HOLD' };
    }
    return { eligible: true, reason: 'PAID_VERIFIED_ON_TIME' };
  }
  function aggregateSupplierLines(ordersWithPayments, cutoffUtc) {
    const skuTotals = new Map();
    const countedOrderIds = new Set();
    ordersWithPayments.forEach(({ order, payment }) => {
      if (!order || !order.orderId || countedOrderIds.has(order.orderId)) return;
      const gate = paymentGate(order, payment, cutoffUtc);
      if (!gate.eligible) return;
      countedOrderIds.add(order.orderId);
      order.lines.forEach(line => {
        (line.componentSnapshot || []).forEach(part => {
          const sku = String(part.productSku || '').toUpperCase();
          const quantity = part.quantityPerBundle * line.quantity;
          if (!SKU.test(sku) || !Number.isSafeInteger(quantity) || quantity < 1) fail('INVALID_BATCH_LINE', 'Invalid supplier quantity');
          skuTotals.set(sku, (skuTotals.get(sku) || 0) + quantity);
        });
      });
    });
    return {
      eligibleOrderCount: countedOrderIds.size,
      supplierLines: [...skuTotals].sort((a, b) => a[0].localeCompare(b[0])).map(([sku, quantity]) => ({ sku, quantity }))
    };
  }
  function stableActionKey(orderId, action) {
    const x = String(orderId || '').replace(/[^A-Za-z0-9_-]/g, '').slice(0, 55);
    if (!x || !/^(DRAFT_INVOICE|PUBLISH_INVOICE|CREATE_ORDER)$/.test(action)) fail('INVALID_IDEMPOTENCY', 'Bad action key');
    return 'matrix-v2-' + action + '-' + x;
  }
  return { normalizeCart, quote, paymentGate, aggregateSupplierLines, stableActionKey };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = MatrixOrderCore;
