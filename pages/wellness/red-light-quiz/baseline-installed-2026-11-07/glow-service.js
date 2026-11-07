import { createHash } from 'crypto';
import { validateAnswers, buildClientReport, reportText } from 'backend/glow-rules';

const WRITE = { suppressAuth: true };
const READ = { suppressAuth: true, consistentRead: true };
const digest = text => createHash('sha256').update(text).digest('hex');
const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
const reject = code => Object.assign(new Error(code), { code });

export function validateRequest(input, config) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw reject('INVALID_REQUEST');
  if (JSON.stringify(input).length > 6000) throw reject('INVALID_REQUEST');
  const allowed = ['requestId', 'firstName', 'lastName', 'email', 'phone', 'answers', 'consent', 'consentVersion', 'token'];
  if (Object.keys(input).some(k => !allowed.includes(k))) throw reject('INVALID_REQUEST');
  if (!uuid.test(input.requestId || '')) throw reject('INVALID_REQUEST');
  const firstName = typeof input.firstName === 'string' ? input.firstName.trim() : '';
  const lastName = typeof input.lastName === 'string' ? input.lastName.trim() : '';
  const phoneRaw = typeof input.phone === 'string' ? input.phone.trim() : '';
  const phoneCompact = phoneRaw.replace(/[().\s-]/g, '');
  let phone = phoneCompact;
  if (/^\d{10}$/.test(phoneCompact)) phone = '+1' + phoneCompact;
  else if (/^1\d{10}$/.test(phoneCompact)) phone = '+' + phoneCompact;
  const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : '';
  if (!firstName || firstName.length > 80 || /[<>\r\n\x00-\x1f]/.test(firstName)) throw reject('INVALID_REQUEST');
  if (!lastName || lastName.length > 80 || /[<>\r\n\x00-\x1f]/.test(lastName)) throw reject('INVALID_REQUEST');
  if (phoneRaw.length > 30 || !/^\+[1-9]\d{7,14}$/.test(phone)) throw reject('INVALID_REQUEST');
  if (email.length > 160 || !/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(email)) throw reject('INVALID_REQUEST');
  if (input.consent !== true || input.consentVersion !== config.consentVersion) throw reject('CONSENT_REQUIRED');
  if (typeof input.token !== 'string' || !input.token || input.token.length > 4096) throw reject('CAPTCHA_REQUIRED');
  const answers = validateAnswers(input.answers);
  return { requestId: input.requestId.toLowerCase(), firstName, lastName, email, phone, answers };
}

export function createIntakeService({ config, data, authorize, resolveContact, getOwner, send }) {
  function configured() {
    return config.mode === 'live' && config.privacyReviewed &&
      config.clientEmailId && config.ownerEmailId && config.ownerContactId;
  }
  function summary(row, duplicate = false) {
    return {
      status: 'saved', reference: row._id, duplicate,
      clientStatus: row.clientDeliveryState,
      ownerStatus: row.ownerDeliveryState,
      report: row.reportJson ? JSON.parse(row.reportJson) : null
    };
  }
  async function persist(row) {
    return data.update(config.collectionId, row, WRITE);
  }
  async function attempt(row, recipient) {
    const field = recipient === 'client' ? 'clientDeliveryState' : 'ownerDeliveryState';
    let contact;
    try {
      contact = recipient === 'client'
        ? await resolveContact(row.firstName, row.email, row.lastName)
        : await getOwner(config.ownerContactId);
      const expected = recipient === 'client' ? row.email : config.ownerEmail.toLowerCase();
      // Do not send a private report to another primary email on an existing CRM contact.
      if (!contact || contact.primaryEmail?.toLowerCase() !== expected) {
        row[field] = 'ADDRESS_REVIEW';
        return persist(row);
      }
      if (contact.subscriptionStatus === 'UNSUBSCRIBED') {
        row[field] = 'UNSUBSCRIBED';
        return persist(row);
      }
      if (!['SUBSCRIBED', 'NOT_SET'].includes(contact.subscriptionStatus)) {
        row[field] = 'STATUS_REVIEW';
        return persist(row);
      }
    } catch {
      row[field] = 'CONTACT_FAILED';
      row.lastErrorCode = recipient.toUpperCase() + '_CONTACT';
      return persist(row);
    }
    row[field] = 'SENDING';
    await persist(row); // Durable marker BEFORE the external send.
    try {
      const variables = recipient === 'client'
        ? { firstName: row.firstName, requestRef: row._id, reportBody: row.reportText }
        : { firstName: row.firstName, requestRef: row._id };
      await send(
        recipient === 'client' ? config.clientEmailId : config.ownerEmailId,
        contact.id, { variables }
      );
    } catch {
      // A rejected/timeout call may still have reached the mail service. Never auto-resend.
      row[field] = 'SEND_UNKNOWN';
      row.lastErrorCode = recipient.toUpperCase() + '_SEND';
      return persist(row);
    }
    row[field] = 'ACCEPTED';
    // ACCEPTED means the Wix call resolved, not inbox delivery or an open.
    return persist(row);
  }

  async function submit(input) {
    let request;
    try { request = validateRequest(input, config); }
    catch (error) { return { status: 'rejected', code: error.code || 'INVALID_REQUEST' }; }
    try { await authorize(input.token); }
    catch { return { status: 'rejected', code: 'CAPTCHA_FAILED' }; }
    if (config.mode === 'test') return { status: 'test', stored: false, emailed: false };
    if (!configured()) return { status: 'rejected', code: 'NOT_CONFIGURED' };

    const id = request.requestId;
    const requestHash = digest(JSON.stringify([request.firstName, request.lastName, request.email, request.phone, request.answers]));
    const report = buildClientReport(request.answers);
    const row = {
      _id: id, title: 'Glow request ' + id,
      firstName: request.firstName, lastName: request.lastName, email: request.email, phone: request.phone,
      marketingConsent: true, marketingConsentVersion: config.consentVersion, marketingConsentedAt: new Date(),
      marketingConsentText: 'I agree to receive marketing emails from Matrix Massage & Bodywork. I can unsubscribe at any time.',
      reportJson: JSON.stringify(report),
      requestHash, reportText: reportText(report, { offersApproved: config.offersApproved, bookingUrl: config.bookingUrl }),
      rulesVersion: report.version, consentVersion: config.consentVersion, consentedAt: new Date(),
      clientDeliveryState: 'PENDING', ownerDeliveryState: 'PENDING', lastErrorCode: ''
    };
    try {
      // Atomic insert wins a single processing attempt, including concurrent duplicate clicks.
      await data.insert(config.collectionId, row, WRITE);
    } catch {
      try {
        const old = await data.get(config.collectionId, id, READ);
        if (old && old.requestHash === requestHash) return summary(old, true);
      } catch { /* Do not reveal another row or raw platform error. */ }
      return { status: 'rejected', code: 'SAVE_FAILED' };
    }
    try {
      await attempt(row, 'client');
      await attempt(row, 'owner');
      return summary(row);
    } catch {
      // The lead was saved. Preserve uncertainty rather than invent email success.
      return { status: 'saved', reference: id, clientStatus: 'CHECK_REQUIRED', ownerStatus: 'CHECK_REQUIRED' };
    }
  }

  async function recover(id) {
    if (!uuid.test(id || '') || !configured()) return { status: 'rejected', code: 'NOT_CONFIGURED' };
    const row = await data.get(config.collectionId, id, READ);
    if (!row || !row.requestHash) return { status: 'rejected', code: 'NOT_FOUND' };
    // Only definite pre-send failures qualify. SENDING/SEND_UNKNOWN require human reconciliation.
    const retryable = state => ['PENDING', 'CONTACT_FAILED'].includes(state);
    if (![row.clientDeliveryState, row.ownerDeliveryState].some(retryable)) {
      return { status: 'rejected', code: 'MANUAL_RECONCILIATION_REQUIRED' };
    }
    try {
      // Permanent single recovery claim; never delete to force further retries.
      await data.insert(config.collectionId, {
        _id: 'recovery-' + id, title: 'Recovery claim ' + id, rulesVersion: 6,
        clientDeliveryState: 'RECOVERY_CLAIM', ownerDeliveryState: 'RECOVERY_CLAIM'
      }, WRITE);
    } catch { return { status: 'rejected', code: 'RECOVERY_ALREADY_CLAIMED' }; }
    try {
      if (retryable(row.clientDeliveryState)) await attempt(row, 'client');
      if (retryable(row.ownerDeliveryState)) await attempt(row, 'owner');
      return summary(row);
    } catch {
      return { status: 'saved', reference: id, clientStatus: 'CHECK_REQUIRED', ownerStatus: 'CHECK_REQUIRED' };
    }
  }
  return { submit, recover };
}
