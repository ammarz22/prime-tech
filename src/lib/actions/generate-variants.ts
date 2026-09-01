"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface GenerateVariantsResult {
  success: boolean;
  error?: string;
  created?: number;
}

function parseList(value: string) {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function skuSegment(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]+/g, "");
}

/**
 * Bulk-generates draft variant rows for every combination of the given
 * option values (empty price, `coming_soon` availability) — the admin fills
 * in price/availability per row afterwards via the existing edit flow.
 * Combinations that already exist on this product are skipped rather than
 * duplicated.
 */
export async function generateVariantsAction(
  productId: string,
  input: { colours: string; storages: string; chips: string },
): Promise<GenerateVariantsResult> {
  const colours = parseList(input.colours);
  const storages = parseList(input.storages);
  const chips = parseList(input.chips);

  if (colours.length === 0 && storages.length === 0 && chips.length === 0) {
    return { success: false, error: "Enter at least one colour, storage, or chip value." };
  }

  const colourList: (string | null)[] = colours.length > 0 ? colours : [null];
  const storageList: (string | null)[] = storages.length > 0 ? storages : [null];
  const chipList: (string | null)[] = chips.length > 0 ? chips : [null];

  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("product_variants")
    .select("colour, storage, chip")
    .eq("product_id", productId);

  const existingKeys = new Set((existing ?? []).map((v) => `${v.chip ?? ""}|${v.storage ?? ""}|${v.colour ?? ""}`));
  const skuPrefix = skuSegment(productId.slice(0, 8));

  const rows: {
    product_id: string;
    name: string;
    sku: string;
    storage: string | null;
    colour: string | null;
    chip: string | null;
    availability: "coming_soon";
    price: null;
    sort_order: number;
  }[] = [];

  let sortOrder = existing?.length ?? 0;
  for (const chip of chipList) {
    for (const storage of storageList) {
      for (const colour of colourList) {
        const key = `${chip ?? ""}|${storage ?? ""}|${colour ?? ""}`;
        if (existingKeys.has(key)) continue;
        existingKeys.add(key);

        const nameParts = [chip, storage, colour].filter(Boolean) as string[];
        const skuParts = [skuPrefix, chip, storage, colour].filter(Boolean).map((s) => skuSegment(s as string));

        rows.push({
          product_id: productId,
          name: nameParts.join(" · ") || "Default",
          sku: skuParts.join("-"),
          storage,
          colour,
          chip,
          availability: "coming_soon",
          price: null,
          sort_order: sortOrder++,
        });
      }
    }
  }

  if (rows.length === 0) {
    return { success: false, error: "All of those combinations already exist on this product." };
  }

  const { error } = await supabase.from("product_variants").insert(rows);
  if (error) return { success: false, error: error.message };

  revalidatePath(`/admin/products/${productId}`);
  return { success: true, created: rows.length };
}
