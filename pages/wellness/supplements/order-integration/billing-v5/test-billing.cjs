const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const B=require('./billing-core');
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}
test('mixed cart charges one fee',()=>{let p=B.invoicePreview([{nameSnapshot:'A',quantity:2,unitPriceCents:1200},{nameSnapshot:'Bundle AB',quantity:1,unitPriceCents:1800}]);assert.equal(p.quote.totalCents,4642);assert.equal(p.quote.taxCents,242);assert.equal(p.orderPreview.line_items.filter(x=>x.name==='Convenience fee').length,1);});
test('3% credit estimate includes surcharge tax',()=>{let q=B.quote(4200,'PICKUP');assert.equal(q.creditCardFeeEstimateCents,139);assert.equal(q.creditCardFeeTaxEstimateCents,8);assert.equal(q.creditCardTotalEstimateCents,4789);assert.equal(q.creditCardFeeCents,null);});
test('empty cart charges zero',()=>assert.equal(B.quote(0,'PICKUP').creditCardTotalEstimateCents,0));
test('pickup is free and shipping unavailable',()=>{const q=B.quote(4200,'PICKUP');assert.equal(q.shippingAvailable,false);assert.equal(q.fulfillmentFeeCents,0);});
test('shipping rejected',()=>assert.throws(()=>B.quote(4200,'SHIPPING'),/MATRIX_PICKUP_ONLY/));
test('fractional cents rejected',()=>assert.throws(()=>B.quote(42.5,'PICKUP'),/INVALID_SUBTOTAL/));
test('negative cents rejected',()=>assert.throws(()=>B.quote(-1,'PICKUP'),/INVALID_SUBTOTAL/));
test('excessive order rejected',()=>assert.throws(()=>B.quote(100000001,'PICKUP'),/INVALID_SUBTOTAL/));
test('half-even rounding lower tie',()=>assert.equal(B.rate(100,550),6));
test('half-even rounding upper tie',()=>assert.equal(B.rate(300,550),16));
test('invoice tax is additive 5.5%',()=>assert.deepEqual(B.invoicePreview([{nameSnapshot:'A',quantity:1,unitPriceCents:1000}]).orderPreview.taxes,[{uid:'WI_KENOSHA_55',name:'WI + Kenosha County sales tax',percentage:'5.5',type:'ADDITIVE',scope:'ORDER'}]));
test('invoice description discloses all charges and pickup',()=>{let d=B.invoicePreview([{nameSnapshot:'A',quantity:1,unitPriceCents:1000}]).invoiceDescription;for(let x of ['$2','3%','No shipping','Free pickup'])assert.ok(d.includes(x));});
test('unsupported API route fails explicitly',()=>assert.throws(()=>B.assertInvoiceRoute('SQUARE_API'),/SQUARE_API_DOES_NOT_APPLY_NATIVE_CCF/));
test('native route permitted',()=>B.assertInvoiceRoute('SQUARE_DASHBOARD'));
test('frozen input quote preserved',()=>{let q=Object.freeze({subtotalCents:4200,totalCents:4200,lines:[]});assert.equal(B.applyToQuote(q).totalCents,4642);assert.equal(q.totalCents,4200);});
test('Apps Script entry point passes with no IO',()=>{let ctx=vm.createContext({console:{log(){}}});vm.runInContext(fs.readFileSync(__dirname+'/SupplementBillingV5.gs','utf8'),ctx);assert.equal(ctx.matrixBillingV5SyntheticChecks().state,'PASS');});
(async()=>{
let source=fs.readFileSync(__dirname+'/supplementRequestsV4.web.js','utf8').replace(/^import .*;\n/gm,'').replace(/export const /g,'var ');
const noIO=new Proxy({}, {get(){throw new Error('Unexpected IO');}});
let ctx=vm.createContext({wixData:noIO,wixCaptchaBackend:noIO,Permissions:{Admin:'admin',Anyone:'anyone'},webMethod:(_,fn)=>fn});
vm.runInContext(source,ctx);
let q=await ctx.matrixAdminSyntheticChecksV4();assert.equal(q.state,'PASS');assert.equal(q.totalCents,4642);count++;
assert.equal((await ctx.matrixMonthlyCatalogStatusV4()).orderingEnabled,false);count++;
assert.equal((await ctx.matrixSubmitOrderRequestV4({})).state,'CLOSED');count++;
console.log(JSON.stringify({state:'PASS',tests:count,productSubtotal:4200,convenienceFee:200,tax:242,totalBeforeCardFee:4642,creditCardEstimatedTotal:4789,externalCalls:0,recordsWritten:0}));
})().catch(e=>{console.error(e);process.exitCode=1;});
