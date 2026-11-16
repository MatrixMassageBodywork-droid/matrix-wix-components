/* MATRIX — Master-catalog to existing invoice engine bridge, V4.
 * ADDITIVE: leave Core, Code, RuntimeV2, SandboxLifecycleV2 and Catalog*V3 intact.
 * Uses the existing workbooks, journal, projections and Sandbox invoice adapter.
 * No public-page changes, production host, email sender, payment or refund call.
 * OFF unless MATRIX_MASTER_BRIDGE_V4_ENABLED = SANDBOX_SELECTED_ONLY.
 * Process ONLY one explicitly selected MV4-TEST-* intake; never old TEST-STAGE2-*.
 */
var MatrixMasterInvoiceBridgeV4 = (function () {
  'use strict';
  function need(ok, code) { if (!ok) { var e = new Error(code); e.code = code; throw e; } }
  function copy(x) { return JSON.parse(JSON.stringify(x)); }
  function truth(x) { return x === true || x === 'TRUE' || x === 'true'; }
  function canonical(raw, catalogCore) {
    need(raw && /^MV4-TEST-[A-Za-z0-9_-]{8,64}$/.test(raw.submissionId || ''), 'SELECTED_TEST_REQUEST_REQUIRED');
    var email = String(raw.email || '').trim().toLowerCase();
    need(/^[a-z0-9._+-]{1,64}@example\.invalid$/.test(email), 'SYNTHETIC_RECIPIENT_REQUIRED');
    need(raw.fulfillment === 'TEST_PICKUP' && raw.cycleId === 'TEST-CYCLE-V4', 'TEST_POLICY_REQUIRED');
    need(truth(raw.termsAccepted), 'TERMS_REQUIRED');
    need(!truth(raw.marketingOptIn), 'NO_MARKETING_IN_TEST');
    var cart = typeof raw.cart === 'string' ? JSON.parse(raw.cart) : raw.cart;
    need(Array.isArray(cart) && cart.length > 0 && cart.length <= 20, 'INVALID_CART');
    var merged = new Map();
    cart.forEach(function (line) {
      need(line && !Array.isArray(line) && Object.keys(line).sort().join('|') === 'itemId|quantity', 'CLIENT_PRICE_OR_UNKNOWN_FIELD');
      need(typeof line.itemId === 'string' && /^[A-Z0-9][A-Z0-9_-]{2,79}$/.test(line.itemId), 'INVALID_ITEM_ID');
      need(Number.isInteger(line.quantity) && line.quantity > 0 && line.quantity <= 12, 'INVALID_QUANTITY');
      merged.set(line.itemId, (merged.get(line.itemId) || 0) + line.quantity);
      need(merged.get(line.itemId) <= 12, 'QUANTITY_LIMIT');
    });
    return { submissionId: raw.submissionId, customerName: 'Matrix synthetic test', email: email,
      cart: Array.from(merged, function (p) { return { itemId:p[0], quantity:p[1] }; }).sort(function(a,b){return a.itemId.localeCompare(b.itemId);}),
      cycleId: 'TEST-CYCLE-V4', fulfillment: 'TEST_PICKUP', termsAccepted: true, marketingOptIn: false };
  }
  function plan(raw, previous, deps) {
    var normalized = canonical(raw);
    var fingerprint = deps.hash(JSON.stringify(normalized));
    need(/^[a-f0-9]{64}$/.test(fingerprint), 'INVALID_DIGEST');
    // Replay returns its frozen plan, even after approved catalog prices change.
    if (previous) {
      need(previous.bridgeSchema === 4 && previous.submissionId === normalized.submissionId && previous.fingerprint === fingerprint,
        'DUPLICATE_PAYLOAD_CONFLICT');
      return copy(previous);
    }
    var now = Date.parse(deps.now);
    need(Number.isFinite(now), 'INVALID_TEST_CLOCK');
    var s = deps.snapshot;
    need(s && Array.isArray(s.items) && s.items.length > 0, 'APPROVED_MASTER_CATALOG_EMPTY');
    var byId = new Map();
    s.items.forEach(function (item) {
      need(item && !byId.has(item.itemId), 'DUPLICATE_CATALOG_ID');
      byId.set(item.itemId, item);
    });
    var touched = new Set(normalized.cart.map(function (x) { return x.itemId; }));
    normalized.cart.forEach(function (x) {
      var item = byId.get(x.itemId); need(item, 'ITEM_NOT_IN_APPROVED_MASTER');
      (item.components || []).forEach(function(c){ touched.add(c.sku); });
    });
    // The V3 normalizer can retain a first duplicate; a rejected touched ID makes
    // an ambiguous selection unsafe, so explicitly fail instead of picking a row.
    (s.rejected || []).forEach(function (r) { need(!touched.has(r.itemId), 'SELECTED_CATALOG_ROW_REJECTED'); });
    var componentRows = deps.componentRows;
    need(Array.isArray(componentRows) && componentRows.length >= 1, 'COMPONENT_ROWS_REQUIRED');
    var comps = [];
    componentRows.slice(1).forEach(function (r) {
      var b = byId.get(String(r[0] || '').trim());
      if (!b || b.kind !== 'BUNDLE' || !touched.has(b.itemId) || String(r[1] || '').trim() !== b.version) return;
      need(String(r[7] || '').trim() === 'APPROVED', 'COMPONENT_NOT_APPROVED');
      if (r[5]) need(Number.isFinite(Date.parse(r[5])) && Date.parse(r[5]) <= now, 'COMPONENT_NOT_ACTIVE');
      if (r[6]) need(Number.isFinite(Date.parse(r[6])) && Date.parse(r[6]) > now, 'COMPONENT_EXPIRED');
      comps.push({bundleId:b.itemId,bundleRevision:b.version,productSku:String(r[2]).trim(),quantityPerBundle:Number(r[3])});
    });
    var items = s.items.map(function (item) { return {
      itemId:item.itemId,kind:item.kind,displayName:item.name,variant:item.variant,
      monthlyPriceCents:item.monthlyPriceCents,revision:item.version,
      status:'APPROVED',ownerApproval:'APPROVED',resaleReview:'REVIEWED'
    }; });
    var display = deps.catalogCore.orderQuote(normalized.cart, s);
    var priceVersion = 'MC4-' + deps.hash(JSON.stringify(display.lines)).slice(0,24);
    var quote = copy(deps.orderCore.quote(normalized.cart, items, comps, {
      catalogApproved:true,cycleApproved:true,taxPolicyApproved:true,fulfillmentApproved:true,
      // Synthetic demonstration only, NEVER a production tax/fulfillment decision.
      taxCents:0,fulfillmentFeeCents:0,cycleId:'TEST-CYCLE-V4',priceVersion:priceVersion
    }));
    need(quote.totalCents === display.monthlyTotalCents, 'QUOTE_ENGINE_MISMATCH');
    need(quote.totalCents <= 1000000, 'TEST_AMOUNT_LIMIT');
    var job = {
      schema:2,bridgeSchema:4,environment:'SANDBOX',orderId:'TEST-ORDER-'+deps.hash(normalized.submissionId).slice(0,32),
      submissionId:normalized.submissionId,fingerprint:fingerprint,request:normalized,
      createdUtc:new Date(now).toISOString(),dueDate:new Date(now+7*86400000).toISOString().slice(0,10),
      quote:quote,comparisonCents:display.everydayTotalCents,savingsCents:display.savingsCents,
      state:'VALIDATED',ownerRelease:'NOT_APPROVED',paymentEligible:false,
      source:'MASTER_CATALOG_V3',syntheticPolicy:true
    };
    need(job.orderId.length === 43, 'INVALID_INTERNAL_ID');
    return job;
  }
  function assertProjectionSafe(job) {
    need(job && job.bridgeSchema === 4 && job.environment === 'SANDBOX' &&
      /^MV4-TEST-[A-Za-z0-9_-]{8,64}$/.test(job.submissionId || '') &&
      /^[a-z0-9._+-]{1,64}@example\.invalid$/.test(job.request.email || '') &&
      job.paymentEligible === false && job.ownerRelease === 'NOT_APPROVED', 'UNSAFE_BRIDGE_JOB');
  }
  return {plan:plan,canonical:canonical,assertProjectionSafe:assertProjectionSafe};
})();

function matrixMasterBridgeV4Config_() {
  var p=PropertiesService.getScriptProperties();
  return {enabled:p.getProperty('MATRIX_MASTER_BRIDGE_V4_ENABLED')==='SANDBOX_SELECTED_ONLY',
    selected:p.getProperty('MATRIX_MASTER_BRIDGE_V4_SUBMISSION_ID')||''};
}
function matrixMasterBridgeV4Read_() {
  var rows=matrixCatalogV3Read_('Bundle Components V2',10);
  return {snapshot:matrixCatalogV3Snapshot_(),componentRows:rows};
}
function matrixMasterBridgeV4States_() {
  var out=Object.create(null);
  matrixStageV2Rows_('Event Log',5,9).forEach(function(r){
    if(r[3]!=='MATRIX_MASTER_BRIDGE_V4_STATE')return;
    var j=JSON.parse(String(r[8]));MatrixMasterInvoiceBridgeV4.assertProjectionSafe(j);
    out[j.submissionId]=j;
  });
  return out;
}
function matrixMasterBridgeV4Save_(job) {
  MatrixMasterInvoiceBridgeV4.assertProjectionSafe(job);
  var json=JSON.stringify(job);if(json.length>45000)throw new Error('BRIDGE_SNAPSHOT_TOO_LARGE');
  var s=matrixStageV2Sheet_('Event Log');
  s.getRange(Math.max(6,s.getLastRow()+1),1,1,9).setValues([[Utilities.getUuid(),job.orderId,
    'MATRIX_MASTER_BRIDGE_V4','MATRIX_MASTER_BRIDGE_V4_STATE',new Date().toISOString(),job.state,false,'SANDBOX_ONLY',json]]);
  SpreadsheetApp.flush();
}
function matrixMasterBridgeV4Raw_(id) {
  if(!/^MV4-TEST-[A-Za-z0-9_-]{8,64}$/.test(id))throw new Error('SELECTED_TEST_REQUEST_REQUIRED');
  var rows=matrixStageV2Rows_('Cart Intake V2',1,15).filter(function(r){return r[0]===id;});
  if(rows.length!==1)throw new Error('EXACTLY_ONE_SELECTED_INTAKE_REQUIRED');
  var r=rows[0];
  return {submissionId:id,email:r[3],cart:r[6],cycleId:r[7],fulfillment:r[5],termsAccepted:r[9],marketingOptIn:r[8]};
}
/** Read only; does not create a row, trigger, external request, invoice or email. */
function matrixMasterBridgeV4DryRun() {
  var input=matrixMasterBridgeV4Read_(), cfg=matrixMasterBridgeV4Config_();
  var report={mode:'READ_ONLY',approvedMasterItems:input.snapshot.items.length,
    rejectedMasterItems:input.snapshot.rejected.length,selectedRequestPresent:!!cfg.selected,
    bridgeEnabled:cfg.enabled,productionEnabled:false,emailsEnabled:false,externalCalls:0,sheetsWritten:0};
  if(cfg.selected){
    var old=matrixMasterBridgeV4States_()[cfg.selected];
    var j=MatrixMasterInvoiceBridgeV4.plan(matrixMasterBridgeV4Raw_(cfg.selected),old,{
      snapshot:input.snapshot,componentRows:input.componentRows,catalogCore:MatrixCatalogCoreV3,orderCore:MatrixOrderCore,
      hash:matrixStageV2Hash_,now:new Date().toISOString()});
    report.selectedTotalCents=j.quote.totalCents;report.selectedLines=j.quote.lines.length;report.replay=!!old;
  }
  console.log('MATRIX_MASTER_BRIDGE_V4 '+JSON.stringify(report));return report;
}
/** Adds only the selected new synthetic job to the SAME existing tracker. */
function matrixMasterBridgeV4StageSelected() {
  var cfg=matrixMasterBridgeV4Config_();if(!cfg.enabled)return {state:'OFF',externalCalls:0,sheetsWritten:0};
  return matrixStageV2Lock_(function(){
    var input=matrixMasterBridgeV4Read_(),old=matrixMasterBridgeV4States_()[cfg.selected];
    var j=MatrixMasterInvoiceBridgeV4.plan(matrixMasterBridgeV4Raw_(cfg.selected),old,{
      snapshot:input.snapshot,componentRows:input.componentRows,catalogCore:MatrixCatalogCoreV3,orderCore:MatrixOrderCore,
      hash:matrixStageV2Hash_,now:new Date().toISOString()});
    if(!old)matrixMasterBridgeV4Save_(j);
    // Existing projection deliberately sets invoice creation, email and owner gates OFF.
    matrixStageV2Project_(j);SpreadsheetApp.flush();
    return {state:old?'ALREADY_STAGED':'STAGED',orderId:j.orderId,totalCents:j.quote.totalCents,externalCalls:0,emailsSent:0};
  });
}
/** Explicit, selected Sandbox DRAFT only. No publication, email, payment or refund. */
function matrixMasterBridgeV4CreateSelectedSandboxDraft() {
  var cfg=matrixMasterBridgeV4Config_();if(!cfg.enabled)return {state:'OFF',externalCalls:0};
  var props=PropertiesService.getScriptProperties();
  if(props.getProperty('MATRIX_SANDBOX_API_ENABLED')!=='true')return {state:'API_OFF',externalCalls:0};
  try {
    return matrixStageV2Lock_(function(){
      var j=matrixMasterBridgeV4States_()[cfg.selected];
      if(!j)throw new Error('STAGE_SELECTED_REQUEST_FIRST');
      MatrixMasterInvoiceBridgeV4.assertProjectionSafe(j);
      if(j.refundOrDisputeHold || (j.invoiceStatus && j.invoiceStatus!=='DRAFT'))throw new Error('EXISTING_LIFECYCLE_PRESERVED');
      var location=props.getProperty('SQUARE_SANDBOX_LOCATION_ID');
      if(location!=='LNP57TAA5YGP0')throw new Error('SANDBOX_LOCATION_MISMATCH');
      // Reuse the saved, verified invoice adapter, reference fix and retry keys.
      j=MatrixStageV2.createDraft(j,{enabled:true,locationId:location,call:matrixStageV2SandboxCall_,save:matrixMasterBridgeV4Save_});
      matrixStageV2Project_(j);SpreadsheetApp.flush();
      return {state:j.invoiceStatus,invoiceId:j.invoiceId,orderId:j.orderId,totalCents:j.quote.totalCents,
        emailsSent:0,paymentAttempted:false,publicOrderingEnabled:false};
    });
  } finally {props.setProperty('MATRIX_SANDBOX_API_ENABLED','false');}
}
/** Pure in-memory QA uses schema-shaped rows, not production product entries. */
function matrixMasterBridgeV4SyntheticChecks() {
  var C=MatrixCatalogCoreV3;
  var items=[C.ITEM_COLUMNS,
    ['QA-PRODUCT-A','PRODUCT','QA product alpha','QA pack','Synthetic catalog test',18,12,'','','QA-001','APPROVED','','','REVIEWED','APPROVED','synthetic'],
    ['QA-PRODUCT-B','PRODUCT','QA product beta','QA pack','Synthetic catalog test',12,8,'','','QA-001','APPROVED','','','REVIEWED','APPROVED','synthetic'],
    ['QA-BUNDLE-AB','BUNDLE','QA curated duo','QA pack','Synthetic bundle test',26,18,'','','QA-001','APPROVED','','','REVIEWED','APPROVED','synthetic']];
  var comps=[C.COMPONENT_COLUMNS,
    ['QA-BUNDLE-AB','QA-001','QA-PRODUCT-A',1,'','','','APPROVED','',''],
    ['QA-BUNDLE-AB','QA-001','QA-PRODUCT-B',1,'','','','APPROVED','','']];
  var s=C.normalizeRows(items,comps,[C.RELEASE_COLUMNS]);
  var raw={submissionId:'MV4-TEST-SYNTHETIC-001',email:'matrix.bridge@example.invalid',fulfillment:'TEST_PICKUP',cycleId:'TEST-CYCLE-V4',
    termsAccepted:true,marketingOptIn:false,cart:[{itemId:'QA-PRODUCT-A',quantity:2},{itemId:'QA-BUNDLE-AB',quantity:1}]};
  var deps={snapshot:s,componentRows:comps,catalogCore:C,orderCore:MatrixOrderCore,hash:matrixStageV2Hash_,now:'2026-11-16T18:00:00.000Z'};
  var j=MatrixMasterInvoiceBridgeV4.plan(raw,null,deps);
  if(j.quote.totalCents!==4200||j.comparisonCents!==6200||j.savingsCents!==2000)throw new Error('MASTER_BRIDGE_QUOTE_FAILED');
  var body=MatrixStageV2.invoiceBodies(j,'LNP57TAA5YGP0');
  if(body.order.order.reference_id.length>40||body.invoice.invoice.delivery_method!=='SHARE_MANUALLY')throw new Error('MASTER_BRIDGE_PROVIDER_SHAPE_FAILED');
  var same=MatrixMasterInvoiceBridgeV4.plan(raw,j,deps);
  if(JSON.stringify(same)!==JSON.stringify(j))throw new Error('MASTER_BRIDGE_REPLAY_FAILED');
  var result={state:'PASS',items:3,orderLines:2,totalCents:4200,comparisonCents:6200,savingsCents:2000,
    externalCalls:0,sheetsWritten:0,invoicesCreated:0,emailsSent:0,productionEnabled:false};
  console.log('MATRIX_MASTER_BRIDGE_V4_QA '+JSON.stringify(result));return result;
}
if(typeof module!=='undefined'&&module.exports)module.exports=MatrixMasterInvoiceBridgeV4;
