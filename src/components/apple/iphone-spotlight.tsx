import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImagePending } from "@/components/product/image-pending";
import { ProductPrice } from "@/components/product/product-price";
import { StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { getProducts, getProductBySlug } from "@/lib/db/products";
import { getDisplayPrice } from "@/lib/utils/pricing";

/** Tightly-cropped photos for the spotlight row — the same real product
 * shots used on each product's own page, re-cropped close to the device so
 * all three cards read at a consistent scale. A different colour per model
 * (Burgundy / Glacier Blue) keeps Pro and Pro Max visually distinct. */
const IMAGE_OVERRIDES: Record<string, string> = {
  "iphone-18-pro-max": "/iphone-18/iphone-18-pro-max-burgundy-hero-cutout.png",
  "iphone-18-pro": "/products/iphone-18-pro/colors/glacier-blue-tight.jpg",
  "iphone-duo": "/products/iphone-duo/angles/lock-screen-tight.jpg",
  "iphone-17-pro-max": "/products/apple/iphone-17-pro-max.jpg",
};

/** The Apple hub's iPhone campaign moment — the real, currently-available
 * iPhone 18 lineup (`available` campaign stage), rounded out with the real
 * current iPhone 17 Pro Max so the row reads as a full "iPhone" lineup
 * rather than leaving an empty fourth slot. Not a fabricated grid with
 * invented prices — every price reads straight off `getDisplayPrice`. */
export async function IphoneSpotlight() {
  const [iphone18Products, iphone17ProMax] = await Promise.all([
    getProducts({ categorySlug: "iphone-18", includeComingSoon: true }),
    getProductBySlug("iphone-17-pro-max"),
  ]);
  const products = iphone17ProMax ? [...iphone18Products, iphone17ProMax] : iphone18Products;

  return (
    <section id="iphone-spotlight" className="bg-paper px-4 py-14 sm:px-6 sm:py-20 lg:px-10 xl:px-16">
      <div className="mx-auto max-w-7xl">
        <div
          className="relative overflow-hidden rounded-3xl p-7 sm:p-10"
          style={{ background: "linear-gradient(135deg, #fffaf9 0%, #fdeeef 45%, #f9dfe2 100%)" }}
        >
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_minmax(280px,340px)_1fr]">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                <span className="h-px w-4 bg-brand" aria-hidden />
                iPhone
              </p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">A higher standard.</h2>
              <p className="mt-2 text-sm text-ink/55 sm:text-base">Powerful. Beautiful. Built for what&apos;s next.</p>
              <Link
                href="/products/apple/iphone"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-ink/85"
              >
                View all iPhone
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="relative mx-auto aspect-[1614/974] w-full max-w-[280px] sm:max-w-[340px]">
              <Image
                src="/apple-page/iphone-spotlight-all-products.png"
                alt="iPhone 18 Pro Max"
                fill
                sizes="340px"
                className="object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.2)]"
              />
            </div>

            <div className="text-center">
              <p className="text-xl font-semibold tracking-tight text-ink">iPhone 18 Pro Max</p>
              <p className="mt-1 text-sm text-ink/55">Bigger. Brighter. Smarter.</p>
              <Link
                href="/iphone-18-preorder"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand/80"
              >
                Explore now
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <StaggerGroup className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {products.map((product) => {
            const overrideUrl = IMAGE_OVERRIDES[product.slug];
            const primaryImage = overrideUrl
              ? { url: overrideUrl }
              : (product.images.find((img) => img.is_primary) ?? product.images[0]);
            const displayPrice = getDisplayPrice(product);

            return (
              <StaggerItem key={product.id}>
                <Link
                  href={`/products/apple/product/${product.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-ink/8 bg-white transition hover:border-ink/20 hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.2)]"
                >
                  {primaryImage ? (
                    <div className="relative aspect-[4/3] w-full bg-paper-soft">
                      <Image
                        src={primaryImage.url}
                        alt={product.name}
                        fill
                        sizes="(min-width: 640px) 14vw, 30vw"
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <ImagePending className="aspect-[4/3] rounded-none border-0" />
                  )}
                  <div className="flex items-center justify-between gap-2 p-2.5">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-ink">{product.name}</p>
                      <ProductPrice price={displayPrice.price} label={displayPrice.label} size="sm" className="mt-0.5" />
                    </div>
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/50 transition group-hover:border-brand group-hover:bg-brand group-hover:text-white">
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
