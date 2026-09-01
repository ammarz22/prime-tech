import type { PriceLabel, ProductVariant, ProductWithRelations } from "@/types/database";

/**
 * The price to show for a product where the exact configuration hasn't been
 * chosen yet (catalogue cards, comparison table). Uses the lowest price
 * across priced, in-catalogue variants — never `product.base_price` alone
 * once real variant pricing exists, so a product with variants ranging from
 * LKR 300,000 to LKR 500,000 never shows a single misleading number.
 */
export function getDisplayPrice(product: ProductWithRelations): {
  price: number | null;
  label: PriceLabel;
  isRange: boolean;
} {
  const pricedVariants = product.variants.filter((v) => v.price != null && v.availability !== "coming_soon");

  if (pricedVariants.length === 0) {
    return { price: product.base_price, label: product.price_label, isRange: false };
  }

  const prices = pricedVariants.map((v) => v.price as number);
  const min = Math.min(...prices);
  const isRange = new Set(prices).size > 1;

  return {
    price: min,
    label: isRange
      ? "starting_from"
      : product.price_label === "on_request" || product.price_label === "approx_market"
        ? product.price_label
        : "exact",
    isRange,
  };
}

export interface VariantSelection {
  chip?: string | null;
  storage?: string | null;
  colour?: string | null;
}

/**
 * Resolves the exact variant matching a set of selections, only constraining
 * on dimensions that are actually provided. Returns `undefined` when no
 * variant matches — callers must show "Configuration Not Available" rather
 * than falling back to a different variant's price.
 */
export function resolveVariant(variants: ProductVariant[], selection: VariantSelection): ProductVariant | undefined {
  return variants.find((v) => {
    if (selection.chip != null && v.chip !== selection.chip) return false;
    if (selection.storage != null && v.storage !== selection.storage) return false;
    if (selection.colour != null && v.colour !== selection.colour) return false;
    return true;
  });
}
