/* Matrix facial pathway semantic markup, v3.0 — LOCAL PACKAGE / NOT INSTALLED.
 * Public file: public/matrix-pathway-markup.js
 * The custom-element build embeds this exact module body without exports.
 * Visible and SEO content share one template; only Test Site link parameters differ.
 */
export const PATHWAY_NAMES = Object.freeze({
  'hydrate-restore': 'Hydrate + Restore',
  'brighten-smooth': 'Brighten + Smooth',
  'clear-balance': 'Clear + Balance',
  'calm-support': 'Calm + Support',
  'age-defying-firm': 'Age-Defying + Firm',
  'maintain-glow': 'Maintain + Glow'
});
export const MATRIX_FACIAL_URL = 'https://www.matrixmassage.net/spa-and-beauty-services-salem-wi/facials-salem-wi';
export const MATRIX_BOOKING_URL = 'https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services';
const FACIAL_DIRECT_BOOKING = Object.freeze({
  "Custom Facial": "https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services/IUTRINR4YWTL7ULZ3QVEK4QG",
  "Circadia Dream Facial": "https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services/5TMAAL7UNW75SMC6XG7R53QA",
  "Circadia Luxe Lift Facial": "https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services/WBRKBJ3WLEKZEMRTZ52M26Q6",
  "Dermaplane Refresh": "https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services/CGKJNHLBH7D6F7VGTHDLC6D2",
  "Custom Dermaplane Facial": "https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services/WV4GXSEU2NPPQ7DXYX3CSDUA",
  "Luxe Dermaplane Facial": "https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services/N5DNZHDNLTMTYU24DMAOQCYH"
});


export function escapePathwayHtml(value = '') {
  return String(value == null ? '' : value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));
}

export function safePathwayUrl(value = '') {
  const text = String(value || '').trim();
  return /^(https?:\/\/|sms:|tel:)/i.test(text) ? text : '';
}

export function preservePathwayPreviewLink(href, currentUrl = '') {
  const safe = safePathwayUrl(href);
  if (!safe || !currentUrl) return safe;
  try {
    const target = new URL(safe);
    if (target.origin !== 'https://www.matrixmassage.net') return safe;
    const current = new URL(currentUrl);
    for (const key of ['siteRevision', 'rc', 'showMobileView']) {
      if (current.searchParams.has(key)) target.searchParams.set(key, current.searchParams.get(key));
    }
    return target.href;
  } catch (error) {
    return safe;
  }
}

export function buildPathwayMarkup(data = {}, currentUrl = '') {
  const d = data && typeof data === 'object' ? data : {};
  const e = escapePathwayHtml;
  const arr = value => Array.isArray(value) ? value : [];
  const book = safePathwayUrl(d.bookingUrl) || MATRIX_BOOKING_URL;
  const back = preservePathwayPreviewLink(safePathwayUrl(d.backUrl) || MATRIX_FACIAL_URL, currentUrl);
  const hero = safePathwayUrl(d.heroBackgroundUrl);
  const logo = safePathwayUrl(d.logoUrl);
  const water = safePathwayUrl(d.waterBackgroundUrl);
  const editorial = safePathwayUrl(d.editorialImageUrl);
  const careImage = safePathwayUrl(d.careImageUrl);
  const beautyLogo = safePathwayUrl(d.brandBeautyUrl);
  const monogram = safePathwayUrl(d.brandMonogramUrl);
  const relatedImages = d.relatedImages && typeof d.relatedImages === 'object' ? d.relatedImages : {};
  const photoSide = d.photoSide === 'right' ? 'right' : 'left';
  const cta = d.bookingCta || d.ctaLabel || 'Book a Facial';
  const backLabel = d.backCta || 'View All Facials';
  const button = (href, label, className = 'button', target = '_blank') => href
    ? `<a class="${className}" href="${e(href)}" target="${target}"${target === '_blank' ? ' rel="noopener noreferrer"' : ''}>${e(label)}</a>`
    : '';
  const actions = (dark = false) => `<div class="actions">${button(book, cta, dark ? 'button button--dark' : 'button button--light')}${button(back, backLabel, dark ? 'button button--line-dark' : 'button button--line', '_top')}</div>`;
  const paragraph = (value, className = '') => value ? `<p${className ? ` class="${className}"` : ''}>${e(value)}</p>` : '';
  const heading = value => value ? `<h2>${e(value)}</h2>` : '';
  const bullets = values => arr(values).length ? `<ul class="care-list">${arr(values).map(value => `<li>${e(value)}</li>`).join('')}</ul>` : '';
  const waterImage = water ? `<img class="water-art" src="${e(water)}" alt="" aria-hidden="true" loading="lazy">` : '';
  const photo = (src, alt, className, width, height) => src
    ? `<figure class="${className}"><img src="${e(src)}" alt="${e(alt || '')}" width="${width}" height="${height}" loading="lazy" decoding="async"></figure>`
    : '';
  const expanded = Boolean(d.introTitle && d.introText);
  const legacyServices = arr(d.recommendedServices).map(value => typeof value === 'string' ? { title: value, text: '' } : value);
  const serviceNotes = expanded ? arr(d.serviceNotes) : (legacyServices.length ? legacyServices : arr(d.services).map(value => ({ title: value.title, text: value.summary || '' })));
  const cards = serviceNotes.map(service => {
    const linked = arr(d.services).find(item => item.title === service.title) || {};
    const savedBooking = safePathwayUrl(linked.bookingUrl);
    const serviceBooking = (savedBooking && savedBooking !== MATRIX_BOOKING_URL ? savedBooking : '')
      || FACIAL_DIRECT_BOOKING[service.title] || book;
    const detailUrl = preservePathwayPreviewLink(safePathwayUrl(linked.learnMoreUrl)
      || (service.title === 'Circadia Luxe Lift Facial'
        ? 'https://www.matrixmassage.net/circadia-luxe-lift-facial-near-antioch'
        : MATRIX_FACIAL_URL + '#facial-menu'), currentUrl);
    const serviceTitle = service.title
      ? `<a href="${e(detailUrl)}" target="_top">${e(service.title)}</a>` : '';
    const serviceCta = service.title ? `Book ${service.title} in Salem` : cta;
    return `<article class="service-card"><h3>${serviceTitle}</h3><div class="service-details">${paragraph(service.text || service.summary || '')}${button(serviceBooking, serviceCta, 'button button--dark')}</div></article>`;
  }).join('');
  const related = Array.from(new Set(arr(d.relatedSlugs))).filter(slug => Object.prototype.hasOwnProperty.call(PATHWAY_NAMES, slug) && slug !== d.slug);
  const questions = arr(d.faqs).length ? arr(d.faqs) : (d.faqQuestion ? [{ q: d.faqQuestion, a: d.faqAnswer || '' }] : []);
  const faq = questions.length ? `<section class="section faq-section"><div class="wrap measure">${heading('Questions about this skin goal')}<div class="faq-list">${questions.map(item => `<details class="faq"><summary><span>${e(item.q || '')}</span><span class="faq-icon" aria-hidden="true"></span></summary>${paragraph(item.a || '')}</details>`).join('')}</div></div></section>` : '';
  let content = '';
  if (expanded) {
    const benefit = editorial
      ? `<section class="section editorial-section"><div class="wrap editorial-layout editorial-layout--${photoSide}">${photo(editorial, d.editorialImageAlt, 'editorial-photo', 1200, 800)}<div class="editorial-copy">${heading(d.benefitTitle)}${paragraph(d.benefitText)}</div></div></section>`
      : `<section class="section water-section">${waterImage}<div class="wrap measure water-copy">${heading(d.benefitTitle)}${paragraph(d.benefitText)}</div></section>`;
    const careCopy = `<div class="care-copy"><div>${heading(d.prepareTitle)}${paragraph(d.prepareText)}${bullets(d.prepareBullets)}</div><aside class="aftercare-panel">${heading(d.aftercareTitle)}${paragraph(d.aftercareText)}</aside></div>`;
    content = `<section class="section section--cream"><div class="wrap split"><div>${heading(d.introTitle)}${paragraph(d.introText)}</div><aside class="goal-panel" aria-label="When this skin goal may suit you">${paragraph('Does this sound like your skin?', 'eyebrow')}${bullets(d.goalBullets)}</aside></div></section>
      ${benefit}
      <section class="section section--paper"><div class="wrap"><div class="section-heading">${heading(d.expectTitle)}${monogram ? `<img class="brand-stamp" src="${e(monogram)}" alt="Matrix monogram" width="1320" height="1301" loading="lazy" decoding="async">` : ''}</div><ol class="steps">${arr(d.expectSteps).map((step, index) => `<li><span class="step-number" aria-hidden="true">0${index + 1}</span><div><h3>${e(step.title || '')}</h3>${paragraph(step.text || '')}</div></li>`).join('')}</ol></div></section>
      <section class="section section--deep"><div class="wrap">${heading('Facials to explore')}${paragraph(d.serviceIntro, 'measure')}<div class="service-grid">${cards}</div></div></section>
      <section class="section care-section"><div class="wrap ${careImage ? 'care-layout' : 'care-layout care-layout--text'}">${photo(careImage, d.careImageAlt, 'care-photo', 1200, 800)}${careCopy}</div></section>
      <section class="section visit-section"><div class="wrap visit-layout${beautyLogo ? ' visit-layout--branded' : ''}"><div class="measure">${heading(d.localTitle)}${paragraph(d.localText)}${actions(true)}</div>${beautyLogo ? `<div class="beauty-brand"><img src="${e(beautyLogo)}" alt="Matrix Beauty &amp; Skincare" width="2400" height="1792" loading="lazy" decoding="async"></div>` : ''}</div></section>
      ${faq}
      ${related.length ? `<section class="section section--pale"><div class="wrap">${heading('Explore a related skin goal')}<nav class="related-grid" aria-label="Related skin goals">${related.map(slug => { const src = safePathwayUrl(relatedImages[slug]); return `<a href="${e(preservePathwayPreviewLink(`https://www.matrixmassage.net/facial-goals/${slug}`, currentUrl))}" target="_top">${src ? `<img class="related-photo" src="${e(src)}" alt="" width="800" height="500" loading="lazy" decoding="async">` : ''}<span class="related-label"><span>${e(PATHWAY_NAMES[slug])}</span><span aria-hidden="true">↗</span></span></a>`; }).join('')}</nav></div></section>` : ''}
      ${(editorial || careImage) ? `<div class="imagery-note"><div class="wrap">Skincare imagery is illustrative.</div></div>` : ''}`;
  } else {
    const sections = arr(d.sections);
    content = sections.map((section, index) => `<section class="section${index % 2 === 0 ? ' section--cream' : ''}"><div class="wrap">${heading(section.heading)}${paragraph(section.copy, 'measure')}${index === sections.length - 1 && cards ? `<div class="service-grid">${cards}</div>` : ''}</div></section>`).join('');
    if (!sections.length && cards) content += `<section class="section"><div class="wrap">${heading('Facials to explore')}<div class="service-grid">${cards}</div></div></section>`;
    if (d.homeCareHeading || d.homeCare) content += `<section class="section section--cream"><div class="wrap measure">${heading(d.homeCareHeading)}${paragraph(d.homeCare)}</div></section>`;
    content += faq;
  }
  return `<main class="pathway-page"><section class="hero">${hero ? `<img class="hero-image" src="${e(hero)}" alt="${e(d.imageAlt || '')}" fetchpriority="high">` : ''}<div class="wrap hero-inner">${logo ? `<div class="logo"><img src="${e(logo)}" alt="Matrix Beauty &amp; Skincare" width="720" height="538"></div>` : ''}${paragraph(d.goalName || d.eyebrow || d.heroEyebrow || '', 'eyebrow')}<h1>${e(d.h1 || '')}</h1>${paragraph(d.heroCopy || d.intro || '', 'hero-copy')}${actions()}</div></section>${content}<section class="section closing water-section">${waterImage}<div class="wrap measure water-copy">${heading(d.closingTitle)}${paragraph(d.closingText)}${actions()}</div></section></main>`;
}
