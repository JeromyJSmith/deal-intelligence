---
name: deal-scan
description: Multi-source deal scanner. Scrapes CREXI, Auction.com, Hubzu, BizBuySell, and Zillow for motivated-seller opportunities across any asset class — real estate, businesses, land, notes. Respects rate limits. Saves structured JSON to data/raw/. Use when user says "scrape listings", "scan for deals", "/scrape", "search [location] for deals", "check auction.com", "find owner-financed listings", "search BizBuySell", or "get raw listings from [source]".
allowed-tools: Read, Write, Bash, Glob, Grep, WebSearch, WebFetch
metadata:
  author: Deal Intelligence
  version: 2.0.0
  category: workflow-automation
  tags: [scraping, data-collection, multi-source, motivated-seller]
---

# Deal Scan

Collects raw listing data from multiple sources for a given geography or deal type.

## Instructions

### Step 1: Resolve Parameters
Read `data/targets/geos.json` to get active zones and search terms.

If user specified a zone (NCA, CO, USA), use that zone's config.
If no zone specified, scan all zones.

### Step 2: Build Search Queries
For each zone, construct queries using:
- Zone cities and zip codes from geos.json
- `globalKeywords` from geos.json
- Deal type filter if specified (auction, owner-finance, business, residential)

### Step 3: Execute Scans (Parallel Per Source)

Run each source scan independently. Do not wait for one before starting another.

**CREXI:**
```
URL: https://www.crexi.com/properties?term=[geo]&sort=Newest
Types: ALL (not just commercial) — residential, land, business, special purpose
Keywords: owner financing, motivated seller, as-is, estate sale, price reduced
```

**Auction.com:**
```
URL: https://www.auction.com
Filter: state → target state
Types: foreclosure, REO, bank-owned, tax default
```

**Hubzu:**
```
URL: https://www.hubzu.com
Types: bank-owned, auction, foreclosure
```

**BizBuySell:**
```
URL: https://www.bizbuysell.com
Filter: "Real Estate Included" + target city
Types: businesses with real estate
```

**Zillow:**
```
URL: https://www.zillow.com
Filter: 90+ days on market, price reduced, target zip codes
Types: residential, pre-foreclosure, FSBO
```

**County Tax Auctions:**
```
WebSearch: "[county name] tax sale auction 2026"
Nevada County CA: search "Nevada County California tax collector auction"
Colorado counties: search "[county] CO tax lien sale 2026"
```

### Step 4: Enforce Rate Limits
- Minimum 3 seconds between requests to same domain
- On 403: stop that source, log to `data/raw/errors.log`
- On 429: wait 60 seconds, retry once, then skip

### Step 5: Validate and Save

For each listing collected, validate required fields:
- `url` — non-empty, valid URL
- `name` — non-empty string
- `askingPrice` — positive number (or "auction" flag)
- `location` — city, state, or zip code

Save output: `data/raw/YYYY-MM-DD_[zone]_[source].json`

Include in each file:
```json
{
  "scrapeDate": "ISO-8601",
  "zone": "NCA|CO|USA",
  "source": "crexi|auction|hubzu|bizbuysell|zillow|county-auction",
  "searchParams": { ... },
  "listings": [ ... ]
}
```

### Step 6: Report Collection Stats
Output to console:
- Source name
- Listings collected
- Errors encountered
- File saved to

## Examples

### Example 1: Scan all zones
User: "/scrape"
Actions: Read geos.json → parallel scan all sources for all zones → save JSON files
Result: Files in data/raw/ for each zone/source combo

### Example 2: Single zone
User: "/scrape NCA"
Actions: Scan all sources for Nevada County CA only
Result: Files in data/raw/ prefixed NCA

### Example 3: Source-specific
User: "scan auction.com for Colorado deals"
Actions: Auction.com scan for CO zone only
Result: data/raw/YYYY-MM-DD_CO_auction.json

## Error Handling

- Source blocked (403): Log, skip, continue other sources
- Rate limited (429): Back off 60s, retry once, then skip
- Empty results: Log warning, continue (legitimate — some zones may have no listings)
- Invalid JSON from source: Log, skip record, continue

## References

- `references/source-urls.md` — Full URL patterns for each source
- `references/keyword-list.md` — Complete motivated-seller keyword bank
