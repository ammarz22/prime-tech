"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { productSchema, type ProductInput } from "@/lib/validations/product";
import { createProductAction, updateProductAction, deleteProductAction } from "@/lib/actions/admin-products";
import type { Brand, Category } from "@/types/database";

interface ProductFormProps {
  productId?: string;
  brands: Brand[];
  categories: Category[];
  defaultValues?: Partial<ProductInput>;
}

export function ProductForm({ productId, brands, categories, defaultValues }: ProductFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productGroup: "OTHER",
      status: "draft",
      featured: false,
      newArrival: false,
      priceLabel: "on_request",
      ...defaultValues,
    },
  });

  async function onSubmit(data: ProductInput) {
    setServerError(null);
    const result = productId ? await updateProductAction(productId, data) : await createProductAction(data);
    if (!result.success) {
      setServerError(result.error ?? "Something went wrong.");
      return;
    }
    // New products land back on their own edit page (not the list) so the
    // admin can immediately add variants and images.
    router.push(productId ? "/admin/products" : `/admin/products/${result.id}`);
    router.refresh();
  }

  async function handleDelete() {
    if (!productId || !confirm("Delete this product? This cannot be undone.")) return;
    const result = await deleteProductAction(productId);
    if (result.success) {
      router.push("/admin/products");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="p-name">Name</Label>
          <Input id="p-name" {...register("name")} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="p-slug">Slug</Label>
          <Input id="p-slug" {...register("slug")} />
          {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label>Product Group</Label>
          <Controller
            control={control}
            name="productGroup"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue>{(value: string) => ({ APPLE: "Apple", OTHER: "Other" })[value] ?? value}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="APPLE">Apple</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Brand</Label>
          <Controller
            control={control}
            name="brandId"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select brand">
                    {(value: string) => brands.find((b) => b.id === value)?.name ?? value}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {brands.map((b) => (
                    <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Category</Label>
          <Controller
            control={control}
            name="categoryId"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category">
                    {(value: string) => categories.find((c) => c.id === value)?.name ?? value}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="p-short">Short Description</Label>
        <Input id="p-short" {...register("shortDescription")} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="p-desc">Description</Label>
        <Textarea id="p-desc" rows={4} {...register("description")} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="p-price">Base Price (LKR)</Label>
          <Input id="p-price" type="number" step="1" {...register("basePrice")} />
        </div>
        <div className="space-y-1.5">
          <Label>Price Label</Label>
          <Controller
            control={control}
            name="priceLabel"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue>
                    {(value: string) =>
                      ({
                        exact: "Exact",
                        starting_from: "Starting From",
                        approx_market: "Approx. Market Price",
                        on_request: "Price on Request",
                        coming_soon: "Coming Soon",
                      })[value] ?? value
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exact">Exact</SelectItem>
                  <SelectItem value="starting_from">Starting From</SelectItem>
                  <SelectItem value="approx_market">Approx. Market Price</SelectItem>
                  <SelectItem value="on_request">Price on Request</SelectItem>
                  <SelectItem value="coming_soon">Coming Soon</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Status</Label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue>{(value: string) => ({ draft: "Draft", published: "Published" })[value] ?? value}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <Controller control={control} name="featured" render={({ field }) => (
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          )} />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Controller control={control} name="newArrival" render={({ field }) => (
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          )} />
          New Arrival
        </label>
      </div>

      {serverError && <p className="text-sm text-destructive">{serverError}</p>}

      <div className="flex items-center justify-between border-t border-ink/8 pt-6">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          {productId ? "Save Changes" : "Create Product"}
        </Button>
        {productId && (
          <Button type="button" variant="ghost" className="gap-2 text-destructive hover:text-destructive" onClick={handleDelete}>
            <Trash2 className="size-4" />
            Delete
          </Button>
        )}
      </div>
    </form>
  );
}
