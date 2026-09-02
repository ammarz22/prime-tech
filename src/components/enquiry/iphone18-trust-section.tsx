import { ShieldCheck, MessageCircleHeart, Eye, Store } from "lucide-react";
import { AnimatedSection } from "@/components/motion/animated-section";

const POINTS = [
  { icon: ShieldCheck, title: "No Payment Required", description: "Registering interest is free and non-binding." },
  { icon: MessageCircleHeart, title: "A Real Person, Not a Bot", description: "Every WhatsApp chat is answered by Prime Tech staff." },
  { icon: Eye, title: "Transparent About What's Confirmed", description: "We never present a rumour as a fact." },
  { icon: Store, title: "A Genuine Colombo Retailer", description: "Delivery and collection details are arranged directly with you on WhatsApp." },
] as const;

export function Iphone18TrustSection() {
  return (
    <div className="border-t border-ink/8 bg-paper py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {POINTS.map((point) => (
              <div key={point.title} className="flex flex-col items-start gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <point.icon className="size-5" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-medium text-ink">{point.title}</p>
                  <p className="mt-0.5 text-sm text-ink/55">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
