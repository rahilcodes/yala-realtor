"use client";

import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { SaveSearchButton } from "@/components/listings/SaveSearchButton";

interface Props {
  location: string;
  status: "sale" | "rent";
}

const STATUS = [
  ["sale", "For sale"],
  ["rent", "For rent"],
  ["sold", "Sold"],
  ["soon", "Coming soon"],
];
const PRICE = ["Price: Any", "Under $1M", "$1M – $2M", "$2M – $4M", "$4M+"];
const BB = ["Beds / Baths: 3+ / 2+", "Any", "2+ / 2+", "4+ / 3+"];
const TYPE = ["Home type: All", "Single Family", "Condo", "Townhouse", "Multi-family"];

/** Sticky filter bar under the nav. Submitting re-queries /listings. */
export function FilterBar({ location, status }: Props) {
  const id = useId();
  const router = useRouter();
  const [loc, setLoc] = useState(location);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    const q = String(fd.get("q") ?? "").trim();
    if (q) params.set("q", q);
    params.set("status", String(fd.get("status") ?? "sale"));
    router.push(`/listings?${params.toString()}`);
  }

  return (
    <div className="sticky top-[76px] z-40 border-b border-line bg-white">
      <form onSubmit={onSubmit} role="search" aria-label="Filter listings" className="container-1400 flex flex-wrap items-center gap-2 py-3">
        <label htmlFor={`${id}-loc`} className="sr-only">
          Location
        </label>
        <div className="flex h-[46px] flex-[1_1_260px] items-center gap-2.5 rounded-[10px] border-[1.5px] border-border-input bg-white px-3.5 focus-within:border-navy">
          <span aria-hidden="true" className="h-4 w-4 flex-none rounded-full border-2 border-navy" />
          <input
            id={`${id}-loc`}
            name="q"
            type="text"
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
            className="min-w-0 flex-1 border-0 bg-transparent text-[14.5px] font-semibold text-navy outline-none focus-visible:outline-none"
          />
          <button type="button" className="min-h-11 cursor-pointer whitespace-nowrap border-0 bg-transparent px-1 text-[12px] font-medium text-meta hover:text-navy">
            + add area
          </button>
        </div>

        <label htmlFor={`${id}-status`} className="sr-only">
          Listing status
        </label>
        <select id={`${id}-status`} name="status" defaultValue={status} className="select h-[46px] w-auto text-[14px] font-semibold">
          {STATUS.map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>

        {[
          ["price", "Price", PRICE],
          ["bb", "Beds and baths", BB],
          ["type", "Home type", TYPE],
        ].map(([name, label, opts]) => (
          <div key={name as string}>
            <label htmlFor={`${id}-${name}`} className="sr-only">
              {label as string}
            </label>
            <select id={`${id}-${name}`} name={name as string} className="select h-[46px] w-auto text-[14px] font-semibold">
              {(opts as string[]).map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        ))}

        <button type="button" className="btn-outline h-[46px] rounded-[10px] px-3.5 font-semibold">
          More filters
          <span aria-label="2 active" className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-navy px-1.5 text-[11px] font-extrabold text-white">
            2
          </span>
        </button>

        <button type="submit" className="sr-only focus:not-sr-only">
          Apply filters
        </button>

        <SaveSearchButton className="ml-auto" />
      </form>
    </div>
  );
}
