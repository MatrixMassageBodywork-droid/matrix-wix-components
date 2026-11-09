# CURRENT — Union Grove targeted update — SAVED AND VERIFIED DRAFT — 2026-11-09

## Status
SAVED: Wix page content, source binding, sizing and page-specific SEO draft.
VERIFIED: source and page code after editor reload; SEO API exact readback.
TESTED: desktop preview at 1348 px; native mobile at 320 px; map loading; FAQ expansion.
NOT PUBLISHED: this revision has not been released. Public URL remains the prior published revision. Live page head and crawler rendering require post-publication verification.

## Target and source
Site cdec8df6-d518-4859-9f1e-f06bf5346d41; existing static page lidzc.
Route: https://www.matrixmassage.net/massage-near-union-grove-wi
Existing section3 / comp-mw5ga05j; custom element matrixUnionGrove / comp-mw5gac32.
Tag: matrix-union-grove-page.
Source commit: 120cce123c780f12d33347514025e4a9fe6fef23 on review/regional-pages-2026-11-06.
Source URL: https://cdn.jsdelivr.net/gh/MatrixMassageBodywork-droid/matrix-wix-components@120cce123c780f12d33347514025e4a9fe6fef23/pages/regional/union-grove/revision-2-2026-11-09/build/renderer.js
Previous published source: 36c352fd322c7347beec2c1845a1313dbfba45fc.

## Changes
1. Exact requested fourth Japanese Head Spa & Precision Scalp Therapy block directly after Manual Lymphatic Drainage, with Explore Head Spa Services button linking to the verified existing head spa page.
2. Exact expanded regional introduction including Union Grove, Yorkville, Dover and Paris.
3. Scannable commute panel above address.
4. Active Google Maps iframe showing the business and address within the visiting section.
5. Existing page Service schema provider extended with explicit LocalBusiness type, verified geo coordinates and Maps link. Existing schema identity retained.

## Commute accuracy
Current Google Maps route showed 18 minutes and 11.5 miles via US-45 south and WI-50 west.
Saved wording uses approximately 15–20 minutes, 11.5 miles, and that route.
The proposed traffic-light-free claim was omitted because the US-45/WIS-50 intersection has signals.
Reference: https://graef-usa.com/wisdot-us-45-wis-50-to-wis-11-construction-management/
Coordinates verified from business Maps place: 42.5685566, -88.109454.
Maps CID: 13922054554836148682.

## Objective verification
- Renderer remote CDN byte count 20331; SHA256 5ff50efac3ace309f65e211713d33cfe255840ab161fa9e4d882b957fab12450.
- After Save and full editor reload, source settings showed exact immutable source URL and tag.
- Copied saved page code equals candidate exactly, length12676, FNV-1a 6b5f78b5.
- Page contains only original section and custom element IDs, no stray native element.
- One H1, four ordered service articles, one requested iframe, eight unchanged FAQ items.
- Desktop body width1348, scrollWidth1348; body height5639.98. Native element height6000 and section6040 accommodate editor width980 content height5999.94.
- Mobile body width320, scrollWidth320, height9375.89; element9376 and section9416. Map278x300, no horizontal overflow.
- Actual map displayed correct business pin and location in desktop and mobile preview.
- FAQ first question expanded and showed its preserved answer.
- Logo, treatment photo and room photo loaded. Lazy water assets retained from baseline; not every lazy image was independently captured in viewport.
- SEO PATCH used publish:false and readback matched all three candidate tags exactly. Title, description, canonical and schema ID kHPT_TmR preserved. No noindex introduced.
- LocalBusiness name Matrix Massage & Bodywork; telephone +1-262-939-9325; address24804 75th St, Salem, WI53168; geo42.5685566,-88.109454.
- Existing header, footer, navigation, other pages and Square data unchanged.

## Evidence and continuation
Screenshots in this revision's proofs folder: desktop-verified.jpg and mobile-map-verified.jpg.
seo-verified.json records complete API readback; baseline folder preserves original code and metadata.
EXECUTION.md records scope and deterministic installation steps. Do not reinstall completed work.
Only publish following explicit owner authorization, then verify live content, active map and rendered head JSON-LD at the same canonical URL.
