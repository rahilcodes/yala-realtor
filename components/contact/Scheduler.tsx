"use client";

import { useId, useMemo, useState } from "react";
import { upcomingDays } from "@/lib/format";
import { submitLead } from "@/lib/leads";

const SLOTS = ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM"];

/** 30-minute call picker: 5 upcoming days (Sundays skipped) × 6 time slots. */
export function Scheduler({ today }: { today: string }) {
  const id = useId();
  const days = useMemo(() => upcomingDays(today, 5, true), [today]);
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState(1);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const d = days[day];
  const label = `${d.dow} ${d.month} ${d.num} · ${SLOTS[slot]}`;

  async function book() {
    setState("sending");
    const res = await submitLead("contact-scheduler", { date: d.iso, time: SLOTS[slot], label });
    setState(res.ok ? "sent" : "error");
  }

  return (
    <div className="rounded-[18px] border border-border p-[26px]">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 id={`${id}-h`} className="m-0 font-serif text-[24px] font-medium leading-[1.2]">
          Book a 30-minute call
        </h2>
        <span className="text-[13px] font-medium text-meta">Pacific time</span>
      </div>

      {state === "sent" ? (
        <p role="status" className="mt-4 rounded-[10px] bg-success-soft px-4 py-3.5 text-[14px] font-semibold text-success-ink">
          Booked for {label}. A calendar invite is on its way.
        </p>
      ) : (
        <>
          <div role="group" aria-label="Day" className="mt-4 grid grid-cols-5 gap-1.5">
            {days.map((x, i) => (
              <button
                key={x.iso}
                type="button"
                onClick={() => setDay(i)}
                aria-pressed={day === i}
                aria-label={`${x.dow} ${x.month} ${x.num}`}
                className="tile min-h-11 px-0.5 py-2.5 text-center text-[12px] font-bold leading-[1.3]"
              >
                {x.dow}
                <br />
                <span className="text-[16px]">{x.num}</span>
              </button>
            ))}
          </div>
          <div role="group" aria-label="Time" className="mt-3 grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-1.5">
            {SLOTS.map((s, i) => (
              <button key={s} type="button" onClick={() => setSlot(i)} aria-pressed={slot === i} className="tile h-11 text-[13px] font-semibold">
                {s}
              </button>
            ))}
          </div>
          <button type="button" onClick={book} disabled={state === "sending"} className="btn-gold mt-3.5 h-[50px] w-full text-[14.5px] disabled:opacity-70">
            {state === "sending" ? "Booking…" : `Book ${label}`}
          </button>
          {state === "error" && (
            <p role="alert" className="mb-0 mt-2 text-[12.5px] font-medium text-error">
              Couldn&apos;t book that slot. Please try again or call (949) 522-1103.
            </p>
          )}
          <div className="mt-2 text-center text-[12px] text-meta">Scheduling placeholder; connects to Calendly/Google Calendar in build.</div>
        </>
      )}
    </div>
  );
}
