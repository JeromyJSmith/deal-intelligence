# Deal Intelligence Scoring Rubric v2

## Total Score: 0–100 base + bonuses

---

## Category 1: Seller Motivation (25 pts)

| Signal | Points |
|--------|--------|
| DOM > 180 days | 12 |
| DOM 120–180 days | 8 |
| DOM 90–120 days | 4 |
| Price reduced 2+ times | 6 |
| Price reduced 1 time | 3 |
| "Must sell / motivated seller" language | 4 |
| Estate / probate / divorce | 5 |
| Owner retiring or health-related | 5 |
| Portfolio liquidation language | 3 |

Max: 25 (cap, don't stack to more)

---

## Category 2: Deal Economics (20 pts)

| Signal | Points |
|--------|--------|
| Price > 25% below market comps | 10 |
| Price 10–25% below market comps | 6 |
| Cap rate > 10% | 8 |
| Cap rate 8–10% | 5 |
| Cap rate 6–8% | 2 |
| NOI verified (not pro forma) | 4 |
| DSCR > 1.25 at proposed terms | 4 |
| Auction discount > 30% est. value | 10 |
| Business price < 2x annual NOI | 8 |

Max: 20 (cap)

---

## Category 3: Financing Terms (15 pts)

| Signal | Points |
|--------|--------|
| Owner financing explicitly offered | 10 |
| Language suggests openness to financing | 5 |
| Low down payment mentioned | 3 |
| Flexible terms / negotiate | 3 |
| Auction (forced sale = implicit leverage) | 5 |

Max: 15 (cap)

---

## Category 4: Regional Intelligence (20 pts)

| Signal | Points |
|--------|--------|
| Population growing in zip/county | 5 |
| Job growth / new employer announced | 5 |
| Infrastructure investment nearby | 4 |
| Below-state-average pricing vs trajectory | 4 |
| Tourism or remote-work inflow trend | 3 |
| School quality improving | 2 |
| Permit activity increasing | 3 |
| Area underpriced vs comparable metros | 4 |

Max: 20 (cap)

---

## Category 5: Prediction Market Signal (10 pts)

| Signal | Points |
|--------|--------|
| Recession odds > 40% (sellers more motivated) | 4 |
| Rate cut probability > 60% (act before buyers come back) | 3 |
| Regional housing index trending up > 70% prob | 3 |
| Regional housing down > 60% prob (discount window) | 4 |
| Rate hike probable (lock in seller finance now) | 3 |

Max: 10 (cap)

---

## Category 6: Asset Quality (10 pts)

| Signal | Points |
|--------|--------|
| Cash flow positive from day one | 5 |
| Essential service (housing, storage, fuel, food) | 3 |
| Operating business with revenue | 4 |
| Value-add potential visible | 3 |
| Scalable (multi-unit, multi-site) | 3 |
| Clean title / no known litigation | 2 |

Max: 10 (cap)

---

## Bonus Multipliers (stack on top of base)

| Bonus | Points |
|-------|--------|
| Hidden gem detected (see criteria below) | +15 |
| Auction deal (time pressure = leverage) | +10 |
| Owner finance explicitly offered | +10 |
| Deal in NCA or CO priority zone | +5 |
| Multiple distress signals present (3+) | +8 |

---

## Hidden Gem Detection Criteria

A deal is flagged as a hidden gem if ANY 2 of these are true:

1. Base deal score < 50 BUT regional score ≥ 70
2. Auction / distress price gap vs comps > 30%
3. DOM > 180 + positive prediction market trajectory
4. Business asking price < 2× verified annual NOI
5. Price cut > 20% + area job growth confirmed
6. Asset looks bad on surface but area fundamentals are strong

When flagged: `isHiddenGem: true`, +15 bonus, flag for immediate deeper research

---

## Tier Classification

| Tier | Total Score | Action |
|------|------------|--------|
| 🔥 HOT | ≥ 75 | Call today. Pre-write LOI. Highest priority. |
| ✅ WARM | 55–74 | Deep research. Prepare offer structure. |
| 👁 WATCH | 35–54 | Monitor. May ripen with time or new info. |
| ❌ PASS | < 35 | Archive. Not worth time now. |
