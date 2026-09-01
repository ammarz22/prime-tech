"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Subtle fade/rise on route change. Deliberately no `mode="wait"` — that
 * blocks mounting the new page until the old one's exit animation finishes,
 * which caused a real stuck-navigation bug elsewhere in this app
 * (help-me-choose's step wizard). Concurrent enter/exit reads as a soft
 * crossfade instead and can never block navigation.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
