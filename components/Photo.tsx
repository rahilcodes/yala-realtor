import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

type Tone = "cool" | "warm" | "map";

const TONES: Record<Tone, { fill: string; label: string }> = {
  cool: { fill: "#D5DCE6", label: "text-slate-2" },
  warm: { fill: "#E2D9CA", label: "text-sand-deep" },
  map: { fill: "#EDF0F5", label: "text-meta" },
};

/** Solid, neutral placeholder image as a data URI (no stripes). */
function placeholderSrc(fill: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="12"><rect width="16" height="12" fill="${fill}"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export interface PhotoProps {
  /** Photo description from the design; used as alt text and visible label. */
  label: string;
  /** Prefix in the visible label, e.g. "photo", "map", "portrait". */
  kind?: string;
  tone?: Tone;
  /** Real image source (Phase 2). Falls back to a neutral placeholder. */
  src?: string;
  className?: string;
  style?: CSSProperties;
  labelPosition?: "bottom" | "top" | "none";
  sizes?: string;
  priority?: boolean;
  children?: ReactNode;
}

/**
 * Placeholder imagery component. Renders next/image over a neutral fill and a
 * small mono caption with the photo description from the design, so real
 * photography can be dropped in via `src` without changing layouts.
 */
export function Photo({
  label,
  kind = "photo",
  tone = "cool",
  src,
  className = "",
  style,
  labelPosition = "bottom",
  sizes = "(max-width: 1000px) 100vw, 50vw",
  priority,
  children,
}: PhotoProps) {
  const t = TONES[tone];
  const isPlaceholder = !src;
  // Callers that position the frame themselves (absolute inset-0) must not also get `relative`.
  const position = className.split(" ").includes("absolute") ? "" : "relative";
  return (
    <div className={`${position} overflow-hidden ${className}`} style={style}>
      <Image
        src={src ?? placeholderSrc(t.fill)}
        alt={isPlaceholder ? `Placeholder image: ${label}` : label}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={isPlaceholder}
        className="object-cover"
      />
      {isPlaceholder && labelPosition !== "none" && (
        <span
          aria-hidden="true"
          className={`mono-label pointer-events-none absolute left-3 ${labelPosition === "top" ? "top-3" : "bottom-2.5"} ${t.label}`}
        >
          [ {kind}: {label} ]
        </span>
      )}
      {children}
    </div>
  );
}
