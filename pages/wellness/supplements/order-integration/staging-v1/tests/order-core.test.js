const assert = require('node:assert/strict');
const core = require('../src/order-core.js');
const catalog = [
  { itemId:'TEST-A', kind:'PRODUCT', displayName:'Test A', variant:'10 count', monthlyPriceCents:1200, status:'APPROVED', ownerApproval:'APPROVED', resaleReview:'REVIEWED', revision:'V1' },
  { itemId:'TEST-B', kind:'PRODUCT', displayName:'Test B', variant:'20 count', monthlyPriceCents:800, status:'APPROVED', ownerApproval:'APPROVED', resaleReview:'REVIEWED', revision:'V1' },
  { itemId:'TEST-BUNDLE', kind:'BUNDLE', displayName:'Test Bundle', variant:'2 items', monthlyPriceCents:1600, status:'APPROVED', ownerApproval:'APPROVED', resaleReview:'REVIEWED', revision:'V1' },
  { itemId:'DRAFT-C', kind:'PRODUCT', displayName:'Unapproved', variant:'', monthlyPriceCents:500, status:'DRAFT', ownerApproval:'NOT_APPROVED', resaleReview:'UNVERIFIED', revision:'V1' }
];
const components = [
 {bundleId:'TEST-BUNDLE',bundleRevision:'V1',productSku:'TEST-A',quantityPerBundle:1},
 {bundleId:'TEST-BUNDLE',bundleRevision:'V1',productSku:'TEST-B',quantityPerBundle:2}
];
const flags = {catalogApproved:true,taxPolicyApproved:true,fulfillmentApproved:true,cycleApproved:true,taxCents:0,fulfillmentFeeCents:0,priceVersion:'TEST-V1',cycleId:'TEST-2026-11-15'};
let count=0;
function test(name,fn){fn();count++;console.log('PASS',name)}
function err(code,fn){assert.throws(fn,e=>e.code===code)}
test('mixed cart one bundle plus individual product',()=>{
 const q=core.quote([{itemId:'TEST-BUNDLE',quantity:1},{itemId:'TEST-A',quantity:2}],catalog,components,flags);
 assert.equal(q.totalCents,4000);
 assert.equal(q.lines.length,2);
 assert.deepEqual(q.lines[0].componentSnapshot,[{productSku:'TEST-A',quantityPerBundle:1},{productSku:'TEST-B',quantityPerBundle:2}]);
});
test('cart duplicate identifiers are coalesced',()=>{
 assert.deepEqual(core.normalizeCart([{itemId:'test-a',quantity:1},{itemId:'TEST-A',quantity:2}]),[{itemId:'TEST-A',quantity:3}]);
});
test('negative and zero quantities rejected',()=>err('INVALID_QUANTITY',()=>core.normalizeCart([{itemId:'TEST-A',quantity:0}])));
test('large quantities rejected',()=>err('INVALID_QUANTITY',()=>core.normalizeCart([{itemId:'TEST-A',quantity:100}])));
test('duplicate total over limit rejected',()=>err('QUANTITY_LIMIT',()=>core.normalizeCart([{itemId:'TEST-A',quantity:15},{itemId:'TEST-A',quantity:10}])));
test('unapproved item blocked',()=>err('ITEM_NOT_APPROVED',()=>core.quote([{itemId:'DRAFT-C',quantity:1}],catalog,components,flags)));
test('bundle component not individually approved is blocked',()=>{
 const unsafe=[{bundleId:'TEST-BUNDLE',bundleRevision:'V1',productSku:'DRAFT-C',quantityPerBundle:1}];
 err('BUNDLE_COMPONENT_NOT_APPROVED',()=>core.quote([{itemId:'TEST-BUNDLE',quantity:1}],catalog,unsafe,flags));
});
test('separate price spoof fields are ignored',()=>{
 const q=core.quote([{itemId:'TEST-BUNDLE',quantity:1,discountPercent:99,totalPrice:0}],catalog,components,flags);
 assert.equal(q.totalCents,1600);
});
test('tax/fulfillment gate blocks quote',()=>err('RELEASE_HOLD',()=>core.quote([{itemId:'TEST-A',quantity:1}],catalog,components,{...flags,taxPolicyApproved:false})));
test('missing bundle component mapping blocks quote',()=>err('BUNDLE_NOT_READY',()=>core.quote([{itemId:'TEST-BUNDLE',quantity:1}],catalog,[],flags)));
test('client-supplied price ignored',()=>{const q=core.quote([{itemId:'TEST-A',quantity:1,unitPriceCents:1}],catalog,components,flags);assert.equal(q.totalCents,1200)});
test('provider payment not paid excluded',()=>{
 const q=core.quote([{itemId:'TEST-A',quantity:1}],catalog,components,flags);
 assert.equal(core.paymentGate({...q,orderId:'o1',ownerApproval:'APPROVED'}, {status:'UNPAID',cycleId:q.cycleId},'2026-11-15T05:59:00Z').eligible,false);
});
test('provider amount mismatch excluded',()=>{
 const q=core.quote([{itemId:'TEST-A',quantity:1}],catalog,components,flags);
 const p={status:'PAID',cycleId:q.cycleId,currency:'USD',amountPaidCents:1,verifiedProviderId:'sandbox-test',paidUtc:'2026-11-15T01:00:00Z'};
 assert.equal(core.paymentGate({...q,orderId:'o1',ownerApproval:'APPROVED'},p,'2026-11-15T05:59:00Z').reason,'PAYMENT_AMOUNT_MISMATCH');
});
test('late payment excluded',()=>{
 const q=core.quote([{itemId:'TEST-A',quantity:1}],catalog,components,flags);
 const p={status:'PAID',cycleId:q.cycleId,currency:'USD',amountPaidCents:q.totalCents,verifiedProviderId:'sandbox-test',paidUtc:'2026-11-15T09:00:00Z'};
 assert.equal(core.paymentGate({...q,orderId:'o1',ownerApproval:'APPROVED'},p,'2026-11-15T05:59:00Z').reason,'PAID_AFTER_CUTOFF');
});
test('refunded payment excluded',()=>{
 const q=core.quote([{itemId:'TEST-A',quantity:1}],catalog,components,flags);
 const p={status:'PAID',cycleId:q.cycleId,currency:'USD',amountPaidCents:q.totalCents,verifiedProviderId:'sandbox-test',paidUtc:'2026-11-15T01:00:00Z',refundHold:true};
 assert.equal(core.paymentGate({...q,orderId:'o1',ownerApproval:'APPROVED'},p,'2026-11-15T05:59:00Z').reason,'REFUND_OR_DISPUTE_HOLD');
});
test('supplier aggregation includes bundles and additional products',()=>{
 const q=core.quote([{itemId:'TEST-BUNDLE',quantity:1},{itemId:'TEST-A',quantity:2}],catalog,components,flags);
 const order={...q,orderId:'test-order-1',ownerApproval:'APPROVED'};
 const payment={status:'PAID',cycleId:q.cycleId,currency:'USD',amountPaidCents:q.totalCents,verifiedProviderId:'sandbox-test',paidUtc:'2026-11-15T01:00:00Z'};
 const batch=core.aggregateSupplierLines([{order,payment},{order,payment}], '2026-11-15T05:59:00Z');
 assert.equal(batch.eligibleOrderCount,1);
 assert.deepEqual(batch.supplierLines,[{sku:'TEST-A',quantity:3},{sku:'TEST-B',quantity:2}]);
});
test('idempotency stable per action and order',()=>{assert.equal(core.stableActionKey('o123','CREATE_ORDER'),core.stableActionKey('o123','CREATE_ORDER'));assert.notEqual(core.stableActionKey('o123','CREATE_ORDER'),core.stableActionKey('o123','DRAFT_INVOICE'))});
console.log('SUCCESS',count,'tests');
