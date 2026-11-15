/* CANDIDATE ONLY — merge into freshly read existing Supplements page code.
 * Preserve all current page code and seoMarkup; do not replace them with this file.
 * Exactly one new element: #matrixMonthlyOrderV3, tag matrix-monthly-order-selector.
 * This fragment alone does not install, activate, or publish an order form.
 */
import { matrixMonthlyCatalogStatusV3 } from 'backend/supplementCatalogV3.web';

$w.onReady(async function () {
  const element = $w('#matrixMonthlyOrderV3');
  // Fail-closed: demo only. Public never receives TEST fixtures or customer details.
  element.setAttribute('preview-mode', 'CLOSED');
  element.setAttribute('catalog-json', '[]');
  try {
    const status = await matrixMonthlyCatalogStatusV3();
    if (status.orderingEnabled !== false || (status.items || []).length !== 0) {
      throw new Error('UNEXPECTED_LIVE_CATALOG');
    }
    // This handler captures no personal data and does not save an order.
    element.on('matrix-cart-preview', event => {
      if (event.detail?.requestSent !== false) throw new Error('UNEXPECTED_CART_SEND');
      console.log('Monthly cart preview only');
    });
  } catch (error) {
    element.setAttribute('preview-mode', 'CLOSED');
    element.setAttribute('catalog-json', '[]');
    console.warn('Supplement ordering remains closed.');
  }
});
