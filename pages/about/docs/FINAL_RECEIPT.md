> Historical prepublication receipt. Owner approval and verified publication followed on November 12, 2026. See [PUBLICATION_RECEIPT.md](PUBLICATION_RECEIPT.md) for current status.

> **Historical saved-draft receipt — superseded for current status.** The owner approved publication with “Perfect. Please publish.” in the current conversation on **2026-11-12**, before the publication request at **15:57:28 UTC**; a separate approval-message timestamp was not captured. The released page and subsequent live SEO/interaction evidence are documented in [PUBLICATION_RECEIPT.md](PUBLICATION_RECEIPT.md). The original draft facts and test scope below are preserved as recorded.

# Matrix About — saved draft and QA receipt

**2026-11-12 · America/Chicago**

**SAVED in Wix draft / VERIFIED / TESTED within the scope below / NOT PUBLISHED.** Native review-3 source, body, page code, seven FAQs, and SEO draft were verified. Publication approval has not been given for this revision.

## Current identity and source

| Field | Verified value |
| --- | --- |
| Site / page | `cdec8df6-d518-4859-9f1e-f06bf5346d41` / `yzabl` |
| Permanent URL / canonical | `https://www.matrixmassage.net/about-5` |
| Revision | `about-review-3-2026-11-12` |
| Source commit | `bf6fc01d51baf3ec797af57f17716860df7754e7` |
| Native section | `comp-mwdp095j` / `matrixAboutSection` |
| Native element / tag | `comp-mwdp0wlp` / `matrixAboutPage` / `matrix-about-page` |
| Renderer bytes / SHA-256 | `27445` / `83b74e29fb4ce88d946109fdb86edfad148d6df7c31ca3f3955ce80a1b325e20` |
| Installed page-code SHA-256 | `68493dfb6b4f2bf28c121027f3facefbce689002b80f8632780d5182205170d3` |

Installed renderer: `https://cdn.jsdelivr.net/gh/MatrixMassageBodywork-droid/matrix-wix-components@bf6fc01d51baf3ec797af57f17716860df7754e7/pages/about/review-3/renderer.js`.

[Immutable source checkpoint](https://github.com/MatrixMassageBodywork-droid/matrix-wix-components/commit/bf6fc01d51baf3ec797af57f17716860df7754e7).

## Changes and preservation

The existing About page now uses the approved cream/deep-teal water style, large framed Matrix logo, unchanged owner portrait, current first-person introduction, concise supporting career-change story, current service links, studio/directions details, and seven visible FAQs. Review 3 replaces ten missing-glyph arrows with CSS-drawn arrows; all wording and FAQ bytes are unchanged from review 2.

Original portrait: `https://static.wixstatic.com/media/e4cc43_3cc3a5eeb061404aac3c6714d22cdb8f~mv2.jpg`; loaded natural size verified as 633 × 785. Approved logo/water provenance remains in `asset-map.json`.

Only obsolete About-local sections `comp-mc9xyjtn` and `comp-mc9xyju5` were removed; neither remained in verification. Shared header/footer/navigation, permanent route, and unrelated pages/integrations were preserved. No native reviews existed on About in the captured baseline.

## Evidence and testing limits

| Check | Result |
| --- | --- |
| Native review-3 draft | Wix displayed “Your changes are saved.” Source/tag, normalized body, byte-exact page code, and seven exact FAQ pairs passed readback. One H1, ten CSS arrows, no old arrow glyphs. |
| Native desktop/mobile | Review-3 source loaded at desktop 1348 px and native mobile 320 px; original portrait loaded. Mobile scroll width was 320 px. This is native preview evidence, not public mobile-UA testing. |
| FAQ interaction/flow | Review 2: all seven FAQs opened through desktop keyboard and mobile click testing; no horizontal overflow; closing section followed FAQ bottom without a gap/overlap and footer flow passed. Review-3 FAQ bytes are identical and all seven rendered pairs were read back exactly. All seven interactions were **not repeated** on review 3. |
| Review-3 proofs | DOM width equaled scroll width at 320, 390, 1280, 1440, and 1920 px. Each had one H1, seven FAQs, and ten arrows. Desktop logo width was 660 px. Wider screenshots were cropped to the browser viewport; they are not full-width 1920 px screenshots. |
| Links | Matrix service/booking URLs, Square, Maps, and Instagram returned HTTP 200. Facebook returned a login page. No appointment or message was submitted. |

Evidence: `qa/native-review-3-readback.json`, `qa/WIX_PAGE_CODE_READBACK.js`, `qa/native-body-readback.html`, `qa/arrow-correction-static-review-3.json`, and `qa/link-check.json`. Additional native/proof evidence currently in `/workspace/shared/`: `about-final-save-confirmation.json`, `about-final-native-mobile-evidence.json`, `about-native-review2-evidence.json`, `about-proof-measurements.json`, and final desktop/mobile/proof screenshots. Include these in the final evidence checkpoint; do not overstate screenshot coverage.

## SEO draft accepted and verified

Exactly **one guarded PATCH** was submitted with `publish:false`. Its accepted response matched the intended payload and preserved protected inherited tags. Evidence: `qa/native-seo-draft-result.json` and `qa/native-seo-draft-verification.json`, captured 2026-11-12 09:43 CST. Verification used the accepted Set response; no second Get, retry, or publication occurred.

- **Title:** About Matrix Massage & Bodywork | Salem, WI
- **Description:** Meet DaNelle, licensed massage therapist and owner of Matrix Massage & Bodywork in Salem, WI. Discover our story, care philosophy, and spa services.
- **Canonical/indexing:** Existing `/about-5` canonical preserved; no robots block introduced; preview noindex instructions not installed.
- **FAQ:** Native entry `Bp05JGMH` replaced in place with seven matching visible pairs; exactly one FAQPage.
- **Graph:** AboutPage, Person, HealthAndBeautyBusiness, and BreadcrumbList matching visible facts.
- **Social metadata:** OG/Twitter title and description resolved correctly; inherited social images preserved.
- **Crawlable body:** Complete `.seoMarkup` matches the visible renderer. Public delivery remains a post-publication check.

## Destinations and social limitation

| Purpose | Destination |
| --- | --- |
| Direct booking | `https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services` |
| Website booking menu | `https://www.matrixmassage.net/book-appointments-salem-wi` |
| Text | `sms:+12629399325` |
| Facebook | `https://www.facebook.com/411300892070855` |
| Instagram | `https://www.instagram.com/matrixmassagewi/` |
| Directions | `https://www.google.com/maps/dir/?api=1&destination=24804+75th+St%2C+Salem%2C+WI+53168` |

Facebook Page ID and Instagram handle are supported by owner-confirmed records. Independent Facebook public identity verification was limited by its login response; HTTP 200 is not proof of the displayed business identity. Existing homepage contextual About links and shared ABOUT navigation already lead to `/about-5`. Service destinations are mapped in `review-3/build-manifest.json`.

## Release workflow — only after approval

1. Confirm approval covers review 3 and inspect unrelated drafts that site-wide Publish would release. Preserve them; stop release if authorization does not cover the pending set.
2. Save a checkpoint; recheck source pin, code, SEO draft, and save state. Do not reinstall or repeat the completed SEO PATCH to resume.
3. Publish once through Wix. Capture native confirmation, timestamp, and published revision. After a timeout, inspect persisted publication state before retrying.
4. Verify the permanent public URL serves this source: metadata, canonical/indexing, crawlable body/one H1, schema/FAQ pairs, original photo, booking/Maps/social/internal links, FAQ/footer flow, and mobile layout. Keep login limitations explicit.
5. Save publication evidence and receipt in GitHub and canonical Drive folder `1jthRMAHOoockNm8hAVBK6mz4iaHbhNK8`. Receipt-only commits do not change the runtime pin.

**Not established:** public deployment of review 3, public mobile-UA QA, Google indexing, rankings, rich results, or AI-search inclusion. This receipt supersedes prior pending-state templates. The parent adds final remote receipt links after verified GitHub/Drive saving.
