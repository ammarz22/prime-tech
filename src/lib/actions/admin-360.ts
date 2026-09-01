"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface ActionResult {
  success: boolean;
  error?: string;
  id?: string;
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024;

function extensionFor(mimeType: string) {
  return { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }[mimeType] ?? "jpg";
}

/** Returns the product-level 360° set for a product, creating an empty
 * (disabled) one if it doesn't exist yet — admin UI always has something to
 * upload frames into. */
export async function getOrCreate360SetAction(productId: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("product_360_sets")
    .select("id")
    .eq("product_id", productId)
    .is("variant_id", null)
    .maybeSingle();
  if (existing) return { success: true, id: existing.id };

  const { data, error } = await supabase
    .from("product_360_sets")
    .insert({ product_id: productId, variant_id: null, enabled: false })
    .select("id")
    .single();
  if (error) return { success: false, error: error.message };
  return { success: true, id: data.id };
}

export async function uploadFrameAction(productId: string, setId: string, formData: FormData): Promise<ActionResult> {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { success: false, error: "Choose an image file." };
  if (!ALLOWED_TYPES.includes(file.type)) return { success: false, error: "Only JPEG, PNG or WebP images are allowed." };
  if (file.size > MAX_SIZE) return { success: false, error: "Image must be under 5MB." };

  const supabase = await createClient();
  const { count } = await supabase.from("product_360_frames").select("id", { count: "exact", head: true }).eq("set_id", setId);
  const nextOrder = count ?? 0;

  const path = `360/${productId}/${setId}/${String(nextOrder).padStart(3, "0")}.${extensionFor(file.type)}`;
  const { error: uploadError } = await supabase.storage.from("product-images").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (uploadError) return { success: false, error: uploadError.message };

  const { data: publicUrl } = supabase.storage.from("product-images").getPublicUrl(path);

  const { error: insertError } = await supabase
    .from("product_360_frames")
    .insert({ set_id: setId, url: publicUrl.publicUrl, sort_order: nextOrder });
  if (insertError) return { success: false, error: insertError.message };

  revalidatePath(`/admin/products/${productId}`);
  return { success: true };
}

export async function deleteFrameAction(productId: string, frameId: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("product_360_frames").delete().eq("id", frameId);
  if (error) return { success: false, error: error.message };

  revalidatePath(`/admin/products/${productId}`);
  return { success: true };
}

export async function reorderFramesAction(productId: string, orderedFrameIds: string[]): Promise<ActionResult> {
  const supabase = await createClient();
  for (let i = 0; i < orderedFrameIds.length; i++) {
    const { error } = await supabase.from("product_360_frames").update({ sort_order: i }).eq("id", orderedFrameIds[i]);
    if (error) return { success: false, error: error.message };
  }
  revalidatePath(`/admin/products/${productId}`);
  return { success: true };
}

export async function toggle360SetEnabledAction(productId: string, setId: string, enabled: boolean): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("product_360_sets").update({ enabled }).eq("id", setId);
  if (error) return { success: false, error: error.message };

  revalidatePath(`/admin/products/${productId}`);
  revalidatePath(`/products/${productId}`);
  return { success: true };
}
