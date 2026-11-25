# Home and Gift Cards — production held review

**NATIVE PUBLICATION BLOCKED / TEST SITE VERIFIED / HOME STARTUP UPDATE PUBLICLY SERVED.** The complete Home and Gift Cards release is not published.

## Observation time and method

Read-only observation window: **2026-11-25T02:31:50.238044+00:00 through 2026-11-25T02:32:25.228630+00:00** (UTC, November25,2026). Two exact permanent-page URLs and their observed public resources were fetched anonymously. No browser action, publication retry, exposure change, API mutation, purchase or indexing request was performed.

| Page | Permanent URL | Page GET completed (UTC) | Observed native site revision |
| --- | --- | --- | --- |
| Home | https://www.matrixmassage.net/ | 2026-11-25T02:31:59.718096+00:00 | 1309 |
| Gift Cards | https://www.matrixmassage.net/massage-spa-gift-cards-salem-wi | 2026-11-25T02:31:59.291796+00:00 | 1309 |

Both permanent-page requests returned HTTP200. Root reported that automatic approval review blocked native Wix Publish because the current user wording did not clearly explicitly authorize this specific production release. This observation records the resulting state; it is not a release acceptance run.

## Actual production state

**Home:** The external renderer URL/bytes, complete seoMarkup and deployed original page code still match the revision1309 baseline exactly. That renderer/SEO body contains37 links and no Black Friday link. Separately, the existing Home startup embed **f222d34c-8cac-4b08-af23-5b47c7451c20** is already publicly served with the corrected candidate HTML. Its two combined startup parts equal the approved Home body, containing38 links and one “View Black Friday spa offers” link. The startup code update therefore reached the public configuration independently of the blocked native publication. This source check did not execute a browser to recheck the visible live DOM.

**Gift Cards:** The external renderer URL/bytes, complete seoMarkup and deployed original page code all still match revision1309 exactly. The live source body contains18 links and no Black Friday link. The revised Gift link and underline remain in the verified Test Site candidate. The Home startup embed is globally listed but retains its Home-only page scope; it is not Gift body content.

Titles, descriptions, canonicals, robots metadata, complete schema, all other meta tags and native SEO settings match the production baselines exactly for both pages. All42 exposed internal page-payload identifiers are unchanged. These identifiers are not a count of sitemap URLs or landing pages.

## Bound source evidence

| Artifact | Home | Gift Cards |
| --- | --- | --- |
| Production renderer pin | 14f2c29fb90895f5ed83a045c5c547414b5bcf3f | 31efcebfba63781e29d53f2eebc4471b6065bec9 |
| Production renderer SHA256 | 29456a91fb2b165178020e792fff13686bb78c08de9fdb078022c98f7b25c811 | 295f8f8d0373697d66e1f382c2810783b05b6959632acecb6e7478c0eabcfe7b |
| Production body/SEO SHA256 | abb3069b9579dee11365400bde9ed17f332108880435c26d097e0bd12d519c63 | b0ff6ceb905e07338e491ab8586b56e710c5ac04a319224bef628afada5c9786 |
| Production original page-code SHA256 | 1826d867815a28a2c3a1673a50cb78418145807dabacaa5c3218b03dc239a165 | 0353e054468ffa9d7eefa61f6935c3baa72bb198885d2123d8066d0b79b53477 |

Public Home startup part1 candidate SHA256: **d3418a93d083556987ecdaf62ee34dc068af7867821abb11d635ac491cb21a7b**. Combined startup body SHA256: **8be11bec8b2dc5cff98c2b51e29c01b33e4034427eaa3c8304029ffff1913864**. Other custom-embed content, metadata and settings are preserved.

## Saved/tested versus released

The prior source review verified **Test Site1318**: Home external renderer pin0f15614f0dd0fe8bf425bd0a3b04e7b99ee86a3a; Gift revised renderer pin379632446b389709772a28dffa9991649b11df0b; exact candidate page code and body/SEO parity; synchronized Home startup content. The native production site remains1309. The full two-page source/SEO release must not be described as published.

The automated candidate-equality checks in verification.json intentionally fail for the old production renderer/SEO/page-code values; this is the expected held state. See the original detailed receipt and the prior Test Site reviewed findings for exact comparisons. This concise review contains no raw request tokens, session values or signatures.
