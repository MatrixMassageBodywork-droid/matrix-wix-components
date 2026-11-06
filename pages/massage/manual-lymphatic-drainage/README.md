# M4 Manual Lymphatic Drainage — published

Status: SAVED / VERIFIED / TESTED / PUBLISHED.
Published 2026-11-06 01:38 UTC (November 5, Wisconsin).
Current authoritative receipt: [PUBLICATION_CHECKPOINT_2026-11-05.md](PUBLICATION_CHECKPOINT_2026-11-05.md).

The November 5 owner request replaces inset subpage backgrounds with full-width backgrounds and hero panels. M4 retains the established cream, teal, typography, approved compact Matrix Massage & Bodywork logo, and MLD-specific illustrative treatment imagery with the main Massage water texture. The proof contains the page body only; the existing Wix header, footer and genuine review section remain outside this component.

## Build and review

Run `python pages/massage/manual-lymphatic-drainage/build.py` from the repository root. Open `proofs/Matrix_MLD_Full_Width_Proof.html` for the complete self-contained, offline proof. `preview.html` is the version-controlled equivalent with referenced images/fonts; MLD image assets live in `assets`, while shared logo/font assets remain in `../deep-tissue/assets`. Generated embedded-asset duplicates are excluded from git and reproduced by the build.

The same build produces width-only Swedish and Deep Tissue proofs. Their body, stylesheet, renderer and page code are unchanged. `../width-correction/unchanged-source-hashes.json` records that boundary.

## Preserved SEO identity

- Site: `cdec8df6-d518-4859-9f1e-f06bf5346d41`; existing static M4 page: `lb1iq`.
- Permanent URL and canonical: `https://www.matrixmassage.net/manual-lymphatic-drainage-massage-salem-wi`.
- Existing title: `Lymphatic Drainage Massage Salem WI | Matrix Massage & Bodywork`.
- Neutral description from the authoritative package: `Explore gentle manual lymphatic drainage massage in Salem, WI at Matrix Massage & Bodywork. View current appointment options and book online.`
- Preserve indexability, existing page identity, internal links, native SEO ownership and unrelated structured data. No new page, redirect or duplicate URL.
- One semantic H1; six visible FAQs; generated FAQ JSON exactly matches those six answers. The existing M4 FAQ entry was replaced in place; no duplicate FAQ entry was added.
- The installed `seoMarkup` is the complete visible body, not a hidden keyword block. The renderer never changes head metadata.
- All review HTML is noindex/nofollow; do not copy that proof head into the live page.

The live Wix page displays the approved V2 image revision. Native title, description and canonical were verified after publication. Rankings cannot be guaranteed.

## Sources and dependencies

Authoritative M4 copy/specification: https://docs.google.com/document/d/12zbR35Ww4hJipnBWCoCV89i9i2uHqAUEmn-klrgTbKA/edit

Core control (historical M1/M3 implementation states superseded by later verified receipts): https://docs.google.com/document/d/1Triw8gKpK1zBOvC2cViEAIBF_PgXEftLQBX6I8JI38A/edit

Latest M3 published checkpoint: https://drive.google.com/file/d/1FW-d6XeSyMVAbCZbL931GV-9otYzp76o/view

Canonical project package folder: https://drive.google.com/drive/folders/1NojtXBjA36hxTAt_EBCcOc5NvUh05BDi

The copy follows the supplied M4 specification with typographic punctuation, section ordering and related-page links adapted to the established design. No prices, credentials, testimonials or treatment promises were invented. Cleveland Clinic's MLD article was checked on 2026-11-05 for the light-pressure approach, individualized suitability, contraindications and continuing a clinician's care plan: https://my.clevelandclinic.org/health/treatments/21768-lymphatic-drainage-massage

## Installed implementation

`WIX_PAGE_CODE.js` is the exact installed and read-back-verified page code. `INSTALL_MANIFEST.json` records the existing Wix page, element, section, source pin, dimensions and preserved reviews. The renderer is pinned to approved source commit `a1cf5155e8f0fad0eaa1e288364e6e7f60f7ea9e`; later receipt-only commits do not require republishing it.

The custom element uses tag `matrix-lymphatic-page`, ID `matrixLymphaticPage`, full-width native stretch and zero side margins. Existing blank `section4` was reused after fresh inspection. Baseline page code and native SEO are retained under `qa/`. Obsolete M4 body sections were removed while native reviews and the shared shell remained intact.

Historical review checkpoints and `WIX_PAGE_CODE_CANDIDATE.js` are retained as history. They do not represent current installation status. Do not reinstall or republish completed work based on an older review receipt. The build script creates review artifacts; review its generated status metadata before replacing this published checkpoint.
