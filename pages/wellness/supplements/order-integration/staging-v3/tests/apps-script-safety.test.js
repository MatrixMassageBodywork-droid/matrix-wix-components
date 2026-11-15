'use strict';
const test=require('node:test'), assert=require('node:assert/strict'), vm=require('node:vm'), fs=require('node:fs'), path=require('node:path');
const root=path.join(__dirname,'..','catalog-sync');
const code=fs.readFileSync(path.join(root,'CatalogRulesV3.gs'),'utf8')+'\n'+fs.readFileSync(path.join(root,'CatalogSyncV3.gs'),'utf8');
function sandbox(props={}){
 const counts={web:0,books:0};
 const ctx={
  console:{log(){}},
  SpreadsheetApp:{openById(){counts.books++;return {getSheetByName(name){
   const C=ctx.MatrixCatalogCoreV3;
   const headers={'Orderable Items V2':C.ITEM_COLUMNS,'Bundle Components V2':C.COMPONENT_COLUMNS,'Public Release V2':C.RELEASE_COLUMNS};
   return {getLastRow(){return 5},getLastColumn(){return headers[name].length},getRange(){return {getValues(){return [headers[name]]}}}};
  }}}},
  UrlFetchApp:{fetch(){counts.web++;throw Error('WEB_CALL_FORBIDDEN_IN_OFF_TEST')}},
  LockService:{getScriptLock(){return {tryLock(){return true},releaseLock(){}}}},
  PropertiesService:{getScriptProperties(){return {getProperty(key){return props[key]||''}}}}
 };
 vm.runInNewContext(code,ctx);
 return {ctx,counts};
}
test('Apps Script synthetic QA is always no-network and $42',()=>{const {ctx,counts}=sandbox();const result=ctx.matrixCatalogV3SyntheticChecks();assert.equal(result.totalCents,4200);assert.equal(result.savingsCents,2000);assert.equal(counts.web,0)});
test('Apps Script dry run with no approved entries does not write',()=>{const {ctx,counts}=sandbox();const result=ctx.matrixCatalogV3DryRun();assert.equal(result.approvedForPrivateStaging,0);assert.equal(result.publicReleaseEnabled,false);assert.equal(counts.web,0);assert.equal(counts.books,3)});
test('sync is OFF with no permissions or secrets',()=>{const {ctx,counts}=sandbox();const result=ctx.matrixCatalogV3SyncPrivate();assert.equal(result.state,'OFF');assert.equal(counts.web,0);assert.equal(counts.books,0)});
test('sync rejects wrong site id without touching the network',()=>{const {ctx,counts}=sandbox({MATRIX_CATALOG_V3_PUSH_ENABLED:'ALLOW_PRIVATE_ONLY',MATRIX_CATALOG_V3_SITE_ID:'wrong'});assert.throws(()=>ctx.matrixCatalogV3SyncPrivate(),/SITE_ID_MISMATCH/);assert.equal(counts.web,0)});
test('missing approved API key blocks without network calls',()=>{const {ctx,counts}=sandbox({MATRIX_CATALOG_V3_PUSH_ENABLED:'ALLOW_PRIVATE_ONLY',MATRIX_CATALOG_V3_SITE_ID:'cdec8df6-d518-4859-9f1e-f06bf5346d41'});const result=ctx.matrixCatalogV3SyncPrivate();assert.equal(result.state,'BLOCKED_MISSING_APPROVED_API_KEY');assert.equal(counts.web,0)});
test('empty approved catalog blocks private sync even with mock key',()=>{const {ctx,counts}=sandbox({MATRIX_CATALOG_V3_PUSH_ENABLED:'ALLOW_PRIVATE_ONLY',MATRIX_CATALOG_V3_SITE_ID:'cdec8df6-d518-4859-9f1e-f06bf5346d41',MATRIX_WIX_API_KEY:'fake'});const result=ctx.matrixCatalogV3SyncPrivate();assert.equal(result.state,'EMPTY_APPROVED_CATALOG');assert.equal(counts.web,0)});
