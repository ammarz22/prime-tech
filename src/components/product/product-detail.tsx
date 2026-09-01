import Link from "next/link";
import { Scale, ArrowRight } from "lucide-react";
import { ProductGalleryConfigurator } from "@/components/product/product-gallery-configurator";
import { ProductVideoSection } from "@/components/product/product-video-section";
import { ProductHighlights } from "@/components/product/product-highlights";
import { FullSpecifications } from "@/components/product/full-specifications";
import { ProductReviews } from "@/components/product/product-reviews";
import { ProductFaq } from "@/components/product/product-faq";
import { ProductGrid } from "@/components/product/product-grid";
import { SectionHeading } from "@/components/common/section-heading";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/common/breadcrumbs";
import { ViewTracker } from "@/components/product/view-tracker";
import { getApprovedReviews } from "@/lib/db/reviews";
import { getProduct360Frames } from "@/lib/db/product-360";
import type { ProductWithRelations, Branch } from "@/types/database";

export async function ProductDetail({
  product,
  related,
  branches,
  whatsappNumber,
  breadcrumbs,
}: {
  product: ProductWithRelations;
  related: ProductWithRelations[];
  branches: Branch[];
  whatsappNumber: string | null;
  breadcrumbs: BreadcrumbItem[];
}) {
  const [reviews, frames360] = await Promise.all([
    getApprovedReviews(product.id),
    getProduct360Frames(product.id),
  ]);

  return (
    <div className="pt-28">
      <ViewTracker productId={product.id} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[...breadcrumbs, { label: product.name }]} className="py-4" />

        <div className="grid grid-cols-1 gap-10 pb-16 lg:grid-cols-2 lg:gap-16">
          <ProductGalleryConfigurator product={product} whatsappNumber={whatsappNumber} frames360={frames360} />
        </div>

        <ProductVideoSection product={product} />

        <ProductHighlights slug={product.slug} />

        <Link
          href={`/products/compare?group=${product.product_group === "APPLE" ? "apple" : "samsung"}&product=${product.id}`}
          className="group my-4 flex items-center justify-between gap-4 rounded-2xl border border-ink/8 bg-paper-soft p-5 transition hover:border-brand/30"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-brand/10">
              <Scale className="size-4.5 text-brand" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-medium text-ink">Compare This Product</p>
              <p className="text-sm text-ink/50">Put it side by side with similar devices</p>
            </div>
          </div>
          <ArrowRight className="size-4 text-ink/30 transition group-hover:translate-x-0.5" />
        </Link>

        <div className="grid grid-cols-1 gap-x-24 border-t border-ink/8 lg:grid-cols-2">
          <div>
            {product.description && (
              <div className="py-14">
                <h2 className="text-xl font-semibold">About {product.name}</h2>
                <p className="mt-4 leading-relaxed text-ink/65">{product.description}</p>
              </div>
            )}
            <FullSpecifications slug={product.slug} />
          </div>
          <div>
            <ProductReviews productId={product.id} reviews={reviews} />
            <ProductFaq product={product} branches={branches} />
          </div>
        </div>

        {related.length > 0 && (
          <div className="border-t border-ink/8 py-16">
            <SectionHeading eyebrow="You may also like" title="Related Products" />
            <div className="mt-8">
              <ProductGrid products={related} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
