const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const vm = require('node:vm');
const core = require('../../staging-v1/src/order-core');
const stage = require('../apps-script/RuntimeV2.gs');
const hash = x => crypto.createHash('sha256').update(x).digest('hex');
const raw = () => ({ submissionId: 'TEST-STAGE2-SHEETQA-001', email: 'matrix.stage2@example.invalid', cart: [{ itemId: 'TEST-PRODUCT-A', quantity: 2 }, { itemId: 'TEST-BUNDLE-AB', quantity: 1 }], cycleId: 'TEST-CYCLE-V2', fulfillment: 'TEST_PICKUP', termsAccepted: true });
const deps = () => ({ core, hash, now: '2026-11-15T00:00:00Z', catalog: stage.fixtureCatalog(), components: stage.fixtureComponents() });
const job = () => stage.prepare(raw(), null, deps());
test('mixed bundle/product quote is $42.00 with frozen components', () => {
  const j = job(); assert.equal(j.quote.totalCents, 4200); assert.equal(j.quote.lines.length, 2);
  assert.equal(j.quote.lines.find(x => x.kind === 'BUNDLE').componentSnapshot.length, 2);
});
for (const [name, mutate, code] of [
  ['real email', r => r.email = 'client@example.com', /TEST_EMAIL_REQUIRED/],
  ['real submission', r => r.submissionId = 'LIVE-123456789', /TEST_SUBMISSION_REQUIRED/],
  ['missing terms', r => r.termsAccepted = false, /TERMS_REQUIRED/],
  ['real cycle', r => r.cycleId = 'CYCLE-1ST', /TEST_POLICY_REQUIRED/],
  ['unapproved fulfillment', r => r.fulfillment = 'SHIP', /TEST_POLICY_REQUIRED/],
  ['client price tampering', r => r.cart[0].priceCents = 1, /CLIENT_PRICE_OR_UNKNOWN_FIELD/],
  ['unknown SKU', r => r.cart[0].itemId = 'TEST-NO-SUCH-ITEM', /not in the catalog/],
  ['excess quantity', r => r.cart[0].quantity = 21, /quantity/i],
  ['malformed cart JSON', r => r.cart = '{', /JSON/]
]) test('rejects ' + name, () => { const r = raw(); mutate(r); assert.throws(() => stage.prepare(r, null, deps()), code); });
test('duplicate payload returns original quote after catalog repricing', () => { const original = job(), d = deps(); d.catalog[0].monthlyPriceCents = 9999; assert.deepEqual(stage.prepare(raw(), original, d), original); });
test('same ID with changed quantity is conflict', () => { const r = raw(); r.cart[0].quantity = 3; assert.throws(() => stage.prepare(r, job(), deps()), /DUPLICATE_PAYLOAD_CONFLICT/); });
test('line ordering does not cause duplicate conflict', () => { const r = raw(); r.cart.reverse(); assert.deepEqual(stage.prepare(r, job(), deps()), job()); });
test('unapproved component fails closed', () => { const d = deps(); d.components[0].approval = 'DRAFT'; assert.throws(() => stage.prepare(raw(), null, d), /COMPONENT_NOT_APPROVED/); });
test('expired component fails closed', () => { const d = deps(); d.components[0].activeTo = '2026-11-14'; assert.throws(() => stage.prepare(raw(), null, d), /COMPONENT_EXPIRED/); });
test('snapshot does not retain mutable source references', () => { const d = deps(), j = stage.prepare(raw(), null, d); d.components[0].quantityPerBundle = 50; assert.equal(j.quote.lines[0].componentSnapshot[0].quantityPerBundle, 1); });
test('long input IDs retain independent action keys', () => { const a = raw(), b = raw(); a.submissionId += '-'.repeat(60) + 'a'; b.submissionId += '-'.repeat(60) + 'b'; assert.notEqual(stage.prepare(a, null, deps()).orderId, stage.prepare(b, null, deps()).orderId); });
function provider() {
  let persisted, count = 0; const cache = new Map(), requests = [];
  const io = { enabled: true, locationId: 'LOCATION_SANDBOX', save: j => { persisted = JSON.parse(JSON.stringify(j)); }, call: (method, path, body) => {
    requests.push({method, path, body});
    if (!cache.has(body.idempotency_key)) {
      count++;
      const value = path === '/v2/customers' ? {customer:{id:'customer-1'}} : path === '/v2/orders' ? {order:{id:'order-1', location_id:io.locationId, reference_id:job().orderId, total_money:{amount:4200,currency:'USD'}}} : {invoice:{id:'invoice-1', order_id:'order-1', location_id:io.locationId, status:'DRAFT',version:0}};
      cache.set(body.idempotency_key, value);
    }
    return cache.get(body.idempotency_key);
  }};
  return {io, requests, persisted:() => persisted, count:() => count};
}
test('draft creates three provider objects, no publish or charge', () => { const p = provider(), j = stage.createDraft(job(), p.io); assert.equal(j.invoiceStatus, 'DRAFT'); assert.equal(p.count(), 3); assert.equal(p.requests[2].body.invoice.delivery_method, 'SHARE_MANUALLY'); assert.equal(p.requests[2].body.invoice.payment_requests[0].automatic_payment_source,'NONE'); });
test('replayed draft makes no additional provider calls', () => { const p = provider(), j = stage.createDraft(job(), p.io); stage.createDraft(j, p.io); assert.equal(p.requests.length, 3); });
test('provider success then lost response reuses idempotency key', () => { const p = provider(), call = p.io.call; let fail = true; p.io.call = (...args) => { const result = call(...args); if (args[1] === '/v2/orders' && fail) { fail=false; throw Error('timeout'); } return result; }; assert.throws(() => stage.createDraft(job(),p.io),/timeout/); const result=stage.createDraft(p.persisted(),p.io); assert.equal(result.invoiceId,'invoice-1'); assert.equal(p.count(),3); assert.deepEqual(p.requests[1].body,p.requests[2].body); });
test('sandbox disabled makes zero calls', () => { const p=provider(); p.io.enabled=false; assert.throws(()=>stage.createDraft(job(),p.io),/SANDBOX_API_DISABLED/); assert.equal(p.requests.length,0); });
test('wrong provider amount stops before invoice creation', () => { const p=provider(),call=p.io.call; p.io.call=(...args)=>{const x=call(...args); if(x.order)x.order.total_money.amount=1;return x;}; assert.throws(()=>stage.createDraft(job(),p.io),/ORDER_RESPONSE_MISMATCH/); assert.equal(p.requests.length,2); });
test('location change stops replay',()=>{const p=provider(),j=stage.createDraft(job(),p.io);p.io.locationId='other';assert.throws(()=>stage.createDraft(j,p.io),/LOCATION_CHANGED/);});
function evidence(){const j=Object.assign(job(),{invoiceId:'invoice-1',squareOrderId:'order-1',locationId:'location-1'});return {j,i:{id:'invoice-1',order_id:'order-1',location_id:'location-1',status:'PAID'},o:{id:'order-1',reference_id:j.orderId,location_id:'location-1'},p:[{id:'payment-1',order_id:'order-1',location_id:'location-1',status:'COMPLETED',amount_money:{amount:4200,currency:'USD'}}]};}
test('paid sandbox never becomes purchase eligible',()=>{const e=evidence(),r=stage.inspectPayment(e.j,e.i,e.o,e.p,[]);assert.equal(r.state,'SANDBOX_PAID_VERIFIED');assert.equal(r.paymentEligible,false);});
test('refund excludes paid order',()=>{const e=evidence();e.p[0].refunded_money={amount:1,currency:'USD'};assert.equal(stage.inspectPayment(e.j,e.i,e.o,e.p,[]).state,'HOLD');});
test('dispute excludes paid order',()=>{const e=evidence();assert.equal(stage.inspectPayment(e.j,e.i,e.o,e.p,[{disputed_payment:{payment_id:'payment-1'}}]).state,'HOLD');});
test('unpaid or wrong total stays awaiting payment',()=>{const e=evidence();e.p[0].amount_money.amount=4100;assert.equal(stage.inspectPayment(e.j,e.i,e.o,e.p,[]).state,'AWAITING_PAYMENT');});
test('unrelated provider payment rejected',()=>{const e=evidence();e.p[0].order_id='other';assert.throws(()=>stage.inspectPayment(e.j,e.i,e.o,e.p,[]),/PAYMENT_IDENTITY_MISMATCH/);});
test('duplicate payment evidence rejected',()=>{const e=evidence();e.p.push(e.p[0]);assert.throws(()=>stage.inspectPayment(e.j,e.i,e.o,e.p,[]),/PAYMENT_IDENTITY_MISMATCH/);});
test('missing disputes readback fails closed',()=>{const e=evidence();assert.throws(()=>stage.inspectPayment(e.j,e.i,e.o,e.p,undefined),/PROVIDER_EVIDENCE_REQUIRED/);});

test('sheet runtime replays one order/two lines and skips real rows',()=>{
  const tables={};let external=0;
  for(const n of ['Event Log','Orders V2','Order Lines V2','Invoice Queue V2'])tables[n]=Array.from({length:5},()=>[]);
  const r=raw(),row=[r.submissionId,'','Synthetic',r.email,'',r.fulfillment,JSON.stringify(r.cart),r.cycleId,false,true,'','NEW','','',''];
  tables['Cart Intake V2']=[[],row.slice(),row.slice(),['REAL-UNCHANGED','','Real','person@example.com']];
  const sheet=n=>({getLastRow:()=>tables[n].length,getRange:(r,c,h=1,w=1)=>({getValues:()=>Array.from({length:h},(_,i)=>Array.from({length:w},(_,j)=>tables[n][r-1+i]?.[c-1+j]??'')),setValues:values=>{values.forEach((v,i)=>{tables[n][r-1+i]??=[];v.forEach((x,j)=>tables[n][r-1+i][c-1+j]=x);});},setValue:v=>{tables[n][r-1]??=[];tables[n][r-1][c-1]=v;}})});
  const ctx=vm.createContext({MatrixOrderCore:core,MATRIX_ORDER_IDS:{PRIVATE:'private'},matrixGetSheet_:(_,n)=>sheet(n),Utilities:{computeDigest:(_,s)=>[...crypto.createHash('sha256').update(s).digest()],DigestAlgorithm:{SHA_256:1},Charset:{UTF_8:1},getUuid:()=>crypto.randomUUID()},LockService:{getScriptLock:()=>({tryLock:()=>true,releaseLock:()=>{}})},SpreadsheetApp:{flush:()=>{}},UrlFetchApp:{fetch:()=>{external++;throw Error('UNEXPECTED_NETWORK');}},console:{log:()=>{}},matrixStagingHealthCheck:()=>({quoteGate:false,invoiceSendGate:false,publicOfferGate:false})});
  vm.runInContext(fs.readFileSync(require.resolve('../apps-script/RuntimeV2.gs'),'utf8'),ctx);
  assert.equal(ctx.matrixStageV2ProcessIntake().processed,1);assert.equal(ctx.matrixStageV2ProcessIntake().duplicates,2);
  assert.equal(tables['Orders V2'].length,6);assert.equal(tables['Order Lines V2'].length,7);assert.equal(tables['Event Log'].length,6);assert.equal(external,0);
  assert.equal(tables['Cart Intake V2'][3][0],'REAL-UNCHANGED');assert.equal(tables['Orders V2'][5][23],'NOT_APPROVED');
  assert.equal(ctx.matrixStageV2Verify().totalCents,4200);
});
