import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { NewsletterForm } from "@/components/NewsletterForm";
import { LINKS as EXT, SITE } from "@/lib/site";

const EXPLORE = [
  ["Buy a home", "/buy"],
  ["Sell a home", "/sell"],
  ["Featured listings", "/listings"],
  ["The YALA Advantage", "/advantage"],
  ["Seller’s guide", "/sellers-guide"],
  ["About Butchi", "/about"],
  ["Market insights", "/blog"],
  ["Contact", "/contact"],
] as const;

const LEGAL = ["Privacy", "Terms", "Accessibility", "DMCA"];

function ComplianceLogo({ type, label }: { type: "eho" | "realtor" | "mls"; label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      title={label}
      className="flex h-11 w-11 items-center justify-center rounded border border-white/30 bg-white/5 p-1.5 text-white/80 transition-colors hover:border-gold hover:text-gold"
    >
      {type === "eho" && (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-full w-full">
          {/* House outline */}
          <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1v-9.5z" strokeLinecap="round" strokeLinejoin="round" />
          {/* Equal sign */}
          <line x1="8" y1="12" x2="16" y2="12" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="15.5" x2="16" y2="15.5" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
      {type === "realtor" && (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
          <path d="M4 3h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1zm5 4v10h2.5v-3.5h1.8l2.2 3.5H18l-2.6-4c1.2-.5 1.9-1.5 1.9-3 0-2-1.5-3-4-3H9zm2.5 2.2h1.8c.8 0 1.4.3 1.4 1s-.6 1-1.4 1H11.5V9.2z" />
        </svg>
      )}
      {type === "mls" && (
        <div className="flex flex-col items-center justify-center text-center leading-none">
          <span className="font-mono text-[10px] font-black tracking-widest text-white">MLS</span>
          <span className="text-[7px] font-semibold text-gold uppercase tracking-tighter">CRMLS</span>
        </div>
      )}
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
            <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.16em] text-champagne">Under one roof</div>
            <ul className="m-0 flex list-none flex-col p-0 text-[14.5px] font-medium">
              <li>
                <Link href="/" className="list-link text-white">
                  YALA Realty
                </Link>
              </li>
              <li>
                <Link href="/property-management" className="list-link text-white/[0.85] hover:text-white">
                  YALA Property Management
                </Link>
              </li>
              <li>
                <Link href="/pre-approval" className="list-link text-white/[0.85] hover:text-white">
                  Pre-approval with C2 Financial
                </Link>
              </li>
              <li>
                <a href={EXT.showingNew} target="_blank" rel="noopener" className="list-link text-white/[0.85] hover:text-white">
                  New home search ↗<span className="sr-only"> (opens in a new tab)</span>
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
              One email a month: Southern California prices, inventory, and the listings worth watching.
            </p>
            <NewsletterForm source="footer-newsletter" layout="stack" />
          </div>
        </div>

        {/* Compliance */}
        <div className="mt-14 flex flex-wrap items-start justify-between gap-x-8 gap-y-5 border-t border-white/[0.14] pt-6">
          <div className="flex flex-wrap items-center gap-3">
            <ComplianceLogo type="eho" label="Equal Housing Opportunity" />
            <ComplianceLogo type="realtor" label="REALTOR®" />
            <ComplianceLogo type="mls" label="CRMLS Multiple Listing Service" />
            <p className="m-0 max-w-[640px] text-[12px] leading-[1.6] text-white/[0.65]">
              {SITE.brokerage} · CA DRE# {SITE.brokerageDre}. {SITE.agentName}, Real Estate Broker · CA DRE# {SITE.agentDre} · NMLS#{" "}
              {SITE.agentNmls}; mortgage services through C2 Financial. Equal Housing Opportunity. Listing data provided by CRMLS; information
              deemed reliable but not guaranteed and should be independently verified. New-construction search courtesy of ShowingNew.
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
