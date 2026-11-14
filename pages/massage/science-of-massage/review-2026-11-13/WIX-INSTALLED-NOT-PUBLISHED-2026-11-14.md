# Science of Massage — Wix installation checkpoint
Date: 2026-11-14 UTC (Wix history displayed Nov 13 America/Chicago)
Status: INSTALLED / SAVED / PARTIALLY TESTED / NOT PUBLISHED.

## Correction to earlier blocker
The owner did not block this task. A direct browser navigation to the JavaScript URL failed, but an independent download succeeded with HTTP 200/application/javascript. The downloaded renderer Git blob hash was 1a125b0016340170e47b3233e440b3fb9a332661, exactly matching the approved GitHub source. The immutable source also rendered successfully inside Wix. The earlier CDN-blocked receipt is superseded by this checkpoint.

## Identity and approved source
Site: cdec8df6-d518-4859-9f1e-f06bf5346d41
Editor document: a276c9bf-bc17-4680-959b-a24ebe7370f6
Static page: plsho / THE SCIENCE OF MASSAGE
Permanent URL: https://www.matrixmassage.net/the-science-of-massage-therapy
Approved design commit: 8758c094eac96719115509a5612a0e0ad46b74ea
Approval package commit: 65133af57a8e464746049148af28fead98522960
Renderer: https://cdn.jsdelivr.net/gh/MatrixMassageBodywork-droid/matrix-wix-components@8758c094eac96719115509a5612a0e0ad46b74ea/pages/massage/science-of-massage/review-2026-11-13/renderer.js
Element ID: matrixSciencePage
Tag: matrix-science-page
Native component: comp-mwfrh8q6

## Saved changes and readback
- Added exactly one page-local custom element inside existing body section comp-mqigy34v (Section1RegularMediaImage1RuleNoFaceImage).
- Full-width stretch and zero margins configured. Reopened source settings confirmed immutable URL and corrected tag; rendered custom tag survived full editor reload.
- Original page code contained only Wix default comments and an empty onReady. Preserved those comments and onReady and inserted the exact candidate seoMarkup assignment.
- After full editor reload and page reselection, clipboard readback of complete page code matched mergedScienceCode exactly after CRLF normalization (13,919 characters copied). No imports or functional handlers were replaced.
- Removed original hero image10, text46, button8, and obsolete sections section4, section5, section6, section7 only after replacement rendered in Preview.
- Retained genuine reviews section comp-mqigy3af2 (Section3SlideShow), nested comp-mqigy3ao, global header/footer/navigation and all other pages.
- A first temporary custom-element insertion landed in Header; immediately removed/undone before correct insertion. Verified zero remaining custom elements in header and its original 132px desktop height. No global change intended or retained.
- Desktop body and parent measured 6412px; element positioned at parent top, directly below 132px header. Reviews immediately follow, 552px native section height.
- Mobile body and parent measured 11244px at 320px width, positioned at parent top below 62px header. Reviews immediately follow, 602px native section height.
- Both desktop and mobile geometry persisted after full reload.

## QA evidence
- Renderer has one actual H1; superseded native H1 removed.
- Both images loaded with natural widths 2048 and 1536. Approved assets retained.
- Desktop custom body width 1522px and scrollWidth 1522px: no horizontal overflow.
- Mobile body width and scrollWidth both 320px: no horizontal overflow.
- All six FAQ entries opened in native Preview; entries 2–6 also individually verified closing. Final re-render showed all six closed. First FAQ closing was not independently verified before rerender.
- All six visible questions and answers matched faq-schema.CANDIDATE.json word-for-word.
- All 19 anchor hrefs extracted and matched the approved destinations. Destination navigation and in-page scroll acceptance tests remain incomplete.
- Native reviews and footer present.
- Desktop/mobile hero screenshots saved in WIX-DRAFT-EVIDENCE-2026-11-14.html. These are editor Preview evidence, not live publication evidence.
- Full-page visual review at 1280/1440/1920 and mobile 390 remains NOT TESTED. Current native preview checks do not replace these.

## SEO checkpoint
A supported page-scoped API GET/PATCH/GET saved exactly one FAQPage to draft with publish:false. All six original tag objects remained byte-for-byte equal in readback; existing Business and Service schema metadata identities WdT45PpE and iLHDoFD_ retained. No existing FAQ was present before addition. Total three script schema entries after.
Title unchanged: Science of Massage Therapy in Salem WI | Matrix Massage
Description unchanged: Explore the science and benefits of Swedish, deep tissue and lymphatic massage at Matrix Massage in Salem, WI, serving Paddock Lake and Kenosha County.
Resolved canonical unchanged: https://www.matrixmassage.net/the-science-of-massage-therapy
No noindex tag added. Indexing UI toggle final readback remains NOT TESTED.
API update happened after saving native layout; full editor reload followed, so any later release must use the reloaded editor.

## Publication gate — unresolved
Latest saved revision observed in Site History: 1173, Nov 13 2026 8:28 PM.
Latest published revision: 1166, Nov 13 2026 2:01 PM.
A saved revision 1167 at Nov 13 7:48 PM existed before the current installation mutations. Its timestamp coincided with the earlier editor session, but its full difference from 1166 was NOT established. Do not assert that it contains unrelated changes; do not assert that it contains none.
The approved package prohibits publishing when unidentified earlier saved changes could be included. This gate remains unresolved. No Publish action was taken. No Site History restore was performed. No booking/customer submission occurred.

## Exact continuation
1. Reuse the existing editor and this saved installation. Do NOT reinstall or recreate the element.
2. Establish the scope of saved revision 1167 versus published 1166; the current run's later saved revisions contain the page installation described above. Do not restore or overwrite other work. If scope cannot be established, return that evidence before publication.
3. Complete remaining predetermined full-page width/anchor/indexing tests above and source/tag/stretch UI readback as needed. Preserve existing source/copy/assets.
4. Confirm FAQ schema still exists once and original tags remain unchanged after any editor saves.
5. Only after all original package gates pass, publish once under existing owner approval; then inspect permanent public URL and capture release confirmation/revision.
6. Record a new final release receipt. This checkpoint is NOT a publication receipt.
