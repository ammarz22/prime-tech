import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { PRODUCT_GROUPS } from "@/lib/config/navigation";

/** Curated Apple / Samsung ecosystem discovery — replaces a generic
 * multi-brand category grid, matching the two-ecosystem catalogue strategy. */
export function CategoryDiscovery() {
  return (
    <section className="bg-paper-soft py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading eyebrow="Explore Products" title="Two ecosystems. Fully explored." />
        </AnimatedSection>

        <StaggerGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PRODUCT_GROUPS.map((group, i) => (
            <StaggerItem key={group.href}>
              <Link
                href={group.href}
                className={
                  i === 0
                    ? "group relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-3xl bg-ink p-8 text-white"
                    : "group relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-3xl border border-ink/8 bg-paper-soft p-8 transition hover:border-ink/15 hover:bg-white hover:shadow-[0_20px_45px_-20px_rgba(0,0,0,0.15)]"
                }
              >
                {i === 0 ? (
                  <div className="bg-grid absolute inset-0 opacity-30 [mask-image:radial-gradient(circle_at_70%_20%,black,transparent_70%)]" />
                ) : (
                  <div className="bg-grid absolute inset-0 opacity-[0.15] [mask-image:radial-gradient(circle_at_70%_20%,black,transparent_70%)]" />
                )}
                <div
                  className={
                    i === 0
                      ? "pointer-events-none absolute -right-10 -top-10 size-56 rounded-full opacity-40 blur-[70px]"
                      : "pointer-events-none absolute -right-10 -top-10 size-56 rounded-full opacity-30 blur-[70px] transition-opacity duration-300 group-hover:opacity-70"
                  }
                  style={{ background: i === 0 ? "radial-gradient(circle, var(--brand) 0%, transparent 70%)" : "rgba(59,130,246,0.35)" }}
                  aria-hidden
                />
                <svg
                  aria-hidden
                  className={i === 0 ? "relative h-9 w-9 opacity-70" : "relative h-9 w-9 opacity-30"}
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <rect x="4" y="3" width="15" height="24" rx="2.5" stroke={i === 0 ? "white" : "var(--ink)"} strokeWidth="1.5" />
                  <circle cx="11.5" cy="23.5" r="0.9" fill={i === 0 ? "white" : "var(--ink)"} />
                  <rect x="21" y="10" width="15" height="27" rx="2" stroke={i === 0 ? "white" : "var(--ink)"} strokeWidth="1.5" />
                  <line x1="24" y1="14" x2="33" y2="14" stroke={i === 0 ? "white" : "var(--ink)"} strokeWidth="1.5" strokeLinecap="round" />
                </svg>

                <div className="relative flex flex-1 flex-col">
                  <div>
                    <p className={i === 0 ? "text-3xl font-semibold tracking-tight" : "text-3xl font-semibold tracking-tight text-ink"}>
                      {group.label}
                    </p>
                    <p className={i === 0 ? "mt-1.5 text-sm text-white/60" : "mt-1.5 text-sm text-ink/55"}>
                      {group.description}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {group.links.map((link) => (
                        <li
                          key={link.href}
                          className={
                            i === 0
                              ? "rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white/70"
                              : "rounded-full border border-ink/10 px-3 py-1 text-xs font-medium text-ink/60"
                          }
                        >
                          {link.label}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <span
                    className={
                      i === 0
                        ? "mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-brand-cyan"
                        : "mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-brand"
                    }
                  >
                    Explore {group.label}
                    <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
