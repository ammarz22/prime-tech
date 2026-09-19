import Link from "next/link";
import { Smartphone, Laptop, Tablet, Watch, Headphones, ShoppingBag } from "lucide-react";

const CATEGORIES = [
  { label: "iPhone", href: "/products/apple/iphone", icon: Smartphone },
  { label: "Mac", href: "/products/apple/mac", icon: Laptop },
  { label: "iPad", href: "/products/apple/ipad", icon: Tablet },
  { label: "Watch", href: "/products/apple/apple-watch", icon: Watch },
  { label: "AirPods", href: "/products/apple/airpods", icon: Headphones },
  { label: "Accessories", href: "/accessories", icon: ShoppingBag },
] as const;

/** Category icon row from the reference design — every tile now links to
 * a real destination: the per-category Apple catalogue pages, or the
 * cross-brand accessories page for "Accessories". */
export function AppleCategoryStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-10 pb-2 sm:px-6 lg:px-10 xl:px-16">
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
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
