/**
 * Placeholder MLS-shaped data layer.
 *
 * Every accessor is async so the Phase 2 CRMLS / IDX adapter can replace this
 * module without touching the pages. Field names are kept from the design
 * handoff (`listings.js`) because they map 1:1 to RESO fields.
 */
import type {
  Agent,
  BadgeKind,
  Listing,
  ListingDetail,
  ListingSort,
  MarketStat,
  Neighborhood,
  Post,
  PostCategory,
  PropertyType,
  RecentSale,
  SoCalCounty,
  Testimonial,
} from "@/types/listing";
import { SITE, STATS } from "@/lib/site";
import { money, num } from "@/lib/format";
import { sortListings } from "@/lib/sort";

export { sortListings };

const BADGE: Record<BadgeKind, [string, string]> = {
  new: ["#C9A961", "#0B1F3A"],
  open: ["#0B1F3A", "#FFFFFF"],
  pending: ["#374151", "#FFFFFF"],
  soon: ["#EAD9B0", "#0B1F3A"],
  drop: ["#2E9E6B", "#FFFFFF"],
  sold: ["#6B7280", "#FFFFFF"],
  days: ["#FFFFFF", "#0B1F3A"],
};

type Extra = Partial<Pick<Listing, "year" | "hoa" | "garage" | "pool" | "listPrice" | "over">>;

/** City → county for the sample data. Phase 2 reads RESO CountyOrParish instead. */
const CITY_COUNTY: Record<string, SoCalCounty> = {
  Irvine: "Orange", "Newport Beach": "Orange", Tustin: "Orange", "Laguna Niguel": "Orange", "Costa Mesa": "Orange",
  "Newport Coast": "Orange", "Lake Forest": "Orange", "San Clemente": "Orange", Pasadena: "Los Angeles", Temecula: "Riverside",
  "Rancho Cucamonga": "San Bernardino", Chino: "San Bernardino", Carlsbad: "San Diego",
};

function L(
  id: number,
  mls: string,
  price: number,
  address: string,
  city: string,
  zip: string,
  beds: number,
  baths: number,
  sqft: number,
  lot: number,
  type: PropertyType,
  neighborhood: string,
  dom: number,
  badge: string,
  kind: BadgeKind,
  photo: string,
  extra: Extra = {},
  photoSrc?: string,
): Listing {
  const [badgeBg, badgeFg] = BADGE[kind];
  return {
    id,
    mls,
    price,
    priceFmt: money(price),
    address,
    city,
    zip,
    county: CITY_COUNTY[city] ?? "Orange",
    beds,
    baths,
    sqft,
    sqftFmt: num(sqft),
    lot,
    lotFmt: num(lot),
    type,
    neighborhood,
    dom,
    domLabel: dom === 0 ? "Listed today" : dom + (dom === 1 ? " day" : " days") + " on market",
    badge,
    badgeKind: kind,
    badgeBg,
    badgeFg,
    photo,
    photoSrc,
    status: kind === "sold" ? "Sold" : kind === "pending" ? "Pending" : kind === "soon" ? "Coming Soon" : "Active",
    specs: `${beds} bd · ${baths} ba · ${num(sqft)} sqft`,
    fullAddress: `${address}, ${city}, CA ${zip}`,
    ppsf: money(Math.round(price / sqft)) + "/sqft",
    listedBy: "YALA Realty & Associates",
    ...extra,
  };
}

const listings: Listing[] = [
  L(1, "OC24188214", 1295000, "78 Winding Way", "Irvine", "92602", 4, 3, 2410, 5200, "Single Family", "Northwood Pointe", 0, "New · 2 hrs", "new", "two-story exterior, dusk", { year: 1998, hoa: 120, garage: 2, pool: "Community" }, "/images/two_story_dusk.jpg"),
  L(2, "OC24187902", 1850000, "24 Shadowbrook", "Irvine", "92604", 5, 4, 3120, 6800, "Single Family", "Woodbridge", 1, "New · Today", "new", "lakefront exterior", { year: 1986, hoa: 155, garage: 3, pool: "Private" }, "/images/lakefront_exterior.jpg"),
  L(3, "NP24186331", 4395000, "1207 Bayside Dr", "Newport Beach", "92625", 4, 4.5, 3480, 7100, "Single Family", "Corona del Mar", 4, "Open Sat 1–4", "open", "ocean-view terrace", { year: 2016, hoa: 0, garage: 2, pool: "None" }, "/images/ocean_terrace.jpg"),
  L(4, "PW24185540", 1449000, "15 Corte Vista", "Tustin", "92782", 4, 3, 2650, 5900, "Single Family", "Tustin Ranch", 18, "Price ↓ $26K", "drop", "front elevation, palms", { year: 1994, hoa: 98, garage: 2, pool: "Community" }, "/images/modern_farmhouse.jpg"),
  L(5, "OC24188101", 989000, "3 Cordoba", "Irvine", "92614", 3, 2.5, 1680, 0, "Condo", "Westpark", 1, "New · 1 day", "new", "courtyard entry", { year: 1989, hoa: 310, garage: 2, pool: "Community" }, "/images/courtyard_entry.jpg"),
  L(6, "OC24188420", 2150000, "28481 Rancho Grande", "Laguna Niguel", "92677", 5, 4, 3560, 9400, "Single Family", "Rancho Niguel", 0, "Coming Soon", "soon", "hillside backyard", { year: 1990, hoa: 85, garage: 3, pool: "Private" }, "/images/sell_hero.jpg"),
  L(7, "OC24187750", 2480000, "108 Chorus", "Irvine", "92618", 4, 4, 2990, 4300, "Single Family", "Great Park · Rise", 3, "New · 3 days", "new", "modern farmhouse exterior", { year: 2021, hoa: 235, garage: 2, pool: "Community" }, "/images/modern_farmhouse.jpg"),
  L(8, "NP24186007", 1125000, "2211 Elden Ave #B", "Costa Mesa", "92627", 3, 2.5, 1740, 0, "Townhouse", "Eastside Costa Mesa", 6, "6 days", "days", "rooftop deck", { year: 2019, hoa: 260, garage: 2, pool: "None" }, "/images/ocean_terrace.jpg"),
  L(9, "NP24185122", 7900000, "22 Pelican Point Dr", "Newport Coast", "92657", 5, 6, 5410, 12800, "Single Family", "Pelican Point", 2, "Just Listed", "new", "coastal estate, pool", { year: 2004, hoa: 780, garage: 4, pool: "Private" }, "/images/coastal_estate.jpg"),
  L(10, "OC24184880", 1675000, "26 Bell Chime", "Irvine", "92618", 4, 3, 2380, 4100, "Single Family", "Portola Springs", 12, "Pending", "pending", "great room, open plan", { year: 2015, hoa: 190, garage: 2, pool: "Community" }, "/images/sell_hero.jpg"),
  L(11, "OC24185961", 1299000, "25181 Rivendell Dr", "Lake Forest", "92630", 4, 3, 2210, 6000, "Single Family", "Lake Forest Keys", 9, "9 days", "days", "backyard, lake access", { year: 1979, hoa: 140, garage: 2, pool: "Community" }, "/images/lakefront_exterior.jpg"),
  L(12, "OC24185300", 1725000, "27 Via Cancion", "San Clemente", "92673", 4, 3, 2760, 6500, "Single Family", "Talega", 14, "14 days", "days", "spanish exterior, canyon view", { year: 2003, hoa: 265, garage: 3, pool: "Community" }, "/images/two_story_dusk.jpg"),
  L(13, "PF26041872", 1689000, "1844 Rosewood Ave", "Pasadena", "91104", 4, 3, 2280, 6400, "Single Family", "Bungalow Heaven", 1, "New · Today", "new", "craftsman exterior, front porch", { year: 1922, hoa: 0, garage: 2, pool: "None" }, "/images/two_story_dusk.jpg"),
  L(14, "SW26038814", 849000, "31455 Black Oak Ln", "Temecula", "92591", 5, 3, 3150, 7800, "Single Family", "Wolf Creek", 0, "Coming Soon", "soon", "two-story exterior, vineyard hills", { year: 2005, hoa: 92, garage: 3, pool: "Community" }, "/images/modern_farmhouse.jpg"),
  L(15, "CV26040215", 925000, "6542 Sycamore Ridge Ct", "Rancho Cucamonga", "91739", 4, 3, 2640, 6000, "Single Family", "Etiwanda", 1, "New · 1 day", "new", "mountain-view backyard", { year: 2012, hoa: 110, garage: 3, pool: "None" }, "/images/lakefront_exterior.jpg"),
  L(16, "NDP2609112", 2195000, "7310 Avenida Encinas", "Carlsbad", "92011", 4, 3.5, 2980, 7200, "Single Family", "Aviara", 2, "Open Sun 1–4", "open", "coastal exterior, ocean breeze", { year: 1999, hoa: 175, garage: 3, pool: "Community" }, "/images/coastal_estate.jpg"),
];

/** 2026 closed sales where Butchi represented the buyer (client-supplied OneHome links, Rev1). */
const recentSales: RecentSale[] = [
  { address: "113 Apron", city: "Irvine", zip: "92618", soldPrice: 3980000, listPrice: 3980000, type: "Single Family Residence", beds: 5, baths: 5, sqft: 3671, mls: "OC26068423", side: "Represented buyer", url: "https://portal.onehome.com/en-US/share/3022425v38372" },
  { address: "16671 Terra Seca Avenue", city: "Chino", zip: "91708", soldPrice: 1169857, listPrice: 1199857, type: "Single Family Residence", beds: 5, baths: 5, sqft: 3533, mls: "OC26002242", side: "Represented buyer", url: "https://portal.onehome.com/en-US/share/3022430j30636" },
  { address: "689 Beacon", city: "Irvine", zip: "92618", soldPrice: 1699990, listPrice: 1899990, type: "Condominium", beds: 4, baths: 3, sqft: 2323, mls: "IG26004967", side: "Represented buyer", url: "https://portal.onehome.com/en-US/share/3022433Y24338" },
];

const market: MarketStat[] = [
  { label: "Median sale price", value: "$1.34M", delta: "+3.8% YoY", up: true },
  { label: "Median days on market", value: "24", delta: "−3 days YoY", up: true },
  { label: "Active inventory", value: "3,912", delta: "+11% YoY", up: false },
  { label: "Sale-to-list ratio", value: "99.6%", delta: "+0.4 pts YoY", up: true },
];

const testimonials: Testimonial[] = [
  { quote: "Butchi found us a Woodbridge home before it hit the portals, then negotiated $40K under asking in a week when everything else was going over. He picked up every single call.", name: "Priya & Arjun M.", meta: "Bought in Woodbridge, Irvine · 2026" },
  { quote: "We interviewed four agents. YALA was the only one who walked in with a pricing model and a marketing calendar. Eleven offers, sold in eight days.", name: "The Henderson family", meta: "Sold in Tustin Ranch · 2025" },
  { quote: "Relocating from Seattle, I needed someone who knew school boundaries, HOA quirks, and Mello-Roos cold. Butchi did, and he never once rushed us.", name: "Daniel K.", meta: "Relocated to Great Park, Irvine · 2025" },
];

const slugify = (s: string) =>
  s.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const P = (title: string, cat: PostCategory, date: string, read: string, photo: string, excerpt: string, photoSrc?: string): Post => ({
  slug: slugify(title),
  title,
  cat,
  date,
  read,
  photo,
  photoSrc,
  excerpt,
});

const posts: Post[] = [
  P("Irvine's fall 2026 market: what buyers should expect", "Market Update", "Sep 3, 2026", "6 min", "irvine skyline, golden hour", "Inventory is up 11% year over year, but well-priced homes in Northwood and Woodbridge are still going in under two weeks. Here is how to position an offer.", "/images/two_story_dusk.jpg"),
  P("How the Great Park build-out is reshaping north Irvine prices", "Neighborhoods", "Aug 27, 2026", "8 min", "great park aerial", "New phases in Solis Park and Rise are pulling median prices north of $2.3M. We break down HOA, Mello-Roos, and resale trends by village.", "/images/modern_farmhouse.jpg"),
  P("Mello-Roos, explained for first-time Irvine buyers", "Buying", "Aug 19, 2026", "5 min", "tax bill close-up", "What the special tax actually funds, how long it lasts, and how to compare two homes with very different bills.", "/images/buy_hero.jpg"),
  P("Pricing your Orange County home in a 24-day market", "Selling", "Aug 12, 2026", "7 min", "staged living room", "Why the first ten days decide everything, and the three pricing bands we model before any listing goes live.", "/images/sell_hero.jpg"),
  P("Newport Beach vs. Corona del Mar: a side-by-side for luxury buyers", "Neighborhoods", "Aug 5, 2026", "9 min", "corona del mar coastline", "Lot sizes, walkability, view premiums, and what $4M buys on each side of PCH.", "/images/ocean_terrace.jpg"),
  P("Rate buydowns and seller credits: what's actually negotiable in 2026", "Financing", "Jul 29, 2026", "6 min", "closing table", "Seller-paid 2-1 buydowns are back. When they beat a price cut, and how to structure one so the appraisal holds.", "/images/coastal_estate.jpg"),
];

export const POST_CATEGORIES: Array<"All" | PostCategory> = ["All", "Market Update", "Neighborhoods", "Buying", "Selling", "Financing"];

const neighborhoods: Neighborhood[] = [
  { name: "Irvine", median: "$1.48M", dom: "18 days", note: "Master-planned villages, top-ranked schools, strong HOA standards.", photo: "irvine village street", photoSrc: "/images/modern_farmhouse.jpg" },
  { name: "Newport Beach", median: "$3.60M", dom: "41 days", note: "Harbor, coastal bluffs, and the Corona del Mar village.", photo: "newport harbor", photoSrc: "/images/ocean_terrace.jpg" },
  { name: "Tustin Ranch", median: "$1.42M", dom: "21 days", note: "Golf-course community with quick access to the 5 and 261.", photo: "tustin ranch golf", photoSrc: "/images/two_story_dusk.jpg" },
  { name: "Laguna Niguel", median: "$1.55M", dom: "27 days", note: "Hillside lots, larger yards, ten minutes to Dana Point.", photo: "laguna niguel hills", photoSrc: "/images/coastal_estate.jpg" },
];

export const agent: Agent = {
  name: SITE.agentName,
  title: SITE.agentTitle,
  brokerage: SITE.brokerage,
  dre: `DRE# ${SITE.agentDre}`,
  rating: STATS.rating,
  reviews: STATS.reviews,
  phone: SITE.phone,
  phoneHref: SITE.phoneHref,
  email: SITE.email,
  photoSrc: "/images/agent_portrait.jpg",
};

/** Placeholder count for the live-listing headline until the Phase 2 feed. */
export const LIVE_LISTING_COUNT = 1284;

/** Detail content for the sample property page (78 Winding Way). */
const details: Record<string, Omit<ListingDetail, keyof Listing>> = {
  OC24188214: {
    description:
      "Corner-lot Northwood Pointe home with a fully reimagined kitchen (2023): quartz waterfall island, Thermador range, and a walk-in pantry. Vaulted great room opens through a 12-foot slider to a covered loggia and a low-maintenance yard with citrus. Downstairs bedroom and full bath; upstairs primary with dual closets and a soaking tub. Owned solar (7.2 kW), tankless water heater, and a 240V EV outlet in the garage. Walk to Canyon View Elementary, Meadowood Park, and the Northwood Town Center. Low tax rate, no Mello-Roos.",
    chips: ["Single Family", "Built 1998", "2-car garage", "HOA $120/mo", "Northwood Pointe", "Irvine Unified"],
    photos: ["front exterior, dusk", "kitchen", "great room", "primary suite", "backyard"],
    photoCount: 34,
    facts: [
      ["Property type", "Single Family Residence"], ["Year built", "1998"], ["Lot size", "5,200 sqft"], ["Living area", "2,410 sqft"],
      ["Stories", "2"], ["Garage", "2-car attached"], ["HOA", "$120 / month"], ["Cooling", "Central AC"], ["Heating", "Forced air, gas"],
      ["Solar", "Owned, 7.2 kW"], ["Parcel #", "530-241-18"], ["Mello-Roos", "None"], ["Days on market", "0"], ["Price / sqft", "$537"],
    ].map(([k, v]) => ({ k, v })),
    schools: [
      { name: "Canyon View Elementary", rating: 10, meta: "K–6 · 0.4 mi · Irvine Unified" },
      { name: "Sierra Vista Middle", rating: 9, meta: "7–8 · 1.1 mi · Irvine Unified" },
      { name: "Northwood High", rating: 10, meta: "9–12 · 0.9 mi · Irvine Unified" },
    ],
    schoolNote: "School ratings from GreatSchools; boundaries should be verified with Irvine Unified.",
    history: [
      { date: "Sep 9, 2026", event: "Listed for sale", price: "$1,295,000", src: "CRMLS #OC24188214" },
      { date: "Jun 14, 2017", event: "Sold", price: "$905,000", src: "Public record" },
      { date: "Apr 2, 2017", event: "Listed for sale", price: "$899,000", src: "CRMLS" },
    ],
    openHouse: { label: "Sat Sep 12 · 1–4 PM · Sun Sep 13 · 1–4 PM" },
    breadcrumb: ["Southern California", "Orange County", "Irvine", "Northwood Pointe"],
    agent,
  },
};

/** Generic detail for listings without hand-written content. */
function genericDetail(l: Listing): Omit<ListingDetail, keyof Listing> {
  return {
    description: `${l.type} in ${l.neighborhood}, ${l.city}. ${l.beds} bedrooms, ${l.baths} baths, ${l.sqftFmt} sqft${l.lot ? ` on a ${l.lotFmt} sqft lot` : ""}. Full listing remarks arrive with the CRMLS feed in Phase 2.`,
    chips: [l.type, l.year ? `Built ${l.year}` : "", l.garage ? `${l.garage}-car garage` : "", l.hoa ? `HOA $${l.hoa}/mo` : "No HOA", l.neighborhood].filter(Boolean),
    photos: [l.photo, "kitchen", "living room", "primary suite", "exterior"],
    photoCount: 24,
    facts: [
      ["Property type", l.type], ["Year built", l.year ? String(l.year) : "—"], ["Lot size", l.lot ? `${l.lotFmt} sqft` : "—"],
      ["Living area", `${l.sqftFmt} sqft`], ["Garage", l.garage ? `${l.garage}-car` : "—"], ["HOA", l.hoa ? `$${l.hoa} / month` : "None"],
      ["Pool", l.pool ?? "—"], ["Days on market", String(l.dom)], ["Price / sqft", l.ppsf.replace("/sqft", "")],
    ].map(([k, v]) => ({ k, v })),
    schools: [],
    schoolNote: "School data arrives with the Phase 2 feed.",
    history: [{ date: "2026", event: "Listed for sale", price: l.priceFmt, src: `CRMLS #${l.mls}` }],
    breadcrumb: ["Southern California", `${l.county} County`, l.city, l.neighborhood],
    agent,
  };
}

const wait = () => Promise.resolve();

export interface ListingsQuery {
  sort?: ListingSort;
  city?: string;
  limit?: number;
}

export async function getListings(q: ListingsQuery = {}): Promise<Listing[]> {
  await wait();
  let out = listings;
  if (q.city) {
    const city = q.city.toLowerCase();
    out = out.filter((l) => l.city.toLowerCase() === city);
  }
  out = sortListings(out, q.sort);
  return q.limit ? out.slice(0, q.limit) : out;
}

const COUNTY_ORDER: SoCalCounty[] = ["Orange", "Los Angeles", "Riverside", "San Bernardino", "San Diego"];

/**
 * Featured mix for the home page: the newest listing from each of the five counties first,
 * then the next-newest overall, so every county is represented.
 */
export async function getFeaturedListings(limit = 6): Promise<Listing[]> {
  await wait();
  const byNewest = sortListings(listings, "new");
  const picks: Listing[] = [];
  for (const c of COUNTY_ORDER) {
    const first = byNewest.find((l) => l.county === c);
    if (first) picks.push(first);
  }
  for (const l of byNewest) {
    if (picks.length >= limit) break;
    if (!picks.includes(l)) picks.push(l);
  }
  return picks.slice(0, limit);
}

export async function getListing(mls: string): Promise<ListingDetail | null> {
  await wait();
  const l = listings.find((x) => x.mls.toLowerCase() === mls.toLowerCase());
  if (!l) return null;
  return { ...l, ...(details[l.mls] ?? genericDetail(l)) };
}

export async function getSimilarListings(mls: string, limit = 4): Promise<Listing[]> {
  await wait();
  const l = listings.find((x) => x.mls === mls);
  if (!l) return [];
  return listings.filter((x) => x.city === l.city && x.mls !== mls).slice(0, limit);
}

export async function getRecentSales(): Promise<RecentSale[]> {
  await wait();
  return recentSales;
}

export async function getMarketStats(): Promise<MarketStat[]> {
  await wait();
  return market;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  await wait();
  return testimonials;
}

export async function getPosts(cat?: PostCategory | "All"): Promise<Post[]> {
  await wait();
  return !cat || cat === "All" ? posts : posts.filter((p) => p.cat === cat);
}

export async function getNeighborhoods(): Promise<Neighborhood[]> {
  await wait();
  return neighborhoods;
}

export async function getAgent(): Promise<Agent> {
  await wait();
  return agent;
}
