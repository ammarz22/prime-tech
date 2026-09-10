import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { SectionHeading } from "@/components/common/section-heading";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { CampaignStageNotice } from "@/components/enquiry/campaign-stage-notice";
import { Iphone18Journey } from "@/components/enquiry/iphone18-journey";
import { Iphone18OfficialTrailer } from "@/components/enquiry/iphone18-official-trailer";
import { Iphone18TrustSection } from "@/components/enquiry/iphone18-trust-section";
import { Iphone18PreorderInteractive } from "@/components/enquiry/iphone18-preorder-interactive";
import { ProductGrid } from "@/components/product/product-grid";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { getProducts } from "@/lib/db/products";
import { getCampaignStage, type CampaignStage } from "@/lib/db/site-settings";
import { getEffectiveContact } from "@/lib/db/site-settings";
import { getVisibleIphone18Packages } from "@/lib/db/iphone18-packages";
import { whatsappLink, preorderEnquiryMessage } from "@/lib/config/site";

export const metadata: Metadata = {
  title: { absolute: "iPhone 18 Series | Prime Tech" },
  description:
    "The iPhone 18 Series, announced by Apple on September 9, 2026 — register your interest with Prime Tech Colombo and pre-order with no payment required.",
};

const FAQS = [
  {
    q: "When is the iPhone 18 Series available?",
    a: "Apple announced the lineup on September 9, 2026. Pre-orders for iPhone 18 Pro, iPhone 18 Pro Max, Apple Watch Series 12 and Apple Watch Ultra 4 open September 12, arriving September 18. iPhone Duo pre-orders open October 16, arriving October 23.",
  },
  {
    q: "Can I ask about a specific model, colour or storage?",
    a: "Yes — just mention what you're interested in when you message us on WhatsApp.",
  },
  {
    q: "Is payment required to register interest?",
    a: "No. Messaging Prime Tech on WhatsApp is free and non-binding — we'll confirm real Sri Lankan pricing and availability before you commit to anything.",
  },
  {
    q: "Does registering interest guarantee me stock?",
    a: "It puts you at the front of the conversation once local stock is confirmed, but it isn't a binding reservation until you and Prime Tech agree on the details over WhatsApp.",
  },
  {
    q: "Will Prime Tech's price match Apple's global price?",
    a: "No — Sri Lankan retail pricing reflects import costs and differs from Apple's global launch price. We'll confirm your local price directly on WhatsApp rather than publish an estimate that could mislead you.",
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

const WEARABLE_SLUGS = ["apple-watch-series-12", "apple-watch-ultra-4", "airpods-5"];

export default async function IPhone18PreorderPage() {
  const [stage, products, allApple, packages, contact] = await Promise.all([
    getCampaignStage(),
    getProducts({ categorySlug: "iphone-18", includeComingSoon: true }),
    getProducts({ productGroup: "APPLE", includeComingSoon: true }),
    getVisibleIphone18Packages(),
    getEffectiveContact(),
  ]);
  const wearables = WEARABLE_SLUGS.map((slug) => allApple.find((p) => p.slug === slug)).filter((p) => p != null);

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
        {/* Apple's own official iPhone 18 Pro photo (Burgundy), published
            after the September 9, 2026 announcement. Faded at the edges via
            mask-image so its black background blends into the hero instead
            of sitting in a visible box. Hidden below `lg` so it never
            competes with the hero text, matching the homepage hero's
            pattern. */}
        <div className="pointer-events-none absolute -right-10 top-1/2 hidden w-[560px] -translate-y-1/2 [mask-image:radial-gradient(ellipse_65%_65%_at_50%_50%,black_45%,transparent_85%)] lg:block xl:right-4 xl:w-[680px]">
          <Image
            src="/iphone-18/burgundy-hero.png"
            alt="iPhone 18 Pro in Burgundy"
            width={2048}
            height={1152}
            sizes="680px"
            className="w-full"
            priority
          />
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
                  Confirmed by Apple
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

      {wearables.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading eyebrow="Wearables & Audio" title="Also Announced September 9" />
          </AnimatedSection>
          <div className="mt-10">
            <ProductGrid products={wearables} />
          </div>
        </div>
      )}

      <Iphone18Journey />

      <Iphone18OfficialTrailer />

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
