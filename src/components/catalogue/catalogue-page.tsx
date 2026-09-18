import { notFound } from "next/navigation";
import { CatalogueHero } from "@/components/catalogue/catalogue-hero";
import { CatalogueTabs } from "@/components/catalogue/catalogue-tabs";
import { ProductCatalogueGrid } from "@/components/catalogue/product-catalogue-grid";
import { CatalogueExpertCta } from "@/components/catalogue/catalogue-expert-cta";
import { BrandTrustStrip } from "@/components/common/brand-trust-strip";
import { getProducts } from "@/lib/db/products";
import type { CatalogueCategory } from "@/lib/config/catalogue-types";
import type { ProductGroup } from "@/types/database";

/**
 * The master catalogue page composition — every real per-brand catalogue
 * route (`/products/apple/[category]`, `/products/samsung/[category]`, and
 * eventually a standalone accessories catalogue) renders this same
 * component with its own category config, `productGroup` and brand
 * breadcrumb. Nothing here is brand-specific: category tabs are real links
 * to `${basePath}/${slug}`, so switching categories is a real navigation,
 * not client-only state, and the grid/filters/sort operate generically on
 * whatever `ProductWithRelations[]` comes back for the active category.
 */
export async function CataloguePage({
  categories,
  activeSlug,
  productGroup,
  brandLabel,
  brandHref,
  basePath,
}: {
  categories: CatalogueCategory[];
  activeSlug: string;
  productGroup: ProductGroup;
  brandLabel: string;
  brandHref: string;
  basePath: string;
}) {
  const category = categories.find((c) => c.slug === activeSlug);
  if (!category) notFound();

  const productLists = await Promise.all(
    category.categorySlugs.map((categorySlug) => getProducts({ productGroup, categorySlug, sort: "newest" })),
  );
  const products = productLists.flat();

  return (
    <>
      <CatalogueHero
        category={category}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: brandLabel, href: brandHref }, { label: category.label }]}
      />
      <CatalogueTabs categories={categories} activeSlug={category.slug} categoryHref={(s) => `${basePath}/${s}`} />
      <ProductCatalogueGrid products={products} />
      <CatalogueExpertCta categoryLabel={category.label} />
      <BrandTrustStrip />
    </>
  );
}
