import Image from "next/image";
import { AnimatedSection } from "@/components/motion/animated-section";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { cn } from "@/lib/utils";
import type { CatalogueCategory } from "@/lib/config/apple-catalogue";

/** Brand-agnostic catalogue hero — content comes entirely from the active
 * category's config, so the same component serves every category and,
 * later, every brand's catalogue. The background image sits behind, and
 * (where the category has matching art) the device photo sits on the right
 * rather than being stretched across the whole banner. */
export function CatalogueHero({
  category,
  breadcrumbs,
}: {
  category: CatalogueCategory;
  breadcrumbs: { label: string; href?: string }[];
}) {
  const bleed = category.heroDeviceFit === "bleed";

  return (
    <section className="relative flex flex-col justify-center overflow-hidden bg-ink pb-10 pt-28 text-white sm:pb-14 sm:pt-32 lg:min-h-[580px]">
      <Image src={category.heroBackground} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/20" />

      {category.heroDevice && (
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 hidden lg:block",
            bleed ? "right-[7%] w-[46%] pt-24" : "right-0 w-[58%] pb-8 pl-4 pr-6 pt-24 xl:pr-28",
          )}
        >
          <div className="relative size-full">
            <Image
              src={category.heroDevice}
              alt={`${category.heroTitle} product photography`}
              fill
              priority
              sizes="58vw"
              className={cn(
                "object-contain drop-shadow-[0_28px_40px_rgba(0,0,0,0.45)]",
                bleed ? "object-bottom" : "object-center",
              )}
            />
          </div>
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-16">
        <Breadcrumbs
          items={breadcrumbs}
          className="text-white/50 [&_a:hover]:text-white [&_svg]:text-white/30 [&>span:last-child>span]:!text-white"
        />

        <AnimatedSection className="mt-6 max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">{category.heroEyebrow}</p>
          <span className="mt-3 block h-[3px] w-9 rounded-full bg-brand" aria-hidden />

          <h1 className="mt-4 text-6xl font-bold tracking-tight sm:text-7xl">{category.heroTitle}</h1>
          <p className="mt-3 text-lg text-white/70 sm:text-xl">{category.heroSubtitle}</p>
          <p className="mt-2 max-w-md text-sm text-white/50 sm:text-base">{category.heroDescription}</p>
        </AnimatedSection>
      </div>

      <div className="pointer-events-none absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 items-start gap-2.5 xl:flex">
        <span className="mt-0.5 h-14 w-[3px] rounded-full bg-brand" aria-hidden />
        <ul className="space-y-1 text-right text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
          {category.heroSideWords.map((word) => (
            <li key={word}>{word}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
