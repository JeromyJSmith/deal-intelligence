---
name: seller-profiler
description: >
  Profile CREXI listing sellers to determine motivation level, likely
  negotiation style, and optimal outreach approach. Use when you need to
  understand who you're dealing with before making contact.
allowed-tools: Read, Write, Glob, Grep, WebSearch
---

# Seller Profiler

Builds seller profiles from listing data to inform outreach strategy.

## Quick Start

1. Read listing data (description, highlights, broker info, DOM, price history)
2. Classify seller type
3. Estimate motivation level (1-10)
4. Identify leverage points
5. Recommend approach

## Seller Type Classification

### Retiring Owner
**Signals**: "retiring", "20+ years ownership", "self-managed", age indicators
**Motivation**: Often high — wants out but needs tax-efficient exit
**Leverage**: Installment sale tax benefits, no 1031 exchange pressure
**Approach**: Respectful, acknowledge their work, offer legacy continuation

### Forced Seller
**Signals**: "must sell", "health", "divorce", "partnership dissolution"
**Motivation**: Very high — needs to transact regardless of terms
**Leverage**: Speed and certainty of close
**Approach**: Compassionate but business-focused, emphasize quick close

### Estate/Trust
**Signals**: "estate", "trust", "heirs", "executor", "probate"
**Motivation**: High — beneficiaries want cash, not management responsibility
**Leverage**: Simplicity, no management burden, steady distributions
**Approach**: Professional, deal with executor/attorney, structured terms

### Tired Landlord
**Signals**: High DOM, deferred maintenance, below-market rents, vacancy issues
**Motivation**: Medium-High — burned out on management
**Leverage**: "I'll take the headache off your hands"
**Approach**: Sympathetic, focus on relief from management burden

### Investor Rebalancing
**Signals**: Portfolio sale, 1031 exchange mention, upgrading/downsizing
**Motivation**: Medium — strategic, not desperate
**Leverage**: Clean transaction, no contingencies
**Approach**: Professional, numbers-driven, competitive terms

### Bank/Institutional
**Signals**: "REO", "bank owned", "lender", "FDIC"
**Motivation**: Medium — wants off balance sheet but has time
**Leverage**: Bulk purchase, quick close, no contingencies
**Approach**: Formal, through proper channels, competitive bidding

## Motivation Scoring (1-10)

| Score | Meaning | Action |
|-------|---------|--------|
| 9-10 | Desperate | Move fast, favorable terms possible |
| 7-8 | Highly motivated | Good negotiating position |
| 5-6 | Moderate motivation | Standard negotiation |
| 3-4 | Low motivation | May need to sweeten offer |
| 1-2 | Not motivated | Likely waste of time unless terms are perfect |

## Factors That Increase Motivation Score

- Each 30 days DOM over 90: +1
- Each price reduction: +1
- "Must sell" or "motivated" language: +2
- Estate/retirement: +2
- Owner financing already offered: +1
- Property vacant or declining occupancy: +1
- Recent tax or regulatory issues: +1

## Output

Seller profile added to listing data:

```json
{
  "sellerProfile": {
    "type": "retiring",
    "motivationScore": 8,
    "estimatedOwnershipYears": 20,
    "leveragePoints": [
      "Tax benefits of installment sale",
      "No 1031 exchange needed",
      "Steady retirement income from note"
    ],
    "risks": [
      "May have emotional attachment to property",
      "Could have unrealistic price expectations"
    ],
    "recommendedApproach": "Empathetic, respectful of legacy, lead with tax benefits",
    "keyTalkingPoints": [
      "Acknowledge 20 years of work",
      "IRC 453 installment sale benefits",
      "Monthly passive income in retirement"
    ]
  }
}
```
