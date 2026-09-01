"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { brandSchema, type BrandInput } from "@/lib/validations/brand";

export interface ActionResult {
  success: boolean;
  error?: string;
  id?: string;
}

function toRow(data: BrandInput) {
  return {
    name: data.name,
    slug: data.slug,
    logo_url: data.logoUrl || null,
  };
}

export async function createBrandAction(input: BrandInput): Promise<ActionResult> {
  const parsed = brandSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { data, error } = await supabase.from("brands").insert(toRow(parsed.data)).select("id").single();
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/brands");
  return { success: true, id: data.id };
}

export async function updateBrandAction(id: string, input: BrandInput): Promise<ActionResult> {
  const parsed = brandSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { error } = await supabase.from("brands").update(toRow(parsed.data)).eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/brands");
  return { success: true, id };
}

export async function deleteBrandAction(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("brands").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/brands");
  return { success: true };
}
