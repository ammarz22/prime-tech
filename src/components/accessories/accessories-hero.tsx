import Image from "next/image";
import { AnimatedSection } from "@/components/motion/animated-section";

/**
 * The reference design's hero features an over-ear headphone and a MagSafe
 * puck — neither of which Prime Tech actually stocks today. Rather than
 * show product photography for items that aren't real, this uses the real
 * accessories Prime Tech does carry (the 20W power adapter and USB-C
 * cable), which also happens to fit "small things" far better than a
 * fabricated flatlay would.
 */
export function AccessoriesHero() {
  return (
    <section className="relative overflow-hidden bg-paper pb-10 pt-32 sm:pb-14 sm:pt-40">
      <div
        className="pointer-events-none absolute -right-10 top-0 size-[50vw] max-w-[650px] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-8">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">Everyday Essentials.</p>
            <h1 className="mt-4 text-balance text-5xl font-bold tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Accessories
              <br />
              <span className="text-brand">That Go Further.</span>
            </h1>
            <p className="mt-4 text-xl font-medium text-ink/70 sm:text-2xl">Power. Protect. Connect. Personalise.</p>
            <p className="mt-3 max-w-md text-sm text-ink/55 sm:text-base">
              Premium accessories for your Apple, Samsung and everyday devices. Only at Prime Tech.
            </p>
          </AnimatedSection>

          <div className="relative mx-auto aspect-[4/3] w-full max-w-md rounded-[2.5rem] bg-paper-soft lg:max-w-none">
            <div className="absolute inset-x-[18%] bottom-[8%] top-[45%]">
              <Image
                src="/products/20w-usb-c-power-adapter/colors/white.jpg"
                alt="Apple 20W USB-C Power Adapter"
                fill
                sizes="280px"
                className="object-contain"
              />
            </div>
            <div className="absolute inset-x-[8%] top-[8%] h-[45%]">
              <Image
                src="/products/usb-c-charge-cable/colors/white.jpg"
                alt="Apple USB-C Charge Cable"
                fill
                sizes="320px"
                className="object-contain"
              />
            </div>
            <p className="absolute right-[6%] top-[4%] hidden -rotate-3 font-hand text-lg text-ink/70 sm:block">
              Small things.
              <br />A bigger difference.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
