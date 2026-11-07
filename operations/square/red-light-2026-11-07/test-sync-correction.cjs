const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),crypto=require('crypto');
const ctx={console};vm.createContext(ctx);vm.runInContext(fs.readFileSync(__dirname+'/manager-sync-corrected.gs','utf8'),ctx);ctx.mssm166Sha256_=x=>crypto.createHash('sha256').update(x).digest('hex');
const clone=x=>JSON.parse(JSON.stringify(x)),c=JSON.parse(fs.readFileSync(__dirname+'/sync-approved-context.json')),p=JSON.parse(fs.readFileSync(__dirname+'/sync-approved-proposal.json')),after=JSON.parse(fs.readFileSync(__dirname+'/sync-after.json')),m={'#MSSMRL_FACE_20261107':'EK53D45LED4YAUPUWP3YR4SK','#MSSMRL_FACE_CCF_20261107':'ONUANZ23V2NTQJYVEYDPJXUV'};
let tests=0;function test(f){f();tests++;}
test(()=>assert.equal(ctx.mssmRLSyncVerify_(p,c,after,m).ok,false));
const cc={item:after.massage_item,original_fingerprint:'original-approved'},fixed=clone(after);fixed.massage_item=clone(ctx.mssmRLFeeVisExpected_(cc));const assoc=fixed.associations.find(x=>x.id===fixed.massage_item.id);assoc.modifier_list_info=fixed.massage_item.item_data.modifier_list_info;assoc.object_hash=ctx.mssm166Sha256_(ctx.mssmRLComparable_(fixed.massage_item));
test(()=>assert.equal(ctx.mssmRLSyncVerify_(p,c,fixed,m).ok,true));
test(()=>{const a=clone(fixed);a.lists.GKKPB7JCCQA6S3MIFWHY5Y4W.modifier_list_data.modifiers.reverse();assert.equal(ctx.mssmRLSyncVerify_(p,c,a,m).ok,false);});
test(()=>{const a=clone(fixed);a.lists.GKKPB7JCCQA6S3MIFWHY5Y4W.modifier_list_data.modifiers[0].modifier_data.ordinal=7;assert.equal(ctx.mssmRLSyncVerify_(p,c,a,m).ok,false);});
const cp={operation:'UPDATE',update_mode:'MSSM_RED_LIGHT_FEE_VISIBILITY_20261107',request_id:'SSM-20261107-RLFEEVIS1',existing_item_id:cc.item.id,expected_item_version:cc.item.version,original_request:'SSM-20261107-RLSHARED1',fields_to_change:'new_face_ccf_hidden_online_override',baseline_hash:ctx.mssm166Sha256_(ctx.mssm166StableStringify_(cc))};
test(()=>assert.equal(ctx.mssm166ValidateProposal_(cp,cc),true));
for(const mut of [q=>q.existing_item_id='OTHER',q=>q.expected_item_version++,q=>q.fields_to_change='price',q=>q.baseline_hash='wrong'])test(()=>{const q=clone(cp);mut(q);assert.throws(()=>ctx.mssmRLFeeVisValidate_(q,cc));});
const row=[cp.request_id,'','','APPROVED','UPDATE','','',JSON.stringify(cc),JSON.stringify(cp),ctx.mssm166Sha256_(ctx.mssm166StableStringify_(cp)),'2026-11-07','idem-vis'];
ctx.mssmRLSyncRow_=()=>({row:Array(9).fill('').concat(['original-approved'])});ctx.LockService={getScriptLock:()=>({tryLock:()=>true,releaseLock(){}})};ctx.SpreadsheetApp={flush(){}};ctx.mssm166SetRow_=()=>{};ctx.mssm166Audit_=()=>{};let writes=0,reads=0;
ctx.mssm166Retrieve_=()=>({object:reads++===0?cc.item:fixed.massage_item});ctx.mssm166Api_=(method,path,body)=>{writes++;assert.equal(path,'/v2/catalog/object');assert.deepEqual(clone(body.object.item_data.variations).map(x=>x.item_variation_data.price_money),cc.item.item_data.variations.map(x=>x.item_variation_data.price_money));return{catalog_object:fixed.massage_item};};
test(()=>assert.equal(ctx.mssmRLFeeVisApply_({getRange:()=>({getValues:()=>[row]})},9,row,{SERVICE_MANAGER_ENABLED:true,SERVICE_WRITE_ENABLED:true,WRITE_SHARED_MODIFIER_LISTS_ENABLED:true},cp,cc).status,'SAVED_VERIFIED'));
test(()=>assert.equal(writes,1));
fs.writeFileSync(__dirname+'/sync-correction-test-results.json',JSON.stringify({ok:true,tests,real_square_writes:0,scope:'Actual Square ordinal normalization accepted only with identical order; exact new fee override corrected; no price changes'},null,2));console.log(JSON.stringify({ok:true,tests,real_square_writes:0}));
