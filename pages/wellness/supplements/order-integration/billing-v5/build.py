import pathlib
p=pathlib.Path(__file__).parent
core=(p/'billing-core.js').read_text()
embedded=core[:core.index("if (typeof module")]
backend=(p/'backend.js').read_text()
backend=backend.replace("  return { lines, totalCents, comparisonCents, savingsCents: comparisonCents-totalCents,\n    taxCents: null, shippingCents: null, invoiceCreated: false };", "  return { lines, ...MatrixSupplementBillingV5.quote(totalCents, 'PICKUP'), comparisonCents,\n    savingsCents: comparisonCents-totalCents, invoiceCreated: false };")
backend=backend.replace("['PICKUP','SHIPPING'].includes(input.fulfillment)", "input.fulfillment === 'PICKUP'")
backend=backend.replace("q.totalCents === 4200", "q.totalCents === 4642 && q.convenienceFeeCents === 200 && q.taxCents === 242 && q.creditCardTotalEstimateCents === 4789")
backend=backend.replace("savingsCents:q.savingsCents, externalCalls:0", "savingsCents:q.savingsCents, subtotalCents:q.subtotalCents, taxCents:q.taxCents, convenienceFeeCents:q.convenienceFeeCents, creditCardFeeRateBasisPoints:q.creditCardFeeRateBasisPoints, creditCardTotalEstimateCents:q.creditCardTotalEstimateCents, fulfillment:q.fulfillment, shippingCents:q.shippingCents, apiInvoiceReady:q.apiInvoiceReady, externalCalls:0")
backend += '\n' + embedded
(p/'supplementRequestsV4.web.js').write_text(backend)
renderer=(p/'renderer.js').read_text()
renderer=embedded+'\n'+renderer
renderer=renderer.replace('.ms3-total dt,.ms3-total dd{', '.ms3-total dd{white-space:nowrap;flex-shrink:0}\n.ms3-total dt,.ms3-total dd{')
renderer=renderer.replace('const totals=this.total();',"const totals=this.total();\n      const billing=MatrixSupplementBillingV5.quote(totals.monthly,'PICKUP');")
renderer=renderer.replace('<div class="ms3-total"><dt>Monthly event total</dt><dd data-monthly>${format(totals.monthly)}</dd></div></dl>', '''<div><dt>Product subtotal</dt><dd data-monthly>${format(totals.monthly)}</dd></div>
          <div><dt>Convenience fee</dt><dd>${format(billing.convenienceFeeCents)}</dd></div>
          <div><dt>Sales tax (5.5%)</dt><dd>${format(billing.taxCents)}</dd></div>
          <div><dt>Matrix pickup</dt><dd>FREE</dd></div>
          <div class="ms3-total"><dt>Total before credit-card fee</dt><dd>${format(billing.totalCents)}</dd></div>
          <div><dt>Credit-card fee</dt><dd>3% when applicable</dd></div>
          <div><dt>Estimated credit-card total</dt><dd>${format(billing.creditCardTotalEstimateCents)}</dd></div></dl>
          <p class="ms3-note">Credit-card estimate includes tax on the fee; the final charge appears on your invoice payment screen.</p>''')
renderer=renderer.replace('When ordering opens, invoices will be sent by email after your request is reviewed.', 'Monthly specials are free pickup at Matrix only: 24804 75th St, Salem, WI 53168. No shipping. Each order includes a $2 convenience fee, 5.5% sales tax, and a 3% fee for eligible credit-card payments.')
renderer=renderer.replace("When ordering opens, select your products and quantities. We'll email your invoice with the total and payment due date.", "Monthly specials are free pickup at Matrix only. Each combined order includes a $2 convenience fee and 5.5% sales tax. A 3% credit-card fee applies to eligible credit-card payments. No shipping for these specials.")
renderer=renderer.replace('<label>Fulfillment preference<select><option>Choose your preference</option><option>Pickup</option><option>Delivery</option></select></label>', '<label>Fulfillment<select><option value="PICKUP">Free pickup at Matrix only</option></select></label>')
renderer=renderer.replace('const details=this.total();', "const details=this.total();\n        const charges=MatrixSupplementBillingV5.quote(details.monthly,'PICKUP');")
renderer=renderer.replace('Monthly example total: ${format(details.monthly)}', 'Product subtotal: ${format(details.monthly)}\\nConvenience fee: ${format(charges.convenienceFeeCents)}\\nSales tax (5.5%): ${format(charges.taxCents)}\\nFree pickup at Matrix only\\nTotal before credit-card fee: ${format(charges.totalCents)}\\nCredit-card fee: 3% when applicable\\nEstimated credit-card total: ${format(charges.creditCardTotalEstimateCents)}')
(p/'renderer-v5-billing.js').write_text(renderer)
script=embedded+'''
/** Pure preview over the already-installed V4 master bridge; no records or provider calls. */
function matrixBillingV5PlanPreview(raw, previous, deps) {
  var original = MatrixMasterInvoiceBridgeV4.plan(raw, previous, deps);
  // Never reprice or modify a previously frozen order.
  if (previous) return original;
  var result = JSON.parse(JSON.stringify(original));
  result.quote = MatrixSupplementBillingV5.applyToQuote(original.quote);
  result.billingPreviewOnly = true;
  result.requiredInvoiceRoute = 'SQUARE_DASHBOARD';
  return result;
}
function matrixBillingV5SyntheticChecks() {
  var p = MatrixSupplementBillingV5.invoicePreview([
    {nameSnapshot:'TEST ONLY product',quantity:2,unitPriceCents:1200},
    {nameSnapshot:'TEST ONLY bundle',quantity:1,unitPriceCents:1800}
  ]);
  var q=p.quote;
  if(q.subtotalCents!==4200||q.convenienceFeeCents!==200||q.taxCents!==242||q.totalCents!==4642||q.creditCardTotalEstimateCents!==4789)throw new Error('BILLING_TOTAL_MISMATCH');
  var pickupRejected=false,apiRejected=false;
  try{MatrixSupplementBillingV5.quote(4200,'SHIPPING');}catch(e){pickupRejected=e.message==='MATRIX_PICKUP_ONLY';}
  try{MatrixSupplementBillingV5.assertInvoiceRoute('SQUARE_API');}catch(e){apiRejected=e.message==='SQUARE_API_DOES_NOT_APPLY_NATIVE_CCF';}
  if(!pickupRejected||!apiRejected||p.orderPreview.line_items.length!==3)throw new Error('BILLING_GUARD_FAILED');
  var result={state:'PASS',subtotalCents:q.subtotalCents,convenienceFeeCents:q.convenienceFeeCents,taxCents:q.taxCents,
    totalBeforeCardFeeCents:q.totalCents,creditCardRateBasisPoints:300,creditCardTotalEstimateCents:q.creditCardTotalEstimateCents,
    fulfillment:'PICKUP',pickupCents:0,shippingRejected:pickupRejected,unsupportedInvoiceRouteRejected:apiRejected,
    externalCalls:0,sheetsWritten:0,invoicesCreated:0,emailsSent:0,productionEnabled:false};
  console.log('MATRIX_BILLING_V5 '+JSON.stringify(result));return result;
}
'''
(p/'SupplementBillingV5.gs').write_text(script)
