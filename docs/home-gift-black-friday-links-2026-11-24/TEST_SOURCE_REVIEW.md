# Home and Gift Cards — Test Site source review

**Revision1318: the approved sources, complete bodies/SEO mirrors, deployed page code, Home startup copy and existing links are verified.** The original strict receipt is retained with one equivalent root-URL metadata serialization difference described below.

## Exact candidates observed

| Page | Renderer SHA256 | Complete body/SEO SHA256 | Original page-code SHA256 |
| --- | --- | --- | --- |
| Home | 3180efff9d1595d30c3551c8e1e01199f97911c75c2dd4c0a2cf723f9022b1ca | 8be11bec8b2dc5cff98c2b51e29c01b33e4034427eaa3c8304029ffff1913864 | c430696ba6464596e2e77619ba4bf76f845219c59c57b3c552a03ccae670f806 |
| Gift Cards | a1a55fb63ed305188767bb18248aa8414b8486c8ebc9fa14c84b498361bbf9a3 | 58dc55cb3f6c20c884b0a5aeb0f2adbc50e836d15a65302cae887de9035e2423 | 0c50c14a8f96534b3fac7b8a75e31783d0aa6093a2a8fa2769f5e16e38afdbb0 |

Home source uses immutable commit0f15614f0dd0fe8bf425bd0a3b04e7b99ee86a3a; Gift uses379632446b389709772a28dffa9991649b11df0b. Home startup embed f222d34c-8cac-4b08-af23-5b47c7451c20 matches exact candidate SHA256d3418a93d083556987ecdaf62ee34dc068af7867821abb11d635ac491cb21a7b. Its combined startup body equals the Home body/SEO candidate. All other custom-embed content, metadata and settings are unchanged.

Home has38 links versus37 before; Gift has19 versus18. Each contains exactly one new “View Black Friday spa offers” link to the approved permanent campaign URL, with target _top. Every prior link's attributes, text and order remain unchanged. H1, image attributes, IDs and FAQ counts are preserved. Gift's new anchor alone contains style="text-decoration:underline". Renderer and deployed page-code bodies are exact matches.

## Metadata finding

Titles, descriptions, canonical links, robots meta, complete schema (including raw schema strings), native SEO configuration and all Gift meta tags are unchanged. No current X-Robots-Tag header was present. Home's sole strict all-meta mismatch is og:url: the previous value was https://www.matrixmassage.net and the Test Site value is https://www.matrixmassage.net/. These identify the same root HTTPS URL; native SEO configuration and canonical remain exact. The strict comparison flag is left visible in verification.json. This does not warrant a source/SEO edit. Home baseline HTTP headers were not captured, so no exact historical HTTP-header comparison is claimed.

## Configuration scope

Each target page's complete feature payload differs from1309 only in its approved renderer URL. The shared master payload is exactly unchanged for both observed request variants when each is compared with its own baseline. The original Gift comparison against Home's Desktop baseline produced five isMobile differences; the corrected Gift/Other baseline comparison has zero differences and is preserved separately in shared/master-features-diff-1-correct-baseline.json.

The exposed internal page-payload inventory contains42 entries before and after. Only Home ghmgt, Gift t538a and shared masterPage identifiers changed; the other39 identifiers are exact. This is not a count of sitemap URLs or landing pages.

Full viewer-model differences are retained. They include Test Site rendering/request context, the release revision, global code-app/bundle references, request/session/signature/CSRF values and Wix experiment flags. Both target page-code source bodies are verified, but global reference changes do not prove every other code body unchanged. Public evidence does not cover all CMS/backend/authenticated settings or unpublished drafts; root's native pending-scope/history review is still needed.

## Evidence and limits

Complete captured pages/resources, public response times, code/source maps, exact SEO bodies and all diffs are beside this note. The combined strict receipt is verification.json; the reviewed assessment is reviewed-findings.json. No permanent-page request, browser action, remote write, transaction or indexing request was performed by this check. Root owns visual/mobile/computed-underline/click QA and publication.
