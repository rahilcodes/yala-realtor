"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";

const TABS = ["Buy", "Rent", "Sell", "Home Value"] as const;
type Tab = (typeof TABS)[number];

const PRICE = ["Price: Any", "Under $1M", "$1M – $2M", "$2M – $4M", "$4M+"];
const BEDS = ["Beds: Any", "2+", "3+", "4+", "5+"];
const BATHS = ["Baths: Any", "2+", "3+", "4+"];

/**
 * Hero search. Buy/Rent show location + filters and route to /listings;
 * Sell / Home Value swap the field to an address and route to /sell#valuation.
 */
export function HeroSearch() {
  const [tab, setTab] = useState<Tab>("Buy");
  const router = useRouter();
  const id = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const isSearch = tab === "Buy" || tab === "Rent";
  const placeholder = isSearch ? "Irvine, CA · or neighborhood, ZIP, address, MLS #" : "Enter your home address";
  const moreLabel = isSearch ? "More filters · Home type, sqft, lot, HOA" : "Or talk to Butchi first";
  const moreHref = isSearch ? "/listings" : "/contact";
  const ctaLabel = isSearch ? "Search homes" : tab === "Sell" ? "Start my listing plan" : "Get my home value";

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const q = String(fd.get("q") ?? "").trim();
    if (isSearch) {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      params.set("status", tab === "Rent" ? "rent" : "sale");
      for (const key of ["price", "beds", "baths"]) {
        const v = String(fd.get(key) ?? "");
        if (v && !/Any$/.test(v)) params.set(key, v);
      }
      router.push(`/listings?${params.toString()}`);
    } else {
      const params = new URLSearchParams();
      if (q) params.set("address", q);
      params.set("intent", tab === "Sell" ? "sell" : "value");
      router.push(`/sell?${params.toString()}#valuation`);
    }
  }

  // Roving tabindex + arrow keys for the tablist.
  function onTabKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : e.key === "Home" ? -i : e.key === "End" ? TABS.length - 1 - i : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + TABS.length) % TABS.length;
    setTab(TABS[next]);
    tabRefs.current[next]?.focus();
  }

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      aria-label="Search homes"
      className="hero-form max-w-[620px] overflow-hidden rounded-[14px] border border-border bg-white shadow-card"
    >
      <div role="tablist" aria-label="Search type" className="flex flex-wrap gap-0.5 border-b border-hairline px-2 pt-2">
        {TABS.map((t, i) => {
          const selected = t === tab;
          return (
            <button
              key={t}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setTab(t)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={`hero-tab focus-inset min-h-11 cursor-pointer whitespace-nowrap rounded-md border-0 border-b-2 bg-transparent px-4 text-[14px] font-bold transition-colors ${
                selected ? "border-navy text-navy" : "border-transparent text-meta hover:text-navy"
              }`}
              style={{ borderRadius: "6px 6px 0 0" }}
            >
              {t}
            </button>
          );
        })}
      </div>
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${TABS.indexOf(tab)}`} className="hero-form-body">
        <label htmlFor={`${id}-q`} className="sr-only">
          {isSearch ? "Location" : "Property address"}
        </label>
        <div className="hero-field flex items-center gap-3 rounded-[10px] border-[1.5px] border-border-input bg-white px-4 transition-colors focus-within:border-navy">
          <span aria-hidden="true" className="h-[18px] w-[18px] flex-none rounded-full border-2 border-navy" />
          <input
            id={`${id}-q`}
            name="q"
            type="text"
            placeholder={placeholder}
            autoComplete={isSearch ? "off" : "street-address"}
            className="min-w-0 flex-1 border-0 bg-transparent text-[15.5px] text-navy outline-none placeholder:text-meta focus-visible:outline-none"
          />
        </div>

        {isSearch && (
          <div className="mt-2.5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,140px),1fr))] gap-2.5">
            {[
              ["price", "Price", PRICE],
              ["beds", "Beds", BEDS],
              ["baths", "Baths", BATHS],
            ].map(([name, label, opts]) => (
              <div key={name as string}>
                <label htmlFor={`${id}-${name}`} className="sr-only">
                  {label as string}
                </label>
                <select id={`${id}-${name}`} name={name as string} className="select hero-select px-3.5 text-[14px] font-semibold">
                  {(opts as string[]).map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <Link href={moreHref} className="inline-flex min-h-11 items-center py-2 text-[13.5px] font-semibold text-slate underline underline-offset-[3px]">
            {moreLabel}
          </Link>
          <button type="submit" className="btn-gold hero-cta px-[30px]">
            {ctaLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
