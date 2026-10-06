// Re-check the city → ShowingNew market map against the live site.
// Usage: node --experimental-strip-types scripts/probe-showingnew.mjs
// Prints cities with communities, and any city ShowingNew files under a different market
// (add those to MARKET_OVERRIDES in lib/newHomeSearch.ts).
import { __cityEntries, SHOWINGNEW_BASE } from "../lib/newHomeSearch.ts";

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/128 Safari/537.36";
const MARKETS = ["orange-county", "los-angeles", "riverside-san-bernardino", "san-diego"];

async function count(market, slug) {
  try {
    const r = await fetch(`${SHOWINGNEW_BASE}/communities/california/${market}/city-${slug}`, { headers: { "User-Agent": UA } });
    if (!r.ok) return null;
    const m = (await r.text()).match(/(\d[\d,]*)\s+[Cc]ommunit/);
    return m ? Number(m[1].replace(/,/g, "")) : null;
  } catch {
    return null;
  }
}

const entries = __cityEntries();
const results = [];
let i = 0;
async function worker() {
  while (i < entries.length) {
    const e = entries[i++];
    const own = await count(e.market, e.slug);
    const row = { name: e.name, county: e.county, market: e.market, own, alt: {} };
    if (!own) for (const m of MARKETS) if (m !== e.market) { const c = await count(m, e.slug); if (c) row.alt[m] = c; }
    results.push(row);
  }
}
await Promise.all(Array.from({ length: 8 }, worker));
results.sort((a, b) => a.county.localeCompare(b.county) || a.name.localeCompare(b.name));
const withHomes = results.filter((r) => r.own > 0);
console.log(`total ${results.length} | with communities ${withHomes.length} | zero ${results.filter((r) => r.own === 0).length} | unparsed ${results.filter((r) => r.own === null).length}`);
console.log("With communities:", withHomes.map((r) => `${r.name} (${r.own})`).join(", "));
const moved = results.filter((r) => Object.keys(r.alt).length);
console.log(moved.length ? `Filed under another market: ${JSON.stringify(moved.map((r) => [r.name, r.market, r.alt]))}` : "No market mismatches.");
