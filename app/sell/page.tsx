import type { Metadata } from "next";
import Link from "next/link";
import { getSoldListings } from "@/lib/data";
import { Photo } from "@/components/Photo";
import { Steps } from "@/components/Steps";
import { SellValuationForm } from "@/components/sell/SellValuationForm";

export const metadata: Metadata = {
  title: "Sell your Orange County home",
  description: "A written home valuation within 24 hours, launch-week marketing, and negotiation handled personally by the broker.",
};

const PILLARS = [
  ["01", "Pricing built on data, not hope", "Three pricing bands modeled from closed comps, active competition, and absorption rate. You see the math before we pick a number."],
  ["02", "Launch-week marketing", "Professional photography, video, floor plans, and a pre-launch to our buyer list and agent network before day one on the MLS."],
  ["03", "Negotiation by the broker", "Every offer, counter, and repair request is handled personally by Butchi. Multiple-offer situations are run to maximize net, not just price."],
];

const STEPS = [
  ["1", "Valuation", "Written pricing range with comps, delivered within 24 hours."],
  ["2", "Prep & staging", "Room-by-room prep list, vendor coordination, and staging where it pays back."],
  ["3", "Media & pre-launch", "Photos, video, floor plan, and a coming-soon push to buyers and agents."],
  ["4", "Live on MLS", "Syndicated to every major portal; open houses and private showings in week one."],
  ["5", "Offers to close", "Offer review, negotiation, escrow management, and a clean closing."],
].map(([n, t, d]) => ({ n, t, d }));

export default async function SellPage({ searchParams }: PageProps<"/sell">) {
  const sp = await searchParams;
  const address = (Array.isArray(sp.address) ? sp.address[0] : sp.address) ?? "";
  const sold = await getSoldListings();

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
                ["103%", "Avg. sale-to-list, 2026"],
                ["11 days", "Median time to accepted offer"],
                ["$620M", "Career sales volume"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dd className="m-0 font-serif text-[32px] font-medium leading-none text-champagne">{v}</dd>
                  <dt className="mt-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-white/70">{l}</dt>
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

      <section className="mt-20 bg-cloud">
        <div className="container-1200 py-[72px]">
          <div className="section-head">
            <div>
              <div className="eyebrow">Recent sales</div>
              <h2 className="h2 mt-2.5">Results from the last 90 days</h2>
            </div>
            <Link href="/about" className="text-link">
              Full sales record
            </Link>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
            {sold.map((s) => (
              <article key={s.mls} className="overflow-hidden rounded-[14px] border border-border bg-white">
                <Photo label={s.photo} className="aspect-video" sizes="(max-width: 700px) 100vw, 380px">
                  <span className="badge absolute left-3 top-3" style={{ background: s.badgeBg, color: s.badgeFg }}>
                    {s.badge}
                  </span>
                </Photo>
                <div className="px-[18px] pb-[18px] pt-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-[22px] font-extrabold">{s.priceFmt}</span>
                    <span className="text-[12px] font-bold text-success">{s.over}</span>
                  </div>
                  <div className="mt-1 text-[13px] font-medium text-meta">
                    Listed at {s.listPrice} · {s.specs}
                  </div>
                  <div className="mt-1 text-[14px] text-slate-2">{s.fullAddress}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-1200 pt-20">
        <div className="max-w-[640px]">
          <div className="eyebrow">The process</div>
          <h2 className="h2 mt-2.5">From valuation to closing</h2>
        </div>
        <Steps steps={STEPS} />
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
            <a href="tel:9495221103" className="btn-outline h-[54px] rounded-[10px] text-[15px]">
              Call (949) 522-1103
            </a>
            <a href="#" className="inline-flex min-h-11 items-center justify-center p-1.5 text-center text-[13.5px] font-semibold underline underline-offset-[3px]">
              Download the Seller&apos;s Guide (PDF)
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
