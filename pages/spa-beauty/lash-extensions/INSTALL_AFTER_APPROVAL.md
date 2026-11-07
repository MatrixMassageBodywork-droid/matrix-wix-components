# Lash Extensions — exact installation plan

Status: design review ready. No Wix changes have been made. Execute only after the owner approves this new design and publication. This page is a visible child of Spa & Beauty; it is not one of the hidden regional landing pages.

## Inputs and protected boundaries

Site: Matrix Massage & Bodywork, cdec8df6-d518-4859-9f1e-f06bf5346d41. Parent: SPA & BEAUTY SERVICES, ualp6. Use review-2, never review-1. Consult SPECIFICATION.md, REVIEW_READY.md and the latest canonical Drive checkpoint before execution. Resolve source files at the immutable GitHub commit recorded in the checkpoint; use that same commit in the renderer URLs below.

Do not modify masterPage, the global theme, shared header/footer, CMS records, Square services, customer records, analytics, other service pages or regional pages. No history restore or broad Undo. Preserve the parent's native reviews and slideshow, existing pricing and three direct style booking links. A child navigation entry is the only approved shared-navigation addition.

## Preflight and first save

1. Open the existing Wix Classic Editor for the verified site. Read Site Pages and Menu, current saved/published revision and pending changes. Capture them in a new installation receipt. If an existing Lash Extensions page or the proposed route is now present, read it and reconcile with this checkpoint before creating anything. Never create a duplicate because state is uncertain.
2. Verify the parent is ualp6 at /spa-and-beauty-services-salem-wi. Capture its current custom-element source/tag and Page Code. Compare to the original state in parent-link-patch/patch-manifest.json. Its current approved source is pinned to d6ba973973555437dc09fa00360f59bd7b4884eb, pages/spa-beauty/main/production-1/renderer.js. If the source or code has changed since capture, retain it and return the exact difference for a targeted merge; do not replace unrelated changes.
3. Site Pages and Menu → Add Page → Blank Page. Name LASH EXTENSIONS. Move it immediately below SPA & BEAUTY SERVICES and use the page menu's Subpage action so it appears in that dropdown. Record the new page ID. Leave existing pages in their current order. Save and read the menu back.

## New page content and SEO

4. Add one blank page-local section below the shared header. Add a Custom Element in that section. Set Velo ID matrixLashExtensions, tag matrix-lash-extensions, and Server URL to the immutable commit's pages/spa-beauty/lash-extensions/review-2/renderer.js on cdn.jsdelivr.net/gh/MatrixMassageBodywork-droid/matrix-wix-components@COMMIT/. Confirm the URL serves 33,188 bytes with SHA-256 418aacb41337ab50b7644f4150d8bc5f5c4a228f64bbec94dcbef3aff64f8e38 before binding it.
5. Stretch the element to full width with zero margins; align its top with the section top. Use initial desktop element/section height 8,500 px and initial mobile height 15,000 px as temporary clearance. Install the exact review-2/WIX_SEO_SNIPPET_CANDIDATE.js into the new blank page's code. Retain any freshly observed platform scaffold; if the page is not blank, stop the overwrite and capture the code. Save. Read back element ID, tag, URL and complete code.
6. Page Settings → SEO Basics: use the exact title and description in page-config.json. Set URL slug eyelash-extensions-salem-wi and verify the complete path is /spa-and-beauty-services-salem-wi/eyelash-extensions-salem-wi. Set self-canonical to that full https://www.matrixmassage.net URL, enable search-engine indexing, and retain normal follow behavior. Do not copy the proof's noindex setting into Wix.
7. Advanced SEO → structured data: add the exact service-schema.json graph and review-2/faq-schema.json under separate clear names. Preserve platform-generated site/business data; do not add another conflicting business address, rating or review. Set social title/description to the SEO values and use the Volume lash photo. Save and read back all settings and both JSON values. If the nested route is not supported by the actual page setting, stop before assigning another path: the links, canonical and graph depend on the approved route.

## Parent discovery link

8. On ualp6, keep matrixSpaMain / matrix-spa-main and section5. Bind its source to the same immutable commit's pages/spa-beauty/lash-extensions/parent-link-patch/renderer.js. Install parent-link-patch/WIX_PAGE_CODE_CANDIDATE.js only after the baseline comparison above passes. This changes exactly one primary lash-card link to EXPLORE LASH EXTENSIONS and the new page URL; the Classic, Hybrid and Volume direct booking shortcuts stay intact. Preserve native SEO, reviews, slideshow and all other content. Save and read both source and code back.

## Native QA, sizing and publication

9. Use Wix Test Site for actual custom-element rendering if Editor Preview is blank. Do not replace a working renderer because Editor Preview does not execute it. Test desktop and native mobile. Scroll the entire page to load every image, open all 12 FAQs, and measure the full visible content. Set the containing section height to ceil(maximum content bottom minus section top)+24 px for that native view. Keep the custom element's own automatic height behavior. Save and reload; verify no clipping, overlapping footer or large unused area with FAQs closed and open. Record actual element and section geometry rather than treating the standalone proof measurements as native Wix measurements.
10. Verify one H1, all five image instances, the compact black-bordered correct logo, cream/teal water sections, all 12 prices and durations, April's name, address and text number. Test all five jump links, each style button, each pricing link, the FAQs, breadcrumb, internal service links and directions. Booking checks stop at service details; no appointment, payment or customer record is created. Inspect 320/390 mobile and desktop widths with no horizontal overflow. Confirm visible HTML and seoMarkup contain the same text and that FAQ/schema answers match.
11. Verify the Spa & Beauty dropdown opens the new page, the parent lash-card button opens it, and the three direct parent booking shortcuts still lead to their original services. Confirm shared header/footer, native reviews and unrelated pages are unchanged.
12. Publish only after owner authorization for this design, passing native QA, and review of pending site-wide changes. If unrelated unapproved pending edits are present, preserve them and do not publish them incidentally. After publication, open the permanent URL and parent page; verify status 200, visible new content, correct self-canonical/title/description, indexing enabled, structured data, all images, navigation and booking destinations. Save the Wix confirmation and public desktop/mobile screenshots.

## Receipt and stop conditions

Save source readbacks, geometry, settings, screenshots and QA to this page's GitHub folder, then add a current checkpoint in the canonical FACIAL WEB SEO PW Drive folder. Distinguish SAVED, VERIFIED, TESTED, PUBLISHED and NOT TESTED. Include page/native element IDs, revision, source commit/hash, live URL and publication time.

Stop only the affected action for wrong site/page, concurrent changes, route conflict, unverified persistence, authentication/access barrier, or failed native/public QA. Preserve the current draft and return exact evidence for correction. Do not redesign, change services, invent a different architecture or claim publication from a saved draft.
