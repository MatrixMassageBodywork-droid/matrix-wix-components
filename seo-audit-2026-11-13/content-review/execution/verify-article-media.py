import json,re
from pathlib import Path
from lxml import html
P=Path(__file__).resolve().parents[1]
R=json.loads((P/'execution/article-final-api-receipt.json').read_text())['results']
M={x['id']:x for x in json.loads((P/'package/manifest.json').read_text())['items']}
C={x['id']:x for x in json.loads((P/'execution/caption-correction-receipt.json').read_text())['rows']}
def norm(x):return re.sub(r'\s+',' ',x).strip()
results=[]
for row in R:
    ident=row['id'];t=html.fromstring((P/'execution/public'/f'{ident}.html').read_bytes());body=t.xpath('//*[@data-hook="post-description"]')[0];bodytext=norm(body.text_content());images=body.xpath('.//img');retained=[]
    for nid,asset,alt,caption in row['final']['richFacts']['images']:
        matches=[e for e in images if asset in e.get('src','')]
        expected_alt=alt or caption
        retained.append({'asset':asset,'found':bool(matches),'altMatch':bool(matches) and all(norm(e.get('alt',''))==norm(expected_alt) for e in matches),'captionFound':not caption or norm(caption) in bodytext,'rendererCaptionAltFallback':not alt and bool(caption)})
    before=json.loads((P/'execution/before'/f'{ident}.json').read_text())
    removed=[]
    def scan(n):
        if n.get('id') in [x['node_id'] for x in M[ident].get('media_changes',[]) if x.get('action')=='remove_inline_image']:
            removed.append(n.get('imageData',{}).get('image',{}).get('src',{}).get('id'))
        for c in n.get('nodes',[]):scan(c)
    def seek(obj):
        if isinstance(obj,dict):
            if 'richContent' in obj:scan(obj['richContent'])
            for k,v in obj.items():
                if k!='richContent':seek(v)
        elif isinstance(obj,list):
            for v in obj:seek(v)
    seek(before)
    oldcaptions=[x['before'] for x in C.get(ident,{}).get('changes',[])]
    checks={'retainedImageIds':all(x['found'] for x in retained),'retainedAltsOrDocumentedFallback':all(x['altMatch'] for x in retained),'visibleCaptions':all(x['captionFound'] for x in retained),'removedGraphicsAbsent':all(not any(a in e.get('src','') for e in images) for a in removed if a),'supersededCaptionsAbsent':all(norm(x) not in bodytext for x in oldcaptions)}
    results.append({'id':ident,'checks':checks,'retained':retained,'removedAssets':sorted(set(removed))})
(P/'execution/public/article-media-qa.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
print(json.dumps([{'id':x['id'],'failures':[k for k,v in x['checks'].items() if not v]} for x in results],indent=2))
