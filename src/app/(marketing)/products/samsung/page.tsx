import type { Metadata } from "next";
import { SamsungHero } from "@/components/samsung/samsung-hero";
import { SamsungCategoryStrip } from "@/components/samsung/samsung-category-strip";
import { GalaxyS26Spotlight } from "@/components/samsung/galaxy-s26-spotlight";
import { FeaturedSamsungProducts } from "@/components/samsung/featured-samsung-products";
import { SamsungEcosystemGrid } from "@/components/samsung/samsung-ecosystem-grid";
import { BrandTrustStrip } from "@/components/common/brand-trust-strip";

export const metadata: Metadata = {
  title: { absolute: "Samsung | Prime Tech" },
  description: "A smarter tomorrow — the latest Galaxy devices, genuine products and expert guidance at Prime Tech Colombo.",
};

/**
 * The Samsung landing page — matches the supplied reference design exactly
 * and ends here, mirroring the Apple landing page's approach. The full
 * Samsung products/catalogue browsing experience is a separate,
 * not-yet-built page; this page intentionally does not continue into it.
 */
export default function SamsungPage() {
  return (
    <>
      <SamsungHero />
      <SamsungCategoryStrip />
      <GalaxyS26Spotlight />
      <FeaturedSamsungProducts />
      <SamsungEcosystemGrid />
      <BrandTrustStrip />
    </>
  );
}
