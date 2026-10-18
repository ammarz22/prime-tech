import Image from "next/image";
import { cn } from "@/lib/utils";

interface PrimeTechLogoProps {
  className?: string;
  showWordmark?: boolean;
  wordmarkClassName?: string;
}

/**
 * Renders the official Prime Tech logo mark unmodified inside a rounded
 * tile (the source file has a black background, so it needs a frame to
 * sit cleanly on both light and dark surfaces) with an adjacent text
 * wordmark for legibility at small sizes.
 */
export function PrimeTechLogo({ className, showWordmark = true, wordmarkClassName }: PrimeTechLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative aspect-square h-full shrink-0">
        <Image src="/brand/icon.png" alt="Prime Tech" fill sizes="40px" className="object-contain" priority />
      </span>
      {showWordmark && (
        <span className={cn("flex flex-col leading-none", wordmarkClassName)}>
          <span className="text-[0.95em] font-bold tracking-tight">
            PRIME<span className="text-brand"> TECH</span>
          </span>
        </span>
      )}
    </span>
  );
}
