# Paddock and Skin native content: technical installation instructions

## Scope and source status

This source package contains exactly B02.02, B07-01 and B07-04. It supplies bounded public body snapshots, exact candidates, diffs, component identities and source QA. It does not record deployment authorization or establish that any editor save or publication has occurred.

The baselines were observed publicly on November 13, 2026. Before editing, consult the active release checkpoint and compare each latest saved native value with its baseline. If a value already matches its complete candidate, verify it without duplicating the operation. If it differs from both baseline and candidate, preserve it and return the evidence for a targeted rebase.

This package does not change existing Lash or Head Spa runtime pins, site metadata, structured-data arrays, article bodies, author information, global styles or other pages. Apply only the identified native content operations. A source commit by itself does not install these files in Wix.

All paths below are repository-relative. `COMPONENT_MAP.json` records observed target identities. Only native editor operations, save/readback, desktop/mobile layout checks and any separately authorized release require live application access. If the control model or saved state differs materially, stop the affected operation rather than improvising a replacement.

## Protected boundaries


- Existing header, shared footer, maps, menus, testimonials, branding, permanent URLs, canonicals, indexing settings, consent behavior and analytics remain unchanged.
- On Paddock, preserve `comp-mvtzt5751`, the **VIEW ALL SERVICES** link to `https://www.matrixmassage.net/studio`, exactly. Its baseline HTML is `pages/regional/paddock-lake/seo-b1-2026-11-13/protected-studio-link.before.html`.
- On Skin Reset, preserve `comp-moqgyn3g` and its parent `comp-moqgwjg4`. Keep their existing placement, desktop/mobile dimensions, iframe title, essential-consent classification and behaviors. Published desktop source currently records iframe width **975px**, height **3217px**, left **5px** in the 980px grid and bottom margin **25px**; these are source observations to compare, not replacement settings.
- Preserve every Google Forms link, booking link, all guide text, images, styles and scripts. No form submission or real booking is required.
- Do not change Square data, prices, services, medical claims, Google account settings, global Wix themes or the Studio/TV systems.
- Do not create a second iframe or custom renderer for the native companion. Do not replace the existing page or embedded experience.

## Step 1 — B02.02: Paddock overview link

1. In the existing Wix Classic Editor, open **Pages & Menu** and select **SPA SERVICES NEAR PADDOCK LAKE WI**. Confirm page ID `i4qul` and path `/spa-services-near-paddock-lake-wi` before changing anything.
2. Select the opening overview RichText control **`comp-msbundsm`**, inside section **`comp-msbundsi`**. Its text begins **Discover customized facials**. Verify the complete text against `pages/regional/paddock-lake/seo-b1-2026-11-13/body.before.html`. If using the Layers panel, select this existing component; do not add a new text box.
3. Preserve the current paragraph's Arial family, normal weight/style, white color `#FFFFFF`, **17px** font, **1.65em** line height and existing native layout. Published desktop source records **760px** width with automatic height and a 50px minimum height. Do not change the box width or placement.
4. Insert exactly **eyelash extensions, ** after **Japanese Head Spa rituals, **. The resulting complete text must be:

   Discover customized facials, therapeutic massage, Japanese Head Spa rituals, eyelash extensions, waxing and restorative wellness experiences at Matrix Massage & Bodywork's Salem studio, serving Paddock Lake and the surrounding communities.

5. Select only **eyelash extensions** and apply a normal website hyperlink to:

   `https://www.matrixmassage.net/spa-and-beauty-services-salem-wi/eyelash-extensions-salem-wi`

   Open in the same window. Keep the inherited font/color; underline the new link. The render-equivalent exact reference is `pages/regional/paddock-lake/seo-b1-2026-11-13/body.html`. It is a reference for this native RichText control, not content for a new HTML embed.
6. Save. Read the saved text and link destination back through the control. Confirm the new phrase appears once and is linked once. Recheck **VIEW ALL SERVICES → /studio** and the other existing service links.
7. Check the desktop and existing mobile layout for clipping/overlap caused by wrapping. Do not redesign the section. If automatic text height does not contain the text cleanly, stop this row and return the selected control's dimensions and screenshot for a targeted correction.

**Checkpoint C1:** page/component identity; before/after text; exact saved hyperlink and target; preserved text styling; protected Studio link; desktop/mobile screenshots; save status/time. Publication has not yet occurred at this checkpoint.

## Step 2 — B07-01: five existing iframe facial links

1. Select **SKIN RESET BLUEPRINT** in **Pages & Menu**. Confirm page ID `ltyp8` and path `/skin-reset-blueprint-salem-wi`.
2. Select existing HTML component **`comp-moqgyn3g`** inside section **`comp-moqgwjg4`**. Open that component's existing **Edit Code / Enter Code** control. If the editor instead presents a URL embed or a different ownership model, stop and return that evidence; do not replace the component or invent native code.
3. Capture the current full saved code before modifying it. Compare it with `pages/skin-reset-blueprint/seo-b1-2026-11-13/iframe.before.html` (10,584 UTF-8 bytes, SHA-256 `0b3205780c9fa8eb69198902fa2ffaeb384df5b1c55636b6e29d36f8242a8746`). It begins `<section class="matrix-landing">` and ends `</section>`. The supplied file is the complete page HTML served at the actual public iframe URL, not a reconstruction.
4. If the saved code matches the baseline, replace it with the complete `pages/skin-reset-blueprint/seo-b1-2026-11-13/iframe.html` (10,749 UTF-8 bytes, SHA-256 `c61b191c5d8cab9a3dba3e7623613ca6b88426278c20c10d88696bf22110ead7`). The only changes are the five href values below. If current saved code differs, preserve it and stop this row for Chat to rebase the exact five-link patch; do not overwrite newer code.

   Before href, exactly five matches:

   `https://www.matrixmassage.net/facials-salem-wi`

   After href:

   `https://www.matrixmassage.net/spa-and-beauty-services-salem-wi/facials-salem-wi`

   The five existing anchor texts, in order, are **Anti-Aging Facials**, **Acne Control Facials**, **Barrier Repair Facials**, **facials in Salem, WI**, and **facial services in Salem, WI**. Preserve their existing target and other attributes. `pages/skin-reset-blueprint/seo-b1-2026-11-13/iframe.diff` shows the complete five-line change.
5. Update the existing component and save. Reopen the saved code and verify all five new hrefs and zero remaining old hrefs. Confirm all other code matches the baseline by reversing just those five substitutions; this inverse check must reproduce the baseline exactly.
6. Verify the existing H1, all guide-download links, booking routes, all text and styles remain unchanged. Preserve the iframe geometry. Preview the five links without submitting any form or booking.

**Checkpoint C2:** existing component ID; full before/after code hashes; exactly five href substitutions and their anchor labels; all other bytes preserved; saved component title/consent/dimensions unchanged; screenshot of the saved control and rendered iframe; save status/time.

## Step 3 — B07-04: native companion below the iframe

1. On the same Skin Reset page, confirm that no native **About the Skin Reset Blueprint** companion already exists. If an exact matching companion exists, record its assigned IDs and verify it; do not create another.
2. Add one native section immediately **after section `comp-moqgwjg4` and before `SITE_FOOTER`**. It must be outside the iframe. Do not place content over the footer or inside the existing iframe section. Do not alter the iframe section height to make room.
3. Use native Wix RichText content with a semantic **H2**, a body paragraph and a related-links paragraph. A single native RichText control containing these three blocks is sufficient. Use `pages/skin-reset-blueprint/seo-b1-2026-11-13/native-companion.reference.html` as the exact semantic content reference, and `pages/skin-reset-blueprint/seo-b1-2026-11-13/native-companion.visual-spec.json` as the specified styling specification. Do not paste this reference into an HTML embed.
4. Enter the following exact content:

   **H2:** About the Skin Reset Blueprint

   **Body:** Explore Matrix Massage & Bodywork’s educational guide to skin-barrier care, hydration, product tolerance and facial options. The guide does not diagnose or treat medical skin conditions.

   **Related links:** Explore facials in Salem, WI · Explore spa and beauty services

   Link **Explore facials in Salem, WI** to `https://www.matrixmassage.net/spa-and-beauty-services-salem-wi/facials-salem-wi`.

   Link **Explore spa and beauty services** to `https://www.matrixmassage.net/spa-and-beauty-services-salem-wi`.

5. Apply only local styles to the new section/control:

   | Setting | Desktop | Mobile |
   |---|---|---|
   | Section background | `#F7F6F0` | `#F7F6F0` |
   | Text color | `#111111` | `#111111` |
   | Font family | Arial | Arial |
   | H2 font size | 28px | 22px |
   | Body and link text size | 16px | 16px |
   | Body line height | 1.6 | 1.6 |
   | Section padding | 24px | 16px |
   | Content width | Centered, maximum 940px | Available width minus 32px, maximum 940px |
   | Link color | `#805F25`, underlined | `#805F25`, underlined |

   Keep text in ordinary document flow. For an editor requiring explicit section height, use the automatically fitted native RichText height plus the specified top and bottom padding; do not use a fixed text height that clips content. At 320px mobile width the available content width is 288px; at 375px it is 343px. No global text-theme modification is permitted.
6. Record the actual IDs assigned to the new section and native RichText control. Do not invent or reuse component IDs from another page. Preserve existing iframe/form geometry and allow the shared footer to flow below the new section.
7. Save and read back the exact H2, body and two hrefs. Preview at **320px**, **375px** and a desktop width. Confirm no horizontal overflow, overlap, clipping, blank intervening section or footer collision. Confirm the existing guide and booking routes still behave as before, without sending a form or making a booking.
8. If the editor cannot represent the specified native section/text flow or mobile styling with its existing controls, stop this row with screenshots and current dimensions. Do not substitute a second iframe, page-code renderer, hidden text or a page rebuild.

**Checkpoint C3:** new native section/control IDs; exact saved content and hrefs; local style values; section order; desktop/320px/375px screenshots; preserved existing iframe and footer; save status/time.

## Release verification

Publication is a separate live operation. Follow the active release instructions, verify the full pending sitewide scope, and preserve unrelated saved work. Do not infer release authorization from this source archive. A timeout requires readback before any retry.

After a permitted native body publication, independently open both permanent URLs and verify:

- Paddock's new **eyelash extensions** anchor appears once in the overview, points directly to the exact nested Lash canonical, and preserves **VIEW ALL SERVICES → /studio**.
- Skin's five existing iframe facial anchors point directly to the nested Facials canonical. All other iframe bytes, guide links, booking routes, title, consent settings and layout remain unchanged.
- The new native companion is outside the iframe, visible in the parent page, and contains the exact H2, paragraph and two ordinary href anchors.
- Native layout passes desktop, 320px and 375px checks with no clipping, overlap, overflow or footer collision. Preserve header, footer, maps and existing content.

Record separate source, saved-editor, tested-layout and published states. The receipt must contain actual timestamps, component IDs, before/after hashes, save/publication version, tested widths, link observations and any unresolved stop condition. Do not label an unobserved or unperformed step complete.

## Source verification limits

The supplied candidates pass source comparison checks. No native save, current saved-state inspection, native layout QA or publication is established by this source package. The baseline files are comparison evidence, not instructions to restore or overwrite newer work.
