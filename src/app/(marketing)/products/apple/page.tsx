import type { Metadata } from "next";
import { AppleHero } from "@/components/apple/apple-hero";
import { AppleCategoryStrip } from "@/components/apple/apple-category-strip";
import { IphoneSpotlight } from "@/components/apple/iphone-spotlight";
import { AppleEcosystemGrid } from "@/components/apple/apple-ecosystem-grid";
import { BrandTrustStrip } from "@/components/common/brand-trust-strip";

export const metadata: Metadata = {
  title: { absolute: "Apple | Prime Tech" },
  description: "Everything Apple, in one place — the latest devices, genuine products and expert guidance at Prime Tech Colombo.",
};

/**
 * The Apple landing page — matches the supplied reference design exactly
 * and ends here. The full Apple products/catalogue browsing experience is a
 * separate, not-yet-built page; this page intentionally does not continue
 * into it.
 */
export default function ApplePage() {
  return (
    <>
      <AppleHero />
      <AppleCategoryStrip />
      <IphoneSpotlight />
      <AppleEcosystemGrid />
      <BrandTrustStrip />
    </>
  );
}
