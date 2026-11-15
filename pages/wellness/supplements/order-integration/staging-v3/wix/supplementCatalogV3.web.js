/* Matrix Supplements Phase 3 — add beside existing supplementStaging.web.js.
   ADMIN preview only. Every visitor-facing method is fail-closed.
   No forms, emails, invoices or CMS writes in this module. */
import wixData from 'wix-data';
import { webMethod, Permissions } from 'wix-web-module';

const PRIVATE_CATALOG = 'MatrixSupplementCatalogSnapshotV2';
const TEST_RELEASE = 'TEST_ONLY_NEVER_PUBLIC';
const MAX_LINES = 20;
const options = { suppressAuth: true, consistentRead: true };

function allowed(r) {
  return Boolean(r && r.releaseState === TEST_RELEASE && r.publicSlot === 'NONE'
    && /^TEST-[A-Z0-9-]+$/.test(String(r.itemId || ''))
    && /^TEST ONLY/.test(String(r.publicName || ''))
    && Number.isInteger(r.monthlyPriceCents) && r.monthlyPriceCents > 0
    && Number.isInteger(r.everydayPriceCents) && r.everydayPriceCents >= r.monthlyPriceCents);
}
function safeItem(r) {
  return {
    itemId: r.itemId,
    kind: r.kind === 'BUNDLE' ? 'BUNDLE' : 'PRODUCT',
    publicName: r.publicName,
    shortDescription: String(r.shortDescription || '').slice(0, 500),
    monthlyPriceCents: r.monthlyPriceCents,
    everydayPriceCents: r.everydayPriceCents,
    releaseState: TEST_RELEASE,
    publicSlot: 'NONE'
  };
}
async function privateTestCatalog() {
  const result = await wixData.query(PRIVATE_CATALOG)
    .eq('releaseState', TEST_RELEASE).limit(100).find(options);
  const data = result.items.filter(allowed).map(safeItem);
  if (result.hasNext()) throw new Error('TEST_CATALOG_LIMIT_EXCEEDED');
  return data;
}
export const matrixMonthlyCatalogStatusV3 = webMethod(Permissions.Anyone, async () => ({
  orderingEnabled: false,
  items: [],
  status: 'COMING_SOON'
}));
export const matrixAdminCatalogPreviewV3 = webMethod(Permissions.Admin, async () => ({
  environment: 'TEST_ONLY',
  publicEnabled: false,
  items: await privateTestCatalog()
}));
export const matrixAdminQuotePreviewV3 = webMethod(Permissions.Admin, async cart => {
  if (!Array.isArray(cart) || cart.length < 1 || cart.length > MAX_LINES) throw new Error('INVALID_CART');
  const catalog = await privateTestCatalog();
  const index = new Map(catalog.map(p => [p.itemId, p]));
  const quantities = new Map();
  for (const line of cart) {
    if (!line || Array.isArray(line) || typeof line !== 'object' ||
        Object.keys(line).sort().join('|') !== 'itemId|quantity') throw new Error('CLIENT_PRICE_OR_FIELD_FORBIDDEN');
    const p = index.get(line.itemId);
    if (!p) throw new Error('UNKNOWN_TEST_ITEM');
    if (!Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > 12) throw new Error('INVALID_QUANTITY');
    quantities.set(line.itemId, (quantities.get(line.itemId) || 0) + line.quantity);
    if (quantities.get(line.itemId) > 12) throw new Error('INVALID_TOTAL_QUANTITY');
  }
  const lines = [...quantities].sort((a, b) => a[0].localeCompare(b[0])).map(([id, qty]) => {
    const p = index.get(id);
    return { itemId: id, quantity: qty, monthlyLineCents: qty * p.monthlyPriceCents,
      everydayLineCents: qty * p.everydayPriceCents };
  });
  const monthlyTotalCents = lines.reduce((sum, x) => sum + x.monthlyLineCents, 0);
  const everydayTotalCents = lines.reduce((sum, x) => sum + x.everydayLineCents, 0);
  return { lines, monthlyTotalCents, everydayTotalCents,
    savingsCents: everydayTotalCents - monthlyTotalCents,
    previewOnly: true, invoiceCreated: false, requestSaved: false,
    publicEnabled: false };
});
