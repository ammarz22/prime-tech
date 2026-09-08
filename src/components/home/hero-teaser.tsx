"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const VIDEO_SRC = "/videos/homepage-teaser.mp4";

/**
 * Stops on the source video's own bright flash transition (~14.0-14.7s) —
 * a natural "snap" cut point — with a real safety margin before any of the
 * video's own (unrelated, garbled) closing text becomes legible around
 * 14.8s. `timeupdate` doesn't fire at precise intervals during real
 * playback, and `pause()` itself isn't instantaneous, so a tight margin
 * (previously 14.6s) let the wrong text slip through occasionally. The
 * code-rendered logo/button below is the real reveal moment.
 */
const LOOP_END = 14.0;

/**
 * The homepage hero — a real Prime Tech product-showcase video plays out in
 * full (corridor, phone, laptop, gallery), then freezes on its last frame
 * and blurs/darkens into an atmospheric backdrop — calming down rather than
 * looping forever, while keeping the actual footage present instead of
 * swapping to an unrelated background. Until a video exists at
 * `public/videos/homepage-teaser.mp4` (or if it fails to load), falls back
 * to the same dark/grid/glow treatment used elsewhere on the site, so this
 * never looks broken or empty. The logo/CTA fade in at the same moment the
 * video settles.
 */
export function HeroTeaser() {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [contentVisible, setContentVisible] = useState(reduced);

  function handleTimeUpdate() {
    const video = videoRef.current;
    if (video && video.currentTime >= LOOP_END) {
      video.pause();
      setContentVisible(true);
    }
  }

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-ink text-white">
      {!videoFailed && (
        <motion.video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          autoPlay={!reduced}
          onTimeUpdate={handleTimeUpdate}
          onError={() => setVideoFailed(true)}
          animate={{ filter: contentVisible ? "blur(28px) brightness(0.4)" : "blur(0px) brightness(1)" }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
          className="absolute inset-0 size-full object-cover"
        />
      )}

      {/* Ambient fallback background — always underneath, visible whenever
          there's no video yet (or it fails to load). */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 size-[60vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }}
        aria-hidden
      />

      {/* Legibility overlay for the text sitting on top of the video. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/65" />

      <AnimatePresence>
        {contentVisible && (
          <div key="reveal" className="relative flex flex-col items-center px-4 text-center">
            {/* (1) icon appears alone, at a bigger-than-resting size — (2) the
                wordmark, stacked directly behind the icon via z-index, slides
                out from underneath it — (3) once both have settled, the whole
                group scales down together to its resting size. */}
            <motion.div
              initial={{ scale: 1.7 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.7, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex h-14 items-center sm:h-20"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0 }}
                className="relative z-10 aspect-square h-full shrink-0 overflow-hidden rounded-[0.55em] bg-black ring-1 ring-black/10"
              >
                <Image src="/brand/prime-tech-logo.jpeg" alt="Prime Tech" fill sizes="80px" className="object-cover" priority />
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -88 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-0 ml-2.5 whitespace-nowrap text-3xl font-bold leading-none tracking-tight sm:text-5xl"
              >
                PRIME<span className="text-brand"> TECH</span>
              </motion.span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-xs font-medium uppercase tracking-[0.3em] text-white/60"
            >
              Colombo
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Button render={<Link href="/products" />} size="lg" className="mt-8 h-12 gap-2 rounded-full px-7 text-base">
                Explore Products
                <ArrowRight className="size-4" />
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
