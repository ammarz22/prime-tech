import { MessageCircle } from "lucide-react";
import { getEffectiveContact } from "@/lib/db/site-settings";

export async function FloatingWhatsApp() {
  const contact = await getEffectiveContact();
  if (!contact.whatsappNumber) return null;

  const digits = contact.whatsappNumber.replace(/[^\d]/g, "");
  const message = encodeURIComponent("Hello Prime Tech, I'd like to know more about your products.");

  return (
    <a
      href={`https://wa.me/${digits}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Prime Tech on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex size-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] transition hover:scale-105 active:scale-95"
    >
      <MessageCircle className="size-6" fill="currentColor" strokeWidth={0} />
    </a>
  );
}
