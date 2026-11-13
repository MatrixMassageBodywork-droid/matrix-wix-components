"""Rebuild the R3 correction from the frozen R2 source. No network or live writes."""
from pathlib import Path
import argparse, base64, hashlib, json

def build(base: Path, assets: Path, out: Path) -> None:
    if out.exists():
        raise ValueError('Choose a new output directory; never overwrite an installed release.')
    body = (base / 'body.html').read_text()
    old = (base / 'style.css').read_text()
    renderer = (base / 'renderer.js').read_text()
    digest = lambda text: hashlib.sha256(text.encode()).hexdigest()
    if digest(body) != '21df0a2c4477e1bd3980f2a3a32e4b6ac365b53720e00a62f6edf3284ac8252f' or digest(old) != '9c304342ffff74e6b891b1b7f777c68faa6bee01eaf3e2329cd086ee770bffd2':
        raise ValueError('R2 baseline changed; reconcile before rebuilding.')
    water = 'https://static.wixstatic.com/media/11062b_2413040bb0e142369d76f3878b966792~mv2.jpeg'
    logo = 'https://static.wixstatic.com/media/e4cc43_c35a32fb07bc4445bb822ed185350e25~mv2.jpg'
    oldhero = '.matrix-supplements .ms-hero{padding:40px 0 62px;text-align:center}'
    newhero = '.matrix-supplements .ms-hero{padding:40px 0 62px;text-align:center;background-color:#102e30;background-image:linear-gradient(110deg,rgba(3,37,40,.88),rgba(5,64,65,.67),rgba(4,31,35,.84)),url("' + water + '");background-size:cover;background-position:center}'
    oldlogo = '.matrix-supplements .ms-logo-panel img{display:block;width:100%;height:100%;object-fit:contain;color:#123d40;font:16px Arial}'
    newlogo = '.matrix-supplements .ms-logo-panel img{display:block;width:100%;height:100%;object-fit:cover;object-position:center;color:#123d40;font:16px Arial}'
    if old.count(oldhero) != 1 or old.count(oldlogo) != 1 or renderer.count(json.dumps(old)) != 1:
        raise ValueError('Expected exact source tokens not found.')
    css = old.replace(oldhero, newhero).replace(oldlogo, newlogo)
    renderer = renderer.replace(json.dumps(old), json.dumps(css), 1).replace("version:'review-2-2026-11-13'", "version:'review-3-hero-fix-2026-11-13'")
    expected = {'style.css': '46c83109f0eaf790f60ef2b3158d8ac7710d7d9078ccc45e62ce759375fb24a2', 'renderer.js': 'c728c012f4e39e04a373ad16c4cf4563731817c90bbc183751d96239c9976f3d'}
    assert digest(css) == expected['style.css'] and digest(renderer) == expected['renderer.js']
    def data_uri(name: str, mime: str, sha: str) -> str:
        data = (assets / name).read_bytes()
        if hashlib.sha256(data).hexdigest() != sha:
            raise ValueError('Asset hash mismatch: ' + name)
        return 'data:' + mime + ';base64,' + base64.b64encode(data).decode()
    logo_uri = data_uri('matrix-approved-logo-original.jpg', 'image/jpeg', '7ffb947caea7309fb8e4c42b24049b75b5f421e338711568a0085b4c39417708')
    water_uri = data_uri('matrix-water-background.webp', 'image/webp', '96e7e516c09fbe7fbe41d4c3459d4b7ba527fe39b0f7931593b0ca07d6da4104')
    head = '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Matrix Supplements — Corrected Review 3</title>'
    wrapper = 'html,body{margin:0;background:#f7f1e8}.review-notice{background:#faf7f0;color:#123d40;text-align:center;padding:10px 20px;font:12px/1.6 Arial;border-bottom:1px solid #d8dfd9}main{width:100%;max-width:none}'
    notice = '<aside class="review-notice">DESIGN REVIEW 3 · NOT LIVE · Logo and water corrected · Preorders remain closed</aside>'
    proof = '<!doctype html><html lang="en"><head>' + head + '<style>' + wrapper + css.replace(water, water_uri) + '</style></head><body>' + notice + '<main>' + body.replace(logo, logo_uri) + '</main></body></html>'
    assert digest(proof) == 'f7067bda353a3fa3add4492446a69af335e90f7de700f2f4fa984daa222e8b9e'
    out.mkdir(parents=True)
    files = {'body.html': body, 'style.css': css, 'renderer.js': renderer, 'preview.html': proof, 'WIX_SEO_SNIPPET_CANDIDATE.js': (base / 'WIX_SEO_SNIPPET_CANDIDATE.js').read_text()}
    for name, text in files.items():
        (out / name).write_text(text)
    (out / 'sha256.json').write_text(json.dumps({name: digest(text) for name, text in files.items()}, indent=2))

if __name__ == '__main__':
    here = Path(__file__).resolve().parent
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base', type=Path, default=here.parent)
    parser.add_argument('--assets', type=Path, default=here / 'assets')
    parser.add_argument('--out', type=Path, default=here / 'generated')
    args = parser.parse_args()
    build(args.base, args.assets, args.out)
