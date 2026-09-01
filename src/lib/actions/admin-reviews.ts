"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ReviewStatus } from "@/types/database";

export interface ActionResult {
  success: boolean;
  error?: string;
}

export async function updateReviewStatusAction(id: string, status: ReviewStatus): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("reviews").update({ status }).eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/reviews");
  return { success: true };
}

export async function toggleReviewVerifiedAction(id: string, verified: boolean): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("reviews").update({ verified }).eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/reviews");
  return { success: true };
}

export async function deleteReviewAction(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/reviews");
  return { success: true };
}
