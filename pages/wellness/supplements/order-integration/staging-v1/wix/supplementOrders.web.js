/*
 * Proposed Wix Classic backend web method. It is NOT installed or published.
 * The order-submit method is hard-disabled in this staging checkpoint.
 * Review live page code and Wix bot-verification method before activation.
 */
import wixData from 'wix-data';
import { Permissions, webMethod } from 'wix-web-module';

const CATALOG = 'MatrixSupplementCatalogSnapshotV2';
const INTAKE = 'MatrixSupplementOrderIntakeV2';
const ORDER_ACCEPTANCE_ENABLED = false; // Owner-approved release gate. Default OFF.

function cleanCart(lines) {
  if (!Array.isArray(lines) || lines.length < 1 || lines.length > 24) throw new Error('INVALID_CART');
  const seen = new Map();
  for (const line of lines) {
    const itemId = String(line?.itemId || '').trim().toUpperCase();
    if (!/^[A-Z0-9][A-Z0-9_.-]{1,79}$/.test(itemId)) throw new Error('INVALID_SKU');
    const qty = Number(line?.quantity);
    if (!Number.isInteger(qty) || qty < 1 || qty > 20) throw new Error('INVALID_QUANTITY');
    seen.set(itemId, (seen.get(itemId) || 0) + qty);
    if (seen.get(itemId) > 20) throw new Error('INVALID_QUANTITY');
  }
  return [...seen].map(([itemId, quantity]) => ({ itemId, quantity }));
}
function sanitizeEmail(email) {
  const value = String(email || '').trim().toLowerCase();
  if (value.length > 254 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) throw new Error('INVALID_EMAIL');
  return value;
}

/** Returns only approved website-facing fields. NEVER returns raw catalog records. */
export const matrixGetOrderableItems = webMethod(Permissions.Anyone, async () => {
  const result = await wixData.query(CATALOG).eq('releaseState', 'ACTIVE')
    .limit(100).find({ suppressAuth: true });
  return result.items.map(item => ({
    itemId: item.itemId,
    kind: item.kind,
    name: item.publicName,
    description: item.shortDescription,
    imageUrl: item.imageUrl,
    monthlyPriceCents: item.monthlyPriceCents,
    everydayPriceCents: item.everydayPriceCents,
    version: item.offerVersion
  }));
});

/** No data is inserted unless separately reviewed, tested and deliberately enabled. */
export const matrixSubmitSupplementOrder = webMethod(Permissions.Anyone, async (payload) => {
  if (!ORDER_ACCEPTANCE_ENABLED) {
    return { status: 'COMING_SOON', message: 'Monthly ordering opens soon.' };
  }
  // Before enabling: implement and QA a verified anti-bot control and duplicate
  // submission handling in this backend, plus an approved Wix-to-Sheets action.
  // This branch deliberately refuses all customer data even if the top flag is changed.
  throw new Error('STAGING_CODE_REQUIRES_SECURITY_REVIEW');
});
