import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Scale, ArrowRight } from "lucide-react";
import { CategoryNav } from "@/components/product/category-nav";
import { ProductStory } from "@/components/apple/product-story";
import { ProductGrid } from "@/components/product/product-grid";
import { AnimatedSection } from "@/components/motion/animated-section";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { getProducts } from "@/lib/db/products";

export const metadata: Metadata = {
  title: { absolute: "Samsung Galaxy Sri Lanka | S25 & S26 Series | Prime Tech" },
  description: "Explore the Samsung Galaxy S25 and S26 flagship smartphone series at Prime Tech Colombo.",
};

export default async function SamsungPage() {
  const [s25Products, s26Products] = await Promise.all([
    getProducts({ productGroup: "OTHER", categorySlug: "galaxy-s25", sort: "featured" }),
    getProducts({ productGroup: "OTHER", categorySlug: "galaxy-s26", sort: "featured" }),
  ]);

  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-16 pt-32 text-white sm:pt-40">
        <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.2] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black,transparent)]" />
        <div
          className="pointer-events-none absolute left-1/2 top-0 size-[45vw] max-w-[650px] -translate-x-1/2 rounded-full opacity-30 blur-[110px]"
          style={{ background: "radial-gradient(circle, var(--samsung-accent) 0%, transparent 70%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <AnimatedSection>
            <p
              className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: "color-mix(in oklch, var(--samsung-accent) 65%, white)" }}
            >
              Prime Tech
            </p>
            <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
              Galaxy.
              <br />
              At Prime Tech.
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-balance text-lg text-white/60">
              Samsung&apos;s flagship Galaxy S series, curated for Prime Tech.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: "Samsung" }]}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="h-[52px]" />}>
          <CategoryNav
            categories={[
              { label: "Galaxy S25 Series", value: "galaxy-s25" },
              { label: "Galaxy S26 Series", value: "galaxy-s26" },
            ]}
          />
        </Suspense>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductStory
          id="galaxy-s25"
          eyebrow="Galaxy S25 Series"
          title="Galaxy S25 Series"
          description="From the standard S25 to the S Pen-equipped S25 Ultra and the 5.8mm-thin S25 Edge."
          highlights={[
            "Snapdragon 8 Elite for Galaxy chip across the series",
            "Up to 200MP quad camera system on S25 Ultra",
            "S25 Edge — Samsung's thinnest phone to date",
          ]}
        >
          <ProductGrid products={s25Products} emptyTitle="Galaxy S25 availability updating." />
        </ProductStory>

        <div className="border-t border-ink/8" />

        <ProductStory
          id="galaxy-s26"
          eyebrow="Galaxy S26 Series"
          title="Galaxy S26 Series"
          description="Samsung's current flagship generation."
          highlights={[
            "Exynos 2600 (S26 / S26+) or Snapdragon 8 Elite Gen 5 (S26 Ultra)",
            "Up to 200MP camera system on S26 Ultra",
            "Up to 60W wired charging on S26 Ultra",
          ]}
        >
          <ProductGrid products={s26Products} emptyTitle="Galaxy S26 availability updating." />
        </ProductStory>

        <Link
          href="/products/compare?group=samsung"
          className="group my-4 flex items-center justify-between gap-4 rounded-2xl border border-ink/8 bg-paper-soft p-5 transition hover:border-brand/30"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-brand/10">
              <Scale className="size-4.5 text-brand" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-medium text-ink">Compare Galaxy Phones</p>
              <p className="text-sm text-ink/50">Put up to 3 phones side by side</p>
            </div>
          </div>
          <ArrowRight className="size-4 text-ink/30 transition group-hover:translate-x-0.5" />
        </Link>
      </div>
    </>
  );
}
