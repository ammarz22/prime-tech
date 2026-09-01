"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronRight, ChevronDown, Heart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { SearchCommand } from "@/components/search/search-command";
import { cn } from "@/lib/utils";
import { PRODUCT_GROUPS } from "@/lib/config/navigation";

interface MobileMenuProps {
  links: { label: string; href: string }[];
  light?: boolean;
}

export function MobileMenu({ links, light = false }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [productsExpanded, setProductsExpanded] = useState(false);
  const otherLinks = links.filter((l) => l.href !== "/");

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "flex size-9 items-center justify-center rounded-full transition lg:hidden",
          light ? "text-white/75 hover:bg-white/10 hover:text-white" : "text-ink/70 hover:bg-ink/5 hover:text-ink",
        )}
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-paper p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-ink/50">Menu</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex size-9 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="mt-4 mb-6" onClick={() => setOpen(false)}>
                <SearchCommand />
              </div>

              <nav className="flex flex-col gap-1">
                <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0 }}>
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-3.5 text-lg font-medium text-ink transition hover:bg-ink/5"
                  >
                    Home
                    <ChevronRight className="size-4 text-ink/30" />
                  </Link>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}>
                  <button
                    type="button"
                    onClick={() => setProductsExpanded((prev) => !prev)}
                    aria-expanded={productsExpanded}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-lg font-medium text-ink transition hover:bg-ink/5"
                  >
                    Products
                    <ChevronDown className={cn("size-4 text-ink/30 transition-transform", productsExpanded && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {productsExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-3"
                      >
                        {PRODUCT_GROUPS.map((group) => (
                          <div key={group.href} className="mb-1">
                            <Link
                              href={group.href}
                              onClick={() => setOpen(false)}
                              className="block rounded-xl px-3 py-2 text-sm font-semibold text-ink/80 transition hover:bg-ink/5 hover:text-ink"
                            >
                              {group.label}
                            </Link>
                            {group.links.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className="block rounded-xl py-2 pl-6 pr-3 text-base text-ink/65 transition hover:bg-ink/5 hover:text-ink"
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                        <Link
                          href="/products"
                          onClick={() => setOpen(false)}
                          className="block rounded-xl px-3 py-2.5 text-sm font-medium text-brand transition hover:bg-ink/5"
                        >
                          View All Products
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {otherLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * (i + 2) }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-3.5 text-lg font-medium text-ink transition hover:bg-ink/5"
                    >
                      {link.label}
                      <ChevronRight className="size-4 text-ink/30" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto border-t border-ink/10 pt-4">
                <Link
                  href="/saved"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-3.5 text-base font-medium text-ink transition hover:bg-ink/5"
                >
                  <span className="flex items-center gap-2">
                    <Heart className="size-4.5 text-ink/40" />
                    Saved Products
                  </span>
                  <ChevronRight className="size-4 text-ink/30" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
