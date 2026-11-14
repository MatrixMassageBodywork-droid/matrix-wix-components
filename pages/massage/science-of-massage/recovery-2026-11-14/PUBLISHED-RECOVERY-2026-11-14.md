# Science of Massage — interactive explorer restored and published
Date: November 14, 2026
Status: **SAVED / VERIFIED / TESTED / PUBLISHED-RELEASED**
Live revision: **1182**. Test revision: 1181 at 0% exposure. Previous live revision: 1177.

This current receipt supersedes the earlier REGRESSION-RECOVERY-2026-11-14.md status that said the original was recovered but not installed.

Live page: https://www.matrixmassage.net/the-science-of-massage-therapy
Direct explorer: https://www.matrixmassage.net/the-science-of-massage-therapy#ms-explorer

## Result
Restored the original seven-system interactive explorer directly after the hero/strap and before the static introduction. The hero button now reads “Explore the interactive body map ↓” and points to #ms-explorer. All existing static sections, six FAQs, genuine native reviews, shared header/footer, page URL and SEO remain intact.

The original clinical text, service links and research links were retained. The interactive code runs inside an isolated shadow root in the existing matrix-science-page custom element. The only accessibility changes are keyboard focus styling and removing aria-hidden from the body-map controls. No external executable dependency, cookie, storage or authentication logic was added.

## Installed source
Site: cdec8df6-d518-4859-9f1e-f06bf5346d41
Page: plsho
Editor document: a276c9bf-bc17-4680-959b-a24ebe7370f6
Custom element: matrixSciencePage / matrix-science-page / comp-mwfrh8q6

Installed immutable renderer:
https://cdn.jsdelivr.net/gh/MatrixMassageBodywork-droid/matrix-wix-components@0037aa27f69f8c7df22b0325558b12e30a94a968/pages/massage/science-of-massage/recovery-2026-11-14/renderer.js

Renderer release commit: 0037aa27f69f8c7df22b0325558b12e30a94a968
Release branch: release/science-interactive-recovery-2026-11-14
Renderer main commit: 75758967bf1de5869a249bda6d22246db808b037
Renderer blob (identical on both branches): 7fe70d5f0bf3b9d300eac77cb238e73f1ae562ac
Renderer SHA256: bd9201841659a99173b5ceb201816300e1be722ca6cff25216452a386ee536b4
Page code commit: 29b1405fc26d9c836f22643b70d4c70efe0b3e0a
Deployment pin record: DEPLOYMENT-PIN.json
Original interactive source commit: 138535ed2ef1ec0800ac75100da83c178a45a71b

The main-branch CDN package exceeded jsDelivr's 50MB package limit. The identical renderer was therefore saved on a small release branch based on the previous deployed design checkpoint. HTTP 200, JavaScript content type, exact bytes and immutable source were verified before installation. No unrelated files from that branch were installed.

## Verification
- Renderer and page-code syntax checks passed.
- Original body content is unchanged except the explorer insertion and hero anchor.
- Native page code outside seoMarkup is unchanged; saved code read back exactly after line-ending normalization, including after editor reload.
- Native source URL, custom tag, stretch and IDs persisted.
- All seven desktop controls and all seven body-map hotspots produced the expected original panels; keyboard Enter activation passed.
- All seven controls passed in Wix's native 320px mobile preview; scroll width equaled viewport width in every state.
- All six mobile FAQs opened and closed correctly.
- Desktop test screenshots at 1280, 1440 and 1920 showed no horizontal overflow or content clipping.
- Native reviews remain directly adjacent to the custom element; measured gap was zero (floating-point difference below 0.001px in one state).
- Test revision 1181 was deployed with 0% exposure.
- Of 41 baseline/test page-map entries, 38 filenames were unchanged. HOME and masterPage had new generated filenames but their features/platform models were semantically identical; actual page content changes were confined to Science.
- Native Publish was clicked once. Wix displayed “Your site is published and live online.” A wait helper timed out despite the confirmation being visible; publication was verified before any retry, and Publish was not repeated.
- Independent public HTTP retrieval returned revision 1182. The public/test page maps differ only for Science (plsho); non-Science entries are identical.
- Public browser loaded the exact immutable renderer URL. All seven selections passed again on the live page; a live nervous-system hotspot passed. Final state reset to Muscles + Fascia.
- Live page has one H1, six FAQs, and FAQPage / HealthAndBeautyBusiness / Service schemas.
- All six visible FAQ questions and answers match FAQPage structured data.
- Existing title, meta description and canonical are preserved; no noindex was found.
- Live hero/logo images loaded; native header, footer and genuine reviews are present.
- Existing restored service destinations returned HTTP 200; the legacy all-services URL redirects to the massage hub.

## Preserved SEO
Title: Science of Massage Therapy in Salem WI | Matrix Massage
Description: Explore the science and benefits of Swedish, deep tissue and lymphatic massage at Matrix Massage in Salem, WI, serving Paddock Lake and Kenosha County.
Canonical: https://www.matrixmassage.net/the-science-of-massage-therapy
Existing Business and Service schema identities retained. No SEO API write was needed.

## Evidence and limits
See PUBLISHED-EVIDENCE.html for actual live, mobile-preview and publication screenshots, LIVE-QA.json for structured public checks, PREVIEW-QA.json for native interaction checks and SCOPE-COMPARISON.json for scope evidence.

Mobile QA used Wix native 320px preview; no physical phone or independent 390px mobile session was tested. Research links and clinical content were preserved; this restoration did not re-review all clinical claims or source destinations. No claim is made about Google indexing or rankings.

No booking, customer submission, customer data or unrelated page was changed. No whole-site history restoration was performed.

## Current checkpoint
Use this receipt and DEPLOYMENT-PIN.json as the current publication checkpoint. Earlier regression notes and execution drafts remain history. Do not repeat installation or publication merely because those older notes say incomplete.
