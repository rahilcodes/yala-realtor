import Link from "next/link";
import type { Listing } from "@/types/listing";
import { Photo } from "@/components/Photo";
import { SaveHeart } from "@/components/SaveHeart";

interface Props {
  item: Listing;
  priority?: boolean;
}

/**
 * Shared listing card. Fields map 1:1 to RESO/IDX; badge color encodes status
 * (gold new, navy open house, green price drop, slate pending, gray sold).
 */
export function ListingCard({ item, priority }: Props) {
  const href = `/listings/${item.mls}`;
  return (
    <article className="card-hover relative flex h-full flex-col overflow-hidden rounded-[14px] border border-border bg-white">
      <Photo
        label={item.photo}
        className="aspect-[4/3]"
        priority={priority}
        sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 320px"
      >
        <span
          className="badge absolute left-3 top-3 shadow-badge"
          style={{ background: item.badgeBg, color: item.badgeFg }}
        >
          {item.badge}
        </span>
      </Photo>
      <SaveHeart mls={item.mls} address={item.address} className="absolute right-3 top-3 z-10" />
      <div className="flex flex-1 flex-col gap-[5px] px-[18px] pb-[18px] pt-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <Link href={href} className="text-[22px] font-extrabold text-navy no-underline after:absolute after:inset-0 after:content-['']">
            {item.priceFmt}
            <span className="sr-only">, {item.fullAddress}</span>
          </Link>
          <span className="text-[11px] font-semibold text-meta">MLS# {item.mls}</span>
        </div>
        <div className="text-[14px] font-semibold text-slate">{item.specs}</div>
        <div className="text-[14px] text-slate-2">{item.fullAddress}</div>
        <div className="mt-auto flex flex-wrap justify-between gap-2 pt-2 text-[12px] font-medium text-meta">
          <span>
            {item.type} · {item.neighborhood}
          </span>
          <span>{item.domLabel}</span>
        </div>
      </div>
    </article>
  );
}
