"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { EASE_PRIME } from "@/lib/motion";

/** Total time the loader spends going 0% → 100%. Change this one number to
 * retime the whole intro — everything else (the exit sequence) is timed
 * relative to it. */
const INTRO_DURATION_MS = 4000;
/** How long the exit — content fading off, then the whole scene zooming
 * through into the homepage — takes once the loader hits 100%. */
const EXIT_DURATION_MS = 1300;

type Phase = "playing" | "exiting" | "done";

/** Fired the instant the intro starts clearing away (loader hits 100%, or
 * the visitor hits Skip) so `HomeReveal` can animate the homepage in at
 * exactly that moment, instead of it just sitting there fully-formed and
 * static the moment the intro fades. */
const INTRO_EXITING_EVENT = "pt-intro-exiting";

/** One copy of the sliding brand statement; two of these sit side by side
 * so translating the pair by exactly -50% loops with no visible seam. */
function MarqueeGroup() {
  return (
    <span className="flex shrink-0 items-center gap-5 pr-5 text-xs font-medium uppercase tracking-[0.35em] text-white/45 sm:text-sm">
      <span>Innovation Inspires</span>
      <span className="text-white/20">|</span>
      <span>
        Technology <span className="text-brand">Redefines</span>
      </span>
      <span className="text-white/20">|</span>
      <span>People Connect</span>
      <span className="text-white/20">|</span>
    </span>
  );
}

/**
 * The site's cinematic opening sequence — the supplied brand photograph as a
 * full-bleed backdrop, the wordmark resolving in from a blur, an infinite
 * sliding brand statement, then a real 0→100% loading bar before the whole
 * scene fades to reveal the homepage. Plays on every visit (no
 * session-skip) and is always skippable — skipping still runs the same
 * exit fade rather than unmounting instantly, so there's never a blank
 * flash before the homepage appears. Fires `pt-intro-exiting` the moment
 * it starts clearing away so `HomeReveal` can animate the homepage in at
 * that exact moment instead of it just sitting there static. The loading
 * bar's progress is decorative pacing for this reveal, not tied to actual
 * asset loading.
 */
export function BrandIntro() {
  const reduced = useReducedMotion();
  const shouldPlay = !reduced;

  const [phase, setPhase] = useState<Phase>("playing");
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!shouldPlay) return;
    const start = performance.now();

    function tick(now: number) {
      const pct = Math.min(100, ((now - start) / INTRO_DURATION_MS) * 100);
      setProgress((prev) => (Math.round(pct) === Math.round(prev) ? prev : pct));
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        window.dispatchEvent(new Event(INTRO_EXITING_EVENT));
        setPhase("exiting");
      }
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [shouldPlay]);

  useEffect(() => {
    if (phase !== "exiting") return;
    const t = setTimeout(() => setPhase("done"), EXIT_DURATION_MS);
    return () => clearTimeout(t);
  }, [phase]);

  function skip() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    window.dispatchEvent(new Event(INTRO_EXITING_EVENT));
    setPhase("exiting");
  }

  if (!shouldPlay || phase === "done") return null;

  const exiting = phase === "exiting";

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden bg-black" aria-hidden={exiting}>
      {/* The whole scene (backdrop + wordmark) zooms and washes to bright
          as one unit on exit — a "flying through" reveal rather than a
          plain cross-fade, distinct from the quicker fades on the loading
          UI beneath it. */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 1, scale: 1, filter: "brightness(1)" }}
        animate={
          exiting
            ? { opacity: 0, scale: 1.45, filter: "brightness(1.6)" }
            : { opacity: 1, scale: 1, filter: "brightness(1)" }
        }
        transition={{ duration: EXIT_DURATION_MS / 1000, ease: EASE_PRIME }}
      >
        <Image src="/intro/intro-background.png" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/35" />

        <motion.div
          className="relative z-10 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
          animate={{
            opacity: exiting ? 0 : 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={
            exiting
              ? { duration: EXIT_DURATION_MS * 0.7 / 1000, ease: EASE_PRIME }
              : { duration: 1.2, ease: EASE_PRIME }
          }
        >
          <div className="flex items-center gap-3">
            <p className="text-3xl font-bold uppercase tracking-[0.15em] text-white sm:text-5xl">
              Prime <span className="text-white">Tech</span>
            </p>
            <span className="size-2.5 shrink-0 rounded-full bg-brand shadow-[0_0_14px_2px_var(--brand)] sm:size-3.5" aria-hidden />
          </div>
          <span className="mt-3 h-px w-56 bg-gradient-to-r from-transparent via-brand/70 to-transparent sm:w-72" aria-hidden />
          <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.5em] text-white/55 sm:text-xs">
            Technology Lives Here
          </p>
        </motion.div>
      </motion.div>

      {!exiting && (
        <button
          type="button"
          onClick={skip}
          className="absolute right-5 top-5 z-20 flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-2 text-xs font-medium text-white/60 transition hover:border-white/30 hover:text-white sm:right-8 sm:top-8"
        >
          Skip
          <X className="size-3.5" />
        </button>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-6 pb-[12vh] sm:pb-[15vh]">
        <motion.div
          className="w-full max-w-2xl overflow-hidden"
          style={{ maskImage: "linear-gradient(90deg, transparent, black 15%, black 85%, transparent)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          transition={
            exiting
              ? { duration: (EXIT_DURATION_MS * 0.35) / 1000, ease: EASE_PRIME }
              : { delay: 0.5, duration: 0.8, ease: EASE_PRIME }
          }
        >
          <div className={cn("flex w-max", !reduced && "animate-marquee")}>
            <MarqueeGroup />
            <MarqueeGroup />
          </div>
        </motion.div>

        <motion.div
          className="mt-10 flex w-full max-w-xs flex-col items-center gap-4 sm:mt-12 sm:max-w-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: exiting ? 0 : 1, y: 0 }}
          transition={
            exiting
              ? { duration: (EXIT_DURATION_MS * 0.3) / 1000, ease: EASE_PRIME }
              : { delay: 0.75, duration: 0.7, ease: EASE_PRIME }
          }
        >
          <div className="flex w-full items-center gap-3">
            <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/15">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-brand shadow-[0_0_10px_1px_var(--brand)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="w-9 shrink-0 text-right text-xs font-medium tabular-nums text-white/70">
              {Math.round(progress)}%
            </span>
          </div>
          <p className="animate-pulse text-[10px] font-medium uppercase tracking-[0.4em] text-white/40 sm:text-[11px]">
            Loading a Brighter Tomorrow...
          </p>
        </motion.div>
      </div>
    </div>
  );
}
