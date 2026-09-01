"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRODUCT_GROUPS } from "@/lib/config/navigation";

export function ProductsMegaMenu({ light = false, active = false }: { light?: boolean; active?: boolean }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleEnter() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function handleLeave() {
    closeTimer.current = setTimeout(() => setOpen(false), 250);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className={cn(
          "relative flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition",
          light
            ? active
              ? "text-white"
              : "text-white/70 hover:bg-white/10 hover:text-white"
            : active
              ? "text-ink"
              : "text-ink/65 hover:bg-ink/5 hover:text-ink",
        )}
      >
        Products
        <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
        {active && (
          <span className={cn("absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full", light ? "bg-brand-cyan" : "bg-brand")} />
        )}
      </button>

      {/*
        The panel is positioned flush against the trigger (top-full, zero
        margin) with the visual gap moved to inner padding instead. That
        keeps the *hoverable box* contiguous from button to panel — no dead
        pixel strip for the cursor to cross where a native mouseleave would
        fire and race the close-timer. Explicit handlers on the panel itself
        are a second line of defense on top of the shared container.
      */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className="absolute left-1/2 top-full z-50 w-[560px] max-w-[90vw] -translate-x-1/2 pt-3"
          >
            <div className="overflow-hidden rounded-3xl border border-ink/8 bg-paper text-ink shadow-[0_24px_60px_-16px_rgba(0,0,0,0.25)]">
              <div className="grid grid-cols-2 gap-1 p-5">
                {PRODUCT_GROUPS.map((group, i) => (
                  <div
                    key={group.href}
                    className={cn("rounded-2xl p-4", i === 0 ? "bg-ink text-white" : "")}
                  >
                    <p
                      className={cn(
                        "text-xs font-semibold uppercase tracking-[0.15em]",
                        i === 0 ? "text-brand-cyan" : "text-ink/40",
                      )}
                    >
                      {i === 0 ? "Featured" : "Ecosystem"}
                    </p>
                    <Link
                      href={group.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "mt-1.5 block text-lg font-semibold",
                        i === 0 ? "hover:text-brand-cyan" : "text-ink hover:text-brand",
                      )}
                    >
                      {group.label}
                    </Link>
                    <p className={cn("mt-1 text-xs", i === 0 ? "text-white/50" : "text-ink/45")}>{group.description}</p>
                    <ul className="mt-3 space-y-0.5">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "block rounded-lg px-2 py-1.5 text-sm transition",
                              i === 0
                                ? "text-white/70 hover:bg-white/10 hover:text-white"
                                : "text-ink/70 hover:bg-ink/5 hover:text-ink",
                            )}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <Link
                href="/products"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-t border-ink/8 bg-paper-soft px-6 py-3.5 text-sm font-medium text-brand transition hover:bg-ink/5"
              >
                View All Products
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
