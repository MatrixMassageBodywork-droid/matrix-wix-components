# Spa & Beauty subpages — owner review — 2026-11-06

Status: SAVED DRAFT / BROWSER TESTED / NOT INSTALLED / NOT PUBLISHED.

Prepared for DaNelle's approval in FACIAL WEB SEO PW. This continues the published Spa & Beauty main hub; it does not rebuild or republish the main hub.

## Scope and review files

| Existing page | Draft proof | Content focus |
|---|---|---|
| Facials | `../facials/review-1/preview.html` | Custom and Circadia facials, acne-prone skin, dermaplaning, all six existing skin-goal pathways |
| Japanese Head Spa | `../head-spa/review-1/preview.html` | Current seven-service Square menu, customized scalp care, infusions, preparation and FAQs |
| Waxing | `../waxing/review-1/preview.html` | Current face/body waxing categories, preparation, suitability and aftercare |

The cloud preview has a draft-review navigation bar linking all three entire page bodies. That bar is not production content. Shared Wix header, footer and genuine reviews are outside these page-body drafts and must be retained during future installation.

## Owner requirements implemented

- Approved Matrix logo, smaller than main-page treatment, surrounded by a solid 4px black border.
- Six distinct newly generated service-relevant images: two for each subpage, with source provenance and optimized WebP files. Images are illustrative and do not claim to depict actual Matrix clients or the facility.
- Cream sections, deep teal, sage accents and dark teal water near the closing booking section.
- Full-width body sections; responsive card layouts and expandable FAQs.
- Facials explicitly covers acne-prone skin in the hero, dedicated section, Custom Facial card, Clear + Balance pathway and FAQ. The FAQ includes the natural-language query “Do you offer anti-acne facials?” without claiming medical treatment or guaranteed results.
- Existing page URLs, titles, canonical identities and relevant internal destinations retained. Proposed description/schema updates are separately recorded in `SEO_PRESERVATION_AND_PROPOSED_PATCH.json`.

## Authoritative inputs

- Existing project folder: https://drive.google.com/drive/folders/1jthRMAHOoockNm8hAVBK6mz4iaHbhNK8
- Published main-hub checkpoint: https://drive.google.com/file/d/1fu0duqYfbbzeSqdTghqZ8-aXf9WayoDk/view
- Repository: https://github.com/MatrixMassageBodywork-droid/matrix-wix-components
- Asset revision: `2144cb97570bc101d7f70cf9983d59ee39482998`. This includes the repaired waxing hero WebP; all six optimized images returned HTTP 200 with nonempty bytes.
- Public source HTML/metadata, live rendered page snapshots and current Square menu are captured in `baseline/`. Compressed HTML snapshots are exact gzip copies, not rewritten pages.
- Fresh public URL/metadata check: `link-and-live-head-audit.json`, 2026-11-06.

The head-spa page's older visible service names were superseded by the current Square menu and current native Service OfferCatalog. Draft offerings follow the current menu. No unverified lash page, new facial product, extraction guarantee, waxing body area or price has been invented. Regional pages and the six facial pathway pages remain unchanged.

## Verified checks

| Check | Result |
|---|---|
| Build validation | Three renderers built; exactly one H1 each; valid body links and IDs; FAQs generated from visible text |
| JavaScript parsing | `node --check` passed for all three renderers |
| Responsive browser DOM | All three pages passed at 320, 390, 1280, 1440 and 1920px document widths; no horizontal overflow; full-width root sections |
| Logo requirement | Computed 4px solid black border on every tested page/width |
| Desktop images | All nine content images across the three pages loaded, including logos |
| Expanded FAQ flow | All 6/8/8 FAQs opened on desktop and at a nominal 320px iframe viewport; no overflow or overlap with following section |
| Mobile FAQ width detail | Browser scrollbar reduced the available document width to 305px during this test; scrollWidth remained 305px |
| Link HTTP audit | 19 of 27 unique URLs returned 200; eight Square destinations returned 429 |
| Production website links | All audited Matrix website URLs returned 200, including all six facial pathway destinations |
| Image HTTP audit | All six new WebP URLs returned 200 with nonzero bytes |

Evidence is in `qa/`, including machine-readable responsive and expanded-FAQ checks and representative desktop/mobile screenshots. Full-page screenshot export timed out; the entire scrollable HTML proof and section-level screenshots are provided instead. Screenshot files are evidence of the standalone preview, not of Wix installation.

## Not yet tested / limitations

- Eight Square links require another direct booking-destination check before publication. Existing observed menu destinations have been retained; 429 is a verification limit, not proof of broken links.
- No booking was submitted and no customer data was changed.
- Native Wix custom-element IDs, existing page code and current schema entry IDs have not been freshly captured for installation. Proposed tag/element IDs in the candidate snippets are placeholders, not observed bindings.
- Native Wix desktop/mobile element heights, Test Site rendering, runtime SEO markup, shared-header/footer integration and production behavior are NOT TESTED for these new drafts.
- Search ranking and AI inclusion cannot be guaranteed. No claim is made that draft content has already changed live SEO.

## Release boundary and next step

Wait for owner design approval before any Wix installation or publication. After approval, consult the current project documents and this checkpoint, then capture fresh existing page code, bindings, native SEO/schema entries and layouts. Design the exact merge and deterministic execution instructions from that capture; do not paste the candidate snippet as a full page-code replacement.

Install one page at a time with small saves and read-back verification. Keep URLs, effective indexing, canonical identities, shared systems, analytics, existing reviews, and unrelated pages intact. Replace or update matching native FAQ entries rather than adding duplicates. Ensure `.seoMarkup` matches the approved visible body. Use Test Site for custom-element QA if ordinary Editor Preview is blank. Verify closed and fully expanded FAQ heights on native desktop/mobile before release.

Publication requires owner authorization, successful Test Site QA, resolved booking checks, and a final receipt distinguishing SAVED, VERIFIED, TESTED and PUBLISHED.

## Primary reference guidance

- Google AI search fundamentals: https://developers.google.com/search/docs/appearance/ai-features
- Google AI optimization guide: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- AAD acne skin care: https://www.aad.org/public/diseases/acne/skin-care/tips
- AAD waxing precautions: https://www.aad.org/public/everyday-care/skin-care-basics/hair/how-to-wax

These informed clear visible answers, accurate service/entity information and conservative suitability wording. No hidden keyword text or special AI-only schema was introduced.
