# Lead Researcher Memory

## Successful Strategies

### Nationwide Hunt Pipeline (2026-03-04)
- WebSearch across 8+ asset classes in parallel before any synthesis = best coverage
- CREXI direct fetch returns 403 — use WebSearch for CREXI-specific data + WebFetch for blog/research pages
- MobileHomeParkStore.com also 403. Use midplainsland.com, matthews.com, northmarq.com for MHP data
- BizBuySell 403 on direct fetch. Use WebSearch to surface specific listing details
- Matthews.com, realcapanalytics.com, northmarq.com, insideselfstorage.com = reliable data sources (WebFetch works)
- DXD Capital (dxd.capital) = good self storage seller financing data but returned 403 this run

### What Yields Best Research Results
- Search "[asset type] for sale owner financing [year] specific listing [region]" surfaces actual deal data
- Search "[asset type] CMBS maturity distressed 2026 [region]" for hospitality angles
- Fetch market outlook pages (matthews.com, northmarq.com, crexi.com/blog) for quantified cap rates and deal profiles

## Market Patterns (as of 2026-03-04)

### Mobile Home Parks
- Average cap rate: 8.55% (108 tracked listings, Mid-Plains 2026)
- Only 17% of listed MHPs sold in 2025 — 83% failure rate = extreme seller pressure
- Price per pad: $45,500 median, down 11% YoY — softening
- Website traffic for MHP marketplaces down 75% since 2021 — fewer buyers = more motivated sellers
- Florida dominating on lot rent growth (5.5-11% annually); Michigan at 7% of US sales
- Best deal profile: pre-2018 baby boomer owner, 15-50 lots, Midwest (MO, IN, OH)

### Self Storage
- Tertiary/rural markets: 9-12% cap rates (vs 5-6% in primary markets)
- ~50% of value-add storage sellers offer some seller carry (DXD Capital data)
- Active transaction markets Feb 2026: Chillicothe MO, Ypsilanti MI, Lakewood OH, Valley View TX, Arkansas (7-property portfolio)
- Benchmark seller-carry deal: Discount Mini Storage, Mead WA — $4.65M with seller financing

### Hospitality / Economy Motels
- CMBS distress rate: 11.98% overall (Jan 2026), projected 14.5-15% by Dec 2026 (CRED iQ)
- Hotel CMBS delinquency: 7.29% (6x bank loan rate)
- Economy hotel cap rates peaking ~10.6% in 2026 — levels not seen since GFC
- FL/GA epicenter: FHA serious delinquencies 15-25% spikes
- $48B hotel CMBS maturity wave 2025-2026 = forced seller supply
- Refinancing gap: original debt at 3-4.5%, now faces 6.25-7% = forced exit
- Buyer target: $30K-$75K/key vs $150K-$300K replacement cost
- Note purchase angle: buy CMBS note from special servicer at 60-70 cents on dollar

### Macro Timing (2026-03-04)
- Recession probability: 25% (Kalshi) — LOW
- Fed rate cuts: 1-2 expected in 2026 (50 bps total)
- CRE loan maturities: $936B in 2026 — massive forced seller supply
- Signal: STRONG BUY WINDOW — low recession, rates declining, motivated sellers everywhere

## Pipeline Optimization

- Run all 8+ WebSearches in parallel (Stage 1) — do not sequence
- Fetch market outlook pages (matthews, northmarq, midplainsland) to get quantified benchmarks
- CREXI direct = 403 always — use blog pages and indirect search data instead
- BizBuySell = 403 on direct fetch — use WebSearch to surface listing details
- After scoring, save JSON to data/processed/ using naming convention YYYY-MM-DD_USA-deals.json
- Prediction market data: Kalshi for recession, Polymarket for Fed cuts
- Score cap: motel/hospitality often scores highest due to CMBS forced sale mechanism (structural motivation > discretionary)

## Reliable Data Sources by Asset Class
| Asset Class | Best Sources |
|-------------|-------------|
| MHP | midplainsland.com, matthews.com, northmarq.com, mobilehomeparkstore.com (403 but WebSearch works) |
| Self Storage | insideselfstorage.com, skyviewadvisors.com, dxd.capital (sometimes 403) |
| Hospitality | matthews.com, crexi.com/blog, credaily.com, commercialobserver.com, hotelnewsresource.com |
| Gas Stations | bizbuysell.com (via search), dealstream.com, nrc.com, salehgroup.com |
| Car Washes | bizbuysell.com (via search), mycarwashbroker.com, carwashking.com |
| Macro/Prediction | kalshi.com, polymarket.com, cmegroup.com FedWatch |
| CO-specific CRE | coloradorealtors.com, socodigest.com, milehighcre.com, bizwest.com, coloradosun.com |

## NCA Zone Intelligence (Nevada County, CA — March 2026)

### Key NCA Market Facts
- Nevada County population: 102,413, growth 0.11%/yr (very slow)
- Median home price: $485-546k (Oct-Nov 2025), down ~6.5% YoY
- Days on market: 71 days vs 57 prior year — softening market
- 109 active foreclosure/distressed properties (Foreclosure.com)
- 18 owner-financed land listings active (Land.com/LandWatch)
- Entry-level (<$499k) buyer-friendly; luxury ($1M+) very soft
- 14 businesses for sale in Nevada County (BizBuySell)

### NCA Infrastructure Signals
- Nevada-49 Corridor Improvement Project active 2026 (2.5 miles, truck climbing lanes)
- SR-49 Wildfire Evacuation Route proposed
- Low-income housing zoning incentives adopted 2025
- Legacy tech hub (Grass Valley Group broadcast); high-speed fiber infrastructure

### NCA Key Brokers
- Highland Commercial: (530) 470-1740, 11300 Willow Valley Rd, Nevada City — primary local CRE broker
- Restaurant Realty Company: key NorCal food service business broker
- Coldwell Banker Grass Roots Realty: residential Nevada County specialist
- Nevada County Tax Collector: (530) 265-1285 — for tax auction info

### NCA Source Notes
- CREXI, BizBuySell, BizQuest, LoopNet all 403 blocked for direct fetch
- Foreclosure.com = clean full data (109 NCA listings)
- LandWatch = clean owner-finance land data
- Highland Commercial website was ECONNREFUSED — call directly
- Nevada County Tax Auction via GovEase.com — Jan and Nov cycles

## Colorado Zone Intelligence (CO — March 2026)

### Key Colorado Market Facts
- Population: 6.01M, growth rate 0.4% (slowest since 1989); first net domestic outmigration since 2004
- Denver median SFH: $630k; inventory rising; balanced market with seller concessions
- Colorado Springs: multifamily rents -7% YoY, 7% vacancy, short sales re-emerging (distressed opportunity)
- Pueblo: median $180k, cap rates 8-12%, rents +12% YoY, $500M+ new investment — BEST VALUE SUB-MARKET
- Front Range overall: best motivated-seller zone; Western Slope mixed signals (possible 10-15% price pullback)

### Colorado MHP Regulatory Angle (use in outreach)
- HB24-1294 + SB22-160: sellers must give 120-day ROFR to residents before closing
- This burden = mom-and-pop operators want OUT with minimal hassle
- Outreach hook: "I know the 120-day ROFR process is complex — I can close with minimal disruption to residents"

### Colorado Self-Storage Signal
- UpLift acquired 18-property I-70/Hwy 40 mountain corridor portfolio (Feb 2026, $71.5M, JLL financing)
- Properties: Dumont, Georgetown, Idaho Springs, Empire, Tabernash, Granby, Grand Lake
- Remaining small operators in mountain corridor now have exit benchmark — use in seller conversations
- Argus Self Storage Advisors = dominant Colorado self-storage broker

### Colorado Outreach Angles by Seller Type
- MHP: "I understand the 120-day ROFR complexity — I simplify the exit"
- BTR developer: "I can close on your schedule without re-listing to the retail market"
- Pueblo landlord: "I want to hold long-term — I'm the right buyer for a long-term relationship"
- FSBO/Craigslist: "I saw your listing — no broker needed on my side, we can move fast"
