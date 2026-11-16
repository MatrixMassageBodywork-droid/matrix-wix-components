/* Matrix monthly-special billing policy, 2026-11-16. Pure arithmetic only. */
var MatrixSupplementBillingV5 = (function () {
  'use strict';
  var VERSION = 'MATRIX-PICKUP-20261116-V5';
  function need(ok, code) { if (!ok) throw new Error(code); }
  function rate(cents, basisPoints) {
    var numerator = cents * basisPoints;
    need(Number.isSafeInteger(numerator), 'MONEY_OVERFLOW');
    var whole = Math.floor(numerator / 10000), remainder = numerator % 10000;
    // Match Square's half-to-even rounding, with integer arithmetic.
    return whole + (remainder > 5000 || (remainder === 5000 && whole % 2) ? 1 : 0);
  }
  function quote(subtotalCents, fulfillment) {
    need(fulfillment === 'PICKUP', 'MATRIX_PICKUP_ONLY');
    need(Number.isSafeInteger(subtotalCents) && subtotalCents >= 0 && subtotalCents <= 100000000, 'INVALID_SUBTOTAL');
    var convenience = subtotalCents ? 200 : 0;
    var taxable = subtotalCents + convenience;
    var tax = rate(taxable, 550);
    var base = taxable + tax;
    // This is an estimate, not a universal invoice line: Square must identify credit cards.
    var creditEstimate = rate(base, 300);
    var creditTaxEstimate = rate(creditEstimate, 550);
    return {
      billingPolicyVersion: VERSION, currency: 'USD', subtotalCents: subtotalCents,
      convenienceFeeCents: convenience, taxableSubtotalCents: taxable,
      taxRateBasisPoints: 550, taxCents: tax, totalCents: base,
      fulfillment: 'PICKUP', fulfillmentFeeCents: 0, shippingCents: 0, shippingAvailable: false,
      pickupAddress: '24804 75th St, Salem, WI 53168',
      creditCardFeeRateBasisPoints: 300, creditCardFeeCents: null,
      creditCardFeeEstimateCents: creditEstimate, creditCardFeeTaxEstimateCents: creditTaxEstimate,
      creditCardTotalEstimateCents: base + creditEstimate + creditTaxEstimate,
      creditCardFeeStatus: 'REQUIRES_SQUARE_NATIVE_CARD_DETECTION',
      invoiceRoute: 'SQUARE_DASHBOARD', apiInvoiceReady: false
    };
  }
  function applyToQuote(original) {
    need(original && Array.isArray(original.lines), 'QUOTE_REQUIRED');
    var q = JSON.parse(JSON.stringify(original));
    Object.assign(q, quote(q.subtotalCents, 'PICKUP'));
    return q;
  }
  function invoicePreview(lines) {
    need(Array.isArray(lines) && lines.length > 0 && lines.length <= 20, 'INVALID_LINES');
    var subtotal = 0;
    var items = lines.map(function (line) {
      need(Number.isInteger(line.quantity) && line.quantity > 0 && line.quantity <= 12, 'INVALID_QUANTITY');
      need(Number.isSafeInteger(line.unitPriceCents) && line.unitPriceCents > 0, 'INVALID_PRICE');
      need(typeof line.nameSnapshot === 'string' && line.nameSnapshot.length > 0, 'INVALID_NAME');
      subtotal += line.unitPriceCents * line.quantity;
      return {name: line.nameSnapshot, quantity: String(line.quantity), base_price_money: {amount: line.unitPriceCents, currency: 'USD'}};
    });
    var q = quote(subtotal, 'PICKUP');
    items.push({name: 'Convenience fee', quantity: '1', base_price_money: {amount: 200, currency: 'USD'}});
    return {quote: q, orderPreview: {line_items: items,
      taxes: [{uid: 'WI_KENOSHA_55', name: 'WI + Kenosha County sales tax', percentage: '5.5', type: 'ADDITIVE', scope: 'ORDER'}]},
      invoiceDescription: 'Free pickup at Matrix only: 24804 75th St, Salem, WI 53168. No shipping for monthly specials. Includes a $2 convenience fee and applicable sales tax. A 3% credit-card fee applies to eligible credit-card payments.',
      productionEnabled: false, invoiceCreated: false, emailsSent: 0};
  }
  function assertInvoiceRoute(route) {
    need(route === 'SQUARE_DASHBOARD', 'SQUARE_API_DOES_NOT_APPLY_NATIVE_CCF');
  }
  return {VERSION: VERSION, rate: rate, quote: quote, applyToQuote: applyToQuote,
    invoicePreview: invoicePreview, assertInvoiceRoute: assertInvoiceRoute};
})();
if (typeof module !== 'undefined' && module.exports) module.exports = MatrixSupplementBillingV5;
