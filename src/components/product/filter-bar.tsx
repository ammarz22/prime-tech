"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SlidersHorizontal, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Brand } from "@/types/database";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

const STORAGE_OPTIONS = ["128GB", "256GB", "512GB", "1TB"];

/** Brand + sort controls. Category is handled by CategoryPills above this. */
export function FilterBar({ brands }: { brands: Brand[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value && value !== "all") params.set(key, value);
      else params.delete(key);
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  function updateParam(key: string, value: string | null) {
    updateParams({ [key]: value });
  }

  const activeBrand = searchParams.get("brand") ?? "all";
  const activeStorage = searchParams.get("storage") ?? "all";
  const activeSort = searchParams.get("sort") ?? "featured";
  const hasActiveFilter = activeBrand !== "all" || activeStorage !== "all";

  return (
    <div className={cn("flex flex-col gap-3 transition-opacity sm:flex-row sm:items-center sm:justify-between", isPending && "opacity-60")}>
      <div className="flex flex-wrap items-center gap-2">
        {isPending ? (
          <Loader2 className="size-4 animate-spin text-ink/40" />
        ) : (
          <SlidersHorizontal className="size-4 text-ink/40" />
        )}
        <Select value={activeBrand} onValueChange={(v) => updateParam("brand", v)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Brand">
              {(value: string) => (value === "all" ? "All Brands" : (brands.find((b) => b.slug === value)?.name ?? value))}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {brands.map((b) => (
              <SelectItem key={b.id} value={b.slug}>
                {b.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={activeStorage} onValueChange={(v) => updateParam("storage", v)}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Storage">
              {(value: string) => (value === "all" ? "Any Storage" : value)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Storage</SelectItem>
            {STORAGE_OPTIONS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilter && (
          <Button
            variant="ghost"
            size="sm"
            className="text-ink/50"
            onClick={() => updateParams({ brand: null, storage: null })}
          >
            Clear
          </Button>
        )}
      </div>

      <Select value={activeSort} onValueChange={(v) => updateParam("sort", v)}>
        <SelectTrigger className={cn("w-[180px]")}>
          <SelectValue placeholder="Sort">
            {(value: string) => SORT_OPTIONS.find((opt) => opt.value === value)?.label ?? value}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
