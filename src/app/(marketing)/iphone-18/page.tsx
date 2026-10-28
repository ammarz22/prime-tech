import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { SectionHeading } from "@/components/common/section-heading";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
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

export async function generateMetadata(): Promise<Metadata> {
  const stage = await getCampaignStage();
  return {
    title: { absolute: "iPhone 18 Series | Prime Tech" },
    description:
      stage === "available"
        ? "The iPhone 18 Series is now available at Prime Tech Colombo — enquire on WhatsApp for real Sri Lankan pricing and stock."
        : "The iPhone 18 Series, announced by Apple on September 9, 2026 — register your interest with Prime Tech Colombo and pre-order with no payment required.",
  };
}

const FAQS = [
  {
    q: "Is the iPhone 18 Series available now?",
    a: "Yes. Apple announced the lineup on September 9, 2026 and the iPhone 18 Pro, iPhone 18 Pro Max and iPhone Duo are now on sale. Stock for each model, colour and storage is confirmed with you on WhatsApp.",
  },
  {
    q: "Can I ask about a specific model, colour or storage?",
    a: "Yes — just mention what you're interested in when you message us on WhatsApp.",
  },
  {
    q: "Do I have to pay to enquire?",
    a: "No. Messaging Prime Tech on WhatsApp is free and non-binding — we'll confirm real Sri Lankan pricing and availability before you commit to anything.",
  },
  {
    q: "Does enquiring reserve stock for me?",
    a: "Not on its own. Stock is held for you once you and Prime Tech agree on the details over WhatsApp.",
  },
  {
    q: "Will Prime Tech's price match Apple's global price?",
    a: "No — Sri Lankan retail pricing reflects import costs and differs from Apple's global launch price. We'll confirm your local price directly on WhatsApp rather than publish an estimate that could mislead you.",
  },
  {
    q: "Are there bundles or packages?",
    a: "Device bundles (accessories, benefits) appear on this page when Prime Tech has them listed. If none are shown, ask us on WhatsApp.",
  },
  {
    q: "Is a deposit required to order?",
    a: "Any payment terms are agreed directly with you on WhatsApp once pricing is confirmed.",
  },
];

const HERO_COPY: Record<CampaignStage, { eyebrow: string; ctaLabel: string }> = {
  announcement: { eyebrow: "Pre-Order · Chat With Us", ctaLabel: "Chat About Pre-Order" },
  preorder_open: { eyebrow: "Pre-Orders Open", ctaLabel: "Chat About Pre-Order" },
  available: { eyebrow: "Now Available", ctaLabel: "View the Lineup" },
};

const FAQ_HEADING: Record<CampaignStage, string> = {
  announcement: "Pre-Order Questions",
  preorder_open: "Pre-Order Questions",
  available: "iPhone 18 Questions",
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
  const available = stage === "available";
  const ctaHref = scrollToLineup
    ? "#lineup"
    : (whatsappLink(
        preorderEnquiryMessage({
          ...(modelNames && modelNames.length > 0 ? { model: modelNames.join(", ") } : {}),
          available,
        }),
        contact.whatsappNumber,
      ) ?? "#");

  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-10 pt-28 text-white sm:pb-14 sm:pt-36 lg:pb-12 lg:pt-32">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.15] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black,transparent)]" />
        <div
          className="pointer-events-none absolute left-1/2 top-0 size-[50vw] max-w-[700px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
          style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }}
          aria-hidden
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-x-4 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:px-10 xl:px-16">
          <AnimatedSection className="mx-auto max-w-4xl text-center lg:mx-0 lg:max-w-none lg:text-left">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-brand-cyan">{hero.eyebrow}</p>
            <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-7xl lg:text-6xl xl:text-7xl">
              iPhone 18 Series
            </h1>
            {/* A plain anchor, not next/link — this either scrolls to an
                in-page target (Link doesn't reliably do that on click) or
                opens WhatsApp directly, neither of which is a route change. */}
            <Button
              render={<a href={ctaHref} {...(!scrollToLineup && { target: "_blank", rel: "noopener noreferrer" })} />}
              size="lg"
              className="mt-8 h-12 gap-2 rounded-full px-7 text-base"
            >
              {hero.ctaLabel}
              <ArrowRight className="size-4" />
            </Button>
          </AnimatedSection>

          {/* Apple's own official iPhone 18 Pro photo (Burgundy), published
              after the September 9, 2026 announcement. Faded at the edges via
              mask-image so its black background blends into the hero instead
              of sitting in a visible box. Hidden below `lg` so it never
              competes with the hero text. */}
          <div className="pointer-events-none relative hidden [mask-image:radial-gradient(ellipse_62%_68%_at_50%_50%,black_40%,transparent_88%)] lg:block">
            <Image
              src="/iphone-18/burgundy-hero.png"
              alt="iPhone 18 Pro in Burgundy"
              width={2048}
              height={1152}
              sizes="(min-width: 1280px) 640px, 50vw"
              className="w-full"
              priority
            />
          </div>
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
            <SectionHeading eyebrow="Wearables & Audio" title="Apple Watch & AirPods" />
          </AnimatedSection>
          <div className="mt-10">
            <ProductGrid products={wearables} />
          </div>
        </div>
      )}

      <Iphone18Journey available={available} />

      <Iphone18OfficialTrailer />

      <Iphone18PreorderInteractive
        whatsappNumber={contact.whatsappNumber}
        models={modelNames}
        packages={packages}
        showPackages={stage !== "announcement"}
        available={available}
      />

      <Iphone18TrustSection />

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <AnimatedSection>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">FAQ</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">{FAQ_HEADING[stage]}</h2>
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
