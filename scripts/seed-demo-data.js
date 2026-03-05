#!/usr/bin/env node
/**
 * Seeds demo data into data/ directories so the dashboard
 * looks populated on first load. Run once, then delete or ignore.
 *
 * Usage: node scripts/seed-demo-data.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeJson(filePath, data) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// --- SCORED LISTINGS (the main leads) ---
const scored = [
  {
    id: "crexi-8842901",
    name: "Shady Oaks Mobile Home Park",
    address: "4520 FM 1960 W",
    city: "Houston",
    state: "TX",
    propertyType: "Mobile Home Park",
    subtype: "Mobile Home Park",
    askingPrice: 1850000,
    capRate: 9.2,
    daysOnMarket: 187,
    ownerFinancing: true,
    dealScore: { total: 82, tier: "hot", sellerMotivation: 26, economics: 24, financing: 18, propertyQuality: 14 },
    score: 82,
    tier: "hot",
    broker: { name: "Jim Walsh", phone: "(713) 555-4201", email: "jwalsh@cre-southwest.com" },
    scrapedAt: "2026-03-02T14:22:00Z",
    outreachStatus: "pending"
  },
  {
    id: "crexi-7723104",
    name: "Sunrise Car Wash & Detail Center",
    address: "901 N Main St",
    city: "Springfield",
    state: "MO",
    propertyType: "Car Wash",
    subtype: "Full Service Car Wash",
    askingPrice: 975000,
    capRate: 10.5,
    daysOnMarket: 243,
    ownerFinancing: true,
    dealScore: { total: 78, tier: "hot", sellerMotivation: 28, economics: 22, financing: 16, propertyQuality: 12 },
    score: 78,
    tier: "hot",
    broker: { name: "Lisa Chen", phone: "(417) 555-8833", email: "lchen@ozarkcommercial.com" },
    scrapedAt: "2026-03-01T09:15:00Z",
    outreachStatus: "contacted"
  },
  {
    id: "crexi-9012445",
    name: "QuikStop Gas & Convenience",
    address: "2200 Highway 71 S",
    city: "Fort Smith",
    state: "AR",
    propertyType: "Gas Station",
    subtype: "Gas Station with C-Store",
    askingPrice: 1200000,
    capRate: 8.8,
    daysOnMarket: 312,
    ownerFinancing: true,
    dealScore: { total: 85, tier: "hot", sellerMotivation: 30, economics: 25, financing: 17, propertyQuality: 13 },
    score: 85,
    tier: "hot",
    broker: { name: "Tom Rodriguez", phone: "(479) 555-1102", email: "trod@arkcre.com" },
    scrapedAt: "2026-03-02T11:30:00Z",
    outreachStatus: "none"
  },
  {
    id: "crexi-6634201",
    name: "Pinecrest Self Storage",
    address: "780 Industrial Blvd",
    city: "Tulsa",
    state: "OK",
    propertyType: "Self Storage",
    subtype: "Self Storage Facility",
    askingPrice: 2400000,
    capRate: 7.6,
    daysOnMarket: 156,
    ownerFinancing: false,
    dealScore: { total: 62, tier: "warm", sellerMotivation: 18, economics: 20, financing: 10, propertyQuality: 14 },
    score: 62,
    tier: "warm",
    broker: { name: "Sarah Mitchell", phone: "(918) 555-7744", email: "smitchell@tulsacre.com" },
    scrapedAt: "2026-03-01T16:45:00Z",
    outreachStatus: "none"
  },
  {
    id: "crexi-5521089",
    name: "Valley View Apartments — 24 Units",
    address: "1550 Valley View Dr",
    city: "Little Rock",
    state: "AR",
    propertyType: "Multifamily",
    subtype: "Garden Apartments",
    askingPrice: 3200000,
    capRate: 6.9,
    daysOnMarket: 198,
    ownerFinancing: true,
    dealScore: { total: 71, tier: "hot", sellerMotivation: 22, economics: 21, financing: 15, propertyQuality: 13 },
    score: 71,
    tier: "hot",
    broker: { name: "David Park", phone: "(501) 555-9921", email: "dpark@lrcre.com" },
    scrapedAt: "2026-03-02T08:20:00Z",
    outreachStatus: "none"
  },
  {
    id: "crexi-4410776",
    name: "Roadrunner RV & Mobile Home Park",
    address: "3200 E Reno Ave",
    city: "Oklahoma City",
    state: "OK",
    propertyType: "Mobile Home Park",
    subtype: "RV / Mobile Home Park",
    askingPrice: 890000,
    capRate: 11.2,
    daysOnMarket: 267,
    ownerFinancing: true,
    dealScore: { total: 88, tier: "hot", sellerMotivation: 29, economics: 27, financing: 18, propertyQuality: 14 },
    score: 88,
    tier: "hot",
    broker: { name: "Karen White", phone: "(405) 555-3310", email: "kwhite@okccommercial.com" },
    scrapedAt: "2026-03-01T12:10:00Z",
    outreachStatus: "pending"
  },
  {
    id: "crexi-3309551",
    name: "Lakeshore Laundromat",
    address: "445 Lake Shore Dr",
    city: "Memphis",
    state: "TN",
    propertyType: "Special Purpose",
    subtype: "Laundromat",
    askingPrice: 420000,
    capRate: 14.1,
    daysOnMarket: 189,
    ownerFinancing: false,
    dealScore: { total: 55, tier: "warm", sellerMotivation: 16, economics: 19, financing: 8, propertyQuality: 12 },
    score: 55,
    tier: "warm",
    broker: { name: "Mike Johnson", phone: "(901) 555-6688", email: "mjohnson@memphiscre.com" },
    scrapedAt: "2026-03-02T15:50:00Z",
    outreachStatus: "none"
  },
  {
    id: "crexi-2208334",
    name: "Interstate Truck Wash",
    address: "8900 I-30 Frontage Rd",
    city: "Dallas",
    state: "TX",
    propertyType: "Car Wash",
    subtype: "Truck Wash",
    askingPrice: 1650000,
    capRate: 7.2,
    daysOnMarket: 134,
    ownerFinancing: false,
    dealScore: { total: 42, tier: "cold", sellerMotivation: 10, economics: 16, financing: 6, propertyQuality: 10 },
    score: 42,
    tier: "cold",
    broker: { name: "Ray Adams", phone: "(214) 555-2277", email: "radams@dallascre.com" },
    scrapedAt: "2026-03-01T10:30:00Z",
    outreachStatus: "none"
  }
];

writeJson(path.join(DATA, 'scored', 'batch-2026-03-02.json'), { listings: scored });

// --- RAW LISTINGS (more than scored — shows scrape > score funnel) ---
const rawExtra = [
  { id: "crexi-1100001", name: "Corner Gas Station", city: "Waco", state: "TX", propertyType: "Gas Station", askingPrice: 550000, daysOnMarket: 45 },
  { id: "crexi-1100002", name: "Downtown Office Building", city: "Austin", state: "TX", propertyType: "Office", askingPrice: 4200000, daysOnMarket: 30 },
  { id: "crexi-1100003", name: "Retail Strip Center", city: "Norman", state: "OK", propertyType: "Retail", askingPrice: 2100000, daysOnMarket: 88 },
  { id: "crexi-1100004", name: "Mini Storage Units", city: "Branson", state: "MO", propertyType: "Self Storage", askingPrice: 780000, daysOnMarket: 210 },
  { id: "crexi-1100005", name: "Family Car Wash", city: "Joplin", state: "MO", propertyType: "Car Wash", askingPrice: 350000, daysOnMarket: 170 }
];

writeJson(path.join(DATA, 'raw', 'batch-2026-03-01.json'), { listings: [...scored, ...rawExtra] });

// --- PROCESSED (enriched) ---
writeJson(path.join(DATA, 'processed', 'batch-2026-03-02.json'), { listings: scored });

// --- OUTREACH ---
const outreach = [
  {
    leadId: "crexi-9012445",
    propertyName: "QuikStop Gas & Convenience",
    brokerName: "Tom Rodriguez",
    brokerPhone: "(479) 555-1102",
    brokerEmail: "trod@arkcre.com",
    method: "email",
    status: "pending",
    generatedAt: "2026-03-03T10:00:00Z",
    scriptType: "owner-finance"
  },
  {
    leadId: "crexi-4410776",
    propertyName: "Roadrunner RV & Mobile Home Park",
    brokerName: "Karen White",
    brokerPhone: "(405) 555-3310",
    brokerEmail: "kwhite@okccommercial.com",
    method: "phone",
    status: "pending",
    generatedAt: "2026-03-03T10:05:00Z",
    scriptType: "retiring-owner"
  },
  {
    leadId: "crexi-7723104",
    propertyName: "Sunrise Car Wash & Detail Center",
    brokerName: "Lisa Chen",
    brokerPhone: "(417) 555-8833",
    brokerEmail: "lchen@ozarkcommercial.com",
    method: "email",
    status: "sent",
    generatedAt: "2026-03-02T16:00:00Z",
    sentAt: "2026-03-02T16:15:00Z",
    scriptType: "owner-finance"
  }
];

writeJson(path.join(DATA, 'outreach', 'batch-2026-03-03.json'), { items: outreach });

// --- ACTIVITY LOG ---
const activities = [
  { timestamp: "2026-03-01T09:00:00Z", agent: "lead-researcher", stage: "", event: "started", message: "Lead researcher initialized pipeline run" },
  { timestamp: "2026-03-01T09:02:00Z", agent: "data-collector", stage: "scrape", event: "started", message: "Scraping CREXI for owner-financed listings" },
  { timestamp: "2026-03-01T09:15:00Z", agent: "data-collector", stage: "scrape", event: "completed", message: "Scraped 13 listings across TX, OK, AR, MO" },
  { timestamp: "2026-03-01T09:20:00Z", agent: "market-analyst", stage: "analyze", event: "started", message: "Enriching listings with market data" },
  { timestamp: "2026-03-01T09:35:00Z", agent: "market-analyst", stage: "analyze", event: "completed", message: "Analyzed 8 qualified listings — avg cap rate 9.4%" },
  { timestamp: "2026-03-02T08:00:00Z", agent: "deal-scout", stage: "score", event: "started", message: "Scoring deals on 100-point rubric" },
  { timestamp: "2026-03-02T08:22:00Z", agent: "deal-scout", stage: "score", event: "completed", message: "Scored 8 deals — 5 hot, 2 warm, 1 cold" },
  { timestamp: "2026-03-02T16:00:00Z", agent: "outreach-specialist", stage: "outreach", event: "started", message: "Generating outreach scripts for hot leads" },
  { timestamp: "2026-03-02T16:15:00Z", agent: "outreach-specialist", stage: "outreach", event: "completed", message: "Generated 3 outreach scripts — 2 email, 1 phone" },
  { timestamp: "2026-03-03T10:00:00Z", agent: "system", stage: "", event: "info", message: "Dashboard initialized — pipeline monitoring active" }
];

ensureDir(path.join(DATA, 'logs'));
const logLines = activities.map(a => JSON.stringify(a)).join('\n') + '\n';
fs.writeFileSync(path.join(DATA, 'logs', 'agent-activity.jsonl'), logLines);

// --- WATCHLIST ---
const watchlist = {
  watches: [
    { type: "Mobile Home Park", states: ["TX", "OK"], maxPrice: 2000000, addedAt: "2026-03-01T09:00:00Z" },
    { type: "Gas Station", states: ["AR", "MO"], maxPrice: 1500000, addedAt: "2026-03-01T09:00:00Z" },
    { type: "Car Wash", states: ["TX", "MO", "OK"], maxPrice: 1200000, addedAt: "2026-03-02T12:00:00Z" }
  ],
  createdAt: "2026-03-01T09:00:00Z",
  lastUpdated: "2026-03-02T12:00:00Z"
};

writeJson(path.join(DATA, 'watchlist.json'), watchlist);

console.log('Demo data seeded successfully.');
console.log('Run "node scripts/update-dashboard.js" to rebuild dashboard state.');
