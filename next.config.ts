import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Listings pages are hidden until the CRMLS/IDX feed is connected (client request, Nov 2026).
    // Visitors land on Butchi's new-home search portal instead. Remove these two entries to re-enable /listings.
    const portal = "https://www.showingnew.com/butchi";
    return [
      { source: "/listings", destination: portal, permanent: false },
      { source: "/listings/:path*", destination: portal, permanent: false },
    ];
  },
};

export default nextConfig;
