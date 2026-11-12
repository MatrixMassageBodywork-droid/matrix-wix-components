# Six facial pathway schema: review candidate

Status: **SAVED LOCALLY / LOCAL TESTS PASSED / NOT SAVED TO WIX / NOT PUBLISHED / LIVE QA NOT TESTED**.

This draft source package contains one additive structured-data graph on each of six existing facial-goal URLs. No remote source, Wix code, CMS, indexing setting, route, page content, or publication state has been changed.

## Scope and exact files

The target is the existing Wix dynamic item page **Matrix Skin Pathways (Item)**, page ID **cib8y**, dataset **matrixPathwayDataset**, custom element **matrixPathwayPage**. Preserve the existing Wix-generated page-code filename. This is one native page-code change shared by six routes; it does not require creating any public module or changing any import.

| File | Purpose |
| --- | --- |
| `pathway-schema-before.js` | Exact archived native page-code baseline |
| `pathway-schema-after.js` | Complete proposed replacement text |
| `pathway-schema-change.patch` | Exact unified before/after diff |
| `facial-pathway-schema-candidates.json` | Exact six proposed graph objects, with current public evidence hashes |
| `pathway-schema-validation.json` | Successful local validation receipt and explicit limitations |

## What changes

The candidate captures `wixSeoFrontend.structuredData` beside the existing module-level meta/link snapshots, outside `$w.onReady`. At the end of the existing `applyPathwaySeo` call, which already runs through `$w.onReady`, it calls the supported `setStructuredData` API with all retained schema entries plus one new graph.

The new graph contains one `WebPage`, one `Service`, and one `BreadcrumbList`. Names come from the current payload's visible `h1`; descriptions come from the same `seoDescription` already used for the page meta description. Canonicals must match the existing approved six slug routes. The Service provider uses the established `https://www.matrixmassage.net/#business` identity, Matrix Massage & Bodywork, +1-262-939-9325, 24804 75th St, Salem, WI 53168, US. The breadcrumb is Home → Facials → current pathway.

The code neither reads nor re-emits the stale CMS `structuredDataJson` field. It adds no prices, Offers, medical claims, FAQPage schema, or FAQ rich-result promise. Two existing empty JSON-LD blocks `{}` were found in each current public pathway response; the runtime getter's exact contents have not been accessed. Empty blocks and unrelated schema are retained if present.

Existing page-specific schema is a stop condition. The candidate detects current-page WebPage/Service/Breadcrumb definitions and reserved entity-ID collisions, emits a console warning, and leaves the original schema untouched. This includes an already-present copy of the new graph, so it will not create duplicate managed graphs. A missing heading/description, unexpected canonical, or malformed original schema also skips the schema write without disrupting existing page content or SEO updates.

## Baseline gates before any approved save

1. Open the existing Matrix Massage & Bodywork Wix site identified by its production domain `www.matrixmassage.net`. Navigate through the existing site's editor → Dev Mode / Code → Page Code → Dynamic Pages → **Matrix Skin Pathways (Item)**. Verify page ID **cib8y**, dataset and element IDs above. Do not create or rename a page.
2. Export/read the complete current native page code before editing. Its exact UTF-8 SHA256 must equal **c4880b577bfc5f18c502ba0ae5c76a2745ffec0d121424e0ea3689cc4ab1a960**. Compare it to `pathway-schema-before.js`. If any byte differs, **stop this six-page change group and return the current source for Chat to rebase**. Do not overwrite or explain away the difference.
3. Read the current imported `public/matrix-pathway-markup.js` and custom-element renderer. Their reviewed hashes are **6c5bf23fcb0f039484da9bdaef7db8334ddb511bc96ce74950ac6a30b8d49f7a** and **b57a94c482e69f90fe3934632d4482286aa80ea20fed9a82c254239a775b6bd6**. If either differs, stop this group for dependency review. Preserve both unchanged.
4. Re-read the current `public/matrix-pathway-content` and current six payload heading/description values. The exact existing copy is not to be replaced. Compare the six values with `facial-pathway-schema-candidates.json`. If any has changed, return the delta for Chat to regenerate/review the affected schema candidates before saving; the builder itself intentionally follows the current payload.
5. Read the existing page SEO structured-data settings and the existing page/master-page code for other `setStructuredData` writers. Capture every existing substantive schema object. If page-specific WebPage, Service or BreadcrumbList schema already exists, if the shared provider facts conflict, or if another code path writes schema after the module-level snapshot, stop this group for reconciliation. Do not remove existing schema or change another writer to force this candidate through.
6. Confirm the release gate still reads `const PATHWAY_INDEXING_RELEASED = true;`. Capture the source and SEO baseline. Do not alter the value.

Any baseline gate failure affects this pathway group only; it is not authority to rebuild the website or rerun completed work.

## Approved draft-save sequence

The execution scope is saving a Wix draft only, after exact baseline checks. Publication is outside this checkpoint.

1. Keep the baseline export and its exact hash as the rollback reference.
2. Replace only the existing native code for page **cib8y** with `pathway-schema-after.js`. Preserve the Wix-generated filename. Do not edit imports, public modules, renderer URLs, CMS records, datasets, Square links, routes, SEO defaults, or page SEO fields.
3. Save once. This is the small save checkpoint for the shared six-page change. Do not publish the site or create a Test Site as part of a draft-only save.
4. Immediately read/export the complete saved native page code. Its SHA256 must be **9eacf2e187ec350425e0614f204a1047f93e3a76c4d1b21b02184ea62d2055b8**. If a save operation times out, read the current source before deciding whether to retry. If the read-back differs, stop and return the source and save result; do not repeatedly overwrite.
5. Use the existing Wix Preview capability, where it supports these dynamic routes, to inspect each route. Do not create a new preview system. Record unavailable preview checks as NOT TESTED, not PASS. No console warning starting `Matrix pathway structured data was not changed:` should appear.

## Six routes and expected identities

| Slug under `/facial-goals/` | Current visible heading used for schema |
| --- | --- |
| `hydrate-restore` | Hydrating Facials in Salem, WI |
| `brighten-smooth` | Brightening Facials & Dermaplaning in Salem, WI |
| `clear-balance` | Facials for Congested Skin in Salem, WI |
| `calm-support` | Gentle Facial Care for Sensitive Skin in Salem, WI |
| `age-defying-firm` | Facials for Mature Skin in Salem, WI |
| `maintain-glow` | Facial Maintenance for a Fresh Glow in Salem, WI |

## Acceptance checks

Local checks have passed with the six actual served payloads. The following live checks remain necessary after any authorized preview/publication step:

- Read each route's effective JSON-LD. Exactly one new managed graph must define that route's `#webpage`, `#service`, and `#breadcrumb`; the graph must match its reviewed candidate. All previously present unrelated schema must still be present and unchanged. Preserving empty `{}` blocks is allowed.
- Confirm provider identity and Salem address match the reviewed candidate; no unapproved Offers, prices or FAQPage blocks should have been added.
- Confirm title, description, canonical, robots, visible H1, FAQ text/count, contextual links, booking destinations, hero/imagery and related-pathway links match the captured baseline. The code does not intentionally alter any of them.
- Confirm existing visible/SEO semantic markup remains present and there are no new console errors/warnings. Test FAQ expansion and representative internal and booking link behavior in the renderer without booking a service or sending data.
- Following separately authorized publication, fetch normal and bot-diagnostic HTML for all six production URLs and parse the structured data. Record the production timestamp and evidence hashes. A bot diagnostic is supplemental evidence, not a claim that Google itself crawled the new version.

Stop on a missing/duplicate managed graph, lost unrelated schema, provider conflict, any unexpected change to existing content/SEO/booking behavior, save uncertainty, baseline drift, or an unexpected Wix condition. Return evidence for Chat to diagnose. Do not improvise a second change.

## Required receipt

Return exact source before/after read-backs and hashes; six route URLs; saved/published status and timestamps separately; existing schema capture; emitted JSON-LD from each checked environment; console warnings/errors; six per-route acceptance results; screenshots of H1/FAQ/link checks where visual access was needed; and any NOT TESTED items. Mark draft saved, local tested, preview verified, and published as separate states. Do not mark publication complete from a saved source alone.

Rollback, if necessary within the applicable execution scope, is the exact archived page-code baseline only after verifying the current source still matches this candidate hash. If current source has since changed, stop and rebase the rollback rather than overwrite newer work.

## Source and API references

- Archived native source: `MatrixMassageBodywork-droid/matrix-wix-components`, `pages/spa-beauty/facials/seo-execution-2026-11-07/published-1019/pathway-page-native-before-20261107.js`.
- Wix setter: https://dev.wix.com/docs/velo/apis/wix-seo-frontend/set-structured-data — setter overwrites earlier schema and must run inside onReady.
- Wix getter: https://dev.wix.com/docs/velo/apis/wix-seo-frontend/structured-data — read the getter outside onReady.

The candidate preserves existing entries because the supported Wix setter replaces the array. The local VM test verifies this intended behavior with stubs; only live Wix read-back and rendered/source checks can verify the actual saved and published result.
