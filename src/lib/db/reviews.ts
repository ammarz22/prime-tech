import { createClient } from "@/lib/supabase/server";
import type { Review } from "@/types/database";

function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
}

export async function getApprovedReviews(productId: string): Promise<Review[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .eq("status", "approved")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data;
}
