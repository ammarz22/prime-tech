import Link from "next/link";
import { Plus, Boxes } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/empty-state";
import { AvailabilityBadge } from "@/components/product/availability-badge";
import { formatLKR } from "@/components/product/product-price";
import { createClient } from "@/lib/supabase/server";
import type { Package } from "@/types/database";

export default async function AdminIphone18PackagesPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("iphone18_packages").select("*").order("sort_order");
  const packages = (data ?? []) as Package[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">iPhone 18 Packages</h1>
          <p className="mt-1 text-sm text-ink/55">
            Pre-order bundles shown on the iPhone 18 page once the campaign stage is Pre-Order Open or later.
          </p>
        </div>
        <Button render={<Link href="/admin/iphone18-packages/new" />} className="gap-2">
          <Plus className="size-4" />
          New Package
        </Button>
      </div>

      <div className="mt-8">
        {packages.length === 0 ? (
          <EmptyState icon={Boxes} title="No packages yet." description="Add your first pre-order package." />
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-ink/8 bg-paper">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-ink/8 text-xs uppercase tracking-wide text-ink/45">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Tier</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Availability</th>
                  <th className="px-4 py-3 font-medium">Featured</th>
                  <th className="px-4 py-3 font-medium" />
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/6">
                {packages.map((pkg) => (
                  <tr key={pkg.id}>
                    <td className="px-4 py-3 font-medium">{pkg.name}</td>
                    <td className="px-4 py-3 text-ink/60">{pkg.tier ?? "—"}</td>
                    <td className="px-4 py-3 text-ink/60">{pkg.price != null ? formatLKR(pkg.price) : "—"}</td>
                    <td className="px-4 py-3">
                      <AvailabilityBadge
                        status={
                          pkg.availability === "available"
                            ? "in_stock"
                            : pkg.availability === "out_of_stock"
                              ? "out_of_stock"
                              : "coming_soon"
                        }
                      />
                    </td>
                    <td className="px-4 py-3 text-ink/60">{pkg.is_featured ? "Yes" : "—"}</td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/iphone18-packages/${pkg.id}`} className="text-sm font-medium text-brand hover:underline">
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
