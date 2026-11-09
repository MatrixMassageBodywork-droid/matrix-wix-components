# Red Light Therapy service redesign — R1 — 2026-11-09

Requested by DaNelle: rebuild the existing old service page to current Matrix design rules, link to/from the quiz, retain effective SEO and correct deficiencies. This request authorizes source and Wix draft work. This is a new service-page design, separate from the published R11 quiz/report. Final visual review precedes publication.

## Identity and protected dependencies
- Existing Wix site cdec8df6-d518-4859-9f1e-f06bf5346d41; editor document a276c9bf-bc17-4680-959b-a24ebe7370f6.
- Existing RED LIGHT THERAPY page bteto; permanent URL https://www.matrixmassage.net/red-light-therapy-salem-wi . No new page or redirect.
- Quiz e8l5a, https://www.matrixmassage.net/red-light-therapy-glow-score . R11 engine/email/consent/CAPTCHA/collection/config unchanged. Only a native contextual return link is in scope if needed.
- Preserve shared header/footer/menu, About, genuine native reviews (Section3SlideShow / comp-mdp0tqe02 with nested slideshow), Square, customer data, analytics, and unrelated drafts.
- Existing page code is a default empty onReady template. Preserve it and append full visible-body seoMarkup in review-1/WIX_PAGE_CODE.js.

## Exact native map and draft execution
1. Open existing RED LIGHT THERAPY through page dropdown. Confirm bteto in preview DOM and existing URL. Baseline is baseline/rendered-body.html and baseline/page-code.js.
2. Reuse blank section4 / comp-mdp0tqbs2, currently 40px at desktop y674. Add one Custom Element, set ID matrixRedLightPage, tag matrix-red-light-service, immutable renderer URL from the verified source commit. Set native Stretch full width and side margins 0. No changes to shared renderers.
3. Paste exact review-1/WIX_PAGE_CODE.js into bteto page code. Save and copy/read back exact bytes. Read back element ID/tag/source and stretch.
4. Preview the full component, verify imagery, every link, all nine expanded FAQs and responsive flow. Measure actual height; set only component and section4 height/position required by that rendered height. Confirm native mobile at 320px. Keep a small end allowance without a large blank gap.
5. Once component rendering is verified, remove only obsolete page-local hero Section1RegularMediaImage1RuleNoFaceImage / comp-mdp0tqbg, old body section2 / comp-mdp0tqbu, and FAQ Section1List / comp-mvmxqb6z. Preserve review Section3SlideShow and shared shell exactly. Record resulting geometry.
6. Save draft. Apply only the complete prepared SEO tags with publish=false after fresh baseline comparison. Preserve title, description, canonical, focus keywords, social tags, BreadcrumbList. Replace existing FAQ schema, update Service description and add the three accurate offers. No duplicated FAQ/Service entries.
7. Verify original quiz has a native contextual link back to main service. Existing embedded breadcrumb and related-service links remain. Append a main-service return link to the native supporting text only if absent; preserve report engine and native placement.
8. Reopen draft, verify exact source/code, one H1, matching visible/crawler content, pricing, nine FAQs, link targets, no overflow, review/footer adjacency. Save screenshots and receipt. No live quiz submissions or bookings.

## Stop conditions
Wrong page/site, changed baseline, unexpected business logic, pending unrelated changes that would be published, source mismatch, missing image, or unverified save: stop that mutation and preserve the draft. No history restore or blind Undo. A timeout is followed by a persisted-state check, never automatic repeat.

## Release gate
This new service-page design requires owner review. Do not publish it under a prior quiz/report approval. Complete the concrete draft/proof and read-back first. Publish only when the owner approves this revision and any sitewide pending draft scope is resolved. Keep SEO draft aligned with body; do not publish the schema separately.

## Acceptance
One H1 and nine functioning FAQs; all three exact prices; main-to-quiz and quiz-to-main links; supported booking menu; existing title/description/canonical/indexing; schema/visible parity; correct logo with black border, water/cream/deep teal, relevant inspected images; preserved real reviews and shell. Native desktop and mobile QA must be reported separately from unperformed viewport or production tests.
