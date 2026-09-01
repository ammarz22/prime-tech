"use server";

import { createClient } from "@/lib/supabase/server";
import { stockNotificationSchema, type StockNotificationInput } from "@/lib/validations/stock-notification";

export interface StockNotificationResult {
  success: boolean;
  error?: string;
}

export async function submitStockNotification(input: StockNotificationInput): Promise<StockNotificationResult> {
  const parsed = stockNotificationSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid request." };
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { success: false, error: "Not connected yet — the site owner needs to configure Supabase." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("stock_notifications").insert({
    product_id: parsed.data.productId,
    variant_id: parsed.data.variantId ?? null,
    email: parsed.data.email,
  });

  if (error) {
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true };
}
