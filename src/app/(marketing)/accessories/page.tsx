import type { Metadata } from "next";
import { AccessoriesHero } from "@/components/accessories/accessories-hero";
import { AccessoriesCatalog } from "@/components/accessories/accessories-catalog";
import { AccessoriesHelpCta } from "@/components/accessories/accessories-help-cta";
import { BrandTrustStrip } from "@/components/common/brand-trust-strip";
import { getProducts } from "@/lib/db/products";

export const metadata: Metadata = {
  title: { absolute: "Accessories | Prime Tech" },
  description: "Premium accessories for your Apple, Samsung and everyday devices — genuine products at Prime Tech Colombo.",
};

/**
 * The Accessories page — matches the supplied reference design's layout
 * and functionality (category tabs, brand/category/price filters, sort,
 * live product count) but is populated only with what's actually in the
 * catalogue today: 6 real accessories across 2 real brands (Apple,
 * Samsung), not the reference's illustrative 24 products across 7 brands
 * including ones Prime Tech doesn't carry (Anker, Belkin, Spigen, Ugreen,
 * Baseus). The filter UI is fully real and will scale automatically as
 * more accessories are added to the catalogue.
 */
export default async function AccessoriesPage() {
  const products = await getProducts({ categorySlug: "accessories", sort: "newest" });

  return (
    <>
      <AccessoriesHero />
      <AccessoriesCatalog products={products} />
      <AccessoriesHelpCta />
      <BrandTrustStrip />
    </>
  );
}
