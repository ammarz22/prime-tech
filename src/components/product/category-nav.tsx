"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface CategoryNavItem {
  label: string;
  value: string;
}

/** Sticky pill nav used by brand hub pages (Apple, Samsung) — links to
 * `?category=<value>#<value>` anchors on the same page rather than
 * driving a filtered query, since these pages pre-render every section. */
export function CategoryNav({ categories }: { categories: CategoryNavItem[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("category");

  return (
    <nav className="sticky top-[76px] z-30 -mx-4 flex gap-2 overflow-x-auto border-b border-ink/8 bg-paper/90 px-4 py-3 backdrop-blur-xl sm:mx-0 sm:justify-center sm:rounded-full sm:border sm:px-2">
      {categories.map((cat) => (
        <Link
          key={cat.value}
          href={`${pathname}?category=${cat.value}#${cat.value}`}
          className={cn(
            "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition",
            active === cat.value ? "bg-ink text-white" : "text-ink/60 hover:bg-ink/5 hover:text-ink",
          )}
        >
          {cat.label}
        </Link>
      ))}
    </nav>
  );
}
