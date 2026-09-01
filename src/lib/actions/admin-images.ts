"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface ActionResult {
  success: boolean;
  error?: string;
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB, matches the storage bucket limit

function extensionFor(mimeType: string) {
  return { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }[mimeType] ?? "jpg";
}

export async function uploadProductImageAction(
  productId: string,
  formData: FormData,
): Promise<ActionResult> {
  const file = formData.get("file");
  const altText = formData.get("altText");
  const variantId = formData.get("variantId");

  if (!(file instanceof File) || file.size === 0) {
    return { success: false, error: "Choose an image file." };
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { success: false, error: "Only JPEG, PNG or WebP images are allowed." };
  }
  if (file.size > MAX_SIZE) {
    return { success: false, error: "Image must be under 5MB." };
  }

  const supabase = await createClient();
  const path = `${productId}/${crypto.randomUUID()}.${extensionFor(file.type)}`;

  const { error: uploadError } = await supabase.storage.from("product-images").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (uploadError) return { success: false, error: uploadError.message };

  const { data: publicUrl } = supabase.storage.from("product-images").getPublicUrl(path);

  const { count } = await supabase
    .from("product_images")
    .select("id", { count: "exact", head: true })
    .eq("product_id", productId);
  const isFirst = !count;

  const { error: insertError } = await supabase.from("product_images").insert({
    product_id: productId,
    variant_id: typeof variantId === "string" && variantId ? variantId : null,
    url: publicUrl.publicUrl,
    alt_text: typeof altText === "string" && altText ? altText : null,
    sort_order: count ?? 0,
    is_primary: isFirst,
  });
  if (insertError) return { success: false, error: insertError.message };

  revalidatePath(`/admin/products/${productId}`);
  return { success: true };
}

export async function assignImageVariantAction(
  productId: string,
  imageId: string,
  variantId: string | null,
): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("product_images").update({ variant_id: variantId }).eq("id", imageId);
  if (error) return { success: false, error: error.message };

  revalidatePath(`/admin/products/${productId}`);
  return { success: true };
}

export async function deleteProductImageAction(productId: string, imageId: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("product_images").delete().eq("id", imageId);
  if (error) return { success: false, error: error.message };

  revalidatePath(`/admin/products/${productId}`);
  return { success: true };
}

export async function setPrimaryImageAction(productId: string, imageId: string): Promise<ActionResult> {
  const supabase = await createClient();

  const { error: clearError } = await supabase
    .from("product_images")
    .update({ is_primary: false })
    .eq("product_id", productId);
  if (clearError) return { success: false, error: clearError.message };

  const { error: setError } = await supabase.from("product_images").update({ is_primary: true }).eq("id", imageId);
  if (setError) return { success: false, error: setError.message };

  revalidatePath(`/admin/products/${productId}`);
  return { success: true };
}
