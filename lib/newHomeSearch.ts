/**
 * New-home search: every search on the site resolves to Butchi's ShowingNew
 * (NewHomeSource Professional) agent site, carrying the query and filters.
 *
 * ShowingNew URL facts (verified against the live site, Oct 2026):
 *  - Results pages: /butchi/communities/california/{market}/{facet}
 *      facet = county-{slug} | city-{slug} | postalcode-{zip}
 *  - Markets: orange-county, los-angeles, riverside-san-bernardino, san-diego
 *  - A city page only returns results under its correct market; ZIP pages work under any market.
 *  - Query params honored on results pages: pricelow, pricehigh, bedrooms, bathrooms, homestatus=A (move-in ready).
 *  - Free text goes through their own resolver: /butchi/home/redirecttoresultspage?SearchText=…&QuickMoveIn=0|1
 *    (bare ZIPs 404 through that resolver, so ZIPs are linked directly instead).
 *
 * This module is pure (no I/O) so both the /new-homes route and client code can use it.
 */

export const SHOWINGNEW_BASE = "https://www.showingnew.com/butchi";

export type Market = "orange-county" | "los-angeles" | "riverside-san-bernardino" | "san-diego";

export type County = "Orange" | "Los Angeles" | "Riverside" | "San Bernardino" | "San Diego";

export const COUNTY_MARKET: Record<County, Market> = {
  Orange: "orange-county",
  "Los Angeles": "los-angeles",
  Riverside: "riverside-san-bernardino",
  "San Bernardino": "riverside-san-bernardino",
  "San Diego": "san-diego",
};

export const COUNTY_SLUG: Record<County, string> = {
  Orange: "county-orange",
  "Los Angeles": "county-los-angeles",
  Riverside: "county-riverside",
  "San Bernardino": "county-san-bernardino",
  "San Diego": "county-san-diego",
};

/** Direct ShowingNew results URL for a county (no filters). */
export function countyUrl(county: County): string {
  return `${SHOWINGNEW_BASE}/communities/california/${COUNTY_MARKET[county]}/${COUNTY_SLUG[county]}`;
}

/**
 * Southern California cities and unincorporated communities, grouped by county.
 * County decides the ShowingNew market. Keep names as people type them.
 */
const CITIES: Record<County, string[]> = {
  Orange: [
    "Aliso Viejo", "Anaheim", "Brea", "Buena Park", "Costa Mesa", "Coto de Caza", "Cypress", "Dana Point", "Fountain Valley",
    "Fullerton", "Garden Grove", "Huntington Beach", "Irvine", "La Habra", "La Palma", "Ladera Ranch", "Laguna Beach", "Laguna Hills",
    "Laguna Niguel", "Laguna Woods", "Lake Forest", "Los Alamitos", "Mission Viejo", "Newport Beach", "Orange", "Placentia",
    "Rancho Mission Viejo", "Rancho Santa Margarita", "San Clemente", "San Juan Capistrano", "Santa Ana", "Seal Beach", "Stanton",
    "Trabuco Canyon", "Tustin", "Villa Park", "Westminster", "Yorba Linda",
  ],
  "Los Angeles": [
    "Agoura Hills", "Alhambra", "Arcadia", "Artesia", "Azusa", "Baldwin Park", "Bell", "Bell Gardens", "Bellflower", "Beverly Hills",
    "Burbank", "Calabasas", "Carson", "Castaic", "Cerritos", "Claremont", "Commerce", "Compton", "Covina", "Culver City", "Diamond Bar",
    "Downey", "Duarte", "El Monte", "El Segundo", "Gardena", "Glendale", "Glendora", "Hacienda Heights", "Hawthorne", "Hermosa Beach",
    "Huntington Park", "Inglewood", "La Canada Flintridge", "La Mirada", "La Puente", "La Verne", "Lakewood", "Lancaster", "Lawndale",
    "Lomita", "Long Beach", "Los Angeles", "Lynwood", "Malibu", "Manhattan Beach", "Monrovia", "Montebello", "Monterey Park", "Norwalk",
    "Palmdale", "Palos Verdes Estates", "Paramount", "Pasadena", "Pico Rivera", "Pomona", "Rancho Palos Verdes", "Redondo Beach",
    "Rolling Hills Estates", "Rosemead", "Rowland Heights", "San Dimas", "San Gabriel", "Santa Clarita", "Santa Fe Springs",
    "Santa Monica", "Sierra Madre", "Signal Hill", "South Gate", "South Pasadena", "Stevenson Ranch", "Temple City", "Torrance",
    "Walnut", "West Covina", "West Hollywood", "Westlake Village", "Whittier",
  ],
  Riverside: [
    "Banning", "Beaumont", "Bermuda Dunes", "Calimesa", "Canyon Lake", "Cathedral City", "Coachella", "Corona", "Desert Hot Springs",
    "Eastvale", "French Valley", "Hemet", "Indian Wells", "Indio", "Jurupa Valley", "La Quinta", "Lake Elsinore", "Menifee",
    "Moreno Valley", "Murrieta", "Norco", "Palm Desert", "Palm Springs", "Perris", "Rancho Mirage", "Riverside", "San Jacinto",
    "Temecula", "Temescal Valley", "Thermal", "Wildomar", "Winchester",
  ],
  "San Bernardino": [
    "Adelanto", "Apple Valley", "Barstow", "Big Bear Lake", "Bloomington", "Chino", "Chino Hills", "Colton", "Fontana", "Grand Terrace",
    "Hesperia", "Highland", "Lake Arrowhead", "Loma Linda", "Mentone", "Montclair", "Oak Hills", "Ontario", "Phelan", "Rancho Cucamonga",
    "Redlands", "Rialto", "San Bernardino", "Twentynine Palms", "Upland", "Victorville", "Yucaipa", "Yucca Valley",
  ],
  "San Diego": [
    "Alpine", "Bonsall", "Carlsbad", "Chula Vista", "Coronado", "Del Mar", "El Cajon", "Encinitas", "Escondido", "Fallbrook",
    "Imperial Beach", "Jamul", "La Mesa", "Lakeside", "Lemon Grove", "National City", "Oceanside", "Poway", "Ramona",
    "Rancho Santa Fe", "San Diego", "San Marcos", "Santee", "Solana Beach", "Spring Valley", "Valley Center", "Vista",
  ],
};

/**
 * ShowingNew sometimes files a city under a neighbouring market (e.g. Chino Hills
 * lives in riverside-san-bernardino even though the county is San Bernardino, which matches).
 * Overrides found by probing the live site go here: normalized city → market.
 */
const MARKET_OVERRIDES: Record<string, Market> = {};

/** Neighborhoods and nicknames people search for, mapped to the city that holds them. */
const ALIASES: Record<string, string> = {
  "great park": "Irvine",
  "great park neighborhoods": "Irvine",
  "portola springs": "Irvine",
  "woodbridge": "Irvine",
  "northwood": "Irvine",
  "turtle rock": "Irvine",
  "orchard hills": "Irvine",
  "quail hill": "Irvine",
  "cypress village": "Irvine",
  "tustin ranch": "Tustin",
  "tustin legacy": "Tustin",
  "corona del mar": "Newport Beach",
  "newport coast": "Newport Beach",
  "foothill ranch": "Lake Forest",
  "portola hills": "Lake Forest",
  "talega": "San Clemente",
  "esencia": "Rancho Mission Viejo",
  "otay ranch": "Chula Vista",
  "eastlake": "Chula Vista",
  "millenia": "Chula Vista",
  "la jolla": "San Diego",
  "carmel valley": "San Diego",
  "rancho bernardo": "San Diego",
  "4s ranch": "San Diego",
  "del sur": "San Diego",
  "valencia": "Santa Clarita",
  "saugus": "Santa Clarita",
  "canyon country": "Santa Clarita",
  "playa vista": "Los Angeles",
  "porter ranch": "Los Angeles",
  "dtla": "Los Angeles",
  "downtown la": "Los Angeles",
  "spring mountain ranch": "Riverside",
  "the preserve": "Chino",
  "la canada": "La Canada Flintridge",
  "la cañada flintridge": "La Canada Flintridge",
};

/** County names and regional nicknames. Bare "Orange" is the city; "Orange County" / "OC" is the county. */
const REGIONS: Record<string, County | Market | "socal"> = {
  "orange county": "Orange",
  "oc": "Orange",
  "o.c.": "Orange",
  "los angeles county": "Los Angeles",
  "la county": "Los Angeles",
  "l.a. county": "Los Angeles",
  "la": "Los Angeles",
  "l.a.": "Los Angeles",
  "riverside county": "Riverside",
  "san bernardino county": "San Bernardino",
  "sb county": "San Bernardino",
  "san diego county": "San Diego",
  "sd county": "San Diego",
  "inland empire": "riverside-san-bernardino",
  "the inland empire": "riverside-san-bernardino",
  "ie": "riverside-san-bernardino",
  "coachella valley": "Riverside",
  "palm springs area": "Riverside",
  "high desert": "San Bernardino",
  "southern california": "socal",
  "socal": "socal",
  "so cal": "socal",
  "california": "socal",
};

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Lowercase, strip state / country suffixes and punctuation noise. */
export function normalizeQuery(raw: string): string {
  return raw
    .normalize("NFC")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[,\s]+(ca|calif\.?|california)(\s+\d{5}(-\d{4})?)?\.?\s*$/i, (_m, _st, zip) => (zip ? ` ${zip.trim()}` : ""))
    .replace(/[,\s]+(usa|us|united states)\.?\s*$/i, "")
    .replace(/^city of\s+/, "")
    .replace(/[,]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

interface CityEntry {
  name: string;
  county: County;
  market: Market;
}

const CITY_INDEX: Map<string, CityEntry> = (() => {
  const m = new Map<string, CityEntry>();
  (Object.keys(CITIES) as County[]).forEach((county) => {
    for (const name of CITIES[county]) {
      const key = normalizeQuery(name);
      m.set(key, { name, county, market: MARKET_OVERRIDES[key] ?? COUNTY_MARKET[county] });
    }
  });
  return m;
})();

/** Every known place name, for typeahead suggestions. */
export const PLACE_SUGGESTIONS: string[] = [
  "Orange County",
  "Los Angeles County",
  "Riverside County",
  "San Bernardino County",
  "San Diego County",
  "Inland Empire",
  ...Object.values(CITIES).flat().map((c) => `${c}, CA`),
  ...["Great Park", "Portola Springs", "Tustin Ranch", "Otay Ranch", "Valencia", "Rancho Mission Viejo"],
].filter((v, i, a) => a.indexOf(v) === i);

/** West-end San Bernardino / Riverside ZIPs inside the mostly-LA 917xx block. */
const IE_917 = new Set([
  "91701", "91708", "91709", "91710", "91730", "91737", "91739", "91743", "91752", "91758", "91761", "91762", "91763", "91764",
  "91784", "91785", "91786",
]);

/** Best-guess market for a ZIP. ZIP pages load under any market; this only keeps ShowingNew's breadcrumbs sensible. */
function marketForZip(zip: string): Market {
  const p = Number(zip.slice(0, 3));
  if (p === 919 || p === 920 || p === 921) return "san-diego";
  if (p >= 922 && p <= 925) return "riverside-san-bernardino";
  if (p >= 926 && p <= 928) return "orange-county";
  if (IE_917.has(zip)) return "riverside-san-bernardino";
  if (p >= 900 && p <= 918) return "los-angeles";
  return "orange-county";
}

/** Exposed for the city-market probe script (scripts/probe-showingnew.mjs). */
export function __cityEntries(): Array<{ name: string; county: County; market: Market; slug: string }> {
  return [...CITY_INDEX.values()].map((c) => ({ ...c, slug: slugify(c.name) }));
}

export type HomeStatus = "all" | "move-in";

export interface NewHomeFilters {
  priceLow?: number;
  priceHigh?: number;
  beds?: number;
  baths?: number;
  status?: HomeStatus;
}

export type ResolvedKind = "base" | "region" | "county" | "market" | "city" | "zip" | "text";

export interface ResolvedSearch {
  kind: ResolvedKind;
  /** Final ShowingNew URL, filters applied where ShowingNew supports them. */
  url: string;
  /** Human label for what we matched, e.g. "Irvine, CA". */
  label: string;
  /** For city results: the county page to fall back to when the city has no communities. */
  fallbackUrl?: string;
  county?: County;
}

function withFilters(path: string, f: NewHomeFilters): string {
  const p = new URLSearchParams();
  if (f.priceLow && f.priceLow > 0) p.set("pricelow", String(Math.round(f.priceLow)));
  if (f.priceHigh && f.priceHigh > 0) p.set("pricehigh", String(Math.round(f.priceHigh)));
  if (f.beds && f.beds > 0) p.set("bedrooms", String(Math.min(5, Math.floor(f.beds))));
  if (f.baths && f.baths > 0) p.set("bathrooms", String(Math.min(5, Math.floor(f.baths))));
  if (f.status === "move-in") p.set("homestatus", "A");
  const qs = p.toString();
  return `${SHOWINGNEW_BASE}${path}${qs ? `?${qs}` : ""}`;
}

/**
 * Resolve free text + filters to the best ShowingNew destination.
 * Order: empty → ZIP → region/county → alias → city → their own text resolver.
 */
export function resolveNewHomeSearch(rawQuery: string | null | undefined, filters: NewHomeFilters = {}): ResolvedSearch {
  const raw = (rawQuery ?? "").trim().slice(0, 100);
  const q = normalizeQuery(raw);

  if (!q) {
    // No place given: open the SoCal-wide landing page (filters need a location on ShowingNew).
    return { kind: "base", url: SHOWINGNEW_BASE, label: "Southern California" };
  }

  const zip = q.match(/\b(9\d{4})(?:-\d{4})?\b/);
  if (zip && /^\d{5}(-\d{4})?$|^[a-z .'-]*\s\d{5}$/.test(q.replace(/\s+/g, " "))) {
    const z = zip[1];
    return { kind: "zip", url: withFilters(`/communities/california/${marketForZip(z)}/postalcode-${z}`, filters), label: z };
  }

  // Check regions before state-suffix stripping too ("Southern California" would otherwise become "southern").
  const plain = raw.toLowerCase().replace(/\s+/g, " ").replace(/[.,]+$/, "").trim();
  const region = REGIONS[plain] ?? REGIONS[q];
  if (region) {
    if (region === "socal") return { kind: "region", url: SHOWINGNEW_BASE, label: "Southern California" };
    if (region === "riverside-san-bernardino") {
      return { kind: "market", url: withFilters(`/communities/california/${region}`, filters), label: "Inland Empire" };
    }
    const county = region as County;
    return {
      kind: "county",
      url: withFilters(`/communities/california/${COUNTY_MARKET[county]}/${COUNTY_SLUG[county]}`, filters),
      label: `${county} County`,
      county,
    };
  }

  // "Riverside" / "San Bernardino" / "San Diego" / "Los Angeles" alone → treat as the city (most precise),
  // the /new-homes route widens to the county if the city has no communities.
  const cityName = ALIASES[q] ?? q;
  const city = CITY_INDEX.get(normalizeQuery(cityName));
  if (city) {
    return {
      kind: "city",
      url: withFilters(`/communities/california/${city.market}/city-${slugify(city.name)}`, filters),
      label: `${city.name}, CA`,
      fallbackUrl: withFilters(`/communities/california/${COUNTY_MARKET[city.county]}/${COUNTY_SLUG[city.county]}`, filters),
      county: city.county,
    };
  }

  // Unknown text (community name, school district, builder…): hand it to ShowingNew's own resolver.
  const p = new URLSearchParams({ SearchText: raw, QuickMoveIn: filters.status === "move-in" ? "1" : "0" });
  return { kind: "text", url: `${SHOWINGNEW_BASE}/home/redirecttoresultspage?${p.toString()}`, label: raw };
}

/** Parse "$1M – $2M", "Under $1M", "$4M+", "1000000" into a price range. */
export function parsePriceRange(v: string | null | undefined): { priceLow?: number; priceHigh?: number } {
  if (!v || /any/i.test(v)) return {};
  const nums = [...v.matchAll(/\$?\s*([\d.,]+)\s*([km])?/gi)].map((m) => {
    const n = parseFloat(m[1].replace(/,/g, ""));
    const unit = (m[2] ?? "").toLowerCase();
    return unit === "m" ? n * 1e6 : unit === "k" ? n * 1e3 : n;
  });
  if (!nums.length) return {};
  if (/under|below|max|up to/i.test(v)) return { priceHigh: nums[0] };
  if (/\+|over|above|min/i.test(v) && nums.length === 1) return { priceLow: nums[0] };
  if (nums.length >= 2) return { priceLow: nums[0], priceHigh: nums[1] };
  return { priceLow: nums[0] };
}

/** Parse "3+", "Beds: 3+", "4" → 3 / 4. */
export function parseMin(v: string | null | undefined): number | undefined {
  if (!v) return undefined;
  const m = v.match(/(\d+)/);
  return m ? Number(m[1]) : undefined;
}

/** Build the on-site redirect URL (/new-homes?…) that forms and links use. */
export function newHomesHref(q?: string, extra: Record<string, string | undefined> = {}): string {
  const p = new URLSearchParams();
  if (q) p.set("q", q);
  Object.entries(extra).forEach(([k, v]) => v && p.set(k, v));
  const s = p.toString();
  return `/new-homes${s ? `?${s}` : ""}`;
}
