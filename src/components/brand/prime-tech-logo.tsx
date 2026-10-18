import Image from "next/image";
import { cn } from "@/lib/utils";

interface PrimeTechLogoProps {
  className?: string;
  /** Use the white-lettered wordmark on dark surfaces. */
  dark?: boolean;
  /** Just the "TP" app icon, for tight spaces. */
  iconOnly?: boolean;
}

/**
 * The redesigned Prime Tech wordmark (transparent PNG, in a black-lettered
 * and a white-lettered version) or the app icon. Sized by height — pass an
 * `h-*` class; width follows the artwork's aspect ratio.
 */
export function PrimeTechLogo({ className, dark = false, iconOnly = false }: PrimeTechLogoProps) {
  if (iconOnly) {
    return (
      <span className={cn("inline-flex aspect-square", className)}>
        <Image src="/brand/icon.png" alt="Prime Tech" width={256} height={256} className="size-full" priority />
      </span>
    );
  }

  return (
    <span className={cn("inline-flex", className)}>
      <Image
        src={dark ? "/brand/logo-dark.png" : "/brand/logo-light.png"}
        alt="Prime Tech Colombo"
        width={1322}
        height={227}
        className="h-full w-auto"
        priority
      />
    </span>
  );
}
