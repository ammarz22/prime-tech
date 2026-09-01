"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Upload, Loader2, Trash2, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  getOrCreate360SetAction,
  uploadFrameAction,
  deleteFrameAction,
  toggle360SetEnabledAction,
} from "@/lib/actions/admin-360";
import type { Product360Frame } from "@/types/database";

interface InitialSet {
  id: string;
  enabled: boolean;
  frames: Product360Frame[];
}

/** Product-level 360° frame management — variant-specific sets share the
 * same DB shape but aren't exposed in this admin UI yet (no real 360°
 * photography exists for any product; this ships fully wired but inactive
 * until real frame sequences are uploaded). `initialSet` is re-fetched by
 * the parent server page after every mutation via `router.refresh()`, so
 * frames/enabled are read straight from it rather than duplicated in state. */
export function Product360Manager({ productId, initialSet }: { productId: string; initialSet: InitialSet | null }) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglePending, setTogglePending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const frames = initialSet?.frames ?? [];
  const enabled = initialSet?.enabled ?? false;

  async function ensureSet(): Promise<string | null> {
    if (initialSet?.id) return initialSet.id;
    const result = await getOrCreate360SetAction(productId);
    if (!result.success || !result.id) {
      setError(result.error ?? "Couldn't create a 360° set.");
      return null;
    }
    return result.id;
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    const files = fileInputRef.current?.files;
    if (!files || files.length === 0) {
      setError("Choose one or more frame images.");
      return;
    }
    setError(null);
    setUploading(true);

    const activeSetId = await ensureSet();
    if (!activeSetId) {
      setUploading(false);
      return;
    }

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.set("file", file);
      const result = await uploadFrameAction(productId, activeSetId, formData);
      if (!result.success) {
        setError(result.error ?? "One or more uploads failed.");
        break;
      }
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    router.refresh();
  }

  async function handleDelete(frameId: string) {
    setDeletingId(frameId);
    await deleteFrameAction(productId, frameId);
    setDeletingId(null);
    router.refresh();
  }

  async function handleToggleEnabled(next: boolean) {
    setTogglePending(true);
    const activeSetId = await ensureSet();
    if (activeSetId) await toggle360SetEnabledAction(productId, activeSetId, next);
    setTogglePending(false);
    router.refresh();
  }

  return (
    <div className="rounded-2xl border border-ink/8">
      <div className="flex items-center justify-between border-b border-ink/8 px-5 py-3">
        <p className="flex items-center gap-1.5 text-sm font-medium">
          <RotateCw className="size-3.5 text-brand" />
          360° View
        </p>
        <label className="flex items-center gap-2 text-xs text-ink/60">
          <Checkbox
            checked={enabled}
            onCheckedChange={(v) => handleToggleEnabled(!!v)}
            disabled={frames.length === 0 || togglePending}
          />
          Enabled on product page
        </label>
      </div>

      <p className="px-5 pt-3 text-xs text-ink/45">
        Upload a full rotation sequence (e.g. 24, 36 or 48 frames, same resolution, orientation, background and
        lighting throughout). The customer-facing 360° toggle stays hidden until this set is enabled and has at
        least one frame.
      </p>

      {frames.length > 0 && (
        <div className="grid grid-cols-4 gap-2 p-5 sm:grid-cols-6">
          {frames.map((frame) => (
            <div key={frame.id} className="group relative aspect-square overflow-hidden rounded-lg border border-ink/8 bg-paper-soft">
              <Image src={frame.url} alt="" fill sizes="100px" className="object-cover" />
              <span className="absolute left-1 top-1 rounded bg-black/50 px-1 text-[9px] font-medium text-white">
                {frame.sort_order + 1}
              </span>
              <button
                type="button"
                onClick={() => handleDelete(frame.id)}
                disabled={deletingId === frame.id}
                aria-label="Delete frame"
                className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-white/90 text-destructive opacity-0 transition group-hover:opacity-100"
              >
                {deletingId === frame.id ? <Loader2 className="size-3 animate-spin" /> : <Trash2 className="size-3" />}
              </button>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleUpload} className="space-y-3 border-t border-ink/8 p-5">
        <div className="space-y-1.5">
          <Label htmlFor="frame-files">Upload Frames</Label>
          <Input id="frame-files" ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" variant="outline" className="gap-2" disabled={uploading}>
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
          Upload Frames
        </Button>
        <p className="text-xs text-ink/40">
          Frames are added in the order you select them. Delete and re-upload to fix ordering — drag-reorder can be
          added later if the sequence needs frequent edits.
        </p>
      </form>
    </div>
  );
}
