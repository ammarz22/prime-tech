import { SectionHeading } from "@/components/common/section-heading";

/** Renders nothing when the product has no video — never an empty state,
 * matching how `FullSpecifications` behaves when no spec data exists. */
export function ProductVideoSection({
  product,
}: {
  product: { name: string; video_url: string | null; video_poster_url: string | null };
}) {
  if (!product.video_url) return null;

  return (
    <div className="border-t border-ink/8 py-14">
      <SectionHeading eyebrow="Product Video" title="See It In Motion" />
      <div className="mt-8 overflow-hidden rounded-2xl bg-black">
        <video
          src={product.video_url}
          poster={product.video_poster_url ?? undefined}
          controls
          className="aspect-video w-full"
          aria-label={`${product.name} video`}
        />
      </div>
    </div>
  );
}
