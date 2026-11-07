# Matrix Specials — implementation plan

Status: PLANNED. No new Wix page, navigation item, offer, campaign or publication has been created.

## Page identity
- Permanent path: `/specials` (new route; absent from the captured native page inventory and static sitemap).
- Menu label: Specials, after Gift Cards. Apply only with the approved hub installation; homepage proof leaves shared navigation intact.
- Title: Massage & Spa Specials in Salem, WI | Matrix
- H1: Massage & Spa Specials in Salem, WI
- Description: Explore current Matrix massage and spa specials in Salem, WI. See facial offers, prices, savings and booking terms near Paddock Lake and Salem Lakes.
- Canonical: https://www.matrixmassage.net/specials
- Existing facial offer page remains at `/offers/new-client-facial-deal-salem-wi`.

## Initial page, with one verified offer
1. Approved large centered logo and dark teal water treatment; clear H1; short introduction; anchor to current offer.
2. Current offer card: First Matrix facial, 45 minutes, $79. Same-service comparison $95. Save $16. Open to guests new to Matrix facial services, including existing massage/Head Spa/wellness guests.
3. Continuation terms within the same offer: recommended 60-minute Custom Facial follow-up for $85 when reserved before leaving the introductory appointment. Reserve at checkout; subject to availability; cannot combine promotions. Do not expose a separate unrestricted follow-up booking button or show follow-up savings.
4. Existing facial offer page link, exact introductory Square service link, and main facial service page link.
5. Compact evergreen gift-card section. No gift-card discount is currently verified; never imply one.
6. Helpful FAQ: eligibility, rebooking, combining promotions, where appointments take place, gift cards versus appointments, checking availability.
7. Booking close. Preserve shared Wix header/footer; no invented reviews, prices, timers or seasonal promotions.

## Source and expiry model
Use one approved offer record for both homepage teaser and hub. Fields: id, title, serviceId, serviceUrl, bookingUrl, minutes, salePrice, comparisonPrice, comparisonServiceId, savings, eligibility, followupTerms, startsAt, endsAt, timezone, approvalStatus, displayPriority, verifiedAt, sourceReference.

Time zone: America/Chicago. A null end date means no advertised expiration, not an authorization to keep an offer active forever. Recheck the live booking offer before release and whenever the offer changes. Display only approved active records; when an offer expires, remove its homepage teaser and mark its detail page ended with a link to current offers. No automation was created in this phase.

## Initial evidence
Public Square menu read on November 7 UTC / November 6 local date: introductory service `GJ7PY2ONLPOVK4JIYCIWJGG4`, $79 / 45 minutes; copy explicitly states regular 45-minute Express Facial $95 and conditional 60-minute follow-up $85. Existing Square copy uses $100 as follow-up comparison, while other project pricing has differed; no follow-up savings are advertised.

Square: https://book.squareup.com/appointments/m9m6r64pq02ode/location/LGNQ4P8GPMSEQ/services/GJ7PY2ONLPOVK4JIYCIWJGG4

## Homepage connection
The current homepage design shows the real introductory offer and links the existing facial offer page. Switch the overview link to “View All Matrix Specials” at `/specials` only when the hub is installed and tested. This prevents a dead link during the homepage review.

## Acceptance criteria
- Route and redirect collision check repeated immediately before page creation.
- Exactly one H1; truthful current price and same-service savings; visible eligibility and continuation condition.
- Homepage and hub match the one approved offer record.
- Direct booking opens the correct introductory service without making a reservation.
- Mobile 320/390 and desktop 1280/1440/1920 have no overflow, broken images or clipped expansion.
- No expired Halloween promotion, old lash campaign or unapproved holiday offer is carried into the hub.
- Final preview approval precedes any publication.
