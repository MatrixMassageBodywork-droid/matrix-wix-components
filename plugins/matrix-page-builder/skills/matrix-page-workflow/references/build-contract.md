# Local builder contract

`scripts/build_page.py` uses Python 3.10+ and only the standard library. It writes a **new local review directory** and never calls Wix, GitHub or any network service. It does not authorize installation or publication.

Prepare the complete service-specific `body.html` and scoped `style.css` first. The bundled approved MLD body/style are reference snapshots; new pages must have their own text, service imagery, IDs/classes and reviewed facts. Do not use the supplied MLD fixture as generic service copy.

Create `page-config.json` next to those files:

```json
{
  "serviceName": "Verified service name",
  "revision": "review-1",
  "tagName": "matrix-example-page",
  "elementId": "matrixExamplePage",
  "rootClass": "matrix-example",
  "pageUrl": "https://www.matrixmassage.net/verified-existing-or-approved-path",
  "seoTitle": "Exact captured title or approved new-page title",
  "seoDescription": "Exact captured description or approved new-page description",
  "seoSource": "Link/path to the current baseline or approved new-page specification",
  "bodyFile": "body.html",
  "cssFile": "style.css",
  "expectedFaqCount": 6
}
```

The example URL and text are placeholders, not live routes or approved copy. Use actual verified values. `expectedFaqCount` is optional and must equal the service's approved FAQ count when supplied; do not force every service to have six questions.

Run:

```sh
python /absolute/path/to/skill/scripts/build_page.py --config /absolute/path/page-config.json --out /absolute/path/review-1
```

Outputs: exact body/style copies, renderer with configured custom-element tag, `WIX_SEO_SNIPPET_CANDIDATE.js`, full-page `preview.html`, visible-text-derived FAQ JSON when present, and `build-manifest.json` containing hashes, links, image inventory and review-only status.

The snippet is **not a complete replacement page-code file**. Merge it into the target's captured code, keeping existing SEO, navigation, analytics and handlers. The builder does not change page metadata; the stored SEO values document the expected identity for comparison. No production code receives the proof's noindex head.

Production images/fonts must use verified served URLs. The proof references those assets and requires them to load; it is not advertised as an offline bundle. Archive original assets/provenance/mappings separately in the page repository folder.

Checks cover balanced body markup, a single H1, one root class, basic CSS scope presence, IDs, internal anchors, safe URL shapes, image alt attributes, no body scripts/head metadata/inline handlers, FAQ extraction and unique questions, and no inline base64 production assets. These are static checks, **not** a complete accessibility/CSS/security audit or evidence that Wix is saved/published. Inspect styling and all links/images, syntax-check renderer/snippet and run native/live QA.

If the output path exists, choose a fresh revision directory. Do not delete a completed build simply to bypass the overwrite protection. Keep the installed source immutable; update a current checkpoint only after actual readback.
