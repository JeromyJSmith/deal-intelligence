# Data Sources & Access Patterns

## Prediction Market Platforms

### Kalshi (Regulated U.S. Exchange)

**Fed Rate Decisions**
- URL: `https://kalshi.com/markets/kxratecut/fed-rate-cut/`
- Data: Probabilities for cut/hold/hike at each FOMC meeting
- Update: Real-time, continuous
- Access: Public (WebFetch)
- Accuracy: 100% FOMC prediction record since 2022

**Rate Cut Count (Annual)**
- URL: `https://kalshi.com/markets/kxratecutcount/number-of-rate-cuts/`
- Data: Probability distribution for total rate cuts in calendar year
- Update: Real-time

**GDP Growth**
- URL: `https://kalshi.com/markets/kxgdp/`
- Data: Quarterly GDP growth probability brackets

**CPI/Inflation**
- URL: `https://kalshi.com/markets/kxcpi/`
- Data: Monthly CPI print probability brackets

**Unemployment**
- URL: `https://kalshi.com/markets/kxunrate/`
- Data: Monthly unemployment rate probability brackets

**Cannabis Legalization**
- URL: Search Kalshi for state-specific cannabis markets
- Data: State-level legalization outcome probabilities

### Polymarket (Crypto-Based, Largest by Volume)

**Economy Section**
- URL: `https://polymarket.com/economy`
- Data: Fed decisions, economic indicators, policy outcomes
- Update: Real-time
- Access: Public (WebFetch)
- Volume: Part of $17.9B monthly combined volume (Feb 2026)

**Real Estate (Polymarket-Parcl Partnership)**
- URL: Search Polymarket for "housing", "real estate", city names
- Data: City-level housing price index directional markets
- Settlement: Against Parcl daily housing price indices
- Markets: Major U.S. cities, monthly/quarterly/annual contracts

**Policy & Geopolitical**
- URL: `https://polymarket.com/politics`, `https://polymarket.com/world`
- Data: Election outcomes, policy decisions, international events

### ICE Polymarket Signals (Institutional)

- Provider: Intercontinental Exchange (NYSE owner)
- Investment: $2B in Polymarket ($9B valuation)
- Data: Normalized prediction market data alongside traditional pricing
- Features: Entity mapping, cross-asset sentiment, divergence detection
- Access: Institutional subscription (monitor via news/research reports)

## Leading Indicators (Non-Prediction Market)

### REIT Performance (6-18 Month Leading Signal)

**Vanguard Real Estate ETF (VNQ)**
- URL: `https://finance.yahoo.com/quote/VNQ/`
- Signal: Private RE values follow REIT prices with 6-18mo lag
- After cap rate spread peaks: REITs outperform private RE by 8.3% to 124.7%
- Sources: Cohen & Steers, Invesco, Nareit

**Sector-Specific REITs**
- Industrial: STAG, PLD (Prologis)
- Office: BXP (Boston Properties)
- Retail: SPG (Simon Property)
- Residential: EQR (Equity Residential)
- Self-Storage: PSA (Public Storage)

### NAIOP CRE Sentiment Index

- URL: `https://www.naiop.org/research-and-publications/sentiment-index/`
- Update: Quarterly
- Current: Score 65 (above 2023 trough of 44)
- Signal: Cross-reference with prediction markets for divergence detection

## CRE Distress Indicators (Lagging — For Context)

| Indicator | Current | Signal Type |
|---|---|---|
| CMBS Delinquency Rate | 7.29% (office: 11.8%) | Lagging |
| Effective Asking Rents | -0.7% YoY (4-year steepest) | Concurrent |
| Business Uncertainty Index | 91 (elevated) | Concurrent |
| Prime vs. Non-Prime Vacancy Gap | 4.8 pct points (widening) | Concurrent |

## Property Value Impact Data

### Cannabis Legalization
- State-level uplift: +2.7% average home prices (Rutgers/JPS)
- Recreational states vs. non: $185K vs. $136K appreciation since 2014 (Clever RE)
- Proximity penalty: -3-4% within 0.36 miles of dispensary
- Contagion: Municipalities more likely to permit if neighbors do

### AI/Data Center Demand
- Market size: $1,303B by 2030 (33.9% CAGR)
- Signal: Cushman & Wakefield AI Momentum Model (Feb 2026)
- Implication: More server racks, fewer desks → industrial/conversion plays

### Geopolitical CRE Impact
- Poland CRE post-Ukraine invasion: dropped to $1.5B (1/4 of pre-pandemic)
- Defense spending correlation: Industrial/logistics near military installations
- Source: Savills global research, BlackRock Geopolitical Risk Dashboard
