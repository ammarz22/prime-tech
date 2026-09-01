import type { Metadata } from "next";
import { Suspense } from "react";
import { CategoryPills } from "@/components/product/category-pills";
import { FilterBar } from "@/components/product/filter-bar";
import { ProductGrid } from "@/components/product/product-grid";
import { AnimatedSection } from "@/components/motion/animated-section";
import { getProducts, getBrands } from "@/lib/db/products";
import type { ProductFilters } from "@/lib/db/products";

export const metadata: Metadata = {
  title: "Explore Technology",
  description: "Discover the full Prime Tech Colombo catalogue — Apple and Samsung Galaxy, curated.",
};

interface PageProps {
  searchParams: Promise<{ category?: string; brand?: string; sort?: string; q?: string; storage?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters: ProductFilters = {
    productGroup: "OTHER",
    categorySlug: params.category,
    brandSlug: params.brand,
    search: params.q,
    storage: params.storage,
    sort: (params.sort as ProductFilters["sort"]) ?? "featured",
  };

  const [products, brands] = await Promise.all([
    getProducts(filters),
    getBrands(),
  ]);

  return (
    <div className="pt-28">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <AnimatedSection>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Explore</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Explore Technology
          </h1>
          <p className="mt-3 max-w-xl text-ink/60">
            The full Prime Tech catalogue — Apple&apos;s complete ecosystem and Samsung&apos;s Galaxy flagship smartphones.
          </p>
        </AnimatedSection>

        <div className="mt-8">
          <Suspense fallback={<div className="h-10" />}>
            <CategoryPills />
          </Suspense>
        </div>

        <div className="mt-6 border-y border-ink/8 py-4">
          <Suspense fallback={<div className="h-10" />}>
            <FilterBar brands={brands.filter((b: { slug: string }) => b.slug !== "apple")} />
          </Suspense>
        </div>

        <div className="mt-8">
          <ProductGrid
            products={products}
            emptyTitle="No products match this filter yet."
            emptyDescription="Try a different filter, or explore the full Apple ecosystem at Prime Tech."
          />
        </div>
      </div>
    </div>
  );
}
