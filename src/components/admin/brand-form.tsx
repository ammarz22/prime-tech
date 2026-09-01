"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { brandSchema, type BrandInput } from "@/lib/validations/brand";
import { createBrandAction, updateBrandAction, deleteBrandAction } from "@/lib/actions/admin-brands";

export function BrandForm({ brandId, defaultValues }: { brandId?: string; defaultValues?: Partial<BrandInput> }) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BrandInput>({ resolver: zodResolver(brandSchema), defaultValues });

  async function onSubmit(data: BrandInput) {
    setServerError(null);
    const result = brandId ? await updateBrandAction(brandId, data) : await createBrandAction(data);
    if (!result.success) {
      setServerError(result.error ?? "Something went wrong.");
      return;
    }
    router.push("/admin/brands");
    router.refresh();
  }

  async function handleDelete() {
    if (!brandId || !confirm("Delete this brand? Products using it will keep their data but lose the brand link.")) return;
    const result = await deleteBrandAction(brandId);
    if (result.success) {
      router.push("/admin/brands");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="brand-name">Name</Label>
          <Input id="brand-name" {...register("name")} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="brand-slug">Slug</Label>
          <Input id="brand-slug" {...register("slug")} />
          {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="brand-logo">Logo URL (optional)</Label>
        <Input id="brand-logo" {...register("logoUrl")} />
        {errors.logoUrl && <p className="text-xs text-destructive">{errors.logoUrl.message}</p>}
      </div>

      {serverError && <p className="text-sm text-destructive">{serverError}</p>}

      <div className="flex items-center justify-between border-t border-ink/8 pt-6">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          {brandId ? "Save Changes" : "Create Brand"}
        </Button>
        {brandId && (
          <Button type="button" variant="ghost" className="gap-2 text-destructive hover:text-destructive" onClick={handleDelete}>
            <Trash2 className="size-4" />
            Delete
          </Button>
        )}
      </div>
    </form>
  );
}
