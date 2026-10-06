"use client";

import { useId, useState } from "react";
import { money } from "@/lib/format";

interface Props {
  price: number;
  hoa: number;
  /** Annual rate in percent. */
  rate?: number;
}

const TAX_RATE = 0.0105; // annual, of price
const INSURANCE = 180; // monthly
const TERM = 360; // months

/** Monthly payment with a down-payment slider (5–50%, step 5). */
export function PaymentEstimate({ price, hoa, rate = 6.1 }: Props) {
  const id = useId();
  const [down, setDown] = useState(20);

  const r = rate / 100 / 12;
  const loan = price * (1 - down / 100);
  const pi = (loan * r) / (1 - Math.pow(1 + r, -TERM));
  const payment = Math.round(pi + (price * TAX_RATE) / 12 + hoa + INSURANCE);
  const downAmt = Math.round((price * down) / 100);

  return (
    <section aria-labelledby={`${id}-h`} className="rounded-2xl border border-line bg-cloud p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 id={`${id}-h`} className="m-0 font-serif text-[26px] font-medium leading-[1.2]">
            Estimated payment
          </h2>
          <div className="mt-1.5 text-[13.5px] font-medium text-meta">
            {down}% down · 30-yr fixed · {rate}% · taxes, HOA &amp; insurance included
          </div>
        </div>
        <div className="text-[34px] font-extrabold tracking-[-0.02em]" aria-live="polite">
          {money(payment)}
          <span className="text-[14px] font-semibold text-meta">/mo</span>
        </div>
      </div>
      <div className="mt-[18px]">
        <label htmlFor={`${id}-down`} className="text-[13px] font-semibold text-slate">
          Down payment: <strong>{down}%</strong> ({money(downAmt)})
        </label>
        <input
          id={`${id}-down`}
          type="range"
          min={5}
          max={50}
          step={5}
          value={down}
          onChange={(e) => setDown(Number(e.target.value))}
          aria-valuetext={`${down} percent, ${money(downAmt)}`}
          className="range mt-2"
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-2.5">
        <a href="/pre-approval" className="btn-primary h-[46px]">
          Get pre-approved with C2 Financial
        </a>
        <span className="self-center text-[12.5px] font-medium text-meta">Estimate only. Not a commitment to lend.</span>
      </div>
    </section>
  );
}
