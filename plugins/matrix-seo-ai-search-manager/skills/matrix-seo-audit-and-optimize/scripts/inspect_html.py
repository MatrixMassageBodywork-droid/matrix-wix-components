#!/usr/bin/env python3
"""Read-only observations from a saved HTML response. Does not execute JavaScript."""
import argparse
import hashlib
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse


class Inspector(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = []
        self.in_title = False
        self.h1s = []
        self.h1 = None
        self.meta = []
        self.canonicals = []
        self.links = []
        self.images = []
        self.iframes = []
        self.jsonld = []
        self.script = None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'title':
            self.in_title = True
        elif tag == 'h1':
            self.h1 = []
        elif tag == 'meta':
            self.meta.append(a)
        elif tag == 'link' and 'canonical' in a.get('rel', '').lower().split():
            self.canonicals.append(a.get('href'))
        elif tag == 'a' and a.get('href'):
            self.links.append({'href': a['href'], 'rel': a.get('rel', '')})
        elif tag == 'img':
            self.images.append({'src': a.get('src'), 'alt': a.get('alt')})
        elif tag == 'iframe':
            self.iframes.append({'src': a.get('src'), 'title': a.get('title')})
        elif tag == 'script' and a.get('type', '').lower().strip() == 'application/ld+json':
            self.script = []

    def handle_data(self, data):
        if self.in_title:
            self.title.append(data)
        if self.h1 is not None:
            self.h1.append(data)
        if self.script is not None:
            self.script.append(data)

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False
        elif tag == 'h1' and self.h1 is not None:
            self.h1s.append(' '.join(''.join(self.h1).split()))
            self.h1 = None
        elif tag == 'script' and self.script is not None:
            raw = ''.join(self.script)
            try:
                self.jsonld.append({'valid_json': True, 'data': json.loads(raw)})
            except ValueError as exc:
                self.jsonld.append({'valid_json': False, 'error': str(exc)})
            self.script = None


def inspect(raw, url=None):
    p = Inspector()
    p.feed(raw.decode('utf-8', errors='replace'))
    links = []
    for link in p.links:
        resolved = urljoin(url, link['href']) if url else link['href']
        links.append({**link, 'resolved': resolved,
                      'same_host': urlparse(resolved).netloc == urlparse(url).netloc if url else None})
    return {
        'url': url, 'sha256': hashlib.sha256(raw).hexdigest(),
        'method': 'static saved HTML; no JavaScript execution or HTTP header inspection',
        'title': ''.join(p.title).strip(), 'h1s': p.h1s,
        'descriptions': [x.get('content') for x in p.meta if x.get('name', '').lower() == 'description'],
        'robots_meta': [x for x in p.meta if x.get('name', '').lower() in ('robots', 'googlebot')],
        'canonicals': p.canonicals, 'jsonld': p.jsonld, 'links': links,
        'images': p.images, 'images_missing_alt_attribute': sum(x['alt'] is None for x in p.images),
        'iframes': p.iframes,
        'limitations': ['No indexing or ranking inference', 'No rendered layout validation',
                       'JSON parse validity is not schema or rich-result validity']
    }


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('html_file', type=Path)
    ap.add_argument('--url')
    args = ap.parse_args()
    print(json.dumps(inspect(args.html_file.read_bytes(), args.url), indent=2, ensure_ascii=False))
