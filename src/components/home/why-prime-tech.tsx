import { ShieldCheck, Compass, MessagesSquare, MapPinned } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/motion/animated-section";

const REASONS = [
  {
    icon: Compass,
    title: "Guided discovery",
    description: "We help you compare and understand devices before you decide — not just list specs.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted brands",
    description: "Genuine products from brands you already know, sourced with care.",
  },
  {
    icon: MessagesSquare,
    title: "Real conversations",
    description: "Enquire directly and talk to a person over WhatsApp — no automated checkout maze.",
  },
  {
    icon: MapPinned,
    title: "Local, in Colombo",
    description: "A Sri Lankan technology destination, with branches you can actually visit.",
  },
];

export function WhyPrimeTech() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading eyebrow="Why Prime Tech" title="Technology, made easier to choose." align="center" className="mx-auto" />
        </AnimatedSection>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason) => (
            <StaggerItem key={reason.title} className="text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-brand/10">
                <reason.icon className="size-5 text-brand" strokeWidth={1.5} />
              </div>
              <p className="mt-4 font-medium text-ink">{reason.title}</p>
              <p className="mt-1.5 text-sm text-ink/55">{reason.description}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
