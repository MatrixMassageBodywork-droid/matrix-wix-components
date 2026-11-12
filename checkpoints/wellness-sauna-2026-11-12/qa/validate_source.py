from pathlib import Path
from html.parser import HTMLParser
import json,re,hashlib,subprocess,urllib.request,urllib.error,concurrent.futures,datetime,sys
BASE=Path('/workspace/scratch/6f987ab79794/matrix-wellness')
class Page(HTMLParser):
 def __init__(self):super().__init__();self.ids=[];self.hrefs=[];self.images=[];self.bad=[];self.h1=0;self.faqs=[];self.cur=None;self.summary=False
 def handle_starttag(self,t,a):
  d=dict(a)
  if t=='h1':self.h1+=1
  if 'id' in d:self.ids.append(d['id'])
  if t=='a':self.hrefs.append(d.get('href',''))
  if t=='img':self.images.append(d)
  if t in ['script','head','html','body','iframe'] or any(k.lower().startswith('on') for k in d):self.bad.append(t)
  if t=='details':self.cur={'question':'','answer':''}
  if t=='summary':self.summary=True
  if self.cur and t in ['p','li','br']:self.cur['answer']+=' '
 def handle_endtag(self,t):
  if t=='summary':self.summary=False
  if t=='details':self.faqs.append(self.cur);self.cur=None
  if self.cur and t in ['p','li']:self.cur['answer']+=' '
 def handle_data(self,s):
  if self.cur:self.cur['question' if self.summary else 'answer']+=s
norm=lambda s:' '.join(s.split())
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
rows=[];urls=set()
for folder,review in [('main','review-2'),('infrared-sauna','review-2')]:
 p=BASE/folder/review;body=(p/'body.html').read_text();css=(p/'style.css').read_text();renderer=(p/'renderer.js').read_text();manifest=json.loads((p/'build-manifest.json').read_text());conf=manifest['config'];x=Page();x.feed(body);schema=json.loads((p/'faq-schema.json').read_text())
 faq=[{'question':norm(v['name']),'answer':norm(v['acceptedAnswer']['text'])} for v in schema['mainEntity']]
 visible=[{k:norm(v) for k,v in o.items()} for o in x.faqs]
 rb=json.loads(re.search(r'const body = ("(?:[^"\\]|\\.)*");',renderer).group(1));rc=json.loads(re.search(r'const css = ("(?:[^"\\]|\\.)*");',renderer).group(1))
 syntax=subprocess.run(['node','--check',str(p/'renderer.js')],capture_output=True,text=True)
 checks={'oneH1':x.h1==1,'uniqueIds':len(x.ids)==len(set(x.ids)),'anchorsExist':all(h[1:] in x.ids for h in x.hrefs if h.startswith('#')),'informativeAlt':all('alt' in im and im['alt'].strip() for im in x.images),'noBodyScriptsOrHandlers':not x.bad,'faqCount':len(visible)==conf['expectedFaqCount'],'faqExactVisibleMatch':visible==faq,'rendererBodyMatches':rb==body,'rendererCssMatches':rc==css,'rendererSyntax':syntax.returncode==0,'rendererNoMetadataMutation':not re.search(r'document\.(head|title)|wixSeoFrontend|noindex',renderer),'cssScope':conf['rootClass'] in css and conf['tagName'] in css,'proofNoindex':'noindex, nofollow' in (p/'preview.html').read_text() or 'noindex,nofollow' in (p/'preview.html').read_text(),'manifestHashesCurrent':all(sha(p/f)==h for f,h in manifest['files'].items()),'noMassageBook':not re.search('massagebook',body,re.I),'noPlaceholderCopy':not re.search('Show the actual|client-ready setup|placeholder|TODO',body,re.I)}
 for u in x.hrefs+[im['src'] for im in x.images]+re.findall(r'url\([\"\']?([^\)\"\']+)',css):
  if u.startswith('https://'):urls.add(u)
 rows.append({'page':folder,'review':review,'bodySha256':sha(p/'body.html'),'rendererSha256':sha(p/'renderer.js'),'rendererBytes':(p/'renderer.js').stat().st_size,'faqCount':len(visible),'checks':checks,'failed':[k for k,v in checks.items() if not v],'faqDiff':None if visible==faq else {'visible':visible,'schema':faq}})
checksfile=BASE/'qa'/'source-static-qa.json';checksfile.write_text(json.dumps({'capturedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'status':'PASS' if all(not x['failed'] for x in rows) else 'FAIL','pages':rows},indent=2))
print(json.dumps({'pages':[{k:v for k,v in r.items() if k!='faqDiff'} for r in rows],'urlsToCheck':len(urls)},indent=2))
if '--static-only' in sys.argv:raise SystemExit(0)
def check(u):
 try:
  r=urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0'}),timeout=35);b=r.read();ct=r.headers.get('Content-Type','')
  return {'url':u,'finalUrl':r.url,'status':r.status,'bytes':len(b),'contentType':ct,'sha256':hashlib.sha256(b).hexdigest() if 'image/' in ct else None}
 except Exception as e:return {'url':u,'error':str(e)}
result=list(concurrent.futures.ThreadPoolExecutor(max_workers=7).map(check,sorted(urls)));(BASE/'qa'/'destination-http-qa.json').write_text(json.dumps({'capturedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'results':result},indent=2));print(json.dumps({'destinations':len(result),'failed':[x for x in result if x.get('status')!=200],'imageAssets':[x for x in result if 'image/' in x.get('contentType','')]},indent=2))
