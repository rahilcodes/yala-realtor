"use client";

import { useId } from "react";
import { useLeadForm } from "@/lib/leads";
import { FormStatus } from "@/components/FormStatus";

const WHEN = ["Within 3 months", "3–6 months", "6–12 months", "Just curious about value"];

/** Full valuation form on /sell#valuation. Address pre-fills from the hero search. */
export function SellValuationForm({ initialAddress = "" }: { initialAddress?: string }) {
  const id = useId();
  const { onSubmit, sending, sent, error } = useLeadForm("sell-valuation");
  return (
    <form onSubmit={onSubmit} aria-label="Free home valuation" className="flex flex-col gap-3 rounded-2xl bg-white p-6 text-navy shadow-panel">
      <div className="font-serif text-[24px] font-medium leading-[1.2]">Free home valuation</div>
      <FormStatus sent={sent} error={error} sentMessage="Thanks. Your written valuation will arrive within 24 hours." />
      {!sent && (
        <>
          <label htmlFor={`${id}-addr`} className="field">
            Property address
            <input
              id={`${id}-addr`}
              name="address"
              type="text"
              required
              defaultValue={initialAddress}
              autoComplete="street-address"
              placeholder="123 Street, Irvine, CA 92602"
              className="input h-[52px] text-[15px]"
            />
          </label>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-2.5">
            <label htmlFor={`${id}-name`} className="field">
              Name
              <input id={`${id}-name`} name="name" type="text" required autoComplete="name" className="input" />
            </label>
            <label htmlFor={`${id}-phone`} className="field">
              Phone
              <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" className="input" />
            </label>
          </div>
          <label htmlFor={`${id}-email`} className="field">
            Email
            <input id={`${id}-email`} name="email" type="email" required autoComplete="email" className="input" />
          </label>
          <label htmlFor={`${id}-when`} className="field">
            When are you thinking of selling?
            <select id={`${id}-when`} name="timeline" className="select">
              {WHEN.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
          <button type="submit" disabled={sending} className="btn-gold btn-54 w-full disabled:opacity-70">
            {sending ? "Sending…" : "Get my written valuation"}
          </button>
          <div className="text-center text-[12px] font-medium text-meta">Delivered within 24 hours. No obligation.</div>
        </>
      )}
    </form>
  );
}
