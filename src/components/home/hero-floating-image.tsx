"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** Fades the photo's own studio backdrop out toward every edge, so it melts
 * into the hero instead of sitting there as a visible square. */
const EDGE_FEATHER =
  "linear-gradient(to right, transparent, #000 18%, #000 82%, transparent), linear-gradient(to bottom, transparent, #000 15%, #000 85%, transparent)";

/** The hero product shot. The photo has its own dark burgundy backdrop, so it
 * is feathered into the hero's background rather than cut out. A soft blurred
 * ellipse beneath it grounds it with a contact shadow, and a diagonal light
 * sweep glints across it periodically. Disabled under reduced motion. */
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
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 90vw"
          className="object-contain"
          style={{
            maskImage: EDGE_FEATHER,
            WebkitMaskImage: EDGE_FEATHER,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
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
