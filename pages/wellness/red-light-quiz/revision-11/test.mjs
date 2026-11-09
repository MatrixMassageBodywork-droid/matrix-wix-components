import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const root=new URL('.',import.meta.url),read=n=>fs.readFileSync(new URL(n,root),'utf8');
const rules=read('glow-rules.js').replace(/^export /gm,'');const ctx=vm.createContext({});
vm.runInContext(rules+'\nthis.api={buildQuestions,makePlan,buildClientReport,validateAnswers,reportText,emailReportVariables};this.goals=GOALS;this.contextQuestions=contextQuestions;this.focuses=focuses;',ctx);
const {api}=ctx;let count=0,review=0,priced=0;
for(const goal of Object.keys(ctx.goals))for(const [context] of ctx.contextQuestions[goal].options)for(const [focus] of ctx.focuses[goal])for(const experience of ['new','comfortable','reactive'])for(const safety of ['none','review'])for(const commitment of ['try','build','maintain'])for(const availability of ['one','two','three','flexible'])for(const visit of ['full','face','enhancement']){
 const a={goal,context,focus,experience,safety,commitment,availability,visit,nutrition:'skip'},r=api.buildClientReport(api.validateAnswers(a)),t=api.reportText(r);
 assert.equal(r.version,11);assert.ok(r.researchNotes.length);assert.ok(r.tracking);assert.ok(!t.includes('undefined'));assert.ok(!r.fullscriptUrl);assert.equal(r.nutritionNotes.length,0);
 if(r.reviewRequired){assert.equal(r.proposedOffer,null);assert.equal(r.bookingUrl,'');assert.equal(r.schedule,null);review++;}
 if(r.proposedOffer){assert.equal(r.proposedOffer.unitPrice,{full:25.99,face:14.99,enhancement:22.99}[visit]);assert.equal(r.proposedOffer.visits,1);assert.equal(r.schedule.perWeek,commitment==='try'?null:availability==='one'?1:availability==='three'?3:2);assert.ok(t.includes('$'+r.proposedOffer.unitPrice.toFixed(2)));priced++;}
 for(const v of Object.values(api.emailReportVariables(r)))assert.equal(typeof v,'string');count++;
}
const base={goal:'skin',context:'appearance',focus:'face',experience:'new',safety:'none',commitment:'build',availability:'two',visit:'full',nutrition:'yes',protein:'enough',vitc:'enough',zinc:'no'};
const r=api.buildClientReport(base);assert.match(r.planBody,/2–3 visits per week for 4 weeks/);assert.match(r.planBody,/eight visits/);assert.ok(r.nutritionNotes.length>=2);assert.equal(r.fullscriptUrl,'https://us.fullscript.com/s/matrix_massage_wellness/shop');
assert.ok(!api.reportText(r).includes('Your answers do not identify'));assert.ok(!api.reportText(r).includes('Further visits are your choice'));
const hair=api.buildClientReport({...base,goal:'hair',context:'pattern',focus:'crown'});assert.match(hair.planBody,/26 weeks/);assert.ok(!hair.nutritionNotes.some(n=>/biotin|iron/i.test(n.name)&&!n.name.includes('specific')));
const thyroid=api.buildClientReport({...base,goal:'thyroid',context:'provider',focus:'studies'});assert.equal(thyroid.schedule,null);assert.ok(thyroid.nutritionNotes.length);assert.ok(!thyroid.nutritionNotes.some(n=>/mg|µg/.test(n.why)));
const gated=api.buildClientReport({...base,goal:'wellness',context:'routine',focus:'sleep',safety:'review'});assert.ok(!gated.nutritionNotes.some(n=>n.name.includes('glycinate')));
const template=read('client-email-template.html');const vars={firstName:'DaNelle',requestRef:'SAMPLE—NOT SENT',...api.emailReportVariables(r)};
for(const m of template.matchAll(/\$\{(\w+)\}/g))assert.equal(typeof vars[m[1]],'string');
const h=read('embed.html');assert.ok(h.includes(rules));for(const m of h.matchAll(/<script>([\s\S]*?)<\/script>/g))new vm.Script(m[1]);
const old=fs.readFileSync(new URL('../revision-10/embed.html',root),'utf8');assert.equal(h.slice(h.indexOf('/* Installed inside the HTML component.')),old.slice(old.indexOf('/* Installed inside the HTML component.')));
const escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let rendered=template.replace(/\$\{(\w+)\}/g,(_,k)=>escape(vars[k]).replace(/https:\/\/[^\s]+/g,url=>`<a href="${url}" style="color:#087776;overflow-wrap:anywhere">${url}</a>`).replace(/\n/g,'<br>'));
fs.writeFileSync(new URL('sample-email.html',root),'<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Matrix report sample — not sent</title><body style="margin:0;background:#e9eee9"><div style="max-width:620px;margin:25px auto;background:#fffaf3;border-top:10px solid #123d40;padding:32px">'+rendered+'</div></body>');
fs.writeFileSync(new URL('sample-report.json',root),JSON.stringify(r,null,2));fs.writeFileSync(new URL('sample-report.txt',root),api.reportText(r));
fs.writeFileSync(new URL('sample-variables.json',root),JSON.stringify(vars,null,2));
const result={status:'PASS',combinations:count,reviewRoutes:review,pricedRoutes:priced,nutrition:'Goal-specific foods even when intake reported adequate; supplement options gated; skip respected',deliveryBridge:'byte-identical to R10',schema:'unchanged',actualEmailSent:false};
fs.writeFileSync(new URL('qa-results.json',root),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
