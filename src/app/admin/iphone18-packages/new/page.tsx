import { Iphone18PackageForm } from "@/components/admin/iphone18-package-form";

export default function NewIphone18PackagePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">New iPhone 18 Package</h1>
      <div className="mt-8">
        <Iphone18PackageForm />
      </div>
    </div>
  );
}
