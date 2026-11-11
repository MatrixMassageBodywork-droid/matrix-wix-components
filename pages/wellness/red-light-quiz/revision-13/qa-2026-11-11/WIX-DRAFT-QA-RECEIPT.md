# Glow Test R13 — saved Wix draft and preview QA
Date: 2026-11-11. Status: **SAVED / SOURCE VERIFIED / DESKTOP AND MOBILE PREVIEW TESTED / NOT PUBLISHED**.

## Scope and source
Owner requested contradictions in booking/instructions fixed, a more exciting benefits-led red-light experience, natural flow and scrolling corrections. Continued R12; no rebuild or duplicate page.

Site cdec8df6-d518-4859-9f1e-f06bf5346d41; document a276c9bf-bc17-4680-959b-a24ebe7370f6; page e8l5a; /red-light-therapy-glow-score.
Final source commit: 96f4670c111b24593b620be43f1c03557f5df0fd on improve/red-light-flow-r13-2026-11-11.
Source files: embed.html, glow-rules.js, page-code.js, native-copy.json. Reproducible build_r13.py and check_r13.mjs included.
Previous R12 rollback/evidence: ca70ebddf655a04c032a130cbac5c8c90e35ff8e. No rollback performed.

## Installed
- Native top CTA now says “Take the free Glow Test”; its old booking URL was removed. Its page handler starts the same embedded quiz.
- Native introduction and lower instructions now agree: immediate free results; no booking, purchase, contact data or verification needed to read them.
- Stronger introduction: “Discover the power of red light.” Personalized benefits lead; three report sections organize benefits, next steps and keeping the guide.
- “Just exploring” skips service and availability questions. Planning answers are explicitly optional ideas, not appointments. Prices/booking appear in the final keep-guide section.
- General research/FAQs and extended study context are optional expansions. On-page complete report, print/save and optional email controls remain.
- Existing safety-review gates remain. Review-required reports also display a suitability note within benefits and hide the appointment link.
- Quiz/report/email transitions reset internal scroll and align the frame beneath the site header. Native CAPTCHA/status collapse initially; existing validation and separate consent checks remain.
- Page bridge, HTML component and backend/glow-rules.js changed. Intake/service/config, CRM/CMS, trigger identities, permissions, shared header/footer, About/Testimonials, URL and SEO settings were not edited.

## Save and readback
Wix displayed “Your changes are saved” at the small save checkpoints.
After a full editor reload, HTML, backend rules and page bridge matched the installed source in full after CRLF normalization. A subsequent desktop-spacing adjustment changed only the page bridge verification Y coordinate and native geometry; that final bridge matched clipboard readback and the save confirmation was observed. Final frame dimensions were rechecked in Preview. Final native draft revision number was not exposed/captured. No claim is made that the old published revision number was freshly verified.

## Final native geometry
| Element | Desktop | Mobile |
|---|---|---|
| htmlGlowQuiz | X0 Y725 W980 H1000 | X0 Y685 W320 H1080 |
| glowCaptcha | X359 Y1749 W234 H60 | X42 Y1789 W236 H60 |
| glowStatus | X60 Y1825 W900 | X20 Y1865 W280 |
| glowVisitInfo | X47 Y1905 W900 H224 | X20 Y2005 W280 H336 |
| section2 | Y132 H2055 | Existing compact section retained; final height not re-read |

Desktop frame was shortened another 250px during visual QA. Mobile auto-layout initially moved the frame when introduction text shortened; Y685 was restored along with CAPTCHA/status Y coordinates. Existing bounded iframe scrolling remains for longer optional content. A modest fixed gap reserved around the optional verification/lower instructions remains; the former multi-thousand-pixel empty section is gone.

## Objective QA
| Check | Result |
|---|---|
| Source syntax, browser/server engine parity | PASS |
| Source scenarios | 2,304 PASS: 1,728 original planning, 576 exploration |
| Safety review outcomes | 1,968 applicable scenarios preserved against R12 |
| Unique HTML IDs and constant references | PASS, 50 IDs |
| Production submission origins and required separate consent | Preserved |
| Native top CTA starts quiz without booking navigation | PASS desktop + mobile |
| Seven-question skin exploration, no nutrition | PASS desktop + mobile |
| Immediate benefits without contact information/CAPTCHA | PASS |
| Existing planning path with optional nutrition | PASS, 12-question mobile route |
| Review-required skin route | PASS; suitability note displayed and booking link hidden |
| Three report sections, optional email and return to guide | PASS |
| Complete report readable on-page | PASS, 2,285-character review-route report |
| Checkbox defaults | Both unchecked, desktop and mobile |
| Horizontal overflow | None measured: desktop body client/scroll 980/980; mobile body client/scroll 305/305 within 320px frame; no visible overflowing descendants |
| Scroll and heading alignment | PASS in Wix Preview; report heading visible after transitions; wheel reaches report, optional email controls and native lower instructions |
| Final frame dimensions | Preview measured desktop 980×1000 and mobile 320×1080 |
| Native lower instructions fit mobile | PASS, screenshot |
| 390px device, real-device touch, print dialog output | NOT TESTED |
| Live CAPTCHA submission, recovery and inbox delivery | NOT TESTED |
| Triggered email template update | NOT INSTALLED; R12 draft source only |
| Publication | NOT PUBLISHED |

Synthetic quiz answers only. No contact information entered, no CAPTCHA solved, no customer record created, no message sent. Preview is not evidence of production email delivery.

## Evidence
- [Desktop introduction](desktop-introduction.jpg)
- [Desktop native hero and corrected CTA](desktop-hero.jpg)
- [Desktop benefits](desktop-results.jpg) — before the final 250px frame reduction; same final content.
- [Mobile benefits](mobile-results.jpg)
- [Mobile matched research and suitability note](mobile-study.jpg)
- [Mobile optional email](mobile-optional-email.jpg)
- [Mobile unchecked consent and reachable return control](mobile-consent.jpg)
- [Mobile corrected lower instructions](mobile-instructions.jpg)

## Release boundary and remaining work
The corrected experience is saved for review. Do not publish this site as part of unrelated work: Wix publication could include this and other saved drafts.
The existing client email VaR3j2e and owner notification VaR4bz9 were not changed. The prior limitation remains: no safe draft-only triggered-email edit was established, and an actual revised email delivery test has not been run.
Separate owner approval is still required for publication, any live email-template activation, and a test send to a named mailbox. A Wix ACCEPTED response alone is not inbox delivery.
