"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Wordmark } from "@/components/Wordmark";

const LINKS = [
  { label: "Buy", href: "/buy" },
  { label: "Sell", href: "/sell" },
  { label: "Listings", href: "/listings" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

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
    const mq = window.matchMedia("(min-width: 1000px)");
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

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/[0.96] backdrop-blur-[10px]">
      <div className="container-1200 flex h-[76px] items-center justify-between gap-6">
        <Wordmark />

        {/* Desktop ≥ 1000px */}
        <nav aria-label="Primary" className="hidden gap-[30px] nav:flex">
          {LINKS.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`border-b-2 py-1.5 text-[14.5px] font-semibold no-underline transition-colors hover:text-navy ${
                  active ? "border-gold text-navy" : "border-transparent text-slate"
                }`}
                style={{ outlineOffset: 4 }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden flex-none items-center gap-2.5 nav:flex">
          <Link href="/sell#valuation" className="btn-outline btn-44">
            Get Home Valuation
          </Link>
          <Link href="/contact" className="btn-primary btn-44">
            Book Consultation
          </Link>
        </div>

        {/* Mobile < 1000px */}
        <div className="flex items-center gap-1.5 nav:hidden">
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
        className="flex flex-col border-t border-line bg-white px-6 pb-6 pt-2 nav:!hidden"
      >
        {LINKS.map((l) => {
          const active = isActive(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active ? "page" : undefined}
              className={`focus-inset flex min-h-[50px] items-center border-b border-[#F1F3F6] text-[17px] font-semibold no-underline ${
                active ? "text-navy" : "text-slate"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
        <div className="mt-[18px] flex flex-col gap-2.5">
          <Link href="/sell#valuation" className="btn-outline h-[50px] rounded-[10px] text-[15px]">
            Get Home Valuation
          </Link>
          <Link href="/contact" className="btn-primary h-[50px] rounded-[10px] text-[15px]">
            Book Consultation
          </Link>
          <a href="tel:9495221103" className="p-2.5 text-center text-[15px] font-semibold text-slate no-underline">
            Call (949) 522-1103
          </a>
        </div>
      </nav>
    </header>
  );
}
