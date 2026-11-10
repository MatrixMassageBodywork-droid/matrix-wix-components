# Homepage startup repair — live checkpoint, November 9, 2026

This supersedes the earlier 70-mobile / 88-desktop final report. Native Wix publication is still revision 1085; three HOME-only custom-code entries activate the newer startup delivery independently.

## Result
Google PageSpeed repeat runs: 75–82 mobile / 83–95 desktop at 9:42 and 9:53 PM CST. Mobile LCP 3.8–4.0 seconds (previous 6.0, original 25.0). Desktop LCP 1.1 seconds in both runs. Accessibility 100 and SEO 100 on both. Mobile still falls short of the 2.5-second good LCP target; no field Core Web Vitals pass is claimed.

## Installed files
- HOME_HEAD_STYLES.html → Matrix HOME — faster images and accessible footer
- HOME_BODY_PART_1.html → Matrix HOME — instant content 1 of 2
- HOME_BODY_PART_2.html → Matrix HOME — instant content 2 of 2

All three are HOME (ghmgt) only, Head, Essential, enabled, and read back exactly after save. Native renderer and page code are unchanged. Body/CSS parity hashes are in STARTUP_PARITY.json. Both part orders were tested.

## Maintenance and rollback
Update all three inline snippets together with the native renderer and seoMarkup on any future homepage content or styling change. To roll back, disable both instant-content entries and restore BASELINE_HEAD.html in the existing head entry. Do not restore an old Wix site revision.

## Verification
All 11 FAQs opened and closed; 37 component links unchanged; all 9 images load when visible. Booking opens the Square service menu without making a booking. Desktop has no horizontal overflow. The exact component at 390px has no overflow and 50px primary buttons. Native Wix mobile preview navigation and map checked. Live mobile and desktop PageSpeed tests captured. Shared map and other pages were not edited in this pass.

See PUBLICATION_RECEIPT_STARTUP.json and Matrix-homepage-final-speed-report.html for evidence and remaining limitations.
