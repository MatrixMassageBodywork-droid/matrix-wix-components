from pathlib import Path
from html.parser import HTMLParser
import json,urllib.request,concurrent.futures,hashlib,datetime,subprocess
HERE=Path(__file__).resolve().parent
BASE=HERE.parent
class Head(HTMLParser):
 def __init__(self):super().__init__();self.meta=[];self.canonical=[];self.title='';self.in_title=False
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t=='meta':self.meta.append(a)
  if t=='link' and a.get('rel')=='canonical':self.canonical.append(a.get('href'))
  if t=='title':self.in_title=True
 def handle_endtag(self,t):
  if t=='title':self.in_title=False
 def handle_data(self,d):
  if self.in_title:self.title+=d
def fetch(url):
 try:
  req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
  with urllib.request.urlopen(req,timeout=22) as r:
   raw=r.read();h=Head();h.feed(raw.decode('utf-8','replace'))
   return {'url':url,'finalUrl':r.url,'status':r.status,'bytes':len(raw),'title':h.title,'canonical':h.canonical,'description':[m.get('content') for m in h.meta if m.get('name')=='description'],'robots':[m.get('content') for m in h.meta if m.get('name')=='robots'],'sha256':hashlib.sha256(raw).hexdigest()}
 except Exception as e:return {'url':url,'error':str(e)}
urls=set()
for key in ['facials','head-spa','waxing']:
 m=json.loads((BASE/key/'review-1/build-manifest.json').read_text())
 urls.add(m['seo']['canonical'])
 urls.update(u for u in m['links'] if u.startswith('https://'))
 subprocess.run(['node','--check',str(BASE/key/'review-1/renderer.js')],check=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=10) as ex:results=list(ex.map(fetch,sorted(urls)))
(HERE/'link-and-live-head-audit.json').write_text(json.dumps({'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'results':results},indent=2)+'\n')
print(json.dumps({'checked':len(results),'failures':[r for r in results if r.get('status')!=200]},indent=2))
