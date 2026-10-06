import type { Metadata } from "next";
import Link from "next/link";
import { DISCLOSURES, ESCROW_TIMELINE, LOCAL_MANDATES, PREP_CHECKLIST, SELL_STEPS } from "@/lib/sellersGuide";
import { LINKS, SITE } from "@/lib/site";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "The Ultimate Southern California Home Seller's Guide",
  description:
    "Six steps to a successful sale, California disclosure laws (TDS, SPQ, NHD), local mandates by county, a prep checklist, and the escrow timeline.",
};

const TOC = [
  ["steps", "The 6 steps"],
  ["disclosures", "Disclosure laws"],
  ["local", "Local mandates"],
  ["prep", "Prep checklist"],
  ["escrow", "Escrow & timelines"],
] as const;

export default function SellersGuidePage() {
  return (
    <article>
      <header className="bg-navy text-white">
        <div className="container-1200 grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-end gap-10 pb-14 pt-16">
          <div>
            <nav aria-label="Breadcrumb" className="flex gap-2 text-[13px] font-medium text-white/70">
              <Link href="/sell" className="inline-flex min-h-11 items-center text-white/70 no-underline hover:text-white">
                Sell
              </Link>
              <span aria-hidden="true" className="inline-flex min-h-11 items-center">
                /
              </span>
              <span aria-current="page" className="inline-flex min-h-11 items-center text-white">
                Seller&apos;s guide
              </span>
            </nav>
            <div className="eyebrow-light mt-2">Free seller&apos;s guide</div>
            <h1 className="mt-3.5 font-serif font-medium leading-[1.08] tracking-[-0.02em] text-balance" style={{ fontSize: "clamp(34px, 4.4vw, 54px)" }}>
              The Ultimate Southern California Home Seller&apos;s Guide
            </h1>
            <p className="mt-[18px] max-w-[600px] text-[17px] leading-[1.6] text-white/[0.82]">
              Selling a home in Southern California is an exciting milestone, but navigating our unique local market can feel overwhelming.
              From structural prep to complex state legal disclosures, a successful sale requires careful planning. This guide breaks the
              journey into simple, actionable steps to help maximize your property&apos;s value and secure a smooth escrow.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 nav:items-end">
            <a
              href={LINKS.sellersGuidePdf}
              download="YALA-SoCal-Sellers-Guide.pdf"
              className="btn focus-white h-[54px] rounded-[10px] bg-gold px-7 text-[15px] font-extrabold text-navy hover:bg-gold-hover"
            >
              Download the PDF · 3 pages
            </a>
            <Link href="/sell#valuation" className="btn h-[54px] rounded-[10px] border-[1.5px] border-white/30 px-7 text-[15px] font-bold text-white hover:border-white">
              Get a free home valuation
            </Link>
          </div>
        </div>
      </header>

      <nav aria-label="In this guide" className="sticky top-[76px] z-30 border-b border-line bg-white/[0.97] backdrop-blur">
        <ul className="container-1200 m-0 flex list-none gap-1 overflow-x-auto p-0 py-1 [scrollbar-width:none]">
          {TOC.map(([id, label]) => (
            <li key={id} className="flex-none">
              <a href={`#${id}`} className="inline-flex min-h-11 items-center rounded-lg px-3 text-[13.5px] font-semibold text-slate no-underline hover:bg-cloud hover:text-navy">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="steps" className="container-1200 scroll-mt-32 pt-16" aria-labelledby="steps-h">
        <div className="eyebrow">Step by step</div>
        <h2 id="steps-h" className="h2 mt-2.5">
          The 6 steps to a successful sale
        </h2>
        <ol className="m-0 mt-8 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4 p-0">
          {SELL_STEPS.map((s, i) => (
            <li key={s.title} className="flex gap-4 rounded-[14px] border border-border p-6">
              <span aria-hidden="true" className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-navy font-serif text-[18px] text-champagne">
                {i + 1}
              </span>
              <div>
                <h3 className="m-0 text-[16.5px] font-bold">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="m-0 mt-1.5 text-[14.5px] leading-[1.6] text-slate-2">{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="disclosures" className="mt-20 scroll-mt-32 bg-cloud" aria-labelledby="disc-h">
        <div className="container-1200 py-[72px]">
          <div className="max-w-[760px]">
            <div className="eyebrow">Legal</div>
            <h2 id="disc-h" className="h2 mt-2.5">
              Navigating California&apos;s strict disclosure laws
            </h2>
            <p className="mt-3 text-[16px] leading-[1.65] text-slate-2">
              In Southern California, a seller has an affirmative legal duty to disclose any &ldquo;material fact&rdquo; that could affect a
              reasonable buyer&apos;s decision or the property&apos;s value. Failing to properly execute these forms is a primary driver of
              post-sale real estate litigation. Sellers must complete the &ldquo;Big Three&rdquo; documentation packets:
            </p>
          </div>
          <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
            {DISCLOSURES.map((d) => (
              <div key={d.abbr} className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-7">
                <span className="self-start rounded-md bg-navy px-2.5 py-1 text-[12px] font-extrabold tracking-[0.08em] text-champagne">{d.abbr}</span>
                <h3 className="h3 m-0 text-[21px]">{d.name}</h3>
                <p className="m-0 text-[14.5px] leading-[1.65] text-slate-2">{d.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 rounded-xl border-l-4 border-gold bg-white px-5 py-4 text-[14.5px] leading-[1.6] text-slate">
            <strong className="text-navy">Note:</strong> once disclosures are formally delivered, the buyer receives a statutory right of
            cancellation (typically 3 to 5 days depending on the delivery method).
          </p>
        </div>
      </section>

      <section id="local" className="container-1200 scroll-mt-32 pt-20" aria-labelledby="local-h">
        <div className="max-w-[760px]">
          <div className="eyebrow">By region</div>
          <h2 id="local-h" className="h2 mt-2.5">
            Local Southern California mandates &amp; tax zones
          </h2>
          <p className="mt-3 text-[16px] leading-[1.65] text-slate-2">
            Beyond state laws, specific municipalities across the Southland enforce distinct local point-of-sale mandates that sellers must
            prepare for.
          </p>
        </div>
        <dl className="m-0 mt-8 overflow-hidden rounded-2xl border border-border">
          {LOCAL_MANDATES.map(([region, body], i) => (
            <div
              key={region}
              className={`grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-x-8 gap-y-2 px-6 py-5 nav:grid-cols-[260px_1fr] ${
                i % 2 ? "bg-cloud" : "bg-white"
              }`}
            >
              <dt className="text-[15.5px] font-bold text-navy">{region}</dt>
              <dd className="m-0 text-[14.5px] leading-[1.65] text-slate-2">{body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="prep" className="container-1200 scroll-mt-32 pt-20" aria-labelledby="prep-h">
        <div className="max-w-[760px]">
          <div className="eyebrow">Checklist</div>
          <h2 id="prep-h" className="h2 mt-2.5">
            High-impact property preparation
          </h2>
          <p className="mt-3 text-[16px] leading-[1.65] text-slate-2">
            First impressions dictate offer values. Focus efforts on high-impact, low-cost modifications rather than major,
            non-value-adding structural changes.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
          {PREP_CHECKLIST.map((g) => (
            <div key={g.area} className="rounded-2xl border border-ivory-border bg-ivory p-7">
              <h3 className="h3 m-0 text-[21px]">{g.area}</h3>
              <ul className="m-0 mt-4 flex list-none flex-col gap-3 p-0">
                {g.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[14.5px] leading-[1.55] text-slate">
                    <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-navy text-champagne">
                      <Icon name="check" className="h-3 w-3" />
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="escrow" className="container-1200 scroll-mt-32 pt-20" aria-labelledby="escrow-h">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] gap-10">
          <div>
            <div className="eyebrow">Contract</div>
            <h2 id="escrow-h" className="h2 mt-2.5">
              Understanding the escrow contract &amp; timelines
            </h2>
            <p className="mt-3 text-[16px] leading-[1.65] text-slate-2">
              The transaction operates around standard timelines set by the California Association of REALTORS® (C.A.R.) purchase
              agreement. Unless explicitly renegotiated, these are the default milestones.
            </p>
            <p className="mt-3 text-[16px] leading-[1.65] text-slate-2">
              <strong className="text-navy">Listing agreement:</strong> when initiating a sale via a Residential Listing Agreement, specific
              start and end dates must be explicitly stated to keep the contract valid.
            </p>
          </div>
          <ol className="relative m-0 list-none border-l-2 border-champagne p-0 pl-7">
            {ESCROW_TIMELINE.map((t) => (
              <li key={t.when} className="relative pb-7 last:pb-0">
                <span aria-hidden="true" className="absolute -left-[37px] top-1 h-4 w-4 rounded-full border-[3px] border-white bg-gold shadow-[0_0_0_2px_var(--color-champagne)]" />
                <div className="font-serif text-[22px] font-medium leading-none">{t.when}</div>
                <p className="m-0 mt-1.5 text-[14.5px] leading-[1.6] text-slate-2">{t.what}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-1200 mt-20 pb-[88px]" aria-labelledby="partner-h">
        <div
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-center gap-9 rounded-[20px] bg-navy text-white"
          style={{ padding: "clamp(28px, 4vw, 52px)" }}
        >
          <div>
            <div className="eyebrow-light">Partner with the SoCal experts</div>
            <h2 id="partner-h" className="mt-3 font-serif font-medium leading-[1.15] tracking-[-0.02em]" style={{ fontSize: "clamp(28px, 3vw, 38px)" }}>
              Ready to find out what your property is worth?
            </h2>
            <p className="mt-3 max-w-[540px] text-[16px] leading-[1.6] text-white/80">
              Every property in Southern California is unique, and neighborhood micro-markets move fast. At {SITE.brokerage}, we manage
              the complexities from start to finish so you stay protected from future liabilities while pocketing top dollar for your
              equity.
            </p>
            <p className="mt-4 text-[13px] leading-[1.6] text-white/65">
              {SITE.brokerage} · DRE# {SITE.brokerageDre} · {SITE.agentName}, DRE# {SITE.agentDre} · {SITE.phone} · {SITE.email}
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            <Link href="/sell#valuation" className="btn focus-white h-[54px] rounded-[10px] bg-gold text-[15px] font-extrabold text-navy hover:bg-gold-hover">
              Get my written valuation
            </Link>
            <Link href="/contact?role=Seller" className="btn h-[54px] rounded-[10px] border-[1.5px] border-white/30 text-[15px] font-bold text-white hover:border-white">
              Book a strategy consultation
            </Link>
          </div>
        </div>
        <p className="mt-5 text-[12px] leading-[1.6] text-meta">
          General information for Southern California sellers, not legal or tax advice. Requirements change and vary by city; confirm specifics
          with your agent, escrow officer, or attorney.
        </p>
      </section>
    </article>
  );
}
