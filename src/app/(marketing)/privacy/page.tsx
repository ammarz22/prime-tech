import type { Metadata } from "next";
import { AnimatedSection } from "@/components/motion/animated-section";
import { getEffectiveContact } from "@/lib/db/site-settings";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Prime Tech collects, uses and protects your information.",
};

const SECTIONS = [
  {
    heading: "What we collect",
    body: "When you enquire about a product, leave a review, or ask to be notified about stock, we collect what you give us directly — typically your name, email address, phone number, and the message or review you write. We don't ask for or store passwords, payment details, or ID/verification documents; there's no customer account system on this site.",
  },
  {
    heading: "How we use it",
    body: "We use your details to respond to your enquiry (by WhatsApp, phone, or email), to display reviews you choose to submit publicly (after we review them), and to notify you if a product you asked about comes back in stock. We don't sell, rent, or share your information with third parties for marketing.",
  },
  {
    heading: "What's stored only on your device",
    body: "Products you save (❤️) and recently viewed items are stored in your browser's local storage, on your device only — we never receive or see this information, and clearing your browser data clears it.",
  },
  {
    heading: "Where your data lives",
    body: "Enquiry and review details you submit are stored securely with Supabase, our database provider, protected by access controls that restrict who can view them. WhatsApp conversations are handled directly through WhatsApp/Meta, under their own privacy terms.",
  },
  {
    heading: "How long we keep it",
    body: "We keep enquiry and review information for as long as reasonably needed to assist you and maintain our records. You can ask us to delete your information at any time — see contact details below.",
  },
  {
    heading: "Your rights",
    body: "You can ask us what information we hold about you, request a correction, or ask us to delete it. Reach out using the contact details below and we'll action it promptly.",
  },
];

export default async function PrivacyPage() {
  const contact = await getEffectiveContact();

  return (
    <div className="pt-28">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <AnimatedSection>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Privacy Policy</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Your privacy
          </h1>
          <p className="mt-3 text-ink/60">
            Prime Tech is an enquiry-based business — there's no online checkout or customer
            account system, so we collect far less than a typical online store. Here's exactly
            what we do collect and why.
          </p>
        </AnimatedSection>

        <div className="mt-10 space-y-8">
          {SECTIONS.map((section) => (
            <AnimatedSection key={section.heading}>
              <h2 className="text-lg font-semibold text-ink">{section.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{section.body}</p>
            </AnimatedSection>
          ))}

          <AnimatedSection className="rounded-3xl border border-ink/8 bg-paper-soft p-6">
            <h2 className="text-lg font-semibold text-ink">Questions about your data?</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              Contact us and we'll help directly.
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-ink/70">
              {contact.email && <li>Email: {contact.email}</li>}
              {contact.phone && <li>Phone: {contact.phone}</li>}
            </ul>
          </AnimatedSection>

          <p className="text-xs text-ink/40">Last updated: September 2026.</p>
        </div>
      </div>
    </div>
  );
}
