"use client";

import { useId, useMemo, useState } from "react";
import type { ListingDetail } from "@/types/listing";
import { upcomingDays } from "@/lib/format";
import { useLeadForm } from "@/lib/leads";
import { FormStatus } from "@/components/FormStatus";
import { Photo } from "@/components/Photo";

interface Props {
  listing: ListingDetail;
  /** ISO date from the server so the day tiles are deterministic across SSR/CSR. */
  today: string;
}

type Mode = "tour" | "ask";

/**
 * Agent card + segmented "Schedule a tour / Ask a question" form.
 * Tour mode shows a 4-day picker plus a native date input; the message is
 * pre-filled from the selection and stays editable until the user types.
 */
export function InquiryCard({ listing, today }: Props) {
  const id = useId();
  const [mode, setMode] = useState<Mode>("tour");
  const days = useMemo(() => upcomingDays(today, 4), [today]);
  const [date, setDate] = useState(days[0].iso);
  const [custom, setCustom] = useState<string | null>(null);

  const selected = days.find((d) => d.iso === date);
  const dateLabel = selected
    ? `${selected.month} ${selected.num}`
    : new Date(date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const defaultMessage =
    mode === "tour" ? `I'd like to tour ${listing.address} on ${dateLabel}.` : `I have a question about ${listing.address}.`;
  const message = custom ?? defaultMessage;

  const { onSubmit, sending, sent, error } = useLeadForm(mode === "tour" ? "property-tour" : "property-question", () => ({
    mls: listing.mls,
    address: listing.fullAddress,
    price: listing.priceFmt,
    requestType: mode,
    tourDate: mode === "tour" ? date : undefined,
  }));

  function pick(next: Mode) {
    setMode(next);
    setCustom(null);
  }
  function pickDate(iso: string) {
    setDate(iso);
    setCustom(null);
  }

  const a = listing.agent;

  return (
    <div className="overflow-hidden rounded-2xl border border-border shadow-card">
      <div className="flex items-center gap-3.5 border-b border-hairline px-5 py-[18px]">
        <Photo label="agent headshot" tone="warm" labelPosition="none" className="h-14 w-14 flex-none rounded-full" sizes="56px" />
        <div>
          <div className="text-[15px] font-bold">{a.name}</div>
          <div className="text-[12.5px] font-medium text-meta">
            Listing agent · {a.brokerage} · {a.dre}
          </div>
          <div className="mt-[3px] flex items-center gap-1.5 text-[12px] font-semibold">
            <span aria-hidden="true" className="tracking-[1px] text-gold">
              ★★★★★
            </span>
            <span className="sr-only">Five stars,</span>
            {a.rating} ({a.reviews})
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-2.5 px-5 pb-5 pt-[18px]">
        <div role="group" aria-label="Request type" className="seg grid-cols-2">
          <button type="button" onClick={() => pick("tour")} aria-pressed={mode === "tour"} className="seg-btn">
            Schedule a tour
          </button>
          <button type="button" onClick={() => pick("ask")} aria-pressed={mode === "ask"} className="seg-btn">
            Ask a question
          </button>
        </div>

        <FormStatus
          sent={sent}
          error={error}
          sentMessage={mode === "tour" ? "Tour requested. Butchi will confirm a time within the hour." : "Question sent. Expect a reply within one business hour."}
        />

        {!sent && (
          <>
            {mode === "tour" && (
              <fieldset className="m-0 min-w-0 border-0 p-0">
                <legend className="sr-only">Preferred tour date</legend>
                <div className="grid grid-cols-4 gap-1.5">
                  {days.map((d) => (
                    <button
                      key={d.iso}
                      type="button"
                      onClick={() => pickDate(d.iso)}
                      aria-pressed={date === d.iso}
                      aria-label={`${d.dow} ${d.month} ${d.num}`}
                      className="tile min-h-11 px-1 py-2.5 text-center text-[12px] font-bold leading-[1.3]"
                    >
                      {d.dow}
                      <br />
                      <span className="text-[16px]">{d.num}</span>
                    </button>
                  ))}
                </div>
                <label htmlFor={`${id}-date`} className="mt-2 flex items-center gap-2 text-[12.5px] font-semibold text-slate">
                  <span className="whitespace-nowrap">Or pick a date</span>
                  <input
                    id={`${id}-date`}
                    type="date"
                    min={days[0].iso}
                    value={date}
                    onChange={(e) => e.target.value && pickDate(e.target.value)}
                    className="input h-11 text-[13.5px]"
                  />
                </label>
              </fieldset>
            )}

            <label htmlFor={`${id}-name`} className="sr-only">
              Full name
            </label>
            <input id={`${id}-name`} name="name" type="text" required autoComplete="name" placeholder="Full name" className="input" />
            <label htmlFor={`${id}-email`} className="sr-only">
              Email
            </label>
            <input id={`${id}-email`} name="email" type="email" required autoComplete="email" placeholder="Email" className="input" />
            <label htmlFor={`${id}-phone`} className="sr-only">
              Phone
            </label>
            <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" placeholder="Phone" className="input" />
            <label htmlFor={`${id}-msg`} className="sr-only">
              Message
            </label>
            <textarea
              id={`${id}-msg`}
              name="message"
              rows={3}
              value={message}
              onChange={(e) => setCustom(e.target.value)}
              className="textarea"
            />
            <button type="submit" disabled={sending} className="btn-gold w-full disabled:opacity-70">
              {sending ? "Sending…" : mode === "tour" ? "Request this tour" : "Send question"}
            </button>
          </>
        )}

        <a href={a.phoneHref} className="inline-flex min-h-11 items-center justify-center p-1.5 text-center text-[14px] font-bold text-navy no-underline hover:underline">
          or call {a.phone}
        </a>
        <div className="text-[11.5px] leading-[1.5] text-meta">
          By submitting, you agree to be contacted by YALA Realty &amp; Associates about this property. No spam, ever.
        </div>
      </form>
    </div>
  );
}
