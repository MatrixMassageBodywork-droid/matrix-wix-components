from pathlib import Path
import html,json,re
root=Path('/mnt/data/matrix_supplement_phase3')
base=Path('/mnt/data/matrix_supplements_r8/preview.html').read_text()
assert '<meta name="robots" content="noindex,nofollow">' in base
assert 'id="ms-monthly"' in base and 'id="ms-dispensary"' in base
fixture=[
 {'itemId':'TEST-PRODUCT-A','kind':'PRODUCT','publicName':'TEST ONLY — Vitamin sample','shortDescription':'Synthetic product. A quality-focused example selection, not for sale.','monthlyPriceCents':1200,'everydayPriceCents':1800,'releaseState':'TEST_ONLY_NEVER_PUBLIC'},
 {'itemId':'TEST-PRODUCT-B','kind':'PRODUCT','publicName':'TEST ONLY — Wellness sample','shortDescription':'Synthetic individual product. A placeholder for future approved SKUs.','monthlyPriceCents':800,'everydayPriceCents':1200,'releaseState':'TEST_ONLY_NEVER_PUBLIC'},
 {'itemId':'TEST-BUNDLE-AB','kind':'BUNDLE','publicName':'TEST ONLY — Curated duo','shortDescription':'Synthetic bundle containing two test products. Not available for purchase.','monthlyPriceCents':1800,'everydayPriceCents':2600,'releaseState':'TEST_ONLY_NEVER_PUBLIC'}
]
attr=html.escape(json.dumps(fixture,separators=(',',':')),quote=True)
widget=f'''\n<section class="ms-section" id="ms-v3-demo" aria-label="Private ordering preview" style="background:#eaf5f1;padding:38px 0 62px">
<div class="ms-wrap"><matrix-monthly-order-selector preview-mode="DEMO_ONLY" catalog-json="{attr}"></matrix-monthly-order-selector></div>
</section>\n'''
assert base.count('<section class="ms-section ms-pale ms-two-shopping-ways"')==1
base=base.replace('<section class="ms-section ms-pale ms-two-shopping-ways"',widget+'<section class="ms-section ms-pale ms-two-shopping-ways"',1)
js=(root/'ui/monthly-order-selector.js').read_text()
base=base.replace('</body></html>','<script>'+js+'</script></body></html>')
(root/'demo-preview.html').write_text(base)
(root/'tests/test-catalog-fixtures.json').write_text(json.dumps(fixture,indent=2))
print('preview_bytes',len(base),'test_items',len(fixture))
