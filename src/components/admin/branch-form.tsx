"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { branchSchema, type BranchInput } from "@/lib/validations/branch";
import { createBranchAction, updateBranchAction, deleteBranchAction } from "@/lib/actions/admin-branches";

export function BranchForm({ branchId, defaultValues }: { branchId?: string; defaultValues?: Partial<BranchInput> }) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BranchInput>({ resolver: zodResolver(branchSchema), defaultValues: { status: "coming_soon", ...defaultValues } });

  async function onSubmit(data: BranchInput) {
    setServerError(null);
    const result = branchId ? await updateBranchAction(branchId, data) : await createBranchAction(data);
    if (!result.success) {
      setServerError(result.error ?? "Something went wrong.");
      return;
    }
    router.push("/admin/branches");
    router.refresh();
  }

  async function handleDelete() {
    if (!branchId || !confirm("Delete this branch?")) return;
    const result = await deleteBranchAction(branchId);
    if (result.success) {
      router.push("/admin/branches");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="b-name">Name</Label>
          <Input id="b-name" {...register("name")} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="b-slug">Slug</Label>
          <Input id="b-slug" {...register("slug")} />
          {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="b-address">Address</Label>
        <Input id="b-address" {...register("address")} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="b-city">City</Label>
          <Input id="b-city" {...register("city")} />
        </div>
        <div className="space-y-1.5">
          <Label>Status</Label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue>
                    {(value: string) => ({ active: "Active", coming_soon: "Coming Soon" })[value] ?? value}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="coming_soon">Coming Soon</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="b-phone">Phone</Label>
          <Input id="b-phone" {...register("phone")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="b-whatsapp">WhatsApp Number</Label>
          <Input id="b-whatsapp" {...register("whatsapp")} />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="b-maps">Google Maps URL</Label>
        <Input id="b-maps" {...register("mapsUrl")} />
        {errors.mapsUrl && <p className="text-xs text-destructive">{errors.mapsUrl.message}</p>}
      </div>

      {serverError && <p className="text-sm text-destructive">{serverError}</p>}

      <div className="flex items-center justify-between border-t border-ink/8 pt-6">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          {branchId ? "Save Changes" : "Create Branch"}
        </Button>
        {branchId && (
          <Button type="button" variant="ghost" className="gap-2 text-destructive hover:text-destructive" onClick={handleDelete}>
            <Trash2 className="size-4" />
            Delete
          </Button>
        )}
      </div>
    </form>
  );
}
