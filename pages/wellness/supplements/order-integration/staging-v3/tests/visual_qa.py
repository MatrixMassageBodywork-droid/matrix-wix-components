from pathlib import Path
import asyncio,json
from playwright.async_api import async_playwright
base=Path('/mnt/data/matrix_supplement_phase3')
async def main():
 checks=[]
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
  for width in [320,375,390,700,1280,1440,1920]:
   page=await browser.new_page(viewport={'width':width,'height':920},device_scale_factor=1)
   errs=[]
   page.on('pageerror',lambda e:errs.append(str(e)))
   await page.route('https://**/*',lambda route:route.abort())
   await page.set_content((base/'demo-preview.html').read_text(),wait_until='load')
   await page.locator('matrix-monthly-order-selector').wait_for(state='visible')
   await page.wait_for_timeout(160)
   layout=await page.evaluate('''() => {
      const e=document.querySelector('matrix-monthly-order-selector');
      const d=e.shadowRoot;
      const logo=document.querySelector('.ms-logo-panel img');
      return {scrollWidth:document.documentElement.scrollWidth,viewWidth:window.innerWidth,
        logoLoaded:logo.complete&&logo.naturalWidth>0,
        choices:d.querySelectorAll('.ms3-item').length,
        closed:!!d.querySelector('.ms3-btn:disabled[aria-label="Customer ordering is closed"]'),
        cards:document.querySelectorAll('.ms-feature').length,
        faqs:document.querySelectorAll('#ms-faq details').length,
        vendorVisible:/fullscript|square/i.test(document.body.innerText)
      }
    }''')
   assert layout['scrollWidth'] <= layout['viewWidth']+2,(width,layout)
   assert layout['logoLoaded'] and layout['choices']==3 and layout['closed'] and layout['cards']==2 and layout['faqs']==8 and not layout['vendorVisible'],(width,layout)
   assert not errs,(width,errs)
   if width in (390,1440):
     await page.locator('#ms-v3-demo').screenshot(path=str(base/'evidence'/f'order-demo-{width}.png'))
   checks.append({'width':width,**layout,'pageErrors':errs})
   if width==1440:
     events=[]
     await page.evaluate("window.addEventListener('matrix-cart-preview', e => window.lastMatrixPreview=e.detail)")
     el=page.locator('matrix-monthly-order-selector')
     vitamin=el.locator('article[data-item="TEST-PRODUCT-A"] button[data-change="1"]')
     bundle=el.locator('article[data-item="TEST-BUNDLE-AB"] button[data-change="1"]')
     await vitamin.click(); await vitamin.click(); await bundle.click()
     await el.locator('#preview').click()
     assert await el.locator('[data-monthly]').inner_text()=='$42.00'
     assert await el.locator('[data-everyday]').inner_text()=='$62.00'
     assert await el.locator('[data-savings]').inner_text()=='$20.00'
     assert 'No request was sent' in await el.locator('#summary').inner_text()
     result=await page.evaluate('window.lastMatrixPreview')
     assert result['requestSent'] is False and result['previewOnly'] is True and len(result['cart'])==2
     await el.screenshot(path=str(base/'evidence'/'order-demo-selected-1440.png'))
     checks.append({'interaction':'2×Vitamin + 1×bundle','monthlyCents':4200,'everydayCents':6200,'savingsCents':2000,'requestSent':False})
   await page.close()
  await browser.close()
 (base/'evidence'/'visual-qa.json').write_text(json.dumps({'passed':True,'results':checks},indent=2))
 print(json.dumps({'passed':True,'viewports':7,'interaction':checks[-1]},indent=2))
asyncio.run(main())
