"use client";

import { useId } from "react";
import { useLeadForm } from "@/lib/leads";
import { FormStatus } from "@/components/FormStatus";

/** Compact valuation capture used in the Home CTA panel. */
export function ValuationForm({ source }: { source: string }) {
  const id = useId();
  const { onSubmit, sending, sent, error } = useLeadForm(source);
  return (
    <form onSubmit={onSubmit} className="relative flex flex-col gap-2.5 rounded-[14px] bg-white p-3.5 text-navy">
      <FormStatus sent={sent} error={error} sentMessage="Thanks. Butchi will send your written range within 24 hours." />
      {!sent && (
        <>
          <label htmlFor={`${id}-addr`} className="sr-only">
            Property address
          </label>
          <input
            id={`${id}-addr`}
            name="address"
            type="text"
            required
            autoComplete="street-address"
            placeholder="Enter your home address"
            className="input h-[54px] px-4 text-[15.5px]"
          />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,140px),1fr))] gap-2.5">
            <div>
              <label htmlFor={`${id}-email`} className="sr-only">
                Email
              </label>
              <input id={`${id}-email`} name="email" type="email" required autoComplete="email" placeholder="Email" className="input h-[50px]" />
            </div>
            <div>
              <label htmlFor={`${id}-phone`} className="sr-only">
                Phone
              </label>
              <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" placeholder="Phone" className="input h-[50px]" />
            </div>
          </div>
          <button type="submit" disabled={sending} className="btn-gold btn-54 w-full disabled:opacity-70">
            {sending ? "Sending…" : "Get my free valuation"}
          </button>
          <div className="text-center text-[12px] font-medium text-meta">No obligation. Your details are never sold.</div>
        </>
      )}
    </form>
  );
}
