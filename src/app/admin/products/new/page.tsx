import { ProductForm } from "@/components/admin/product-form";
import { createClient } from "@/lib/supabase/server";

export default async function NewProductPage() {
  const supabase = await createClient();
  const [{ data: brands }, { data: categories }] = await Promise.all([
    supabase.from("brands").select("*").order("name"),
    supabase.from("categories").select("*").order("sort_order"),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">New Product</h1>
      <p className="mt-1 text-sm text-ink/55">
        Save the product first, then add variants (storage/colour/price) and images on the next screen.
      </p>
      <div className="mt-8 max-w-2xl">
        <ProductForm brands={brands ?? []} categories={categories ?? []} />
      </div>
    </div>
  );
}
