"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { cn } from "@/lib/utils";
import type { ProductWithRelations } from "@/types/database";

const FILTERS = [
  { label: "All", test: () => true },
  { label: "iPhone", test: (p: ProductWithRelations) => p.category?.slug === "iphone" },
  { label: "Mac", test: (p: ProductWithRelations) => p.category?.slug === "mac" },
  { label: "iPad", test: (p: ProductWithRelations) => p.category?.slug === "ipad" },
  { label: "Watch", test: (p: ProductWithRelations) => p.category?.slug === "apple-watch" },
  { label: "Samsung", test: (p: ProductWithRelations) => p.product_group === "OTHER", divider: true },
  { label: "Accessories", test: (p: ProductWithRelations) => p.category?.slug === "accessories" },
] as const;

/**
 * Every JPEG in the catalogue has its studio background baked into the
 * pixels (JPEG can't hold transparency), which always leaves a faint
 * rectangle wherever the card's own background isn't an exact colour
 * match. Rather than fight that per-card, each of these points the tile
 * at a real, already-existing photo of the same product — re-exported as
 * a PNG with its background erased by flooding out from the image edges
 * (so an enclosed light area, like the AirPods case, is untouched; only
 * background connected to the border is removed) — no content is drawn,
 * cropped, or altered otherwise. A few of these (iPhone 17 Pro, iPad
 * Pro, Apple Watch Series 11) also swap away from their `is_primary`
 * photo first, since that one is a dramatic, off-centre PDP hero crop
 * that reads as a stray black/grey box once shrunk into a small grid
 * tile — this points at a different real photo from the same product's
 * image set that actually shows the whole device. Any product not
 * listed here just uses its normal primary image, untouched.
 */
const TILE_IMAGE_OVERRIDES: Record<string, string> = {
  "mac-studio": "/products/mac-studio/colors/silver-cutout.png",
  "iphone-17-pro": "/products/apple/iphone-17-pro-cutout.png",
  "airpods-4": "/products/airpods-4/colors/white-cutout.png",
  "ipad-pro": "/products/apple/ipad-pro-cutout.png",
  "apple-watch-series-11": "/products/apple/apple-watch-series-11-cutout.png",
  "galaxy-s26": "/products/galaxy-s26/colors/black-cutout.png",
};

/** A card built around a soft neutral "stage" behind the product photo
 * (echoing the ecosystem cards' swoosh treatment) instead of the old
 * thin-bordered thumbnail. The "NEW" badge and the tagline line are both
 * real catalogue fields (`new_arrival`, `short_description`) — never
 * fabricated per-card copy — so a product with neither just renders
 * without them. */
function FeaturedProductCard({ product }: { product: ProductWithRelations }) {
  const overrideUrl = TILE_IMAGE_OVERRIDES[product.slug];
  const primaryImage = overrideUrl
    ? { url: overrideUrl }
    : (product.images.find((img) => img.is_primary) ?? product.images[0]);
  const href =
    product.product_group === "APPLE" ? `/products/apple/product/${product.slug}` : `/products/${product.slug}`;

  return (
    <Link
      href={href}
      data-card
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/8 bg-paper transition hover:border-ink/20 hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.2)]"
    >
      <div className="relative h-40 w-full overflow-hidden bg-paper-soft sm:h-44">
        <svg
          aria-hidden
          viewBox="0 0 300 200"
          className="pointer-events-none absolute inset-0 size-full text-brand/[0.06]"
          preserveAspectRatio="none"
        >
          <path
            d="M -20 140 C 60 100, 90 180, 170 120 S 300 60, 340 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="26"
          />
        </svg>

        {product.new_arrival && (
          <span className="absolute left-3 top-3 rounded-full bg-brand/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand">
            New
          </span>
        )}

        {primaryImage && (
          <Image
            src={primaryImage.url}
            alt={product.name}
            fill
            sizes="220px"
            className="relative object-contain p-6 transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className="relative flex flex-1 items-start justify-between gap-2 p-4">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-ink">{product.name}</h3>
          {product.short_description && (
            <p className="mt-1 truncate text-xs text-ink/55">{product.short_description}</p>
          )}
        </div>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/50 transition group-hover:border-brand group-hover:bg-brand group-hover:text-white">
          <ArrowRight className="size-3.5" />
        </span>
      </div>
    </Link>
  );
}

/** Homepage-only featured carousel, restyled around a pill-shaped filter
 * bar and a soft-staged 6-across card row. */
export function FeaturedProducts({ products }: { products: ProductWithRelations[] }) {
  const [active, setActive] = useState<(typeof FILTERS)[number]["label"]>("All");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const filtered = useMemo(() => {
    const filter = FILTERS.find((f) => f.label === active) ?? FILTERS[0];
    return products.filter(filter.test);
  }, [products, active]);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = (card?.offsetWidth ?? 160) + 16;
    el.scrollBy({ left: direction * step * 2, behavior: "smooth" });
  };

  return (
    <section className="bg-paper px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/45">Explore Our Range</p>
            <h2 className="mt-1 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Featured <span className="text-brand">Products</span>
            </h2>
            <p className="mt-1 text-sm text-ink/55">The latest. The greatest. All in one place.</p>
          </div>

          <div className="flex flex-wrap items-center gap-1 rounded-full border border-ink/10 bg-paper-soft/60 p-1.5">
            {FILTERS.map((f) => (
              <span key={f.label} className="flex items-center">
                <button
                  type="button"
                  onClick={() => setActive(f.label)}
                  className={cn(
                    "shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition",
                    active === f.label ? "bg-brand text-white" : "text-ink/60 hover:text-ink",
                  )}
                >
                  {f.label}
                </button>
                {"divider" in f && f.divider && <span className="mx-1 h-4 w-px bg-ink/15" aria-hidden />}
              </span>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <Link
              href="/products"
              className="flex items-center gap-1.5 text-sm font-medium text-ink/70 hover:text-ink"
            >
              View All Products
              <ArrowRight className="size-3.5" />
            </Link>
            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                aria-label="Scroll left"
                onClick={() => scrollByCard(-1)}
                className="flex size-9 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition hover:border-ink/30 hover:text-ink"
              >
                <ArrowLeft className="size-3.5" />
              </button>
              <button
                type="button"
                aria-label="Scroll right"
                onClick={() => scrollByCard(1)}
                className="flex size-9 items-center justify-center rounded-full bg-brand/10 text-brand transition hover:bg-brand hover:text-white"
              >
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div
            ref={scrollerRef}
            className="grid grid-flow-col auto-cols-[minmax(200px,1fr)] gap-4 overflow-x-auto pb-2 sm:auto-cols-[minmax(0,1fr)] sm:[grid-template-columns:repeat(6,minmax(0,1fr))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <StaggerGroup className="contents">
              {filtered.slice(0, 6).map((product) => (
                <StaggerItem key={product.id} className="h-full">
                  <FeaturedProductCard product={product} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
          {filtered.length === 0 && (
            <p className="py-8 text-center text-xs text-ink/50">No products in this category yet.</p>
          )}
        </div>

        <div className="mt-10 flex items-center gap-4">
          <span className="hidden h-px flex-1 bg-ink/10 sm:block" aria-hidden />
          <p className="min-w-0 flex-1 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40 sm:flex-none sm:text-[11px] sm:tracking-[0.3em]">
            Technology For A Brighter Tomorrow
          </p>
          <span className="hidden h-px flex-1 bg-ink/10 sm:block" aria-hidden />
        </div>
      </div>
    </section>
  );
}
