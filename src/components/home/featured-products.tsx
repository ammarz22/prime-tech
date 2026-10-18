"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { cardImageUrl } from "@/lib/utils/card-image";
import type { ProductWithRelations } from "@/types/database";

/** A card built around a soft neutral "stage" behind the product photo
 * (echoing the ecosystem cards' swoosh treatment) instead of the old
 * thin-bordered thumbnail. The "NEW" badge and the tagline line are both
 * real catalogue fields (`new_arrival`, `short_description`) — never
 * fabricated per-card copy — so a product with neither just renders
 * without them. */
function FeaturedProductCard({ product }: { product: ProductWithRelations }) {
  const original = product.images.find((img) => img.is_primary) ?? product.images[0];
  const imageUrl = cardImageUrl(product.slug, original?.url);
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

        {imageUrl && (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="220px"
            className="relative object-contain p-4 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
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

/** Homepage-only featured carousel — a fixed, curated line-up of the site's
 * most prominent products (already selected by the homepage itself), shown
 * as a soft-staged card row rather than behind a category filter. */
export function FeaturedProducts({ products }: { products: ProductWithRelations[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

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
              {products.map((product) => (
                <StaggerItem key={product.id} className="h-full">
                  <FeaturedProductCard product={product} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
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
