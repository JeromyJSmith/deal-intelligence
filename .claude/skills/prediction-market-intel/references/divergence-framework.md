# Divergence Detection Framework

## Principle

The highest-conviction CRE entry points emerge when prediction market signals
**diverge** from traditional CRE sentiment. These divergences represent
information that has been priced into liquid, real-money markets but has NOT
yet been reflected in illiquid private real estate pricing.

## Signal Matrix

| Prediction Market Signal | Traditional CRE Indicator | Divergence Type | Action |
|---|---|---|---|
| Kalshi: rate cuts >70% | Cap rates still elevated | **Bullish divergence** | Buy ahead of cap rate compression |
| Kalshi: rate holds >70% | CRE sentiment optimistic | **Bearish divergence** | Wait, reduce exposure |
| Polymarket/Parcl: city index rising | Broker reports: "flat market" | **Stealth bull** | Accumulate before brokers catch up |
| Polymarket/Parcl: city index falling | Broker reports: "hot market" | **Stealth bear** | Avoid, wait for price discovery |
| REIT sector outperforming | Private RE prices flat | **Recovery signal** | Private RE will follow in 6-18mo |
| REIT sector underperforming | Private RE prices holding | **Correction signal** | Private RE will decline in 6-18mo |
| Policy prediction (e.g., 1031 repeal >50%) | Market hasn't reacted | **Policy arbitrage** | Position before policy materializes |
| Geopolitical risk rising | CRE investment flows steady | **Tail risk** | Hedge, avoid affected regions |

## Lead Time by Signal Type

| Signal | Typical Lead Time | Confidence |
|---|---|---|
| Fed rate path (Kalshi) | 4-6 weeks vs. survey consensus | Very High (100% FOMC accuracy since 2022) |
| CPI/inflation (Kalshi) | 2-4 weeks vs. Bloomberg consensus | High (40.1% lower MAE) |
| REIT → private RE | 6-18 months | High (documented across 4 major cycles) |
| Local election outcomes | 3-12 months pre-election | Medium (depends on market liquidity) |
| Cannabis legalization | 6-12 months pre-legislation | Medium |
| Geopolitical events | Variable | Low-Medium (tail risks are hard to time) |

## Implementation

### Daily Scan (5 minutes)

1. Check Kalshi Fed rate probabilities — any change >5% from yesterday?
2. Check Polymarket economy markets — any new high-volume contracts?
3. Check VNQ (REIT ETF) — diverging from private RE pricing?
4. Check NAIOP sentiment — any update from quarterly release?

### Weekly Analysis (15 minutes)

1. Compare Kalshi rate path to current deal underwriting assumptions
2. Review Polymarket/Parcl city-level markets — any new signals?
3. Cross-reference REIT sector performance against CREXI listing activity
4. Check local prediction markets for any elections/policy votes with CRE implications

### Monthly Report

Generate `data/research/YYYY-MM-DD_divergence-report.json` with:
- Active divergences and their current status
- Divergences that resolved since last report (and whether prediction market was right)
- New divergences detected
- Recommended portfolio actions

## Historical Accuracy Benchmarks

| Benchmark | Statistic | Source |
|---|---|---|
| Kalshi FOMC accuracy | 100% since 2022 | Fortune / NBER |
| Kalshi CPI MAE vs. consensus | 40.1% lower | Kalshi study |
| REIT-to-private RE lag | 6-18 months | Cohen & Steers / Nareit |
| Prediction market vs. polls (elections) | Significantly more accurate | Multiple studies |
| CRE PropTech decision improvement | 34% better accuracy | RTS Labs |
