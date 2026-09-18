import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/common/floating-whatsapp";
import { PageTransition } from "@/components/layout/page-transition";
import { getEffectiveContact } from "@/lib/db/site-settings";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const contact = await getEffectiveContact();
  return (
    <>
      <Navbar contact={contact} />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
