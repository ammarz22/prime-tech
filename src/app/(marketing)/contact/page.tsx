import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import { AnimatedSection } from "@/components/motion/animated-section";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { getEffectiveContact } from "@/lib/db/site-settings";
import { getBranches } from "@/lib/db/branches";
import { generalEnquiryMessage } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Prime Tech Colombo.",
};

export default async function ContactPage() {
  const [contact, branches] = await Promise.all([getEffectiveContact(), getBranches()]);

  return (
    <div className="pt-28">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Contact</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Contact Prime Tech
          </h1>
        </AnimatedSection>

        <div className="mt-10 space-y-6">
          <div className="space-y-4 rounded-3xl border border-ink/8 p-6 sm:p-8">
            <WhatsAppButton
              number={contact.whatsappNumber}
              message={generalEnquiryMessage()}
              label="Chat With Prime Tech"
              variant="default"
              size="lg"
              className="h-12 w-full rounded-full text-base"
            />
            <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
              {contact.phone && (
                <a href={`tel:${contact.phone}`} className="flex items-center gap-3 text-sm hover:text-brand">
                  <Phone className="size-4.5 text-ink/40" />
                  {contact.phone}
                </a>
              )}
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-sm hover:text-brand">
                  <Mail className="size-4.5 text-ink/40" />
                  {contact.email}
                </a>
              )}
            </div>
            <div className="flex items-start gap-3 text-sm text-ink/70">
              <MapPin className="mt-0.5 size-4.5 shrink-0 text-ink/40" />
              <span>{contact.address ?? "Colombo, Sri Lanka"}</span>
            </div>
          </div>

          {branches.length > 0 && (
            <div className="rounded-3xl border border-ink/8 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-ink/45">Branches</p>
              <ul className="mt-3 space-y-2">
                {branches.map((branch) => (
                  <li key={branch.id} className="text-sm text-ink/65">
                    {branch.name}
                    {branch.city && <span className="text-ink/40"> — {branch.city}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
