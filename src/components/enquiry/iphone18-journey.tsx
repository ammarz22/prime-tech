import { SectionHeading } from "@/components/common/section-heading";
import { AnimatedSection } from "@/components/motion/animated-section";

const STEPS = [
  { n: "01", title: "Explore", description: "Browse the iPhone 18 lineup as models are confirmed." },
  { n: "02", title: "Select", description: "Choose the model, colour, storage or package that suits you." },
  { n: "03", title: "Enquire", description: "Message Prime Tech on WhatsApp — takes seconds, no form." },
  { n: "04", title: "Confirm", description: "A real person confirms pricing, stock and pre-order details with you." },
  { n: "05", title: "Receive", description: "Delivery or collection is arranged directly with you, once the product is available." },
] as const;

/** The pre-order journey, replacing a plain numbered list — five honest
 * steps matching Prime Tech's real WhatsApp-enquiry model, no checkout. */
export function Iphone18Journey() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <AnimatedSection>
        <SectionHeading eyebrow="How It Works" title="The Pre-Order Journey" align="center" className="mx-auto" />
      </AnimatedSection>

      <div className="relative mt-14">
        <div
          className="absolute left-5 top-5 bottom-5 w-px bg-gradient-to-b from-brand/40 via-brand-cyan/40 to-transparent sm:left-0 sm:right-0 sm:top-5 sm:h-px sm:w-auto sm:bg-gradient-to-r"
          aria-hidden
        />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-5 sm:gap-4">
          {STEPS.map((step) => (
            <div key={step.n} className="relative flex gap-4 sm:flex-col sm:gap-3 sm:text-center">
              <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-brand/30 bg-paper text-sm font-semibold text-brand sm:mx-auto">
                {step.n}
              </div>
              <div>
                <p className="font-medium text-ink">{step.title}</p>
                <p className="mt-0.5 text-sm text-ink/55">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
