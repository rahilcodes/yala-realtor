/** Client-supplied guidance for new-construction buyers (Rev2, item 1). */
export const NEW_HOME_NOTE =
  "If you're interested in purchasing a new construction home, please accompany your Realtor on your first visit to the builder's sales office. Most builders require your Realtor to register you during the initial visit for the Realtor to be recognized as your representative. After registration, you can typically visit the community and model homes on your own for future tours.";

interface Props {
  /** "compact": one line that expands (hero). "full": the whole note, always visible. */
  variant?: "compact" | "full";
  onDark?: boolean;
  className?: string;
}

/**
 * "Important" note shown wherever visitors start a new-home search.
 * The compact variant uses <details>, so it expands without JavaScript.
 */
export function NewHomeNote({ variant = "full", onDark, className = "" }: Props) {
  const tone = onDark ? "border-gold bg-white/[0.06] text-white/85" : "border-gold bg-ivory text-slate";
  const strong = onDark ? "text-champagne" : "text-navy";

  if (variant === "compact") {
    return (
      <details className={`group rounded-lg border-l-[3px] px-3 py-1.5 text-[12.5px] leading-[1.5] ${tone} ${className}`}>
        <summary className="flex min-h-9 cursor-pointer list-none items-center gap-1.5 [&::-webkit-details-marker]:hidden">
          <span>
            <strong className={`font-bold ${strong}`}>Important:</strong> bring your Realtor on your first builder visit.
          </span>
          <span className={`ml-auto flex-none font-bold underline underline-offset-2 ${strong} group-open:hidden`}>Read more</span>
          <span className={`ml-auto hidden flex-none font-bold underline underline-offset-2 ${strong} group-open:inline`}>Show less</span>
        </summary>
        <p className="m-0 pb-1.5 pt-0.5">{NEW_HOME_NOTE}</p>
      </details>
    );
  }

  return (
    <p role="note" className={`m-0 rounded-xl border-l-4 px-5 py-4 text-[14.5px] leading-[1.6] ${tone} ${className}`}>
      <strong className={`font-bold ${strong}`}>Important:</strong> {NEW_HOME_NOTE}
    </p>
  );
}
