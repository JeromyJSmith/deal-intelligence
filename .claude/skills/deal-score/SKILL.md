---
name: deal-score
description: Scores and ranks deal opportunities using a 6-category rubric covering seller motivation, deal economics, financing terms, regional intelligence, prediction market signals, and asset quality. Detects hidden gems — deals that look bad on the surface but are exceptional when regional and macro context is applied. Classifies deals as HOT, WARM, WATCH, or PASS. Use when user says "score deals", "rank opportunities", "/score", "which deals are hot", "find the best deals", "rank what we found", or "score this listing".
allowed-tools: Read, Write, Glob, Grep
metadata:
  author: Deal Intelligence
  version: 2.0.0
  category: workflow-automation
  tags: [scoring, ranking, hidden-gems, deal-analysis]
---

# Deal Score

Applies the Deal Intelligence scoring rubric to raw or analyzed listings and produces ranked output.

## Instructions

### Step 1: Load Input
Read processed listings from `data/processed/` or raw from `data/raw/`.

If both exist, prefer processed (already has regionalScore and marketSignal).

### Step 2: Apply Base Scoring

For each listing, score each category. See `references/scoring-rubric.md` for full breakdown.

**Category 1 — Seller Motivation (25 pts max)**
- DOM: 0-12 pts based on days on market
- Price cuts: 0-6 pts
- Language signals: retiring, estate, must sell, motivated seller
- Check: `daysOnMarket`, `description`, `priceHistory`

**Category 2 — Deal Economics (20 pts max)**
- Price vs comps: 0-10 pts
- Cap rate (if available): 0-8 pts
- Business price vs NOI: special check for BizBuySell deals
- Auction discount estimate: use starting bid vs estimated value

**Category 3 — Financing Terms (15 pts max)**
- Owner financing explicit: 10 pts
- Auction (forced sale leverage): 5 pts
- Language suggesting flexibility: 0-5 pts

**Category 4 — Regional Intelligence (20 pts max)**
- Use `regionalScore` field if already computed
- If missing: check zone from geos.json, apply zone default score (NCA=65, CO=60, USA=varies)

**Category 5 — Prediction Market (10 pts max)**
- Use `marketSignal` field if already computed
- If missing: apply neutral score (5 pts)

**Category 6 — Asset Quality (10 pts max)**
- Cash flow positive, essential service, value-add potential, scalable

### Step 3: Apply Bonuses

Check hidden gem criteria. Any 2+ of these = `isHiddenGem: true`:
1. Base score under 50 BUT regionalScore 70+
2. Auction/distress price gap vs comps over 30%
3. DOM over 180 + positive market trajectory
4. Business price under 2x verified annual NOI
5. Price cut over 20% + area job growth confirmed
6. Asset looks bad on surface but area fundamentals strong

Apply bonuses:
- Hidden gem: +15
- Auction deal: +10
- Owner finance explicit: +10
- Priority zone (NCA or CO): +5
- 3+ distress signals: +8

### Step 4: Classify Tiers

| Score | Tier | Action |
|-------|------|--------|
| 75+ | HOT | Immediate outreach. Pre-write LOI. |
| 55-74 | WARM | Deep research. Prepare offer. |
| 35-54 | WATCH | Monitor — may ripen. |
| Under 35 | PASS | Archive. |

### Step 5: Save Scored Output

Save to: `data/processed/YYYY-MM-DD_scored.json`

Each record must include:
```json
{
  "dealScore": 0,
  "categoryBreakdown": { ... },
  "bonusesApplied": [],
  "isHiddenGem": false,
  "gemReason": "",
  "tier": "HOT|WARM|WATCH|PASS",
  "scoredAt": "ISO-8601"
}
```

### Step 6: Print Summary

Output to console:
- Total scored
- HOT count (and deal names)
- WARM count
- Hidden gems flagged
- File saved to

## Examples

### Example 1: Score all processed data
User: "/score"
Actions: Read data/processed/ → apply rubric to all → classify tiers → save
Result: data/processed/YYYY-MM-DD_scored.json

### Example 2: Re-score for hidden gems
User: "/hunt hidden-gems"
Actions: Load existing scored data → relax DOM threshold to 60 days → re-run gem detection
Result: Updated scores, more gems surfaced

### Example 3: Score a specific listing
User: "score this listing [URL]"
Actions: Fetch listing data → apply full rubric → return score breakdown
Result: Score with category breakdown and tier classification

## Error Handling

- Missing `daysOnMarket`: Apply 0 pts for that category, note in breakdown
- Missing `askingPrice`: Cannot score — flag as "incomplete data"
- Missing `regionalScore`: Use zone default from geos.json
- Negative cap rate: Flag as "verify NOI" — do not disqualify automatically

## References

- `references/scoring-rubric.md` — Full 6-category scoring breakdown with point tables
