from pathlib import Path
import json,shutil

HERE=Path(__file__).resolve().parent
BASE=HERE.parent
OUT=Path('/workspace/scratch/24b9db76697d/review-preview')
OUT.mkdir(exist_ok=True)
(OUT/'.openai').mkdir(exist_ok=True)
(OUT/'.openai/hosting.json').write_text(json.dumps({'static':{'directory':'dist'}}))
DIST=OUT/'dist'
DIST.mkdir(exist_ok=True)
chrome='''<style>.review-bar{font:12px/1.5 Arial,sans-serif;background:#102e30;color:#fff;padding:13px 24px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap}.review-bar nav{display:flex;gap:24px}.review-bar a{color:#fff;text-underline-offset:4px;min-height:32px;align-content:center}.review-bar span{font-size:11px;color:#d8e7df}@media(max-width:650px){.review-bar{padding:12px 20px;gap:8px}.review-bar nav{gap:22px}}</style><aside class="review-bar"><div><strong>Matrix · Draft review</strong><br><span>Page body preview · Your existing site header, footer and reviews stay in place.</span></div><nav aria-label="Draft pages"><a href="facials.html">Facials</a><a href="head-spa.html">Head Spa</a><a href="waxing.html">Waxing</a></nav></aside>'''
for key in ['facials','head-spa','waxing']:
    p=BASE/key/'review-1/preview.html'
    full=p.read_text().replace('<body>','<body>'+chrome)
    (BASE/key/'review-1/review-preview.html').write_text(full)
    (DIST/f'{key}.html').write_text(full)
    if key=='facials':(DIST/'index.html').write_text(full)
print(str(OUT))
