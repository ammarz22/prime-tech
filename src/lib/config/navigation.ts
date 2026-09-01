export interface NavLinkItem {
  label: string;
  href: string;
}

export interface ProductNavGroup {
  label: string;
  href: string;
  description: string;
  links: NavLinkItem[];
}

/**
 * Single source of truth for the Products mega-menu and its mobile-drawer
 * equivalent. Prime Tech carries two curated ecosystems — Apple (full
 * range) and Samsung (flagship smartphones only) — per the catalogue
 * strategy; nothing here should grow without a matching real catalogue.
 */
export const PRODUCT_GROUPS: ProductNavGroup[] = [
  {
    label: "Apple",
    href: "/products/apple",
    description: "iPhone, Mac & more",
    links: [
      { label: "iPhone", href: "/products/apple?category=iphone" },
      { label: "Mac", href: "/products/apple?category=mac" },
      { label: "iPad", href: "/products/apple?category=ipad" },
      { label: "Apple Watch", href: "/products/apple?category=apple-watch" },
      { label: "AirPods", href: "/products/apple?category=airpods" },
      { label: "Accessories", href: "/products/apple?category=apple-accessories" },
    ],
  },
  {
    label: "Samsung",
    href: "/products/samsung",
    description: "Galaxy flagship smartphones",
    links: [
      { label: "Galaxy S25 Series", href: "/products/samsung?category=galaxy-s25" },
      { label: "Galaxy S26 Series", href: "/products/samsung?category=galaxy-s26" },
    ],
  },
];

/** Top-level nav links outside the Products mega-menu. */
export const PRIMARY_NAV_LINKS: NavLinkItem[] = [
  { label: "Home", href: "/" },
  { label: "iPhone 18", href: "/iphone-18-preorder" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
