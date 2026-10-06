"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { LINKS } from "@/lib/site";
import { PlaceSuggestions } from "@/components/search/PlaceSuggestions";

const TABS = ["New Homes", "Move-in Ready", "Sell", "Home Value"] as const;
type Tab = (typeof TABS)[number];

export const PRICE_OPTIONS = ["Price: Any", "Under $750K", "$750K – $1M", "$1M – $1.5M", "$1.5M – $2.5M", "$2.5M+"];
export const BED_OPTIONS = ["Beds: Any", "2+", "3+", "4+", "5+"];
export const BATH_OPTIONS = ["Baths: Any", "2+", "3+", "4+"];

/**
 * Hero search.
 * New Homes / Move-in Ready: a plain GET form to /new-homes (works without JS), which resolves the
 * location and redirects to Butchi's ShowingNew results with filters applied, in a new tab.
 * Sell / Home Value: address field that routes to the on-site valuation form.
 */
export function HeroSearch() {
  const [tab, setTab] = useState<Tab>("New Homes");
  const router = useRouter();
  const id = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const isSearch = tab === "New Homes" || tab === "Move-in Ready";
  const placeholder = isSearch ? "City, ZIP, county, or community" : "Enter your home address";
  const ctaLabel = isSearch ? "Search new homes" : tab === "Sell" ? "Start my listing plan" : "Get my home value";

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    if (isSearch) return; // native GET to /new-homes in a new tab
    e.preventDefault();
    const q = String(new FormData(e.currentTarget).get("q") ?? "").trim();
    const params = new URLSearchParams();
    if (q) params.set("address", q);
    params.set("intent", tab === "Sell" ? "sell" : "value");
    router.push(`/sell?${params.toString()}#valuation`);
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
      action={isSearch ? "/new-homes" : undefined}
      method="get"
      target={isSearch ? "_blank" : undefined}
      rel={isSearch ? "noopener" : undefined}
      role="search"
      aria-label="Search homes"
      className="hero-form max-w-[620px] overflow-hidden rounded-[14px] border border-border bg-white shadow-card"
    >
      <div role="tablist" aria-label="Search type" className="grid grid-cols-2 gap-0.5 border-b border-hairline px-2 pt-2 min-[440px]:flex min-[440px]:flex-wrap">
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
              className={`hero-tab focus-inset min-h-11 cursor-pointer whitespace-nowrap rounded-md border-0 border-b-2 bg-transparent px-[clamp(10px,1.3vw,16px)] text-[14px] font-bold transition-colors ${
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
        {isSearch && <input type="hidden" name="status" value={tab === "Move-in Ready" ? "move-in" : "all"} />}
        <label htmlFor={`${id}-q`} className="sr-only">
          {isSearch ? "City, ZIP code, county, or community" : "Property address"}
        </label>
        <div className="hero-field flex items-center gap-3 rounded-[10px] border-[1.5px] border-border-input bg-white px-4 transition-colors focus-within:border-navy">
          <span aria-hidden="true" className="h-[18px] w-[18px] flex-none rounded-full border-2 border-navy" />
          <input
            id={`${id}-q`}
            name="q"
            type="text"
            placeholder={placeholder}
            list={isSearch ? `${id}-places` : undefined}
            autoComplete={isSearch ? "off" : "street-address"}
            enterKeyHint="search"
            className="h-full min-w-0 flex-1 self-stretch border-0 bg-transparent text-[15.5px] text-navy outline-none placeholder:text-meta focus-visible:outline-none"
          />
          {isSearch && <PlaceSuggestions id={`${id}-places`} />}
        </div>

        {isSearch && (
          <div className="mt-2.5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,118px),1fr))] gap-2.5">
            {(
              [
                ["price", "Price", PRICE_OPTIONS],
                ["beds", "Bedrooms", BED_OPTIONS],
                ["baths", "Bathrooms", BATH_OPTIONS],
              ] as const
            ).map(([name, label, opts]) => (
              <div key={name}>
                <label htmlFor={`${id}-${name}`} className="sr-only">
                  {label}
                </label>
                <select id={`${id}-${name}`} name={name} className="select hero-select px-3.5 text-[14px] font-semibold">
                  {opts.map((o) => (
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
          {isSearch ? (
            <a
              href={LINKS.showingNew}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center py-2 text-[13.5px] font-semibold text-slate underline underline-offset-[3px]"
            >
              Browse all SoCal new homes ↗<span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <Link href="/contact" className="inline-flex min-h-11 items-center py-2 text-[13.5px] font-semibold text-slate underline underline-offset-[3px]">
              Or talk to Butchi first
            </Link>
          )}
          <button type="submit" className="btn-gold hero-cta px-[30px] max-[440px]:w-full">
            {ctaLabel}
            {isSearch && <span className="sr-only"> (opens results in a new tab)</span>}
          </button>
        </div>
      </div>
    </form>
  );
}
