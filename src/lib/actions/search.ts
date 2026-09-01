"use server";

import { searchProducts } from "@/lib/db/products";

export interface SearchResult {
  id: string;
  slug: string;
  name: string;
  shortDescription: string | null;
  productGroup: string;
  primaryImage: string | null;
  categorySlug: string | null;
  brandName: string | null;
}

export async function searchAction(term: string): Promise<SearchResult[]> {
  const products = await searchProducts(term);
  return products.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    shortDescription: p.short_description,
    productGroup: p.product_group,
    primaryImage: p.images.find((img) => img.is_primary)?.url ?? p.images[0]?.url ?? null,
    categorySlug: p.category?.slug ?? null,
    brandName: p.brand?.name ?? null,
  }));
}
