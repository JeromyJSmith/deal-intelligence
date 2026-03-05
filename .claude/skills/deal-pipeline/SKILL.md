---
name: deal-pipeline
description: Full 6-stage deal intelligence pipeline for finding motivated-seller opportunities across any asset class. Scans CREXI, auctions, BizBuySell, and Zillow, applies regional market intelligence and prediction market signals, detects hidden gems, and produces ranked HOT/WARM/WATCH deals with outreach scripts. Use when user says "run hunt", "find deals", "scan for opportunities", "/hunt", "run the pipeline", "find me deals in Nevada County", "what deals are available today", "run all zones", or "start the deal pipeline".
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Agent, WebSearch, WebFetch
metadata:
  author: Deal Intelligence
  version: 2.0.0
  category: workflow-automation
  tags: [deal-finding, motivated-seller, acquisition-intelligence, any-asset-class]
---

# Deal Intelligence Pipeline

## CRITICAL
This system finds deals across ANY asset class — real estate, businesses, auctions, notes, land.
It is NOT limited to commercial real estate. Never narrow scope.

## Instructions

### Step 1: Load Geo Targets
Read `data/targets/geos.json`. Extract active zones: NCA, CO, USA.

### Step 2: Parallel Data Collection
Spawn one `data-collector` agent per zone + source combination.
Run all simultaneously — do not wait for one before starting another.

For each zone, scan all sources in `references/sources.md`:
- CREXI (all asset types, not just commercial)
- Auction.com + Hubzu (foreclosure, REO, tax default)
- BizBuySell (businesses with real estate)
- Zillow (residential distress, 90+ DOM)
- County tax auction listings (WebSearch)

Save raw output: `data/raw/YYYY-MM-DD_[zone]_[source].json`

Rate limit: 3 seconds minimum between page requests. Stop immediately on 403/429.

### Step 3: Regional Intelligence
Spawn `market-analyst` agent per zone.

For each zone, pull:
- Population trend (Census QuickFacts)
- Employment data (BLS by county)
- News: employers, infrastructure, development (WebSearch "[city] 2026 economic development")
- Building permit activity

Attach `regionalScore` (0-100) + 3-sentence summary to each deal.

### Step 4: Prediction Market Signals
Spawn `prediction-market-intel` agent.

Fetch current data from Kalshi and Polymarket:
- Fed rate decision probabilities
- Recession odds
- California housing index (for NCA zone)
- Colorado economic indicators

Output `marketSignal` object + timing recommendation per deal.
See `references/market-signals.md` for interpretation guide.

### Step 5: Hidden Gem Detection + Scoring
For each deal, compute:
```
finalScore = dealScore(0.4) + regionalScore(0.35) + marketBoost(0.25) + bonuses
```

Flag `isHiddenGem: true` if 2+ criteria met from `references/scoring-rubric.md`.
Hidden gem bonus: +15 points.

Tier classification:
- HOT (75+): Call today. Pre-write LOI.
- WARM (55-74): Deep research. Prepare offer.
- WATCH (35-54): Monitor.
- PASS (under 35): Archive.

### Step 6: Deal Packages
For every HOT and WARM deal, generate:
1. One-page deal summary (asset, numbers, why it's interesting)
2. Outreach script — phone + email, seller-specific tone
3. Offer structure (owner finance terms)
4. Risk flags and verification checklist

### Step 7: Save Report
Save to: `data/exports/YYYY-MM-DD_deal-intelligence-report.md`

Report must include:
- Pipeline summary (date, sources, total found, tiers)
- Zone NCA: Grass Valley / Nevada City results
- Zone CO: Colorado results
- Zone USA: Top 3 nationwide (must be different asset classes)
- Hidden gems section
- Prediction market context + timing recommendation

## Examples

### Example 1: Full pipeline
User says: "run the pipeline"
Actions: Read geos.json → parallel scan all zones → regional intel → prediction markets → score → packages → save report
Result: Report at data/exports/ with HOT/WARM/WATCH deals

### Example 2: Single zone
User says: "/hunt NCA"
Actions: Same pipeline, NCA zone only
Result: Nevada County CA deals report

### Example 3: Deal type filter
User says: "/hunt auction"
Actions: Pipeline filtered to auction sources only, all zones
Result: Auction-only deals report

## Error Handling

- 403/429 from any source: Stop that source, log to `data/raw/errors.log`, continue others
- Empty results from a zone: Log warning, continue pipeline
- Missing geos.json: Create from `references/default-geos.md` and continue
- Agent timeout: Log, mark stage incomplete, continue to next stage

## Common Issues

If pipeline produces no HOT deals:
- Check if DOM threshold is too strict (lower from 180 to 90 days)
- Verify prediction market signals aren't suppressing scores
- Run `/hunt hidden-gems` to re-score with relaxed criteria

If data collection fails:
- Check rate limiting — add 5-second delays
- Try WebSearch as fallback for any blocked source

## References

- `references/sources.md` — Full data source list with URLs
- `references/scoring-rubric.md` — Complete 6-category scoring breakdown
- `references/market-signals.md` — Prediction market interpretation guide
- `references/geo-thesis.md` — Zone investment thesis and context
