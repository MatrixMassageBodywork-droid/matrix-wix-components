# Supplements review 6 — customer invoice wording

Date: November 13, 2026 (America/Chicago). Existing Wix page ID `aeh8h`. Current live `/supplements`, proposed `/supplements-vitamins-salem-wi` remains **not published**.

Owner instruction: remove the payment-processing brand from *all customer-visible* Supplements page text and replace with invoice language. Invoices will be sent via email after requests are reviewed once the preorder program opens; no emails or invoices are configured/sent in this draft. No claim that current orders are active.

Source baseline: R5 commit `85268983295425756e71bcd0c33ff2878bbd949a`; this is a narrowly scoped R6 copy-only revision. Replaced the two visible brand mentions in ordering copy and FAQ, plus one process heading; removed internal jargon about wholesale ordering from the public explanation. Preserves external dispensary URLs as technical destinations, as well as all SEO geography, logo/water, 8 FAQ questions, 6 collection links, two inactive offers.

Public canonical copy: "An invoice will be sent by email with your total and payment due date". Other process copy is consistent with this promise, conditional on future program activation.

Source files: `body.html`, `style.css`, `renderer.js`, `WIX_SEO_SNIPPET_CANDIDATE.js`, `faq-schema.json`, `structured-data-candidate.json`, `page-config.json`, `metadata-candidate.json`, `preview.html`. `preview.html` is a noindex review artifact with embedded imagery, not production Wix head code.

Live Wix page and global Wellness menu are **not changed**. For future Classic Editor installation use this R6 renderer instead of earlier R5, and include the pending sauna navigation addition documented in `navigation-patch.json` only after fresh saved-state readback. Do not change payment processors, website permissions, invoices, Fullscript provider settings, or activate the two bundles.
