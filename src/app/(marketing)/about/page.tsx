import type { Metadata } from "next";
import { Target, Eye } from "lucide-react";
import { AnimatedSection } from "@/components/motion/animated-section";

export const metadata: Metadata = {
  title: "About",
  description: "Prime Tech is a technology-focused business based in Colombo, Sri Lanka, helping customers discover reliable technology products and solutions.",
};

export default function AboutPage() {
  return (
    <div className="pt-28">
      {/* A calmer, light editorial treatment — deliberately distinct from
          the dark hero-banner used on Home/Apple/iPhone 18, since About is
          a human/trust story rather than a sales moment. */}
      <section className="bg-paper py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <AnimatedSection>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-brand">About Prime Tech</p>
            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
              Technology, people and trust — in that order matters less than getting all three right.
            </h1>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-paper-soft py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <AnimatedSection>
            <p className="text-balance text-lg leading-relaxed text-ink/70">
              Prime Tech is a technology-focused business based in Colombo, Sri Lanka, helping
              customers discover reliable technology products and solutions. We believe choosing
              technology shouldn&apos;t be overwhelming — so we focus on guiding customers toward
              the right device, rather than simply listing everything we sell.
            </p>
          </AnimatedSection>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <AnimatedSection className="rounded-3xl border border-ink/8 p-7">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-brand/10">
                <Target className="size-5 text-brand" strokeWidth={1.5} />
              </div>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-ink/45">Mission</p>
              <p className="mt-2 text-lg font-medium text-ink">
                To make technology easier to understand, easier to access and easier to use.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.1} className="rounded-3xl border border-ink/8 p-7">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-brand/10">
                <Eye className="size-5 text-brand" strokeWidth={1.5} />
              </div>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-ink/45">Vision</p>
              <p className="mt-2 text-lg font-medium text-ink">
                To become a trusted technology destination for customers and businesses across Sri Lanka.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
