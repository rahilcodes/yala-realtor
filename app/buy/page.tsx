import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Steps } from "@/components/Steps";
import { Icon } from "@/components/Icon";
import { BuyConsultForm } from "@/components/buy/BuyConsultForm";
import { COUNTY_GUIDES, SOCAL_INTRO } from "@/lib/socal";
import { newHomesHref } from "@/lib/newHomeSearch";
import { LINKS, STATS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Buy a home in Southern California",
  description:
    "Buyer representation across Los Angeles, Orange, Riverside, San Bernardino, and San Diego counties, from pre-approval with C2 Financial to keys.",
};

const STEPS = [
  ["1", "Consultation", "A 30-minute call to map budget, must-haves, neighborhoods, and timing."],
  ["2", "Pre-approval", "Coordinated with C2 Financial or your lender so offers are ready on day one."],
  ["3", "Search & alerts", "A saved MLS search with instant alerts, plus new-construction, off-market, and coming-soon homes."],
  ["4", "Tour & offer", "Private showings, a comp-based pricing model, and a negotiated offer strategy."],
  ["5", "Escrow to keys", "Inspections, appraisal, contingencies, and closing, managed end to end."],
].map(([n, t, d]) => ({ n, t, d }));

const ext = { target: "_blank", rel: "noopener" } as const;

export default function BuyPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-cloud to-white">
        <div className="container-1200 grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-10 pb-14 pt-16">
          <div>
            <div className="eyebrow">For buyers</div>
            <h1 className="h-display mt-3.5 text-balance">Buying in Southern California, step by step, with a broker who answers.</h1>
            <p className="mt-[18px] max-w-[540px] text-[17px] leading-[1.6] text-slate-2">
              From pre-approval to keys, Butchi represents you personally: no hand-offs to a junior agent, no pressure, and early access to
              homes before they hit the portals.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#consult" className="btn-gold px-6">
                Book a buyer consultation
              </a>
              <a href={newHomesHref()} {...ext} className="btn-outline h-[52px] rounded-[10px] px-[22px] text-[15px]">
                Search new homes ↗<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
            <dl className="mt-9 flex flex-wrap gap-7">
              {[
                [STATS.transactions, "Closed transactions"],
                [`${STATS.years} yrs`, "In the market"],
                [`${STATS.rating.replace(".0", "")}★`, `${STATS.reviews} client reviews`],
              ].map(([v, l]) => (
                <div key={l} className="flex flex-col-reverse">
                  <dt className="mt-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-meta">{l}</dt>
                  <dd className="m-0 font-serif text-[30px] font-medium leading-none">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Photo label="family at front door, keys in hand" src="/images/buy_hero.jpg" labelPosition="none" className="min-h-[420px] rounded-[18px]" priority>
            <figure className="absolute bottom-5 left-5 right-5 m-0 flex items-center gap-3.5 rounded-xl bg-white px-[18px] py-4 shadow-float">
              <span aria-hidden="true" className="text-[15px] tracking-[2px] text-gold">
                ★★★★★
              </span>
              <blockquote className="m-0 font-serif text-[15px] italic leading-[1.45]">
                “He picked up every single call.”{" "}
                <cite className="text-[12.5px] font-semibold not-italic text-meta">Priya &amp; Arjun M., Woodbridge</cite>
              </blockquote>
            </figure>
          </Photo>
        </div>
      </section>

      <section className="container-1200 pt-[72px]">
        <div className="max-w-[640px]">
          <div className="eyebrow">How it works</div>
          <h2 className="h2 mt-2.5">Five steps from first call to closing</h2>
        </div>
        <Steps steps={STEPS} />
      </section>

      {/* NEIGHBORHOOD GUIDES: Southern California introduction */}
      <section className="mt-20 bg-ivory" aria-labelledby="socal-intro">
        <div className="container-1200 py-[72px]">
          <div className="max-w-[720px]">
            <div className="eyebrow">Neighborhood guides</div>
            <h2 id="socal-intro" className="h2 mt-2.5">
              Why Southern California
            </h2>
            <p className="mt-3 text-[16px] leading-[1.6] text-slate-2">
              Sunshine, coastline, mountains, and one of the strongest economies in the world, all within a day&apos;s drive.
            </p>
          </div>
          <div className="mt-9 grid grid-cols-[repeat(auto-fit,minmax(min(100%,330px),1fr))] gap-5">
            {SOCAL_INTRO.map((s, i) => {
              const accent = i === SOCAL_INTRO.length - 1;
              return (
              <article
                key={s.title}
                className={`flex flex-col gap-3 rounded-2xl p-7 ${accent ? "bg-navy text-white lg:col-span-2" : "border border-ivory-border bg-white"}`}
              >
                <span className={`flex h-11 w-11 items-center justify-center rounded-full ${accent ? "bg-white/10 text-champagne" : "bg-navy text-champagne"}`}>
                  <Icon name={s.icon} className="h-[22px] w-[22px]" />
                </span>
                <h3 className={`m-0 font-serif text-[22px] font-medium leading-[1.2] ${accent ? "text-white" : "text-navy"}`}>{s.title}</h3>
                <p className={`m-0 text-[15px] leading-[1.65] ${accent ? "max-w-[620px] text-white/80" : "text-slate-2"}`}>{s.body}</p>
                {accent && (
                  <div className="mt-2 flex flex-wrap gap-2.5">
                    <a href={newHomesHref()} {...ext} className="btn focus-white h-12 rounded-[10px] bg-gold px-5 text-[14.5px] font-extrabold text-navy hover:bg-gold-hover">
                      Search SoCal new homes ↗<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                    <a href="#consult" className="btn h-12 rounded-[10px] border-[1.5px] border-white/30 px-5 text-[14.5px] font-bold text-white hover:border-white">
                      Talk to Butchi
                    </a>
                  </div>
                )}
                {s.points && (
                  <ul className="m-0 mt-1 flex list-none flex-col gap-2 p-0 text-[14.5px] leading-[1.55] text-slate">
                    {s.points.map(([k, v]) => (
                      <li key={k} className="flex gap-2.5">
                        <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-gold" />
                        <span>
                          <strong className="font-bold text-navy">{k}:</strong> {v}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHERE OUR BUYERS ARE LOOKING: five counties */}
      <section className="container-1200 pt-20" aria-labelledby="counties">
        <div className="section-head">
          <div className="max-w-[640px]">
            <div className="eyebrow">Where our buyers are looking</div>
            <h2 id="counties" className="h2 mt-2.5">
              Five counties, one trusted team
            </h2>
          </div>
          <a href={newHomesHref()} {...ext} className="text-link">
            Browse all new homes ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-5">
          {COUNTY_GUIDES.map((c) => (
            <article key={c.county} className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-7 transition-shadow hover:shadow-card">
              <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-gold-deep">{c.tagline}</div>
              <h3 className="h3 m-0">{c.name}</h3>
              <p className="m-0 text-[14.5px] leading-[1.65] text-slate-2">{c.body}</p>
              <div className="mt-auto flex flex-col gap-3 pt-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[12.5px] font-semibold text-meta">New homes in</span>
                  {c.places.map((p) => (
                    <a key={p} href={newHomesHref(p)} {...ext} className="chip min-h-11 text-navy">
                      {p}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ))}
                </div>
                <a href={newHomesHref(c.name)} {...ext} className="btn-outline btn-44 self-start">
                  Search {c.name} ↗<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-1200 pt-20" aria-label="Buyer resources">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
          <Link
            href="/contact?role=Buyer&topic=buyers-guide"
            className="flex flex-col gap-2.5 rounded-2xl border border-ivory-border bg-ivory p-7 text-navy no-underline transition-colors hover:border-gold"
          >
            <div className="eyebrow">Free download</div>
            <h3 className="h3 m-0">The Southern California Buyer&apos;s Guide</h3>
            <p className="m-0 text-[14.5px] leading-[1.55] text-slate-2">
              Costs to expect, offer strategy, HOA and Mello-Roos checklists, and inspection red flags. Request your copy and we&apos;ll
              email it to you.
            </p>
            <span className="mt-auto text-[14px] font-bold">Request the guide →</span>
          </Link>
          <Link
            href="/pre-approval"
            className="flex flex-col gap-2.5 rounded-2xl border border-line bg-cloud p-7 text-navy no-underline transition-colors hover:border-navy"
          >
            <div className="eyebrow">Financing</div>
            <h3 className="h3 m-0">Pre-approval in 24 hours with C2 Financial</h3>
            <p className="m-0 text-[14.5px] leading-[1.55] text-slate-2">
              Contact Butchi Yalamuri, mortgage consultant with C2 Financial. Jumbo, conventional, FHA, and buydown options, coordinated
              with your offer so you can move fast.
            </p>
            <span className="mt-auto text-[14px] font-bold">Start pre-approval →</span>
          </Link>
          <a
            href={LINKS.calhfa}
            {...ext}
            className="flex flex-col gap-2.5 rounded-2xl border border-line bg-cloud p-7 text-navy no-underline transition-colors hover:border-navy"
          >
            <div className="eyebrow">First-time buyers</div>
            <h3 className="h3 m-0">CalHFA and down-payment assistance programs</h3>
            <p className="m-0 text-[14.5px] leading-[1.55] text-slate-2">
              The California Housing Finance Agency offers first-mortgage and down-payment assistance programs for first-time buyers. Ask
              Butchi how they could change your offer.
            </p>
            <span className="mt-auto text-[14px] font-bold">
              Visit calhfa.ca.gov ↗<span className="sr-only"> (opens in a new tab)</span>
            </span>
          </a>
        </div>
      </section>

      <section id="consult" className="container-1200 mt-20 scroll-mt-24 pb-[88px]">
        <div
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-10 rounded-[20px] bg-navy text-white"
          style={{ padding: "clamp(32px, 5vw, 64px)" }}
        >
          <div>
            <div className="eyebrow-light">Buyer consultation</div>
            <h2 className="mt-3 font-serif font-medium leading-[1.12] tracking-[-0.02em] text-balance" style={{ fontSize: "clamp(30px, 3.5vw, 42px)" }}>
              Tell us what you&apos;re looking for. We&apos;ll bring a plan.
            </h2>
            <p className="mt-3.5 max-w-[460px] text-[16px] leading-[1.6] text-white/80">
              A 30-minute call, phone or video. You&apos;ll leave with a realistic budget, target neighborhoods, and a saved MLS search with
              alerts.
            </p>
            <ul className="m-0 mt-6 flex list-none flex-col gap-2.5 p-0 text-[15px] font-medium text-white/90">
              {["No obligation, no agency agreement required", "Direct line to Butchi, not a call center", "Reply within one business hour"].map((t) => (
                <li key={t} className="flex gap-2.5">
                  <span aria-hidden="true" className="text-gold">
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <BuyConsultForm />
        </div>
      </section>
    </>
  );
}
