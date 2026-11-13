# Supplements Review 3 — hero correction

2026-11-13. Scope: fix the missing approved logo and absent/obscured water in the review preview. NOT INSTALLED; NOT PUBLISHED; no ordering/payment/Fullscript integration changed.

The parent Supplements folder remains the frozen R2 source. Run `python review-3/rebuild_hero.py` from that folder to generate the exact corrected body, CSS, renderer, unchanged SEO snippet and a self-contained `review-3/generated/preview.html`. The builder refuses baseline drift and checks generated-file hashes. Do not install the older parent renderer as R3. Complete generated source, offline preview and actual screenshots are also archived in the canonical FACIAL WEB SEO PW Drive project folder.

## Changes

- Preserve the approved original Matrix artwork, the 660 x 330 main-page white logo panel, black border and responsive dimensions.
- Use object-fit cover and centered positioning to remove excess blank margins without clipping the logo artwork, matching the approved Spa & Beauty main reference.
- Match the approved main-page teal-water overlay: 110deg, rgba(3,37,40,.88), rgba(5,64,65,.67), rgba(4,31,35,.84). Only the hero override changes; closing-section CSS remains unchanged.
- Inline the exact approved image bytes in the proof ONLY. Production CSS/renderer retain served asset URLs and contain no base64 images. This fixes the review-file dependency on external image downloads.

## Verified local QA

Chromium, offline: 320, 375, 390, 700, 1280, 1440 and 1920 px. Original 2048 x 1529 logo decoded; water decoded; no horizontal overflow; full-width sections; two feature cards side-by-side on desktop and stacked on narrow screens; six FAQs expanded successfully; one H1; all preorder buttons remain disabled. Desktop and mobile screenshots were inspected. The entire visible body and SEO snippet remain byte-identical to R2. Reproducible-build hash checks and Node syntax check passed.

This is local proof QA, not native Wix QA or an actual-phone test. No native editor save, publication, customer email, invoice, payment, wholesale order or permission change occurred. Existing R2 commercial/link-verification limitations remain unchanged.

## Hashes

Body: 21df0a2c4477e1bd3980f2a3a32e4b6ac365b53720e00a62f6edf3284ac8252f
CSS: 46c83109f0eaf790f60ef2b3158d8ac7710d7d9078ccc45e62ce759375fb24a2
Renderer: c728c012f4e39e04a373ad16c4cf4563731817c90bbc183751d96239c9976f3d
Standalone preview: f7067bda353a3fa3add4492446a69af335e90f7de700f2f4fa984daa222e8b9e

## Preservation

Keep `/supplements`, current native page identity/SEO, existing header/footer, all links, six FAQs, both monthly slots, private Sheets and live gates intact. Before any future Wix installation use a fresh baseline and the generated R3 renderer, not the noindex proof HTML. No publication is authorized by this visual-correction receipt.
