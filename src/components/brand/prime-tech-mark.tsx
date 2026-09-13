"use client";

import { motion, type Variants } from "motion/react";
import { EASE_PRIME } from "@/lib/motion";

const DRAW_TRANSITION = { duration: 0.9, ease: EASE_PRIME };

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1 },
};

const fillIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1 },
};

/**
 * The animatable Prime Tech icon mark, rebuilt as real vector shapes from
 * the source photo at `public/brand/prime-tech-logo.jpeg` — a phone, a
 * laptop and an AirPods case nested inside a stylized "P" — so each piece
 * can genuinely draw in and connect, rather than the flat raster photo
 * which has no internal shapes to animate. Used only by `BrandIntro`; the
 * real photo remains the logo everywhere else on the site (navbar,
 * footer, etc. via `PrimeTechLogo`) for exact brand fidelity.
 *
 * `stage` gates which layer is currently drawing, so the parent can
 * sequence device icons → P frame → done without juggling five separate
 * timers. Every stage at or past a shape's own stage stays visible.
 */
export type MarkStage = "icons" | "frame" | "done";

const STAGE_ORDER: Record<MarkStage, number> = { icons: 0, frame: 1, done: 2 };

export function PrimeTechMark({ stage, className }: { stage: MarkStage; className?: string }) {
  const iconsIn = STAGE_ORDER[stage] >= STAGE_ORDER.icons;
  const frameIn = STAGE_ORDER[stage] >= STAGE_ORDER.frame;

  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden>
      {/* Phone */}
      <motion.g variants={draw} initial="hidden" animate={iconsIn ? "visible" : "hidden"} transition={DRAW_TRANSITION}>
        <motion.rect x="68" y="32" width="20" height="34" rx="4" stroke="white" strokeWidth="2.2" variants={draw} />
        <motion.circle cx="78" cy="37.5" r="1.2" fill="white" variants={fillIn} transition={{ delay: 0.7 }} />
      </motion.g>

      {/* Laptop */}
      <motion.g
        variants={draw}
        initial="hidden"
        animate={iconsIn ? "visible" : "hidden"}
        transition={{ ...DRAW_TRANSITION, delay: 0.15 }}
      >
        <motion.rect x="86" y="38" width="30" height="22" rx="2" stroke="var(--brand-cyan)" strokeWidth="2.2" variants={draw} />
        <motion.path
          d="M81 63 L121 63 L116 68 L86 68 Z"
          stroke="var(--brand-cyan)"
          strokeWidth="2.2"
          strokeLinejoin="round"
          variants={draw}
        />
      </motion.g>

      {/* AirPods case */}
      <motion.g
        variants={draw}
        initial="hidden"
        animate={iconsIn ? "visible" : "hidden"}
        transition={{ ...DRAW_TRANSITION, delay: 0.3 }}
      >
        <motion.rect x="75" y="58" width="17" height="14" rx="5" stroke="white" strokeWidth="2.2" variants={draw} />
        <motion.path d="M80 63 q3.5 -3.5 7 0" stroke="white" strokeWidth="1.7" variants={draw} />
        <motion.path d="M80 63 q3.5 4 7 0" stroke="white" strokeWidth="1.7" variants={draw} />
      </motion.g>

      {/* P frame — stem + bowl draw in first, then the lower flag fills in */}
      <motion.path
        d="M60 20 L60 100"
        stroke="url(#pGradient)"
        strokeWidth="12"
        strokeLinecap="round"
        variants={draw}
        initial="hidden"
        animate={frameIn ? "visible" : "hidden"}
        transition={{ ...DRAW_TRANSITION, duration: 0.6, delay: 0.1 }}
      />
      <motion.path
        d="M60 20 L106 20 A44 39 0 0 1 106 98 L66 98"
        stroke="url(#pGradient)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={draw}
        initial="hidden"
        animate={frameIn ? "visible" : "hidden"}
        transition={{ ...DRAW_TRANSITION, duration: 1.1, delay: 0.3 }}
      />
      <motion.path
        d="M58 94 L58 152 L102 122 Z"
        fill="url(#pGradient)"
        variants={fillIn}
        initial="hidden"
        animate={frameIn ? "visible" : "hidden"}
        transition={{ duration: 0.6, ease: EASE_PRIME, delay: 1.2 }}
      />

      <defs>
        <linearGradient id="pGradient" x1="58" y1="18" x2="120" y2="155" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="var(--brand)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
