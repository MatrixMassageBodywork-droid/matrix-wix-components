# M4 publication checkpoint — November 5, 2026

Status: **SAVED / VERIFIED / TESTED / PUBLISHED**.

Owner approval: “Much better! you may publish.” Native Wix confirmed “Your site is published and live online” at 2026-11-06T01:38:27.697Z (November 5 in Wisconsin). This receipt supersedes the pending-installation/pending-publication states in earlier M4 review documents.

Live page: https://www.matrixmassage.net/manual-lymphatic-drainage-massage-salem-wi

Repository: https://github.com/MatrixMassageBodywork-droid/matrix-wix-components

## Released scope

- Installed the approved M4 V2 body: distinct gentle forearm treatment imagery, cream treatment setting and dark teal water closing section, with the approved logo and established clinical luxury style.
- Used the existing static page `lb1iq`, existing blank `section4`, custom element `matrixLymphaticPage` / `matrix-lymphatic-page`, native full-width stretch and zero margins.
- Pinned source to approved commit `a1cf5155e8f0fad0eaa1e288364e6e7f60f7ea9e`; renderer SHA-256 `3d3388b44b68996703e94d0fcd02623189829f980030c374ae179caa37b6f647` matched the CDN response.
- Installed complete visible-body `seoMarkup`. Exact page code readback matched 10,687 characters. Baseline no-op code and native SEO are retained under `qa/`.
- Removed only the obsolete M4 hero, body/FAQ and add-ons sections listed in `INSTALL_MANIFEST.json`. Preserved genuine native reviews, global navigation/header and footer.
- Replaced the existing native FAQ entry in place with the six approved visible FAQs. Preserved other native SEO entries.
- Published the approved M2/M3 native width correction in the same release; see the separate width-correction receipt.

## Verification

| Check | Result |
| --- | --- |
| Native Wix save and Publish | Confirmed in UI |
| M4 public URL | Loaded approved renderer and imagery |
| Native SEO | Existing title, description and canonical preserved |
| Indexing | No noindex directive observed on public page |
| Headings / FAQ schema | One visible H1; one FAQPage with six approved answers |
| Desktop full width | Passed at browser widths 1280, 1440 and 1920; edges within 0.2 px of content viewport; no horizontal overflow |
| Images | All four images loaded after scrolling through lazy-loaded sections |
| FAQ expansion | All six open; body height 4956.9 px; native reviews gap approximately 0 px |
| Native Wix mobile preview | 320 px body width, no horizontal overflow; body height 8392.75 px, element/section 8393 px |
| Native reviews | Retained and adjacent to the component |

Actual mobile-user-agent production testing was not performed. Search ranking outcomes are not guaranteed. No booking was submitted during QA.

Evidence: `INSTALL_MANIFEST.json`, `WIX_PAGE_CODE.js`, `qa/publication-2026-11-05.json`, `qa/live-hero.jpg`, `qa/native-seo-before-install.json`, and `qa/seo-set-request.json`.

## Current sources

Approved M4 specification: https://docs.google.com/document/d/12zbR35Ww4hJipnBWCoCV89i9i2uHqAUEmn-klrgTbKA/edit

Canonical project package folder: https://drive.google.com/drive/folders/1NojtXBjA36hxTAt_EBCcOc5NvUh05BDi

The specification, latest approved image review and fresh Wix baseline were consulted before installation. Earlier review files remain historical; this publication receipt is current.
