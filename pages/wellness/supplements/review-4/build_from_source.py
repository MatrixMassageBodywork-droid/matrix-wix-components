"""Reproduce the Supplements R4 draft from frozen R3 source. No network or live writes."""
from __future__ import annotations
import argparse
import base64
import hashlib
import html
from html.parser import HTMLParser
import importlib.util
import json
from pathlib import Path
import tempfile

class Node:
    def __init__(self, tag='', attrs=()):
        self.tag, self.attrs, self.children = tag, dict(attrs), []
    def nodes(self, tag=None):
        for child in self.children:
            if isinstance(child, Node):
                if tag is None or child.tag == tag:
                    yield child
                yield from child.nodes(tag)
    def text(self):
        return ' '.join(' '.join(c.text() if isinstance(c, Node) else c for c in self.children).split())

class Parser(HTMLParser):
    VOID = {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node()
        self.stack = [self.root]
    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs)
        self.stack[-1].children.append(node)
        if tag not in self.VOID:
            self.stack.append(node)
    def handle_endtag(self, tag):
        if tag in self.VOID:
            return
        if len(self.stack) < 2 or self.stack[-1].tag != tag:
            raise ValueError('Unbalanced markup: ' + tag)
        self.stack.pop()
    def handle_data(self, data):
        self.stack[-1].children.append(data)

def sha(data):
    return hashlib.sha256(data.encode() if isinstance(data, str) else data).hexdigest()

def build(base: Path, out: Path, change_file: Path) -> None:
    if out.exists():
        raise ValueError('Output already exists; do not overwrite an installed release.')
    changes = json.loads(change_file.read_text(encoding='utf-8'))
    spec = importlib.util.spec_from_file_location('matrix_r3', base / 'review-3/rebuild_hero.py')
    if not spec or not spec.loader:
        raise ValueError('R3 source is missing.')
    r3 = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(r3)
    assets = base / 'review-3/assets'
    with tempfile.TemporaryDirectory() as temp:
        prior = Path(temp) / 'r3'
        r3.build(base, assets, prior)
        body = (prior / 'body.html').read_text(encoding='utf-8')
        css = (prior / 'style.css').read_text(encoding='utf-8')
    if sha(body) != changes['bodyBeforeSha256'] or sha(css) != changes['cssBeforeSha256']:
        raise ValueError('Baseline drift; reconcile before rebuilding.')
    body = (change_file.parent / 'body.html').read_text(encoding='utf-8')
    css += changes['appendCss']
    cfg = changes['config']
    p = Parser(); p.feed(body); p.close()
    if len(p.stack) != 1:
        raise ValueError('Unclosed markup.')
    nodes = list(p.root.nodes())
    h1 = list(p.root.nodes('h1'))
    if len(h1) != 1 or 'data:' in body.lower() or 'data:' in css.lower():
        raise ValueError('Invalid heading or inline production asset.')
    ids = [n.attrs['id'] for n in nodes if n.attrs.get('id')]
    if len(ids) != len(set(ids)):
        raise ValueError('Duplicate HTML ids.')
    for n in nodes:
        if n.tag == 'a' and n.attrs.get('href', '').startswith('#') and n.attrs['href'][1:] not in ids:
            raise ValueError('Broken internal anchor.')
        if any(k.startswith('on') for k in n.attrs):
            raise ValueError('Unexpected inline event handler.')
    questions = []
    for detail in p.root.nodes('details'):
        summary = list(detail.nodes('summary'))
        if len(summary) != 1:
            raise ValueError('Invalid FAQ summary.')
        answer = ' '.join(' '.join(c.text() if isinstance(c, Node) else c for c in detail.children if c is not summary[0]).split())
        questions.append({'@type':'Question','name':summary[0].text(),'acceptedAnswer':{'@type':'Answer','text':answer}})
    if len(questions) != cfg['expectedFaqCount']:
        raise ValueError('FAQ count mismatch.')
    plans = [n for n in nodes if n.tag == 'article' and 'ms-plan' in n.attrs.get('class','').split()]
    if len(plans) != 6 or len([n for n in nodes if n.tag == 'button' and 'disabled' in n.attrs]) != 2:
        raise ValueError('Plans or preorder gates changed.')
    renderer = '''/* Review build. Not installed; publication requires native verification. */
(() => {
  const body = __BODY__;
  const css = __CSS__;
  class MatrixServicePage extends HTMLElement {
    connectedCallback() {
      if (this.dataset.matrixMounted === 'true') return;
      this.innerHTML = '<style>' + css + '</style>' + body;
      this.style.display = 'block';
      this.style.height = 'auto';
      this.dataset.matrixMounted = 'true';
      this.dispatchEvent(new CustomEvent('matrix-ready', {detail: {version: __REVISION__}}));
    }
  }
  if (!customElements.get(__TAG__)) customElements.define(__TAG__, MatrixServicePage);
})();
'''.replace('__BODY__',json.dumps(body)).replace('__CSS__',json.dumps(css)).replace('__REVISION__',json.dumps(cfg['revision'])).replace('__TAG__',json.dumps(cfg['tagName']))
    snippet = '// CANDIDATE ONLY: merge into freshly captured page code. Preserve existing SEO, analytics and handlers.\n$w.onReady(function () {\n  $w('+json.dumps('#'+cfg['elementId'])+').seoMarkup = '+json.dumps(body)+';\n});\n'
    network = '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>'+html.escape(cfg['seoTitle'])+'</title><style>html,body{margin:0;background:#f7f1e8}main{width:100%;max-width:none}'+css+'</style></head><body><main>'+body+'</main></body></html>\n'
    faq = {'@context':'https://schema.org','@type':'FAQPage','mainEntity':questions}
    site, page = 'https://www.matrixmassage.net/', cfg['pageUrl']
    business = {'@type':'HealthAndBeautyBusiness','@id':site+'#business','name':'Matrix Massage & Bodywork','alternateName':'Matrix Wellness & Biotech','url':site,'telephone':'+12629399325','address':{'@type':'PostalAddress','streetAddress':'24804 75th St','addressLocality':'Salem','addressRegion':'WI','postalCode':'53168','addressCountry':'US'},'areaServed':['Salem, WI','Salem Lakes, WI','Paddock Lake, WI','Twin Lakes, WI','Burlington, WI','Union Grove, WI','Bristol, WI','Trevor, WI','Genoa City, WI','Pleasant Prairie, WI','Kenosha, WI','Antioch, IL']}
    breadcrumb = {'@type':'BreadcrumbList','@id':page+'#breadcrumb','itemListElement':[{'@type':'ListItem','position':1,'name':'Home','item':site},{'@type':'ListItem','position':2,'name':'Wellness','item':site+'wellness-biotech-services-salem-wi'},{'@type':'ListItem','position':3,'name':'Supplements & vitamins','item':page}]}
    plan_items = [{'@type':'ListItem','position':i+1,'item':{'@type':'WebPage','name':next(n.nodes('h3')).text(),'url':next(n.nodes('a')).attrs['href']}} for i,n in enumerate(plans)]
    items = {'@type':'ItemList','@id':page+'#fullscript-plans','name':'Existing Matrix Fullscript supplement plans','numberOfItems':6,'itemListElement':plan_items}
    graph_faq = {'@type':'FAQPage','mainEntity':questions,'@id':page+'#faq'}
    collection = {'@type':'CollectionPage','@id':page+'#webpage','url':page,'name':h1[0].text(),'description':cfg['seoDescription'],'inLanguage':'en-US','about':[{'@id':site+'#business'},{'@type':'Thing','name':'Health supplements and vitamins'}],'publisher':{'@id':site+'#business'},'mainEntity':{'@id':page+'#fullscript-plans'},'breadcrumb':{'@id':page+'#breadcrumb'},'hasPart':{'@id':page+'#faq'}}
    graph = {'@context':'https://schema.org','@graph':[business,collection,breadcrumb,items,graph_faq]}
    def asset_uri(name, mime, expected):
        data = (assets/name).read_bytes()
        if sha(data) != expected:
            raise ValueError('Approved asset hash mismatch.')
        return 'data:'+mime+';base64,'+base64.b64encode(data).decode()
    logo_url = 'https://static.wixstatic.com/media/e4cc43_c35a32fb07bc4445bb822ed185350e25~mv2.jpg'
    water_url = 'https://static.wixstatic.com/media/11062b_2413040bb0e142369d76f3878b966792~mv2.jpeg'
    proof = network.replace(logo_url,asset_uri('matrix-approved-logo-original.jpg','image/jpeg','7ffb947caea7309fb8e4c42b24049b75b5f421e338711568a0085b4c39417708')).replace(water_url,asset_uri('matrix-water-background.webp','image/webp','96e7e516c09fbe7fbe41d4c3459d4b7ba527fe39b0f7931593b0ca07d6da4104'))
    notice = '<aside class="review-notice">DESIGN REVIEW 4 · LOCAL SEO REVISION · NOT LIVE · Monthly preorders remain closed</aside>'
    notice_css = '.review-notice{background:#faf7f0;color:#123d40;text-align:center;padding:10px 20px;font:12px/1.6 Arial;border-bottom:1px solid #d8dfd9}'
    proof = proof.replace('</style>','\n'+notice_css+'</style>',1).replace('<body><main>','<body>'+notice+'<main>')
    proof = proof.replace('</head>','<script type="application/ld+json">'+json.dumps(graph,ensure_ascii=False).replace('<','\\u003c')+'</script></head>')
    files = {'body.html':body,'style.css':css,'renderer.js':renderer,'WIX_SEO_SNIPPET_CANDIDATE.js':snippet,'preview-network-assets.html':network,'faq-schema.json':json.dumps(faq,indent=2)+'\n','structured-data-candidate.json':json.dumps(graph,indent=2,ensure_ascii=False)+'\n','metadata-candidate.json':json.dumps(changes['metadata'],indent=2,ensure_ascii=False)+'\n','url-migration-plan.json':json.dumps(changes['migration'],indent=2)+'\n','preview.html':proof}
    actual = {name:sha(value) for name,value in files.items()}
    for name, expected in changes['expectedSha256'].items():
        if actual.get(name) != expected:
            raise ValueError('Generated hash mismatch: '+name+' ('+str(actual.get(name))+')')
    out.mkdir(parents=True)
    for name, value in files.items():
        (out/name).write_text(value,encoding='utf-8')
    (out/'page-config.json').write_text(json.dumps(cfg,indent=2)+'\n',encoding='utf-8')
    (out/'sha256.json').write_text(json.dumps(actual,indent=2)+'\n',encoding='utf-8')
    print(json.dumps({'status':'REPRODUCED / HASH VERIFIED / NOT INSTALLED / NOT PUBLISHED','files':len(files),'output':str(out)}))

if __name__ == '__main__':
    here = Path(__file__).resolve().parent
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base',type=Path,default=here.parent)
    parser.add_argument('--changes',type=Path,default=here/'source-data.json')
    parser.add_argument('--out',type=Path,default=here/'generated')
    args = parser.parse_args()
    try:
        build(args.base,args.out,args.changes)
    except (ValueError,OSError,KeyError,json.JSONDecodeError) as exc:
        parser.exit(2,str(exc)+'\n')
