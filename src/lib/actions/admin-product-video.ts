"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/lib/actions/admin-images";

const VIDEO_TYPES = ["video/mp4", "video/webm"];
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB, matches the storage bucket limit
const POSTER_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_POSTER_SIZE = 5 * 1024 * 1024;

function videoExtensionFor(mimeType: string) {
  return { "video/mp4": "mp4", "video/webm": "webm" }[mimeType] ?? "mp4";
}

function posterExtensionFor(mimeType: string) {
  return { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }[mimeType] ?? "jpg";
}

export async function uploadProductVideoAction(productId: string, formData: FormData): Promise<ActionResult> {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { success: false, error: "Choose a video file." };
  }
  if (!VIDEO_TYPES.includes(file.type)) {
    return { success: false, error: "Only MP4 or WebM videos are allowed." };
  }
  if (file.size > MAX_VIDEO_SIZE) {
    return { success: false, error: "Video must be under 50MB." };
  }

  const supabase = await createClient();
  const path = `${productId}/${crypto.randomUUID()}.${videoExtensionFor(file.type)}`;

  const { error: uploadError } = await supabase.storage.from("product-videos").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (uploadError) return { success: false, error: uploadError.message };

  const { data: publicUrl } = supabase.storage.from("product-videos").getPublicUrl(path);

  const { error: updateError } = await supabase
    .from("products")
    .update({ video_url: publicUrl.publicUrl })
    .eq("id", productId);
  if (updateError) return { success: false, error: updateError.message };

  revalidatePath(`/admin/products/${productId}`);
  return { success: true };
}

export async function uploadProductVideoPosterAction(productId: string, formData: FormData): Promise<ActionResult> {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { success: false, error: "Choose a poster image." };
  }
  if (!POSTER_TYPES.includes(file.type)) {
    return { success: false, error: "Only JPEG, PNG or WebP images are allowed." };
  }
  if (file.size > MAX_POSTER_SIZE) {
    return { success: false, error: "Poster image must be under 5MB." };
  }

  const supabase = await createClient();
  const path = `${productId}/video-poster-${crypto.randomUUID()}.${posterExtensionFor(file.type)}`;

  const { error: uploadError } = await supabase.storage.from("product-images").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (uploadError) return { success: false, error: uploadError.message };

  const { data: publicUrl } = supabase.storage.from("product-images").getPublicUrl(path);

  const { error: updateError } = await supabase
    .from("products")
    .update({ video_poster_url: publicUrl.publicUrl })
    .eq("id", productId);
  if (updateError) return { success: false, error: updateError.message };

  revalidatePath(`/admin/products/${productId}`);
  return { success: true };
}

export async function deleteProductVideoAction(productId: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("products")
    .update({ video_url: null, video_poster_url: null })
    .eq("id", productId);
  if (error) return { success: false, error: error.message };

  revalidatePath(`/admin/products/${productId}`);
  return { success: true };
}
