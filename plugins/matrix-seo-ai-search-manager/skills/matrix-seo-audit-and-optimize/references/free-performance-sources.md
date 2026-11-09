# Free reporting and measurement

## Access order

Use available sufficient authenticated connectors first. Otherwise use the existing authorized browser session for the specifically requested reporting service, following its authentication rules. Discover the actual UI before constructing deterministic navigation steps. Do not guess a direct Google reporting API tool or claim installing this plugin creates an OAuth connection. If login is needed, use the supported secure user handoff. Never request a password/token in chat. If access remains unavailable, offer an export route and continue public technical checks.

| Source | What to collect | What it cannot prove alone |
|---|---|---|
| Wix SEO dashboard / Site Inspection | Existing SEO settings, page identity, available Google indexing inspection and connected property | It may require an existing Search Console connection; connector failure doesn't prove Google's connection is broken. |
| Google Search Console | Page-filtered clicks, impressions, CTR, average position; query/device/country context; URL Inspection including selected canonical, indexing and crawl evidence | Average position is not a fixed live rank or a local map-pack position; missing query rows may reflect privacy/limits. |
| Google Analytics 4 | Landing-page sessions, organic search sessions, engagement and verified `square_booking_click` events/key-event behavior | A click is not a completed Square booking, customer, revenue or demonstrated SEO attribution. |
| Wix Analytics | Available page visits/referrals and conversion reports with exact metric definitions | Its counts may differ from GA4 due to definitions, consent and collection. Do not combine them as identical measures. |
| PageSpeed Insights / CrUX | Mobile/desktop lab diagnostics and available real-user LCP, INP and CLS; URL vs origin scope | No CrUX data is not failure. Lab is not field data; CrUX generally describes a rolling window, not instantaneous post-change impact. |
| Public page, robots and sitemap | Actual status, HTML, metadata, links, structured data and discoverability | Being accessible is not being indexed, ranked or recommended. |

Search Console, standard GA4 and the public technical checks can support this workflow without SiteGuru. Do not add paid middleware or request a paid subscription as a prerequisite. If a standard source changes its limits or access requirements, state the observed limitation and use the available free route.

## Periods and provenance

Default to 28 complete reporting days versus the preceding 28 days, ending three calendar days before the run as an initial GSC reporting-lag allowance. Check the actual latest finalized data and adjust both equal-length windows together if needed. Add 90-day context when available; annotate new pages, publication dates, seasonality, campaigns and tracking changes. If the owner supplies periods, use them. Do not automatically call a recent new page an underperformer.

Record the source's actual timezone, including GSC's reporting timezone and GA4's configured property timezone. Use America/Chicago for owner-facing timestamps, clearly labeled. Do not silently relabel daily GSC data as local time or force exact daily alignment across unlike sources. Record extraction time, freshness, date range, source property, URL filter/match type, device/country/search-type/channel filters, dimensions, sampling/thresholding and row limits.

Use canonical URL mapping with an explicit redirect/variant table. Keep query strings when semantically meaningful. Do not conflate `/service` and `/service/`, www/non-www, HTTP/HTTPS, paid UTM traffic and organic traffic without evidence. `pagePath` and `landingPage` dimensions have different scopes. A session-level landing-page key-event count may include events later in the session; label it correctly. Do not add session counts across incompatible dimensions.

Calculate CTR as clicks / impressions, not average of row CTRs. Preserve GSC's reported average position for the exact page/date/filter scope; don't average query averages. Report absolute and percentage changes with appropriate denominators. If prior count is 0, percentage change is undefined: say “from 0 to N.” If counts are missing, use null/not available, never 0. Missing page rows are “not returned” unless the source establishes a true zero. Beware that query sums may not match page totals.

An underperforming metric creates a hypothesis, not permission to rewrite. Examples: impressions with weak CTR warrant reviewing intent/title/snippet; good visits with few booking clicks warrant reviewing CTA and measurement; no indexed page warrants inspection before copy edits. Small samples need explicit caution. Don't assume metadata or schema alone will fix a demand, competition or measurement issue.

## Collection navigation goals

- GSC: open the observed verified property, Performance/Search results, requested equal date windows, exact page filter, capture Pages and relevant Queries/Devices. Use URL Inspection separately. Request indexing only if authorized; do not repeatedly submit every page.
- GA4: select verified property, Reports → Engagement → Landing page (or observed current equivalent), confirm date/channel filters and landing-page dimension; inspect the existing booking-click event definitions and available reports read-only. Use Pages and screens only when describing page views/event scope.
- Wix: select the verified Matrix site, SEO dashboard/Site Inspection and available Analytics reports. Read any integration state. Do not reconnect, replace tags, create properties or alter permissions during an audit.
- Public PageSpeed: submit the exact public URL and retain results URL/time/strategy. Report unavailable field data as unavailable. Rich Results Test and Schema.org Validator answer different questions; use each when applicable.

If an API cannot expose needed page/report data, say which portion needs the authenticated UI. If the source is inaccessible, supported owner exports can be read from the current project folder. Check for existing suitable exports before asking for them. Record export time and dates. Never present old exports as live measurements.

## Normalized calculation helper

`python scripts/performance_summary.py input.json` reads only a local JSON file and prints derived comparisons. It does not fetch Google data or authenticate.

Input example (replace values with verified aggregate data; this is not business performance):
```json
{
  "source": "GSC",
  "property": "verified property identifier",
  "period_current": {"start":"2026-10-10","end":"2026-11-06"},
  "period_previous": {"start":"2026-09-12","end":"2026-10-09"},
  "timezone": "source reporting timezone",
  "filters": {"search_type":"web","page_match":"exact"},
  "pages": [{
    "url":"https://www.matrixmassage.net/example",
    "current":{"clicks":12,"impressions":400,"average_position":8.2},
    "previous":{"clicks":10,"impressions":500,"average_position":9.4}
  }]
}
```
For GA4 use a separate source block/file and eligible counts such as `sessions`, `organic_sessions`, `booking_clicks`. Keep GSC and GA4 observations separate. Store provenance and source evidence with the generated output. The script checks periods, duplicates and count validity; it cannot verify the source's truth or metric scope.
