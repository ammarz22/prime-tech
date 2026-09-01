"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { iphone18PackageSchema, type Iphone18PackageInput } from "@/lib/validations/iphone18-package";

export interface ActionResult {
  success: boolean;
  error?: string;
  id?: string;
}

function toRow(data: Iphone18PackageInput) {
  return {
    name: data.name,
    tier: data.tier || null,
    description: data.description || null,
    included_items: data.includedItems
      ? data.includedItems
          .split(/[,\n]/)
          .map((item) => item.trim())
          .filter(Boolean)
      : [],
    price: data.price ?? null,
    benefit: data.benefit || null,
    availability: data.availability,
    is_featured: data.isFeatured,
    sort_order: data.sortOrder,
    updated_at: new Date().toISOString(),
  };
}

function revalidatePackagePaths() {
  revalidatePath("/admin/iphone18-packages");
  revalidatePath("/iphone-18-preorder");
}

export async function createPackageAction(input: Iphone18PackageInput): Promise<ActionResult> {
  const parsed = iphone18PackageSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { data, error } = await supabase.from("iphone18_packages").insert(toRow(parsed.data)).select("id").single();
  if (error) return { success: false, error: error.message };

  revalidatePackagePaths();
  return { success: true, id: data.id };
}

export async function updatePackageAction(id: string, input: Iphone18PackageInput): Promise<ActionResult> {
  const parsed = iphone18PackageSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { error } = await supabase.from("iphone18_packages").update(toRow(parsed.data)).eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePackagePaths();
  return { success: true, id };
}

export async function deletePackageAction(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("iphone18_packages").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePackagePaths();
  return { success: true };
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB, matches the storage bucket limit

function extensionFor(mimeType: string) {
  return { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }[mimeType] ?? "jpg";
}

export async function uploadPackageImageAction(packageId: string, formData: FormData): Promise<ActionResult> {
  const file = formData.get("file");

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
  const path = `packages/${packageId}/${crypto.randomUUID()}.${extensionFor(file.type)}`;

  const { error: uploadError } = await supabase.storage.from("product-images").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (uploadError) return { success: false, error: uploadError.message };

  const { data: publicUrl } = supabase.storage.from("product-images").getPublicUrl(path);

  const { error: updateError } = await supabase
    .from("iphone18_packages")
    .update({ image_url: publicUrl.publicUrl, updated_at: new Date().toISOString() })
    .eq("id", packageId);
  if (updateError) return { success: false, error: updateError.message };

  revalidatePackagePaths();
  return { success: true };
}
