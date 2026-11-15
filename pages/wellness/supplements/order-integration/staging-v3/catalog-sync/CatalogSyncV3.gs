/* MATRIX | Approved Catalog Sync V3 — additive to existing tracker-bound Apps Script.
 * No new trigger, no public website publication, no invoice/email/payment call.
 * Call matrixCatalogV3DryRun() first. Private sync is OFF by default.
 * Existing RuntimeV2.gs and SandboxLifecycleV2.gs are never modified here.
 */
var MATRIX_CATALOG_V3_MASTER_ID = '15swQj97kKIeEa1DWUyMFnwf_gIXgssswRoYLzv0lSOw';
var MATRIX_CATALOG_V3_SITE_ID = 'cdec8df6-d518-4859-9f1e-f06bf5346d41';
var MATRIX_CATALOG_V3_COLLECTION = 'MatrixSupplementCatalogSnapshotV2';

function matrixCatalogV3Read_(sheetName, cols) {
  var book = SpreadsheetApp.openById(MATRIX_CATALOG_V3_MASTER_ID);
  var sheet = book.getSheetByName(sheetName);
  if (!sheet || sheet.getLastRow() < 5 || sheet.getLastColumn() < cols) throw new Error('CATALOG_SHEET_MISSING_OR_SHORT: ' + sheetName);
  var n = Math.min(sheet.getLastRow() - 4, 300);
  return sheet.getRange(5, 1, n, cols).getValues();
}
function matrixCatalogV3Snapshot_() {
  return MatrixCatalogCoreV3.normalizeRows(
    matrixCatalogV3Read_('Orderable Items V2', 16),
    matrixCatalogV3Read_('Bundle Components V2', 10),
    matrixCatalogV3Read_('Public Release V2', 10));
}
function matrixCatalogV3DryRun() {
  var snap = matrixCatalogV3Snapshot_();
  var result = {
    mode: 'DRY_RUN_ONLY', approvedForPrivateStaging: snap.items.length,
    rejectedItems: snap.rejected.length,
    rejectedCodes: snap.rejected.map(function (x) { return x.code; }).slice(0, 30),
    externalCalls: 0, catalogWriteEnabled: false,
    publicReleaseEnabled: false, invoiceEmailEnabled: false,
    note: 'Private staging only. Product approval and website publication are separate.'
  };
  console.log('MATRIX_CATALOG_V3_DRY_RUN ' + JSON.stringify(result));
  return result;
}
function matrixCatalogV3SyntheticChecks() {
  var C = MatrixCatalogCoreV3;
  var h = C.ITEM_COLUMNS, c = C.COMPONENT_COLUMNS, r = C.RELEASE_COLUMNS;
  var rows = [h,
    ['TEST-PRODUCT-A','PRODUCT','TEST ONLY Vitamin Sample','Test size','Synthetic product for QA',18,12,'','','TEST-V3-1','APPROVED','','','REVIEWED','APPROVED','synthetic'],
    ['TEST-PRODUCT-B','PRODUCT','TEST ONLY Wellness Sample','Test size','Synthetic second product',12,8,'','','TEST-V3-1','APPROVED','','','REVIEWED','APPROVED','synthetic'],
    ['TEST-BUNDLE-AB','BUNDLE','TEST ONLY Bundle Duo','Test pack','Synthetic bundle for QA',26,18,'','','TEST-V3-1','APPROVED','','','REVIEWED','APPROVED','synthetic']
  ];
  var components = [c,
    ['TEST-BUNDLE-AB','TEST-V3-1','TEST-PRODUCT-A',1,'','','','APPROVED','',''],
    ['TEST-BUNDLE-AB','TEST-V3-1','TEST-PRODUCT-B',1,'','','','APPROVED','','']
  ];
  var release = [r,['SUP-LEFT','SUP-MONTHLY-A','MONTHLY_FEATURE_LEFT','TEST-BUNDLE-AB','HOLD','HOLD','HOLD','OFF','INACTIVE','TEST-V3-1']];
  var catalog=C.normalizeRows(rows,components,release);
  var q=C.orderQuote([{itemId:'TEST-PRODUCT-A',quantity:2},{itemId:'TEST-BUNDLE-AB',quantity:1}],catalog);
  if(catalog.items.length!==3 || q.monthlyTotalCents!==4200 || q.everydayTotalCents!==6200 || q.savingsCents!==2000 || !q.quotePreviewOnly)throw new Error('SYNTHETIC_QA_FAILED');
  return {mode:'SYNTHETIC_ONLY',items:catalog.items.length,totalCents:q.monthlyTotalCents,savingsCents:q.savingsCents,
    externalCalls:0,invoices:0,customerRecords:0,publicReleaseEnabled:false};
}
function matrixCatalogV3Request_(key, method, url, body) {
  var response = UrlFetchApp.fetch(url, {
    method: method,contentType:'application/json',
    headers:{'Authorization': key,'wix-site-id': MATRIX_CATALOG_V3_SITE_ID},
    payload:JSON.stringify(body),muteHttpExceptions:true,followRedirects:false
  });
  var code=response.getResponseCode();
  if(code<200 || code>=300)throw new Error('WIX_CMS_HTTP_'+code); // Never log headers, tokens or body.
  return JSON.parse(response.getContentText());
}
/* Owner-only stage, not a production/public release.
 * Requires explicit separate permission for new API key; never generates credentials.
 * Does not schedule itself or create customer records. */
function matrixCatalogV3SyncPrivate() {
  var lock=LockService.getScriptLock(); if(!lock.tryLock(10000))throw new Error('CATALOG_SYNC_BUSY');
  try {
    var props=PropertiesService.getScriptProperties();
    if(props.getProperty('MATRIX_CATALOG_V3_PUSH_ENABLED')!=='ALLOW_PRIVATE_ONLY')return {state:'OFF',externalCalls:0};
    if(props.getProperty('MATRIX_CATALOG_V3_SITE_ID')!==MATRIX_CATALOG_V3_SITE_ID)throw new Error('SITE_ID_MISMATCH');
    var key=props.getProperty('MATRIX_WIX_API_KEY');
    if(!key)return {state:'BLOCKED_MISSING_APPROVED_API_KEY',externalCalls:0};
    var snap=matrixCatalogV3Snapshot_();
    if(snap.items.length===0)return {state:'EMPTY_APPROVED_CATALOG',externalCalls:0};
    var records=MatrixCatalogCoreV3.toWixPrivateRecords(snap);
    // Read all existing collection IDs first. Never overwrite a record owned by another workflow.
    var queryUrl='https://www.wixapis.com/wix-data/v2/items/query';
    var existing=[],offset=0,more=true;
    while(more) {
      var data=matrixCatalogV3Request_(key,'post',queryUrl,{dataCollectionId:MATRIX_CATALOG_V3_COLLECTION,
        query:{paging:{limit:100,offset:offset}},returnTotalCount:true});
      var chunk=data.dataItems||[];
      existing=existing.concat(chunk);
      offset+=chunk.length;
      if(offset>1000)throw new Error('CMS_TOO_MANY_RECORDS');
      more=chunk.length===100;
    }
    var byId={};existing.forEach(function (x){byId[x.id]=x;});
    records.forEach(function (x){
      if(byId[x.id] && byId[x.id].data && byId[x.id].data.releaseState!=='STAGED_PRIVATE')
        throw new Error('UNOWNED_OR_RELEASED_RECORD');
    });
    var changing=records.filter(function (r){
      var old=byId[r.id];
      return !old || ['itemId','kind','publicName','shortDescription','imageUrl','monthlyPriceCents',
        'everydayPriceCents','offerVersion','releaseState','publicSlot'].some(function(k){
          return (old.data||{})[k] !== r.data[k];
        });
    });
    if(changing.length===0)return {state:'UP_TO_DATE',privateRecords:records.length,externalCalls:1};
    var now=new Date().toISOString(); changing.forEach(function(r){r.data.sourceUpdated=now;});
    var response=matrixCatalogV3Request_(key,'post','https://www.wixapis.com/wix-data/v2/bulk/items/save',{
      dataCollectionId:MATRIX_CATALOG_V3_COLLECTION,dataItems:changing,returnEntity:true
    });
    var meta=response.bulkActionMetadata||{};
    if(meta.totalFailures||meta.totalSuccesses!==changing.length)throw new Error('CATALOG_SYNC_PARTIAL_SUCCESS_VERIFY_BEFORE_RETRY');
    return {state:'PRIVATE_STAGED',updated:changing.length,approved:records.length,
      externalCalls:2,publicReleaseEnabled:false,invoiceSent:false};
  } finally {lock.releaseLock();}
}
