import type { Metadata } from "next";
import { AnimatedSection } from "@/components/motion/animated-section";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ProductGrid } from "@/components/product/product-grid";
import { getProducts } from "@/lib/db/products";

export const metadata: Metadata = {
  title: "Accessories",
  description: "Chargers, cables, displays and other accessories at Prime Tech Colombo.",
};

export default async function AccessoriesPage() {
  const products = await getProducts({ categorySlug: "accessories", sort: "featured" });

  return (
    <div className="pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Accessories" }]} />

        <AnimatedSection>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-brand">Accessories</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Everything Around Your Devices
          </h1>
          <p className="mt-3 max-w-xl text-ink/60">
            Chargers, cables, displays and more — genuine accessories, sourced with the same care as everything else at
            Prime Tech.
          </p>
        </AnimatedSection>

        <div className="mt-10 pb-16">
          <ProductGrid products={products} emptyTitle="Accessories availability updating." />
        </div>
      </div>
    </div>
  );
}
