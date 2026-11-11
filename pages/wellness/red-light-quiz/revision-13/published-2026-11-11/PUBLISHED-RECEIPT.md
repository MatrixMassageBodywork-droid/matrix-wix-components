# Glow Guide R13 — published and delivery verified

Date: 2026-11-11. Status: SAVED / VERIFIED / TESTED / PUBLISHED.

This receipt supersedes the outstanding release gates in the earlier draft, SEO, and email checkpoints. The prior files remain historical evidence.

## Release
- Wix native Publish returned “Your site is published and live online.” Public HTTP responses now report site revision **1103**.
- Quiz: https://www.matrixmassage.net/red-light-therapy-glow-score
- Service: https://www.matrixmassage.net/red-light-therapy-salem-wi
- Existing source pin remains 3a3c41dbf775322b6e520065e77967b92300a78a. This final phase changed no website source or consent policy; it completed the authorized test and publication.
- Latest pre-release evidence: 61fa99aa571070a55f6273aabe33aa620134b69f. Prior public rollback version: 1085. Do not restore a whole-site version without reviewing subsequent changes and separate authorization.

## Actual email delivery — passed
- User completed the prepared consent/CAPTCHA handoff. One test request was saved in MatrixGlowGuideLeads; both delivery states read ACCEPTED. No retry or duplicate send was made.
- Client email actually arrived in the designated Gmail inbox at **20:02:57 UTC / 2:02:57 PM Central**, in Promotions. Owner notification actually arrived in the Matrix business inbox at **20:02:55 UTC**.
- Both delivered bodies match the saved request reference. No unresolved merge variables. Subject: “Your personal Matrix Glow Guide is here.” SPF, DKIM and DMARC passed. Native unsubscribe footer and one-click headers were present.
- Delivered copy includes personalized benefits, exploration without a selected service or schedule, research, practical progress notes, and optional Matrix experiences. On-page report remained available after acceptance.
- Private request/mailbox/message identifiers are recorded only in the canonical project document, not this public repository. Synthetic QA answers are not the owner's medical history.
- Browser access to the personal Gmail link redirected to the business account; actual inbox/body/authentication verification used the connected Gmail records. Personal Gmail visual rendering was not separately inspected.

## Public functional and layout checks — passed
- Seven-question synthetic skin-exploration route completed on the public desktop page and published mobile view, without contact details, booking, payment or CAPTCHA.
- Benefits, next steps, keep-guide navigation, and expanded complete readable report worked. Exploration explicitly offers no selected service or schedule. Optional email and booking remain downstream choices.
- Mobile view was checked with Wix's documented showMobileView=true desktop testing parameter at a 390×844 viewport. Page client/scroll width was 375/375; quiz iframe 320×1080. Main service also measured 375/375 with an expanded FAQ.
- Resizing a desktop-user-agent page alone retained Wix's desktop mode; that was not treated as mobile evidence. Viewport overrides were reset after testing.
- Desktop quiz iframe is 980×1000. The former multi-thousand-pixel blank space is removed; bounded internal scrolling and modest verification spacing remain.
- Main service showed six contextual quiz links, the corrected optional-email FAQ, and all three content images loaded after navigation/lazy loading.
- No second message was sent during public QA. The one actual CAPTCHA/email delivery test ran on production-origin Test Site 1102 immediately before native publication; public 1103 free-result paths were then rechecked.

## Public SEO — verified
- Quiz, service and wellness hub return HTTP 200, self-canonical URLs, expected titles/descriptions and Open Graph/Twitter titles. No noindex detected on these pages.
- Quiz: six FAQ questions, WebPage, Service with the three correct USD offers, LocalBusiness and BreadcrumbList.
- Service: nine FAQ questions, Service with the three correct USD offers, HealthAndBeautyBusiness and BreadcrumbList.
- All structured JSON parsed. FAQ content remains aligned with approved visible source; live service FAQ text and quiz links were read back. Exact HTTP evidence is in public-http.json.
- Offers remain $25.99 full body, $14.99 face/head, and $22.99 full-body enhancement (main appointment separate).
- Two-way internal relationships retained: quiz ↔ red-light service, quiz → wellness hub, wellness hub → red-light service, service → wellness/massage/facials/head spa. Booking links point to the existing Matrix booking page.
- Existing URL, shared header/footer, About, genuine testimonials, Square, safety rules, CMS permissions, and existing email identities were preserved.

## Scope limits
- No off-site backlinks were created or audited. No ranking, Search Console indexing, GA4 conversion, or Core Web Vitals improvement is claimed.
- Real-device touch, mobile CAPTCHA, physical printing/PDF output, and deliberately induced email-provider failures were not tested. Existing failure-state source checks and report-on-page retention remain applicable. A successful delivery is evidence for this test, not a guarantee for every recipient.
- Earlier 2,304 source scenario checks and 1,968 safety outcomes remain the source QA evidence; they were not rerun because source did not change during final release.
- The before-publication unrelated-page comparison was bounded to titles and server-rendered content/links plus documented Site History, not a complete native-component diff.

## Evidence
- publication-confirmation.jpg
- public-desktop-hero.jpg
- public-desktop-benefits.jpg
- public-mobile-hero.jpg
- public-mobile-benefits.jpg
- public-service-faq.jpg
- public-http.json

Canonical project checkpoint: https://docs.google.com/document/d/13zezoIjDm7oKjDRzjPs5sZMzpRqex4r2Njuya0bw0L8
