---
name: prediction-market-intel
description: >
  Prediction market intelligence for CRE decisions. Fetches real-time data from
  Kalshi, Polymarket, and Polymarket-Parcl. Applies behavioral science (anchoring,
  loss aversion, framing) to seller negotiations. Generates probability-weighted
  property valuations and divergence detection alerts. Auto-invoked when discussing
  market timing, economic forecasts, seller psychology, or probabilistic analysis.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, WebSearch, WebFetch
---

# Prediction Market Intelligence Skill

## When to Use

- Market timing decisions (buy now vs. wait)
- Seller outreach strategy (urgency triggers, anchoring)
- Property valuation under uncertainty (distributions, not point estimates)
- Economic forecast integration (Fed rates, GDP, CPI)
- Investor presentations (probability-weighted scenarios)
- Divergence detection (prediction markets vs. traditional CRE signals)

## Quick Reference

### Key URLs

```
# Federal Reserve
https://kalshi.com/markets/kxratecut/fed-rate-cut/
https://kalshi.com/markets/kxratecutcount/number-of-rate-cuts/

# Macro Economy
https://polymarket.com/economy
https://kalshi.com/markets/kxgdp/

# Real Estate Specific
https://polymarket.com (search: real estate, housing)

# REIT Leading Indicator
https://finance.yahoo.com/quote/VNQ/ (Vanguard Real Estate ETF)
```

### Behavioral Science Quick Cards

**Anchoring** (Northcraft & Neale, 1987)
- Works on experts AND amateurs equally
- Experts deny being influenced (but they are)
- Set YOUR anchor first with prediction market data

**Loss Aversion** (Genesove & Mayer, 2001)
- Sellers with nominal losses: asks 25-35% above expected value
- Owner-occupants: 2x more loss-averse than investors
- Hazard rate inflection: 90-180 days on market

**Framing** (Witte, 2008)
- Sales price frame → more concessions
- Equity frame → more resistance
- Redirect conversations to "what the market bears"

**Self-Fulfilling Prophecy** (Harvard PON)
- Presenting decline probability changes seller behavior
- The forecast itself influences outcomes
- Probability displays engage System 2 (analytical) thinking

### Probabilistic Valuation Template

```
Cap Rate (Kalshi Fed-informed):
  Bear: [75th percentile] → rates stay elevated
  Base: [50th percentile] → current conditions
  Bull: [25th percentile] → rate cuts materialize

NOI (Polymarket/Parcl metro):
  Bear: [25th percentile] → vacancy up, rents soften
  Base: [50th percentile] → current trajectory
  Bull: [75th percentile] → market tightens

Property Value = NOI / Cap Rate per scenario
Expected Value = Σ(scenario_value × probability)
```

### Outreach Script Templates

**Rate-Driven Urgency**
"I track the same prediction markets the Federal Reserve studies. Right now,
Kalshi markets are pricing a [X]% probability of rate holds through [date].
Properties in your submarket historically see [Y]% value compression in hold
environments. I'd like to present you with three probability-weighted scenarios."

**Policy-Driven Urgency**
"Prediction markets are pricing a [X]% probability that [policy change] will
pass by [date]. If that happens, the tax impact on your sale would be
approximately $[amount]. I have [N] qualified buyers who can close in [timeline]."

**Cannabis Legalization Signal**
"With [state] cannabis legalization polling at [X]% probability on Kalshi,
commercial properties in qualifying corridors are projected to see a 2.7%
value increase (per Rutgers research). Your property is positioned to benefit,
but the window for current pricing won't last."

## Reference Documents

- `references/behavioral-science.md` — Full academic research summaries
- `references/divergence-framework.md` — Signal divergence detection guide
- `references/data-sources.md` — API endpoints and data access patterns
- `docs/research/prediction-market-intelligence.html` — Full 60-source research report
