"""Reproducible M4 proof and width-only M2/M3 previews; no live mutations."""
from pathlib import Path
import base64, hashlib, html, json, mimetypes, re

ROOT = Path(__file__).resolve().parent
SHARED = ROOT.parent / 'deep-tissue'
PROOFS = ROOT / 'proofs'
PROOFS.mkdir(exist_ok=True)
asset_map = json.loads((SHARED / 'asset-map.json').read_text())

def uri(path):
    mime = mimetypes.guess_type(path.name)[0] or 'application/octet-stream'
    return 'data:' + mime + ';base64,' + base64.b64encode(path.read_bytes()).decode()

def proof(body, css, title):
    for local, url in asset_map.items():
        body = body.replace(url, uri(SHARED / local))
        css = css.replace(url, uri(SHARED / local))
    for local, url in json.loads((ROOT / 'asset-map.json').read_text()).items():
        body = body.replace(url, uri(ROOT / local))
        css = css.replace(url, uri(ROOT / local))
    for url in re.findall(r'url\(["\']?(https://[^)"\']+)', css):
        path = SHARED / 'assets' / url.rsplit('/', 1)[-1]
        css = css.replace(url, uri(path))
    return '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>' + html.escape(title) + '</title><style>html{background:#f7f1e8;scroll-behavior:smooth}body{margin:0}main{width:100%;max-width:none;margin:0}' + css + '</style></head><body><main>' + body + '</main></body></html>\n'

def plain(text):
    return re.sub(r'\s+', ' ', html.unescape(re.sub('<[^>]+>', ' ', text))).strip()

def linked_proof(body, css, title):
    return '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>' + html.escape(title) + '</title><style>html{background:#f7f1e8;scroll-behavior:smooth}body{margin:0}main{width:100%;max-width:none;margin:0}' + css + '</style></head><body><main>' + body + '</main></body></html>\n'

body = (ROOT / 'body.html').read_text()
css = (ROOT / 'style.css').read_text()
questions = []
for block in re.findall(r'<details[^>]*>(.*?)</details>', body, re.S):
    questions.append({'@type':'Question','name':plain(re.search(r'<summary>(.*?)</summary>',block,re.S)[1]),'acceptedAnswer':{'@type':'Answer','text':plain(re.search(r'<p>(.*?)</p>',block,re.S)[1])}})
assert len(questions) == 6
assert len(re.findall(r'<h1\b', body)) == 1
faq = {'@context':'https://schema.org','@type':'FAQPage','mainEntity':questions}
(ROOT / 'faq-schema.json').write_text(json.dumps(faq,indent=2)+'\n')
renderer = '''/* M4 review candidate. Not installed or published. 2026-11-05. */
(() => {
  const body = __BODY__;
  const css = __CSS__;
  class MatrixLymphaticPage extends HTMLElement {
    connectedCallback() {
      if (this.dataset.matrixMounted === 'true') return;
      this.innerHTML = '<style>' + css + '</style>' + body;
      this.style.display = 'block';
      this.style.height = 'auto';
      this.dataset.matrixMounted = 'true';
      this.dispatchEvent(new CustomEvent('matrix-ready', {detail:{version:'M4-full-width-review-v2-images'}}));
    }
  }
  if (!customElements.get('matrix-lymphatic-page')) customElements.define('matrix-lymphatic-page', MatrixLymphaticPage);
})();
'''.replace('__BODY__',json.dumps(body)).replace('__CSS__',json.dumps(css))
(ROOT / 'renderer.js').write_text(renderer)
(ROOT / 'WIX_PAGE_CODE_CANDIDATE.js').write_text('// NOT installed. Merge into a freshly captured lb1iq page file only after design approval.\n// Preserve existing SEO, handlers and integrations; remove only verified obsolete body writes.\n$w.onReady(function () {\n  $w("#matrixLymphaticPage").seoMarkup = ' + json.dumps(body) + ';\n});\n')
(PROOFS / 'index.html').write_text(proof(body,css,'Manual Lymphatic Drainage — Full-Width Design Proof'))
(ROOT / 'preview.html').write_text(linked_proof(body,css,'Manual Lymphatic Drainage — Full-Width Design Proof'))
(PROOFS / 'Matrix_MLD_Full_Width_Proof.html').write_text((PROOFS/'index.html').read_text())
width = ROOT.parent / 'width-correction'
width.mkdir(exist_ok=True)
baselines = {}
for slug, label in [('deep-tissue','Deep Tissue'),('swedish','Swedish')]:
    p = ROOT.parent / slug
    original_body, original_css = (p/'body.html').read_text(), (p/'style.css').read_text()
    (PROOFS/(slug+'-full-width.html')).write_text(proof(original_body,original_css,label+' — Width-Only Proof'))
    (width/(slug+'-preview.html')).write_text(linked_proof(original_body,original_css,label+' — Width-Only Proof'))
    baselines[slug] = {n:hashlib.sha256((p/n).read_bytes()).hexdigest() for n in ['body.html','style.css','renderer.js']}
(width/'unchanged-source-hashes.json').write_text(json.dumps(baselines,indent=2)+'\n')
for w in [1920,1440,980,700,390,320]:
    frame = f'<!doctype html><html><head><meta name="robots" content="noindex,nofollow"><title>MLD responsive proof {w}</title><style>html,body{{margin:0;background:#deded7}}iframe{{display:block;border:0;width:{w}px;height:900px;margin:0}}</style></head><body><iframe id="proof" title="MLD proof at {w} pixels" src="index.html"></iframe><script>const frame=document.getElementById("proof");frame.onload=()=>{{const resize=()=>frame.style.height=frame.contentDocument.querySelector("main").getBoundingClientRect().height+"px";new ResizeObserver(resize).observe(frame.contentDocument.querySelector("main"));resize()}}</script></body></html>'
    (PROOFS/f'viewport-{w}.html').write_text(frame)
print(json.dumps({'m4_h1_count':1,'m4_faq_count':6,'renderer_bytes':len(renderer.encode()),'proof_bytes':(PROOFS/'index.html').stat().st_size,'existing_page_sources_changed':False}))
