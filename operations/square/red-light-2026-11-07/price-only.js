
/** Owner-authorized red-light base-price-only updates, 2026-11-07.
 * Uses the existing queue, fingerprint, write gate and verification flow.
 * Never creates/deletes variations or alters modifiers, durations or staff.
 */
const MSSMRLPRICE20261107={
  'O3M6MJG44YUUVFQNJFJC7WUC':{variation:'VZBMYNIH4FS4P3Q73KI42QDX',cents:2599,duration:1200000},
  'DLX3E64HZHTJUWFLFVUJIIML':{variation:'NEZMDCUOGHNV5XLZRBJVX5PI',cents:1499,duration:0},
  'S276Q6HDDTNWVV745WKVDKT6':{variation:'VC4XTO2AGWL55ZLVWQ7TBDOT',cents:2299,duration:1200000}
};
function mssmRLPriceMode_(p){return p&&p.update_mode==='MSSM_RED_LIGHT_PRICE_ONLY_20261107';}
function mssmRLValidatePrice_(p,c){
  const target=MSSMRLPRICE20261107[p.existing_item_id];
  if(!target||p.operation!=='UPDATE'||p.product_type!=='APPOINTMENTS_SERVICE')throw new Error('Red-light price target not authorized.');
  if(JSON.stringify(p.fields_to_change)!==JSON.stringify(['variation_prices']))throw new Error('Price-only scope required.');
  if(p.variations!==undefined||p.provider_mode!==undefined)throw new Error('Price-only request may not change variations/providers.');
  if(!c||!c.reference||!c.reference.structure_signature||!c.existing_snapshot)throw new Error('Fresh complete target snapshot required.');
  const o=c.existing_snapshot,d=o.item_data;
  if(o.id!==p.existing_item_id||o.is_deleted||!d||d.is_archived||d.product_type!=='APPOINTMENTS_SERVICE')throw new Error('Active target mismatch.');
  if(!Number.isSafeInteger(p.expected_item_version)||p.expected_item_version!==o.version)throw new Error('Price-only target version mismatch.');
  if(p.name!==d.name||p.description!==String(d.description_plaintext||d.description||''))throw new Error('Price-only request cannot change copy.');
  if(!Array.isArray(p.price_updates)||p.price_updates.length!==1)throw new Error('One exact authorized price required.');
  const u=p.price_updates[0];
  if(u.variation_id!==target.variation||u.price_amount_cents!==target.cents||u.currency!=='USD')throw new Error('Price differs from owner authorization.');
  const vs=(d.variations||[]).filter(function(v){return v.id===u.variation_id;});
  if(vs.length!==1)throw new Error('Exact variation identity is missing or ambiguous.');
  const v=vs[0].item_variation_data;
  if(v.item_id!==o.id||Number(v.service_duration)!==target.duration||v.pricing_type!=='FIXED_PRICING'||!v.price_money||v.price_money.currency!=='USD')throw new Error('Variation structure changed.');
  if(!Number.isSafeInteger(u.expected_price_cents)||v.price_money.amount!==u.expected_price_cents)throw new Error('Baseline price changed.');
  if((v.location_overrides||[]).some(function(x){return x.price_money||x.pricing_type;}))throw new Error('Location price override requires review.');
  return true;
}
function mssmRLComparable_(obj){
  const c=mssm166Clone_(obj);
  function walk(o){if(!o||typeof o!=='object')return;['version','updated_at','created_at'].forEach(function(k){delete o[k];});Object.keys(o).forEach(function(k){walk(o[k]);});}
  walk(c);return mssm166StableStringify_(c);
}
function mssmRLExpected_(p,baseline){
  const o=mssm166Clone_(baseline);
  p.price_updates.forEach(function(u){const v=o.item_data.variations.filter(function(x){return x.id===u.variation_id;});if(v.length!==1)throw new Error('Exact variation missing.');v[0].item_variation_data.price_money={amount:u.price_amount_cents,currency:u.currency};});
  return o;
}
function mssmRLUpdatePrice_(p,c,idem,cfg){
  mssmRLValidatePrice_(p,c);
  const current=mssm166Retrieve_(p.existing_item_id,true,cfg).object;
  if(!current||current.version!==p.expected_item_version||mssmRLComparable_(current)!==mssmRLComparable_(c.existing_snapshot))throw new Error('Target changed after price preview. Re-resolve.');
  const obj=mssmRLExpected_(p,current);
  function clean(o){if(!o||typeof o!=='object')return;['updated_at','created_at','is_deleted'].forEach(function(k){delete o[k];});Object.keys(o).forEach(function(k){clean(o[k]);});}
  clean(obj);
  delete obj.item_data.description_plaintext;delete obj.item_data.channels;
  obj.item_data.variations.forEach(function(v){delete v.item_variation_data.channels;});
  const r=mssm166Api_('POST','/v2/catalog/object',{idempotency_key:idem,object:obj},cfg);
  if(!r.catalog_object||r.catalog_object.id!==p.existing_item_id)throw new Error('Price write response incomplete; inspect before any retry.');
  return {itemId:p.existing_item_id,created:false,paymentListId:null,priceOnly:true};
}
function mssmRLVerifyPrice_(p,c,r){
  const errors=[],o=r.object,expected=mssmRLExpected_(p,c.existing_snapshot);
  if(!o||o.id!==p.existing_item_id)errors.push('Read-back target mismatch.');
  else if(mssmRLComparable_(o)!==mssmRLComparable_(expected))errors.push('Read-back differs from the exact price-only expected object. Inspect before retry.');
  return {ok:!errors.length,errors:errors,summary:{item_id:o&&o.id,version:o&&o.version,mode:'PRICE_ONLY',
    prices:o&&o.item_data?(o.item_data.variations||[]).map(function(v){return {id:v.id,name:v.item_variation_data.name,price:v.item_variation_data.price_money,duration:v.item_variation_data.service_duration};}):[],
    unrelated_fields_preserved:!errors.length,payment_modifiers_preserved:!errors.length}};
}
