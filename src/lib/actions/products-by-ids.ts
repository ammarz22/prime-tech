"use server";

import { createClient } from "@/lib/supabase/server";
import type { ProductWithRelations } from "@/types/database";

const PRODUCT_SELECT = `
  *,
  brand:brands(*),
  category:categories(*),
  variants:product_variants(*),
  images:product_images(*)
`;

/**
 * Hydrates a list of product IDs (from localStorage — Saved Products or
 * Recently Viewed) into full product data, in the same order as `ids`.
 * Shared by both features so there's one query shape to maintain.
 */
export async function getProductsByIds(ids: string[]): Promise<ProductWithRelations[]> {
  if (ids.length === 0 || !process.env.NEXT_PUBLIC_SUPABASE_URL) return [];

  const supabase = await createClient();
  const { data } = await supabase.from("products").select(PRODUCT_SELECT).in("id", ids);
  const rows = (data ?? []) as ProductWithRelations[];

  const byId = new Map(rows.map((row) => [row.id, row]));
  return ids.map((id) => byId.get(id)).filter((row): row is ProductWithRelations => Boolean(row));
}
