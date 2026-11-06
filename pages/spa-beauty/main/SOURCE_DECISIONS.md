# Source decisions — 2026-11-06 UTC

## Canonical project

FACIAL WEB SEO PW: https://drive.google.com/drive/folders/1jthRMAHOoockNm8hAVBK6mz4iaHbhNK8
Parent documentation root: https://drive.google.com/drive/folders/1ECziqNBjbWlcQ4ndD8-NE33lfdPRcTMh

Project master read: https://docs.google.com/document/d/14NDrwuldZnlengsGIaNKAy6vU8Axj9EBriBq2rJUo9I/edit
Control/architecture read: https://docs.google.com/document/d/1Triw8gKpK1zBOvC2cViEAIBF_PgXEftLQBX6I8JI38A/edit
Later verified static implementation evidence in this repository supersedes earlier native-card/CMS directions where they conflict. Current main renderer and published M4 source/checkpoint were read before designing. Main Massage and facials were visually reviewed.

Repository base before this task: 448c9e13c56a56513a2cd6a8adfe56d757f4bf4f.
New image asset commit: da120f1a8a3c621b17a2c9828ce6b069f9296662. Four optimized image CDN responses were verified byte-for-byte against local files.

## Official public sources read

- Existing hub: https://www.matrixmassage.net/spa-and-beauty-services-salem-wi
- Main reference: https://www.matrixmassage.net/massage-therapy-services-salem-wi
- Facial reference: https://www.matrixmassage.net/spa-and-beauty-services-salem-wi/facials-salem-wi
- Head Spa: https://www.matrixmassage.net/japanese-head-spa-salem-wi
- Waxing: https://www.matrixmassage.net/spa-and-beauty-services-salem-wi/hair-removal-waxing-salem-wi
- Existing booking page: https://www.matrixmassage.net/book-appointments-salem-wi
- Current bookable catalog, reached from the booking page: https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services

Website metadata and source content were checked through web retrieval and direct public page captures. Current visible menu and service-specific hrefs were read in the Square public booking UI. No appointment, customer data or communication was submitted. Extracted public content is archived without Wix runtime scripts or session configuration.

## Offering decisions

The hub covers facials/dermaplaning, Japanese Head Spa, lash extensions and face/body waxing. Current Square lists Classic, Hybrid and Volume full sets and 1/2/3-week fills. Lashes therefore belong on the hub even though the old page had only three cards.

Use current Square name **Matrix Head Spa + Hydrating Glow Facial** for the combined ritual; avoid repeating an older website ritual name. Current menu also supports Scalp Cleanse & Refresh, Signature Head Spa, longer rituals, Facial & Head/Scalp Massage, Back Renewal, listed enhancements, red light and sauna. Leave exact prices and durations to the current booking menu because site descriptions and live variants differ. No seasonal promo or unsupported service was introduced.

## Logo, visuals and shell

The hero uses `e4cc43_c35a32fb07bc4445bb822ed185350e25~mv2.jpg`, copied from the current approved Main Massage renderer. The bundled design-system reference also named a different older logo. Actual approved Main source takes precedence for this user request. `beauty-logo.png` is an unused reference asset; do not substitute it.

Water: `11062b_2413040bb0e142369d76f3878b966792~mv2.jpeg`. Four new AI illustrations are specific to facial care, Head Spa, lashes and waxing. They are not represented as actual studio photographs or treatment results. Prompts and originals are retained. Cormorant font is already repository-backed in the approved massage assets and pinned to its prior commit.

Renderer contains page body only. Header/footer and existing genuine testimonials are represented in the proof for page context; they are not proposed replacement components. Three review quotations and displayed attribution were copied from the original live carousel. The first quote has no displayed name. The old review logo remains only in that existing-context section.
