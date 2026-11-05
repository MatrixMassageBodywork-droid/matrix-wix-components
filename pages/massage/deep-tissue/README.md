# Deep Tissue Massage — saved Wix draft

**SAVED / VERIFIED / PREVIEW TESTED / NOT PUBLISHED** — 2026-11-05.

The approved body design is installed on the existing Wix page **DEEP TISSUE MASSAGE** (`cib7o`). The existing site header, footer and native reviews are retained. The public page still shows the previously published version.

## View the saved design

1. Open **Matrix Massage & Bodywork** in Wix and choose **Edit Site**.
2. In the page dropdown at the top left, select **DEEP TISSUE MASSAGE**.
3. Click **Preview** at the top right. Use the desktop/mobile controls to inspect both layouts.

The saved installation was reopened and verified. No production publication or Test Site deployment was performed. Do not reinstall the completed draft.

## Current implementation

| File or folder | Purpose |
| --- | --- |
| `body.html`, `style.css` | Current approved, editable body and scoped styles |
| `renderer.js` | Exact installed custom-element renderer |
| `WIX_PAGE_CODE.js` | Exact saved Wix Page Code, including crawler-visible `seoMarkup` |
| `build.py` | Reproduces the renderer, Page Code and matching FAQ schema from the current sources |
| `assets/`, `asset-map.json` | Original approved images/logo, compressed fonts and Wix media URL mapping |
| `faq-schema.json`, `seo-draft-payload.json` | Exact FAQ and native draft SEO payload |
| `seo-verified-readback.json` | Before/after API verification; existing non-target metadata retained |
| `qa-evidence.json`, `evidence/` | Desktop/mobile measurements and actual Wix Preview screenshots |
| `manifest.json` | Saved installation IDs, dimensions, source commit and SHA-256 checksums |
| `M2_CURRENT_CHECKPOINT_2026-11-05.md` | Detailed verified installation checkpoint and continuation boundaries |
| `baseline/` | Original page code, rendered body and SEO before installation |
| `packages/` | Exact saved installation package and before-install backup |
| `archive/approved-design-source/` | Earlier approved design source fragments, retained only as references |
| `preview.html` | Lightweight local component preview, not the Wix header/footer or a deployment |

To rebuild locally: `python build.py`. To inspect the component locally: serve this directory with a static HTTP server and open `preview.html`. The actual Wix draft remains the authoritative layout verification environment.

### Wix binding

- Site: `cdec8df6-d518-4859-9f1e-f06bf5346d41`
- Page: `cib7o`; element: `matrixDeepTissuePage`; tag: `matrix-deep-tissue-page`; section: `section4`
- Existing permanent URL: https://www.matrixmassage.net/deep-tissue-massage-salem-wi
- Installed renderer commit: `1e14a9b4cef60f3d8c8d35d141adc931652657fa`
- Installed source: https://cdn.jsdelivr.net/gh/MatrixMassageBodywork-droid/matrix-wix-components@1e14a9b4cef60f3d8c8d35d141adc931652657fa/pages/massage/deep-tissue/renderer.js
- Renderer SHA-256: `47e95d0507edb6cabb820979aef2c1a2e95735664dcbad23870bca405ba391d1`

The repository documentation/assets save does not change that pinned Wix binding. The existing four font paths remain byte-identical.

## SEO and release status

The existing URL, native SEO title, description, canonical URL, social tags and indexing tags were retained. The body has one H1. All seven visible FAQs match the updated FAQ structured data. Page Code was read back after an editor reload and matched the installed source.

Desktop/mobile Preview, FAQ expansion, asset loading and the Square booking destination passed. No booking was created. Live-source and indexing verification require a later authorized publication; Preview testing is not a ranking guarantee.

## Canonical project references

- [Current verified checkpoint](https://drive.google.com/file/d/13vi_D9P1X1JikLuhBO0rym5V7PWlrK-L/view)
- [Canonical M2 package folder](https://drive.google.com/drive/folders/1NojtXBjA36hxTAt_EBCcOc5NvUh05BDi)
- [Project scope](https://docs.google.com/document/d/14NDrwuldZnlengsGIaNKAy6vU8Axj9EBriBq2rJUo9I/edit)
- [M2 source specification](https://docs.google.com/document/d/1FaWI5HDkd_FR-nHUJEgxSZrYId0CoQBgDMjfs7Gs1to/edit)

Keep this page's implementation, assets, execution records and verification evidence in this repository. Preserve other pages and shared site files. Further live publication requires owner authorization.
