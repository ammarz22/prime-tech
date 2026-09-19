import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImagePending } from "@/components/product/image-pending";
import { ProductPrice } from "@/components/product/product-price";
import { StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { getProductBySlug } from "@/lib/db/products";
import { getDisplayPrice } from "@/lib/utils/pricing";
import { cardImageUrl } from "@/lib/utils/card-image";

/** The featured line-up: both current Galaxy S26 phones, plus the real
 * current tablet and watch from the catalogue (the same phone / tablet /
 * watch mix as the hero). Every entry is an existing product with its real
 * price — nothing is invented to fill a slot. */
const FEATURED_SLUGS = ["galaxy-s26", "galaxy-s26-ultra", "galaxy-tab-s11-ultra", "galaxy-watch9"] as const;

/** The Samsung hub's "Featured Samsung Products" grid. */
export async function FeaturedSamsungProducts() {
  const found = await Promise.all(FEATURED_SLUGS.map((slug) => getProductBySlug(slug)));
  const products = found.filter((product) => product !== null);

  return (
    <section className="bg-paper px-4 py-14 sm:px-6 sm:py-20 lg:px-10 xl:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              <span className="h-px w-4 bg-brand" aria-hidden />
              Latest Samsung Devices
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Featured Samsung Products</h2>
          </div>
          <Link
            href="/products/samsung/galaxy-phones"
            className="flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand/80"
          >
            View all Samsung
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <StaggerGroup className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {products.map((product) => {
            const original = product.images.find((img) => img.is_primary) ?? product.images[0];
            const imageUrl = cardImageUrl(product.slug, original?.url);
            const displayPrice = getDisplayPrice(product);

            return (
              <StaggerItem key={product.id}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white transition hover:border-ink/20 hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.2)]"
                >
                  {imageUrl ? (
                    <div className="relative aspect-[4/3] w-full bg-paper-soft">
                      <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        sizes="(min-width: 1024px) 22vw, 45vw"
                        className="object-contain p-4 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <ImagePending className="aspect-[4/3] rounded-none border-0" />
                  )}
                  <div className="flex items-center justify-between gap-2 p-3.5">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">{product.name}</p>
                      <ProductPrice price={displayPrice.price} label={displayPrice.label} size="sm" className="mt-0.5" />
                    </div>
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/50 transition group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                      <ArrowRight className="size-3" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
