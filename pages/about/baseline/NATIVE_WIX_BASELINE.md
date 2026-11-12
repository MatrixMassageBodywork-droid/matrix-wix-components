# About page — read-only native Wix baseline
Captured 2026-11-12T15:02:35Z. No live or draft mutations performed.

## Target
- Site: Matrix Massage & Bodywork
- Site ID: cdec8df6-d518-4859-9f1e-f06bf5346d41
- Editor document: a276c9bf-bc17-4680-959b-a24ebe7370f6
- Editor type: WIX_EDITOR (Classic)
- About page item ID and hostPageId: yzabl
- Existing permanent URL and canonical: https://www.matrixmassage.net/about-5

## Native draft SEO observed
- Title: ABOUT | Matrix Massage & Bodywork (TAG_SOURCE_DEFAULT_PATTERN)
- No description tag returned in page tags or resolvedTags.
- No robots tag returned in page tags or resolvedTags.
- Site-wide SEO tags also have no enabled noindex/none directive.
- This establishes no observed native site/page indexing block; it does not establish Google's indexed state.
- Canonical is inherited default and points to the existing About route.
- OG/Twitter social image inherited from existing site image; preserved unless an intentional scoped change is selected.
- Sole page-level override: one enabled JSON-LD FAQPage with 7 questions.
- Native schema identity: meta.schemaType Bp05JGMH, meta.displayName FAQ Schema Markup.
- Booking FAQ still says www.massagebook.com/me/danelle-borglin.
- Public read-only About inspection by the other agent found no visible FAQs. The rebuild must create visible FAQ answers matching the replacement JSON-LD and preserve Bp05JGMH as the replacement native entry.
- No native AboutPage, Person, BreadcrumbList, or LocalBusiness override is present in this page's returned tags.
- Get/List are draft reads. publishStatus PUBLISH_STATUS_UNSPECIFIED gives no live verification.

## Exact supported native SEO contract
Documentation: https://dev.wix.com/docs/api-reference/business-management/seo/skills/manage-a-wix-site-s-seo-tags

List: GET https://www.wixapis.com/promote/seo/v1/item-seo-tags/STATIC_PAGE?paging.limit=100
Get: GET https://www.wixapis.com/promote/seo/v1/item-seo-tags/STATIC_PAGE/yzabl
Set: PATCH same item URL
Body: {"itemSeoTags":{"tags":[COMPLETE_MERGED_TAG_ARRAY]},"fieldMask":"tags","publish":false}
Set replaces tags in full. Preserve fresh Get tags and modify only requested entries. Do not copy resolvedTags/inherited social fields into overrides. Preserve existing FAQ meta identity when replacing children. One Get and one Set in a single execution invocation; retain complete before tags, request and response. For draft-only body preparation, do not publish SEO separately.

Use siteId cdec8df6-d518-4859-9f1e-f06bf5346d41 and scope site for every Wix request. No site ID in body.

## Native layout/code boundary
Two targeted REST documentation searches returned SEO APIs, static-page directory APIs, Editor URL retrieval, app-development components and headless uploads. None supplied a supported Classic Editor document component or Velo page-code read/write endpoint. App components API is for developer app extensions, not the site's existing native elements. Headless upload would be a different architecture and is out of scope.

Therefore the exact current page code, current native sections and element map, draft installation, stretch/margins, Wix native mobile layout and preview require existing Wix Editor access unless the parent finds a documented additional supported capability. This is a capability finding from available tools, not a universal claim that Wix has no internal APIs.

Supported custom-element manual path:
https://support.wix.com/en/article/wix-editor-adding-a-custom-element-to-your-site
Add Elements > Embed Code > Custom Element > Choose Source > Server URL > Tag Name.
Read/save existing About code first and merge only precomputed snippet. Do not replace unknown code.

## Actual observed editor URLs
Editor:
https://editor.wix.com/html/editor/web/renderer/edit/a276c9bf-bc17-4680-959b-a24ebe7370f6?metaSiteId=cdec8df6-d518-4859-9f1e-f06bf5346d41
Preview:
https://editor.wix.com/html/editor/web/renderer/external_preview/document/a276c9bf-bc17-4680-959b-a24ebe7370f6?metaSiteId=cdec8df6-d518-4859-9f1e-f06bf5346d41

## Evidence
- wix-about-native-seo-before.json: all discovered page IDs/default or resolved canonicals, selected About entry, full native page tags and resolvedTags.
- wix-site-editor-baseline.json: exact editor URLs and site-wide SEO response.
- wix-seo-api-reference.md: full official SEO recipe returned by tool.

Status: READ / VERIFIED NATIVE BASELINE; no mutation; no publication; no live editor or native mobile testing.

