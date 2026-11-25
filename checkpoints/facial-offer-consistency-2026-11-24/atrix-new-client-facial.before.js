/* Matrix Massage & Bodywork — New Client Facial DEAL — water / Wix brand style
 * UPDATE THE EXISTING source selected in Wix Choose Source; no new element required.
 * Registered tag: matrix-new-client-facial
 * Wix element ID: matrixNewClientFacial
 * ES2020 Web Component; no libraries, Wix API calls, analytics, forms, or payments.
 * Public Wix logo + water images and Google Fonts are the only new asset requests.
 * Style reference: https://headspa.matrixmassage.net/ and the existing Matrix Wix site.
 */
(() => {
  'use strict';

  /* ================================================================
     EDITABLE CONTENT CONFIGURATION — single source for page content.
     The companion Page Code in this package was generated from the
     rendered HTML of this configuration. If you change content after
     installation, regenerate/update its SEO markup to match before
     publishing. Leave the Consistency Perks switch OFF until finalized.
     ================================================================ */
  const CONFIG = {
    links: {
      booking: 'https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services',
      facials: 'https://www.matrixmassage.net/spa-and-beauty-services-salem-wi/facials-salem-wi',
      luxeLift: 'https://www.matrixmassage.net/circadia-luxe-lift-facial-near-antioch',
      phone: 'tel:+12629399325',
      sms: 'sms:+12629399325'
    },
    brand: 'Matrix Massage & Bodywork',
    assets: {
      logo: 'https://static.wixstatic.com/media/e4cc43_1c6fb0c45df748cfa852ef777f4689f9~mv2.png',
      water: 'https://static.wixstatic.com/media/11062b_2413040bb0e142369d76f3878b966792~mv2.jpeg'
    },
    address: '24804 75th St., Salem, WI 53168',
    phoneLabel: '262-939-9325',
    cta: 'BOOK MY $79 FACIAL',
    offerLabel: 'NEW CLIENT FACIAL DEAL',
    h1: 'New Client Facial DEAL',
    h1Location: 'in Salem, WI',
    heroMessage: 'You don’t have to figure out your skin alone.',
    priceLine: '$79 • 45 minutes • Personalized to your skin',
    heroCopy: 'Tell us what your skin has been doing, what you’ve tried, and what you want to work on. Lexy will personalize your facial and help you understand your next steps—without turning your routine into another overwhelming project.',
    eligibility: 'New to Matrix facials? You qualify—even if you already visit us for massage or Head Spa.',
    firstService: 'New Client Facial DEAL | 45 Mins w/Lexy',
    firstPrice: '$79',
    firstDuration: '45 minutes',
    firstRegular: 'Regular 45-minute Express Facial: $95',
    secondService: '60-minute Custom Facial with Lexy',
    secondPrice: '$85',
    secondDuration: '60 minutes',
    secondRegular: 'Regular price: $100',
    rebooking: 'Keep your care going: book your follow-up before leaving and receive your next 60-minute Custom Facial for $85, regularly $100.',
    plan: {
      label: 'A PERSONALIZED STARTING POINT',
      title: 'Your skin gets a plan—not the same facial on repeat',
      intro: 'Whether your focus is dryness, dullness, congestion, uneven-feeling texture or visible fine lines, the conversation starts with your skin—not a preset routine. This is cosmetic facial care, with realistic goals and room to adjust.',
      steps: [
        ['01', 'Talk it through', 'Share your skin goal, sensitivities, what you use now and what has or hasn’t worked. The brief consultation is part of your 45-minute appointment.'],
        ['02', 'Care that fits', 'Lexy chooses suitable care within the booked service. Your facial may include professional cleansing, exfoliation, hydration, a customized mask and finishing skincare, depending on your skin and suitability.'],
        ['03', 'Leave with clarity', 'Get manageable home-care guidance rather than a complicated new routine. If you return, Lexy can revisit your goals and how your skin responded.']
      ]
    },
    provider: {
      label: 'MEET YOUR PROVIDER',
      title: 'Meet Lexy',
      copy: 'Lexy is Matrix’s licensed cosmetologist and facial provider. She listens first, adapts the appointment to your skin and comfort, and helps you understand practical next steps. You can ask questions without feeling that you need to arrive with a perfect routine—or commit to one afterward.'
    },
    visits: {
      label: 'A SIMPLE WAY TO BEGIN',
      title: 'Your first two visits',
      firstHeading: 'Start with your skin',
      firstCopy: 'A personalized 45-minute facial with a brief consultation included in the appointment. Book this introductory service through the button on this page.',
      secondHeading: 'Build on what you learned',
      secondCopy: 'Reserve your discounted 60-minute Custom Facial with Lexy before leaving your first appointment. The second visit is arranged at checkout, not as a separate publicly bookable promotion.',
      timing: 'Your recommended follow-up timing depends on your goals and available appointments—not a universal deadline. After the promotional follow-up, regular pricing applies unless another specific offer is agreed.'
    },
    alternative: {
      label: 'NO PLAN REQUIRED',
      title: 'Here for one good facial?',
      copy: 'Just looking for a facial and some time for yourself? You’re welcome here, too. Enjoy the first visit without committing to a second, or browse the full facial menu for a different fit.',
      linkLabel: 'EXPLORE ALL FACIALS',
      luxeLabel: 'EXPLORE CIRCADIA LUXE LIFT'
    },
    faq: {
      label: 'GOOD TO KNOW',
      title: 'A few quick answers',
      items: [
        ['Who qualifies for the $79 facial?', 'Anyone new to Matrix facials qualifies, including existing Matrix massage, Head Spa and wellness clients who have never received a facial here. One introductory facial and one discounted follow-up are available per guest.'],
        ['What happens during the 45-minute appointment?', 'A brief consultation happens within the 45 minutes, then Lexy personalizes the facial to your skin and suitability. Care may include cleansing, exfoliation, hydration, customized masking and finishing skincare. The consultation is not extra time.'],
        ['Do I need to prepay or book two visits?', 'No. There is no prepaid package and no obligation to book the second visit. You can come for the introductory facial alone.'],
        ['How do I receive the $85 follow-up?', 'Before leaving your first appointment, reserve your 60-minute Custom Facial with Lexy at checkout. That is how you receive the $85 price; the follow-up is not a separate online promotion. Scheduling is subject to provider availability.'],
        ['Where is Matrix?', 'Matrix Massage & Bodywork is physically at 24804 75th St., Salem, WI 53168, near Salem Lakes and Paddock Lake, and convenient for guests from Antioch. Call or text 262-939-9325 with questions.']
      ]
    },
    terms: 'Offer is for one introductory facial and one discounted follow-up per guest. Cannot be combined with other promotions. Reserve the $85 follow-up before leaving the first appointment; follow-up scheduling is subject to provider availability. Matrix’s existing cancellation and rescheduling policies apply. No prepaid package or obligation to book both visits.',
    final: {
      label: 'READY WHEN YOU ARE',
      title: 'Let’s start with your skin.',
      copy: 'Book your 45-minute New Client Facial DEAL with Lexy for $79 in Salem, Wisconsin. If another visit feels right, arrange the $85 follow-up before you leave.'
    },
    optional: {
      showConsistencyPerks: false,
      consistencyPerks: { title: '', copy: '' }
    }
  };
  /* ======================= END CONFIGURATION ======================= */

  const esc = (value) => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const link = (href, label, cls = 'button button--primary') => `<a class="${cls}" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
  const booking = (cls) => link(CONFIG.links.booking, CONFIG.cta, cls);
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Montserrat:wght@400;500;600;700&display=swap');
    :host { display:block; width:100%; color:#252725; font:16px/1.65 Montserrat,Arial,Helvetica,sans-serif; }
    *,*::before,*::after { box-sizing:border-box; }
    .page { container:facial/inline-size; width:100%; background:#f7f3ec; }
    h1,h2,h3,p { margin:0; } a { color:inherit; }
    a:focus-visible,button:focus-visible { outline:3px solid #ad5e2f; outline-offset:5px; }
    .wrap { width:min(calc(100% - 88px),1160px); margin-inline:auto; }
    .eyebrow { color:#0c696a; font:700 11px/1.5 Montserrat,Arial,sans-serif; letter-spacing:.24em; text-transform:uppercase; }
    h1,h2,h3,.hero__message { font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif; font-weight:500; }
    h1 { font-size:clamp(42px,5.7cqw,76px); line-height:1.02; letter-spacing:-.02em; }
    h1 em { display:block; color:#d9f3ef; font-weight:400; margin-top:7px; }
    h2 { font-size:clamp(34px,4cqw,54px); line-height:1.1; letter-spacing:-.015em; }
    h3 { font-size:29px; line-height:1.2; }
    p { line-height:1.7; }
    .button { display:inline-flex; align-items:center; justify-content:center; min-height:52px; padding:15px 27px; border:1px solid transparent; font:700 12px/1.4 Montserrat,Arial,sans-serif; letter-spacing:.09em; text-align:center; text-decoration:none; transition:background-color .18s ease,color .18s ease; }
    .button--primary { background:#111; color:#fff; }
    .button--primary:hover { background:#175958; }
    .button--light { background:#fff; color:#122b2b; border-color:#fff; }
    .button--light:hover { background:#dcf1ed; border-color:#dcf1ed; }
    .button--outline { background:transparent; color:#fff; border-color:#e6f1ee; }
    .button--outline:hover { background:#ffffff18; }
    .hero { position:relative; isolation:isolate; background:#244f50; color:#fff; }
    .hero__water,.final__water { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center; z-index:-2; }
    .hero::before { content:''; position:absolute; inset:0; z-index:-1; background:linear-gradient(110deg,rgba(10,36,37,.58),rgba(6,30,31,.68) 55%,rgba(14,43,42,.56)); }
    .hero__brand { display:flex; align-items:center; justify-content:space-between; gap:22px; padding-top:24px; }
    .brand-link { display:block; width:192px; flex:0 0 auto; background:#fff; line-height:0; text-decoration:none; box-shadow:0 4px 24px #00000012; }
    .brand-logo { display:block; width:100%; height:96px; object-fit:contain; }
    .brand-context { color:#fff; font:500 10px/1.6 Montserrat,Arial,sans-serif; letter-spacing:.2em; text-transform:uppercase; text-align:right; }
    .hero__layout { max-width:920px; text-align:center; padding-top:31px; padding-bottom:56px; }
    .hero .eyebrow { color:#fff; margin-bottom:20px; }
    .hero__message { color:#eef9f6; margin:20px auto 21px; font-size:clamp(23px,2.5cqw,30px); font-style:italic; line-height:1.35; }
    .price-line { display:flex; justify-content:center; align-items:center; flex-wrap:wrap; gap:10px 17px; color:#fff; font-size:15px; line-height:1.4; letter-spacing:.025em; }
    .price-line strong { font:500 45px/1 'Cormorant Garamond',Georgia,serif; }
    .price-line .price-divider { width:1px; height:28px; background:#d6e9e5; }
    .hero__copy { max-width:780px; margin:22px auto 24px; font-size:16px; color:#fff; }
    .hero__actions { display:flex; justify-content:center; flex-wrap:wrap; gap:12px; }
    .hero__note { max-width:680px; margin:18px auto 0; font-size:12px; line-height:1.6; color:#fff; }
    .hero__rebooking { max-width:700px; margin:20px auto 0; padding-top:18px; border-top:1px solid #d3e8e64f; color:#fff; font-size:13px; line-height:1.65; }
    .section { padding-block:64px; }
    .section-head { max-width:800px; margin:0 auto 31px; text-align:center; }
    .section-head .eyebrow { margin-bottom:14px; }
    .section-head h2 { margin-bottom:18px; }
    .section-head p:last-child { color:#464e49; font-size:15px; }
    .plan-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:24px; }
    .step { border-top:1px solid #9dbab4; padding:25px 5px 0; min-width:0; }
    .step__number { display:block; margin-bottom:15px; color:#176b68; font:italic 31px/1 'Cormorant Garamond',Georgia,serif; }
    .step h3 { margin-bottom:14px; }
    .step p { color:#414a44; font-size:15px; }
    .provider { padding-block:54px; background:#111; color:#fff; }
    .provider__inner { display:grid; grid-template-columns:230px minmax(0,1fr); align-items:center; gap:50px; }
    .provider .eyebrow { color:#a8d9d1; margin-bottom:13px; }
    .provider p { color:#f0f0eb; font-size:15px; }
    .visits { background:#f0eee7; }
    .visit-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:25px; max-width:970px; margin:0 auto; }
    .visit { min-width:0; padding:32px; background:#fff; border-top:3px solid #315e5c; }
    .visit--second { background:#e5eeea; border-top-color:#315e5c; }
    .visit__top { display:flex; justify-content:space-between; align-items:start; gap:12px; margin-bottom:18px; }
    .visit__label { color:#155958; font:700 11px/1.4 Montserrat,Arial,sans-serif; letter-spacing:.16em; }
    .visit__duration { color:#3f5148; font:600 12px/1.4 Montserrat,Arial,sans-serif; }
    .visit__price { color:#143f3b; font:500 62px/1 'Cormorant Garamond',Georgia,serif; margin-bottom:7px; }
    .visit__regular { color:#4b554f; font-size:12px; margin-bottom:20px; }
    .visit h3 { margin-bottom:10px; }
    .visit__service { font:600 13px/1.6 Montserrat,Arial,sans-serif; color:#244b44; margin-bottom:12px; }
    .visit__copy { font-size:14px; color:#434d46; }
    .visit-note { margin:23px auto; max-width:880px; color:#465049; font-size:13px; text-align:center; }
    .visits>.wrap>.button { display:flex; width:max-content; max-width:100%; margin:0 auto; }
    .alternative { background:#faf8f3; }
    .alternative__inner { display:grid; grid-template-columns:minmax(0,1fr) auto; align-items:center; gap:44px; }
    .alternative .eyebrow { margin-bottom:13px; }
    .alternative h2 { margin-bottom:16px; }
    .alternative p { max-width:650px; color:#464e49; font-size:15px; }
    .alternative__links { display:flex; align-items:start; flex-direction:column; gap:18px; }
    .text-link { display:inline-block; color:#164d4a; font:600 11px/1.7 Montserrat,Arial,sans-serif; letter-spacing:.08em; text-decoration:underline; text-underline-offset:5px; padding-block:5px; }
    .text-link:hover { color:#111; }
    .faq-section { padding-top:18px; background:#faf8f3; }
    .faq-section>.wrap { max-width:920px; }
    .faq { border-bottom:1px solid #bdccc6; }
    .faq button { display:flex; align-items:center; justify-content:space-between; gap:20px; width:100%; border:0; margin:0; padding:18px 0; background:none; color:#253e36; text-align:left; cursor:pointer; font:500 25px/1.2 'Cormorant Garamond',Georgia,serif; }
    .faq__plus { flex-shrink:0; color:#164d4a; font:400 22px/1 Arial,sans-serif; }
    .faq button[aria-expanded='true'] .faq__plus { transform:rotate(45deg); }
    .faq__answer { padding:0 35px 20px 0; color:#424d47; font-size:14px; }
    .faq__answer[hidden] { display:none; }
    .terms { margin-top:25px; color:#4e5550; font-size:12px; line-height:1.7; }
    .terms strong { color:#263c32; }
    .final { position:relative; isolation:isolate; padding-block:53px; color:#fff; background:#163c3c; text-align:center; }
    .final::before { content:''; position:absolute; inset:0; z-index:-1; background:rgba(9,33,34,.82); }
    .final .eyebrow { color:#c4e8e2; margin-bottom:14px; }
    .final h2 { margin-bottom:17px; }
    .final p { max-width:730px; margin-inline:auto; color:#fff; font-size:15px; }
    .final .button { margin-top:25px; }
    .final .contact { margin-top:27px; font-size:12px; line-height:1.8; }
    .contact a { color:#fff; text-decoration:underline; text-underline-offset:4px; }
    @container facial (max-width:850px) {
      .wrap { width:calc(100% - 52px); }
      .plan-grid { gap:19px; }
      .provider__inner { grid-template-columns:180px minmax(0,1fr); gap:28px; }
      .alternative__inner { grid-template-columns:1fr; gap:22px; }
      .alternative__links { flex-direction:row; flex-wrap:wrap; }
      .hero__layout { padding-top:31px; }
    }
    @container facial (max-width:700px) {
      .wrap { width:calc(100% - 40px); }
      .hero__brand { padding-top:19px; gap:10px; }
      .brand-link { width:152px; }
      .brand-logo { height:76px; }
      .brand-context { font-size:9px; letter-spacing:.1em; }
      .hero__layout { padding-block:28px 39px; }
      .hero .eyebrow { font-size:10px; margin-bottom:16px; letter-spacing:.18em; }
      h1 { font-size:clamp(37px,8.8cqw,58px); }
      h1 em { margin-top:9px; font-size:.87em; }
      .hero__message { font-size:24px; margin-block:17px; }
      .price-line { font-size:13px; gap:8px 12px; }
      .price-line strong { font-size:39px; }
      .hero__copy { font-size:15px; line-height:1.65; margin:20px auto; }
      .hero__actions { gap:10px; }
      .button { font-size:11px; padding:14px 22px; }
      .hero__note { font-size:12px; margin-top:15px; }
      .hero__rebooking { font-size:12px; padding-top:15px; margin-top:17px; }
      h2 { font-size:clamp(32px,7.8cqw,44px); }
      .section { padding-block:42px; }
      .section-head { margin-bottom:24px; }
      .section-head .eyebrow { font-size:10px; }
      .plan-grid { grid-template-columns:1fr; gap:21px; }
      .step { padding-top:18px; }
      .step__number { margin-bottom:10px; font-size:27px; }
      .step h3 { font-size:28px; margin-bottom:9px; }
      .provider { padding-block:37px; }
      .provider__inner { display:block; }
      .provider h2 { margin-bottom:19px; }
      .visit-grid { grid-template-columns:1fr; gap:17px; }
      .visit { padding:25px; }
      .visit__price { font-size:56px; }
      .alternative__inner { display:block; }
      .alternative__links { margin-top:20px; flex-direction:column; gap:12px; }
      .faq-section { padding-top:10px; }
      .faq button { font-size:24px; padding-block:18px; }
      .faq__answer { padding-right:0; }
      .final { padding-block:40px; }
      .terms { font-size:12px; }
    }
    @container facial (max-width:430px) {
      .wrap { width:calc(100% - 36px); }
      .brand-context { max-width:112px; font-size:8px; }
      .brand-link { width:142px; }
      .brand-logo { height:71px; }
      .hero__actions { display:block; }
      .hero__actions .button { width:100%; }
      .hero__actions .button--outline { display:none; }
      .price-line { gap:8px 10px; font-size:12px; }
      .price-line .price-divider { height:24px; }
      .visits>.wrap>.button,.final .button { width:100%; }
    }
    @media (prefers-reduced-motion:reduce) { *,*::before,*::after { scroll-behavior:auto!important; animation:none!important; transition:none!important; } }
  `;

  class MatrixNewClientFacial extends HTMLElement {
    constructor() { super(); this.attachShadow({mode:'open'}); }
    connectedCallback() {
      if (this.shadowRoot.childNodes.length) return;
      this.shadowRoot.innerHTML = `<style>${styles}</style>${this.render()}`;
      this.shadowRoot.querySelectorAll('.faq button').forEach(btn => {
        btn.addEventListener('click', () => {
          const open = btn.getAttribute('aria-expanded') === 'true';
          btn.setAttribute('aria-expanded', String(!open));
          this.shadowRoot.getElementById(btn.getAttribute('aria-controls')).hidden = open;
        });
      });
    }
    render() {
      const c = CONFIG;
      const steps = c.plan.steps.map(([n,title,copy]) => `<article class="step"><span class="step__number" aria-hidden="true">${esc(n)}</span><h3>${esc(title)}</h3><p>${esc(copy)}</p></article>`).join('');
      const faqs = c.faq.items.map(([question,answer], i) => `<div class="faq"><button id="matrix-ncf-q-${i}" type="button" aria-expanded="false" aria-controls="matrix-ncf-a-${i}"><span>${esc(question)}</span><span class="faq__plus" aria-hidden="true">+</span></button><div class="faq__answer" id="matrix-ncf-a-${i}" role="region" aria-labelledby="matrix-ncf-q-${i}" hidden><p>${esc(answer)}</p></div></div>`).join('');
      const perks = c.optional.showConsistencyPerks && c.optional.consistencyPerks.title && c.optional.consistencyPerks.copy
        ? `<section class="section" aria-labelledby="matrix-ncf-perks"><div class="wrap"><h2 id="matrix-ncf-perks">${esc(c.optional.consistencyPerks.title)}</h2><p>${esc(c.optional.consistencyPerks.copy)}</p></div></section>` : '';
      return `<main class="page" aria-label="New Client Facial DEAL in Salem, WI">
        <section class="hero" aria-labelledby="matrix-ncf-h1">
          <img class="hero__water" src="${esc(c.assets.water)}" alt="" aria-hidden="true" fetchpriority="high">
          <div class="wrap hero__brand"><a class="brand-link" href="https://www.matrixmassage.net/" aria-label="Matrix Massage &amp; Bodywork home"><img class="brand-logo" src="${esc(c.assets.logo)}" width="590" height="295" alt="Matrix Massage &amp; Bodywork" loading="eager"></a><p class="brand-context">Personalized facial care<br>Salem, Wisconsin</p></div>
          <div class="wrap hero__layout">
            <p class="eyebrow">${esc(c.offerLabel)}</p><h1 id="matrix-ncf-h1">${esc(c.h1)} <em>${esc(c.h1Location)}</em></h1>
            <p class="hero__message">${esc(c.heroMessage)}</p>
            <p class="price-line"><strong>${esc(c.firstPrice)}</strong><span class="price-divider" aria-hidden="true"></span><span>45 minutes</span><span aria-hidden="true">·</span><span>Personalized to your skin</span></p>
            <p class="hero__copy">${esc(c.heroCopy)}</p>
            <div class="hero__actions">${booking('button button--light')}<a class="button button--outline" href="${esc(c.links.facials)}">VIEW ALL FACIALS</a></div>
            <p class="hero__note">${esc(c.eligibility)}</p><p class="hero__rebooking">${esc(c.rebooking)}</p>
          </div>
        </section>
        <section class="section" aria-labelledby="matrix-ncf-plan"><div class="wrap">
          <div class="section-head"><p class="eyebrow">${esc(c.plan.label)}</p><h2 id="matrix-ncf-plan">${esc(c.plan.title)}</h2><p>${esc(c.plan.intro)}</p></div>
          <div class="plan-grid">${steps}</div></div></section>
        <section class="provider" aria-labelledby="matrix-ncf-lexy"><div class="wrap provider__inner">
          <div><p class="eyebrow">${esc(c.provider.label)}</p><h2 id="matrix-ncf-lexy">${esc(c.provider.title)}</h2></div><p>${esc(c.provider.copy)}</p>
        </div></section>
        <section class="section visits" aria-labelledby="matrix-ncf-visits"><div class="wrap">
          <div class="section-head"><p class="eyebrow">${esc(c.visits.label)}</p><h2 id="matrix-ncf-visits">${esc(c.visits.title)}</h2><p>${esc(c.rebooking)}</p></div>
          <div class="visit-grid">
            <article class="visit"><div class="visit__top"><span class="visit__label">VISIT 01</span><span class="visit__duration">${esc(c.firstDuration)}</span></div><div class="visit__price">${esc(c.firstPrice)}</div><p class="visit__regular">${esc(c.firstRegular)}</p><h3>${esc(c.visits.firstHeading)}</h3><p class="visit__service">${esc(c.firstService)}</p><p class="visit__copy">${esc(c.visits.firstCopy)}</p></article>
            <article class="visit visit--second"><div class="visit__top"><span class="visit__label">VISIT 02</span><span class="visit__duration">${esc(c.secondDuration)}</span></div><div class="visit__price">${esc(c.secondPrice)}</div><p class="visit__regular">${esc(c.secondRegular)}</p><h3>${esc(c.visits.secondHeading)}</h3><p class="visit__service">${esc(c.secondService)}</p><p class="visit__copy">${esc(c.visits.secondCopy)}</p></article>
          </div><p class="visit-note">${esc(c.visits.timing)}</p>${booking()}
        </div></section>${perks}
        <section class="section alternative" aria-labelledby="matrix-ncf-alt"><div class="wrap alternative__inner">
          <div><p class="eyebrow">${esc(c.alternative.label)}</p><h2 id="matrix-ncf-alt">${esc(c.alternative.title)}</h2><p>${esc(c.alternative.copy)}</p></div>
          <div class="alternative__links"><a class="text-link" href="${esc(c.links.facials)}">${esc(c.alternative.linkLabel)} →</a><a class="text-link" href="${esc(c.links.luxeLift)}">${esc(c.alternative.luxeLabel)} →</a></div>
        </div></section>
        <section class="section faq-section" aria-labelledby="matrix-ncf-faq"><div class="wrap">
          <div class="section-head"><p class="eyebrow">${esc(c.faq.label)}</p><h2 id="matrix-ncf-faq">${esc(c.faq.title)}</h2></div>
          <div class="faq-list">${faqs}</div><p class="terms"><strong>Offer details.</strong> ${esc(c.terms)}</p>
        </div></section>
        <section class="final" aria-labelledby="matrix-ncf-final"><img class="final__water" src="${esc(c.assets.water)}" alt="" aria-hidden="true" loading="lazy"><div class="wrap">
          <div class="final__layout"><div><p class="eyebrow">${esc(c.final.label)}</p><h2 id="matrix-ncf-final">${esc(c.final.title)}</h2><p>${esc(c.final.copy)}</p></div>${booking('button button--light')}</div>
          <p class="contact">${esc(c.brand)} · ${esc(c.address)} · <a href="${esc(c.links.phone)}">Call ${esc(c.phoneLabel)}</a> · <a href="${esc(c.links.sms)}">Text ${esc(c.phoneLabel)}</a></p>
        </div></section>
      </main>`;
    }
  }
  if (!customElements.get('matrix-new-client-facial')) customElements.define('matrix-new-client-facial', MatrixNewClientFacial);
})();
