# Wellness and Infrared Sauna — native SEO baseline

Captured 2026-11-12 15:30:42 America/Chicago (21:30:42Z). **READ ONLY. No settings changed.** Wix SEO Get/List returns saved draft configuration; it does not itself establish published page state.

Site: cdec8df6-d518-4859-9f1e-f06bf5346d41. Editor document: a276c9bf-bc17-4680-959b-a24ebe7370f6.

## Exact identities and existing metadata

| Page | Native ID | Permanent URL |
| --- | --- | --- |
| Wellness main | hfzq0 | https://www.matrixmassage.net/wellness-biotech-services-salem-wi |
| Infrared Sauna | nf4iw | https://www.matrixmassage.net/infrared-sauna-salem-wi |

Wellness title: **Wellness Services in Salem, WI | Sauna, Red Light & Recovery**

Description: Explore wellness services in Salem, WI including infrared sauna, red light therapy, recovery enhancements and hands-off wellness at Matrix.

Sauna title: **Infrared Sauna in Salem, WI | Matrix Wellness & Recovery**

Description: Book a private infrared sauna session in Salem, WI for warmth, relaxation and recovery-focused wellness at Matrix Massage & Bodywork.

These already match page intent; preserve them unless the reviewed copy warrants an intentional change. Both page URLs and canonicals are established and must remain unchanged. Wellness canonical is an explicit HOST_PAGE tag; Sauna canonical is inherited from DEFAULT_PATTERN.

Neither page currently returns a robots override. Absence alone is not proof of Google indexing; retain public robots/sitemap/crawler checks separately.

## Native schema identity map

| Page | Existing schema | Native schemaType | Action |
| --- | --- | --- | --- |
| Wellness | HealthAndBeautyBusiness | clav5h85 | Preserve identity; align facts to visible/current offerings; fix image URL |
| Wellness | OfferCatalog | 4rWCmYq6 | Preserve identity; add exact existing service URLs and current visible entries |
| Wellness | BreadcrumbList | no meta schemaType | Preserve tag and existing Home → Wellness trail |
| Sauna | Service | 6e4jQmZM | Preserve identity; retain provider, service purpose and URL |
| Sauna | BreadcrumbList | U6QYwSDN | Preserve identity; may extend trail to Home → Wellness → Infrared Sauna when visible trail matches |

No native FAQPage is present on either page. Add exactly one FAQPage per page derived from final visible FAQ copy.

Wellness business schema currently uses `image: "https://www.matrixmassage.net"`, which is a webpage rather than an image. Replace with a verified real photo or the exact approved logo image used visibly. Its description mentions wellness memberships; the catalog also claims Wellness Labs and Testing. Match these to verified currently available offerings and actual new page content; do not silently carry unfinished plans into schema.

For shared entity consistency, the published About source uses `https://www.matrixmassage.net/#business` for HealthAndBeautyBusiness named Matrix Massage & Bodywork. A Wellness-specific display name can be represented as alternateName if visible and accurate. Use the shared @id rather than fabricating a second physical location. Do not classify the studio as MedicalClinic.

## Social and preservation boundary

Both pages inherit the same site social image:
https://static.wixstatic.com/media/e4cc43_1f95ca8ef19e4c3bac37ea7c46af4134%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/e4cc43_1f95ca8ef19e4c3bac37ea7c46af4134%7Emv2.jpg

Keep inherited images unless a specific reviewed replacement is intended. Wellness OG/Twitter title/description derive from SEO values. Sauna has explicit OG title/description, and Twitter derives from those:

- OG title: Infrared Sauna in Salem, WI | Matrix
- OG description: Private infrared sauna sessions for relaxation and recovery-focused wellness at Matrix in Salem, Wisconsin.

Preserve complete existing tags, current focusKeywords, and unrelated schema. Do not copy resolvedTags into tags; it freezes inherited values and can duplicate entries. Do not change site-level or pattern-level tags, global robots, unrelated routes, or social profiles.

## Draft-only metadata execution contract

A precise complete candidate must be generated after final body/FAQ files exist and body installation is verified. This task currently authorizes redesign and draft save; it has no new-page publication approval.

Documentation read:
- https://dev.wix.com/docs/api-reference/business-management/seo/skills/manage-a-wix-site-s-seo-tags
- https://dev.wix.com/docs/api-reference/business-management/seo/item-seo-tags-v1/bulk-set-item-seo-tags

For two pages use the supported Bulk Set endpoint:
`POST https://www.wixapis.com/promote/seo/v1/bulk/item-seo-tags/set`.

In one execution invocation:

1. GET both targets from `https://www.wixapis.com/promote/seo/v1/item-seo-tags/STATIC_PAGE/{verifiedItemId}`.
2. Require expected page ID/canonical, preserved baseline tags, and no newly appeared conflicting FAQ or replacement schema IDs. If state changed, return fresh evidence and do not write.
3. Merge each page's intentional changes into its own complete fresh `tags`, keeping all unrelated tags.
4. Submit one named request body:
   `{ itemType: "STATIC_PAGE", publish: false, returnEntity: true, entries: [{ itemId, itemSeoTags: { tags }, fieldMask: "tags" }, ...] }`.
5. Preserve both GET tag arrays, full request and returned row metadata. Match results by `itemMetadata.originalIndex` and returned ID, not array order. Success requires `itemMetadata.success === true` and no error.
6. Report from accepted response; do not issue a second verification API call just to recover information already returned. Independent native/body/public QA has its own scope.
7. If a timeout/uncertain result occurs, verify saved state before considering retry. Do not repeat successful rows or publish anything as recovery.

A later explicit publication approval allows the exact saved/reviewed revision. Page-body publishing and SEO metadata publishing are separate layers in this Classic site. The prior About release needed its targeted SEO publish after body publication; preserve that distinction and verify the public head.

## Acceptance checks

- One visible H1 and semantic content; full visible body mirrored in seoMarkup.
- Native FAQPage matches visible questions and complete answers exactly; no duplicate FAQ entries.
- JSON-LD parses; no invented prices, durations, reviews, hours, medical credentials, or offers.
- Service/catalog URLs are canonical existing routes with contextual visible links.
- Correct Square booking URL and text contact.
- Existing canonical, indexing, metadata and social images preserved unless deliberately changed in reviewed specification.
- Breadcrumbs reflect visible navigation.
- Public verification only after explicit authorized publication; draft proof is not evidence of a live change.

## Files

- wellness.json and infrared-sauna.json: exact target native baselines.
- native-seo-baseline.json: all 37 discovered page identities and the two target full baselines, plus adjacent read-only context.

