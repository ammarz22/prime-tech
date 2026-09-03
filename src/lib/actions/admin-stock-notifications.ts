"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function setStockNotificationNotifiedAction(id: string, notified: boolean) {
  const supabase = await createClient();
  const { error } = await supabase.from("stock_notifications").update({ notified }).eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/stock-notifications");
  return { success: true };
}
