import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Scale, ArrowRight } from "lucide-react";
import { CategoryNav } from "@/components/product/category-nav";
import { ProductStory } from "@/components/apple/product-story";
import { ComingSoonGrid } from "@/components/apple/coming-soon-grid";
import { ProductGrid } from "@/components/product/product-grid";
import { AnimatedSection } from "@/components/motion/animated-section";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { getProducts } from "@/lib/db/products";

export const metadata: Metadata = {
  title: { absolute: "Apple Products Sri Lanka | iPhone, Mac, iPad & More | Prime Tech" },
  description:
    "Explore the complete Apple ecosystem at Prime Tech Colombo — iPhone, Mac, iPad, Apple Watch, AirPods and Accessories.",
};

export default async function ApplePage() {
  const [iphoneProducts, macProducts, ipadProducts, watchProducts, airpodsProducts, accessoryProducts, macComingSoon] =
    await Promise.all([
      getProducts({ productGroup: "APPLE", categorySlug: "iphone", sort: "featured" }),
      getProducts({ productGroup: "APPLE", categorySlug: "mac", sort: "featured" }),
      getProducts({ productGroup: "APPLE", categorySlug: "ipad", sort: "featured" }),
      getProducts({ productGroup: "APPLE", categorySlug: "apple-watch", sort: "featured" }),
      getProducts({ productGroup: "APPLE", categorySlug: "airpods", sort: "featured" }),
      getProducts({ productGroup: "APPLE", categorySlug: "apple-accessories", sort: "featured" }),
      // iMac is the one Mac still awaiting a verified current-design photo —
      // stays coming-soon rather than being promoted without a real image.
      getProducts({ productGroup: "APPLE", categorySlug: "mac", sort: "newest", includeComingSoon: true }).then((all) =>
        all.filter((p) => p.price_label === "coming_soon"),
      ),
    ]);

  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-16 pt-32 text-white sm:pt-40">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.15] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black,transparent)]" />
        <div
          className="pointer-events-none absolute left-1/2 top-0 size-[45vw] max-w-[650px] -translate-x-1/2 rounded-full opacity-30 blur-[110px]"
          style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <AnimatedSection>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-brand-cyan">Prime Tech</p>
            <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
              Apple.
              <br />
              At Prime Tech.
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-balance text-lg text-white/60">
              The complete Apple ecosystem, brought together.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: "Apple" }]}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="h-[52px]" />}>
          <CategoryNav
            categories={[
              { label: "iPhone", value: "iphone" },
              { label: "Mac", value: "mac" },
              { label: "iPad", value: "ipad" },
              { label: "Apple Watch", value: "apple-watch" },
              { label: "AirPods", value: "airpods" },
              { label: "Accessories", value: "apple-accessories" },
            ]}
          />
        </Suspense>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductStory
          id="iphone"
          eyebrow="iPhone"
          title="The iPhone 17 Family"
          description="From the essential iPhone 17e to the 39-hour-battery iPhone 17 Pro Max."
          highlights={[
            "A19 / A19 Pro chip with hardware-accelerated ray tracing",
            "48MP Fusion camera systems with optical-quality zoom",
            "Up to 6.9\" ProMotion Super Retina XDR display",
          ]}
        >
          <ProductGrid products={iphoneProducts} emptyTitle="iPhone availability updating." />
        </ProductStory>

        <div className="border-t border-ink/8" />

        <ProductStory
          id="mac"
          eyebrow="Mac"
          title="Mac"
          description="Power for work, creativity and everything in between — from the A18 Pro-based MacBook Neo to the M5 Max MacBook Pro and M3 Ultra Mac Studio."
          highlights={[
            "Apple M5, M4 and M3-generation chip options across the lineup",
            "Liquid Retina and Liquid Retina XDR displays",
            "Compact desktops (Mac mini, Mac Studio) to portable MacBooks",
          ]}
        >
          <ProductGrid products={macProducts} emptyTitle="Mac availability updating." />
          {macComingSoon.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-ink/40">
                Also from Mac — Coming Soon
              </p>
              <ComingSoonGrid products={macComingSoon} />
            </div>
          )}
        </ProductStory>

        <div className="border-t border-ink/8" />

        <ProductStory
          id="ipad"
          eyebrow="iPad"
          title="iPad"
          description="From the pocketable iPad mini to the OLED iPad Pro, every iPad supports Apple Pencil Pro for notes, sketches and markup."
          highlights={[
            "M5 (Pro), M3 (Air) and A17 Pro (mini) chip options",
            "Liquid Retina and tandem OLED Ultra Retina XDR displays",
            "Apple Pencil Pro and Magic Keyboard support",
          ]}
        >
          <ProductGrid products={ipadProducts} emptyTitle="iPad availability updating." />
        </ProductStory>

        <div className="border-t border-ink/8" />

        <ProductStory
          id="apple-watch"
          eyebrow="Apple Watch"
          title="Apple Watch"
          description="From the accessible SE to the rugged, titanium Ultra — Apple's full current Watch lineup."
          highlights={[
            "Apple S10 chip across the Series 11 and SE lineup",
            "Hypertension notifications and always-on Retina displays",
            "Optional 5G cellular on every model",
          ]}
        >
          <ProductGrid products={watchProducts} emptyTitle="Apple Watch availability updating." />
        </ProductStory>

        <div className="border-t border-ink/8" />

        <ProductStory
          id="airpods"
          eyebrow="AirPods"
          title="AirPods"
          description="Apple's current in-ear AirPods, available with or without Active Noise Cancellation."
          highlights={[
            "Apple H2 chip with Adaptive Audio and Transparency mode",
            "Optional Active Noise Cancellation",
            "USB-C charging case",
          ]}
        >
          <ProductGrid products={airpodsProducts} emptyTitle="AirPods availability updating." />
        </ProductStory>

        <div className="border-t border-ink/8" />

        <ProductStory
          id="apple-accessories"
          eyebrow="Accessories"
          title="Accessories"
          description="The essentials for every Apple setup — from Studio Display to chargers and cables."
          highlights={[
            "Studio Display — 27\" 5K Retina with Center Stage camera",
            "Genuine Apple chargers and cables",
          ]}
        >
          <ProductGrid products={accessoryProducts} emptyTitle="Accessories availability updating." />
        </ProductStory>

        <Link
          href="/products/compare?group=apple"
          className="group my-4 flex items-center justify-between gap-4 rounded-2xl border border-ink/8 bg-paper-soft p-5 transition hover:border-brand/30"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-brand/10">
              <Scale className="size-4.5 text-brand" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-medium text-ink">Compare Apple Products</p>
              <p className="text-sm text-ink/50">Put up to 3 products side by side</p>
            </div>
          </div>
          <ArrowRight className="size-4 text-ink/30 transition group-hover:translate-x-0.5" />
        </Link>
      </div>
    </>
  );
}
