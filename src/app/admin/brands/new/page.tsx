import { BrandForm } from "@/components/admin/brand-form";

export default function NewBrandPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">New Brand</h1>
      <div className="mt-8">
        <BrandForm />
      </div>
    </div>
  );
}
