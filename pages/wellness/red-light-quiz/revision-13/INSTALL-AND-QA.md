# R13 targeted correction — 2026-11-11

Authorization: owner requested contradictory booking/instructions fixed, exciting red-light copy and natural flow/scrolling. This authorizes draft correction and visual QA, not publication or messages. Continuation of R12 checkpoint ca70ebddf655a04c032a130cbac5c8c90e35ff8e.

## Exact implementation

- Same Wix site cdec8df6-d518-4859-9f1e-f06bf5346d41, document a276c9bf-bc17-4680-959b-a24ebe7370f6, page e8l5a.
- Native elements freshly observed: html7, glowHeading, glowIntro, glowBookButton, htmlGlowQuiz, glowCaptcha, glowStatus, glowVisitInfo inside section2.
- Preserve H1, URL, SEO metadata, canonical/schema, html7 branding, shared header/footer and all unrelated drafts/pages. Do not touch intake/service/config, CMS, CRM, permissions, email templates or send anything.
- Replace only existing htmlGlowQuiz HTML, this page's bridge, and backend/glow-rules.js with this folder's complete files after reading current copies and confirming R12 identity. Save each small checkpoint; compare full readback after CRLF normalization.
- Set native glowIntro to exactly: “Discover what red light could bring to your glow, comfort and recovery. Take the free Matrix Glow Test for instant, personalized results. No booking or purchase required.” Preserve font/style and existing frame Y positions.
- Change glowBookButton label to “Take the free Glow Test”. Remove its existing booking link using the native button link dialog. R13 page code binds onClick to start the same quiz and align its top beneath the header. Retain button identity/style/position.
- Replace native glowVisitInfo with the exact text in native-copy.json. Preserve type/style/width and verify that text fits both desktop and mobile containers.
- Final targeted geometry after visual QA: desktop frame 980×1000 at Y725; CAPTCHA Y1749, status Y1825, visitInfo Y1905, section2 H2055 at Y132. Mobile frame 320×1080 at Y685; CAPTCHA Y1789, status Y1865, visitInfo Y2005. Keep their existing X, widths and native text heights. The desktop reduction removes 250 px of empty frame space; optional long content keeps native internal scrolling. If native text changes height, keep these targets and fit native text above them; do not overlap elements.
- Existing CAPTCHA/status collapse onReady; expand only when an explicit valid email request reaches the bridge. Keep token verification, idempotency, separate unchecked required consent, original production submission origin whitelist. A separate UI-only bridge trusts the freshly observed editor referrer solely for start/scroll signals; no answers/contact/consent/tokens travel through it.
- Nonanimated scroll targets: quiz desktop545/mobile605 (allow header clearance); verification desktop1569/mobile1709. Internal focus uses preventScroll and resets its own scroll to top. No interception of mouse wheel/touch/keyboard scrolling.

## Behavior and verification

Free exploration path asks seven questions (ten with optional nutrition); no visit or availability choices. Existing planning paths remain nine/twelve questions. Old answer choices still validate. Safety always outranks exploration. Report schema remains11 for existing service/email compatibility.

Report opens on benefits; ordinary buttons select next-steps and keep-guide chapters. No long duplicated research, FAQs or pricing after every question. Additional study details and nutrition are opt-in expansion. Save/email precede optional appointment links. Email form is its own view; return preserves the guide and uncertain request identity. No automatic email.

Acceptance: native top CTA starts the quiz without navigating; no before-results booking CTA in page-local flow; exploration has no purchased service/schedule; final answer shows benefits immediately; chapter headings stay visible; 320/390 desktop widths no horizontal overflow; all report/email content reachable without wheel trapping; one existing CAPTCHA hidden initially and not required for reading; both consent boxes unchecked; no messages sent. Test skin exploration, safety-review path and one planning/nutrition route. Read back after reopening, capture desktop/mobile evidence and record exact limitations. Preview is not proof of live email delivery.

Stop affected edit if source drift, wrong IDs, unexpected shared change, clipped content or unverified save. Retain R12 rollback; do not restore or republish. Research links/clinical cautions remain; compelling copy must not promise cures or equate study equipment with Matrix equipment. Published-email blocker remains outside this correction's scope.

