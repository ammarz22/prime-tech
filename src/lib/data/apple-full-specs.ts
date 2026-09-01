/**
 * Detailed technical specifications for the current Apple lineup, sourced
 * from Apple's own official spec pages (apple.com/iphone-17/specs,
 * /iphone-17-pro/specs, /iphone-17e/specs,
 * /macbook-air/specs, /macbook-pro/specs, and the "Say hello to MacBook
 * Neo" newsroom post) as of 2026-08-21. These are supplementary to the
 * configurable variant fields already in the database (storage/memory/
 * colour/price) — display, camera, battery and dimension facts don't vary
 * by configuration, so they're kept here rather than duplicated per
 * variant row. Not reviews or marketing copy — spec facts only.
 */

export interface FullSpecGroup {
  label: string;
  rows: { label: string; value: string }[];
}

export const APPLE_FULL_SPECS: Record<string, FullSpecGroup[]> = {
  "iphone-17": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "6.3\" Super Retina XDR OLED" },
        { label: "Resolution", value: "2622 × 1206 at 460 ppi" },
        { label: "Refresh Rate", value: "ProMotion, up to 120Hz" },
      ],
    },
    {
      label: "Camera",
      rows: [
        { label: "Rear System", value: "48MP Dual Fusion — 48MP Main (ƒ/1.6) + 48MP Ultra Wide (ƒ/2.2)" },
        { label: "Optical Zoom", value: "0.5x, 1x, and a 2x optical-quality telephoto crop" },
        { label: "Front Camera", value: "18MP Center Stage, ƒ/1.9, autofocus" },
      ],
    },
    {
      label: "Design & Battery",
      rows: [
        { label: "Dimensions", value: "2.81 × 5.89 × 0.31 in" },
        { label: "Weight", value: "177 g (6.24 oz)" },
        { label: "Battery", value: "Up to 30 hours video playback" },
      ],
    },
  ],
  "iphone-17-pro": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "6.3\" Super Retina XDR OLED" },
        { label: "Resolution", value: "2622 × 1206 at 460 ppi" },
        { label: "Refresh Rate", value: "ProMotion, up to 120Hz" },
      ],
    },
    {
      label: "Camera",
      rows: [
        { label: "Rear System", value: "Triple 48MP Pro Fusion — Main (24mm), Ultra Wide (13mm), Telephoto" },
        { label: "Optical Zoom", value: "0.5x, 1x, 2x, 4x, and an 8x (200mm) optical-quality telephoto crop" },
        { label: "Front Camera", value: "18MP Center Stage, ƒ/1.9" },
        { label: "Video", value: "Dolby Vision up to 4K at 120fps" },
      ],
    },
    {
      label: "Design & Battery",
      rows: [
        { label: "Dimensions", value: "2.83 × 5.91 × 0.34 in" },
        { label: "Weight", value: "206 g (7.27 oz), heat-forged aluminum unibody, IP68" },
        { label: "Battery", value: "Up to 33 hours video playback" },
      ],
    },
  ],
  "iphone-17-pro-max": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "6.9\" Super Retina XDR OLED" },
        { label: "Resolution", value: "2868 × 1320 at 460 ppi" },
        { label: "Refresh Rate", value: "ProMotion, up to 120Hz" },
      ],
    },
    {
      label: "Camera",
      rows: [
        { label: "Rear System", value: "Triple 48MP Pro Fusion — Main (24mm), Ultra Wide (13mm), Telephoto" },
        { label: "Optical Zoom", value: "0.5x, 1x, 2x, 4x, and an 8x (200mm) optical-quality telephoto crop" },
        { label: "Front Camera", value: "18MP Center Stage, ƒ/1.9" },
        { label: "Video", value: "Dolby Vision up to 4K at 120fps" },
      ],
    },
    {
      label: "Design & Battery",
      rows: [
        { label: "Dimensions", value: "3.07 × 6.43 × 0.34 in" },
        { label: "Weight", value: "233 g (8.22 oz), heat-forged aluminum unibody, IP68" },
        { label: "Battery", value: "Up to 39 hours video playback — the longest of any iPhone" },
      ],
    },
  ],
  "iphone-17e": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "6.1\" Super Retina XDR OLED" },
        { label: "Resolution", value: "2532 × 1170 at 460 ppi" },
        { label: "Refresh Rate", value: "60Hz — no ProMotion, no Always-On, no Dynamic Island" },
      ],
    },
    {
      label: "Camera",
      rows: [
        { label: "Rear System", value: "Single 48MP Fusion Main, ƒ/1.6" },
        { label: "Optical Zoom", value: "1x and a 2x optical-quality telephoto crop" },
        { label: "Front Camera", value: "12MP TrueDepth, ƒ/1.9 (fixed focus, no Center Stage)" },
      ],
    },
    {
      label: "Design & Battery",
      rows: [
        { label: "Dimensions", value: "2.82 × 5.78 × 0.31 in" },
        { label: "Weight", value: "169 g (5.96 oz)" },
        { label: "Battery", value: "Up to 26 hours video playback" },
      ],
    },
  ],
  "macbook-neo": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "13\" Liquid Retina" },
        { label: "Resolution", value: "2408 × 1506" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Apple A18 Pro — an iPhone-class chip, not an M-series chip" },
        { label: "Memory", value: "8GB unified memory (single configuration)" },
      ],
    },
    {
      label: "Battery",
      rows: [{ label: "Battery Life", value: "Up to 16 hours" }],
    },
  ],
  "macbook-air": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "13.6\" or 15.3\" Liquid Retina" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Apple M5 — 10-core CPU (4 performance + 6 efficiency)" },
        { label: "GPU", value: "8-core or 10-core GPU, 16-core Neural Engine" },
        { label: "Memory", value: "16GB, 24GB, or 32GB unified memory" },
      ],
    },
    {
      label: "Battery",
      rows: [{ label: "Battery Life", value: "Up to 18 hours" }],
    },
  ],
  "macbook-pro-14": [
    {
      label: "Display",
      rows: [{ label: "Size", value: "14.2\" Liquid Retina XDR" }],
    },
    {
      label: "Performance",
      rows: [
        { label: "M5", value: "10-core CPU, 10-core GPU · 16/24/32GB memory" },
        { label: "M5 Pro", value: "Up to 18-core CPU, 20-core GPU · 24GB up to 64/128GB memory" },
        { label: "M5 Max", value: "18-core CPU, up to 40-core GPU · 24–36GB up to 128GB memory" },
      ],
    },
    {
      label: "Design & Battery",
      rows: [
        { label: "Cooling", value: "Vapor-chamber cooling on Pro/Max configurations" },
        { label: "Battery Life", value: "Up to 24 hours" },
      ],
    },
  ],
  "macbook-pro-16": [
    {
      label: "Display",
      rows: [{ label: "Size", value: "16.2\" Liquid Retina XDR" }],
    },
    {
      label: "Performance",
      rows: [
        { label: "M5 Pro", value: "Up to 18-core CPU, 20-core GPU · 24GB up to 64/128GB memory" },
        { label: "M5 Max", value: "18-core CPU, up to 40-core GPU · 24–36GB up to 128GB memory" },
        { label: "Note", value: "16\" is only offered with M5 Pro or M5 Max — no base M5 option" },
      ],
    },
    {
      label: "Battery",
      rows: [{ label: "Battery Life", value: "Up to 24 hours" }],
    },
  ],
  "ipad-air": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "11\" or 13\" Liquid Retina" },
        { label: "Refresh Rate", value: "60Hz, True Tone, Wide colour (P3)" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Apple M3 — 8-core CPU, up to 10-core GPU" },
        { label: "Accessories", value: "Apple Pencil Pro and Magic Keyboard support" },
      ],
    },
    {
      label: "Design & Battery",
      rows: [{ label: "Battery Life", value: "Up to 10 hours of surfing the web or watching video" }],
    },
  ],
  "ipad-mini": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "8.3\" Liquid Retina" },
        { label: "Resolution", value: "2266 × 1488 at 326 ppi" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Apple A17 Pro — 6-core CPU, 5-core GPU" },
        { label: "Accessories", value: "Apple Pencil Pro support" },
      ],
    },
    {
      label: "Design & Battery",
      rows: [{ label: "Battery Life", value: "Up to 10 hours of surfing the web or watching video" }],
    },
  ],
  "ipad-pro": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "11\" or 13\" tandem OLED Ultra Retina XDR" },
        { label: "Refresh Rate", value: "ProMotion, up to 120Hz" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Apple M5" },
        { label: "Biometrics", value: "Face ID" },
      ],
    },
    {
      label: "Design & Battery",
      rows: [{ label: "Battery Life", value: "Up to 10 hours of surfing the web or watching video" }],
    },
  ],
  "apple-watch-se-3": [
    {
      label: "Display",
      rows: [{ label: "Type", value: "Always-On Retina, 40mm or 44mm case" }],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Apple S10" },
        { label: "Connectivity", value: "Optional 5G cellular" },
      ],
    },
    {
      label: "Battery",
      rows: [{ label: "Battery Life", value: "Up to 18 hours, fast charging support" }],
    },
  ],
  "apple-watch-series-11": [
    {
      label: "Display",
      rows: [{ label: "Type", value: "Always-On Retina, 42mm or 46mm case" }],
    },
    {
      label: "Health & Connectivity",
      rows: [
        { label: "Features", value: "Hypertension notifications, 5G cellular" },
      ],
    },
    {
      label: "Battery",
      rows: [{ label: "Battery Life", value: "Up to 24 hours" }],
    },
  ],
  "apple-watch-ultra-3": [
    {
      label: "Display",
      rows: [{ label: "Type", value: "1.9\" Always-On Retina, up to 3000 nits, 49mm titanium case" }],
    },
    {
      label: "Health & Connectivity",
      rows: [
        { label: "Features", value: "Hypertension notifications, 5G cellular" },
      ],
    },
    {
      label: "Battery",
      rows: [{ label: "Battery Life", value: "Up to 42 hours normal use" }],
    },
  ],
  "airpods-4": [
    {
      label: "Audio",
      rows: [
        { label: "Chip", value: "Apple H2" },
        { label: "Features", value: "Adaptive Audio, Transparency mode; Active Noise Cancellation on the ANC model" },
      ],
    },
    {
      label: "Battery & Case",
      rows: [
        { label: "Battery Life", value: "Up to 5 hours listening (4 hours with ANC enabled)" },
        { label: "Case", value: "USB-C charging case, up to 20 additional hours" },
      ],
    },
  ],
  "mac-mini": [
    {
      label: "Performance",
      rows: [
        { label: "M4", value: "10-core CPU, up to 10-core GPU · 16GB up to 32GB memory" },
        { label: "M4 Pro", value: "Up to 14-core CPU, 20-core GPU · 24GB up to 64GB memory" },
      ],
    },
    {
      label: "Connectivity",
      rows: [{ label: "Ports", value: "Thunderbolt 4, supports up to three displays" }],
    },
  ],
  "mac-studio": [
    {
      label: "Performance",
      rows: [
        { label: "M4 Max", value: "Up to 16-core CPU, 40-core GPU · up to 128GB memory" },
        { label: "M3 Ultra", value: "Up to 32-core CPU, 80-core GPU · up to 512GB memory" },
      ],
    },
    {
      label: "Connectivity",
      rows: [{ label: "Ports", value: "Thunderbolt 5, supports multiple high-resolution displays" }],
    },
  ],
  "studio-display": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "27\" 5K Retina" },
        { label: "Camera", value: "12MP Center Stage" },
      ],
    },
    {
      label: "Audio & Connectivity",
      rows: [
        { label: "Sound", value: "Six-speaker system with force-cancelling woofers" },
        { label: "Ports", value: "Thunderbolt / USB-C" },
      ],
    },
  ],
};
