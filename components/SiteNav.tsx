"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Wordmark } from "@/components/Wordmark";
import { LINKS as EXT, SITE } from "@/lib/site";

type NavLink = { label: string; href: string; external?: boolean };

const NAV: NavLink[] = [
  { label: "Buy", href: "/buy" },
  { label: "Sell", href: "/sell" },
  { label: "Listings", href: "/listings" },
  { label: "New Home Search", href: EXT.showingNew, external: true },
  { label: "YALA Advantage", href: "/advantage" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Full desktop menu needs ~1150px; below that the hamburger takes over. */
const MENU_QUERY = "(min-width: 1200px)";

function ExternalIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 12 12" className={`inline-block h-[0.7em] w-[0.7em] ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4.5 2.5h5v5M9.5 2.5 3 9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** "YALA / PROPERTY MANAGEMENT" sister-brand mark as a compact button. */
function PropertyMgmtButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/property-management"
      aria-label="YALA Property Management"
      className={`group inline-flex h-11 flex-none flex-col items-center justify-center rounded-lg border-[1.5px] border-border-input bg-white px-3.5 leading-none no-underline transition-colors hover:border-navy ${className}`}
    >
      <span className="font-wordmark text-[15px] font-medium tracking-[0.22em] text-navy">YALA</span>
      <span className="mt-[3px] text-[7.5px] font-bold uppercase tracking-[0.2em] text-gold-deep">Property Management</span>
    </Link>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);
  const menuId = useId();

  // Close the mobile menu on navigation (derived-state reset during render, no effect needed).
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }
  // Close it when the viewport grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia(MENU_QUERY);
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (l: NavLink) => !l.external && (pathname === l.href || pathname.startsWith(l.href + "/"));

  return (
    <>
      {/* Utility bar (desktop): licenses + direct contact. Scrolls away; the main bar stays sticky. */}
      <div className="hidden border-b border-line bg-cloud nav:block">
        <div className="container-1400 flex h-9 items-center justify-between gap-6 text-[12.5px] font-medium text-slate">
          <p className="m-0 truncate">
            Serving Los Angeles, Orange, Riverside, San Bernardino &amp; San Diego Counties
            <span className="mx-2 text-meta" aria-hidden="true">
              ·
            </span>
            <span className="text-meta">DRE# {SITE.brokerageDre}</span>
          </p>
          <div className="flex flex-none items-center gap-5">
            <a href={SITE.phoneHref} className="inline-flex h-9 items-center font-semibold text-navy no-underline hover:underline">
              {SITE.phone}
            </a>
            <a href={SITE.emailHref} className="inline-flex h-9 items-center text-slate no-underline hover:text-navy hover:underline">
              {SITE.email}
            </a>
            <Link href="/sell#valuation" className="inline-flex h-9 items-center font-bold text-gold-deep no-underline hover:underline">
              Free home valuation →
            </Link>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-line bg-white/[0.96] backdrop-blur-[10px]">
        <div className="container-1400 flex h-[76px] items-center justify-between gap-5">
          <Wordmark />

          {/* Desktop ≥ 1200px */}
          <nav aria-label="Primary" className="hidden items-center gap-[clamp(14px,1.6vw,26px)] menu:flex">
            {NAV.map((l) => {
              const active = isActive(l);
              const cls = `whitespace-nowrap border-b-2 py-1.5 text-[14.5px] font-semibold no-underline transition-colors hover:text-navy ${
                active ? "border-gold text-navy" : "border-transparent text-slate"
              }`;
              return l.external ? (
                <a key={l.href} href={l.href} target="_blank" rel="noopener" className={cls} style={{ outlineOffset: 4 }}>
                  {l.label} <ExternalIcon className="ml-0.5 align-[0.05em] text-gold-deep" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <Link key={l.href} href={l.href} aria-current={active ? "page" : undefined} className={cls} style={{ outlineOffset: 4 }}>
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <div className="hidden flex-none items-center gap-2.5 menu:flex">
            <PropertyMgmtButton />
            <Link href="/contact" className="btn-primary btn-44">
              Book Consultation
            </Link>
          </div>

          {/* Below 1200px */}
          <div className="flex items-center gap-1.5 menu:hidden">
            <Link href="/contact" className="btn-primary btn-44 px-3.5 text-[13px]">
              Consult
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls={menuId}
              className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-lg border-0 bg-transparent p-0"
            >
              <span className={`block h-0.5 w-5 bg-navy transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-navy transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-navy transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        <nav
          id={menuId}
          aria-label="Mobile"
          hidden={!open}
          className="max-h-[calc(100svh-76px)] overflow-y-auto border-t border-line bg-white menu:!hidden"
        >
          <div className="container-1400 flex flex-col pb-6 pt-2">
            {NAV.map((l) => {
              const active = isActive(l);
              const cls = `focus-inset flex min-h-[50px] items-center justify-between border-b border-[#F1F3F6] text-[17px] font-semibold no-underline ${
                active ? "text-navy" : "text-slate"
              }`;
              return l.external ? (
                <a key={l.href} href={l.href} target="_blank" rel="noopener" className={cls}>
                  <span>{l.label}</span>
                  <span className="flex items-center gap-1.5 text-[12.5px] font-semibold text-gold-deep">
                    ShowingNew <ExternalIcon />
                    <span className="sr-only">(opens in a new tab)</span>
                  </span>
                </a>
              ) : (
                <Link key={l.href} href={l.href} aria-current={active ? "page" : undefined} className={cls}>
                  {l.label}
                </Link>
              );
            })}
            <div className="mt-[18px] grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-2.5">
              <Link href="/contact" className="btn-primary h-[50px] rounded-[10px] text-[15px]">
                Book Consultation
              </Link>
              <Link href="/property-management" className="btn-outline h-[50px] rounded-[10px] text-[15px]">
                YALA Property Management
              </Link>
              <Link href="/sell#valuation" className="btn-outline h-[50px] rounded-[10px] text-[15px]">
                Get Home Valuation
              </Link>
              <Link href="/pre-approval" className="btn-outline h-[50px] rounded-[10px] text-[15px]">
                Get Pre-Approved
              </Link>
            </div>
            <a href={SITE.phoneHref} className="mt-2 p-2.5 text-center text-[15px] font-semibold text-slate no-underline">
              Call {SITE.phone}
            </a>
            <p className="m-0 text-center text-[12px] text-meta">
              {SITE.brokerage} · DRE# {SITE.brokerageDre}
            </p>
          </div>
        </nav>
      </header>
    </>
  );
}
