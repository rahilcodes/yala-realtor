import type { ReactNode } from "react";
import { Photo } from "@/components/Photo";

export interface MapPin {
  label: string;
  x: string;
  y: string;
  highlight?: boolean;
}

interface Props {
  label: string;
  pins?: MapPin[];
  className?: string;
  children?: ReactNode;
  ariaLabel?: string;
  /** Show a single centered location marker instead of price pins. */
  marker?: boolean;
}

/** Map placeholder (Phase 2: interactive IDX map). Pins are price chips. */
export function MapPanel({ label, pins = [], className = "", children, ariaLabel = "Map", marker }: Props) {
  const position = className.split(" ").includes("absolute") ? "" : "relative";
  return (
    <div role="img" aria-label={`${ariaLabel} placeholder: ${label}`} className={`${position} overflow-hidden rounded-2xl border border-border bg-map ${className}`}>
      <Photo label={label} kind="map" tone="map" src="/images/map_orange_county.jpg" labelPosition="none" className="absolute inset-0" sizes="(max-width: 1000px) 100vw, 40vw" />
      {pins.map((p, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`absolute rounded-md px-[9px] py-[5px] text-[12px] font-extrabold shadow-pin ${
            p.highlight ? "bg-gold text-navy" : "bg-navy text-white"
          }`}
          style={{ left: p.x, top: p.y }}
        >
          {p.label}
        </span>
      ))}
      {marker && (
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-navy shadow-[0_4px_12px_rgba(11,31,58,.4)]"
        />
      )}
      {children}
    </div>
  );
}
