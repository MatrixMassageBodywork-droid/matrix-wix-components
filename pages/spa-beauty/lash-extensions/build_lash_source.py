"""Author the lash page from verified public booking data. No live Wix writes."""
from pathlib import Path
import json, re
from html import escape

P = Path(__file__).parent
SITE = 'https://www.matrixmassage.net'
HUB = SITE + '/spa-and-beauty-services-salem-wi'
URL = HUB + '/eyelash-extensions-salem-wi'
BOOK = 'https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services'
SMS = 'sms:+12629399325'
ASSET = 'https://cdn.jsdelivr.net/gh/MatrixMassageBodywork-droid/matrix-wix-components@e949d41c1b782c57d5002c4d514ce0d4f3675c6e/pages/spa-beauty/lash-extensions/assets/'
LOGO = 'https://static.wixstatic.com/media/e4cc43_c35a32fb07bc4445bb822ed185350e25~mv2.jpg'
MAP = 'https://www.google.com/maps/dir/?api=1&destination=24804+75th+St,+Salem,+WI+53168'
snapshot = (P/'baseline/square-live-menu.txt').read_text()
services = []
for label, href in re.findall(r'  - link "([^\n]+)":\n    - /url: ([^\n]+)', snapshot):
    if re.match(r'(Classic|Hybrid|Volume) Lash Extensions \|', label):
        style = label.split()[0]
        visit = re.search(r'\| (Full Set|[123]-Week Fill)',label).group(1)
        price = int(re.search(r'\$(\d+)\.00', label).group(1))
        services.append(dict(style=style,visit=visit,price=price,minutes=60 if visit=='Full Set' else 45,url='https://book.squareup.com'+href))
assert len(services)==12
(P/'baseline/verified-services.json').write_text(json.dumps(services,indent=2))
def svc(style,visit='Full Set'):
    return next(s for s in services if s['style']==style and s['visit']==visit)
def a(text,url,cls='text-link'):
    return f'<a class="{cls}" href="{escape(url,quote=True)}">{escape(text)}</a>'
def img(name,alt,cls='',eager=False):
    dims={'classic':(1178,1081),'hybrid':(1206,791),'volume':(1206,796)}[name]
    return f'<img class="{cls}" src="{ASSET}{name}.webp" alt="{escape(alt)}" width="{dims[0]}" height="{dims[1]}" loading="{"eager" if eager else "lazy"}">'

cards=[]
for name,eyebrow,copy in [
 ('Classic','SOFT & DEFINED','A softly defined, polished lash line. A lovely place to start when you want a natural-looking finish that still feels like you.'),
 ('Hybrid','TEXTURED & FULLER','A textured, fuller-looking lash line with a little more presence. Choose Hybrid when you want something between subtle and bold.'),
 ('Volume','FULL & DRAMATIC','Fuller definition and a more dramatic finish. Choose Volume when you love a noticeable lash line and a bolder look.')]:
    s=svc(name)
    cards.append(f'<article class="style-card">{img(name.lower(),name+" lash extensions from the Matrix lash photo collection")}<div class="card-copy"><p class="eyebrow">{eyebrow}</p><h3>{name} lash extensions</h3><p>{copy}</p><p class="price">${s["price"]}<span> / full set · 60 minutes</span></p>{a("Book "+name+" Lashes",s["url"],"button")}</div></article>')

rows=[]
for visit in ['Full Set','1-Week Fill','2-Week Fill','3-Week Fill']:
    cells=''.join('<td>'+a('$'+str(svc(style,visit)['price']),svc(style,visit)['url'],'price-link')+'</td>' for style in ['Classic','Hybrid','Volume'])
    rows.append(f'<tr><th scope="row">{visit}<span>{"60" if visit=="Full Set" else "45"} minutes</span></th>{cells}</tr>')

faqs=[
 ('Where can I get eyelash extensions near Salem and Paddock Lake, WI?',
  '<p>Matrix Massage &amp; Bodywork offers Classic, Hybrid and Volume eyelash extensions at 24804 75th St, Salem, WI 53168. Our Salem studio welcomes clients from Paddock Lake and the surrounding Salem Lakes area. Choose a full set or fill online, or text 262-939-9325 for help.</p>'),
 ('How much do lash extensions cost at Matrix?',
  '<p>Classic full sets are $170, Hybrid full sets are $200 and Volume full sets are $220. One-, two- and three-week fills range from $55 to $95, depending on style and timing. See the pricing table above and confirm the current service price in the booking menu.</p>'),
 ('Should I choose Classic, Hybrid or Volume lashes?',
  '<p>Classic gives a softly defined, natural-looking finish. Hybrid adds texture and a fuller look. Volume gives fuller definition and a more dramatic finish. Tell your lash technician how subtle or bold you want your lashes to look so you can discuss a style that works with your natural lashes.</p>'),
 ('Can I ask questions before booking?',
  '<p>Yes. Text Matrix at 262-939-9325 with questions about lash styles, full sets or fills. We can help you choose an appointment before you book. Current availability is shown in the online booking menu.</p>'),
 ('How long does a lash appointment take?',
  '<p>The current booking menu lists full sets at 60 minutes and fill appointments at 45 minutes. Check the appointment details when reserving. If you already have extensions or are unsure which service to select, contact us before booking.</p>'),
 ('How often should I book a lash fill?',
  '<p>Matrix offers one-, two- and three-week fills for Classic, Hybrid and Volume lashes. The right interval depends on your natural lash shedding, how many extensions remain and the look you want to maintain. Ask your lash technician which appointment fits your lashes.</p>'),
 ('Can I book a fill if another salon applied my lashes?',
  '<p>Please text Matrix before booking. Let us know your current lash style, when it was applied and how your lashes look now. We can help you choose an appointment after reviewing what is needed; a fill may not be the right service for every existing set.</p>'),
 ('What should I do before my first lash appointment?',
  '<p>Arrive with clean lashes and no mascara or eye makeup. Tell us about previous adhesive reactions or eye-area sensitivity before your visit. If you have an eye infection or inflamed skin around your eyes, wait until it has healed and contact the studio before booking.</p>'),
 ('How do I care for eyelash extensions?',
  '<p>Follow the aftercare directions provided for your set, including cleansing, brushing and guidance about water, steam and eye products. Avoid rubbing, pulling or picking at extensions. Ask before using a new lash serum, oil or makeup remover with your set.</p>'),
 ('Are lash extensions the same as a lash lift?',
  '<p>No. Extensions add fibers to your natural lashes for a chosen length and fullness; a lash lift changes the curl of your existing lashes. This page is for Matrix Classic, Hybrid and Volume lash extensions and their maintenance fills.</p>'),
 ('Can I get a natural-looking set for everyday wear?',
  '<p>Yes—Classic is our softly defined option. Share the look you want, whether that is a subtle everyday finish, more texture or a fuller lash line. Your natural lashes and chosen style affect the finished result.</p>'),
 ('How do I book lash extensions at Matrix?',
  '<p>Choose Classic, Hybrid or Volume using the full-set buttons, or select the matching fill in the pricing table. Square shows appointment details and available times. You can also text 262-939-9325 if you want help choosing a service.</p>')
]
faq_html=''.join(f'<details><summary>{escape(q)}</summary><div class="answer">{answer}</div></details>' for q,answer in faqs)

body=f'''<div class="matrix-lashes">
<section class="hero">
  <div class="hero-copy">
    <nav class="breadcrumb" aria-label="Breadcrumb">{a('Home',SITE+'/','')}<span>/</span>{a('Spa & Beauty',HUB,'')}<span>/</span><span aria-current="page">Lash Extensions</span></nav>
    <img class="logo" src="{LOGO}" alt="Matrix Massage &amp; Bodywork" width="300" height="150">
    <p class="eyebrow">LASHES THAT FEEL LIKE YOU</p>
    <h1>Eyelash Extensions<br>in Salem, WI</h1>
    <p class="hero-subtitle">Classic, Hybrid &amp; Volume lashes near Paddock Lake.</p>
    <p class="lead">A little definition. A fuller lash line. A look you love waking up to. Find your style at Matrix, with full sets and fills close to home.</p>
    <div class="actions">{a('Choose Your Lash Set','#lash-styles','button')}{a('Text a Lash Question',SMS,'button secondary')}</div>
    <p class="hero-facts">Full sets from $170 · Fills from $55<br>24804 75th St · Salem, Wisconsin</p>
  </div>
  <figure class="hero-photo">{img('volume','Close-up of Volume lash extensions from the Matrix lash photo collection',eager=True)}<figcaption>VOLUME LASHES <span>Fuller definition. Your kind of bold.</span></figcaption></figure>
</section>
<nav class="jump" aria-label="Lash page sections">{a('Choose a style','#lash-styles','')}{a('Prices & fills','#lash-pricing','')}{a('Your first visit','#first-visit','')}{a('Lash FAQs','#lash-faqs','')}{a('Find the studio','#visit','')}</nav>
<section class="section intro"><div class="inner intro-grid"><div><p class="eyebrow">YOUR EVERYDAY FINISH</p><h2>More you.<br>A little less mascara.</h2></div><div><p>Searching for eyelash extensions in Salem or a lash tech near Paddock Lake? Come to Matrix for a style you can make your own—from soft definition to a fuller, more noticeable finish.</p><p>You do not have to know every lash term before you arrive. Start with the look you want, and talk through the shape, fullness and upkeep with your lash technician.</p></div></div></section>
<section class="section water" id="lash-styles"><div class="inner"><div class="section-intro"><p class="eyebrow">FIND YOUR FINISH</p><h2>Three styles.<br>One very personal choice.</h2><p>Explore the lash photos, compare the finish and choose your full set.</p></div><div class="style-grid">{''.join(cards)}</div><p class="photo-note">Photos from the Matrix lash collection. Your finished look will vary with your natural lashes and selected style.</p></div></section>
<section class="section pricing" id="lash-pricing"><div class="inner pricing-grid"><div><p class="eyebrow">A CLEAR PLAN FOR YOUR LASHES</p><h2>Lash extension prices &amp; fills.</h2><p class="section-lead">Choose the style you wear and the appointment you need. Tap a price to open that exact service in our booking menu.</p><p class="small">Full sets: 60 minutes.<br>Maintenance fills: 45 minutes.<br>Current prices and appointment details are confirmed when you book.</p>{a('Help Me Choose a Fill',SMS)}</div><div class="table-box"><table><caption>Matrix lash service pricing</caption><thead><tr><th scope="col">Appointment</th><th scope="col">Classic</th><th scope="col">Hybrid</th><th scope="col">Volume</th></tr></thead><tbody>{''.join(rows)}</tbody></table><p>Not sure a fill is enough? Text us before choosing an appointment.</p></div></div></section>
<section class="section paper"><div class="inner"><div class="section-intro"><p class="eyebrow">BOOK THE RIGHT VISIT</p><h2>A fresh start or a refresh?</h2></div><div class="two-cards"><article><span class="number">01</span><h3>Start with a full set.</h3><p>New to extensions, starting again or ready for a different finish? Explore Classic, Hybrid and Volume full sets. Bring a photo of the look you like and talk through what works for your lashes.</p>{a('Compare Full Sets','#lash-styles')}</article><article><span class="number">02</span><h3>Keep your look with a fill.</h3><p>Already wearing extensions? Choose a one-, two- or three-week fill that matches your style. If another salon applied your lashes, or you have more gaps than usual, contact us first so we can help you choose.</p>{a('See Fill Appointments','#lash-pricing')}</article></div></div></section>
<section class="section artist"><div class="inner artist-grid"><div><p class="eyebrow">YOUR LASH APPOINTMENT</p><h2>Made for you.</h2></div><div><p class="section-lead">Your lash appointment starts with the look you want.</p><p>Subtle for everyday. Textured for a little more definition. Fuller for a finish you notice. Share your preferences, your routine and any questions with your lash technician, then choose a set and maintenance plan that suit you.</p><div class="actions">{a('View Lash Appointments',BOOK,'button')}{a('Ask a Question',SMS)}</div></div></div></section>
<section class="section" id="first-visit"><div class="inner"><div class="section-intro"><p class="eyebrow">YOUR FIRST VISIT</p><h2>Arrive curious.<br>Leave with a plan.</h2></div><div class="steps"><article><span class="number">01</span><h3>Come with clean lashes.</h3><p>Arrive without mascara or eye makeup. Share your preferred look and tell us about any existing extensions, sensitivities or previous adhesive reactions.</p></article><article><span class="number">02</span><h3>Settle into your appointment.</h3><p>Talk through your selected style and expectations. The booking menu lists 60 minutes for full sets and 45 minutes for fills.</p></article><article><span class="number">03</span><h3>Know what comes next.</h3><p>Follow the aftercare directions for your set. Ask about cleansing, brushing and the right time for your next fill so upkeep feels straightforward.</p></article></div><div class="care-note"><h3>A little care goes a long way.</h3><p>Avoid rubbing, tugging or picking at extensions. Tell us about eye-area irritation or a previous adhesive reaction before booking. If you have an eye infection or inflamed skin around your eyes, wait until it has healed.</p></div></div></section>
<section class="section local" id="visit"><div class="inner local-grid"><div><p class="eyebrow">SALEM · PADDOCK LAKE · SALEM LAKES</p><h2>Your local lash appointment.</h2><p>Book eyelash extensions near Paddock Lake at our Salem studio on 75th Street. One familiar place for your full set, your next fill and a little time for yourself.</p><p>We also welcome lash clients from Bristol, Trevor, Twin Lakes, Genoa City and nearby Antioch. Every appointment takes place at our Salem location.</p></div><div class="address-card"><p class="eyebrow">MATRIX MASSAGE &amp; BODYWORK</p><p class="address">24804 75th St<br>Salem, WI 53168</p><p>Text-to-book: {a('262-939-9325',SMS,'')}</p><div class="actions">{a('Get Directions',MAP,'button')}{a('Studio Details & Hours',SITE+'/about-5')}</div></div></div></section>
<section class="section paper faq" id="lash-faqs"><div class="inner faq-grid"><div><p class="eyebrow">YOUR QUESTIONS, ANSWERED</p><h2>Before your<br>lash appointment.</h2><p>From your first full set to your next fill, here is what to know.</p>{a('Text Us Your Question',SMS)}</div><div>{faq_html}</div></div></section>
<section class="section related-section"><div class="inner"><p class="eyebrow">MORE AT MATRIX</p><h2>Make time for yourself.</h2><p>Explore more services at our Salem studio. If you want multiple treatments, ask us about timing and lash aftercare before combining appointments.</p><div class="related">{a('Spa & Beauty Services',HUB)}{a('Custom Facials',HUB+'/facials-salem-wi')}{a('Face & Body Waxing',HUB+'/hair-removal-waxing-salem-wi')}{a('Japanese Head Spa',SITE+'/japanese-head-spa-salem-wi')}{a('Spa Gift Cards',SITE+'/massage-spa-gift-cards-salem-wi')}</div></div></section>
<section class="close water"><div class="close-inner"><p class="eyebrow">YOUR NEXT GOOD LASH DAY</p><h2>Find the lashes<br>that feel like you.</h2><p>Classic, Hybrid or Volume. A full set or a little refresh.<br>Your Salem lash appointment is right here.</p><div class="actions">{a('Choose Your Lash Appointment','#lash-styles','button light')}{a('Text Matrix',SMS,'button outline')}</div><p class="location">24804 75th St · Salem, WI · 262-939-9325</p></div></section>
</div>'''
(P/'body.html').write_text(body)
cfg={'serviceName':'Lash Extensions in Salem & Paddock Lake','revision':'production-2','tagName':'matrix-lash-extensions','elementId':'matrixLashExtensions','rootClass':'matrix-lashes','pageUrl':URL,'seoTitle':'Eyelash Extensions Salem & Paddock Lake, WI | Matrix','seoDescription':'Classic, Hybrid & Volume lash extensions in Salem near Paddock Lake. Full sets from $170, fills from $55. Compare styles, prices & book online.','seoSource':'SPECIFICATION.md; baseline/site-inventory.json; baseline/square-live-menu.txt','bodyFile':'body.html','cssFile':'style.css','expectedFaqCount':len(faqs)}
(P/'page-config.json').write_text(json.dumps(cfg,indent=2))
graph={'@context':'https://schema.org','@graph':[
 {'@type':'WebPage','@id':URL+'#webpage','url':URL,'name':cfg['seoTitle'],'description':cfg['seoDescription'],'isPartOf':{'@type':'WebSite','@id':SITE+'/#website','url':SITE+'/'},'about':{'@id':URL+'#service'},'breadcrumb':{'@id':URL+'#breadcrumb'}},
 {'@type':'Service','@id':URL+'#service','name':'Eyelash Extensions in Salem, Wisconsin','serviceType':'Classic, Hybrid and Volume eyelash extensions and lash fills','url':URL,'areaServed':[{'@type':'Place','name':x} for x in ['Salem, WI','Paddock Lake, WI','Salem Lakes, WI']], 'provider':{'@type':'HealthAndBeautyBusiness','name':'Matrix Massage & Bodywork','url':SITE+'/','telephone':'+1-262-939-9325','address':{'@type':'PostalAddress','streetAddress':'24804 75th St','addressLocality':'Salem','addressRegion':'WI','postalCode':'53168','addressCountry':'US'}},'hasOfferCatalog':{'@type':'OfferCatalog','name':'Lash Extensions & Fills','itemListElement':[{'@type':'Offer','price':str(s['price']),'priceCurrency':'USD','url':s['url'],'itemOffered':{'@type':'Service','name':s['style']+' Lash Extensions | '+s['visit']}} for s in services]}},
 {'@type':'BreadcrumbList','@id':URL+'#breadcrumb','itemListElement':[{'@type':'ListItem','position':i+1,'name':n,'item':u} for i,(n,u) in enumerate([('Home',SITE+'/'),('Spa & Beauty',HUB),('Lash Extensions',URL)])]}
]}
(P/'service-schema.json').write_text(json.dumps(graph,indent=2))
print('Authored page:',len(body),'characters;',len(faqs),'FAQs;',len(services),'verified services.')
