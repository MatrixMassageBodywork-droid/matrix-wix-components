import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
const read=n=>fs.readFileSync(new URL(n,import.meta.url),'utf8');
const c=vm.createContext({createHash,Date});
vm.runInContext(read('glow-rules.js').replace(/^export /gm,'')+'\n'+read('config-test-fixture.js').replace('export const','const')+'\n'+read('glow-service.js').replace(/^import .*;\r?\n/gm,'').replace(/^export /gm,'')+'\nthis.api={createIntakeService,validateRequest,CONFIG};',c);
const config={...c.api.CONFIG,mode:'live',ownerEmailId:'owner-template'};
const base={requestId:'11111111-1111-4111-8111-111111111111',firstName:'Test',lastName:'Visitor',email:'visitor@example.com',phone:'2625550100',emailConsent:true,smsConsent:true,consentVersion:config.consentVersion,token:'test-token',answers:{goal:'skin',context:'appearance',focus:'face',experience:'new',safety:'none',commitment:'try',availability:'one',visit:'face',nutrition:'skip'}};
function harness(o={}){
 const rows=new Map(),events=[],sent=[];
 const clone=x=>structuredClone(x);
 const data={
  async insert(collection,row){events.push('insert');if(o.insertFail||rows.has(row._id))throw Error('insert');rows.set(row._id,clone(row));return row;},
  async get(collection,id){return clone(rows.get(id));},
  async update(collection,row){events.push(row.clientDeliveryState+':'+row.ownerDeliveryState);rows.set(row._id,clone(row));return row;}
 };
 const client={id:'client',primaryEmail:base.email,effectiveEmail:base.email,subscriptionStatus:'NOT_SET',...o.contact};
 const svc=c.api.createIntakeService({config:{...config,...o.config},data,
  authorize:async()=>{if(o.captchaFail)throw Error('captcha');},
  resolveContact:async(first,email,last,phone)=>{assert.equal(phone,'+12625550100');if(o.contactFail)throw Error('contact');return client;},
  getOwner:async()=>({id:'owner',primaryEmail:config.ownerEmail,subscriptionStatus:'SUBSCRIBED'}),
  send:async(id,contact,options)=>{const row=rows.get(base.requestId);assert.ok(row);assert.equal(contact==='client'?row.clientDeliveryState:row.ownerDeliveryState,'SENDING');events.push('send:'+contact);sent.push({id,contact,options});if(o.sendFail)throw Error('timeout');}
 });
 return {svc,rows,events,sent};
}
let passed=0;
for(const patch of [{emailConsent:false},{smsConsent:false},{emailConsent:undefined},{smsConsent:undefined},{consentVersion:'old'},{email:''},{phone:''},{phone:'abc'},{email:'bad'}]){
 const h=harness();assert.equal((await h.svc.submit({...base,...patch})).status,'rejected');assert.equal(h.rows.size,0);assert.equal(h.sent.length,0);passed++;
}
{
 const h=harness(),r=await h.svc.submit(base),row=h.rows.get(base.requestId);
 assert.equal(r.clientStatus,'ACCEPTED');assert.equal(r.ownerStatus,'ACCEPTED');assert.equal(h.sent.length,2);
 assert.equal(row.smsMarketingConsent,true);assert.equal(row.marketingConsent,true);
 assert.equal(row.smsMarketingConsentText,config.smsConsentText);assert.equal(row.marketingConsentText,config.emailConsentText);
 assert.equal(row.privacyNoticeText,config.privacyNoticeText);assert.ok(row.smsMarketingConsentedAt instanceof Date);
 assert.equal(row.smsMarketingDeliveryState,'CONSENT_RECORDED');assert.ok(row.reportText.includes('$14.99'));
 assert.equal(h.sent[1].options.variables.reportBody,undefined);
 assert.equal((await h.svc.submit(base)).duplicate,true);assert.equal(h.sent.length,2);
 assert.equal((await h.svc.submit({...base,email:'different@example.com'})).code,'SAVE_FAILED');assert.equal(h.sent.length,2);passed+=3;
}
{
 const h=harness();await Promise.all([h.svc.submit(base),h.svc.submit(base)]);assert.equal(h.rows.size,1);assert.equal(h.sent.length,2);passed++;
}
for(const [options,state] of [[{contact:{primaryEmail:'someone@example.com'}},'ADDRESS_REVIEW'],[{contact:{effectiveEmail:'someone@example.com'}},'ADDRESS_REVIEW'],[{contact:{subscriptionStatus:'UNSUBSCRIBED'}},'UNSUBSCRIBED'],[{contact:{subscriptionStatus:undefined}},'STATUS_REVIEW'],[{contactFail:true},'CONTACT_FAILED']]){
 const h=harness(options),r=await h.svc.submit(base);assert.equal(r.clientStatus,state);assert.equal(h.sent.filter(x=>x.contact==='client').length,0);passed++;
}
for(const options of [{captchaFail:true},{insertFail:true},{config:{privacyReviewed:false}},{config:{clientEmailId:''}}]){
 const h=harness(options);assert.equal((await h.svc.submit(base)).status,'rejected');assert.equal(h.sent.length,0);passed++;
}
{
 const h=harness({sendFail:true}),r=await h.svc.submit(base);assert.equal(r.clientStatus,'SEND_UNKNOWN');const n=h.sent.length;
 assert.equal((await h.svc.recover(base.requestId)).code,'MANUAL_RECONCILIATION_REQUIRED');assert.equal(h.sent.length,n);passed++;
}
{
 const h=harness({config:{mode:'test'}}),r=await h.svc.submit(base);assert.equal(r.status,'test');assert.equal(r.report,undefined);assert.equal(h.rows.size,0);assert.equal(h.sent.length,0);passed++;
}
const result={status:'PASS',deliveryScenarios:passed,realEmailsSent:0,liveCustomerRecordsWritten:0,checks:['both consent channels required','phone normalization','exact consent wording and timestamp persisted','save before email','durable sending marker','idempotent duplicate and concurrent submissions','email address and effective-recipient match','unsubscribe respected','unknown sends never automatically retried','owner notification excludes report','test mode writes and sends nothing']};
fs.writeFileSync(new URL('delivery-qa-results.json',import.meta.url),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
