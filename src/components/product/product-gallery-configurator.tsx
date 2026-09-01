"use client";

import { useMemo, useState } from "react";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductConfigurator } from "@/components/product/product-configurator";
import type { ProductWithRelations, ProductVariant, Product360Frame } from "@/types/database";

/**
 * Keeps the gallery in sync with the configurator: selecting a chip/storage
 * combination that has its own photo (e.g. MacBook Pro's M5 vs M5 Max shots)
 * switches the gallery to it. Falls back to the product's general images
 * when the selected variant has none of its own.
 */
export function ProductGalleryConfigurator({
  product,
  whatsappNumber,
  frames360,
}: {
  product: ProductWithRelations;
  whatsappNumber: string | null;
  /** Product-level 360° rotation frames, or null when none have been
   * uploaded/enabled yet — the gallery's 360° toggle only appears when
   * this is non-empty. */
  frames360: Product360Frame[] | null;
}) {
  const [activeVariant, setActiveVariant] = useState<ProductVariant | undefined>(product.variants[0]);

  const images = useMemo(() => {
    if (activeVariant) {
      const variantImages = product.images.filter((img) => img.variant_id === activeVariant.id);
      if (variantImages.length > 0) return variantImages;
    }
    const genericImages = product.images.filter((img) => !img.variant_id);
    return genericImages.length > 0 ? genericImages : product.images;
  }, [product.images, activeVariant]);

  return (
    <>
      <ProductGallery images={images} productName={product.name} frames360={frames360} />
      <ProductConfigurator
        product={product}
        variants={product.variants}
        whatsappNumber={whatsappNumber}
        onVariantChange={setActiveVariant}
      />
    </>
  );
}
