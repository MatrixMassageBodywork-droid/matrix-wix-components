/* BACKEND ONLY. No keys or passwords are required.
 * Do not enable live mode before the launch checklist and owner approval.
 */
export const CONFIG = Object.freeze({
  mode: 'test', // 'test' stores nothing and sends nothing; 'live' requires approval.
  collectionId: 'MatrixGlowGuideLeads',
  clientEmailId: '', // Copy the actual ID from the Wix Triggered Emails code snippet.
  ownerEmailId: '', // Different template, with only a reference and client first name.
  ownerContactId: '', // Verify this CRM contact's primary email before enabling.
  ownerEmail: 'matrixmassage.bodywork@matrixmassage.net',
  consentVersion: 'matrix-glow-marketing-email-2026-10-v2',
  offersApproved: true, // Owner supplied exact per-service prices on 2026-11-07. No package offers.
  privacyReviewed: false, // Confirm privacy notice, access, retention, email processing.
  bookingUrl: '' // Optional: paste a verified, existing Square appointment URL.
});
