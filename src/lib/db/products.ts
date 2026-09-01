import { createClient } from "@/lib/supabase/server";
import type { ProductGroup, ProductWithRelations } from "@/types/database";

const PRODUCT_SELECT = `
  *,
  brand:brands(*),
  category:categories(*),
  variants:product_variants(*),
  images:product_images(*)
`;

export interface ProductFilters {
  productGroup?: ProductGroup;
  categorySlug?: string;
  brandSlug?: string;
  search?: string;
  featured?: boolean;
  newArrival?: boolean;
  /** Matches products with at least one variant at this storage tier. */
  storage?: string;
  sort?: "featured" | "newest" | "price_asc" | "price_desc";
  limit?: number;
  offset?: number;
  /** Include `coming_soon` items. Off by default — those belong only in a
   * dedicated "Coming Soon" section, never mixed into a browsable grid. */
  includeComingSoon?: boolean;
}

function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
}

type ProductRow = ProductWithRelations;

function normalize(row: ProductRow): ProductWithRelations {
  return {
    ...row,
    variants: [...(row.variants ?? [])].sort((a, b) => a.sort_order - b.sort_order),
    images: [...(row.images ?? [])].sort((a, b) => a.sort_order - b.sort_order),
  };
}

export async function getProducts(filters: ProductFilters = {}): Promise<ProductWithRelations[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createClient();
  let query = supabase.from("products").select(PRODUCT_SELECT).eq("status", "published");
  if (!filters.includeComingSoon) query = query.neq("price_label", "coming_soon");

  if (filters.productGroup) query = query.eq("product_group", filters.productGroup);
  if (filters.featured) query = query.eq("featured", true);
  if (filters.newArrival) query = query.eq("new_arrival", true);
  if (filters.search) query = query.ilike("name", `%${filters.search}%`);
  if (filters.categorySlug) {
    const { data: category } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", filters.categorySlug)
      .maybeSingle();
    // No matching category (e.g. not created yet) must mean zero results,
    // never "skip the filter" — otherwise this silently returns the whole
    // unfiltered catalogue instead of an empty list.
    query = query.eq("category_id", category?.id ?? "00000000-0000-0000-0000-000000000000");
  }
  if (filters.brandSlug) {
    const { data: brand } = await supabase
      .from("brands")
      .select("id")
      .eq("slug", filters.brandSlug)
      .maybeSingle();
    query = query.eq("brand_id", brand?.id ?? "00000000-0000-0000-0000-000000000000");
  }
  if (filters.storage) {
    const { data: variants } = await supabase.from("product_variants").select("product_id").eq("storage", filters.storage);
    const productIds = [...new Set((variants ?? []).map((v) => v.product_id))];
    // No matches — force an empty result rather than an unfiltered one.
    query = query.in("id", productIds.length > 0 ? productIds : ["00000000-0000-0000-0000-000000000000"]);
  }

  switch (filters.sort) {
    case "newest":
      query = query.order("created_at", { ascending: false });
      break;
    case "price_asc":
      query = query.order("base_price", { ascending: true, nullsFirst: false });
      break;
    case "price_desc":
      query = query.order("base_price", { ascending: false, nullsFirst: false });
      break;
    default:
      query = query.order("featured", { ascending: false }).order("created_at", { ascending: false });
  }

  if (filters.limit) query = query.limit(filters.limit);
  if (filters.offset) query = query.range(filters.offset, filters.offset + (filters.limit ?? 24) - 1);

  const { data, error } = await query;
  if (error || !data) return [];
  return data.map(normalize);
}

export async function getProductBySlug(slug: string): Promise<ProductWithRelations | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error || !data) return null;
  return normalize(data);
}

/** Cross-sell categories to blend in alongside same-category matches, per
 * category slug — kept deliberately narrow (e.g. Galaxy phones only ever
 * relate to other Galaxy phones, never an Apple accessory). */
const CROSS_SELL_CATEGORIES: Record<string, string[]> = {
  iphone: ["airpods", "apple-accessories"],
  mac: ["apple-accessories"],
  ipad: ["apple-accessories"],
  "galaxy-s25": ["galaxy-s26"],
  "galaxy-s26": ["galaxy-s25"],
};

async function fetchPublishedByCategoryIds(
  supabase: Awaited<ReturnType<typeof createClient>>,
  categoryIds: string[],
  excludeId: string,
  limit: number,
) {
  if (categoryIds.length === 0 || limit <= 0) return [];
  const { data } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("status", "published")
    .neq("price_label", "coming_soon")
    .neq("id", excludeId)
    .in("category_id", categoryIds)
    .limit(limit);
  return (data ?? []).map(normalize);
}

export async function getRelatedProducts(product: ProductWithRelations, limit = 4) {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();

  const sameCategory = product.category_id
    ? await fetchPublishedByCategoryIds(supabase, [product.category_id], product.id, limit)
    : [];

  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const crossSellSlugs = product.category?.slug ? CROSS_SELL_CATEGORIES[product.category.slug] : undefined;
  if (!crossSellSlugs || crossSellSlugs.length === 0) return sameCategory;

  const { data: crossCategories } = await supabase.from("categories").select("id").in("slug", crossSellSlugs);
  const crossCategoryIds = (crossCategories ?? []).map((c) => c.id);
  const remaining = limit - sameCategory.length;
  const crossSell = await fetchPublishedByCategoryIds(supabase, crossCategoryIds, product.id, remaining);

  const seen = new Set(sameCategory.map((p) => p.id));
  return [...sameCategory, ...crossSell.filter((p) => !seen.has(p.id))].slice(0, limit);
}

export async function searchProducts(term: string, limit = 8): Promise<ProductWithRelations[]> {
  if (!isSupabaseConfigured() || !term.trim()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("status", "published")
    .neq("price_label", "coming_soon")
    .or(`name.ilike.%${term}%,short_description.ilike.%${term}%`)
    .limit(limit);
  if (error || !data) return [];
  return data.map(normalize);
}

export async function getCategories() {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = await supabase.from("categories").select("*").order("sort_order");
  return data ?? [];
}

export async function getBrands() {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = await supabase.from("brands").select("*").order("name");
  return data ?? [];
}
