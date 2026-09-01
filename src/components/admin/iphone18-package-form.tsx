"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { iphone18PackageSchema, packageAvailabilityOptions, type Iphone18PackageInput } from "@/lib/validations/iphone18-package";
import {
  createPackageAction,
  updatePackageAction,
  deletePackageAction,
  uploadPackageImageAction,
} from "@/lib/actions/admin-iphone18-packages";

const AVAILABILITY_LABELS: Record<(typeof packageAvailabilityOptions)[number], string> = {
  available: "Available",
  out_of_stock: "Out of Stock",
  coming_soon: "Coming Soon",
};

export function Iphone18PackageForm({
  packageId,
  defaultValues,
  imageUrl,
}: {
  packageId?: string;
  defaultValues?: Partial<Iphone18PackageInput>;
  imageUrl?: string | null;
}) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Iphone18PackageInput>({
    resolver: zodResolver(iphone18PackageSchema),
    defaultValues: { availability: "coming_soon", isFeatured: false, sortOrder: 0, ...defaultValues },
  });

  async function onSubmit(data: Iphone18PackageInput) {
    setServerError(null);
    const result = packageId ? await updatePackageAction(packageId, data) : await createPackageAction(data);
    if (!result.success) {
      setServerError(result.error ?? "Something went wrong.");
      return;
    }
    if (!packageId && result.id) {
      router.push(`/admin/iphone18-packages/${result.id}`);
      router.refresh();
      return;
    }
    router.refresh();
  }

  async function handleDelete() {
    if (!packageId || !confirm("Delete this package? This cannot be undone.")) return;
    const result = await deletePackageAction(packageId);
    if (result.success) {
      router.push("/admin/iphone18-packages");
      router.refresh();
    }
  }

  return (
    <div className="max-w-xl space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="pkg-name">Package Name</Label>
            <Input id="pkg-name" placeholder="e.g. Ultimate" {...register("name")} />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pkg-tier">Tier (optional)</Label>
            <Input id="pkg-tier" placeholder="e.g. Standard, Premium, Ultimate" {...register("tier")} />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="pkg-description">Description</Label>
          <Textarea id="pkg-description" rows={3} placeholder="What this package is for" {...register("description")} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="pkg-included">Included Items</Label>
          <Textarea
            id="pkg-included"
            rows={3}
            placeholder="One item per line or comma-separated, e.g. iPhone 18 Pro, AppleCare+, 20W Adapter"
            {...register("includedItems")}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="pkg-price">Price (LKR, optional)</Label>
            <Input id="pkg-price" type="number" step="1" {...register("price", { valueAsNumber: true })} />
            {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pkg-benefit">Saving / Benefit (optional)</Label>
            <Input id="pkg-benefit" placeholder="e.g. Save Rs. 15,000" {...register("benefit")} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="pkg-availability">Availability</Label>
            <Controller
              control={control}
              name="availability"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="pkg-availability" className="w-full">
                    <SelectValue>{(value: string) => AVAILABILITY_LABELS[value as keyof typeof AVAILABILITY_LABELS] ?? value}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {packageAvailabilityOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {AVAILABILITY_LABELS[option]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pkg-sort">Sort Order</Label>
            <Input id="pkg-sort" type="number" {...register("sortOrder", { valueAsNumber: true })} />
            {errors.sortOrder && <p className="text-xs text-destructive">{errors.sortOrder.message}</p>}
          </div>
        </div>

        <label className="flex items-center gap-2.5 text-sm text-ink/70">
          <Controller
            control={control}
            name="isFeatured"
            render={({ field }) => <Checkbox checked={field.value} onCheckedChange={field.onChange} />}
          />
          Feature this package on the iPhone 18 page
        </label>

        {serverError && <p className="text-sm text-destructive">{serverError}</p>}

        <div className="flex items-center justify-between border-t border-ink/8 pt-6">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="size-4 animate-spin" />}
            {packageId ? "Save Changes" : "Create Package"}
          </Button>
          {packageId && (
            <Button type="button" variant="ghost" className="gap-2 text-destructive hover:text-destructive" onClick={handleDelete}>
              <Trash2 className="size-4" />
              Delete
            </Button>
          )}
        </div>
      </form>

      {packageId && <PackageImageUploader packageId={packageId} imageUrl={imageUrl ?? null} />}
    </div>
  );
}

function PackageImageUploader({ packageId, imageUrl }: { packageId: string; imageUrl: string | null }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError("Choose an image file.");
      return;
    }
    setError(null);
    setUploading(true);

    const formData = new FormData();
    formData.set("file", file);
    const result = await uploadPackageImageAction(packageId, formData);
    setUploading(false);
    if (!result.success) {
      setError(result.error ?? "Upload failed.");
      return;
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
    router.refresh();
  }

  return (
    <div className="border-t border-ink/8 pt-6">
      <p className="text-sm font-medium text-ink">Package Image</p>
      {imageUrl && (
        <div className="relative mt-3 aspect-video w-full max-w-xs overflow-hidden rounded-2xl border border-ink/8 bg-paper-soft">
          <Image src={imageUrl} alt="Package" fill className="object-cover" />
        </div>
      )}
      <form onSubmit={handleUpload} className="mt-3 flex flex-wrap items-center gap-3">
        <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="text-sm" />
        <Button type="submit" size="sm" variant="outline" className="gap-2" disabled={uploading}>
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
          Upload
        </Button>
      </form>
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
