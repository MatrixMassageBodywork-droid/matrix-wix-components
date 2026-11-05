# Main Massage — Salem, WI

**Status:** Published and working in Wix production as of 2026-11-05.

- Permanent URL: https://www.matrixmassage.net/massage-therapy-services-salem-wi
- Wix page ID: `anvbe`
- Wix Velo filename: `massage-therapy-services-salem-wi.js`
- Wix custom-element ID: `matrixServicePageV21`
- Custom-element tag: `matrix-massage-services`
- Binding mode: Wix-hosted **Velo file**
- Desktop: stretched full width, 0 px margins
- Renderer source: `renderer.js`

## Proven implementation rule

The working production combination is:

1. Slim renderer without embedded base64 font files.
2. Renderer copied into the Wix-hosted Velo custom-element file.
3. Tag `matrix-massage-services`.
4. Existing custom element stretched full width.
5. Test Site verification before production publish.

External Server URL/jsDelivr was not the working Wix runtime configuration for this page.

## Portability

The renderer is a standalone custom element using standard HTML/CSS/JavaScript and Wix-hosted media URLs. For a future WordPress migration, adapt the asset URLs and mount the renderer in the WordPress theme/plugin layer rather than rebuilding the page design.

## Known Wix-only layout note

The mobile Wix container uses a fixed editor height and may leave extra white space below the renderer. That is a Wix layout/container issue rather than a renderer architecture failure.
