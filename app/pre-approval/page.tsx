import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm, type Field } from "@/components/forms/LeadForm";
import { Photo } from "@/components/Photo";
import { Icon } from "@/components/Icon";
import { LENDER, LINKS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get pre-approved with C2 Financial",
  description: `Pre-approval in 24 hours. Contact ${SITE.agentShortName}, mortgage consultant with C2 Financial, NMLS# ${SITE.agentNmls}.`,
};

const FIELDS: Field[] = [
  { kind: "text", name: "name", label: "Full name", required: true, autoComplete: "name" },
  { kind: "tel", name: "phone", label: "Phone", required: true, autoComplete: "tel" },
  { kind: "email", name: "email", label: "Email", required: true, autoComplete: "email", full: true },
  { kind: "select", name: "purchasePrice", label: "Target purchase price", options: ["Under $750K", "$750K – $1M", "$1M – $1.5M", "$1.5M – $2.5M", "$2.5M+", "Not sure yet"] },
  { kind: "select", name: "downPayment", label: "Down payment", options: ["Less than 5%", "5% – 10%", "10% – 20%", "20% or more", "Not sure yet"] },
  { kind: "select", name: "creditRange", label: "Estimated credit score", options: ["760+", "700 – 759", "640 – 699", "Below 640", "Not sure"] },
  { kind: "select", name: "timeline", label: "When are you buying?", options: ["0–3 months", "3–6 months", "6–12 months", "Just exploring"] },
  { kind: "select", name: "loanPurpose", label: "Loan purpose", options: ["Purchase", "Refinance", "Cash-out refinance", "Investment property"], full: true },
  { kind: "textarea", name: "message", label: "Anything else we should know?", placeholder: "e.g. First-time buyer, self-employed, relocating to Irvine…", rows: 3 },
  { kind: "checkbox", name: "firstTimeBuyer", label: "I'm a first-time homebuyer" },
];

const STEPS = [
  ["Share the basics", "Tell us your price range, timing, and goals. No hard credit pull to start the conversation."],
  ["Talk with Butchi", "A short call to review income, assets, and loan options: jumbo, conventional, FHA, and rate buydowns."],
  ["Get your letter", "Most clients receive a pre-approval within 24 hours of submitting documents, ready to back an offer."],
];

export default function PreApprovalPage() {
  return (
    <section className="container-1200 pb-[88px] pt-16">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-start gap-10">
        <div>
          <div className="eyebrow">Financing</div>
          <h1 className="h-display mt-3.5 text-balance" style={{ fontSize: "clamp(36px, 4.5vw, 52px)" }}>
            Pre-approval in 24 hours with {LENDER.name}
          </h1>
          <p className="mt-4 max-w-[560px] text-[17px] leading-[1.6] text-slate-2">
            Start your pre-approval with {SITE.agentShortName}, {LENDER.role.toLowerCase()} with {LENDER.name}. Your financing is coordinated with
            your home search and your offer, so you can move the moment the right home appears.
          </p>

          <div className="mt-8 flex items-center gap-4 rounded-2xl border border-border p-5">
            <Photo
              label={SITE.agentName}
              kind="portrait"
              tone="warm"
              src="/images/agent_portrait.jpg"
              labelPosition="none"
              className="h-16 w-16 flex-none rounded-full"
              sizes="64px"
            />
            <div className="min-w-0">
              <div className="text-[16px] font-bold">{SITE.agentName}</div>
              <div className="text-[13.5px] font-medium text-slate-2">
                {LENDER.role}, {LENDER.name} · NMLS# {SITE.agentNmls}
              </div>
              <div className="mt-1 flex flex-wrap gap-x-4 text-[14px] font-semibold">
                <a href={SITE.phoneHref} className="inline-flex min-h-11 items-center no-underline hover:underline">
                  {SITE.phone}
                </a>
                <a href={SITE.emailHref} className="inline-flex min-h-11 items-center break-all no-underline hover:underline">
                  {SITE.email}
                </a>
              </div>
            </div>
          </div>

          <ol className="m-0 mt-8 flex list-none flex-col gap-5 p-0">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="flex gap-4">
                <span aria-hidden="true" className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-navy font-serif text-[17px] text-champagne">
                  {i + 1}
                </span>
                <div>
                  <h2 className="m-0 text-[16px] font-bold">{t}</h2>
                  <p className="m-0 mt-1 text-[14.5px] leading-[1.6] text-slate-2">{d}</p>
                </div>
              </li>
            ))}
          </ol>

          <a
            href={LINKS.calhfa}
            target="_blank"
            rel="noopener"
            className="mt-8 flex items-start gap-3 rounded-2xl border border-ivory-border bg-ivory p-5 text-navy no-underline transition-colors hover:border-gold"
          >
            <Icon name="key" className="mt-0.5 h-6 w-6 flex-none text-gold-deep" />
            <span>
              <span className="block text-[15px] font-bold">First-time buyer? Explore CalHFA programs ↗</span>
              <span className="mt-1 block text-[13.5px] leading-[1.55] text-slate-2">
                Down-payment and closing-cost assistance from the California Housing Finance Agency. Ask Butchi whether you qualify.
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </span>
          </a>
        </div>

        <div className="rounded-[20px] bg-navy p-[clamp(16px,2.4vw,28px)] nav:sticky nav:top-24">
          <h2 className="m-0 mb-4 px-1 font-serif text-[26px] font-medium text-white">Start your pre-approval</h2>
          <LeadForm
            source="pre-approval"
            ariaLabel="Start your pre-approval"
            fields={FIELDS}
            submitLabel="Request my pre-approval"
            sentMessage="Thanks. Butchi will call you within one business hour to start your pre-approval."
            footnote={
              <>
                By submitting, you agree to be contacted by phone, text, or email about your financing. This is not a commitment to lend;
                all loans are subject to credit approval and underwriting. Never send your Social Security number through this form.
              </>
            }
          />
        </div>
      </div>

      <p className="mt-12 border-t border-hairline pt-6 text-[12px] leading-[1.65] text-meta">
        Mortgage services are provided through {LENDER.name}. {SITE.agentName}, {LENDER.role}, NMLS# {SITE.agentNmls}. Real estate services
        are provided by {SITE.brokerage}, CA DRE# {SITE.brokerageDre}. Equal Housing Opportunity. Pre-approval timing depends on receipt of
        complete documentation. Rates, terms, and program availability are subject to change without notice.{" "}
        <Link href="/contact" className="text-meta underline">
          Questions? Contact us.
        </Link>
      </p>
    </section>
  );
}
