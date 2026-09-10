interface Step {
  n: string;
  t: string;
  d: string;
}

/** Numbered process steps (Buy / Sell pages). */
export function Steps({ steps }: { steps: Step[] }) {
  return (
    <ol className="m-0 mt-8 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))] gap-4 p-0">
      {steps.map((s) => (
        <li key={s.n} className="flex flex-col gap-2.5 rounded-[14px] border border-border p-6">
          <div aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-navy font-serif text-[17px] font-medium text-champagne">
            {s.n}
          </div>
          <h3 className="m-0 mt-1.5 text-[16px] font-bold">
            <span className="sr-only">Step {s.n}: </span>
            {s.t}
          </h3>
          <p className="m-0 text-[14px] leading-[1.55] text-slate-2">{s.d}</p>
        </li>
      ))}
    </ol>
  );
}
