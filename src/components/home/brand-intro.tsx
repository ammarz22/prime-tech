"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { PrimeTechMark, type MarkStage } from "@/components/brand/prime-tech-mark";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { EASE_PRIME } from "@/lib/motion";

const SESSION_KEY = "pt-intro-seen";

function noopSubscribe() {
  return () => {};
}
function getSeenSnapshot() {
  return sessionStorage.getItem(SESSION_KEY) !== null;
}
// SSR and the first hydration pass can't know sessionStorage — assume
// "already seen" (the safe default: render nothing) until the client can
// check for real, immediately after. See useSyncExternalStore's hydration
// contract: this avoids a server/client markup mismatch entirely, unlike
// deciding this in a plain effect.
function getSeenServerSnapshot() {
  return true;
}

type Phase = "playing" | "settled" | "leaving" | "done";

/**
 * The Prime Tech logo, built live: three device icons draw in, then the "P"
 * frame draws around them and connects, then the wordmark settles — before
 * shrinking into the navbar's actual logo slot to open the rest of the
 * homepage. Plays once per browser session (first homepage visit only) and
 * is always skippable.
 */
export function BrandIntro() {
  const reduced = useReducedMotion();
  const seen = useSyncExternalStore(noopSubscribe, getSeenSnapshot, getSeenServerSnapshot);
  const shouldPlay = !reduced && !seen;

  const [phase, setPhase] = useState<Phase>("playing");
  const [stage, setStage] = useState<MarkStage>("icons");
  const [exit, setExit] = useState<{ x: number; y: number; scale: number } | null>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldPlay) return;
    const timers = [
      setTimeout(() => setStage("frame"), 1000),
      setTimeout(() => setStage("done"), 2500),
      setTimeout(() => setPhase("settled"), 3900),
    ];
    return () => timers.forEach(clearTimeout);
  }, [shouldPlay]);

  useEffect(() => {
    if (phase !== "settled") return;

    function startExit() {
      const group = groupRef.current;
      const target = document.getElementById("prime-navbar-logo");
      if (group && target) {
        const g = group.getBoundingClientRect();
        const t = target.getBoundingClientRect();
        setExit({
          x: t.left + t.width / 2 - (g.left + g.width / 2),
          y: t.top + t.height / 2 - (g.top + g.height / 2),
          scale: t.height / g.height,
        });
      }
      sessionStorage.setItem(SESSION_KEY, "1");
      setPhase("leaving");
      setTimeout(() => setPhase("done"), 900);
    }

    const t = setTimeout(startExit, 900);
    return () => clearTimeout(t);
  }, [phase]);

  function skip() {
    sessionStorage.setItem(SESSION_KEY, "1");
    setPhase("done");
  }

  if (!shouldPlay || phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center" aria-hidden={phase === "leaving"}>
      <motion.div
        className="absolute inset-0 bg-ink"
        animate={{ opacity: phase === "leaving" ? 0 : 1 }}
        transition={{ duration: 0.7, ease: EASE_PRIME }}
      />

      {phase !== "leaving" && (
        <button
          type="button"
          onClick={skip}
          className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-2 text-xs font-medium text-white/60 transition hover:border-white/30 hover:text-white sm:right-8 sm:top-8"
        >
          Skip
          <X className="size-3.5" />
        </button>
      )}

      <motion.div
        ref={groupRef}
        className="relative flex flex-col items-center px-4"
        animate={exit ? { x: exit.x, y: exit.y, scale: exit.scale, opacity: 0 } : {}}
        transition={{ duration: 0.9, ease: EASE_PRIME }}
      >
        <PrimeTechMark stage={stage} className="h-20 w-20 sm:h-28 sm:w-28" />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={stage === "done" ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6, ease: EASE_PRIME }}
          className="mt-5 text-center"
        >
          <p className="text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl">
            PRIME<span className="text-brand"> TECH</span>
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={stage === "done" ? { opacity: 1 } : {}}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="mt-2.5 text-xs font-medium uppercase tracking-[0.3em] text-white/50"
          >
            Colombo
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}
