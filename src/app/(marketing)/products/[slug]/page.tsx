import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/product-detail";
import { getProductBySlug, getRelatedProducts } from "@/lib/db/products";
import { getBranches } from "@/lib/db/branches";
import { getEffectiveContact } from "@/lib/db/site-settings";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.short_description ?? product.description ?? undefined,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product || product.product_group !== "OTHER") notFound();

  const [related, branches, contact] = await Promise.all([
    getRelatedProducts(product),
    getBranches(),
    getEffectiveContact(),
  ]);

  return (
    <ProductDetail
      product={product}
      related={related}
      branches={branches}
      whatsappNumber={contact.whatsappNumber}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
      ]}
    />
  );
}
