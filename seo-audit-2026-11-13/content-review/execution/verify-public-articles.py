import json, subprocess, hashlib, concurrent.futures, re, sys
from pathlib import Path
from lxml import html
P=Path(__file__).resolve().parents[1]
OUT=P/'execution/public';OUT.mkdir(exist_ok=True)
M={i['id']:i for i in json.loads((P/'package/manifest.json').read_text())['items']}
R=json.loads((P/'execution/article-final-api-receipt.json').read_text())['results']
if len(sys.argv)>1:R=[r for r in R if r['id'] in sys.argv[1:]]
def norm(s):return re.sub(r'\s+',' ',s.replace('\u200b','')).strip()
def fetch(r):
    f=OUT/(r['id']+'.html')
    c=subprocess.run(['curl','-L','--fail','--max-time','50','-sS',r['url'],'-o',str(f),'-w','%{http_code}\t%{url_effective}'],capture_output=True,text=True)
    if c.returncode:return {'id':r['id'],'error':c.stderr}
    t=html.fromstring(f.read_bytes()); item=M[r['id']]; exp=r['final']; facts=exp['richFacts']
    body=t.xpath('//*[@data-hook="post-description"]')
    b=body[0] if body else t; bt=norm(b.text_content())
    links=[(norm(a.text_content()),a.get('href')) for a in b.xpath('.//a[@href]')]
    schemas=[]
    def walk(x):
        if isinstance(x,dict):
            if x.get('@type')=='BlogPosting':schemas.append(x)
            for v in x.values():walk(v)
        elif isinstance(x,list):
            for v in x:walk(v)
    for s in t.xpath('//script[@type="application/ld+json"]/text()'):
        try:walk(json.loads(s))
        except ValueError:pass
    miss_blocks=[s for _,s in facts['blocks'] if norm(s) and norm(s) not in bt]
    miss_links=[x for x in facts['links'] if (norm(x[0]),x[1]) not in links]
    title=''.join(t.xpath('//title/text()'));desc=t.xpath('//meta[@name="description"]/@content');can=t.xpath('//link[@rel="canonical"]/@href');robots=t.xpath('//meta[@name="robots"]/@content')
    checks={'http200':c.stdout.startswith('200\t'),'articleContainer':bool(body),'canonical':can==[r['url']],'indexable':not any('noindex' in x for x in robots),'h1':len(t.xpath('//h1'))==1,'h1Title':norm(''.join(t.xpath('//h1//text()')))==norm(exp['title']),'title':exp['title'] in title,'description':not item.get('after_description') or desc==[item['after_description']],'bodyBlocks':not miss_blocks,'articleLinks':not miss_links,'singleBlogPosting':len(schemas)==1,'schemaExact':len(schemas)==1 and schemas[0]==exp['schema']}
    return {'id':r['id'],'url':r['url'],'http':c.stdout,'sha256':hashlib.sha256(f.read_bytes()).hexdigest(),'checks':checks,'title':title,'description':desc,'canonical':can,'robots':robots,'missingBlocks':miss_blocks,'missingLinks':miss_links,'schema':schemas,'links':links}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:results=list(ex.map(fetch,R))
prior=json.loads((OUT/'article-public-qa.json').read_text()) if len(sys.argv)>1 and (OUT/'article-public-qa.json').exists() else []
merged={r['id']:r for r in prior}
merged.update({r['id']:r for r in results})
(OUT/'article-public-qa.json').write_text(json.dumps(list(merged.values()),ensure_ascii=False,indent=2))
print(json.dumps([{'id':x['id'],'failures':[k for k,v in x.get('checks',{}).items() if not v], 'error':x.get('error'),'missingBlocks':len(x.get('missingBlocks',[])),'missingLinks':len(x.get('missingLinks',[]))} for x in results],indent=2))
