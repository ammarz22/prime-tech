import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, MessageCircle, Cpu, Camera, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/motion/animated-section";
import { HeroFloatingImage } from "@/components/home/hero-floating-image";
import { getCampaignStage } from "@/lib/db/site-settings";
import { getEffectiveContact } from "@/lib/db/site-settings";
import { whatsappLink, preorderEnquiryMessage } from "@/lib/config/site";

const CTA_LABEL: Record<string, string> = {
  announcement: "Notify Me on WhatsApp",
  preorder_open: "Pre-Order on WhatsApp",
  available: "Enquire on WhatsApp",
};

const SPECS = [
  { icon: Cpu, label: "A20 Pro", description: "Next-gen performance." },
  { icon: Camera, label: "48MP", description: "Pro camera system." },
  { icon: Layers, label: "Titanium", description: "Stronger. Lighter. More refined." },
];

const SIDE_WORDS = ["Bigger", "Brighter", "Smarter", "Beyond"];

/**
 * The homepage hero — recast dark and cinematic (matching the intro's own
 * black/cherry-red aesthetic) instead of the earlier light theme, with the
 * same real product photo and honest copy. The side wordmark remains pure
 * decoration (there's only one hero), not a functioning slide carousel.
 */
export async function HeroTeaser() {
  const [stage, contact] = await Promise.all([getCampaignStage(), getEffectiveContact()]);
  const ctaHref =
    whatsappLink(
      preorderEnquiryMessage({ model: "iPhone 18 Pro Max", available: stage === "available" }),
      contact.whatsappNumber,
    ) ?? "/iphone-18-preorder";

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-black">
      <Image
        src="/hero/home-background.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-bottom"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

      <p
        aria-hidden
        className="pointer-events-none absolute -right-4 top-1/2 hidden -translate-y-1/2 select-none text-[24vw] font-bold leading-none tracking-tighter text-white/[0.06] xl:block"
      >
        18
      </p>

      <div className="relative z-10 mx-auto grid w-full max-w-[100rem] flex-1 grid-cols-1 items-center gap-10 px-4 pt-24 sm:px-6 sm:pt-28 lg:grid-cols-2 lg:gap-8 lg:px-10 xl:px-16">
        <AnimatedSection className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">A New Era Begins.</p>
          <span className="mt-3 block h-[3px] w-9 rounded-full bg-brand" aria-hidden />

          <h1 className="mt-4 text-balance text-5xl font-semibold leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl">
            iPhone <span className="text-brand">18</span>
            <br />
            Pro Max
          </h1>
          <p className="mt-4 max-w-sm text-base text-white/60 sm:text-lg">Bigger. Brighter. Smarter than ever.</p>
          <p className="mt-2 max-w-sm text-sm text-white/40">
            A new level of performance, intelligence and design. Built for what&apos;s next.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              render={<a href={ctaHref} target="_blank" rel="noopener noreferrer" />}
              size="lg"
              className="h-11 gap-2 rounded-full px-6 text-sm"
            >
              <MessageCircle className="size-4" />
              {CTA_LABEL[stage]}
              <ArrowRight className="size-4" />
            </Button>
            <Button
              render={<Link href="#iphone-reveal" />}
              variant="outline"
              size="lg"
              className="h-11 gap-2 rounded-full border-white/20 bg-transparent px-5 text-sm text-white hover:bg-white/10"
            >
              <span className="flex size-5.5 items-center justify-center rounded-full bg-white/10">
                <Play className="size-2.5 fill-white text-white" />
              </span>
              Watch the Reveal
            </Button>
          </div>

          <dl className="mt-9 grid max-w-md grid-cols-3 gap-5 border-t border-white/10 pt-5">
            {SPECS.map(({ icon: Icon, label, description }) => (
              <div key={label}>
                <Icon className="size-4 text-white/40" strokeWidth={1.5} />
                <dt className="mt-2 text-base font-semibold text-white">{label}</dt>
                <dd className="mt-0.5 text-xs text-white/50">{description}</dd>
              </div>
            ))}
          </dl>
        </AnimatedSection>

        <div className="relative lg:h-[480px] xl:h-[520px]">
          <HeroFloatingImage src="/hero/home-phone.png" alt="iPhone 18 Pro Max in Burgundy" />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[100rem] items-center gap-4 px-4 py-6 sm:px-6 lg:px-10 xl:px-16">
        <span className="hidden h-px flex-1 bg-white/10 sm:block" aria-hidden />
        <p className="min-w-0 flex-1 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 sm:flex-none sm:text-[11px] sm:tracking-[0.3em]">
          Technology For A Brighter Tomorrow
        </p>
        <span className="hidden h-px flex-1 bg-white/10 sm:block" aria-hidden />
      </div>

      {/* Right-edge stacked wordmark — pure decorative texture echoing the
          hero's own tagline, upright (not rotated), matching the
          reference's margin note. */}
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
