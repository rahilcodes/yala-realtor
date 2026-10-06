import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Wordmark } from "@/components/Wordmark";
import { Icon, type IconName } from "@/components/Icon";
import { SITE, STATS } from "@/lib/site";

export const metadata: Metadata = {
  title: `About ${SITE.agentName}`,
  description: `${SITE.agentTitle}, CA DRE# ${SITE.agentDre}, NMLS# ${SITE.agentNmls}. A full-time Realtor serving Southern California for more than 10 years.`,
};

const STATS_ROW = [
  [STATS.transactions, "Transactions closed"],
  [STATS.volume, "Career sales volume"],
  [STATS.years, "Years in the market"],
  [`${STATS.rating.replace(".0", "")} ★`, `${STATS.reviews} client reviews`],
];

const CREDS = [
  ["California Real Estate Broker License", `DRE# ${SITE.agentDre}`],
  ["Mortgage Loan Originator, multi-state", `NMLS# ${SITE.agentNmls}`],
  [SITE.brokerage, `DRE# ${SITE.brokerageDre}`],
  ["Orange County REALTORS® (OCAR)", "Member"],
  ["California Association of REALTORS® (C.A.R.)", "Member"],
  ["National Association of REALTORS® (NAR)", "Member"],
];

const BACKGROUND: Array<{ icon: IconName; title: string; body: string }> = [
  {
    icon: "briefcase",
    title: "Engineer by training",
    body: "Dual master's degrees in civil engineering and computer science from India.",
  },
  {
    icon: "wrench",
    title: "15 years in construction",
    body: "Residential planning and construction in India before moving to the U.S., giving him a practical eye for condition, value, and potential.",
  },
  {
    icon: "users",
    title: "Community volunteer",
    body: "Past President of the Telugu Association of Southern California (TASC), supporting beach cleanups, food donations, and cultural events.",
  },
  {
    icon: "home",
    title: "20+ years in SoCal",
    body: "Lives in Irvine and enjoys its parks, plus walking, hiking, beach walks, and weekend trips to the mountains and desert with his family.",
  },
];

const TEAM = [
  { n: "Associate Agent", r: "Buyer showings & tours", d: "Licensed associate" },
  { n: "Transaction Coordinator", r: "Escrow, disclosures, timelines", d: "Transaction support" },
  { n: "Marketing Lead", r: "Listing media & launch campaigns", d: "Marketing" },
];

export default function AboutPage() {
  return (
    <>
      <section className="container-1200 grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-12 pt-16">
        <div className="relative nav:sticky nav:top-28">
          <div aria-hidden="true" className="absolute -bottom-5 -right-5 left-5 top-5 rounded-lg border-[1.5px] border-gold" />
          <Photo
            label={`${SITE.agentName}, natural light`}
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
          <div className="eyebrow">About · Realtor, Southern California</div>
          <h1 className="h-display mt-3.5 text-balance" style={{ fontSize: "clamp(36px, 4.5vw, 54px)" }}>
            {SITE.agentName}
          </h1>
          <div className="mt-2.5 text-[15px] font-semibold leading-[1.5] text-meta">
            {SITE.agentTitle} <span aria-hidden="true">|</span> CA DRE# {SITE.agentDre} <span aria-hidden="true">|</span> NMLS# {SITE.agentNmls}
          </div>
          <div className="mt-[22px] flex flex-col gap-4 text-[17px] leading-[1.7] text-slate text-pretty">
            <p className="m-0">
              Butchi Reddy Yalamuri is a full-time Realtor with more than 10 years of experience helping families, investors, and first-time
              buyers across Southern California. Having lived in the region for over 20 years, he knows it well, from the vibrant cities of
              Los Angeles County to the family neighborhoods of Orange County, including Irvine, and the growing markets of the Inland Empire
              and San Diego County.
            </p>
            <p className="m-0">
              Butchi specializes in residential sales, investment properties, and mortgage services. Clients value his clear, honest approach:
              realistic pricing, strong negotiation, and no surprises. Whether you&apos;re buying your first condo, selling a longtime family
              home, or building a rental portfolio, he takes the time to understand your goals and budget before making a recommendation. For
              Butchi, real estate is a service, not just a business.
            </p>
            <p className="m-0">
              He has guided hundreds of clients through the process, and most of his business now comes from referrals and repeat clients.
              Butchi holds dual master&apos;s degrees in civil engineering and computer science from India. Before moving to the United
              States, he spent 15 years in residential planning and construction in India, which gives him a practical eye for property
              condition, value, and potential. He holds a California DRE license and a multi-state MLO license, and is a member of OCAR, CAR,
              and NAR.
            </p>
            <p className="m-0">
              Butchi lives in Irvine, a master-planned city, and enjoys its parks and community feel. Outside of real estate, he is an active
              community volunteer and Past President of the Telugu Association of Southern California (TASC), supporting causes like beach
              cleanups, food donations, and cultural events. A fan of Southern California&apos;s mild climate, he enjoys walking, hiking,
              beach walks, and weekend trips to the mountains and desert with his family.
            </p>
          </div>
          <p className="mt-6 font-serif text-[22px] font-medium leading-[1.3] text-navy">Ready to buy, sell, or invest in Southern California? Let&apos;s talk.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-gold px-6">
              Book a consultation
            </Link>
            <a href={SITE.phoneHref} className="btn-outline h-[52px] rounded-[10px] px-[22px] text-[15px]">
              {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="container-1200 mt-[72px]" aria-label="Track record">
        <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-4">
          {STATS_ROW.map(([v, l]) => (
            <div key={l} className="flex flex-col-reverse rounded-[14px] bg-navy px-6 py-[26px] text-white">
              <dt className="mt-2.5 text-[12.5px] font-semibold uppercase tracking-[0.1em] text-white/75">{l}</dt>
              <dd className="m-0 font-serif text-[42px] font-medium leading-none text-champagne">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="container-1200 mt-20 grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-10">
        <div>
          <div className="eyebrow">Credentials</div>
          <h2 className="h2-sm mb-5 mt-2.5">Licenses &amp; memberships</h2>
          <ul className="m-0 flex list-none flex-col p-0">
            {CREDS.map(([t, m]) => (
              <li key={t} className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-b border-hairline py-3.5 text-[15px] font-medium">
                <span>{t}</span>
                <span className="text-right font-semibold text-gold-deep">{m}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="eyebrow">Background</div>
          <h2 className="h2-sm mb-5 mt-2.5">Experience &amp; community</h2>
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-3 p-0">
            {BACKGROUND.map((b) => (
              <li key={b.title} className="flex flex-col gap-2 rounded-[14px] border border-border bg-cloud p-5">
                <Icon name={b.icon} className="h-6 w-6 text-gold-deep" />
                <span className="text-[15px] font-bold">{b.title}</span>
                <span className="text-[13.5px] leading-[1.55] text-slate-2">{b.body}</span>
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
          <div className="eyebrow">The YALA Advantage</div>
          <h2 className="h2 mt-2.5">Buy, finance, and manage under one roof</h2>
        </div>
        <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5">
          <Link href="/advantage" className="flex flex-col gap-2.5 rounded-2xl bg-navy p-[30px] text-white no-underline hover:text-white">
            <Wordmark onDark size="card" href={null} />
            <p className="m-0 mt-3 text-[14.5px] leading-[1.55] text-white/[0.82]">
              Residential sales, investment properties, and new construction across Southern California. You are here.
            </p>
          </Link>
          <Link href="/pre-approval" className="flex flex-col gap-2.5 rounded-2xl border border-border bg-white p-[30px] text-navy no-underline transition-colors hover:border-navy">
            <div className="flex flex-col leading-none">
              <span className="font-sans text-[22px] font-extrabold tracking-[-0.01em]">C2 Financial</span>
              <span className="mt-[6px] text-[9.5px] font-bold uppercase tracking-[0.3em] text-gold-deep">Mortgage guidance</span>
            </div>
            <p className="m-0 mt-3 text-[14.5px] leading-[1.55] text-slate-2">
              Pre-approval in 24 hours with Butchi as your mortgage consultant. NMLS# {SITE.agentNmls}.
            </p>
          </Link>
          <Link
            href="/property-management"
            className="flex flex-col gap-2.5 rounded-2xl border border-border bg-white p-[30px] text-navy no-underline transition-colors hover:border-navy"
          >
            <Wordmark descriptor="Property Management" size="card" href={null} />
            <p className="m-0 mt-3 text-[14.5px] leading-[1.55] text-slate-2">
              Leasing, tenant screening, maintenance, and upgrades for Southern California rental owners.
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}
