# R11 — Personalized report correction
Current authority: owner request 2026-11-08 Chicago; canonical project doc 1NQPn1MYxT98aA0OZunn6otxmYtMwoWxPBOQ5Ts0d-2Y; previous live checkpoint R10 (page order) and R9 (delivery).

## Scope and design
Replace generic centered email with left-aligned report sections: personal pathway, starting schedule, research, nutrition/progress, selected service price, booking. Routine eligible adult paths may use owner-requested 2–3 visits/week for four weeks as a Matrix starting schedule. Availability and one-visit preference remain respected. Hair has a longer evidence timeline. Clinician/research routes do not get automatic exposure schedules. Nutrition selections receive concrete meals and goal-related optional supplement discussion, with linked evidence and verified Matrix Fullscript store.

Preserve pricing $25.99 / $14.99 / +$22.99. Preserve safety gates, capture/consent, CAPTCHA, permissions, recipient checks, atomic insert, duplicate suppression, unknown-send protections, owner notification privacy. No customer data changes or test emails. Do not install config-test-fixture.js. Do not edit glow-config, glow-intake.web, page code, schema, header/footer, About, testimonials, Square, collection permissions or unrelated pages.

## Native execution order
1. Confirm original e8l5a and saved R10 native geometry. Capture current glow-rules and glow-service source before editing; compare to R9. If changed, stop and reconcile.
2. Replace only backend/glow-rules.js and backend/glow-service.js using exact files. Read back both. R11 supplies old reportBody plus the new section variables, so the existing email remains functional during transition. Old saved report text is used for operator recovery of pre-send failures; no existing report is rewritten.
3. Replace e8l5a htmlGlowQuiz code with R11 embed.html. Preserve title, position, size and R10 html7 branding. Read back and syntax-check. No other page embed changed.
4. Save and preview. Verify form, pricing, consent fields and absence of browser errors. Publish the site under existing owner authorization. Capture confirmation and public source/render evidence.
5. Existing client template VaR3j2e (edit document 1fce2b35-dbdc-4b27-8b53-7b449468c045): replace body rich text with client-email-template.html. Set body left alignment and retain designed heading sizes. Keep subject recognizable; change preview text to starting plan/research/nutrition. Remove duplicate generic price block. Do not touch owner template VaR4bz9.
6. Read back rich text; verify all 11 template variables recognized in generated code/preview. Preview desktop/mobile and publish existing template. Capture publication status and native screenshot. Do not send a live email or submit a real lead in QA.

## Acceptance
15,552 route combinations pass; all eight goals have sourced research; nutrition skip respected; adequate-intake nutrition still useful; clinical gates suppress schedule and supplement options; exact prices; no automatic discounts/packages; 24 mocked delivery scenarios pass; production bridge byte-identical R10; native source exact readback; client template recognized variables; public original URL works. Actual inbox rendering remains NOT TESTED for R11 until a separately authorized delivery test. Existing R9 inbox delivery proof is historical, not R11 evidence.

## Stop conditions
Unexpected source drift, compile error, variable registration failure or broken runtime: preserve draft, return evidence; do not publish a broken template. Timeout: inspect persistence before retry. No blind restore, duplicate template, replacement automation or bulk resend.
