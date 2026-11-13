# Skin Reset Blueprint native content source

Prepared source for changes B07-01 and B07-04 on the existing page:
https://www.matrixmassage.net/skin-reset-blueprint-salem-wi

- Native page: `ltyp8`.
- Existing HTML component: `comp-moqgyn3g`, in section `comp-moqgwjg4`.
- `iframe.before.html` is the complete public owner HTML, including its existing styles and guide/booking links.
- `iframe.html` changes exactly five existing facial href values from `/facials-salem-wi` to `/spa-and-beauty-services-salem-wi/facials-salem-wi`. All other bytes are preserved.
- `iframe.diff` documents those five changes.
- `native-companion.reference.html` specifies the new visible native H2, body text and two related links below the existing iframe section and before the shared footer.
- `native-companion.visual-spec.json` specifies local desktop/mobile styling. The companion must use native Wix section/text/link controls; it is not a second iframe or renderer.
- `PATCH_QA.json` records source checks and checks still requiring native editor access.

See `checkpoints/seo-b1-2026-11-13/native-body-remainder/EXECUTION_INSTRUCTIONS.md` for exact installation and readback steps. Compare the current full saved iframe source with the baseline before updating it. Preserve the existing iframe title, consent classification, geometry, guide links, booking links and unrelated behavior. Do not replace newer saved code with this snapshot.

This source checkpoint does not establish a Wix save, native companion installation, layout test or publication.
