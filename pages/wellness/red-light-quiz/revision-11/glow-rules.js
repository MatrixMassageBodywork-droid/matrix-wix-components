/* Matrix red light pathways, revision 11. Owner pricing confirmed 2026-11-07.
   Deterministic service planning, not an AI diagnosis or medical-dose calculator.
   This canonical module is embedded in the browser and recomputed on the server. */
'use strict';
const SOURCES = {
 protein:'https://www.wwl.nhs.uk/media/.leaflets/6810a8232a6791.93172813.pdf',
 c:'https://ods.od.nih.gov/factsheets/VitaminC-HealthProfessional/',
 zinc:'https://ods.od.nih.gov/factsheets/Zinc-HealthProfessional/',
 hair:'https://www.aad.org/public/diseases/hair-loss/treatment/diagnosis-treat?uid=0ca66bba8ee39s16',
 biotin:'https://www.aad.org/news/supplements-debunking-common-myths',
 usage:'https://www.platinumtherapylights.com/pages/help-product-usage-safety'
};
const FULLSCRIPT_URL='https://us.fullscript.com/s/matrix_massage_wellness/shop';
const BOOKING_URL='https://www.matrixmassage.net/book-appointments-salem-wi';
const SERVICES = Object.freeze({
 full: {name:'Full Body Red Light Therapy', cents:2599, detail:'A standalone full body visit.'},
 face: {name:'Face & Head Red Light Therapy', cents:1499, detail:'Face and head focus; also available as an add-on during a massage.'},
 enhancement: {name:'Full Body Red Light Enhancement', cents:2299, detail:'During an existing session. This is an additional charge; the main service is booked and priced separately.'}
});
const GOALS={
 skin:'Skin & facial rejuvenation',hair:'Hair & scalp support',joint:'Joint comfort',
 muscle:'Muscle comfort & active recovery',tissue:'Soft-tissue support',
 inflam:'Everyday comfort & inflammation questions',thyroid:'Thyroid & Hashimoto’s research',
 wellness:'Rest & a regular recharge'
};
const contextQuestions={
 skin:{q:'Where are you starting with your skin?',options:[['appearance','Ready to focus on appearance'],['sensitive','An active flare, irritation, or light sensitivity'],['unsure','Exploring what fits my skin']]},
 hair:{q:'What best describes your hair concern?',options:[['pattern','Assessed pattern thinning'],['redflag','Sudden, patchy, painful, or inflamed hair loss'],['unsure','Gradual thinning that has not been assessed']]},
 joint:{q:'What best describes the discomfort?',options:[['review','Familiar, assessed discomfort or stiffness'],['new','New, severe, swollen, or unexplained symptoms'],['learn','I am exploring the research first']]},
 muscle:{q:'What brings you here?',options:[['wellness','Familiar tightness or post-workout soreness'],['injury','A new injury, marked weakness, or unexplained pain'],['learn','I am exploring recovery research first']]},
 tissue:{q:'What stage are you in?',options:[['cleared','A closed, healed area; cleared for wellness visits'],['active','An open wound or current postoperative restriction'],['learn','I am exploring tissue-healing research']]},
 inflam:{q:'What are you hoping to address?',options:[['everyday','Everyday stiffness and a regular self-care routine'],['condition','An inflammatory diagnosis or worsening symptoms'],['learn','I want to understand inflammation research']]},
 thyroid:{q:'What would you like your report to explain?',options:[['provider','The studies I can share with my thyroid clinician'],['learn','How thyroid research differs from a spa session'],['unsure','Where red light might fit alongside my existing care']]},
 wellness:{q:'What would feel most useful?',options:[['routine','A regular time to switch off'],['try','Experiencing red light for the first time'],['unsure','Finding a self-care rhythm I can keep']]}
};
const focuses={
 skin:[['face','Face: fine lines & texture'],['neck','Face & neck: appearance'],['body','Body skin: appearance']],
 hair:[['crown','Crown & part line'],['hairline','Hairline'],['diffuse','Overall scalp thinning']],
 joint:[['knee','Knee comfort'],['hands','Hands or smaller joints'],['other','Another joint or several areas']],
 muscle:[['upper','Upper body'],['lower','Lower body'],['whole','Several areas / both sides']],
 tissue:[['local','One closed, healed area'],['multiple','Several closed, healed areas'],['research','Research only']],
 inflam:[['local','One familiar area of stiffness'],['whole','General comfort & self-care'],['research','Understanding the research']],
 thyroid:[['studies','Research & clinician questions'],['skin','Skin-related concerns alongside my care'],['hair','Hair-related concerns alongside my care']],
 wellness:[['quiet','A private pause'],['sleep','An evening wind-down routine'],['whole','An all-over light experience']]
};
const RESEARCH={
 skin:{title:'Facial rejuvenation',summary:'A randomized study of 95 women found improvements in measured glabellar and right eye-area wrinkle length and satisfaction after four weeks of red LED use.',detail:'The trial used a 660 nm mask two or three times weekly; it found no between-group improvement on the Wrinkle Assessment Scale. These are encouraging findings, not validation of an identical BioMax dose.',url:'https://link.springer.com/article/10.1007/s10103-025-04383-1'},
 hair:{title:'Pattern hair density',summary:'A systematic review of 38 studies involving 3,098 participants found significantly improved hair density versus placebo for pattern hair loss.',detail:'Treatment periods in pattern-hair studies ranged from 4 to 26 weeks. Results varied substantially. The review does not establish equivalent outcomes for this panel or every cause of shedding.',url:'https://pubmed.ncbi.nlm.nih.gov/39404126/'},
 joint:{title:'Joint comfort research',summary:'A review of 10 studies and 542 participants found reduced pain at rest with photobiomodulation in knee osteoarthritis.',detail:'Certainty was very low, and the authors recommend considering PBM alongside established care, not alone. Knee results cannot be assumed for every joint or for this panel.',url:'https://pubmed.ncbi.nlm.nih.gov/38775202/'},
 knee:{title:'An individualized knee pilot',summary:'In a 31-person pilot study, twice-weekly 850 nm treatment over five weeks reduced knee pain versus placebo; improvements persisted at six-week follow-up.',detail:'Dose was individualized by BMI and skin color. The abstract does not identify BioMax. Its dose and frequency are research context, not a transferable spa prescription.',url:'https://pubmed.ncbi.nlm.nih.gov/36286574/'},
 muscle:{title:'Muscle soreness research',summary:'A systematic review covering 19 trials and 672 participants overall found a reduction in muscle soreness with photobiomodulation applied before exercise.',detail:'The PBM soreness finding was low-certainty evidence. These results do not validate a specific BioMax schedule or establish faster injury healing.',url:'https://pubmed.ncbi.nlm.nih.gov/40954632/'},
 whole:{title:'Whole-body evidence',summary:'Two studies in a five-study whole-body review reported better sleep quality, an encouraging reason to keep studying this application.',detail:'The review included 105 participants overall and found no benefit for fatigue biomarkers or exercise performance. Do not equate localized sports studies with a whole-body panel service.',url:'https://pubmed.ncbi.nlm.nih.gov/39883205/'},
 tissue:{title:'Tissue-healing research',summary:'A review of six randomized LED trials reported improved wound healing or wound-bed quality in some studies alongside standard care.',detail:'Results were inconsistent and certainty was very low. Medical wound protocols are not a spa service; active wounds and postoperative restrictions stay with the treating team.',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC13279567/'},
 thyroid:{title:'Hashimoto’s research to share',summary:'A small study reported favorable thyroid-related changes with targeted PBM plus supplements compared with supplements alone.',detail:'The study was non-randomized and used an ultrasound-guided 820 nm contact laser, not a broad panel. It does not justify a spa thyroid-exposure protocol, supplement stack, or medication changes.',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC10455109/'}
};
const escapeHtml=s=>String(s).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
export function buildQuestions(a){
 const q=[
  {key:'goal',q:'What would you love to focus on?',hint:'Choose your main priority. Your report will follow that pathway.',options:Object.entries(GOALS)},
  {key:'context',...(contextQuestions[a.goal]||contextQuestions.wellness),hint:'Choose the closest match so your next step fits your situation.'},
  {key:'focus',q:'Where should we focus your report?',hint:'This changes your visit focus, what to track, and relevant research.',options:focuses[a.goal]||focuses.wellness},
  {key:'experience',q:'How has your skin felt with light therapy before?',hint:'This helps plan your introduction, not a diagnosis of light sensitivity.',options:[['new','I am new to it'],['comfortable','I have used it comfortably'],['reactive','I have had an uncomfortable reaction']]},
  {key:'safety',q:'Anything we should check before a session?',hint:'Choose review for pregnancy, age under 18, light-sensitizing medication, cancer care, an implant or pacemaker, a clinician restriction, or uncertainty. Routine intake still applies.',options:[['none','I am an adult and none of these apply'],['review','Yes, or I am unsure']]},
  {key:'visit',q:'How would you like to include red light?',hint:'These are the current service prices. Add-on prices are in addition to your main appointment.',options:[['full','Full body visit — $25.99'],['face','Face & head — $14.99; also a massage add-on'],['enhancement','Full body during a session — +$22.99']]},
  {key:'commitment',q:'How would you like to begin?',hint:'Your choice changes the first planning block. You do not have to buy a series.',options:[['try','One visit, then decide'],['build','Build a consistent routine'],['maintain','Revisit a routine I already enjoy']]},
  {key:'availability',q:'What could comfortably fit your week?',hint:'We will fit the proposed schedule to your availability, not simply add more visits.',options:[['one','About once a week'],['two','About twice a week'],['three','About three times a week'],['flexible','I can be flexible']]},
  {key:'nutrition',q:'Include food & supplement support?',hint:'Get practical food ideas, relevant supplement options and research matched to your goal.',options:[['yes','Yes, include my nutrition notes'],['skip','Skip this section']]}
 ];
 if(a.nutrition==='yes')q.push(
  {key:'protein',q:'Do you regularly include protein in your meals?',hint:'Think beans, tofu, dairy, eggs, meat, or fish.',options:[['enough','Usually, yes'],['low','Often not, or I struggle to get enough'],['unsure','I am not sure']]},
  {key:'vitc',q:'How often do vitamin-C-rich foods make it onto your plate?',hint:'Think citrus, berries, peppers, broccoli, or kiwi.',options:[['enough','Regularly'],['low','Rarely, or my diet is limited'],['unsure','I am not sure']]},
  {key:'zinc',q:'Has a qualified clinician recommended zinc for you?',hint:'An existing recommendation matters; a hair or skin goal alone does not establish a deficiency.',options:[['clinician','Yes, for an identified need'],['no','No'],['unsure','I am not sure']]}
 );
 return q;
}
export function reviewRequired(a){
 return a.safety!=='none'||a.experience==='reactive'||a.goal==='thyroid'||
 ['redflag','active','new','injury','condition','sensitive'].includes(a.context)||
 (a.goal==='hair'&&a.context==='unsure');
}
function nutritionBlocked(a){return reviewRequired(a);}
function researchFor(a){
 const keys=a.goal==='inflam'?['joint']:a.goal==='wellness'?['whole']:[a.goal];
 if(a.goal==='joint'&&a.focus==='knee')keys.push('knee');
 if(a.goal==='muscle'&&a.focus==='whole')keys.push('whole');
 if(a.goal==='thyroid'&&['skin','hair'].includes(a.focus))keys.push(a.focus);
 return keys.map(k=>RESEARCH[k]).filter(Boolean);
}
function trackFor(a){
 if(a.goal==='skin')return a.focus==='neck'?'Use consistent face-and-neck photos and note texture and comfort.':a.focus==='body'?'Use photos of the same body area in the same lighting; note texture and tolerance.':'Use consistent facial photos, the same lighting, and one priority such as fine-line appearance or texture.';
 if(a.goal==='hair')return 'Photograph the '+({crown:'part line and crown',hairline:'hairline',diffuse:'same scalp sections'}[a.focus]||'same scalp area')+' in consistent lighting. Track shedding separately; density changes take longer than a single visit.';
 if(a.goal==='joint')return 'Record '+({knee:'knee comfort during stairs and walking',hands:'hand comfort during a familiar daily task',other:'comfort in your chosen joint during the same daily task'}[a.focus]||'daily comfort')+' and minutes of morning stiffness. Avoid testing through pain.';
 if(a.goal==='muscle')return 'Track '+({upper:'upper-body',lower:'lower-body',whole:'overall'}[a.focus]||'muscle')+' soreness and ease of movement at the same point in your training week; do not use improved comfort as injury clearance.';
 if(a.goal==='tissue')return 'Track comfort and movement in the closed, healed area. Wound measurements and healing decisions belong to your treating clinician.';
 if(a.goal==='thyroid')return 'Keep your existing clinician-directed lab and symptom follow-up. Bring the linked study and the questions below to that visit.';
 if(a.goal==='inflam')return a.focus==='local'?'Track comfort and stiffness in the same familiar area; this is not a measure of systemic inflammation.':'Track daily comfort and whether the routine fits your life, not claims about inflammatory blood markers.';
 return a.focus==='sleep'?'Keep a simple sleep and wind-down diary; note bedtime consistency and how rested you feel.':'Notice how you feel after each visit and whether this time to yourself is worth keeping.';
}
function reviewMessage(a){
 if(a.goal==='thyroid')return 'Your report brings the thyroid studies together for your clinician. These protocols use specialized, targeted equipment; Matrix does not assign thyroid exposure or medication changes from a quiz.';
 if(a.context==='redflag')return 'Sudden, patchy, painful, or inflamed hair loss deserves a prompt assessment of the cause before light sessions are planned.';
 if(a.goal==='hair'&&a.context==='unsure')return 'Start by having the cause of thinning assessed. Your report includes pattern-hair research and a photo-tracking guide so you can make an informed next step.';
 if(a.context==='active')return 'Your treating team should guide open wounds and postoperative restrictions. Your report explains the positive tissue-healing research to discuss with them.';
 if(['new','injury','condition'].includes(a.context))return 'New or worsening symptoms need an appropriate healthcare assessment before a red light visit. Your report gives you relevant research without guessing at the cause.';
 return 'Your answers suggest checking suitability before light exposure. Review your medication, restriction, skin flare, or previous reaction with the appropriate clinician; the report is still yours to keep.';
}
const PATHWAYS={
 skin:{title:'Skin Renewal',opening:'Your focus is smoother-looking skin, visible texture and a refreshed glow. A repeatable routine gives you a clearer picture of change than a single snapshot.',why:'For skin appearance, consistency is the useful starting point: enough visits to establish a rhythm, with a clear moment to compare your progress.'},
 hair:{title:'Scalp & Hair Support',opening:'Your focus is a fuller-looking crown, hairline or part. This pathway pairs careful scalp coverage with photographs and nutrition habits you can keep.',why:'Hair follows a longer growth cycle. Use the first month to establish your routine, then review density over months with your hair-loss clinician.'},
 joint:{title:'Move with More Ease',opening:'Your focus is everyday movement that feels more comfortable. Your plan brings red light, a simple movement check and supportive daily habits together.',why:'Choose one everyday task that matters to you—stairs, a walk or opening a jar—so the plan stays connected to how you want to feel.'},
 muscle:{title:'Recover & Recharge',opening:'Your focus is a more intentional recovery routine around the activity you enjoy. We will pair your red light visits with practical fueling and a consistent way to notice soreness.',why:'Keep your training load and recovery notes in view. This makes it easier to distinguish a demanding workout week from a change in your comfort.'},
 tissue:{title:'Comfort & Tissue Support',opening:'Your focus is comfort in a closed, healed area. This guide connects your wellness visits with nutrition and a simple way to follow movement and comfort.',why:'For a healed area, use the first month as a comfort and routine checkpoint, alongside any instructions from your treating team.'},
 inflam:{title:'Everyday Ease',opening:'Your focus is less everyday stiffness and more room for the things you enjoy. Your plan combines a consistent self-care rhythm with practical habits that support long-term health.',why:'Focus on what you can notice—comfort, movement and daily habits—rather than trying to estimate inflammation from how a session feels.'},
 thyroid:{title:'Thyroid Research Companion',opening:'You want an informed way to explore red light alongside your thyroid care. Your report brings the relevant research, useful questions and nutrition priorities into one place.',why:'Thyroid research uses targeted clinical protocols. Your thyroid clinician is the right partner to decide whether that research fits your care.'},
 wellness:{title:'Rest & Recharge',opening:'Your focus is protected time to slow down and recharge. A small, repeatable ritual can make self-care easier to keep on a busy calendar.',why:'Treat the first month as a chance to build a routine you enjoy and learn what helps you unwind.'}
};
function nutritionFor(a){
 if(a.nutrition!=='yes')return [];
 const notes=[];
 const add=(name,why,source,label,caution='')=>notes.push({name,why,source,sourceLabel:label,caution});
 const diet='https://pubmed.ncbi.nlm.nih.gov/27440261/';
 if(a.goal==='skin'||a.goal==='tissue'){
  add('Pair protein with color','Try Greek yogurt or fortified soy yogurt with berries at breakfast; at lunch, pair eggs, chicken, tofu or lentils with bell peppers or broccoli. Protein provides tissue building blocks, while vitamin C is needed for normal collagen formation. Make this a daily habit alongside your skin or comfort routine.',SOURCES.c,'NIH: vitamin C and collagen');
  add('A practical skin-support plate','Build dinner around fish, tofu or beans, colorful vegetables and olive oil, with nuts or seeds if they suit your diet. This gives your routine variety, protein and unsaturated fats without relying on a single “beauty” ingredient.',diet,'Mediterranean-pattern nutrition research');
 }else if(a.goal==='hair'){
  add('Give hair the basics to grow','Include a protein food at each meal and eat enough overall. Try eggs and whole-grain toast, a lentil-and-pepper bowl, or fish/tofu with rice. Pair plant iron foods such as lentils and beans with vitamin-C-rich peppers or citrus to support iron absorption.',SOURCES.hair,'AAD: nutrition and hair loss');
  add('Make supplements specific','If shedding or thinning persists, ask your clinician whether iron status or another nutritional issue needs assessment. Iron, zinc and biotin are useful when a deficiency is identified; a high-dose hair blend is not a shortcut to that assessment.',SOURCES.biotin,'AAD: hair supplement guidance','Tell your clinician about biotin before thyroid or other blood tests.');
 }else if(a.goal==='muscle'){
  add('Put recovery on your plate','After a demanding workout, plan a meal with both protein and carbohydrate: Greek yogurt with oats and fruit, tofu with rice, or chicken with potatoes. Spread protein foods through your day. Research in adults doing resistance training supports adequate protein for gains in muscle and strength.', 'https://pubmed.ncbi.nlm.nih.gov/28698222/','Protein and resistance-training research');
  add('Make fueling easy to repeat','Keep a simple recovery option ready before a busy day: yogurt, soy milk, eggs, beans or a protein shake that fits your diet. Drink water regularly and eat enough to match your activity; a light session does not replace food, sleep or rest days.',SOURCES.protein,'NHS: protein and tissue maintenance');
 }else if(a.goal==='joint'||a.goal==='inflam'){
  add('Build a Mediterranean-style week','Use olive oil in place of some butter, add beans or lentils to several meals, and choose a handful of nuts, colorful vegetables and fish when suitable for your diet. A randomized Mediterranean-diet study found improvements in several inflammatory markers over years—support for a steady eating pattern, not a quick fix.',diet,'PREDIMED nutrition study');
  add('Keep movement well fueled','Try a salmon-and-vegetable bowl, a chickpea salad with olive oil, or lentil soup with whole-grain bread. Include a protein source at each meal to support the muscles that help you move comfortably.',SOURCES.protein,'NHS: protein guidance');
  if(a.goal==='joint'&&a.focus==='knee'&&!reviewRequired(a))add('An option to discuss: curcumin','If your assessed knee discomfort is osteoarthritis, ask your clinician or pharmacist whether a curcumin product fits your care. A 28-day trial reported improved knee symptoms, but it was open-label and tested one specific formulation; results do not apply to every turmeric product.','https://pubmed.ncbi.nlm.nih.gov/30975196/','Curcumin knee-osteoarthritis trial','Review medicines and liver history before using concentrated curcumin; some enhanced-absorption products have caused liver injury.');
 }else if(a.goal==='thyroid'){
  add('Keep meals steady and varied','Build meals around a protein food, vegetables or fruit, and a whole-grain or starchy food: eggs with toast and berries, or tofu with rice and vegetables. Use this report to discuss persistent fatigue, hair changes or a restricted diet with your thyroid clinician.',SOURCES.hair,'AAD: nutrition and hair concerns');
  add('Choose targeted nutrition support','Ask your clinician which, if any, nutrient tests or supplements fit your history. Keep iodine, selenium and “thyroid support” products tied to a specific clinical recommendation; the research below does not establish a supplement plan for every person with Hashimoto’s.',RESEARCH.thyroid.url,'Hashimoto’s feasibility study','Keep thyroid medication and supplement timing consistent with your prescriber’s instructions.');
 }else{
  add('Nourish your wind-down','Add magnesium-rich foods such as pumpkin seeds, almonds, beans, whole grains or leafy greens. Try oats with nuts for breakfast or a bean-and-greens bowl for dinner. Magnesium supports normal nerve and muscle function; food is an easy place to start.', 'https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/','NIH: magnesium foods and function');
  if(a.focus==='sleep'&&!reviewRequired(a))add('An option to discuss: magnesium glycinate','For your sleep focus, magnesium bisglycinate is an option to review if food intake is low. A four-week placebo-controlled trial in 155 adults found a modest improvement in self-reported insomnia symptoms with 250 mg elemental magnesium daily. That is the study amount, not a personal prescription.','https://pubmed.ncbi.nlm.nih.gov/40918053/','Magnesium and sleep trial','Check kidney health, medicine interactions and the elemental magnesium total with a pharmacist or clinician before choosing a product.');
 }
 if(a.goal==='skin'&&!reviewRequired(a))add('A skin-specific option: oral hyaluronic acid','For fine lines and hydration, oral hyaluronic acid is an option to discuss. A small, industry-affiliated randomized trial in 40 adults found improvements in hydration and wrinkle measures after 12 weeks using 120 mg daily. This is a studied option to consider alongside your routine, not a guaranteed result or a personal dose instruction.','https://pubmed.ncbi.nlm.nih.gov/34203487/','Oral hyaluronic acid skin trial','Choose a product only after checking its ingredients, suitability and label with your clinician or pharmacist.');
 if(!reviewRequired(a)){
  if(a.protein==='low')add('Your reported gap: protein','You told us protein is often missing. Choose one dependable protein-containing breakfast this week. If food alone remains difficult, a whey, soy or pea-based protein powder can help fill the gap; select for your allergies and dietary needs.', 'https://pubmed.ncbi.nlm.nih.gov/28698222/','Protein supplementation research','Review protein targets first if you have kidney disease or a prescribed protein restriction.');
  if(a.vitc==='low')add('Your reported gap: vitamin C','You reported few vitamin-C-rich foods. Add a kiwi, orange, strawberries or bell peppers each day. If your diet stays limited, ask about a modest vitamin C supplement to meet your needs rather than a high-dose routine.',SOURCES.c,'NIH: vitamin C food and supplement guidance');
  if(a.zinc==='clinician')add('Keep your existing zinc plan','You reported that a clinician has already recommended zinc. Follow that specific dose and duration and include it when reviewing any new multivitamin or supplement.',SOURCES.zinc,'NIH: zinc guidance','Avoid stacking zinc products; excessive intake can lower copper levels.');
 }
 return notes;
}
function researchForReport(a){
 if(a.goal==='skin')return [{title:'Why a four-week skin starting plan?',summary:'In a randomized trial of 95 women, a 660 nm red-light mask used two or three times weekly for four weeks improved some measured wrinkle lengths and appearance satisfaction.',detail:'The study did not find a difference on every wrinkle measure or an advantage of three sessions over two. It supports a consistent skin routine; Matrix uses different equipment, so the study’s exposure dose is not copied.',url:'https://pubmed.ncbi.nlm.nih.gov/40167796/'}];
 if(a.goal==='hair')return [{title:'Hair progress has a longer timeline',summary:'A randomized sham-controlled trial in men and women with pattern hair loss used a laser comb three times weekly for 26 weeks and found increased terminal hair density.',detail:'This is why four weeks is a starting checkpoint, not a hair-regrowth deadline. The trial used a scalp device; confirm that your assessed concern and scalp coverage fit the proposed service.',url:'https://pubmed.ncbi.nlm.nih.gov/24474647/'}];
 if(a.goal==='joint')return a.focus==='knee'?[{title:'A repeated-visit knee study',summary:'A small randomized placebo-controlled trial in 31 people with knee osteoarthritis used individualized 850 nm treatment twice weekly for five weeks and found reduced pain, including at follow-up.',detail:'This makes repeat visits worth discussing for an assessed knee concern. It was a small study of targeted treatment, not proof of the same outcome from a Matrix panel or a four-week course.',url:RESEARCH.knee.url}]:[RESEARCH.joint];
 return researchFor(a);
}
export function makePlan(a){
 const review=reviewRequired(a), researchOnly=a.context==='learn'||['tissue','inflam'].includes(a.goal)&&a.focus==='research';
 const route=review?'clinician':researchOnly?'explore':'visit';
 const focus=(focuses[a.goal]||focuses.wellness).find(([v])=>v===a.focus)?.[1]||'Your main priority';
 const profile=PATHWAYS[a.goal]||PATHWAYS.wellness, service=SERVICES[a.visit];
 const p={goal:GOALS[a.goal],title:profile.title+' | Your Matrix Plan',review,route,focus,nutrition:nutritionFor(a),research:researchForReport(a),tracking:trackFor(a),offer:null,schedule:null,rationale:[profile.why],introduction:profile.opening,maintenance:'',nextStep:'',planBody:''};
 if(route==='clinician'){
  p.planHeading='Your next step, with the right support';p.planBody=reviewMessage(a)+' '+profile.why;
  p.nextStep='Bring this report to your clinician, then contact Matrix to plan an appropriate wellness visit once your questions are addressed.';
  p.maintenance='Use your existing clinical follow-up to review symptoms, restrictions and any nutrition recommendations.';
 }else if(route==='explore'){
  p.planHeading='Explore the approach';p.planBody='You chose to understand the research first. Start with the study below and the part that matches your goal. '+profile.why;
  p.nextStep='When you are ready to explore a Matrix visit, reply to this email or text 262-939-9325. We can help you choose the service that fits your focus.';
  p.maintenance='Keep this report as a starting point for your next conversation.';
 }else{
  let perWeek=a.availability==='one'?1:a.availability==='three'?3:2;
  let cadence='2–3 visits per week for 4 weeks to start';
  let scheduleText='Based on your chosen pathway, we recommend '+cadence+'. ';
  if(['muscle','tissue','inflam','wellness'].includes(a.goal))scheduleText='For your Matrix wellness starting routine, we recommend '+cadence+'. This is a practical self-care schedule with a four-week review, rather than a condition-specific treatment dose. ';
  if(a.commitment==='try'){perWeek=null;cadence='One introductory visit, then choose your rhythm';scheduleText='You chose to begin with one visit. Start there, then consider a routine of 2–3 visits per week for four weeks if you would like to build consistency. ';}
  else if(a.availability==='one'){cadence='Once weekly to fit your calendar; review after 4 weeks';scheduleText='Our usual Matrix starting rhythm is 2–3 visits per week for four weeks. You selected once-weekly availability, so begin with one visit each week and review at week four; this lighter schedule differs from the repeated-visit studies below. ';}
  else if(a.availability==='two')scheduleText+='Since twice weekly fits your calendar, plan two visits each week—eight visits across the first month. ';
  else if(a.availability==='three')scheduleText+='Your three-times-weekly availability allows up to twelve visits over the first month; we will confirm the pace at your first visit. ';
  else scheduleText+='Start with two visits weekly and discuss a third if it fits your response and calendar. ';
  if(a.commitment==='maintain')scheduleText+='Bring your current routine so we can decide whether a new starting block or a lighter maintenance rhythm makes more sense. ';
  if(a.goal==='hair')scheduleText+='For assessed pattern thinning, this first month establishes the habit; the linked hair trial followed treatment for 26 weeks. ';
  p.planHeading=a.commitment==='try'?'Your first visit & the path forward':'Your four-week starting plan';
  p.planBody=scheduleText+profile.why;
  p.schedule={perWeek,weeks:a.commitment==='try'?null:4,visits:perWeek?perWeek*4:1,cadence,checkpoint:'At week four, compare your starting notes and decide on the next block together.',kind:'Matrix starting schedule; provider confirms suitability and device setup'};
  p.offer={name:service.name,unitPrice:service.cents/100,price:service.cents/100,visits:1,type:service.detail,cadence,note:'Per-visit pricing. Enhancements are added to the main appointment.'};
  p.maintenance=a.goal==='hair'?'At week four, review scalp coverage and consistency. Compare longer-term density photos with your hair-loss clinician; visible hair changes take months.':'At week four, compare your starting notes and photos, celebrate what has changed, and choose the next phase with Matrix—another focused block or a more spaced-out routine.';
  p.nextStep='Reserve your first '+service.name.toLowerCase()+' visit and bring this plan. We will confirm the treatment area, comfortable device settings and your next dates with you.';
 }
 return p;
}
export function buildClientReport(a){
 const p=makePlan(a),service=SERVICES[a.visit];
 const homeLead=a.nutrition==='yes'?'You chose nutrition support, so here are practical ways to build on your visits. Start with one or two changes you can repeat this week.':'';
 const report={version:11,title:p.title,goal:p.goal,focus:p.focus,route:p.route,reviewRequired:p.review,
  introduction:p.introduction+' Your selected focus: '+p.focus.toLowerCase()+'.',rationale:p.rationale,
  planHeading:p.planHeading,planBody:p.planBody,schedule:p.schedule,tracking:p.tracking,maintenance:p.maintenance,nextStep:p.nextStep,
  proposedOffer:p.offer,bookingUrl:p.route==='visit'?BOOKING_URL:'',
  nutritionIncluded:a.nutrition==='yes',nutritionSummary:homeLead,nutritionNotes:p.nutrition,
  fullscriptUrl:a.nutrition==='yes'?FULLSCRIPT_URL:'',
  fullscriptText:a.nutrition==='yes'?'Explore the Matrix Fullscript store for optional nutrition support. We can help you narrow the options to fit your diet, medications and goals.':'' ,
  nutritionNotice:a.nutrition==='yes'?'Choose foods and products that fit your allergies and medical care. Review new supplements with your clinician or pharmacist; the quiz does not diagnose a deficiency.':'',
  researchNotes:p.research,
  visitBody:service.name+' — '+(a.visit==='enhancement'?'+':'')+'$'+(service.cents/100).toFixed(2)+' per visit. '+service.detail+(p.route==='visit'?' Schedule individual visits through the Matrix booking menu.':' Confirm suitability before booking light exposure.'),
  deviceNote:'Your provider confirms exposure time, distance, settings and eye protection for the actual device and treatment area. Studies using a mask, laser or other setup inform the discussion; they do not establish an identical Matrix dose.',
  deviceSource:SOURCES.usage,
  closing:'A thoughtful plan. A rhythm you can keep. A little more time for you. — Matrix Massage & Bodywork',
  deliveryStatus:'Report generation is automatic. Email acceptance and inbox delivery are tracked separately.'};
 return report;
}
function researchText(r){return r.researchNotes.map(n=>n.title+'\n'+n.summary+' '+n.detail+'\nRead the research: '+n.url).join('\n\n');}
function nutritionText(r){return r.nutritionIncluded?[r.nutritionSummary,...r.nutritionNotes.map(n=>n.name+'\n'+n.why+(n.caution?' '+n.caution:'')+'\n'+n.sourceLabel+': '+n.source),r.fullscriptText,r.fullscriptUrl,r.nutritionNotice].filter(Boolean).join('\n\n'):'';}
export function emailReportVariables(r,legacyText=''){
 if(r.version!==11)return {reportTitle:r.title||'Your Matrix report',reportIntro:'Your saved Matrix report is included below.',planHeading:'Your saved pathway',planBody:legacyText||reportText(r),researchBody:'',homeBody:'',visitBody:'',nextStepBody:r.nextStep||''};
 return {reportTitle:r.title,reportIntro:r.introduction,planHeading:r.planHeading,planBody:r.planBody,researchBody:researchText(r),homeBody:[nutritionText(r),'Notice your progress\n'+r.tracking,r.maintenance].filter(Boolean).join('\n\n'),visitBody:r.visitBody,nextStepBody:r.nextStep};
}
export function clientReportText(a){return reportText(buildClientReport(a));}
export function reportText(r,{offersApproved=true,bookingUrl=''}={}){
 if(r.version!==11)return [r.title,r.goal,r.introduction,r.nextStep,...(r.researchNotes||[]).map(n=>n.title+'\n'+n.summary+' '+n.detail+'\n'+n.url)].filter(Boolean).join('\n\n');
 const v=emailReportVariables(r);
 return [v.reportTitle,v.reportIntro,v.planHeading,v.planBody,'WHY THIS APPROACH',v.researchBody,'BUILD ON YOUR VISITS',v.homeBody,'YOUR MATRIX VISIT',v.visitBody,'MAKE IT HAPPEN',v.nextStepBody,r.route==='visit'?(bookingUrl||r.bookingUrl):'Contact Matrix: 262-939-9325',r.deviceNote,r.closing,'Educational wellness guidance; your medical care and medication decisions stay with your clinician.'].filter(Boolean).join('\n\n');
}
export function validateAnswers(raw){
 if(!raw||typeof raw!=='object'||Array.isArray(raw))throw new Error('INVALID_REQUEST');
 const allowed=['goal','context','focus','experience','safety','commitment','availability','nutrition','visit','protein','vitc','zinc'];
 if(Object.keys(raw).some(k=>!allowed.includes(k)))throw new Error('INVALID_REQUEST');
 const clean={};
 for(const q of buildQuestions(raw)){
  if(typeof raw[q.key]!=='string'||!q.options.some(([v])=>v===raw[q.key]))throw new Error('INVALID_REQUEST');
  clean[q.key]=raw[q.key];
 }
 if(raw.nutrition==='skip'&&['protein','vitc','zinc'].some(k=>k in raw))throw new Error('INVALID_REQUEST');
 return clean;
}
