import Image from "next/image";
import Link from "next/link";
import { Apple, ArrowRight } from "lucide-react";
import { PRODUCT_GROUPS } from "@/lib/config/navigation";

const APPLE_GROUP = PRODUCT_GROUPS[0];
const SAMSUNG_GROUP = PRODUCT_GROUPS[1];

/** Two contained, rounded ecosystem cards (not a full-bleed split) — each
 * pairs a real category list from `navigation.ts` with its own product
 * cluster shot, cut out to transparent PNG (`scripts` aren't checked in;
 * the flood-fill-from-border technique that produced these only erases
 * background pixels connected to the image edge, so enclosed white parts
 * like an AirPods case survive) so the devices sit directly on each
 * panel's own background with no card-behind-a-card box. Samsung's link
 * row intentionally has fewer items than Apple's — that's the real
 * catalogue (flagship Galaxy phones only), not a layout mistake. */
export function CategoryDiscovery() {
  return (
    <section className="bg-paper px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 lg:grid-cols-2">
        <Link
          href={APPLE_GROUP.href}
          className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl p-6 sm:min-h-[340px] sm:p-8"
          style={{ background: "linear-gradient(135deg, #fffaf9 0%, #fdeeef 45%, #f9dfe2 100%)" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 -top-20 size-56 rounded-full bg-brand/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-14 left-1/3 size-52 rounded-full bg-white/70 blur-3xl"
          />

          <div className="relative z-10 flex items-start justify-between">
            <Apple className="size-6 text-ink" strokeWidth={1.5} />
            <div className="text-right">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ink/40">One ecosystem.</p>
              <span className="ml-auto mt-1.5 block h-[3px] w-8 rounded-full bg-brand" aria-hidden />
            </div>
          </div>

          <div className="relative z-10 mt-5 max-w-[12rem] sm:max-w-[13rem]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/50">Discover the latest</p>
            <h3 className="mt-1.5 text-2xl font-bold uppercase tracking-tight text-ink sm:text-3xl">
              {APPLE_GROUP.label}
            </h3>
            <p className="mt-1.5 text-sm text-ink/60">{APPLE_GROUP.description}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-ink/20 px-4 py-1.5 text-xs font-medium text-ink transition group-hover:border-ink/40">
              Explore {APPLE_GROUP.label}
              <ArrowRight className="size-3.5 transition group-hover:translate-x-1" />
            </span>
          </div>

          <div className="relative z-10 mt-4 aspect-[608/292] w-full sm:hidden">
            <Image
              src="/hero/apple-ecosystem-collage-cutout.png"
              alt=""
              fill
              sizes="90vw"
              className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)]"
            />
          </div>

          <div className="relative z-10 mt-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-ink/10 pt-4">
            {APPLE_GROUP.links.map((link) => (
              <span key={link.href} className="text-xs text-ink/55">
                {link.label}
              </span>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-[4%] hidden w-[50%] items-center sm:flex">
            <div className="relative aspect-[608/292] w-full">
              <Image
                src="/hero/apple-ecosystem-collage-cutout.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 28vw, 45vw"
                className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)] transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </Link>

        <Link
          href={SAMSUNG_GROUP.href}
          className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl bg-ink p-6 text-white sm:min-h-[340px] sm:p-8"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-28 -top-14 size-80 rounded-full bg-brand/25 blur-[100px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-1/4 size-52 rounded-full bg-brand/10 blur-3xl"
          />

          <div className="relative z-10 flex items-start justify-between">
            <p className="text-base font-bold tracking-tight">SAMSUNG</p>
            <div className="text-right">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">Bold by design.</p>
              <span className="ml-auto mt-1.5 block h-[3px] w-8 rounded-full bg-brand" aria-hidden />
            </div>
          </div>

          <div className="relative z-10 mt-5 max-w-[12rem] sm:max-w-[13rem]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">Explore the next</p>
            <h3 className="mt-1.5 text-2xl font-bold uppercase tracking-tight sm:text-3xl">{SAMSUNG_GROUP.label}</h3>
            <p className="mt-1.5 text-sm text-white/60">{SAMSUNG_GROUP.description}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/25 px-4 py-1.5 text-xs font-medium transition group-hover:border-white/50">
              Explore {SAMSUNG_GROUP.label}
              <ArrowRight className="size-3.5 transition group-hover:translate-x-1" />
            </span>
          </div>

          <div className="relative z-10 mt-4 aspect-[693/357] w-full sm:hidden">
            <Image
              src="/hero/samsung-ecosystem-collage-cutout.png"
              alt=""
              fill
              sizes="90vw"
              className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)]"
            />
          </div>

          <div className="relative z-10 mt-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-white/10 pt-4">
            {SAMSUNG_GROUP.links.map((link) => (
              <span key={link.href} className="text-xs text-white/55">
                {link.label}
              </span>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-[4%] hidden w-[48%] items-center sm:flex">
            <div className="relative aspect-[693/357] w-full">
              <Image
                src="/hero/samsung-ecosystem-collage-cutout.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 28vw, 45vw"
                className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </Link>
      </div>

      <div className="mx-auto mt-6 flex max-w-7xl items-center gap-4">
        <span className="hidden h-px flex-1 bg-ink/10 sm:block" aria-hidden />
        <p className="min-w-0 flex-1 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40 sm:flex-none sm:text-[11px] sm:tracking-[0.3em]">
          Two Ecosystems. One Store.
        </p>
        <span className="hidden h-px flex-1 bg-ink/10 sm:block" aria-hidden />
      </div>
    </section>
  );
}
