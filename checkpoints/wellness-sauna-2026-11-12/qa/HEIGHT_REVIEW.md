# Native height review — Wellness and Infrared Sauna

Status: SOURCE REVIEWED; Wellness and Sauna native desktop/mobile FAQ flow and loaded images VERIFIED from operator evidence. Both final saved-code/source readbacks and SEO draft readbacks VERIFIED. NOT PUBLISHED. No Wix mutation performed by this reviewer.

## Source authority

- Remote branch `review/wellness-sauna-2026-11-12` freshly read on resume: `eaac30097ff251d67dbb1507a9449feb5618e409`, unchanged.
- Reviewed `docs/INSTALLATION_SPEC.md`, `qa/source-github-verification.json`, both `review-2/renderer.js` and CSS files, and the captured native section maps.
- Source readback checkpoint still covers all 95 text files and both original image blobs. Receipt-only commits must not change the runtime pin.

## What the renderer does

Both renderers mount scoped HTML/CSS directly into their custom element, set `display:block` and inline `height:auto`, then dispatch `matrix-ready` with only a revision string. The body article and its sections remain in normal document flow. FAQs use native `<details>`; opening them increases the article's intrinsic height and closing them reduces it. Neither renderer sets a fixed overall page height, positions the whole article absolutely, or places the main page body behind an overflow-clipping rule.

The Sauna custom-tag CSS also sets `min-height:0!important`. Wellness's absence of that declaration is not itself a failure: a small insertion minimum is below this page's full intrinsic content height. Do not change source solely because the editor initially reports a small number.

Neither renderer contains a ResizeObserver, a custom iframe messaging protocol, a call to a Wix height API, or a handler that changes the native saved section height. The Velo candidates set full `seoMarkup`; `matrix-ready` does not request resizing. Therefore the source guarantees normal intrinsic sizing inside its own document, not successful propagation through every native wrapper.

Wix's Classic Editor documentation explicitly says custom elements use an iframe in Editor and Preview, which can affect layout. It also identifies changing custom-element height as a supported use case. Source: https://support.wix.com/en/article/wix-editor-adding-a-custom-element-to-your-site . Do not apply Wix Studio's Inspector or app-widget registration sizing instructions to these existing Classic custom elements.

## Meaning of the initial numbers

Wellness element384 / section404 and Sauna section500 are insertion/editor geometry. They are not prescribed content heights or evidence that the loaded body is clipped. The element may resize after loading, and a section may retain an independent minimum or spacing. Measure the loaded state before deciding that any correction is needed.

The twenty-pixel Wellness difference must not be treated as an instruction to add twenty pixels to every measured height. If it remains in the fully rendered final layout, inspect its actual top/bottom offset and section spacing. Preserve the desired section relationship rather than hiding it behind a large fixed height.

## Deterministic measurement sequence

1. Reopen exact saved source/tag/ID and verify the revision. Enter the intended native desktop or mobile Preview mode.
2. Verify the correct article exists, one H1 is visible, all expected FAQs exist, every content image has `complete === true` and `naturalWidth > 0`, and the closing section is present. Wait for measurements to settle across consecutive observations; do not size from an unloaded shell or a lazy image placeholder.
3. In the custom element's inner document, record the article's bounding rectangle, `scrollHeight`, `scrollWidth`, and document content width. Measure `.matrix-wellness` or `.matrix-sauna`, not the entire document including shared header/reviews/footer. Since Preview is iframe-based, read the inner document through the supported frame interface; do not assume cross-origin `iframe.contentDocument` access.
4. In the surrounding native page document, record the actual custom-element wrapper, its iframe, its containing section, the next section and shared footer. Existing Sauna wrapper is `comp-muu96xx4`, section `comp-muu92bbq`. Wellness section is `comp-mppziogk1`; use the generated custom-element ID already recorded by root. The preserved review section is `comp-mppziohc`.
5. Record all-closed FAQ measurements, then open each FAQ via normal UI interaction and record the all-open state. Verify no answer is clipped, and the closing CTA remains below the FAQ section. Then close them all and confirm heights return without a dead band before reviews/footer.
6. Repeat in the native mobile view. Measurements from the 320/390 proof files are useful source-layout evidence but cannot substitute for Wix's mobile branch.

Suggested inner-document read-only measurement shape:

```javascript
const root = document.querySelector('.matrix-wellness'); // Sauna: .matrix-sauna
const r = root.getBoundingClientRect();
const closing = root.querySelector('.mw-close'); // Sauna: .ms-close
({
  article: { x: r.x, y: r.y, width: r.width, height: r.height, bottom: r.bottom },
  intrinsicHeight: Math.ceil(Math.max(r.height, root.scrollHeight)),
  scrollWidth: root.scrollWidth,
  contentViewportWidth: document.documentElement.clientWidth,
  faqCount: root.querySelectorAll('details').length,
  faqsOpen: root.querySelectorAll('details[open]').length,
  imageStates: [...root.querySelectorAll('img')].map(i => ({
    src: i.currentSrc || i.src,
    loaded: i.complete && i.naturalWidth > 0
  })),
  closingBottom: closing.getBoundingClientRect().bottom
});
```

The native wrapper and iframe must be inspected separately; this snippet does not prove their dimensions.

## Acceptance and correction boundaries

- Full-width native stretch remains enabled, side margins0, and top offset0 as specified. Root/body width should match the inner content viewport without horizontal overflow; outer section edges should match the native page content viewport within2px.
- The wrapper must accommodate the article, and its native section must accommodate the wrapper. Next reviews/footer must begin after the custom body's bottom, with no overlap or unexplained large gap. Account for known native padding/gaps explicitly; do not compare unrelated document coordinate spaces without converting offsets.
- A height that works only with all FAQs closed is insufficient. A fixed height chosen to fit all FAQs open is also insufficient if collapsing them leaves a large blank region.
- If a native fixed element/section height actually clips the loaded article, use the ceiling of the measured intrinsic content height at that exact native width, with its observed local offset, as the smallest diagnostic/native correction. Then verify both FAQ states again. Do not copy another page's height, reuse desktop height on mobile, or assume the old500/404 values must remain.
- If dynamic FAQ growth fails to move the surrounding native layout, stop the affected geometry change and return the inner/outer measurements. Do not invent a `postMessage` resize protocol, change global CSS, switch hosting modes, or add an oversized permanent spacer. A source change needs a specific observed failure and a supported sizing approach.
- Save/reopen any necessary page-local geometry change once and verify it persisted. Preserve the genuine Wellness review section and Sauna dataset/CMS/shared renderer throughout.

The previous About release used the same simple `height:auto` mounting pattern and passed open/closed FAQ flow on the published page, which is useful project precedent, not proof of these two current native layouts. Follow the current measurements.

## Native observations on resume — 13 November 2026 UTC

The browser operator reported these current Wellness observations. They are native-session findings supplied by the operator; this read-only reviewer has not independently operated the browser. Final saved-state screenshots and structured measurements belong in the final QA receipt.

1. A saved tag typo, `matrix-wellnss-page`, prevented mounting. The operator entered and saved the exact `matrix-wellness-page` tag, then confirmed the renderer mounted. No renderer change was needed.
2. Desktop inner width1348: closed article4912.765625px; initial outer wrapper4929px. With all7FAQs open, article5648.765625px, wrapper5648px and section5668px. Native wrapper and section therefore responded to FAQ growth in that desktop session.
3. The operator removed only the three specified old top-level content sections, preserved reviews `comp-mppziohc`, set the new element's section-relative top offset to0, and adjusted its local section to remove the observed20px band. Native numeric toolbar controls became editable after double-clicking their read-only display.
4. The first 320px mobile Preview showed a correctly rendered inner article7196.453125px while its wrapper and section remained125px across repeated observations. A manual7197px correction was considered but **not applied**.
5. Switching to the native mobile Editor and allowing the custom element to mount produced wrapper and section7196px, width320px and top offset0. This resolved the125px shell without changing source or manually fixing height. The operator saved this mobile initialization and verified Preview FAQ expansion and collapse, as recorded below.

The narrow diagnosis supported by these observations is an uninitialized mobile-editor layout state. That diagnosis is an inference from the change in behavior, not a documented general Wix125px rule. Do not attribute it to a missing ResizeObserver, change the renderer, or retain a speculative fixed expanded height.

Prior About evidence is consistent with the native resizing route: `matrix-about/qa/about-native-review2-evidence.json` records width320, mobile closed article7199.765625px, open article8481.0625px, wrapper8481px, section8501px, top gap0 and footer gap0. Those values are historical comparison only, never proposed heights for Wellness or Sauna.

Official documentation rechecked: https://support.wix.com/en/article/wix-editor-adding-a-custom-element-to-your-site . It explains that Classic Editor and Preview isolate custom elements in an iframe, which can affect layout, and supports matching the native tag to the registered custom-element name. It does not prescribe a mobile125px behavior or a custom resize-message protocol. Published-page behavior remains untested for these saved drafts; no publish or test-site action is authorized by this review.

### Completed Wellness native FAQ verification

The browser operator supplied `qa/native/wellness-desktop-qa.json` and `qa/native/wellness-mobile-qa.json`. These files were copied byte-exact from the shared evidence folder. Both report one H1 and seven FAQs. Desktop images are confirmed loaded. Mobile width and scrollWidth are both320px.

| Native mode/state | Inner article height | Wrapper height | Section height | Gap before reviews |
|---|---:|---:|---:|---:|
| Desktop1348, closed | 4912.765625 | 4929 | 4929 | 0 |
| Desktop1348, all7open | 5648.765625 | 5648 | 5648 | 0 |
| Desktop1348, closed again | 4912.765625 | 4929 | 4929 | 0 |
| Mobile320, closed | 7196.453125 | 7196 | 7196 | 0 |
| Mobile320, all7open | 8732.703125 | 8732 | 8732 | 0 |
| Mobile320, closed again | 7196.453125 | 7196 | 7196 | 0 |

The operator confirmed the mobile FAQs were closed again with keyboard Enter. The saved Wellness page-code readback is byte-identical to the candidate:13,518bytes, SHA256 `34b69ed14bafa6591d88e55c08e120e14e4180ed8100da56c65242b6e49edd86`. Four native screenshots were inspected and copied; the screenshot originally named `wellness-native-services.jpg` is correctly classified as `wellness-native-goals-section.jpg`. Blank proof screenshots were excluded.

A separate image-evidence check is now resolved: the earlier mobile `collapsedAgain.images` capture listed loaded=false and empty src for two service-card images before those cards entered the viewport. The later `qa/native/wellness-mobile-images-final.json` records all three images loaded with the correct sources. Native mobile Sauna and Red Light card screenshots visually confirm both images render. This later evidence supersedes the earlier lazy-loading observation; the original JSON is retained without alteration.

### Completed Sauna native FAQ verification

The existing Sauna element uses the exact pinned review-2 URL and `matrix-sauna-page` tag, retaining its original Velo ID. Its final saved-code readback `qa/native/sauna-code-final-saved-readback.js` matches the candidate byte-for-byte: 12,694 bytes, SHA256 `8bc82a35c12d06c23a05181029067cd526a4196a0428504a58fc2c439b1f8283`. Mounted-settings and installation evidence confirm the actual source/tag. The earlier buffer capture is retained as historical evidence and superseded for current saved-state verification.

The initial desktop4566px observation is superseded by the fully loaded final QA captures in `qa/native/sauna-desktop-qa.json` and `qa/native/sauna-mobile-qa.json`. Both report one H1, eight FAQs and every image loaded. Width and scrollWidth match1348px on desktop and320px on mobile. The browser operator confirmed all eight FAQs were opened and closed with the keyboard; native source, tag and permanent component/Velo identities are preserved.

| Native mode/state | Inner article height | Wrapper height | Section height | Gap before footer |
|---|---:|---:|---:|---:|
| Desktop1348, closed | 4669.6875 | 4669 | 4669 | 0 |
| Desktop1348, all8open | 5431.28125 | 5431 | 5431 | 0 |
| Desktop1348, closed again | 4669.6875 | 4670 | 4670 | 0 |
| Mobile320, closed | 7633.578125 | 7634 | 7644 | 10 |
| Mobile320, all8open | 9185.328125 | 9185 | 9195 | 10 |
| Mobile320, closed again | 7633.578125 | 7634 | 7644 | 10 |

The 10 px mobile difference is stable local section spacing across FAQ states, not an expanding empty region. Wrapper and section both track content growth and contraction. Native desktop and mobile hero screenshots were inspected and retained. Final saved-code/source reopening and the final native Save confirmation are now captured. Final SEO readback independently confirms both page drafts saved with accepted tags matching the candidates and protected resolved head unchanged. No native revision number was obtained; none is inferred from prior baseline values.

Fractional inner versus rounded outer heights alone are not a failure if full content and following flow remain visible. No custom resize-message protocol, source revision or fixed expanded-height workaround was introduced.
