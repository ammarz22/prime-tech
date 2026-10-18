import Link from "next/link";
import { Music2, Phone, Mail, MessageCircle } from "lucide-react";
import { InstagramIcon, FacebookIcon, LinkedinIcon } from "@/components/icons/social-icons";
import { PrimeTechLogo } from "@/components/brand/prime-tech-logo";
import { getEffectiveContact } from "@/lib/db/site-settings";
import { whatsappLink } from "@/lib/config/site";
import { CATEGORY_NAV_LINKS } from "@/lib/config/navigation";

/** Support links point at real, working features only — Prime Tech has no
 * dedicated Delivery/Warranty/FAQ pages, so those reference-copy labels are
 * swapped for real ones rather than linked to pages that don't exist. No
 * store/branches link either — Prime Tech has no physical showroom. Kept
 * compact (small type, tight column gaps) to match the reference's dense
 * proportions rather than a tall, spacious footer. */
const SUPPORT_LINKS = [
  { label: "Help Me Choose", href: "/help-me-choose" },
  { label: "Compare Products", href: "/products/compare" },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/contact" },
];

export async function Footer() {
  const contact = await getEffectiveContact();
  const socialLinks = [
    { href: contact.instagram, icon: InstagramIcon, label: "Instagram" },
    { href: contact.facebook, icon: FacebookIcon, label: "Facebook" },
    { href: contact.tiktok, icon: Music2, label: "TikTok" },
    { href: contact.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
  ].filter((s) => s.href);
  const waHref = contact.whatsappNumber
    ? whatsappLink("Hello Prime Tech, I have a question.", contact.whatsappNumber)
    : null;

  return (
    <footer className="border-t border-ink/8 bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <PrimeTechLogo className="h-8" wordmarkClassName="text-white" />
            <p className="mt-3 text-sm text-white/55">
              Premium technology.
              <br />
              Carefully selected.
            </p>
            <p className="mt-4 text-xs text-white/35">© {new Date().getFullYear()} Prime Tech. All rights reserved.</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Shop</p>
            <ul className="mt-3 space-y-2">
              {CATEGORY_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/55 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Support</p>
            <ul className="mt-3 space-y-2">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/55 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Get in Touch</p>
            <ul className="mt-3 space-y-2 text-sm text-white/55">
              {contact.phone && (
                <li className="flex items-start gap-1.5">
                  <Phone className="mt-0.5 size-3.5 shrink-0" />
                  <a href={`tel:${contact.phone}`} className="hover:text-white">
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.email && (
                <li className="flex items-start gap-1.5">
                  <Mail className="mt-0.5 size-3.5 shrink-0" />
                  <a href={`mailto:${contact.email}`} className="hover:text-white">
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>

            {socialLinks.length > 0 && (
              <div className="mt-3 flex items-center gap-1.5">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex size-7 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:border-white/30 hover:text-white"
                  >
                    <s.icon className="size-3.5" />
                  </a>
                ))}
              </div>
            )}

            {waHref && (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-brand/85"
              >
                <MessageCircle className="size-3" />
                WhatsApp Us
              </a>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-center gap-2 border-t border-white/10 pt-4 text-center sm:flex-row">
          <Link href="/privacy" className="text-[10px] text-white/40 transition hover:text-white/70">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
