"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Heart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { PrimeTechLogo } from "@/components/brand/prime-tech-logo";
import { SearchCommand } from "@/components/search/search-command";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { CATEGORY_NAV_LINKS, PRIMARY_NAV_LINKS } from "@/lib/config/navigation";
import { whatsappLink } from "@/lib/config/site";
import type { EffectiveContact } from "@/lib/db/site-settings";

// The desktop bar shows the shop categories plus "About" — kept separate
// from `CATEGORY_NAV_LINKS` itself since that list is also the footer's
// "Shop" column, which shouldn't gain an unrelated "About" entry.
const DESKTOP_NAV_LINKS = [...CATEGORY_NAV_LINKS, ...PRIMARY_NAV_LINKS.filter((link) => link.label === "About")];

/** A floating rounded-pill nav that shrinks (`maxWidth`) as soon as the
 * page scrolls. On the homepage, at scroll-top, it renders dark and
 * translucent over the cinematic hero; everywhere else — scrolled, or any
 * other page — it renders the site's normal light pill. `fixed` (not
 * `sticky`) so it can overlap the hero at rest. */
export function Navbar({ contact }: { contact?: Pick<EffectiveContact, "phone" | "whatsappNumber"> }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]));
  const waHref = contact?.whatsappNumber
    ? (whatsappLink("Hello Prime Tech, I have a question.", contact.whatsappNumber) ?? "#")
    : null;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = pathname === "/" && !scrolled;

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4">
      <motion.div
        initial={false}
        animate={{ maxWidth: scrolled ? "72rem" : "84rem" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <div
          className={cn(
            "flex items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300",
            dark
              ? "border-white/15 bg-black/50 shadow-[0_8px_30px_-16px_rgba(0,0,0,0.5)] backdrop-blur-md"
              : "border-ink/10 bg-paper/90 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)] backdrop-blur-xl",
          )}
        >
          <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Prime Tech home">
            <span id="prime-navbar-logo" className="inline-flex">
              <PrimeTechLogo className="h-8 w-auto sm:h-9" wordmarkClassName={dark ? "text-white" : undefined} />
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {DESKTOP_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition",
                  dark
                    ? isActive(link.href)
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                    : isActive(link.href)
                      ? "text-ink"
                      : "text-ink/60 hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={cn("flex items-center gap-1.5 sm:gap-2", dark && "text-white")}>
            <div className="hidden sm:block">
              <SearchCommand />
            </div>
            <Link
              href="/saved"
              className={cn(
                "hidden size-9 items-center justify-center rounded-full transition lg:flex",
                dark ? "text-white/70 hover:bg-white/10 hover:text-white" : "text-ink/70 hover:bg-ink/5 hover:text-ink",
              )}
              aria-label="Saved products"
            >
              <Heart className="size-4.5" />
            </Link>
            {waHref && (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-medium text-white transition hover:bg-brand/85 sm:inline-flex"
              >
                <MessageCircle className="size-3.5" />
                Reach Out on WhatsApp
              </a>
            )}
            <MobileMenu links={PRIMARY_NAV_LINKS} />
          </div>
        </div>
      </motion.div>
    </header>
  );
}
