/* Matrix Monthly Savings — standalone custom element, demo-only build.
   NO network calls, NO checkout, NO customer-data capture, NO invoice sending.
   Wix page code will eventually provide an allowlisted catalog via setAttribute(). */
(() => {
  const css = `
:host{display:block;width:100%;font:16px/1.55 Arial,Helvetica,sans-serif;color:#123d40}
*,*::before,*::after{box-sizing:border-box}
.ms3{border:1px solid #b7cbc6;background:#f7f1e8;border-radius:6px;overflow:hidden}
.ms3-head{padding:24px 28px;background:#123d40;color:white}
.ms3-kicker{font-weight:700;font-size:10px;letter-spacing:.16em;color:#c2e8df;margin:0 0 8px}
.ms3-head h2{font:400 clamp(27px,3vw,37px)/1.1 Georgia,serif;margin:0 0 9px}
.ms3-head p:last-child{max-width:750px;font-size:14px;color:#e9f2ee;margin:0}
.ms3-flag{margin:18px 24px;padding:12px 16px;background:#fff4d8;border:1px solid #e4d3a8;color:#4d3e21;font-size:12px;font-weight:700;border-radius:3px}
.ms3-content{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(275px,.6fr);gap:22px;padding:8px 24px 26px;align-items:start}
.ms3-items{display:grid;gap:12px}
.ms3-item{border:1px solid #d6ded9;background:#fff;padding:18px;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:14px}
.ms3-tag{font-weight:700;font-size:10px;letter-spacing:.12em;color:#087776;margin:0 0 5px}
.ms3-item h3{margin:0 0 7px;font:400 24px/1.13 Georgia,serif}
.ms3-item p{margin:0;color:#536c65;font-size:12px}
.ms3-price{margin-top:13px!important;font-size:14px!important;color:#123d40!important}
.ms3-price strong{font-size:18px}
.ms3-price s{color:#777;font-size:12px}
.ms3-qty{display:flex;align-items:center;justify-content:end;align-self:center;gap:0;border:1px solid #c4d6d1;border-radius:4px;overflow:hidden}
.ms3-qty button{border:0;background:#eaf5f1;color:#123d40;font-size:19px;min-height:42px;min-width:42px;cursor:pointer}
.ms3-qty button:disabled{opacity:.35;cursor:default}
.ms3-qty output{min-width:40px;text-align:center;font-variant-numeric:tabular-nums;font-weight:700;font-size:14px}
.ms3-summary{position:sticky;top:12px;padding:22px;border:1px solid #c8d9d2;background:#fff}
.ms3-summary h3{margin:0 0 15px;font:400 26px Georgia,serif}
.ms3-summary dl{margin:0}
.ms3-summary dl div{display:flex;align-items:baseline;justify-content:space-between;gap:14px;margin:0 0 13px}
.ms3-summary dt{color:#5a7068;font-size:12px}
.ms3-summary dd{margin:0;font-size:14px;font-weight:700;font-variant-numeric:tabular-nums}
.ms3-savings{border-top:1px solid #d7e4dc;padding-top:15px}
.ms3-savings dt,.ms3-savings dd{font-weight:700!important;color:#087776!important}
.ms3-summary .ms3-total{border-top:2px solid #123d40;padding-top:13px;margin:12px 0 20px}
.ms3-total dt,.ms3-total dd{color:#123d40;font-size:18px!important;font-weight:700}
.ms3-btn{min-height:48px;width:100%;background:#123d40;color:#fff;font-weight:700;border:1px solid #123d40;border-radius:3px;cursor:pointer;padding:12px}
.ms3-btn:hover{background:#087776}
.ms3-btn:disabled{background:#e9eeeb;color:#60756c;border-color:#d7e1dc;cursor:default}
.ms3-note{font-size:12px;color:#536c65;margin:10px 0 0}
.ms3-preview{margin-top:16px;border:1px solid #c6d8cf;padding:12px;font-size:13px;background:#eaf5f1;white-space:pre-line}
.ms3-field-preview{border-top:1px solid #d7e4dc;margin-top:18px;padding-top:14px}
.ms3-field-preview summary{cursor:pointer;color:#123d40;font-weight:700;font-size:13px}
.ms3-field-preview fieldset{border:0;margin:15px 0 0;padding:0;display:grid;gap:10px}
.ms3-field-preview label{font-size:12px;font-weight:700;display:grid;gap:4px}
.ms3-field-preview input,.ms3-field-preview select{min-height:39px;padding:9px;border:1px solid #ccd9d2;background:#f7f8f6;color:#4d625b;width:100%;border-radius:3px}
.ms3-field-preview .ms3-check{display:flex;align-items:flex-start;gap:8px;font-weight:400}
.ms3-field-preview .ms3-check input{width:auto;min-height:0;margin-top:3px}
.ms3-status{padding:26px;text-align:center;color:#123d40}
.ms3 button:focus-visible{outline:3px solid #087776;outline-offset:2px}
@media(max-width:780px){.ms3-content{grid-template-columns:1fr}.ms3-summary{position:static}.ms3-head{padding:24px}.ms3-item{padding:15px}}
@media(max-width:620px){.ms3-content{padding:8px 14px 20px}.ms3-item{grid-template-columns:1fr}.ms3-qty{justify-self:start;margin-top:2px}.ms3-summary{padding:16px}}
@media(prefers-reduced-motion:reduce){.ms3 *{transition:none!important;animation:none!important}}
`;
  const format = cents => '$'+(cents/100).toFixed(2);
  const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  class MatrixMonthlySelector extends HTMLElement {
    static get observedAttributes(){return ['catalog-json','preview-mode'];}
    constructor(){super();this.attachShadow({mode:'open'});this.qty=new Map();this.items=[];}
    connectedCallback(){this.render();}
    attributeChangedCallback(){if(this.isConnected)this.render();}
    getCatalog(){
      if(this.getAttribute('preview-mode')!=='DEMO_ONLY')return [];
      try{
        const items=JSON.parse(this.getAttribute('catalog-json')||'[]');
        if(!Array.isArray(items)||items.length>30)return [];
        return items.filter(p=>p&&p.releaseState==='TEST_ONLY_NEVER_PUBLIC'
          && /^TEST-[A-Z0-9-]{3,70}$/.test(p.itemId)
          && /^TEST ONLY/.test(p.publicName)
          && Number.isInteger(p.monthlyPriceCents)&&p.monthlyPriceCents>0
          && Number.isInteger(p.everydayPriceCents)&&p.everydayPriceCents>=p.monthlyPriceCents)
          .map(p=>({itemId:p.itemId,kind:p.kind==='BUNDLE'?'BUNDLE':'PRODUCT',name:p.publicName,
            description:p.shortDescription||'',monthly:p.monthlyPriceCents,everyday:p.everydayPriceCents}));
      }catch{return []}
    }
    total(){return this.items.reduce((out,p)=>{
      const q=this.qty.get(p.itemId)||0;
      out.monthly+=p.monthly*q;out.everyday+=p.everyday*q;out.qty+=q;
      return out;
    },{monthly:0,everyday:0,qty:0});}
    render(){
      this.items=this.getCatalog();
      const activeIds=new Set(this.items.map(p=>p.itemId));
      for(const id of this.qty.keys())if(!activeIds.has(id))this.qty.delete(id);
      const cards=this.items.map(p=>{
        const q=this.qty.get(p.itemId)||0;
        return `<article class="ms3-item" data-item="${esc(p.itemId)}">
          <div><p class="ms3-tag">${p.kind==='BUNDLE'?'CURATED BUNDLE':'INDIVIDUAL PRODUCT'}</p>
          <h3>${esc(p.name)}</h3><p>${esc(p.description)}</p>
          <p class="ms3-price"><strong>${format(p.monthly)}</strong> monthly example · <s>${format(p.everyday)}</s> everyday example</p></div>
          <div class="ms3-qty" role="group" aria-label="Quantity for ${esc(p.name)}">
            <button type="button" data-change="-1" data-id="${esc(p.itemId)}" aria-label="Decrease ${esc(p.name)}" ${q===0?'disabled':''}>−</button>
            <output aria-live="polite">${q}</output>
            <button type="button" data-change="1" data-id="${esc(p.itemId)}" aria-label="Increase ${esc(p.name)}" ${q===12?'disabled':''}>+</button>
          </div></article>`;
      }).join('');
      const totals=this.total();
      this.shadowRoot.innerHTML=`<style>${css}</style><section class="ms3" aria-label="Matrix monthly shopping form demo">
        <header class="ms3-head"><p class="ms3-kicker">EXCLUSIVE MONTHLY SAVINGS • PRIVATE QA DEMO</p>
        <h2>Choose your favorites</h2><p>Mix a curated bundle with individual supplements, see your estimated savings and review one combined request.</p></header>
        <p class="ms3-flag" role="status">TEST PREVIEW — sample products and prices. No customer order or invoice can be submitted from this preview.</p>
        ${this.items.length?`<div class="ms3-content"><div class="ms3-items">${cards}</div>
          <aside class="ms3-summary"><h3>Your selections</h3><dl>
          <div><dt>Selected items</dt><dd data-qty>${totals.qty}</dd></div>
          <div><dt>Everyday comparison</dt><dd data-everyday>${format(totals.everyday)}</dd></div>
          <div class="ms3-savings"><dt>Potential monthly savings</dt><dd data-savings>${format(totals.everyday-totals.monthly)}</dd></div>
          <div class="ms3-total"><dt>Monthly event total</dt><dd data-monthly>${format(totals.monthly)}</dd></div></dl>
          <button class="ms3-btn" type="button" id="preview" ${totals.qty===0?'disabled':''}>Preview my selections</button>
          <p class="ms3-note">When ordering opens, invoices will be sent by email after your request is reviewed.</p>
          <details class="ms3-field-preview"><summary>Preview the short request form</summary>
          <fieldset disabled><label>Your name<input type="text" autocomplete="name" placeholder="Full name" maxlength="120"></label>
          <label>Email for your invoice<input type="email" autocomplete="email" placeholder="Email address" maxlength="200"></label>
          <label>Fulfillment preference<select><option>Choose your preference</option><option>Pickup</option><option>Delivery</option></select></label>
          <label class="ms3-check"><input type="checkbox">Email me optional Matrix supplement offers</label>
          <label class="ms3-check"><input type="checkbox">I agree to the displayed order dates and terms</label></fieldset>
          </details>
          <button class="ms3-btn" type="button" disabled aria-label="Customer ordering is closed">Submit order request — coming soon</button>
          <div class="ms3-preview" id="summary" hidden aria-live="polite"></div></aside></div>`:
        '<div class="ms3-status" role="status">Monthly ordering opens with the next approved event. Featured offers will appear here.</div>'}
        </section>`;
      this.shadowRoot.querySelectorAll('[data-change]').forEach(button=>button.addEventListener('click',()=>{
        const id=button.getAttribute('data-id');const value=Number(button.getAttribute('data-change'));
        const previous=this.qty.get(id)||0;
        this.qty.set(id,Math.max(0,Math.min(12,previous+value)));
        this.render();
      }));
      const preview=this.shadowRoot.querySelector('#preview');
      if(preview)preview.addEventListener('click',()=>{
        const choices=this.items.filter(x=>(this.qty.get(x.itemId)||0)>0).map(x=>({itemId:x.itemId,quantity:this.qty.get(x.itemId)}));
        const details=this.total();
        const text=`${choices.map(c=>`${c.quantity} × ${this.items.find(p=>p.itemId===c.itemId).name}`).join('\n')}\nMonthly example total: ${format(details.monthly)}\nSample savings: ${format(details.everyday-details.monthly)}\nNo request was sent.`;
        const output=this.shadowRoot.querySelector('#summary');output.textContent=text;output.hidden=false;
        this.dispatchEvent(new CustomEvent('matrix-cart-preview',{bubbles:true,composed:true,detail:{cart:choices,previewOnly:true,requestSent:false}}));
      });
    }
  }
  if(!customElements.get('matrix-monthly-order-selector'))customElements.define('matrix-monthly-order-selector',MatrixMonthlySelector);
})();
