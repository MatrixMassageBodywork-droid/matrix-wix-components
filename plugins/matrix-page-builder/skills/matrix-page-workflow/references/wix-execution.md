# Deterministic Wix execution

Use Wix connected APIs where supported (for example media and native SEO), and the existing Wix Classic Editor for native layout operations unavailable in the connector. Do not generate a replacement site, migrate to Harmony/Studio/headless, or create a new CMS architecture for styling.

## Prepare the exact assignment before editing

Resolve: site/page IDs, permanent URL, source/target hashes, exact existing Velo and proposed merged file, native element and section map, approved asset URLs, tag/ID/source URL, sections to remove/retain, native SEO patch if any, current authorization/revision, and QA criteria. Separate discovery reads from mutations; if unexpected code requires reasoning, capture it and prepare a targeted patch outside live editing.

## Execution sequence

1. Open the verified existing editor and page through Pages & Menu. Confirm page ID/slug against baseline. Capture current save state and unrelated pending drafts; do not discard or publish unknown changes.
2. Read the current page code and native sections once. Preserve unknown SEO, navigation, handlers and integrations. Reuse the page's established component if revising it; for a first installation use the observed suitable blank/native section. Do not reuse another page's section IDs.
3. Apply the exact precomputed Velo merge. Supply complete visible HTML to the verified component `.seoMarkup`; avoid a replacement no-op or dropping original code.
4. Set custom element source to the verified immutable CDN URL, set the exact tag and element ID. Reopen the source settings and verify all values. If a framework-controlled field appears filled but readback differs, commit using supported real keyboard input; do not assume fill succeeded.
5. Enable native Stretch → full width → side margins 0. Preserve intended top position. Measure the rendered body, set only needed native element/section height, and record dimensions. Do not use a 100vw escape hack within a clipped 980px host.
6. Save the small checkpoint. Reopen/read back source/tag/ID/stretch/margins and code. If anything times out, inspect state before retrying.
7. Render Preview and native mobile. Confirm the new body works before removing only the enumerated obsolete page-local sections. Preserve genuine reviews, global header/footer/navigation and all unrelated pages.
8. Apply the explicit native SEO patch, if any, preserving all unrelated entries. For an FAQ replacement use the observed schema ID and final visible FAQ JSON. Re-read the saved result. Do not publish SEO separately from the approved body unintentionally.
9. Save, reopen, run the desktop/mobile and expansion/link checks in `seo-and-qa.md`. Confirm no giant blank gap or clipped body. Return a SAVED/VERIFIED receipt and proof when review is still required.
10. If explicit publication approval covers the current reviewed revision and all pending site changes, use Wix Publish. Capture the success confirmation and timestamp, then verify the permanent public page and current source. Never report published based only on Save, GitHub commit, Preview or an API request response.
11. Save current manifests and release evidence to GitHub and canonical Drive. Preserve the immutable source pin; receipt-only commits do not require another publish.

## Known conditions from successful releases

- A custom element can be blank in certain preview contexts; first verify source bytes, source/tag, availability, native width/height and the actual preview surface. The earlier oversized inline-font renderer was fixed by reducing production payload and serving fonts externally. Do not arbitrarily replace a working renderer or demand a new Test Site as a ritual.
- If the existing authorized Test Site path is needed, explain the observed reason and use it within current authorization. Do not create/replace/delete Test Sites automatically.
- Native editor dimensions can differ from production auto-height layout. Verify actual public FAQ flow and reviews adjacency; do not assume fixed saved heights necessarily create gaps.
- Benign tips, tours, help prompts and promotional overlays can be dismissed. They are not project blockers.
- Stop only the affected live change for wrong page/site, concurrent edits, unexplained code, missing required assets, unexpected SEO change, unverified save or required shared-component edits. Preserve work and return exact evidence plus a targeted correction plan. Never restore Site History speculatively.

Do-not-touch boundaries by default: shared shell/theme/navigation, unrelated pages and CMS collections, Square services/customer data, permissions, automations, redirects and canonical patterns. Source-saving approval is not permission to alter these.
