import { webMethod, Permissions } from 'wix-web-module';
import wixCaptcha from 'wix-captcha-backend';
import wixData from 'wix-data';
import { contacts, triggeredEmails } from 'wix-crm-backend';
import { CONFIG } from 'backend/glow-config';
import { createIntakeService } from 'backend/glow-service';

const shapeContact = c => ({
  id: c._id,
  primaryEmail: c.primaryInfo?.email,
  subscriptionStatus: c.info?.extendedFields?.['emailSubscriptions.subscriptionStatus']
});
async function findContact(email) {
  const result = await contacts.queryContacts()
    .eq('primaryInfo.email', email).limit(2).find({ suppressAuth: true });
  if (result.items.length > 1) throw new Error('CONTACT_REVIEW');
  return result.items[0];
}
async function resolveContact(firstName, email, lastName) {
  let contact = await findContact(email);
  if (!contact) {
    try {
      contact = await contacts.createContact({
        name: { first: firstName, last: lastName },
        emails: [{ email, primary: true, tag: 'MAIN' }]
      }, { suppressAuth: true, allowDuplicates: false });
    } catch {
      // A racing request may have created it. Do not permit duplicate contacts.
      contact = await findContact(email);
      if (!contact) throw new Error('CONTACT_FAILED');
    }
  }
  // Do not overwrite contact names, primary emails, labels, or marketing consent.
  return shapeContact(await contacts.getContact(contact._id, { suppressAuth: true }));
}
const service = createIntakeService({
  config: CONFIG, data: wixData,
  authorize: async token => {
    const result = await wixCaptcha.authorize(token);
    // Stable Velo authorize rejects invalid tokens; also fail if an explicit failure is returned.
    if (result?.success === false || result?.error ||
      (result?.errors && Object.keys(result.errors).length > 0)) throw new Error('CAPTCHA_FAILED');
  },
  resolveContact,
  getOwner: async id => shapeContact(await contacts.getContact(id, { suppressAuth: true })),
  send: (templateId, contactId, options) => triggeredEmails.emailContact(templateId, contactId, options)
});

export const submitGlowGuide = webMethod(Permissions.Anyone, request => service.submit(request));
// Operator-only, one conservative recovery attempt. Never expose this function in the quiz.
export const recoverGlowDelivery = webMethod(Permissions.Admin, id => service.recover(id));
