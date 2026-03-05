---
name: outreach-composer
description: >
  Generate personalized outreach scripts for contacting CREXI property
  sellers and brokers about owner-financed acquisitions. Use when you have
  scored deals and need compelling phone scripts, email drafts, and
  follow-up plans.
allowed-tools: Read, Write, Glob, Grep
---

# Outreach Composer

Creates personalized seller/broker contact scripts for CRE deals.

## Quick Start

1. Read scored opportunities from `data/processed/`
2. Profile each seller type from listing context
3. Select appropriate script template
4. Personalize with property-specific details
5. Generate phone script, email draft, and follow-up plan
6. Save to `data/exports/YYYY-MM-DD_outreach.json`

## Seller Type Classification

| Type | Signals | Best Approach |
|------|---------|---------------|
| Retiring | "Retiring", long ownership, self-managed | Empathy + tax benefits |
| Motivated | High DOM, price cuts, "must sell" | Speed + certainty |
| Estate | "Estate sale", "heirs", "trust" | Simplicity + steady income |
| Investor | Portfolio sale, multiple properties | Business terms + volume |
| Distressed | Pre-foreclosure, "bank owned" | Cash flow relief + quick close |

## Core Message Framework

### Opening (10 seconds)

"Hi [Broker/Seller name], I'm calling about [Property Name] on
[Street]. I've been following this listing and I'm interested in
making an offer."

### Value Proposition (30 seconds)

"I'd like to propose an owner-financed purchase at your asking
price of [Price]. This gives you [benefit based on seller type]:
- Retirees: steady monthly income without the hassle of managing
- Motivated: a definite close without waiting for bank financing
- Estate: predictable payments to the estate/heirs"

### The Ask

"Would you be open to discussing seller financing terms? I'm
thinking [down payment]% down with monthly payments over [term]
years at [rate]%."

### Close

"What would be the best time this week to discuss the details?"

## Email Template Structure

```
Subject: Offer on [Property Name] — Owner Financing

[Broker/Seller Name],

I'm writing about [Property Name] at [Address], listed at [Price].

I'm an active buyer looking for [property type] investments and
your property matches what I'm looking for. I'd like to propose
an owner-financed purchase at your asking price.

[Personalized paragraph based on seller type]

I can be flexible on terms and would love to discuss what works
for both of us. Are you available for a quick call this week?

Best regards,
[Name]
[Phone]
```

## Follow-Up Schedule

| Day | Action |
|-----|--------|
| Day 0 | Initial call + voicemail if no answer |
| Day 1 | Send email |
| Day 3 | Second call attempt |
| Day 5 | Follow-up email with market comp |
| Day 7 | Final call attempt |
| Day 14 | "Checking in" email |
| Day 30 | "Still interested" touchpoint |

## Objection Handling Reference

See `references/objection-handling.md`
