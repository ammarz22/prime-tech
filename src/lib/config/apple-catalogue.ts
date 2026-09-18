import { Smartphone, Laptop, Tablet, Watch, Headphones, ShoppingBag } from "lucide-react";
import type { CatalogueCategory } from "@/lib/config/catalogue-types";

export type { CatalogueCategory };

/**
 * One entry per real Apple category Prime Tech actually carries — same
 * slugs used everywhere else on the site (`getProducts({ categorySlug })`).
 * Hero copy is adapted from the existing, already-honest `ProductStory`
 * descriptions rather than invented fresh.
 */
export const APPLE_CATALOGUE_CATEGORIES: CatalogueCategory[] = [
  {
    slug: "iphone",
    categorySlugs: ["iphone", "iphone-18"],
    label: "iPhone",
    icon: Smartphone,
    heroEyebrow: "A Higher Standard.",
    heroTitle: "iPhone",
    heroSubtitle: "Powerful. Beautiful. Built for what's next.",
    heroDescription: "Explore the full iPhone lineup. Genuine products. Expert guidance. Only at Prime Tech.",
    heroBackground: "/apple-page/iphone-spotlight-device-raw.png",
    heroSideWords: ["Bigger", "Brighter", "Smarter", "Beyond"],
  },
  {
    slug: "mac",
    categorySlugs: ["mac"],
    label: "Mac",
    icon: Laptop,
    heroEyebrow: "Power, Redefined.",
    heroTitle: "Mac",
    heroSubtitle: "Built to go beyond.",
    heroDescription:
      "Power for work, creativity and everything in between — from the entry MacBook Neo to the M5 Max MacBook Pro and M3 Ultra Mac Studio.",
    heroBackground: "/apple-page/mac-background.png",
    heroSideWords: ["Faster", "Lighter", "Further", "Beyond"],
  },
  {
    slug: "ipad",
    categorySlugs: ["ipad"],
    label: "iPad",
    icon: Tablet,
    heroEyebrow: "More Possibility.",
    heroTitle: "iPad",
    heroSubtitle: "From notes to masterpieces.",
    heroDescription:
      "From the pocketable iPad mini to the OLED iPad Pro, every iPad supports Apple Pencil Pro for notes, sketches and markup.",
    heroBackground: "/apple-page/ipad-background.png",
    heroSideWords: ["Create", "Sketch", "Explore", "Beyond"],
  },
  {
    slug: "apple-watch",
    categorySlugs: ["apple-watch"],
    label: "Watch",
    icon: Watch,
    heroEyebrow: "A Healthier You.",
    heroTitle: "Apple Watch",
    heroSubtitle: "A brighter tomorrow, on your wrist.",
    heroDescription: "From the accessible SE to the rugged, titanium Ultra — Apple's full current Watch lineup.",
    heroBackground: "/apple-page/watch-background.png",
    heroSideWords: ["Track", "Train", "Thrive", "Beyond"],
  },
  {
    slug: "airpods",
    categorySlugs: ["airpods"],
    label: "AirPods",
    icon: Headphones,
    heroEyebrow: "Sound That Moves You.",
    heroTitle: "AirPods",
    heroSubtitle: "Immersive, all day.",
    heroDescription: "Apple's current in-ear AirPods, available with or without Active Noise Cancellation.",
    heroBackground: "/apple-page/airpods-background.png",
    heroSideWords: ["Listen", "Focus", "Unwind", "Beyond"],
  },
  {
    slug: "accessories",
    categorySlugs: ["accessories"],
    label: "Apple Accessories",
    icon: ShoppingBag,
    heroEyebrow: "Everyday Essentials.",
    heroTitle: "Accessories",
    heroSubtitle: "Power. Protect. Connect.",
    heroDescription:
      "Genuine Apple accessories — chargers, cables and displays — sourced with the same care as everything else at Prime Tech.",
    heroBackground: "/apple-page/hero-background.png",
    heroSideWords: ["Power", "Protect", "Connect", "Beyond"],
  },
];
