import type { Metadata } from "next";
import { ListingsResults } from "@/components/listings/ListingsResults";
import { FilterBar } from "@/components/listings/FilterBar";
import { getListings, LIVE_LISTING_COUNT } from "@/lib/data";
import type { ListingSort } from "@/types/listing";

export const metadata: Metadata = {
  title: "Homes for sale in Orange County",
  description: "Search every CRMLS listing in Orange County with live map, filters, and saved-search alerts.",
};

const SORTS: ListingSort[] = ["new", "asc", "desc", "sqft"];

export default async function ListingsPage({ searchParams }: PageProps<"/listings">) {
  const sp = await searchParams;
  const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
  const q = first(sp.q);
  const sortParam = first(sp.sort) as ListingSort;
  const sort: ListingSort = SORTS.includes(sortParam) ? sortParam : "new";
  const status = first(sp.status) === "rent" ? "rent" : "sale";

  const listings = await getListings({ sort });
  const location = q || "Irvine, CA";

  return (
    <>
      <FilterBar location={location} status={status} />
      <ListingsResults
        listings={listings}
        initialSort={sort}
        location={location}
        status={status}
        resultCount={LIVE_LISTING_COUNT}
      />
    </>
  );
}
