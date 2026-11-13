import json, re, sys, hashlib, urllib.request, concurrent.futures
from pathlib import Path
from html.parser import HTMLParser
ROOT=Path(__file__).parent
MANIFEST=Path('/workspace/scratch/28edb0987b65/matrix-b1-execution-2026-11-13/pending-author-conversion/published23-targets.json')
AUTHOR={'@type':'Organization','name':'Matrix Massage & Bodywork','url':'https://www.matrixmassage.net/about-5'}
class Extract(HTMLParser):
 def __init__(self):
  super().__init__(); self.meta=[]; self.links=[]; self.title=[]; self.in_title=False; self.depth=0; self.body=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='title':self.in_title=True
  if tag=='meta' and a.get('name') in ['description','robots']:self.meta.append(a)
  if tag=='link' and a.get('rel')=='canonical':self.links.append(a.get('href'))
  if a.get('data-hook')=='post-description':self.depth=1
  elif self.depth and tag not in ['img','br','hr','input','source','wbr','meta','link']:self.depth+=1
  if self.depth:
   if tag=='a':self.body.append(['a',a.get('href')])
   if tag=='img':self.body.append(['img',a.get('src'),a.get('alt')])
 def handle_endtag(self,tag):
  if tag=='title':self.in_title=False
  if self.depth:self.depth-=1
 def handle_data(self,data):
  if self.in_title:self.title.append(data)
  if self.depth and data.strip():self.body.append(data.strip())
def fetch(target,phase):
 with urllib.request.urlopen(target['url'],timeout=40) as r:raw=r.read();status=r.status
 h=raw.decode(); p=Extract();p.feed(h)
 schemas=[]
 for s in re.findall(r'<script\b[^>]*type=[\"\x27]application/ld\+json[\"\x27][^>]*>(.*?)</script>',h,re.S):
  schemas.append(json.loads(s))
 articles=[s for s in schemas if isinstance(s,dict) and s.get('@type') in ['Article','BlogPosting']]
 result={k:target[k] for k in ['itemId','url','slug','postTitle']}
 result.update(status=status,articles=articles,title=p.title,meta=p.meta,canonical=p.links,body=p.body,htmlSha256=hashlib.sha256(raw).hexdigest())
 (ROOT/(target['itemId']+'.'+phase+'.html')).write_bytes(raw)
 (ROOT/(target['itemId']+'.'+phase+'.json')).write_text(json.dumps(result,indent=2))
 return result
def baseline():
 targets=json.loads(MANIFEST.read_text())['targets']
 with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:results=list(pool.map(lambda t:fetch(t,'before'),targets))
 payloads=[]
 for r in results:
  assert r['status']==200 and len(r['articles'])==1,r['slug']
  candidate=json.loads(json.dumps(r['articles'][0]));candidate['author']=AUTHOR
  payloads.append({**{k:r[k] for k in ['itemId','url','slug','postTitle']},'markup':candidate})
 (ROOT/'payloads.json').write_text(json.dumps(payloads,indent=2))
 print(json.dumps({'baselines':len(results),'all_one_article':True}))
def verify(n):
 targets=json.loads(MANIFEST.read_text())['targets']; t=targets[n]; before=json.loads((ROOT/(t['itemId']+'.before.json')).read_text());after=fetch(t,'after')
 expected=json.loads(json.dumps(before['articles'][0]));expected['author']=AUTHOR
 checks={'status':after['status']==200,'oneArticle':len(after['articles'])==1,'exactSchema':after['articles']==[expected]}
 checks.update({k:after[k]==before[k] for k in ['title','meta','canonical','body']})
 out={'slug':t['slug'],'pass':all(checks.values()),'checks':checks}
 (ROOT/(t['itemId']+'.verification.json')).write_text(json.dumps(out,indent=2));print(json.dumps(out))
if __name__=='__main__':baseline() if sys.argv[1]=='baseline' else verify(int(sys.argv[1]))
