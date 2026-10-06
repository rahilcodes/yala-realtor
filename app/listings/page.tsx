import type { Metadata } from "next";
import { ListingsResults } from "@/components/listings/ListingsResults";
import { FilterBar } from "@/components/listings/FilterBar";
import { getListings } from "@/lib/data";
import type { ListingSort } from "@/types/listing";

export const metadata: Metadata = {
  title: "Featured homes across Southern California",
  description: "Featured homes from Los Angeles, Orange, Riverside, San Bernardino, and San Diego counties, plus new-home search with Butchi Reddy Yalamuri.",
};

const SORTS: ListingSort[] = ["new", "asc", "desc", "sqft"];

export default async function ListingsPage({ searchParams }: PageProps<"/listings">) {
  const sp = await searchParams;
  const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
  const q = first(sp.q);
  const sortParam = first(sp.sort) as ListingSort;
  const sort: ListingSort = SORTS.includes(sortParam) ? sortParam : "new";

  const listings = await getListings({ sort });

  return (
    <>
      <FilterBar location={q} />
      <ListingsResults listings={listings} initialSort={sort} />
    </>
  );
}
