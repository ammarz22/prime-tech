import type { Metadata } from "next";
import { ArrowRight, Smartphone } from "lucide-react";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { SectionHeading } from "@/components/common/section-heading";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Button } from "@/components/ui/button";
import { HudGlassTile } from "@/components/common/hud-glass-tile";
import { ProductCard } from "@/components/product/product-card";
import { CampaignStageNotice } from "@/components/enquiry/campaign-stage-notice";
import { Iphone18Journey } from "@/components/enquiry/iphone18-journey";
import { Iphone18ConceptTrailer } from "@/components/enquiry/iphone18-concept-trailer";
import { Iphone18TrustSection } from "@/components/enquiry/iphone18-trust-section";
import { Iphone18PreorderInteractive } from "@/components/enquiry/iphone18-preorder-interactive";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { getProducts } from "@/lib/db/products";
import { getCampaignStage, type CampaignStage } from "@/lib/db/site-settings";
import { getEffectiveContact } from "@/lib/db/site-settings";
import { getVisibleIphone18Packages } from "@/lib/db/iphone18-packages";
import { whatsappLink, preorderEnquiryMessage } from "@/lib/config/site";

export const metadata: Metadata = {
  title: { absolute: "iPhone 18 Series | Prime Tech" },
  description:
    "The iPhone 18 Series at Prime Tech Colombo — register your interest, explore the lineup as it's confirmed, and pre-order with no payment required.",
};

const FAQS = [
  {
    q: "When will the iPhone 18 Series be available?",
    a: "Apple typically announces new iPhones in September. We'll update this page as soon as an official release date is confirmed — we don't publish a date until Apple does.",
  },
  {
    q: "What does \"Coming Soon\" mean on this page?",
    a: "It means the model exists as an expected entry in the lineup, but Apple hasn't confirmed its specifications, pricing or availability yet. We'll update each listing the moment real information is confirmed.",
  },
  {
    q: "Can I ask about a specific model, colour or storage?",
    a: "Yes — just mention what you're interested in when you message us on WhatsApp. Nothing is confirmed until Apple's official specs are announced.",
  },
  {
    q: "Is payment required to register interest?",
    a: "No. Messaging Prime Tech on WhatsApp is free and non-binding — we'll confirm real pricing and availability before you commit to anything.",
  },
  {
    q: "Does registering interest guarantee me stock?",
    a: "It puts you at the front of the conversation once real stock and pricing are confirmed, but it isn't a binding reservation until you and Prime Tech agree on the details over WhatsApp.",
  },
  {
    q: "Will Prime Tech's price match Apple's global price?",
    a: "We'll confirm Sri Lankan retail pricing as soon as it's available. We don't publish a converted or estimated price before then, to avoid misleading you.",
  },
  {
    q: "When will pre-order packages become available?",
    a: "Packages (device bundles, accessories, benefits) are added once Prime Tech finalises real bundle contents — you'll see them appear on this page directly.",
  },
  {
    q: "Is a deposit required to pre-order?",
    a: "No deposit is required to register interest. Any payment terms for an actual order are agreed directly with you on WhatsApp once pricing is confirmed.",
  },
];

const HERO_COPY: Record<CampaignStage, { eyebrow: string; ctaLabel: string }> = {
  announcement: { eyebrow: "Pre-Order · Chat With Us", ctaLabel: "Chat About Pre-Order" },
  preorder_open: { eyebrow: "Pre-Orders Open", ctaLabel: "Chat About Pre-Order" },
  available: { eyebrow: "Now Available", ctaLabel: "View the Lineup" },
};

export default async function IPhone18PreorderPage() {
  const [stage, products, packages, contact] = await Promise.all([
    getCampaignStage(),
    getProducts({ categorySlug: "iphone-18", includeComingSoon: true }),
    getVisibleIphone18Packages(),
    getEffectiveContact(),
  ]);

  const hasLineup = products.length > 0;
  const modelNames = hasLineup ? products.map((p) => p.name) : undefined;
  const hero = HERO_COPY[stage];
  const scrollToLineup = stage === "available" && hasLineup;
  const ctaHref = scrollToLineup
    ? "#lineup"
    : (whatsappLink(preorderEnquiryMessage(modelNames && modelNames.length > 0 ? { model: modelNames.join(", ") } : undefined), contact.whatsappNumber) ?? "#");

  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-16 pt-32 text-white sm:pt-40">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.15] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black,transparent)]" />
        <div
          className="pointer-events-none absolute left-1/2 top-0 size-[50vw] max-w-[700px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
          style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }}
          aria-hidden
        />
        {/* Abstract HUD panel standing in for a device photo we don't have
            yet — deliberately not a fake render. Hidden below `lg` so it
            never competes with the hero text, matching the homepage hero's
            pattern. */}
        <div className="pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 lg:block xl:right-12">
          <HudGlassTile size={220} floatDuration={5} className="opacity-90">
            <Smartphone className="size-16 text-white/70" strokeWidth={1} />
          </HudGlassTile>
        </div>

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <AnimatedSection>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-brand-cyan">{hero.eyebrow}</p>
            <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-7xl">iPhone 18 Series</h1>
            {/* A plain anchor, not next/link — this either scrolls to an
                in-page target (Link doesn't reliably do that on click) or
                opens WhatsApp directly, neither of which is a route change. */}
            <Button
              render={<a href={ctaHref} {...(!scrollToLineup && { target: "_blank", rel: "noopener noreferrer" })} />}
              size="lg"
              className="mt-9 h-12 gap-2 rounded-full px-7 text-base"
            >
              {hero.ctaLabel}
              <ArrowRight className="size-4" />
            </Button>
            <div className="mt-10">
              <CampaignStageNotice stage={stage} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "iPhone 18 Series" }]} />
      </div>

      {hasLineup ? (
        <div id="lineup" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Explore the Lineup" title="The iPhone 18 Series" />
              <div className="mb-1 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink/50">
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
                  Confirmed by Prime Tech
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-neutral-400" aria-hidden />
                  Pending Apple&apos;s Announcement
                </span>
              </div>
            </div>
          </AnimatedSection>
          <StaggerGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Expected Models</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">The lineup will appear here</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink/55">
              Apple hasn&apos;t made its official announcement yet. As soon as Prime Tech can confirm which models are
              coming, they&apos;ll be listed here — nothing is published as fact before then.
            </p>
          </AnimatedSection>
        </div>
      )}

      <Iphone18Journey />

      <Iphone18ConceptTrailer />

      <Iphone18PreorderInteractive
        whatsappNumber={contact.whatsappNumber}
        models={modelNames}
        packages={packages}
        showPackages={stage !== "announcement"}
      />

      <Iphone18TrustSection />

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <AnimatedSection>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">FAQ</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Pre-Order Questions</h2>
        </AnimatedSection>

        <Accordion className="mt-6" defaultValue={[]}>
          {FAQS.map((faq) => (
            <AccordionItem key={faq.q} value={faq.q}>
              <AccordionTrigger className="text-base">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-ink/60">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
