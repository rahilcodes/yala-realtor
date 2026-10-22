import Link from "next/link";
import { HeroSearch } from "@/components/home/HeroSearch";
import { MapPanel } from "@/components/MapPanel";
import { RecentSales } from "@/components/RecentSales";
import { ValuationForm } from "@/components/ValuationForm";
import { COUNTY_MEDIANS, getMarketStats, getRecentSales, MARKET_SOURCE } from "@/lib/data";
import { money, num } from "@/lib/format";
import { newHomesHref } from "@/lib/newHomeSearch";

/** Quick new-home searches; "" opens all of Southern California. */
const POPULAR: Array<[string, string]> = [
  ["All SoCal", ""],
  ["Orange County", "Orange County"],
  ["Los Angeles", "Los Angeles"],
  ["San Diego", "San Diego"],
  ["Inland Empire", "Inland Empire"],
];

export default async function HomePage() {
  const [sales, market] = await Promise.all([getRecentSales(), getMarketStats()]);
  const hero = sales[0];

  return (
    <>
      {/* HERO */}
      <section className="hero bg-gradient-to-b from-cloud to-white">
        <div className="hero-grid container-1200 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-x-10 gap-y-8">
          <div>
            <div className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white py-1.5 pl-2 pr-3 text-[12px] font-semibold text-slate">
              <span aria-hidden="true" className="inline-block h-2 w-2 flex-none rounded-full bg-success" />
              Live new-home search · 5 SoCal counties
            </div>
            <h1 className="hero-title font-serif font-medium leading-[1.06] tracking-[-0.02em] text-navy text-balance">
              Find your next home in Southern California.
            </h1>
            <p className="hero-lede max-w-[520px] leading-[1.55] text-slate-2">
              Search new homes across Los Angeles, Orange, Riverside, San Bernardino, and San Diego counties, with a broker who answers.
            </p>
            <HeroSearch />
            <div className="hero-popular flex flex-wrap items-center gap-2 text-[13px] font-semibold text-meta">
              Popular:
              {POPULAR.map(([label, q]) => (
                <a key={label} href={newHomesHref(q || undefined)} target="_blank" rel="noopener" className="chip text-navy">
                  {label}
                  <span className="sr-only"> new homes (opens in a new tab)</span>
                </a>
              ))}
            </div>
          </div>

          <div className="hero-map relative overflow-hidden rounded-2xl">
            <MapPanel label="Southern California" className="h-full min-h-[inherit]" ariaLabel="Decorative map" />
            {hero && (
              <a
                href={hero.url}
                target="_blank"
                rel="noopener"
                className="absolute bottom-5 left-5 right-5 flex flex-col gap-1.5 rounded-xl bg-white p-4 text-navy no-underline shadow-float transition-shadow hover:shadow-card-hover"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="badge bg-navy px-[7px] py-[3px] text-[10px] text-white">Recently sold · {hero.side}</span>
                  <span className="text-[11px] font-semibold text-meta">MLS# {hero.mls}</span>
                </div>
                <div className="text-[21px] font-extrabold">{money(hero.soldPrice)}</div>
                <div className="text-[13.5px] font-semibold text-slate">
                  {hero.beds} bd · {hero.baths} ba · {num(hero.sqft)} sqft · {hero.type}
                </div>
                <div className="text-[13px] text-slate-2">
                  {hero.address}, {hero.city}, CA {hero.zip}
                </div>
                <span className="text-[12.5px] font-bold text-gold-deep">
                  View on OneHome ↗<span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* RECENT SALES (real MLS records) */}
      <section className="container-1200 pt-[72px]" aria-labelledby="recent-sales">
        <div className="section-head">
          <div>
            <div className="eyebrow">Recent sales · represented buyer</div>
            <h2 id="recent-sales" className="h2 mt-2.5">
              Closed this year with Butchi
            </h2>
          </div>
          <a href={newHomesHref()} target="_blank" rel="noopener" className="btn-outline btn-44">
            Search new homes ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <RecentSales sales={sales} />
      </section>

      {/* VALUATION CTA */}
      <section className="container-1200 mt-[72px]">
        <div
          id="valuation"
          className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-9 overflow-hidden rounded-[20px] bg-navy text-white"
          style={{ padding: "clamp(32px, 5vw, 64px)" }}
        >
          <div aria-hidden="true" className="absolute -right-[60px] -top-[60px] h-80 w-80 rounded-full border border-gold/25" />
          <div aria-hidden="true" className="absolute right-10 top-10 h-80 w-80 rounded-full border border-gold/15" />
          <div className="relative">
            <div className="eyebrow-light">Free home valuation</div>
            <h2 className="mt-3 font-serif font-medium leading-[1.12] tracking-[-0.02em] text-balance" style={{ fontSize: "clamp(30px, 3.5vw, 42px)" }}>
              What&apos;s your home worth in today&apos;s market?
            </h2>
            <p className="mt-3.5 max-w-[480px] text-[16px] leading-[1.6] text-white/80">
              Not an algorithm. Butchi reviews comparable sales, condition, and current buyer demand, then sends a written range within 24 hours.
            </p>
          </div>
          <ValuationForm source="home-valuation" />
        </div>
      </section>

      {/* MARKET PULSE (C.A.R. monthly report) */}
      <section className="container-1200 pt-20" aria-labelledby="market">
        <div className="section-head">
          <div>
            <div className="eyebrow">Market pulse</div>
            <h2 id="market" className="h2 mt-2.5">
              Southern California, {MARKET_SOURCE.period}
            </h2>
          </div>
          <a href={MARKET_SOURCE.url} target="_blank" rel="noopener" className="text-link">
            Read the full C.A.R. report ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))] gap-4">
          {market.map((m) => (
            <div key={m.label} className="rounded-[14px] border border-line bg-cloud px-6 py-[24px]">
              <div className="text-[13px] font-semibold text-meta">{m.label}</div>
              <div className="mt-2.5 font-serif text-[38px] font-medium leading-none tracking-[-0.02em]">{m.value}</div>
              <div className="mt-2.5 text-[12.5px] font-bold text-slate">{m.delta}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-[14px] border border-line">
          <div className="border-b border-line px-5 py-3 text-[12.5px] font-bold uppercase tracking-[0.1em] text-gold-deep">
            Median sale price by county · {MARKET_SOURCE.period}
          </div>
          <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))]">
            {COUNTY_MEDIANS.map((c) => (
              <div key={c.county} className="flex flex-col-reverse gap-1 border-line px-5 py-4 [&:not(:last-child)]:border-b sm:[&:not(:last-child)]:border-b-0 sm:[&:not(:last-child)]:border-r">
                <dt className="text-[13px] font-semibold text-meta">
                  {c.county} County · <span className="text-slate">{c.yoy} YoY</span>
                </dt>
                <dd className="m-0 text-[20px] font-extrabold">{c.median}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-3 text-[12px] text-meta">
          Source:{" "}
          <a href={MARKET_SOURCE.url} target="_blank" rel="noopener" className="text-meta underline">
            {MARKET_SOURCE.label}
          </a>
          . Existing single-family homes; days on market and sale-to-list ratio are statewide.
        </div>
      </section>

      {/* BUYER / SELLER PATHS */}
      <section className="container-1200 pb-[88px] pt-20">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-5">
          <Link href="/buy" className="flex flex-col gap-3.5 rounded-[18px] border border-border bg-white p-9 text-navy no-underline transition-shadow hover:shadow-card">
            <div className="eyebrow">For buyers</div>
            <h3 className="m-0 font-serif text-[28px] font-medium leading-[1.2]">Buyer consultation, on your schedule</h3>
            <p className="m-0 text-[15px] leading-[1.6] text-slate-2">
              A 30-minute call to map your budget, neighborhoods, and timeline, plus early access to listings before they hit the portals.
            </p>
            <span className="mt-auto text-[14px] font-bold">Book a buyer consultation →</span>
          </Link>
          <Link href="/sell" className="flex flex-col gap-3.5 rounded-[18px] bg-ink p-9 text-white no-underline transition-colors hover:bg-navy hover:text-white">
            <div className="eyebrow-light">For sellers</div>
            <h3 className="m-0 font-serif text-[28px] font-medium leading-[1.2]">Sell for more, with less on your plate</h3>
            <p className="m-0 text-[15px] leading-[1.6] text-white/[0.82]">
              Pricing strategy, staging, professional media, and a launch plan built for the first ten days on market.
            </p>
            <span className="mt-auto text-[14px] font-bold text-champagne">See how we sell →</span>
          </Link>
        </div>
      </section>

    </>
  );
}
