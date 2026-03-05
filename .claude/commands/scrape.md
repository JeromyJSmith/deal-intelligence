---
description: Scrape CREXI listings for target property types and keywords
argument-hint: "[type] [keyword]"
allowed-tools: Read, Write, Bash, Glob, WebSearch, WebFetch
---

# Scrape CREXI Listings

Collect raw listing data from CREXI.com.

## Arguments

- `$0` — Property type: mobile-home-park, gas-station, car-wash, self-storage, special-purpose, all
- `$1` — Search keyword (optional): "owner-financing", "motivated", "must-sell"

## Process

1. Construct CREXI search URL from arguments
2. Fetch listing results (handle pagination)
3. Extract structured data per listing
4. Save to `data/raw/` with date prefix

## Property Type Mapping

| Argument | CREXI Parameter |
|----------|----------------|
| mobile-home-park | `types[]=Mobile+Home+Park` |
| gas-station | `types[]=Special+Purpose&subtypes[]=Gas+Station` |
| car-wash | `types[]=Special+Purpose&subtypes[]=Car+Wash` |
| self-storage | `types[]=Self+Storage` |
| special-purpose | `types[]=Special+Purpose` |
| all | All target types |

## Keyword Mapping

| Argument | CREXI Term |
|----------|-----------|
| owner-financing | `term=owner+financing` |
| motivated | `term=motivated+seller` |
| must-sell | `term=must+sell` |

Delegate to `data-collector` agent for execution.
