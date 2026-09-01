"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

/** Native Web Share on supported devices, clipboard-copy + toast everywhere else. */
export function ShareButton({ productName, className }: { productName: string; className?: string }) {
  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: productName, url });
      } catch {
        // User cancelled the share sheet — not an error.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Couldn't copy the link");
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={`Share ${productName}`}
      className={cn(
        "flex size-8 items-center justify-center rounded-full bg-white/90 text-ink/60 shadow-sm backdrop-blur transition hover:scale-105 hover:text-ink",
        className,
      )}
    >
      <Share2 className="size-4" />
    </button>
  );
}
