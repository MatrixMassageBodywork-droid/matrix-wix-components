/* Matrix facial pathway engine v3.0 — LOCAL PACKAGE / NOT INSTALLED.
 * Custom element: matrix-pathway-page; Wix element ID: matrixPathwayPage.
 * Build source: matrix-pathway-markup.js + pathway-style.css.
 * Preserve existing data-json attribute and top-level Test Site navigation.
 */
(() => {
  'use strict';
/* BEGIN SHARED MARKUP */
/* Matrix facial pathway semantic markup, v3.0 — LOCAL PACKAGE / NOT INSTALLED.
 * Public file: public/matrix-pathway-markup.js
 * The custom-element build embeds this exact module body without exports.
 * Visible and SEO content share one template; only Test Site link parameters differ.
 */
const PATHWAY_NAMES = Object.freeze({
  'hydrate-restore': 'Hydrate + Restore',
  'brighten-smooth': 'Brighten + Smooth',
  'clear-balance': 'Clear + Balance',
  'calm-support': 'Calm + Support',
  'age-defying-firm': 'Age-Defying + Firm',
  'maintain-glow': 'Maintain + Glow'
});
const MATRIX_FACIAL_URL = 'https://www.matrixmassage.net/spa-and-beauty-services-salem-wi/facials-salem-wi';
const MATRIX_BOOKING_URL = 'https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services';

function escapePathwayHtml(value = '') {
  return String(value == null ? '' : value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));
}

function safePathwayUrl(value = '') {
  const text = String(value || '').trim();
  return /^(https?:\/\/|sms:|tel:)/i.test(text) ? text : '';
}

function preservePathwayPreviewLink(href, currentUrl = '') {
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

function buildPathwayMarkup(data = {}, currentUrl = '') {
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
  const cards = serviceNotes.map(service => `<article class="service-card"><h3>${e(service.title || '')}</h3><div class="service-details">${paragraph(service.text || service.summary || '')}${button(book, cta, 'button button--dark')}</div></article>`).join('');
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

const PATHWAY_STYLES = ":host{display:block;width:100%;min-width:0;container-type:inline-size;--ink:#0e292c;--deep:#123d40;--teal:#087776;--aqua:#cfe9e4;--pale:#ebf5f2;--cream:#f7f1e8;--paper:#fdfcf9;--line:rgba(14,41,44,.18);--serif:'Cormorant Garamond',Georgia,serif;--sans:'Montserrat',Arial,sans-serif;color:var(--ink);font-family:var(--sans);background:var(--paper)}\n*{box-sizing:border-box}main,section,div,article,aside,nav,figure{min-width:0}figure{margin:0}img{display:block;max-width:100%}a{color:inherit}p,li,a,summary,h1,h2,h3{overflow-wrap:break-word}p,li{font-size:15px;line-height:1.8}p{margin:0 0 20px}p:last-child{margin-bottom:0}.wrap{width:calc(100% - 64px);max-width:1120px;margin-inline:auto}.measure{max-width:780px}.section{padding:76px 0}.section--cream{background:var(--cream)}.section--paper{background:var(--paper)}.section--pale{background:var(--pale)}.section--deep{background:var(--deep);color:#fff}.eyebrow{text-transform:uppercase;letter-spacing:.18em;font-size:11px;line-height:1.6;font-weight:500}.hero{position:relative;isolation:isolate;background:var(--deep);color:#fff;min-height:680px;display:flex;align-items:center}.hero-image,.water-art{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2}.hero:after{content:'';position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,rgba(8,28,30,.82),rgba(8,28,30,.52))}.hero-inner{padding:60px 0 72px}.logo{width:240px;max-width:100%;margin-bottom:52px}.logo img{width:100%;height:auto;object-fit:contain}.hero .eyebrow{color:var(--aqua)}h1{font:500 clamp(48px,7cqi,82px)/1.02 var(--serif);letter-spacing:-.015em;max-width:850px;margin:14px 0 26px}.hero-copy{max-width:690px;font-size:16px;line-height:1.85}.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}.button{display:inline-flex;align-items:center;justify-content:center;min-height:50px;max-width:100%;padding:14px 23px;border:1px solid currentColor;color:inherit;text-align:center;font:400 11px/1.55 var(--sans);letter-spacing:.07em;text-transform:uppercase;text-decoration:none;white-space:normal}.button--light{background:#fff;border-color:#fff;color:var(--ink)}.button--dark{background:var(--ink);border-color:var(--ink);color:#fff}.button--line{border-color:rgba(255,255,255,.75)}.button--line-dark{border-color:var(--ink)}a:focus-visible,summary:focus-visible{outline:3px solid #ba8850;outline-offset:5px}a:hover{text-decoration:underline;text-underline-offset:5px}.button:hover{background:var(--aqua);border-color:var(--aqua);color:var(--ink);text-decoration:none}h2{font:500 clamp(36px,4.8cqi,54px)/1.08 var(--serif);letter-spacing:-.01em;margin:0 0 24px}h3{font:500 30px/1.12 var(--serif);margin:0 0 15px}.split{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:50px;align-items:start}.goal-panel{padding:28px 0 0;border-top:1px solid #76aaa1}.goal-panel .eyebrow{color:var(--teal)}.care-list{margin:24px 0 0;padding-left:20px}.care-list li{padding-left:5px;margin:0 0 14px}.care-list li:last-child{margin-bottom:0}.water-section{position:relative;isolation:isolate;background:var(--pale)}.water-section .water-art{opacity:.20}.water-section:after{position:absolute;inset:0;z-index:-1;content:'';background:linear-gradient(90deg,rgba(235,245,242,.88),rgba(235,245,242,.69))}.water-copy{position:relative}.steps{list-style:none;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:30px;padding:16px 0 0;margin:0}.steps li{border-top:1px solid var(--line);padding-top:24px}.step-number{display:block;font-size:12px;letter-spacing:.15em;color:var(--teal);margin-bottom:22px}.steps p{font-size:14px}.service-grid{display:grid;grid-template-columns:1fr;margin-top:34px}.service-card{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:36px;padding:30px 0;border-top:1px solid currentColor}.service-card:last-child{padding-bottom:0}.service-card p{font-size:14px}.service-card .button{margin-top:5px}.section--deep .service-card{border-color:rgba(255,255,255,.25)}.section--deep .service-card .button{background:var(--paper);border-color:var(--paper);color:var(--ink)}.section--deep .service-card .button:hover{background:var(--aqua);border-color:var(--aqua)}.aftercare-panel{padding:28px 0 0;margin-top:30px;border-top:1px solid var(--line)}.aftercare-panel h2{font-size:36px}.visit-section{background:#fff}.visit-layout{display:grid;grid-template-columns:minmax(0,1fr);gap:28px}.visit-layout--branded{grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);align-items:center}.beauty-brand{background:#fff;max-width:360px}.beauty-brand img{width:100%;height:auto;max-width:360px;object-fit:contain}.section-heading{display:flex;align-items:center;justify-content:space-between;gap:26px}.section-heading h2{margin-bottom:0;min-width:0}.brand-stamp{width:64px;height:64px;flex:0 0 64px;object-fit:contain;background:#fff}.editorial-section{padding:66px 0;background:var(--pale)}.editorial-layout{display:grid;grid-template-columns:minmax(0,.46fr) minmax(0,.54fr);gap:50px;align-items:center}.editorial-layout--right{grid-template-columns:minmax(0,.54fr) minmax(0,.46fr)}.editorial-layout--right .editorial-photo{order:2}.editorial-photo img{width:100%;height:auto;aspect-ratio:3/2;object-fit:cover;object-position:center}.editorial-copy{padding:16px 0}.care-section{background:var(--cream)}.care-layout{display:grid;grid-template-columns:1fr;gap:42px;align-items:start}.care-photo{width:100%;max-width:720px;margin-inline:auto}.care-photo img{width:100%;height:auto;aspect-ratio:3/2;object-fit:cover;object-position:center}.care-copy{display:grid;grid-template-columns:1fr 1fr;gap:50px}.care-copy .aftercare-panel{margin-top:0;padding-top:0;border-top:0}.imagery-note{padding:18px 0;background:var(--pale);font:400 11px/1.6 var(--sans);color:#496663}.faq-section{padding-top:10px}.faq-list{border-top:1px solid var(--line)}.faq{border-bottom:1px solid var(--line)}.faq summary{display:flex;gap:24px;justify-content:space-between;align-items:center;list-style:none;cursor:pointer;padding:22px 0;font-size:15px;font-weight:400;line-height:1.6}.faq summary::-webkit-details-marker{display:none}.faq>p{padding:0 30px 24px 0;font-size:14px;line-height:1.85}.faq-icon{width:12px;height:12px;flex:0 0 12px;position:relative}.faq-icon:before,.faq-icon:after{content:'';position:absolute;background:currentColor;top:5px;left:0;width:12px;height:1px}.faq-icon:after{transform:rotate(90deg)}.faq[open] .faq-icon:after{transform:rotate(0)}.related-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.related-grid a{display:flex;flex-direction:column;min-width:0;text-decoration:none;background:var(--paper);font:400 24px/1.25 var(--serif)}.related-photo{width:100%;height:auto;aspect-ratio:8/5;max-height:220px;object-fit:cover;object-position:center}.related-label{display:flex;gap:20px;align-items:center;justify-content:space-between;width:100%;padding:22px 24px}.related-grid a:hover{background:#fff;text-decoration:underline}.closing{background:var(--deep);color:#fff}.closing:after{background:linear-gradient(90deg,rgba(14,41,44,.85),rgba(18,61,64,.76))}.closing .water-art{opacity:.65}.closing p{color:rgba(255,255,255,.9)}\n@container(max-width:700px){.wrap{width:calc(100% - 36px)}.section{padding:54px 0}.hero{min-height:0}.hero-inner{padding:44px 0 56px}.logo{width:200px;margin-bottom:40px}h1{font-size:clamp(42px,10cqi,64px)}h2{font-size:40px}.split,.steps,.service-grid,.related-grid,.editorial-layout,.editorial-layout--right,.care-layout,.care-copy,.visit-layout--branded{grid-template-columns:1fr}.editorial-layout,.care-layout,.care-copy{gap:28px}.editorial-layout--right .editorial-photo{order:0}.editorial-photo img,.care-photo img{aspect-ratio:3/2}.editorial-copy{padding:0}.section-heading{align-items:flex-start;gap:18px}.brand-stamp{width:54px;height:54px;flex-basis:54px}.section-heading h2{font-size:36px}.service-card{grid-template-columns:1fr;gap:8px}.service-card h3{margin-bottom:10px}.service-details .button{width:100%}.care-copy .aftercare-panel{margin-top:2px;padding-top:26px;border-top:1px solid var(--line)}.beauty-brand{max-width:300px}.split{gap:28px}.steps{gap:22px}.steps li{display:flex;gap:22px}.step-number{margin-top:5px;flex:0 0 24px}.actions{flex-direction:column;align-items:stretch}.button{width:100%}.service-card .button{align-self:stretch}.goal-panel{padding:24px 0 0}.aftercare-panel{padding:26px 0 0}.service-card{padding:26px 0}.faq-section{padding-top:10px}.faq summary{font-size:14px;gap:18px}.faq>p{padding-right:0}.aftercare-panel h2{font-size:34px}}\n@supports not (container-type:inline-size){@media(max-width:700px){.wrap{width:calc(100% - 36px)}.section{padding:54px 0}.hero{min-height:0}.hero-inner{padding:44px 0 56px}.logo{width:200px;margin-bottom:40px}h1{font-size:44px}h2{font-size:40px}.split,.steps,.service-grid,.related-grid,.editorial-layout,.editorial-layout--right,.care-layout,.care-copy,.visit-layout--branded{grid-template-columns:1fr}.editorial-layout,.care-layout,.care-copy{gap:28px}.editorial-layout--right .editorial-photo{order:0}.editorial-photo img,.care-photo img{aspect-ratio:3/2}.editorial-copy{padding:0}.section-heading{align-items:flex-start;gap:18px}.brand-stamp{width:54px;height:54px;flex-basis:54px}.section-heading h2{font-size:36px}.service-card{grid-template-columns:1fr;gap:8px}.service-card h3{margin-bottom:10px}.service-details .button{width:100%}.care-copy .aftercare-panel{margin-top:2px;padding-top:26px;border-top:1px solid var(--line)}.beauty-brand{max-width:300px}.split{gap:28px}.actions{flex-direction:column;align-items:stretch}.button{width:100%}.goal-panel{padding:24px 0 0}.aftercare-panel{padding:26px 0 0}.service-card{padding:26px 0}.faq-section{padding-top:10px}.faq>p{padding-right:0}}}\n";

/* END SHARED MARKUP */
  const ensureMatrixFacialFonts = doc => {
    if (!doc || !doc.head || doc.getElementById('matrix-facial-fonts')) return;
    const link = doc.createElement('link');
    link.id = 'matrix-facial-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Montserrat:wght@400;500;600;700&display=swap';
    doc.head.appendChild(link);
  };
  class MatrixPathwayPage extends HTMLElement {
    static get observedAttributes() { return ['data-json']; }
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.data = {};
      this.returnClick = event => {
        const anchor = event.composedPath().find(node => node instanceof HTMLAnchorElement && node.getRootNode() === this.shadowRoot && node.target === '_top');
        if (!anchor || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        window.top.location.assign(anchor.href);
      };
    }
    connectedCallback() {
      window.addEventListener('click', this.returnClick, true);
      this.load();
    }
    disconnectedCallback() {
      window.removeEventListener('click', this.returnClick, true);
    }
    attributeChangedCallback() { this.load(); }
    load() {
      try {
        const parsed = JSON.parse(this.getAttribute('data-json') || '{}');
        this.data = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
      } catch (error) {
        this.data = {};
      }
      this.render();
    }
    render() {
      ensureMatrixFacialFonts(this.ownerDocument);
      this.shadowRoot.innerHTML = '<style>' + PATHWAY_STYLES + '</style>' + buildPathwayMarkup(this.data, this.ownerDocument.URL);
    }
  }
  if (!customElements.get('matrix-pathway-page')) customElements.define('matrix-pathway-page', MatrixPathwayPage);
})();
