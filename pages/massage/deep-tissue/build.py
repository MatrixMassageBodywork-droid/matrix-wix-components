"""Rebuild the installed M2 renderer, Wix page code and FAQ schema from current sources.
Run with Python 3 from any working directory. Does not edit or publish Wix.
"""
from pathlib import Path
import re, json, html
p = Path(__file__).resolve().parent
body = (p / 'body.html').read_text()
css = (p / 'style.css').read_text()
renderer = '''/* Matrix M2 approved body, 2026-11-05. Page-local; no header/footer or head changes. */
(() => {
  const html = __HTML__;
  const css = __CSS__;
  class MatrixDeepTissue extends HTMLElement {
    connectedCallback() {
      if (this.dataset.matrixMounted === 'true') return;
      this.innerHTML = '<style>' + css + '</style>' + html;
      this.style.display = 'block';
      this.style.height = 'auto';
      this.dataset.matrixMounted = 'true';
      this.dispatchEvent(new CustomEvent('matrix-ready', { detail: { version: 'M2-approved-2026-11-05-v2' } }));
    }
  }
  if (!customElements.get('matrix-deep-tissue-page')) customElements.define('matrix-deep-tissue-page', MatrixDeepTissue);
})();
'''.replace('__HTML__', json.dumps(body)).replace('__CSS__', json.dumps(css))
(p / 'renderer.js').write_text(renderer)
(p / 'body.html').write_text(body)
(p / 'style.css').write_text(css)
def plain(value):
    return html.unescape(re.sub('<[^>]+>', '', value)).strip()
questions = []
for block in re.findall(r'<details[^>]*>(.*?)</details>', body, re.S):
    questions.append({'@type': 'Question', 'name': plain(re.search(r'<summary>(.*?)</summary>', block, re.S)[1]), 'acceptedAnswer': {'@type': 'Answer', 'text': plain(re.search(r'<p>(.*?)</p>', block, re.S)[1])}})
(p / 'faq-schema.json').write_text(json.dumps({'@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': questions}, indent=2))
(p / 'WIX_PAGE_CODE.js').write_text('// M2 approved Deep Tissue body. Existing native page metadata is retained.\n$w.onReady(function () {\n  $w("#matrixDeepTissuePage").seoMarkup = ' + json.dumps(body) + ';\n});\n')
print({'renderer_bytes': len(renderer.encode()), 'H1': len(re.findall(r'<h1\b', body)), 'FAQ': len(questions)})
