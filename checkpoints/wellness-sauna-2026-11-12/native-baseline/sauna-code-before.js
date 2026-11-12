/**
 * Matrix Service Page V2.1 — Wix Page Code
 * SERVICE_KEY: sauna
 *
 * Safe installation rules:
 * - Existing page only; no duplicate authority page.
 * - Dataset ID: #matrixServicePageDataset
 * - Dataset collection: MatrixServicePages, read-only
 * - Dataset filter: serviceKey = sauna
 * - Do NOT add active=true to the page dataset during Test Site QA.
 * - Custom element ID: #matrixServicePageV21
 * - Custom element tag/source: matrix-service-page-v21 / public/custom-elements/matrix-service-page-v21.js
 * - This code never writes SEO tags or JSON-LD into document head. Native Wix SEO remains authoritative.
 */

import wixData from 'wix-data';

const PAGE_DATASET = '#matrixServicePageDataset';
const EL = '#matrixServicePageV21';
const EXPECTED_SERVICE_KEY = 'sauna';
const BOOKING_URL = 'https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services';
const RELATED_LINKS = [
  {
    label: 'WELLNESS & BIOTECH',
    url: 'https://www.matrixmassage.net/wellness-biotech-services-salem-wi'
  },
  {
    label: 'RED LIGHT THERAPY',
    url: 'https://www.matrixmassage.net/red-light-therapy-salem-wi'
  },
  {
    label: 'MASSAGE THERAPY',
    url: 'https://www.matrixmassage.net/massage-therapy-services-salem-wi'
  }
];

$w.onReady(async function () {
  const element = $w(EL);

  try {
    const page = await loadPageRecord(EXPECTED_SERVICE_KEY);

    const [services, pathways] = await Promise.all([
      loadServices(page.serviceKey),
      loadPathways(page.serviceKey)
    ]);

    const payload = {
      ...normalizePage(page),
      services: services.map(normalizeService),
      pathways: pathways.map(normalizePathway),
      relatedLinks: RELATED_LINKS
    };

    element.setAttribute('data-json', JSON.stringify(payload));
    element.seoMarkup = buildSeoMarkup(payload);
  } catch (error) {
    console.error(`[Matrix Service V2.1] ${EXPECTED_SERVICE_KEY} initialization failed`, error);
    element.setAttribute('data-json', JSON.stringify({
      renderError: true,
      errorMessage: 'This Matrix service page did not finish loading. Please use the booking menu or try again.',
      bookingUrl: BOOKING_URL
    }));
    element.seoMarkup = '';
  }
});

async function loadPageRecord(serviceKey) {
  const dataset = $w(PAGE_DATASET);

  try {
    await waitForDataset(dataset, 7000);
    const current = dataset.getCurrentItem();
    if (current && current.serviceKey === serviceKey) {
      return current;
    }
  } catch (error) {
    console.warn(`[Matrix Service V2.1] dataset fallback used for ${serviceKey}`, error);
  }

  const result = await wixData.query('MatrixServicePages')
    .eq('serviceKey', serviceKey)
    .limit(2)
    .find();

  if (result.items.length !== 1) {
    throw new Error(`Expected exactly one MatrixServicePages row for ${serviceKey}; found ${result.items.length}.`);
  }

  return result.items[0];
}

function waitForDataset(dataset, timeoutMs) {
  return new Promise((resolve, reject) => {
    let settled = false;

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      reject(new Error(`Dataset ${PAGE_DATASET} did not become ready within ${timeoutMs}ms.`));
    }, timeoutMs);

    dataset.onReady(() => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve();
    });
  });
}

async function loadServices(categoryKey) {
  if (!categoryKey) return [];

  const result = await wixData.query('MatrixServices')
    .eq('categoryKey', categoryKey)
    .eq('active', true)
    .ascending('sortOrder')
    .limit(50)
    .find();

  return result.items || [];
}

async function loadPathways(categoryKey) {
  if (!categoryKey) return [];

  const result = await wixData.query('MatrixSkinPathways')
    .eq('categoryKey', categoryKey)
    .eq('active', true)
    .ascending('sortOrder')
    .limit(50)
    .find();

  return result.items || [];
}

function normalizePage(p) {
  return {
    serviceKey: p.serviceKey || '',
    pageLevel: p.pageLevel || 'SERVICE',
    heroStyle: p.heroStyle || 'DARK',
    brand: p.brand || 'Matrix Massage & Bodywork',
    heroEyebrow: p.heroEyebrow || '',
    h1: p.h1 || p.title || '',
    heroItalic: p.heroItalic || '',
    heroCopy: p.heroCopy || '',
    startingPriceLabel: p.startingPriceLabel || '',
    heroMeta2: p.heroMeta2 || '',
    bookingCta: p.bookingCta || 'VIEW BOOKING OPTIONS',
    bookingUrl: p.bookingUrl || BOOKING_URL,
    secondaryCta: p.secondaryCta || '',
    secondaryUrl: p.secondaryUrl || '',
    logoUrl: p.logoUrl || '',
    heroBackgroundUrl: p.heroBackgroundUrl || '',
    introBandHeading: p.introBandHeading || '',
    introBandCopy: p.introBandCopy || '',
    pathwaysEyebrow: p.pathwaysEyebrow || '',
    pathwaysHeading: p.pathwaysHeading || '',
    pathwaysIntro: p.pathwaysIntro || '',
    servicesEyebrow: p.servicesEyebrow || '',
    servicesHeading: p.servicesHeading || '',
    servicesIntro: p.servicesIntro || '',
    expectEyebrow: p.expectEyebrow || '',
    expectHeading: p.expectHeading || '',
    expectIntro: p.expectIntro || '',
    expectStepsJson: p.expectStepsJson || '[]',
    expectImageUrl: p.expectImageUrl || '',
    expectImageAlt: p.expectImageAlt || '',
    techEyebrow: p.techEyebrow || '',
    techHeading: p.techHeading || '',
    techCopy: p.techCopy || '',
    techBulletsJson: p.techBulletsJson || '[]',
    productsImageUrl: p.productsImageUrl || '',
    productsImageAlt: p.productsImageAlt || '',
    galleryEyebrow: p.galleryEyebrow || '',
    galleryHeading: p.galleryHeading || '',
    galleryIntro: p.galleryIntro || '',
    galleryJson: p.galleryJson || '[]',
    faqEyebrow: p.faqEyebrow || '',
    faqHeading: p.faqHeading || '',
    faqJson: p.faqJson || '[]',
    finalEyebrow: p.finalEyebrow || '',
    finalHeading: p.finalHeading || '',
    finalCopy: p.finalCopy || '',
    locationLine: p.locationLine || '',
    seoTitle: p.seoTitle || '',
    seoDescription: p.seoDescription || '',
    canonicalUrl: p.canonicalUrl || '',
    structuredDataJson: p.structuredDataJson || '',
    indexable: p.indexable !== false
  };
}

function normalizeService(s) {
  return {
    serviceKey: s.serviceKey || '',
    title: s.title || '',
    durationLabel: s.durationLabel || '',
    priceLabel: s.priceLabel || '',
    bestFor: s.bestFor || '',
    summary: s.summary || '',
    bookingUrl: s.bookingUrl || BOOKING_URL,
    cta: s.cta || 'Book',
    featured: s.featured === true,
    learnMoreCta: s.learnMoreCta || 'Learn more',
    learnMoreUrl: s.learnMoreUrl || ''
  };
}

function normalizePathway(p) {
  return {
    title: p.title || p.h1 || '',
    summary: p.summary || p.heroCopy || '',
    url: p.url || (p.slug ? `/facial-goals/${p.slug}` : ''),
    cta: 'Explore'
  };
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function buildSeoMarkup(p) {
  const services = Array.isArray(p.services) ? p.services : [];
  const pathways = Array.isArray(p.pathways) ? p.pathways : [];
  let faqs = [];

  try {
    faqs = JSON.parse(p.faqJson || '[]');
  } catch (_) {
    faqs = [];
  }

  return `
    <article>
      <h1>${escapeHtml(p.h1)}</h1>
      <p>${escapeHtml(p.heroCopy)}</p>
      ${p.introBandHeading ? `<h2>${escapeHtml(p.introBandHeading)}</h2>` : ''}
      ${p.introBandCopy ? `<p>${escapeHtml(p.introBandCopy)}</p>` : ''}
      ${p.pathwaysHeading ? `<h2>${escapeHtml(p.pathwaysHeading)}</h2>` : ''}
      ${p.pathwaysIntro ? `<p>${escapeHtml(p.pathwaysIntro)}</p>` : ''}
      ${pathways.map(item => `<h3>${escapeHtml(item.title || '')}</h3><p>${escapeHtml(item.summary || '')}</p>`).join('')}
      ${p.servicesHeading ? `<h2>${escapeHtml(p.servicesHeading)}</h2>` : ''}
      ${p.servicesIntro ? `<p>${escapeHtml(p.servicesIntro)}</p>` : ''}
      ${services.map(item => `<h3>${escapeHtml(item.title || '')}</h3><p>${escapeHtml(item.summary || '')} ${escapeHtml(item.durationLabel || '')} ${escapeHtml(item.priceLabel || '')}</p>`).join('')}
      ${p.expectHeading ? `<h2>${escapeHtml(p.expectHeading)}</h2>` : ''}
      ${p.expectIntro ? `<p>${escapeHtml(p.expectIntro)}</p>` : ''}
      ${p.techHeading ? `<h2>${escapeHtml(p.techHeading)}</h2>` : ''}
      ${p.techCopy ? `<p>${escapeHtml(p.techCopy)}</p>` : ''}
      ${p.galleryHeading ? `<h2>${escapeHtml(p.galleryHeading)}</h2>` : ''}
      ${p.faqHeading ? `<h2>${escapeHtml(p.faqHeading)}</h2>` : ''}
      ${faqs.map(item => `<h3>${escapeHtml(item.question || '')}</h3><p>${escapeHtml(item.answer || '')}</p>`).join('')}
      ${p.finalHeading ? `<h2>${escapeHtml(p.finalHeading)}</h2>` : ''}
      ${p.finalCopy ? `<p>${escapeHtml(p.finalCopy)}</p>` : ''}
    </article>`;
}
