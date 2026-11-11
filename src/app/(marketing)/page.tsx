import { cookies } from "next/headers";
import { BrandIntro } from "@/components/home/brand-intro";
import { HomeReveal } from "@/components/home/home-reveal";
import { HeroTeaser } from "@/components/home/hero-teaser";
import { CategoryDiscovery } from "@/components/home/category-discovery";
import { TrustStrip } from "@/components/home/trust-strip";
import { FeaturedProducts } from "@/components/home/featured-products";
import { IphoneEighteenCampaign } from "@/components/home/iphone-18-campaign";
import { WhyPrimeTech } from "@/components/home/why-prime-tech";
import { HelpMeChooseCta } from "@/components/home/help-me-choose-cta";
import { FromPrimeTech } from "@/components/home/from-prime-tech";
import { getProducts } from "@/lib/db/products";
import { INTRO_COOKIE } from "@/lib/intro-session";

export default async function HomePage() {
  // The opening animation is for the first screen of a session only — not when
  // someone clicks the logo to come back to the homepage.
  const playIntro = !(await cookies()).has(INTRO_COOKIE);
  const [appleFeatured, samsungFeatured] = await Promise.all([
    getProducts({ productGroup: "APPLE", featured: true, sort: "featured", limit: 16 }),
    getProducts({ productGroup: "OTHER", featured: true, sort: "featured", limit: 16 }),
  ]);

  // A curated mix across both ecosystems — but only products that are
  // actually ready to show off (real photo, real price). Several "featured"
  // items are pre-announcement (iPhone 18 lineup, unreleased wearables)
  // with no photo yet and "price on request"; those stay featured on their
  // own pages, just not leading the homepage showcase where they'd read as
  // unfinished next to fully-priced, photographed products.
  const isShowcaseReady = (p: (typeof appleFeatured)[number]) =>
    p.images.some((img) => img.is_primary) && p.price_label !== "on_request";
  const featuredProducts = [
    ...appleFeatured.filter(isShowcaseReady).slice(0, 5),
    ...samsungFeatured.filter(isShowcaseReady).slice(0, 3),
  ];

  return (
    <>
      {playIntro && <BrandIntro />}
      <HomeReveal playIntro={playIntro}>
        <HeroTeaser />
        <TrustStrip />
        <CategoryDiscovery />
        <FeaturedProducts products={featuredProducts} />
        <IphoneEighteenCampaign />
        <HelpMeChooseCta />
        <WhyPrimeTech />
        <FromPrimeTech />
      </HomeReveal>
    </>
  );
}
