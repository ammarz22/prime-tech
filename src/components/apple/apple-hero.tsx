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
    <section className="relative overflow-hidden bg-ink pb-10 pt-32 text-white sm:pb-14 sm:pt-40">
      <Image
        src="/apple-page/hero-background.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-8">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase leading-relaxed tracking-[0.25em] text-white/50">
              More Than Devices.
              <br />
              A More Connected You.
            </p>
            <span className="mt-3 block h-[3px] w-9 rounded-full bg-brand" aria-hidden />

            <h1 className="mt-6 text-6xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">Apple</h1>
            <p className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-white/90 sm:text-3xl">
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

            <p className="mt-8 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
              {TAGLINE_WORDS.map((word, i) => (
                <span key={word} className="flex items-center gap-2.5">
                  {word}
                  {i < TAGLINE_WORDS.length - 1 && <span aria-hidden>&middot;</span>}
                </span>
              ))}
            </p>
          </AnimatedSection>

          <div className="relative hidden aspect-[1827/739] w-full lg:block">
            <div
              className="pointer-events-none absolute inset-x-[8%] bottom-[6%] h-2/5 rounded-[50%] bg-black/60 blur-3xl"
              aria-hidden
            />
            <div
              className="absolute inset-0"
              style={{
                maskImage: "linear-gradient(to bottom, black 93%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 93%, transparent 100%)",
              }}
            >
              <Image
                src="/apple-page/hero-device-cutout.png"
                alt="MacBook Pro, iPhone, iPad Pro, Apple Watch and AirPods"
                fill
                sizes="45vw"
                priority
                className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 items-start gap-2.5 xl:flex">
        <span className="mt-0.5 h-14 w-[3px] rounded-full bg-brand" aria-hidden />
        <ul className="space-y-1 text-right text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
          {SIDE_WORDS.map((word) => (
            <li key={word}>{word}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
