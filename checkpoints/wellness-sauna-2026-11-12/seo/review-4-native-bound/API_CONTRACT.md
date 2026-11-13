# Root-controlled SEO draft execution contract

Status: **Prepared and locally validated; not executed against Wix by the preparation task.** Native body evidence is bound. No publication authorization is present; the candidate uses `publish: false`.

## ExecuteWixAPI wrapper

- Tool: `mcp__codex_apps__wix_executewixapi`
- `siteId`: `cdec8df6-d518-4859-9f1e-f06bf5346d41`
- `hasMutations`: `true` for root's eventual draft write.
- `code`: exact complete uninvoked async function expression from `EXECUTE_DRAFT_SEO_CANDIDATE.js`.
- Function SHA256: `aa86872e2f81ba5c7a30add777c08cf0240c040bf2873d59218848a6e529e419`
- Function size: 68,401 UTF-8 bytes.
- `reason`: Save the verified Wellness and Infrared Sauna SEO drafts while preserving native page identity and unrelated metadata.

Documentation URLs for `sourceDocUrls`:

1. https://dev.wix.com/docs/api-reference/business-management/seo/skills/manage-a-wix-site-s-seo-tags
2. https://dev.wix.com/docs/api-reference/business-management/seo/item-seo-tags-v1/bulk-set-item-seo-tags

## REST operations inside the function

Two independent guarded GETs:

- `GET https://www.wixapis.com/promote/seo/v1/item-seo-tags/STATIC_PAGE/hfzq0`
- `GET https://www.wixapis.com/promote/seo/v1/item-seo-tags/STATIC_PAGE/nf4iw`

Then, only if all identity, baseline, protected-head and native-evidence checks pass:

- `POST https://www.wixapis.com/promote/seo/v1/bulk/item-seo-tags/set`
- Site scope, automatic authentication; no manually supplied auth headers.
- Request item type: `STATIC_PAGE`.
- Request `entries`: 2; schema permits 1–100 for this item type.
- Top-level `publish`: `false`.
- Top-level `returnEntity`: `true`.
- Each entry: `{ itemId, itemSeoTags: { tags: <that page's complete freshly merged array> }, fieldMask: "tags" }`.
- `fieldMask` is a comma-separated string in REST, not an array.
- Do not submit `resolvedTags`, language, site-level tags or another item's tag array.
- Existing title/meta/canonical/social tags are unchanged; only reviewed page schema replacements/additions are submitted.

## Response

- Read `response.data.results[]`.
- Correlate each row by `itemMetadata.originalIndex` and check returned identity.
- Success requires `itemMetadata.success === true` without `itemMetadata.error`.
- Accepted entity is `row.item`, containing `tags` and `resolvedTags` when returned.
- Confirm returned tags match the candidate and protected resolved head remains unchanged.
- Return the full GET evidence, full set request, response and per-page outcomes.
- Do not make another GET merely to repeat fields already returned.
- No retry or publication occurs in this function. On incomplete/error/timeout outcomes, root reviews persistence before deciding any correction.

## Local QA performed

- Both native saved code hashes match the actual readback files.
- Both reviewed body hashes and 7/8 FAQ answers match the prepared schemas.
- Existing schema IDs and protected metadata remain preserved.
- JavaScript function syntax passes.
- In-memory mocked unchanged-state case: 2 GETs, 1 POST, two verified draft outcomes.
- In-memory mocked concurrent metadata edit: 2 GETs, 0 POSTs, guard failure.
- These tests made **zero real network or Wix calls** and do not establish that metadata has been saved to Wix.
