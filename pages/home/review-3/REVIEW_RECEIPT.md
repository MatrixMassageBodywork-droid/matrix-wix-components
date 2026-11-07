# Matrix Homepage — complete design preview

Date: November 7, 2026 UTC / November 6, 2026 local
Project: FACIAL WEB SEO PW
Revision: home-review-3
Target: existing HOME, Wix page ghmgt, https://www.matrixmassage.net/

## Status
- DESIGNED: complete homepage body between the existing shared header and footer.
- SAVED: source, reproducible builder inputs, renderer, visible HTML SEO snippet, proposed merged page code, baseline, offer evidence, asset references and Specials plan in the existing Matrix GitHub repository.
- VERIFIED: remote source readback; original title, description, H1 and eight FAQ answers preserved. Existing legacy page code retained in the merged candidate.
- TESTED: standalone desktop/mobile proof. Three-column desktop cards, single-column mobile cards, no horizontal overflow at 320/390/1280/1440/1920 viewport widths; eight image assets loaded; booking buttons at least 50px tall; anchor navigation and keyboard FAQ expansion worked. All 18 existing Matrix destinations returned HTTP 200. Service-specific booking URLs matched the current public Square menu.
- NOT INSTALLED: no Wix content, section, source, metadata, shared navigation, About or testimonial mutations were made. Editor was inspected to capture baseline only. This preview is a complete design proof, not a saved Wix Test Site.
- NOT PUBLISHED: production homepage and its native SEO remain unchanged.
- NOT TESTED: Wix native mobile rendering, final custom-element integration/height, native SEO save, post-release crawlability, Core Web Vitals, completed bookings or tracking attribution.

## Design and SEO
1. Approved large black-bordered Matrix logo over dark teal water, current H1 and booking action.
2. Local trust strip.
3. Six image-led service cards, detail links and descriptive Salem booking buttons.
4. Current facial offer: $79 / 45 minutes, Save $16 against the same 45-minute $95 service; conditional 60-minute $85 follow-up kept within the offer.
5. Actual studio image and short explanation of personalized care.
6. One verbatim guest quote copied from the existing public massage page, with a source link; existing native testimonials unchanged.
7. Gift cards.
8. Salem address, directions and existing regional links.
9. Existing eight FAQ answers plus three new decision questions, then a water booking close.

The current title is “Japanese Head Spa, Facials & Massage in Salem, WI | Matrix”; H1 is “Japanese Head Spa, Facials & Massage in Salem, WI”. Preserve canonical /, indexing, LocalBusiness and WebSite data. The FAQ file is a candidate reconciliation for later integration, not an additional duplicate schema to append blindly.

The noindex/nofollow meta belongs only to the standalone proof. Never copy the proof document head into production Wix metadata.

## Imagery
Existing Matrix repository images provide massage, facial, Head Spa, lash and studio photography. Wax-preparation and red-light illustrations are labeled accurately in their alt text. Assets are reused as service overview thumbnails, intentionally linking to their corresponding service pages. No provider names were added to new prose. The existing verbatim testimonial retains its original wording, including the owner's name.

## Specials
See SPECIALS_PAGE_PLAN.md. The initial homepage links the existing facial offer page so there is no dead /specials link. No new discount or seasonal promotion was invented. No follow-up savings badge was used because the underlying regular-price evidence is inconsistent across sources.

## Continuity and implementation
Research baseline: pages/home/research-2026-11-06/RESEARCH_AND_PLAN.md.
Read-only native capture: pages/home/review-1/baseline/HOME-before.js and native-section-map.json.
Proposed component: matrixHomePage, tag matrix-home-page, immutable renderer pinned to this source revision.
WIX_PAGE_CODE_MERGED_CANDIDATE.js preserves the captured link-rewrite handlers and appends full visible-body seoMarkup. It is a candidate until the actual component and native section assignment are verified during installation.

The approved plan's review deliverable is complete: full homepage proof plus Specials-page plan. Publication remains gated on the user's final test-page approval. A later native installation must use this reviewed source, preserve the existing shell and genuine testimonials, verify the current draft state before changes, and capture desktop/native-mobile proof before any release. Do not publish merely because this source has been committed.
