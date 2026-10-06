/**
 * "The Ultimate Southern California Home Seller's Guide" (client-supplied PDF),
 * structured for the /sellers-guide page and the Sell page process steps.
 */

export interface SellStep {
  title: string;
  short: string;
  detail: string;
}

export const SELL_STEPS: SellStep[] = [
  {
    title: "Prep & Staging",
    short: "Clean, declutter, fix the small things, and stage to show off space.",
    detail: "Cleaning, decluttering, executing minor repairs, and arranging furniture to emphasize space and maximize buyer appeal.",
  },
  {
    title: "Strategic Pricing",
    short: "Price from recent neighborhood sales and current market conditions.",
    detail: "Utilizing recent neighborhood sales data and local market conditions to establish a competitive price point.",
  },
  {
    title: "Marketing & Showings",
    short: "HD photography, virtual tours, major platforms, open houses.",
    detail:
      "Creating high-definition photography, virtual tours, listings on major platforms, and coordinating open houses or private buyer viewings.",
  },
  {
    title: "Negotiating Offers",
    short: "Review offers, vet buyer financing, and manage counter-offers.",
    detail:
      "Reviewing incoming purchase contracts, evaluating buyer financial qualifications, managing counter-offers, and executing the final agreement.",
  },
  {
    title: "Under Contract",
    short: "Inspections, appraisal, financing milestones, and contingencies.",
    detail:
      "Coordinating home inspections, navigating the buyer's appraisal process, tracking buyer financing milestones, and clearing contract contingencies.",
  },
  {
    title: "Escrow & Closing",
    short: "Final settlement, payoffs, deed signing, and transfer of ownership.",
    detail:
      "Agreeing on final settlement statements, paying off remaining mortgages and transactional fees, signing the final deed, and officially transferring property ownership.",
  },
];

export const DISCLOSURES: Array<{ name: string; abbr: string; body: string }> = [
  {
    name: "Transfer Disclosure Statement",
    abbr: "TDS",
    body:
      "A legally mandated form covering the physical condition of the property, tracking structural integrity, operational appliances, roof leaks, plumbing history, and legal updates like unpermitted alterations or additions. Under California civil statutes, sellers must explicitly state whether tobacco/nicotine products have been smoked inside the home and disclose the presence of gas-powered appliances.",
  },
  {
    name: "Seller Property Questionnaire",
    abbr: "SPQ",
    body:
      "An expansion of the TDS asking detailed yes/no questions about neighborhood nuisances (e.g., repeating noise issues), prior insurance claims, legal disputes, and history of pests or mold. It also enforces the statutory “Death on Property” rule, mandating the disclosure of any death on the premises within the last 3 years.",
  },
  {
    name: "Natural Hazard Disclosure Report",
    abbr: "NHD",
    body:
      "A third-party report verifying if the home sits in state-designated risk areas, such as a Very High Fire Hazard Severity Zone, an active earthquake fault zone, a seismic landslide/liquefaction zone, or a special flood risk area.",
  },
];

export const LOCAL_MANDATES: Array<[string, string]> = [
  [
    "Los Angeles City",
    "Requires a mandatory Form 9 Report of Residential Property Records (RPR) submitted to the LADBS prior to closing. It mandates certified seismic gas shut-off valves, specific security lighting rules for multi-unit buildings, and water conservation compliance.",
  ],
  [
    "Orange & San Diego Counties",
    "Highly subject to Mello-Roos Community Facilities Districts. Sellers must explicitly provide the buyer with a formal notice detailing special tax assessment bonds used to fund localized infrastructure.",
  ],
  [
    "High Fire Risk Zones",
    "Properties in high-risk zones across inland areas like Riverside or San Bernardino must prove compliance with local defensible space vegetation clearing guidelines before finalizing a transfer.",
  ],
  [
    "HOA-Governed Homes",
    "If your home is in a Homeowners Association (HOA), you must order and deliver CC&Rs, bylaws, financial statements, and recent meeting minutes to the buyer during escrow.",
  ],
];

export const PREP_CHECKLIST: Array<{ area: string; items: string[] }> = [
  {
    area: "Exterior / Curb Appeal",
    items: [
      "Touch up peeling paint, power-wash walkways, and clean or paint the front entry door.",
      "Fix broken doorbells, tighten loose hardware, and plant fresh, colorful landscaping accents.",
    ],
  },
  {
    area: "Interior Repairs",
    items: [
      "Apply a fresh coat of light, neutral-colored paint to brighten rooms and eliminate personalized styling.",
      "Fix leaking faucets, loose molding, sticking cabinet hinges, or tracks off their alignment.",
      "Shampoo existing carpets or replace deeply worn flooring segments to remove stains or pet odors.",
    ],
  },
  {
    area: "Staging Tactics",
    items: [
      "Depersonalize the space by packing away personal family photos and collectibles.",
      "Max out natural light by opening blinds and keeping light fixtures turned on for walkthroughs.",
    ],
  },
];

export const ESCROW_TIMELINE: Array<{ when: string; what: string }> = [
  { when: "7 days", what: "Buyer submits the initial earnest money deposit (EMD) to escrow." },
  { when: "17 days", what: "Buyer completes home inspections, reviews disclosures, and removes physical investigation contingencies." },
  { when: "21 days", what: "Buyer secures final loan commitment and removes the appraisal contingency." },
  { when: "30–45 days", what: "Typical Southern California escrow: neutral escrow secures funds, clears title, and records the grant deed." },
];
