# Home and Gift Cards — remaining publication instructions

## State and gate

The changes are saved and verified in native Wix Test Site revision 1318 at 0% visitor exposure. Live revision 1309 remains the release baseline. The native Publish action was rejected by automatic approval review because the current user wording did not clearly and explicitly approve this specific production publication. Do not retry it, use an API publication route or change exposure until the owner explicitly approves publishing the verified Home and Gift Cards changes to the live Matrix website.

The Home startup Custom Embed is separately saved and verified at revision 2. It must not be re-applied. The production-held review records whether the live 1309 response currently contains it. Do not infer the state of either full page from that embed alone.

## Preparation already complete

Read the current canonical checkpoint (Google Doc 1nGRF6PxQ-otAccE9-y9h_dgGopD2qWyXt5m0AywRVpQ), this receipt, the current policy exception, test-source review and native UI QA. Complete source files are archived; immutable CDN responses, deployed original page code, SEO body parity and scope were verified. Desktop 1348 px and native Wix mobile 320 px checks passed. Both test links open the campaign. Do not reinstall components, repeat the Custom Embed PATCH, replace code, redeploy Test Site or rewrite copy merely because a new turn starts.

## Exact remaining operations after explicit approval

1. Resume the existing Wix editor for site cdec8df6-d518-4859-9f1e-f06bf5346d41 and document a276c9bf-bc17-4680-959b-a24ebe7370f6. Inspect Site > Release Manager and Site History read-only. Require the recorded live 1309 / test 1318 relationship and no intervening unexpected edits; if it changed, stop publication and report the observed evidence for a bounded re-evaluation.
2. Close the Release Manager panel. Use the native editor Publish button exactly once. Observe Wix's success confirmation. A click alone is not completion. On timeout, inspect Site History and permanent responses before any retry; do not create a second release blindly.
3. Read Site History or Release Manager and record the actual production revision, America/Chicago date/time and exposure. Preserve test exposure, permissions and all unrelated settings.
4. Use the existing verification/verify_release.py production mode with Home commit 0f15614f0dd0fe8bf425bd0a3b04e7b99ee86a3a and Gift commit 379632446b389709772a28dffa9991649b11df0b. Require both permanent URLs to return 200, the actual new release, exact approved source/code/body hashes, Home startup-body parity, one new campaign link per page and unchanged metadata/schema/old routes. The Home og:url equivalent trailing slash is already documented; do not edit it merely to satisfy strict string equality.
5. Browser live QA is limited to the permanent Home and Gift Cards pages. Confirm their visible new links in CURRENT MATRIX SPECIALS and Holiday Gifts; click each and record the permanent Black Friday destination. No purchase, booking, message or payment is permitted or needed. Mark the most useful verified live result for review.
6. Save the actual publication and production QA receipt. Prepend the current canonical checkpoint under a fresh requiredRevisionId guard; preserve all history. Update the existing receipt rather than duplicating it. Clearly distinguish SAVED, VERIFIED, TESTED and PUBLISHED-RELEASED. Do not claim Google has indexed or ranked a page based on this publication.

## Acceptance and stop conditions

Home body: 38 links, one H1, 11 FAQs; Gift body: 19 links, one H1, 11 FAQs. The one new anchor label on each page is View Black Friday spa offers; href is https://www.matrixmassage.net/black-friday-deals-salem-wi and target is _top. Gift's new anchor is underlined; its adjacent text preserves separate ordinary dollar-value gift-card purchases. Preserve all existing founder/About/review material, prices, old links, integrations, event handlers, component IDs/tags and responsive behavior. Full source hashes are in the receipt.

Stop safely on another approval rejection, an unexpected revision/source/draft, failed publication confirmation, a wrong target, missing visible/SEO body parity or a material layout problem. Record evidence and return for a targeted correction. Do not restore, rebuild, duplicate, bypass the approval gate or release unrelated changes.
