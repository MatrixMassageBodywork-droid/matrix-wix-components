/** Owner approved shared red-light choices and fee synchronization, 2026-11-07.
 * Existing queue approval/hash/idempotency gates; one atomic catalog batch.
 */
const MSSMRLSYNCREQUEST='SSM-20261107-RLSHARED1';
const MSSMRLSYNCPLAN=[
 {list:'GKKPB7JCCQA6S3MIFWHY5Y4W',modifier:'BYZZXJ63KW3FZXLIPUG27GPW',from:2500,to:2299,add:{id:'#MSSMRL_FACE_20261107',name:'Red Light (face/head)',cents:1499}},
 {list:'SHLF7QFESV3Q3VPCLQAMPIC6',modifier:'SB3EY6RC3JJGQPWV7OW3IYHY',from:75,to:69,add:{id:'#MSSMRL_FACE_CCF_20261107',name:'CCF - Red Light (face/head)',cents:45}},
 {list:'NJVQD7HIY7MD2PYLEFQ3UAG6',modifier:'OVP5XYD6DWH3H6X32TG52AT4',from:75,to:78,oldName:'CCF-3 - 20 Minute Session ($0.75)',newName:'CCF-3 - 20 Minute Session ($0.78)'},
 {list:'M66TFMQVRHEG6VRWRJN3N6RM',modifier:'VDVPIIMGP7ZSJIFBUNPRP6OK',from:75,to:69,oldName:'CCF-3 - 20 Minute Session ($0.75)',newName:'CCF-3 - 20 Minute Session ($0.69)'}
];
function mssmRLSyncMode_(p){return p&&p.update_mode==='MSSM_RED_LIGHT_SHARED_20261107';}
function mssmRLSyncValidate_(p,c){
 if(!mssmRLSyncMode_(p)||p.operation!=='UPDATE'||p.request_id!==MSSMRLSYNCREQUEST)throw new Error('Unapproved shared-menu scope.');
 if(mssm166StableStringify_(p.changes)!==mssm166StableStringify_(MSSMRLSYNCPLAN))throw new Error('Shared-menu changes differ from owner approval.');
 if(!c||!c.lists||!Array.isArray(c.associations)||!c.associations.length||p.baseline_hash!==mssm166Sha256_(mssm166StableStringify_(c)))throw new Error('Shared-menu baseline signature mismatch.');
 if(!c.massage_item||c.massage_item.id!=='D6WBEWYNPLZ5ET3YB4APHMVT'||c.massage_item.is_deleted)throw new Error('Canonical massage snapshot required.');
 const mi=c.massage_item.item_data.modifier_list_info.find(function(x){return x.modifier_list_id===MSSMRLSYNCIDS[0];});
 if(!mi||!mi.enabled||!mi.modifier_overrides||!mi.modifier_overrides.some(function(x){return x.modifier_id===MSSMRLSYNCPLAN[0].modifier&&x.hidden_online_override==='NO';}))throw new Error('Existing massage choice visibility changed.');
 if(Object.keys(c.lists).sort().join('|')!==MSSMRLSYNCIDS.slice().sort().join('|'))throw new Error('Exact five-list baseline required.');
 MSSMRLSYNCPLAN.forEach(function(change){
  const o=c.lists[change.list],d=o&&o.modifier_list_data;
  if(!o||o.id!==change.list||o.type!=='MODIFIER_LIST'||o.is_deleted||!Number.isSafeInteger(o.version)||!d||!Array.isArray(d.modifiers))throw new Error('Shared-menu identity/version mismatch.');
  const hits=d.modifiers.filter(function(m){return m.id===change.modifier;});
  if(hits.length!==1)throw new Error('Exact modifier missing or ambiguous.');
  const m=hits[0],md=m.modifier_data;
  if(m.type!=='MODIFIER'||m.is_deleted||md.modifier_list_id!==o.id||!md.price_money||md.price_money.amount!==change.from||md.price_money.currency!=='USD')throw new Error('Modifier baseline price/identity mismatch.');
  if((md.location_overrides||[]).some(function(x){return x.price_money;}))throw new Error('Location price override requires review.');
  if(change.oldName&&md.name!==change.oldName)throw new Error('Fee name changed.');
  if(change.add&&d.modifiers.some(function(x){return /red.*light.*(face|head|neck)/i.test(x.modifier_data.name);}))throw new Error('Face red-light option already exists. Do not duplicate.');
 });
 const face=c.lists['XS6URRPU2EFUVZBNNCA5YS2K'].modifier_list_data.modifiers.find(function(m){return m.id==='7MVQBXHI63SCSBUBQW4AJX34';});
 if(!face||face.modifier_data.price_money.amount!==45||face.modifier_data.price_money.currency!=='USD')throw new Error('Existing face CCF changed.');
 return true;
}
function mssmRLSyncExpected_(c,mappings){
 return MSSMRLSYNCPLAN.map(function(change){
  const o=mssm166Clone_(c.lists[change.list]),mods=o.modifier_list_data.modifiers,m=mods.find(function(x){return x.id===change.modifier;});
  m.modifier_data.price_money.amount=change.to;if(change.newName)m.modifier_data.name=change.newName;
  if(change.add){
   const n=mssm166Clone_(m);n.id=(mappings||{})[change.add.id]||change.add.id;delete n.version;delete n.updated_at;delete n.created_at;n.is_deleted=false;
   n.modifier_data.name=change.add.name;n.modifier_data.price_money={amount:change.add.cents,currency:'USD'};
   n.modifier_data.ordinal=Math.max.apply(null,mods.map(function(x){return Number(x.modifier_data.ordinal||0);})) + 1;
   mods.push(n);
  }
  return o;
 });
}
function mssmRLSyncMassageExpected_(c,mappings){
 const o=mssm166Clone_(c.massage_item),info=o.item_data.modifier_list_info.find(function(x){return x.modifier_list_id===MSSMRLSYNCIDS[0];});
 const n=mssm166Clone_(info.modifier_overrides.find(function(x){return x.modifier_id===MSSMRLSYNCPLAN[0].modifier;}));
 n.modifier_id=(mappings||{})['#MSSMRL_FACE_20261107']||'#MSSMRL_FACE_20261107';info.modifier_overrides.push(n);
 const fee=o.item_data.modifier_list_info.find(function(x){return x.modifier_list_id===MSSMRLSYNCIDS[1];});fee.modifier_overrides.push({modifier_id:(mappings||{})['#MSSMRL_FACE_CCF_20261107']||'#MSSMRL_FACE_CCF_20261107',hidden_online_override:'YES',on_by_default_override:'NO'});return o;
}
function mssmRLSyncAssociations_(c){return mssm166StableStringify_(c.associations.map(function(x){const o=mssm166Clone_(x);delete o.version;return o;}));}
function mssmRLSyncVerify_(p,c,after,mappings){
 const errors=[];
 mssmRLSyncExpected_(c,mappings).forEach(function(o){if(mssmRLSyncListComparable_(o)!==mssmRLSyncListComparable_(after.lists[o.id]))errors.push('List read-back differs: '+o.id);});
 const watch='XS6URRPU2EFUVZBNNCA5YS2K';if(mssmRLComparable_(c.lists[watch])!==mssmRLComparable_(after.lists[watch]))errors.push('Untouched face payment list changed.');
 const expectedMassage=mssmRLSyncMassageExpected_(c,mappings);
 if(mssmRLComparable_(expectedMassage)!==mssmRLComparable_(after.massage_item))errors.push('Canonical massage differs beyond new face option visibility.');
 const expectedContext=mssm166Clone_(c),a=expectedContext.associations.find(function(x){return x.id===expectedMassage.id;});
 if(!a)errors.push('Canonical association missing.');else{a.modifier_list_info=expectedMassage.item_data.modifier_list_info;a.object_hash=mssm166Sha256_(mssmRLComparable_(expectedMassage));}
 if(mssmRLSyncAssociations_(expectedContext)!==mssmRLSyncAssociations_(after))errors.push('Associated item/list assignment changed beyond approved face option.');
 return {ok:errors.length===0,errors:errors,summary:{mode:p.update_mode,lists:MSSMRLSYNCPLAN.map(function(ch){const o=after.lists[ch.list];return {id:o.id,name:o.modifier_list_data.name,version:o.version,options:o.modifier_list_data.modifiers.filter(function(m){return m.id===ch.modifier||(ch.add&&m.id===mappings[ch.add.id]);}).map(function(m){return {id:m.id,name:m.modifier_data.name,price:m.modifier_data.price_money,hidden_online:m.modifier_data.hidden_online};})};}),unchanged_face_ccf:45,associated_items_checked:after.associations.length,unrelated_options_and_settings_preserved:errors.length===0,id_mappings:mappings}};
}
function matrixRedLightSharedPrepare20261107(){
 const cfg=mssm166Config_();if(mssm166Bool_(cfg.SERVICE_MANAGER_ENABLED)||mssm166Bool_(cfg.WRITE_SHARED_MODIFIER_LISTS_ENABLED))throw new Error('Keep manager/shared gates paused for preparation.');
 const sh=SpreadsheetApp.openById(MSSM166.spreadsheetId).getSheetByName(MSSM166.requestsSheet),rows=sh.getDataRange().getValues();
 if(rows.some(function(r){return String(r[0])===MSSMRLSYNCREQUEST;}))throw new Error('Request already exists. Read current state; do not recreate.');
 if(rows.some(function(r){return ['APPROVED','PROCESSING'].includes(String(r[3]));}))throw new Error('Unexpected active request; inspect before proceeding.');
 const c=mssmRLSyncRead_(cfg),p={operation:'UPDATE',update_mode:'MSSM_RED_LIGHT_SHARED_20261107',request_id:MSSMRLSYNCREQUEST,baseline_hash:mssm166Sha256_(mssm166StableStringify_(c)),changes:mssm166Clone_(MSSMRLSYNCPLAN)};
 mssmRLSyncValidate_(p,c);if(JSON.stringify(c).length>49000)throw new Error('Baseline exceeds safe cell limit.');
 const now=new Date(),r=[MSSMRLSYNCREQUEST,now,now,'HASH_REQUESTED','UPDATE','Owner approved shared massage face/head $14.99, full-body $22.99 and linked 3% CCF $0.78 / $0.45 / $0.69 on 2026-11-07.',JSON.stringify({family:'MASSAGE_ADD_ON',shared_modifier_owner_approved:true}),JSON.stringify(c),JSON.stringify(p),'','','','','','','','','','',''];
 sh.appendRow(r);SpreadsheetApp.flush();const out=mssm166HashRow_(sh,sh.getLastRow(),r);console.log(JSON.stringify(out));
}
function mssmRLSyncApply_(sh,rowNum,row,cfg,p,c){
 if(!mssm166Bool_(cfg.SERVICE_MANAGER_ENABLED)||!mssm166Bool_(cfg.SERVICE_WRITE_ENABLED)||!mssm166Bool_(cfg.WRITE_SHARED_MODIFIER_LISTS_ENABLED))throw new Error('All existing shared-menu write gates must be enabled.');
 const lock=LockService.getScriptLock();if(!lock.tryLock(1000))return {requestId:MSSMRLSYNCREQUEST,status:'LOCKED_NO_WRITE'};
 let attempted=false;
 try{
  const fresh=sh.getRange(rowNum,1,1,20).getValues()[0];
  if(fresh[0]!==MSSMRLSYNCREQUEST||fresh[3]!=='APPROVED')return {requestId:MSSMRLSYNCREQUEST,status:'NO_WRITE_NOT_APPROVED'};
  if(!fresh[10]||!fresh[11]||fresh[9]!==mssm166Sha256_(mssm166StableStringify_(p))||fresh[8]!==row[8]||fresh[7]!==row[7])throw new Error('Shared-menu approval evidence mismatch.');
  mssmRLSyncValidate_(p,c);
  const current=mssmRLSyncRead_(cfg);
  MSSMRLSYNCIDS.forEach(function(id){if(current.lists[id].version!==c.lists[id].version||mssmRLComparable_(current.lists[id])!==mssmRLComparable_(c.lists[id]))throw new Error('List changed after preview: '+id);});
  if(mssmRLSyncAssociations_(current)!==mssmRLSyncAssociations_(c))throw new Error('Associations changed after preview.');
  if(current.massage_item.version!==c.massage_item.version||mssmRLComparable_(current.massage_item)!==mssmRLComparable_(c.massage_item))throw new Error('Canonical massage changed after preview.');
  const objects=mssmRLSyncExpected_(c,{});objects.push(mssmRLSyncMassageExpected_(c,{}));
  function clean(o){if(!o||typeof o!=='object')return;['updated_at','created_at','is_deleted'].forEach(function(k){delete o[k];});Object.keys(o).forEach(function(k){clean(o[k]);});}objects.forEach(clean);const massage=objects[objects.length-1];delete massage.item_data.description_plaintext;delete massage.item_data.channels;massage.item_data.variations.forEach(function(v){delete v.item_variation_data.channels;});
  mssm166SetRow_(sh,rowNum,{status:'PROCESSING',error:'',updatedAt:new Date(),notes:'Approved atomic shared-menu write; never retry without read-back.'});SpreadsheetApp.flush();
  attempted=true;const r=mssm166Api_('POST','/v2/catalog/batch-upsert',{idempotency_key:String(fresh[11]),batches:[{objects:objects}]},cfg);
  if(r.errors&&r.errors.length)throw new Error('Batch returned errors: '+JSON.stringify(r.errors));
  const mappings={};(r.id_mappings||[]).forEach(function(m){mappings[m.client_object_id]=m.object_id;});
  if(!mappings['#MSSMRL_FACE_20261107']||!mappings['#MSSMRL_FACE_CCF_20261107'])throw new Error('New modifier ID mappings missing. Inspect before retry.');
  mssm166SetRow_(sh,rowNum,{verification:JSON.stringify({ok:false,pending_readback:true,id_mappings:mappings}),updatedAt:new Date()});SpreadsheetApp.flush();
  const after=mssmRLSyncRead_(cfg),v=mssmRLSyncVerify_(p,c,after,mappings),status=v.ok?'SAVED_VERIFIED':'VERIFY_FAILED_MANUAL_REVIEW';
  mssm166SetRow_(sh,rowNum,{status:status,squareItemId:MSSMRLSYNCPLAN.map(function(x){return x.list;}).join(' | '),squareVariationIds:Object.keys(mappings).map(function(k){return mappings[k];}).join(' | '),verification:JSON.stringify(v),error:v.errors.join(' | '),notes:'Four lists synchronized; face option added and made visible on canonical massage by matching full-body override. All other service fields/assignments and options preserved. Fee choices remain hidden online.',updatedAt:new Date()});
  mssm166Audit_(MSSMRLSYNCREQUEST,'SHARED_MENU_APPLY',status,JSON.stringify(v.summary),MSSMRLSYNCPLAN[0].list,Object.values(mappings).join(' | '),'');
  console.log(JSON.stringify({requestId:MSSMRLSYNCREQUEST,status:status,verification:v}));return {requestId:MSSMRLSYNCREQUEST,status:status};
 }catch(e){if(attempted){mssm166SetRow_(sh,rowNum,{status:'VERIFY_FAILED_MANUAL_REVIEW',error:mssm166SafeError_(e),notes:'Possible Square write. Inspect live objects; do not retry automatically.',updatedAt:new Date()});return {requestId:MSSMRLSYNCREQUEST,status:'VERIFY_FAILED_MANUAL_REVIEW',error:mssm166SafeError_(e)};}throw e;}
 finally{lock.releaseLock();}
}

// Square reindexes this list from 1..N to 0..N-1; preserve exact item order.
function mssmRLSyncListComparable_(o){const x=mssm166Clone_(o);if(x&&x.id==='GKKPB7JCCQA6S3MIFWHY5Y4W'){const a=x.modifier_list_data.modifiers,start=a[0].modifier_data.ordinal;if([0,1].includes(start)&&a.every(function(m,i){return m.modifier_data.ordinal===i+start;}))a.forEach(function(m,i){m.modifier_data.ordinal=i;});}return mssmRLComparable_(x);}
