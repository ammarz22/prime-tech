import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/common/empty-state";
import { createClient } from "@/lib/supabase/server";
import { Package } from "lucide-react";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("id, name, slug, product_group, status, featured, base_price, price_label, brand:brands(name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
          <p className="mt-1 text-sm text-ink/55">Manage the Prime Tech catalogue.</p>
        </div>
        <Button render={<Link href="/admin/products/new" />} className="gap-2">
          <Plus className="size-4" />
          New Product
        </Button>
      </div>

      <div className="mt-8">
        {!products || products.length === 0 ? (
          <EmptyState icon={Package} title="No products yet." description="Create your first product to get started." />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-ink/8 bg-paper">
            <table className="w-full text-sm">
              <thead className="border-b border-ink/8 bg-paper-soft text-left text-xs uppercase tracking-wide text-ink/45">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Group</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Featured</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/6">
                {products.map((p) => (
                  <tr key={p.id}>
                    <td className="px-4 py-3">
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs text-ink/40">{(p.brand as unknown as { name: string } | null)?.name}</p>
                    </td>
                    <td className="px-4 py-3 text-ink/60">{p.product_group}</td>
                    <td className="px-4 py-3">
                      <Badge variant={p.status === "published" ? "default" : "secondary"}>{p.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-ink/60">{p.featured ? "Yes" : "—"}</td>
                    <td className="px-4 py-3 text-ink/60">
                      {p.price_label === "on_request" || p.price_label === "coming_soon" || !p.base_price
                        ? "—"
                        : `LKR ${p.base_price.toLocaleString()}`}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/products/${p.id}`} className="font-medium text-brand hover:underline">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
