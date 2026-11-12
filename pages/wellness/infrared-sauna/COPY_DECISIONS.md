# Infrared Sauna — Review 1 copy and design decisions

Prepared 12 November 2026 for the existing page `nf4iw` at `/infrared-sauna-salem-wi`.

## Scope and status

DESIGNED: Complete page body, scoped CSS, eight FAQs and metadata-preservation config.
STATIC QA: Builder passes; renderer passes `node --check`.
NOT TESTED: Browser appearance, native Wix layout/flow, installed page code, published page and actual crawler delivery.
NOT INSTALLED / NOT PUBLISHED by this authoring task.

Review 1 contains 946 words, one H1, eight visible FAQ pairs and 26 link instances. The builder generates the same visible-body SEO snippet and extracts FAQ JSON directly from this body.

## Current facts

- Source: `../public-audit/square-service-summaries.json`, public Square menu captured 12 November 2026. The actual listing is **Infrared Sauna (Add-On)**, item `XZHCM4X3WESRK7MU5HT2VDQD`, variation `W5EIMCHNBZZW7SL3ELWTGIJB`, **30 Minute Session / $35**.
- Booking: `https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services`.
- The Square description establishes private appointments, quiet time, comfortable warmth, separate booking from hands-on treatment, and adaptation to tolerance/equipment instructions.
- No public standalone sauna listing was found among 53 visible services. The page invites a text inquiry about sauna-only availability rather than advertising a standalone price.
- The old $25 massage enhancement was `hidden_online:true`; it is omitted from the page.
- Address and contact: 24804 75th St, Salem, WI 53168; text 262-939-9325.
- Title and description exactly preserve `../seo-baseline/infrared-sauna.json` captured `2026-11-12T21:30:42.970Z`. No preview head metadata is intended for production.

## Design and imagery

The subpage uses the exact approved Bodywork logo in a smaller black frame, a cream hero copy panel, dark teal water surround, and the existing warm wood sauna stock image. A visible caption says **“Sauna atmosphere · illustrative image.”** Its alt text also identifies it as illustrative. It is not represented as the actual Matrix room or equipment. No new imagery was generated.

Photo: `https://static.wixstatic.com/media/11062b_193e92ed62cf4f3b9138cb8c733e06da~mv2.jpeg` (public audit HTTP 200, 732,573 bytes). Original inspected visually.

Logo: `https://static.wixstatic.com/media/e4cc43_c35a32fb07bc4445bb822ed185350e25~mv2.jpg`.

Water: approved `11062b_2413040bb0e142369d76f3878b966792~mv2.jpeg` with the same optimized 1600×900 Wix derivative used in About review 3.

Root class: `matrix-sauna`; CSS prefix: `ms-`; custom element tag: `matrix-sauna-page`; candidate existing element ID: `matrixServicePageV21` (fresh native capture required before installation). Container queries keep responsive behavior relative to the Wix host.

## Linking and content

Visible breadcrumbs are Home → Wellness & Biotech → Infrared Sauna. Contextual links lead to Wellness, Red Light, Massage, Head Spa, About and the Booking information page. Directions and text links are present. Regional guide links cover Bristol, Twin Lakes/Genoa City and Pleasant Prairie. All routes come from the verified native inventory/public audit. Inbound links are a separate parent-task verification, not established by this page file alone.

The page avoids equipment models, guaranteed outcomes, clinical treatment claims, weight-loss/detox claims, session-frequency prescriptions, invented included amenities, towels, operating hours, staff identities or services.

## Source basis for the brief heat FAQ

The public-audit agent verified these primary clinical/public-health sources:

- Mayo Clinic, infrared sauna explanation: https://www.mayoclinic.org/healthy-lifestyle/consumer-health/expert-answers/infrared-sauna/faq-20057954
- CDC, heat and medicines: https://www.cdc.gov/heat-health/hcp/clinical-guidance/heat-and-medications-guidance-for-clinicians.html
- CDC, heat and pregnancy: https://www.cdc.gov/heat-health/hcp/clinical-overview/heat-and-pregnant-women.html
- CDC, heat symptoms/hydration: https://www.cdc.gov/extreme-heat/about/

The short FAQ asks for clinician guidance for relevant conditions/pregnancy/medicines, hydration, adherence to studio instructions, and leaving heat if unwell. It does not convert general heat guidance into a specific sauna protocol or prescribe medical care.

## Parent implementation follow-up

1. Inspect native body/section/dataset/page-code dependencies before replacing the old partial renderer.
2. Verify visual proof desktop/mobile and all eight FAQ expansions before native installation.
3. Reconcile native Service and BreadcrumbList entries by their existing IDs; add matching FAQ markup once. Current breadcrumb schema may need the visible Wellness middle item.
4. Keep full visible body and `seoMarkup` identical; avoid retaining obsolete CMS staging text as duplicate crawlable content.
5. Preserve shared header/footer and unrelated draft1122; publication requires its own authorized scope.
