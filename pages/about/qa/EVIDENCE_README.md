# About release evidence

The current release status is recorded in `../docs/PUBLICATION_RECEIPT.md`. Files in this directory retain their original observation times and scopes; an earlier failure is not the current release result.

## Current public verification

- `public-seo-verification.json`: final public HTTP/SEO verification after the targeted About SEO release; captured 2026-11-12T16:03:35Z with no failures.
- `PUBLIC_SEO_VERIFICATION.md` and `public-oai-searchbot-verification.json`: methodology and exact crawler-user-agent simulation results; these establish delivered content, not an authentic crawler visit or indexing.
- `about-live-final-seo-dom.json`: final public browser DOM and structured-data readback.
- `public-body-verification.json` and `about-live-body-readback.json`: public rendered-body comparison with the approved source.
- `about-live-faq-evidence.json`: all seven FAQ controls expanded, with section/footer geometry and links.
- `about-live-booking-navigation.json`: navigation to the Matrix Square booking menu without submitting an appointment.
- `visual-evidence-index.json`: the 12 selected screenshots and their exact byte hashes. Native mobile preview and standalone responsive proofs remain labeled separately from public desktop evidence.

## Publication sequence and historical diagnostics

- `publication-preflight.json`, `publication-api-result.json`, and `about-published-history.txt`: authorization, scope check, supported site publication response, and native published-history evidence.
- `public-seo-first-read.json` and `public-seo-cache-comparison.json`: **historical diagnostics captured before the targeted About SEO release**. These record the initial stale public SEO/response state and are preserved to explain the correction.
- `native-seo-post-publication-get.json`: **historical diagnostic read after native site publication and before the targeted About SEO release**. It is not the final public SEO result.
- `targeted-seo-publication-result.json`: the separate accepted About-only SEO release. Its immediate `liveVerified: false` records the state before independent verification; consult the final public verification above for the subsequent result.

## Earlier draft and proof evidence

Native draft/code/body readbacks, SEO draft responses, review-2 FAQ tests, review-3 arrow checks, and responsive proof measurements retain their original scope. They do not independently establish public publication or a real mobile-device test.

`public-seoMarkup-0.html` and `public-seoMarkup-1.html` are small extracted body snippets from the recorded response comparisons. They are byte-identical copies of the approved body. The superseded initial `verify_public_seo.py` diagnostic is excluded from this checkpoint; the final methodology is documented in `PUBLIC_SEO_VERIFICATION.md`.

Only selected final/relevant screenshots are included. Failed or intermediate screenshot copies, raw full-page HTML downloads, and temporary runtime files are excluded. The immutable renderer source remains pinned to `bf6fc01d51baf3ec797af57f17716860df7754e7`.
