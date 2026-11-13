import urllib.request, re, json, concurrent.futures, hashlib, html
from pathlib import Path
from html.parser import HTMLParser
from datetime import datetime, timezone

ROOT=Path(__file__).parent
BASE='https://www.matrixmassage.net'
MOBILE='Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Version/17.0 Mobile/15E148 Safari/604.1'
DESKTOP='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/142.0.0.0 Safari/537.36'
PAGES={'paddock':'/spa-services-near-paddock-lake-wi','lash':'/spa-and-beauty-services-salem-wi/eyelash-extensions-salem-wi','head':'/japanese-head-spa-salem-wi','skin':'/skin-reset-blueprint-salem-wi'}
class Page(HTMLParser):
 def __init__(self,s):
  super().__init__();self.title=[];self.in_title=False;self.meta={};self.canonical=[];self.h1=0;self.anchors=[];self.frames=[];self.feed(s)
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t=='title':self.in_title=True
  if t=='meta' and a.get('name') in ['description','robots','viewport']:self.meta[a['name']]=a.get('content')
  if t=='link' and a.get('rel')=='canonical':self.canonical.append(a.get('href'))
  if t=='h1':self.h1+=1
  if t=='a':self.anchors.append(a.get('href',''))
  if t=='iframe':self.frames.append(a)
 def handle_endtag(self,t):
  if t=='title':self.in_title=False
 def handle_data(self,t):
  if self.in_title:self.title.append(t)
def schemas(s):
 out=[]
 for data in re.findall(r'<script\b[^>]*type=["\x27]application/ld\+json["\x27][^>]*>(.*?)</script>',s,re.S):
  v=json.loads(data);out.extend(v if isinstance(v,list) else [v])
 return out
def get(url,ua=DESKTOP):
 req=urllib.request.Request(url,headers={'User-Agent':ua,'Cache-Control':'no-cache'})
 with urllib.request.urlopen(req,timeout=40) as r:return r.status,r.read().decode(),r.geturl()
def native(item):
 name,path,mode=item;url=BASE+path;status,s,final=get(url,MOBILE if mode=='mobile' else DESKTOP);p=Page(s)
 baseline=Page((ROOT/(name+'-test1148-mobile.html')).read_text())
 sc=schemas(s);base_sc=schemas((ROOT/(name+'-test1148-mobile.html')).read_text())
 checks={'http200':status==200,'canonical':p.canonical==[url],'titlePreserved':p.title==baseline.title,'descriptionPreserved':p.meta.get('description')==baseline.meta.get('description'),'indexable':'noindex' not in p.meta.get('robots',''),'schemaPreserved':sc==base_sc}
 if mode=='mobile':checks['mobileBranch']='device-mobile-optimized' in s;checks['fixed320Viewport']='width=320' in p.meta.get('viewport','')
 if name=='paddock':checks['oneNativeH1']=p.h1==1;checks['newLashLink']=BASE+PAGES['lash'] in p.anchors;checks['studioLinkRetained']=BASE+'/studio' in p.anchors
 if name=='lash':checks['newPaddockLink']=BASE+PAGES['paddock'] in p.anchors
 # Custom-element H1s and the Head Spa article anchor require a rendered-browser check.
 # Skin Reset's single H1 is inside its existing iframe, not the native companion.
 if name=='skin':
  checks['nativeCompanion']='About the Skin Reset Blueprint' in s and 'The guide does not diagnose or treat medical skin conditions.' in s
  checks['companionFacialLink']=BASE+'/spa-and-beauty-services-salem-wi/facials-salem-wi' in p.anchors
  checks['companionSpaLink']=BASE+'/spa-and-beauty-services-salem-wi' in p.anchors
 if name=='lash' and mode=='mobile':
  checks['mobileHeight11880']='--custom-element-height:11880px' in s
  checks['noOld15000Height']='--custom-element-height:15000px' not in s
 rev=sorted(set(re.findall(r'siteRevision=(\d+)',html.unescape(' '.join(x.get('src','') for x in p.frames)))))
 result={'page':name,'mode':mode,'url':url,'status':status,'revision':rev,'checks':checks,'pass':all(checks.values()),'metadata':{'title':p.title,'meta':p.meta,'canonical':p.canonical},'schemas':sc,'anchors':p.anchors,'iframes':p.frames,'sha256':hashlib.sha256(s.encode()).hexdigest()}
 (ROOT/(name+'-live-'+mode+'.html')).write_text(s)
 (ROOT/(name+'-live-'+mode+'.json')).write_text(json.dumps(result,indent=2))
 return result
def article(t):
 status,s,final=get(t['url']);p=Page(s);a=[x for x in schemas(s) if x.get('@type') in ['Article','BlogPosting']]
 checks={'http200':status==200,'oneArticle':len(a)==1,'exactPreservedSchema':a==[t['markup']],'canonical':p.canonical==[t['url']],'indexable':'noindex' not in p.meta.get('robots','')}
 result={'url':t['url'],'checks':checks,'pass':all(checks.values())};(ROOT/(t['itemId']+'-live-article.json')).write_text(json.dumps(result,indent=2));return result
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
 natives=list(pool.map(native,[(n,p,m) for n,p in PAGES.items() for m in ['desktop','mobile']]))
 articles=list(pool.map(article,json.loads((ROOT/'article-payloads.json').read_text())))
skin=next(x for x in natives if x['page']=='skin' and x['mode']=='desktop')
frame=next((x for x in skin['iframes'] if 'filesusr.com/html/' in x.get('src','')),{'src':'https://www-matrixmassage-net.filesusr.com/html/e4cc43_6f2772a88ef79839dd81e3f5a4b7fb8e.html'}) # Exact src independently observed in the live browser.
status,s,final=get(frame['src']);p=Page(s)
iframe={'url':frame['src'],'status':status,'facialLinks':sum(x==BASE+'/spa-and-beauty-services-salem-wi/facials-salem-wi' for x in p.anchors),'oldFacialLinks':sum(x==BASE+'/facials-salem-wi' for x in p.anchors),'allAnchors':p.anchors,'sha256':hashlib.sha256(s.encode()).hexdigest()}
iframe['pass']=status==200 and iframe['facialLinks']==5 and iframe['oldFacialLinks']==0 and len(p.anchors)==10
out={'verifiedAtUTC':datetime.now(timezone.utc).isoformat(),'native':natives,'articles':articles,'skinIframe':iframe,'renderedChecksStillRequired':['Lash and Head Spa visible H1/links/FAQ layout','Skin Reset iframe H1 and native companion layout','Physical mobile320/375 visual testing'],'pass':all(x['pass'] for x in natives+articles) and iframe['pass']}
(ROOT/'http-verification.json').write_text(json.dumps(out,indent=2))
print(json.dumps({'native':[{k:v for k,v in x.items() if k in ['page','mode','revision','checks','pass']} for x in natives],'articleCount':len(articles),'articlesPass':all(x['pass'] for x in articles),'articleFailures':[x for x in articles if not x['pass']],'iframe':iframe,'overall':out['pass']},indent=2))
