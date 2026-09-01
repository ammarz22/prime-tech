"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { productSchema, type ProductInput } from "@/lib/validations/product";

export interface ActionResult {
  success: boolean;
  error?: string;
  id?: string;
}

function toRow(data: ProductInput) {
  return {
    name: data.name,
    slug: data.slug,
    brand_id: data.brandId || null,
    category_id: data.categoryId || null,
    product_group: data.productGroup,
    short_description: data.shortDescription || null,
    description: data.description || null,
    status: data.status,
    featured: data.featured,
    new_arrival: data.newArrival,
    base_price: data.basePrice ? Number(data.basePrice) : null,
    price_label: data.priceLabel,
  };
}

export async function createProductAction(input: ProductInput): Promise<ActionResult> {
  const parsed = productSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { data, error } = await supabase.from("products").insert(toRow(parsed.data)).select("id").single();
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/products");
  return { success: true, id: data.id };
}

export async function updateProductAction(id: string, input: ProductInput): Promise<ActionResult> {
  const parsed = productSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { error } = await supabase.from("products").update(toRow(parsed.data)).eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/products");
  return { success: true, id };
}

export async function deleteProductAction(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/products");
  return { success: true };
}

export async function toggleProductFieldAction(
  id: string,
  field: "featured" | "new_arrival" | "status",
  value: boolean | string,
): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("products").update({ [field]: value }).eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/products");
  return { success: true };
}
