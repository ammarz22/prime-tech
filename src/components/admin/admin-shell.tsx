"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BellRing,
  Boxes,
  Building2,
  ExternalLink,
  FileText,
  Inbox,
  LayoutDashboard,
  LayoutGrid,
  Menu,
  Package,
  PiggyBank,
  Plug,
  Settings,
  Smartphone,
  SlidersHorizontal,
  Star,
  Tag,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { PrimeTechLogo } from "@/components/brand/prime-tech-logo";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface NavGroup {
  heading?: string;
  links: NavLink[];
}

/** Sidebar / menu structure. The "Sales" group is the private sales tracker. */
export const ADMIN_LINKS: NavGroup[] = [
  {
    links: [
      { label: "Overview", href: "/admin", icon: LayoutDashboard },
      { label: "Products", href: "/admin/products", icon: Package },
      { label: "Brands", href: "/admin/brands", icon: Tag },
      { label: "Categories", href: "/admin/categories", icon: LayoutGrid },
      { label: "Branches", href: "/admin/branches", icon: Building2 },
      { label: "Enquiries", href: "/admin/enquiries", icon: Inbox },
      { label: "Stock Notifications", href: "/admin/stock-notifications", icon: BellRing },
      { label: "Reviews", href: "/admin/reviews", icon: Star },
      { label: "iPhone 18 Packages", href: "/admin/iphone18-packages", icon: Boxes },
      { label: "Site Settings", href: "/admin/settings", icon: Settings },
    ],
  },
  {
    heading: "Sales",
    links: [
      { label: "Sales Dashboard", href: "/admin/sales", icon: PiggyBank },
      { label: "Phone Sales", href: "/admin/sales/phones", icon: Smartphone },
      { label: "Accessories", href: "/admin/sales/accessories", icon: Plug },
      { label: "Expenses", href: "/admin/sales/expenses", icon: Wallet },
      { label: "Invoices", href: "/admin/invoices", icon: FileText },
      { label: "Sales Settings", href: "/admin/sales/settings", icon: SlidersHorizontal },
    ],
  },
];

/** The five sales pages shown in the phone's bottom bar. */
const BOTTOM_LINKS: (NavLink & { short: string })[] = [
  { label: "Sales Dashboard", short: "Home", href: "/admin/sales", icon: PiggyBank },
  { label: "Phone Sales", short: "Phones", href: "/admin/sales/phones", icon: Smartphone },
  { label: "Accessories", short: "Accessories", href: "/admin/sales/accessories", icon: Plug },
  { label: "Expenses", short: "Expenses", href: "/admin/sales/expenses", icon: Wallet },
  { label: "Invoices", short: "Invoices", href: "/admin/invoices", icon: FileText },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin" || href === "/admin/sales") return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
}

function NavLinks({ pathname, onNavigate, className }: { pathname: string; onNavigate?: () => void; className?: string }) {
  return (
    <nav className={cn("flex flex-col gap-1", className)}>
      {ADMIN_LINKS.map((group, i) => (
        <div key={group.heading ?? i} className={cn("flex flex-col gap-1", group.heading && "mt-5")}>
          {group.heading && (
            <p className="px-3.5 pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/40">{group.heading}</p>
          )}
          {group.links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition lg:min-h-0",
                  active ? "bg-ink text-white" : "text-ink/65 hover:bg-ink/5 hover:text-ink",
                )}
              >
                <link.icon className="size-4" />
                {link.label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

/**
 * The admin frame: a sidebar on desktop, and on phones a top bar (logo + menu
 * button that opens every admin link in a sheet) plus a bottom bar for the five
 * sales pages. The invoice print page renders bare, with no admin chrome.
 */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname.endsWith("/print")) return <>{children}</>;

  const showBottomBar = pathname.startsWith("/admin/sales") || pathname.startsWith("/admin/invoices");

  return (
    <div className="flex min-h-dvh flex-col bg-paper-soft lg:flex-row">
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-ink/8 bg-paper p-5 lg:flex">
        <Link href="/">
          <PrimeTechLogo className="h-8" />
        </Link>
        <NavLinks pathname={pathname} className="mt-8" />
        <Link href="/" className="mt-auto flex items-center gap-2 pt-6 text-sm text-ink/45 hover:text-ink">
          <ExternalLink className="size-3.5" />
          View site
        </Link>
      </aside>

      {/* Phone top bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-ink/8 bg-paper px-4 lg:hidden">
        <Link href="/admin" aria-label="Admin home">
          <PrimeTechLogo className="h-7" />
        </Link>
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="flex size-11 items-center justify-center rounded-xl text-ink/70 hover:bg-ink/5"
          aria-label="Open admin menu"
        >
          <Menu className="size-5" />
        </button>
      </header>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="right" className="data-[side=right]:w-4/5 data-[side=right]:sm:max-w-xs">
          <SheetHeader className="border-b border-ink/8">
            <SheetTitle>Admin menu</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-3 pb-6">
            <NavLinks pathname={pathname} onNavigate={() => setMenuOpen(false)} />
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="mt-6 flex min-h-11 items-center gap-2 px-3.5 text-sm text-ink/55"
            >
              <ExternalLink className="size-3.5" />
              View site
            </Link>
          </div>
        </SheetContent>
      </Sheet>

      <main className={cn("min-w-0 flex-1 p-4 sm:p-8", showBottomBar ? "pb-24 lg:pb-8" : "pb-8")}>{children}</main>

      {/* Phone bottom bar for the five sales pages */}
      {showBottomBar && (
        <nav
          aria-label="Sales"
          className="fixed inset-x-0 bottom-0 z-30 flex border-t border-ink/10 bg-paper px-1 pt-1 pb-[calc(0.25rem+env(safe-area-inset-bottom))] lg:hidden"
        >
          {BOTTOM_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg text-[11px] font-semibold",
                  active ? "text-brand" : "text-ink/50",
                )}
              >
                <link.icon className="size-5" />
                {link.short}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
