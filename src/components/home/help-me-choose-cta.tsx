import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Headset, MessageCircle, Scale, ShieldCheck } from "lucide-react";
import { StaggerGroup, StaggerItem } from "@/components/motion/animated-section";

const HELP_FEATURES = [
  { icon: ShieldCheck, label: "Personalized Recommendations" },
  { icon: MessageCircle, label: "Expert Guidance" },
  { icon: Headset, label: "Latest Models & Best Prices" },
] as const;

/** Two real, working feature entry points side by side — "Help Me Choose"
 * (the existing guided-discovery wizard) and product comparison (the
 * existing `/products/compare` tool). No "latest offers" panel: Prime Tech
 * has no discount/promo system to point to, so that reference panel is
 * replaced with a real feature rather than invented content. Both product
 * shots are real catalogue photography re-exported with a transparent
 * background (flood-filled from the image edges, never redrawn) so they
 * sit directly on each card rather than in a boxed thumbnail. Each image
 * is confined to its own inset zone below/clear of the header text (never
 * height-centered across the full card) so it can't drift into the copy. */
export function HelpMeChooseCta() {
  return (
    <section className="bg-paper px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <StaggerGroup className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <StaggerItem>
            <Link
              href="/help-me-choose"
              className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl bg-ink p-6 text-white sm:min-h-[340px] sm:p-8"
            >
              <div
                className="pointer-events-none absolute -left-16 -top-20 size-72 rounded-full opacity-40 blur-[100px]"
                style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-24 right-0 size-64 rounded-full opacity-30 blur-[100px]"
                style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }}
                aria-hidden
              />

              <div className="relative z-10 max-w-[15rem] sm:max-w-[17rem]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50">
                  Need Help Choosing?
                </p>
                <span className="mt-2 block h-[3px] w-9 rounded-full bg-brand" aria-hidden />
                <h3 className="mt-3 text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                  Not sure what you need?
                </h3>
                <p className="mt-2.5 text-sm text-white/60">
                  Answer a few quick questions and we&apos;ll recommend the right device for you.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition group-hover:bg-brand/85">
                  Find My Device
                  <ArrowRight className="size-4" />
                </span>
              </div>

              <div className="relative z-10 mt-5 h-40 w-full sm:hidden">
                <Image
                  src="/iphone-18/iphone-18-pro-max-burgundy-hero-cutout.png"
                  alt=""
                  fill
                  sizes="90vw"
                  className="object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.5)]"
                />
              </div>

              <div className="relative z-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-4">
                {HELP_FEATURES.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <Icon className="size-3.5 shrink-0 text-brand" strokeWidth={1.5} />
                    <p className="text-xs text-white/60">{label}</p>
                  </div>
                ))}
              </div>

              <div className="pointer-events-none absolute bottom-[4.5rem] right-2 top-6 hidden w-[30%] items-center opacity-95 sm:right-4 sm:top-8 sm:flex">
                <Image
                  src="/iphone-18/iphone-18-pro-max-burgundy-hero-cutout.png"
                  alt=""
                  fill
                  sizes="260px"
                  className="object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.5)]"
                />
              </div>
            </Link>
          </StaggerItem>

          <StaggerItem>
            <Link
              href="/products/compare"
              className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl border border-ink/8 bg-paper-soft p-6 transition hover:border-ink/15 sm:min-h-[340px] sm:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full border border-ink/8"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-6 top-1/3 size-40 rounded-full border border-ink/8"
              />

              <div className="relative z-10 max-w-[15rem] sm:max-w-[17rem]">
                <div className="mb-3 flex size-11 items-center justify-center rounded-2xl bg-brand/10">
                  <Scale className="size-5 text-brand" strokeWidth={1.5} />
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/45">
                  Make The Right Choice
                </p>
                <h3 className="mt-2 text-balance text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Comparing <span className="text-brand">options?</span>
                </h3>
                <p className="mt-2.5 text-sm text-ink/55">
                  We help you compare features, prices and find the best fit.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-5 py-2.5 text-sm font-medium text-ink shadow-sm transition group-hover:border-ink/30">
                  Compare Products
                  <ArrowRight className="size-4" />
                </span>
              </div>

              <div className="relative z-10 mt-5 flex h-40 items-end justify-center gap-3 sm:hidden">
                <div className="relative h-[85%] w-1/3">
                  <Image
                    src="/hero/iphone-17-pro-cutout.png"
                    alt=""
                    fill
                    sizes="120px"
                    className="object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)]"
                  />
                </div>
                <div className="relative h-full w-1/3">
                  <Image
                    src="/products/galaxy-s26/colors/black-cutout.png"
                    alt=""
                    fill
                    sizes="120px"
                    className="object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)]"
                  />
                </div>
              </div>

              <p className="pointer-events-none absolute right-6 top-7 hidden -rotate-2 text-right font-hand text-2xl leading-[1.15] text-ink/45 sm:block">
                Different Needs.
                <br />A Better Choice.
              </p>

              <div className="pointer-events-none absolute bottom-8 right-2 top-28 hidden w-[38%] items-end justify-center gap-4 sm:right-4 sm:flex">
                <div className="relative h-full w-1/2">
                  <Image
                    src="/hero/iphone-17-pro-cutout.png"
                    alt=""
                    fill
                    sizes="150px"
                    className="object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)]"
                  />
                </div>
                <div className="relative h-full w-1/2">
                  <Image
                    src="/products/galaxy-s26/colors/black-cutout.png"
                    alt=""
                    fill
                    sizes="150px"
                    className="object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)]"
                  />
                </div>
              </div>
            </Link>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
