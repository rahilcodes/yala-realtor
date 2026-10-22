"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Visible lines before truncating (based on the content's line height). */
  lines?: number;
  className?: string;
  onDark?: boolean;
}

/**
 * Keeps cards compact: shows the first `lines` lines of content with an ellipsis fade, and a
 * "Read more…" toggle only when the content actually overflows. Works with paragraphs and lists.
 */
export function ClampBox({ children, lines = 4, className = "", onDark }: Props) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const [maxH, setMaxH] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const first = el.firstElementChild as HTMLElement | null;
      const lh = parseFloat(getComputedStyle(first ?? el).lineHeight) || 22;
      const limit = Math.round(lh * lines);
      setMaxH(limit);
      setOverflows(el.scrollHeight > limit + 2);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [lines]);

  const clamped = !open && overflows && maxH !== null;

  return (
    <div className={className}>
      <div
        id={id}
        ref={ref}
        className="relative overflow-hidden"
        style={clamped ? { maxHeight: maxH ?? undefined } : undefined}
      >
        {children}
        {clamped && (
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-7 bg-gradient-to-t ${onDark ? "from-navy" : "from-white"} to-transparent`}
          />
        )}
      </div>
      {overflows && (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className={`mt-1 inline-flex min-h-11 cursor-pointer items-center border-0 bg-transparent p-0 text-[13.5px] font-bold underline underline-offset-[3px] ${
            onDark ? "text-champagne" : "text-gold-deep"
          }`}
        >
          {open ? "Show less" : "Read more…"}
        </button>
      )}
    </div>
  );
}
