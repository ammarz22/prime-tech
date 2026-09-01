import { notFound } from "next/navigation";
import { CategoryForm } from "@/components/admin/category-form";
import { createClient } from "@/lib/supabase/server";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: category } = await supabase.from("categories").select("*").eq("id", id).maybeSingle();
  if (!category) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Edit Category</h1>
      <div className="mt-8">
        <CategoryForm
          categoryId={category.id}
          defaultValues={{
            name: category.name,
            slug: category.slug,
            sortOrder: category.sort_order,
          }}
        />
      </div>
    </div>
  );
}
