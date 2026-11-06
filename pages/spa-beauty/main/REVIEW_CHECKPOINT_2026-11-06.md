# Spa & Beauty MAIN — design approval checkpoint

Date: 2026-11-06 UTC (2026-11-05 Wisconsin). Project: FACIAL WEB SEO PW.

## Status

**SAVED:** complete first design review package; current internal build `review-2/`.
**VERIFIED:** current services/booking destinations against the public Square menu; existing page identity, live SEO baseline and genuine review text; approved Main logo and water references.
**TESTED:** complete local browser proof at desktop widths 1280, 1440 and 1920 and phone widths 320 and 390. All measured document widths equal their target widths; no horizontal overflow in the page body. All images loaded. One H1. Four FAQ items open and close. Screenshot evidence includes the entire page at 1440 and 390.
**NOT INSTALLED / NOT PUBLISHED:** Wix was not modified. No production release, page/code binding, SEO setting, header/footer, review or customer data was changed.
**NOT TESTED:** Wix native editor sizing, Test Site rendering, mobile device/UA behavior, SMS delivery, or booking submission. Those are later installation QA, after owner approval.

## Identity and preservation baseline

- Wix site: cdec8df6-d518-4859-9f1e-f06bf5346d41
- Existing page: ualp6
- Editor document: a276c9bf-bc17-4680-959b-a24ebe7370f6
- Existing URL/canonical: https://www.matrixmassage.net/spa-and-beauty-services-salem-wi
- Title: Spa Services in Salem, WI | Facials, Head Spa & Wellness
- Description: Explore spa services in Salem, WI including custom facials, Japanese Head Spa, waxing, infrared sauna and red light therapy at Matrix Massage & Bodywork.
- Live robots baseline: no explicit robots meta/noindex was observed. Preserve the existing Wix indexing setting; do not infer or rewrite it from this absence.
- Existing JSON-LD: BreadcrumbList, HealthAndBeautyBusiness and OfferCatalog. Preserved as captured in baseline/live-dom.json. No live schema mutation. FAQ schema is a candidate only.
- Native shell: SITE_HEADER / SITE_FOOTER, untouched.
- Existing genuine reviews: section comp-mmwon3224, slideshow comp-mmwon3296; slides comp-mmwon32e4, comp-mmwon32i1 and comp-mmwon32m4. Preserve in Wix.
- Old body sections observed: comp-mmwon2xy and comp-mmwon2zl3. Observation only; do not delete based on this proof.

## Design

Centered approved Main Massage logo, full-width water hero, cream service grid with four distinct service images, water-backed combined ritual, enhancements, first-visit guide, four FAQs and closing booking CTA. Shared site navigation/reviews/footer are included as contextual representations only, with that distinction stated in the preview.

The proof is local and marked noindex/nofollow. Its robots directive must never be copied to the existing live Wix page. Production title and description candidates match the live baseline exactly. The source HTML has no live deployment capability.

## QA evidence

- qa/responsive-check.json — live DOM measurements at five widths.
- qa/link-audit.json — all body links mapped to existing sections, current catalog service hrefs, official service pages or the approved text number.
- qa/full-page-1440.jpg and qa/full-page-390.jpg — entire page screenshots.
- qa/desktop-hero.jpg and qa/mobile-hero.jpg — opening views.
- review-2/build-manifest.json — source/build hashes and static structure checks.
- review-1/ — retained initial build; superseded by review-2. Only copy-space correction after responsive line breaks was necessary.

All four optimized image URLs were fetched from their immutable GitHub asset commit and matched local hashes. Browser image loading then passed at all five widths. FAQ expansion displayed all four answers; a local preview viewer height correction allows the iframe to shrink when switching layouts. The first transient full-page capture preceded completion of a lazy image load; final evidence was captured after all images reported loaded.

## Next authorized boundary

The next action is owner design review. No installation or publication is authorized by this checkpoint. After design approval, re-read current project state and capture fresh native Page Code/layer map before defining exact changes. Do not reinstall another page, replace shared renderers, alter shared header/footer, remove reviews, change URL/SEO/indexing, or publish without explicit authorization. Do not use the generated SEO snippet as a complete Page Code replacement.
