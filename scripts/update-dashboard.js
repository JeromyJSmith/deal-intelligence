#!/usr/bin/env node
/**
 * Dashboard State Updater
 *
 * Reads all pipeline data files (raw, processed, scored, outreach)
 * and aggregates them into dashboard/data/state.json for the frontend.
 *
 * Called by hooks after agent runs, or manually via:
 *   node scripts/update-dashboard.js [--stage scrape|analyze|score|outreach]
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data');
const STATE_FILE = path.join(ROOT, 'dashboard', 'data', 'state.json');
const ACTIVITY_LOG = path.join(DATA_DIR, 'logs', 'agent-activity.jsonl');
const WATCHLIST_FILE = path.join(DATA_DIR, 'watchlist.json');

// Parse CLI args
const args = process.argv.slice(2);
const stageFlag = args.indexOf('--stage');
const triggeredStage = stageFlag !== -1 ? args[stageFlag + 1] : null;
const agentFlag = args.indexOf('--agent');
const triggeredAgent = agentFlag !== -1 ? args[agentFlag + 1] : null;

function readJsonSafe(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

function readJsonlSafe(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8').trim();
    if (!content) return [];
    return content.split('\n').map(line => {
      try { return JSON.parse(line); } catch { return null; }
    }).filter(Boolean);
  } catch {
    return [];
  }
}

function readAllJsonInDir(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) return [];
    return fs.readdirSync(dirPath)
      .filter(f => f.endsWith('.json'))
      .map(f => readJsonSafe(path.join(dirPath, f)))
      .filter(Boolean);
  } catch {
    return [];
  }
}

function buildState() {
  // Load existing state for incremental updates
  const existing = readJsonSafe(STATE_FILE) || {};
  const now = new Date().toISOString();

  // Read all pipeline data
  const rawListings = readAllJsonInDir(path.join(DATA_DIR, 'raw'));
  const processedListings = readAllJsonInDir(path.join(DATA_DIR, 'processed'));
  const scoredListings = readAllJsonInDir(path.join(DATA_DIR, 'scored'));
  const outreachItems = readAllJsonInDir(path.join(DATA_DIR, 'outreach'));
  const contacts = readAllJsonInDir(path.join(DATA_DIR, 'contacts'));

  // Read activity log
  const activityEntries = readJsonlSafe(ACTIVITY_LOG);

  // Read watchlist
  const watchlistData = readJsonSafe(WATCHLIST_FILE);
  const watchlist = watchlistData?.watches || [];

  // Count leads by tier from scored data
  let hotLeads = 0, warmLeads = 0, coldLeads = 0;
  const allScored = [];

  scoredListings.forEach(item => {
    // Handle both single-item and batch formats
    const listings = Array.isArray(item) ? item : (item.listings || [item]);
    listings.forEach(listing => {
      if (!listing.dealScore && !listing.score) return;
      const score = listing.dealScore?.total || listing.score || 0;
      const tier = listing.dealScore?.tier || listing.tier ||
        (score >= 70 ? 'hot' : score >= 50 ? 'warm' : 'cold');

      if (tier === 'hot') hotLeads++;
      else if (tier === 'warm') warmLeads++;
      else coldLeads++;

      allScored.push({
        id: listing.id || listing.listingId || `listing-${allScored.length}`,
        name: listing.name || listing.propertyName || 'Unknown',
        address: listing.address || listing.location?.address || '',
        city: listing.city || listing.location?.city || '',
        state: listing.state || listing.location?.state || '',
        propertyType: listing.propertyType || listing.type || '',
        subtype: listing.subtype || '',
        askingPrice: listing.askingPrice || listing.price || 0,
        capRate: listing.capRate || listing.economics?.capRate || 0,
        daysOnMarket: listing.daysOnMarket || listing.dom || 0,
        score: score,
        tier: tier,
        sellerMotivation: listing.dealScore?.sellerMotivation || listing.motivation || 0,
        ownerFinancing: listing.ownerFinancing || listing.financing?.ownerFinance || false,
        source: listing.source || 'crexi',
        scrapedAt: listing.scrapedAt || listing.timestamp || now,
        outreachStatus: listing.outreachStatus || 'none'
      });
    });
  });

  // Also pull leads from processed listings that haven't been scored yet
  processedListings.forEach(item => {
    const listings = Array.isArray(item) ? item : (item.listings || [item]);
    listings.forEach(listing => {
      const id = listing.id || listing.listingId;
      if (id && !allScored.find(s => s.id === id)) {
        allScored.push({
          id: id,
          name: listing.name || listing.propertyName || 'Unknown',
          address: listing.address || '',
          city: listing.city || '',
          state: listing.state || '',
          propertyType: listing.propertyType || '',
          askingPrice: listing.askingPrice || listing.price || 0,
          capRate: listing.capRate || 0,
          daysOnMarket: listing.daysOnMarket || 0,
          score: 0,
          tier: 'unscored',
          ownerFinancing: listing.ownerFinancing || false,
          source: 'crexi',
          scrapedAt: listing.scrapedAt || now,
          outreachStatus: 'none'
        });
      }
    });
  });

  // Compute metrics
  const totalScored = allScored.filter(l => l.score > 0);
  const avgDealScore = totalScored.length > 0
    ? Math.round(totalScored.reduce((sum, l) => sum + l.score, 0) / totalScored.length)
    : 0;
  const withCapRate = allScored.filter(l => l.capRate > 0);
  const avgCapRate = withCapRate.length > 0
    ? +(withCapRate.reduce((sum, l) => sum + l.capRate, 0) / withCapRate.length).toFixed(2)
    : 0;

  // Top property types
  const typeCounts = {};
  allScored.forEach(l => {
    if (l.propertyType) typeCounts[l.propertyType] = (typeCounts[l.propertyType] || 0) + 1;
  });

  // Top states
  const stateCounts = {};
  allScored.forEach(l => {
    if (l.state) stateCounts[l.state] = (stateCounts[l.state] || 0) + 1;
  });

  // Pipeline stage stats from activity log
  const pipeline = existing.pipeline || {
    totalRuns: 0, lastRunAt: null,
    stages: {
      scrape: { runs: 0, lastRunAt: null, status: 'idle' },
      analyze: { runs: 0, lastRunAt: null, status: 'idle' },
      score: { runs: 0, lastRunAt: null, status: 'idle' },
      outreach: { runs: 0, lastRunAt: null, status: 'idle' }
    }
  };

  // Update pipeline from activity log
  activityEntries.forEach(entry => {
    if (entry.stage && pipeline.stages[entry.stage]) {
      pipeline.stages[entry.stage].runs = (pipeline.stages[entry.stage].runs || 0) +
        (entry.event === 'completed' ? 1 : 0);
      pipeline.stages[entry.stage].lastRunAt = entry.timestamp;
      pipeline.stages[entry.stage].status = entry.event === 'started' ? 'running' : 'idle';
      pipeline.stages[entry.stage].lastResult = entry.result || null;
    }
  });

  // If a stage was just triggered, mark it
  if (triggeredStage && pipeline.stages[triggeredStage]) {
    pipeline.stages[triggeredStage].runs++;
    pipeline.stages[triggeredStage].lastRunAt = now;
    pipeline.stages[triggeredStage].status = 'idle';
    pipeline.totalRuns++;
    pipeline.lastRunAt = now;
  }

  // Agent stats
  const agents = {
    'lead-researcher': { tasksCompleted: 0, lastActive: null, status: 'idle' },
    'data-collector': { tasksCompleted: 0, lastActive: null, status: 'idle' },
    'market-analyst': { tasksCompleted: 0, lastActive: null, status: 'idle' },
    'deal-scout': { tasksCompleted: 0, lastActive: null, status: 'idle' },
    'outreach-specialist': { tasksCompleted: 0, lastActive: null, status: 'idle' }
  };

  activityEntries.forEach(entry => {
    if (entry.agent && agents[entry.agent]) {
      if (entry.event === 'completed') {
        agents[entry.agent].tasksCompleted++;
      }
      agents[entry.agent].lastActive = entry.timestamp;
      agents[entry.agent].status = entry.event === 'started' ? 'running' : 'idle';
    }
  });

  if (triggeredAgent && agents[triggeredAgent]) {
    agents[triggeredAgent].tasksCompleted++;
    agents[triggeredAgent].lastActive = now;
  }

  // Build activity log for dashboard (last 100 entries)
  const activityLog = activityEntries
    .slice(-100)
    .reverse()
    .map(entry => ({
      timestamp: entry.timestamp,
      agent: entry.agent || 'system',
      stage: entry.stage || null,
      event: entry.event || 'info',
      message: entry.message || `${entry.agent || 'system'} ${entry.event || 'activity'}`,
      result: entry.result || null
    }));

  // Build outreach queue
  const outreachQueue = outreachItems.flatMap(item => {
    const items = Array.isArray(item) ? item : (item.items || [item]);
    return items.map(o => ({
      leadId: o.leadId || o.listingId || '',
      propertyName: o.propertyName || o.name || '',
      brokerName: o.brokerName || o.contact?.name || '',
      brokerPhone: o.brokerPhone || o.contact?.phone || '',
      brokerEmail: o.brokerEmail || o.contact?.email || '',
      method: o.method || 'email',
      status: o.status || 'pending',
      generatedAt: o.generatedAt || o.timestamp || now,
      sentAt: o.sentAt || null,
      scriptType: o.scriptType || o.template || 'owner-finance'
    }));
  });

  // Final state
  const state = {
    project: {
      name: 'CREXI Deal Finder',
      version: '1.0.0',
      startedAt: existing.project?.startedAt || '2026-03-03T00:00:00Z',
      lastUpdated: now
    },
    pipeline,
    agents,
    metrics: {
      totalListingsScraped: rawListings.reduce((sum, batch) => {
        const items = Array.isArray(batch) ? batch : (batch.listings || [batch]);
        return sum + items.length;
      }, 0),
      totalAnalyzed: processedListings.reduce((sum, batch) => {
        const items = Array.isArray(batch) ? batch : (batch.listings || [batch]);
        return sum + items.length;
      }, 0),
      totalScored: totalScored.length,
      hotLeads,
      warmLeads,
      coldLeads,
      outreachGenerated: outreachQueue.length,
      avgDealScore,
      avgCapRate,
      topPropertyTypes: typeCounts,
      topStates: stateCounts
    },
    leads: allScored.sort((a, b) => b.score - a.score),
    outreachQueue,
    activityLog,
    watchlist
  };

  return state;
}

// Run
try {
  const state = buildState();

  // Ensure directory exists
  const stateDir = path.dirname(STATE_FILE);
  if (!fs.existsSync(stateDir)) {
    fs.mkdirSync(stateDir, { recursive: true });
  }

  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));

  const summary = {
    leads: state.leads.length,
    hot: state.metrics.hotLeads,
    warm: state.metrics.warmLeads,
    cold: state.metrics.coldLeads,
    outreach: state.outreachQueue.length,
    activities: state.activityLog.length
  };

  console.log(`Dashboard updated: ${JSON.stringify(summary)}`);
  process.exit(0);
} catch (err) {
  console.error(`Dashboard update failed: ${err.message}`);
  process.exit(1);
}
