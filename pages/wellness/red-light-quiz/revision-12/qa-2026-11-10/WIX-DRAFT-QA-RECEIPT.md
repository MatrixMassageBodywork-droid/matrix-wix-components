# R12 Wix draft installation and QA — 2026-11-10

**SAVED / REOPENED AND VERIFIED / PARTIALLY TESTED / RELEASE BLOCKED / NOT PUBLISHED**

This is the current continuation checkpoint, superseding the “Wix editor not updated” installation status. It does not supersede the R12 acceptance criteria or grant publication approval. Source remains exactly commit `6bdef3933cbc63b9bd985983710d50f3aea784b9` on `review/red-light-quiz-r12-2026-11-10`.

## Authoritative sources and target

- [Current installation specification](https://docs.google.com/document/d/13zezoIjDm7oKjDRzjPs5sZMzpRqex4r2Njuya0bw0L8/edit)
- [R11 published receipt](../../revision-11/PUBLISHED-RECEIPT.md)
- Site: `cdec8df6-d518-4859-9f1e-f06bf5346d41`
- Editor document: `a276c9bf-bc17-4680-959b-a24ebe7370f6`
- Existing page: `e8l5a`, “360 GLOW SCORE | Matrix Wellness”
- Public URL: https://www.matrixmassage.net/red-light-therapy-glow-score
- Published site revision before and after work: **1085**. Native draft revision number was not exposed/captured; do not substitute 1085 for a draft revision.
- Existing client email: `VaR3j2e`; owner: `VaR4bz9`.

## Saved changes

1. Existing `htmlGlowQuiz` contains exact R12 `embed.html`.
2. Existing page bridge contains exact R12 `page-code.js`.
3. Existing `backend/glow-rules.js` contains exact R12 rules.
4. Desktop and mobile frame/section heights and downstream positions changed as below.
5. Wix displayed **“Your changes are saved”**. The editor was reloaded, the target page reopened, and both code modules copied back and compared with R12 (CRLF normalized). Both matched. The reopened HTML asset was downloaded and matched R12 byte-for-byte. Frame sizes were remeasured in fresh Preview.

No publication, email send, CAPTCHA completion, customer submission, template content change, permission change, or new automation was performed. No unrelated page, shared header/footer, SEO metadata, home performance code, About, Testimonials, intake/service/config module, or CMS record was edited.

### Exact layout values

All positions below are native editor values. Gap is CAPTCHA Y − (frame Y + frame height).

| Element | Desktop before | Desktop saved | Mobile before | Mobile saved |
|---|---:|---:|---:|---:|
| htmlGlowQuiz width | 980 | 980 | 320 | 320 |
| htmlGlowQuiz Y | 725 | 725 | 685 | 685 |
| htmlGlowQuiz height | 4910 | 1250 | 8070 | 1080 |
| glowCaptcha Y | 5658 | 1999 | 8780 | 1789 |
| glowStatus Y | 5738 | 2075 | 8855 | 1865 |
| glowVisitInfo Y | 5818 | 2155 | 8941 | 2005 |
| section2 Y | 132 | 132 | 62 | 62 |
| section2 height | 6006 | 2350 | 9388 | 2440 |
| Frame-to-CAPTCHA gap | 23 | 24 | 25 | 24 |

The reduction removes the large unused frame height. It does **not** by itself establish a single natural scroll flow: the report scrolls within the bounded iframe and verification remains outside it.

### Saved source identities

| File | SHA-256 |
|---|---|
| embed.html | `04ab077b02a78a1b8d7c7cf6254e665ac1954130bd585e307aa667191d6d5416` |
| page-code.js | `fed88585fc6818de91e127e80896e4c47ca227be1033c8e95ae2cf51d6bc4570` |
| glow-rules.js | `37f4bc3f73d544b85188964dccff3551950c52a2ed1bbcc6422d9b1ee05fadcb` |

## QA results

The browser tests used Wix native **Preview**, not a released Test Site. Wix warned that some features are only partially functional in Preview. No authenticated delivery/security claim is inferred from those tests.

| Acceptance test | Status | Evidence / limitation |
|---|---|---|
| R11 starting source verified | PASS | Native bridge and rules matched R11; original HTML asset matched R11 byte-for-byte. |
| R12 source saved and reopened | PASS | All three installed source files matched; desktop 980×1250 and mobile 320×1080 retained after reload. |
| Velo preview compile | PASS, limited | Page ran in Preview; no observed compilation error. Full server integration not exercised. |
| Immediate report without contact/CAPTCHA | PASS | Completed the nine-question skin route on desktop and mobile. “Skin Renewal \| Your Matrix Plan” displayed immediately. No contact fields or verification required. |
| Email form is an optional report action | PASS, limited | “Email me a copy (optional)” opened the form on desktop; report remained available. Both marketing checkboxes were unchecked and required. No submit. |
| First page action is the free quiz | **FAIL** | Existing native “Book your red light visit” button still precedes the quiz. |
| Quiz does not assume a purchase | **FAIL** | Questions still require a priced visit type, commitment and weekly availability. No exploration-only path. |
| Copy consistently explains immediate results | **FAIL** | Native “When will I get my report?” still requires contact/consent/verification; iframe FAQ repeats the old process. |
| Compact frame / no giant unused area | PASS, scoped | Saved target heights and native section reduction verified. Full visual QA remains incomplete. |
| Single natural flow / verification only after email request | **FAIL / NOT FULLY TESTED** | Native CAPTCHA remains visible before email is requested. One existing CAPTCHA was retained; no second was added, but one-challenge behavior was not exercised. |
| Automatic report heading positioning | **FAIL** | Desktop final action left report heading above the visible area beneath fixed header; manual navigation brought it into view. |
| Mobile no horizontal overflow | **UNRESOLVED** | DOM measured body client width 305 and scroll width 312 inside 320px iframe (7px excess). No claim of clean mobile layout. |
| Report content | PARTIAL | Goal, plan, research and optional-email sections rendered. Complete eight-pathway visual and safety review not repeated. Prior 384 parity cases are source-test evidence from Chat, not this live test. |
| Revised email template | **BLOCKED / NOT INSTALLED** | Existing published-template editor warned changes may affect live appearance. Draft isolation could not be verified. |
| End-to-end CAPTCHA / email delivery / recovery | **NOT TESTED** | Separate test-send approval not present; no submission or messages sent. |
| Published R12 | **NOT PUBLISHED** | Public site still advertises siteRevision 1085. |

Synthetic route: skin/facial rejuvenation → ready to focus on appearance → face fine lines/texture → new to red light → adult/no listed review flags → face/head $14.99 → consistent routine → twice weekly → skip nutrition → See my pathway. This is test input, not customer or owner health information.

## Email stop condition

The client template remained “Your Matrix Glow Score report,” Published, last updated 11/8/26 11:12 PM, sent 3. Owner remained “New Matrix Glow Score request,” Published, 11/8/26 7:35 PM, sent 3. Sender and reply-to were unchanged.

The editor showed: “This email has already been published. Changes may affect how it appears live.” With no content edits, Save & Continue returned directly to the template list; no independent draft/publication stage was established. No replacement template was created. Prepared `client-email-template.html` remains source only.

## Required correction before further installation or release

Return these failures for targeted Chat design/specification; do not repeat the completed installation.

1. Replace booking-first native intro/CTA and reconcile both outdated report-access explanations, preserving URL/H1/SEO and existing booking destinations.
2. Specify an exploration-only question/report path, including validated browser/server values; never silently map “exploring” to paid visits.
3. Specify the native CAPTCHA visibility and post-message lifecycle so only an explicit email-copy request reveals it. Retain backend token validation, allowed origins, idempotency and both separate unchecked consent boxes.
4. Correct focus/scroll handling and resolve mobile width excess; recheck the full report and email-to-verification path at desktop and 320–390px.
5. Establish a safe release method for the existing published triggered email. Do not edit a potentially live template while approval remains draft-only.
6. Repeat failed visual tests, then run an explicitly authorized end-to-end delivery test to a named test mailbox. ACCEPTED is not inbox delivery.

Stop with evidence on any new unexpected condition. Do not publish or restore an older site as a workaround. The saved draft is intentionally incomplete and must not be published along with unrelated work.

## Evidence

- [Wix save confirmation](save-confirmation.jpg)
- [Reopened page bridge and element identities](reopened.jpg)
- [Desktop free-quiz introduction](initial.jpg) — below the remaining native booking CTA
- [Desktop report viewport](results.jpg) — heading positioning defect
- [Mobile report heading](mobile-results.jpg) — brought into view manually; booking CTA remains above
- [Optional email panel](email-panel.jpg)
- [Native lower-page stale instructions](native-bottom.jpg)
- [Existing email template, unchanged](existing-email-template.jpg)
- [Triggered email identities and published status](trigger-identities.jpg)

Evidence gaps: no native draft revision number, full stitched mobile report, final-question transition screenshot pair, completed verification, revised native email preview, or inbox delivery receipt. These are not marked complete.
