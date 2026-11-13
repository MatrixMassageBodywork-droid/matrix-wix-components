"""Read-only public HTML parsing helpers; standard library only."""
from html.parser import HTMLParser
import hashlib
import json


class Node:
    def __init__(self, tag="", attrs=()):
        self.tag, self.attrs, self.children = tag, dict(attrs), []

    def nodes(self, tag=None):
        for child in self.children:
            if isinstance(child, Node):
                if tag is None or child.tag == tag:
                    yield child
                yield from child.nodes(tag)

    def text(self, exclude_script=True):
        if exclude_script and self.tag in {"script", "style"}:
            return ""
        return " ".join(" ".join(c.text(exclude_script) if isinstance(c, Node) else c
                                 for c in self.children).split())

    def raw_text(self):
        return "".join(c.raw_text() if isinstance(c, Node) else c for c in self.children)


class Parser(HTMLParser):
    VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}

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
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                del self.stack[index:]
                break

    def handle_data(self, data):
        self.stack[-1].children.append(data)


def parse(html):
    parser = Parser()
    parser.feed(html)
    parser.close()
    return parser.root


def walk(value, path):
    if isinstance(value, dict):
        for key, child in value.items():
            next_path = f"{path}.{key}"
            yield next_path, key, child
            if isinstance(child, (dict, list)):
                yield from walk(child, next_path)
    elif isinstance(value, list):
        for index, child in enumerate(value):
            if isinstance(child, (dict, list)):
                yield from walk(child, f"{path}[{index}]")


def inspect(html):
    root = parse(html)
    head = next(root.nodes("head"), Node())
    json_scripts, revision_hits, seo_markups = [], [], []
    for node in root.nodes("script"):
        if node.attrs.get("type") == "application/json":
            try:
                data = json.loads(node.raw_text())
            except ValueError:
                continue
            sid = node.attrs.get("id", "")
            json_scripts.append({"id": sid, "keys": list(data)[:25] if isinstance(data, dict) else "array"})
            for path, key, value in walk(data, sid):
                if "revision" in key.lower() and not isinstance(value, (dict, list)):
                    revision_hits.append({"path": path, "value": value})
                if key == "seoMarkup" and isinstance(value, str):
                    seo_markups.append({"path": path, "bytes": len(value.encode()),
                                        "sha256": hashlib.sha256(value.encode()).hexdigest(),
                                        "root": value[:80], "value": value})
    return root, {
        "title": next((n.text() for n in head.nodes("title")), None),
        "headMeta": [node.attrs for node in head.nodes("meta")],
        "headLinks": [node.attrs for node in head.nodes("link")],
        "jsonScripts": json_scripts,
        "revisionHits": revision_hits,
        "seoMarkup": seo_markups,
    }
