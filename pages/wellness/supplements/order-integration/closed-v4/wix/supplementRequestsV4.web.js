/* MATRIX Supplements V4: additive private-catalog and customer-request adapter.
 * INSTALL AS NEW backend web module. Preserve V2/V3 modules and permissions.
 * CLOSED: do not change request switch or policy until separately approved launch.
 * No production invoice, payment, email, wholesale order or automated trigger here.
 */
import wixData from 'wix-data';
import wixCaptchaBackend from 'wix-captcha-backend';
import { webMethod, Permissions } from 'wix-web-module';

const CATALOG = 'MatrixSupplementCatalogSnapshotV2';
const INTAKE = 'MatrixSupplementOrderIntakeV2';
const QUERY = { suppressAuth: true, consistentRead: true };
const WRITE = { suppressAuth: true };
const CUSTOMER_REQUESTS_ENABLED = false; // explicit future release ONLY
const APPROVED_TERMS_VERSION = '';       // empty until tax, shipping and deadlines approved
const APPROVED_CYCLE_ID = '';           // empty until a real order window is approved
const LIMIT_LINES = 20;
const LIMIT_QUANTITY = 12;
const LIMIT_TOTAL_CENTS = 100000000;
const SAFE_ID = /^[A-Z0-9][A-Z0-9_-]{2,79}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function insist(ok, code) { if (!ok) throw new Error(code); }
function strictKeys(value, expected) {
  insist(value && typeof value === 'object' && !Array.isArray(value), 'INVALID_OBJECT');
  insist(Object.keys(value).sort().join('|') === expected.slice().sort().join('|'), 'UNEXPECTED_INPUT_FIELD');
}
function isPrivateApproved(r) {
  return r && r.releaseState === 'STAGED_PRIVATE' && r.publicSlot === 'NONE'
    && SAFE_ID.test(String(r.itemId || '')) && !String(r.itemId).startsWith('TEST-')
    && (r.kind === 'PRODUCT' || r.kind === 'BUNDLE')
    && String(r.publicName || '').length >= 4 && String(r.publicName).length <= 120
    && Number.isSafeInteger(r.monthlyPriceCents) && r.monthlyPriceCents > 0
    && Number.isSafeInteger(r.everydayPriceCents)
    && r.everydayPriceCents >= r.monthlyPriceCents
    && /^[A-Z0-9][A-Z0-9-]{2,39}$/.test(String(r.offerVersion || ''));
}
function isTest(r) {
  return r && r.releaseState === 'TEST_ONLY_NEVER_PUBLIC' && r.publicSlot === 'NONE'
    && /^TEST-[A-Z0-9-]+$/.test(String(r.itemId || ''))
    && /^TEST ONLY/.test(String(r.publicName || ''))
    && Number.isSafeInteger(r.monthlyPriceCents) && r.monthlyPriceCents > 0
    && Number.isSafeInteger(r.everydayPriceCents) && r.everydayPriceCents >= r.monthlyPriceCents;
}
function isPublicApproved(r) {
  return isPrivateApproved({ ...r, releaseState: 'STAGED_PRIVATE', publicSlot: 'NONE' })
    && r.releaseState === 'PUBLIC_APPROVED' && r.publicSlot !== 'NONE';
}
function safe(r) {
  return {
    itemId: String(r.itemId),
    kind: r.kind === 'BUNDLE' ? 'BUNDLE' : 'PRODUCT',
    publicName: String(r.publicName),
    shortDescription: String(r.shortDescription || '').slice(0, 500),
    monthlyPriceCents: r.monthlyPriceCents,
    everydayPriceCents: r.everydayPriceCents,
    offerVersion: String(r.offerVersion || ''),
    releaseState: String(r.releaseState),
    publicSlot: String(r.publicSlot)
  };
}
async function readCatalog() {
  const result = await wixData.query(CATALOG).limit(100).find(QUERY);
  insist(!result.hasNext(), 'CATALOG_LIMIT_EXCEEDED');
  return result.items;
}
function quote(cart, items) {
  insist(Array.isArray(cart) && cart.length > 0 && cart.length <= LIMIT_LINES, 'INVALID_CART');
  const index = new Map(items.map(x => [x.itemId, x]));
  insist(index.size === items.length, 'DUPLICATE_CATALOG_SKU');
  const totals = new Map();
  for (const line of cart) {
    strictKeys(line, ['itemId', 'quantity']);
    insist(typeof line.itemId === 'string' && SAFE_ID.test(line.itemId), 'INVALID_ITEM_ID');
    insist(Number.isInteger(line.quantity) && line.quantity >= 1 && line.quantity <= LIMIT_QUANTITY, 'INVALID_QUANTITY');
    insist(index.has(line.itemId), 'NOT_APPROVED_ITEM');
    totals.set(line.itemId, (totals.get(line.itemId) || 0) + line.quantity);
    insist(totals.get(line.itemId) <= LIMIT_QUANTITY, 'QUANTITY_LIMIT');
  }
  const lines = [...totals].sort((a,b) => a[0].localeCompare(b[0])).map(([id, count]) => {
    const p = index.get(id);
    return {
      itemId: id, quantity: count, kind: p.kind,
      displayName: p.publicName, offerVersion: p.offerVersion,
      monthlyUnitCents: p.monthlyPriceCents, everydayUnitCents: p.everydayPriceCents,
      monthlyLineCents: p.monthlyPriceCents * count,
      everydayLineCents: p.everydayPriceCents * count
    };
  });
  const totalCents = lines.reduce((n,p) => n+p.monthlyLineCents,0);
  const comparisonCents = lines.reduce((n,p) => n+p.everydayLineCents,0);
  insist(totalCents > 0 && totalCents <= LIMIT_TOTAL_CENTS && comparisonCents >= totalCents, 'INVALID_TOTAL');
  return { lines, totalCents, comparisonCents, savingsCents: comparisonCents-totalCents,
    taxCents: null, shippingCents: null, invoiceCreated: false };
}
function validateInput(input) {
  insist(JSON.stringify(input || {}).length < 5000, 'OVERSIZE_REQUEST');
  strictKeys(input, ['requestId','customerName','customerEmail','fulfillment','cart','termsAccepted','marketingOptIn','captchaToken','termsVersion','cycleId']);
  insist(typeof input.requestId === 'string' && UUID.test(input.requestId), 'INVALID_REQUEST_ID');
  insist(typeof input.customerName === 'string' && input.customerName.trim().length >= 2 && input.customerName.trim().length <= 120, 'INVALID_NAME');
  insist(typeof input.customerEmail === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.customerEmail.trim()) && input.customerEmail.length <= 200, 'INVALID_EMAIL');
  insist(['PICKUP','SHIPPING'].includes(input.fulfillment), 'INVALID_FULFILLMENT');
  insist(input.termsAccepted === true && typeof input.marketingOptIn === 'boolean', 'MISSING_CONSENT');
  insist(input.termsVersion === APPROVED_TERMS_VERSION && APPROVED_TERMS_VERSION !== '', 'TERMS_NOT_APPROVED');
  insist(input.cycleId === APPROVED_CYCLE_ID && APPROVED_CYCLE_ID !== '', 'CYCLE_NOT_APPROVED');
  insist(typeof input.captchaToken === 'string' && input.captchaToken.length > 10 && input.captchaToken.length < 4096, 'CAPTCHA_REQUIRED');
  return {
    submissionId: 'SUPV4-' + input.requestId.toLowerCase(),
    customerName: input.customerName.trim(),
    customerEmail: input.customerEmail.trim().toLowerCase(),
    fulfillment: input.fulfillment,
    marketingOptIn: input.marketingOptIn,
    termsAccepted: true,
    termsVersion: input.termsVersion,
    cycleId: input.cycleId,
    cart: input.cart
  };
}
function liveOpen() {
  return CUSTOMER_REQUESTS_ENABLED &&
    APPROVED_TERMS_VERSION !== '' &&
    APPROVED_CYCLE_ID !== '';
}
export const matrixMonthlyCatalogStatusV4 = webMethod(Permissions.Anyone, async () => {
  if (!liveOpen()) return { orderingEnabled: false, status: 'COMING_SOON', items: [] };
  const items = (await readCatalog()).filter(isPublicApproved).map(safe);
  return { orderingEnabled: items.length > 0, status: items.length ? 'OPEN' : 'COMING_SOON',
    items: items.length ? items : [] };
});
export const matrixAdminCatalogPreviewV4 = webMethod(Permissions.Admin, async () => {
  const rows = await readCatalog();
  return { environment: 'ADMIN_ONLY', orderingEnabled: false,
    staged: rows.filter(isPrivateApproved).map(safe),
    synthetic: rows.filter(isTest).map(safe),
    rejectedCount: rows.filter(x => !isPrivateApproved(x) && !isTest(x)).length };
});
export const matrixAdminQuotePreviewV4 = webMethod(Permissions.Admin, async (cart, scope) => {
  insist(scope === 'TEST' || scope === 'STAGED', 'INVALID_ADMIN_SCOPE');
  const rows = await readCatalog();
  const items = rows.filter(scope === 'TEST' ? isTest : isPrivateApproved).map(safe);
  return { ...quote(cart,items), previewOnly: true, requestSaved: false, emailsSent: 0 };
});
export const matrixAdminSyntheticChecksV4 = webMethod(Permissions.Admin, async () => {
  const rows = [
    {itemId:'TEST-PRODUCT-A',kind:'PRODUCT',publicName:'TEST ONLY A',monthlyPriceCents:1200,everydayPriceCents:1800,offerVersion:'TEST-V3-1'},
    {itemId:'TEST-BUNDLE-AB',kind:'BUNDLE',publicName:'TEST ONLY Bundle',monthlyPriceCents:1800,everydayPriceCents:2600,offerVersion:'TEST-V3-1'}
  ];
  const q = quote([{itemId:'TEST-PRODUCT-A',quantity:2},{itemId:'TEST-BUNDLE-AB',quantity:1}],rows);
  insist(q.totalCents === 4200 && q.comparisonCents === 6200 && q.savingsCents === 2000, 'QA_FAILED');
  return { state:'PASS', totalCents:q.totalCents, comparisonCents:q.comparisonCents,
    savingsCents:q.savingsCents, externalCalls:0, customerRecordsWritten:0,
    emailsSent:0, publicOrderingEnabled:false };
});
export const matrixSubmitOrderRequestV4 = webMethod(Permissions.Anyone, async input => {
  // This is deliberately non-operational until owner approval AND separate release.
  if (!liveOpen()) return { state:'CLOSED', requestSaved:false, invoiceCreated:false };
  const normalized = validateInput(input);
  // Eligibility and money are read and recalculated exclusively on the server.
  const rows = await readCatalog();
  const approved = rows.filter(isPublicApproved).map(safe);
  const locked = quote(normalized.cart,approved);
  const id = normalized.submissionId;
  const matches = await wixData.query(INTAKE).eq('_id',id).limit(1).find(QUERY);
  if (matches.items.length) {
    const previous = matches.items[0];
    insist(previous.customerEmail === normalized.customerEmail &&
      previous.cartJson === JSON.stringify(normalized.cart), 'REPLAY_CONFLICT');
    return { state:'ALREADY_EXISTS', submissionId:id, invoiceCreated:false };
  }
  // CAPTCHA must be authorized server-side, not simply verified on the page.
  await wixCaptchaBackend.authorize(input.captchaToken);
  const since = new Date(Date.now()-30*60*1000);
  const recent = await wixData.query(INTAKE).eq('customerEmail',normalized.customerEmail)
    .ge('_createdDate',since).limit(4).find(QUERY);
  insist(recent.items.length < 3, 'RATE_LIMITED');
  const received = new Date();
  const record = {
    _id:id, submissionId:id, orderRef:id, createdUtc:received,
    receivedUtcIso:received.toISOString(),
    customerName:normalized.customerName, customerEmail:normalized.customerEmail,
    fulfillment:normalized.fulfillment, cartJson:JSON.stringify(normalized.cart),
    cycleId:normalized.cycleId, marketingOptIn:normalized.marketingOptIn,
    termsAccepted:true, sourcePage:'MATRIX_SUPPLEMENTS_V4',
    intakeStatus:'NEW_PENDING_REVIEW',
    quoteSnapshotJson:JSON.stringify(locked),
    termsVersion:normalized.termsVersion
  };
  try {
    await wixData.insert(INTAKE,record,WRITE);
  } catch (e) {
    // Never retry a possibly persisted insert without readback.
    const replay = await wixData.query(INTAKE).eq('_id',id).limit(1).find(QUERY);
    if (replay.items.length && replay.items[0].cartJson === record.cartJson &&
        replay.items[0].customerEmail === record.customerEmail)
      return { state:'ALREADY_EXISTS',submissionId:id,invoiceCreated:false };
    throw e;
  }
  return { state:'RECEIVED_PENDING_REVIEW',submissionId:id,invoiceCreated:false };
});