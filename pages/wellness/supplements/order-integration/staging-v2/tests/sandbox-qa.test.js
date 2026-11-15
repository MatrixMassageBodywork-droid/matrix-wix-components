const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
function context(mutator){
 const props={MATRIX_SANDBOX_SUBMISSION_ID:'TEST-STAGE2-TRANSPORT-002',SQUARE_SANDBOX_LOCATION_ID:'LNP57TAA5YGP0',SQUARE_SANDBOX_ACCESS_TOKEN:'not-a-real-token',MATRIX_SANDBOX_API_ENABLED:'false'};
 const job={environment:'SANDBOX',quote:{totalCents:4200},paymentEligible:false,request:{email:'matrix.stage2@example.invalid'},invoiceId:'inv-1',squareOrderId:'order-1',orderId:'TEST-ORDER-1',customerId:'customer-1',locationId:props.SQUARE_SANDBOX_LOCATION_ID};
 const invoice={id:'inv-1',order_id:'order-1',location_id:job.locationId,status:'DRAFT',delivery_method:'SHARE_MANUALLY',store_payment_method_enabled:false,primary_recipient:{customer_id:'customer-1',email_address:job.request.email},payment_requests:[{automatic_payment_source:'NONE',computed_amount_money:{amount:4200,currency:'USD'},total_completed_amount_money:{amount:0,currency:'USD'}}]};
 const order={id:'order-1',location_id:job.locationId,reference_id:job.orderId,total_money:{amount:4200,currency:'USD'}};
 let created=0;
 const ctx=vm.createContext({MatrixStageV2:{squareReference:j=>j.orderId},PropertiesService:{getScriptProperties:()=>({getProperty:k=>props[k],setProperty:(k,v)=>props[k]=v})},matrixStageV2States_:()=>({[props.MATRIX_SANDBOX_SUBMISSION_ID]:job}),matrixStageV2Verify:()=>{},matrixStageV2CreateSandboxDraft:()=>{created++;return{invoiceId:'inv-1'};},matrixStageV2SandboxCall_:(m,p)=>p.includes('/invoices/')?{invoice}:{order},console:{log:()=>{}}});
 if(mutator)mutator({props,job,invoice,order,ctx});
 vm.runInContext(fs.readFileSync(require.resolve('../apps-script/SandboxV2QA.gs'),'utf8'),ctx);
 return {ctx,props,created:()=>created};
}
test('reads provider evidence before and after replay, closes Sandbox flag',()=>{const x=context();const r=x.ctx.matrixStageV2TestSandboxDraft();assert.equal(r.duplicateReplay,'SAME_INVOICE');assert.equal(r.totalCents,4200);assert.equal(x.created(),2);assert.equal(x.props.MATRIX_SANDBOX_API_ENABLED,'false');});
for(const [name,change,expected] of [
 ['changed provider total',x=>x.order.total_money.amount=4201,/ORDER_READBACK_MISMATCH/],
 ['invoice set to email',x=>x.invoice.delivery_method='EMAIL',/INVOICE_SAFETY_MISMATCH/],
 ['wrong recipient',x=>x.invoice.primary_recipient.email_address='wrong@example.invalid',/RECIPIENT_MISMATCH/],
 ['automatic charging enabled',x=>x.invoice.payment_requests[0].automatic_payment_source='CARD_ON_FILE',/PAYMENT_REQUEST_MISMATCH/],
 ['network failure',x=>x.ctx.matrixStageV2SandboxCall_=()=>{throw Error('NETWORK_FAILURE');},/NETWORK_FAILURE/]
])test(name+' fails and closes flag',()=>{const x=context(change);assert.throws(()=>x.ctx.matrixStageV2TestSandboxDraft(),expected);assert.equal(x.props.MATRIX_SANDBOX_API_ENABLED,'false');});
test('wrong location stops before enabling calls',()=>{const x=context(x=>x.props.SQUARE_SANDBOX_LOCATION_ID='other');assert.throws(()=>x.ctx.matrixStageV2TestSandboxDraft(),/LOCATION_MISMATCH/);assert.equal(x.created(),0);assert.equal(x.props.MATRIX_SANDBOX_API_ENABLED,'false');});
