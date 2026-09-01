"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const profileSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(120),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
});

export async function updateProfileAction(input: z.infer<typeof profileSchema>) {
  const parsed = profileSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return { success: false, error: "Not connected." };

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return { success: false, error: "Not signed in." };

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: parsed.data.fullName, phone: parsed.data.phone || null })
    .eq("id", userData.user.id);

  if (error) return { success: false, error: "Could not update profile." };

  revalidatePath("/account/settings");
  return { success: true };
}
