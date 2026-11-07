# Booking page redesign — review 2

Date: November 7, 2026 (America/Chicago). Project: FACIAL WEB SEO PW.
Status: DESIGN SAVED; local preview TESTED; NOT INSTALLED; NOT PUBLISHED.
Owner's added requirement: protect existing ranking. No ranking position or Search Console performance baseline was measured in this design task; unchanged rankings cannot be guaranteed.

## Scope and authoritative baseline

Continue the existing Wix Classic booking page n58rv at https://www.matrixmassage.net/book-appointments-salem-wi. Do not create a replacement URL or new website. See booking-baseline.json for the live title, description, canonical, H1, schemas, links and observed DOM IDs. These are public-page observations, not a native editor/code backup.

Preserve these exact values:

- Title: Book Massage & Spa Appointments in Salem WI | Matrix Massage
- Description: Book massage, facials, head spa, waxing, red light therapy, sauna, and wellness services online at Matrix Massage & Bodywork in Salem, WI.
- Canonical: https://www.matrixmassage.net/book-appointments-salem-wi
- H1: Book Your Massage & Spa Appointment in Salem, WI
- Existing WebPage and HealthAndBeautyBusiness JSON-LD entries in booking-baseline.json.
- Existing indexability, shared header/footer, inbound booking URLs, analytics, tracking, Velo behavior, testimonials and About page.
- Existing fragment targets book-massage-salem-wi and book-an-appointment. Retain compatibility even if new jump links are added.

## Design

Matching main-page centered 660 by 330 logo panel, black frame, teal water, cream sections. Prominent direct Square booking and on-page jump. Existing Square menu remains the booking engine; direct fallback stays available independently. Follow with the verified introductory facial offer, six service guide links, directions and gift cards, eight FAQs and closing booking CTA. Shared Wix header/footer are intentionally outside this body proof.

Current main Square destination:
https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services

Verified $79/45-minute introductory facial destination:
https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services/GJ7PY2ONLPOVK4JIYCIWJGG4

Offer detail page:
https://www.matrixmassage.net/offers/new-client-facial-deal-salem-wi

No guessed /specials link. That route is planned in the existing home review-3 SPECIALS_PAGE_PLAN.md, not verified live. The $85 follow-up is arranged at checkout before leaving; no unrestricted follow-up booking button. No provider names in authored website copy. Square's own menu currently includes a provider name and Halloween specials; this redesign does not change the Square catalog.

## Internal links

INTERNAL_LINK_MAP.csv records every proposed on-site body link and the existing live link inventory. The six service guides target existing service pages, plus offer detail and gift cards. Preserve existing destinations, including shared footer regional links. No blanket cross-linking or new location pages. Before publication compare the full rendered link set with baseline; any removed destination must be accounted for in the untouched shared navigation/footer or restored in appropriate body copy.

## Verification completed

- Full desktop visual proof reviewed: booking-redesign-desktop.png.
- Mobile 390-width frame visual proof reviewed: booking-redesign-mobile.png.
- Width checks at 320, 390, 1280, 1440 and 1920 pixels: no horizontal document overflow. The browser's 15px scrollbar is excluded from measured content width; raw results in booking-qa.json.
- One authored H1 and eight FAQ items at each tested width.
- All eight mobile FAQ controls expanded successfully and revealed expected answers.
- faq-schema.json exactly matches all eight visible questions and answers.
- Configuration title and description exactly match the captured live baseline.
- Real Square scheduler loaded in the desktop preview. No appointment was selected or submitted. Direct introductory service was separately inspected at $79/45min.
- Hero jump reached #booking-menu.

## Important installation boundary

preview-with-scheduler.html is the complete design proof with a real Square iframe. body.html/renderer.js contain a deliberately labeled native-slot placeholder and are NOT a drop-in production installation. WIX_SEO_SNIPPET_CANDIDATE.js is NOT a replacement for existing page code. Element IDs/tag names in page-config.json are proposed, not verified editor bindings.

Retain the native Wix Square embed. Before editing, capture saved native page code, custom-element bindings, section order, embed configuration and saved SEO/robots/schema settings. Public DOM suggests embed comp-mer0endk and section comp-mer0czc7, but native IDs/types must be confirmed. Prepare the final upper/lower integration around that native embed using this approved content. Merge only required bindings into current Velo. Do not overwrite unknown page logic or install the placeholder on the live page.

This is a design review checkpoint, not an executable installation handoff. Native capture must resolve the exact section/component mapping before deterministic installation instructions are issued. No speculative editor operations are authorized by this document.

## Publication acceptance criteria

1. Same page ID/URL and self-canonical, same title/description/H1, same robots/indexing state; no redirects or duplicate booking page.
2. Existing structured-data entries survive exactly. Add the FAQ object only after inspecting the saved schema inventory, avoiding duplicates. Do not promise FAQ rich results or add ratings, reviews or credentials without evidence.
3. Preserve existing visible topical service coverage and verified internal destinations. Authored copy and links must be crawlable outside the third-party booking iframe; rendered appearance alone is not proof of indexing.
4. Existing native embed works on desktop and phone; direct Square fallback and specific intro offer route work. Do not create appointments for QA.
5. All jumps and eight disclosures work; logo/water load; no mobile clipping or horizontal overflow; no blank custom component.
6. Capture saved draft readback and Test Site evidence before publication. Obtain owner approval of the reviewed design before live publication.
7. After authorized publication, repeat the SEO/link/schema/booking checks on the public URL and record release/version evidence. Compare Search Console performance later if access is available; this design task does not establish current ranking or guarantee future traffic.

## Separate observations, no changes made

- Square currently presents Halloween seasonal services first. Catalog cleanup is a separate action; do not silently delete, disable or reprice services in a webpage redesign.
- Existing offer-page CTA opened a generic Square destination using a different booking token. The new proof uses the specifically verified $79 service URL. Existing offer page was not changed.
- All live Wix pages, Square services, pricing, booking data and Google Business Profile remain unchanged by this booking-page design task.
