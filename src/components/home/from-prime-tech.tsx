import Image from "next/image";
import Link from "next/link";
import { Apple, ArrowRight } from "lucide-react";
import { StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { cn } from "@/lib/utils";

/** Real internal pages, styled as an editorial "from Prime Tech" strip —
 * not fake blog posts with invented dates/authors. Each tile links to a
 * page that genuinely exists today; the badge just names what kind of
 * page it is (a guide, a comparison tool, etc.), not a marketing claim.
 * "Not sure where to start?" has no matching product photo (it isn't
 * about one product), so it gets a plain brand-toned gradient card
 * instead of reaching for an unrelated or fabricated image. */
const ITEMS = [
  {
    title: "iPhone 18",
    subtitle: "What to expect",
    href: "/iphone-18-preorder",
    image: "/iphone-18/burgundy-hero.png",
    badge: "Featured",
    badgeVariant: "solid",
  },
  {
    title: "Best accessories",
    subtitle: "For your new iPhone",
    href: "/accessories",
    image: "/products/airpods-4/colors/white.jpg",
    badge: "Guide",
    badgeVariant: "light",
  },
  {
    title: "Not sure where to start?",
    subtitle: "Let us guide you",
    href: "/help-me-choose",
    image: null,
    badge: "Tips",
    badgeVariant: "outline",
  },
  {
    title: "Comparing devices?",
    subtitle: "See them side by side",
    href: "/products/compare",
    image: "/products/apple/apple-watch-series-11.jpg",
    badge: "Comparison",
    badgeVariant: "outline",
  },
] as const;

export function FromPrimeTech() {
  return (
    <section className="border-t border-ink/8 bg-paper px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              From Prime <span className="text-brand">Tech</span>
            </h2>
            <p className="mt-1 text-sm text-ink/50">Updates. Guides. Insights. And more.</p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1.5 text-sm font-medium text-ink underline decoration-ink/30 underline-offset-4 transition hover:decoration-ink"
          >
            View All Articles
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <StaggerGroup className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <StaggerItem key={item.href}>
              <Link href={item.href} className="group relative block h-64 overflow-hidden rounded-2xl bg-ink sm:h-80">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover opacity-70 transition group-hover:scale-105 group-hover:opacity-80"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: "radial-gradient(140% 100% at 30% 100%, #3d0d14 0%, #1a0508 55%, #05050a 100%)" }}
                  >
                    <Apple
                      className="size-28 text-brand/30 transition duration-500 group-hover:scale-110 sm:size-36"
                      strokeWidth={1}
                    />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                <span
                  className={cn(
                    "absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider",
                    item.badgeVariant === "solid" && "bg-brand text-white",
                    item.badgeVariant === "light" && "bg-white text-ink",
                    item.badgeVariant === "outline" && "border border-white/40 bg-white/10 text-white backdrop-blur-sm",
                  )}
                >
                  {item.badgeVariant === "solid" && <span className="size-1.5 rounded-full bg-white" aria-hidden />}
                  {item.badge}
                </span>

                <span className="absolute bottom-5 right-5 flex size-10 items-center justify-center rounded-full border border-white/40 text-white transition group-hover:border-white group-hover:bg-white group-hover:text-ink">
                  <ArrowRight className="size-4" />
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 pr-14 sm:pr-20">
                  <p className="text-sm text-white/60">{item.title}</p>
                  <p className="mt-1 text-lg font-semibold text-white">{item.subtitle}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
