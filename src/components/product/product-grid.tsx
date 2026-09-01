import { ProductCard } from "@/components/product/product-card";
import { EmptyState } from "@/components/common/empty-state";
import { PackageSearch } from "lucide-react";
import type { ProductWithRelations } from "@/types/database";

export function ProductGrid({
  products,
  emptyTitle = "No products found.",
  emptyDescription = "Try adjusting your filters.",
}: {
  products: ProductWithRelations[];
  emptyTitle?: string;
  emptyDescription?: string;
}) {
  if (products.length === 0) {
    return <EmptyState icon={PackageSearch} title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
