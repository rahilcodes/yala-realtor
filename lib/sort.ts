import type { Listing, ListingSort } from "@/types/listing";

/** Client-safe sort used by both the data layer and the results grid. */
export function sortListings(list: Listing[], sort: ListingSort = "new"): Listing[] {
  const out = [...list];
  if (sort === "asc") out.sort((a, b) => a.price - b.price);
  else if (sort === "desc") out.sort((a, b) => b.price - a.price);
  else if (sort === "sqft") out.sort((a, b) => b.sqft - a.sqft);
  else out.sort((a, b) => a.dom - b.dom);
  return out;
}
