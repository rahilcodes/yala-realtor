interface Props {
  /** Full street address; the map pins this exact location. */
  address: string;
  className?: string;
  zoom?: number;
  children?: React.ReactNode;
}

/** Live Google map centered on the address (no API key needed for the embed). */
export function MapEmbed({ address, className = "", zoom = 15, children }: Props) {
  // Google's keyless place embed (the final target of maps?q=…&output=embed, minus the frame-blocking redirect).
  const src = `https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s${encodeURIComponent(address).replace(/%20/g, "+")}!6i${zoom}`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-border bg-map ${className}`}>
      <iframe
        title={`Map of ${address}`}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0"
        allowFullScreen
      />
      <a
        href={directions}
        target="_blank"
        rel="noopener"
        className="btn absolute bottom-3.5 right-3.5 h-11 rounded-lg bg-white px-3.5 text-[13px] font-bold text-navy shadow-btn hover:bg-cloud"
      >
        Get directions<span className="sr-only"> to {address} (opens in a new tab)</span>
      </a>
      {children}
    </div>
  );
}
