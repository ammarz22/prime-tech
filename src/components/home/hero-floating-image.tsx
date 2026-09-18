"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** The hero product shot — a real photo already exported with a proper
 * alpha-transparent background (no studio backdrop to mask out), so it
 * just floats directly on the hero's own background. A soft blurred
 * ellipse beneath it grounds it with a contact shadow, and a diagonal
 * light sweep glints across it periodically. Disabled under reduced
 * motion. */
export function HeroFloatingImage({ src, alt }: { src: string; alt: string }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto aspect-square w-full max-w-md lg:mx-0 lg:h-full lg:w-auto lg:max-w-none"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div aria-hidden className="absolute inset-x-[24%] bottom-[10%] h-8 rounded-full bg-brand/40 blur-2xl" />

      <motion.div
        className="relative size-full"
        animate={reduced ? undefined : { y: [0, -12, 0] }}
        transition={reduced ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src={src} alt={alt} fill priority sizes="(min-width: 1024px) 45vw, 90vw" className="object-contain" />
      </motion.div>

      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-overlay"
          style={{
            background: "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.9) 50%, transparent 60%)",
          }}
          initial={{ x: "-120%" }}
          animate={{ x: "120%" }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
        />
      )}
    </motion.div>
  );
}
