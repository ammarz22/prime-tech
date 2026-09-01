/**
 * Central Prime Tech site configuration.
 * Business details are read from env vars so nothing is hard-coded across
 * components. Values are intentionally placeholders until the real business
 * details are supplied — see SETUP.md.
 */

const rawWhatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export const siteConfig = {
  name: "Prime Tech",
  shortName: "Prime Tech",
  tagline: "Premium technology. Carefully selected.",
  description:
    "Discover premium smartphones, laptops, accessories and technology solutions from brands you can trust. Prime Tech is a technology destination based in Colombo, Sri Lanka.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  contact: {
    phone: process.env.NEXT_PUBLIC_PHONE || null,
    email: process.env.NEXT_PUBLIC_EMAIL || null,
    whatsappNumber: rawWhatsapp || null,
    address: process.env.NEXT_PUBLIC_ADDRESS || null,
  },

  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || null,
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || null,
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || null,
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || null,
  },
} as const;

export function whatsappLink(message: string, number = siteConfig.contact.whatsappNumber) {
  if (!number) return null;
  const digits = number.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function productEnquiryMessage(productName: string, configuration?: string) {
  const lines = [
    "Hello Prime Tech,",
    "",
    "I am interested in:",
    productName,
  ];
  if (configuration) {
    lines.push("", "Configuration:", configuration);
  }
  lines.push("", "Could you please confirm the latest price and availability?", "Thank you.");
  return lines.join("\n");
}

export function serviceEnquiryMessage(serviceName: string) {
  return `Hello Prime Tech, I am interested in ${serviceName}. Could you tell me more?`;
}

export function packageEnquiryMessage(packageName: string) {
  return `Hello Prime Tech, I am interested in the ${packageName} package. Could you tell me more?`;
}

export function generalEnquiryMessage() {
  return "Hello Prime Tech, I would like to get in touch.";
}

/**
 * Future-ready: composes whatever selection fields are known today. Right
 * now that's just the campaign, but once a real lineup/configuration/
 * package system exists this same builder carries the selected model,
 * colour, storage, package and price without needing a rewrite.
 */
export function preorderEnquiryMessage(selection?: {
  model?: string;
  colour?: string;
  storage?: string;
  packageName?: string;
  price?: string;
}) {
  const hasSelection = selection && Object.values(selection).some(Boolean);
  if (!hasSelection) {
    return "Hello Prime Tech, I am interested in the iPhone 18 Series pre-order. Please provide me with more information.";
  }
  const lines = ["Hello Prime Tech, I am interested in the iPhone 18 Series pre-order:", ""];
  if (selection?.model) lines.push(`Model: ${selection.model}`);
  if (selection?.colour) lines.push(`Colour: ${selection.colour}`);
  if (selection?.storage) lines.push(`Storage: ${selection.storage}`);
  if (selection?.packageName) lines.push(`Package: ${selection.packageName}`);
  if (selection?.price) lines.push(`Price: ${selection.price}`);
  lines.push("", "Please provide me with more information.");
  return lines.join("\n");
}
