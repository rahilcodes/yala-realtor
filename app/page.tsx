import Link from "next/link";
import { HeroSearch } from "@/components/home/HeroSearch";
import { ListingCard } from "@/components/ListingCard";
import { MapPanel } from "@/components/MapPanel";
import { Photo } from "@/components/Photo";
import { ValuationForm } from "@/components/ValuationForm";
import { getListings, getMarketStats, getPosts, getTestimonials, LIVE_LISTING_COUNT } from "@/lib/data";
import { num } from "@/lib/format";

const POPULAR = ["Irvine", "Newport Beach", "Tustin Ranch", "Laguna Niguel", "Great Park"];

export default async function HomePage() {
  const [featured, market, testimonials, posts] = await Promise.all([
    getListings({ limit: 6 }),
    getMarketStats(),
    getTestimonials(),
    getPosts(),
  ]);
  const hero = featured[0];
  const liveCount = num(LIVE_LISTING_COUNT);

  return (
    <>
      {/* HERO */}
      <section className="hero bg-gradient-to-b from-cloud to-white">
        <div className="hero-grid container-1200 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-x-10 gap-y-8">
          <div>
            <div className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white py-1.5 pl-2 pr-3 text-[12px] font-semibold text-slate">
              <span aria-hidden="true" className="inline-block h-2 w-2 flex-none rounded-full bg-success" />
              {liveCount} live listings · Orange County
            </div>
            <h1 className="hero-title font-serif font-medium leading-[1.06] tracking-[-0.02em] text-navy text-balance">
              Find your next home in Orange County.
            </h1>
            <p className="hero-lede max-w-[520px] leading-[1.55] text-slate-2">
              Search every MLS listing in real time, save searches, and get alerts the minute something new hits the market.
            </p>
            <HeroSearch />
            <div className="hero-popular flex flex-wrap items-center gap-2 text-[13px] font-semibold text-meta">
              Popular:
              {POPULAR.map((p) => (
                <Link key={p} href={`/listings?q=${encodeURIComponent(p)}`} className="chip text-navy">
                  {p}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/listings"
            aria-label="Open map search"
            className="hero-map relative block overflow-hidden rounded-2xl no-underline"
          >
            <MapPanel
              label="interactive map · IDX pins · Irvine"
              className="h-full min-h-[inherit]"
              pins={[
                { label: "$1.85M", x: "38%", y: "30%" },
                { label: "$2.4M", x: "62%", y: "22%" },
                { label: "$1.295M", x: "24%", y: "52%", highlight: true },
                { label: "$3.1M", x: "70%", y: "58%" },
              ]}
            />
            {hero && (
              <div className="absolute bottom-5 left-5 right-5 flex gap-3.5 rounded-xl bg-white p-3 shadow-float">
                <Photo label={hero.photo} className="min-h-[100px] w-[130px] flex-none rounded-lg" labelPosition="none" sizes="130px">
                  <span className="badge absolute left-2 top-2 rounded px-[7px] py-[3px] text-[10px]" style={{ background: hero.badgeBg, color: hero.badgeFg }}>
                    {hero.badge}
                  </span>
                </Photo>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="text-[21px] font-extrabold">{hero.priceFmt}</div>
                    <div className="text-[11px] font-semibold text-meta">MLS# {hero.mls}</div>
                  </div>
                  <div className="mt-1 text-[13.5px] font-semibold text-slate">
                    {hero.specs} · {hero.lotFmt} sqft lot
                  </div>
                  <div className="mt-1 text-[13px] text-slate-2">{hero.fullAddress}</div>
                  <div className="mt-2 text-[11.5px] font-medium text-meta">
                    {hero.type} · {hero.neighborhood} · Listed by {hero.listedBy}
                  </div>
                </div>
              </div>
            )}
          </Link>
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="container-1200 pt-[72px]">
        <div className="section-head">
          <div>
            <div className="eyebrow">Featured listings</div>
            <h2 className="h2 mt-2.5">New this week in Orange County</h2>
          </div>
          <Link href="/listings" className="btn-outline btn-44">
            View all {liveCount} listings →
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-[22px]">
          {featured.map((item, i) => (
            <ListingCard key={item.mls} item={item} priority={i < 3} />
          ))}
        </div>
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

      {/* MARKET STATS */}
      <section className="container-1200 pt-20">
        <div className="section-head">
          <div>
            <div className="eyebrow">Market pulse</div>
            <h2 className="h2 mt-2.5">Orange County, August 2026</h2>
          </div>
          <Link href="/blog" className="text-link">
            Read the full monthly report
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,190px),1fr))] gap-4">
          {market.map((m) => (
            <div key={m.label} className="rounded-[14px] border border-line bg-cloud px-6 py-[26px]">
              <div className="text-[13px] font-semibold text-meta">{m.label}</div>
              <div className="mt-2.5 font-serif text-[40px] font-medium leading-none tracking-[-0.02em]">{m.value}</div>
              <div className="mt-2.5 text-[12.5px] font-bold text-success">{m.delta}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-[12px] text-meta">Source: CRMLS, single-family and condo, Orange County. Placeholder figures until Phase 2 feed.</div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mt-20 bg-ivory">
        <div className="container-1200 py-[72px]">
          <div className="section-head mb-8">
            <div>
              <div className="eyebrow">Client stories</div>
              <h2 className="h2 mt-2.5">Represented personally, start to close</h2>
            </div>
            <div className="flex items-center gap-2.5 text-[14px] font-semibold text-slate">
              <span aria-hidden="true" className="tracking-[2px] text-gold">
                ★★★★★
              </span>
              <span className="sr-only">Five stars.</span>
              4.9 · 212 reviews on Google &amp; Zillow
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
            {testimonials.map((t) => (
              <figure key={t.name} className="m-0 flex flex-col gap-5 rounded-2xl border border-ivory-border bg-white px-7 py-[30px]">
                <blockquote className="m-0 font-serif text-[19px] italic leading-[1.5] text-navy">“{t.quote}”</blockquote>
                <figcaption className="mt-auto">
                  <div className="text-[14px] font-bold">{t.name}</div>
                  <div className="mt-[3px] text-[12.5px] font-medium text-meta">{t.meta}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* BUYER / SELLER PATHS */}
      <section className="container-1200 pt-20">
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

      {/* BLOG TEASERS */}
      <section className="container-1200 pb-[88px] pt-20">
        <div className="section-head">
          <div>
            <div className="eyebrow">Market insights</div>
            <h2 className="h2 mt-2.5">From the blog</h2>
          </div>
          <Link href="/blog" className="text-link">
            All articles
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[22px]">
          {posts.slice(0, 3).map((p) => (
            <Link key={p.slug} href={`/blog#${p.slug}`} className="flex flex-col gap-3 rounded-xl text-navy no-underline" style={{ outlineOffset: 4 }}>
              <Photo label={p.photo} className="aspect-[16/10] rounded-xl" sizes="(max-width: 700px) 100vw, 380px" />
              <div className="flex flex-wrap items-center gap-2.5 text-[11.5px] font-bold uppercase tracking-[0.1em] text-gold-deep">
                {p.cat}
                <span className="font-medium normal-case tracking-normal text-meta">
                  {p.date} · {p.read}
                </span>
              </div>
              <h3 className="m-0 font-serif text-[22px] font-medium leading-[1.25] text-pretty">{p.title}</h3>
              <p className="m-0 text-[14.5px] leading-[1.55] text-slate-2">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
