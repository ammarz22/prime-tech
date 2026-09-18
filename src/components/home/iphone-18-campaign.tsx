"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Cpu, Camera, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/motion/animated-section";
import { OfficialVideoPlayer } from "@/components/common/official-video-player";

const SPECS = [
  { icon: Cpu, label: "A20 Pro", description: "Next-gen performance." },
  { icon: Camera, label: "48MP", description: "Pro camera system." },
  { icon: Layers, label: "Titanium", description: "Stronger. Lighter. More refined." },
];

/** The homepage's dark cinematic contrast beat — the same real iPhone 18
 * Pro Max photography as the hero, restaged against near-black with a
 * restrained brand-red glow, and the full official trailer one scroll away
 * on `/iphone-18-preorder`. Styled as a contained, rounded card (matching
 * the Apple/Samsung split's card language) rather than a full-bleed bar,
 * so it reads as one more card in the homepage's set instead of a
 * leftover full-width section from an earlier pass. */
export function IphoneEighteenCampaign() {
  return (
    <section id="iphone-reveal" className="bg-paper px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-ink p-6 text-white sm:p-10 lg:p-12">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.1] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" />
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 0.55, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute left-1/2 top-1/3 size-[40vw] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]"
          style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }}
        />

        <div className="relative grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8">
          <AnimatedSection className="order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">iPhone 18 Pro Max</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Built for what&apos;s next.
            </h2>
            <p className="mt-3 max-w-md text-sm text-white/60">
              A more powerful chip. A more intelligent camera system. A more remarkable iPhone.
            </p>

            <dl className="mt-6 grid grid-cols-3 gap-5">
              {SPECS.map(({ icon: Icon, label, description }) => (
                <div key={label}>
                  <Icon className="size-4 text-white/40" strokeWidth={1.5} />
                  <dt className="mt-1.5 text-sm font-semibold text-white">{label}</dt>
                  <dd className="mt-0.5 text-xs text-white/50">{description}</dd>
                </div>
              ))}
            </dl>

            <Button
              render={<Link href="/iphone-18-preorder" />}
              size="lg"
              className="mt-7 h-11 gap-2 rounded-full px-6 text-sm"
            >
              Explore iPhone 18 Pro Max
              <ArrowRight className="size-4" />
            </Button>
          </AnimatedSection>

          <AnimatedSection delay={0.15} className="order-2">
            <OfficialVideoPlayer
              src="/videos/iphone-18-pro-official-trailer.mp4"
              poster="/iphone-18/burgundy-hero.png"
              title="iPhone 18 Pro Max — Official Apple Video"
              className="rounded-xl"
            />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
