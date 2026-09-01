"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { categorySchema, type CategoryInput } from "@/lib/validations/category";
import { createCategoryAction, updateCategoryAction, deleteCategoryAction } from "@/lib/actions/admin-categories";

export function CategoryForm({ categoryId, defaultValues }: { categoryId?: string; defaultValues?: Partial<CategoryInput> }) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryInput>({ resolver: zodResolver(categorySchema), defaultValues: { sortOrder: 0, ...defaultValues } });

  async function onSubmit(data: CategoryInput) {
    setServerError(null);
    const result = categoryId ? await updateCategoryAction(categoryId, data) : await createCategoryAction(data);
    if (!result.success) {
      setServerError(result.error ?? "Something went wrong.");
      return;
    }
    router.push("/admin/categories");
    router.refresh();
  }

  async function handleDelete() {
    if (!categoryId || !confirm("Delete this category? Products using it will keep their data but lose the category link.")) return;
    const result = await deleteCategoryAction(categoryId);
    if (result.success) {
      router.push("/admin/categories");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="cat-name">Name</Label>
          <Input id="cat-name" {...register("name")} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cat-slug">Slug</Label>
          <Input id="cat-slug" {...register("slug")} />
          {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="cat-sort">Sort Order</Label>
        <Input id="cat-sort" type="number" {...register("sortOrder", { valueAsNumber: true })} />
        {errors.sortOrder && <p className="text-xs text-destructive">{errors.sortOrder.message}</p>}
      </div>

      {serverError && <p className="text-sm text-destructive">{serverError}</p>}

      <div className="flex items-center justify-between border-t border-ink/8 pt-6">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          {categoryId ? "Save Changes" : "Create Category"}
        </Button>
        {categoryId && (
          <Button type="button" variant="ghost" className="gap-2 text-destructive hover:text-destructive" onClick={handleDelete}>
            <Trash2 className="size-4" />
            Delete
          </Button>
        )}
      </div>
    </form>
  );
}
