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
      <div className="overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:px-6 lg:px-10 xl:px-16 [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto flex w-max gap-3">
          {categories.map(({ slug, label, icon: Icon }) => {
            const active = slug === activeSlug;
            return (
              <Link
                key={slug}
                href={categoryHref(slug)}
                className={cn(
                  "flex min-w-[104px] shrink-0 flex-col items-center gap-2 rounded-2xl border px-6 py-4 text-sm font-medium transition",
                  active
                    ? "border-brand/40 bg-brand/5 text-brand"
                    : "border-ink/8 bg-paper-soft text-ink/60 hover:border-ink/15 hover:text-ink",
                )}
              >
                <Icon className="size-7" strokeWidth={1.5} />
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
