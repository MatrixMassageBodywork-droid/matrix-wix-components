// Read-only dependency capture for owner-approved shared red-light synchronization.
const MSSMRLSYNCIDS=['GKKPB7JCCQA6S3MIFWHY5Y4W','SHLF7QFESV3Q3VPCLQAMPIC6','NJVQD7HIY7MD2PYLEFQ3UAG6','M66TFMQVRHEG6VRWRJN3N6RM','XS6URRPU2EFUVZBNNCA5YS2K'];
function mssmRLSyncRead_(cfg){
 const lists={};MSSMRLSYNCIDS.forEach(function(id){const o=mssm166Retrieve_(id,false,cfg).object;if(!o||o.id!==id||o.type!=='MODIFIER_LIST'||o.is_deleted||!o.modifier_list_data)throw new Error('Modifier list identity mismatch.');lists[id]=o;});
 const associations=[],seen={},cursors={};let cursor,massage_item;
 for(let page=0;page<30;page++){
  const body={object_types:['ITEM'],include_deleted_objects:false,include_related_objects:false,limit:1000};if(cursor)body.cursor=cursor;
  const r=mssm166Api_('POST','/v2/catalog/search',body,cfg);
  if(r.errors&&r.errors.length)throw new Error('Catalog search returned errors.');
  if(r.objects!==undefined&&!Array.isArray(r.objects))throw new Error('Malformed catalog objects.');
  (r.objects||[]).forEach(function(o){if(!o||o.type!=='ITEM'||!o.id||seen[o.id]||!o.item_data)throw new Error('Invalid/duplicate catalog item.');seen[o.id]=true;
   if(o.id==='D6WBEWYNPLZ5ET3YB4APHMVT')massage_item=o;
   const infos=o.item_data.modifier_list_info||[];
   if(infos.some(function(x){return MSSMRLSYNCIDS.includes(x.modifier_list_id);}))associations.push({id:o.id,name:o.item_data.name,version:o.version,archived:!!o.item_data.is_archived,modifier_list_info:infos,object_hash:mssm166Sha256_(mssmRLComparable_(o))});
  });
  if(r.cursor===undefined||r.cursor==='')return {captured_at:new Date().toISOString(),lists:lists,massage_item:massage_item,associations:associations.sort(function(a,b){return a.id.localeCompare(b.id);}),catalog_item_count:Object.keys(seen).length};
  if(typeof r.cursor!=='string'||!r.cursor.trim()||cursors[r.cursor])throw new Error('Invalid/repeated cursor.');cursors[r.cursor]=true;cursor=r.cursor;
 }
 throw new Error('Catalog pagination incomplete.');
}
function matrixRedLightSharedRead20261107(){
 const cfg=mssm166Config_();if(mssm166Bool_(cfg.SERVICE_MANAGER_ENABLED))throw new Error('Pause manager before dependency capture.');
 const s=JSON.stringify(mssmRLSyncRead_(cfg));for(let i=0;i<s.length;i+=6500)console.log('SYNC_PART '+JSON.stringify({part:i/6500,data:s.slice(i,i+6500)}));console.log('SYNC_READ_COMPLETE no Square writes');
}
