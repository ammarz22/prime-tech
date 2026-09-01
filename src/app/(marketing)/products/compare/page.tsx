import type { Metadata } from "next";
import { AnimatedSection } from "@/components/motion/animated-section";
import { ComparisonTool } from "@/components/product/comparison-tool";
import { getProducts } from "@/lib/db/products";
import type { ProductGroup } from "@/types/database";

export const metadata: Metadata = {
  title: "Compare Products",
};

const GROUPS: Record<string, { productGroup: ProductGroup; label: string; title: string }> = {
  apple: { productGroup: "APPLE", label: "Apple products", title: "Compare Apple Products" },
  samsung: { productGroup: "OTHER", label: "Galaxy phones", title: "Compare Galaxy Phones" },
};

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string; product?: string }>;
}) {
  const { group, product } = await searchParams;
  const config = GROUPS[group ?? "apple"] ?? GROUPS.apple;
  const products = await getProducts({ productGroup: config.productGroup, sort: "featured" });

  return (
    <div className="pt-28">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <AnimatedSection>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Compare</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">{config.title}</h1>
        </AnimatedSection>
        <div className="mt-10">
          <ComparisonTool products={products} label={config.label} initialSelectedId={product} />
        </div>
      </div>
    </div>
  );
}
