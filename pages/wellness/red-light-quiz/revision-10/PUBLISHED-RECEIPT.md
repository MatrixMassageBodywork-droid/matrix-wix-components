# R10 section order — PUBLISHED AND VERIFIED

Date: 2026-11-08 America/Chicago / 2026-11-09 UTC.
Live original page: https://www.matrixmassage.net/red-light-therapy-glow-score
Wix page e8l5a, section2. Supersedes R9 layout only; R9 report delivery remains authoritative.

## Correction

The screenshot showed native heading/intro/booking before the water/logo embed, then a second hero heading. The corrected order is water/breadcrumb/approved logo → one visible native H1 and intro → booking → pricing → quiz and educational content.

Added one script-free branding component html7 (title Matrix Glow Score branding). Extracted the duplicated hero from htmlGlowQuiz, retaining its ID and every script byte. Cropped only excess logo whitespace into a 2:1 black-framed panel; source artwork unchanged. A flow-root CSS declaration prevents the first card's margin from creating an unnecessary internal scrollbar.

Native page-code.js, all backend modules, production live configuration, email templates, CAPTCHA/consent behavior, Square, shared header/footer, other pages and SEO were untouched. No new reports, customer writes, marketing messages or test email sends occurred. Review page xv7va is unchanged.

## Saved geometry

| Element | Desktop y / height | Mobile y / height |
| --- | --- | --- |
| section2 | 134 / 6006 | 62 / 9387 |
| html7 | 134 / 360 | 62 / 330 |
| glowHeading | 512 / 59 | 412 / 67 |
| glowIntro | 582 / 48 | 489 / 134 |
| glowBookButton | 648 / 48 | 633 / 42 |
| htmlGlowQuiz | 727 / 4910 | 685 / 8070 |
| glowCaptcha | 5660 / 60 | 8780 / 60 |
| glowStatus | 5740 / 19 | 8855 / 57 |
| glowVisitInfo | 5820 / 269 | 8940 / 462 |

Branding and quiz widths are 980 desktop / 320 mobile. Existing page content width preserved. Public native positioning includes normal fractional text adjustments.

## Verification

SAVED: Wix showed Your changes are saved. Both HTML editors were copied back and matched exact local source after newline normalization.
TESTED: Native desktop and mobile previews show the correct order without overlap. Branding viewport and scroll dimensions match at 980x360 desktop and 320x330 mobile. Native mobile face/head selector changes to $14.99; quiz advances from skin goal to the skin-specific next question. Final flow-root spacing fix yields desktop interactive viewport=scrollHeight=4910 and width=scrollWidth=980.
PUBLISHED: Native Wix confirmation said Your site is published and live online. Permanent original URL was reloaded and verified. Screenshot published-order.jpg shows the result.
VERIFIED LIVE: One native H1; no duplicate embedded hero/H1; first interactive section pricing; prices $25.99 / $14.99 / +$22.99. First/last/email/phone and both unchecked consent inputs remain required. Original title, description, canonical and complete schema compare equal to R9. No noindex and no horizontal document overflow.
NOT TESTED: Separate production mobile-user-agent test and new email delivery; no such retest was needed for this layout-only correction. R9's successful authorized delivery proof remains unchanged.

Baseline was the prior publication-confirmation modal, with the same original page selected. Only the enumerated R10 edits were made before this publication; no unrelated pending edits were introduced.

## Evidence

hero.html; embed.html; source-and-seo-qa.json; public-qa.json; mobile-layout-qa.json; mobile-order-preview.jpg; desktop-order-preview.jpg; publication-confirmation.jpg; published-order.jpg.

The optional Wix panel renderer rejected the actual custom-domain published URL; native publication and public verification succeeded independently. The browser completion_summary call was attempted once but rejected by its tool schema requiring code.
