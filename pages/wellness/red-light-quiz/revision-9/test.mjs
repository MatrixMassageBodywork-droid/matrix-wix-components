import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const root=new URL('.',import.meta.url);
const read=n=>fs.readFileSync(new URL(n,root),'utf8');
const rules=read('glow-rules.js').replace(/^export /gm,'');
const ctx=vm.createContext({});
vm.runInContext(rules+'\nthis.api={buildQuestions,makePlan,buildClientReport,validateAnswers,reportText};this.goals=GOALS;this.contextQuestions=contextQuestions;this.focuses=focuses;',ctx);
const api=ctx.api;
let count=0,review=0,priced=0;
for(const goal of Object.keys(ctx.goals))for(const [context] of ctx.contextQuestions[goal].options)for(const [focus] of ctx.focuses[goal])for(const experience of ['new','comfortable','reactive'])for(const safety of ['none','review'])for(const commitment of ['try','build','maintain'])for(const availability of ['one','two','three','flexible'])for(const visit of ['full','face','enhancement']){
 const a={goal,context,focus,experience,safety,commitment,availability,visit,nutrition:'skip'};
 const clean=api.validateAnswers(a),r=api.buildClientReport(clean);
 assert.equal(r.version,8);assert.ok(r.researchNotes.length);assert.ok(r.tracking);
 const p=r.proposedOffer;
 if(r.reviewRequired){assert.equal(p,null);assert.equal(r.bookingUrl,'');assert.equal(r.nutritionNotes.length,0);review++;}
 if(p){assert.equal(p.unitPrice,{full:25.99,face:14.99,enhancement:22.99}[visit]);assert.equal(p.price,p.unitPrice);assert.equal(p.visits,1);assert.equal(p.slotMinutes,undefined);assert.equal(r.schedule.perWeek,null);assert.ok(api.reportText(r).includes('$'+p.unitPrice.toFixed(2)));priced++;}
 assert.ok(!api.reportText(r).includes('NOT YET APPROVED'));count++;
}
const base={goal:'skin',context:'appearance',focus:'face',experience:'new',safety:'none',commitment:'try',availability:'one',visit:'face',nutrition:'yes',protein:'low',vitc:'low',zinc:'clinician'};
assert.equal(api.buildClientReport(api.validateAnswers(base)).nutritionNotes.length,3);
assert.equal(api.buildClientReport({...base,safety:'review'}).nutritionNotes.length,0);
assert.throws(()=>api.validateAnswers({...base,visit:'unapproved'}));
assert.throws(()=>api.validateAnswers({...base,price:0}));
for(const n of ['embed.html','preview.html']){
 const h=read(n);for(const m of h.matchAll(/<script>([\s\S]*?)<\/script>/g))new vm.Script(m[1]);
 for(const price of ['25.99','14.99','22.99'])assert.ok(h.includes(price));
 assert.ok(!/\b(?:unitPrice=visits|slotMinutes:slot|proposed pricing|Prices are draft proposals)/.test(h));
}
const schema=JSON.parse(read('schema-original-url.json'));
assert.deepEqual(schema['@graph'].find(x=>x['@type']==='Service').offers.map(o=>o.price),['25.99','14.99','22.99']);
for(const q of schema['@graph'].find(x=>x['@type']==='FAQPage').mainEntity){assert.ok(read('embed.html').includes(q.name));assert.ok(read('embed.html').includes(q.acceptedAnswer.text));}
const service=read('glow-service.js').replace(/^import .*;\r?\n/gm,'').replace(/^export /gm,'');
const serviceCtx=vm.createContext({createHash,validateAnswers:api.validateAnswers,buildClientReport:api.buildClientReport,reportText:api.reportText});
vm.runInContext(service+'\nthis.create=createIntakeService;',serviceCtx);
let writes=0,sends=0;
const svc=serviceCtx.create({config:{mode:'test',consentVersion:'matrix-glow-email-sms-2026-11-v3'},data:{insert:()=>writes++,update:()=>writes++},authorize:async()=>{},send:()=>sends++});
const request={requestId:'11111111-1111-4111-8111-111111111111',firstName:'Preview',lastName:'Test',email:'preview@example.com',phone:'2625550100',answers:base,emailConsent:true,smsConsent:true,consentVersion:'matrix-glow-email-sms-2026-11-v3',token:'test-token'};
assert.equal((await svc.submit(request)).status,'test');assert.equal(writes,0);assert.equal(sends,0);
assert.equal((await svc.submit({...request,emailConsent:false})).code,'CONSENT_REQUIRED');
assert.ok(read('glow-config.js').includes("mode: 'test'"));assert.ok(read('glow-config.js').includes('privacyReviewed: true'));
const result={status:'PASS',answerCombinations:count,clinicianRoutes:review,pricedRoutes:priced,prices:[25.99,14.99,22.99],noLiveWrites:true,noEmails:true,syntax:true,schemaMatchesVisibleFaq:true};
fs.writeFileSync(new URL('qa-results.json',root),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
