"use server";

import { createClient } from "@/lib/supabase/server";
import type { PriceHistory } from "@/types/database";

export async function getPriceHistory(variantId: string): Promise<PriceHistory[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("price_history")
    .select("*")
    .eq("variant_id", variantId)
    .order("changed_at", { ascending: false });
  return data ?? [];
}
