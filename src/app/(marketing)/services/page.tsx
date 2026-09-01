import type { Metadata } from "next";
import { Compass, Wrench, Building2, LifeBuoy, Headphones } from "lucide-react";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/motion/animated-section";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { getEffectiveContact } from "@/lib/db/site-settings";
import { serviceEnquiryMessage } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Device consultation, setup, business technology, technical support and accessories at Prime Tech Colombo.",
};

const SERVICES = [
  {
    icon: Compass,
    title: "Device Consultation",
    description: "Not sure which device is right for you? We help you compare options against how you'll actually use them.",
  },
  {
    icon: Wrench,
    title: "Device Setup",
    description: "Get your new phone, laptop or tablet set up and ready to use, with your accounts and data in place.",
  },
  {
    icon: Building2,
    title: "Business Technology",
    description: "Equip your team with the right devices and a straightforward path to support when you need it.",
  },
  {
    icon: LifeBuoy,
    title: "Technical Support",
    description: "Running into an issue with a device you bought from us? Reach out and we'll help you sort it out.",
  },
  {
    icon: Headphones,
    title: "Accessories & Peripherals",
    description: "Cases, chargers, audio and more — ask us what pairs well with your setup.",
  },
];

export default async function ServicesPage() {
  const contact = await getEffectiveContact();

  return (
    <div className="pt-28">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <AnimatedSection>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Services</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            How Prime Tech Can Help
          </h1>
          <p className="mt-3 max-w-xl text-ink/60">
            Beyond selling devices, we help you choose, set up and get support for the technology you rely on.
          </p>
        </AnimatedSection>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <StaggerItem key={service.title} className="flex h-full flex-col rounded-3xl border border-ink/8 p-6">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-brand/10">
                <service.icon className="size-5 text-brand" strokeWidth={1.5} />
              </div>
              <p className="mt-4 font-medium text-ink">{service.title}</p>
              <p className="mt-1.5 text-sm text-ink/55">{service.description}</p>
              <div className="mt-auto pt-5">
                <WhatsAppButton
                  number={contact.whatsappNumber}
                  message={serviceEnquiryMessage(service.title)}
                  label="Ask About This"
                  size="sm"
                  className="w-fit rounded-full"
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </div>
  );
}
