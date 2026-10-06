# YALA Realty & Associates — website

Next.js (App Router) + TypeScript + Tailwind v4 build of the design handoff in
`design_handoff_yala_realty/` (the `.dc.html` files are the visual reference; nothing from
`support.js` is used at runtime). Content follows the client's "Yala Realty website Updates Rev1".

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

## Routes

| Route | Notes |
| --- | --- |
| `/` | "Find your next home in Southern California." Hero search (New Homes / Move-in Ready / Sell / Home Value), featured homes from all five counties, valuation CTA, market pulse, testimonials, blog teasers |
| `/listings` | Featured homes with sort and List/Map toggle. The sticky search bar sends location + filters to the new-home search |
| `/listings/[mls]` | Property page. Sample: `/listings/OC24188214` (78 Winding Way) |
| `/buy` | Buyer path, Southern California introduction, five county guides with one-click new-home searches, C2 Financial pre-approval, CalHFA link, consultation form (`#consult`) |
| `/sell` | Valuation form (`#valuation`, pre-fills `?address=`), $260M volume, 2026 buyer-side sales (OneHome links), six-step process, Seller's Guide download |
| `/sellers-guide` | Web version of "The Ultimate Southern California Home Seller's Guide" + PDF download (`public/guides/socal-sellers-guide.pdf`) |
| `/advantage` | The YALA Advantage |
| `/pre-approval` | Pre-approval contact page (C2 Financial, Butchi NMLS# 1922285) |
| `/property-management` | YALA Property Management services + owner inquiry form |
| `/about` | Bio, title line, licenses (DRE / NMLS), memberships, background |
| `/contact` | Role segments (`?role=`), message pre-fill (`?topic=buyers-guide` / `upgrades`), scheduler |
| `/blog` | Category filter with featured card, newsletter |
| `GET /new-homes` | New-home search redirect (see below) |
| `POST /api/leads` | Lead intake stub. Every form posts here with `source` and the originating `page`. |

## New-home search (ShowingNew)

Every search box on the site is a plain GET form to `/new-homes` that opens in a new tab. The route
resolves the query and 302s to Butchi's ShowingNew site (`https://www.showingnew.com/butchi`) with filters applied:

| Query | Destination |
| --- | --- |
| City or neighborhood (`Irvine`, `Great Park`, `Otay Ranch`) | `/communities/california/{market}/city-{slug}`; falls back to the county page when ShowingNew lists zero communities for that city (count cached 6 h) |
| County / region (`Orange County`, `LA County`, `Inland Empire`) | County or market results page |
| ZIP (`92618`) | `/postalcode-{zip}` directly (ShowingNew's own resolver 404s on bare ZIPs) |
| Anything else (community, builder, school district) | ShowingNew's own resolver, `redirecttoresultspage?SearchText=…` |
| Empty | Butchi's ShowingNew home page |

Filters carried over: `price` → `pricelow`/`pricehigh`, `beds` → `bedrooms`, `baths` → `bathrooms`, `status=move-in` → `homestatus=A`.
Inspect any resolution with `/new-homes?q=Irvine&beds=3%2B&format=json`. Logic lives in `lib/newHomeSearch.ts`.
Re-validate the city → market map against the live site with:

```bash
node --experimental-strip-types scripts/probe-showingnew.mjs
```

## Structure

- `lib/site.ts` — licenses (brokerage DRE# 02140547, Butchi DRE# 02012703, NMLS# 1922285), track-record stats, contact, external links. Change a number here and it updates everywhere.
- `lib/newHomeSearch.ts` — ShowingNew URL resolver, SoCal city/county map, filter parsing.
- `lib/socal.ts` — Southern California introduction and county guides (Rev1 copy).
- `lib/sellersGuide.ts` — Seller's Guide content (steps, disclosures, local mandates, checklist, escrow timeline).
- `types/listing.ts` — `Listing` (now with `county`), `RecentSale`, etc. Field names map 1:1 to RESO/IDX.
- `lib/data.ts` — async data layer: `getListings`, `getFeaturedListings`, `getListing`, `getSimilarListings`, `getRecentSales`, `getMarketStats`, `getTestimonials`, `getPosts`, `getAgent`. Phase 2 replaces the bodies with the CRMLS/IDX adapter.
- `lib/leads.ts` — `submitLead(source, data)` and the `useLeadForm` hook; `components/forms/LeadForm.tsx` renders labeled lead forms from a field list.
- `components/SiteNav.tsx` — utility bar (licenses, phone, valuation) + sticky nav with YALA Advantage, New Home Search, and the YALA Property Management button; hamburger below 1200px.
- `app/globals.css` — design tokens, components, and the hero fit rules (hero fills exactly one screen below the header on desktop).

## Accessibility notes

- Every input has a label (visible or `sr-only`); toggles use `aria-pressed`, the hero tabs use `role="tablist"` / `aria-selected` with arrow-key navigation.
- Minimum 44px tap targets; visible 3px gold focus ring (navy ring on gold surfaces).
- Links that open a new tab say so to screen readers.
- All grids use `repeat(auto-fit, minmax(min(100%, Npx), 1fr))`.

## Still placeholder

- Featured listings, market-pulse figures, and testimonials are sample data until the MLS feed and real reviews are connected.
- Footer social and legal links (`#`) need real URLs.
