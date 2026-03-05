---
name: prediction-market-intel
description: Fetches real-time probability data from Kalshi and Polymarket to generate deal timing and acquisition strategy signals. Translates Fed rate decisions, recession odds, and regional housing index probabilities into actionable recommendations. Use when user says "check prediction markets", "what do markets say", "get macro signals", "should I act now or wait", "what are the odds", "check Kalshi", "check Polymarket", "what is the market timing", or "give me the economic outlook".
allowed-tools: Read, Write, WebFetch, WebSearch, Glob, Grep
metadata:
  author: Deal Intelligence
  version: 2.0.0
  category: workflow-automation
  tags: [prediction-markets, macro-signals, deal-timing, kalshi, polymarket]
---

# Prediction Market Intelligence

Fetches live probability data from prediction markets and translates it into deal acquisition timing signals.

## Instructions

### Step 1: Fetch Kalshi Data

WebFetch: https://kalshi.com/markets

Target markets:
- Fed rate decision (next meeting)
- Inflation trajectory
- US recession probability

Extract: market name, current YES probability, volume, expiry date.

### Step 2: Fetch Polymarket Data

WebFetch: https://polymarket.com

Target markets:
- US recession odds
- Economic indicators
- Housing-related markets if available

Extract: question, current probability, volume.

### Step 3: Fetch Regional Housing Data

WebSearch: "Parcl polymarket California housing index 2026"
WebSearch: "Parcl polymarket Colorado housing index 2026"

Extract: direction probability (up/down/flat), magnitude estimate.

### Step 4: Interpret Signals

Apply interpretation matrix:

| Signal | Threshold | Acquisition Implication |
|--------|-----------|------------------------|
| Rate cut probability | Over 60% | Wait — buyer pool expands soon, competition up |
| Rate hike probability | Over 40% | Act now — lock in seller finance before rates up |
| Recession odds | Over 40% | Sellers get more motivated, better terms available |
| CA housing up | Over 70% | Supports NCA prices — negotiate harder now |
| CA housing down | Over 60% | Discount window open — act fast |
| CO housing up | Over 65% | CO deals will reprice up — buy now |

### Step 5: Generate Timing Recommendation

Based on aggregate signals, produce one of:
- ACT NOW: Multiple signals favor buying. Don't wait.
- ACT SOON: Signals neutral-favorable. Start outreach this week.
- WAIT: One key signal suggests waiting 30-60 days.
- MONITOR: Signals mixed. Watch specific market for clarity.

Include: which signal drove the recommendation + expiry date.

### Step 6: Per-Zone Overlay

Map signals to active zones:
- NCA: Use CA housing index + recession odds + rate direction
- CO: Use CO housing index + recession odds + rate direction
- USA: Use national recession odds + rate direction only

### Step 7: Apply Behavioral Science Layer

From academic research (see references/behavioral-science.md):

**Anchoring** — Use prediction market probabilities as your price anchor in negotiation.
Set YOUR anchor first with data. It works on both experts and amateurs.

**Loss Aversion** — Sellers with 180+ DOM have entered loss-aversion territory.
Frame offers as "avoiding further loss" not "accepting discount."

**Framing** — Present "what the market bears" not "what I'm willing to pay."
Probability data shifts conversations to analytical mode.

### Step 8: Save Output

Save to: `data/processed/YYYY-MM-DD_market-signals.json`

Format:
```json
{
  "fetchedAt": "ISO-8601",
  "signals": {},
  "zoneOverlays": { "NCA": {}, "CO": {}, "USA": {} },
  "timingRecommendation": "ACT NOW",
  "recommendationReason": "...",
  "signalExpiry": "ISO-8601"
}
```

## Examples

### Example 1: Full market check
User: "check prediction markets"
Actions: Fetch Kalshi and Polymarket data → interpret → generate timing rec → save
Result: Market signals report with zone-specific timing recommendation

### Example 2: Deal-specific timing
User: "should I move on the Grass Valley property now or wait"
Actions: Fetch signals → apply NCA zone overlay → give specific recommendation
Result: ACT NOW or WAIT with probability-backed reasoning

### Example 3: Quick odds
User: "what are recession odds right now"
Actions: Fetch Polymarket recession market → return current probability
Result: "Current recession probability: X% (as of [date])"

## Error Handling

- Kalshi unavailable: WebSearch "Kalshi [market] current probability" as fallback
- Polymarket unavailable: WebSearch as fallback
- No housing data found: Use national signals only, note housing data unavailable
- Stale data (over 24 hours): Flag as stale, recommend re-fetch

## References

- `references/behavioral-science.md` — Full academic research (Northcraft, Genesove, Witte)
- `references/signal-matrix.md` — Complete signal interpretation guide
- `references/data-sources.md` — Kalshi and Polymarket URL patterns
