from pathlib import Path
import json, html, subprocess, base64, mimetypes, re

R=Path(__file__).resolve().parents[3]
OUT=R/'pages/regional/review-2026-11-06'
OUT.mkdir(parents=True,exist_ok=True)
BASE='https://www.matrixmassage.net'
BOOK='https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services'
GIFT='https://app.squareup.com/gift/MLJ7B3VJVPBSS/order'
FAC=BASE+'/spa-and-beauty-services-salem-wi/facials-salem-wi'
HEAD=BASE+'/japanese-head-spa-salem-wi'
MASS=BASE+'/massage-therapy-services-salem-wi'
SPA=BASE+'/spa-and-beauty-services-salem-wi'
GC=BASE+'/massage-spa-gift-cards-salem-wi'
MAP='https://www.google.com/maps/dir/?api=1&destination=24804+75th+St,+Salem,+WI+53168'
ASSETS={}
def asset(path,commit='3410ffbe4854f403f588526a1c113f0610d757f8'):
    u=f'https://cdn.jsdelivr.net/gh/MatrixMassageBodywork-droid/matrix-wix-components@{commit}/{path}'
    ASSETS[u]=path
    return u
LOGO=asset('pages/massage/deep-tissue/assets/matrix-bodywork-approved.jpg')
WATER=asset('pages/massage/manual-lymphatic-drainage/assets/matrix-water-background.webp')
LASH=asset('pages/spa-beauty/main/assets/lashes.webp')
ROOM=asset('pages/massage/regional-review-2026-11-06/assets/matrix-treatment-room.webp')
FONT=asset('pages/massage/deep-tissue/assets/matrix-m2-font-0-2e46554fc8.woff')
def a(url,text,cls='text-link'):
    return f'<a class="{cls}" href="{html.escape(url,quote=True)}"'+(' target="_top"' if not url.startswith('#') else '')+f'>{text}</a>'
def img(url,alt,cls='',w=1200,h=1000):
    return f'<img class="{cls}" src="{url}" alt="{html.escape(alt,quote=True)}" width="{w}" height="{h}" loading="lazy">'
def para(text):return '<p>'+text+'</p>'

PAGES=[dict(key='bristol',city='Bristol',region='Bristol, WI',slug='spa-services-near-bristol-wi',tag='matrix-bristol-spa',element='matrixBristolSpa',title='Spa Near Bristol, WI | Facials, Massage & Head Spa | Matrix',description='Visit Matrix in Salem for facials, Japanese Head Spa, massage and lash extensions near Bristol, WI. Book online or send an instant spa eGift Card.',
 lead='Advanced skincare, targeted massage therapy, Japanese Head Spa rituals, and beautiful lashes—personal care at our Salem studio, close to Bristol.',
 intro='A little time away. A place to feel like yourself.',
 introcopy='You do not need a whole weekend away to make room for yourself. From a focused massage to an unhurried scalp ritual, Matrix Massage &amp; Bodywork gives Bristol guests a welcoming place to pause, reset their plans, and enjoy care chosen around them.',
 facial='If you are looking for facials near Bristol, begin with what your skin needs today: hydration, a smoother-looking texture, support for acne-prone skin, or a refreshed glow. Our Custom Facials and Circadia treatments combine professional skincare with time to talk about your goals.',
 facial2='Explore dermaplaning for surface exfoliation and fine facial hair, or choose a facial shaped around congestion, sensitivity, or the appearance of aging. Your provider selects suitable care after reviewing your skin and routine.',
 head='Warm water, scalp cleansing, and slow, attentive touch. A Japanese Head Spa gives you time to step out of the day while your provider cares for your scalp and hair.',
 head2='Choose a focused scalp refresh, our Signature Head Spa, or a longer ritual. Treatment steps vary by appointment and may include scalp analysis, a customized infusion, a waterfall rinse, and scalp, neck, and shoulder massage.',
 massage='A busy workday, regular workouts, and everyday responsibilities can leave their mark on your shoulders, back, and neck. Our therapeutic massage sessions start with where you feel tension and how you want to feel afterward.',
 massage2='Explore deep tissue massage, a gentler Swedish massage, or other focused bodywork on the current menu. Pressure is adjusted with you throughout your appointment; more pressure is not a requirement for a worthwhile session.',
 lashes='A little definition can make your morning feel simpler. Explore lash extensions near Bristol with a Classic full set for a softly defined look, Hybrid for a blend of fullness and texture, or Volume for a fuller finish.',
 lashes2='Keep your chosen look with matching one-, two-, or three-week fill appointments. Your lash provider can discuss a style that suits your preferences and natural lashes.',
 gift='A birthday you want to make special. A thank-you that deserves more than a text. A Christmas gift you can send today. A Matrix eGift Card gives someone in Bristol a choice of care at our Salem studio.',
 gift2='Choose a dollar amount, add a personal message, and send by email or text through Square. Deliver today or schedule ahead. Massage gifts, facial gifts, and Head Spa gifts are thoughtful options for him, for her, or for anyone who could use a little time of their own.',
 local='Coming from Bristol? Your appointment is at our single Salem studio, at 24804 75th St. Use live directions for your starting point and traffic conditions, then choose an available appointment through our online menu.',
 local2='Plan a facial before a special occasion, make massage part of your regular care, or try a Head Spa for the first time. If you want more than one service, text us before booking so we can help coordinate the timing.',
 facialimg='facial-mask',headimg='matrix-scalp-care',massageimg='existing-therapeutic',productimg='circadia-serums',
 faqs=[
 ('Where is Matrix located for Bristol guests?','Matrix Massage & Bodywork is at 24804 75th St, Salem, WI 53168. We welcome Bristol guests at this Salem studio. We do not have a separate Bristol location. Use the directions link on this page to check your route.'),
 ('What spa services can I book near Bristol?','Our Salem studio offers Custom and Circadia facials, dermaplaning, Japanese Head Spa, therapeutic massage, and Classic, Hybrid, and Volume lash extensions. The current booking menu shows appointment lengths, prices, providers, and availability.'),
 ('Which facial should I choose for acne-prone skin?','Start with a Custom Facial and share that breakouts or congestion are your priority. Clear + Balance is our related skin-goal pathway. Your provider reviews your skin and routine before choosing suitable cosmetic care; a facial is not a replacement for medical acne treatment.'),
 ('Can I book dermaplaning near Bristol?','Yes. Matrix offers dermaplaning appointments at our Salem studio, including focused and full-facial options. Tell your provider about active irritation, breakouts, prescription skincare, and recent treatments so suitability can be discussed.'),
 ('What should I expect from my first Japanese Head Spa?','Expect scalp-focused cleansing and relaxation, with steps selected for your chosen service. Review the Head Spa menu for what is included. Your hair will be wet afterward; professional drying and styling are booked separately when available.'),
 ('Does therapeutic massage have to be deep or painful?','No. Tell your massage therapist about your goals and pressure preferences. Pressure can be adjusted during the session. Choose from the current massage menu and let us know if you are unsure which appointment fits.'),
 ('Do you offer lash full sets and fills?','Yes. Classic, Hybrid, and Volume lash extensions have full-set appointments and matching one-, two-, and three-week fills. If you have lashes from another studio or are unsure which fill to choose, contact Matrix before booking.'),
 ('Can I send an instant spa gift card to someone in Bristol?','Yes. Purchase a Matrix eGift Card through Square, choose a dollar amount, and send it by text or email today or schedule a future delivery. The recipient books a separate appointment at our Salem studio.'),
 ('Can I book a facial and Head Spa together?','The current menu includes a Head Spa and Hydrating Glow Facial combination. For other combinations, text 262-939-9325 so we can help coordinate services and provider availability before you book.'),
 ('How do I check prices, hours, and appointment availability?','The Square booking menu shows current prices and available appointment times. Reserve online or text 262-939-9325 for help choosing a service or confirming your visit. All appointments take place at our Salem address.')]),
dict(key='twin-lakes-genoa-city',city='Twin Lakes &amp; Genoa City',region='Twin Lakes &amp; Genoa City, WI',slug='spa-services-near-twin-lakes-genoa-city-wi',tag='matrix-twin-lakes-spa',element='matrixTwinLakesSpa',title='Spa Near Twin Lakes & Genoa City, WI | Matrix',description='Facials, massage, Japanese Head Spa and lash extensions for Twin Lakes and Genoa City guests at Matrix in Salem, WI. Book a visit or send a spa gift card.',
 lead='A facial, a focused massage, a soothing Japanese Head Spa, or lashes you love. Make time for your kind of luxury at our Salem studio, serving Twin Lakes and Genoa City.',
 intro='Make a little room in your day for you.',
 introcopy='Whether you live in Twin Lakes or Genoa City, or are spending time with family nearby, a visit to Matrix can be a reason to slow down. Choose one experience, settle into our Salem studio, and let the appointment be about what you need.',
 facial='A weekend by the lake, changing seasons, and an everyday skincare routine can all leave you wanting something different from your next facial. Our Custom and Circadia facials start with your priorities—hydration, radiance, acne-prone skin, or a smoother-looking finish.',
 facial2='Guests looking for facials near Twin Lakes or Genoa City can explore professional dermaplaning and personalized facial care at Matrix in Salem. We consider your skin, sensitivities, and current products before selecting treatment steps.',
 head='For some people, the best part of a spa visit is simply being able to switch off. Japanese Head Spa brings scalp care and relaxation together with cleansing, warm water, and attentive massage.',
 head2='Explore a Signature Head Spa or give yourself more time with a longer scalp ritual. Your selected appointment determines the steps, which may include scalp analysis, a customized infusion, gentle exfoliation, and a waterfall rinse.',
 massage='Make space for the tension that builds during long drives, work, and active days. A customized massage gives you time to describe what feels tight, where you would like focused attention, and the pressure you prefer.',
 massage2='Our Salem massage menu includes deep tissue, Swedish, and manual lymphatic drainage options. Your therapist can help you choose the right starting point. The approach and pressure should fit you and the service you book.',
 lashes='From an everyday polished look to a fuller finish for a celebration, lash extensions let you choose your own level of definition. Twin Lakes and Genoa City guests can book Classic, Hybrid, and Volume full sets at Matrix in Salem.',
 lashes2='Plan your maintenance around matching one-, two-, or three-week fills. Check availability ahead of a wedding, holiday, or trip, and speak with your provider about the style you have in mind.',
 gift='Give someone in Twin Lakes or Genoa City a reason to put themselves on the calendar. A Matrix gift card is a thoughtful birthday surprise, anniversary gift, holiday present, or thank-you to someone who has made your stay special.',
 gift2='Send a last-minute spa gift by email or text, or schedule delivery for the day you want to celebrate. Choose the dollar amount and a personal message; they choose their massage, facial, or Head Spa experience at our Salem studio.',
 local='Plan your visit from Twin Lakes or Genoa City to Matrix Massage &amp; Bodywork at 24804 75th St in Salem. We have one studio, and every service on this page takes place here. Open directions for your route and current travel time.',
 local2='Visiting the area for a weekend or family occasion? Book ahead for the appointment you want. For more than one service—or visits for more than one person—text us first so we can help you plan around available times.',
 facialimg='facial-treatment',headimg='matrix-waterfall',massageimg='existing-session',productimg='circadia-hydration',
 faqs=[
 ('Do you have a spa in Twin Lakes or Genoa City?','Our single studio is in Salem, Wisconsin, at 24804 75th St, Salem, WI 53168. We welcome guests from Twin Lakes and Genoa City; there are no separate Matrix branches in either town.'),
 ('How do I plan the drive to my appointment?','Use the directions link with your own starting point to see the route and current travel time to our Salem studio. Allow time to arrive for your appointment, and contact us if you need help finding the studio.'),
 ('Can I book a spa visit while staying near Twin Lakes?','Yes. You can reserve through our online booking menu whether you live nearby or are visiting. Book ahead for the service and time you prefer. For multiple guests or several services, contact Matrix to coordinate availability.'),
 ('Where can I get a facial for acne-prone or dry skin?','Matrix offers Custom Facials at our Salem studio for Twin Lakes and Genoa City guests. Share your concerns, current products, and sensitivities with your provider. Clear + Balance and Hydrate + Restore are skin-goal pathways you can explore before booking.'),
 ('What is the difference between a facial and dermaplaning?','A facial combines skincare steps selected for your skin and appointment. Dermaplaning is a professional surface-exfoliation service that also removes fine facial hair. Matrix offers focused dermaplaning and facial combinations; your provider can discuss suitability.'),
 ('Will my hair be wet after a Japanese Head Spa?','Yes. Head Spa includes scalp and hair care that leaves your hair wet. Professional drying or styling is a separate appointment when available, so arrange it ahead of time if you want that finish.'),
 ('Which massage should I book?','Choose around your goals, comfort, and available time. The massage menu explains deep tissue, Swedish, and manual lymphatic drainage options. Text Matrix if you need help selecting a service, and discuss pressure preferences with your therapist.'),
 ('Can I get Classic, Hybrid, or Volume lash extensions?','Yes. Matrix offers all three styles, with full sets and matching one-, two-, and three-week fills. Contact us before selecting a fill if your extensions were applied elsewhere or you are unsure which appointment you need.'),
 ('Are spa gift cards available for last-minute gifts?','Yes. Buy a Matrix eGift Card online through Square and send it by text or email today, or schedule a future delivery. Choose a dollar amount so the recipient can select their experience. Purchasing a gift card does not reserve an appointment.'),
 ('Can I combine a facial, Head Spa, or massage in one visit?','The menu includes a Head Spa and Hydrating Glow Facial combination. Other combinations depend on the services and providers available. Text 262-939-9325 before booking multiple services so we can help arrange the timing.')])]

CSS='''@font-face{font-family:MatrixRegionalSerif;src:url('FONT') format('woff');font-display:swap}
TAG{display:block;width:100%;height:auto;min-height:0!important}
.ROOT{--cream:#f7f1e8;--paper:#fdfcf9;--ink:#123d40;--teal:#087776;--line:#c9d4c9;color:var(--ink);background:var(--cream);font:16px/1.75 Arial,Helvetica,sans-serif;width:100%;container-type:inline-size}
.ROOT *,.ROOT *::before,.ROOT *::after{box-sizing:border-box}
.ROOT h1,.ROOT h2,.ROOT h3,.ROOT p,.ROOT figure{margin:0}
.ROOT h1,.ROOT h2,.ROOT h3{font-family:MatrixRegionalSerif,Georgia,serif;font-weight:400;line-height:1.08;letter-spacing:-.022em;text-wrap:balance}
.ROOT h1{font-size:clamp(32px,3.7vw,46px);max-width:820px;margin:auto;line-height:1.15}
.ROOT h2{font-size:clamp(35px,4vw,52px)}.ROOT h3{font-size:29px}
.ROOT a{color:inherit;text-underline-offset:5px;text-decoration-thickness:1px}.ROOT a:hover{color:var(--teal)}
.ROOT a:focus-visible,.ROOT summary:focus-visible{outline:3px solid #199e9c;outline-offset:5px}.ROOT [id]{scroll-margin-top:22px}
.ROOT .inner{max-width:1280px;margin:auto;padding:0 64px}.ROOT .eyebrow{font-size:10px;letter-spacing:2px;font-weight:600;line-height:1.6;margin-bottom:18px}
.ROOT .water{background-color:#123d40;background-image:linear-gradient(110deg,rgba(3,37,40,.86),rgba(5,64,65,.66),rgba(4,31,35,.83)),url('WATER');background-size:cover;background-position:center;color:#fff}
.ROOT .hero{text-align:center;padding:42px 24px 53px}.ROOT .logo{display:block;width:660px;max-width:100%;aspect-ratio:2/1;height:auto;object-fit:cover;border:6px solid black;background:#fff;margin:0 auto 29px}
.ROOT .hero .eyebrow{font-size:9px}.ROOT .lead{max-width:730px;margin:22px auto 27px;font-size:17px;line-height:1.75;color:#eef3ee}.ROOT .hero-note{margin:23px auto 0;font-size:12px;color:#e0ebe5}
.ROOT .actions{display:flex;flex-wrap:wrap;gap:14px;align-items:center}.ROOT .hero .actions,.ROOT .close .actions{justify-content:center}
.ROOT .button{min-height:52px;display:inline-flex;align-items:center;justify-content:center;padding:15px 23px;border:1px solid var(--ink);background:var(--ink);color:white;text-decoration:none;font-size:11px;line-height:1.65;letter-spacing:.9px;font-weight:400;text-align:center}
.ROOT .button.light{background:var(--cream);border-color:var(--cream);color:var(--ink)}.ROOT .button.outline{background:transparent;border-color:#c4d4cd;color:white}.ROOT .button:hover{background:var(--teal);color:white;border-color:var(--teal)}
.ROOT .text-link{display:inline-block;font-size:13px;line-height:1.7}.ROOT .jump{display:flex;justify-content:center;flex-wrap:wrap;background:#e9e8dd;border-bottom:1px solid #d8ddcf}.ROOT .jump a{font-size:12px;padding:18px 25px;min-height:50px;text-decoration:none}.ROOT .jump a:hover{background:#dce5dc}
.ROOT .intro{padding:64px 24px;text-align:center;background:var(--paper)}.ROOT .intro h2{max-width:740px;margin:0 auto 20px}.ROOT .intro p:last-child{max-width:730px;margin:auto;color:#4b6060}
.ROOT .service{padding:72px 0}.ROOT .service.paper{background:var(--paper)}.ROOT .service-grid{display:grid;grid-template-columns:1fr 1fr;gap:66px;align-items:center}.ROOT .service.reverse .visual{order:2}.ROOT .service.reverse .copy{order:1}
.ROOT .visual{position:relative}.ROOT .service-photo{display:block;width:100%;aspect-ratio:1/1.05;object-fit:cover;height:auto}.ROOT .visual figcaption{font-size:10px;line-height:1.6;color:#526661;margin-top:12px}.ROOT .copy h2{margin-bottom:23px}.ROOT .copy p:not(.eyebrow){font-size:15px;color:#4b6060;margin:0 0 18px}.ROOT .copy .actions{margin-top:25px;gap:17px}
.ROOT .chips{display:flex;flex-wrap:wrap;gap:7px;margin:20px 0 8px}.ROOT .chips span{font-size:10px;padding:5px 10px;border:1px solid #c5d2c6;border-radius:20px;background:#edf0e6}.ROOT .micro-links{display:flex;gap:16px;flex-wrap:wrap;margin-top:18px}
.ROOT .product-strip{background:#eaf0e8;padding:32px 0}.ROOT .product-grid{display:grid;grid-template-columns:170px 1fr;gap:35px;align-items:center;max-width:920px;margin:auto}.ROOT .product-grid img{width:170px;height:132px;object-fit:cover}.ROOT .product-grid h3{margin-bottom:11px}.ROOT .product-grid p{font-size:14px;color:#4b6060}
.ROOT .gift{padding:76px 0}.ROOT .gift-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:70px;align-items:center}.ROOT .gift p:not(.eyebrow){margin-top:23px;color:#e4eee8;font-size:15px}.ROOT .gift .button{margin-top:26px}.ROOT .gift .text-link{margin-top:20px;color:#fff}.ROOT .gift .text-link:hover{color:#c5e7dc}
.ROOT .gift-card{border:1px solid #b9cfc4;background:rgba(247,241,232,.96);color:var(--ink);padding:42px 36px;box-shadow:14px 14px 0 rgba(2,27,29,.26)}.ROOT .gift-card .eyebrow{font-size:9px}.ROOT .gift-card h3{font-size:45px;margin:22px 0}.ROOT .gift-card p{color:#4b6060!important;font-size:13px!important}.ROOT .gift-card .card-line{height:1px;background:#b5c4b8;margin:25px 0}.ROOT .gift-card strong{font-size:13px;letter-spacing:.5px;font-weight:400}
.ROOT .why{padding:72px 0;background:var(--paper)}.ROOT .section-heading{max-width:760px;margin-bottom:42px}.ROOT .three{display:grid;grid-template-columns:repeat(3,1fr);gap:37px}.ROOT .reason{border-top:1px solid #9aafa4;padding-top:25px}.ROOT .reason .number{font:italic 25px Georgia,serif;color:#597c70;display:block;margin-bottom:17px}.ROOT .reason h3{margin-bottom:17px}.ROOT .reason p{font-size:14px;color:#4b6060}
.ROOT .visit{padding:72px 0;background:#eaf0e8}.ROOT .visit-grid{display:grid;grid-template-columns:.85fr 1.15fr;gap:66px;align-items:center}.ROOT .room{width:100%;height:auto;aspect-ratio:4/4.5;object-fit:cover}.ROOT .visit p:not(.eyebrow){margin-top:19px;font-size:15px;color:#4b6060}.ROOT .visit .actions{margin-top:25px}.ROOT .address{font-size:15px!important;color:var(--ink)!important}
.ROOT .faq{padding:78px 0}.ROOT .faq-grid{display:grid;grid-template-columns:.7fr 1.3fr;gap:70px}.ROOT .faq-intro p:not(.eyebrow){font-size:14px;color:#4b6060;margin-top:22px}.ROOT details{border-top:1px solid #c4cec5}.ROOT details:last-child{border-bottom:1px solid #c4cec5}.ROOT summary{cursor:pointer;min-height:64px;padding:20px 30px 20px 0;font-size:14px;line-height:1.7;list-style:none;position:relative}.ROOT summary::-webkit-details-marker{display:none}.ROOT summary::after{content:'+';position:absolute;right:4px;top:16px;font-size:22px}.ROOT details[open] summary::after{content:'−'}.ROOT details p{font-size:14px;color:#4d625b;padding:0 30px 23px 0}
.ROOT .related{padding:36px 24px;background:var(--paper);text-align:center;border-top:1px solid #dedfd5}.ROOT .related-links{display:flex;justify-content:center;gap:18px 28px;flex-wrap:wrap}.ROOT .related a{font-size:13px;min-height:32px;display:inline-block}
.ROOT .close{text-align:center;padding:72px 24px}.ROOT .close h2{max-width:750px;margin:auto}.ROOT .close p{max-width:680px;margin:24px auto;color:#e3ece4}.ROOT .close .small{font-size:11px;margin-bottom:0}
@container(max-width:900px){.ROOT .inner{padding:0 32px}.ROOT .service-grid,.ROOT .visit-grid{gap:38px}.ROOT .gift-grid,.ROOT .faq-grid{gap:40px}.ROOT .jump a{padding:17px}.ROOT .copy h2{font-size:40px}}
@container(max-width:620px){.ROOT h1{font-size:30px}.ROOT h2{font-size:37px}.ROOT h3{font-size:28px}.ROOT .inner{padding:0 22px}.ROOT .hero{padding:30px 22px 40px}.ROOT .logo{border-width:4px;margin-bottom:25px}.ROOT .lead{font-size:15px}.ROOT .hero-note{font-size:11px}.ROOT .actions{display:grid;grid-template-columns:1fr;width:100%;gap:12px}.ROOT .button{width:100%;font-size:10px;padding:15px}.ROOT .jump{display:grid;grid-template-columns:repeat(3,1fr);text-align:center}.ROOT .jump a{font-size:10px;padding:14px 7px}.ROOT .intro{padding:47px 22px}.ROOT .intro p:last-child{font-size:14px}.ROOT .service,.ROOT .gift,.ROOT .why,.ROOT .visit,.ROOT .faq{padding:48px 0}.ROOT .service-grid,.ROOT .gift-grid,.ROOT .visit-grid,.ROOT .faq-grid{grid-template-columns:1fr;gap:30px}.ROOT .service.reverse .visual,.ROOT .service.reverse .copy{order:initial}.ROOT .service-photo{aspect-ratio:4/3}.ROOT .copy h2{font-size:37px}.ROOT .copy p:not(.eyebrow){font-size:14px}.ROOT .product-grid{grid-template-columns:86px 1fr;gap:18px}.ROOT .product-grid img{width:86px;height:115px}.ROOT .product-grid h3{font-size:25px}.ROOT .product-grid p{font-size:12px}.ROOT .gift-card{padding:29px 26px;margin:4px 9px 6px 0;box-shadow:9px 9px 0 rgba(2,27,29,.26)}.ROOT .gift-card h3{font-size:38px}.ROOT .gift p:not(.eyebrow){font-size:14px}.ROOT .three{grid-template-columns:1fr;gap:28px}.ROOT .section-heading{margin-bottom:29px}.ROOT .room{aspect-ratio:4/3;object-position:center 55%}.ROOT .visit p:not(.eyebrow){font-size:14px}.ROOT .faq-grid{gap:28px}.ROOT .close{padding:50px 22px}.ROOT .close p{font-size:14px}.ROOT .related-links{gap:13px 23px}}
@media(prefers-reduced-motion:reduce){.ROOT *{scroll-behavior:auto!important;transition:none!important}}
'''

for p in PAGES:
    key=p['key'];root='matrix-'+key;d=R/'pages/regional'/key;d.mkdir(parents=True,exist_ok=True)
    facialimg=asset('pages/spa-beauty/facials/assets/review-2/'+p['facialimg']+'.webp')
    headimg=asset('pages/spa-beauty/head-spa/assets/review-2/'+p['headimg']+'.webp')
    massageimg=asset('pages/massage/regional-review-2026-11-06/assets/'+p['massageimg']+'.webp')
    productimg=asset('pages/spa-beauty/facials/assets/review-2/'+p['productimg']+'.webp')
    def service(id,num,eyebrow,title,photourl,alt,text1,text2,url,cta,extra='',reverse=False,paper=False,caption=''):
        return f'<section class="service'+(' reverse' if reverse else '')+(' paper' if paper else '')+f'" id="{id}"><div class="inner service-grid"><figure class="visual">'+img(photourl,alt,'service-photo')+(f'<figcaption>{caption}</figcaption>' if caption else '')+f'</figure><div class="copy"><p class="eyebrow">{num} / {eyebrow}</p><h2>{title}</h2>'+para(text1)+para(text2)+extra+f'<div class="actions">{a(url,cta,"button")}</div></div></div></section>'
    body=f'<div class="{root}">\n<section class="hero water"><img class="logo" src="{LOGO}" alt="Matrix Massage &amp; Bodywork" width="660" height="330" fetchpriority="high"><p class="eyebrow">CLINICAL LUXURY · ONE SALEM, WISCONSIN STUDIO</p><h1>The Premier Luxury Spa Experience Serving {p["region"]}</h1><p class="lead">{p["lead"]}</p><div class="actions">{a(BOOK,"BOOK AN APPOINTMENT ONLINE","button light")}{a(GIFT,"PURCHASE AN INSTANT eGIFT CARD","button outline")}</div><p class="hero-note">24804 75th St, Salem, WI 53168 · Welcoming guests from {p["city"]}</p></section>\n'
    body+='<nav class="jump" aria-label="Page sections">'+''.join(a('#'+id,t,'') for id,t in [('facials','Facials'),('head-spa','Head Spa'),('massage','Massage'),('lashes','Lashes'),('gift-cards','Gift Cards'),('visit','Your Visit')])+'</nav>\n'
    body+=f'<section class="intro"><p class="eyebrow">YOUR TIME. YOUR KIND OF CARE.</p><h2>{p["intro"]}</h2><p>{p["introcopy"]}</p></section>\n'
    extra='<div class="chips"><span>Custom Facials</span><span>Circadia</span><span>Dermaplaning</span><span>Acne-prone skin</span></div><div class="micro-links">'+a(BASE+'/facial-goals/clear-balance','Facial care for acne-prone skin')+a(BASE+'/facial-goals/age-defying-firm','Skincare for aging concerns')+'</div>'
    body+=service('facials','01','PERSONAL SKINCARE, PROFESSIONAL ATTENTION','Advanced Facials &amp; Clinical Skincare',facialimg,'Facial treatment from the Matrix skincare photo collection',p['facial'],p['facial2'],FAC,'VIEW FACIAL MENU &amp; AVAILABILITY',extra)
    body+='<section class="product-strip"><div class="inner"><div class="product-grid">'+img(productimg,'Circadia skincare products at Matrix in Salem')+'<div><h3>Thoughtful products. Personal attention.</h3><p>Professional Circadia skincare, chosen around your skin and the facial you book. Explore '+a(FAC,'our full facial menu')+' before your visit.</p></div></div></div></section>\n'
    extra='<div class="micro-links">'+a(HEAD,'Japanese Head Spa in Salem')+(a(BASE+'/japanese-head-spa-near-bristol-wi','Head Spa information for Bristol guests') if key=='bristol' else '')+'</div>'
    body+=service('head-spa','02','SCALP CARE + DEEP RELAXATION','Holistic Japanese Head Spa Rituals',headimg,'Japanese Head Spa treatment at Matrix in Salem, Wisconsin',p['head'],p['head2'],HEAD,'DISCOVER HEAD SPA SESSIONS',extra,True,True)
    extra='<div class="micro-links">'+a(BASE+'/deep-tissue-massage-salem-wi','Deep tissue massage')+a(BASE+'/swedish-massage-salem-wi','Swedish massage')+'</div>'
    body+=service('massage','03','FOCUSED CARE, AT YOUR COMFORT LEVEL','Therapeutic Massage &amp; Tension Relief',massageimg,'Therapeutic massage session from the Matrix treatment photo collection',p['massage'],p['massage2'],BOOK,'SCHEDULE YOUR MASSAGE',extra+a(MASS,'Explore the complete massage menu'))
    extra='<div class="chips"><span>Classic</span><span>Hybrid</span><span>Volume</span><span>Full Sets + Fills</span></div><div class="micro-links">'+a(SPA+'#sb-lashes','Explore Matrix lash extension services')+'</div>'
    body+=service('lashes','04','A FINISH THAT FEELS LIKE YOU',f'Lash Extensions Near {p["city"]}',LASH,'Illustrative close-up of a softly defined lash line',p['lashes'],p['lashes2'],BOOK,'VIEW LASH FULL SETS &amp; FILLS',extra,True,True,'Lash styling illustration; individual results vary.')
    body+=f'<section class="gift water" id="gift-cards"><div class="inner gift-grid"><div><p class="eyebrow">EASY TO GIVE. LOVELY TO RECEIVE.</p><h2>Premium Wellness Gift Cards for {p["city"]} Residents</h2>{para(p["gift"])}{para(p["gift2"])}{a(GIFT,"BUY A SPA eGIFT CARD ONLINE NOW","button light")}<br>{a(GC,"Explore massage &amp; spa gift cards")}</div><aside class="gift-card" aria-label="Digital gift card information"><p class="eyebrow">MATRIX MASSAGE &amp; BODYWORK</p><h3>A moment<br>just for them.</h3><div class="card-line"></div><strong>MASSAGE · FACIALS · HEAD SPA</strong><p>Your amount. Your message.<br>Send today or schedule ahead.</p><p>Gift-card purchase and appointment booking are separate.</p></aside></div></section>\n'
    body+='<section class="why"><div class="inner"><div class="section-heading"><p class="eyebrow">CARE THAT FEELS PERSONAL</p><h2>Why Local Clients Choose Our Studio</h2></div><div class="three">'
    for n,t,c in [('01','Completely customized care','Tell us what matters to you. Your skin goals, pressure preferences, and comfort help shape the appointment.'),('02','Boutique luxury atmosphere','Cream tones, quiet treatment spaces, and thoughtful attention give you room to settle in and enjoy your time.'),('03','One welcoming Salem studio',f'A local option for {p["city"]} guests, with online booking and a clear place to go for every visit.')]:
        body+=f'<article class="reason"><span class="number">{n}</span><h3>{t}</h3><p>{c}</p></article>'
    body+='</div></div></section>\n'
    body+=f'<section class="visit" id="visit"><div class="inner visit-grid"><div>{img(ROOM,"A treatment room at the Matrix Salem studio","room")}</div><div><p class="eyebrow">PLAN YOUR VISIT FROM {p["city"].upper()}</p><h2>Your spa time starts here, in Salem.</h2>{para(p["local"])}{para(p["local2"])}<p class="address"><strong>Matrix Massage &amp; Bodywork</strong><br>24804 75th St · Salem, WI 53168<br>{a("sms:+12629399325","Text 262-939-9325")}</p><div class="actions">{a(MAP,"GET DIRECTIONS TO MATRIX","button")}{a(BOOK,"View current appointment times")}</div><div class="micro-links">{a(BASE+"/about-5","Learn about our Salem studio")}{a(BASE+"/","Visit the Matrix Massage &amp; Bodywork website")}</div></div></div></section>\n'
    body+=f'<section class="faq" id="faq"><div class="inner faq-grid"><div class="faq-intro"><p class="eyebrow">A FEW HELPFUL ANSWERS</p><h2>Spa questions from {p["city"]} guests.</h2><p>Choose your care, plan the visit, and feel comfortable before you arrive.</p></div><div>'
    for q,ans in p['faqs']:body+='<details><summary>'+html.escape(q)+'</summary><p>'+html.escape(ans)+'</p></details>'
    body+='</div></div></section>\n<section class="related"><p class="eyebrow">EXPLORE MORE AT MATRIX</p><div class="related-links">'+a(FAC,'Custom facials in Salem')+a(HEAD,'Japanese Head Spa')+a(MASS,'Therapeutic massage')+a(SPA+'#sb-lashes','Lash extensions &amp; beauty services')+a(GC,'Spa gift cards')+'</div></section>\n'
    body+=f'<section class="close water"><p class="eyebrow">A LITTLE TIME THAT BELONGS TO YOU</p><h2>Find your next moment of care.</h2><p>Explore current services and appointment times at Matrix Massage &amp; Bodywork, serving {p["city"]} from our Salem studio.</p><div class="actions">{a(BOOK,"BOOK YOUR VISIT","button light")}{a(GIFT,"GIVE A MATRIX EXPERIENCE","button outline")}</div><p class="small">24804 75th St · Salem, WI 53168 · Text 262-939-9325</p></section>\n</div>'
    (d/'body.html').write_text(body)
    (d/'style.css').write_text(CSS.replace('FONT',FONT).replace('WATER',WATER).replace('ROOT',root).replace('TAG',p['tag']))
    config=dict(serviceName='Spa services near '+html.unescape(p['city']),revision='review-2',tagName=p['tag'],elementId=p['element'],rootClass=root,pageUrl=BASE+'/'+p['slug'],seoTitle=p['title'],seoDescription=p['description'],seoSource='../review-2026-11-06/SPECIFICATION.md',bodyFile='body.html',cssFile='style.css',expectedFaqCount=len(p['faqs']))
    (d/'page-config.json').write_text(json.dumps(config,indent=2))
    subprocess.run(['python',str(R/'plugins/matrix-page-builder/skills/matrix-page-workflow/scripts/build_page.py'),'--config',str(d/'page-config.json'),'--out',str(d/'review-2')],check=True)
    pageurl=config['pageUrl']
    schema={'@context':'https://schema.org','@graph':[{'@type':'WebPage','@id':pageurl+'#webpage','url':pageurl,'name':p['title'],'description':p['description'],'isPartOf':{'@type':'WebSite','url':BASE+'/'},'about':{'@id':pageurl+'#services'}},{'@type':'Service','@id':pageurl+'#services','name':'Massage, facial, Head Spa and lash services for '+html.unescape(p['city'])+' guests','serviceType':['Facials','Japanese Head Spa','Massage therapy','Lash extensions'],'areaServed':[{'@type':'City','name':x+', Wisconsin'} for x in (['Bristol'] if key=='bristol' else ['Twin Lakes','Genoa City'])],'provider':{'@type':'DaySpa','name':'Matrix Massage & Bodywork','url':BASE+'/','telephone':'+12629399325','address':{'@type':'PostalAddress','streetAddress':'24804 75th St','addressLocality':'Salem','addressRegion':'WI','postalCode':'53168','addressCountry':'US'}}},{'@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':1,'name':'Matrix Massage & Bodywork','item':BASE+'/'},{'@type':'ListItem','position':2,'name':'Spa near '+html.unescape(p['city']),'item':pageurl}]}]}
    (d/'service-schema.json').write_text(json.dumps(schema,indent=2))
    seo={'status':'PROPOSED; native Wix page not created','slug':p['slug'],'title':p['title'],'description':p['description'],'canonical':pageurl,'indexableOnPublication':True,'showInMainNavigation':False,'showInFooterNavigation':False,'socialImage':facialimg,'schemaFiles':['service-schema.json','review-2/faq-schema.json']}
    (d/'seo-plan.json').write_text(json.dumps(seo,indent=2))
    snippet=(d/'review-2/WIX_SEO_SNIPPET_CANDIDATE.js').read_text()
    (d/'WIX_PAGE_CODE_CANDIDATE.js').write_text('// Candidate for a new blank page only. Capture the actual page code before installing.\n'+snippet)
    proof=(d/'review-2/preview.html').read_text()
    for u,path in ASSETS.items():
        if u in proof:
            data=base64.b64encode((R/path).read_bytes()).decode();mime=mimetypes.guess_type(path)[0] or 'application/octet-stream'
            proof=proof.replace(u,'data:'+mime+';base64,'+data)
    (OUT/(key+'-full-page.html')).write_text(proof)
    (d/'asset-map.json').write_text(json.dumps({u:path for u,path in ASSETS.items() if u in body or u in (d/'style.css').read_text()},indent=2))

(OUT/'page-data.json').write_text(json.dumps(PAGES,indent=2))
(OUT/'asset-map.json').write_text(json.dumps(ASSETS,indent=2))
print('Built both complete pages, 10 visible FAQs each, production renderer, matching FAQ JSON, and self-contained proofs.')
