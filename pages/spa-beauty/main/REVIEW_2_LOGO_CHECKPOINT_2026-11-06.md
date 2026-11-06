# Current — Spa & Beauty design review 2: larger framed logo

The owner approved the overall design visually and requested a specific revision: make the Matrix logo larger than the H1 and add a black border around the white box, using their screenshot as a framing reference. This does not authorize installation or publication.

## Exact change

Keep the same approved Main Massage logo asset. Display it in a 660 × 330 px white/light panel with a 6 px black border on desktop. Use a responsive 2:1 panel and 4 px border on phones. CSS object-fit crops only the original image's surrounding blank space; the complete logo artwork is visible and unchanged. No new logo or image was generated.

Reduce the hero H1 to a maximum of 46 px on desktop and 30 px on phones so the logo is visually dominant. Preserve its exact text and H1 semantics. All service copy, links, images, FAQ content, metadata candidates, and the rest of the design remain unchanged. Current internal build: `review-3/`; owner-facing review: 2.

## Verification and evidence

Visible HTML differs from review-2 only in logo width/height attributes. Configuration differs only in review revision. The renderer passes JavaScript syntax checking. The builder verifies one H1 and four FAQs. Desktop and phone visual proofs are in `qa/review-2/`; measured bounds are in `responsive-check.json`. The complete updated page remains available in `proofs/`, with desktop/mobile controls.

The preview wrapper also explicitly synchronizes iframe height on load and hides its inner scrollbar; scrolling belongs to the outer complete-page viewer. This has no effect on the proposed Wix renderer.

Two full-page screenshot export attempts timed out; previous full-page screenshots remain explicitly labeled as initial-review evidence. Current hero captures and complete HTML/browser proofs document the revision.

## Status and boundaries

SAVED source and preview; remote verification recorded through the GitHub save workflow.
TESTED local desktop and phone hero layout. Live Wix rendering is NOT TESTED for this revision.
NOT INSTALLED / NOT PUBLISHED. Existing live URL, SEO/indexing, header/footer and genuine reviews remain unchanged.

Prior source/SEO baseline: `REVIEW_CHECKPOINT_2026-11-06.md` and `baseline/`. Prior complete save: 0191182660d5eb1a83159603b8cb82ed722d066f. Prior builds and proofs remain in Git history. Await owner review of the requested logo adjustment.
