"use client";

import { useId } from "react";
import { useLeadForm } from "@/lib/leads";
import { FormStatus } from "@/components/FormStatus";

const TIMELINE = ["0–3 months", "3–6 months", "6–12 months", "Just exploring"];
const RANGE = ["Under $1M", "$1M – $1.5M", "$1.5M – $2.5M", "$2.5M – $4M", "$4M+"];

export function BuyConsultForm() {
  const id = useId();
  const { onSubmit, sending, sent, error } = useLeadForm("buy-consultation");
  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3 rounded-[14px] bg-white p-[22px] text-navy"
      aria-label="Request a buyer consultation"
    >
      <div className="col-span-full">
        <FormStatus sent={sent} error={error} sentMessage="Request received. Butchi will reach out within one business hour to set a time." />
      </div>
      {!sent && (
        <>
          <label htmlFor={`${id}-name`} className="field">
            Full name
            <input id={`${id}-name`} name="name" type="text" required autoComplete="name" className="input" />
          </label>
          <label htmlFor={`${id}-phone`} className="field">
            Phone
            <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" className="input" />
          </label>
          <label htmlFor={`${id}-email`} className="field col-span-full">
            Email
            <input id={`${id}-email`} name="email" type="email" required autoComplete="email" className="input" />
          </label>
          <label htmlFor={`${id}-timeline`} className="field">
            Timeline
            <select id={`${id}-timeline`} name="timeline" className="select">
              {TIMELINE.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
          <label htmlFor={`${id}-range`} className="field">
            Price range
            <select id={`${id}-range`} name="priceRange" className="select">
              {RANGE.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
          <label htmlFor={`${id}-areas`} className="field col-span-full">
            Areas of interest
            <input id={`${id}-areas`} name="areas" type="text" placeholder="Irvine, Tustin Ranch, Newport Beach…" className="input" />
          </label>
          <label className="col-span-full flex items-center gap-2.5 text-[13.5px] font-medium text-slate">
            <input type="checkbox" name="alerts" value="yes" defaultChecked className="checkbox" />
            Email me new listings that match (unsubscribe anytime)
          </label>
          <button type="submit" disabled={sending} className="btn-gold btn-54 col-span-full disabled:opacity-70">
            {sending ? "Sending…" : "Request my consultation"}
          </button>
        </>
      )}
    </form>
  );
}
