import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/motion/animated-section";
import { getEffectiveContact } from "@/lib/db/site-settings";
import { whatsappLink, serviceEnquiryMessage } from "@/lib/config/site";

const SIDE_WORDS = ["Bolder", "Smarter", "Brighter", "A More Connected Tomorrow."];
const TAGLINE_WORDS = ["Phones", "Tablets", "Wearables", "Audio", "Accessories"];

/** The Samsung hub's own hero — light-themed per the reference, built on
 * the client-supplied background/device photography for this page
 * (Images/Samsung Page). */
export async function SamsungHero() {
  const contact = await getEffectiveContact();
  const ctaHref = whatsappLink(serviceEnquiryMessage("Samsung products"), contact.whatsappNumber) ?? "#";

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-paper pb-10 pt-32 sm:pb-14 sm:pt-40">
      <Image
        src="/samsung-page/hero-background.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/30 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-8">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">Innovation Lives Here.</p>
            <span className="mt-3 block h-[3px] w-9 rounded-full bg-brand" aria-hidden />

            <h1 className="mt-6 text-6xl font-bold uppercase tracking-tight text-ink sm:text-7xl lg:text-8xl">
              Samsung
            </h1>
            <p className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-ink/70 sm:text-3xl">
              A smarter tomorrow.
            </p>
            <p className="mt-5 max-w-sm text-sm text-ink/55 sm:text-base">
              Explore the latest Galaxy devices. Premium technology. Genuine products. Expert guidance. Only at Prime
              Tech.
            </p>

            <Button
              render={<a href={ctaHref} target="_blank" rel="noopener noreferrer" />}
              size="lg"
              className="mt-8 h-12 gap-2 rounded-full px-6 text-sm"
            >
              <MessageCircle className="size-4" />
              Shop on WhatsApp
              <ArrowRight className="size-4" />
            </Button>

            <p className="mt-8 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
              {TAGLINE_WORDS.map((word, i) => (
                <span key={word} className="flex items-center gap-2.5">
                  {word}
                  {i < TAGLINE_WORDS.length - 1 && <span aria-hidden>&middot;</span>}
                </span>
              ))}
            </p>
          </AnimatedSection>

          <div className="relative hidden aspect-[1398/999] w-full lg:block">
            <Image
              src="/samsung-page/hero-device-cutout.png"
              alt="Galaxy S Ultra with S Pen, tablet, watch and buds"
              fill
              sizes="45vw"
              priority
              className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 items-start gap-2.5 xl:flex">
        <span className="mt-0.5 h-14 w-[3px] rounded-full bg-brand" aria-hidden />
        <ul className="space-y-1 text-right text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
          {SIDE_WORDS.map((word) => (
            <li key={word}>{word}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
