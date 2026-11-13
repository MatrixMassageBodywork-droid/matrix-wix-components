async () => {
 const input=JSON.parse(files[0].content), clone=x=>JSON.parse(JSON.stringify(x)), eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const req=async(method,path,body)=>{const r=await wix.request({scope:'site',method,url:'https://www.wixapis.com/blog/v3/'+path,...(body===undefined?{}:{body,headers:{'Content-Type':'application/json'}})});return r.data};
 const live=async id=>(await req('GET','posts/'+id+'?fieldsets=RICH_CONTENT&fieldsets=SEO')).post;
 const draft=async id=>(await req('GET','draft-posts/'+id+'?fieldsets=RICH_CONTENT')).draftPost;
 const protectedFields=['title','slug','excerpt','media','memberId','categoryIds','tagIds','hashtags','firstPublishedDate','featured','pinned','language'];
 const rows=[];
 for(const i of input){
  const out={id:i.id,postId:i.postId,stage:'preflight'};rows.push(out);
  try{
   const p=await live(i.postId),d=await draft(i.postId);
   if(p.hasUnpublishedChanges||!eq(p.richContent,i.post.richContent)||!eq(p.seoData,i.post.seoData)||p.lastPublishedDate!==i.post.lastPublishedDate||!eq(d.richContent,i.draft.richContent))throw Error('Fresh baseline changed');
   const rc=clone(d.richContent), changes=[];
   function walk(n){if(n.type==='IMAGE'&&i.targets.includes(n.id)){const captions=n.nodes.filter(x=>x.type==='CAPTION');if(captions.length!==1||captions[0].nodes.length!==1||captions[0].nodes[0].type!=='TEXT')throw Error('Unexpected caption structure');const t=captions[0].nodes[0];changes.push({imageId:n.id,captionId:captions[0].id,before:t.textData.text,after:n.imageData.caption});t.textData.text=n.imageData.caption;}for(const c of n.nodes||[])walk(c);}
   walk(rc);if(changes.length!==i.targets.length)throw Error('Wrong caption count');
   out.changes=changes;
   out.stage='save_caption';
   await req('PATCH','draft-posts/'+i.postId,{draftPost:{id:i.postId,memberId:d.memberId,richContent:rc}});
   let sd=await draft(i.postId);
   if(!eq(sd.richContent.nodes,rc.nodes))throw Error('Saved caption readback mismatch');
   if(!eq(sd.hashtags,p.hashtags)){await req('PATCH','draft-posts/'+i.postId,{draftPost:{id:i.postId,memberId:d.memberId,hashtags:p.hashtags}});sd=await draft(i.postId);if(!eq(sd.hashtags,p.hashtags))throw Error('Draft hashtags mismatch');}
   out.savedAt=new Date().toISOString();
   out.stage='publish_caption';out.publishResponse=await req('POST','draft-posts/'+i.postId+'/publish',{});
   let q=await live(i.postId);out.contentPublishedAt=q.lastPublishedDate;
   if(!eq(q.richContent.nodes,rc.nodes))throw Error('Published caption readback mismatch');
   const seo=clone(q.seoData),tags=seo.tags.filter(x=>x.meta?.displayName==='Matrix Article Author');
   if(tags.length!==1)throw Error('Article tag count');const schema=JSON.parse(tags[0].children);schema.dateModified=q.lastPublishedDate;tags[0].children=JSON.stringify(schema);
   out.stage='publish_schema_timestamp';await req('PATCH','draft-posts/'+i.postId,{draftPost:{id:i.postId,memberId:d.memberId,seoData:seo},action:'UPDATE_PUBLISH'});
   q=await live(i.postId);
   if(!eq(q.hashtags,p.hashtags)){out.stage='preserve_hashtags';await req('PATCH','draft-posts/'+i.postId,{draftPost:{id:i.postId,memberId:d.memberId,hashtags:p.hashtags}});const hd=await draft(i.postId);if(!eq(hd.hashtags,p.hashtags)||!eq(hd.richContent.nodes,rc.nodes))throw Error('Hashtag draft readback mismatch');out.hashtagPublication=await req('POST','draft-posts/'+i.postId+'/publish',{});q=await live(i.postId);}
   out.finalChecks={captionNodes:eq(q.richContent.nodes,rc.nodes),seo:eq(q.seoData,seo),noUnpublishedChanges:!q.hasUnpublishedChanges,...Object.fromEntries(protectedFields.filter(k=>k in p).map(k=>[k,eq(q[k],p[k])]))};
   out.final=q;out.status=Object.values(out.finalChecks).every(Boolean)?'PUBLISHED_VERIFIED':'READBACK_MISMATCH';out.completedAt=new Date().toISOString();
  }catch(e){out.error=String(e);out.status='BLOCKED_AFTER_'+out.stage;try{const p=await live(i.postId),d=await draft(i.postId);out.persistence={lastPublishedDate:p.lastPublishedDate,hasUnpublishedChanges:p.hasUnpublishedChanges,live:p.richContent,draft:d.richContent};}catch(e2){out.readbackError=String(e2)}}
 }
 return JSON.stringify({planId:'MATRIX-CONTENT-REVIEW-2026-11-13',purpose:'Align visible CAPTION children with approved imageData.caption text',rows});
}
