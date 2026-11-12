# Native SEO draft candidate preparation

**No mutation or publication has been executed by these files.** The candidate is hardcoded to `publish: false` and has a native body readback evidence gate.

## Current verified supplement route

Use `https://www.matrixmassage.net/supplements` (native page `aeh8h`; public HTTP 200). The proposed longer path `/supplements-wellness-salem-wi` returns HTTP 404 and is not in the native inventory.

## Generate after both final builds exist

Run the generator against the finished body, FAQ and build manifest files:

```sh
python /workspace/scratch/6f987ab79794/matrix-wellness/seo-baseline/generate_draft_patch.py \
  --out /workspace/scratch/6f987ab79794/matrix-wellness/seo/review-1
```

Default body directories are `main/review-1` and `infrared-sauna/review-1`. Override `--wellness` or `--sauna` for a subsequent review. Each output directory must be new.

This checks visible FAQ extraction against the exact build FAQ, manifest/body hashes, expected canonical/title/description, contextual destination links, visible brand identity, and protected non-script metadata. The native schema IDs are retained. The $35/30-minute Sauna add-on Offer is included only if the final visible body and current captured Square service record both support it.

The resulting candidate returns `NOT_EXECUTED_NATIVE_BODY_EVIDENCE_REQUIRED` before any network request until installation evidence is supplied.

## Native installation evidence

After root independently verifies exact installed native body/code/source for both pages, create a JSON evidence file using actual readback facts:

```json
{
  "status": "NATIVE_BODY_READBACK_VERIFIED",
  "pages": [
    {
      "pageId": "hfzq0",
      "pageUrl": "https://www.matrixmassage.net/wellness-biotech-services-salem-wi",
      "bodySha256": "<exact reviewed body SHA256>",
      "nativeCodeSha256": "<exact installed page code SHA256>",
      "nativeElementId": "<observed Wix element ID>",
      "sourceUrl": "<observed immutable jsDelivr renderer URL>",
      "readbackVerified": true
    },
    {
      "pageId": "nf4iw",
      "pageUrl": "https://www.matrixmassage.net/infrared-sauna-salem-wi",
      "bodySha256": "<exact reviewed body SHA256>",
      "nativeCodeSha256": "<exact installed page code SHA256>",
      "nativeElementId": "<observed Wix element ID>",
      "sourceUrl": "<observed immutable jsDelivr renderer URL>",
      "readbackVerified": true
    }
  ]
}
```

Generate a new execution candidate with `--installation-evidence /absolute/path/to/evidence.json`. Do not fill placeholders or mark verification true without the matching objective evidence.

## Root-controlled execution

Only root executes after reviewing the final copy, schema, protected tag diff and native readback. Send the complete candidate function expression through ExecuteWixAPI with selected site `cdec8df6-d518-4859-9f1e-f06bf5346d41`, `hasMutations: true`, and the documentation URLs in README.md.

The function reads both pages once, rejects identity/canonical/tag/head drift, merges only prepared schema replacements/additions into each fresh full tag set, and sends exactly one bulk draft request. It returns the full GET evidence, submitted request, API response and per-page outcomes. It reads the documented response row `item` and correlates rows using `itemMetadata.originalIndex`.

No request is retried. On a timeout, error or incomplete per-row response, review the actual persistence evidence before designing a correction. Do not publish as a recovery action. A later explicit owner publication approval requires independent scope review and public-page SEO verification.
