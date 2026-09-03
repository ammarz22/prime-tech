"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { variantSchema, type VariantInput } from "@/lib/validations/variant";

export interface ActionResult {
  success: boolean;
  error?: string;
  id?: string;
}

function toRow(data: VariantInput) {
  return {
    name: data.name,
    sku: data.sku || null,
    storage: data.storage || null,
    memory: data.memory || null,
    colour: data.colour || null,
    screen_size: data.screenSize || null,
    chip: data.chip || null,
    sim_type: data.simType || null,
    price: data.price ? Number(data.price) : null,
    availability: data.availability,
  };
}

export async function createVariantAction(productId: string, input: VariantInput): Promise<ActionResult> {
  const parsed = variantSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { count } = await supabase
    .from("product_variants")
    .select("id", { count: "exact", head: true })
    .eq("product_id", productId);

  const { data, error } = await supabase
    .from("product_variants")
    .insert({ ...toRow(parsed.data), product_id: productId, sort_order: count ?? 0 })
    .select("id")
    .single();
  if (error) return { success: false, error: error.message };

  revalidatePath(`/admin/products/${productId}`);
  return { success: true, id: data.id };
}

export async function updateVariantAction(
  productId: string,
  variantId: string,
  input: VariantInput,
): Promise<ActionResult> {
  const parsed = variantSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { error } = await supabase.from("product_variants").update(toRow(parsed.data)).eq("id", variantId);
  if (error) return { success: false, error: error.message };

  revalidatePath(`/admin/products/${productId}`);
  return { success: true, id: variantId };
}

export async function deleteVariantAction(productId: string, variantId: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("product_variants").delete().eq("id", variantId);
  if (error) return { success: false, error: error.message };

  revalidatePath(`/admin/products/${productId}`);
  return { success: true };
}
