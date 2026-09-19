import Link from "next/link";
import { Smartphone, Tablet, Watch, Headphones, ShoppingBag } from "lucide-react";

const CATEGORIES = [
  { label: "Galaxy Phones", href: "/products/samsung/galaxy-phones", icon: Smartphone },
  { label: "Galaxy Tablets", href: "/products/samsung/galaxy-tab", icon: Tablet },
  { label: "Galaxy Watches", href: "/products/samsung/galaxy-watch", icon: Watch },
  { label: "Galaxy Buds", href: "/products/samsung/galaxy-buds", icon: Headphones },
  { label: "Samsung Accessories", href: "/accessories", icon: ShoppingBag },
] as const;

/** Category icon row from the reference design — every tile now links to
 * a real destination: the per-category Samsung catalogue pages, or the
 * cross-brand accessories page for "Samsung Accessories". */
export function SamsungCategoryStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10 xl:px-16">
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
        {CATEGORIES.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="group flex flex-col items-center gap-3.5 rounded-2xl border border-ink/8 bg-paper-soft px-4 py-8 text-center transition hover:border-ink/15 hover:bg-ink/5"
          >
            <Icon className="size-8 text-ink/70 transition group-hover:text-brand" strokeWidth={1.5} />
            <span className="text-sm font-medium text-ink/70">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
