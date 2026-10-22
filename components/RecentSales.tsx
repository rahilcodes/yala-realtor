import type { RecentSale } from "@/types/listing";
import { money, num } from "@/lib/format";

/** Closed sales cards (real MLS records, each linking to OneHome). Used on Home and Sell. */
export function RecentSales({ sales }: { sales: RecentSale[] }) {
  return (
    <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5 p-0">
      {sales.map((s) => {
        const diff = s.listPrice - s.soldPrice;
        const pct = Math.round((s.soldPrice / s.listPrice) * 1000) / 10;
        return (
          <li key={s.mls}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener"
              className="card-hover flex h-full flex-col gap-4 rounded-[14px] border border-border bg-white p-6 text-navy no-underline"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="badge bg-navy text-white">Sold · {s.side}</span>
                <span className="text-[11px] font-semibold text-meta">MLS# {s.mls}</span>
              </div>
              <div>
                <div className="text-[26px] font-extrabold leading-none tracking-[-0.01em]">{money(s.soldPrice)}</div>
                <div className="mt-2 text-[13px] font-medium text-meta">Listed at {money(s.listPrice)}</div>
              </div>
              <div className={`rounded-lg px-3 py-2 text-[13px] font-bold ${diff > 0 ? "bg-success-soft text-success-ink" : "bg-cloud text-slate"}`}>
                {diff > 0 ? `Bought ${money(diff)} under list (${pct}% of list)` : "Bought at list price"}
              </div>
              <div className="mt-auto">
                <div className="text-[15px] font-semibold">
                  {s.address}, {s.city}, CA {s.zip}
                </div>
                <div className="mt-1 text-[13.5px] text-slate-2">
                  {s.type} · {s.beds} bd · {s.baths} ba · {num(s.sqft)} sqft
                </div>
              </div>
              <span className="text-[13.5px] font-bold text-gold-deep">
                View on OneHome ↗<span className="sr-only"> (opens in a new tab)</span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
