import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { ProductCard } from "@/components/product/product-card";
import { EmptyState } from "@/components/common/empty-state";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { Button } from "@/components/ui/button";
import { PackageSearch } from "lucide-react";
import type { ProductWithRelations } from "@/types/database";
import { cn } from "@/lib/utils";

interface ProductShowcaseProps {
  eyebrow: string;
  title: string;
  description?: string;
  products: ProductWithRelations[];
  viewAllHref: string;
  tone?: "light" | "dark";
  emptyMessage?: string;
}

export function ProductShowcase({
  eyebrow,
  title,
  description,
  products,
  viewAllHref,
  tone = "light",
  emptyMessage = "New arrivals are being added — check back soon.",
}: ProductShowcaseProps) {
  return (
    <section className={cn("py-20 sm:py-28", tone === "dark" ? "bg-ink" : "bg-paper")}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <AnimatedSection>
            <SectionHeading eyebrow={eyebrow} title={title} description={description} tone={tone} />
          </AnimatedSection>
          <Button
            render={<Link href={viewAllHref} />}
            variant="outline"
            className={cn(
              "hidden shrink-0 gap-2 rounded-full sm:inline-flex",
              tone === "dark" && "border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white",
            )}
          >
            View All
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="mt-10">
          {products.length === 0 ? (
            <EmptyState
              icon={PackageSearch}
              title={emptyMessage}
              className={tone === "dark" ? "border-white/10 text-white" : undefined}
            />
          ) : (
            <StaggerGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <StaggerItem key={product.id}>
                  <ProductCard product={product} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>

        <div className="mt-8 sm:hidden">
          <Button
            render={<Link href={viewAllHref} />}
            variant="outline"
            className={cn(
              "w-full gap-2 rounded-full",
              tone === "dark" && "border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white",
            )}
          >
            View All
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
