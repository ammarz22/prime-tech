import type { Metadata } from "next";
import { CataloguePage } from "@/components/catalogue/catalogue-page";
import { SAMSUNG_CATALOGUE_CATEGORIES } from "@/lib/config/samsung-catalogue";

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return SAMSUNG_CATALOGUE_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = SAMSUNG_CATALOGUE_CATEGORIES.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: { absolute: `${category.label} | Samsung | Prime Tech` },
    description: category.heroDescription,
  };
}

export default async function SamsungCategoryPage({ params }: PageProps) {
  const { category } = await params;
  return (
    <CataloguePage
      categories={SAMSUNG_CATALOGUE_CATEGORIES}
      activeSlug={category}
      productGroup="OTHER"
      brandLabel="Samsung"
      brandHref="/products/samsung"
      basePath="/products/samsung"
    />
  );
}
