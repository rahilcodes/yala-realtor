import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { NewsletterForm } from "@/components/NewsletterForm";

const EXPLORE = [
  ["Buy a home", "/buy"],
  ["Sell a home", "/sell"],
  ["Search listings", "/listings"],
  ["About Butchi", "/about"],
  ["Market insights", "/blog"],
  ["Contact", "/contact"],
] as const;

const LEGAL = ["Privacy", "Terms", "Accessibility", "DMCA"];

function ComplianceLogo({ label, short }: { label: string; short: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded border-[1.5px] border-white/40 text-center font-mono text-[8px] font-bold leading-[1.1] text-white/70"
    >
      {short}
      <br />
      logo
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-1200 pb-7 pt-16">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-10">
          <div className="flex flex-col gap-[18px]">
            <Wordmark onDark size="footer" href={null} />
            <address className="text-[14px] font-normal not-italic leading-[1.7] text-white/[0.78]">
              12 Proclamation Way
              <br />
              Irvine, CA 92602
            </address>
            <div className="flex flex-col text-[14.5px] font-semibold">
              <a href="tel:9495221103" className="list-link text-white hover:text-champagne">
                (949) 522-1103
              </a>
              <a href="mailto:butchi@yalarealty.com" className="list-link text-white hover:text-champagne">
                butchi@yalarealty.com
              </a>
            </div>
            <div className="flex flex-wrap gap-4 text-[13px] font-semibold">
              {["Instagram", "Facebook", "LinkedIn", "YouTube"].map((s) => (
                <a key={s} href="#" className="list-link text-white/[0.78] hover:text-champagne">
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.16em] text-champagne">Explore</div>
            <ul className="m-0 flex list-none flex-col p-0 text-[14.5px] font-medium">
              {EXPLORE.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="list-link text-white/[0.85] hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.16em] text-champagne">YALA ecosystem</div>
            <ul className="m-0 flex list-none flex-col p-0 text-[14.5px] font-medium">
              <li>
                <Link href="/" className="list-link text-white">
                  YALA Realty
                </Link>
              </li>
              <li>
                <a href="#" className="list-link text-white/[0.85] hover:text-white">
                  YALA Mortgage <span className="ml-1.5 text-[10px] font-semibold tracking-[0.1em] text-champagne">SOON</span>
                </a>
              </li>
              <li>
                <a href="#" className="list-link text-white/[0.85] hover:text-white">
                  YALA Property Management <span className="ml-1.5 text-[10px] font-semibold tracking-[0.1em] text-champagne">SOON</span>
                </a>
              </li>
              <li className="mt-2">
                <Link href="/sell#valuation" className="list-link text-white/[0.85] hover:text-white">
                  Free home valuation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="list-link text-white/[0.85] hover:text-white">
                  Book a consultation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.16em] text-champagne">Market brief</div>
            <p className="mb-3.5 mt-0 text-[14px] leading-[1.6] text-white/[0.78]">
              One email a month: Orange County prices, inventory, and the listings worth watching.
            </p>
            <NewsletterForm source="footer-newsletter" layout="stack" />
          </div>
        </div>

        {/* Compliance */}
        <div className="mt-14 flex flex-wrap items-start justify-between gap-x-8 gap-y-5 border-t border-white/[0.14] pt-6">
          <div className="flex flex-wrap items-center gap-3">
            <ComplianceLogo label="Equal Housing Opportunity" short="EHO" />
            <ComplianceLogo label="REALTOR®" short="REALTOR" />
            <ComplianceLogo label="CRMLS" short="MLS" />
            <p className="m-0 max-w-[640px] text-[12px] leading-[1.6] text-white/[0.65]">
              Butchi Reddy Yalamuri · CA DRE #00000000 · YALA Realty &amp; Associates, CA DRE #00000000. Equal Housing Opportunity.
              Listing data provided by CRMLS; information deemed reliable but not guaranteed and should be independently verified. IDX
              display placeholder for Phase 2.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-[18px] text-[12.5px] font-medium">
            {LEGAL.map((l) => (
              <a key={l} href="#" className="list-link text-white/75 hover:text-white">
                {l}
              </a>
            ))}
            <span className="text-white/50">© 2026 YALA Realty &amp; Associates</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
