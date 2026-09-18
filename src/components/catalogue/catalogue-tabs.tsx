import Link from "next/link";
import { cn } from "@/lib/utils";
import type { CatalogueCategory } from "@/lib/config/apple-catalogue";

/** Real navigation, not a client-state toggle — each tab is a distinct URL
 * (`categoryHref(slug)`) so the active category is shareable/bookmarkable
 * and the browser back button works as expected. */
export function CatalogueTabs({
  categories,
  activeSlug,
  categoryHref,
}: {
  categories: CatalogueCategory[];
  activeSlug: string;
  categoryHref: (slug: string) => string;
}) {
  return (
    <nav className="sticky top-[72px] z-30 border-b border-ink/8 bg-paper/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none] sm:px-6 lg:px-10 xl:px-16 [&::-webkit-scrollbar]:hidden">
        {categories.map(({ slug, label, icon: Icon }) => {
          const active = slug === activeSlug;
          return (
            <Link
              key={slug}
              href={categoryHref(slug)}
              className={cn(
                "flex shrink-0 flex-col items-center gap-1.5 rounded-xl border-b-2 px-5 py-3 text-xs font-medium transition",
                active ? "border-brand text-brand" : "border-transparent text-ink/50 hover:text-ink",
              )}
            >
              <Icon className="size-4.5" strokeWidth={1.5} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
