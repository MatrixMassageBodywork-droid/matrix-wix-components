# A03 / A04 contextual link draft sources

A03 adds one contextual paragraph on the Spa & Beauty hub linking to the existing Bristol and Twin Lakes/Genoa City regional pages. A04 replaces exactly two incorrect nested href values on each of those regional pages with the current root-level destination URLs. Existing anchor text, FAQs, styling, booking links and other content are preserved.

`candidates/manifest.json` records exact route, element and candidate hashes. `baselines/` preserves the captured source used to build the candidates. `repository-originals/` preserves fresh byte-exact repository renderers and `repository-source-readback.json` records the single trailing-newline difference in the three local captures. The Spa original is the later Lash parent-link patch, preserving the newer Lash Extensions button. Do not revert to the older Spa production-1 renderer.

Before any Wix save, export actual current native source and complete seoMarkup, confirm page/element/source identity, and compare with the explicit captured baseline. A mismatch must be returned for a targeted rebase; do not silently normalize or overwrite it. The extra trailing newline in the archived local captures is documented, not waived as an exact-baseline match.

Use the complete renderer candidate and matching full crawler markup only after that preflight. Spa includes an exact native code candidate against its captured baseline. Bristol and Twin provide assignment-only merge snippets; preserve their full surrounding native code. Save separately, read back exact bytes, and preview the existing desktop/mobile page. Verify only the intended new/replaced links changed and preserve FAQ behavior, layout, shared shell, native reviews, metadata/schema/indexing and booking destinations.

This source checkpoint is a draft archive. It does not bind a renderer, save Wix code, or publish anything.
