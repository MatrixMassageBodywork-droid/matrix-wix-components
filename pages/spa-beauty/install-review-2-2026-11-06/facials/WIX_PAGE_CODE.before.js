/*
 * Main Facial page — Velo Page Code replacement for the EXISTING FACIALS page only.
 * Page identity: FACIALS
 * Existing Dataset ID: #matrixServicePageDataset
 * Existing Custom Element ID: #matrixServicePage
 * Existing Custom Element tag: matrix-service-page
 *
 * This code does not create a new page, tag, URL, booking flow, or dataset.
 * It reads one Long Text CMS field named `facialV2Json` from the existing
 * MatrixServicePages record connected to #matrixServicePageDataset.
 */

const FACIAL_ELEMENT = '#matrixServicePage';
const FACIAL_DATASET = '#matrixServicePageDataset';

$w.onReady(() => {
  const dataset = $w(FACIAL_DATASET);
  const component = $w(FACIAL_ELEMENT);

  const renderFacial = () => {
    const item = dataset.getCurrentItem();
    const payload = parseFacialPayload(item?.facialV2Json);

    if (!payload) {
      console.error('Main Facial V2 content is missing. Add the package JSON to the facialV2Json field in the existing MatrixServicePages facial record.');
      return;
    }

    // These three values are locked to the existing Main Facial component branch.
    payload.serviceKey = 'facials';
    payload.layoutVersion = 'FACIAL_AUTHORITY_V2';
    payload.canonicalUrl = 'https://www.matrixmassage.net/spa-and-beauty-services-salem-wi/facials-salem-wi';

    component.setAttribute('data-json', JSON.stringify(payload));
    component.seoMarkup = createSeoMarkup(payload);
  };

  dataset.onReady(() => {
    renderFacial();
  });

  // The component requests the same payload again only if it initializes before Wix data is ready.
  component.on('matrix-facial-needs-data', () => {
    renderFacial();
  });
});

function parseFacialPayload(rawValue) {
  if (!rawValue || typeof rawValue !== 'string') {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch (error) {
    console.error('The facialV2Json CMS field is not valid JSON. Restore the last saved version or use a JSON validator before saving.', error);
    return null;
  }
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[character]));
}

function createSeoMarkup(data) {
  const serviceGroups = Array.isArray(data.serviceGroups) ? data.serviceGroups : [];
  const pathways = Array.isArray(data.pathways) ? data.pathways : [];
  const faqs = Array.isArray(data.faqs) ? data.faqs : [];

  const servicesHtml = serviceGroups.map((group) => {
    const rows = (group.services || []).map((service) => `
      <article>
        <h4>${escapeHtml(service.title)}</h4>
        <p>${escapeHtml(service.durationLabel || '')}${service.priceLabel ? ` · ${escapeHtml(service.priceLabel)}` : ''}</p>
        <p>${escapeHtml(service.summary || '')}</p>
      </article>`).join('');
    return `<section><h3>${escapeHtml(group.groupTitle || '')}</h3><p>${escapeHtml(group.groupIntro || '')}</p>${rows}</section>`;
  }).join('');

  const pathwaysHtml = pathways.map((pathway) => `
    <article>
      <h3>${escapeHtml(pathway.cardTitle || '')}</h3>
      <p>${escapeHtml(pathway.cardCopy || '')}</p>
      <a href="${escapeHtml(pathway.detailUrl || '')}">${escapeHtml(pathway.cardCta || 'Explore')}</a>
    </article>`).join('');

  const faqHtml = faqs.map((faq) => `
    <article>
      <h3>${escapeHtml(faq.question || '')}</h3>
      <p>${escapeHtml(faq.answer || '')}</p>
    </article>`).join('');

  const custom = data.customFacial || {};
  const offer = data.featuredOffer || {};
  return `
    <main>
      <header>
        <p>${escapeHtml(data.heroEyebrow || '')}</p>
        <h1>${escapeHtml(data.h1 || '')}</h1>
        <p>${escapeHtml(data.heroCopy || '')}</p>
        <a href="${escapeHtml(data.bookingUrl || '')}">${escapeHtml(data.bookingCta || 'Book a Facial')}</a>
      </header>
      <section>
        <h2>${escapeHtml(custom.heading || '')}</h2>
        <p>${escapeHtml(custom.copy || '')}</p>
        <a href="${escapeHtml(custom.bookingUrl || data.bookingUrl || '')}">${escapeHtml(custom.cta || 'Book a Custom Facial')}</a>
      </section>
      <section>
        <h2>${escapeHtml(offer.title || '')}</h2>
        <p>${escapeHtml(offer.copy || '')}</p>
        <p>${escapeHtml(offer.priceLabel || '')}${offer.durationLabel ? ` · ${escapeHtml(offer.durationLabel)}` : ''}</p>
      </section>
      <section>
        <h2>${escapeHtml(data.servicesHeading || '')}</h2>
        <p>${escapeHtml(data.servicesIntro || '')}</p>
        ${servicesHtml}
      </section>
      <section id="skin-goals">
        <h2>${escapeHtml(data.pathwaysHeading || '')}</h2>
        <p>${escapeHtml(data.pathwaysIntro || '')}</p>
        ${pathwaysHtml}
      </section>
      <section>
        <h2>${escapeHtml(data.faqHeading || '')}</h2>
        ${faqHtml}
      </section>
      <footer>
        <h2>${escapeHtml(data.finalHeading || '')}</h2>
        <p>${escapeHtml(data.finalCopy || '')}</p>
        <a href="${escapeHtml(data.bookingUrl || '')}">${escapeHtml(data.bookingCta || 'Book a Facial')}</a>
      </footer>
    </main>`;
}
