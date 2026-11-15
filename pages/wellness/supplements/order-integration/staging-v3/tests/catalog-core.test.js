'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const C=require('../catalog-sync/catalog-core.js');
const product=(id,name,monthly,everyday,opts={})=>[
  id,opts.kind||'PRODUCT',name,'Example size','Synthetic supplement used only for validation',everyday,monthly,'','',opts.version||'TEST-V3-1',
  opts.state||'APPROVED','https://example.invalid/example.jpg','','REVIEWED',opts.approval||'APPROVED','synthetic'
];
const products=()=>[C.ITEM_COLUMNS,
 product('TEST-PRODUCT-A','TEST ONLY Vitamin Sample',12,18),
 product('TEST-PRODUCT-B','TEST ONLY Wellness Sample',8,12),
 product('TEST-BUNDLE-AB','TEST ONLY Curated Duo',18,26,{kind:'BUNDLE'})
];
const components=()=>[C.COMPONENT_COLUMNS,
 ['TEST-BUNDLE-AB','TEST-V3-1','TEST-PRODUCT-A',1,'','','','APPROVED','',''],
 ['TEST-BUNDLE-AB','TEST-V3-1','TEST-PRODUCT-B',1,'','','','APPROVED','','']
];
const release=()=>[C.RELEASE_COLUMNS,
 ['SUP-LEFT','SUP-MONTHLY-A','MONTHLY_FEATURE_LEFT','TEST-BUNDLE-AB','HOLD','HOLD','HOLD','OFF','INACTIVE','TEST-V3-1']
];
const snap=()=>C.normalizeRows(products(),components(),release());
const cart=[{itemId:'TEST-PRODUCT-A',quantity:2},{itemId:'TEST-BUNDLE-AB',quantity:1}];
function throwsCode(fn,code){assert.throws(fn,e=>e.code===code||e.message===code)}
test('parses money to exact cents',()=>{assert.equal(C.priceToCents('12'),1200);assert.equal(C.priceToCents(12.3),1230);assert.equal(C.priceToCents('0.99'),99)});
test('rejects nonmoney prices, invalid cents, and zero',()=>{for(const p of ['12.345','$12.30','-1','not a price'])throwsCode(()=>C.priceToCents(p),'INVALID_PRICE');throwsCode(()=>C.priceToCents('0'),'INVALID_PRICE_RANGE')});
test('reads the approved mixed catalog',()=>{const s=snap();assert.equal(s.items.length,3);assert.equal(s.rejected.length,0);assert.equal(s.publicReleaseEnabled,false)});
test('bundle component names and quantities are linked',()=>{const s=snap(),b=s.items.find(x=>x.kind==='BUNDLE');assert.equal(b.components.length,2);assert.match(b.description,/Includes: 1 × TEST ONLY/)});
test('calculates $42 monthly and $20 sample savings',()=>{const q=C.orderQuote(cart,snap());assert.equal(q.monthlyTotalCents,4200);assert.equal(q.everydayTotalCents,6200);assert.equal(q.savingsCents,2000);assert.equal(q.quotePreviewOnly,true);assert.equal(q.invoiceReady,false)});
test('combines duplicate same-SKU lines once',()=>{const q=C.orderQuote([{itemId:'TEST-PRODUCT-A',quantity:1},{itemId:'TEST-PRODUCT-A',quantity:1}],snap());assert.equal(q.lines.length,1);assert.equal(q.lines[0].quantity,2)});
test('rejects unauthorised client total and price fields',()=>{throwsCode(()=>C.orderQuote([{...cart[0],unitPrice:1}],snap()),'CLIENT_FIELD_FORBIDDEN')});
test('rejects quantity tampering',()=>{for(const quantity of [-1,0,1.2,13,'2'])throwsCode(()=>C.orderQuote([{itemId:'TEST-PRODUCT-A',quantity}],snap()),'INVALID_QUANTITY')});
test('rejects repeated lines over quantity cap',()=>{throwsCode(()=>C.orderQuote([{itemId:'TEST-PRODUCT-A',quantity:8},{itemId:'TEST-PRODUCT-A',quantity:5}],snap()),'QUANTITY_LIMIT')});
test('rejects unknown SKU and empty cart',()=>{throwsCode(()=>C.orderQuote([{itemId:'TEST-UNKNOWN',quantity:1}],snap()),'UNAVAILABLE_ITEM');throwsCode(()=>C.orderQuote([],snap()),'INVALID_CART')});
test('rejects mismatched item sheet headers',()=>{const x=products();x[0]=['wrong header'];throwsCode(()=>C.normalizeRows(x,components(),release()),'SCHEMA_MISMATCH')});
test('rejects items without owner approval',()=>{const x=products();x[1][14]='NOT_APPROVED';const s=C.normalizeRows(x,components(),release());assert.equal(s.items.length,1);assert(s.rejected.some(x=>x.code==='ITEM_NOT_APPROVED'));assert(s.rejected.some(x=>x.code==='UNKNOWN_BUNDLE_COMPONENT'))});
test('rejects underpriced everyday vs monthly',()=>{const x=products();x[1][6]=20;const s=C.normalizeRows(x,components(),release());assert(s.rejected.some(x=>x.code==='MONTHLY_PRICE_EXCEEDS_EVERYDAY'))});
test('rejects unapproved bundle component',()=>{const c=components();c[1][7]='DRAFT';const s=C.normalizeRows(products(),c,release());assert(s.rejected.some(x=>x.code==='COMPONENT_NOT_APPROVED'));assert.equal(s.items.length,2)});
test('rejects duplicate bundle components',()=>{const c=components();c.push(c[1]);const s=C.normalizeRows(products(),c,release());assert(s.rejected.some(x=>x.code==='DUPLICATE_BUNDLE_COMPONENT'))});
test('rejects unknown component',()=>{const c=components();c[1][2]='TEST-NOPE';const s=C.normalizeRows(products(),c,release());assert(s.rejected.some(x=>x.code==='UNKNOWN_BUNDLE_COMPONENT'))});
test('does not expose any private costs or customer info in Wix payloads',()=>{const rows=C.toWixPrivateRecords(snap());assert.equal(rows.length,3);for(const x of rows){assert.equal(x.data.releaseState,'STAGED_PRIVATE');assert.equal(x.data.publicSlot,'NONE');assert(!JSON.stringify(x).includes('wholesale'));assert(!JSON.stringify(x).includes('customerEmail'));}});
test('stable Wix record IDs for same approved SKU',()=>{const one=C.toWixPrivateRecords(snap()),two=C.toWixPrivateRecords(snap());assert.deepEqual(one.map(x=>x.id),two.map(x=>x.id));assert(one.every(x=>x.id.startsWith('MCV3-')))});
test('no real product rows yields an empty, fail-closed catalog',()=>{const x=C.normalizeRows([C.ITEM_COLUMNS], [C.COMPONENT_COLUMNS],[C.RELEASE_COLUMNS]);assert.deepEqual(x.items,[]);assert.equal(x.invoiceEmailEnabled,false)});
test('prevents duplicate product IDs',()=>{const x=products();x.push(x[1]);const s=C.normalizeRows(x,components(),release());assert(s.rejected.some(x=>x.code==='DUPLICATE_ITEM_ID'))});
test('malicious name or unsupported image URL fails safely',()=>{const x=products();x[1][11]='javascript:bad';const s=C.normalizeRows(x,components(),release());assert(s.rejected.some(x=>x.code==='INVALID_IMAGE_URL'))});
test('never publishes even if release sheet says ON',()=>{const r=release();r[1][4]='APPROVED';r[1][5]='APPROVED';r[1][6]='APPROVED';r[1][7]='ON';r[1][8]='ACTIVE';const s=C.normalizeRows(products(),components(),r);assert.equal(s.publicReleaseEnabled,false)});
