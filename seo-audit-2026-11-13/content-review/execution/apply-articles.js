async () => {
  const input = JSON.parse(files.find(f => f.path.endsWith('approved-execution-input.json')).content);
  if (input.planId !== 'MATRIX-CONTENT-REVIEW-2026-11-13' || !input.allowPublish) throw new Error('Approved scope missing');
  const base = 'https://www.wixapis.com/blog/v3/';
  const clone = x => JSON.parse(JSON.stringify(x));
  const stable = x => JSON.stringify(x);
  const facts = rc => {
    const f = {blocks:[],headings:[],links:[],images:[]};
    const text = n => (n.textData?.text || '') + (n.nodes || []).map(text).join('');
    function walk(n) {
      if (n.type === 'PARAGRAPH' || n.type === 'HEADING') {const s=text(n);if(s)f.blocks.push([n.type,s]);if(n.type==='HEADING')f.headings.push([n.headingData?.level,s]);}
      if (n.type === 'TEXT') for (const d of n.textData?.decorations || []) if (d.type === 'LINK') f.links.push([n.textData.text,d.linkData.link.url,d.linkData.link.target || 'SELF']);
      if (n.type === 'IMAGE') f.images.push([n.id,n.imageData?.image?.src?.id,n.imageData?.altText || '',n.imageData?.caption || '']);
      for (const c of n.nodes || []) walk(c);
    }
    walk(rc);return f;
  };
  const request = async (method,url,body) => {
    const r=await wix.request({scope:'site',method,url:base+url,...(body===undefined?{}:{body,headers:{'Content-Type':'application/json'}})});
    if(r.status<200||r.status>=300)throw new Error('HTTP '+r.status+' '+JSON.stringify(r.data));return r.data;
  };
  const getLive = async id => (await request('GET','posts/'+id+'?fieldsets=RICH_CONTENT&fieldsets=SEO')).post;
  const getDraft = async id => (await request('GET','draft-posts/'+id+'?fieldsets=RICH_CONTENT')).draftPost;
  const sameDate = (a,b) => new Date(a).getTime()===new Date(b).getTime();
  const imageId = media => media?.wixMedia?.image?.id;
  const checksFor = (post,i,expectedFacts) => ({
    title:post.title===i.title,
    slug:(post.slug || post.seoSlug)===i.slug,
    excerpt:i.excerpt===undefined || post.excerpt===i.excerpt,
    richContent:stable(facts(post.richContent))===stable(expectedFacts),
    cover:i.media===undefined || imageId(post.media)===imageId(i.media),
    alt:i.media?.altText===undefined || post.media?.altText===i.media.altText,
    protected:Object.entries(i.expectedProtected).filter(([k])=>k!=='pinned' || 'pinned' in post).every(([k,v])=> k==='firstPublishedDate'?sameDate(post[k],v):stable(post[k])===stable(v))
  });
  const all = c => Object.values(c).every(Boolean);
  const results=[];
  for(const i of input.items) {
    const row={id:i.id,postId:i.postId,url:'https://www.matrixmassage.net/post/'+i.slug,stage:'preflight',startedAt:new Date().toISOString()};
    results.push(row);
    try {
      const [p,d]=await Promise.all([getLive(i.postId),getDraft(i.postId)]);
      const pre={title:p.title===i.expectedTitle,slug:p.slug===i.slug,date:sameDate(p.lastPublishedDate,i.expectedPublishedAt),noPending:!p.hasUnpublishedChanges,body:stable(facts(p.richContent))===stable(i.expectedFacts),draftBody:stable(facts(d.richContent))===stable(i.expectedFacts),seo:stable(p.seoData)===stable(i.expectedSeo),media:stable(p.media)===stable(i.expectedMedia),owner:d.memberId===i.expectedProtected.memberId};
      row.preflight=pre;
      if(!all(pre)){row.status='BLOCKED_BASELINE_CONFLICT';continue;}
      const desired={...clone(d.richContent),nodes:clone(i.richContent.nodes)};
      const expected=facts(desired);
      const draftPost={id:i.postId,memberId:d.memberId,richContent:desired};
      if(i.kind==='article_body_replacement'){draftPost.title=i.title;draftPost.excerpt=i.excerpt;if(i.media)draftPost.media=clone(i.media);}
      row.stage='save_draft';
      await request('PATCH','draft-posts/'+i.postId,{draftPost});
      row.stage='verify_draft';
      const saved=await getDraft(i.postId);
      row.savedChecks=checksFor(saved,i,expected);
      if(!all(row.savedChecks)){row.status='SAVED_NOT_PUBLISHED_READBACK_MISMATCH';row.observed={title:saved.title,slug:saved.seoSlug,excerpt:saved.excerpt,media:saved.media,facts:facts(saved.richContent)};continue;}
      row.savedAt=new Date().toISOString();
      row.stage='publish_content';
      const pub=await request('POST','draft-posts/'+i.postId+'/publish',{});
      row.publishResponse=pub;
      row.stage='verify_content';
      const live=await getLive(i.postId);
      row.contentChecks=checksFor(live,i,expected);
      row.contentPublishedAt=live.lastPublishedDate;
      if(!all(row.contentChecks)){row.status='PUBLISHED_CONTENT_READBACK_MISMATCH';continue;}
      const seo=clone(live.seoData);
      const tag=seo.tags.filter(t=>t.meta?.displayName==='Matrix Article Author');
      if(tag.length!==1)throw new Error('Expected exactly one existing Matrix Article Author tag');
      const schema=JSON.parse(tag[0].children);
      if(schema.author?.['@type']!=='Organization')throw new Error('Organization author baseline changed');
      schema.headline=i.title;schema.dateModified=live.lastPublishedDate;
      if(i.description!==undefined) schema.description=i.description;
      const templateTag=i.seoTemplate.tags.find(t=>t.meta?.displayName==='Matrix Article Author');
      const templateSchema=JSON.parse(templateTag.children);
      schema.image=templateSchema.image;
      tag[0].children=JSON.stringify(schema);
      if(i.description!==undefined) for(const t of seo.tags){const pr=t.props||{};if(pr.name==='description'||['og:description','twitter:description'].includes(pr.property))pr.content=i.description;if(['og:title','twitter:title'].includes(pr.property))pr.content=i.title;if(t.type==='title')t.children=i.title;}
      if(JSON.stringify(seo).includes('__ACTUAL_CONTENT_PUBLICATION_ISO__'))throw new Error('Unresolved schema placeholder');
      row.stage='publish_seo';
      await request('PATCH','draft-posts/'+i.postId,{draftPost:{id:i.postId,memberId:d.memberId,seoData:seo},action:'UPDATE_PUBLISH'});
      row.stage='verify_final';
      const final=await getLive(i.postId);
      const finalTags=final.seoData.tags.filter(t=>t.meta?.displayName==='Matrix Article Author');
      const finalSchema=finalTags.length===1?JSON.parse(finalTags[0].children):null;
      row.finalChecks={...checksFor(final,i,expected),schema:stable(finalSchema)===stable(schema),description:i.description===undefined||final.seoData.tags.some(t=>t.props?.name==='description'&&t.props.content===i.description),originalPresetDisabled:final.seoData.tags.filter(t=>t.meta?.schemaType==='blog-post-blog-posting-preset').every(t=>t.disabled===true)};
      row.final={title:final.title,slug:final.slug,excerpt:final.excerpt,lastPublishedDate:final.lastPublishedDate,firstPublishedDate:final.firstPublishedDate,media:final.media,schema:finalSchema,richFacts:facts(final.richContent)};
      row.finishedAt=new Date().toISOString();
      row.status=all(row.finalChecks)?'PUBLISHED_API_VERIFIED_PUBLIC_QA_PENDING':'PUBLISHED_FINAL_READBACK_MISMATCH';
    } catch(error) {
      row.error=String(error);row.status='BLOCKED_AFTER_'+row.stage.toUpperCase();
      // Persistence check prevents a timeout from causing a repeated mutation.
      try {const [p,d]=await Promise.all([getLive(i.postId),getDraft(i.postId)]);row.persistenceReadback={liveTitle:p.title,lastPublishedDate:p.lastPublishedDate,hasUnpublishedChanges:p.hasUnpublishedChanges,draftTitle:d.title,draftEditedDate:d.editedDate,liveMatchesCandidate:stable(facts(p.richContent))===stable(facts(i.richContent)),draftMatchesCandidate:stable(facts(d.richContent))===stable(facts(i.richContent))};} catch(readError){row.persistenceReadbackError=String(readError);}
      if(row.stage==='save_draft'&&/400|schema|Expected an object|unsupported/i.test(row.error)){row.remainingNotAttempted=input.items.slice(input.items.indexOf(i)+1).map(x=>x.id);break;}
    }
  }
  return JSON.stringify({planId:input.planId,completedAt:new Date().toISOString(),results});
}
