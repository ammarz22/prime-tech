"use client";

import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star, CheckCircle2, Loader2, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { reviewSchema, type ReviewInput } from "@/lib/validations/review";
import { submitReview } from "@/lib/actions/reviews";
import { cn } from "@/lib/utils";
import type { Review } from "@/types/database";

function StarRating({ value, onChange }: { value: number; onChange?: (n: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={!onChange}
          onClick={() => onChange?.(n)}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          className={cn("text-amber-500", onChange && "cursor-pointer")}
        >
          <Star className="size-4" fill={n <= value ? "currentColor" : "none"} strokeWidth={1.5} />
        </button>
      ))}
    </div>
  );
}

export function ProductReviews({ productId, reviews }: { productId: string; reviews: Review[] }) {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const average = useMemo(() => {
    if (reviews.length === 0) return null;
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  }, [reviews]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ReviewInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { productId, rating: 0, customerName: "" },
  });

  async function onSubmit(data: ReviewInput) {
    setServerError(null);
    const result = await submitReview(data);
    if (!result.success) {
      setServerError(result.error ?? "Something went wrong. Please try again.");
      return;
    }
    setSubmitted(true);
  }

  return (
    <div className="border-t border-ink/8 py-14 lg:border-t-0">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Reviews</h2>
          {average !== null && (
            <div className="mt-2 flex items-center gap-2">
              <StarRating value={Math.round(average)} />
              <span className="text-sm text-ink/55">
                {average.toFixed(1)} out of 5 · {reviews.length} review{reviews.length === 1 ? "" : "s"}
              </span>
            </div>
          )}
        </div>
        {!showForm && !submitted && (
          <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>
            Write a Review
          </Button>
        )}
      </div>

      {reviews.length === 0 && !showForm && !submitted && (
        <p className="mt-5 text-sm leading-relaxed text-ink/55">No customer reviews yet. Be the first to share your experience.</p>
      )}

      {showForm && !submitted && (
        <div className="mt-6 rounded-2xl border border-ink/8 bg-paper-soft p-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
            <div className="space-y-1.5">
              <Label>Rating</Label>
              <Controller
                control={control}
                name="rating"
                render={({ field }) => <StarRating value={field.value} onChange={field.onChange} />}
              />
              {errors.rating && <p className="text-xs text-destructive">{errors.rating.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="review-name">Your Name</Label>
              <Input id="review-name" {...register("customerName")} aria-invalid={!!errors.customerName} />
              {errors.customerName && <p className="text-xs text-destructive">{errors.customerName.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="review-title">Review Title (optional)</Label>
              <Input id="review-title" {...register("title")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="review-body">Your Review</Label>
              <Textarea id="review-body" rows={4} {...register("body")} aria-invalid={!!errors.body} />
              {errors.body && <p className="text-xs text-destructive">{errors.body.message}</p>}
            </div>
            {serverError && <p className="text-sm text-destructive">{serverError}</p>}
            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                Submit Review
              </Button>
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {submitted && (
        <div className="mt-6 flex flex-col items-center rounded-2xl border border-ink/8 bg-paper-soft p-8 text-center">
          <CheckCircle2 className="size-10 text-emerald-500" strokeWidth={1.5} />
          <p className="mt-3 font-medium">Thanks for your review.</p>
          <p className="mt-1 text-sm text-ink/55">It&apos;ll appear here once Prime Tech approves it.</p>
        </div>
      )}

      {reviews.length > 0 && (
        <div className="mt-6 space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-ink/6 pb-6 last:border-0">
              <div className="flex items-center gap-2">
                <StarRating value={review.rating} />
                {review.verified && (
                  <span className="flex items-center gap-1 text-xs font-medium text-brand">
                    <BadgeCheck className="size-3.5" />
                    Verified Customer
                  </span>
                )}
              </div>
              {review.title && <p className="mt-1.5 font-medium text-ink">{review.title}</p>}
              <p className="mt-1 text-sm text-ink/65">{review.body}</p>
              <p className="mt-2 text-xs text-ink/40">
                {review.customer_name} · {new Date(review.created_at).toLocaleDateString("en-LK", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
