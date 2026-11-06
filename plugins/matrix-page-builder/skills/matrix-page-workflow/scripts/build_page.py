"""Build a new Matrix review directory from prepared HTML/CSS. No live writes."""
from __future__ import annotations
import argparse
import hashlib
import html
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.parse import urlparse


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


class PageParser(HTMLParser):
    VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node()
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs)
        self.stack[-1].children.append(node)
        if tag not in self.VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in self.VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        if tag in self.VOID:
            return
        if len(self.stack) < 2 or self.stack[-1].tag != tag:
            raise ValueError(f'Unbalanced HTML closing tag: {tag}')
        self.stack.pop()

    def handle_data(self, data):
        self.stack[-1].children.append(data)


def require(condition, message):
    if not condition:
        raise ValueError(message)


def build(config_path: Path, out: Path):
    config_path = config_path.resolve()
    cfg = json.loads(config_path.read_text())
    for key in ['serviceName', 'revision', 'tagName', 'elementId', 'rootClass', 'pageUrl', 'seoTitle', 'seoDescription', 'bodyFile', 'cssFile']:
        require(isinstance(cfg.get(key), str) and cfg[key].strip(), f'Missing nonblank {key}')
    require(re.fullmatch(r'[a-z][a-z0-9]*(?:-[a-z0-9]+)+', cfg['tagName']), 'Invalid custom-element tag')
    require(re.fullmatch(r'[A-Za-z][A-Za-z0-9]*', cfg['elementId']), 'Invalid Wix element ID')
    require(re.fullmatch(r'[a-z][a-z0-9-]*', cfg['rootClass']), 'Invalid CSS root class')
    url = urlparse(cfg['pageUrl'])
    require(url.scheme == 'https' and url.hostname == 'www.matrixmassage.net' and not url.query and not url.fragment and not url.username and not url.password and url.port is None, 'Use the verified canonical Matrix HTTPS page URL')
    body_path = (config_path.parent / cfg['bodyFile']).resolve()
    css_path = (config_path.parent / cfg['cssFile']).resolve()
    body, css = body_path.read_text(), css_path.read_text()
    require('<!doctype' not in body.lower(), 'Use only page body markup')
    parser = PageParser()
    parser.feed(body)
    parser.close()
    require(len(parser.stack) == 1, 'Unclosed body HTML tags')
    nodes = list(parser.root.nodes())
    top = [n for n in parser.root.children if isinstance(n, Node)]
    require(len(top) == 1 and cfg['rootClass'] in (top[0].attrs.get('class') or '').split(), 'One outer element with rootClass is required')
    headings = [n for n in nodes if n.tag == 'h1']
    require(len(headings) == 1 and headings[0].text(), 'Exactly one nonempty visible H1 is required')
    require('.' + cfg['rootClass'] in css, 'CSS must contain the configured root selector')
    require(cfg['tagName'] in css, 'CSS must contain the configured custom-element host selector')
    require('data:' not in css.lower() and 'data:' not in body.lower(), 'Production body/CSS must reference served assets, not inline base64')
    require('</style' not in css.lower() and 'javascript:' not in css.lower(), 'Unsafe CSS content')
    require(not re.search(r'(^|[{}])\s*(html|body|:root)(?=[\s,{.#:>])', css), 'Do not use global html/body/:root CSS selectors')
    ids = [n.attrs['id'] for n in nodes if n.attrs.get('id')]
    require(len(ids) == len(set(ids)), 'Duplicate HTML IDs')
    links, images = [], []
    for n in nodes:
        require(n.tag not in {'html', 'head', 'body', 'script', 'style', 'meta', 'link', 'title', 'base', 'iframe', 'object', 'embed'}, f'Forbidden body tag: {n.tag}')
        for name, value in n.attrs.items():
            require(not name.startswith('on'), 'Inline event attributes are not allowed')
            if name in {'href', 'src'}:
                require(value and not any(c.isspace() for c in value) and not any(ord(c) < 32 for c in value), f'Invalid {name}')
                require(value.startswith(('https://', '/', '#', 'tel:', 'sms:', 'mailto:')) and not value.startswith('//'), f'Unsafe or relative {name}: {value}')
        if n.tag == 'a':
            href = n.attrs.get('href', '')
            require(href, 'Every anchor needs a destination')
            if href.startswith('#'):
                require(href[1:] in ids, f'Broken internal anchor: {href}')
            links.append(href)
        if n.tag == 'img':
            require('alt' in n.attrs and n.attrs['alt'] is not None, 'Every image needs alt (empty for decorative images)')
            require((n.attrs.get('src') or '').startswith('https://'), 'Production images require verified HTTPS media URLs')
            images.append({'src': n.attrs['src'], 'alt': n.attrs['alt']})
    questions = []
    for detail in parser.root.nodes('details'):
        summaries = list(detail.nodes('summary'))
        require(len(summaries) == 1 and summaries[0].text(), 'Each FAQ needs one nonempty summary')
        summary = summaries[0]
        require(summary in detail.children, 'FAQ summary must be a direct child')
        answer = ' '.join(' '.join(c.text() if isinstance(c, Node) else c for c in detail.children if c is not summary).split())
        require(answer, 'FAQ answer cannot be empty')
        questions.append({'@type': 'Question', 'name': summary.text(), 'acceptedAnswer': {'@type': 'Answer', 'text': answer}})
    require(len({q['name'] for q in questions}) == len(questions), 'Duplicate FAQ questions')
    if 'expectedFaqCount' in cfg:
        require(type(cfg['expectedFaqCount']) is int and cfg['expectedFaqCount'] >= 0, 'expectedFaqCount must be a nonnegative integer')
        require(len(questions) == cfg['expectedFaqCount'], 'FAQ count does not match the approved copy')
    require(not out.exists(), 'Output directory already exists; choose a new revision directory')
    renderer = '''/* Review build. Installation and publication require separate verification. */
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
'''.replace('__BODY__', json.dumps(body)).replace('__CSS__', json.dumps(css)).replace('__REVISION__', json.dumps(cfg['revision'])).replace('__TAG__', json.dumps(cfg['tagName']))
    snippet = '// CANDIDATE: merge into freshly captured page code. Preserve SEO, analytics and handlers.\n$w.onReady(function () {\n  $w(' + json.dumps('#' + cfg['elementId']) + ').seoMarkup = ' + json.dumps(body) + ';\n});\n'
    preview = '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>' + html.escape(cfg['serviceName'] + ' — Design Proof') + '</title><style>html,body{margin:0;background:#f7f1e8}main{width:100%;max-width:none}' + css + '</style></head><body><main>' + body + '</main></body></html>\n'
    files = {'body.html': body, 'style.css': css, 'renderer.js': renderer, 'WIX_SEO_SNIPPET_CANDIDATE.js': snippet, 'preview.html': preview}
    if questions:
        files['faq-schema.json'] = json.dumps({'@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': questions}, indent=2) + '\n'
    facts = {'status': 'BUILT / STATIC CHECKED; NOT VISUALLY TESTED, INSTALLED OR PUBLISHED', 'config': cfg, 'seo': {'title': cfg['seoTitle'], 'description': cfg['seoDescription'], 'canonical': cfg['pageUrl'], 'source': cfg.get('seoSource', 'UNVERIFIED; capture native baseline before installation')}, 'h1': headings[0].text(), 'faqCount': len(questions), 'links': links, 'images': images, 'files': {name: hashlib.sha256(content.encode()).hexdigest() for name, content in files.items()}, 'rendererBytes': len(renderer.encode())}
    out.mkdir(parents=True)
    for name, content in files.items():
        (out / name).write_text(content)
    (out / 'build-manifest.json').write_text(json.dumps(facts, indent=2) + '\n')
    return {'output': str(out.resolve()), 'h1Count': 1, 'faqCount': len(questions), 'rendererBytes': facts['rendererBytes'], 'installed': False, 'published': False}


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--config', type=Path, required=True)
    ap.add_argument('--out', type=Path, required=True)
    args = ap.parse_args()
    try:
        print(json.dumps(build(args.config, args.out)))
    except (ValueError, KeyError, OSError, json.JSONDecodeError) as exc:
        ap.exit(2, f'Build stopped: {exc}\n')
