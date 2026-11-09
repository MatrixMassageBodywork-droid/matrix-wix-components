# R9 personalized reports — PUBLISHED AND VERIFIED

Latest status: 2026-11-09 UTC / 2026-11-08 America/Chicago. This receipt supersedes prior pending publication and test status.

## Live result

- Original page e8l5a: https://www.matrixmassage.net/red-light-therapy-glow-score
- Personalized reports require first and last name, email, phone, both separate unchecked marketing permissions and native CAPTCHA verification.
- Reports are generated from the quiz answers and emailed automatically through the published Wix triggered-email template. Owner notification contains request reference, not health answers.
- Consent wording, version, phone normalization and timestamps are stored in the restricted MatrixGlowGuideLeads collection. This records permission; it does not launch any marketing campaign or enroll people into a separate SMS platform.
- Production backend uses `glow-config-live.js` (mode live). Historical `glow-config.js` is still the test-mode baseline and MUST NOT replace the live configuration.
- Full-body standalone $25.99; face/head $14.99, including as a massage add-on; full-body enhancement during an existing session +$22.99.

## Installation and preservation

- Replaced only the original e8l5a page-local ScoreApp quiz section; backed up original embed and placeholder page code.
- Copied the verified R9 native section from review xv7va into e8l5a using supported Wix section Copy/Paste. Installed as section2; removed the empty old section.
- Required element IDs preserved: htmlGlowQuiz, glowCaptcha, glowStatus, glowVisitInfo, glowHeading, glowIntro and glowBookButton.
- Installed `page-code.js`; readback matched exactly after CRLF normalization.
- Desktop section2: width 980, height 6436, y 134; iframe 980 × 5700. Mobile section2: width 320, height 10100, y 62; iframe 320 × 9000 at x 0, y 355.
- Existing original URL, canonical and indexability preserved. Review xv7va remains noindex. The quiz supports the Wellness/red-light service hierarchy through breadcrumbs and contextual links; shared navigation was not altered.
- Main red-light service bteto received the exact three-price FAQ correction and a contextual link to the quiz. Its hero button8 previously led to MassageBook and now leads to the existing Matrix booking page. All six public Book Now links were verified at the current booking destination.
- Genuine reviews, About, global header/footer and unrelated pages were not edited in this release.

## Objective verification

- Actual owner-authorized delivery test: request 3b63354d-5256-4a02-8bea-a132594c4848. Both client report and owner notification received in the business INBOX; both CMS sends ACCEPTED; SPF/DKIM/DMARC PASS. See DELIVERY-TEST-RECEIPT.md. No repeat customer/test submission was sent during final release QA.
- Native mobile original-page preview: service selector changed to face/head $14.99 with matching booking label; quiz moved from question 1 to the skin-specific question 2. Both screenshots saved.
- Wix displayed “Your site is published and live online”; screenshot saved.
- Permanent public original URL loaded the new R9 iframe and required-contact instructions. Public price selector worked and displayed the $14.99 choice.
- Public original document: correct new title and description, unchanged canonical, no noindex, one native H1, no horizontal overflow.
- Public schema: exactly one FAQPage plus WebPage, BreadcrumbList and Service with all three approved offers. Main-service FAQ schema matches the corrected visible pricing answer.
- Public main service has no old $30/$50/$60 prices and all Book Now destinations point to /book-appointments-salem-wi. Contextual red light quiz link verified.
- Existing test-site delivery verified the shared R9 backend/email system. Native mobile preview was tested; a separate production mobile-device user-agent test was not run.

## Release audit and API correction

Site History showed the last public revision at 7:39 PM, the R9 test candidate at 7:59 PM and subsequent saves matching this task's original-page and service edits. No other editor was opened or unrelated page changed by this task. The existing R9 test candidate remained at 0% exposure before final publication.

Wix rejected the first original-page combined JSON-LD tag because it exceeded its 4096-byte limit. The quiz entry was retried only after splitting FAQ and service graph into two valid tags. The service entry succeeded separately. A later native service text save restored older service SEO, detected in the final prepublish check; the current service FAQ schema was reapplied and the editor reloaded before Publish. Public rendered schema then confirmed the correct final values.

## Evidence files

- `public-quiz-seo.json`, `public-service-qa.json`
- `publication-confirmation.jpg`, `published-quiz-pricing.jpg`
- `original-mobile-pricing.jpg`, `original-mobile-quiz.jpg`
- `delivery-test-result.jpg`, `DELIVERY-TEST-RECEIPT.md`
- `service-faq-before.html`, `service-faq-after.html`
- `seo-before-release.json`, `seo-write-receipt.json`, `seo-final-receipt.json`

No future delivery, inbox placement or search ranking is guaranteed. Runtime success and inbox receipt are confirmed for the approved test described above.
