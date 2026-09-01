"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { branchSchema, type BranchInput } from "@/lib/validations/branch";

export interface ActionResult {
  success: boolean;
  error?: string;
  id?: string;
}

function toRow(data: BranchInput) {
  return {
    name: data.name,
    slug: data.slug,
    address: data.address || null,
    city: data.city || null,
    phone: data.phone || null,
    whatsapp: data.whatsapp || null,
    maps_url: data.mapsUrl || null,
    status: data.status,
  };
}

export async function createBranchAction(input: BranchInput): Promise<ActionResult> {
  const parsed = branchSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { data, error } = await supabase.from("branches").insert(toRow(parsed.data)).select("id").single();
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/branches");
  revalidatePath("/branches");
  return { success: true, id: data.id };
}

export async function updateBranchAction(id: string, input: BranchInput): Promise<ActionResult> {
  const parsed = branchSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { error } = await supabase.from("branches").update(toRow(parsed.data)).eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/branches");
  revalidatePath("/branches");
  return { success: true, id };
}

export async function deleteBranchAction(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("branches").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/branches");
  revalidatePath("/branches");
  return { success: true };
}
