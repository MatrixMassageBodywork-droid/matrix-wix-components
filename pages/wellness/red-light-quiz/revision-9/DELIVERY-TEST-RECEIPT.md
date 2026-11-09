# R9 live email test — 2026-11-09 UTC

Status: TESTED and VERIFIED; final original-page publication pending at this checkpoint.

Owner explicitly approved use of the business email and business phone, recording test consent, CAPTCHA verification, one sample report and one owner notification.

- Test request: `3b63354d-5256-4a02-8bea-a132594c4848`.
- Synthetic identity: Matrix Delivery Test. Business email and phone used; no real customer record or health information.
- Native Wix test page: `/red-light-therapy-guide?rc=test-site`, release 1045 at 0% exposure. Public release remained 1041.
- All required contact fields and both separate marketing permissions accepted.
- CMS normalized phone and stored exact consent wording/version/timestamps. Email and SMS marketing states CONSENT_RECORDED.
- Client delivery ACCEPTED and owner delivery ACCEPTED; last error empty.
- Both messages received in the business INBOX at 2026-11-09T02:00:46Z.
- Client subject: Your Matrix Glow Score report. Owner subject: New Matrix Glow Score request.
- All personalized variables resolved. HTML paragraphs and line breaks preserved. Selected face/head option $14.99; all three approved prices present.
- SPF, DKIM and DMARC passed. No SMS message or marketing campaign was sent.
- Successful personalized result displayed after submission. No duplicate submit was needed.

Production configuration is preserved separately as `glow-config-live.js`; baseline `glow-config.js` remains the historical test configuration. Templates: client VaR3j2e; owner VaR4bz9. No secrets or raw signed email links are included in this receipt.

Original-page installation checkpoint: old e8l5a ScoreApp embed and placeholder Velo backed up. Review section copied via native Wix Copy/Paste onto original e8l5a as section2. Original empty section removed. IDs preserved: glowHeading, glowIntro, glowBookButton, htmlGlowQuiz, glowCaptcha, glowStatus, glowVisitInfo. Desktop section 980 × 6436 at y=134. Exact page-code.js installed and read back equal after newline normalization. Shared header/footer retained. Native mobile, final SEO, main-service price consistency and production release remain pending.
