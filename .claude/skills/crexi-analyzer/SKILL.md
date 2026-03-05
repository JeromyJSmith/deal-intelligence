---
name: crexi-analyzer
description: >
  Analyze CREXI commercial real estate listings for deal quality, market
  positioning, and investment potential. Use when you need to evaluate
  property economics, compare to market benchmarks, or identify distress
  signals in listing data.
allowed-tools: Read, Write, Bash, Glob, Grep, WebSearch
---

# CREXI Analyzer

Evaluates commercial real estate listings against market benchmarks.

## Quick Start

1. Read raw listings from `data/raw/`
2. Apply market benchmarks from `references/market-benchmarks.md`
3. Calculate derived metrics (price per unit, cap rate spread, etc.)
4. Identify distress signals
5. Output enriched data to `data/processed/`

## Analysis Dimensions

### Price Analysis
- Price per unit/sqft/pad/key vs market average
- Historical price changes (reductions = motivation)
- Asking price vs recent comparable sales

### Income Analysis
- NOI credibility check (reasonable expense ratios)
- Cap rate vs market for property type and region
- Implied GRM (Gross Rent Multiplier)

### Distress Detection

| Signal | Weight | Source |
|--------|--------|--------|
| DOM > 150 days | High | Listing metadata |
| Price reductions | High | Price history |
| "Motivated" keywords | Medium | Description text |
| "As-is" condition | Medium | Description text |
| Estate/retirement language | High | Description text |
| Below-market pricing | High | Comparable analysis |
| Multiple relistings | High | Listing history |

### Owner Financing Signals

Keywords indicating seller willingness to finance:
- "owner financing", "seller financing", "owner will carry"
- "seller carry back", "installment sale", "contract for deed"
- "land contract", "wrap mortgage", "subject to"
- "no bank needed", "creative financing"
- "terms available", "flexible terms"

## Market Benchmarks

See `references/market-benchmarks.md` for current benchmarks by property type.

## Output

Enriched listings saved to `data/processed/YYYY-MM-DD_analyzed.json`
