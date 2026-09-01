"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { EnquiryStatus } from "@/types/database";

export async function updateEnquiryStatusAction(id: string, status: EnquiryStatus) {
  const supabase = await createClient();
  const { error } = await supabase.from("enquiries").update({ status }).eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/enquiries");
  return { success: true };
}
