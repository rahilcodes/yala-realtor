import Link from "next/link";

interface WordmarkProps {
  /** Descriptor line: sister brands swap only this. */
  descriptor?: string;
  onDark?: boolean;
  size?: "nav" | "footer" | "card";
  href?: string | null;
  className?: string;
}

const SIZES = {
  nav: { word: "text-[28px]", desc: "text-[9px]" },
  footer: { word: "text-[30px]", desc: "text-[9.5px]" },
  card: { word: "text-[26px]", desc: "text-[9.5px]" },
};

export function Wordmark({ descriptor = "Realty & Associates", onDark, size = "nav", href = "/", className = "" }: WordmarkProps) {
  const s = SIZES[size];
  const inner = (
    <>
      <span className={`font-wordmark font-medium leading-none tracking-[0.22em] ${s.word} ${onDark ? "text-white" : "text-navy"}`}>YALA</span>
      <span className={`mt-[5px] font-sans font-bold uppercase leading-none tracking-[0.3em] ${s.desc} ${onDark ? "text-champagne" : "text-gold-deep"}`}>
        {descriptor}
      </span>
    </>
  );
  const cls = `flex min-h-11 flex-none flex-col justify-center leading-none no-underline ${className}`;
  if (href === null) return <div className={cls}>{inner}</div>;
  return (
    <Link href={href} aria-label="YALA Realty & Associates — home" className={cls} style={{ outlineOffset: 4 }}>
      {inner}
    </Link>
  );
}
