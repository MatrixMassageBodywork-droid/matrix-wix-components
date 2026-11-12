# Wellness and Infrared Sauna — current redesign checkpoint

2026-11-12, America/Chicago. Status: DESIGNED / STATIC CHECKED. Native installation and browser visual QA pending. NOT PUBLISHED.

Owner request: redo the existing Wellness and Infrared Sauna pages, continue prior sauna work, include SEO, AI-search foundations and backlinks. Scope is design and saved native drafts; publication requires approval of this revision. The earlier About publication approval applies to About only.

## Authoritative baseline

- Existing site cdec8df6-d518-4859-9f1e-f06bf5346d41; Classic editor document a276c9bf-bc17-4680-959b-a24ebe7370f6.
- Wellness hfzq0, https://www.matrixmassage.net/wellness-biotech-services-salem-wi.
- Sauna nf4iw, https://www.matrixmassage.net/infrared-sauna-salem-wi.
- Latest prior site checkpoint: live1121, saved1122 per Nov12 production receipt at commit888c033ed7029c9c96e9ac26b05af70f1c70c002. Fresh public HTTP confirms1121. Retain all unrelated saved changes.
- Canonical project Drive folder1jthRMAHOoockNm8hAVBK6mz4iaHbhNK8. Prior sauna records in continuity/ are historical references; current native-baseline/ captures supersede them for implementation.

## Drafts

- main/review-2: main-page framed logo over dark teal water; cream service sections; seven FAQs.
- infrared-sauna/review-2: smaller framed logo and sauna split hero; eight FAQs; visible $35/30-minute add-on from current Square public menu.
- Original Wix stock sauna photograph is labeled illustrative. Current published red-light panel imagery reused intentionally for the Wellness service card. No fabricated facility photos.
- Existing SEO titles, descriptions, canonical URLs and indexing preserved. FAQ markup generated from visible copy. Business/catalog corrections and contextual breadcrumb hierarchy are prepared separately as native SEO drafts.

## Dependency audit / boundaries

Wellness currently uses native content and only a default page-code template. Its genuine testimonial section comp-mppziohc must be retained intact. Replace only top-level content sections comp-mppziofn, comp-mppzp2vm and comp-mppziogl3 after verifying the new body. Existing blank section comp-mppziogk1 can host the new static element and be retained as the content section.

Sauna currently uses section comp-muu92bbq, custom element comp-muu96xx4, Velo ID matrixServicePageV21, tag matrix-service-page-v21, Velo source matrix-service-page-v21.js. Current code is entirely the old CMS body adapter (record capture in native-baseline/sauna-code-before.js); no separate SEO-head, analytics or booking-event code exists in that file. The new revision deliberately replaces that page-local adapter with complete static visible-body seoMarkup, reuses the same element/section, and pins a service-specific renderer. Leave dataset matrixServicePageDataset, all CMS collections/data, and shared public/custom-elements/matrix-service-page-v21.js unchanged for other dependencies and rollback.

Preserve shared header/footer/navigation/map, native reviews, all unrelated pages, HOME's three enabled synchronized inline entries, Red Light quiz/integrations, Square catalog, permissions, automations, canonical patterns and redirects. No publication in this scope.

## Internal linking

Existing contextual Home→Wellness, About→Wellness and RedLight→Wellness are retained. This revision adds/corrects Wellness↔Sauna and each page's contextual links to related care, booking, About, local guides and directions. Wellness also links to the existing /supplements and free Glow Test. External backlinks are not claimed as created by these page edits.

## Acceptance

Exactly one H1/page; all seven/eight FAQs match schema and expand/collapse; complete visible body equals seoMarkup; exact immutable renderer source/tag/ID and full-width native stretch with zero side margins; no overflow at320/390/1280/1440/1920 proof widths; native desktop/mobile preview; loaded images; booking/internal destinations checked without submission; code/source saved and read back; genuine reviews/footer follow without clipping/large gaps; draft SEO readback; GitHub/Drive checkpoint and clear pending-publication receipt.
