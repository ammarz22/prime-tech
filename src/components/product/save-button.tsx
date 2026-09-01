"use client";

import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useLocalIds } from "@/hooks/use-local-ids";
import { cn } from "@/lib/utils";

export function SaveButton({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}) {
  const { has, toggle } = useLocalIds("primetech:saved");
  const saved = has(productId);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggle(productId);
    toast.success(saved ? "Removed from saved" : "Saved for later");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={saved ? "Remove from saved products" : "Save product"}
      aria-pressed={saved}
      className={cn(
        "flex size-8 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm backdrop-blur transition hover:scale-105",
        className,
      )}
    >
      <Heart className={cn("size-4 transition", saved ? "fill-red-500 text-red-500" : "text-ink/60")} />
    </button>
  );
}
