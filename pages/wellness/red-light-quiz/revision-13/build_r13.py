from pathlib import Path
import re

ROOT = Path(__file__).parent
OLD = ROOT.parent / 'revision-12'
html = (OLD/'embed.html').read_text()
rules = (OLD/'glow-rules.js').read_text()

def replace_once(s, old, new):
    assert s.count(old) == 1, (old[:90], s.count(old))
    return s.replace(old, new)

# Keep the engine's existing report contract and all clinical review gates.
rules = rules.replace('pathways, revision 11.', 'pathways, revision 13 (report schema 11).')
start = rules.index("  {key:'visit',")
end = rules.index("  {key:'nutrition',", start)
rules = rules[:start] + """  {key:'commitment',q:'What would you like from your guide?',hint:'Every choice gives you a free report. Nothing here books a visit or commits you to a purchase.',options:[['explore','Just exploring the benefits'],['try','Learn about trying one session'],['build','Explore a possible routine'],['maintain','Fine-tune a routine I already enjoy']]},
""" + rules[end:]
anchor = " if(a.nutrition==='yes')q.push("
rules = replace_once(rules, anchor, """ if(a.commitment && a.commitment!=='explore') q.splice(6,0,
  {key:'visit',q:'Which experience would you like to learn about?',hint:'This only personalizes your guide. Prices and optional booking appear after your results.',options:[['full','A full-body experience'],['face','Focused face & head care'],['enhancement','Adding red light to another session']]},
  {key:'availability',q:'If you chose a routine, what could fit your week?',hint:'A planning preference, not a reservation. You can decide later.',options:[['one','About once a week'],['two','About twice a week'],['three','About three times a week'],['flexible','I am flexible / just comparing']]}
 );
""" + anchor)
rules = rules.replace("This changes your visit focus, what to track, and relevant research.", "Your guide connects this focus with potential benefits and relevant research.")
rules = rules.replace("Anything we should check before a session?", "Anything your guide should take into account?")
rules = rules.replace("const review=reviewRequired(a), researchOnly=a.context==='learn'||", "const review=reviewRequired(a), researchOnly=a.commitment==='explore'||a.context==='learn'||")
rules = rules.replace("profile.title+' | Your Matrix Plan'", "profile.title+' | Your Glow Guide'")
rules = rules.replace('Why a four-week skin starting plan?', 'Red light and a fresher-looking glow')
rules = rules.replace('You chose to begin with one visit. Start there, then consider a routine of', 'You are exploring one introductory visit. If you decide to try it, start there and consider a routine of')
rules = rules.replace("p.planBody=scheduleText+profile.why;", "p.planBody='These are optional planning ideas for you to consider; no appointment has been booked. '+scheduleText+profile.why;")
rules = rules.replace('Your first visit & the path forward', 'Exploring your first red-light experience').replace('Your four-week starting plan', 'A possible four-week rhythm')
rules = rules.replace("p.planHeading='Explore the approach';p.planBody='You chose to understand the research first. Start with the study below and the part that matches your goal. '+profile.why;", "p.planHeading='Make the possibilities personal';p.planBody='You are here to explore, so there is no session schedule or service to choose. Start with the benefit that matters most to you, explore the matching research, and use the progress notes below to make it practical. '+profile.why;")
rules = rules.replace("p.nextStep='When you are ready to explore a Matrix visit, reply to this email or text 262-939-9325. We can help you choose the service that fits your focus.';", "p.nextStep='Your guide is yours to keep. Save it, revisit the research, or ask us a question. If you decide to try red light, you can explore Matrix appointments whenever you are ready.';")
rules = rules.replace("Your focus is smoother-looking skin, visible texture and a refreshed glow. A repeatable routine gives you a clearer picture of change than a single snapshot.", "Smoother-looking skin. A fresher-looking glow. Your guide explores the red-light research behind these appearance goals, with your chosen area at the center.")
rules = rules.replace("Your focus is a more intentional recovery routine around the activity you enjoy. We will pair your red light visits with practical fueling and a consistent way to notice soreness.", "Keep doing what you love, with recovery in the picture. Explore red-light research for muscle soreness, practical fueling and simple ways to notice how you feel.")
rules = rules.replace("Your focus is comfort in a closed, healed area. This guide connects your wellness visits with nutrition and a simple way to follow movement and comfort.", "Explore the possibilities of light and everyday comfort in a closed, healed area. Your guide brings the research, supportive habits and practical progress notes together.")
rules = rules.replace("consistency is the useful starting point: enough visits to establish a rhythm, with a clear moment to compare your progress.", "the exciting part is a visible goal you can follow: choose consistent lighting for photos and a simple way to notice texture and fine lines over time.")
rules = rules.replace("homeLead=a.nutrition==='yes'?'You chose nutrition support, so here are practical ways to build on your visits.", "homeLead=a.nutrition==='yes'?'You chose nutrition support, so here are practical ways to support your everyday routine.")
old = "visitBody:service.name+' — '+(a.visit==='enhancement'?'+':'')+'$'+(service.cents/100).toFixed(2)+' per visit. '+service.detail+(p.route==='visit'?' Schedule individual visits through the Matrix booking menu.':' Confirm suitability before booking light exposure.'),"
new = "visitBody:service ? service.name+' — '+(a.visit==='enhancement'?'+':'')+'$'+(service.cents/100).toFixed(2)+' per visit. '+service.detail+' Booking is optional. Confirm suitability with your provider.' : 'If you decide to try red light, Matrix offers full body ($25.99), face and head ($14.99), or a full-body enhancement during another session (+$22.99, main service separate). No service has been selected for you.',"
rules = replace_once(rules, old, new)
rules = rules.replace("'WHY THIS APPROACH'", "'THE RESEARCH BEHIND YOUR GLOW'").replace("'BUILD ON YOUR VISITS'", "'SUPPORT YOUR EVERYDAY ROUTINE'").replace("'YOUR MATRIX VISIT'", "'OPTIONAL MATRIX EXPERIENCES'").replace("'MAKE IT HAPPEN'", "'YOUR NEXT STEP, YOUR CHOICE'")
(ROOT/'glow-rules.js').write_text(rules)

head = html[:html.index('<body>')]
css = """
<style>
html,body{max-width:100%;width:100%;overflow-x:clip}body{min-height:0}main.wrap{width:100%;max-width:1100px;margin:0 auto;padding:16px 16px 24px;min-width:0}.wrap>.card,.wrap>section:not(.hero),.wrap>footer{margin:0 0 16px;width:auto;min-width:0}#intro{margin-top:0!important}.card,.resulthead{padding:24px;min-width:0}.resulthead{margin-bottom:16px}#resultTitle{font-size:clamp(25px,4vw,34px)}#resultIntro{margin-bottom:0}.report-nav{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:18px}.report-nav button{padding:12px 6px;background:white;border:1px solid var(--line);color:var(--deep);border-radius:3px;font-size:14px}.report-nav button[aria-pressed=true]{background:var(--deep);color:white}.report-nav button:focus-visible{outline:3px solid var(--gold)}.benefit-pills{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:20px 0}.benefit-pills span{padding:12px;background:var(--soft);border-left:3px solid var(--teal);font-size:14px}#results .card{margin-bottom:16px}.chapter-actions{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:20px}.chapter-actions .btn{flex:1}.chapter-note{font-size:13px;color:var(--muted)}#deliveryStatus:empty{display:none}#deliveryStatus{font-size:13px;font-weight:400;margin:0 0 12px}#leadGate{margin:0;background:white}#leadGate .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:0 12px}#learnMore{margin-top:20px;padding:16px;background:#fffdfa}#learnMore>.card{margin:16px 0 0}.optional-visit{border-top:1px solid var(--line);margin-top:24px;padding-top:20px}.btn{white-space:normal;min-height:46px;max-width:100%}.opt span,.check span{min-width:0;overflow-wrap:anywhere}#questionBody legend{float:none;margin-bottom:12px}#questionBody .options{margin-top:12px}.progress{margin:12px 0 22px}#quiz .options{grid-template-columns:1fr 1fr}#quiz .opt{min-width:0}.sr-only{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}#fullReport,#printReport{white-space:pre-wrap;overflow-wrap:anywhere;max-width:100%}.resulthead .eyebrow{font-size:11px}#matchedResearch .study{padding:16px}.resulthead p{line-height:1.5}.report-pane h2{font-size:25px}.report-pane details>div{padding-top:16px}#leadGate .btn{margin-top:20px}#leadGate .check{line-height:1.5}#leadGate .field{margin-bottom:12px}.utility{padding:12px;font-size:12px;color:var(--muted);margin-top:16px}.utility a{margin-right:12px}
@media(max-width:600px){main.wrap{padding:12px 12px 20px}.card,.resulthead{padding:20px 16px}#quiz .options{grid-template-columns:1fr}.opt{padding:11px;line-height:1.4}.report-nav{gap:5px}.report-nav button{font-size:12px;padding:12px 4px}#leadGate .form-grid{grid-template-columns:1fr}.check{font-size:12px}.benefit-pills span{padding:10px;font-size:13px}.chapter-actions{flex-direction:column;align-items:stretch}.chapter-actions .btn{width:100%}#intro h2{font-size:30px}#resultIntro{font-size:15px}.report-pane .card{padding:18px 14px}.study h3{font-size:17px}.study p{font-size:15px}.resulthead{margin-bottom:14px}}
@media print{main.wrap{padding:0}.report-nav,.utility,#learnMore,#leadGate{display:none!important}#results #printReport{display:block!important}}
</style>
"""
lead = html[html.index('<section id="leadGate"'):html.index('</section></section><pre id="printReport"')]+'</section>'
lead = lead.replace('class="card" hidden aria-label="Get your personalized report"','class="card" hidden aria-label="Optional email copy"')
lead = lead.replace('Only fill this out if you would also like an email copy.','You can return to it at any time. This form is only for an optional email copy.')
lead = lead.replace('<form id="quoteForm">','<form id="quoteForm"><div class="form-grid">').replace('<p class="fine">Sending an optional','</div><p class="fine">Sending an optional')
lead = lead.replace('>Email my guide<','>Email my free Glow Guide<').replace('>Close email form<','>Back to my guide<')
static = html[html.index('<section class="card" id="research"'):html.index('</main>')]
pricing = static[static.index('<section id="pricing"'):static.index('</section>',static.index('<section id="pricing"'))+10]
static = static.replace(pricing,'')
static = static[:static.index('<section class="card"><p class="eyebrow">Make the most of your visit')]
static = static.replace('<p class="eyebrow">Before you book</p>','<p class="eyebrow">Good to know</p>')
static = static.replace('The personalized report uses the existing name, email, phone, consent and verification process.','Your free report appears on this page immediately, without contact details or verification. Only an optional emailed copy uses the separate contact, consent and security-check process.')
static = static.replace('How often should I book red light therapy?','Do I need to choose a routine?').replace('Start with one visit, then review comfort, tolerance and whether the experience fits your goals.','No. Choose “Just exploring the benefits” for a guide without service or schedule questions. If you want planning ideas, you can request those in the quiz.')
body = """<body><main class="wrap">
<section id="intro" class="card"><p class="eyebrow">The free Matrix Glow Test</p><h2>Discover the power of red light.</h2><p class="lede">Your glow. Your recovery. Your time to recharge.</p><p>There is a reason red light is getting attention. Explore the possibilities for skin appearance, scalp care and everyday comfort—then discover what connects with <strong>your</strong> goals.</p><button id="start" class="btn">Take my free Glow Test</button><p class="fine" style="margin-top:14px">Instant results. No booking, payment or contact details needed.</p><div class="benefit-pills" aria-label="What your guide explores"><span>Skin &amp; your glow</span><span>Hair &amp; scalp support</span><span>Comfort &amp; recovery</span><span>Rest &amp; recharge</span></div><p class="fine">A few questions → your personalized benefits → a guide to keep. An email copy and a Matrix visit are optional.</p></section>
<section id="quiz" class="card" hidden aria-label="Glow Guide questions"><p class="eyebrow" id="stepLabel"></p><div class="progress" aria-hidden="true"><span id="progress"></span></div><form id="questionForm"><fieldset id="questionBody"></fieldset><div class="actions"><button class="btn" id="continue" disabled>Continue</button><button class="textbtn" type="button" id="back">Back</button></div></form><p class="fine" style="margin-top:18px">Your answers personalize a free guide. They do not book an appointment.</p></section>
<section id="results" hidden aria-label="Your Glow Guide"><div class="resulthead"><p class="eyebrow">Your possibilities, made personal</p><h2 id="resultTitle" tabindex="-1"></h2><p id="resultIntro"></p></div><p class="status" id="deliveryStatus" role="status"></p><nav class="report-nav" aria-label="Read your guide"><button type="button" data-chapter="benefits" aria-pressed="true">1 · Your benefits</button><button type="button" data-chapter="plan" aria-pressed="false">2 · Your next steps</button><button type="button" data-chapter="keep" aria-pressed="false">3 · Keep your guide</button></nav>
<section id="chapter-benefits" class="report-pane"><div class="card"><p class="eyebrow">Why people are excited</p><h2>Light. Possibility. You.</h2><div id="matchedResearch"></div><details><summary>Personalizing the experience safely</summary><p id="deviceNote"></p><a href="https://www.platinumtherapylights.com/pages/help-product-usage-safety" target="_blank" rel="noopener">Device usage guidance</a></details><div class="chapter-actions"><button type="button" class="btn" data-chapter="plan">See my next steps →</button><button type="button" class="textbtn" data-chapter="keep">Keep my guide</button></div></div></section>
<section id="chapter-plan" class="report-pane" hidden><div id="offer" class="card"></div><div class="card"><div id="progressResults"></div><details id="nutritionCard"><summary>Your optional nutrition notes</summary><div id="nutritionResults"></div></details><div class="chapter-actions"><button type="button" class="btn" data-chapter="keep">Keep my Glow Guide →</button><button type="button" class="textbtn" data-chapter="benefits">Back to my benefits</button></div></div></section>
<section id="chapter-keep" class="report-pane" hidden><div class="card" id="emailCopyPanel"><p class="eyebrow">Your results, your choice</p><h2>A little light to take with you.</h2><p>Keep the ideas that speak to you. Save or print your complete guide now, or request an optional emailed copy.</p><div class="chapter-actions"><button id="printButton" class="btn" type="button">Print / save my report</button><button id="emailCopyButton" type="button" class="btn secondary">Email me a copy (optional)</button></div><details><summary>Read my complete report here</summary><pre id="fullReport"></pre></details><div class="optional-visit"><p class="eyebrow">Only if you want to take the next step</p><h3>Curious to experience red light?</h3><p id="reportNextStep"></p><details><summary>Explore Matrix options &amp; prices</summary><div id="visitResults"></div>""" + pricing + """</details><div class="chapter-actions"><a id="resultBookLink" class="btn secondary" href="https://www.matrixmassage.net/book-appointments-salem-wi" target="_top">Explore appointments (optional)</a><a href="sms:+12629399325">Ask Matrix a question</a></div></div><button class="textbtn" id="restart" type="button">Start a new Glow Test</button></div></section><pre id="printReport" aria-label="Printable personalized report"></pre></section>
""" + lead + '<details id="learnMore"><summary>Explore the science &amp; common questions</summary>'+static+'</details>'+"""<footer class="utility"><p>Matrix Massage &amp; Bodywork · Salem, Wisconsin</p><a href="https://www.matrixmassage.net/red-light-therapy-salem-wi" target="_top">Red light therapy</a><a href="https://www.matrixmassage.net/wellness-biotech-services-salem-wi" target="_top">Wellness services</a><p style="margin-top:12px">Educational wellness guidance. Results vary; your medical care and medication decisions stay with your clinician.</p></footer></main>"""

scripts = html[html.index("document.querySelectorAll('input[name=\"priceChoice\"]')"):html.index('</script>')]
scripts = scripts.replace("['intro','quiz','results'].forEach(id=>$(id).hidden=id!==section);\n $('leadGate').hidden=true;", "['intro','quiz','results','leadGate'].forEach(id=>$(id).hidden=id!==section);\n $('learnMore').hidden=section!=='intro';")
scripts = scripts.replace("function start() {", "function start() {\n if($('restart').disabled)return;\n window.dispatchEvent(new Event('glow-start'));\n")
scripts = scripts.replace("$('questionBody').querySelector('legend').focus();", "focusView($('questionBody').querySelector('legend'),'quiz');")
scripts = scripts.replace("'See my pathway'", "'Show my free guide'")
scripts = scripts.replace("$('resultTitle').focus();", "showChapter('benefits');")
scripts = scripts.replace("$('resultBookLink').hidden=r.route!=='visit';", "$('resultBookLink').hidden=r.reviewRequired;")
scripts = scripts.replace("$('deviceNote').textContent=r.deviceNote;", "$('deviceNote').textContent=r.deviceNote;\n $('reviewNote').hidden=!r.reviewRequired;\n $('reviewNote').textContent=r.reviewRequired?'Your answers call for a suitability check before light exposure. Your guide is yours to keep; see Your next steps for the support that fits you.':'';")
body = body.replace('<div id="matchedResearch"></div>', '<p id="reviewNote" class="notice" hidden></p><div id="matchedResearch"></div>')
scripts = scripts.replace("<span class=\"tag\">Positive research to explore</span>", "<span class=\"tag\">Matched to your goal</span>")
scripts = scripts.replace("<h3>Your Matrix visit</h3>", "<h3>Your optional Matrix experience</h3>")
scripts = scripts.replace("$('leadGate').hidden=false;$('leadHeading').focus();", "display('leadGate');focusView($('leadHeading'),'email');")
scripts = scripts.replace("$('leadGate').hidden=true;$('emailCopyButton').focus();", "display('results');showChapter('keep');window.dispatchEvent(new Event('glow-email-close'));")
scripts = scripts.replace("if(key==='nutrition'", "if(key==='commitment' && answers.commitment==='explore'){delete answers.visit;delete answers.availability;}\n if(key==='nutrition'")
scripts = scripts.replace("display('intro');$('start').focus();", "display('intro');focusView($('start'),'intro');")
scripts = scripts.replace("This draft is not connected to live lead collection. Your details have not been saved and your report has not been released.", "Your free guide is ready. Email sending is unavailable in this preview; no details were saved. Return to your guide to read, print or save it.")
scripts = scripts.replace("document.getElementById('restart').addEventListener('click', reset);", "document.getElementById('restart').addEventListener('click', reset);\n  window.addEventListener('glow-email-close',()=>post({type:'cancel'}));\n  window.addEventListener('glow-start',reset);")
scripts = scripts.replace("if (message.type === 'connected')", "if (message.type === 'connected')")
ui = """
// A separate UI-only bridge supports Preview scrolling. It never carries contact data,
// answers, consent, request IDs or CAPTCHA tokens; submission origins below stay unchanged.
const UI_ORIGINS = new Set(['https://www.matrixmassage.net','https://matrixmassage.net','https://danelleborglin-mysite.editor.wix.com']);
const uiOrigin=(()=>{try{const o=new URL(document.referrer).origin;return UI_ORIGINS.has(o)?o:null;}catch{return null;}})();
function focusView(element,view){
 window.scrollTo({top:0,left:0,behavior:'instant'});
 if(element)element.focus({preventScroll:true});
 if(uiOrigin)window.parent.postMessage({channel:'matrix-glow-v7',type:'view',view},uiOrigin);
}
function showChapter(name){
 if(!['benefits','plan','keep'].includes(name))return;
 document.querySelectorAll('.report-pane').forEach(p=>p.hidden=p.id!=='chapter-'+name);
 document.querySelectorAll('.report-nav button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.chapter===name)));
 focusView($('resultTitle'),'results');
}
document.querySelectorAll('[data-chapter]').forEach(b=>b.addEventListener('click',()=>showChapter(b.dataset.chapter)));
window.addEventListener('message',e=>{
 if(e.source!==window.parent||e.origin!==uiOrigin||e.data?.channel!=='matrix-glow-v7'||e.data.type!=='start')return;
 start();
});
"""
# UI functions are hoisted; handlers attach after the DOM has loaded.
scripts = scripts.replace("$('start').addEventListener('click',start);", ui+"\n$('start').addEventListener('click',start);")
engine = re.sub(r'(?m)^export ', '', rules)
newhtml=head.replace('</head>',css+'</head>')+body+'\n<script>\n'+engine+'\n'+scripts+'\n</script></body></html>\n'
(ROOT/'embed.html').write_text(newhtml)

page=(OLD/'page-code.js').read_text()
page="import wixWindowFrontend from 'wix-window-frontend';\n"+page
page=page.replace("  status.text = 'Your free report is visible on this page. An emailed copy is optional, and only that request needs contact details, consent, and one security check.';", """  captcha.collapse();
  status.collapse();
  const alignQuiz = () => wixWindowFrontend.scrollTo(0, wixWindowFrontend.formFactor === 'Mobile' ? 605 : 545, { scrollAnimation: false });
  $w('#glowBookButton').onClick(() => { send({type:'start'}); alignQuiz(); });""")
page=page.replace("    if (message.type === 'ready')", """    if (message.type === 'view' && ['intro','quiz','results','email'].includes(message.view)) {
      await alignQuiz();
      return;
    }
    if (message.type === 'ready')""")
page=page.replace("      captcha.reset();\n      return;", "      captcha.reset();\n      captcha.collapse();\n      status.collapse();\n      return;")
page=page.replace("    status.text = 'Complete one security verification", "    await status.expand();\n    status.text = 'Complete one security verification")
page=page.replace("else { captcha.show(); captcha.scrollTo(); }", "else { await captcha.expand(); await captcha.show(); await wixWindowFrontend.scrollTo(0, wixWindowFrontend.formFactor === 'Mobile' ? 1709 : 1569, { scrollAnimation: false }); }")
page=page.replace("      captcha.reset();\n    }", "      captcha.reset();\n      captcha.collapse();\n    }")
(ROOT/'page-code.js').write_text(page)
(ROOT/'client-email-template.html').write_text((OLD/'client-email-template.html').read_text())
print('Built R13:',len(newhtml.encode()),'HTML bytes;',len(rules.encode()),'rule bytes')
