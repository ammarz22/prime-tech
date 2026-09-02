"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { PrimeTechLogo } from "@/components/brand/prime-tech-logo";
import { SearchCommand } from "@/components/search/search-command";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { ProductsMegaMenu } from "@/components/layout/products-mega-menu";
import { PRIMARY_NAV_LINKS } from "@/lib/config/navigation";

// Routes whose hero sits on a dark background — the navbar needs light text
// here until the user scrolls past it onto the page's lighter body.
const DARK_HERO_ROUTES = ["/", "/products/apple", "/products/samsung", "/iphone-18-preorder"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onDarkHero = DARK_HERO_ROUTES.includes(pathname);
  const showLight = onDarkHero && !scrolled;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

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
            "flex items-center justify-between rounded-full border px-4 py-2.5 transition-colors duration-300",
            showLight
              ? "border-white/10 bg-white/[0.06] text-white shadow-[0_8px_30px_-14px_rgba(0,0,0,0.5)] backdrop-blur-md"
              : "border-ink/10 bg-paper/85 text-ink shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)] backdrop-blur-xl",
          )}
        >
          <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Prime Tech home">
            <PrimeTechLogo className="h-8 w-auto sm:h-9.5" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            <NavLink href="/" label="Home" active={isActive("/")} light={showLight} />
            <ProductsMegaMenu light={showLight} active={isActive("/products")} />
            {PRIMARY_NAV_LINKS.filter((l) => l.href !== "/").map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} active={isActive(link.href)} light={showLight} />
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="hidden sm:block">
              <SearchCommand />
            </div>
            <Link
              href="/saved"
              className={cn(
                "hidden size-9 items-center justify-center rounded-full transition lg:flex",
                showLight ? "text-white/75 hover:bg-white/10 hover:text-white" : "text-ink/70 hover:bg-ink/5 hover:text-ink",
              )}
              aria-label="Saved products"
            >
              <Heart className="size-4.5" />
            </Link>
            <MobileMenu links={PRIMARY_NAV_LINKS} light={showLight} />
          </div>
        </div>
      </motion.div>
    </header>
  );
}

function NavLink({ href, label, active, light }: { href: string; label: string; active: boolean; light: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "relative rounded-full px-3.5 py-2 text-sm font-medium transition",
        light
          ? active
            ? "text-white"
            : "text-white/70 hover:bg-white/10 hover:text-white"
          : active
            ? "text-ink"
            : "text-ink/65 hover:bg-ink/5 hover:text-ink",
      )}
    >
      {label}
      {active && (
        <span
          className={cn(
            "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full",
            light ? "bg-brand-cyan" : "bg-brand",
          )}
        />
      )}
    </Link>
  );
}
