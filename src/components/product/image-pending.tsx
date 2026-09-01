import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Premium placeholder shown whenever a verified product photo isn't
 * available yet. Deliberately used instead of any unverified or
 * wrong-model image — see the product image policy in SETUP.md.
 */
export function ImagePending({ className, label = "Image Pending" }: { className?: string; label?: string }) {
  return (
    <div
      className={cn(
        "relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl border border-ink/10 bg-gradient-to-br from-paper-soft to-paper",
        className,
      )}
    >
      <div className="bg-grid absolute inset-0 text-ink/40 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
      <div className="relative flex flex-col items-center gap-3 text-ink/35">
        <ImageOff className="size-8" strokeWidth={1.5} aria-hidden />
        <span className="text-xs font-medium uppercase tracking-[0.15em]">{label}</span>
      </div>
    </div>
  );
}
