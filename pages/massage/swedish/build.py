"""Build the M3 review proof and installation candidates. Does not alter Wix.

Run with Python 3. Shared approved assets remain in ../deep-tissue/assets.
"""
from pathlib import Path
import base64
import html
import json
import mimetypes
import re

ROOT = Path(__file__).resolve().parent
body = (ROOT / 'body.html').read_text()
css = (ROOT / 'style.css').read_text()
renderer = '''/* Matrix M3 Swedish design candidate, 2026-11-05. Approval pending. */
(() => {
  const html = __BODY__;
  const css = __STYLE__;
  class MatrixSwedish extends HTMLElement {
    connectedCallback() {
      if (this.dataset.matrixMounted === 'true') return;
      this.innerHTML = '<style>' + css + '</style>' + html;
      this.style.display = 'block';
      this.style.height = 'auto';
      this.dataset.matrixMounted = 'true';
      this.dispatchEvent(new CustomEvent('matrix-ready', { detail: { version: 'M3-proof-2026-11-05-v1' } }));
    }
  }
  if (!customElements.get('matrix-swedish-page')) customElements.define('matrix-swedish-page', MatrixSwedish);
})();
'''.replace('__BODY__', json.dumps(body)).replace('__STYLE__', json.dumps(css))
(ROOT / 'renderer.js').write_text(renderer)

def plain(value):
    return re.sub(r'\s+', ' ', html.unescape(re.sub('<[^>]+>', '', value))).strip()

questions = []
for block in re.findall(r'<details[^>]*>(.*?)</details>', body, re.S):
    questions.append({'@type': 'Question', 'name': plain(re.search(r'<summary>(.*?)</summary>', block, re.S)[1]), 'acceptedAnswer': {'@type': 'Answer', 'text': plain(re.search(r'<p>(.*?)</p>', block, re.S)[1])}})
(ROOT / 'faq-schema.json').write_text(json.dumps({'@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': questions}, indent=2) + '\n')
(ROOT / 'WIX_PAGE_CODE_CANDIDATE.js').write_text('// NOT installed. Merge only after approval and a fresh capture of existing l014i page code.\n// Preserve existing handlers, integrations and native metadata. Do not replace the whole page file.\n$w.onReady(function () {\n  $w("#matrixSwedishPage").seoMarkup = ' + json.dumps(body) + ';\n});\n')

proof_body, proof_css = body, css
asset_root = ROOT.parent / 'deep-tissue'
asset_map = json.loads((asset_root / 'asset-map.json').read_text())
def uri(path):
    mime = mimetypes.guess_type(path.name)[0] or 'application/octet-stream'
    return 'data:' + mime + ';base64,' + base64.b64encode(path.read_bytes()).decode()

for local, url in asset_map.items():
    proof_body = proof_body.replace(url, uri(asset_root / local))
for url in re.findall(r'url\(["\']?(https://[^)"\']+)', css):
    asset = asset_root / 'assets' / url.rsplit('/', 1)[-1]
    if not asset.is_file():
        raise FileNotFoundError(asset)
    proof_css = proof_css.replace(url, uri(asset))
template = '''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>Swedish Massage — Full Page Design Proof</title>
<style>html{background:#deded7;scroll-behavior:smooth}body{margin:0}main{max-width:980px;margin:auto;background:#f7f1e8}__CSS__</style>
</head><body><main aria-label="Swedish massage page body design proof">__BODY__</main></body></html>
'''
proof = template.replace('__CSS__', proof_css).replace('__BODY__', proof_body)
(ROOT / 'proofs').mkdir(exist_ok=True)
(ROOT / 'proofs' / 'index.html').write_text(template.replace('__CSS__', css).replace('__BODY__', body))
(ROOT / 'proofs' / 'Matrix_Swedish_Massage_Full_Page_Proof.html').write_text(proof)
assert len(re.findall(r'<h1\b', body)) == 1
assert len(questions) == 7
assert 'data:' not in renderer
assert not re.search(r'(src|url)=["\']https://', proof)
print(json.dumps({'renderer_bytes': len(renderer.encode()), 'proof_bytes': len(proof.encode()), 'h1_count': 1, 'faq_count': len(questions)}))
