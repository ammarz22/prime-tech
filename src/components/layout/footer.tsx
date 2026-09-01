import Link from "next/link";
import { Music2, Phone, Mail, MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon, LinkedinIcon } from "@/components/icons/social-icons";
import { PrimeTechLogo } from "@/components/brand/prime-tech-logo";
import { getEffectiveContact } from "@/lib/db/site-settings";
import { PRODUCT_GROUPS } from "@/lib/config/navigation";

const PRIME_TECH_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "iPhone 18 Pre-Order", href: "/iphone-18-preorder" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Visit Us", href: "/branches" },
];

export async function Footer() {
  const contact = await getEffectiveContact();
  const socialLinks = [
    { href: contact.instagram, icon: InstagramIcon, label: "Instagram" },
    { href: contact.facebook, icon: FacebookIcon, label: "Facebook" },
    { href: contact.tiktok, icon: Music2, label: "TikTok" },
    { href: contact.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
  ].filter((s) => s.href);

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <PrimeTechLogo className="h-9" wordmarkClassName="text-white" />
            <p className="mt-4 text-sm text-white/55">Premium technology. Carefully selected.</p>
            {socialLinks.length > 0 && (
              <div className="mt-5 flex items-center gap-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex size-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:border-white/30 hover:text-white"
                  >
                    <s.icon className="size-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Prime Tech</p>
            <ul className="mt-4 space-y-2.5">
              {PRIME_TECH_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/55 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Shop by Ecosystem</p>
            <ul className="mt-4 space-y-2.5">
              {PRODUCT_GROUPS.map((group) => (
                <li key={group.href}>
                  <Link href={group.href} className="text-sm text-white/55 transition hover:text-white">
                    {group.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Contact</p>
            <ul className="mt-4 space-y-3 text-sm text-white/55">
              {contact.phone && (
                <li className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 size-4 shrink-0" />
                  <a href={`tel:${contact.phone}`} className="hover:text-white">
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.email && (
                <li className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 size-4 shrink-0" />
                  <a href={`mailto:${contact.email}`} className="hover:text-white">
                    {contact.email}
                  </a>
                </li>
              )}
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                <span>{contact.address ?? "Colombo, Sri Lanka"}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-center sm:text-left">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} Prime Tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
