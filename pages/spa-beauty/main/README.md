# Spa & Beauty MAIN — Design review 1

**Current: `review-2/`** (second internal build of the first owner design review). Awaiting owner design approval. Not installed or published.

- Entire page review: `proofs/index.html`; desktop and mobile selectors included.
- Direct width wrappers: `proofs/viewport-1440.html`, `proofs/viewport-390.html`, `proofs/viewport-320.html`.
- Full-length screenshots: `qa/full-page-1440.jpg`, `qa/full-page-390.jpg`.
- Component source: `body.html`, `style.css`, `page-config.json`, and `review-2/renderer.js`.
- Source evidence and existing SEO/shell: `baseline/`.
- Original generated imagery, optimized derivatives, existing approved logo/water and generation briefs: `assets/`.
- Scope, dependencies and verification: `REVIEW_CHECKPOINT_2026-11-06.md`, `SOURCE_DECISIONS.md`, `qa/`.

## Reproduce

From repository root, run:

```sh
python pages/spa-beauty/main/scripts/prepare_proof.py
```

This writes a local proof folder and refreshes the portable proof HTML. Serve `pages/spa-beauty/main/local-preview/dist` with a trusted static server. No Wix access or publishing is involved. The page relies on public pinned CDN assets and Wix images; network access is required.

To make a new renderer build after an approved copy/style revision, invoke the existing Matrix Page Builder `build_page.py` with this `page-config.json` and a **new output directory**. Do not overwrite prior builds. `scripts/build_spa.py` records initial page authoring; `body.html` and `style.css` remain the current editable sources.

## Installation boundary

The proposed tag `matrix-spa-main` and element id `matrixSpaMain` are reserved design values, not verified Wix bindings. `WIX_SEO_SNIPPET_CANDIDATE.js` is only a merge candidate, never a replacement for the existing full Page Code. Read the current native page code, layers, bindings and saved draft after owner approval, then prepare exact installation instructions. Keep the existing page, SEO, native header/footer and reviews. No installation instructions have been executed.
