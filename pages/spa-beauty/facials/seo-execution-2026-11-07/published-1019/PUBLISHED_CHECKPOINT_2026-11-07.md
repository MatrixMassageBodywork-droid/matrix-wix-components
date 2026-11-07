# Facial link corrections — PUBLISHED / VERIFIED
Project: FACIAL WEB SEO PW
Date: 2026-11-07

## Result
The retry opened the existing authenticated Wix Classic Editor. Installed, saved and published the exact prepared link corrections on the existing main facial page and six existing skin-goal pages. Wix Release Manager confirms Live Site version **1019**, exposure **100%**, with no remaining Test Site. Previous live release: 1007.

Live main facial page:
https://www.matrixmassage.net/spa-and-beauty-services-salem-wi/facials-salem-wi

## Changes installed
- rrxx1 / matrixServicePage / matrix-facials-review: four contextual anchors (acne-prone or congestion-prone skin, hydration, sensitivity, uneven-looking texture) and three service-specific dermaplane booking destinations. Existing four direct facial destinations retained.
- public/matrix-pathway-markup.js and public/custom-elements/matrix-pathway-page.js: 12 service cards across six skin-goal pages now have internal service-title links and matching direct Square booking buttons labeled “Book [service] in Salem.”
- Existing pathway page code, dataset, release gate, layout, copy, prices, durations, imagery, metadata, schema, URLs, About and testimonials were not changed.

Main component source:
https://cdn.jsdelivr.net/gh/MatrixMassageBodywork-droid/matrix-wix-components@fa42fb3fa878d9982ee6136177f0f31b526bb867/pages/spa-beauty/facials/seo-execution-2026-11-07/facial-context-link-patch/renderer.js

## Native save verification
Fresh native baselines were captured before replacement. Main page code matched the archived baseline except a trailing blank line; both pathway files matched exactly. All three installed source readbacks match their prepared candidates.
- Main Page Code SHA-256: 0e003e803cf14b19720eac5601bc362f78a7a98645067d99319e01e8d9c69a1c
- Pathway markup SHA-256: 6c5bf23fcb0f039484da9bdaef7db8334ddb511bc96ce74950ac6a30b8d49f7a
- Pathway renderer SHA-256: b57a94c482e69f90fe3934632d4482286aa80ea20fed9a82c254239a775b6bd6
- PATHWAY_INDEXING_RELEASED remains true. Pathway Page Code was read only.

Wix initially reverted the visual component's URL despite displaying an edited input value. This was detected on the Test Site. A real keystroke change followed by blur committed the controlled field; the component then rendered the new anchors. The final Test Site and live page both independently verify the corrected renderer. No reverted version was published.

## Runtime verification
- Seven permanent URLs opened and rendered successfully after publication; each has one visible H1 and no desktop horizontal overflow at 1363px.
- All 12 pathway service-title and booking pairs verified on the Test Site and live pages: Hydrate 2, Brighten 4, Clear 1, Calm 1, Age-Defying 3, Maintain 1.
- Four contextual anchors and three corrected dermaplane destinations verified on the main Test Site and permanent page.
- Six distinct Square service URLs independently opened and displayed the correct service: Custom, Dream, Luxe Lift, Dermaplane Refresh, Custom Dermaplane, Luxe Dermaplane. No appointment was submitted.
- Main native Wix mobile Preview at 320px: content width/scroll width both 320px, one H1, six FAQs, corrected links present; FAQ expansion verified. Desktop FAQ interaction also passed.
- Pathway desktop FAQ expansion passed. Native Wix mobile Preview for the dynamic pathway remained blank, while all six Test Site and live pages rendered. Pathway mobile runtime and physical-device testing are NOT VERIFIED in this run. Their CSS and lifecycle are unchanged from the baseline; source checks passed.
- All six live pathways report follow,index and self-canonical URLs. Main canonical preserved, with no page noindex observed.
- A prepublication anonymous HTTP comparison of 33 static sitemap pages found no differences in parsed page text, links, images or selected renderer references. SEO fields matched except the homepage og:url trailing slash. This check does not fully compare dynamic runtime content; those seven pages were separately tested in browser.
- Final test candidate 1019 was promoted through Release Manager → Publish this version, preserving the reviewed snapshot instead of broadly publishing later editor state.

## Earlier completed work retained
The previous API checkpoint remains authoritative for the five published pore-article contextual links, the three corrected MatrixServices records, GBP booking link and service-description work, four named facial services pending Google review at that checkpoint, and four accepted Search Console indexing requests. These actions were not repeated.

## Search diagnosis and limits
Main facial page was already indexed; its recorded crawl predated the redesign. Antioch and Paddock Lake supporting pages were discovered but not indexed at inspection. GBP discovery was predominantly massage-related. The changes correct known linking/booking issues; they do not prove a new Google rank, recrawl, approval or traffic gain. Those outcomes have not been remeasured.

## Separate outstanding Bristol installation
Existing Bristol Head Spa siiqt redesign remains uninstalled. Its prepared package is separate; no Bristol content or code was altered by this release.

## Evidence and continuation
This directory contains exact native before/saved source, test/live href tables, mobile check, Square destination verification, 33-page comparison, manifest hashes and screenshots. The immutable source package remains in ../facial-context-link-patch and ../facial-pathway-link-patch.
Continue from release 1019. Do not reinstall these completed facial corrections or repeat the earlier API/GBP/indexing mutations.
