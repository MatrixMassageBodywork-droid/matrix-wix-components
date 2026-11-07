// Targeted QA correction: hide only the new face CCF override added by Square.
const MSSMRLFEEVISID='SSM-20261107-RLFEEVIS1';
function mssmRLFeeVisMode_(p){return p&&p.update_mode==='MSSM_RED_LIGHT_FEE_VISIBILITY_20261107';}
function mssmRLFeeVisExpected_(c){const o=mssm166Clone_(c.item),i=o.item_data.modifier_list_info.find(function(x){return x.modifier_list_id==='SHLF7QFESV3Q3VPCLQAMPIC6';}),m=i.modifier_overrides.find(function(x){return x.modifier_id==='ONUANZ23V2NTQJYVEYDPJXUV';});m.hidden_online_override='YES';return o;}
function mssmRLFeeVisValidate_(p,c){
 if(!mssmRLFeeVisMode_(p)||p.operation!=='UPDATE'||p.request_id!==MSSMRLFEEVISID||p.existing_item_id!=='D6WBEWYNPLZ5ET3YB4APHMVT'||p.original_request!==MSSMRLSYNCREQUEST||p.fields_to_change!=='new_face_ccf_hidden_online_override')throw new Error('Exact visibility correction scope required.');
 if(p.baseline_hash!==mssm166Sha256_(mssm166StableStringify_(c))||!c.item||c.item.id!==p.existing_item_id||c.item.version!==p.expected_item_version)throw new Error('Visibility baseline mismatch.');
 const i=c.item.item_data.modifier_list_info.find(function(x){return x.modifier_list_id==='SHLF7QFESV3Q3VPCLQAMPIC6';}),a=i&&i.modifier_overrides.filter(function(x){return x.modifier_id==='ONUANZ23V2NTQJYVEYDPJXUV';});
 if(!a||a.length!==1||a[0].hidden_online_override!=='NO'||a[0].on_by_default_override!=='NO')throw new Error('Unexpected fee visibility baseline.');return true;
}
function mssmRLSyncRow_(sh){const rows=sh.getDataRange().getValues(),i=rows.findIndex(function(r){return r[0]===MSSMRLSYNCREQUEST;});if(i<1)throw new Error('Original approved request missing.');const row=rows[i],p=JSON.parse(row[8]),c=JSON.parse(row[7]);if(!row[10]||!row[11]||row[9]!==mssm166Sha256_(mssm166StableStringify_(p)))throw new Error('Original approval mismatch.');mssmRLSyncValidate_(p,c);const v=JSON.parse(row[14]||'{}'),m=v.id_mappings||(v.summary&&v.summary.id_mappings);if(!m||m['#MSSMRL_FACE_CCF_20261107']!=='ONUANZ23V2NTQJYVEYDPJXUV'||m['#MSSMRL_FACE_20261107']!=='EK53D45LED4YAUPUWP3YR4SK')throw new Error('Actual created modifier mappings missing.');return {row:row,rowNum:i+1,p:p,c:c,m:m};}
function matrixRedLightFeeVisibilityPrepare20261107(){
 const cfg=mssm166Config_();if(mssm166Bool_(cfg.SERVICE_MANAGER_ENABLED)||mssm166Bool_(cfg.WRITE_SHARED_MODIFIER_LISTS_ENABLED))throw new Error('Pause gates for correction preview.');
 const sh=SpreadsheetApp.openById(MSSM166.spreadsheetId).getSheetByName(MSSM166.requestsSheet),source=mssmRLSyncRow_(sh);
 if(sh.getDataRange().getValues().some(function(r){return r[0]===MSSMRLFEEVISID;}))throw new Error('Correction already prepared; do not recreate.');
 const actual=mssmRLSyncRead_(cfg),c={item:actual.massage_item,original_fingerprint:source.row[9]},expected=mssmRLFeeVisExpected_(c),sim=mssm166Clone_(actual);
 sim.massage_item=expected;const a=sim.associations.find(function(x){return x.id===expected.id;});a.modifier_list_info=expected.item_data.modifier_list_info;a.object_hash=mssm166Sha256_(mssmRLComparable_(expected));
 const check=mssmRLSyncVerify_(source.p,source.c,sim,source.m);if(!check.ok)throw new Error('More than exact fee visibility differs: '+JSON.stringify(check.errors));
 const p={operation:'UPDATE',update_mode:'MSSM_RED_LIGHT_FEE_VISIBILITY_20261107',request_id:MSSMRLFEEVISID,existing_item_id:expected.id,expected_item_version:actual.massage_item.version,original_request:MSSMRLSYNCREQUEST,fields_to_change:'new_face_ccf_hidden_online_override',baseline_hash:mssm166Sha256_(mssm166StableStringify_(c))};mssmRLFeeVisValidate_(p,c);
 const now=new Date(),r=[MSSMRLFEEVISID,now,now,'HASH_REQUESTED','UPDATE','QA correction within owner-approved red-light fee synchronization: preserve hidden fee visibility. No price write.',JSON.stringify({targeted_correction:true}),JSON.stringify(c),JSON.stringify(p),'','','','','','','','','','',''];sh.appendRow(r);SpreadsheetApp.flush();console.log(JSON.stringify(mssm166HashRow_(sh,sh.getLastRow(),r)));
}
function mssmRLFeeVisApply_(sh,rowNum,row,cfg,p,c){
 if(!mssm166Bool_(cfg.SERVICE_MANAGER_ENABLED)||!mssm166Bool_(cfg.SERVICE_WRITE_ENABLED)||!mssm166Bool_(cfg.WRITE_SHARED_MODIFIER_LISTS_ENABLED))throw new Error('All write gates required.');
 const lock=LockService.getScriptLock();if(!lock.tryLock(1000))return {status:'LOCKED_NO_WRITE'};let attempted=false;
 try{const fresh=sh.getRange(rowNum,1,1,20).getValues()[0];if(fresh[0]!==MSSMRLFEEVISID||fresh[3]!=='APPROVED')return {status:'NO_WRITE_NOT_APPROVED'};
 if(!fresh[10]||!fresh[11]||fresh[8]!==row[8]||fresh[7]!==row[7]||fresh[9]!==mssm166Sha256_(mssm166StableStringify_(p)))throw new Error('Correction approval mismatch.');mssmRLFeeVisValidate_(p,c);
 const source=mssmRLSyncRow_(sh);if(source.row[9]!==c.original_fingerprint)throw new Error('Original approved scope changed.');
 const current=mssm166Retrieve_(p.existing_item_id,true,cfg).object;if(current.version!==p.expected_item_version||mssmRLComparable_(current)!==mssmRLComparable_(c.item))throw new Error('Item changed after correction preview.');
 const expected=mssmRLFeeVisExpected_(c),obj=mssm166Clone_(expected);function clean(o){if(!o||typeof o!=='object')return;['updated_at','created_at','is_deleted'].forEach(function(k){delete o[k];});Object.keys(o).forEach(function(k){clean(o[k]);});}clean(obj);delete obj.item_data.description_plaintext;delete obj.item_data.channels;obj.item_data.variations.forEach(function(v){delete v.item_variation_data.channels;});
 mssm166SetRow_(sh,rowNum,{status:'PROCESSING',updatedAt:new Date(),notes:'Exact new face CCF visibility correction; no price changes.'});SpreadsheetApp.flush();attempted=true;
 const result=mssm166Api_('POST','/v2/catalog/object',{idempotency_key:String(fresh[11]),object:obj},cfg);if(!result.catalog_object||result.catalog_object.id!==obj.id)throw new Error('Write receipt incomplete. Inspect before retry.');
 const saved=mssm166Retrieve_(obj.id,true,cfg).object,ok=mssmRLComparable_(saved)===mssmRLComparable_(expected),v={ok:ok,errors:ok?[]:['Visibility read-back mismatch'],summary:{item_id:obj.id,version:saved.version,modifier_id:'ONUANZ23V2NTQJYVEYDPJXUV',hidden_online_override:'YES',unrelated_fields_preserved:ok,price_changes:0}};
 const status=ok?'SAVED_VERIFIED':'VERIFY_FAILED_MANUAL_REVIEW';mssm166SetRow_(sh,rowNum,{status:status,verification:JSON.stringify(v),squareItemId:obj.id,error:v.errors.join(' | '),updatedAt:new Date()});mssm166Audit_(MSSMRLFEEVISID,'FEE_VISIBILITY_CORRECTION',status,JSON.stringify(v),obj.id,'',saved.version);console.log(JSON.stringify(v));return {status:status};
 }catch(e){if(attempted){mssm166SetRow_(sh,rowNum,{status:'VERIFY_FAILED_MANUAL_REVIEW',error:mssm166SafeError_(e),updatedAt:new Date()});return {status:'VERIFY_FAILED_MANUAL_REVIEW'};}throw e;}finally{lock.releaseLock();}
}
function matrixRedLightSharedReceipt20261107(){
 const cfg=mssm166Config_();if(mssm166Bool_(cfg.SERVICE_MANAGER_ENABLED)||mssm166Bool_(cfg.WRITE_SHARED_MODIFIER_LISTS_ENABLED))throw new Error('Pause gates for read-only receipt recovery.');
 const sh=SpreadsheetApp.openById(MSSM166.spreadsheetId).getSheetByName(MSSM166.requestsSheet),s=mssmRLSyncRow_(sh),after=mssmRLSyncRead_(cfg),v=mssmRLSyncVerify_(s.p,s.c,after,s.m);if(!v.ok)throw new Error(JSON.stringify(v.errors));
 mssm166SetRow_(sh,s.rowNum,{status:'SAVED_VERIFIED',squareItemId:MSSMRLSYNCPLAN.map(function(x){return x.list;}).join(' | '),squareVariationIds:Object.values(s.m).join(' | '),verification:JSON.stringify(v),error:'',notes:'Full reconciliation verified. Square reindexed modifier ordinals with identical order; new face CCF visibility corrected separately. No repeat price writes.',updatedAt:new Date()});mssm166Audit_(MSSMRLSYNCREQUEST,'READ_ONLY_SHARED_RECEIPT','SAVED_VERIFIED',JSON.stringify(v.summary),'','','');console.log(JSON.stringify({squareWrites:0,verification:v}));
}
