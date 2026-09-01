import { createClient } from "@/lib/supabase/server";
import type { Package } from "@/types/database";

function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
}

/** Packages visible on the public iPhone 18 page — excludes `coming_soon` rows, matching how draft/unpriced catalogue items are kept out of browsable grids elsewhere. */
export async function getVisibleIphone18Packages(): Promise<Package[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("iphone18_packages")
    .select("*")
    .neq("availability", "coming_soon")
    .order("sort_order");
  return data ?? [];
}
