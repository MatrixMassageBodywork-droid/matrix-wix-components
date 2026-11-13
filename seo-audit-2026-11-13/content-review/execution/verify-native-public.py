import json, subprocess, hashlib, re, sys, concurrent.futures
from pathlib import Path
from lxml import html
P=Path(__file__).resolve().parents[1]
MODE=sys.argv[1] if len(sys.argv)>1 else 'preview'
OUT=P/'execution'/MODE;OUT.mkdir(exist_ok=True)
M=json.loads((P/'package/manifest.json').read_text())
items=[x for x in M['items'] if x['id'] in ['C10','C12','C16','C17']]
def norm(s):return re.sub(r'\s+',' ',s.replace('\u200b','')).strip()
def fetch(url,f):
 r=subprocess.run(['curl','-L','--fail','--max-time','50','-sS',url,'-o',str(f),'-w','%{http_code}\t%{url_effective}'],capture_output=True,text=True)
 if r.returncode:raise RuntimeError(r.stderr)
 return r.stdout
def facts(t):
 return {'title':t.xpath('//title/text()'),'description':t.xpath('//meta[@name="description"]/@content'),'canonical':t.xpath('//link[@rel="canonical"]/@href'),'robots':t.xpath('//meta[@name="robots"]/@content'),'schema':t.xpath('//script[@type="application/ld+json"]/text()')}
def links(n):return [(norm(a.text_content()),a.get('href'),a.get('target')) for a in n.xpath('.//a[@href]')]
def check(i):
 f=OUT/(i['id']+'.html');status=fetch(i['url']+('?rc=test-site' if MODE=='preview' else ''),f)
 t=html.fromstring(f.read_bytes());old=html.fromstring((P/'baseline'/f"{i['slug']}.html").read_bytes())
 oldrich={n.get('id'):norm(n.text_content()) for n in old.xpath('//main//*[@data-testid="richTextElement"]')}
 newrich={n.get('id'):norm(n.text_content()) for n in t.xpath('//main//*[@data-testid="richTextElement"]')}
 expected=dict(oldrich)
 if i['id']=='C10':
  for p in i['patches']:expected[p['component_id']]=expected[p['component_id']].replace(p['before'],p['after'])
 if i['id']=='C16':
  p=i['patches'][0];expected[p['component_id']]=expected[p['component_id']].replace(p['after_exact_paragraph'],p['after_exact_paragraph']+' '+p['insert_text'])
 check={'http200':status.startswith('200\t'),'metadataPreserved':facts(t)==facts(old),'allRichTextAsApproved':newrich==expected,'noNewRichTextElements':set(newrich)==set(oldrich)}
 for tag in ['header','footer']:
  a=old.xpath('//'+tag);b=t.xpath('//'+tag)
  check[tag+'Preserved']=[(norm(x.text_content()),links(x)) for x in a]==[(norm(x.text_content()),links(x)) for x in b]
 check['formsPreserved']=[html.tostring(x) for x in t.xpath('//form')]==[html.tostring(x) for x in old.xpath('//form')]
 detail={'id':i['id'],'url':i['url'],'status':status,'sha256':hashlib.sha256(f.read_bytes()).hexdigest(),'checks':check,'metadata':facts(t),'richDifferences':[{ 'id':k,'expected':expected.get(k),'actual':newrich.get(k)} for k in set(expected)|set(newrich) if expected.get(k)!=newrich.get(k)]}
 if i['id'] in ['C16','C17']:
  p=i['patches'][0];a=t.get_element_by_id(p['component_id']).xpath('.//a[@href]');found=[x for x in a if norm(x.text_content())==p['anchor']];check['approvedLink']=len(found)==1 and found[0].get('href')==p['href'] and found[0].get('target')=='_self';detail['links']=links(t.get_element_by_id(p['component_id']))
 if i['id']=='C12':
  src=(t.get_element_by_id('comp-moqgyn3g').xpath('.//iframe/@src') or [sys.argv[2] if len(sys.argv)>2 else ''])[0];ef=OUT/'skin-reset-embed.html';fetch(src,ef);s=ef.read_text();candidate=(P/'package/candidates/C12-skin-reset-embed.html').read_text();check['exactEmbed']=s.rstrip()==candidate.rstrip();et=html.fromstring(s);bt=html.fromstring((P/'package/baselines/skin-reset-iframe.html').read_text());check['tenDestinationsPreserved']=[a.get('href') for a in et.xpath('//a')]==[a.get('href') for a in bt.xpath('//a')];check['cssPreserved']=et.xpath('//style/text()')==bt.xpath('//style/text()');detail['embedSrc']=src;detail['embedHash']=hashlib.sha256(ef.read_bytes()).hexdigest();detail['embedLinks']=links(et)
 return detail
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as e:results=list(e.map(check,items))
(OUT/'native-qa.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
print(json.dumps([{'id':x['id'],'failures':[k for k,v in x['checks'].items() if not v],'richDifferences':x['richDifferences']} for x in results],ensure_ascii=False,indent=2))
