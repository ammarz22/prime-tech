import { Smartphone, Tablet, Watch, Headphones, ShoppingBag } from "lucide-react";
import type { CatalogueCategory } from "@/lib/config/catalogue-types";

/**
 * One entry per real Samsung category Prime Tech actually carries — same
 * slugs used everywhere else on the site (`getProducts({ categorySlug })`).
 * "Galaxy Phones" spans both real generations Prime Tech currently stocks
 * (`galaxy-s25` and `galaxy-s26`) the same way the Apple iPhone tab spans
 * `iphone` and `iphone-18`. Hero copy is adapted from the existing,
 * already-honest `ProductStory` descriptions rather than invented fresh.
 */
export const SAMSUNG_CATALOGUE_CATEGORIES: CatalogueCategory[] = [
  {
    slug: "galaxy-phones",
    categorySlugs: ["galaxy-s26", "galaxy-s25"],
    label: "Galaxy Phones",
    icon: Smartphone,
    heroEyebrow: "Built For What's Next.",
    heroTitle: "Galaxy Phones",
    heroSubtitle: "More power. More intelligence. More you.",
    heroDescription:
      "Samsung's current and previous flagship generations — from the accessible Galaxy S25 to the latest Galaxy S26 Ultra.",
    heroBackground: "/samsung-page/s26-spotlight-device-raw.png",
    heroSideWords: ["Bolder", "Smarter", "Brighter", "Beyond"],
  },
  {
    slug: "galaxy-tab",
    categorySlugs: ["galaxy-tab"],
    label: "Galaxy Tab",
    icon: Tablet,
    heroEyebrow: "Bigger Ideas.",
    heroTitle: "Galaxy Tab",
    heroSubtitle: "Go further, on a bigger screen.",
    heroDescription: "From the Galaxy Tab S11 to the larger Ultra, both with S Pen support built in.",
    heroBackground: "/samsung-page/tablet-background.png",
    heroSideWords: ["Create", "Sketch", "Explore", "Beyond"],
  },
  {
    slug: "galaxy-watch",
    categorySlugs: ["galaxy-watch"],
    label: "Galaxy Watch",
    icon: Watch,
    heroEyebrow: "A Healthier You.",
    heroTitle: "Galaxy Watch",
    heroSubtitle: "A smarter, healthier everyday.",
    heroDescription: "From the everyday Galaxy Watch9 to the rugged, titanium Watch Ultra 2.",
    heroBackground: "/samsung-page/wearables-background.png",
    heroSideWords: ["Track", "Train", "Thrive", "Beyond"],
  },
  {
    slug: "galaxy-buds",
    categorySlugs: ["galaxy-buds"],
    label: "Galaxy Buds",
    icon: Headphones,
    heroEyebrow: "Sound That Moves You.",
    heroTitle: "Galaxy Buds",
    heroSubtitle: "Immersive, all day.",
    heroDescription: "Samsung's current true wireless earbuds lineup, from the accessible Buds3 FE to the premium Buds4 Pro.",
    heroBackground: "/samsung-page/wearables-background.png",
    heroSideWords: ["Listen", "Focus", "Unwind", "Beyond"],
  },
  {
    slug: "accessories",
    categorySlugs: ["accessories"],
    label: "Samsung Accessories",
    icon: ShoppingBag,
    heroEyebrow: "Everyday Essentials.",
    heroTitle: "Accessories",
    heroSubtitle: "Power. Protect. Connect.",
    heroDescription:
      "Genuine Samsung accessories — chargers, trackers and more — sourced with the same care as everything else at Prime Tech.",
    heroBackground: "/samsung-page/hero-background.png",
    heroSideWords: ["Power", "Protect", "Connect", "Beyond"],
  },
];
