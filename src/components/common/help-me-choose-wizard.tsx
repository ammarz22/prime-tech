"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  Zap,
  Camera,
  BatteryFull,
  Feather,
  Wallet,
  Briefcase,
  GraduationCap,
  Gamepad2,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { generalEnquiryMessage } from "@/lib/config/site";

type Device = "smartphone" | "laptop" | "tablet" | "accessories";
type Priority =
  | "performance"
  | "camera"
  | "battery"
  | "portability"
  | "budget"
  | "business"
  | "study"
  | "gaming";

const DEVICES: { value: Device; label: string; icon: typeof Smartphone }[] = [
  { value: "smartphone", label: "Smartphone", icon: Smartphone },
  { value: "laptop", label: "Laptop", icon: Laptop },
  { value: "tablet", label: "Tablet", icon: Tablet },
  { value: "accessories", label: "Accessories", icon: Headphones },
];

const PRIORITIES: { value: Priority; label: string; icon: typeof Zap; devices: Device[] }[] = [
  { value: "performance", label: "Performance", icon: Zap, devices: ["smartphone", "laptop", "tablet"] },
  { value: "camera", label: "Camera", icon: Camera, devices: ["smartphone"] },
  { value: "battery", label: "Battery", icon: BatteryFull, devices: ["smartphone", "laptop", "tablet"] },
  { value: "portability", label: "Portability", icon: Feather, devices: ["smartphone", "laptop", "tablet"] },
  { value: "budget", label: "Budget", icon: Wallet, devices: ["smartphone", "laptop", "tablet", "accessories"] },
  { value: "business", label: "Business", icon: Briefcase, devices: ["laptop", "smartphone"] },
  { value: "study", label: "Study", icon: GraduationCap, devices: ["laptop", "tablet"] },
  { value: "gaming", label: "Gaming", icon: Gamepad2, devices: ["laptop", "smartphone"] },
];

interface Recommendation {
  name: string;
  href: string;
  reason: string;
  cta: string;
}

/**
 * Rule-based, not AI. Where Prime Tech's current catalogue has a verified
 * matching product, we recommend it directly. Where it doesn't yet (tablets,
 * accessories, and several priority combinations), we point to the honest
 * category listing rather than inventing a specific recommendation. Some
 * smartphone priorities return two picks (an iPhone and a Galaxy) — Prime
 * Tech sells both ecosystems, and for camera/battery/performance both have a
 * genuinely strong, verified answer, so showing one alone would be
 * incomplete rather than more decisive.
 */
function getRecommendations(device: Device, priority: Priority): Recommendation[] {
  const fallback: Record<Device, Recommendation> = {
    smartphone: {
      name: "Smartphones at Prime Tech",
      href: "/products",
      reason: "Browse Samsung Galaxy and Apple iPhone at Prime Tech.",
      cta: "Browse Smartphones",
    },
    laptop: {
      name: "Mac at Prime Tech",
      href: "/products/apple?category=mac",
      reason: "Browse the current Mac lineup, from MacBook Neo to MacBook Pro.",
      cta: "Browse Mac",
    },
    tablet: {
      name: "iPad at Prime Tech",
      href: "/products/apple?category=ipad",
      reason: "Browse the current iPad lineup, from iPad mini to iPad Pro.",
      cta: "Browse iPad",
    },
    accessories: {
      name: "Accessories at Prime Tech",
      href: "/products/apple?category=apple-accessories",
      reason: "Browse Apple accessories, from Studio Display to chargers and cables.",
      cta: "Browse Accessories",
    },
  };

  const matches: Partial<Record<Device, Partial<Record<Priority, Recommendation[]>>>> = {
    smartphone: {
      performance: [
        {
          name: "iPhone 17 Pro",
          href: "/products/apple/product/iphone-17-pro",
          reason: "A19 Pro chip with a 6-core GPU for demanding tasks.",
          cta: "View iPhone 17 Pro",
        },
        {
          name: "Galaxy S26 Ultra",
          href: "/products/galaxy-s26-ultra",
          reason: "Snapdragon 8 Elite Gen 5 for Galaxy, Samsung's current flagship chip.",
          cta: "View Galaxy S26 Ultra",
        },
      ],
      gaming: [
        {
          name: "iPhone 17 Pro",
          href: "/products/apple/product/iphone-17-pro",
          reason: "Hardware-accelerated ray tracing and a 6-core GPU for gaming.",
          cta: "View iPhone 17 Pro",
        },
      ],
      camera: [
        {
          name: "iPhone 17 Pro Max",
          href: "/products/apple/product/iphone-17-pro-max",
          reason: "Triple 48MP Pro Fusion camera with up to 8x optical-quality zoom.",
          cta: "View iPhone 17 Pro Max",
        },
        {
          name: "Galaxy S25 Ultra",
          href: "/products/galaxy-s25-ultra",
          reason: "200MP Wide + 50MP Telephoto + 10MP Telephoto + 12MP Ultra Wide quad camera.",
          cta: "View Galaxy S25 Ultra",
        },
      ],
      battery: [
        {
          name: "iPhone 17 Pro Max",
          href: "/products/apple/product/iphone-17-pro-max",
          reason: "Up to 39 hours of video playback — the longest of any iPhone.",
          cta: "View iPhone 17 Pro Max",
        },
        {
          name: "Galaxy S26 Ultra",
          href: "/products/galaxy-s26-ultra",
          reason: "5000 mAh battery with up to 60W wired charging.",
          cta: "View Galaxy S26 Ultra",
        },
      ],
      budget: [
        {
          name: "iPhone 17e",
          href: "/products/apple/product/iphone-17e",
          reason: "The most affordable current-generation iPhone.",
          cta: "View iPhone 17e",
        },
      ],
      business: [
        {
          name: "iPhone 17 Pro",
          href: "/products/apple/product/iphone-17-pro",
          reason: "A dependable daily driver with a durable aluminum unibody.",
          cta: "View iPhone 17 Pro",
        },
      ],
    },
    laptop: {
      performance: [
        {
          name: "MacBook Pro 14\"",
          href: "/products/apple/product/macbook-pro-14",
          reason: "Scales up to M5 Max for the most demanding workloads.",
          cta: "View MacBook Pro 14\"",
        },
      ],
      gaming: [
        {
          name: "MacBook Pro 14\"",
          href: "/products/apple/product/macbook-pro-14",
          reason: "M5 Pro/Max GPU configurations handle graphics-intensive workloads.",
          cta: "View MacBook Pro 14\"",
        },
      ],
      battery: [
        {
          name: "MacBook Air",
          href: "/products/apple/product/macbook-air",
          reason: "Up to 18 hours of battery in a fanless design.",
          cta: "View MacBook Air",
        },
      ],
      portability: [
        {
          name: "MacBook Neo",
          href: "/products/apple/product/macbook-neo",
          reason: "Apple's lightest, most affordable Mac laptop.",
          cta: "View MacBook Neo",
        },
      ],
      budget: [
        {
          name: "MacBook Neo",
          href: "/products/apple/product/macbook-neo",
          reason: "Apple's entry point into the Mac lineup.",
          cta: "View MacBook Neo",
        },
      ],
      business: [
        {
          name: "MacBook Pro 14\"",
          href: "/products/apple/product/macbook-pro-14",
          reason: "Vapor-chamber cooling and Pro-grade performance for daily work.",
          cta: "View MacBook Pro 14\"",
        },
      ],
      study: [
        {
          name: "MacBook Air",
          href: "/products/apple/product/macbook-air",
          reason: "Light enough to carry all day, with all-day battery life.",
          cta: "View MacBook Air",
        },
      ],
    },
  };

  return matches[device]?.[priority] ?? [fallback[device]];
}

export function HelpMeChooseWizard({ whatsappNumber }: { whatsappNumber: string | null }) {
  const [device, setDevice] = useState<Device | null>(null);
  const [priority, setPriority] = useState<Priority | null>(null);

  const recommendations = device && priority ? getRecommendations(device, priority) : null;
  const step = !device ? 1 : !recommendations ? 2 : 3;

  function reset() {
    setDevice(null);
    setPriority(null);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper-soft px-4 pt-28 pb-16">
      <div className="w-full max-w-xl">
        <div className="mb-8 flex items-center justify-center gap-1.5">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-1 w-10 rounded-full transition-colors ${s <= step ? "bg-brand" : "bg-ink/10"}`} />
          ))}
        </div>

        <div className="rounded-[2rem] border border-ink/8 bg-paper p-8 sm:p-10">
          <AnimatePresence initial={false}>
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Step 1 of 2</p>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight">What are you looking for?</h1>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {DEVICES.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setDevice(d.value)}
                      className="flex flex-col items-center gap-3 rounded-2xl border border-ink/10 py-8 transition hover:border-brand hover:bg-brand/5"
                    >
                      <d.icon className="size-7 text-ink/60" strokeWidth={1.5} />
                      <span className="font-medium">{d.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && device && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Step 2 of 2</p>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight">What matters most?</h1>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {PRIORITIES.filter((p) => p.devices.includes(device)).map((p) => (
                    <button
                      key={p.value}
                      onClick={() => setPriority(p.value)}
                      className="flex flex-col items-center gap-2.5 rounded-2xl border border-ink/10 py-6 transition hover:border-brand hover:bg-brand/5"
                    >
                      <p.icon className="size-5 text-ink/60" strokeWidth={1.5} />
                      <span className="text-sm font-medium">{p.label}</span>
                    </button>
                  ))}
                </div>
                <button onClick={() => setDevice(null)} className="mt-6 text-sm text-ink/50 hover:text-ink">
                  ← Back
                </button>
              </motion.div>
            )}

            {step === 3 && recommendations && (
              <motion.div key="step3" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                  {recommendations.length > 1 ? "Our Recommendations" : "Our Recommendation"}
                </p>

                <div className={`mt-3 grid grid-cols-1 gap-4 ${recommendations.length > 1 ? "sm:grid-cols-2" : ""}`}>
                  {recommendations.map((rec) => (
                    <div key={rec.name} className="rounded-2xl border border-ink/8 p-5">
                      <h1 className="text-xl font-semibold tracking-tight">{rec.name}</h1>
                      <p className="mt-2 text-sm text-ink/60">{rec.reason}</p>
                      <Button size="sm" className="mt-4 w-full gap-2 rounded-full" render={<Link href={rec.href} />}>
                        {rec.cta}
                        <ArrowRight className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" variant="outline" className="h-12 flex-1 gap-2 rounded-full" onClick={reset}>
                    <RotateCcw className="size-4" />
                    Start Over
                  </Button>
                </div>
                <div className="mt-3">
                  <WhatsAppButton
                    number={whatsappNumber}
                    message={generalEnquiryMessage()}
                    label="Need Help Choosing? Chat With Us"
                    size="lg"
                    className="h-12 w-full rounded-full"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
