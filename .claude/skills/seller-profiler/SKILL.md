---
name: seller-profiler
description: Profiles motivated sellers to determine pain points, urgency level, and optimal negotiation approach. Identifies seller type from listing language — retiree, estate/probate, tired landlord, distressed, institutional — across any asset class. Use when user says "profile this seller", "analyze seller motivation", "who is the seller", "how motivated are they", "what is the seller situation", "how should I approach this deal", "what is driving this listing", or "rate seller motivation".
allowed-tools: Read, Write, Glob, Grep, WebSearch
metadata:
  author: Deal Intelligence
  version: 2.0.0
  category: workflow-automation
  tags: [seller-profiling, motivation, negotiation, behavioral-psychology]
---

# Seller Profiler

Analyzes listing data to profile seller motivation, urgency, and optimal approach strategy.
Works for any asset class — real estate, businesses, land, notes.

## Instructions

### Step 1: Load Listing Data

Read from `data/processed/` or accept URL/description from user.

Extract: listing description, DOM, price history, broker vs. FSBO, asset type, condition language.

### Step 2: Identify Seller Type

Match signal patterns to type:

**Type A: Retiree / Exiting Owner**
- Signals: "retiring", "after X years", "ready for next chapter", "owner operated"
- Pain: Tax hit from lump sum. Wants income continuity, not event.
- Angle: "You become the bank — monthly checks, no tax event."

**Type B: Estate / Probate**
- Signals: "estate sale", "trust", "heirs", "court approval"
- Pain: Multiple decision-makers. Want fast, clean exit.
- Angle: "Simplest possible close. Full price. No bank delays."

**Type C: Tired Landlord / Operator**
- Signals: Long DOM (180+), deferred maintenance, "as-is", multiple price cuts
- Pain: Done managing. Wants relief above maximum price.
- Angle: "You walk away clean. We take over everything."

**Type D: Distressed / Forced**
- Signals: "must sell", "motivated", pre-foreclosure, tax default, divorce
- Pain: Needs to transact on timeline. Stuck.
- Angle: "I don't need a bank. We close on your timeline."

**Type E: Institutional / Corporate**
- Signals: Professional language, LLC/corp seller, broker-only, portfolio sale
- Pain: Fiduciary duty. Needs clean, defensible transaction.
- Angle: Full-price offer, no contingencies, minimize their liability.

**Type F: Investor Exit**
- Signals: "portfolio sale", "1031 exchange", multiple properties together
- Pain: Tax strategy driven. Timeline matters.
- Angle: Match their exchange timeline, clean terms.

### Step 3: Score Motivation Level (1-10)

Start at 1. Add points:
- Each 30 days DOM over 90: +1 (max +4)
- Each price reduction: +1 (max +3)
- "Must sell" or "motivated" language: +2
- Estate/retirement signals: +2
- Owner financing already offered: +1
- Vacancy or declining occupancy: +1

Rate urgency: 1-4 = LOW | 5-6 = MEDIUM | 7-8 = HIGH | 9-10 = EXTREME

### Step 4: Recommend Deal Structure

- Type A (Retiree): Owner finance. Monthly income. Low down. IRC 453 installment sale.
- Type B (Estate): Cash or simple seller carry. Speed over terms.
- Type C (Tired): Fast close. As-is. Seller carry to reduce friction.
- Type D (Distressed): Solve their specific timeline problem. Maximum flexibility.
- Type E (Institutional): Full price. Clean terms. No contingencies.
- Type F (Investor): Match 1031 timeline. Clean close.

### Step 5: Output Seller Profile

```json
{
  "sellerType": "Type A — Retiree",
  "motivationScore": 8,
  "urgency": "HIGH",
  "primaryPain": "one sentence — what drives this sale",
  "recommendedAngle": "one sentence — how to frame the offer",
  "dealStructureFit": "owner finance / auction / cash / creative",
  "openingLine": "first thing to say — leads with their pain",
  "keyTalkingPoints": [],
  "avoid": "what NOT to say to this seller type",
  "leveragePoints": []
}
```

Save profile to deal record and to `data/processed/profiles/[deal-id].json`.

## Examples

### Example 1: Profile from URL
User: "profile this seller [URL]"
Actions: Fetch listing → analyze signals → classify → score → output profile
Result: Full seller profile with opening line and structure recommendation

### Example 2: Profile top deals
User: "profile all HOT deals"
Actions: Load HOT tier from data/processed/ → profile each → save profiles
Result: Profile file per HOT deal

### Example 3: Quick motivation check
User: "how motivated is the seller on the Nevada City property"
Actions: Find matching deal → score motivation → return score + urgency rating
Result: "Motivation: 8/10 — HIGH. Estate sale, 220 DOM, 2 price cuts."

## Error Handling

- No description available: Use DOM + price history only — note "limited data, estimate only"
- Broker-only listing: Profile broker type + flag "seller profile requires direct contact"
- Auction listing: Generate "auction bidder strategy" instead of seller profile

## References

- `references/seller-types.md` — Full signal library per seller type
- `references/deal-structures.md` — Structure recommendation per seller type
- `references/behavioral-science.md` — Psychology behind each type
