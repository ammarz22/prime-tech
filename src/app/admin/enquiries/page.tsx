import Link from "next/link";
import { Inbox } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";
import { EnquiryRow } from "@/components/admin/enquiry-row";
import { createClient } from "@/lib/supabase/server";

interface PageProps {
  searchParams: Promise<{ filter?: string }>;
}

export default async function AdminEnquiriesPage({ searchParams }: PageProps) {
  const { filter } = await searchParams;
  const isPreorderFilter = filter === "preorder";

  const supabase = await createClient();
  let query = supabase
    .from("enquiries")
    .select("id, name, email, phone, message, configuration, preferred_model, status, created_at, product:products(name)")
    .order("created_at", { ascending: false });
  if (isPreorderFilter) query = query.not("preferred_model", "is", null);

  const { data: enquiries } = await query;

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">{isPreorderFilter ? "Pre-Order Enquiries" : "Enquiries"}</h1>
      <p className="mt-1 text-sm text-ink/55">
        {isPreorderFilter
          ? "iPhone 18 pre-order registrations submitted through Prime Tech."
          : "Customer enquiries submitted through Prime Tech."}
      </p>
      {isPreorderFilter && (
        <Link href="/admin/enquiries" className="mt-2 inline-block text-sm text-brand hover:underline">
          Clear filter — show all enquiries
        </Link>
      )}

      <div className="mt-8">
        {!enquiries || enquiries.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title={isPreorderFilter ? "No pre-order enquiries yet." : "No enquiries yet."}
            description="Enquiries submitted by customers will appear here."
          />
        ) : (
          <div className="divide-y divide-ink/6 rounded-2xl border border-ink/8 bg-paper">
            {enquiries.map((e) => (
              <EnquiryRow
                key={e.id}
                id={e.id}
                name={e.name}
                email={e.email}
                phone={e.phone}
                message={e.message}
                configuration={e.configuration}
                productName={(e.product as unknown as { name: string } | null)?.name ?? e.preferred_model}
                status={e.status}
                createdAt={e.created_at}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
