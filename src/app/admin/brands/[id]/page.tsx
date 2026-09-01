import { notFound } from "next/navigation";
import { BrandForm } from "@/components/admin/brand-form";
import { createClient } from "@/lib/supabase/server";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBrandPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: brand } = await supabase.from("brands").select("*").eq("id", id).maybeSingle();
  if (!brand) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Edit Brand</h1>
      <div className="mt-8">
        <BrandForm
          brandId={brand.id}
          defaultValues={{
            name: brand.name,
            slug: brand.slug,
            logoUrl: brand.logo_url ?? "",
          }}
        />
      </div>
    </div>
  );
}
