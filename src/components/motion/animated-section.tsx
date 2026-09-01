"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section";
}

/** Fades + rises content into view once, on scroll. Disabled under reduced motion. */
export function AnimatedSection({ children, className, delay = 0, as = "div" }: AnimatedSectionProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerGroup({ children, className, staggerDelay = 0.08 }: StaggerProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ visible: { transition: { staggerChildren: staggerDelay } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
