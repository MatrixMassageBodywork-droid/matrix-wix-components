# Matrix Homepage — final test page verified

Date: November 7, 2026 UTC / November 6, 2026 local.
Project: FACIAL WEB SEO PW.

**SAVED / VERIFIED / TESTED. NOT PUBLISHED TO THE LIVE SITE.**

[Open the complete Wix homepage test page](https://www.matrixmassage.net/?rc=test-site).

This checkpoint supersedes the pre-installation status in `Matrix_Homepage_Design_Review_2026-11-07.md`. The homepage is now installed in the existing Wix HOME draft and deployed to Wix Test Site, rather than only available as a standalone design proof.

## Release state

- Existing homepage: `ghmgt`, permanent URL `https://www.matrixmassage.net/`.
- Live Site remains version **1004**, 100% exposure, shown in Release Manager as November 6, 2026, 8:57 PM.
- Test Site is version **1007**, **0% exposure**, shown as November 6, 2026, 9:56 PM.
- No production Publish action, release, exposure change, Square mutation or booking was performed.
- A separate anonymous production fetch confirmed the new component and renderer commit are absent from the live homepage.
- Owner approval of this final test page is still required before production publication.

## Installed homepage

The new homepage has a centered approved Matrix logo with its black frame, deep teal water, cream sections, six service summaries and photographs, descriptive service and booking links, a current facial special with savings, a studio introduction, a genuine verbatim guest quote, gift cards, local visiting information, FAQs and a closing appointment invitation.

Booking labels include **Book a Massage in Salem**, **Book a Facial in Salem**, **Book a Head Spa in Salem**, **Book Classic Lashes in Salem** and **Book Facial Waxing in Salem**. The latter two accurately describe the particular Square service destinations. Wellness links to the appointments menu.

The current facial offer shows **45 minutes for $79, regularly $95 — save $16**. It also explains the conditional **60-minute $85 follow-up**, reserved before leaving the first appointment. No unsupported follow-up savings amount was added.

The specials teaser links to the working existing facial-offer page. A permanent Specials hub plan is saved in `pages/home/review-3/SPECIALS_PAGE_PLAN.md`; a separate Specials page has not been created or published.

## SEO preservation verified

| Item | Verified value or treatment |
|---|---|
| Title | Japanese Head Spa, Facials & Massage in Salem, WI \| Matrix |
| Visible H1 | Japanese Head Spa, Facials & Massage in Salem, WI |
| Description | Clinical luxury spa in Salem, WI: Japanese Head Spa with in-house scalp infusions, custom facials, red light, infrared sauna, lymphatic drainage and massage. |
| Canonical | https://www.matrixmassage.net/ |
| Existing JSON-LD | FAQPage, LocalBusiness and WebSite compare equal to the captured baseline |
| Existing FAQ content | All eight original questions and answers retained; three additional helpful questions added visibly |
| New component SEO | Full matching text and links supplied through Wix `seoMarkup` |
| Existing page code | Original legacy-domain link handlers retained exactly |
| Site-wide elements | Header, footer, menus, About page and existing genuine testimonials left unchanged |

No duplicate structured-data block was added. The candidate expanded FAQ schema remains a separate prepared artifact; native structured data was preserved unchanged. These are preservation checks, not a guarantee of future rankings.

## Wix installation and rollback record

- Added one new section: Velo ID `section2`, DOM ID `comp-mw5v1iyj`.
- Added one Custom Element: Velo ID `matrixHomePage`, tag `matrix-home-page`.
- Source is pinned to immutable renderer commit `c2be8d1a07b79f5c07b600e1b70e6a7f8634f858`:
  `https://cdn.jsdelivr.net/gh/MatrixMassageBodywork-droid/matrix-wix-components@c2be8d1a07b79f5c07b600e1b70e6a7f8634f858/pages/home/review-3/renderer.js`
- Desktop: full-width stretch, zero margins, element Y132, saved height6600; section height6600. Editor width was1372. On the actual Test Site, the content and section dynamically measured6500.375px at the default desktop viewport.
- Mobile: width320, X0, Y62, element height11031, section height11051. Body measured11030.888px in Wix native mobile Preview.
- The original three homepage sections remain in the editor. The added page-code handler collapses only `#Section1RegularMediaImage1RuleNoFaceImage`, `#Section1Regular`, and `#Section1List` at runtime. Test Site readback confirmed zero height and hidden visibility for all three. No original native sections were deleted.
- The editor was reloaded. Full page-code copy readback matched `WIX_PAGE_CODE_DRAFT.js` exactly after CRLF/LF normalization. Element ID, source URL, tag, width/stretch state, height and Y position were also read back after reopening.
- Targeted rollback: restore `pages/home/review-1/baseline/HOME-before.js`, then remove only the newly added component and section after confirming their IDs. Never restore Site History or delete unrelated work blindly.

## QA evidence

- Complete native Wix desktop test page reviewed with the real shared header and footer; full-page screenshot captured after all eight images loaded.
- One visible H1. Original native H1 remains within its hidden rollback section.
- Test Site root height increased from6500.375px to6571.175px when a FAQ opened. Its enclosing Wix section followed the new height, and the footer began at the section end. No clipping or large fixed-height gap.
- FAQ also closed by keyboard Enter.
- Native Wix mobile Preview at320px: one card per row, content width320px, no horizontal overflow, all booking buttons50px high. Mobile hero and facial card captured.
- Standalone component was previously checked at320,390,1280,1440 and1920px. Resizing the desktop Test Site to390px is not phone emulation: Wix keeps its desktop980px minimum width for a desktop user agent. Native mobile Preview supplied the phone-layout verification. No physical-device test is claimed.
- Actual Test Site clicks on the massage and facial booking buttons opened the correct Square service detail pages, Custom Therapeutic Massage and Custom Facial. No appointment options were submitted.
- Eighteen existing Matrix page destinations had passed the earlier HTTP link check. Remaining Square destinations were matched against the current public service menu during preparation.
- Full completion of an actual paid booking was not tested.

Code, installation specifications, baseline, screenshots and machine-readable verification are saved in the existing GitHub repository under `pages/home/native-test-2026-11-07/` and `pages/home/review-3/`.

## Next authorized step

Owner reviews the complete test page. Make any requested corrections in the draft and repeat affected checks. **Do not publish until the owner explicitly approves this final test page.** Before any later publication, re-check the current release state and unrelated saved drafts because Wix publication can include site-wide draft changes.
