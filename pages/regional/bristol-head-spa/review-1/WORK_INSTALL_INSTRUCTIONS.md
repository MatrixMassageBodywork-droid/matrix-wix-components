# Bristol Japanese Head Spa — deterministic Wix draft installation gate
Status: DESIGN REVIEW; NOT authorized for publication. Current live page must remain unchanged until owner approves this reviewed body revision.

## Scope and current authoritative state
- Existing page to REPLACE IN PLACE: https://www.matrixmassage.net/japanese-head-spa-near-bristol-wi. Preserve URL; DO NOT create another page.
- Wix Classic site ID: cdec8df6-d518-4859-9f1e-f06bf5346d41; current page's actual Wix page ID/sections/element IDs/code MUST first be read from editor. Do NOT guess them.
- Adjacent published Bristol all-services: https://www.matrixmassage.net/spa-services-near-bristol-wi ; Wix ID q3smg, custom element matrixBristolSpa, renderer pinned d4a0e2a8e09b37df2f4a50e255b70395d230405f. LEAVE IT ENTIRELY UNTOUCHED: it ALREADY links to this specific Bristol page and main Head Spa.
- Main Salem Head Spa: https://www.matrixmassage.net/japanese-head-spa-salem-wi ; leave unchanged. Existing sitewide footer already links to the Bristol page. Preserve footer and main menu.
- Source review bundle: pages/regional/bristol-head-spa/review-1/ on GitHub. Existing editor code is NOT captured in source bundle, so never wholesale replace it.

## Read-only capture required BEFORE any Wix writes
1. Open existing Wix Classic Editor for the above verified site; navigate Pages & Menu to EXISTING page with the exact published slug. Verify URL/page ID, record current unpublished draft state and any unrelated pending edits.
2. Capture all current native sections/element IDs, page code, SEO title/meta description, canonical, robots/indexing, schema entry IDs/types, H1, current links, native footer/reviews. Save read-only screenshot and page-code text as new evidence; compare against public baseline.
3. If there is unknown page code, non-page-local content, active draft/concurrent edit, unknown SEO schema IDs, or more than one nontrivial existing body, STOP before changes and return evidence to Chat for exact patch. This first capture is a STOP GATE, not permission to design or improvise.

## Approved design specification — for AFTER owner approval and completed capture
- Exact in-place replacement body is body.html; full-width scoped style.css; custom-element renderer.js. Custom tag matrix-bristol-headspa; proposed element ID matrixBristolHeadSpa. Never overwrite unrelated page code.
- Install ONLY to the existing page's enumerated page-local body host. Set source to a freshly verified immutable GitHub CDN URL for exactly this renderer at the reviewed commit. Never use mutable main.
- Native Wix Stretch full width, 0 side margins; fit rendered height; preserve header/footer and native genuine reviews. No new footer.
- Full visible-body SEO markup must be merged with captured existing page code; FAQ JSON candidate must REPLACE observed matching FAQ native schema entry (if any) and never create duplicate FAQPage. Do not paste proof noindex meta to live page.
- Preserve existing title, description, self-canonical and indexing absent separately approved metadata patch. Current slug stays unchanged.
- New content contains exactly one H1, 8 distinct FAQs, Matrix Salem address only, landmark routes (Bristol 45 Diner and The Club at Strawberry Creek), named current Head Spa services 45min $95, 60min $135, 90min $195, links to published Bristol all-services and main Salem Head Spa.
- Do NOT touch the published Bristol all-services page, main Salem head spa page, home, global menu, sitewide footer, testimonials, Square, CMS, other code, permissions or redirects. Do not restore Site History; do not create a Test Site without specific authorization.

## Draft save/readback and QA; NO PUBLICATION
1. Apply exact precomputed page-local code merged from captured Velo. Set immutable renderer URL, tag, element ID; reopen settings and read back all fields.
2. Set native stretch full-width/0 margins; measure native section; save checkpoint; reopen. On timeout check persisted editor state before retry.
3. Run desktop 1280/1440/1920, mobile 320/390, FAQ open/close all eight, image load/crop, no horizontal overflow, booking and three internal links, Google Maps origin destinations, and SEO meta/canonical/schema comparison. No booking submissions or live customer actions.
4. Reopen saved Wix draft and verify rendered DOM and exact body code; compare screenshots and get native Preview + Mobile Preview evidence.
5. Return draft preview/screenshots, page ID, native section/element IDs, before/after SEO snapshot, exact code, saved Wix version, QA results, unchanged nav/footer confirmation. PUBLISHED=NO.
6. STOP if an unexpected page/native structure appears or any established sitewide functionality is affected; return evidence to Chat for targeted patch. Publishing requires owner approval of the exact reviewed revision and audit of unrelated pending drafts.
