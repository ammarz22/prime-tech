"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { EASE_PRIME } from "@/lib/motion";

/**
 * Fades and lifts the homepage in the instant `BrandIntro` starts clearing
 * away (its `pt-intro-exiting` event), so the two feel like one continuous
 * reveal instead of the intro just vanishing onto an already-static page.
 * Starts already-revealed when the intro won't play at all (reduced
 * motion), and has a generous timeout fallback so content is never stuck
 * invisible if the event is somehow missed.
 */
export function HomeReveal({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const [revealed, setRevealed] = useState(reduced);

  useEffect(() => {
    if (reduced) return;
    function reveal() {
      setRevealed(true);
    }
    window.addEventListener("pt-intro-exiting", reveal);
    const fallback = setTimeout(reveal, 9000);
    return () => {
      window.removeEventListener("pt-intro-exiting", reveal);
      clearTimeout(fallback);
    };
  }, [reduced]);

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 18, scale: 0.99 }}
      animate={revealed ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, ease: EASE_PRIME }}
    >
      {children}
    </motion.div>
  );
}
