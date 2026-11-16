'use strict';
const test=require('node:test'), assert=require('node:assert/strict'), vm=require('node:vm'), fs=require('node:fs'), crypto=require('node:crypto'), path=require('node:path');
const root=path.resolve(__dirname,'..');
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
function context(props={}){
 const effects=[];
 const ctx={console:{log(){}},Map,Set,Date,JSON,Object,Number,String,Array,Error,Math,module:{exports:{}},
   PropertiesService:{getScriptProperties:()=>({getProperty:k=>props[k]??null,setProperty:(k,v)=>{props[k]=v;effects.push(['property',k,v]);}})},
   matrixStageV2Hash_:hash};
 vm.createContext(ctx);
 for(const f of ['baseline/Core.gs','baseline/CatalogRulesV3.gs','src/MasterInvoiceBridgeV4.gs'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx);
 ctx.effects=effects;return ctx;
}
function fixture(ctx){
 const C=ctx.MatrixCatalogCoreV3;
 const row=(id,kind,name,every,monthly)=>[id,kind,name,'QA pack','Synthetic fixture only',every,monthly,'','','QA-001','APPROVED','','','REVIEWED','APPROVED','fixture'];
 const rows=[C.ITEM_COLUMNS,row('QA-PRODUCT-A','PRODUCT','QA Product Alpha',18,12),row('QA-PRODUCT-B','PRODUCT','QA Product Beta',12,8),row('QA-BUNDLE-AB','BUNDLE','QA Bundle Duo',26,18)];
 const comps=[C.COMPONENT_COLUMNS,['QA-BUNDLE-AB','QA-001','QA-PRODUCT-A',1,'','','','APPROVED','',''],['QA-BUNDLE-AB','QA-001','QA-PRODUCT-B',1,'','','','APPROVED','','']];
 const snapshot=C.normalizeRows(rows,comps,[C.RELEASE_COLUMNS]);
 const raw={submissionId:'MV4-TEST-LOCAL-QA-001',email:'matrix.qa@example.invalid',fulfillment:'TEST_PICKUP',cycleId:'TEST-CYCLE-V4',termsAccepted:true,marketingOptIn:false,cart:[{itemId:'QA-PRODUCT-A',quantity:2},{itemId:'QA-BUNDLE-AB',quantity:1}]};
 return {raw,rows,comps,snapshot,deps:{snapshot,componentRows:comps,catalogCore:C,orderCore:ctx.MatrixOrderCore,hash,now:'2026-11-16T18:00:00.000Z'}};
}
function setup(){const c=context(),f=fixture(c);return {c,...f,plan:(r=f.raw,p=null,d=f.deps)=>c.MatrixMasterInvoiceBridgeV4.plan(r,p,d)};}
const clone=x=>JSON.parse(JSON.stringify(x));
test('baseline dependencies match verified GitHub blob hashes',()=>{
 for(const [file,sha]of [['Core.gs','c9102021a10e5d7a93f35b8ad62ef7c46644714e'],['CatalogRulesV3.gs','14e9bb2144bc0d9ed4fca8dd77949eb14c140541']]){
  const b=fs.readFileSync(path.join(root,'baseline',file));assert.equal(crypto.createHash('sha1').update(Buffer.concat([Buffer.from(`blob ${b.length}\0`),b])).digest('hex'),sha);
 }
});
test('master-shaped mixed cart is $42, comparison $62, savings $20',()=>{const j=setup().plan();assert.equal(j.quote.totalCents,4200);assert.equal(j.comparisonCents,6200);assert.equal(j.savingsCents,2000);assert.equal(j.quote.lines.length,2);assert.equal(j.paymentEligible,false);});
test('individual-only selection',()=>{const f=setup();f.raw.cart=[{itemId:'QA-PRODUCT-B',quantity:3}];assert.equal(f.plan().quote.totalCents,2400);});
test('bundle-only stores component snapshots',()=>{const f=setup();f.raw.cart=[{itemId:'QA-BUNDLE-AB',quantity:2}];const j=f.plan();assert.equal(j.quote.totalCents,3600);assert.equal(j.quote.lines[0].componentSnapshot.length,2);});
test('later source price edits do not mutate existing quote',()=>{const f=setup(),j=f.plan();f.snapshot.items.find(x=>x.itemId==='QA-PRODUCT-A').monthlyPriceCents=1500;assert.equal(f.plan(f.raw,j).quote.totalCents,4200);assert.equal(f.plan({...f.raw,submissionId:'MV4-TEST-LOCAL-QA-002'}).quote.totalCents,4800);});
test('replayed payload with changed quantity is rejected',()=>{const f=setup(),j=f.plan();f.raw.cart[0].quantity=3;assert.throws(()=>f.plan(f.raw,j),/DUPLICATE_PAYLOAD_CONFLICT/);});
test('identical cart in reverse order has same fingerprint',()=>{const f=setup(),j=f.plan();f.raw.cart.reverse();assert.equal(f.plan(f.raw,j).fingerprint,j.fingerprint);});
test('duplicate item quantities combine consistently',()=>{const f=setup();f.raw.cart=[{itemId:'QA-PRODUCT-A',quantity:1},{itemId:'QA-PRODUCT-A',quantity:1},{itemId:'QA-BUNDLE-AB',quantity:1}];assert.equal(f.plan().quote.totalCents,4200);});
for(const q of [0,-1,1.1,13,'2',NaN])test('reject invalid quantity '+String(q),()=>{const f=setup();f.raw.cart[0].quantity=q;assert.throws(()=>f.plan(),/INVALID_QUANTITY/);});
test('merged quantity limit enforced',()=>{const f=setup();f.raw.cart=[{itemId:'QA-PRODUCT-A',quantity:12},{itemId:'QA-PRODUCT-A',quantity:1}];assert.throws(()=>f.plan(),/QUANTITY_LIMIT/);});
test('client price fields rejected',()=>{const f=setup();f.raw.cart[0].price=1;assert.throws(()=>f.plan(),/CLIENT_PRICE_OR_UNKNOWN_FIELD/);});
test('unknown catalog IDs rejected',()=>{const f=setup();f.raw.cart[0].itemId='UNKNOWN-ITEM';assert.throws(()=>f.plan(),/ITEM_NOT_IN_APPROVED_MASTER/);});
test('empty approved master cannot create quote',()=>{const f=setup();f.deps.snapshot={items:[],rejected:[]};assert.throws(()=>f.plan(),/APPROVED_MASTER_CATALOG_EMPTY/);});
test('rejected touched catalog row rejects selected item',()=>{const f=setup();f.snapshot.rejected=[{itemId:'QA-PRODUCT-A',code:'DUPLICATE_ITEM_ID'}];assert.throws(()=>f.plan(),/SELECTED_CATALOG_ROW_REJECTED/);});
test('expired component blocked',()=>{const f=setup();f.comps[1][6]='2026-11-15T12:00:00.000Z';assert.throws(()=>f.plan(),/COMPONENT_EXPIRED/);});
test('future component blocked',()=>{const f=setup();f.comps[1][5]='2026-11-20T12:00:00.000Z';assert.throws(()=>f.plan(),/COMPONENT_NOT_ACTIVE/);});
test('component approval required',()=>{const f=setup();f.comps[1][7]='DRAFT';assert.throws(()=>f.plan(),/COMPONENT_NOT_APPROVED/);});
test('real customer identity rejected in this build',()=>{const f=setup();f.raw.email='someone@gmail.com';assert.throws(()=>f.plan(),/SYNTHETIC_RECIPIENT_REQUIRED/);});
test('prior refunded fixture cannot enter new bridge',()=>{const f=setup();f.raw.submissionId='TEST-STAGE2-TRANSPORT-002';assert.throws(()=>f.plan(),/SELECTED_TEST_REQUEST_REQUIRED/);});
test('terms required',()=>{const f=setup();f.raw.termsAccepted=false;assert.throws(()=>f.plan(),/TERMS_REQUIRED/);});
test('marketing remains optional and off in synthetic tests',()=>{const f=setup();f.raw.marketingOptIn=true;assert.throws(()=>f.plan(),/NO_MARKETING_IN_TEST/);});
test('test policy explicitly separate from real delivery/tax',()=>{const f=setup();f.raw.fulfillment='SHIPPING';assert.throws(()=>f.plan(),/TEST_POLICY_REQUIRED/);});
test('new synthetic ID is ignored by legacy TEST-prefix processor',()=>{const j=setup().plan();assert.equal(j.submissionId.startsWith('TEST-'),false);assert.match(j.orderId,/^TEST-ORDER-[a-f0-9]{32}$/);assert.equal(j.orderId.replace('TEST-ORDER-','TEST-').length,37);});
test('snapshots detached from caller objects',()=>{const f=setup(),j=f.plan();f.raw.cart[0].quantity=9;f.snapshot.items[0].name='changed';assert.equal(j.quote.totalCents,4200);assert.notEqual(j.quote.lines[0].nameSnapshot,'changed');});
test('all side-effect functions return OFF with no writes/calls',()=>{const c=context();assert.equal(c.matrixMasterBridgeV4StageSelected().state,'OFF');assert.equal(c.matrixMasterBridgeV4CreateSelectedSandboxDraft().state,'OFF');assert.equal(c.effects.length,0);});
test('invoice draft call is blocked by existing Sandbox gate',()=>{const c=context({MATRIX_MASTER_BRIDGE_V4_ENABLED:'SANDBOX_SELECTED_ONLY'});assert.equal(c.matrixMasterBridgeV4CreateSelectedSandboxDraft().state,'API_OFF');assert.equal(c.effects.length,0);});
test('dry-run reads existing catalog but writes nothing',()=>{const c=context();c.matrixMasterBridgeV4Read_=()=>({snapshot:{items:[],rejected:[]}});const r=c.matrixMasterBridgeV4DryRun();assert.equal(r.approvedMasterItems,0);assert.equal(r.sheetsWritten,0);assert.equal(r.externalCalls,0);assert.equal(c.effects.length,0);});
test('protected projection rejects production or eligible jobs',()=>{const f=setup(),j=f.plan();j.environment='PRODUCTION';assert.throws(()=>f.c.MatrixMasterInvoiceBridgeV4.assertProjectionSafe(j),/UNSAFE_BRIDGE_JOB/);j.environment='SANDBOX';j.paymentEligible=true;assert.throws(()=>f.c.MatrixMasterInvoiceBridgeV4.assertProjectionSafe(j),/UNSAFE_BRIDGE_JOB/);});
test('draft failure closes existing Sandbox switch',()=>{const p={MATRIX_MASTER_BRIDGE_V4_ENABLED:'SANDBOX_SELECTED_ONLY',MATRIX_MASTER_BRIDGE_V4_SUBMISSION_ID:'MV4-TEST-UNKNOWN-001',MATRIX_SANDBOX_API_ENABLED:'true'};const c=context(p);c.matrixStageV2Lock_=fn=>fn();c.matrixMasterBridgeV4States_=()=>({});assert.throws(()=>c.matrixMasterBridgeV4CreateSelectedSandboxDraft(),/STAGE_SELECTED_REQUEST_FIRST/);assert.equal(p.MATRIX_SANDBOX_API_ENABLED,'false');});
test('published or refunded job is never recreated',()=>{const f=setup(),j=f.plan();j.invoiceStatus='PAID';j.refundOrDisputeHold=true;const p={MATRIX_MASTER_BRIDGE_V4_ENABLED:'SANDBOX_SELECTED_ONLY',MATRIX_MASTER_BRIDGE_V4_SUBMISSION_ID:j.submissionId,MATRIX_SANDBOX_API_ENABLED:'true'};const c=context(p);c.matrixStageV2Lock_=fn=>fn();c.matrixMasterBridgeV4States_=()=>({[j.submissionId]:j});assert.throws(()=>c.matrixMasterBridgeV4CreateSelectedSandboxDraft(),/EXISTING_LIFECYCLE_PRESERVED/);assert.equal(p.MATRIX_SANDBOX_API_ENABLED,'false');});
test('source adds no network URL, trigger creator, payment/refund/publish function',()=>{const s=fs.readFileSync(path.join(root,'src/MasterInvoiceBridgeV4.gs'),'utf8');assert.equal(s.includes('UrlFetchApp.fetch('),false);assert.equal(s.includes('ScriptApp.newTrigger('),false);assert.equal(s.includes('connect.squareup.com'),false);assert.equal(s.includes("'/publish'"),false);});
