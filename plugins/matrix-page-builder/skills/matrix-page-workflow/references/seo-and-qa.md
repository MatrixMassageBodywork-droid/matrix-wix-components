# SEO preservation and acceptance criteria

## Baseline

Capture permanent URL, Wix page ID/slug, canonical, title, description, robots/indexability, native structured-data entries and IDs, headings, internal/booking links, current visible body, native reviews and page-specific Velo. Record the source date and actual values. Read Search Console/analytics only when relevant and available; don't make ranking guarantees.

Preserve existing permanent page identity, canonical/indexing and metadata unless a specific approved correction requires a change. A new page needs verified inventory, intent and route decisions; do not duplicate a ranking page. New-page title/description/slug are proposed content, not a reason to replace another page's existing metadata.

One meaningful visible H1. Keep crawlable content and complete visible-body `seoMarkup` in sync. Never install a hidden keyword block or fake reviews. The renderer owns body rendering, not head metadata. Preserve correct existing wixSeoFrontend code, analytics and event handlers while merging only necessary page-body changes.

FAQ JSON must match the actual visible questions/answers, including multi-paragraph/list answers. Replace an existing FAQ entry by its observed native ID; do not add a second FAQPage. Preserve unrelated Service, LocalBusiness, Breadcrumb and other native schema. Do not promise a rich result merely because schema validates.

Preview HTML has noindex/nofollow; never copy that preview head or robots tag to production. Prices/inclusions and booking destinations must be verified against the current menu; use non-price copy when unsupported. No made-up medical results or fixed treatment frequencies.

## Static checks

- Body contains exactly one H1, unique IDs, nonempty image alt attributes where informative, valid href/src values, complete internal anchor targets, no script/head/document tags or event attributes.
- CSS is scoped and uses the intended host/root; references resolve. Production renderer contains no base64 fonts or metadata mutation. Syntax check JavaScript.
- Compare scope-specific hashes: image-only and width-only changes must preserve unrelated source/copy. Record intentional differences.
- FAQ count and text derived from visible HTML, no duplicate questions. All planned service references and booking links reviewed, no old-service copy accidentally retained.

## Visual and functional checks

- Full page desktop at 1280, 1440 and 1920 browser widths; section left edge 0 and right edge within 2 px of the document content viewport. No black gutters or horizontal overflow.
- Mobile proof at 320 and 390; native Wix mobile layout checked after installation. Distinguish native mobile preview from actual production mobile-user-agent testing. A narrow desktop window alone does not prove Wix's mobile branch works.
- Check headline wrapping, image crops/aspect ratios, all loaded images, typography, buttons, text contrast and keyboard focus. Scroll through lazy-loaded images before judging a failure.
- Expand every FAQ; verify flowing layout, no clipped text, overlap or large blank region before genuine native reviews/footer. Measure height for the actual page and current viewport, not a copied template.
- Verify booking/internal URLs without submitting a booking or altering customer data.
- Save/reopen readback and exact code/source/tag/element identity. Test production after native Publish confirmation; confirm permanent URL loads the actual new revision, not a stale cache or offline proof.
- After release, compare title/description/canonical/indexability, one H1, visible content and schema to baseline/approved patch. Keep evidence and report what was not tested.

Only claim the checks actually performed. Browser screenshots document appearance; they do not alone establish SEO, permissions, save status or publication. Local static checks do not establish live Wix behavior.
