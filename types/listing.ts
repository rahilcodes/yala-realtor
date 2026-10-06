/**
 * Listing data model.
 *
 * Field names intentionally mirror the placeholder `listings.js` from the design
 * handoff and map 1:1 onto RESO / IDX fields for the Phase 2 CRMLS integration:
 *   price → ListPrice · mls → ListingId · beds → BedroomsTotal · baths → BathroomsTotalInteger
 *   sqft → LivingArea · fullAddress → UnparsedAddress · type → PropertySubType
 *   neighborhood → SubdivisionName · dom → DaysOnMarket · status → StandardStatus
 */

export type BadgeKind = "new" | "open" | "pending" | "soon" | "drop" | "sold" | "days";

export type ListingStatus = "Active" | "Pending" | "Coming Soon" | "Sold";

export type PropertyType = "Single Family" | "Condo" | "Townhouse" | "Multi-family";

export type SoCalCounty = "Orange" | "Los Angeles" | "Riverside" | "San Bernardino" | "San Diego";

export interface Listing {
  id: number;
  /** MLS listing id (RESO ListingId). */
  mls: string;
  /** List price in USD (RESO ListPrice). */
  price: number;
  priceFmt: string;
  address: string;
  city: string;
  zip: string;
  /** County (RESO CountyOrParish). */
  county: SoCalCounty;
  beds: number;
  baths: number;
  sqft: number;
  sqftFmt: string;
  /** Lot size in sqft; 0 for condos / no lot. */
  lot: number;
  lotFmt: string;
  type: PropertyType;
  neighborhood: string;
  /** Days on market (RESO DaysOnMarket). */
  dom: number;
  domLabel: string;
  badge: string;
  badgeKind: BadgeKind;
  badgeBg: string;
  badgeFg: string;
  /** Photo description used by the placeholder component until real media exists. */
  photo: string;
  photoSrc?: string;
  status: ListingStatus;
  specs: string;
  fullAddress: string;
  ppsf: string;
  listedBy: string;
  year?: number;
  hoa?: number;
  garage?: number;
  pool?: "Private" | "Community" | "None";
  /** Sold-only fields. */
  listPrice?: string;
  over?: string;
}

export interface PropertyFact {
  k: string;
  v: string;
}

export interface School {
  name: string;
  rating: number;
  meta: string;
}

export interface PriceEvent {
  date: string;
  event: string;
  price: string;
  src: string;
}

export interface OpenHouse {
  label: string;
}

/** Extra detail fields available on the property page. */
export interface ListingDetail extends Listing {
  description: string;
  chips: string[];
  photos: string[];
  photoCount: number;
  facts: PropertyFact[];
  schools: School[];
  schoolNote: string;
  history: PriceEvent[];
  openHouse?: OpenHouse;
  breadcrumb: string[];
  agent: Agent;
}

export interface Agent {
  name: string;
  title: string;
  brokerage: string;
  dre: string;
  rating: string;
  reviews: number;
  phone: string;
  phoneHref: string;
  email: string;
  photoSrc?: string;
}

export interface MarketStat {
  label: string;
  value: string;
  delta: string;
  up: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  meta: string;
}

export type PostCategory = "Market Update" | "Neighborhoods" | "Buying" | "Selling" | "Financing";

export interface Post {
  slug: string;
  title: string;
  cat: PostCategory;
  date: string;
  read: string;
  photo: string;
  photoSrc?: string;
  excerpt: string;
}

export interface Neighborhood {
  name: string;
  median: string;
  dom: string;
  note: string;
  photo: string;
  photoSrc?: string;
}

export type ListingSort = "new" | "asc" | "desc" | "sqft";

/** A closed sale where YALA represented a client (shown on the Sell page). */
export interface RecentSale {
  address: string;
  city: string;
  zip: string;
  soldPrice: number;
  listPrice: number;
  type: string;
  beds: number;
  baths: number;
  sqft: number;
  mls: string;
  side: "Represented buyer" | "Represented seller";
  /** Public OneHome share link with the full MLS record. */
  url: string;
}
