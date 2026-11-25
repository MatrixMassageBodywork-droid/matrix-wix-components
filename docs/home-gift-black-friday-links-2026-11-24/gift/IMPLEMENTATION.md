# Gift Cards — Black Friday contextual link — exact implementation

Status: PREPARED / SOURCE VERIFIED / NOT INSTALLED. No remote mutation or browser action by this subagent.

## Authority and scope

Owner's newest instruction is to leave provider-name cleanup, reviews and About copy as-is, and proceed with Home/Gift Card links to the published Black Friday offers. This package covers Gift Cards only. It supersedes earlier audit recommendations to remove provider names for this task; no such removal is included.

Relevant current Gift Cards checkpoint: https://drive.google.com/file/d/17aseFrRYG-Vtjsr65hJsOrkVNzOy2g-x/view . Its archived published architecture is independently confirmed against live site revision 1309. GitHub main was read at f4dea83c23a60cf3dd817e7604460b062ac9b8f8; the full 1,189-entry tree contains no AGENTS.md or CLAUDE.md. Existing source is pages/gift-cards/review-4/renderer.js and pages/gift-cards/WIX_PAGE_CODE.js. The deployed renderer and archived page-code body match the current public body/SEO mirror exactly.

## Exact page and binding

- Wix site: cdec8df6-d518-4859-9f1e-f06bf5346d41
- Editor document: a276c9bf-bc17-4680-959b-a24ebe7370f6
- Page: GIFT CARDS / t538a
- URL: https://www.matrixmassage.net/massage-spa-gift-cards-salem-wi
- Element ID: matrixGiftCards; tag: matrix-gift-cards; native component: comp-mw59f0pm
- Parent: section1 / comp-mw598r48
- Current source type: external URL, not Wix-hosted Velo custom-element code.
- Current pinned URL: https://cdn.jsdelivr.net/gh/MatrixMassageBodywork-droid/matrix-wix-components@31efcebfba63781e29d53f2eebc4471b6065bec9/pages/gift-cards/review-4/renderer.js
- Current renderer SHA256: 295f8f8d0373697d66e1f382c2810783b05b6959632acecb6e7478c0eabcfe7b
- Current full page-code SHA256: 0353e054468ffa9d7eefa61f6935c3baa72bb198885d2123d8066d0b79b53477

## Exact change

Append one paragraph inside the existing #gc-holidays .gc-holiday-note, immediately after the existing paragraph:

> Looking for gift-card deals? Ask about current offers before you buy. Only active promotions apply.

Added text:

> View Black Friday spa offers. Regular dollar-value gift cards are purchased separately using the gift-card buttons on this page.

Only “View Black Friday spa offers” is the new link. Exact href: https://www.matrixmassage.net/black-friday-deals-salem-wi ; target: _top. The paragraph uses the existing gc-small class. The new anchor alone includes style="text-decoration:underline" so it remains visibly identifiable under the Wix link reset. No CSS rule, promotion price, discount, bonus, expiry, eligibility condition, gift-card amount, or FAQ is added or changed.

## Files and source merge

- candidate/renderer.js: complete current renderer with only that body-string insertion. SHA256 a1a55fb63ed305188767bb18248aa8414b8486c8ebc9fa14c84b498361bbf9a3.
- candidate/WIX_PAGE_CODE.js: complete current page code with the identical insertion in #matrixGiftCards.seoMarkup. SHA256 0c50c14a8f96534b3fac7b8a75e31783d0aa6093a2a8fa2769f5e16e38afdbb0.
- candidate/body.html and candidate/style.css: readable body and exact unchanged CSS.
- diffs/body.html.diff is the small semantic edit; renderer/page-code diffs have long lines because their existing bodies are serialized JSON string literals.

For a versioned archive, proposed new repository directory: pages/gift-cards/black-friday-link-2026-11-24/. Root must save the candidate in the existing repository, read back its real commit and verify its actual immutable CDN URL before native installation. No new commit or CDN URL has been created by this subagent. Keep the old review-4 pin as the baseline; do not use mutable main as runtime.

## Native execution after source is saved

1. Open existing GIFT CARDS page t538a. Read the current full page code and custom-element source settings. Confirm the source type, current URL, tag and IDs above. Compare page code with before/WIX_PAGE_CODE.repository.js; compare current source bytes with before/renderer.deployed.js. Stop the affected edit if source/copy/handlers differ; preserve it and return the exact difference for a targeted merge.
2. Apply candidate/WIX_PAGE_CODE.js to this page only, retaining all original comments and the same onReady/component target. Set this same custom element's source URL to the verified immutable candidate CDN URL. Preserve tag matrix-gift-cards, element ID, page/section identity, stretch and existing automatic-height behavior. Commit URL input normally and reopen its source settings for readback.
3. Save one page checkpoint after both matching files are installed. Read back the full page code and source URL/tag. Confirm candidate hashes/source bytes; do not infer persistence from field appearance alone.
4. Check desktop and native mobile: the single added paragraph appears in the Holiday Gifts note, wraps inside its existing card, and its link reaches the published Black Friday page. Confirm no horizontal overflow or footer overlap. The existing renderer sets height:auto; do not impose a new fixed height preemptively or restore the obsolete 6060px floor.
5. Confirm one unchanged H1, 19 total body links, all five purchase links to /gift/MLJ7B3VJVPBSS/order, one check-balance and one reload link, unchanged service/internal links, and all 11 FAQs still present/operable. Do not submit a gift-card purchase or alter presets.
6. Compare native title, description, canonical, robots and both existing structured-data blocks against before/public-extraction.json. No metadata or schema edit is required. Preserve all provider names, genuine reviews, About, shared shell, Square, amounts and unrelated pages.
7. Root controls the combined Home/Gift release scope, current authorization and pending-draft review. After any authorized publication, independently verify the permanent Gift Cards URL loads the actual candidate renderer and matching SEO mirror, and retain the source/page-code/metadata and navigation evidence.

## Completed read-only QA

- Exact deployed source retrieved HTTP 200 and matches current GitHub baseline.
- Deployed file is original readable JavaScript with no sourceMappingURL; no source map was necessary or invented.
- Current renderer body equals current public SEO mirror and archived page-code body.
- Candidate renderer body equals candidate page-code SEO exactly.
- Removing the one appended paragraph recovers the exact entire previous body.
- All 18 previous links retain href, text, target and order; one Black Friday link added.
- All 11 FAQs, images, IDs, anchor targets, CSS, registration and lifecycle unchanged.
- JavaScript syntax/isolated VM mount, single ready event and page-code execution pass.
- Existing Black Friday destination returned HTTP 200 with its expected title and self-canonical URL.
- Browser visual/navigation, native save, release and post-release verification remain with root.

## Targeted QA correction after first Test Site deployment

Root observed the new Gift link's computed textDecoration was none. The revised candidate adds only style="text-decoration:underline" to the new Black Friday anchor, identically in renderer and SEO mirror. All original candidate files and evidence were snapshotted to prior-candidate-before-underline before editing. No other CSS, text, link, amount or handler changed. Root must commit this revised source, verify its immutable CDN bytes, rebind the same existing component, install the matching revised page code, save/read back, redeploy the zero-exposure Test Site and require computed text-decoration-line: underline plus the existing link/layout checks before publication.
