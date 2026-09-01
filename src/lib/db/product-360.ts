import { createClient } from "@/lib/supabase/server";
import type { Product360Frame } from "@/types/database";

function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
}

/**
 * Returns the frames for the active, enabled 360° set for a product — the
 * variant-specific set if one exists and has frames, else falls back to the
 * product-level set per spec — never a wrong-colour representation.
 * Returns `null` when no real photography has been uploaded yet.
 */
export async function getProduct360Frames(productId: string, variantId?: string | null): Promise<Product360Frame[] | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();

  async function fetchFrames(scopedVariantId: string | null) {
    let query = supabase
      .from("product_360_sets")
      .select("id, product_360_frames(*)")
      .eq("product_id", productId)
      .eq("enabled", true);
    query = scopedVariantId ? query.eq("variant_id", scopedVariantId) : query.is("variant_id", null);
    const { data } = await query.maybeSingle();
    const frames = (data?.product_360_frames as Product360Frame[] | undefined) ?? [];
    return frames.length > 0 ? [...frames].sort((a, b) => a.sort_order - b.sort_order) : null;
  }

  if (variantId) {
    const variantFrames = await fetchFrames(variantId);
    if (variantFrames) return variantFrames;
  }
  return fetchFrames(null);
}
