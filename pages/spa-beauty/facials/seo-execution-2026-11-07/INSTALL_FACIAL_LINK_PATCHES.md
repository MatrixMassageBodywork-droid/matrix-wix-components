# Exact remaining Wix installation — facial links
Project: FACIAL WEB SEO PW. Date: 2026-11-07.
Status: PREPARED / SOURCE TESTED / NOT INSTALLED / NOT PUBLISHED.

## Already completed; do not repeat
The pore-care article's five contextual links are published and verified. Three MatrixServices records have correct direct booking URLs saved and read back. The six live pathway payloads receive those values, but the current markup ignores them. Do not repeat the API writes, GBP changes or indexing submissions.

## Authoritative references
- Main facial publication: pages/spa-beauty/install-review-2-2026-11-06/PUBLISHED_CHECKPOINT.md.
- Main baseline renderer: commit 143a56d2eb86306386085d2cb4a57cc5967f06b8, pages/spa-beauty/facials/review-2/renderer.js.
- Main baseline Page Code: pages/spa-beauty/install-review-2-2026-11-06/facials/WIX_PAGE_CODE.js.
- Published pathways: revision 800 checkpoint https://drive.google.com/file/d/1edW6A0x9Hk6Qz0ZZZFIYJLyvv5vnNCF-/view.
- Shared pathway files: verified saved readbacks from logo delta 798, unchanged by the final revision-800 Page Code fix. The old delta's noindex/release instructions are superseded. Keep current PATHWAY_INDEXING_RELEASED=true and awaited dataset/server rendering.
- Each candidate directory contains exact archived baseline .before files and SHA-256 values. Fresh native readback is required before replacing any code.

## Scope
A. Existing main facial rrxx1: 3 dermaplane direct booking hrefs plus 4 contextual links; renderer and matching SEO markup.
B. Existing pathway item page cib8y: shared markup and renderer, 12 cards across 6 pages. Service titles become internal links; booking buttons use the matching verified Square service.
C. Bristol Head Spa siiqt remains a separate approved install requiring its own fresh native section/code capture. Do not mix an unknown Bristol draft into this release.

## Navigation and stop conditions
Open https://editor.wix.com/html/editor/web/renderer/edit/a276c9bf-bc17-4680-959b-a24ebe7370f6?metaSiteId=cdec8df6-d518-4859-9f1e-f06bf5346d41.
The Nov 7 logout/login succeeded, but both new-editor and already-bound-tab navigation failed with browser protocol timeouts. If that persists, stop without repeated writes or publishing; report the exact error. Do not request login again when the dashboard is already authenticated.
If responsive, open Pages & Menu, select the existing page by URL, then Page Code and the existing custom element's settings. Enable Dev Mode only if needed to access existing code; do not create a site or connect a replacement repository.
Before mutation, capture full current files, element IDs/tags/source bindings, page IDs/URLs, native layout and pending release scope. If native source differs from the matching .before file, stop that component and return the exact diff for a targeted merge. Never overwrite unseen work.

## A. Main facial installation
1. Select rrxx1, /spa-and-beauty-services-salem-wi/facials-salem-wi.
2. Verify existing element ID matrixServicePage, tag matrix-facials-review. Preserve dimensions, layout, dataset, native shell and all other components.
3. Compare current full Page Code and currently pinned renderer with facial-context-link-patch/*.before. Verify candidate source hashes in source-qa.json.
4. Resolve the immutable commit containing facial-context-link-patch/renderer.js. Its CDN URL is https://cdn.jsdelivr.net/gh/MatrixMassageBodywork-droid/matrix-wix-components@COMMIT_SHA/pages/spa-beauty/facials/seo-execution-2026-11-07/facial-context-link-patch/renderer.js. Substitute that exact commit SHA; do not use main/latest. Fetch it and compare its content hash before binding.
5. Change only the existing custom-element source to that immutable renderer. Save once. Reopen source settings and verify the exact pin, ID and tag.
6. Replace rrxx1 Page Code with facial-context-link-patch/WIX_PAGE_CODE.js after the baseline match. Save once; reopen and compare complete source.
7. Confirm the 4 new phrases point to appropriate skin-goal pages: acne-prone or congestion-prone skin → clear-balance; hydration → hydrate-restore; sensitivity → calm-support; uneven-looking texture → brighten-smooth. Original visible wording is unchanged.
8. Confirm the 3 dermaplane cards match service IDs in the direct-booking table below.

## B. Pathway installation
1. Open Velo Public files. Compare public/matrix-pathway-markup.js and public/custom-elements/matrix-pathway-page.js with facial-pathway-link-patch/*.before. Read the item-page code and verify current release flag true, dataset matrixPathwayDataset, element matrixPathwayPage and tag matrix-pathway-page. Do not replace that Page Code.
2. Replace public/matrix-pathway-markup.js with the candidate of the same name. Save once; reopen and compare exact source/hash.
3. Replace public/custom-elements/matrix-pathway-page.js with the matching candidate. Save once; reopen and compare exact source/hash. Both must match as a pair before any test release or publish.
4. Preserve public/matrix-pathway-content, dynamic page code, datasets, attributes, render timing, lifecycle, CSS, logos and native SEO.
5. Expected title links: existing valid service learnMoreUrl; otherwise Luxe Lift's existing detail page; otherwise the main facial page #facial-menu.
6. Expected booking destination: matching CMS service-specific URL where supplied; otherwise the verified title-to-service map. General hero/closing booking actions remain the full service menu.
7. Visible card labels become “Book [service title] in Salem.” No prices, durations, descriptions or service eligibility change.

## Direct-booking table
Base: https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services/
| Service | ID appended to base |
|---|---|
| Custom Facial | IUTRINR4YWTL7ULZ3QVEK4QG |
| Circadia Dream Facial | 5TMAAL7UNW75SMC6XG7R53QA |
| Circadia Luxe Lift Facial | WBRKBJ3WLEKZEMRTZ52M26Q6 |
| Dermaplane Refresh | CGKJNHLBH7D6F7VGTHDLC6D2 |
| Custom Dermaplane Facial | WV4GXSEU2NPPQ7DXYX3CSDUA |
| Luxe Dermaplane Facial | N5DNZHDNLTMTYU24DMAOQCYH |

## Test Site and live QA
Use the current saved candidate through Site → Deploy Test Site at 0% exposure. Do not discard unrelated drafts, restore Site History, or release an older candidate.
- Main: full desktop and 390px mobile render; 1 H1; unchanged metadata/canonical/schema; 4 new contextual links; 3 matching dermaplane links; existing 4 direct facial links retained; all 6 FAQs; images; no overlap or horizontal overflow; native footer follows content.
- Pathways: /facial-goals/hydrate-restore (2 cards), brighten-smooth (4), clear-balance (1), calm-support (1), age-defying-firm (3), maintain-glow (1). Verify all 12 rendered service title links and matching direct booking buttons on desktop and mobile.
- Open each distinct Square destination and verify the selected service; never submit an appointment. Internal links retain Test Site preview context; external Square URLs do not carry rc/test parameters.
- Check rendered DOM and server SEO markup. Payload values alone are insufficient proof; the prior live QA explicitly found correct payloads with incorrect generic rendered buttons.
- Preserve all existing copy, images, FAQs, review text, prices and duration labels. Current source tests prove copy/CSS/lifecycle unchanged; browser QA still required.
- Before Publish inspect all pending drafts. Publish only if the current candidate contains authorized reviewed changes and QA passed. If unrelated unapproved drafts are included, retain saved work and identify the exact conflict.
- Publish once; record revision/time, then re-open permanent URLs without rc and verify all links, metadata and noindex status. If a save/publish times out, read current persisted/release state before retrying.

## Do not touch
No new pages/elements, URL changes, SEO-title/description/schema changes, native indexing changes, shared header/footer/masterPage, About, testimonials, Square catalog/prices/durations/provider eligibility, worker gates, customer data, ads, email or texts. No new Headless site or CMS architecture change.

## Required receipt
Return exact saved readbacks and hashes, source bindings, current release revision, all tested URLs/viewport sizes, resulting href tables, desktop/mobile screenshots and SAVED / VERIFIED / TESTED / PUBLISHED or precise blocker. Separate source tests from runtime tests. Save evidence to the existing project repository and canonical project Drive folder.

