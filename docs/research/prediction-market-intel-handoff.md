# Prediction Market Intelligence Agent — Handoff Package

> **From**: PolyBot v2 Project (Polymarket CLOB Arbitrage System)
> **To**: CREXI Deal Finder Project (CRE Opportunity Discovery)
> **Date**: March 4, 2026
> **Agent**: `prediction-market-intel`

---

## Executive Summary

This document presents the Prediction Market Intelligence Agent for integration
into the CREXI Deal Finder team. The agent was developed within the PolyBot v2
project, where it completed comprehensive research across 60+ academic and
industry sources. It is now positioned to serve as the CREXI team's
forward-looking economic intelligence layer.

---

## 1. Agent Resume

### Identity

| Field | Value |
|---|---|
| **Name** | `prediction-market-intel` |
| **Role** | Forward-Looking Economic Intelligence Specialist |
| **Model** | Claude Sonnet 4.6 |
| **Memory** | Project-scoped (persistent) |
| **Max Turns** | 75 |
| **Origin** | PolyBot v2 — Phase 0 Prediction Market Research |

### Core Competencies

1. **Economic Signal Monitoring** — Real-time tracking of Kalshi, Polymarket,
   and Polymarket-Parcl markets for CRE-relevant economic signals
2. **Divergence Detection** — Identifies mismatches between prediction market
   data and traditional CRE indicators (the highest-conviction entry points)
3. **Behavioral Science Application** — Research-backed negotiation frameworks
   using anchoring, loss aversion, framing, and self-fulfilling prophecy mechanics
4. **Probabilistic Valuation** — Replaces point estimates with probability
   distributions informed by prediction market data
5. **Outreach Intelligence** — Generates urgency triggers, scenario presentations,
   and data-backed negotiation scripts

### Research Credentials

| Metric | Value |
|---|---|
| Sources synthesized | 60+ (academic papers, industry reports, market data) |
| Research report | 80KB self-contained HTML, 10 sections, 4 Chart.js visualizations |
| Academic foundations | Kahneman & Tversky, Northcraft & Neale, Genesove & Mayer, Witte, Harvard PON |
| Industry data | NBER, Federal Reserve, ICE, Deloitte, CBRE, JPMorgan, Cushman & Wakefield |
| Prediction market coverage | Kalshi, Polymarket, Polymarket-Parcl, ICE Polymarket Signals |

### Verified Accuracy Benchmarks

| Benchmark | Performance |
|---|---|
| Kalshi FOMC prediction accuracy | 100% since 2022 |
| Kalshi CPI forecast vs. consensus | 40.1% lower mean absolute error |
| REIT-to-private RE lead time | 6-18 months (documented across 4 cycles) |
| PropTech decision accuracy improvement | 34% (RTS Labs) |
| CREXI deal closure acceleration | 27% faster with data analytics |

---

## 2. Statement of Work (SOW)

### Scope

The Prediction Market Intelligence Agent will serve as the CREXI Deal Finder
team's forward-looking economic intelligence layer, providing:

#### Deliverable 1: Daily Market Signal Reports
- Real-time Fed rate path probabilities from Kalshi
- Macro indicator forecasts (GDP, CPI, employment, unemployment)
- City-level real estate market signals from Polymarket-Parcl
- Policy and geopolitical event probabilities
- Output: `data/research/YYYY-MM-DD_market-signals.json`

#### Deliverable 2: Divergence Detection Alerts
- Cross-reference prediction market signals against traditional CRE indicators
- Flag mismatches between forward-looking and backward-looking data
- Prioritize divergences by conviction level and potential impact
- Monthly divergence resolution reports
- Output: `data/research/YYYY-MM-DD_divergence-report.json`

#### Deliverable 3: Seller Psychology Briefs
- Per-listing behavioral analysis (loss aversion, basis analysis, capitulation phase)
- Framing strategy recommendations per seller profile
- Urgency trigger identification tied to current prediction market data
- Output: `data/research/YYYY-MM-DD_seller-psychology.json`

#### Deliverable 4: Probabilistic Property Valuations
- Replace point-estimate valuations with probability distributions
- Cap rate distributions informed by Kalshi Fed rate data
- NOI distributions informed by metro-level prediction market signals
- Probability-weighted expected values for deal scoring
- Integration with `deal-scout` scoring adjustments

#### Deliverable 5: Outreach Intelligence
- Prediction market-backed urgency scripts for `outreach-specialist`
- Rate-driven, policy-driven, and scenario-based outreach templates
- Behavioral science-optimized negotiation frameworks
- Investor presentation probability displays

#### Deliverable 6: Property Use Intelligence
- Cannabis legalization signals → property value uplift forecasting
- AI/data center demand → industrial conversion opportunity detection
- Geopolitical risk → defense sector CRE demand signals
- Regional economic trend analysis

### Integration Points

| Team Agent | Integration | Timing |
|---|---|---|
| `lead-researcher` | Market context for pipeline prioritization | Before `/hunt` |
| `market-analyst` | Forward-looking cap rate & NOI projections | During `/analyze` |
| `deal-scout` | Probability-weighted scoring adjustments | During `/score` |
| `outreach-specialist` | Urgency triggers & behavioral frameworks | During `/outreach` |
| `notebook-uploader` | Research outputs synced to NotebookLM | After each output |

### Timeline

- **Immediate**: Agent definition, skill, references installed and registered
- **Day 1**: First market signal scan, divergence baseline established
- **Week 1**: Full integration with `/hunt` pipeline tested
- **Ongoing**: Continuous signal monitoring, accuracy tracking, memory accumulation

---

## 3. Master Service Agreement (MSA)

### Service Terms

1. **Availability**: On-demand via `@prediction-market-intel` dispatch or
   `/predict` command. Also auto-invoked when market timing, economic
   forecasting, or seller psychology topics arise.

2. **Data Freshness**: All prediction market data fetched at time of request.
   No stale data from previous sessions (WebFetch is always live).

3. **Accuracy Standard**: All claims are source-grounded with academic
   citations or verifiable market data URLs. No speculation presented as fact.

4. **Output Format**: JSON for machine consumption (compatible with existing
   data pipeline), HTML for stakeholder presentations, Markdown for internal
   docs.

5. **Memory Persistence**: Agent memory persists across sessions, accumulating:
   - Signal accuracy tracking (predictions vs. outcomes)
   - Regional patterns and market behavior
   - Seller psychology outcomes
   - Divergence detection history

6. **Skill Dependencies**: Self-contained skill package with 3 reference
   documents (behavioral science, divergence framework, data sources).

7. **Tool Requirements**: Read, Write, Edit, Bash, Glob, Grep, WebSearch,
   WebFetch — same toolset as `market-analyst`.

8. **Security**: No private keys, credentials, or .env access. All prediction
   market data accessed via public APIs. No trading or financial transactions.

### SLAs

| Metric | Target |
|---|---|
| Signal report generation | <5 minutes |
| Divergence scan | <3 minutes |
| Seller psychology brief | <2 minutes per listing |
| Probabilistic valuation | <3 minutes per property |
| Research accuracy | Source-grounded, academically cited |

### Exclusions

- Does NOT place trades or manage positions (that's PolyBot's domain)
- Does NOT scrape CREXI listings (that's `data-collector`)
- Does NOT perform backward-looking market analysis (that's `market-analyst`)
- Does NOT score deals (that's `deal-scout`) — provides probability adjustments only

---

## 4. Registration Requirements

### Files Created

```
.claude/agents/prediction-market-intel.md          ← Agent definition
.claude/skills/prediction-market-intel/SKILL.md    ← Skill package
.claude/skills/prediction-market-intel/references/
  ├── behavioral-science.md                        ← Academic research summaries
  ├── divergence-framework.md                      ← Signal divergence guide
  └── data-sources.md                              ← API endpoints & access
.claude/agent-memory/prediction-market-intel/
  └── MEMORY.md                                    ← Persistent memory (initialized)
docs/research/
  └── prediction-market-intelligence.html          ← Full 80KB research report
```

### Settings.json Additions Required

Add to `permissions.allow`:
```json
"Agent(prediction-market-intel)",
"Skill(predict *)"
```

### CLAUDE.md Additions Required

Add to Architecture section:
```markdown
- **prediction-market-intel**: Forward-looking economic intelligence, prediction
  market signals, seller psychology, probabilistic valuations
```

Add to Commands table:
```markdown
| `/predict` | Query prediction market intelligence | prediction-market-intel |
```

Add to Agents section:
```markdown
| `prediction-market-intel` | Prediction market signals, behavioral science, probabilistic analysis |
```

### Agent Dependency Graph (Updated)

```
lead-researcher (orchestrator)
├── data-collector (scrapes CREXI)
├── market-analyst (analyzes current prices)
├── prediction-market-intel (forward-looking intelligence)  ← NEW
├── deal-scout (scores opportunities)
├── outreach-specialist (generates scripts)
└── notebook-uploader (syncs to NotebookLM)
```

---

## 5. Value Proposition

### What This Agent Adds That No Other Agent Provides

| Capability | Current Team | With This Agent |
|---|---|---|
| Economic forecasting | None (relies on lagging indicators) | Real-time probability distributions from Kalshi/Polymarket |
| Market timing | Backward-looking (cap rates, DOM) | Forward-looking (6-18mo REIT lead, prediction market consensus) |
| Seller psychology | Generic outreach scripts | Research-backed behavioral frameworks (5 academic studies) |
| Property valuation | Point estimates | Probability distributions with confidence intervals |
| Policy risk | Read the news | Quantified probabilities from real-money markets |
| Competitive edge | Same data as everyone else | Information asymmetry via prediction market intelligence |

### The Moat

No traditional CRE operator combines these four data layers:

1. **CREXI listing intelligence** (DOM, price reductions, inventory — the team already has this)
2. **Prediction market economic signals** (Fed path, GDP, employment — this agent provides)
3. **REIT sector performance** (6-18 month leading indicator — this agent provides)
4. **Local prediction markets** (elections, policy, infrastructure — this agent provides)

This is the analytical moat that differentiates the CREXI Deal Finder from every
other CRE acquisition operation.

---

*Agent ready for registration. All files in place. Awaiting acceptance by the
CREXI Deal Finder project lead.*
