import type { Metadata } from "next";
import { CataloguePage } from "@/components/catalogue/catalogue-page";
import { APPLE_CATALOGUE_CATEGORIES } from "@/lib/config/apple-catalogue";

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return APPLE_CATALOGUE_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = APPLE_CATALOGUE_CATEGORIES.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: { absolute: `${category.label} | Apple | Prime Tech` },
    description: category.heroDescription,
  };
}

export default async function AppleCategoryPage({ params }: PageProps) {
  const { category } = await params;
  return (
    <CataloguePage
      categories={APPLE_CATALOGUE_CATEGORIES}
      activeSlug={category}
      productGroup="APPLE"
      brandLabel="Apple"
      brandHref="/products/apple"
      basePath="/products/apple"
    />
  );
}
