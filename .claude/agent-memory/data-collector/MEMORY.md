# Data Collector Memory

## CREXI Behavior

- **403 on all direct WebFetch calls** — CREXI uses Cloudflare WAF. Direct URL fetching always fails.
- LoopNet and BizBuySell also block direct WebFetch (403).
- Argus Self Storage Advisors (argus-selfstorage.com) allows direct WebFetch — use for self-storage listings.
- Craigslist Denver allows direct WebFetch — useful for owner-financing deals.

## Collection Strategies

- **Primary: WebSearch first** — Use targeted search queries to surface listing details from search snippets.
- **Secondary: Fetch broker/advisor sites** — Argus, Saleh Group, Marcus & Millichap sub-sites often accessible.
- **BizBuySell listing IDs** surface via search results even when direct fetch fails — note the listing URL for broker outreach.
- **Combine search terms**: `"asking price" OR "cap rate" OR "NOI" site:loopnet.com OR site:crexi.com` to get financial details from snippets.
- **Colorado-specific**: Saleh Group handles gas stations in CO; Argus handles self-storage; Marcus & Millichap handles larger multi-asset deals.

## Error Patterns

- `403 Forbidden`: CREXI, LoopNet, BizBuySell, BizQuest — never retry, use WebSearch instead.
- `404 Not Found`: Saleh Group listing URLs are fragile — use WebSearch to find current listing.
- WebSearch tool sometimes errors on first call in a parallel batch — retry sequentially if needed.
- CREXI URL structure `?location=Colorado` may not filter correctly; prefer `?types[]=X&term=Y` parameter structure.

## Key Data Sources by Property Type

| Type | Best Source |
|------|------------|
| Self Storage | Argus Self Storage Advisors (direct fetch OK) |
| Gas Stations | Saleh Group, BizBuySell (search only) |
| Car Washes | BizBuySell, BizQuest (search only), **RossBrothers mycarwashbroker.com (direct fetch OK)**, CarWashForum |
| Mobile Home Parks | WebSearch + Colorado DOH notices, **ParksAndPlaces parksandplaces.com (direct fetch OK)** |
| RV Parks / Campgrounds | **ParksAndPlaces parksandplaces.com (direct fetch OK)** — best seller-financed RV/MHP listings |
| Multifamily | Craigslist Denver (direct fetch OK for owner-finance) |
| General CO CRE | LoopNet, CREXI (search snippets only) |

## Nevada County CA Market Intel (as of March 2026)

- **DOM signal**: Grass Valley 95945 avg DOM jumped from 18 → 96 days YoY. Buyer's market.
- **Price trend**: 95945 median home value $481,790, down 7.6% YoY. Commercial will follow.
- **Nevada County Tax Sale**: Runs annually on GovEase.com. Contact: 530-265-1285. Next cycle Oct-Nov 2026.
- **Best local broker**: Highland Commercial (530-470-1740, highlandcre.com — site inaccessible via WebFetch).
- **CREXI NCA data**: Existing file `data/raw/2026-03-04_grass-valley-all.json` has 67 listings — filter by county for Nevada County subset.
- **Grass Roots Realty** (Coldwell Banker affiliate) dominates Nevada County commercial listings on CREXI.
- **6.52% cap rate** industrial available at 110 Spring Hill Dr — Dignity Health tenant — best yield in NCA scan.
- **BizBen gas station**: Nevada County branded gas station, $2.97M revenue — full details behind paywall, use contact form.

## Colorado Market Intel (as of March 2026)

- Self-storage average cap rate: ~5.8% (premium: 4-5%, value-add: 6-9%)
- MHP cap rates: 4-7% (premium markets like Aspen/Steamboat at low end)
- Front Range self-storage: 5 active listings in Colorado Springs, active in Fort Collins/Loveland
- Grand Junction: Self-storage market active, seller carryback precedent (DXD/Hill&Homes deal)
- Greeley car wash listed at $695K, 11.1% cap rate — strong outlier yield
- Calhan self-storage: No rent increase since 2019, 97.98% occupancy — value-add signal
- Colorado law requires 120-day MHP sale notice to residents — watch for these as buy signals
