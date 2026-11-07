/* Matrix red light pathways, revision 6.
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
const BOOKING_URL='https://www.matrixmassage.net/book-appointments-salem-wi';
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
  {key:'commitment',q:'How would you like to begin?',hint:'Your choice changes the first planning block. You do not have to buy a series.',options:[['try','One visit, then decide'],['build','Build a consistent routine'],['maintain','Revisit a routine I already enjoy']]},
  {key:'availability',q:'What could comfortably fit your week?',hint:'We will fit the proposed schedule to your availability, not simply add more visits.',options:[['one','About once a week'],['two','About twice a week'],['three','About three times a week'],['flexible','I can be flexible']]},
  {key:'nutrition',q:'Include food & supplement support?',hint:'Optional, unbranded notes will be included in the same report. No purchase is required.',options:[['yes','Yes, include my nutrition notes'],['skip','Skip this section']]}
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
export function makePlan(a){
 const review=reviewRequired(a);
 const researchOnly=a.context==='learn'||(a.goal==='tissue'&&a.focus==='research')||(a.goal==='inflam'&&a.focus==='research');
 const focus=(focuses[a.goal]||focuses.wellness).find(([v])=>v===a.focus)?.[1]||'Your main priority';
 const plan={goal:GOALS[a.goal]||GOALS.wellness,review,offer:null,nutrition:[],research:researchFor(a),focus,tracking:trackFor(a),
  route:review?'clinician':researchOnly?'explore':'visit',
  introduction:a.experience==='new'?'First visit: a comfortable introduction, with tolerance checked before building a routine.':a.experience==='comfortable'?'Bring your previous light routine; we will check how it compares with the Matrix setup.':'Your previous reaction should be reviewed before another light exposure.',
  rationale:[],nextStep:'',schedule:null,maintenance:''};
 if(review){
  plan.nextStep=reviewMessage(a);
  plan.maintenance='Any medical treatment or follow-up schedule belongs with your treating clinician.';
 }else if(researchOnly){
  plan.nextStep='Your research-first report is ready. If you decide you would enjoy an optional wellness visit, you can book through the existing Matrix appointment page; you do not need to request a custom reply.';
  plan.maintenance='Explore the evidence first. No paid course or maintenance schedule is assigned to a research-only request.';
 }else{
  const preferred={skin:2,hair:3,joint:2,muscle:2,tissue:2,inflam:2,wellness:2}[a.goal]||2;
  const capacity={one:1,two:2,three:3,flexible:preferred}[a.availability]||1;
  const perWeek=Math.min(capacity,preferred);
  const weeks={skin:4,hair:12,joint:4,muscle:2,tissue:4,inflam:2,wellness:2}[a.goal]||2;
  const trial=a.commitment==='try'||(a.goal==='wellness'&&a.context==='try');
  const returning=!trial&&a.commitment==='maintain';
  const visits=trial?1:returning?2:weeks*perWeek;
  const cadence=trial?'One introductory visit, then decide':returning?'Two check-in visits, about one to two weeks apart':perWeek+' visit'+(perWeek===1?'':'s')+' per week for an initial '+weeks+'-week planning block';
  const broad=(a.goal==='muscle'&&a.focus==='whole')||(a.goal==='joint'&&a.focus==='other')||(a.goal==='wellness'&&a.focus==='whole')||(a.goal==='inflam'&&a.focus==='whole')||(a.goal==='tissue'&&a.focus==='multiple');
  const slot=broad?40:20;
  const unitPrice=visits>=4?(broad?45:27):(broad?50:30);
  const checkpoint=trial?'After your first visit: review comfort, fit, and whether you want to continue.':returning?'After two visits: decide whether the routine still feels worthwhile.':a.goal==='hair'?'Check comfort early; review consistent scalp photographs at week 12 before making a longer commitment.':'Review your notes at week '+weeks+' before deciding on another planning block.';
  plan.schedule={perWeek:trial||returning?null:perWeek,weeks:trial||returning?null:weeks,visits,cadence,checkpoint,kind:'Proposed service-planning rhythm, not a validated condition-specific BioMax dose'};
  plan.offer={name:trial?'Your first red light visit':returning?'Your routine, revisited':GOALS[a.goal]+' pathway',price:visits*unitPrice,unitPrice,visits,slotMinutes:slot,type:slot+'-minute appointment slot'+(visits===1?'':'s'),cadence,
   note:'Draft planning estimate only. Counts follow your chosen commitment and schedule, not a diagnosis, predicted cure, or research-proven required number of visits. Exposure time is set separately using the actual device and setup.'};
  plan.rationale.push('You chose '+focus.toLowerCase()+', so the report focuses on that area and the matching progress measure.');
  plan.rationale.push(trial?'You want to try it first, so the plan starts with one visit, not a prepaid course.':returning?'You want to revisit an established routine, so the plan starts with two check-ins rather than a new intensive series.':'You chose a consistent routine. The proposed block creates a clear review point; it is a service-planning choice, not a clinically established minimum.');
  if(!trial&&!returning)plan.rationale.push(capacity<preferred?'Your availability is lower than this pathway’s suggested rhythm. The report keeps your realistic schedule without claiming that it is equivalent to a research regimen.':'Your availability supports the suggested planning rhythm. Extra available days do not automatically create more visits.');
  if(a.goal==='hair')plan.rationale.push('Before committing to a scalp course, the first appointment must confirm that the panel can expose your scalp appropriately. Hair and panel positioning can limit coverage; scalp-device findings are not an equipment-equivalence claim.');
  if(a.goal==='skin'&&a.context==='unsure')plan.rationale.push('You are still exploring: use the first appointment to choose one visible priority before comparing progress photos.');
  if(a.goal==='wellness')plan.rationale.push({routine:'Your focus is a dependable pause in the week, not a disease-treatment protocol.',try:'You selected a first experience, so this remains a one-visit introduction even if you can attend more often.',unsure:'Use the first checkpoint to decide whether this routine fits before adding more appointments.'}[a.context]);
  plan.maintenance='Continue only if the experience and your progress notes make it worthwhile. After the checkpoint, keep, space out, or stop visits according to response and preference; there is no automatic maintenance purchase or universal evidence-based interval.';
  plan.nextStep='Book your first visit through the Matrix appointment page. Your report is ready now; you do not need a personal reply to receive it. Final service selection, suitability, and current pricing are confirmed through the booking and intake process.';
 }
 if(a.nutrition==='yes'&&!nutritionBlocked(a)){
  if(a.protein==='low')plan.nutrition.push({name:'Complete protein powder',why:'Protein supplies building blocks for normal tissue maintenance. If meals are falling short, a complete protein powder can be a convenient way to help fill that gap.',caution:'Choose for dietary need, not as a required red-light purchase. Check allergies, kidney disease, restricted diets, and medication timing with your clinician or dietitian.',source:SOURCES.protein,label:'NHS nutrition guidance'});
  if(a.vitc==='low')plan.nutrition.push({name:'Vitamin C',why:'Vitamin C supports normal collagen synthesis. Start with vitamin-C-rich foods; a supplement can be considered when intake remains limited.',caution:'Avoid megadosing. Review kidney disease, kidney stones, iron overload, and total supplement intake before choosing a product.',source:SOURCES.c,label:'NIH vitamin C fact sheet'});
  if(a.zinc==='clinician')plan.nutrition.push({name:'Zinc: follow your clinician’s existing recommendation',why:'Zinc supports normal tissue repair. This note appears because you reported an identified need and an existing clinician recommendation, not simply because of your red light goal.',caution:'Your clinician sets dose and duration. Excess zinc can cause copper deficiency and interact with medicines, including some antibiotics.',source:SOURCES.zinc,label:'NIH zinc fact sheet'});
 }
 return plan;
}
export function buildClientReport(a){
 const p=makePlan(a);
 return {version:6,title:'Your Matrix Red Light Pathway',goal:p.goal,focus:p.focus,route:p.route,reviewRequired:p.review,
  introduction:p.introduction,rationale:p.rationale,schedule:p.schedule,tracking:p.tracking,maintenance:p.maintenance,nextStep:p.nextStep,
  proposedOffer:p.offer,bookingUrl:p.route==='visit'?BOOKING_URL:'',
  nutritionSummary:a.nutrition==='skip'?'Nutrition notes skipped at your request.':nutritionBlocked(a)?'For your situation, nutrition decisions belong with your clinician; no automatic supplement stack has been added.':p.nutrition.length?'Optional support selected from your reported intake and existing recommendations.':'Your answers do not identify a supplement need. Keep food first; an uncertain answer is a reason to review intake, not diagnose a deficiency.',
  nutritionNotes:p.nutrition.map(n=>({name:n.name,why:n.why,caution:n.caution,source:n.source,sourceLabel:n.label})),
  nutritionNotice:'Nutrition supports normal body function; supplements are optional and are not required to benefit from a visit. No brands or product doses are assigned. Matrix may prepare a separate personalized Fullscript plan later; this report does not create an order or schedule a follow-up.',
  researchNotes:p.research,
  deviceNote:'PlatinumLED’s general BIOMAX guidance lists 10–20 minutes per area, around 8–14 inches for deeper tissue and 16–24 inches for facial skin, and 3–5 weekly sessions. BIOMAX Pro guidance differs. Those are manufacturer usage ranges, not a condition-specific medical protocol. Matrix must confirm the installed generation, settings, distance, tolerance and areas before choosing actual exposure. Appointment length is not exposure time.',
  deviceSource:SOURCES.usage,deliveryStatus:'Report generation is automatic. Email acceptance and inbox delivery are tracked separately.'};
}
export function clientReportText(a){return reportText(buildClientReport(a));}
export function reportText(r,{offersApproved=false,bookingUrl=''}={}){
 const lines=[r.title,r.goal,'Your focus: '+r.focus,'',r.introduction,''];
 if(r.proposedOffer){const o=r.proposedOffer;lines.push('YOUR STARTING PLAN',o.name,o.cadence,r.schedule.checkpoint,'Progress to track: '+r.tracking,'',...r.rationale,'','AFTER YOUR CHECKPOINT',r.maintenance,'',offersApproved?'PLANNING ESTIMATE':'PROPOSED PRICING — NOT YET APPROVED',o.visits+' visit'+(o.visits===1?'':'s')+' × $'+o.unitPrice+' = $'+o.price,o.type,o.note,'Supplements and any applicable tax are separate. No subscription or automatic renewal.','');}
 else lines.push(r.route==='explore'?'YOUR RESEARCH-FIRST PATHWAY':'YOUR CLINICIAN-SUPPORTED NEXT STEP',r.nextStep,'Progress notes: '+r.tracking,'',r.maintenance,'');
 lines.push('YOUR NUTRITION NOTES',r.nutritionSummary,'');
 r.nutritionNotes.forEach(n=>lines.push(n.name,n.why,n.caution,n.sourceLabel+': '+n.source,''));
 lines.push(r.nutritionNotice,'','RESEARCH CHOSEN FOR YOUR GOAL');
 r.researchNotes.forEach(n=>lines.push(n.title,n.summary,n.detail,n.url,''));
 lines.push('DEVICE SETUP',r.deviceNote,r.deviceSource,'','NEXT STEP',r.nextStep);
 const url=bookingUrl||r.bookingUrl;
 if(r.route==='visit'&&/^https:\/\/[^<>\s]+$/.test(url))lines.push('Book at Matrix: '+url);
 lines.push('','Educational service planning, not a diagnosis or medical prescription. Do not change medication or delay necessary care based on this report.');
 return lines.join('\n');
}
export function validateAnswers(raw){
 if(!raw||typeof raw!=='object'||Array.isArray(raw))throw new Error('INVALID_REQUEST');
 const allowed=['goal','context','focus','experience','safety','commitment','availability','nutrition','protein','vitc','zinc'];
 if(Object.keys(raw).some(k=>!allowed.includes(k)))throw new Error('INVALID_REQUEST');
 const clean={};
 for(const q of buildQuestions(raw)){
  if(typeof raw[q.key]!=='string'||!q.options.some(([v])=>v===raw[q.key]))throw new Error('INVALID_REQUEST');
  clean[q.key]=raw[q.key];
 }
 if(raw.nutrition==='skip'&&['protein','vitc','zinc'].some(k=>k in raw))throw new Error('INVALID_REQUEST');
 return clean;
}
