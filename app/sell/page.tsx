import type { Metadata } from "next";
import Link from "next/link";
import { getRecentSales } from "@/lib/data";
import { money, num } from "@/lib/format";
import { LINKS, SITE, STATS } from "@/lib/site";
import { SELL_STEPS } from "@/lib/sellersGuide";
import { Steps } from "@/components/Steps";
import { SellValuationForm } from "@/components/sell/SellValuationForm";

export const metadata: Metadata = {
  title: "Sell your Southern California home",
  description: "A written home valuation within 24 hours, launch-week marketing, and negotiation handled personally by the broker.",
};

const PILLARS = [
  ["01", "Pricing built on data, not hope", "Three pricing bands modeled from closed comps, active competition, and absorption rate. You see the math before we pick a number."],
  ["02", "Launch-week marketing", "Professional photography, video, floor plans, and a pre-launch to our buyer list and agent network before day one on the MLS."],
  ["03", "Negotiation by the broker", "Every offer, counter, and repair request is handled personally by Butchi. Multiple-offer situations are run to maximize net, not just price."],
];

const ext = { target: "_blank", rel: "noopener" } as const;

export default async function SellPage({ searchParams }: PageProps<"/sell">) {
  const sp = await searchParams;
  const address = (Array.isArray(sp.address) ? sp.address[0] : sp.address) ?? "";
  const sales = await getRecentSales();

  return (
    <>
      <section id="valuation" className="scroll-mt-[76px] bg-navy text-white">
        <div className="container-1200 grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-12 pb-16 pt-[72px]">
          <div>
            <div className="eyebrow-light">For sellers</div>
            <h1 className="h-display mt-3.5 text-balance text-white">Sell for more, with less on your plate.</h1>
            <p className="mt-[18px] max-w-[520px] text-[17px] leading-[1.6] text-white/[0.82]">
              Start with a written valuation from Butchi, not an algorithm: comparable sales, condition, and current buyer demand for your
              street, within 24 hours.
            </p>
            <dl className="mt-9 flex flex-wrap gap-8">
              {[
                [STATS.volume, "Career sales volume"],
                [STATS.transactions, "Closed transactions"],
                [`${STATS.years} yrs`, "In the market"],
              ].map(([v, l]) => (
                <div key={l} className="flex flex-col-reverse">
                  <dt className="mt-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-white/70">{l}</dt>
                  <dd className="m-0 font-serif text-[32px] font-medium leading-none text-champagne">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <SellValuationForm initialAddress={address} />
        </div>
      </section>

      <section className="container-1200 pt-20">
        <div className="max-w-[640px]">
          <div className="eyebrow">Why list with YALA</div>
          <h2 className="h2 mt-2.5">The first ten days decide the price. We plan for them.</h2>
        </div>
        <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5">
          {PILLARS.map(([n, t, d]) => (
            <div key={n} className="flex flex-col gap-3 rounded-2xl border border-border p-7">
              <div className="font-serif text-[13px] font-medium uppercase tracking-[0.14em] text-gold-deep">{n}</div>
              <h3 className="h3 m-0">{t}</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-slate-2">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 bg-cloud" aria-labelledby="recent-sales">
        <div className="container-1200 py-[72px]">
          <div className="section-head">
            <div>
              <div className="eyebrow">Recent sales · represented buyer</div>
              <h2 id="recent-sales" className="h2 mt-2.5">
                Results this year
              </h2>
            </div>
            <p className="m-0 max-w-[360px] text-[14px] leading-[1.55] text-slate-2">
              Closed in 2026 with Butchi representing the buyer. Each links to the full MLS record on OneHome.
            </p>
          </div>
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5 p-0">
            {sales.map((s) => {
              const diff = s.listPrice - s.soldPrice;
              const pct = Math.round((s.soldPrice / s.listPrice) * 1000) / 10;
              return (
                <li key={s.mls}>
                  <a
                    href={s.url}
                    {...ext}
                    className="card-hover flex h-full flex-col gap-4 rounded-[14px] border border-border bg-white p-6 text-navy no-underline"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="badge bg-navy text-white">Sold · {s.side}</span>
                      <span className="text-[11px] font-semibold text-meta">MLS# {s.mls}</span>
                    </div>
                    <div>
                      <div className="text-[26px] font-extrabold leading-none tracking-[-0.01em]">{money(s.soldPrice)}</div>
                      <div className="mt-2 text-[13px] font-medium text-meta">Listed at {money(s.listPrice)}</div>
                    </div>
                    <div
                      className={`rounded-lg px-3 py-2 text-[13px] font-bold ${diff > 0 ? "bg-success-soft text-success-ink" : "bg-cloud text-slate"}`}
                    >
                      {diff > 0 ? `Bought ${money(diff)} under list (${pct}% of list)` : "Bought at list price"}
                    </div>
                    <div className="mt-auto">
                      <div className="text-[15px] font-semibold">
                        {s.address}, {s.city}, CA {s.zip}
                      </div>
                      <div className="mt-1 text-[13.5px] text-slate-2">
                        {s.type} · {s.beds} bd · {s.baths} ba · {num(s.sqft)} sqft
                      </div>
                    </div>
                    <span className="text-[13.5px] font-bold text-gold-deep">
                      View on OneHome ↗<span className="sr-only"> (opens in a new tab)</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="container-1200 pt-20" aria-labelledby="process">
        <div className="section-head">
          <div className="max-w-[640px]">
            <div className="eyebrow">The process</div>
            <h2 id="process" className="h2 mt-2.5">
              Six steps to a successful sale
            </h2>
          </div>
          <Link href="/sellers-guide" className="text-link">
            Read the full Seller&apos;s Guide
          </Link>
        </div>
        <Steps steps={SELL_STEPS.map((s, i) => ({ n: String(i + 1), t: s.title, d: s.short }))} />
      </section>

      {/* SELLER'S GUIDE */}
      <section className="container-1200 mt-20" aria-labelledby="guide">
        <div
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-center gap-9 rounded-[20px] bg-navy text-white"
          style={{ padding: "clamp(28px, 4vw, 52px)" }}
        >
          <div>
            <div className="eyebrow-light">Free download</div>
            <h2 id="guide" className="mt-3 font-serif font-medium leading-[1.15] tracking-[-0.02em]" style={{ fontSize: "clamp(28px, 3vw, 38px)" }}>
              The Ultimate Southern California Home Seller&apos;s Guide
            </h2>
            <p className="mt-3 max-w-[520px] text-[16px] leading-[1.6] text-white/80">
              The six steps to a successful sale, California&apos;s required disclosures, local mandates by county, a high-impact prep
              checklist, and the escrow timeline, in one short guide.
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            <Link href="/sellers-guide" className="btn focus-white h-[54px] rounded-[10px] bg-gold text-[15px] font-extrabold text-navy hover:bg-gold-hover">
              Read the guide online
            </Link>
            <a
              href={LINKS.sellersGuidePdf}
              download="YALA-SoCal-Sellers-Guide.pdf"
              className="btn h-[54px] rounded-[10px] border-[1.5px] border-white/30 bg-transparent text-[15px] font-bold text-white hover:border-white"
            >
              Download the PDF · 3 pages
            </a>
          </div>
        </div>
      </section>

      <section className="container-1200 mt-20 pb-[88px]">
        <div
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-center gap-9 rounded-[20px] border border-border bg-ivory"
          style={{ padding: "clamp(28px, 4vw, 48px)" }}
        >
          <div>
            <div className="eyebrow">Seller consultation</div>
            <h2 className="mt-3 font-serif font-medium leading-[1.15] tracking-[-0.02em]" style={{ fontSize: "clamp(28px, 3vw, 36px)" }}>
              Prefer to talk it through first?
            </h2>
            <p className="mt-3 max-w-[480px] text-[16px] leading-[1.6] text-slate-2">
              Book a no-pressure call with Butchi. Bring your questions about timing, prep, and net proceeds; leave with a clear plan and a
              written pricing range.
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            <Link href="/contact?role=Seller" className="btn-primary h-[54px] rounded-[10px] text-[15px] font-extrabold">
              Book a seller consultation
            </Link>
            <a href={SITE.phoneHref} className="btn-outline h-[54px] rounded-[10px] text-[15px]">
              Call {SITE.phone}
            </a>
            <a
              href={LINKS.sellersGuidePdf}
              download="YALA-SoCal-Sellers-Guide.pdf"
              className="inline-flex min-h-11 items-center justify-center p-1.5 text-center text-[13.5px] font-semibold underline underline-offset-[3px]"
            >
              Download the Seller&apos;s Guide (PDF)
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
