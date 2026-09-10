import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getListing, getSimilarListings } from "@/lib/data";
import { todayISO } from "@/lib/format";
import { Photo } from "@/components/Photo";
import { MapPanel } from "@/components/MapPanel";
import { ListingCard } from "@/components/ListingCard";
import { PropertyActions } from "@/components/property/PropertyActions";
import { InquiryCard } from "@/components/property/InquiryCard";
import { PaymentEstimate } from "@/components/property/PaymentEstimate";

export async function generateMetadata({ params }: PageProps<"/listings/[mls]">): Promise<Metadata> {
  const { mls } = await params;
  const l = await getListing(mls);
  if (!l) return { title: "Listing not found" };
  return {
    title: `${l.fullAddress} · ${l.priceFmt}`,
    description: `${l.specs}. ${l.type} in ${l.neighborhood}, ${l.city}. MLS# ${l.mls}.`,
  };
}

export default async function PropertyPage({ params }: PageProps<"/listings/[mls]">) {
  const { mls } = await params;
  const listing = await getListing(mls);
  if (!listing) notFound();
  const similar = await getSimilarListings(listing.mls);
  const today = todayISO();
  const statusColor = listing.status === "Active" ? "text-success" : listing.status === "Pending" ? "text-slate" : "text-gold-deep";
  const [mainPhoto, ...thumbs] = listing.photos;

  return (
    <>
      <div className="container-1200 pt-[18px]">
        <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-[13px] font-medium text-meta">
          {listing.breadcrumb.map((crumb, i) => (
            <span key={crumb} className="flex gap-2">
              <Link href={i === 0 ? "/listings" : `/listings?q=${encodeURIComponent(crumb)}`} className="inline-flex min-h-11 items-center text-meta no-underline hover:text-navy">
                {crumb}
              </Link>
              <span aria-hidden="true" className="inline-flex min-h-11 items-center">/</span>
            </span>
          ))}
          <span className="inline-flex min-h-11 items-center text-navy" aria-current="page">
            {listing.address}
          </span>
        </nav>

        {/* GALLERY */}
        <div className="mt-4 grid grid-cols-2 gap-2 overflow-hidden rounded-2xl sm:grid-cols-4 sm:auto-rows-[minmax(120px,auto)]">
          <Photo
            label={`1/${listing.photoCount}: ${mainPhoto}`}
            className="col-span-2 row-span-2 aspect-[4/3]"
            priority
            sizes="(max-width: 640px) 100vw, 600px"
          >
            <span className="badge absolute left-3.5 top-3.5" style={{ background: listing.badgeBg, color: listing.badgeFg }}>
              {listing.badge}
            </span>
          </Photo>
          {thumbs.map((t, i) => (
            <Photo key={t} label={t} className="aspect-[4/3] sm:aspect-auto" sizes="(max-width: 640px) 50vw, 300px">
              {i === thumbs.length - 1 && (
                <button
                  type="button"
                  className="btn absolute bottom-2.5 right-2.5 h-11 rounded-lg bg-white px-3.5 text-[13px] font-bold text-navy shadow-btn hover:bg-cloud"
                >
                  All {listing.photoCount} photos
                </button>
              )}
            </Photo>
          ))}
        </div>
      </div>

      {/* MAIN + SIDEBAR: single column below 1000px (header → inquiry card → sections). */}
      <div className="container-1200 grid grid-cols-1 items-start gap-x-10 gap-y-10 pb-[72px] pt-7 nav:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
        <header className="flex flex-col gap-3.5 nav:col-start-1">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className={`inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.08em] ${statusColor}`}>
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-current" />
                  {listing.status}
                </span>
                <span className="text-[12.5px] font-semibold text-meta">
                  {listing.domLabel} · MLS# {listing.mls}
                </span>
              </div>
              <h1 className="mt-2 font-sans font-extrabold leading-none tracking-[-0.02em]" style={{ fontSize: "clamp(32px, 4vw, 44px)" }}>
                {listing.priceFmt}
                <span className="sr-only">, {listing.fullAddress}</span>
              </h1>
              <div className="mt-2 text-[17px] font-medium text-slate">{listing.fullAddress}</div>
              <dl className="mt-2.5 flex flex-wrap gap-[18px] text-[15px] font-semibold">
                {[
                  [String(listing.beds), "beds"],
                  [String(listing.baths), "baths"],
                  [listing.sqftFmt, "sqft"],
                  ...(listing.lot ? [[listing.lotFmt, "sqft lot"]] : []),
                  [listing.ppsf.replace("/sqft", ""), "/ sqft"],
                ].map(([v, k]) => (
                  <div key={k} className="flex gap-1">
                    <dd className="m-0 font-extrabold">{v}</dd>
                    <dt className="font-medium text-meta">{k}</dt>
                  </div>
                ))}
              </dl>
            </div>
            <PropertyActions mls={listing.mls} address={listing.fullAddress} price={listing.priceFmt} />
          </div>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {listing.chips.map((c) => (
              <li key={c} className="chip-soft">
                {c}
              </li>
            ))}
          </ul>
        </header>

        <aside className="flex flex-col gap-4 nav:sticky nav:top-24 nav:col-start-2 nav:row-span-2 nav:row-start-1" aria-label="Contact the listing agent">
          <InquiryCard listing={listing} today={today} />
          {listing.openHouse && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border px-5 py-4">
              <div>
                <div className="text-[14px] font-bold">Open house</div>
                <div className="text-[13px] font-medium text-meta">{listing.openHouse.label}</div>
              </div>
              <button type="button" className="btn-outline btn-44 whitespace-nowrap px-3.5 text-[13px]">
                Add to calendar
              </button>
            </div>
          )}
        </aside>

        <div className="flex min-w-0 flex-col gap-10 nav:col-start-1">
          <section aria-labelledby="about">
            <h2 id="about" className="mb-3.5 font-serif text-[26px] font-medium leading-[1.2]">
              About this home
            </h2>
            <p className="m-0 text-[16px] leading-[1.7] text-slate text-pretty">{listing.description}</p>
            <div className="mt-3.5 text-[12.5px] font-medium text-meta">
              Listed by {listing.agent.name}, {listing.agent.brokerage} · {listing.agent.dre} · Source: CRMLS
            </div>
          </section>

          <section aria-labelledby="facts">
            <h2 id="facts" className="mb-4 font-serif text-[26px] font-medium leading-[1.2]">
              Facts &amp; features
            </h2>
            <dl className="m-0 grid grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-x-8 gap-y-0">
              {listing.facts.map((f) => (
                <div key={f.k} className="flex justify-between gap-3 border-b border-hairline py-3 text-[14.5px] font-medium">
                  <dt className="text-meta">{f.k}</dt>
                  <dd className="m-0 text-right font-semibold">{f.v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="location">
            <h2 id="location" className="mb-4 font-serif text-[26px] font-medium leading-[1.2]">
              Location
            </h2>
            <MapPanel label={`${listing.address} · nearby schools, parks, commute`} marker className="h-[320px] rounded-[14px]" />
            {listing.schools.length > 0 && (
              <div className="mt-[18px] grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3">
                {listing.schools.map((s) => (
                  <div key={s.name} className="rounded-xl border border-border p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[14px] font-bold">{s.name}</span>
                      <span
                        aria-label={`Rating ${s.rating} out of 10`}
                        className="inline-flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full bg-navy text-[13px] font-extrabold text-white"
                      >
                        {s.rating}
                      </span>
                    </div>
                    <div className="mt-1.5 text-[12.5px] font-medium text-meta">{s.meta}</div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-2 text-[12px] text-meta">{listing.schoolNote}</div>
          </section>

          <section aria-labelledby="history">
            <h2 id="history" className="mb-4 font-serif text-[26px] font-medium leading-[1.2]">
              Price history
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[14px] font-medium">
                <thead>
                  <tr className="text-left text-[12.5px] text-meta">
                    <th className="border-b border-border py-2.5 font-semibold">Date</th>
                    <th className="border-b border-border py-2.5 font-semibold">Event</th>
                    <th className="border-b border-border py-2.5 text-right font-semibold">Price</th>
                    <th className="border-b border-border py-2.5 text-right font-semibold">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {listing.history.map((h) => (
                    <tr key={h.date + h.event}>
                      <td className="border-b border-hairline py-3">{h.date}</td>
                      <td className="border-b border-hairline py-3 font-semibold">{h.event}</td>
                      <td className="border-b border-hairline py-3 text-right font-bold">{h.price}</td>
                      <td className="border-b border-hairline py-3 text-right text-meta">{h.src}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <PaymentEstimate price={listing.price} hoa={listing.hoa ?? 0} />
        </div>
      </div>

      {similar.length > 0 && (
        <section className="bg-cloud">
          <div className="container-1200 py-16">
            <div className="section-head mb-6">
              <h2 className="h2-sm m-0">Similar homes in {listing.city}</h2>
              <Link href={`/listings?q=${encodeURIComponent(listing.city)}`} className="text-link">
                See all {listing.city} listings
              </Link>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-5">
              {similar.map((item) => (
                <ListingCard key={item.mls} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
