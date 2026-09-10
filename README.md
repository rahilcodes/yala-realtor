# YALA Realty & Associates — website

Next.js (App Router) + TypeScript + Tailwind v4 build of the design handoff in
`design_handoff_yala_realty/` (the `.dc.html` files are the visual reference; nothing from
`support.js` is used at runtime).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

## Routes

| Route | Notes |
| --- | --- |
| `/` | Hero search (Buy / Rent / Sell / Home Value tabs), featured listings, valuation CTA, market pulse, testimonials, blog teasers |
| `/listings` | Sticky filter bar, sort, List/Map toggle (map is a sticky aside ≥1000px, a full-width block above results below), save search, alerts card, IDX disclaimer |
| `/listings/[mls]` | Property page. Sample: `/listings/OC24188214` (78 Winding Way). Gallery, save/share, Schedule tour / Ask question form with day picker + date input and pre-filled editable message, facts, schools, price history, payment estimate with down-payment slider, similar homes |
| `/buy` | Buyer path, neighborhood guides, consultation form (`#consult`) |
| `/sell` | Valuation form (`#valuation`, pre-fills `?address=`), pillars, recent sales, process, seller consultation |
| `/about` | Broker bio, stats, credentials, team, YALA group |
| `/contact` | Role segments (Buyer / Seller / Both / Other, `?role=`), message form, 30-minute scheduler with day + time slots |
| `/blog` | Category filter with featured card, newsletter |
| `POST /api/leads` | Lead intake stub. Every form posts here with `source` and the originating `page`. |

## Structure

- `types/listing.ts` — `Listing`, `ListingDetail`, `Post`, etc. Field names mirror the handoff's `listings.js` and map 1:1 to RESO/IDX (`ListPrice`, `ListingId`, `BedroomsTotal`, `LivingArea`, `DaysOnMarket`, `StandardStatus`…).
- `lib/data.ts` — async data layer: `getListings`, `getListing`, `getSimilarListings`, `getSoldListings`, `getMarketStats`, `getTestimonials`, `getPosts`, `getNeighborhoods`, `getAgent`. Phase 2 replaces the bodies with the CRMLS/IDX adapter; pages do not change.
- `lib/leads.ts` — `submitLead(source, data)` and the `useLeadForm` hook used by every form.
- `lib/saved.ts` — saved-listing hearts (localStorage-backed, swap for an account store later).
- `components/` — `SiteNav` (sticky, hamburger below 1000px), `SiteFooter` (compliance row: DRE placeholders, Equal Housing, CRMLS disclaimer), `ListingCard`, `Photo` (next/image over a neutral fill, labeled with the design's photo description), `MapPanel` (map placeholder with price pins), forms per page.
- `app/globals.css` — design tokens as Tailwind `@theme` (navy, gold, gold-deep, champagne, cloud, ivory…), fonts via `next/font` (Newsreader, Manrope, Cormorant Garamond), component classes (`btn-*`, `input`, `seg`, `tile`, `pill`), and the global 3px gold focus ring.

## Accessibility notes

- Every input has a label (visible or `sr-only`); toggles use `aria-pressed`, the hero tabs use `role="tablist"` / `aria-selected` with arrow-key navigation.
- Minimum 44px tap targets; visible 3px gold focus ring (navy ring on gold surfaces).
- Small gold text on white always uses Gold Deep `#8A6D2F` (5.4:1).
- All grids use `repeat(auto-fit, minmax(min(100%, Npx), 1fr))`, so pages reflow from 360px to 1440px+ without breakpoints; the only breakpoint is the 1000px nav/aside switch.

## Swapping in real imagery and the MLS feed

- Pass `src` to `<Photo>` to replace a placeholder; layouts don't change.
- Replace `lib/data.ts` internals with the CRMLS adapter; keep the field names.
- `app/api/leads/route.ts` currently logs leads server-side; forward to the CRM there.
