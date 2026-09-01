import Link from "next/link";
import { Plus, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/empty-state";
import { getCategories } from "@/lib/db/products";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>
          <p className="mt-1 text-sm text-ink/55">Manage product categories across every brand.</p>
        </div>
        <Button render={<Link href="/admin/categories/new" />} className="gap-2">
          <Plus className="size-4" />
          New Category
        </Button>
      </div>

      <div className="mt-8">
        {categories.length === 0 ? (
          <EmptyState icon={LayoutGrid} title="No categories yet." description="Add your first category." />
        ) : (
          <div className="divide-y divide-ink/6 rounded-2xl border border-ink/8 bg-paper">
            {categories.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-ink/45">{c.slug} · sort {c.sort_order}</p>
                </div>
                <Link href={`/admin/categories/${c.id}`} className="text-sm font-medium text-brand hover:underline">
                  Edit
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
