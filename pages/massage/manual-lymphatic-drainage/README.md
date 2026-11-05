# M4 Manual Lymphatic Drainage — full-width review

Status: DESIGNED / SOURCE VERIFIED / LOCAL RESPONSIVE PROOF TESTED.
Wix installation: NOT EXECUTED. Production publication: NOT EXECUTED.
Owner review of the complete page is the next gate.

The November 5 owner request replaces inset subpage backgrounds with full-width backgrounds and hero panels. M4 retains the established cream, teal, typography, approved compact Matrix Massage & Bodywork logo, and approved stone/water images. The proof contains the page body only; the existing Wix header, footer and genuine review section remain outside this component.

## Build and review

Run `python pages/massage/manual-lymphatic-drainage/build.py` from the repository root. Open `proofs/Matrix_MLD_Full_Width_Proof.html` for the complete self-contained, offline proof. `preview.html` is the version-controlled equivalent with referenced images/fonts; all source assets already live in `../deep-tissue/assets`, pinned in the renderer. Generated embedded-asset duplicates are excluded from git and reproduced by the build.

The same build produces width-only Swedish and Deep Tissue proofs. Their body, stylesheet, renderer and page code are unchanged. `../width-correction/unchanged-source-hashes.json` records that boundary.

## SEO identity to preserve at installation

- Site: `cdec8df6-d518-4859-9f1e-f06bf5346d41`; existing static M4 page: `lb1iq`.
- Permanent URL and canonical: `https://www.matrixmassage.net/manual-lymphatic-drainage-massage-salem-wi`.
- Existing title: `Lymphatic Drainage Massage Salem WI | Matrix Massage & Bodywork`.
- Neutral description from the authoritative package: `Explore gentle manual lymphatic drainage massage in Salem, WI at Matrix Massage & Bodywork. View current appointment options and book online.`
- Preserve indexability, existing page identity, internal links, native SEO ownership and unrelated structured data. No new page, redirect or duplicate URL.
- One semantic H1; six visible FAQs; generated FAQ JSON exactly matches those six answers. Replace the existing M4 FAQ entry at installation, rather than adding a second FAQ entry.
- The candidate `seoMarkup` is the complete visible body, not a hidden keyword block. The renderer never changes head metadata.
- All review HTML is noindex/nofollow; do not copy that proof head into the live page.

The live Wix page still displays its earlier body. Rankings cannot be guaranteed; preserving identity, crawlable content and metadata plus post-release verification reduces avoidable migration risk.

## Sources and dependencies

Authoritative M4 copy/specification: https://docs.google.com/document/d/12zbR35Ww4hJipnBWCoCV89i9i2uHqAUEmn-klrgTbKA/edit

Core control (historical M1/M3 implementation states superseded by later verified receipts): https://docs.google.com/document/d/1Triw8gKpK1zBOvC2cViEAIBF_PgXEftLQBX6I8JI38A/edit

Latest M3 published checkpoint: https://drive.google.com/file/d/1FW-d6XeSyMVAbCZbL931GV-9otYzp76o/view

Canonical project package folder: https://drive.google.com/drive/folders/1NojtXBjA36hxTAt_EBCcOc5NvUh05BDi

The copy follows the supplied M4 specification with typographic punctuation, section ordering and related-page links adapted to the established design. No prices, credentials, testimonials or treatment promises were invented. Cleveland Clinic's MLD article was checked on 2026-11-05 for the light-pressure approach, individualized suitability, contraindications and continuing a clinician's care plan: https://my.clevelandclinic.org/health/treatments/21768-lymphatic-drainage-massage

## Installation boundary

`renderer.js` and `WIX_PAGE_CODE_CANDIDATE.js` are review candidates. Before a live installation phase, freshly capture the M4 page code, element map and native SEO record, then merge this complete body into the existing page architecture. Do not blindly replace unknown page code or reuse M3 native section IDs. The eventual custom element must use tag `matrix-lymphatic-page`, ID `matrixLymphaticPage`, and native full-width stretch with zero side margins. Measure its final desktop and mobile heights in Wix before removing obsolete M4 body sections. Native reviews and the shared shell remain intact.
