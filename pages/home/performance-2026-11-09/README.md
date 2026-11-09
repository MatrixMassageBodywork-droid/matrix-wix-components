# Homepage performance update — 9 November 2026

Status: source prepared and standalone desktop/mobile checks passed. Native Wix installation and public PageSpeed verification pending a safe handoff from concurrent red-light-page work.

The same approved water image and logo are delivered as responsive WebP images. The decorative hero water image is eager/high priority. Existing colors, fonts, black logo border, layout, copy, prices, links and image subjects are preserved. No native SEO patch, shared header/footer edit, additional app or paid service.

## Verified evidence

- Original water: 2,750,473 bytes. Phone variant: 198,338 bytes; desktop variant: 373,600 bytes.
- Original logo: 181,940 bytes. Variants: 12,118 / 18,656 / 43,912 bytes.
- Verified HTTP 200 image delivery and image content types are recorded in asset-verification.json.
- Identical source text and link attributes; page handlers and rollback sections preserved.
- Before/after geometry and typography match at 320, 390, 1280, 1440 and 1920 pixels. No component horizontal overflow.
- Eleven FAQs expand on phone and desktop; following section remains adjacent. All images verified loaded.
- Baseline PageSpeed mobile: performance 57, LCP 25.0s, FCP 1.7s, TBT 500ms, CLS 0.004. Desktop: 64, LCP 4.2s. These are BEFORE values, not improvement claims.

## Install

HOME ghmgt; existing custom element matrixHomePage, tag matrix-home-page. Pin renderer.js to its verified immutable source commit. Read fresh current page code and compare to WIX_PAGE_CODE_BEFORE.js before applying WIX_PAGE_CODE_CANDIDATE.js. Preserve native dimensions/stretch unless a new measured issue requires adjustment. Do not publish unrelated unapproved drafts.

## Remaining mobile finding

PageSpeed flagged small shared-footer links (Gift Cards and Partner with Us). Those are not altered by this page-local update. Native mobile verification is required before concluding whether any page-local clipping exists.
