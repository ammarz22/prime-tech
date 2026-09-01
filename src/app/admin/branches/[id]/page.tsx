import { notFound } from "next/navigation";
import { BranchForm } from "@/components/admin/branch-form";
import { createClient } from "@/lib/supabase/server";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBranchPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: branch } = await supabase.from("branches").select("*").eq("id", id).maybeSingle();
  if (!branch) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Edit Branch</h1>
      <div className="mt-8">
        <BranchForm
          branchId={branch.id}
          defaultValues={{
            name: branch.name,
            slug: branch.slug,
            address: branch.address ?? "",
            city: branch.city ?? "",
            phone: branch.phone ?? "",
            whatsapp: branch.whatsapp ?? "",
            mapsUrl: branch.maps_url ?? "",
            status: branch.status,
          }}
        />
      </div>
    </div>
  );
}
