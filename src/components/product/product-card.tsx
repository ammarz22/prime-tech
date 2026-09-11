"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { AvailabilityBadge } from "@/components/product/availability-badge";
import { ImagePending } from "@/components/product/image-pending";
import { ProductPrice } from "@/components/product/product-price";
import { SaveButton } from "@/components/product/save-button";
import { getDisplayPrice } from "@/lib/utils/pricing";
import { cn } from "@/lib/utils";
import type { ProductWithRelations } from "@/types/database";

export function ProductCard({ product }: { product: ProductWithRelations }) {
  const primaryImage = product.images.find((img) => img.is_primary) ?? product.images[0];
  const availability = product.variants[0]?.availability ?? "coming_soon";
  const displayPrice = getDisplayPrice(product);
  const href =
    product.product_group === "APPLE" ? `/products/apple/product/${product.slug}` : `/products/${product.slug}`;

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="group h-full">
      <Link href={href} className="flex h-full flex-col overflow-hidden rounded-3xl border border-ink/8 bg-paper transition-shadow duration-300 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.18)]">
        <div className="relative overflow-hidden">
          {primaryImage ? (
            <div className="relative aspect-square w-full overflow-hidden bg-paper-soft">
              <Image
                src={primaryImage.url}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className={cn(
                  "transition-transform duration-500 ease-out group-hover:scale-105",
                  primaryImage.object_fit === "contain" ? "object-contain p-6" : "object-cover",
                )}
                style={primaryImage.object_position ? { objectPosition: primaryImage.object_position } : undefined}
              />
            </div>
          ) : (
            <ImagePending className="rounded-none border-0" />
          )}
          {product.new_arrival && (
            <span className="absolute left-3 top-3 rounded-full bg-brand px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
              New
            </span>
          )}
          <SaveButton productId={product.id} className="absolute right-3 top-3" />
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              {product.brand && <p className="text-xs font-medium text-ink/45">{product.brand.name}</p>}
              <h3 className="font-medium leading-snug text-ink">{product.name}</h3>
            </div>
            <ArrowUpRight className="mt-1 size-4 shrink-0 text-ink/25 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" />
          </div>

          {product.short_description && (
            <p className="line-clamp-2 text-xs leading-relaxed text-ink/50">{product.short_description}</p>
          )}

          <div className="mt-auto flex flex-col items-start gap-2 pt-2">
            <ProductPrice price={displayPrice.price} label={displayPrice.label} size="sm" />
            <AvailabilityBadge status={availability} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
