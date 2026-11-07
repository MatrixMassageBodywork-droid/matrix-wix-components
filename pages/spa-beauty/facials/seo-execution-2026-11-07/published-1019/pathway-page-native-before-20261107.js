/* Matrix Skin Pathways dynamic ITEM page — visual expansion v3.0.
 * LOCAL PACKAGE / NOT INSTALLED. This is page-code replacement text only;
 * keep the existing Wix-generated page filename, route, dataset and element IDs.
 * Dataset: matrixPathwayDataset. Custom element: matrixPathwayPage.
 * Public dependencies: matrix-pathway-content.js and matrix-pathway-markup.js.
 */
import wixData from 'wix-data';
import wixSeoFrontend from 'wix-seo-frontend';
import { PATHWAY_CONTENT } from 'public/matrix-pathway-content';
import { buildPathwayMarkup, PATHWAY_NAMES, MATRIX_FACIAL_URL, MATRIX_BOOKING_URL } from 'public/matrix-pathway-markup';

// Release gate: leave false during installation/Test Site QA.
// Change only as part of an explicitly approved production indexing release.
const PATHWAY_INDEXING_RELEASED = true;
const DATASET = '#matrixPathwayDataset';
const ELEMENT = '#matrixPathwayPage';
const originalMetaTags = wixSeoFrontend.metaTags;
const originalLinks = wixSeoFrontend.links;
const LOGO_URL = 'https://static.wixstatic.com/media/e4cc43_d718e270b96a4507add8f2dcfd05e7fd~mv2.jpg/v1/fit/w_720,h_538/file.webp';
const WATER_URL = 'https://static.wixstatic.com/media/11062b_2413040bb0e142369d76f3878b966792~mv2.jpeg/v1/fill/w_1800,h_1200,al_c,q_90/11062b_2413040bb0e142369d76f3878b966792~mv2.jpeg';
const PATHWAY_DRAFT_IMAGES = Object.freeze({
  'hydrate-restore': 'https://static.wixstatic.com/media/e4cc43_5b26ebcfa7ff49b79b3d2f0bbb26eabf~mv2.jpg',
  'brighten-smooth': 'https://static.wixstatic.com/media/e4cc43_d692c993666c4158bd8f8078b5eeef6f~mv2.jpg',
  'clear-balance': 'https://static.wixstatic.com/media/e4cc43_333ec4c2ff3e4c748a95b1532c1e0d8b~mv2.jpg/v1/fill/w_1200,h_1400,al_c,q_90/e4cc43_333ec4c2ff3e4c748a95b1532c1e0d8b~mv2.jpg',
  'calm-support': 'https://static.wixstatic.com/media/e4cc43_adbfe19baed049efbc6f031ea2730b51~mv2.jpg',
  'age-defying-firm': 'https://static.wixstatic.com/media/e4cc43_343ad64fbe8f4f4482f9f897dcb561a5~mv2.jpg',
  'maintain-glow': 'https://static.wixstatic.com/media/e4cc43_814af6a67887454c9e23f5ea59f22782~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_90/e4cc43_814af6a67887454c9e23f5ea59f22782~mv2.jpg'
});

$w.onReady(async () => {
  await $w(DATASET).onReadyAsync();
    const item = $w(DATASET).getCurrentItem();
    if (!item) return;
    const copy = PATHWAY_CONTENT[item.slug] || {};
    const serviceKeys = [item.recommendedService1Key, item.recommendedService2Key, item.recommendedService3Key].filter(Boolean);
    const productKeys = [item.recommendedProduct1Key, item.recommendedProduct2Key, item.recommendedProduct3Key].filter(Boolean);
    // Preserve existing read dependencies; never write or sync CMS from this page.
    const [servicesAll, productsAll] = await Promise.all([
      wixData.query('MatrixServices').eq('active', true).limit(100).find(),
      wixData.query('MatrixRetailProducts').eq('active', true).limit(100).find()
    ]);
    const serviceMap = new Map(servicesAll.items.map(service => [service.serviceKey, service]));
    const productMap = new Map(productsAll.items.map(product => [product.productKey, product]));
    const payload = {
      ...item,
      ...copy,
      slug: item.slug,
      goalName: copy.goalName || PATHWAY_NAMES[item.slug] || item.goalName || '',
      logoUrl: LOGO_URL,
      waterBackgroundUrl: WATER_URL,
      heroBackgroundUrl: PATHWAY_DRAFT_IMAGES[item.slug] || item.heroBackgroundUrl,
      heroEyebrow: copy.eyebrow || item.eyebrow || '',
      heroCopy: copy.heroCopy || item.intro || '',
      heroItalic: '',
      bookingUrl: MATRIX_BOOKING_URL,
      bookingCta: 'Book a Facial',
      backUrl: MATRIX_FACIAL_URL,
      backCta: 'View All Facials',
      canonicalUrl: Object.prototype.hasOwnProperty.call(PATHWAY_NAMES, item.slug)
        ? `https://www.matrixmassage.net/facial-goals/${item.slug}`
        : item.canonicalUrl,
      services: serviceKeys.map(key => serviceMap.get(key)).filter(Boolean).map(service => ({
        title: service.title,
        durationLabel: service.durationLabel,
        priceLabel: service.priceLabel,
        summary: service.summary,
        bookingUrl: service.bookingUrl,
        cta: service.cta,
        learnMoreUrl: service.learnMoreUrl,
        learnMoreCta: service.learnMoreCta
      })),
      products: productKeys.map(key => productMap.get(key)).filter(product => product && /^https?:\/\//i.test(product.orderUrl || '')).map(product => ({
        brand: product.brand, title: product.title, shortCopy: product.shortCopy,
        imageUrl: product.imageUrl, orderUrl: product.orderUrl, orderCta: product.orderCta,
        fallbackUrl: product.fallbackUrl, fallbackCta: product.fallbackCta
      }))
    };
    // Copy map is a saved draft module; it does not mutate the live/shared collection.
    $w(ELEMENT).setAttribute('data-json', JSON.stringify(payload));
    // Same semantic template as the visual renderer, including FAQs and all links.
    // Production hrefs intentionally exclude Test Site query parameters here.
    $w(ELEMENT).seoMarkup = buildPathwayMarkup(payload);
    await applyPathwaySeo(payload);
});

async function applyPathwaySeo(page) {
  const updates = [
    { name: 'description', content: page.seoDescription },
    { name: 'robots', content: PATHWAY_INDEXING_RELEASED ? 'index, follow' : 'noindex, follow' },
    { property: 'og:title', content: page.seoTitle },
    { property: 'og:description', content: page.seoDescription },
    { property: 'og:image', content: page.heroBackgroundUrl },
    { property: 'og:url', content: page.canonicalUrl },
    { name: 'twitter:title', content: page.seoTitle },
    { name: 'twitter:description', content: page.seoDescription },
    { name: 'twitter:image', content: page.heroBackgroundUrl }
  ].filter(tag => tag.content);
  const changedKeys = new Set(updates.map(tag => tag.name || tag.property));
  const metaTags = (originalMetaTags || []).filter(tag => !changedKeys.has(tag.name || tag.property)).concat(updates);
  const links = (originalLinks || []).filter(link => link.rel !== 'canonical');
  if (page.canonicalUrl) links.push({ rel: 'canonical', href: page.canonicalUrl });
  await Promise.all([
    wixSeoFrontend.setTitle(page.seoTitle),
    wixSeoFrontend.setMetaTags(metaTags),
    wixSeoFrontend.setLinks(links)
  ]);
  // Do not emit item.structuredDataJson: it may describe older FAQ/copy.
  // Do not clear site-wide structured data. Existing page-level custom schema
  // must be inspected and reconciled during live SEO QA before publication.
}
