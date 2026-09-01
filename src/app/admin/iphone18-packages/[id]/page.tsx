import { notFound } from "next/navigation";
import { Iphone18PackageForm } from "@/components/admin/iphone18-package-form";
import { createClient } from "@/lib/supabase/server";
import type { Package } from "@/types/database";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditIphone18PackagePage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("iphone18_packages").select("*").eq("id", id).maybeSingle();
  const pkg = data as Package | null;
  if (!pkg) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Edit Package</h1>
      <div className="mt-8">
        <Iphone18PackageForm
          packageId={pkg.id}
          imageUrl={pkg.image_url}
          defaultValues={{
            name: pkg.name,
            tier: pkg.tier ?? "",
            description: pkg.description ?? "",
            includedItems: pkg.included_items.join(", "),
            price: pkg.price ?? undefined,
            benefit: pkg.benefit ?? "",
            availability: pkg.availability,
            isFeatured: pkg.is_featured,
            sortOrder: pkg.sort_order,
          }}
        />
      </div>
    </div>
  );
}
