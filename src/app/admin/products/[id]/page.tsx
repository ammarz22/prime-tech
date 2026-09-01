import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { VariantGenerator } from "@/components/admin/variant-generator";
import { VariantManager } from "@/components/admin/variant-manager";
import { ImageManager } from "@/components/admin/image-manager";
import { Product360Manager } from "@/components/admin/product-360-manager";
import { ProductVideoManager } from "@/components/admin/product-video-manager";
import { createClient } from "@/lib/supabase/server";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: product }, { data: brands }, { data: categories }, { data: variants }, { data: images }, { data: set360 }] =
    await Promise.all([
      supabase.from("products").select("*").eq("id", id).maybeSingle(),
      supabase.from("brands").select("*").order("name"),
      supabase.from("categories").select("*").order("sort_order"),
      supabase.from("product_variants").select("*").eq("product_id", id).order("sort_order"),
      supabase.from("product_images").select("*").eq("product_id", id).order("sort_order"),
      supabase
        .from("product_360_sets")
        .select("id, enabled, product_360_frames(*)")
        .eq("product_id", id)
        .is("variant_id", null)
        .maybeSingle(),
    ]);

  if (!product) notFound();

  const initialSet360 = set360
    ? {
        id: set360.id,
        enabled: set360.enabled,
        frames: [...(set360.product_360_frames ?? [])].sort((a, b) => a.sort_order - b.sort_order),
      }
    : null;

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Edit Product</h1>
      <div className="mt-8 max-w-2xl">
        <ProductForm
          productId={product.id}
          brands={brands ?? []}
          categories={categories ?? []}
          defaultValues={{
            name: product.name,
            slug: product.slug,
            brandId: product.brand_id ?? "",
            categoryId: product.category_id ?? "",
            productGroup: product.product_group,
            shortDescription: product.short_description ?? "",
            description: product.description ?? "",
            status: product.status,
            featured: product.featured,
            newArrival: product.new_arrival,
            basePrice: product.base_price != null ? String(product.base_price) : "",
            priceLabel: product.price_label,
          }}
        />
      </div>

      <div className="mt-10 max-w-4xl space-y-8">
        <VariantGenerator productId={product.id} />
        <VariantManager productId={product.id} variants={variants ?? []} images={images ?? []} />
        <ImageManager productId={product.id} images={images ?? []} variants={variants ?? []} />
        <Product360Manager productId={product.id} initialSet={initialSet360} />
        <ProductVideoManager productId={product.id} videoUrl={product.video_url} posterUrl={product.video_poster_url} />
      </div>
    </div>
  );
}
