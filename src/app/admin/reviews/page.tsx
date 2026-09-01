import { Star } from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";
import { ReviewRow } from "@/components/admin/review-row";
import { createClient } from "@/lib/supabase/server";

export default async function AdminReviewsPage() {
  const supabase = await createClient();
  const { data: reviews } = await supabase
    .from("reviews")
    .select("id, customer_name, rating, title, body, status, verified, created_at, product:products(name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Reviews</h1>
      <p className="mt-1 text-sm text-ink/55">Moderate customer reviews before they appear on product pages.</p>

      <div className="mt-8">
        {!reviews || reviews.length === 0 ? (
          <EmptyState icon={Star} title="No reviews yet." description="Reviews submitted by customers will appear here for moderation." />
        ) : (
          <div className="divide-y divide-ink/6 rounded-2xl border border-ink/8 bg-paper">
            {reviews.map((r) => (
              <ReviewRow
                key={r.id}
                id={r.id}
                customerName={r.customer_name}
                rating={r.rating}
                title={r.title}
                body={r.body}
                productName={(r.product as unknown as { name: string } | null)?.name ?? null}
                status={r.status}
                verified={r.verified}
                createdAt={r.created_at}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
