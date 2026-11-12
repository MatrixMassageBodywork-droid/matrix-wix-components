MATRIX WEBSITE — INFRARED SAUNA ONLY
2026-10-04 — America/Chicago
STATUS: SAUNA_RENDERER_GENERALIZATION_REQUIRED
No site mutations. No Save, deployment, production publication, or exposure change.

TARGET
Site: cdec8df6-d518-4859-9f1e-f06bf5346d41
Editor document: a276c9bf-bc17-4680-959b-a24ebe7370f6
Requested authority URL: https://www.matrixmassage.net/infrared-sauna-salem-wi
This is the requested/CMS URL, NOT a newly saved or runtime-verified page URL.

SOURCES CONSULTED
- matrix-release-checkpoint-2026-10-02.json, current version 3.
- MATRIX_SAVED_RUNTIME_QA_RECEIPT_2026-10-03.txt.
- MATRIX_NATIVE_TARGETS_AND_SETTLED_QA_RECEIPT_2026-10-03.txt.
- Canonical Drive Facial Campaign/CURRENT_STATUS_AND_REFERENCES.md, modified 2026-10-03T21:27:15.914Z. Later native-target receipt supersedes its unexecuted handoff status.
- Existing service-system installation references: WORK_INSTALL_PROMPT.txt and Facial QA/handoff references, used for architecture only, not as current execution authority.
- CURRENT MatrixServicePages/sauna-main, read via Wix CMS API.
- CURRENT installed public/custom-elements/matrix-service-page.js and existing FACIALS Page Code, read through the exact site's fresh Wix Editor.

STARTING CHECKPOINT
Prior saved/fresh-Editor verified menu: #horizontalMenu3 W960 H84 X10 Y23.
Prior saved/fresh-Editor verified header: W980 H134, Freezes.
These are carried forward from the named receipts and current user instruction. Native geometry and saved revision were not independently reread this run.
Prior Test723 exposure0% / Live2 exposure100%, with literal Version not found labels, are historical receipt facts, not current Release Manager readback.
Fresh current Editor loaded successfully. No current Site History revision or clean/saved status was independently established. No buffer edit, overwrite, Save, or discard was performed.

CURRENT CMS ROW — VERIFIED
Collection: MatrixServicePages. Item ID: sauna-main.
Exact serviceKey: sauna.
active: false. indexable: true. heroStyle: PHOTO.
_updatedDate: 2026-10-02T17:53:25.341Z.
h1: Infrared Sauna in Salem, WI
seoTitle: Infrared Sauna in Salem, WI | Matrix Wellness & Recovery
canonicalUrl: https://www.matrixmassage.net/infrared-sauna-salem-wi
logoUrl: https://static.wixstatic.com/media/e4cc43_1c6fb0c45df748cfa852ef777f4689f9~mv2.png
bookingUrl: https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services
bookingCta: VIEW SAUNA BOOKING OPTIONS
startingPriceLabel: PRIVATE 30-MINUTE SAUNA ADD-ON
servicesIntro: Square currently lists Infrared Sauna (Add-On) as a private 30-minute appointment for $35. The Custom Therapeutic Massage booking flow also offers a 30-minute sauna enhancement for $25; use the price shown for the treatment you select. Sauna is booked separately from hands-on care. Check Square for availability and ask Matrix about standalone sauna appointments.
No unsupported standalone price was found in this row. No Square application opened or current Square menu independently rechecked.
structuredDataJson contains one Service object; no BreadcrumbList or FAQPage in that field.
galleryJson: []. No heroBackgroundUrl, expectImageUrl, or productsImageUrl present in the returned current row.
galleryHeading: Show the actual sauna, room and client-ready setup.
galleryIntro: Use real Matrix sauna and wellness-room photography.
These are staging instructions, not completed customer-facing gallery content. No photo was chosen or substituted.

INSTALLED SOURCE EVIDENCE
Renderer captured in full from the Editor source pane: 17,764 characters.
Existing FACIALS Page Code captured in full: 4,903 characters.
These are fresh current-Editor buffer observations; no fresh-after-Save persistence claim is made.
Renderer source header identifies Matrix Service Page Engine v2.
Tag registration: customElements.define('matrix-service-page',MatrixServicePage).
Source comment identifies intended Wix element ID matrixServicePage; native Sauna element binding does not exist from this run and was not verified.

Renderer has zero heroStyle references. Although Page Code forwards p.heroStyle, the renderer does not branch on PHOTO or WATER.
Hero selection is exactly: hero=url(d.heroBackgroundUrl)||DEFAULTS.heroBackgroundUrl.
Default hero URL: https://static.wixstatic.com/media/11062b_2413040bb0e142369d76f3878b966792~mv2.jpeg
No current Sauna photo is supplied by sauna-main to override this fallback.
DEFAULTS.bookingCta is BOOK A FACIAL; section IDs remain skin-goals and facial-options.
Hydration event is matrix-facial-needs-data and runtime marker MATRIX_FACIAL_RUNTIME_VERSION='HYDRATION-1'. Names alone do not prove a functional failure; data lookups are partly generic.
Renderer always emits the split-media, tech-image and gallery sections. Empty image URLs omit only the img element, not their layout containers.
Gallery desktop CSS fixes two 320px rows even for an empty gallery array.
Therefore as-is reuse cannot satisfy the staged real-Sauna-photography and completed specialty-page requirements. Correct handling requires an approved content/code decision, not merely a new dataset filter.

PAGE CODE EVIDENCE
PAGE_DATASET='#matrixServicePageDataset'; EL='#matrixServicePage'.
Reads dataset.getCurrentItem().
Queries MatrixServices with categoryKey=page.serviceKey and active=true.
Queries MatrixSkinPathways with categoryKey=page.serviceKey and active=true.
Sends normalized payload through setAttribute('data-json',json) and sets seoMarkup=buildSeoMarkup(payload).
Thus serviceKey-driven loading is reusable in part; the implementation is not wholly hardcoded to the facials key.
However normalizePage does not retain structuredDataJson, and the entire Page Code has zero structuredDataJson, setStructuredData, or BreadcrumbList references.
No frontend SEO import/call applies the CMS title/canonical/schema. seoMarkup contains HTML headings/content, not CMS JSON-LD.
The existing Facial native SEO layer cannot be presumed available on a newly created Sauna page. No native SEO was modified or duplicated.

REQUESTED RECEIPT
Page created: NO.
Exact saved Sauna URL: NONE established this run.
Renderer reuse: BLOCKED — SAUNA_RENDERER_GENERALIZATION_REQUIRED.
Dataset/filter: NOT CREATED. Verified required values are MatrixServicePages, read-only, serviceKey=sauna; no active=true page-dataset gate.
Save persistence: NOT VERIFIED; Saves=0.
Test Site result: NOT TESTED; deployments=0.
Desktop: NOT TESTED.
Mobile: NOT TESTED; no viewport emulation attempted.
Overflow/internal scrollbar/footer gap: NOT TESTED.
Header/footer regression: NOT TESTED; edits=0.
SEO/schema: CMS title/canonical/Service verified; runtime and duplicate counts NOT TESTED; BreadcrumbList absent from current row and Page Code.
Body logo: CMS URL matches approval; rendered Sauna result NOT TESTED.
Booking CTA: CMS URL matches existing Matrix booking route; rendered/click result NOT TESTED.
Unrelated changes: 0. CMS changes: 0. Source changes: 0. Page/configuration changes: 0.
Production publish: NO. Release Manager exposure changes: 0. Indexing requests: 0.
AppSheet, Team OS Apps Script, Matrix Social Publisher, Google Analytics, Social OS: NOT OPENED.

EXACT NEXT BLOCKER
Chat must resolve the shared renderer's specialty/photo and empty-section behavior, stage approved real Sauna assets and completed gallery copy, and specify a Sauna-safe SEO/Breadcrumb binding while protecting the existing Facial implementation. No new renderer or code design was improvised in this Work run. Stop after this receipt.

