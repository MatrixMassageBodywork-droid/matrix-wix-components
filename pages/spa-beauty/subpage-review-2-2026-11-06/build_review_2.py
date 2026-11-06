from pathlib import Path
import importlib.util,html,json,re,base64,mimetypes,subprocess,hashlib
ROOT=Path(__file__).resolve().parents[3]; FAM=ROOT/'pages/spa-beauty'; PACK=FAM/'subpage-review-2-2026-11-06'
spec=importlib.util.spec_from_file_location('builder',ROOT/'plugins/matrix-page-builder/skills/matrix-page-workflow/scripts/build_page.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
REV='f9c063da3d7970ff13667252772af99c2874585e';CDN=f'https://cdn.jsdelivr.net/gh/MatrixMassageBodywork-droid/matrix-wix-components@{REV}/'
WATER=CDN+'pages/massage/manual-lymphatic-drainage/assets/matrix-water-background.webp';LOGO=CDN+'pages/massage/deep-tissue/assets/matrix-bodywork-approved.jpg'
def parse(s):
 p=m.PageParser();p.feed(s);p.close();return p.root

def ser(n):
 if isinstance(n,str):return html.escape(n,quote=False)
 if not n.tag:return ''.join(map(ser,n.children))
 a=''.join(' '+k+'="'+html.escape(v or '',quote=True)+'"' for k,v in n.attrs.items())
 return '<'+n.tag+a+'>'+('' if n.tag in m.PageParser.VOID else ''.join(map(ser,n.children))+'</'+n.tag+'>')
def has(n,cl):return cl in n.attrs.get('class','').split()
def cl(root,name):return next(n for n in root.nodes() if has(n,name))
def nid(root,name):return next(n for n in root.nodes() if n.attrs.get('id')==name)
def settext(n,s):n.children=[s]
def new(s):return parse(s).children[0]
def pic(key,name,alt,cls=''):
 return '<img'+(' class="'+cls+'"' if cls else '')+' src="'+CDN+f'pages/spa-beauty/{key}/assets/review-2/{name}.webp'+'" alt="'+html.escape(alt,quote=True)+'" width="1200" height="1000" loading="lazy">'

data={
 'facials':dict(service='Facials',hero='facial-mask',heroalt='A professional facial mask treatment from the Matrix treatment photo collection.',caption='Care for your skin. Time for yourself.',lead='Dryness, breakouts, a tired-looking complexion—or simply time for yourself. Your facial starts with your skin and what you want from your visit.',waterhead='A closer look at your skincare.',waterlead='Professional products. Personal attention. We choose your care around what your skin needs today.',gallery=[('circadia-serums','Circadia serums and professional skincare products at Matrix.','Circadia skincare','Products selected around your skin and your goals.'),('circadia-hydration','Circadia hydration skincare in the Matrix product collection.','Hydration & comfort','A softer, replenished feel with care chosen for you.')],supportid='acne-prone-skin',support='facial-treatment',supportalt='A facial treatment in progress from the Matrix treatment photo collection.',localtitle='Your facial appointment, here in Salem.',local='Looking for facials near Union Grove, Twin Lakes, Trevor, Bristol or Antioch? Come to our Salem, Wisconsin studio for personalized skincare, including care for acne-prone skin. All appointments take place at Matrix Massage & Bodywork, 24804 75th St—not at separate locations in those towns.',desc='Custom and acne-prone skin facials in Salem, WI. Welcoming Union Grove, Twin Lakes, Trevor, Bristol and Antioch to Matrix Massage & Bodywork.'),
 'head-spa':dict(service='Head Spa',hero='matrix-waterfall',heroalt='The Japanese Head Spa waterfall basin during a Matrix scalp treatment in Salem, Wisconsin.',caption='Warm water. A little quiet. Your time.',lead='Let your shoulders drop. Enjoy warm water, scalp massage and care chosen for your scalp and hair—all at an easier pace.',waterhead='Step into the Matrix Head Spa.',waterlead='A look inside our scalp-care experience, from hands-on care to the infusions selected for your visit.',gallery=[('matrix-scalp-care','A Matrix provider performing a Head Spa treatment at the Salem studio.','Care, from the scalp down','A relaxing treatment shaped around your scalp and comfort.'),('matrix-products','Matrix Precision Scalp Infusions displayed in the Salem studio.','Our scalp-care collection','Customized infusions selected as part of your Head Spa.')],supportid='infusions',support='matrix-infusions',supportalt='Matrix Precision Scalp Infusions M1 through M6 with amber bottles and labeled vials.',localtitle='Japanese Head Spa near you, in Salem.',local='Our Salem studio welcomes Head Spa guests from Union Grove, Twin Lakes, Trevor, Bristol and nearby Antioch, Illinois. Whether you want a shorter scalp refresh or time for a longer ritual, choose your experience and visit us at 24804 75th St, Salem, WI 53168.',desc='Japanese Head Spa in Salem, WI with waterfall therapy, scalp massage and custom infusions. Near Bristol, Trevor, Twin Lakes, Union Grove and Antioch.'),
 'waxing':dict(service='Waxing',hero='wax-preparation',heroalt='Illustrative close-up of wax preparation with a clean wooden applicator, black warmer and teal towel.',caption='The little details make a difference.',lead='A smooth finish, careful attention and a provider who checks in with you. Choose face or body waxing in our Salem studio.',waterhead='Small details. A polished finish.',waterlead='From preparing the skin to checking your comfort, each step gets the attention it deserves.',gallery=[('brow-detail','Illustrative close-up of careful eyebrow waxing with a fresh wooden applicator.','Thoughtful facial waxing','Careful application and attention to your chosen area.')],supportid=None,localtitle='Face & body waxing in Salem, Wisconsin.',local='Make Matrix your Salem stop for waxing near Union Grove, Twin Lakes, Trevor, Bristol and Antioch. We offer face and body waxing at one studio: 24804 75th St, Salem, WI 53168. Choose your area in the booking menu, or text us if you need help finding the right appointment.',desc='Face and body waxing in Salem, WI. Visit Matrix from Union Grove, Twin Lakes, Trevor, Bristol and Antioch for personalized hair removal.')
}
basecss=(FAM/'facials/review-1/style.css').read_text()
extra=r'''
.ROOT .hero{min-height:720px;border-top:20px solid transparent;border-image:linear-gradient(90deg,#11696a,#0f3b3c) 1}
.ROOT .logo{object-fit:contain}
.ROOT .hero-copy{padding-top:30px;padding-bottom:42px}
.ROOT .hero-photo>img{object-position:center}
.ROOT .hero .lead{font-size:17px}
.ROOT .water-story,.ROOT .close{background-color:#0c4345;background-image:linear-gradient(105deg,rgba(3,44,47,.70),rgba(8,76,79,.48)),url('WATER');background-size:cover;background-position:center}
.ROOT .water-story{padding:75px 0;color:white}
.ROOT .water-story .section-intro{max-width:690px;margin-bottom:35px}
.ROOT .water-story .section-intro>p:last-child{color:#f1f5ee}
.ROOT .photo-grid{display:grid;grid-template-columns:1fr 1fr;gap:30px}
.ROOT .photo-card{background:var(--cream);color:var(--ink);overflow:hidden}
.ROOT .photo-card img{width:100%;height:370px;display:block;object-fit:cover}
.ROOT .photo-card figcaption{padding:24px 28px 27px}
.ROOT .photo-card h3{font-size:32px;margin-bottom:10px}
.ROOT .photo-card p{font-size:14px;color:#435d56}
.ROOT .photo-grid.single{max-width:940px;margin:auto;grid-template-columns:1fr}
.ROOT .photo-grid.single .photo-card{display:grid;grid-template-columns:1.3fr 1fr;align-items:center}
.ROOT .photo-grid.single img{height:360px}
.ROOT .local-visit{background:#e7eeea;border-top:1px solid #ccd8d0;border-bottom:1px solid #ccd8d0}
.ROOT .local-inner{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.ROOT .local-copy>p{font-size:15px;line-height:1.9;color:#3b5751}
.ROOT .local-copy .text-link{margin-top:18px}
.ROOT .close{padding-top:85px;padding-bottom:70px}
.ROOT .close h2,.ROOT .water-story h2{text-shadow:0 2px 18px #062a2b88}
.ROOT .close p:not(.eyebrow){color:#fff}
.ROOT .image-note{font-size:11px;margin-top:18px;text-align:center;color:#edf4ef}
.ROOT .hero-facts{font-size:12px;line-height:1.8}
@container(max-width:950px){.ROOT .photo-card img{height:310px}.ROOT .local-inner{gap:35px}.ROOT .hero{min-height:700px}}
@container(max-width:650px){.ROOT .hero{border-top-width:14px;min-height:0}.ROOT .hero-copy{padding:24px 23px 36px}.ROOT .hero h1{font-size:44px}.ROOT .hero .lead{font-size:15px}.ROOT .hero-photo{height:390px}.ROOT .water-story{padding:55px 0}.ROOT .photo-grid,.ROOT .local-inner{grid-template-columns:1fr;gap:25px}.ROOT .photo-card img{height:290px}.ROOT .photo-card figcaption{padding:23px}.ROOT .photo-grid.single .photo-card{display:block}.ROOT .photo-grid.single img{height:290px}.ROOT .local-inner{gap:24px}.ROOT .close{padding:60px 23px 48px}.ROOT .local-copy>p{font-size:14px}}
'''
for key,d in data.items():
 p=FAM/key;root=parse((p/'review-1/body.html').read_text());outer=root.children[0]
 settext(cl(root,'breadcrumb'),'Spa & Beauty / '+d['service'])
 logo=cl(root,'logo');logo.attrs['src']=LOGO
 heroimg=next(cl(root,'hero-photo').nodes('img'));heroimg.attrs.update(src=CDN+f'pages/spa-beauty/{key}/assets/review-2/{d["hero"]}.webp',alt=d['heroalt'],width='1200',height='1600')
 settext(cl(root,'lead'),d['lead']);settext(cl(root,'image-caption'),d['caption'])
 for n in root.nodes():
  if n.tag=='h3' and n.text()=='New Client Facial with Lexy':settext(n,'New Client Facial')
 if d.get('supportid'):
  im=next(nid(root,d['supportid']).nodes('img'));im.attrs.update(src=CDN+f'pages/spa-beauty/{key}/assets/review-2/{d["support"]}.webp',alt=d['supportalt'])
 gallery=''.join('<figure class="photo-card">'+pic(key,name,alt)+'<figcaption><h3>'+title+'</h3><p>'+copy+'</p></figcaption></figure>' for name,alt,title,copy in d['gallery'])
 water='<section class="water-story"><div class="inner"><div class="section-intro"><p class="eyebrow">'+('A CLOSER LOOK' if key=='waxing' else 'FROM OUR SALEM STUDIO')+'</p><h2>'+d['waterhead']+'</h2><p>'+d['waterlead']+'</p></div><div class="photo-grid'+(' single' if len(d['gallery'])==1 else '')+'">'+gallery+'</div>'+('<p class="image-note">Waxing images are illustrative.</p>' if key=='waxing' else '')+'</div></section>'
 # Water immediately after navigation, visible before any long service section.
 jump=cl(root,'jump');outer.children.insert(outer.children.index(jump)+1,new(water))
 local='<section class="section local-visit" id="visit-salem"><div class="inner local-inner"><div><p class="eyebrow">ONE STUDIO, CLOSE TO HOME</p><h2>'+d['localtitle']+'</h2></div><div class="local-copy"><p>'+d['local']+'</p><a class="text-link" href="sms:+12629399325">TEXT MATRIX · 262-939-9325</a></div></div></section>'
 faq=cl(root,'faq');outer.children.insert(outer.children.index(faq),new(local))
 details=list(root.nodes('details'));last=details[-1];summary=next(last.nodes('summary'));settext(summary,'Where can I book '+('a facial' if key=='facials' else 'a Head Spa' if key=='head-spa' else 'waxing')+' near Union Grove, Twin Lakes or Antioch?')
 ans=next(last.nodes('p'));settext(ans,'Visit Matrix Massage & Bodywork at 24804 75th St, Salem, WI 53168. Our Salem studio serves Salem Lakes, Paddock Lake, Union Grove, Twin Lakes, Trevor, Bristol and nearby Antioch, Illinois. All appointments are at this Salem location. Book online or text 262-939-9325.')
 ill=cl(root,'illustration');ill.children=['Waxing images are illustrative.'] if key=='waxing' else []
 if key!='waxing':cl(root,'close-inner').children.remove(ill)
 body=ser(root)+'\n';css=(p/'review-1/style.css').read_text()
 # Replace damaged/widely cropped water with verified intact pinned texture.
 css=css.replace('https://static.wixstatic.com/media/11062b_2413040bb0e142369d76f3878b966792~mv2.jpeg',WATER)
 css+='\n'+extra.replace('ROOT','matrix-'+key).replace('WATER',WATER)
 if key=='facials':css+='\n.matrix-facials #acne-prone-skin .split>img{object-position:center 30%}\n'
 if key=='head-spa':css+='\n.matrix-head-spa .hero-photo>img{object-position:center 50%}.matrix-head-spa #infusions .split>img{object-fit:contain;background:#101617}.matrix-head-spa .photo-card:nth-child(2) img{object-fit:contain;background:#17201e}\n'
 cfg=json.loads((p/'page-config.json').read_text());cfg['revision']='review-2-2026-11-06';cfg['seoDescription']=d['desc']
 (p/'body.html').write_text(body);(p/'style.css').write_text(css);(p/'page-config.json').write_text(json.dumps(cfg,indent=2)+'\n')
 print(m.build(p/'page-config.json',p/'review-2'))
# Asset copies remain pinned to existing committed paths. Proof only: embed every asset for reliable phone viewing.
proofs=PACK/'proofs';proofs.mkdir(exist_ok=True)
bar='''<style>.review-bar{font:12px/1.5 Arial,sans-serif;background:#102e30;color:#fff;padding:12px 24px;display:flex;gap:12px;justify-content:space-between;align-items:center;flex-wrap:wrap}.review-bar nav{display:flex;gap:20px;flex-wrap:wrap}.review-bar a{color:white;min-height:32px;align-content:center}.review-bar span{font-size:11px;color:#dce8df}.review-bar a[aria-current=page]{text-decoration-thickness:3px}</style><aside class="review-bar"><div><strong>Matrix · Revised draft</strong><br><span>Page body preview · Existing Wix header, footer and reviews stay in place.</span></div><nav aria-label="Review pages"><a href="facials.html">Facials</a><a href="head-spa.html">Head Spa</a><a href="waxing.html">Waxing</a></nav></aside>'''
for key in data:
 s=(FAM/key/'review-2/preview.html').read_text();s=s.replace('<body>','<body>'+bar.replace('href="'+key+'.html"','aria-current="page" href="'+key+'.html"'))
 urls=set(re.findall(r'https://[^\s\"\'<>]+',s));count=0
 for u in urls:
  if '/matrix-wix-components@' not in u:continue
  path=u.split('/matrix-wix-components@')[1].split('/',1)[1];f=ROOT/path
  if not f.is_file():raise ValueError('Missing proof asset '+str(f))
  mime=mimetypes.guess_type(str(f))[0] or 'application/octet-stream'
  s=s.replace(u,'data:'+mime+';base64,'+base64.b64encode(f.read_bytes()).decode());count+=1
 (proofs/(key+'.html')).write_text(s)
 print('self-contained',key,len(s),count)
# Browser QA uses complete same-origin iframe documents at deterministic widths.
qa=PACK/'qa';qa.mkdir(exist_ok=True)
for width in [320,390,1280,1440,1920]:
 for key in data:
  (proofs/f'{key}-{width}.html').write_text(f'<!doctype html><html><head><meta name="robots" content="noindex,nofollow"><style>html,body{{margin:0;background:#d6ddd7}}iframe{{display:block;border:0;width:{width}px;height:900px;margin:auto}}</style></head><body><iframe title="{key} at {width} pixels" src="{key}.html"></iframe></body></html>')
(proofs/'index.html').write_text('<!doctype html><html><head><meta http-equiv="refresh" content="0;url=facials.html"><meta name="robots" content="noindex,nofollow"></head><body><a href="facials.html">Review Facials, Head Spa and Waxing</a></body></html>')
