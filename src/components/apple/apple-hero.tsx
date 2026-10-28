import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/motion/animated-section";
import { getEffectiveContact } from "@/lib/db/site-settings";
import { whatsappLink, serviceEnquiryMessage } from "@/lib/config/site";

const SIDE_WORDS = ["Devices", "People Love.", "Expertise", "You Can Trust."];
const TAGLINE_WORDS = ["iPhone", "Mac", "iPad", "Watch", "AirPods", "Accessories"];

/** The Apple hub's own hero — dark-themed per the reference, built on the
 * client-supplied background/device photography for this page (Images/Apple
 * Page). Mirrors `SamsungHero`'s layout/spacing so the two hubs read as one
 * consistent system. */
export async function AppleHero() {
  const contact = await getEffectiveContact();
  const ctaHref = whatsappLink(serviceEnquiryMessage("Apple products"), contact.whatsappNumber) ?? "#";

  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden bg-ink pb-10 pt-32 text-white sm:pb-14 sm:pt-40">
      <Image
        src="/apple-page/hero-background.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

      <div className="relative mx-auto w-full max-w-[84rem] px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-0">
          <AnimatedSection className="relative z-10">
            <p className="text-xs font-semibold uppercase leading-relaxed tracking-[0.25em] text-white/50">
              More Than Devices.
              <br />
              A More Connected You.
            </p>
            <span className="mt-3 block h-[3px] w-9 rounded-full bg-brand" aria-hidden />

            <h1 className="mt-6 text-6xl font-bold uppercase tracking-tight text-white sm:text-7xl lg:text-8xl">Apple</h1>
            <p className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-white/75 sm:text-3xl">
              Everything Apple.
              <br />
              In one place.
            </p>
            <p className="mt-5 max-w-sm text-sm text-white/55 sm:text-base">
              The latest devices. Genuine products. Expert guidance. Only at Prime Tech.
            </p>

            <Button
              render={<a href={ctaHref} target="_blank" rel="noopener noreferrer" />}
              size="lg"
              className="mt-8 h-12 gap-2 rounded-full bg-white px-6 text-sm text-ink hover:bg-white/90"
            >
              <MessageCircle className="size-4" />
              Shop on WhatsApp
              <ArrowRight className="size-4" />
            </Button>

            <p className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
              {TAGLINE_WORDS.map((word, i) => (
                <span key={word} className="flex items-center gap-2">
                  {word}
                  {i < TAGLINE_WORDS.length - 1 && <span aria-hidden>&middot;</span>}
                </span>
              ))}
            </p>
          </AnimatedSection>

          {/* The cutout is far wider than it is tall, so it is scaled up and
              nudged down toward the horizon in the background art — that way
              the devices read at the same weight as the Samsung hub's and sit
              in the scene instead of floating above it. */}
          <div className="relative hidden aspect-[1827/739] w-full origin-left lg:block lg:translate-y-6 min-[1500px]:scale-[1.12]">
            <div
              className="pointer-events-none absolute inset-x-[10%] bottom-[2%] h-2/5 rounded-[50%] bg-black/70 blur-3xl"
              aria-hidden
            />
            <Image
              src="/apple-page/hero-device-cutout.png"
              alt="MacBook Pro, iPhone, iPad Pro, Apple Watch and AirPods"
              fill
              sizes="(min-width: 1280px) 880px, 60vw"
              priority
              className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 items-start gap-2.5 min-[1800px]:flex">
        <span className="mt-0.5 h-14 w-[3px] rounded-full bg-brand" aria-hidden />
        <ul className="space-y-1 text-right text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
          {SIDE_WORDS.map((word) => (
            <li key={word}>{word}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
