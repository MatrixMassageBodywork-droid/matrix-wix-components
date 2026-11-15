import wixData from 'wix-data';
import { webMethod, Permissions } from 'wix-web-module';

const COLLECTION = 'MatrixSupplementOrderIntakeV2';
const DATA_OPTIONS = { suppressAuth: true, suppressHooks: true };
const FIXTURE_ID = 'TEST-STAGE2-TRANSPORT-001';
const FIXTURE_CART = JSON.stringify([{ itemId: 'TEST-PRODUCT-A', quantity: 2 }, { itemId: 'TEST-BUNDLE-AB', quantity: 1 }]);

// This Admin-only entry point accepts no caller-controlled identity, cart or money.
// The fixed _id makes repeated execution and concurrent retries insert-only.
export const submitMatrixStagingFixture = webMethod(Permissions.Admin, async () => {
  const old = await wixData.get(COLLECTION, FIXTURE_ID, DATA_OPTIONS);
  if (old) {
    if (old.cartJson !== FIXTURE_CART || old.customerEmail !== 'matrix.stage2@example.invalid') throw new Error('STAGING_FIXTURE_CONFLICT');
    return { state: 'ALREADY_EXISTS', submissionId: FIXTURE_ID, orderRef: old.orderRef };
  }
  const record = {
    _id: FIXTURE_ID,
    submissionId: FIXTURE_ID,
    orderRef: 'TEST-REF-STAGE2-001',
    createdUtc: new Date(),
    customerName: 'Matrix synthetic test',
    customerEmail: 'matrix.stage2@example.invalid',
    fulfillment: 'TEST_PICKUP',
    cartJson: FIXTURE_CART,
    cycleId: 'TEST-CYCLE-V2',
    marketingOptIn: false,
    termsAccepted: true,
    sourcePage: 'ADMIN_STAGING_TEST',
    intakeStatus: 'NEW_TEST'
  };
  await wixData.insert(COLLECTION, record, DATA_OPTIONS);
  return { state: 'CREATED', submissionId: FIXTURE_ID, orderRef: record.orderRef };
});

export const matrixOrderingStatus = webMethod(Permissions.Anyone, async () => ({
  orderingEnabled: false,
  message: 'Monthly ordering is being prepared. Please check back for approved products and pricing.'
}));
