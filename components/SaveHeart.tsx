"use client";

import { useSavedListing } from "@/lib/saved";

interface Props {
  mls: string;
  address: string;
  className?: string;
}

/** Heart toggle on listing cards. 44px tap target, aria-pressed reflects state. */
export function SaveHeart({ mls, address, className = "" }: Props) {
  const [saved, toggle] = useSavedListing(mls);
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${address} from saved homes` : `Save ${address}`}
      className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 ${className}`}
    >
      <span
        aria-hidden="true"
        className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.94] text-[17px] shadow-badge transition-colors ${
          saved ? "text-error" : "text-navy"
        }`}
      >
        {saved ? "♥" : "♡"}
      </span>
    </button>
  );
}
