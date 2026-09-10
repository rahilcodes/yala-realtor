import Link from "next/link";

export default function ListingNotFound() {
  return (
    <div className="container-1200 py-24 text-center">
      <div className="eyebrow">Listing</div>
      <h1 className="h2 mt-3">We couldn&apos;t find that listing.</h1>
      <p className="mx-auto mt-4 max-w-[480px] text-[16px] leading-[1.6] text-slate-2">
        It may have sold, gone off market, or the MLS number may be mistyped. Search current Orange County listings instead.
      </p>
      <Link href="/listings" className="btn-primary mt-7">
        Search listings
      </Link>
    </div>
  );
}
