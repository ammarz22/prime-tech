import Image from "next/image";
import { cn } from "@/lib/utils";
import type { CatalogueCategory } from "@/lib/config/catalogue-types";

/**
 * The compare tool's own hero — light-themed, unlike the dark brand-hub
 * heroes, so the page reads as its own utility rather than a marketing
 * banner. Built entirely on the same real background/device photography
 * the active category's own hub page uses (via `CatalogueCategory`), just
 * faded from white into the image instead of full-bleed dark.
 */
export function CompareHero({ category, brandLabel }: { category: CatalogueCategory; brandLabel: string }) {
  return (
    <section className="relative overflow-hidden bg-paper py-10 sm:py-14">
      <div className="absolute inset-y-0 right-0 w-full sm:w-[62%]">
        <Image src={category.heroBackground} alt="" fill priority sizes="70vw" className="object-cover" />
        {category.heroDevice && (
          <div
            className={cn(
              "absolute inset-0",
              category.heroDeviceFit === "bleed" ? "flex items-end justify-center pb-0" : "flex items-center justify-center p-8 sm:p-10",
            )}
          >
            <div className="relative h-full w-full">
              <Image
                src={category.heroDevice}
                alt={`${category.heroTitle} product photography`}
                fill
                sizes="60vw"
                className={cn(
                  "object-contain",
                  category.heroDeviceFit === "bleed" ? "object-bottom" : "object-center",
                )}
              />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/55 to-transparent sm:via-paper/35" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="max-w-md">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/45">Compare</p>
          <h1 className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Find the right
            <br />
            <span className="bg-gradient-to-r from-ink to-brand bg-clip-text text-transparent">{brandLabel} for you.</span>
          </h1>
          <p className="mt-3 max-w-sm text-sm text-ink/55 sm:text-base">
            Compare up to three devices side by side and see the key differences at a glance.
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute right-6 top-6 hidden -rotate-6 sm:right-10 sm:top-10 md:block">
        <p className="font-hand text-lg leading-tight text-white sm:text-xl">
          Different needs.
          <br />
          A clearer choice.
        </p>
        <span className="mt-1 block h-[2px] w-12 rounded-full bg-brand" aria-hidden />
      </div>
    </section>
  );
}
