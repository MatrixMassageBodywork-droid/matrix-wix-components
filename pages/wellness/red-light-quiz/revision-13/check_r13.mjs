import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const base=new URL('.',import.meta.url);
const html=fs.readFileSync(new URL('embed.html',base),'utf8');
const moduleSource=fs.readFileSync(new URL('glow-rules.js',base),'utf8');
const engine=moduleSource.replace(/^export /gm,'');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
new vm.Script(script);
new vm.Script(fs.readFileSync(new URL('page-code.js',base),'utf8').replace(/^import .*;\n/gm,''));
assert(script.includes(engine),'Browser and server rules differ');
const context={};vm.createContext(context);
vm.runInContext(engine+';this.api={buildQuestions,validateAnswers,buildClientReport,reviewRequired};',context);
const api=context.api;
const oldContext={};vm.createContext(oldContext);
vm.runInContext(fs.readFileSync(new URL('../revision-12/glow-rules.js',base),'utf8').replace(/^export /gm,'')+';this.api={buildQuestions,validateAnswers,buildClientReport,reviewRequired};',oldContext);
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
assert.equal(new Set(ids).size,ids.length,'Duplicate HTML IDs');
for(const m of script.matchAll(/(?:\$|getElementById)\('([A-Za-z][A-Za-z0-9]*)'\)/g))assert(ids.includes(m[1]),'Missing ID '+m[1]);
let cases=0,oldCases=0,exploreCases=0,safetyCases=0;
for(const [goal] of api.buildQuestions({})[0].options){
 for(const [ctx] of api.buildQuestions({goal})[1].options){
  for(const [focus] of api.buildQuestions({goal})[2].options){
   for(const safety of ['none','review'])for(const experience of ['new','reactive'])for(const nutrition of ['yes','skip']){
    for(const commitment of ['explore','try','build','maintain']){
     const a={goal,context:ctx,focus,safety,experience,commitment,nutrition};
     if(commitment!=='explore'){a.visit='full';a.availability='two';}
     if(nutrition==='yes')Object.assign(a,{protein:'low',vitc:'low',zinc:'clinician'});
     const clean=api.validateAnswers(a),r=api.buildClientReport(clean);
     assert.equal(r.reviewRequired,oldContext.api.reviewRequired(a));
     assert(r.title&&r.introduction&&r.researchNotes.length&&r.planBody&&r.visitBody);
     if(r.reviewRequired){assert.equal(r.route,'clinician');assert.equal(r.proposedOffer,null);safetyCases++;}
     if(commitment==='explore'){
      assert(!('visit' in clean)&&!('availability' in clean));
      assert.equal(r.proposedOffer,null);assert.equal(r.schedule,null);
      assert(!api.buildQuestions(a).some(q=>['visit','availability'].includes(q.key)));
      exploreCases++;
     }else{oldContext.api.validateAnswers(a);oldCases++;}
     cases++;
    }
   }
  }
 }
}
assert.throws(()=>api.validateAnswers({goal:'skin'}));
const sample={goal:'skin',context:'appearance',focus:'face',experience:'new',safety:'none',commitment:'explore',nutrition:'skip'};
assert.throws(()=>api.validateAnswers({...sample,admin:true}));
assert.throws(()=>api.validateAnswers({...sample,commitment:'garbage'}));
assert.throws(()=>api.validateAnswers({...sample,zinc:'clinician'}));
assert(html.includes("const ORIGINS = new Set(['https://www.matrixmassage.net', 'https://matrixmassage.net']);"));
assert(!html.includes("postMessage({ channel: CHANNEL, ...data }, '*')"));
assert(html.includes('id="quoteConsent" required')&&html.includes('id="smsConsent" required'));
assert(!html.includes('your report has not been released'));
assert(!html.includes('The personalized report uses the existing name'));
const result={syntax:'PASS',matchingBrowserServerRules:true,uniqueHtmlIds:ids.length,cases,oldPlanningCases:oldCases,newExplorationCases:exploreCases,safetyRouteCases:safetyCases,submissionOriginsUnchanged:true,requiredSeparateConsentPreserved:true};
fs.writeFileSync(new URL('source-qa.json',base),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result));
