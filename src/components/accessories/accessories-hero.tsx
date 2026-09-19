import Image from "next/image";
import { AnimatedSection } from "@/components/motion/animated-section";

/**
 * Follows the supplied reference layout: copy on the left, the studio
 * background and device photography (Images/Accesories page) on the right,
 * with a handwritten note. Copy and type scale with the viewport width so
 * the composition keeps the reference's proportions on any screen.
 */
export function AccessoriesHero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#efece9] pb-0 pt-32 sm:pt-40 lg:flex-row lg:items-center lg:pt-16">
      <Image
        src="/accessories-page/hero-background.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[78%_center] lg:object-right"
      />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-[5vw]">
        <AnimatedSection className="lg:max-w-[38vw]">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/60 lg:text-[clamp(0.65rem,0.8vw,0.9rem)]">
            Everyday Essentials.
          </p>
          <h1 className="mt-4 text-5xl font-extrabold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:mt-[1.2vw] lg:text-[clamp(2.75rem,3.9vw,6rem)]">
            Accessories
            <br />
            <span className="bg-gradient-to-r from-ink to-brand bg-clip-text text-transparent">That Go Further.</span>
          </h1>
          <p className="mt-4 text-xl font-medium text-ink/85 sm:text-2xl lg:mt-[1vw] lg:text-[clamp(1.25rem,1.75vw,2.5rem)]">
            Power. Protect. Connect. Personalise.
          </p>
          <p className="mt-3 max-w-md text-sm text-ink/65 sm:text-base lg:mt-[0.8vw] lg:max-w-[32vw] lg:text-[clamp(0.875rem,1.05vw,1.25rem)]">
            Premium accessories for your Apple, Samsung and everyday devices. Only at Prime Tech.
          </p>
        </AnimatedSection>
      </div>

      <div className="relative mx-auto mt-8 aspect-[3/2] w-full max-w-xl sm:max-w-2xl lg:absolute lg:bottom-0 lg:right-0 lg:mx-0 lg:mt-0 lg:w-[min(60vw,calc(100vh*1.32))] lg:max-w-none lg:translate-y-[9%]">
        <Image
          src="/accessories-page/hero-device-cutout.webp"
          alt="AirPods Max headphones, a MagSafe charger, a USB-C power adapter and braided cables beside a smartphone"
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-contain drop-shadow-[0_26px_30px_rgba(40,32,30,0.28)]"
        />
      </div>

      <div className="pointer-events-none absolute right-[3.5vw] top-[14%] z-10 hidden -rotate-6 lg:block">
        <p className="font-hand text-[clamp(1.25rem,1.9vw,2.5rem)] leading-tight text-ink">
          Small
          <br />
          things.
          <br />A bigger
          <br />
          difference.
        </p>
        <span className="mt-[0.9vw] block h-[2px] w-[5vw] rounded-full bg-brand" aria-hidden />
      </div>
    </section>
  );
}
