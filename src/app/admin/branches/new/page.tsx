import { BranchForm } from "@/components/admin/branch-form";

export default function NewBranchPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">New Branch</h1>
      <div className="mt-8">
        <BranchForm />
      </div>
    </div>
  );
}
