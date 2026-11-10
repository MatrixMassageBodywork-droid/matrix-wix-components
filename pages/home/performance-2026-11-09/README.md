# Homepage performance — final published checkpoint

Published and verified on November 9, 2026 at 9:20 p.m. Central. Wix revision **1085** supersedes 1082 and 1080 for HOME. This is an image/loading optimization with the existing branding, copy and layout retained.

## Installed source

- Renderer: [immutable checked renderer](https://cdn.jsdelivr.net/gh/MatrixMassageBodywork-droid/matrix-wix-components@14f2c29fb90895f5ed83a045c5c547414b5bcf3f/pages/home/performance-2026-11-09/renderer-complete.js)
- Current body/style/SEO/build files use the `-complete` suffix; page code is `WIX_PAGE_CODE_COMPLETE.js`.
- Active custom code: `HOME_HEAD_CODE_COMPLETE.html`, named “Matrix HOME — faster images and accessible footer,” HOME only, Head, Essential, enabled.
- Keep the custom-code early-loader URL and the native HOME element source URL synchronized in future edits. Both currently reference the same renderer commit.
- Renderer SHA256: 29456a91fb2b165178020e792fff13686bb78c08de9fdb078022c98f7b25c811.
- Existing photos were compressed to responsive WebP variants. No replacement artwork was introduced. The last wellness photo uses assets at commit 6887941cca74686958c6c7379fc7565288a57043; other service/room variants use 6707c3cadc068d9c4bd20d34fb83a23dfb1c288a.

## Verified results

Final PageSpeed captured at 9:21 p.m.: mobile 70, LCP 6.0 s, 2809 KiB; desktop 88, LCP 1.1 s, 2828 KiB. Baseline: mobile 57 / 25.0 s / 5816 KiB; desktop 64 / 4.2 s / 6934 KiB. Accessibility and basic SEO both score 100. Mobile remains above the good LCP threshold; no real-user Core Web Vitals result is available. A repeat URL reused the same capture and is not counted as an independent sample.

Native mobile/desktop previews and the public page were inspected. All 9 images loaded, 37 body links remained identical, all 11 FAQs opened, booking service selection worked, footer links are 44 px tall, and metadata/schema were preserved. No physical phone or actual booking transaction was tested.

See `PUBLICATION_RECEIPT_FINAL.json` and `Matrix-homepage-speed-verification.html` for evidence and limitations. The final private evidence package is saved in the canonical FACIAL WEB SEO PW Drive folder. Earlier files and status records are historical, not the current installation.
