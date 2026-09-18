import { ShieldCheck, Compass, MessagesSquare, Truck } from "lucide-react";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/motion/animated-section";

const REASONS = [
  {
    icon: Compass,
    title: "Guided Discovery",
    description: "Compare. Understand. Choose confidently.",
  },
  {
    icon: ShieldCheck,
    title: "Genuine Products",
    description: "From brands you already trust.",
  },
  {
    icon: MessagesSquare,
    title: "Real Conversations",
    description: "Talk directly with our team when you need help.",
  },
  {
    icon: Truck,
    title: "Islandwide Delivery",
    description: "Get your technology delivered across Sri Lanka.",
  },
];

/** A compact 30/70 title-vs-items split, matching the reference's dense
 * proportions rather than a tall stacked heading over a full-width grid. */
export function WhyPrimeTech() {
  return (
    <section className="border-t border-ink/8 bg-paper px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[30%_1fr]">
        <AnimatedSection>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Why Prime Tech</p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">
            Technology,
            <br />
            made easier to choose.
          </h2>
          <p className="mt-3 max-w-xs text-sm text-ink/55">
            We&apos;re here to help you find the right device, with the right support.
          </p>
        </AnimatedSection>

        <StaggerGroup className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {REASONS.map((reason) => (
            <StaggerItem key={reason.title}>
              <reason.icon className="size-6 text-brand" strokeWidth={1.5} />
              <p className="mt-3 text-base font-medium text-ink">{reason.title}</p>
              <p className="mt-1 text-sm leading-snug text-ink/55">{reason.description}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
