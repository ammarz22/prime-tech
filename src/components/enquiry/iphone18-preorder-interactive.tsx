import { AnimatedSection } from "@/components/motion/animated-section";
import { SectionHeading } from "@/components/common/section-heading";
import { Iphone18PackageCard } from "@/components/product/iphone18-package-card";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { preorderEnquiryMessage } from "@/lib/config/site";
import type { Package } from "@/types/database";

export function Iphone18PreorderInteractive({
  whatsappNumber,
  models,
  packages,
  showPackages,
}: {
  whatsappNumber: string | null;
  models?: string[];
  packages: Package[];
  showPackages: boolean;
}) {
  return (
    <>
      {showPackages && packages.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading eyebrow="Pre-Order Packages" title="Choose How You Reserve" align="center" className="mx-auto" />
          </AnimatedSection>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <Iphone18PackageCard key={pkg.id} pkg={pkg} whatsappNumber={whatsappNumber} />
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-ink/8 bg-paper-soft py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Chat With Us</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Chat About Pre-Order</h2>

          <div className="mx-auto mt-8 max-w-sm">
            <WhatsAppButton
              number={whatsappNumber}
              message={preorderEnquiryMessage(models && models.length > 0 ? { model: models.join(", ") } : undefined)}
              label="Chat About Pre-Order"
              variant="default"
              size="lg"
              className="h-12 w-full rounded-full text-base"
            />
          </div>
        </div>
      </div>
    </>
  );
}
