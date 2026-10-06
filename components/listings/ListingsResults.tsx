"use client";

import { useId, useMemo, useState } from "react";
import type { Listing, ListingSort } from "@/types/listing";
import { sortListings } from "@/lib/sort";
import { shortPrice, num } from "@/lib/format";
import { ListingCard } from "@/components/ListingCard";
import { MapPanel, type MapPin } from "@/components/MapPanel";
import { useLeadForm } from "@/lib/leads";

interface Props {
  listings: Listing[];
  initialSort: ListingSort;
}

const PIN_POS: Array<[number, number]> = [[36, 26], [58, 20], [22, 48], [70, 52], [46, 62], [30, 74], [64, 78], [50, 40]];

const SORT_OPTIONS: Array<[ListingSort, string]> = [
  ["new", "Newest"],
  ["asc", "Price: low to high"],
  ["desc", "Price: high to low"],
  ["sqft", "Largest sqft"],
];

/**
 * Results grid + map. The map is one element: a sticky right aside ≥1000px and
 * a full-width block above the results below that (via `order`).
 */
export function ListingsResults({ listings, initialSort }: Props) {
  const id = useId();
  const [sort, setSort] = useState<ListingSort>(initialSort);
  const [view, setView] = useState<"list" | "map">("map");

  const list = useMemo(() => sortListings(listings, sort), [listings, sort]);
  const pins: MapPin[] = list.slice(0, PIN_POS.length).map((l, i) => ({
    label: shortPrice(l.price),
    x: PIN_POS[i][0] + "%",
    y: PIN_POS[i][1] + "%",
    highlight: l.dom <= 1,
  }));

  const isMap = view === "map";
  const counties = new Set(listings.map((l) => l.county).filter(Boolean)).size;

  return (
    <div className="container-1400 flex flex-wrap items-start gap-6 pb-[72px] pt-5">
      {/* Map: full-width block above results below 1000px, sticky aside on desktop. */}
      {isMap && (
        <aside
          aria-label="Map"
          className="order-first w-full flex-[1_1_100%] nav:sticky nav:top-[150px] nav:order-last nav:h-[calc(100vh-170px)] nav:min-h-[480px] nav:w-auto nav:flex-[1_1_340px]"
        >
          <MapPanel label="map · draw-to-search · pins sync with cards" pins={pins} className="h-[360px] nav:h-full">
            <div className="absolute right-3.5 top-3 hidden flex-col gap-1.5 nav:flex">
              <button type="button" className="btn h-10 rounded-lg border border-border bg-white px-3 text-[12.5px] font-bold text-navy hover:border-navy">
                Draw
              </button>
              <button type="button" aria-label="Zoom in" className="btn h-10 w-10 rounded-lg border border-border bg-white text-[16px] font-bold text-navy hover:border-navy">
                +
              </button>
              <button type="button" aria-label="Zoom out" className="btn h-10 w-10 rounded-lg border border-border bg-white text-[16px] font-bold text-navy hover:border-navy">
                −
              </button>
            </div>
          </MapPanel>
        </aside>
      )}

      <div className="min-w-0 flex-[1_1_560px]">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="m-0 font-serif text-[26px] font-medium leading-[1.2] tracking-[-0.01em]">
              Featured homes across Southern California
            </h1>
            <div className="mt-1 text-[13.5px] font-medium text-meta">
              {num(listings.length)} featured homes in {counties} counties · use the search bar above for every new-construction community
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor={`${id}-sort`} className="text-[13px] font-semibold text-meta">
              Sort
            </label>
            <select
              id={`${id}-sort`}
              value={sort}
              onChange={(e) => setSort(e.target.value as ListingSort)}
              className="select h-11 w-auto rounded-lg px-2.5 text-[13.5px] font-semibold"
            >
              {SORT_OPTIONS.map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
            <div role="group" aria-label="View" className="inline-flex overflow-hidden rounded-lg border-[1.5px] border-border-input">
              {(["list", "map"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  aria-pressed={view === v}
                  className={`focus-inset h-11 cursor-pointer border-0 px-3.5 text-[13px] font-bold transition-colors ${
                    view === v ? "bg-navy text-white" : "bg-white text-navy hover:bg-cloud"
                  }`}
                >
                  {v === "list" ? "List" : "Map"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div aria-live="polite" className="sr-only">
          Sorted by {SORT_OPTIONS.find(([v]) => v === sort)?.[1]}. {list.length} listings shown.
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-5">
          {list.slice(0, 3).map((item, i) => (
            <ListingCard key={item.mls} item={item} priority={i < 2} />
          ))}
          <AlertsCard />
          {list.slice(3).map((item) => (
            <ListingCard key={item.mls} item={item} />
          ))}
        </div>

        <Pagination />

        <p className="mb-0 mt-7 text-[12px] leading-[1.6] text-meta">
          Based on information from California Regional Multiple Listing Service, Inc. as of today. This information is for your personal,
          non-commercial use and may not be used for any purpose other than to identify prospective properties you may be interested in
          purchasing. Display of MLS data is deemed reliable but is not guaranteed accurate by the MLS. IDX attribution placeholder.
        </p>
      </div>
    </div>
  );
}

function AlertsCard() {
  const id = useId();
  const { onSubmit, sending, sent, error } = useLeadForm("listings-alerts");
  return (
    <div className="flex min-h-[320px] flex-col justify-center gap-3 rounded-[14px] bg-navy p-7 text-white">
      <div className="eyebrow-light">Property alerts</div>
      <div className="font-serif text-[24px] font-medium leading-[1.2]">Get new Southern California listings the minute they hit the market.</div>
      <p className="m-0 text-[14px] leading-[1.55] text-white/80">Save this search and choose instant, daily, or weekly emails.</p>
      {sent ? (
        <p role="status" className="m-0 mt-1.5 rounded-lg bg-white/10 px-4 py-3 text-[14px] font-semibold text-champagne">
          Alerts on. We&apos;ll email you the moment something new matches.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-1.5 flex flex-col gap-2">
          <label htmlFor={`${id}-email`} className="sr-only">
            Email for alerts
          </label>
          <input id={`${id}-email`} name="email" type="email" required autoComplete="email" placeholder="you@email.com" className="input-dark h-[46px]" />
          <button type="submit" disabled={sending} className="btn focus-white h-[46px] rounded-lg bg-gold text-[14px] font-extrabold text-navy hover:bg-gold-hover disabled:opacity-70">
            {sending ? "Saving…" : "Save search & alert me"}
          </button>
          {error && (
            <p role="alert" className="m-0 text-[12.5px] font-medium text-[#F3B8B0]">
              {error}
            </p>
          )}
        </form>
      )}
    </div>
  );
}

function Pagination() {
  const page = "flex h-11 min-w-11 items-center justify-center rounded-lg no-underline";
  return (
    <nav aria-label="Pagination" className="mt-9 flex flex-wrap items-center justify-center gap-1.5 text-[14px] font-semibold">
      <span aria-disabled="true" className={`${page} border-[1.5px] border-border px-3.5 text-muted`}>
        ← Prev
      </span>
      <a href="?page=1" aria-current="page" className={`${page} bg-navy text-white`}>
        1
      </a>
      <a href="?page=2" className={`${page} hover:bg-cloud`}>
        2
      </a>
      <a href="?page=3" className={`${page} hover:bg-cloud`}>
        3
      </a>
      <span className="px-1 text-meta">…</span>
      <a href="?page=54" className={`${page} hover:bg-cloud`}>
        54
      </a>
      <a href="?page=2" className={`${page} border-[1.5px] border-border-input px-3.5 hover:border-navy`}>
        Next →
      </a>
    </nav>
  );
}
