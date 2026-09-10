import type { Metadata } from "next";
import Link from "next/link";
import { getNeighborhoods } from "@/lib/data";
import { Photo } from "@/components/Photo";
import { Steps } from "@/components/Steps";
import { BuyConsultForm } from "@/components/buy/BuyConsultForm";

export const metadata: Metadata = {
  title: "Buy a home in Orange County",
  description: "Buyer representation from pre-approval to keys, with early access to listings before they hit the portals.",
};

const STEPS = [
  ["1", "Consultation", "A 30-minute call to map budget, must-haves, neighborhoods, and timing."],
  ["2", "Pre-approval", "Coordinated with YALA Mortgage or your lender so offers are ready on day one."],
  ["3", "Search & alerts", "A saved MLS search with instant alerts, plus off-market and coming-soon homes."],
  ["4", "Tour & offer", "Private showings, a comp-based pricing model, and a negotiated offer strategy."],
  ["5", "Escrow to keys", "Inspections, appraisal, contingencies, and closing, managed end to end."],
].map(([n, t, d]) => ({ n, t, d }));

const RESOURCES = [
  {
    eyebrow: "Free download",
    title: "The Orange County Buyer's Guide (2026)",
    body: "28 pages: costs to expect, offer strategy, HOA and Mello-Roos checklists, inspection red flags.",
    cta: "Get the guide →",
    surface: "border-ivory-border bg-ivory hover:border-gold",
  },
  {
    eyebrow: "Financing",
    title: "Pre-approval in 24 hours with YALA Mortgage",
    body: "Jumbo, conventional, FHA, and buydown options, coordinated with your offer so you can move fast.",
    cta: "Start pre-approval →",
    surface: "border-line bg-cloud hover:border-navy",
  },
  {
    eyebrow: "First-time buyers",
    title: "CalHFA and down-payment assistance programs",
    body: "What you may qualify for in Orange County, and how it changes your offer.",
    cta: "See programs →",
    surface: "border-line bg-cloud hover:border-navy",
  },
];

export default async function BuyPage() {
  const hoods = await getNeighborhoods();
  return (
    <>
      <section className="bg-gradient-to-b from-cloud to-white">
        <div className="container-1200 grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-10 pb-14 pt-16">
          <div>
            <div className="eyebrow">For buyers</div>
            <h1 className="h-display mt-3.5 text-balance">Buying in Orange County, step by step, with a broker who answers.</h1>
            <p className="mt-[18px] max-w-[540px] text-[17px] leading-[1.6] text-slate-2">
              From pre-approval to keys, Butchi represents you personally: no hand-offs to a junior agent, no pressure, and early access to
              homes before they hit the portals.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#consult" className="btn-gold px-6">
                Book a buyer consultation
              </a>
              <Link href="/listings" className="btn-outline h-[52px] rounded-[10px] px-[22px] text-[15px]">
                Search MLS listings
              </Link>
            </div>
            <dl className="mt-9 flex flex-wrap gap-7">
              {[
                ["450+", "Closed transactions"],
                ["18 yrs", "In the CA market"],
                ["4.9★", "212 client reviews"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dd className="m-0 font-serif text-[30px] font-medium leading-none">{v}</dd>
                  <dt className="mt-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-meta">{l}</dt>
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

      <section className="container-1200 pt-20">
        <div className="section-head">
          <div>
            <div className="eyebrow">Neighborhood guides</div>
            <h2 className="h2 mt-2.5">Where our buyers are looking</h2>
          </div>
          <Link href="/listings" className="text-link">
            Browse all areas
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-5">
          {hoods.map((h) => (
            <Link
              key={h.name}
              href={`/listings?q=${encodeURIComponent(h.name)}`}
              className="flex flex-col overflow-hidden rounded-[14px] border border-border bg-white text-navy no-underline transition-shadow hover:shadow-card-hover"
            >
              <Photo label={h.photo} className="aspect-[4/3]" sizes="(max-width: 700px) 100vw, 300px" />
              <div className="flex flex-col gap-2 px-[18px] pb-[18px] pt-4">
                <h3 className="m-0 font-serif text-[22px] font-medium">{h.name}</h3>
                <div className="flex gap-3.5 text-[13px] font-semibold text-slate">
                  <span>
                    Median <strong className="font-extrabold">{h.median}</strong>
                  </span>
                  <span>
                    DOM <strong className="font-extrabold">{h.dom}</strong>
                  </span>
                </div>
                <p className="m-0 text-[13.5px] leading-[1.5] text-slate-2">{h.note}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-1200 pt-20">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
          {RESOURCES.map((r) => (
            <a key={r.title} href="#" className={`flex flex-col gap-2.5 rounded-2xl border p-7 text-navy no-underline transition-colors ${r.surface}`}>
              <div className="eyebrow">{r.eyebrow}</div>
              <h3 className="h3 m-0">{r.title}</h3>
              <p className="m-0 text-[14.5px] leading-[1.55] text-slate-2">{r.body}</p>
              <span className="mt-auto text-[14px] font-bold">{r.cta}</span>
            </a>
          ))}
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
