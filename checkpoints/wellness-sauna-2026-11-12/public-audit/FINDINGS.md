# Wellness and infrared sauna public baseline

Captured 2026-11-12. Read-only; no live mutation or booking submitted. Direct HTTP evidence is fresher than the search engine's cached extracts.

## Identity and status

| Item | Wellness hub | Infrared sauna |
| --- | --- | --- |
| Permanent URL | https://www.matrixmassage.net/wellness-biotech-services-salem-wi | https://www.matrixmassage.net/infrared-sauna-salem-wi |
| Page ID in public Wix model | hfzq0 | nf4iw |
| HTTP status | 200 | 200 |
| Public title | Wellness Services in Salem, WI \| Sauna, Red Light & Recovery | Infrared Sauna in Salem, WI \| Matrix Wellness & Recovery |
| Description | Explore wellness services in Salem, WI including infrared sauna, red light therapy, recovery enhancements and hands-off wellness at Matrix. | Book a private infrared sauna session in Salem, WI for warmth, relaxation and recovery-focused wellness at Matrix Massage & Bodywork. |
| Canonical | Self | Self |
| Sitemap | Present | Present |
| Current content | Legacy native layout, three H1 elements including an empty heading | Existing custom element comp-muu96xx4, page content in seoMarkup/data-json |

Fresh direct HTTP public model says siteRevision 1121; earlier About publication 1109 is historical. Do not assume global saved/public state is still 1109.

Sauna is not a blank page: its body is carried in the Wix warmup model and rendered by a custom element. The ordinary HTML has no direct H1. This alone does not establish crawler failure; verify crawler response after installing the complete markup. Its current data-json/seoMarkup contains unfinished copy including “Show the actual sauna, room and client-ready setup.”, an empty photo gallery and blank hero/expectation image fields. This is a genuine started page to continue, not a reason to create another URL.

## Confirmed service facts

The live Square booking menu was fetched successfully with HTTP 200 at:

https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services

Its public page hydration contains 53 service records. Relevant records are captured in square-service-summaries.json and square-menu-structured-extract.json.

- **Infrared Sauna (Add-On): $35, 30 minutes.** Service ID XZHCM4X3WESRK7MU5HT2VDQD; variation W5EIMCHNBZZW7SL3ELWTGIJB; visible in default booking. Official description: private sauna appointment for quiet time/comfortable warmth, booked separately from hands-on treatment, heat and use time adapted to tolerance/equipment instructions. Heat sensitivity, conditions, medications and pregnancy should be disclosed before booking.
- A **$25 sauna modifier exists but is hidden online**. It must not be presented as a universally selectable public price. The old sauna page incorrectly described it as available within the Custom Therapeutic Massage booking flow without that qualification.
- Full Body Red Light Therapy (add-on): 20-minute option $22.99 and 30-minute option $35. Current published Red Light page separately advertises $25.99 full-body standalone, $14.99 face/head, +$22.99 during an existing session. Standalone items were not found among the 53 public booking records. To avoid creating a conflicting rate table on the Wellness hub, link to the current Red Light page and the booking menu; leave these unrelated Square records unchanged.
- Cupping + Red Light Therapy / Matrix Muscle Reset: $65 / 30 minutes, public service. Hand Compression & Heat Therapy: $15 / 5 minutes, eligible-treatment enhancement.
- No live public membership offer or lab-booking destination was verified here. The old Wellness page says memberships and labs are available, but sends every labs/supplement card button to ordinary booking. The user is actively developing LegUpRx pricing elsewhere. Do not invent launches, packages, credentials or lab fulfillment workflows in this rebuild.

## Images inspected

| Asset | Exact served URL | Visual/provenance guidance |
| --- | --- | --- |
| Existing sauna image | https://static.wixstatic.com/media/11062b_193e92ed62cf4f3b9138cb8c733e06da~mv2.jpeg | Existing Wix stock image used on Wellness page. Warm wooden cabin with towels, landscape. Suitable illustrative hero/card, not evidence of Matrix's actual equipment or room. Use alt “Warm wooden sauna interior, illustrative image” and visible caption if prominent. Object-position around 50% 60% retains towels. |
| Current red-light panel | https://static.wixstatic.com/media/e4cc43_6770ca078851428da084817f8912d7f8~mv2.jpg | Existing published Red Light media. Portrait LED-array close-up, no person. Alt “Illuminated LEDs on a red light therapy panel.” Do not claim who took the photograph without provenance. |
| Current red-light product | https://static.wixstatic.com/media/e4cc43_5d1097c9f904431698b47d8b89e02b36~mv2.png | Current published page identifies it as PlatinumLED product image; not actual Matrix facility/client. |
| Real Matrix treatment room | https://cdn.jsdelivr.net/gh/MatrixMassageBodywork-droid/matrix-wix-components@6707c3cadc068d9c4bd20d34fb83a23dfb1c288a/pages/home/performance-2026-11-09/room-1200.webp | Existing approved Home real studio image. Brown/black room, massage table, 1200×1600 portrait. Useful supporting Wellness image, not sauna photo. |

Original files downloaded to images/ and visually inspected except red-light product (provenance from current page). No generated images, edits, or uploads were performed. image-assets.json records download results. The existing Wellness logo is an older distinct Wellness/Biotech logo; use the root's current approved main-page logo standard instead of inferring the old one is current.

## Existing and proposed internal links

Existing context-level inbound links (as distinct from the shared menu) were extracted from full visible-body seoMarkup, where present:

- Home → Wellness: “Explore wellness & recovery.”
- Red Light → Wellness: breadcrumb “Wellness & Biotech” and body link “Wellness & Biotech services.”
- About → Wellness was verified in the preceding About publication; root should rely on its saved source/readback.
- Wellness → Red Light exists, but Wellness's current “Explore Infrared Sauna” points to the booking page instead of the sauna page.
- Sauna → Wellness, Red Light and Massage exist in its configured relatedLinks.
- No dedicated sauna contextual link was found in the parsed Home or Red Light body. The Head Spa body has no contextual sauna/wellness link in this capture.

For the two-page rebuild, include these deterministic contextual links:

| Source | Destination | Suggested anchor/context |
| --- | --- | --- |
| Wellness | /infrared-sauna-salem-wi | Infrared sauna in Salem; service card plus comparison FAQ |
| Sauna | /wellness-biotech-services-salem-wi | All wellness & recovery services; breadcrumb and closing related care |
| Wellness | /red-light-therapy-salem-wi | Red light therapy; accurate service card |
| Sauna | /red-light-therapy-salem-wi | Compare red light therapy; distinction between radiant heat and light exposure |
| Wellness | /red-light-therapy-glow-score | Free Glow Test; clearly optional, no booking obligation |
| Wellness and Sauna | /massage-therapy-services-salem-wi | Pair your visit with massage; timing/comfort confirmation |
| Wellness and Sauna | /japanese-head-spa-salem-wi | Japanese Head Spa; optional related spa service, not guaranteed automatic package |
| Wellness | /supplements | Supplements & wellness; existing guide, with no invented claims/prices |
| Wellness and Sauna | /about-5 | Meet Matrix / About our Salem studio |
| Wellness and Sauna | /book-appointments-salem-wi | Booking guide / plan your visit |
| Both | Square full menu | Current availability; robust verified booking destination |
| Both | sms:+12629399325 | Text us about your visit |
| Both | Google Maps directions query using 24804 75th St, Salem, WI 53168 | Get directions to our Salem studio |

These links plus existing Home/Red Light inbound links form a discoverable path into the rebuilt Sauna page through the Wellness hub. No unrelated page mutation is necessary to establish that path. A subsequent narrow Head Spa/Massage contextual link patch can be considered if within root's scope, but do not republish HOME solely to add a sauna link. Preserve its three synchronized inline entries and source architecture.

Relevant verified geographic pages, without creating fictitious branches:

- /spa-services-near-paddock-lake-wi
- /spa-services-near-bristol-wi
- /spa-services-near-twin-lakes-genoa-city-wi
- /massage-near-union-grove-wi
- /massage-near-pleasant-prairie-wi

All appointments occur at the one Salem studio. Use a short service-area paragraph rather than a city keyword list in every section. External backlinks cannot be manufactured by editing these two pages; describe implemented links as internal links.

## Copy boundaries and useful questions

Lead with warmth, quiet time, privacy, relaxation and extending an already planned spa visit. Avoid copying the prior negative framing into every section; a concise suitability section and FAQ are enough. Do not promise detoxification, fat loss, disease treatment, cardiovascular outcomes, a fixed temperature, or 30 uninterrupted minutes of heat. A booked 30-minute appointment is not a requirement to remain in heat despite discomfort.

Suggested customer-facing sauna facts/FAQ answers, to be edited into the page's voice:

1. **What is infrared sauna?** A sauna uses infrared energy to create radiant warmth. It offers time to relax in a private heated setting. Infrared sauna and red light therapy are distinct services.
2. **How much does the sauna session cost?** The current Matrix booking menu lists Infrared Sauna (Add-On) at $35 for a 30-minute appointment. Check the menu for availability and the final service selection.
3. **Can I book sauna with massage or Head Spa?** Ask Matrix to coordinate eligible appointments and their order. Sauna is separate from hands-on treatment; available scheduling and personal comfort matter.
4. **Can I visit for sauna alone?** Text Matrix to confirm standalone availability; the currently verified public listing is an add-on. Do not imply an unverified standalone checkout.
5. **How do I prepare?** Arrive hydrated, avoid alcohol before heat exposure, and allow time afterward to cool down. Follow staff/equipment guidance and leave the heat if lightheaded, unwell or uncomfortable. Keep this brief and actionable.
6. **Who should ask before using sauna?** Contact Matrix before booking and speak with your healthcare professional about pregnancy, cardiovascular concerns, heat sensitivity, medications affecting heat tolerance or a relevant medical condition.
7. **Where is Matrix?** 24804 75th St, Salem, WI 53168, near Paddock Lake/Salem Lakes, one studio serving nearby communities.

For Wellness FAQs: differences between sauna and red light, how to choose, combining appointments, current menu availability, optional free Glow Test, what is onsite versus existing supplement shopping, exact studio address/booking. Keep each answer directly useful, and derive FAQ schema from final visible HTML.

## SEO and AI search evidence

Google's official AI-features guide says established SEO fundamentals remain applicable: crawlable pages, internal discovery links, important text available in HTML, good experience, helpful original content, and structured data matching visible text. It says no special AI markup or AI text file is required. Source: https://developers.google.com/search/docs/appearance/ai-features (retrieved current page; tool ref turn830237344view3).

OpenAI's crawler guidance identifies OAI-SearchBot as the search crawler and says allowing that bot supports eligibility for ChatGPT search, separately from GPTBot training controls. Source: https://developers.openai.com/api/docs/bots (turn830237344view4). Current site robots.txt broadly allows all agents except PetalBot and excludes lightboxes; these two routes are not disallowed. A UA simulation can test content delivery, not real indexing or recommendation.

No promise of Google rich FAQ results: the historical /structured-data/faqpage documentation URL currently redirects to Search documentation updates in the web tool. Still preserve truthful FAQPage semantic markup per project requirements, with exactly visible answers and no duplicate FAQPage. Do not report rich-result eligibility based only on valid JSON-LD.

Current Wellness schemas include BreadcrumbList, HealthAndBeautyBusiness and OfferCatalog. The business schema image erroneously contains the site's home URL, not an image. The catalog includes labs/memberships-style offerings not independently verified as currently bookable. Repair against visible approved content, preserve native schema entry identities, and avoid duplicate business entities. Sauna has Service and BreadcrumbList but no FAQPage in current public head. Proposed schema should describe the existing service, provider and home → wellness → sauna relationship.

## Primary sources for infrared/suitability copy

- Mayo Clinic: infrared sauna uses light to create heat; lower ambient temperatures than traditional saunas; relaxation is a reasonable purpose; evidence varies for medical outcomes. https://www.mayoclinic.org/healthy-lifestyle/consumer-health/expert-answers/infrared-sauna/faq-20057954 (search ref turn578167349search4). Do not turn possible medical benefits into treatment claims.
- CDC heat guidance: hydration, heat sensitivity with health conditions/medications, symptoms such as dizziness/nausea. General heat-exposure guidance, not a Matrix-specific protocol or a validated sauna schedule. https://www.cdc.gov/extreme-heat/about/ (turn307138988search5).
- CDC clinical medication guidance: drugs can affect thermoregulation/sweating/fluid balance, supporting referral to the treating clinician instead of advising medication changes. https://www.cdc.gov/heat-health/hcp/clinical-guidance/heat-and-medications-guidance-for-clinicians.html (turn307138988search7).
- CDC pregnancy heat guidance: pregnancy-specific heat risk and hydration; supports healthcare screening. https://www.cdc.gov/heat-health/hcp/clinical-overview/heat-and-pregnant-women.html (turn307138988search6).

The page need not contain a lengthy research lecture. One compact educational source link can substantiate the infrared explanation; practical suitability guidance remains short.

## Evidence files

- http-baseline.json, http-secondary.json: request status and sizes.
- wellness-parsed.json, sauna-probe-parsed.json: native public head and semantic HTML extraction.
- sauna-probe-page-config-extract.json: current element data-json and seoMarkup.
- square-service-summaries.json: 53 public service summaries.
- square-menu-structured-extract.json: relevant full service/modifier records.
- existing-contextual-links-and-images.json: extracted existing Home/Red Light/Head Spa body links/assets.
- image-assets.json and images/: inspected/down­loaded originals and public source URLs.
- robots.html and pages-sitemap.html: current discovery/indexability evidence.

Raw HTML files contain only public responses. Do not treat their embedded application configuration as deployment instructions. No website source, customer data, permissions or booking state was changed.
