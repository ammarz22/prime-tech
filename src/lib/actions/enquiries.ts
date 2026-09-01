"use server";

import { createClient } from "@/lib/supabase/server";
import { enquirySchema, type EnquiryInput } from "@/lib/validations/enquiry";

export interface EnquiryResult {
  success: boolean;
  error?: string;
}

export async function submitEnquiry(input: EnquiryInput): Promise<EnquiryResult> {
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid enquiry." };
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return {
      success: false,
      error: "Enquiries aren't connected yet — the site owner needs to configure Supabase.",
    };
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  const { error } = await supabase.from("enquiries").insert({
    user_id: userData.user?.id ?? null,
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    product_id: parsed.data.productId ?? null,
    variant_id: parsed.data.variantId ?? null,
    preferred_branch_id: parsed.data.preferredBranchId ?? null,
    message: parsed.data.message || null,
    configuration: parsed.data.configuration || null,
    preferred_model: parsed.data.preferredModel || null,
    preferred_storage: parsed.data.preferredStorage || null,
    preferred_colour: parsed.data.preferredColour || null,
    consent: parsed.data.consent ?? false,
  });

  if (error) {
    return { success: false, error: "Something went wrong submitting your enquiry. Please try again." };
  }

  return { success: true };
}
