# Home and Gift Cards — Black Friday links

## Current authority and bounded change

Owner instruction on November 24, 2026: leave provider-name cleanup, reviews and founder/About copy as they are; proceed with Home and Gift Card links to the published Black Friday offers. Current production is Wix revision 1309, following the verified facial-offer release. The current Google checkpoint is document 1nGRF6PxQ-otAccE9-y9h_dgGopD2qWyXt5m0AywRVpQ. The Black Friday release checkpoint is document 1tmtpFpa6evO7Gmb2A24_ttDL6sjfyWSrtTAxAS4HoMo. The campaign is already published; it is not being rebuilt.

Add one contextual link per page to https://www.matrixmassage.net/black-friday-deals-salem-wi. Label: “View Black Friday spa offers”. Home placement: CURRENT MATRIX SPECIALS, immediately after its existing facial-offer terms link. Gift Cards placement: the existing Holiday Gifts note; add the separate statement that regular dollar-value gift cards are purchased separately with the existing gift-card buttons.

## Dependencies and safety

Both existing components currently load immutable external CDN sources. Preserve this existing per-page architecture, their element tags, Velo IDs, sections, responsive CSS, auto-height behavior and existing images. Native page-code seoMarkup must contain exactly the same body as each visible renderer. No new CSS, prices, expiry dates, bonuses, eligibility claims, FAQ changes, customer data or transaction changes are included. Preserve reviews, founder/About copy, all original links and page metadata/schema. Completed facial and Square corrections remain intact.

All reasoning and complete candidate source are prepared outside the browser. Browser execution is limited to existing component source fields, page-code replacement, Save, native preview, zero-exposure test site, publication and live QA. No browser research or broad troubleshooting is assigned.

## Preconditions and exact native targets

Site cdec8df6-d518-4859-9f1e-f06bf5346d41; editor document a276c9bf-bc17-4680-959b-a24ebe7370f6.

Home: page ghmgt; element comp-mw5v2dtc, Velo ID matrixHomePage, tag matrix-home-page, section comp-mw5v1iyj. Native full page code was copied read-only and its LF-normalized SHA256 matched 1826d867815a28a2c3a1673a50cb78418145807dabacaa5c3218b03dc239a165. Candidate page code SHA256 c430696ba6464596e2e77619ba4bf76f845219c59c57b3c552a03ccae670f806. Candidate renderer SHA256 3180efff9d1595d30c3551c8e1e01199f97911c75c2dd4c0a2cf723f9022b1ca. Existing source is pinned at 14f2c29fb90895f5ed83a045c5c547414b5bcf3f, pages/home/performance-2026-11-09/renderer-complete.js.

Gift Cards: page t538a; element comp-mw59f0pm, Velo ID matrixGiftCards, tag matrix-gift-cards, section comp-mw598r48 / section1. Native full page code was copied read-only and matched SHA256 0353e054468ffa9d7eefa61f6935c3baa72bb198885d2123d8066d0b79b53477. Candidate page code SHA256 d48245955008bffe3956849a7573ef594a6f5cb0b600cc54810f71f09906e098. Candidate renderer SHA256 67138b7b4ae05a4cd29bb1c4e50df6ee40fe01a93b56f3f925c2210028bfc3cd. Existing source is pinned at 31efcebfba63781e29d53f2eebc4471b6065bec9, pages/gift-cards/review-4/renderer.js.

## Deterministic execution order

1. Save both complete renderer, body, style and page-code candidates, exact baselines and static verification in the existing GitHub repository on fix/home-gift-black-friday-links-2026-11-24. Base on verified facial release commit 3201957ee30e446a26690c7b672b29f5a36f10f5. Read back the actual commit and exact two CDN source files; require HTTP 200 and matching hashes before native source changes. Archive under pages/home/black-friday-links-2026-11-24 and pages/gift-cards/black-friday-links-2026-11-24.
2. In Wix Page Code > HOME, compare current complete code to captured baseline. Select the existing custom element through its native section/layers. Open Choose Source and verify the old external URL and unchanged tag. Replace only its URL with the verified candidate URL. Replace the complete Home code with the prepared candidate (or the exact single-insertion transformation whose complete hash equals it). Save. Reopen the page and source dialog and read back both full code and source URL/tag.
3. Repeat for Page Code > GIFT CARDS with its own verified candidate. Save and reopen/read back. Preserve every unknown handler; a baseline mismatch is a stop condition, not permission to overwrite it.
4. Verify Save state and Site History since production1309. Only the two source bindings and two matching page-code changes belong in this release. Do not release unexpected concurrent changes.
5. Confirm existing Test Site exposure remains zero. Use the native test-site action to update that zero-exposure site once. Inspect both full pages on desktop and native mobile320 preview. Check the link placement, wrapping, no horizontal overflow or footer overlap, and one unchanged H1 per body. Open the new links and confirm the exact published campaign URL and its six approved offers. Check gift purchase/balance/reload hrefs; do not perform purchases. Check representative existing FAQ toggle on each page; all FAQ markup/lifecycle must match baseline.
6. Compare test response renderer bytes and complete visible/SEO body parity against candidates. Verify titles/descriptions/canonicals/robots/schema retain baseline values and prior facial-offer correction remains intact. Only after successful QA and pending-scope review, publish these requested Home/Gift links using native Publish.
7. Require the Wix success confirmation and fresh production revision/history. Fetch both permanent public URLs anonymously; verify actual renderer URLs/hashes, body/SEO parity, one new link per page and old links preserved. Live click-check both campaign links. Preserve founder/review text. Record actual tested widths; do not claim physical-phone testing or search indexing/ranking changes.

## Stop conditions and receipts

Stop the affected mutation if a baseline differs, the source URL/tag cannot be identified, an unexpected draft or active test exposure exists, Save/readback fails, source HTTP/hash differs, layout/click QA fails, or publication is rejected. Diagnose and prepare a targeted correction outside the browser. If an operation times out, read persisted state before retrying. Never restore, rebuild, duplicate or delete to resolve uncertainty.

Receipt must distinguish PREPARED, SAVED, VERIFIED, TESTED, PUBLISHED and any NOT TESTED/BLOCKED items. Include source commit/pins, native page-code hashes, save/test/production revisions, before/after scope, desktop/mobile QA, exact live URLs, preservation of founder/reviews and separate gift-card routes. Update the current canonical checkpoint using its current revision guard, preserve historical evidence, and save the completed receipt in the project folder.
