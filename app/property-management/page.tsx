import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm, type Field } from "@/components/forms/LeadForm";
import { Icon, type IconName } from "@/components/Icon";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "YALA Property Management",
  description:
    "Leasing, tenant screening, rent collection, maintenance coordination, and property upgrades for Southern California rental owners, from the YALA team.",
};

const SERVICES: Array<{ icon: IconName; title: string; body: string }> = [
  { icon: "key", title: "Leasing & marketing", body: "Pricing your rent to the market, listing photos, showings, and lease preparation." },
  { icon: "shield", title: "Tenant screening", body: "Applications, income and rental-history verification, and fair-housing-compliant screening." },
  { icon: "clock", title: "Rent collection & reporting", body: "On-time collection, owner statements, and a clear picture of how your property performs." },
  { icon: "wrench", title: "Maintenance & upgrades", body: "Coordinating repairs and value-adding upgrades with vetted local vendors." },
  { icon: "layers", title: "One team for the whole lifecycle", body: "Buy the rental, finance it, manage it, and sell it later, all with the same people." },
  { icon: "compass", title: "Investor guidance", body: "Advice on cash flow, rent growth, and when to add, refinance, or sell a property." },
];

const FIELDS: Field[] = [
  { kind: "text", name: "name", label: "Full name", required: true, autoComplete: "name" },
  { kind: "tel", name: "phone", label: "Phone", autoComplete: "tel" },
  { kind: "email", name: "email", label: "Email", required: true, autoComplete: "email", full: true },
  { kind: "text", name: "propertyAddress", label: "Property address or city", placeholder: "e.g. Irvine, CA", full: true },
  { kind: "select", name: "propertyType", label: "Property type", options: ["Single-family home", "Condo / townhome", "Duplex – fourplex", "5+ units", "Other"] },
  { kind: "select", name: "status", label: "Current status", options: ["Vacant", "Tenant-occupied", "Owner-occupied, moving out", "Buying a rental"] },
  { kind: "select", name: "service", label: "What do you need?", options: ["Full-service management", "Leasing only", "Upgrades / make-ready", "Not sure yet"], full: true },
  { kind: "textarea", name: "message", label: "Tell us about the property", rows: 3 },
];

export default function PropertyManagementPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-1200 grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-start gap-12 pb-16 pt-16">
          <div>
            <div className="flex flex-col leading-none">
              <span className="font-wordmark text-[34px] font-medium tracking-[0.22em]">YALA</span>
              <span className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-champagne">Property Management</span>
            </div>
            <h1 className="mt-7 font-serif font-medium leading-[1.08] tracking-[-0.02em] text-balance" style={{ fontSize: "clamp(34px, 4.4vw, 52px)" }}>
              Your rental, managed by the team that helped you buy it.
            </h1>
            <p className="mt-[18px] max-w-[520px] text-[17px] leading-[1.6] text-white/[0.82]">
              Property management for Southern California owners and investors: leasing, screening, rent collection, maintenance, and
              upgrades, coordinated by the YALA team you already know.
            </p>
            <ul className="m-0 mt-7 flex list-none flex-col gap-2.5 p-0 text-[15px] font-medium text-white/90">
              {["Full-time, local team", "Buying, selling, financing, and managing under one roof", "Clear owner reporting, no surprises"].map((t) => (
                <li key={t} className="flex gap-2.5">
                  <span aria-hidden="true" className="text-gold">
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[14px] text-white/70">
              Prefer to talk?{" "}
              <a href={SITE.phoneHref} className="font-bold text-white underline">
                {SITE.phone}
              </a>
            </p>
          </div>
          <div>
            <h2 className="m-0 mb-4 font-serif text-[26px] font-medium">Request a management consultation</h2>
            <LeadForm
              source="property-management"
              ariaLabel="Request a property management consultation"
              fields={FIELDS}
              submitLabel="Request a consultation"
              sentMessage="Thanks. We'll reach out within one business day to talk about your property."
              footnote="By submitting, you agree to be contacted by YALA about property management. We never sell your information."
            />
          </div>
        </div>
      </section>

      <section className="container-1200 pb-[88px] pt-[72px]" aria-labelledby="services">
        <div className="max-w-[640px]">
          <div className="eyebrow">Services</div>
          <h2 id="services" className="h2 mt-2.5">
            Everything a rental needs
          </h2>
        </div>
        <ul className="m-0 mt-8 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5 p-0">
          {SERVICES.map((s) => (
            <li key={s.title} className="flex flex-col gap-3 rounded-2xl border border-border p-7">
              <Icon name={s.icon} className="h-7 w-7 text-gold-deep" />
              <h3 className="h3 m-0 text-[21px]">{s.title}</h3>
              <p className="m-0 text-[14.5px] leading-[1.6] text-slate-2">{s.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-[15px] text-slate-2">
          Thinking about buying an investment property?{" "}
          <Link href="/advantage" className="font-bold">
            See the YALA Advantage
          </Link>{" "}
          or{" "}
          <Link href="/pre-approval" className="font-bold">
            get pre-approved
          </Link>
          .
        </p>
      </section>
    </>
  );
}
