import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/motion/animated-section";

const AI_WORDS = ["Smarter", "Faster", "More Human"];

/** Full-bleed dark banner for the current Galaxy flagship, built on the
 * client-supplied background/device photography for this page
 * (Images/Samsung Page). Links to the real product page rather than a
 * placeholder. */
export function GalaxyS26Spotlight() {
  return (
    <section className="relative overflow-hidden bg-ink py-14 text-white sm:py-20">
      <Image
        src="/samsung-page/s26-spotlight-background.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/50" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-8 lg:px-10 xl:px-16">
        <AnimatedSection>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            <span className="h-px w-4 bg-brand" aria-hidden />
            Galaxy S26 Ultra
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Built for what&apos;s next.</h2>
          <p className="mt-2 text-sm text-white/55 sm:text-base">More power. More intelligence. More you.</p>
          <Link
            href="/products/galaxy-s26-ultra"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-white/90"
          >
            Explore Galaxy S26 Ultra
            <ArrowRight className="size-3.5" />
          </Link>
        </AnimatedSection>

        <div className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[360px]">
          <Image
            src="/samsung-page/s26-spotlight-device-cutout.png"
            alt="Galaxy S26 Ultra"
            fill
            sizes="360px"
            className="object-contain"
          />
        </div>

        <div className="text-center lg:text-left">
          <p className="flex items-center justify-center gap-1.5 text-xl font-semibold tracking-tight lg:justify-start">
            Galaxy AI
            <Sparkles className="size-4 text-brand" />
          </p>
          <ul className="mt-2 space-y-0.5 text-xs font-medium uppercase tracking-[0.15em] text-white/50">
            {AI_WORDS.map((word) => (
              <li key={word}>{word}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
