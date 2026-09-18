import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getEffectiveContact } from "@/lib/db/site-settings";
import { whatsappLink, serviceEnquiryMessage } from "@/lib/config/site";

export async function AccessoriesHelpCta() {
  const contact = await getEffectiveContact();
  const ctaHref = whatsappLink(serviceEnquiryMessage("choosing the right accessory"), contact.whatsappNumber) ?? "#";

  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-10 xl:px-16">
      <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-10 text-white sm:px-10 sm:py-12">
        <div
          className="pointer-events-none absolute -right-10 top-1/2 size-64 -translate-y-1/2 rounded-full bg-brand/20 blur-[90px]"
          aria-hidden
        />

        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Need help choosing
              <br />
              the right accessory?
            </h2>
            <p className="mt-2 max-w-sm text-sm text-white/60">
              Talk to our team on WhatsApp. We&apos;ll help you find the perfect match for your device.
            </p>
            <Button
              render={<a href={ctaHref} target="_blank" rel="noopener noreferrer" />}
              size="lg"
              className="mt-5 h-11 gap-2 rounded-full px-6 text-sm"
            >
              <MessageCircle className="size-4" />
              Chat with an Expert
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <p className="hidden -rotate-2 font-hand text-lg text-white/50 sm:block">
            The right accessory.
            <br />A smoother everyday.
          </p>
        </div>
      </div>
    </section>
  );
}
