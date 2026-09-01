import Link from "next/link";
import { Plus, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/empty-state";
import { getBrands } from "@/lib/db/products";

export default async function AdminBrandsPage() {
  const brands = await getBrands();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Brands</h1>
          <p className="mt-1 text-sm text-ink/55">Manage the brands Prime Tech carries.</p>
        </div>
        <Button render={<Link href="/admin/brands/new" />} className="gap-2">
          <Plus className="size-4" />
          New Brand
        </Button>
      </div>

      <div className="mt-8">
        {brands.length === 0 ? (
          <EmptyState icon={Tag} title="No brands yet." description="Add your first brand." />
        ) : (
          <div className="divide-y divide-ink/6 rounded-2xl border border-ink/8 bg-paper">
            {brands.map((b) => (
              <div key={b.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">{b.name}</p>
                  <p className="text-xs text-ink/45">{b.slug}</p>
                </div>
                <Link href={`/admin/brands/${b.id}`} className="text-sm font-medium text-brand hover:underline">
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
