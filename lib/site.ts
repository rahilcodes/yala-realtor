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

/** CA DRE public license lookup for a license number. */
export const dreLookupUrl = (dre: string) => `https://www2.dre.ca.gov/publicasp/pplinfo.asp?License_id=${dre}`;

/**
 * YALA agents (client Rev2). Add `photo: "/images/agents/<file>.jpg"` when headshots arrive;
 * until then the About page shows a blank placeholder.
 */
export const AGENTS: Array<{ name: string; dre: string; photo?: string }> = [
  { name: "Bhargav Yalamuri", dre: "02057630" },
  { name: "Kondal Vayineni", dre: "02160521" },
  { name: "Ramesh Sanniboyina", dre: "02185582" },
  { name: "Murali Rajendran", dre: "02229498" },
  { name: "Shefali Golvelker", dre: "02325828" },
];

export const LENDER = {
  name: "C2 Financial",
  role: "Mortgage Consultant",
} as const;
