"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * The dark-hero "futuristic but luxury" glass tile: backdrop-blurred glass,
 * cyan HUD corner brackets, a pulsing status dot, optional gentle float.
 * Established on the homepage hero (product-category icon cluster) after
 * several rejected neon/sci-fi directions — reused here rather than
 * reinvented so every dark-hero moment on the site reads as one system.
 */
export function HudGlassTile({
  children,
  size,
  float = true,
  floatDuration = 4.2,
  delay = 0,
  className,
  ...motionProps
}: {
  children: React.ReactNode;
  size?: number;
  float?: boolean;
  floatDuration?: number;
  delay?: number;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children" | "className" | "style">) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "relative flex items-center justify-center rounded-2xl border bg-white/[0.04] backdrop-blur-sm",
        className,
      )}
      style={{
        width: size,
        height: size,
        borderColor: "color-mix(in oklch, var(--brand-cyan) 35%, transparent)",
        boxShadow: "0 20px 45px -20px rgba(0,0,0,0.5), 0 0 24px -8px color-mix(in oklch, var(--brand) 55%, transparent)",
      }}
      animate={reduced || !float ? undefined : { y: [0, -8, 0] }}
      transition={reduced || !float ? undefined : { duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay }}
      {...motionProps}
    >
      <span
        className="absolute -left-1 -top-1 size-2.5 border-l border-t"
        style={{ borderColor: "var(--brand-cyan)", opacity: 0.7 }}
        aria-hidden
      />
      <span
        className="absolute -right-1 -bottom-1 size-2.5 border-b border-r"
        style={{ borderColor: "var(--brand-cyan)", opacity: 0.7 }}
        aria-hidden
      />
      <motion.span
        className="absolute -right-1 -top-1 size-1.5 rounded-full"
        style={{ background: "var(--brand-cyan)" }}
        animate={reduced ? undefined : { opacity: [1, 0.3, 1] }}
        transition={reduced ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut", delay }}
        aria-hidden
      />
      {children}
    </motion.div>
  );
}
