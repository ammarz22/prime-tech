import { AnimatedSection } from "@/components/motion/animated-section";

/** A quiet brand signature to close the homepage. No Colombo skyline photo
 * exists in the project, so this stays a simple typographic dark band
 * rather than inventing one. Kept short to match the reference's dense
 * proportions rather than a tall closing statement. */
export function ColomboBrandSection() {
  return (
    <section className="relative overflow-hidden bg-ink py-8 text-white">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 size-[30vw] max-w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[100px]"
        style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }}
        aria-hidden
      />
      <AnimatedSection className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-balance text-lg font-semibold tracking-tight sm:text-xl">
          Premium technology. Carefully selected.
        </p>
        <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">Colombo, Sri Lanka</p>
      </AnimatedSection>
    </section>
  );
}
