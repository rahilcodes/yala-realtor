"use client";

import { useState } from "react";
import { submitLead } from "@/lib/leads";

/** Save-search toggle: gold → green "✓ Search saved". Posts a lead on save. */
export function SaveSearchButton({ className = "" }: { className?: string }) {
  const [saved, setSaved] = useState(false);

  function toggle() {
    const next = !saved;
    setSaved(next);
    if (next) {
      void submitLead("listings-save-search", { search: typeof window !== "undefined" ? window.location.search : "" });
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={saved}
      className={`btn focus-navy h-[46px] rounded-[10px] px-4 text-[14px] font-bold transition-colors ${
        saved ? "bg-success text-white hover:bg-[#27895C]" : "bg-gold text-navy hover:bg-gold-hover"
      } ${className}`}
    >
      {saved ? "✓ Search saved" : "Save search"}
    </button>
  );
}
