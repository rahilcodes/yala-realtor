import { NextResponse, type NextRequest } from "next/server";
import { parseMin, parsePriceRange, resolveNewHomeSearch, type NewHomeFilters, type ResolvedSearch } from "@/lib/newHomeSearch";

/**
 * GET /new-homes?q=Irvine&price=$1M – $2M&beds=3+&baths=2+&status=move-in
 *
 * Every search box on the site submits here. We resolve the query to the best
 * page on Butchi's ShowingNew site and 302 to it, so the visitor lands on real
 * results with their filters applied. Add `&format=json` to inspect the resolution.
 */

const UA = "Mozilla/5.0 (compatible; YALA-Realty-Search/1.0; +https://yalarealty.com)";
const COUNT_TTL_SECONDS = 6 * 60 * 60;

/**
 * Number of new-home communities ShowingNew lists for a results page, or null if unknown.
 * Cached for 6 hours so repeated searches don't refetch.
 */
async function communityCount(url: string): Promise<number | null> {
  // Count is filter-independent for our purposes: strip the query so one cache entry serves all filter combos.
  const base = url.split("?")[0];
  try {
    const res = await fetch(base, {
      headers: { "User-Agent": UA, Accept: "text/html" },
      next: { revalidate: COUNT_TTL_SECONDS },
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return null;
    const m = (await res.text()).match(/(\d[\d,]*)\s+[Cc]ommunit/);
    return m ? Number(m[1].replace(/,/g, "")) : null;
  } catch {
    return null;
  }
}

function readFilters(sp: URLSearchParams): NewHomeFilters {
  const price = parsePriceRange(sp.get("price"));
  const num = (k: string) => {
    const v = Number(sp.get(k));
    return Number.isFinite(v) && v > 0 ? v : undefined;
  };
  return {
    priceLow: num("pricelow") ?? price.priceLow,
    priceHigh: num("pricehigh") ?? price.priceHigh,
    beds: parseMin(sp.get("beds")),
    baths: parseMin(sp.get("baths")),
    status: sp.get("status") === "move-in" ? "move-in" : "all",
  };
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const q = sp.get("q") ?? sp.get("SearchText") ?? "";
  const filters = readFilters(sp);
  const resolved: ResolvedSearch = resolveNewHomeSearch(q, filters);

  let destination = resolved.url;
  let widened = false;
  if (resolved.kind === "city" && resolved.fallbackUrl) {
    const n = await communityCount(resolved.url);
    // Only widen when ShowingNew positively reports zero; unknown counts keep the precise city page.
    if (n === 0) {
      destination = resolved.fallbackUrl;
      widened = true;
    }
  }

  console.info("[new-homes] search", JSON.stringify({ q, filters, kind: resolved.kind, label: resolved.label, widened, destination }));

  if (sp.get("format") === "json") {
    return NextResponse.json({ q, filters, ...resolved, widened, destination });
  }

  const res = NextResponse.redirect(destination, 302);
  res.headers.set("Cache-Control", "private, no-store");
  res.headers.set("Referrer-Policy", "no-referrer-when-downgrade");
  return res;
}
