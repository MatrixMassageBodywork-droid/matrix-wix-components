# Home and Gift Cards — production release source review

**PUBLISHED-RELEASED / INDEPENDENT SOURCE VERIFIED — revision 1319.** Both permanent URLs returned HTTP 200 and independently identified revision 1319. Root's native Site History confirms one successful publication on November 24, 2026, at 9:02 PM Central (03:02 UTC November 25). Root also confirmed production at 100% exposure and Test Site 1318 still at 0%.

Source verification ran from **2026-11-25T03:03:51.114795+00:00 through 2026-11-25T03:04:22.719811+00:00**. This was one production verification run; no additional public requests were needed after reviewing its captured differences.

## Complete source and content parity

Home uses renderer commit **0f15614f0dd0fe8bf425bd0a3b04e7b99ee86a3a**. Gift Cards uses **379632446b389709772a28dffa9991649b11df0b**. The actual externally bound files, complete public SEO bodies and original deployed page code extracted from their source maps exactly match the approved candidates.

| Artifact | Home SHA256 | Gift Cards SHA256 |
| --- | --- | --- |
| Renderer | 3180efff9d1595d30c3551c8e1e01199f97911c75c2dd4c0a2cf723f9022b1ca | a1a55fb63ed305188767bb18248aa8414b8486c8ebc9fa14c84b498361bbf9a3 |
| Complete body / SEO | 8be11bec8b2dc5cff98c2b51e29c01b33e4034427eaa3c8304029ffff1913864 | 58dc55cb3f6c20c884b0a5aeb0f2adbc50e836d15a65302cae887de9035e2423 |
| Original page code | c430696ba6464596e2e77619ba4bf76f845219c59c57b3c552a03ccae670f806 | 0c50c14a8f96534b3fac7b8a75e31783d0aa6093a2a8fa2769f5e16e38afdbb0 |

Home's startup embed **f222d34c-8cac-4b08-af23-5b47c7451c20** also matches candidate SHA256 **d3418a93d083556987ecdaf62ee34dc068af7867821abb11d635ac491cb21a7b**. Its combined startup body now agrees exactly with the published Home renderer and SEO body. Every other custom-embed body, metadata field and setting is unchanged.

Home has 38 links; Gift has 19. Each has exactly one new “View Black Friday spa offers” link to https://www.matrixmassage.net/black-friday-deals-salem-wi with target _top. All previous links, their attributes/text/order, images, IDs and FAQ content are preserved. Each approved body has one H1 and 11 FAQs. Gift's new anchor contains the approved underline style; its five purchase links, one balance link and one reload link are unchanged. The separate regular dollar-value gift-card wording is present.

## Metadata and configuration review

All titles, descriptions, canonicals, robots metadata, native SEO configuration, complete schema and other captured meta tags exactly match the baseline. No X-Robots-Tag header was returned. **The previously documented Home og:url slash exception is absent in this production observation; strict equality passed.**

Each page's complete feature payload differs from revision 1309 only at its intended renderer URL. Both shared-master feature payloads have zero differences against their own request-matched baseline variants. The exposed internal page-payload inventory remains 42 entries: only Home, Gift and shared master identifiers changed, while the other 39 are exact. This is not a sitemap URL count.

The verifier conservatively flagged 21 additional viewer-model fields. Captured diffs classify them as **10 platform experiment entries, 3 per-request CSRF values and 8 dynamic-router references to the verified deployment's code-app identifier**. Both target code bodies match the candidates; the code-app identifier is the same deployment used in Test Site 1318. These flags do not reveal an extra authored change in the compared page/master feature payloads. Their paths and classifications are recorded in reviewed-findings.json without raw request values or signatures.

This bounded comparison does not prove every other code body, CMS/backend/authenticated setting or unpublished draft unchanged. Root's native unchanged-state check and browser QA provide separate evidence. Root reports both permanent campaign clicks passed without a test query, Home and Gift rendered at 1348 px without horizontal overflow, and the Gift link was visibly underlined. No transaction or indexing change is claimed.

Detailed captured evidence remains in verification.json and its page/shared subfolders. This concise review contains no raw tokens, session values or request signatures. No publication or other mutation was performed by this subagent.
