"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateSiteSettingsAction(values: Record<string, string>) {
  const supabase = await createClient();

  const rows = Object.entries(values).map(([key, value]) => ({
    key,
    value: value || null,
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
  if (error) return { success: false, error: error.message };

  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
  return { success: true };
}
