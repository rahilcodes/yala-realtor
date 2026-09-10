import type { Metadata } from "next";
import { todayISO } from "@/lib/format";
import { ContactForm, type Role } from "@/components/contact/ContactForm";
import { Scheduler } from "@/components/contact/Scheduler";
import { MapPanel } from "@/components/MapPanel";

export const metadata: Metadata = {
  title: "Contact Butchi",
  description: "Call, email, or book a 30-minute consultation with YALA Realty & Associates in Irvine.",
};

const ROLES: Role[] = ["Buyer", "Seller", "Both", "Other"];

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const sp = await searchParams;
  const roleParam = (Array.isArray(sp.role) ? sp.role[0] : sp.role) ?? "";
  const role: Role = ROLES.includes(roleParam as Role) ? (roleParam as Role) : "Buyer";
  const today = todayISO();

  return (
    <section className="container-1200 pb-[88px] pt-16">
      <div className="max-w-[680px]">
        <div className="eyebrow">Contact</div>
        <h1 className="h-display mt-3.5 text-balance" style={{ fontSize: "clamp(36px, 4.5vw, 54px)" }}>
          Talk to Butchi.
        </h1>
        <p className="mt-4 text-[17px] leading-[1.6] text-slate-2">
          Call, email, or book a time below. Messages sent during business hours get a reply within one hour.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-8">
        <ContactForm initialRole={role} />

        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-[22px] rounded-[18px] border border-border p-[26px]">
            <div>
              <div className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-gold-deep">Phone</div>
              <a href="tel:9495221103" className="mt-1 inline-flex min-h-11 items-center text-[18px] font-bold no-underline hover:underline">
                (949) 522-1103
              </a>
              <div className="mt-0.5 text-[13px] font-medium text-meta">Call or text</div>
            </div>
            <div>
              <div className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-gold-deep">Email</div>
              <a href="mailto:butchi@yalarealty.com" className="mt-1 inline-flex min-h-11 items-center break-all text-[17px] font-bold no-underline hover:underline">
                butchi@yalarealty.com
              </a>
            </div>
            <div>
              <div className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-gold-deep">Office</div>
              <address className="mt-1.5 text-[15px] font-medium not-italic leading-[1.5]">
                12 Proclamation Way
                <br />
                Irvine, CA 92602
              </address>
            </div>
            <div>
              <div className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-gold-deep">Hours</div>
              <div className="mt-1.5 text-[15px] font-medium leading-[1.5]">
                Mon–Sat · 8am–7pm
                <br />
                Sun · by appointment
              </div>
            </div>
          </div>

          <Scheduler today={today} />

          <MapPanel label="12 Proclamation Way, Irvine" marker className="h-[260px] rounded-[18px]">
            <a
              href="https://maps.google.com/?q=12+Proclamation+Way+Irvine+CA+92602"
              target="_blank"
              rel="noreferrer"
              className="btn absolute bottom-3.5 right-3.5 h-11 rounded-lg bg-white px-3.5 text-[13px] font-bold text-navy shadow-btn hover:bg-cloud"
            >
              Get directions
            </a>
          </MapPanel>
        </div>
      </div>
    </section>
  );
}
