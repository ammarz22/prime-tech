import Link from "next/link";
import { Plus, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/common/empty-state";
import { getBranches } from "@/lib/db/branches";

export default async function AdminBranchesPage() {
  const branches = await getBranches();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Branches</h1>
          <p className="mt-1 text-sm text-ink/55">Manage Prime Tech branch locations.</p>
        </div>
        <Button render={<Link href="/admin/branches/new" />} className="gap-2">
          <Plus className="size-4" />
          New Branch
        </Button>
      </div>

      <div className="mt-8">
        {branches.length === 0 ? (
          <EmptyState icon={Building2} title="No branches yet." description="Add your first branch location." />
        ) : (
          <div className="divide-y divide-ink/6 rounded-2xl border border-ink/8 bg-paper">
            {branches.map((b) => (
              <div key={b.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">{b.name}</p>
                  <p className="text-xs text-ink/45">{b.city ?? "—"}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={b.status === "active" ? "default" : "secondary"}>{b.status}</Badge>
                  <Link href={`/admin/branches/${b.id}`} className="text-sm font-medium text-brand hover:underline">
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
