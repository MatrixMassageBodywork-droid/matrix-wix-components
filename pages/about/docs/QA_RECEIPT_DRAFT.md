# Matrix About page — QA and checkpoint receipt

**DRAFT RECEIPT · 2026-11-12 · America/Chicago**

Native execution is in progress. This document records completed source checks and the evidence required to close installation. It does **not** assert that Wix is saved, tested, or published. Replace pending fields only with observed results; retain a failed or unavailable check as such.

## Identity and source

| Field | Exact value |
| --- | --- |
| Site | Matrix Massage & Bodywork |
| Site ID | `cdec8df6-d518-4859-9f1e-f06bf5346d41` |
| Existing About page ID | `yzabl` |
| Permanent URL / canonical | `https://www.matrixmassage.net/about-5` |
| Editor document | `a276c9bf-bc17-4680-959b-a24ebe7370f6` |
| Design revision | `about-review-2-2026-11-12` |
| Repository path | `pages/about/` |
| Source commit | `4007f84c19eef7d7d1183f567a1d0ef5b42f3478` |
| Custom-element ID | `matrixAboutPage` |
| Custom-element tag | `matrix-about-page` |
| Renderer | `https://cdn.jsdelivr.net/gh/MatrixMassageBodywork-droid/matrix-wix-components@4007f84c19eef7d7d1183f567a1d0ef5b42f3478/pages/about/review-2/renderer.js` |
| Renderer bytes / SHA-256 | `26683` / `b764d50f3aca55c7c43b1d55b17ae5c1b9e6be7e3a43065e49c35cd155da9761` |
| Body SHA-256 | `c0758bfbb263dcc813d8b0a771aeb27d68f3d99e6e918fa4463da7b867a823ba` |
| Merged page-code candidate SHA-256 | `9479cf134e5805413d968e4cef0115f572fe0d29b85813aedb126a108e583c9e` |

Source commit: [GitHub checkpoint](https://github.com/MatrixMassageBodywork-droid/matrix-wix-components/commit/4007f84c19eef7d7d1183f567a1d0ef5b42f3478). Keep CDN retrieval/readback evidence with the installation receipt; the URL alone is not proof of availability or installation.

## Scope and preservation

Replace only the two verified, obsolete About-local sections:

- `comp-mc9xyjtn`: portrait, old “Hello” heading, introduction, and page-local Social Bar containing Wix default profiles.
- `comp-mc9xyju5`: old story/service copy, MassageBook destination, and old Instagram handle.

Preserve `SITE_HEADER`, `SITE_FOOTER`, shared navigation/theme, permanent route, canonical/indexing behavior, unrelated pages and drafts, CMS, analytics, integrations, permissions, and automations. There were no native reviews on About in the captured baseline. Do not remove or alter genuine reviews elsewhere. An unexpected new section, changed code, or concurrent edit requires a targeted review before that affected mutation continues.

The existing owner portrait is unchanged: `https://static.wixstatic.com/media/e4cc43_3cc3a5eeb061404aac3c6714d22cdb8f~mv2.jpg` (633 × 785; original SHA-256 `bb6a778a61f29d9e3d2717768d6bba057d274f05271b97ac518b7d70117e78bb`).

The approved logo is unchanged: `https://static.wixstatic.com/media/e4cc43_c35a32fb07bc4445bb822ed185350e25~mv2.jpg`. Main-page treatment is centered, visually larger than the H1, in a white panel with a black border. Original water and its verified display derivative are recorded in `asset-map.json`.

## Completed checks and their limits

| Check | Recorded result | Evidence |
| --- | --- | --- |
| Review-2 build | BUILT / STATIC CHECKED; one H1, valid unique IDs, valid fragment destinations | `review-2/build-manifest.json` |
| Content | Existing portrait, current service scope, concise origin story; no invented prices, qualifications, or treatment guarantees | `review-2/body.html`; `baseline/about-text.txt` |
| FAQ correspondence | Seven questions/answers exactly match visible text; existing FAQ identity retained in candidate | `seo/qa-results.json`; `seo/faq-schema.json` |
| Schema candidate | AboutPage, Person, HealthAndBeautyBusiness, BreadcrumbList; connected references; one FAQPage | `seo/schema-graph.json`; `seo/qa-results.json` |
| API execution guard | Local mock checks passed; no live Wix write established by them | `seo/execution-guard-qa.json` |
| HTTP link reachability | Square, Maps, Matrix service URLs, and Instagram returned HTTP 200 | `qa/link-check.json` |
| Facebook link | Request reached Facebook login; destination business identity still needs live confirmation | `qa/link-check.json` |

An HTTP 200 does not prove correct profile identity or successful booking. Static checks do not establish visual layout, Wix save state, mobile behavior, indexing, ranking, or publication.

## Native installation acceptance checklist

Record pass/fail/not tested, timestamp, and evidence file for each item.

### 1. Exact source and saved draft

- [ ] Confirm site/page IDs above and record current save state and unrelated pending drafts.
- [ ] Reopen custom-element settings: source equals the immutable URL above; tag is `matrix-about-page`; element ID is `matrixAboutPage`. Record the actual generated native component ID and section ID.
- [ ] Retrieve renderer bytes and match the recorded size and SHA-256. No mutable branch URL is installed.
- [ ] Reopen page code and compare with `WIX_PAGE_CODE_MERGED_CANDIDATE.js`; retain readback file/hash and comparison method. Full visible body is assigned to the correct element’s `.seoMarkup`; no prior code or handlers are lost.
- [ ] Native Stretch is full width with zero side margins. Record actual desktop/mobile element and section dimensions.
- [ ] Save, leave/reopen the page or settings, and verify persistence. A timeout is resolved by checking persisted state before retrying.
- [ ] Remove only the two enumerated obsolete sections after the replacement renders. Verify shared header/footer/navigation remain intact and no second About body/H1 remains.
- [ ] Fill `seo/native-about-installation-evidence.json` from its template using actual observations. Keep the source pin and all source hashes exact; never mark template flags true without evidence.

### 2. Responsive, visual, and functional behavior

- [ ] Full-page proof at 1280, 1440, and 1920 CSS px: body left edge 0; right edge within 2 px of content viewport; no horizontal overflow or side gutters.
- [ ] Proof at 320 and 390 CSS px: single-column flow, readable text, intact portrait, full logo artwork, usable buttons, no clipped text or overflow.
- [ ] Check Wix’s native mobile layout separately. Identify whether the test is native mobile preview, live mobile user agent, or a physical device; a narrow desktop viewport is not equivalent evidence.
- [ ] Scroll through the entire page to load images; verify original portrait, approved logo, and water. Photograph proportions are preserved. Main logo is larger than the H1, with a 6 px desktop / 4 px mobile border.
- [ ] Open each of the seven FAQs, then open all together. Content, following sections, and footer flow without clipping, overlap, or a large blank band. Record closed/open component heights and the footer gap.
- [ ] Keyboard navigation reaches every link and FAQ; focus is visible; Enter/Space operates summaries. Test all four jump links and verify target headings are visible.
- [ ] Capture representative desktop/mobile screenshots and full-page evidence. Record viewport and page revision; screenshots alone do not establish save or SEO status.

### 3. Exact destinations

| Link | Required destination / expected result |
| --- | --- |
| Online booking | `https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services` — Matrix’s current service menu; no booking submission |
| Website booking page | `https://www.matrixmassage.net/book-appointments-salem-wi` |
| Text | `sms:+12629399325` — compose target only; do not send a message |
| Facebook | `https://www.facebook.com/411300892070855` — Matrix Massage & Bodywork – Wisconsin; record login wall as NOT VERIFIED if identity cannot be read |
| Instagram | `https://www.instagram.com/matrixmassagewi/` — visible handle `matrixmassagewi` |
| Directions | `https://www.google.com/maps/dir/?api=1&destination=24804+75th+St%2C+Salem%2C+WI+53168` — 24804 75th St, Salem, WI 53168 |
| Internal services | Exact URLs listed in `review-2/build-manifest.json`; resolve to the intended existing service pages |
| Inbound discovery | Existing homepage contextual About links and shared ABOUT navigation still reach `/about-5`; no homepage edit is required for these existing links |

- [ ] No About-visible, hidden FAQ, page-code, or schema reference to MassageBook, `@matrix.massage.bodywork`, the old Facebook ID, or default Wix social profiles remains.
- [ ] External profile/directions links open as intended; a login page does not count as verifying the business identity.

### 4. Native SEO draft and release checks

Apply the guarded draft candidate only after the matching body is saved/read back. Use `publish:false`; preserve fresh unrelated tags. Save before/request/accepted-response evidence and reopen/read native fields.

| Field | Acceptance value |
| --- | --- |
| Title | `About Matrix Massage & Bodywork | Salem, WI` |
| Description | `Meet DaNelle, licensed massage therapist and owner of Matrix Massage & Bodywork in Salem, WI. Discover our story, care philosophy, and spa services.` |
| Canonical | `https://www.matrixmassage.net/about-5`, unchanged |
| Robots/indexing | No added `noindex`, `nofollow`, or `none`; preview-only robots never copied into production |
| H1 | Exactly one: `About Matrix Massage & Bodywork` |
| FAQ | One FAQPage; seven exact visible pairs; native identity `Bp05JGMH` replaced in place |
| Graph | AboutPage, Person, HealthAndBeautyBusiness, BreadcrumbList matching visible facts; correct studio socials on the business entity |
| Social metadata | Intended title/description resolve correctly; existing social-image inheritance remains intact |

- [ ] Capture native SEO readback, all JSON-LD parse results, graph references, counts, and FAQ text comparison. A draft API response is not public release evidence.
- [ ] Publication occurs only with explicit approval for this revision and the full set of changes the site-wide Publish will release.
- [ ] If approved and published, retain Wix’s success confirmation/time and verify the permanent URL serves the new revision and exact renderer pin. Check public title, description, canonical, robots, one H1, crawlable body, and schema independently of the editor.
- [ ] Recheck public desktop/mobile page flow and key destinations after publication. Report untested surfaces directly; do not infer indexing, rich results, AI inclusion, or rankings from markup validity.

## Final receipt fields — complete from evidence

- **Status:** DESIGNED / SAVED / VERIFIED / TESTED / PUBLISHED / BLOCKED / NOT TESTED — select only supported states.
- **Native save timestamp and revision:** PENDING.
- **Observed native section/component IDs and dimensions:** PENDING.
- **Readback source/tag/code hashes and evidence:** PENDING.
- **SEO draft applied/read back:** PENDING; include before/after file paths and accepted native schema identities.
- **Responsive/FAQ/keyboard/image results:** PENDING; distinguish local proof, native preview, and live tests.
- **Social identity verification:** PENDING; retain any login-wall limitation.
- **Shared boundaries and unrelated draft disposition:** PENDING.
- **Publication:** NOT ASSERTED. Owner approval, native confirmation, publication timestamp/revision, and public verification are required before changing this field.
- **Verified GitHub receipt commit and canonical Drive receipt URL:** PENDING; source commit above remains immutable.
- **Remaining action / exact blocker:** PENDING.

## Factual prerequisites still awaiting execution evidence

Actual newly created native component/section IDs, saved page-code readback, persisted source/tag/stretch values, rendered dimensions, native/mobile screenshots, FAQ height behavior, completed SEO write/readback, Facebook profile identity, and any eventual publication authorization/confirmation are not established by this document. The template evidence file remains unfilled until the executor records those observations. No missing owner biography, portrait, address, booking destination, or service facts requires asking the user to repeat information already captured.
