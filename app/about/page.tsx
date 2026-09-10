import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Wordmark } from "@/components/Wordmark";

export const metadata: Metadata = {
  title: "About Butchi Reddy Yalamuri",
  description: "Broker & Principal of YALA Realty & Associates. 450+ Orange County transactions since 2008.",
};

const STATS = [
  ["450+", "Transactions closed"],
  ["$620M", "Total sales volume"],
  ["18", "Years in the CA market"],
  ["4.9 ★", "212 verified reviews"],
];

const CREDS = [
  ["California Real Estate Broker License", "DRE #00000000"],
  ["REALTOR®, National Association of REALTORS®", "Since 2008"],
  ["Orange County REALTORS® member", "Active"],
  ["CRMLS participant (IDX/RETS)", "Active"],
  ["Certified Luxury Home Marketing Specialist (CLHMS)", "Placeholder"],
  ["Seniors Real Estate Specialist (SRES)", "Placeholder"],
];

const PRESS = ["OC Register", "Zillow Premier Agent", "RealTrends top agent", "Irvine Chamber", "Google 4.9★", "Yelp"];

const TEAM = [
  { n: "Associate Agent", r: "Buyer showings & tours", d: "DRE #00000000" },
  { n: "Transaction Coordinator", r: "Escrow, disclosures, timelines", d: "Placeholder" },
  { n: "Marketing Lead", r: "Listing media & launch campaigns", d: "Placeholder" },
];

export default function AboutPage() {
  return (
    <>
      <section className="container-1200 grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-12 pt-16">
        <div className="relative">
          <div aria-hidden="true" className="absolute -bottom-5 -right-5 left-5 top-5 rounded-lg border-[1.5px] border-gold" />
          <Photo
            label="Butchi Reddy Yalamuri, natural light"
            kind="portrait"
            tone="warm"
            src="/images/agent_portrait.jpg"
            labelPosition="none"
            className="aspect-[4/5] max-h-[600px] rounded-lg"
            priority
            sizes="(max-width: 800px) 100vw, 480px"
          />
        </div>
        <div>
          <div className="eyebrow">About</div>
          <h1 className="h-display mt-3.5 text-balance" style={{ fontSize: "clamp(36px, 4.5vw, 54px)" }}>
            Butchi Reddy Yalamuri
          </h1>
          <div className="mt-2.5 text-[15px] font-semibold text-meta">Broker &amp; Principal · YALA Realty &amp; Associates · CA DRE #00000000</div>
          <p className="mt-[22px] text-[17px] leading-[1.7] text-slate text-pretty">
            Butchi has represented Orange County buyers and sellers since 2008, closing more than 450 transactions across Irvine, Tustin,
            Newport Beach, and south county. An engineer by training, he built YALA around one idea: clients deserve the broker, not a
            hand-off. He runs every pricing model, negotiates every offer, and answers his own phone.
          </p>
          <p className="mt-4 text-[17px] leading-[1.7] text-slate text-pretty">
            YALA Realty is the flagship of a three-company group with YALA Mortgage and YALA Property Management, so financing, purchase,
            and long-term ownership can be handled under one roof. Butchi lives in Irvine with his family and has served on the Northwood
            Pointe HOA board.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-gold px-6">
              Book a consultation
            </Link>
            <a href="tel:9495221103" className="btn-outline h-[52px] rounded-[10px] px-[22px] text-[15px]">
              (949) 522-1103
            </a>
          </div>
        </div>
      </section>

      <section className="container-1200 mt-[72px]">
        <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-4">
          {STATS.map(([v, l]) => (
            <div key={l} className="rounded-[14px] bg-navy px-6 py-[26px] text-white">
              <dd className="m-0 font-serif text-[42px] font-medium leading-none text-champagne">{v}</dd>
              <dt className="mt-2.5 text-[12.5px] font-semibold uppercase tracking-[0.1em] text-white/75">{l}</dt>
            </div>
          ))}
        </dl>
        <div className="mt-2.5 text-[12px] text-meta">Career figures, 2008–2026. Placeholder values pending confirmation.</div>
      </section>

      <section className="container-1200 mt-20 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-10">
        <div>
          <div className="eyebrow">Credentials</div>
          <h2 className="h2-sm mb-5 mt-2.5">Licenses &amp; designations</h2>
          <ul className="m-0 flex list-none flex-col p-0">
            {CREDS.map(([t, m]) => (
              <li key={t} className="flex justify-between gap-4 border-b border-hairline py-3.5 text-[15px] font-medium">
                <span>{t}</span>
                <span className="whitespace-nowrap text-right text-meta">{m}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="eyebrow">Press &amp; awards</div>
          <h2 className="h2-sm mb-5 mt-2.5">Recognition</h2>
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3 p-0">
            {PRESS.map((p) => (
              <li
                key={p}
                className="flex h-[84px] items-center justify-center rounded-[10px] border border-border bg-cloud p-2.5 text-center font-mono text-[10.5px] uppercase leading-[1.4] tracking-[0.04em] text-meta"
              >
                [ logo: {p} ]
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-20 bg-ivory">
        <div className="container-1200 py-[72px]">
          <div className="max-w-[640px]">
            <div className="eyebrow">Team</div>
            <h2 className="h2 mt-2.5">The associates</h2>
            <p className="mt-3 text-[16px] leading-[1.6] text-slate-2">
              A small team so every client gets the broker. Associates handle showings, transaction coordination, and marketing so Butchi
              can stay on the phone with you.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-5">
            {TEAM.map((t) => (
              <div key={t.n} className="overflow-hidden rounded-[14px] border border-ivory-border bg-white">
                <Photo label="headshot" tone="warm" className="aspect-square" sizes="(max-width: 700px) 100vw, 280px" />
                <div className="px-[18px] pb-[18px] pt-4">
                  <div className="text-[16px] font-bold">{t.n}</div>
                  <div className="mt-[3px] text-[13px] font-medium text-meta">{t.r}</div>
                  <div className="mt-[3px] text-[12px] font-medium text-gold-deep">{t.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-1200 pb-[88px] pt-20">
        <div className="max-w-[640px]">
          <div className="eyebrow">The YALA group</div>
          <h2 className="h2 mt-2.5">Buy, finance, and manage under one roof</h2>
        </div>
        <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5">
          <Link href="/" className="flex flex-col gap-2.5 rounded-2xl bg-navy p-[30px] text-white no-underline">
            <Wordmark onDark size="card" href={null} />
            <p className="m-0 mt-3 text-[14.5px] leading-[1.55] text-white/[0.82]">Residential and luxury sales across Orange County. You are here.</p>
          </Link>
          <a href="#" className="flex flex-col gap-2.5 rounded-2xl border border-border bg-white p-[30px] text-navy no-underline transition-colors hover:border-navy">
            <Wordmark descriptor="Mortgage" size="card" href={null} />
            <p className="m-0 mt-3 text-[14.5px] leading-[1.55] text-slate-2">Pre-approvals, jumbo and conventional loans, rate buydowns. Launching soon.</p>
          </a>
          <a href="#" className="flex flex-col gap-2.5 rounded-2xl border border-border bg-white p-[30px] text-navy no-underline transition-colors hover:border-navy">
            <Wordmark descriptor="Property Management" size="card" href={null} />
            <p className="m-0 mt-3 text-[14.5px] leading-[1.55] text-slate-2">
              Leasing, tenant screening, and full-service management for Orange County owners. Launching soon.
            </p>
          </a>
        </div>
      </section>
    </>
  );
}
