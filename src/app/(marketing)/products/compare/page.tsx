import type { Metadata } from "next";
import { CompareHero } from "@/components/product/compare/compare-hero";
import { CatalogueTabs } from "@/components/catalogue/catalogue-tabs";
import { CompareWorkspace } from "@/components/product/compare/compare-workspace";
import { BrandTrustStrip } from "@/components/common/brand-trust-strip";
import { APPLE_CATALOGUE_CATEGORIES } from "@/lib/config/apple-catalogue";
import { SAMSUNG_CATALOGUE_CATEGORIES } from "@/lib/config/samsung-catalogue";
import { findCategoryForSlug } from "@/lib/utils/catalogue-lookup";
import { getProducts } from "@/lib/db/products";
import { getEffectiveContact } from "@/lib/db/site-settings";
import { whatsappLink, serviceEnquiryMessage } from "@/lib/config/site";
import type { ProductGroup } from "@/types/database";

const GROUPS: Record<string, { productGroup: ProductGroup; brandLabel: string }> = {
  apple: { productGroup: "APPLE", brandLabel: "Apple" },
  samsung: { productGroup: "OTHER", brandLabel: "Samsung" },
};

export const metadata: Metadata = {
  title: "Compare Products",
};

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string; category?: string; device?: string }>;
}) {
  const { group, category: categorySlug, device } = await searchParams;
  const config = GROUPS[group ?? "apple"] ?? GROUPS.apple;
  const brandKey = GROUPS[group ?? "apple"] ? (group ?? "apple") : "apple";

  const categories = (brandKey === "samsung" ? SAMSUNG_CATALOGUE_CATEGORIES : APPLE_CATALOGUE_CATEGORIES).filter(
    (c) => c.slug !== "accessories",
  );
  const category = categorySlug ? findCategoryForSlug(categories, categorySlug) : categories[0];

  const [productLists, contact] = await Promise.all([
    Promise.all(category.categorySlugs.map((cs) => getProducts({ productGroup: config.productGroup, categorySlug: cs, sort: "featured" }))),
    getEffectiveContact(),
  ]);
  const products = productLists.flat();

  const whatsappHref =
    whatsappLink(serviceEnquiryMessage(`choosing between ${category.label} models`), contact.whatsappNumber) ?? "#";

  return (
    <div>
      <CompareHero category={category} brandLabel={config.brandLabel} />
      <CatalogueTabs
        categories={categories}
        activeSlug={category.slug}
        categoryHref={(slug) => `/products/compare?group=${brandKey}&category=${slug}`}
      />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-10 xl:px-16">
        <CompareWorkspace
          products={products}
          categoryLabel={category.label}
          whatsappHref={whatsappHref}
          initialSlug={device}
        />
      </div>

      <BrandTrustStrip />
    </div>
  );
}
