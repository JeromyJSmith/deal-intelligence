# CREXI Data Schema

## Raw Listing Schema

```json
{
  "scrapeDate": "2026-03-03T12:00:00Z",
  "searchParams": {
    "types": ["Mobile Home Park"],
    "subtypes": [],
    "term": "owner financing",
    "sort": "Relevance",
    "page": 1
  },
  "totalResults": 42,
  "listings": [
    {
      "id": "crexi-12345",
      "url": "https://www.crexi.com/properties/12345/listing-name",
      "name": "Sunset Mobile Home Park",
      "type": "Mobile Home Park",
      "subtype": "",
      "address": "123 Main St, Yuma, AZ 85364",
      "city": "Yuma",
      "state": "AZ",
      "zip": "85364",
      "county": "Yuma",
      "askingPrice": 2500000,
      "capRate": 0.092,
      "noi": 230000,
      "pricePerUnit": 29412,
      "units": 85,
      "sqft": 0,
      "acreage": 12.5,
      "lotSize": "12.5 acres",
      "yearBuilt": 1978,
      "propertyClass": "C",
      "occupancy": 0.88,
      "broker": "John Smith",
      "brokerage": "Southwest CRE Partners",
      "brokerPhone": "",
      "brokerEmail": "",
      "description": "Full listing description text...",
      "investmentHighlights": [
        "Owner financing available",
        "85 pads, 75 occupied",
        "Value-add opportunity"
      ],
      "leaseType": "",
      "tenancy": "multi-tenant",
      "zoning": "MH",
      "daysOnMarket": 167,
      "listDate": "2025-09-18",
      "priceHistory": [
        {"date": "2025-09-18", "price": 2800000},
        {"date": "2025-12-01", "price": 2500000}
      ],
      "images": [],
      "rawHtml": ""
    }
  ]
}
```

## Enriched Listing Schema (After Analysis)

Additional fields added by market-analyst:

```json
{
  "marketAnalysis": {
    "priceVsMarket": "below",
    "pricePerUnit": 29412,
    "marketAvgPricePerUnit": 45000,
    "capRateVsMarket": "favorable",
    "marketAvgCapRate": 0.07,
    "estimatedTrueNOI": 210000,
    "noiConfidence": "medium",
    "distressSignals": [
      "167 days on market",
      "Price reduced $300K",
      "Owner retiring"
    ],
    "marketTrend": "stable",
    "analysisNotes": "Below-market price with owner financing. Seller has reduced price once. Long DOM suggests motivation."
  }
}
```

## Scored Listing Schema (After Scoring)

Additional fields added by deal-scout:

```json
{
  "dealScore": 82,
  "scoreBreakdown": {
    "sellerMotivation": 25,
    "dealEconomics": 27,
    "financingTerms": 15,
    "propertyQuality": 15
  },
  "dealTier": "hot",
  "whyThisDeal": "Below-market 85-unit MHP with owner financing. Seller retiring after 20 years, price already reduced $300K. 9.2% cap rate vs 7% market average.",
  "risks": [
    "Deferred maintenance likely after 20 years self-management",
    "Occupancy at 88% — need to verify actual collections"
  ],
  "nextSteps": [
    "Call broker to confirm owner financing terms",
    "Request trailing 12 months P&L",
    "Drive property if in target market"
  ]
}
```

## Outreach Schema

Additional fields added by outreach-specialist:

```json
{
  "outreach": {
    "sellerType": "retiring",
    "phoneScript": "Full conversation script...",
    "emailDraft": "Subject: Interested in [Property Name]...",
    "followUpPlan": "Day 1: Initial call. Day 3: Follow-up email. Day 7: Second call.",
    "objectionHandling": {
      "wantsCash": "I understand wanting cash, but consider the tax benefits...",
      "priceNegotiation": "Your price is fair — I'm focused on terms...",
      "needsToThink": "Of course. I'll follow up Thursday..."
    },
    "keyTalkingPoints": [
      "Reference 20-year ownership with respect",
      "Mention installment sale tax benefits",
      "Emphasize quick, simple close"
    ]
  }
}
```
