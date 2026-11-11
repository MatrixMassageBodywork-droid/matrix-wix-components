import wixWindowFrontend from 'wix-window-frontend';
import { submitGlowGuide } from 'backend/glow-intake.web';

const CHANNEL = 'matrix-glow-v7';
let busy = false;
let pending = null;

$w.onReady(() => {
  const frame = $w('#htmlGlowQuiz');
  const captcha = $w('#glowCaptcha');
  const status = $w('#glowStatus');
  const send = payload => frame.postMessage({ channel: CHANNEL, ...payload });
  captcha.collapse();
  status.collapse();
  const alignQuiz = () => wixWindowFrontend.scrollTo(0, wixWindowFrontend.formFactor === 'Mobile' ? 605 : 545, { scrollAnimation: false });
  $w('#glowBookButton').onClick(() => { send({type:'start'}); alignQuiz(); });

  // These listeners are scoped to this HTML element, not arbitrary window messages.
  frame.onMessage(async event => {
    const message = event.data;
    if (!message || message.channel !== CHANNEL) return;
    if (message.type === 'view' && ['intro','quiz','results','email'].includes(message.view)) {
      await alignQuiz();
      return;
    }
    if (message.type === 'ready') {
      send({ type: 'connected' });
      return;
    }
    if (message.type === 'cancel') {
      pending = null;
      captcha.reset();
      captcha.collapse();
      status.collapse();
      return;
    }
    if (message.type !== 'submit' || busy || !message.request) return;
    pending = message.request;
    await status.expand();
    status.text = 'Complete one security verification next to the optional email form. Your report is already available.';
    if (captcha.token) await process();
    else { await captcha.expand(); await captcha.show(); await wixWindowFrontend.scrollTo(0, wixWindowFrontend.formFactor === 'Mobile' ? 1709 : 1569, { scrollAnimation: false }); }
  });

  async function process() {
    if (busy || !pending || !captcha.token) return;
    busy = true;
    const request = pending;
    pending = null;
    status.text = 'Processing your request. Please do not submit again.';
    try {
      const result = await submitGlowGuide({ ...request, token: captcha.token });
      send({ type: 'result', requestId: request.requestId, result });
      status.text = result.status === 'test'
        ? 'Test complete. Nothing was stored or emailed.'
        : result.status === 'saved'
          ? 'Your email-copy request was saved. Your report remains on this page; acceptance does not guarantee inbox delivery.'
          : 'The request was not confirmed. Return to the guide for next steps.';
    } catch {
      send({ type: 'result', requestId: request.requestId, result: { status: 'unknown' } });
      status.text = 'The connection was interrupted. Please retry the same request or contact Matrix.';
    } finally {
      busy = false;
      captcha.reset();
      captcha.collapse();
    }
  }
  captcha.onVerified(process);
  captcha.onTimeout(() => {
    status.text = 'Verification expired. Please complete it again; your request has not been submitted by this page.';
  });
  captcha.onError(() => {
    status.text = 'Verification could not connect. Try again later or contact Matrix.';
  });
});
