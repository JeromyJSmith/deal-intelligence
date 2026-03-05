# Deal Intelligence — Data Sources

## Priority 1: Scan Every Run

### CREXI
- URL: https://www.crexi.com/properties
- Types: commercial, land, multifamily, business-for-sale
- Use: type filters + geo + keyword search
- NCA search: `?term=Nevada+County+CA&sort=Newest`
- CO search: `?term=Colorado&sort=Newest`
- National: `?term=owner+financing&sort=ListDate`

### Auction.com
- URL: https://www.auction.com
- Types: foreclosure, REO, bank-owned
- Use: filter by state → CA (Nevada County) or CO
- Look for: starting bid vs estimated value gap

### BizBuySell
- URL: https://www.bizbuysell.com
- Types: businesses with real estate included
- Filter: "Real Estate Included" checkbox
- NCA: search Grass Valley CA, Nevada City CA
- CO: search Denver, Colorado Springs, Grand Junction
- National: search "owner financing" + "real estate included"

### Zillow (residential distress)
- URL: https://www.zillow.com
- Filter: 90+ days on market, price reduced, pre-foreclosure
- NCA zips: 95945, 95959, 95946
- CO: Denver 80XXX, Colorado Springs 80XXX

## Priority 2: Secondary Sources

### LoopNet
- URL: https://www.loopnet.com
- Types: commercial only
- Use: redundancy check vs CREXI

### Hubzu
- URL: https://www.hubzu.com
- Types: bank-owned, foreclosure auction
- Use: residential + small commercial auctions

### Lands of America
- URL: https://www.landsofamerica.com
- Types: land, farms, ranches
- NCA: Sierra Foothills land — great for cheap acreage plays

### Ten-X Commercial
- URL: https://www.ten-x.com
- Types: commercial auction
- Use: institutional sellers unloading at discount

## Priority 3: Research Sources (Regional Intelligence)

### Census.gov
- Population estimates by county/zip
- American Community Survey — income, employment
- URL: https://www.census.gov/quickfacts/

### BLS (Bureau of Labor Statistics)
- County-level employment data
- URL: https://www.bls.gov/eag/

### USDA ERS (Rural areas)
- Rural economic data — relevant for NCA
- URL: https://www.ers.usda.gov/data-products/

### Local news search
- Query: "[city name] [year] economic development OR new employer OR project"
- Signals: hospital expansions, distribution centers, broadband rollout, school builds

### County Assessor Records
- Nevada County CA: https://assessor.mynevadacounty.com
- Colorado: search "[county] assessor property records"
- Use: verify ownership, check for liens, find actual purchase history

## Prediction Market Sources

### Kalshi
- URL: https://kalshi.com/markets
- Key markets: Fed rate decisions, inflation, recession
- Fetch current contract prices and implied probabilities

### Polymarket
- URL: https://polymarket.com
- Key markets: recession odds, economic indicators
- Pull current yes/no probabilities

### Polymarket-Parcl (Real Estate Indices)
- URL: https://parcl.co / Polymarket real estate markets
- Key: California housing index, Denver index
- Use: probability-weighted housing trajectory

## County Auction Resources (Tax Sales)

### Nevada County CA
- Search: "Nevada County California tax sale 2026"
- Contact: Nevada County Tax Collector
- Typical schedule: properties sell annually, usually spring/summer

### Colorado Counties
- Each county has own process
- Denver: https://www.denvergov.org/treasury
- El Paso (Colorado Springs): search "El Paso County tax lien sale"
- Jefferson County: search "Jefferson County CO tax sale"
