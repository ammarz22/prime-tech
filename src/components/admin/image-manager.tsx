"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Star, Trash2, Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  uploadProductImageAction,
  deleteProductImageAction,
  setPrimaryImageAction,
  assignImageVariantAction,
} from "@/lib/actions/admin-images";
import type { ProductImage, ProductVariant } from "@/types/database";

const NO_VARIANT = "none";

/** Encodes the combined dropdown value understood by the server action —
 * see `decodeTarget` in `admin-images.ts`. */
function targetValueFor(image: { variant_id: string | null; colour: string | null }) {
  if (image.colour) return `colour:${image.colour}`;
  if (image.variant_id) return `variant:${image.variant_id}`;
  return NO_VARIANT;
}

export function ImageManager({
  productId,
  images,
  variants = [],
}: {
  productId: string;
  images: ProductImage[];
  variants?: ProductVariant[];
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const altInputRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState<string>(NO_VARIANT);

  // Distinct colours across this product's variants — assigning an image to
  // a colour applies it across every storage/SIM-type/chip row that shares
  // it, rather than requiring one photo per exact variant combination.
  const colours = Array.from(new Set(variants.map((v) => v.colour).filter((c): c is string => Boolean(c))));

  function targetLabel(value: string) {
    if (value === NO_VARIANT) return "All variants";
    if (value.startsWith("colour:")) return `Colour: ${value.slice("colour:".length)}`;
    const v = variants.find((x) => `variant:${x.id}` === value);
    return v ? [v.colour, v.storage].filter(Boolean).join(" · ") || v.name : "All variants";
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError("Choose an image file.");
      return;
    }
    setError(null);
    setUploading(true);

    const formData = new FormData();
    formData.set("file", file);
    formData.set("altText", altInputRef.current?.value ?? "");
    formData.set("target", uploadTarget);

    const result = await uploadProductImageAction(productId, formData);
    setUploading(false);
    if (!result.success) {
      setError(result.error ?? "Upload failed.");
      return;
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (altInputRef.current) altInputRef.current.value = "";
    setUploadTarget(NO_VARIANT);
  }

  async function handleDelete(imageId: string) {
    if (!confirm("Delete this image?")) return;
    setPendingId(imageId);
    await deleteProductImageAction(productId, imageId);
    setPendingId(null);
  }

  async function handleSetPrimary(imageId: string) {
    setPendingId(imageId);
    await setPrimaryImageAction(productId, imageId);
    setPendingId(null);
  }

  async function handleAssignVariant(imageId: string, targetValue: string) {
    setPendingId(imageId);
    await assignImageVariantAction(productId, imageId, targetValue);
    setPendingId(null);
  }

  return (
    <div className="rounded-2xl border border-ink/8">
      <div className="border-b border-ink/8 px-5 py-3">
        <p className="text-sm font-medium">Images</p>
      </div>

      {images.length === 0 ? (
        <p className="px-5 py-6 text-center text-sm text-ink/45">
          No images yet — this product shows the &quot;Image Pending&quot; placeholder until you add one.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-3">
          {images.map((image) => (
            <div key={image.id} className="space-y-1.5">
              <div className="group relative aspect-square overflow-hidden rounded-xl border border-ink/8 bg-paper-soft">
                <Image src={image.url} alt={image.alt_text ?? ""} fill sizes="150px" className="object-cover" />
                {image.is_primary && (
                  <span className="absolute left-1.5 top-1.5 rounded-full bg-brand px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    Primary
                  </span>
                )}
                <div className="absolute inset-0 flex items-end justify-end gap-1 bg-gradient-to-t from-black/50 via-transparent to-transparent p-1.5 opacity-0 transition group-hover:opacity-100">
                  {!image.is_primary && (
                    <button
                      type="button"
                      onClick={() => handleSetPrimary(image.id)}
                      disabled={pendingId === image.id}
                      aria-label="Set as primary image"
                      className="flex size-7 items-center justify-center rounded-full bg-white/90 text-ink hover:bg-white"
                    >
                      <Star className="size-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(image.id)}
                    disabled={pendingId === image.id}
                    aria-label="Delete image"
                    className="flex size-7 items-center justify-center rounded-full bg-white/90 text-destructive hover:bg-white"
                  >
                    {pendingId === image.id ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
                  </button>
                </div>
              </div>
              {variants.length > 0 && (
                <Select
                  value={targetValueFor(image)}
                  onValueChange={(v) => handleAssignVariant(image.id, v as string)}
                >
                  <SelectTrigger className={cn("h-7 w-full text-xs")}>
                    <SelectValue>{(v: string) => targetLabel(v)}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={NO_VARIANT}>All variants</SelectItem>
                    {colours.length > 0 && (
                      <>
                        {colours.map((c) => (
                          <SelectItem key={`colour:${c}`} value={`colour:${c}`}>
                            Colour: {c}
                          </SelectItem>
                        ))}
                      </>
                    )}
                    {variants.map((v) => (
                      <SelectItem key={v.id} value={`variant:${v.id}`}>
                        {[v.colour, v.storage, v.sim_type].filter(Boolean).join(" · ") || v.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleUpload} className={cn("space-y-3 border-t border-ink/8 p-5", images.length === 0 && "border-t-0")}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor="img-file">Upload Image</Label>
            <Input id="img-file" ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="img-alt">Alt Text</Label>
            <Input id="img-alt" ref={altInputRef} placeholder="Optional" />
          </div>
          {variants.length > 0 && (
            <div className="space-y-1.5">
              <Label>Assign to Variant</Label>
              <Select value={uploadTarget} onValueChange={(v) => setUploadTarget(v as string)}>
                <SelectTrigger className="w-full">
                  <SelectValue>{(v: string) => targetLabel(v)}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NO_VARIANT}>All variants</SelectItem>
                  {colours.map((c) => (
                    <SelectItem key={`colour:${c}`} value={`colour:${c}`}>
                      Colour: {c}
                    </SelectItem>
                  ))}
                  {variants.map((v) => (
                    <SelectItem key={v.id} value={`variant:${v.id}`}>
                      {[v.colour, v.storage, v.sim_type].filter(Boolean).join(" · ") || v.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" variant="outline" className="gap-2" disabled={uploading}>
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
          Upload
        </Button>
        <p className="text-xs text-ink/40">JPEG, PNG or WebP, up to 5MB. Leave &quot;All variants&quot; for a general product photo.</p>
      </form>
    </div>
  );
}
