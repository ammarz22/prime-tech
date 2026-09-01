import { HeroTeaser } from "@/components/home/hero-teaser";
import { CategoryDiscovery } from "@/components/home/category-discovery";
import { ProductShowcase } from "@/components/home/product-showcase";
import { RecentlyViewedSection } from "@/components/home/recently-viewed-section";
import { IphoneEighteenCampaign } from "@/components/home/iphone-18-campaign";
import { WhyPrimeTech } from "@/components/home/why-prime-tech";
import { HelpMeChooseCta } from "@/components/home/help-me-choose-cta";
import { getProducts } from "@/lib/db/products";

export default async function HomePage() {
  const [appleFeatured, samsungFeatured] = await Promise.all([
    getProducts({ productGroup: "APPLE", featured: true, sort: "featured", limit: 5 }),
    getProducts({ productGroup: "OTHER", featured: true, sort: "featured", limit: 3 }),
  ]);

  // A curated mix across both ecosystems, not a wall of products.
  const featuredProducts = [...appleFeatured, ...samsungFeatured].slice(0, 8);

  return (
    <>
      <HeroTeaser />
      <CategoryDiscovery />
      <ProductShowcase
        eyebrow="Featured Products"
        title="Featured Products"
        description="A curated selection from across the Prime Tech catalogue."
        products={featuredProducts}
        viewAllHref="/products"
        emptyMessage="Featured products are being curated — check back soon."
      />
      <IphoneEighteenCampaign />
      <WhyPrimeTech />
      <HelpMeChooseCta />
      <RecentlyViewedSection />
    </>
  );
}
