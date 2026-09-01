"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { categorySchema, type CategoryInput } from "@/lib/validations/category";

export interface ActionResult {
  success: boolean;
  error?: string;
  id?: string;
}

function toRow(data: CategoryInput) {
  return {
    name: data.name,
    slug: data.slug,
    sort_order: data.sortOrder,
  };
}

export async function createCategoryAction(input: CategoryInput): Promise<ActionResult> {
  const parsed = categorySchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { data, error } = await supabase.from("categories").insert(toRow(parsed.data)).select("id").single();
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/categories");
  return { success: true, id: data.id };
}

export async function updateCategoryAction(id: string, input: CategoryInput): Promise<ActionResult> {
  const parsed = categorySchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { error } = await supabase.from("categories").update(toRow(parsed.data)).eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/categories");
  return { success: true, id };
}

export async function deleteCategoryAction(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/categories");
  return { success: true };
}
