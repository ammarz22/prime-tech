import { MessageCircle, ShieldCheck, Headset, Truck } from "lucide-react";
import { AnimatedSection } from "@/components/motion/animated-section";

const ITEMS = [
  { icon: Truck, label: "Islandwide Delivery", description: "Across Sri Lanka." },
  { icon: ShieldCheck, label: "Genuine Products", description: "Official products. Zero compromise." },
  { icon: Headset, label: "Expert Support", description: "Get the right advice." },
  { icon: MessageCircle, label: "WhatsApp Ordering", description: "Quick. Easy. Personal." },
] as const;

/** A thin, compact strip — matches the reference's dense proportions (a
 * short bar with vertical dividers between items) rather than a spacious
 * padded section. */
export function TrustStrip() {
  return (
    <section className="border-b border-ink/8 bg-paper-soft">
      <AnimatedSection className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 divide-ink/10 py-5 sm:grid-cols-4 sm:divide-x sm:py-0">
          {ITEMS.map(({ icon: Icon, label, description }) => (
            <li key={label} className="flex items-center justify-center gap-3 px-3 py-4 text-center sm:py-7">
              <Icon className="size-5 shrink-0 text-brand" strokeWidth={1.5} />
              <div className="text-left">
                <p className="text-sm font-semibold text-ink">{label}</p>
                <p className="mt-0.5 text-xs text-ink/50">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </AnimatedSection>
    </section>
  );
}
