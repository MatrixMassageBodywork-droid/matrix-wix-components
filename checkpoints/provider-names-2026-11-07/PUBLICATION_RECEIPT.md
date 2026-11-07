# Provider-name cleanup — publication receipt

Date: 2026-11-07
Project: FACIAL WEB SEO PW
Status: SAVED / VERIFIED / TESTED / PUBLISHED

## Owner scope and protected content

Remove provider names from website content and future authoring, with explicit exceptions for the About page and testimonials. About and every checked testimonial remain unchanged. The standing rule is saved in docs/WEBSITE_PROVIDER_NAME_STANDARD_2026-11-07.md and the canonical Drive project folder.

## Published changes

- Lash Extensions xkw6l: provider-neutral visible copy, FAQ, complete page-code SEO markup, native service/FAQ schema, search and social descriptions. Existing nested URL, title, canonical, indexing, images, layout, 12 service prices and booking destinations preserved.
- Active facial offer: MatrixLandingPages record 630a7357-8a30-4f7e-835c-1b13ee60c370. Five fields updated: ogDescription, structuredData, pageConfig, seoMarkup, seoDescription. All other fields preserved; $79 introductory facial and $85 follow-up preserved.
- Legacy facial page m8kla: page-code name references removed. Existing native renderer was already blank; no redesign or renderer reinstall attempted.
- Seven existing blog posts: exact provider-named legacy booking references replaced with https://www.matrixmassage.net/book-appointments-salem-wi. Titles, slugs and all other content preserved. Exact rollback changes and API readback included.
- Now Hiring: one provider-named legacy booking URL replaced in the native FAQ schema. Job Posting schema unchanged.

## Deployment identity

Site: cdec8df6-d518-4859-9f1e-f06bf5346d41
Document: a276c9bf-bc17-4680-959b-a24ebe7370f6
Baseline before edits: latest Site History entry was published revision 1001, Nov 6 2026 8:17 PM local, with no newer unrelated pending draft.
Lash element: matrixLashExtensions; nativeID comp-mw5qnw5n; tag matrix-lash-extensions.
Renderer: https://cdn.jsdelivr.net/gh/MatrixMassageBodywork-droid/matrix-wix-components@80ba9e39aefe7cfe1bf480b508a9a351bc6e42e1/pages/spa-beauty/lash-extensions/production-2/renderer.js
Renderer SHA-256: 37439897a2a3cf6e476beebe4e08a0bb0308f7ad709b5272cf1a19d4ccadf02b

## Verification

- Native Wix publication confirmation observed. A second publish corrected the search description after the first public audit found its old provider name.
- Final lash public DOM: no provider names in body, FAQ, search/social description or schema; one H1; 12 FAQs.
- Desktop native Preview at 1522 px and mobile Preview at 320 px: no horizontal overflow; one H1; 12 FAQs; no provider names.
- Public page: five images loaded; all 12 original price links preserved; no horizontal overflow.
- Public audit: 74 sitemap page URLs checked; remaining provider references are only on About or unchanged testimonials. Final lash description refreshed after second publication.
- Legacy facial URL, outside the sitemap: fresh public HTTP read verified zero Lexy occurrences.
- All 11 name-bearing testimonial occurrences compared to baseline and unchanged.
- About original text compared to baseline and preserved.
- CMS mutation readback matched all five intended fields and preserved all other fields.
- Seven blog API readbacks verified exact new booking links and preserved title/slug.
- No shared header/footer, navigation, Square provider identities, service assignment or customer records changed.

## Limitations

Physical-device testing was not performed. Mobile verification used Wix native Preview.
The Wix preview-panel widget rejected the verified custom-domain URL; the permanent public page was independently verified in browser and by HTTP.
Pre-existing blank rendering on the legacy root facial URL was outside this copy-only scope.

## Current live links

- https://www.matrixmassage.net/spa-and-beauty-services-salem-wi/eyelash-extensions-salem-wi
- https://www.matrixmassage.net/offers/new-client-facial-deal-salem-wi

## Evidence and rollback

This directory contains public audits, testimonial comparison, exact before/after CMS and native page code, blog exact changes/readback, native publication screenshot and public lash screenshot. Historical before files intentionally retain old provider names for rollback evidence and are not website authoring sources. Restore only exact changed fields after fresh comparison; do not restore the entire Wix site.

