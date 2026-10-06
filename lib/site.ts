/**
 * Site-wide facts in one place: licenses, stats, contact, and external links.
 * Source: "Yala Realty website Updates Rev1" (client revision document).
 */

export const SITE = {
  brokerage: "YALA Realty & Associates",
  brokerageDre: "02140547",
  agentName: "Butchi Reddy Yalamuri",
  agentShortName: "Butchi Yalamuri",
  agentTitle: "Real Estate Broker & Mortgage Consultant",
  agentDre: "02012703",
  agentNmls: "1922285",
  phone: "(949) 522-1103",
  phoneHref: "tel:9495221103",
  email: "butchi@yalarealty.com",
  emailHref: "mailto:butchi@yalarealty.com",
  addressLine1: "12 Proclamation Way",
  addressLine2: "Irvine, CA 92602",
  region: "Southern California",
  counties: ["Los Angeles", "Orange", "Riverside", "San Bernardino", "San Diego"] as const,
} as const;

/** Formatted license strings for footers, cards, and disclosures. */
export const LICENSES = {
  brokerage: `${SITE.brokerage} · DRE# ${SITE.brokerageDre}`,
  agent: `${SITE.agentName} · DRE# ${SITE.agentDre} | NMLS# ${SITE.agentNmls}`,
  agentShort: `DRE# ${SITE.agentDre} | NMLS# ${SITE.agentNmls}`,
} as const;

/** Track record (client-supplied, Rev1). Update here and it changes everywhere. */
export const STATS = {
  transactions: "300+",
  years: "10+",
  rating: "5.0",
  reviews: 15,
  volume: "$260M",
} as const;

export const LINKS = {
  /** Butchi's new-construction search site (ShowingNew / NewHomeSource Professional). */
  showingNew: "https://www.showingnew.com/butchi",
  calhfa: "https://www.calhfa.ca.gov/",
  sellersGuidePdf: "/guides/socal-sellers-guide.pdf",
} as const;

export const LENDER = {
  name: "C2 Financial",
  role: "Mortgage Consultant",
} as const;
