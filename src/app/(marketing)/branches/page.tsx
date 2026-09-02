import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { AnimatedSection } from "@/components/motion/animated-section";
import { BranchCard } from "@/components/branch/branch-card";
import { EmptyState } from "@/components/common/empty-state";
import { getBranches } from "@/lib/db/branches";

export const metadata: Metadata = {
  title: "Visit Us",
  description: "Visit the Prime Tech branch in Sri Lanka.",
};

export default async function BranchesPage() {
  const branches = await getBranches();
  const branch = branches[0];
  const isActive = branch?.status === "active";

  return (
    <div className="pt-28">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <AnimatedSection>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Visit Us</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            {branch?.name ?? "Visit Prime Tech"}
          </h1>
          <p className="mt-3 text-ink/60">
            {isActive
              ? "See devices in person, get advice, and complete your purchase."
              : "Our first showroom is opening soon — reach us on WhatsApp in the meantime."}
          </p>
        </AnimatedSection>

        <div className="mt-10">
          {branch ? (
            <BranchCard branch={branch} />
          ) : (
            <EmptyState
              icon={MapPin}
              title="Branch details are being finalized."
              description="Check back soon, or contact us directly on WhatsApp."
            />
          )}
        </div>
      </div>
    </div>
  );
}
