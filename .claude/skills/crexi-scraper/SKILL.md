---
name: crexi-scraper
description: >
  Scrape commercial real estate listings from CREXI.com. Use when you need to
  collect property data, search listings by type/keyword, or extract listing
  details from the CREXI platform.
allowed-tools: Bash, Read, Write, WebFetch, WebSearch
---

# CREXI Scraper

Collects structured listing data from CREXI.com for analysis.

## Quick Start

1. Construct search URL from target parameters
2. Fetch and parse listing results
3. Extract structured data per listing
4. Save to `data/raw/` with date prefix

## CREXI URL Construction

Base: `https://www.crexi.com/properties?`

### Parameters

| Param | Example | Purpose |
|-------|---------|---------|
| `types[]` | `Mobile+Home+Park` | Property type filter |
| `subtypes[]` | `Gas+Station` | Property subtype |
| `term` | `owner+financing` | Keyword search |
| `sort` | `Relevance`, `Newest` | Sort order |
| `page` | `1`, `2`, `3` | Pagination |

### Target Searches

```
# Owner-financed anything
https://www.crexi.com/properties?term=owner+financing&sort=Relevance

# Mobile Home Parks
https://www.crexi.com/properties?types[]=Mobile+Home+Park

# Gas Stations
https://www.crexi.com/properties?types[]=Special+Purpose&subtypes[]=Gas+Station

# Car Washes
https://www.crexi.com/properties?types[]=Special+Purpose&subtypes[]=Car+Wash

# Self Storage
https://www.crexi.com/properties?types[]=Self+Storage

# Motivated sellers (keyword)
https://www.crexi.com/properties?term=motivated+seller&sort=Relevance

# Must sell / distressed
https://www.crexi.com/properties?term=must+sell&sort=Relevance
```

## Data Extraction Fields

Extract these fields from each listing:
- `id` — CREXI listing ID (from URL)
- `url` — Full listing URL
- `name` — Property name/title
- `type` / `subtype` — Property classification
- `address` — Full street address
- `askingPrice` — Listed price (number)
- `capRate` — Capitalization rate (decimal)
- `noi` — Net Operating Income (number)
- `sqft` — Square footage
- `units` — Unit count (if applicable)
- `acreage` — Land size
- `broker` — Listing broker name
- `brokerage` — Brokerage firm
- `description` — Full listing description text
- `investmentHighlights` — Bullet points from listing
- `daysOnMarket` — If available

## Output

Save as JSON to `data/raw/YYYY-MM-DD_<descriptor>.json`

## Anti-Bot Considerations

- CREXI uses Cloudflare protection
- Use `agent-browser` for full browser rendering when WebFetch is blocked
- Minimum 3-second delay between requests
- Rotate search patterns to avoid rate limiting
- If blocked, log the event and try alternative approach

## Reference

See `references/url-patterns.md` for complete URL parameter documentation.
See `references/data-schema.md` for full data schema specification.
