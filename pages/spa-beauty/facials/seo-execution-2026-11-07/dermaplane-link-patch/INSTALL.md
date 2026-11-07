# Three dermaplaning booking links — prepared, not installed
Date: 2026-11-07. Project: FACIAL WEB SEO PW.

## Scope and authorization
Owner authorized facial SEO/booking improvements. Existing Wix page rrxx1 only: /spa-and-beauty-services-salem-wi/facials-salem-wi. Preserve the published design and all existing page behavior. The Custom, New Client, Dream and Luxe Lift cards already have direct links and must not be rebuilt.

## Current authoritative baseline
Published release: pages/spa-beauty/install-review-2-2026-11-06/PUBLISHED_CHECKPOINT.md.
Existing renderer: commit 143a56d2eb86306386085d2cb4a57cc5967f06b8, pages/spa-beauty/facials/review-2/renderer.js.
Existing installed SEO markup: pages/spa-beauty/install-review-2-2026-11-06/facials/WIX_PAGE_CODE.js.
Existing element matrixServicePage; tag matrix-facials-review. Keep the dataset and shared header/footer.
Public DOM was verified Nov 7: three dermaplaning cards still point to the full menu. The actual Square menu exposed all three direct service URLs below.

| Card | Current destination | Prepared destination |
|---|---|---|
| Dermaplane Refresh | https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services | https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services/CGKJNHLBH7D6F7VGTHDLC6D2 |
| Custom Dermaplane Facial | https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services | https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services/WV4GXSEU2NPPQ7DXYX3CSDUA |
| Luxe Dermaplane Facial | https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services | https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services/N5DNZHDNLTMTYU24DMAOQCYH |

## Deterministic execution
1. Open the existing Matrix Wix editor. If responsive, select rrxx1 by the exact existing URL. Read and save current full Page Code, custom-element source URL, element ID/tag and native layout before any mutation.
2. Compare current page code with the published baseline and renderer pin above. If differences exist, stop and return the exact difference. Do not overwrite unseen work. Editor timeouts require state verification; do not repeatedly save or publish.
3. Retrieve this directory's renderer.js from its exact immutable commit, and verify the CDN serves it as JavaScript before binding. Use the same element and same tag. This file changes only three href values.
4. Replace the page-local SEO markup using this directory's WIX_PAGE_CODE.js ONLY if the current page code matches the baseline. This file changes only the same three href values. Preserve any newer handlers through a separately reviewed merge if baseline differs.
5. Save once. Reopen Page Code and element settings, read back exact contents, source pin, tag and ID.
6. Test on Wix Test Site desktop and native mobile: page renders; all three dermaplane cards open the matching Square selection; original four direct facial links still match; no appointment submission; six FAQs work; images render; footer follows content with no overlap; no horizontal overflow; exactly one H1; title, description, canonical and structured data unchanged.
7. Before site-wide Publish, inspect pending drafts and release scope. Do not publish unrelated unapproved work. If safe within owner authorization, publish once, then verify permanent URL and those three buttons without test parameters. Otherwise leave the verified saved draft and report the specific conflicting draft.
8. Save evidence/receipt in the existing project repository and canonical Drive folder. Record SAVED / VERIFIED / TESTED / PUBLISHED or exact blocker. Do not label this prepared patch installed.

## Do not touch
Prices, durations, provider eligibility, Square catalog/queue/gates, SEO title/description/schema/canonical, shared renderer, masterPage, native header/footer, About, testimonials, datasets, other pages. No new page or new element. No Site History restore.

## Validation already completed
Renderer body and SEO markup match after trimming. Exactly three href substitutions in each. Both JavaScript files pass node --check. Browser QA of the changed files, editor installation and publication are NOT TESTED / NOT PERFORMED.
