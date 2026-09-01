import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseHostname = supabaseUrl ? new URL(supabaseUrl).hostname : undefined;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseHostname
      ? [{ protocol: "https", hostname: supabaseHostname, pathname: "/storage/v1/object/public/**" }]
      : [],
  },
  // Apple moved from a standalone /apple section to living inside the
  // Products ecosystem at /products/apple — Prime Tech is the primary
  // brand, Apple is one dedicated destination within it.
  async redirects() {
    return [
      { source: "/apple", destination: "/products/apple", permanent: true },
      { source: "/apple/compare", destination: "/products/apple/compare", permanent: true },
      { source: "/apple/product/:slug", destination: "/products/apple/product/:slug", permanent: true },
      // iPhone Air was removed from the Prime Tech catalogue strategy.
      { source: "/products/apple/product/iphone-air", destination: "/products/apple#iphone", permanent: true },
      // Comparison is now a shared, brand-agnostic tool.
      { source: "/products/apple/compare", destination: "/products/compare?group=apple", permanent: true },
    ];
  },
};

export default nextConfig;
