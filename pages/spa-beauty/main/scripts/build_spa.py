from pathlib import Path
import json, re, html, hashlib, urllib.request

ROOT=Path(__file__).resolve().parents[1]
SITE='https://www.matrixmassage.net'
BOOK='https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services'
ASSET='https://cdn.jsdelivr.net/gh/MatrixMassageBodywork-droid/matrix-wix-components@da120f1a8a3c621b17a2c9828ce6b069f9296662/pages/spa-beauty/main/assets/'
FACIAL=SITE+'/spa-and-beauty-services-salem-wi/facials-salem-wi'
HEAD=SITE+'/japanese-head-spa-salem-wi'
WAX=SITE+'/spa-and-beauty-services-salem-wi/hair-removal-waxing-salem-wi'
menu=json.loads((ROOT/'baseline/square-menu.json').read_text())
def booking(name):
    return next(x['href'] for x in menu if x['text'].startswith(name))
def link(url,label,cls='sb-link'):
    return f'<a class="{cls}" href="{html.escape(url)}" target="_top">{label}</a>'
def img(name,alt):
    return f'<img src="{ASSET}{name}.webp" alt="{alt}" width="1536" height="1024" loading="lazy" decoding="async">'
body=f'''<div class="matrix-spa-main">
<section class="sb-hero" aria-labelledby="sb-title">
 <div class="sb-hero-inner">
  <img class="sb-logo" src="https://static.wixstatic.com/media/e4cc43_c35a32fb07bc4445bb822ed185350e25~mv2.jpg" width="224" height="167" alt="Matrix Massage &amp; Bodywork" decoding="async">
  <p class="sb-eyebrow">CLINICAL LUXURY · SALEM, WISCONSIN</p>
  <h1 id="sb-title">Spa &amp; Beauty Services<br> in Salem, WI</h1>
  <p class="sb-lead">Thoughtful care for your skin, scalp, and finishing touches.<br> A little time for yourself. A beautifully refreshed feeling.</p>
  <div class="sb-actions">{link(BOOK,'BOOK YOUR VISIT','sb-button sb-light')}<a class="sb-button sb-outline" href="#sb-services">EXPLORE SERVICES</a></div>
 </div>
</section>
<nav class="sb-jump" aria-label="Spa and beauty services"><a href="#sb-facials">Facials &amp; skin</a><a href="#sb-headspa">Japanese Head Spa</a><a href="#sb-lashes">Lash extensions</a><a href="#sb-waxing">Waxing</a></nav>
<section class="sb-services" id="sb-services" aria-labelledby="sb-intro">
 <div class="sb-inner">
  <div class="sb-intro"><p class="sb-eyebrow">YOUR TIME, THOUGHTFULLY SPENT</p><h2 id="sb-intro">Find your kind of refreshed.</h2><p>Choose the care you came for—or discover something new. From personalized facials to a quiet scalp ritual, every visit starts with what feels right for you.</p></div>
  <div class="sb-service-grid">
   <article class="sb-service" id="sb-facials">{img('facial','Illustrative facial treatment with a soft brush and creamy mask')}
    <div class="sb-card-copy"><p class="sb-eyebrow">01 / SKIN, WITH PERSONAL ATTENTION</p><h3>Facials &amp; skin care</h3><p>Fresh hydration, a smoother-looking finish, or simply time to care for your skin. Start with a Custom Facial, explore Circadia Dream and Luxe Lift treatments, or choose professional dermaplaning.</p><p class="sb-note">New Client Facial · Custom Facials · Circadia · Dermaplaning</p><div class="sb-card-actions">{link(FACIAL,'EXPLORE FACIALS','sb-button')}{link(booking('Custom Facial'),'Book a Custom Facial ↗')}</div></div>
   </article>
   <article class="sb-service" id="sb-headspa">{img('headspa','Illustrative Japanese Head Spa waterfall rinse and gentle scalp care')}
    <div class="sb-card-copy"><p class="sb-eyebrow">02 / A QUIETER MOMENT</p><h3>Japanese Head Spa</h3><p>Scalp cleansing, a customized infusion, warm water, and unhurried massage. Choose a focused Scalp Cleanse &amp; Refresh, the Signature Head Spa, or a longer relaxation and scalp-care experience.</p><p class="sb-note">Scalp care · Waterfall rinse · Massage · Longer rituals</p><div class="sb-card-actions">{link(HEAD,'EXPLORE HEAD SPA','sb-button')}{link(booking('Matrix Signature Head Spa'),'Book Signature Head Spa ↗')}</div></div>
   </article>
   <article class="sb-service" id="sb-lashes">{img('lashes','Illustrative close-up of a softly defined lash line')}
    <div class="sb-card-copy"><p class="sb-eyebrow">03 / THE FINISHING TOUCH</p><h3>Lash extensions</h3><p>Soft definition or a fuller, more dramatic finish. Explore Classic, Hybrid, and Volume full sets, with one-, two-, and three-week fill appointments to maintain your look.</p><div class="sb-lash-options">{link(booking('Classic Lash Extensions | Full Set'),'Classic ↗')}{link(booking('Hybrid Lash Extensions | Full Set'),'Hybrid ↗')}{link(booking('Volume Lash Extensions | Full Set'),'Volume ↗')}</div><div class="sb-card-actions">{link(BOOK,'VIEW LASH MENU &amp; FILLS','sb-button')}</div></div>
   </article>
   <article class="sb-service" id="sb-waxing">{img('waxing','Illustrative professional wax warmer, clean spatula, and fresh towels')}
    <div class="sb-card-copy"><p class="sb-eyebrow">04 / SMOOTH, SIMPLE, CONSIDERED</p><h3>Face &amp; body waxing</h3><p>Professional hair removal with careful preparation and finishing care. Select the facial or body area you would like treated, and let your provider know about your skin and recent skincare treatments.</p><p class="sb-note">Facial areas · Body waxing · Personalized aftercare</p><div class="sb-card-actions">{link(WAX,'EXPLORE WAXING','sb-button')}{link(booking('Facial Waxing Services'),'Book facial waxing ↗')}{link(booking('Body Waxing'),'Book body waxing ↗')}</div></div>
   </article>
  </div>
  <p class="sb-menu-note">Explore each service for more detail. Current prices, treatment lengths, and provider availability are shown when you book.</p>
 </div>
</section>
<section class="sb-ritual" aria-labelledby="sb-ritual-title"><div class="sb-inner sb-ritual-grid">
 <div><p class="sb-eyebrow">SCALP + SKIN, IN ONE VISIT</p><h2 id="sb-ritual-title">Stay a little longer.<br> Leave a little lighter.</h2></div>
 <div><p class="sb-ritual-name">Matrix Head Spa + Hydrating Glow Facial</p><p>A head-to-face experience with customized scalp care, a mini facial, facial massage, and hydrating finishing care. A beautiful choice when you want both a refreshed scalp and a cared-for glow.</p>{link(booking('Matrix Head Spa + Hydrating Glow Facial'),'EXPLORE THE COMBINED RITUAL','sb-button sb-light')}<p class="sb-small">Head Spa leaves hair wet. Reserve Luxury Blowout Styling separately when available.</p></div>
</div></section>
<section class="sb-extra"><div class="sb-inner">
 <div class="sb-section-heading"><div><p class="sb-eyebrow">MAKE THE VISIT YOURS</p><h2>A few more ways to unwind.</h2></div><p>Choose extra care where you want it, with options available for eligible appointments.</p></div>
 <div class="sb-extra-grid">
  <article><span class="sb-number">01</span><h3>Face, scalp &amp; body care</h3><p>Enjoy focused Facial &amp; Head/Scalp Massage, or give the skin on your back its own cleansing, exfoliation, and moisturizing treatment.</p>{link(booking('Facial & Head/Scalp Massage'),'Facial &amp; scalp massage ↗')}{link(booking('Matrix Back Renewal Treatment'),'Back Renewal Treatment ↗')}</article>
  <article><span class="sb-number">02</span><h3>A softer finish</h3><p>Add a nourishing hair mask, extra facial massage, or hand compression and warmth to an eligible visit. Ask which options fit your appointment.</p>{link(BOOK,'Explore current enhancements ↗')}</article>
  <article><span class="sb-number">03</span><h3>More time to pause</h3><p>Explore full-body red light and private infrared sauna add-ons, or plan a separate massage appointment for more time devoted to relaxation.</p>{link(SITE+'/wellness-biotech-services-salem-wi','Explore wellness ↗')}{link(SITE+'/massage-therapy-services-salem-wi','Explore massage ↗')}</article>
 </div>
</div></section>
<section class="sb-first"><div class="sb-inner sb-first-grid"><div><p class="sb-eyebrow">YOUR FIRST VISIT</p><h2>No need to have<br> it all figured out.</h2><p>Tell us how you want to feel, how much time you have, and what you would like to focus on. We can help you find a comfortable place to start.</p>{link('sms:+12629399325','TEXT US TO CHOOSE A SERVICE','sb-button')}<p class="sb-small">262-939-9325</p></div><div class="sb-first-options"><div><span>For your skin</span><p>A Custom Facial lets your provider tailor the care to your skin and comfort.</p></div><div><span>For your scalp</span><p>Signature Head Spa is a welcoming introduction to personalized scalp care and relaxation.</p></div><div><span>For a polished finish</span><p>Explore lash full sets or select the facial or body waxing area you need.</p></div></div></div></section>
<section class="sb-faq"><div class="sb-inner sb-faq-grid"><div><p class="sb-eyebrow">BEFORE YOU VISIT</p><h2>A few helpful details.</h2></div><div>
<details><summary>Can I combine a facial and Head Spa?</summary><p>Yes. The Matrix Head Spa + Hydrating Glow Facial combines scalp care with a mini facial and facial massage. The current menu also includes men's scalp-and-facial combinations. Check the booking menu for the experience and appointment length you prefer.</p></details>
<details><summary>Do you offer lash fills as well as full sets?</summary><p>Yes. Classic, Hybrid, and Volume lash extensions each have full-set and one-, two-, and three-week fill appointments. Choose the matching style and timing in the current booking menu.</p></details>
<details><summary>Is hair drying included with Head Spa?</summary><p>Head Spa services leave hair wet. Luxury Blowout Styling is a separate add-on appointment with a cosmetologist, when available. Reserve it with your visit if you would like your hair professionally dried and styled.</p></details>
<details><summary>Where do I go, and how do I book?</summary><p>Visit Matrix Massage &amp; Bodywork at 24804 75th St, Salem, WI 53168. Book online through our current Square menu or text 262-939-9325. Our Salem studio welcomes guests from Salem Lakes, Paddock Lake, Bristol, Twin Lakes, Kenosha, and nearby Antioch, Illinois.</p></details>
</div></div></section>
<section class="sb-close"><div class="sb-close-inner"><p class="sb-eyebrow">YOUR NEXT MOMENT OF CARE</p><h2>Make room for yourself.</h2><p>A refreshed scalp. Cared-for skin. A finish that feels like you.<br> Find your next visit at Matrix.</p>{link(BOOK,'BOOK SPA &amp; BEAUTY','sb-button sb-light')}<p class="sb-small">24804 75th St · Salem, WI · 262-939-9325</p></div></section>
</div>'''
(ROOT/'body.html').write_text(body)
base=json.loads((ROOT/'baseline/live-dom.json').read_text())
cfg={'serviceName':'Matrix Spa & Beauty','revision':'spa-review-1','tagName':'matrix-spa-main','elementId':'matrixSpaMain','rootClass':'matrix-spa-main','pageUrl':base['url'],'seoTitle':base['title'],'seoDescription':base['description'],'seoSource':'baseline/live-dom.json','bodyFile':'body.html','cssFile':'style.css','expectedFaqCount':4}
(ROOT/'page-config.json').write_text(json.dumps(cfg,indent=2)+'\n')
provenance={'assetCommit':'da120f1a8a3c621b17a2c9828ce6b069f9296662','imagery':'Four illustrative AI-generated service photographs; not actual Matrix clients, staff, facilities, or before/after results. Generated with built-in image generation. Originals preserved; WebP files are optimized encodings.','logo':'Exact c35a32fb asset verified in current Main Massage renderer; chosen over stale bundled PNG recommendation to satisfy owner request to match approved Main Massage logo. No logo redraw.','water':'Existing shared Matrix Wix water texture; darkened with CSS overlays.','imageUrls':{n:ASSET+n+'.webp' for n in ['facial','headspa','lashes','waxing']},'prompts':'assets/image-prompts.json'}
(ROOT/'asset-map.json').write_text(json.dumps(provenance,indent=2)+'\n')
