---
name: deal-pipeline
description: >
  Full-stack deal intelligence pipeline. Finds motivated-seller opportunities
  across any asset class (real estate, businesses, auctions, notes) in target
  geographies. Applies regional market intelligence + prediction market signals
  to surface hidden gems — deals that look bad on the surface but are
  exceptional when you understand what's happening in the area.
  Use /hunt to trigger this pipeline.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Agent, WebSearch, WebFetch
---

# Deal Intelligence Pipeline

## What This Does

Three-layer intelligence system:
1. **Find** — Multi-source scan across all deal types in target geographies
2. **Understand** — Regional intelligence + prediction market signals
3. **Score** — Cross-layer scoring to surface hidden gems

## Target Geographies (Active)

Defined in `data/targets/geos.json`. Current targets:

| Zone | Area | Why |
|------|------|-----|
| NCA | Grass Valley / Nevada City / Auburn, CA (Nevada County) | Sierra Foothills — motivated sellers, below-market assets, infrastructure growth |
| CO | Denver Metro + Front Range + Western Slope, CO | Migration inflows, diverse asset types, strong fundamentals |
| USA | Nationwide — best 3 deals, any type | No geographic filter — pure deal quality |

## Deal Types to Hunt

| Type | Sources | Signal |
|------|---------|--------|
| Owner Finance | CREXI, LoopNet, BizBuySell | "owner will carry", "seller financing" |
| Auction | Auction.com, Hubzu, Xome, county auctions | Foreclosure, tax default, estate |
| Pain Point | All sources | DOM > 90 days, price cuts, motivated language |
| Business + RE | BizBuySell, CREXI Business | Operating business + real estate included |
| Residential Distress | Zillow, Redfin, MLS feeds | Pre-foreclosure, probate, divorce |

---

## Pipeline Stages

### STAGE 1 — Data Collection (Parallel)

Run all scraper agents simultaneously. Each targets one source:

```
Agent: data-collector
Tasks (parallel):
  - CREXI: search target geos, all property types, motivated keywords
  - CREXI: search nationwide for top 3 wide-net deals
  - Auction.com / Hubzu: target geos + nationwide
  - BizBuySell: businesses with real estate, target geos
  - WebSearch: county auctions, probate sales, tax sales in target geos
```

**Save raw output to:** `data/raw/YYYY-MM-DD_[source]_[geo].json`

**Keywords to scan across ALL sources:**
```
owner financing, seller financing, owner will carry, motivated seller,
below market, must sell, price reduced, value add, distressed, as-is,
estate sale, bank owned, REO, retiring, portfolio sale, auction,
foreclosure, tax default, probate, divorce sale, relocation
```

---

### STAGE 2 — Regional Intelligence

For each target geography, pull context:

```
Agent: market-analyst
Tasks:
  - Nevada County CA: population trends, permits, major employers, infrastructure
  - Colorado targets: migration data, job growth, development pipeline
  - Per-deal: zip code level data — vacancy, median income, growth signals
```

**Signal sources:**
- Census.gov population estimates
- BLS employment data by county
- Building permit activity
- Google Trends for area search interest
- News: major employers moving in/out, infrastructure projects
- School quality trends (proxy for neighborhood trajectory)

**Output per deal:** `regionalScore` (0-100) + 3-sentence context summary

**What to look for:**
- Infrastructure investment nearby (road, broadband, utility)
- Population inflow > outflow
- New employers, Amazon/Walmart distribution, hospital expansion
- Low current prices BUT rising fundamentals = hidden gem

---

### STAGE 3 — Prediction Market Signals

```
Agent: prediction-market-intel
Tasks:
  - Query Kalshi: Fed rate decisions (affects seller urgency + financing terms)
  - Query Polymarket: Recession odds (sellers get nervous → more motivated)
  - Query Polymarket-Parcl: California housing index (NCA area trajectory)
  - Query Polymarket: Colorado economic indicators
  - Synthesize: probability-weighted deal timing overlay
```

**Key signals to extract:**

| Market Signal | How It Affects Deals |
|--------------|---------------------|
| Rate cut probability > 60% | Wait signal — sellers know buyers get cheaper money soon |
| Rate hike probability > 40% | Act signal — lock in seller financing now before rates up |
| Recession odds > 40% | Sellers get more motivated → better terms |
| Regional housing up > 70% | Supports price, reduces negotiation room |
| Regional housing down > 60% | Sellers panic → deep discounts available |

**Output:** `marketSignal` object per deal with timing recommendation

---

### STAGE 4 — Hidden Gem Detection

This is the core intelligence layer. Cross-reference all three inputs:

```
For each deal:
  hiddenGemScore = dealScore × 0.4 + regionalScore × 0.35 + marketSignalBoost × 0.25
```

**Hidden Gem Criteria (any 2 = flag as gem):**

| Condition | What It Means |
|-----------|--------------|
| Looks ugly (dealScore < 50) BUT regionalScore > 70 | Bad deal, great location trajectory |
| Auction price vs. regional comp gap > 30% | Distress discount in appreciating market |
| DOM > 180 + prediction market tailwind | Seller stuck, market about to improve |
| Business asking price < 2x NOI | Priced to leave, not priced to sell |
| Price cut > 20% + regional job growth | Motivated seller, area getting better |

**Output:** `isHiddenGem: true/false` + `gemReason: "..."` per deal

---

### STAGE 5 — Final Scoring & Ranking

**Scoring Rubric (0-100 total):**

| Category | Max | Weight |
|----------|-----|--------|
| Seller Motivation | 25 | DOM, price cuts, language, timeline |
| Deal Economics | 20 | Price vs comps, cap rate, NOI, auction discount |
| Financing Terms | 15 | Owner finance, terms flexibility, down |
| Regional Intelligence | 20 | Area trajectory, fundamentals, growth signals |
| Prediction Market | 10 | Timing signal, rate environment |
| Asset Quality | 10 | Condition, cash flow, scalability |

**Bonus multipliers:**
- `isHiddenGem: true` → +15 points
- Auction deal (automatic discount) → +10 points
- Owner finance explicit → +10 points

**Tiers:**

| Tier | Score | Action |
|------|-------|--------|
| 🔥 HOT | 75-100 | Immediate outreach, pre-write LOI |
| ✅ WARM | 55-74 | Research deeper, prepare offer |
| 👁 WATCH | 35-54 | Monitor — may ripen |
| ❌ PASS | 0-34 | Archive |

---

### STAGE 6 — Deal Packages for Top Results

For HOT + WARM deals, generate:

1. **Deal summary** (1-page: what it is, why it's interesting, key numbers)
2. **Outreach script** (phone + email, seller-specific tone)
3. **Offer structure** (suggested down, rate, term, balloon)
4. **Risk flags** (what to verify before committing)

---

## Output Format

### Report Structure

```
data/exports/YYYY-MM-DD_deal-intelligence-report.md

## Pipeline Summary
- Date: ...
- Sources scanned: ...
- Total listings found: ...
- After scoring: X HOT, Y WARM, Z WATCH

## Zone: NCA — Grass Valley / Nevada City
[Top deals for this zone]

## Zone: CO — Colorado
[Top deals for this zone]

## Zone: USA — National Wide Net (Top 3)
[Best 3 deals found anywhere, any type]

## Hidden Gems Flagged
[Deals that scored low on surface but high on regional + market overlay]

## Prediction Market Context
[Current signals and timing recommendation]
```

---

## Invocation

```
/hunt                          # Full pipeline, all zones
/hunt NCA                      # Nevada County CA only
/hunt CO                       # Colorado only
/hunt USA                      # Nationwide wide net only
/hunt auction                  # Auction deals only, all zones
/hunt owner-finance            # Owner finance deals only
/hunt hidden-gems              # Hidden gem detection only (re-score existing data)
```

---

## Data Sources Reference

See `references/data-sources.md` for full list of scan targets.

## Geo Config

See `data/targets/geos.json` for active geography definitions.
Modify this file to add/remove target markets — pipeline reads it at runtime.

## Scoring Details

See `references/scoring-rubric.md` for full scoring breakdown.
