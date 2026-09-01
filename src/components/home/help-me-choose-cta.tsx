import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/motion/animated-section";

export function HelpMeChooseCta() {
  return (
    <section className="bg-paper-soft py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="relative overflow-hidden rounded-[2rem] border border-ink/8 bg-paper p-10 text-center sm:p-16">
          <div
            className="pointer-events-none absolute left-1/2 top-0 size-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.12] blur-[90px]"
            style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }}
            aria-hidden
          />
          <div className="relative mx-auto flex size-12 items-center justify-center rounded-2xl bg-brand/10">
            <Sparkles className="size-5 text-brand" strokeWidth={1.5} />
          </div>
          <h2 className="relative mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Not Sure What You Need?
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-balance text-ink/60">
            Answer two quick questions and we&apos;ll point you toward the right device.
          </p>
          <Button
            render={<Link href="/help-me-choose" />}
            size="lg"
            className="relative mt-8 h-12 gap-2 rounded-full px-7 text-base"
          >
            Help Me Choose
            <ArrowRight className="size-4" />
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
