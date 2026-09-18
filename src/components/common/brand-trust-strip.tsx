import { ShieldCheck, Truck, MessageCircle, Gift } from "lucide-react";

const ITEMS = [
  { icon: ShieldCheck, label: "100% Genuine Products", description: "Official stock. Zero compromises." },
  { icon: Truck, label: "Islandwide Delivery", description: "Fast and reliable." },
  { icon: MessageCircle, label: "Expert Guidance", description: "Get help on WhatsApp." },
  { icon: Gift, label: "A Better Tech Experience", description: "Curated. Personal. Reliable." },
] as const;

/** Shared trust strip used at the end of both the Apple and Samsung
 * landing pages — same real claims either way, not brand-specific. */
export function BrandTrustStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10 xl:px-16">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {ITEMS.map(({ icon: Icon, label, description }) => (
          <li key={label} className="flex flex-col items-center gap-2 rounded-2xl px-3 py-6 text-center">
            <Icon className="size-5 text-ink/70" strokeWidth={1.5} />
            <p className="text-sm font-semibold text-ink">{label}</p>
            <p className="text-xs text-ink/50">{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
