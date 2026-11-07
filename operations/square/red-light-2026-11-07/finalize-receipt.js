
/** Read-only Square verification; recovers only the exact interrupted receipt. */
function matrixRedLightFinalizeReceipt20261107(){
 const cfg=mssm166Config_();if(mssm166Bool_(cfg.SERVICE_MANAGER_ENABLED))throw new Error('Pause manager before reconciliation.');
 const sh=SpreadsheetApp.openById(MSSM166.spreadsheetId).getSheetByName(MSSM166.requestsSheet),rows=sh.getDataRange().getValues();
 const idx=rows.findIndex(function(r){return r[0]==='SSM-20261107-RLENH8';});if(idx<1)throw new Error('Exact request missing.');
 const row=rows[idx],p=JSON.parse(row[8]),c=JSON.parse(row[7]);
 if(!['PROCESSING','VERIFY_FAILED_MANUAL_REVIEW'].includes(row[3]))throw new Error('Request is not awaiting receipt recovery.');
 if(mssm166Sha256_(mssm166StableStringify_(p))!==row[9]||!row[10]||!row[11])throw new Error('Approval evidence mismatch.');
 mssmRLValidatePrice_(p,c);
 const r=mssm166Retrieve_(p.existing_item_id,true,cfg),v=mssmRLVerifyPrice_(p,c,r);
 if(!v.ok)throw new Error(JSON.stringify(v));
 const ids=r.object.item_data.variations.map(function(x){return x.id;}).join(' | ');
 mssm166SetRow_(sh,idx+1,{status:'SAVED_VERIFIED',squareItemId:r.object.id,squareVariationIds:ids,verification:JSON.stringify(v),error:'',notes:'Read-only receipt recovery: saved price $22.99 verified; identical sales-channel set returned in different order. No repeat Square write.',updatedAt:new Date()});
 mssm166Audit_(row[0],'READ_ONLY_RECEIPT_RECOVERY','SAVED_VERIFIED',JSON.stringify(v.summary),r.object.id,ids,r.object.version);
 console.log(JSON.stringify({ok:true,squareWrites:0,verification:v}));
}
