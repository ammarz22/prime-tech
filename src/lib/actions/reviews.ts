"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { reviewSchema, type ReviewInput } from "@/lib/validations/review";

export interface ReviewResult {
  success: boolean;
  error?: string;
}

export async function submitReview(input: ReviewInput): Promise<ReviewResult> {
  const parsed = reviewSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid review." };
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { success: false, error: "Reviews aren't connected yet — the site owner needs to configure Supabase." };
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  const { error } = await supabase.from("reviews").insert({
    product_id: parsed.data.productId,
    user_id: userData.user?.id ?? null,
    customer_name: parsed.data.customerName,
    rating: parsed.data.rating,
    title: parsed.data.title || null,
    body: parsed.data.body,
  });

  if (error) {
    return { success: false, error: "Something went wrong submitting your review. Please try again." };
  }

  revalidatePath("/admin/reviews");
  return { success: true };
}
