# Union Grove + Pleasant Prairie — verified Wix draft checkpoint
Date: 2026-11-06
Project: FACIAL WEB SEO PW
Status: SAVED / VERIFIED / TESTED IN WIX PREVIEW / NOT PUBLISHED

## Current installation
| Page | Existing Wix page | Section | Custom element | Component IDs |
| --- | --- | --- | --- | --- |
| Union Grove | lidzc | section3 | matrixUnionGrove; tag matrix-union-grove-page | section comp-mw5ga05j; element comp-mw5gac32 |
| Pleasant Prairie | cnpma | section5 | matrixPleasantPrairie; tag matrix-pleasant-prairie-page | section comp-mw5fq1yc; element comp-mw5frear |

Existing URLs remain /massage-near-union-grove-wi and /massage-near-pleasant-prairie-wi.
Both static custom elements use native full-width stretch, zero margins and the source commit 36c352fd322c7347beec2c1845a1313dbfba45fc. Source paths: pages/regional/{union-grove,pleasant-prairie}/review-1/renderer.js. Do not overwrite these immutable renderers. Native element Y = 134 on desktop, matching the shared header boundary.
Desktop section heights saved: Union Grove 5085 px; Pleasant Prairie 4858 px. Wix runtime expands page/section height with the component when FAQ content grows. Native mobile is 320 px wide. Union Grove closed body height observed 8113 px, and open FAQ body 9785 px; Pleasant Prairie all-open mobile body 8641 px.

Both complete page-code files were read back after switching away and reopening their pages and matched WIX_PAGE_CODE.candidate.js exactly. Verified copies are in qa/. They set full body seoMarkup; native Wix SEO remains the metadata owner. The retained R1.1 comment at the start of Union Grove code is a historical baseline; the current appended binding supersedes the comment-only architecture.

## Completed content and presentation
Each page now has seven coherent sections: framed approved logo and photo hero; teal water introduction; massage choices; first-visit guidance; Salem studio photo/location/directions; FAQs; teal water booking close. Union Grove has eight FAQs; Pleasant Prairie has six. Both explain that appointments take place at the Salem studio. Existing Matrix treatment photographs are distinct between the two hero sections. Current service choices were verified against the Square booking menu.

Removed only superseded page-local sections from the audited installation instructions. Shared header/footer, footer map, global code, other pages, CMS and Square were preserved. No native reviews were present in the replaced page-local sections.

## Objective verification
- Native Wix Preview: desktop body width 1348 px and mobile body width 320 px, with scrollWidth equal to clientWidth on both pages.
- Exactly one H1 in each rendered body. Eight Union Grove and six Pleasant Prairie details controls opened and closed in both desktop and mobile previews.
- All FAQ answers visible in rendered DOM. Section bottom and shared footer top were equal during expanded-FAQ checks, with no clipping/overlap.
- All five body images per page were observed loaded after visiting their sections; lazy images load as their sections enter view.
- Approved logo with black border; cream/teal color scheme; water texture visually inspected. Hero screenshots include the native shared navigation.
- Square destination opened successfully and displayed Matrix Massage & Bodywork, Salem WI, its current services and no selected appointment.
- Deep tissue, Swedish, lymphatic drainage and Spa & Beauty destination pages resolved at their existing URLs. Directions href retains the approved Google Maps place CID 13922054554836148682.
- All original Union Grove native SEO tags were identical after installation, including its title, description and Service structured data.
- Pleasant Prairie retains its title and canonical; only its description and existing FAQ schema MZxs0U9B were updated with publish:false. Fresh API readback matched the expected complete tag array after editor work. FAQ schema matches visible questions and answers.
- Both canonicals remain the original page URLs. No indexing setting, slug or menu change was made.

## Evidence and source
GitHub review branch: review/regional-pages-2026-11-06.
https://github.com/MatrixMassageBodywork-droid/matrix-wix-components/tree/review/regional-pages-2026-11-06/pages/regional
qa/ contains native desktop/mobile proof images, page-code readbacks, and SEO_FINAL_VERIFIED.json. Review-1 contains complete body HTML, CSS, renderer, manifest, full-page standalone preview HTML, and FAQ data.

Initial native tag edits did not persist until the tag field was committed through native input and blurred. The final rendered DOM verified MATRIX-UNION-GROVE-PAGE and MATRIX-PLEASANT-PRAIRIE-PAGE. Two unintended clipboard-created draft text elements were explicitly removed; neither remains. No blind Undo or site-history restore was used.

## Remaining release step
Await explicit approval to publish both reviewed regional designs. No Publish button, Test Site creation, traffic release or GitHub main-branch merge was performed. Once authorized, check current saved state and the scope of any site-wide pending draft changes before publishing; Wix Publish can include other saved pages. Do not reinstall or rebuild these completed drafts. Post-publication verification must check both original live URLs, desktop/mobile rendering, SEO head/seoMarkup and Square links.

NOT TESTED: 390 px viewport, physical devices, published rendering of these new drafts, and search ranking changes. No ranking guarantee is made.
