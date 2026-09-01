"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrimeTechLogo } from "@/components/brand/prime-tech-logo";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const VIDEO_SRC = "/videos/homepage-teaser.mp4";

/**
 * The cinematic "release teaser" moment — first thing shown once the
 * brand-opener intro is scrolled/dismissed. A real Prime Tech reveal video
 * plays once, centered (not full-bleed — the source is a square reveal
 * clip, not a landscape background), then disappears into the logo/CTA
 * content underneath. Until a video exists at
 * `public/videos/homepage-teaser.mp4` (or if it fails to load), skips
 * straight to the content — never a broken or empty video.
 */
export function HeroTeaser() {
  const reduced = useReducedMotion();
  const [showContent, setShowContent] = useState(reduced);

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-ink text-white">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 size-[60vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }}
        aria-hidden
      />

      <AnimatePresence mode="wait">
        {!showContent ? (
          <motion.video
            key="reveal-video"
            src={VIDEO_SRC}
            muted
            playsInline
            autoPlay
            onEnded={() => setShowContent(true)}
            onError={() => setShowContent(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square w-full max-w-md rounded-2xl object-cover sm:max-w-lg"
          />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center px-4 text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-white/60"
            >
              Prime Tech · Colombo
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <PrimeTechLogo className="h-14 sm:h-20" wordmarkClassName="text-3xl sm:text-5xl" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <Button render={<Link href="/products" />} size="lg" className="mt-10 h-12 gap-2 rounded-full px-7 text-base">
                Explore Products
                <ArrowRight className="size-4" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
