---
description: Run the full Deal Intelligence pipeline — multi-source scan, regional intel, prediction markets, hidden gem detection, ranked output
argument-hint: "[zone] [deal-type]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Agent, WebSearch, WebFetch
---

# Deal Intelligence — Full Pipeline Hunt

Runs the complete 6-stage pipeline defined in `.claude/skills/deal-pipeline/SKILL.md`.

## Arguments

- `$0` — Zone filter (optional): `NCA`, `CO`, `USA`, or omit for all zones
- `$1` — Deal type filter (optional): `auction`, `owner-finance`, `pain-point`, `hidden-gems`, or omit for all

Default: all zones, all deal types

## Active Zones (from `data/targets/geos.json`)

| Zone | Area |
|------|------|
| NCA | Grass Valley / Nevada City / Auburn, CA — Nevada County |
| CO | Denver Metro + Front Range + Western Slope, Colorado |
| USA | Nationwide — best 3 deals, any type, must be different asset classes |

## Pipeline Execution

### STAGE 1 — Data Collection

Read `data/targets/geos.json` to get zone configs.

For each active zone, run `data-collector` agent to scan:
- CREXI (all asset types — NOT just commercial)
- Auction.com + Hubzu (foreclosure, REO, tax default)
- BizBuySell (businesses with real estate)
- Zillow (residential distress, 90+ DOM, price cuts)
- County tax auction listings (WebSearch)

Use `globalKeywords` from geos.json. Respect 3-second rate limit between requests.

Save raw data: `data/raw/YYYY-MM-DD_[zone]_[source].json`

### STAGE 2 — Regional Intelligence

For each zone, `market-analyst` agent pulls:
- Population trend for target counties/cities (Census QuickFacts)
- Employment data (BLS)
- News: new employers, infrastructure, development (WebSearch)
- Building permit activity
- Area narrative: is this place getting better or worse?

Output per deal: `regionalScore` (0-100) + 3-sentence context

### STAGE 3 — Prediction Market Signals

`prediction-market-intel` agent fetches current data from Kalshi and Polymarket:
- Fed rate decision probabilities
- Recession odds
- California housing index (for NCA)
- Colorado economic indicators

Output: `marketSignal` object + timing recommendation (act now / wait / monitor)

### STAGE 4 — Hidden Gem Detection

Cross-reference all three layers per deal.
Flag `isHiddenGem: true` if 2+ hidden gem criteria met (see scoring rubric).
These are deals that look bad on the surface but are exceptional in context.

### STAGE 5 — Scoring & Ranking

Apply full scoring rubric from `references/scoring-rubric.md`.
Classify all deals into HOT / WARM / WATCH / PASS tiers.

### STAGE 6 — Deal Packages

For every HOT and WARM deal, generate:
1. One-page deal summary
2. Personalized outreach script (phone + email)
3. Suggested offer structure (owner finance terms)
4. Risk flags and verification checklist

## Output

Save final report: `data/exports/YYYY-MM-DD_deal-intelligence-report.md`

Report sections:
- Pipeline summary (deals found, sources, date)
- Zone NCA: Grass Valley / Nevada City results
- Zone CO: Colorado results
- Zone USA: Top 3 nationwide (different asset classes)
- Hidden Gems flagged
- Prediction market context and timing recommendation

## Usage

```
/hunt                   # Full pipeline — all zones, all types
/hunt NCA               # Nevada County CA only
/hunt CO                # Colorado only
/hunt USA               # Nationwide top 3 only
/hunt auction           # Auction deals only, all zones
/hunt owner-finance     # Owner finance deals only, all zones
/hunt hidden-gems       # Re-score existing data for hidden gems
/hunt NCA auction       # Auction deals in Nevada County CA
/hunt CO owner-finance  # Owner finance in Colorado
```
