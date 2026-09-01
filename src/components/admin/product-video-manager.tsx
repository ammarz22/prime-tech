"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, Trash2, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  uploadProductVideoAction,
  uploadProductVideoPosterAction,
  deleteProductVideoAction,
} from "@/lib/actions/admin-product-video";

export function ProductVideoManager({
  productId,
  videoUrl,
  posterUrl,
}: {
  productId: string;
  videoUrl: string | null;
  posterUrl: string | null;
}) {
  const router = useRouter();
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingPoster, setUploadingPoster] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const posterInputRef = useRef<HTMLInputElement>(null);

  async function handleVideoUpload(e: React.FormEvent) {
    e.preventDefault();
    const file = videoInputRef.current?.files?.[0];
    if (!file) {
      setError("Choose a video file.");
      return;
    }
    setError(null);
    setUploadingVideo(true);
    const formData = new FormData();
    formData.set("file", file);
    const result = await uploadProductVideoAction(productId, formData);
    if (!result.success) setError(result.error ?? "Upload failed.");
    setUploadingVideo(false);
    if (videoInputRef.current) videoInputRef.current.value = "";
    router.refresh();
  }

  async function handlePosterUpload(e: React.FormEvent) {
    e.preventDefault();
    const file = posterInputRef.current?.files?.[0];
    if (!file) {
      setError("Choose a poster image.");
      return;
    }
    setError(null);
    setUploadingPoster(true);
    const formData = new FormData();
    formData.set("file", file);
    const result = await uploadProductVideoPosterAction(productId, formData);
    if (!result.success) setError(result.error ?? "Upload failed.");
    setUploadingPoster(false);
    if (posterInputRef.current) posterInputRef.current.value = "";
    router.refresh();
  }

  async function handleDelete() {
    setDeleting(true);
    await deleteProductVideoAction(productId);
    setDeleting(false);
    router.refresh();
  }

  return (
    <div className="rounded-2xl border border-ink/8">
      <div className="flex items-center justify-between border-b border-ink/8 px-5 py-3">
        <p className="flex items-center gap-1.5 text-sm font-medium">
          <Film className="size-3.5 text-brand" />
          Product Video
        </p>
        {videoUrl && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-1 text-xs text-destructive hover:underline"
          >
            {deleting ? <Loader2 className="size-3 animate-spin" /> : <Trash2 className="size-3" />}
            Remove
          </button>
        )}
      </div>

      {videoUrl ? (
        <div className="p-5">
          <video src={videoUrl} poster={posterUrl ?? undefined} controls className="w-full rounded-xl bg-black" />
        </div>
      ) : (
        <p className="px-5 pt-3 text-xs text-ink/45">
          Optional demo/lifestyle video shown in a dedicated section on this product&apos;s page. Hidden entirely for
          customers until one is uploaded.
        </p>
      )}

      {error && <p className="px-5 text-sm text-destructive">{error}</p>}

      <div className="grid grid-cols-1 gap-4 border-t border-ink/8 p-5 sm:grid-cols-2">
        <form onSubmit={handleVideoUpload} className="space-y-2">
          <Label htmlFor="video-file">{videoUrl ? "Replace Video" : "Upload Video"}</Label>
          <Input id="video-file" ref={videoInputRef} type="file" accept="video/mp4,video/webm" />
          <Button type="submit" variant="outline" size="sm" className="gap-2" disabled={uploadingVideo}>
            {uploadingVideo ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
            Upload Video
          </Button>
          <p className="text-xs text-ink/40">MP4 or WebM, up to 50MB.</p>
        </form>

        <form onSubmit={handlePosterUpload} className="space-y-2">
          <Label htmlFor="poster-file">Poster Image</Label>
          <Input id="poster-file" ref={posterInputRef} type="file" accept="image/jpeg,image/png,image/webp" />
          <Button type="submit" variant="outline" size="sm" className="gap-2" disabled={uploadingPoster}>
            {uploadingPoster ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
            Upload Poster
          </Button>
          <p className="text-xs text-ink/40">Optional. Shown before the video loads/plays.</p>
        </form>
      </div>
    </div>
  );
}
