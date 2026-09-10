"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/motion/animated-section";
import { OfficialVideoPlayer } from "@/components/common/official-video-player";

/** Distinct, cinematic launch-campaign treatment — deliberately separate
 * from the curated Featured Products section, since iPhone 18 isn't part
 * of the regular catalogue yet. Boxed, not full-bleed — the source video is
 * 1280x720 and would look soft stretched across a wide viewport. */
export function IphoneEighteenCampaign() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 0.5, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute left-1/2 top-1/2 size-[55vw] max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <AnimatedSection>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">
            <span className="size-1.5 rounded-full bg-brand-cyan" aria-hidden />
            Pre-Orders Open September 12
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">iPhone 18 Series</h2>

          <div className="mx-auto mt-10 max-w-2xl">
            <OfficialVideoPlayer src="/videos/iphone-18-pro-official-trailer.mp4" title="iPhone 18 Pro — Official Apple Video" />
          </div>

          <Button
            render={<Link href="/iphone-18-preorder" />}
            size="lg"
            className="mt-9 h-12 gap-2 rounded-full px-7 text-base"
          >
            Explore &amp; Pre-Order
            <ArrowRight className="size-4" />
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
