import { CategoryForm } from "@/components/admin/category-form";

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">New Category</h1>
      <div className="mt-8">
        <CategoryForm />
      </div>
    </div>
  );
}
