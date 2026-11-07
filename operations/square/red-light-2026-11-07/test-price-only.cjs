const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const src=fs.readFileSync(__dirname+'/manager-price-only.gs','utf8');const ctx={console};vm.createContext(ctx);vm.runInContext(src,ctx);
const items=JSON.parse(fs.readFileSync(__dirname+'/live-items.json'));
const ids=['O3M6MJG44YUUVFQNJFJC7WUC','DLX3E64HZHTJUWFLFVUJIIML','S276Q6HDDTNWVV745WKVDKT6'];
const cents=[2599,1499,2299];const proposals=[];let tests=0;
for(let i=0;i<ids.length;i++){
 const o=items[ids[i]],v=o.item_data.variations[0],d=o.item_data;
 const p={operation:'UPDATE',update_mode:'MSSM_RED_LIGHT_PRICE_ONLY_20261107',existing_item_id:o.id,expected_item_version:o.version,name:d.name,description:d.description_plaintext||d.description,product_type:'APPOINTMENTS_SERVICE',fields_to_change:['variation_prices'],price_updates:[{variation_id:v.id,expected_price_cents:v.item_variation_data.price_money.amount,price_amount_cents:cents[i],currency:'USD'}]};
 const c={reference:{structure_signature:'test'},existing_snapshot:o};
 assert.equal(ctx.mssm166ValidateProposal_(p,c),true);tests++;
 const expected=ctx.mssmRLExpected_(p,o);assert.equal(ctx.mssmRLVerifyPrice_(p,c,{object:expected}).ok,true);tests++;
 let calls=0;ctx.mssm166Retrieve_=()=>({object:o});ctx.mssm166Api_=(m,path,b)=>{calls++;assert.equal(m,'POST');assert.equal(path,'/v2/catalog/object');assert.equal(b.object.item_data.variations[0].id,v.id);assert.equal(b.object.item_data.variations[0].item_variation_data.service_duration,v.item_variation_data.service_duration);assert.deepEqual(JSON.parse(JSON.stringify(b.object.item_data.modifier_list_info)),d.modifier_list_info);return{catalog_object:expected}};
 assert.equal(ctx.mssmRLUpdatePrice_(p,c,'test',{}).itemId,o.id);assert.equal(calls,1);tests++;
 const mutations=[q=>q.price_updates[0].price_amount_cents++,q=>q.price_updates[0].variation_id='WRONG',q=>q.expected_item_version++,q=>q.name+='!',q=>q.fields_to_change.push('description'),q=>q.variations=[],q=>q.price_updates[0].expected_price_cents++];
 for(const mutate of mutations){const q=structuredClone(p);mutate(q);assert.throws(()=>ctx.mssmRLValidatePrice_(q,c));tests++;}
 for(const mutate of [x=>x.item_data.variations[0].item_variation_data.service_duration++,x=>x.item_data.modifier_list_info=[],x=>x.item_data.name+='!',x=>x.item_data.variations[0].item_variation_data.team_member_ids=['wrong']]){const changed=JSON.parse(JSON.stringify(expected));mutate(changed);assert.equal(ctx.mssmRLVerifyPrice_(p,c,{object:changed}).ok,false);tests++;}
 ctx.mssm166Retrieve_=()=>({object:{...o,version:o.version+1}});assert.throws(()=>ctx.mssmRLUpdatePrice_(p,c,'test',{}),/changed/);tests++;
 proposals.push(p);
}
fs.writeFileSync(__dirname+'/proposals.json',JSON.stringify(proposals,null,2));
console.log(JSON.stringify({ok:true,tests,realSquareWrites:0}));
const after=JSON.parse(fs.readFileSync(__dirname+'/addon-after.json')),b=items[ids[2]];
const c={reference:{structure_signature:'test'},existing_snapshot:b};
assert.equal(ctx.mssmRLVerifyPrice_(proposals[2],c,{object:after}).ok,true);
after.item_data.channels[0]='UNEXPECTED_CHANNEL';assert.equal(ctx.mssmRLVerifyPrice_(proposals[2],c,{object:after}).ok,false);
console.log(JSON.stringify({channelSetTests:2,ok:true}));
