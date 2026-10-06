"use client";

import { useId } from "react";
import { SaveSearchButton } from "@/components/listings/SaveSearchButton";
import { PlaceSuggestions } from "@/components/search/PlaceSuggestions";
import { BATH_OPTIONS, BED_OPTIONS, PRICE_OPTIONS } from "@/components/home/HeroSearch";

interface Props {
  /** Location the visitor arrived with (e.g. from a popular-area link). */
  location: string;
}

/**
 * Sticky search bar under the nav. A plain GET form to /new-homes: the location and filters
 * carry over to Butchi's ShowingNew new-home search, opened in a new tab.
 */
export function FilterBar({ location }: Props) {
  const id = useId();
  return (
    <div className="sticky top-[76px] z-40 border-b border-line bg-white">
      <form
        action="/new-homes"
        method="get"
        target="_blank"
        rel="noopener"
        role="search"
        aria-label="Search new homes"
        className="container-1400 flex flex-wrap items-center gap-2 py-3"
      >
        <label htmlFor={`${id}-loc`} className="sr-only">
          City, ZIP code, county, or community
        </label>
        <div className="flex h-[46px] flex-[1_1_240px] items-center gap-2.5 rounded-[10px] border-[1.5px] border-border-input bg-white px-3.5 focus-within:border-navy">
          <span aria-hidden="true" className="h-4 w-4 flex-none rounded-full border-2 border-navy" />
          <input
            id={`${id}-loc`}
            name="q"
            type="text"
            defaultValue={location}
            placeholder="City, ZIP, county, or community"
            list={`${id}-places`}
            autoComplete="off"
            enterKeyHint="search"
            className="h-full min-w-0 flex-1 self-stretch border-0 bg-transparent text-[14.5px] font-semibold text-navy outline-none placeholder:font-medium placeholder:text-meta focus-visible:outline-none"
          />
          <PlaceSuggestions id={`${id}-places`} />
        </div>

        {(
          [
            ["status", "Home status", [["all", "All new homes"], ["move-in", "Move-in ready"]]],
            ["price", "Price", PRICE_OPTIONS.map((o) => [o, o])],
            ["beds", "Bedrooms", BED_OPTIONS.map((o) => [o, o === "Beds: Any" ? o : `${o} beds`])],
            ["baths", "Bathrooms", BATH_OPTIONS.map((o) => [o, o === "Baths: Any" ? o : `${o} baths`])],
          ] as const
        ).map(([name, label, opts]) => (
          <div key={name} className="flex-[1_1_130px] sm:flex-none">
            <label htmlFor={`${id}-${name}`} className="sr-only">
              {label}
            </label>
            <select id={`${id}-${name}`} name={name} className="select h-[46px] text-[14px] font-semibold sm:w-auto">
              {opts.map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        ))}

        <button type="submit" className="btn-primary h-[46px] rounded-[10px] px-4">
          Search new homes ↗<span className="sr-only"> (opens in a new tab)</span>
        </button>
        <SaveSearchButton className="ml-auto" />
      </form>
    </div>
  );
}
