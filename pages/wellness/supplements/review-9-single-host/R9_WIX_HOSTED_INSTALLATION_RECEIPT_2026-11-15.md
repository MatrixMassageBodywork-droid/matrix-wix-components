# Matrix Supplements R9 — Wix-hosted draft installation receipt

**Project:** FACIAL WEB SEO PW  
**Verified:** November 15, 2026, America/Chicago  
**Outcome:** SAVED PARTIAL DRAFT / SOURCE AND BINDING VERIFIED / NATIVE MOUNT TEST FAILED / NOT PUBLISHED.

The exact approved R9 renderer is now saved in Wix, and one custom element is bound to it using **Velo File**. Native desktop and 320-pixel mobile Preview both produce an empty `matrix-supplements-page` element. The prescribed Checkpoint C.6 stop condition was followed: the old page remains intact, the original starter page code is unchanged, and no publication or Test Site release occurred. Full page installation is **not complete**.

## 1. Site and revision evidence

| Field | Observed value |
| --- | --- |
| Wix site | `cdec8df6-d518-4859-9f1e-f06bf5346d41` — Matrix Massage & Bodywork |
| Editor document | `a276c9bf-bc17-4680-959b-a24ebe7370f6` |
| Existing page | `aeh8h` — SUPPLEMENTS & WELLNESS |
| Existing route | `/supplements`; unchanged |
| Pre-install saved revision | **1195**, November 14, 2026, 8:59 PM CT |
| Source-only saved checkpoint | **1196**, November 15, 2026, 8:33 AM CT |
| Final saved draft | **1199**, November 15, 2026, 8:41 AM CT |
| Latest publication | November 14, 2026, 3:37 PM CT; unchanged before/after |
| Publication in this task | **NO**; Publish and Test Site release were not used |

Revision 1199 was independently read from the Site History preview iframe's native revision URL and the associated saved-time row. The history preview shows the homepage by default; its screenshot is revision evidence, not a Supplements visual acceptance result.

## 2. Exact source — SAVED and VERIFIED

| Item | Result |
| --- | --- |
| New Wix file | `public/custom-elements/matrixSupplementsR9.js` |
| Approved immutable source commit | `5bdcbe560b11e4b5573193f9517c80bcbeed8cf6` |
| Renderer size | **48,990 UTF-8 bytes** |
| SHA-256 | `63f0f0f35c3968b1855f20eae09244c02bf690c4fae55c6cc86bbc97518b6706` |
| Saved-source verification | Reopened after Save and editor reload; complete clipboard readback, with CRLF normalized to LF, exactly equals the approved source |
| First line | `/* Matrix R9: one native Wix custom-element host; nested monthly cart always CLOSED. */` |
| Last nonblank line | `})();` |
| Local syntax | Renderer and supplied page-code candidate both pass `node --check` |
| Existing public files | Preserved, including `wix-default-custom-element.js` |

Only the new public renderer file was created. No approved renderer bytes were modified.

## 3. One native host — SAVED and VERIFIED

| Property | Read-back result |
| --- | --- |
| Velo element ID | `matrixSupplementsPageV1` |
| Native element ID | `comp-mwhxvav5` |
| Tag | `matrix-supplements-page` |
| Source mode | **Velo File** |
| Selected file | `matrixSupplementsR9.js` |
| Native host count on page | **1** |
| New parent section | `comp-mwhxubu7`, Velo ID `section5` |
| Placement | Immediately above existing testimonials, below retained old content |
| Desktop editor size | W 980 × H 384; X 0, Y 2933 |
| New section size/position | H 500; Y 2875 |
| Stretch | Enabled; side margins 0 |
| Additional native cart | None |

Source mode, filename, tag and ID were closed/reopened and read back after saving. The initial default tag did not persist on the first text entry; it was corrected using native keyboard entry, then saved and re-read successfully before testing.

## 4. Native QA — TESTED, FAILED AT MOUNT

| Check | Result |
| --- | --- |
| Desktop native Preview | **FAIL — empty host**. Measured host width 1064.8 px, height 384 px |
| Native mobile Preview | **FAIL — empty host**. Wix mobile width 320 px; automatically generated host height 125 px |
| Custom-element DOM | Correct `MATRIX-SUPPLEMENTS-PAGE`; zero children; innerHTML length 0; no `data-matrix-mounted` attribute |
| First-party source assignment | Preview script element points to Wix's `dev.wix-code.com/custom-elements/matrixSupplementsR9.js` path |
| Console | Wix Preview/login limitations and existing Maps warnings observed; no captured error establishes the renderer failure's cause |
| Testimonials | Visible in desktop and mobile Preview; preserved |
| Complete R9 design | **NOT TESTED**: logo/water, two feature cards, nested CLOSED cart, FAQs, links and H1 cannot be accepted because the host did not mount |
| Required 1280/1440 and 375/390 checks | **NOT TESTED** after the render stop |
| Full-width content/clipping/gap QA | **NOT PASSED**; no content-height tuning was attempted after blank mount |
| Anonymous visitor safety | **NOT TESTED**; no unpublished anonymous test surface was established, and none was created by publishing or releasing a Test Site |
| Native nested CLOSED attributes | **NOT TESTED** because no nested element mounted; the unchanged approved source retains CLOSED / empty-catalog configuration |

The Wix source URL's authentication query was deliberately excluded from the receipt and evidence package. A DOM script source assignment is not proof that the script downloaded or executed successfully. The cause remains **not established**. No new host, alternate service, security change or code workaround was attempted.

## 5. Preserved page code and sections

The existing starter page code was copied before installation and again after the final save; normalized text was identical. Its normalized 382-byte SHA-256 is `8c4b9e448a92ffb860ed536bb58e9ecfdb7b877b3a7c60c0f28f5aeaf18f4355` (no final newline in the copied text).

The approved first-install candidate remains **NOT INSTALLED**: 20,539 bytes; SHA-256 `43d0c664a1cf751fb4cb44a19d11ec0ae600cd9e83970cdc428031c184e0a185`.

All eight scoped native IDs were present in final desktop DOM readback:

- Old hero `comp-mexcv2yg`
- Old intro `comp-mexcv316`
- Old protocol cards `comp-mexcv32a1`
- Unclassified sections `comp-mexcv3141`, `comp-mexcv31t`, `comp-mpq2lvoh`
- Protected testimonials `comp-mexcv396` and nested `comp-mexcv39b1`

**Sections removed: zero.** Shared navigation, header/footer, existing SEO settings, slug, other pages and installed backend source were not edited. No claim is made that unrelated historical drafts were reconciled.

## 6. Read-only safety verification

| Check | Fresh evidence |
| --- | --- |
| Private Wix catalog | **3** records, all `TEST_ONLY_NEVER_PUBLIC`, all `publicSlot=NONE`; update timestamps predate this installation |
| Private Wix intake | **1** existing synthetic record; no new request |
| Tracker cart intake | **3** synthetic rows |
| Invoice Queue V2 | **3** synthetic rows; create and email gates **OFF** in all rows |
| Existing refunded Sandbox fixture | Tracker still reports **HOLD**, refund **COMPLETED**, paymentEligible false, ownerRelease NOT_APPROVED |
| Wix automation | `Matrix Supplement Intake V2 — STAGING OFF`; inactive draft with Activate available and Save disabled; no Test/Activate action |
| Apps Script triggers | Native screen reports **0 triggers** |
| Existing additive files | `CatalogRulesV3.gs`, `CatalogSyncV3.gs`, and `supplementCatalogV3.web.js` present; prior V2 files also present |
| Apps Script executions | Latest displayed execution remains the prior November 14, 8:57:08 PM private sync; none rerun |
| New invoices/payments/refunds/emails | **0 by this task** |
| Permissions, API keys, gates, Script Properties | No changes |

This is a fresh read-only record check, not a repeat payment-provider reconciliation or end-to-end transaction test. Backend hashes and admin endpoint responses remain predecessor evidence; they were not rerun or reinstalled. Anonymous denial remains unverified.

## 7. Continuation boundary

Resume from **saved draft 1199**, reusing the existing public file and the single existing host. Do not recreate them. The affected checkpoint is **C: native host mount**. Chat review of this evidence must produce a targeted correction before further live mutation. Checkpoint D (page-code installation and old-content removal) and final acceptance remain pending.

The authorized instruction required stopping when the Wix-hosted host failed to mount. The old page was therefore retained exactly as instructed. **No publication approval is being requested.**

## 8. Source references and evidence

- [Corrected execution instructions](https://drive.google.com/file/d/1aHBH-rnfQupyXOA3rkzcfatfcIT5f3z5/view)
- [Exact approved code package](https://drive.google.com/file/d/1yg9pal5nVsWmOptJBV2gWgxao9BnGHCE/view)
- [Pre-install authoritative decision](https://drive.google.com/file/d/1JreUKPgUKKYlnNByrldeuYMZXsm24g9r/view)
- [Prior verified backend installation](https://drive.google.com/file/d/1WoGZdF669nt1rXeJITastGgpjoPRsYDl/view)
- [Original immutable renderer](https://github.com/MatrixMassageBodywork-droid/matrix-wix-components/blob/5bdcbe560b11e4b5573193f9517c80bcbeed8cf6/pages/wellness/supplements/review-9-single-host/renderer.js)
- [Read-only private tracker source](https://docs.google.com/spreadsheets/d/16hwNkp_gobTw2wHyb6N6_aTzmtOgIIPLPa5tIPdnxUY/edit)

Evidence: before screenshot; reopened host binding; saved source; native desktop console; preserved desktop/mobile testimonials; Site History saved row; sanitized `verification.json`; copied original starter. Screenshots do not represent a finished R9 page.
