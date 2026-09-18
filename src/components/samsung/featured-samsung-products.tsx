import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImagePending } from "@/components/product/image-pending";
import { ProductPrice } from "@/components/product/product-price";
import { StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { getProducts } from "@/lib/db/products";
import { getDisplayPrice } from "@/lib/utils/pricing";

/** Real product photos, re-exported as background-erased PNGs where the
 * source was a plain studio shot — same technique used across the site's
 * other card grids. No fabricated device (e.g. a foldable) is added just
 * to fill a fourth slot; the real Galaxy S26 series is three phones. */
const IMAGE_OVERRIDES: Record<string, string> = {
  "galaxy-s26-ultra": "/products/samsung/galaxy-s26-ultra-cutout.png",
};

/** The Samsung hub's "Featured Samsung Products" grid — the real, current
 * Galaxy S26 series (S26, S26+, S26 Ultra) with real catalogue prices, not
 * a fabricated fourth flagship (there is no Z Fold in this catalogue). */
export async function FeaturedSamsungProducts() {
  const products = await getProducts({ productGroup: "OTHER", categorySlug: "galaxy-s26", sort: "featured" });

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

        <StaggerGroup className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {products.map((product) => {
            const overrideUrl = IMAGE_OVERRIDES[product.slug];
            const primaryImage = overrideUrl
              ? { url: overrideUrl }
              : (product.images.find((img) => img.is_primary) ?? product.images[0]);
            const displayPrice = getDisplayPrice(product);

            return (
              <StaggerItem key={product.id}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white transition hover:border-ink/20 hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.2)]"
                >
                  {primaryImage ? (
                    <div className="relative aspect-square w-full bg-paper-soft">
                      <Image
                        src={primaryImage.url}
                        alt={product.name}
                        fill
                        sizes="(min-width: 640px) 30vw, 45vw"
                        className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <ImagePending className="aspect-square rounded-none border-0" />
                  )}
                  <div className="flex items-center justify-between gap-2 p-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">{product.name}</p>
                      <ProductPrice price={displayPrice.price} label={displayPrice.label} size="sm" className="mt-0.5" />
                    </div>
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/50 transition group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                      <ArrowRight className="size-3.5" />
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
