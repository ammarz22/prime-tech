import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImagePending } from "@/components/product/image-pending";
import { ProductPrice } from "@/components/product/product-price";
import { getDisplayPrice } from "@/lib/utils/pricing";
import type { ProductWithRelations } from "@/types/database";

/** Compact cross-sell row — reuses the same `getRelatedProducts` cross-sell
 * logic already powering "Related Products" elsewhere (real category
 * pairings, e.g. an iPhone/Mac/iPad pairs with real Accessories, never a
 * fabricated "goes well with" list). Renders nothing if there's nothing
 * real to cross-sell. */
export function CompleteYourSetup({
  products,
  viewAllHref,
}: {
  products: ProductWithRelations[];
  viewAllHref?: string;
}) {
  if (products.length === 0) return null;

  return (
    <div className="border-t border-ink/8 py-14">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-xl font-semibold">Complete your setup.</h2>
        {viewAllHref && (
          <Link href={viewAllHref} className="flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand/80">
            View all accessories
            <ArrowRight className="size-3.5" />
          </Link>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {products.slice(0, 5).map((product) => {
          const primaryImage = product.images.find((img) => img.is_primary) ?? product.images[0];
          const displayPrice = getDisplayPrice(product);
          const href =
            product.product_group === "APPLE" ? `/products/apple/product/${product.slug}` : `/products/${product.slug}`;

          return (
            <Link
              key={product.id}
              href={href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white transition hover:border-ink/20 hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.2)]"
            >
              {primaryImage ? (
                <div className="relative aspect-square w-full bg-paper-soft">
                  <Image
                    src={primaryImage.url}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 18vw, 30vw"
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ) : (
                <ImagePending className="aspect-square rounded-none border-0" />
              )}
              <div className="flex items-center justify-between gap-2 p-3.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">{product.name}</p>
                  <ProductPrice price={displayPrice.price} label={displayPrice.label} size="sm" className="mt-0.5" />
                </div>
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/50 transition group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                  <ArrowRight className="size-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
