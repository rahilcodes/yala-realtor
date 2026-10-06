import type { Metadata } from "next";
import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { Photo } from "@/components/Photo";
import { SITE, STATS } from "@/lib/site";

export const metadata: Metadata = {
  title: "The YALA Advantage",
  description:
    "A full-time Realtor, everything under one roof, service first. Buying, selling, mortgage guidance, property management, and upgrades with one trusted Southern California team.",
};

const PILLARS: Array<{ icon: IconName; title: string; body: string }> = [
  {
    icon: "clock",
    title: "Your full-time realtor, always there when you need us.",
    body:
      "Real estate isn't a side job for us. It's our full-time commitment, and we're available whenever you have a question, a concern, or a decision to make.",
  },
  {
    icon: "layers",
    title: "Everything under one roof.",
    body:
      "Buying, selling, mortgage guidance, property management, and property upgrades are all handled in one place. You work with one trusted team from start to finish instead of juggling multiple vendors.",
  },
  {
    icon: "heart",
    title: "A service first, a business second.",
    body: "We put your benefit ahead of everything else. Our success is measured by how well your needs are met, not by how quickly a deal closes.",
  },
  {
    icon: "compass",
    title: "Advice built around your life.",
    body:
      "Every client's situation is different. With years of experience behind us, we take the time to understand your family, finances, credit, career, and long-term goals. We weigh every factor, then recommend the property that truly fits your needs.",
  },
  {
    icon: "users",
    title: "Whether you're a first-time buyer or a seasoned investor, we're here to guide you.",
    body: "No matter where you are in your real estate journey, you'll have an experienced partner by your side at every step.",
  },
];

const ROOF: Array<{ icon: IconName; label: string; href: string; note: string }> = [
  { icon: "key", label: "Buying", href: "/buy", note: "Representation across five counties" },
  { icon: "home", label: "Selling", href: "/sell", note: "Written valuation within 24 hours" },
  { icon: "shield", label: "Mortgage guidance", href: "/pre-approval", note: "Pre-approval with C2 Financial" },
  { icon: "users", label: "Property management", href: "/property-management", note: "YALA Property Management" },
  { icon: "wrench", label: "Property upgrades", href: "/contact?topic=upgrades", note: "Prep, repairs, and improvements" },
];

export default function AdvantagePage() {
  return (
    <>
      <section className="bg-gradient-to-b from-cloud to-white">
        <div className="container-1200 grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-12 pb-16 pt-16">
          <div>
            <div className="eyebrow">The YALA Advantage</div>
            <h1 className="h-display mt-3.5 text-balance">One full-time team for every step of your real estate life.</h1>
            <p className="mt-[18px] max-w-[540px] text-[17px] leading-[1.6] text-slate-2">
              Buying, selling, financing, managing, and improving your property, handled by people who know you and answer the phone.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-gold px-6">
                Book a consultation
              </Link>
              <a href={SITE.phoneHref} className="btn-outline h-[52px] rounded-[10px] px-[22px] text-[15px]">
                Call {SITE.phone}
              </a>
            </div>
            <dl className="mt-9 flex flex-wrap gap-7">
              {[
                [STATS.transactions, "Closed transactions"],
                [`${STATS.years} yrs`, "In the market"],
                [STATS.volume, "Career sales volume"],
              ].map(([v, l]) => (
                <div key={l} className="flex flex-col-reverse">
                  <dt className="mt-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-meta">{l}</dt>
                  <dd className="m-0 font-serif text-[30px] font-medium leading-none">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <div aria-hidden="true" className="absolute -bottom-4 -right-4 left-4 top-4 rounded-2xl border-[1.5px] border-gold" />
            <Photo
              label={`${SITE.agentName}, natural light`}
              kind="portrait"
              tone="warm"
              src="/images/agent_portrait.jpg"
              labelPosition="none"
              className="aspect-[4/5] max-h-[560px] rounded-2xl"
              priority
              sizes="(max-width: 800px) 100vw, 480px"
            />
          </div>
        </div>
      </section>

      <section className="container-1200 pt-[72px]" aria-labelledby="why">
        <div className="max-w-[640px]">
          <div className="eyebrow">Why clients choose YALA</div>
          <h2 id="why" className="h2 mt-2.5">
            The difference is how we work
          </h2>
        </div>
        <ol className="m-0 mt-9 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,330px),1fr))] gap-5 p-0">
          {PILLARS.map((p, i) => (
            <li
              key={p.title}
              className={`flex flex-col gap-3.5 rounded-2xl p-7 ${i === 0 ? "bg-navy text-white lg:col-span-2" : "border border-border bg-white"}`}
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-full ${i === 0 ? "bg-white/10 text-champagne" : "bg-navy text-champagne"}`}>
                <Icon name={p.icon} className="h-[22px] w-[22px]" />
              </span>
              <h3 className={`m-0 font-serif text-[23px] font-medium leading-[1.25] ${i === 0 ? "text-white" : "text-navy"}`}>{p.title}</h3>
              <p className={`m-0 text-[15px] leading-[1.65] ${i === 0 ? "text-white/80" : "text-slate-2"}`}>{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20 bg-ivory" aria-labelledby="roof">
        <div className="container-1200 py-[72px]">
          <div className="max-w-[640px]">
            <div className="eyebrow">Everything under one roof</div>
            <h2 id="roof" className="h2 mt-2.5">
              One team from start to finish
            </h2>
            <p className="mt-3 text-[16px] leading-[1.6] text-slate-2">No juggling vendors. Pick where you are, and we&apos;ll take it from there.</p>
          </div>
          <ul className="m-0 mt-8 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-4 p-0">
            {ROOF.map((r) => (
              <li key={r.label}>
                <Link
                  href={r.href}
                  className="flex h-full flex-col gap-2.5 rounded-[14px] border border-ivory-border bg-white p-5 text-navy no-underline transition-colors hover:border-gold"
                >
                  <Icon name={r.icon} className="h-6 w-6 text-gold-deep" />
                  <span className="text-[16px] font-bold">{r.label}</span>
                  <span className="text-[13.5px] leading-[1.5] text-slate-2">{r.note}</span>
                  <span aria-hidden="true" className="mt-auto text-[14px] font-bold text-gold-deep">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-1200 mt-20 pb-[88px]">
        <div
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-center gap-9 rounded-[20px] bg-navy text-white"
          style={{ padding: "clamp(28px, 4vw, 52px)" }}
        >
          <div>
            <div className="eyebrow-light">Let&apos;s talk</div>
            <h2 className="mt-3 font-serif font-medium leading-[1.15] tracking-[-0.02em]" style={{ fontSize: "clamp(28px, 3vw, 38px)" }}>
              Ready to buy, sell, or invest in Southern California?
            </h2>
            <p className="mt-3 max-w-[480px] text-[16px] leading-[1.6] text-white/80">
              Start with a no-pressure conversation. We&apos;ll listen first, then recommend what truly fits.
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            <Link href="/contact" className="btn focus-white h-[54px] rounded-[10px] bg-gold text-[15px] font-extrabold text-navy hover:bg-gold-hover">
              Book a consultation
            </Link>
            <Link href="/pre-approval" className="btn h-[54px] rounded-[10px] border-[1.5px] border-white/30 text-[15px] font-bold text-white hover:border-white">
              Get pre-approved
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
