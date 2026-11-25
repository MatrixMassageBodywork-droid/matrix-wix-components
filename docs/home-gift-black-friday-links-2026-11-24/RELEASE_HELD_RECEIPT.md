# Matrix Home and Gift Cards — Black Friday link receipt

**SAVED / VERIFIED / TESTED / PUBLISH BLOCKED.** The two-page source and Test Site checks are complete within the scope below. Native Wix Publish was rejected by automatic approval review. Explicit approval for this production publication is pending; no retry is authorized.

Date: November 24, 2026, America/Chicago; evidence collected November 25 UTC.  
Project: FACIAL WEB SEO PW. Site: `cdec8df6-d518-4859-9f1e-f06bf5346d41`; Classic Editor document: `a276c9bf-bc17-4680-959b-a24ebe7370f6`.

## Release state

| Item | Recorded state |
| --- | --- |
| Current live release | Revision **1309**, **100% exposure**. Native Release Manager displays **November 24, 6:32 PM Central / November 25, 00:32 UTC**. |
| Reviewed Test Site | Revision **1318**, **0% exposure**. Native Release Manager displays **November 24, 8:21 PM Central / November 25, 02:21 UTC**. Test URLs use `?rc=test-site`. |
| Native page sources and code | **SAVED / VERIFIED** against revision 1318 and exact candidate hashes below |
| Home startup embed | **SAVED / VERIFIED** by guarded API update; revision **1 → 2**, separately from native page publication |
| Requested production publication | **BLOCKED by automatic approval review**; no new successful publication confirmation or production revision |
| Permanent-page click QA | **NOT DONE**; Test Site navigation is not production click QA |
| Live-1309 delivery of updated startup embed | **VERIFIED PUBLICLY SERVED** at November 24, 8:31–8:32 PM Central / November 25, 02:31–02:32 UTC; Home startup body contains the new link, while its renderer, page code and SEO body remain at baseline. |

### Exact publication block

Automatic approval review rejected the native Wix Publish action for this reason:

> user authorized proceeding with the link work but did not clearly and explicitly approve this specific production publication.

The Publish action must not be retried without the explicit production approval identified by that review. No alternative publication route was used. The saved draft/Test Site remains available for review; the already-applied Custom Code update is recorded separately below.

## Authorized changes and preservation

The owner's latest instruction preserves existing founder/About content and genuine provider-named reviews. No name cleanup, review removal, About rewrite or Person-schema removal belongs to this release. Completed facial-offer and Square corrections remain intact. The exception is recorded in the [canonical policy](https://docs.google.com/document/d/1PbMqtSxR7N7Y30PHJTndRWb3X38eAU3H/edit) and GitHub policy commit `2f795b5ffac2e14fdc12c323555293e263fe79bc`.

Each page receives exactly one **View Black Friday spa offers** link to the existing [published campaign](https://www.matrixmassage.net/black-friday-deals-salem-wi), with `target="_top"`:

| Page | Existing native identity | Placement and result |
| --- | --- | --- |
| [Home](https://www.matrixmassage.net/) | Page `ghmgt`; `comp-mw5v2dtc` / `matrixHomePage`; tag `matrix-home-page` | CURRENT MATRIX SPECIALS, immediately after the facial-offer terms link. Component links **37 → 38**. |
| [Gift Cards](https://www.matrixmassage.net/massage-spa-gift-cards-salem-wi) | Page `t538a`; `comp-mw59f0pm` / `matrixGiftCards`; tag `matrix-gift-cards` | Existing Holiday Gifts note. Component links **18 → 19**. New anchor alone receives `text-decoration:underline` for visibility. |

Gift Cards also states: “Regular dollar-value gift cards are purchased separately using the gift-card buttons on this page.” Existing purchase, balance and reload routes are preserved. No gift-card bonus, extra credit, automatic discount, price or expiry change was introduced. The campaign's six approved service offers were not rebuilt or changed.

## Actual Home runtime dependency

Home's existing startup Custom Code registered its custom element before the external renderer and supplied the old body. Updating the renderer and SEO mirror alone therefore left the new link invisible.

The exact same approved paragraph was also synchronized into **Matrix HOME — instant content 2 of 2**, embed `f222d34c-8cac-4b08-af23-5b47c7451c20`. The guarded API PATCH and GET both returned 200; embed revision **2** and the full snippet read back exactly, with metadata unchanged. Home-only page selection, HEAD position, ESSENTIAL category, enabled state, `loadOnce=false`, registration logic, part 0 and other embeds were preserved. A fresh read of the permanent Home response at November 25, 02:31:50–02:32:25 UTC confirmed that live revision 1309 already serves the exact updated startup snippet. Its combined body has 38 links including the new campaign link. The same live response still uses the baseline renderer, page code and 37-link SEO body. Gift Cards remains at its exact 1309 baseline with 18 links and no campaign link. Thus the Home startup correction is publicly served, but the full two-page release and matching search-visible updates are not published. No publication retry or alternate publication path was used.

Test revision 1318 confirms that the combined startup body, external renderer body and page-code SEO mirror are identical. No mount-guard rewrite, replacement component or startup-code disablement was used.

## Code and archive identities

Repository: `MatrixMassageBodywork-droid/matrix-wix-components`; implementation branch: `fix/home-gift-black-friday-links-2026-11-24`.

- Home renderer pin: `0f15614f0dd0fe8bf425bd0a3b04e7b99ee86a3a`, `pages/home/black-friday-links-2026-11-24/renderer.js`.
- Final Gift renderer pin: `379632446b389709772a28dffa9991649b11df0b`, `pages/gift-cards/black-friday-links-2026-11-24/renderer.js`. This includes the targeted underline correction; the earlier Gift candidate is historical.
- Startup snippet archive/backup commit: `8ab71d6f7dad889f6b8f9d77f5054d9e659ec71e`.

| Verified artifact | SHA-256 |
| --- | --- |
| Home renderer | `3180efff9d1595d30c3551c8e1e01199f97911c75c2dd4c0a2cf723f9022b1ca` |
| Home complete page code | `c430696ba6464596e2e77619ba4bf76f845219c59c57b3c552a03ccae670f806` |
| Home body / SEO / combined startup | `8be11bec8b2dc5cff98c2b51e29c01b33e4034427eaa3c8304029ffff1913864` |
| Home startup part 1 | `d3418a93d083556987ecdaf62ee34dc068af7867821abb11d635ac491cb21a7b` |
| Gift renderer | `a1a55fb63ed305188767bb18248aa8414b8486c8ebc9fa14c84b498361bbf9a3` |
| Gift complete page code | `0c50c14a8f96534b3fac7b8a75e31783d0aa6093a2a8fa2769f5e16e38afdbb0` |
| Gift body / SEO | `58dc55cb3f6c20c884b0a5aeb0f2adbc50e836d15a65302cae887de9035e2423` |

## Verified QA and production limits

The revision-1318 source review verifies both immutable renderer files, complete deployed page code, visible/SEO body parity, exactly one campaign link per page, and preservation of every prior link's attributes/text/order. Each body retains one H1 and 11 FAQs; Home's 9 image attributes and Gift's original image attributes are preserved.

Titles, descriptions, canonicals, robots, schema and native SEO configuration match the baseline. The sole strict metadata exception is Home `og:url`: the root URL gained a trailing slash. The equivalent URL serialization is documented; no corrective SEO edit was warranted.

Each target page's feature payload changes only its approved renderer URL. Shared master payloads match their respective baselines. The internal payload inventory remains 42 entries; the other 39 page identifiers are unchanged. These are bounded source comparisons, not an exhaustive assertion about every other code body, CMS/backend setting or unpublished draft. Native Release Manager separately confirms the current 1318/0% Test Site and 1309/100% live release above.

| Live UI check | Observed result |
| --- | --- |
| Home desktop, **1348 px** | No horizontal overflow; footer gap **0 px**; representative FAQ opens and closes correctly. |
| Gift desktop, **1348 px** | No horizontal overflow; footer gap **16 px**; representative FAQ opens and closes correctly. |
| Home native Wix mobile, **320 px** | Document width **320 px**; **38 links**, **one H1**, **11 FAQs**. Campaign link at **x=20 px**, width **201.28125 px**; clearly visible in the screenshot. |
| Gift native Wix mobile, **320 px** | Document width **320 px**; **19 links**, **one H1**, **11 FAQs**. Campaign link at **x=52 px**, width **163.546875 px**; underline present. |
| Actual Home and Gift Test Site link clicks | **Both passed**: reached `https://www.matrixmassage.net/black-friday-deals-salem-wi?rc=test-site`. Wix propagated the Test Site query; the authored anchor remains the permanent campaign URL. |
| Permanent-page production clicks | **NOT DONE**; no successful new page publication to validate. |

These widths refer to desktop/native Wix preview scope, not physical-phone testing. Both representative FAQ interactions passed; this does not claim every FAQ was independently toggled. No purchase, payment, appointment or message was made. This work makes no new Google indexing, ranking or indexing-request claim.

## Evidence

- `EXECUTION_SPEC.md` — current scope and targeted corrections.
- `verification/test-final-20261125/TEST_SOURCE_REVIEW.md`, `reviewed-findings.json` and retained strict `verification.json` — revision-1318 review, including the documented metadata exception.
- `home/startup-sync-candidate/API_MUTATION_RECEIPT.json` — actual guarded embed update/readback.
- `deployment-verification/` — immutable source HTTP/hash verification.
- `policy/MUTATION_RECEIPT_20261125.md` — saved canonical owner exception.
- Root's native Release Manager and live browser observations supply the exposure, timestamps, layout, mobile, FAQ and click results recorded above; the concise durable metrics are recorded in `verification/NATIVE_UI_QA_20261124.json`.
- `verification/production-held-20261125/verification.json` and `PRODUCTION_HELD_REVIEW.md` — permanent Home/Gift responses, baseline identity and publicly served Home startup correction.
- `NEXT_PUBLISH_INSTRUCTIONS.md` — exact remaining execution, acceptance and stop conditions.
- **Outstanding:** explicit production approval, the native page publication and permanent-page click QA. No publish retry or exposure change was performed after the approval rejection.
