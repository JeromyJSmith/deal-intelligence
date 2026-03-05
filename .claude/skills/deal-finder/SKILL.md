---
name: deal-finder
description: >
  Score and rank CREXI commercial real estate deals by investment quality,
  seller motivation, and financing terms. Use when you need to evaluate
  which opportunities are worth pursuing, particularly for owner-financed
  acquisitions with no or low money down.
allowed-tools: Read, Write, Glob, Grep
---

# Deal Finder

Scores and ranks commercial real estate opportunities from CREXI.

## Quick Start

1. Read analyzed listings from `data/processed/`
2. Apply scoring rubric to each listing
3. Rank by total score
4. Categorize into tiers (hot / warm / cold)
5. Generate top opportunities report
6. Save to `data/processed/YYYY-MM-DD_scored.json`

## Scoring Rubric (0-100)

### Seller Motivation (30 points max)

| Criterion | Points | How to Detect |
|-----------|--------|--------------|
| DOM > 150 days | 10 | `daysOnMarket` field |
| DOM 120-150 | 7 | `daysOnMarket` field |
| DOM 90-120 | 4 | `daysOnMarket` field |
| Price reduced | 5 | `priceHistory` array |
| "Motivated seller" language | 5 | Description keywords |
| Estate/retirement | 5 | Description keywords |
| Owner financing offered | 5 | Description + highlights |

### Deal Economics (30 points max)

| Criterion | Points | How to Detect |
|-----------|--------|--------------|
| Cap rate > 10% | 10 | `capRate` field |
| Cap rate 8-10% | 7 | `capRate` field |
| Cap rate 6-8% | 4 | `capRate` field |
| Below market price | 10 | `marketAnalysis.priceVsMarket` |
| Credible NOI | 5 | `marketAnalysis.noiConfidence` |
| Cash flow positive | 5 | NOI > 0 |

### Financing Terms (20 points max)

| Criterion | Points | How to Detect |
|-----------|--------|--------------|
| Owner financing explicit | 10 | Description + highlights |
| Low/no money down | 5 | Description keywords |
| Flexible terms | 5 | Description keywords |

### Property Quality (20 points max)

| Criterion | Points | How to Detect |
|-----------|--------|--------------|
| Cash-flowing asset | 5 | NOI > 0 |
| Essential service | 5 | Property type |
| Value-add potential | 5 | Description keywords |
| Scalable | 5 | Units > 10 or multi-site |

## Tier Classification

| Tier | Score | Action |
|------|-------|--------|
| Hot | 70-100 | Immediate outreach |
| Warm | 50-69 | Research further |
| Cold | 0-49 | Archive |

## Essential Service Property Types

These score +5 for "essential service":
- Gas Station
- Self Storage
- Mobile Home Park
- Multifamily
- Convenience Store / Grocery
- Car Wash
- Laundromat
