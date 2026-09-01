"use client";

import Link, { useLinkStatus } from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { label: "All", value: null, href: "/products" },
  { label: "Apple", value: "apple", href: "/products/apple", highlight: true },
  { label: "Galaxy S25 Series", value: "galaxy-s25", href: "/products?category=galaxy-s25" },
  { label: "Galaxy S26 Series", value: "galaxy-s26", href: "/products?category=galaxy-s26" },
];

/** Top-level category navigation for /products. Selecting Apple routes out
 * to the dedicated Apple experience rather than filtering in place. */
export function CategoryPills() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");
  const isProductsRoot = pathname === "/products";

  return (
    <nav className="flex gap-2 overflow-x-auto pb-1">
      {CATEGORIES.map((cat) => {
        const active = isProductsRoot && activeCategory === cat.value;
        return (
          <Link
            key={cat.label}
            href={cat.href}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition",
              active
                ? "border-ink bg-ink text-white"
                : cat.highlight
                  ? "border-brand/30 bg-brand/5 text-brand hover:border-brand/50"
                  : "border-ink/12 text-ink/65 hover:border-ink/25 hover:text-ink",
            )}
          >
            <PillLabel label={cat.label} />
          </Link>
        );
      })}
    </nav>
  );
}

/** Reads pending state from the parent Link — must be a Link descendant. */
function PillLabel({ label }: { label: string }) {
  const { pending } = useLinkStatus();
  return (
    <>
      {pending && <Loader2 className="size-3 animate-spin" />}
      {label}
    </>
  );
}
