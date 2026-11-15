const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),crypto=require('node:crypto');
const stage=require('../apps-script/RuntimeV2.gs');
function fixture(){
 let saved={environment:'SANDBOX',orderId:'TEST-ORDER-'+ 'a'.repeat(32),invoiceId:'inv:0-ChBvEd2_INMsq2DAPxPhNm2cELIN',squareOrderId:'CnfTXiQJla29bpSccU6V2PUvta4F',locationId:'LNP57TAA5YGP0',customerId:'C1',request:{email:'matrix.stage2@example.invalid'},quote:{totalCents:4200},paymentEligible:false};
 const invoice={id:saved.invoiceId,order_id:saved.squareOrderId,location_id:saved.locationId,version:0,status:'DRAFT',delivery_method:'SHARE_MANUALLY',store_payment_method_enabled:false,primary_recipient:{customer_id:saved.customerId,email_address:saved.request.email},payment_requests:[{automatic_payment_source:'NONE',computed_amount_money:{amount:4200,currency:'USD'},total_completed_amount_money:{amount:0,currency:'USD'}}]};
 const order={id:saved.squareOrderId,location_id:saved.locationId,reference_id:stage.squareReference(saved),state:'OPEN',total_money:{amount:4200,currency:'USD'},tenders:[]};
 const payment={id:'P1',order_id:order.id,location_id:order.location_id,status:'COMPLETED',amount_money:{amount:4200,currency:'USD'}};
 let props={MATRIX_SANDBOX_API_ENABLED:'false'},refund,posts=[],losePublish=false,loseRefund=false,disputesPage=()=>({disputes:[]});
 const ctx=vm.createContext({MatrixStageV2:stage,PropertiesService:{getScriptProperties:()=>({getProperty:k=>props[k],setProperty:(k,v)=>props[k]=v})},matrixStageV2SandboxAssert_:(x,c)=>{if(!x)throw Error(c)},matrixStageV2Lock_:f=>f(),matrixStageV2Verify:()=>{},matrixStageV2SandboxJob_:()=>JSON.parse(JSON.stringify(saved)),matrixStageV2Save_:j=>saved=JSON.parse(JSON.stringify(j)),matrixStageV2Project_:()=>{},matrixStageV2Hash_:s=>crypto.createHash('sha256').update(s).digest('hex'),console:{log:()=>{}}});
 vm.runInContext(fs.readFileSync(require.resolve('../apps-script/SandboxLifecycleV2.gs'),'utf8'),ctx);
 const call=(method,path,body)=>{
  if(method==='POST')posts.push({path,body:JSON.parse(JSON.stringify(body))});
  if(path.endsWith('/publish')){invoice.status='UNPAID';invoice.version=1;invoice.public_url='https://squareupsandbox.com/pay-invoice/test';if(losePublish){losePublish=false;throw Error('LOST_RESPONSE');}return{invoice};}
  if(path.startsWith('/v2/invoices/'))return{invoice};
  if(path.startsWith('/v2/orders/'))return{order};
  if(path.startsWith('/v2/payments/'))return{payment};
  if(path.startsWith('/v2/disputes?'))return disputesPage();
  if(method==='POST'&&path==='/v2/refunds'){refund={id:'R1',payment_id:payment.id,location_id:order.location_id,amount_money:{amount:4200,currency:'USD'},status:'COMPLETED'};invoice.status='REFUNDED';payment.refunded_money={amount:4200,currency:'USD'};payment.refund_ids=['R1'];if(loseRefund){loseRefund=false;throw Error('LOST_RESPONSE');}return{refund};}
  if(path.startsWith('/v2/refunds/'))return{refund};
  throw Error('UNEXPECTED_CALL');
 };
 ctx.matrixStageV2LifecycleCall_=call;
 return {ctx,props,invoice,order,payment,posts,saved:()=>saved,paid:()=>{invoice.status='PAID';invoice.payment_requests[0].total_completed_amount_money.amount=4200;order.state='COMPLETED';order.tenders=[{id:'P1',payment_id:'P1'}]},losePublish:()=>losePublish=true,loseRefund:()=>loseRefund=true,disputes:fn=>disputesPage=fn};
}
test('publish replay reuses single existing invoice and closes flag',()=>{const x=fixture();x.ctx.matrixStageV2PublishSandboxInvoice();x.ctx.matrixStageV2PublishSandboxInvoice();assert.equal(x.posts.length,1);assert.equal(x.saved().state,'AWAITING_PAYMENT');assert.equal(x.props.MATRIX_SANDBOX_API_ENABLED,'false');});
test('publish response timeout recovered by GET without another POST',()=>{const x=fixture();x.losePublish();assert.throws(()=>x.ctx.matrixStageV2PublishSandboxInvoice(),/LOST_RESPONSE/);assert.equal(x.props.MATRIX_SANDBOX_API_ENABLED,'false');x.ctx.matrixStageV2PublishSandboxInvoice();assert.equal(x.posts.length,1);});
test('refuses email delivery before publishing',()=>{const x=fixture();x.invoice.delivery_method='EMAIL';assert.throws(()=>x.ctx.matrixStageV2PublishSandboxInvoice(),/SAFETY/);assert.equal(x.posts.length,0);assert.equal(x.props.MATRIX_SANDBOX_API_ENABLED,'false');});
test('paid readback verifies invoice/order/payment but remains ineligible',()=>{const x=fixture();x.paid();const r=x.ctx.matrixStageV2ReconcileSandboxInvoice();assert.equal(r.state,'SANDBOX_PAID_VERIFIED');assert.equal(r.paymentEligible,false);});
test('wrong completed invoice total fails closed',()=>{const x=fixture();x.paid();x.invoice.payment_requests[0].total_completed_amount_money.amount=4199;assert.throws(()=>x.ctx.matrixStageV2ReconcileSandboxInvoice(),/PAID_READBACK_MISMATCH/);assert.equal(x.props.MATRIX_SANDBOX_API_ENABLED,'false');});
test('dispute pagination must finish and disputes block eligibility',()=>{const x=fixture();x.paid();let n=0;x.disputes(()=>++n===1?{disputes:[],cursor:'next'}:{disputes:[{disputed_payment:{payment_id:'P1'}}]});assert.equal(x.ctx.matrixStageV2ReconcileSandboxInvoice().state,'HOLD');assert.equal(n,2);});
test('repeated dispute cursor fails closed',()=>{const x=fixture();x.disputes(()=>({cursor:'again'}));assert.throws(()=>x.ctx.matrixStageV2ReconcileSandboxInvoice(),/PAGINATION_INCOMPLETE/);assert.equal(x.props.MATRIX_SANDBOX_API_ENABLED,'false');});
test('unpaid cannot be refunded',()=>{const x=fixture();assert.throws(()=>x.ctx.matrixStageV2RefundSandboxPayment(),/PAID_TEST_REQUIRED/);assert.equal(x.posts.length,0);});
test('full refund uses bounded key and replay makes no additional refund',()=>{const x=fixture();x.paid();x.ctx.matrixStageV2RefundSandboxPayment();x.ctx.matrixStageV2RefundSandboxPayment();assert.equal(x.posts.length,1);assert.ok(x.posts[0].body.idempotency_key.length<=45);assert.equal(x.saved().state,'HOLD');assert.equal(x.saved().paymentEligible,false);});
test('refund timeout reuses frozen body/key, preserves HOLD',()=>{const x=fixture();x.paid();x.loseRefund();assert.throws(()=>x.ctx.matrixStageV2RefundSandboxPayment(),/LOST_RESPONSE/);assert.equal(x.saved().state,'HOLD');x.ctx.matrixStageV2RefundSandboxPayment();assert.deepEqual(x.posts[0].body,x.posts[1].body);assert.equal(x.saved().refundId,'R1');assert.equal(x.props.MATRIX_SANDBOX_API_ENABLED,'false');});
