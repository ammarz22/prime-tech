/**
 * Detailed technical specifications for the Apple lineup carried by Prime
 * Tech, sourced from Apple's own official spec pages (apple.com/iphone-17/
 * specs, /iphone-17-pro/specs, /iphone-17e/specs, /macbook-air/specs,
 * /macbook-pro/specs, /ipad-pro/specs, /ipad-air/specs, /ipad-mini/specs,
 * /apple-watch-series-11/specs, /apple-watch-se/specs, /apple-watch-ultra-3/
 * specs, /airpods-4/specs, /mac-mini/specs, /mac-studio/specs, /studio-
 * display/specs) as of 2026-09-17. These are supplementary to the
 * configurable variant fields already in the database (storage/memory/
 * colour/price) — display, camera, battery and dimension facts don't vary
 * by configuration, so they're kept here rather than duplicated per
 * variant row. Not reviews or marketing copy — spec facts only.
 *
 * Apple Watch Series 12, Apple Watch Ultra 4, AirPods 5, iPhone 18 Pro,
 * iPhone 18 Pro Max and iPhone Duo were announced by Apple on 2026-09-09
 * but had not yet reached full pre-order spec pages at time of writing —
 * their entries here are limited to what Apple has actually disclosed in
 * the announcement, not padded out with invented figures.
 */

export interface FullSpecGroup {
  label: string;
  rows: { label: string; value: string }[];
}

export const APPLE_FULL_SPECS: Record<string, FullSpecGroup[]> = {
  // ---------------------------------------------------------------- iPhone
  "iphone-17": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "6.3\" Super Retina XDR OLED" },
        { label: "Resolution", value: "2622 × 1206 at 460 ppi" },
        { label: "Refresh Rate", value: "ProMotion, up to 120Hz" },
        { label: "Brightness", value: "Up to 3000 nits peak outdoor brightness" },
        { label: "Durability", value: "Ceramic Shield 2, tougher than any smartphone glass" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Apple A19, 6-core CPU (2 performance + 4 efficiency)" },
        { label: "GPU", value: "5-core GPU with Neural Accelerators" },
        { label: "Neural Engine", value: "8-core Neural Engine, Apple Intelligence" },
      ],
    },
    {
      label: "Camera",
      rows: [
        { label: "Rear System", value: "48MP Dual Fusion — 48MP Main (ƒ/1.6) + 48MP Ultra Wide (ƒ/2.2)" },
        { label: "Optical Zoom", value: "0.5x, 1x, and a 2x optical-quality telephoto crop" },
        { label: "Front Camera", value: "18MP Center Stage, ƒ/1.9, autofocus" },
        { label: "Video", value: "4K Dolby Vision up to 60fps" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Video Playback", value: "Up to 30 hours" },
        { label: "Charging", value: "Fast charge up to 50% in ~20 min with a 40W+ adapter (sold separately)" },
        { label: "Wireless", value: "MagSafe up to 25W, Qi2 up to 15W" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Build", value: "Aluminum frame, Ceramic Shield 2 front and back" },
        { label: "Water Resistance", value: "IP68 (6m for up to 30 minutes)" },
        { label: "Colours", value: "Lavender, Sage, Mist Blue, Black, White" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Cellular", value: "5G (sub-6GHz), eSIM" },
        { label: "Wi-Fi", value: "Wi-Fi 7" },
        { label: "Bluetooth", value: "Bluetooth 6" },
        { label: "Port", value: "USB-C (USB 2 speeds)" },
      ],
    },
    {
      label: "Audio",
      rows: [
        { label: "Speakers", value: "Stereo speakers with wide stereo playback" },
        { label: "Spatial Audio", value: "Supported for playback with dynamic head tracking" },
      ],
    },
    {
      label: "Dimensions",
      rows: [
        { label: "Size", value: "149.6 × 71.5 × 7.95 mm" },
        { label: "Weight", value: "177 g" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "iPhone 17, USB-C to USB-C Cable" }],
    },
  ],
  "iphone-17-pro": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "6.3\" Super Retina XDR OLED" },
        { label: "Resolution", value: "2622 × 1206 at 460 ppi" },
        { label: "Refresh Rate", value: "ProMotion, up to 120Hz" },
        { label: "Brightness", value: "Up to 3000 nits peak outdoor brightness" },
        { label: "Durability", value: "Ceramic Shield 2 front" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Apple A19 Pro, 6-core CPU with vapor chamber cooling" },
        { label: "GPU", value: "6-core GPU with Neural Accelerators" },
        { label: "Neural Engine", value: "Apple Intelligence, on-device Neural Engine" },
      ],
    },
    {
      label: "Camera",
      rows: [
        { label: "Rear System", value: "Triple 48MP Pro Fusion — Main (24mm), Ultra Wide (13mm), Telephoto" },
        { label: "Optical Zoom", value: "0.5x, 1x, 4x, and an 8x (200mm) optical-quality telephoto crop" },
        { label: "Front Camera", value: "18MP Center Stage, ƒ/1.9" },
        { label: "Video", value: "ProRes RAW, Dolby Vision up to 4K at 120fps" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Video Playback", value: "Up to 33 hours" },
        { label: "Wireless", value: "MagSafe up to 25W, Qi2 up to 15W" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Build", value: "Heat-forged aluminum unibody, Ceramic Shield 2 front, textured back glass window" },
        { label: "Water Resistance", value: "IP68 (6m for up to 30 minutes)" },
        { label: "Colours", value: "Cosmic Orange, Deep Blue, Silver" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Cellular", value: "5G (sub-6GHz), eSIM" },
        { label: "Wi-Fi", value: "Wi-Fi 7" },
        { label: "Bluetooth", value: "Bluetooth 6" },
        { label: "Port", value: "USB-C, USB 3 speeds up to 10Gb/s" },
      ],
    },
    {
      label: "Audio",
      rows: [
        { label: "Speakers", value: "Stereo speakers with wide stereo playback" },
        { label: "Spatial Audio", value: "Supported for playback with dynamic head tracking" },
      ],
    },
    {
      label: "Dimensions",
      rows: [
        { label: "Size", value: "150.0 × 71.9 × 8.75 mm" },
        { label: "Weight", value: "206 g" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "iPhone 17 Pro, USB-C to USB-C Cable" }],
    },
  ],
  "iphone-17-pro-max": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "6.9\" Super Retina XDR OLED" },
        { label: "Resolution", value: "2868 × 1320 at 460 ppi" },
        { label: "Refresh Rate", value: "ProMotion, up to 120Hz" },
        { label: "Brightness", value: "Up to 3000 nits peak outdoor brightness" },
        { label: "Durability", value: "Ceramic Shield 2 front" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Apple A19 Pro, 6-core CPU with vapor chamber cooling" },
        { label: "GPU", value: "6-core GPU with Neural Accelerators" },
        { label: "Storage", value: "Up to 2TB" },
      ],
    },
    {
      label: "Camera",
      rows: [
        { label: "Rear System", value: "Triple 48MP Pro Fusion — Main (24mm), Ultra Wide (13mm), Telephoto" },
        { label: "Optical Zoom", value: "0.5x, 1x, 4x, and an 8x (200mm) optical-quality telephoto crop" },
        { label: "Front Camera", value: "18MP Center Stage, ƒ/1.9" },
        { label: "Video", value: "ProRes RAW, Dolby Vision up to 4K at 120fps" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Video Playback", value: "Up to 39 hours — the longest of any iPhone" },
        { label: "Wireless", value: "MagSafe up to 25W, Qi2 up to 15W" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Build", value: "Heat-forged aluminum unibody, Ceramic Shield 2 front, textured back glass window" },
        { label: "Water Resistance", value: "IP68 (6m for up to 30 minutes)" },
        { label: "Colours", value: "Cosmic Orange, Deep Blue, Silver" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Cellular", value: "5G (sub-6GHz), eSIM" },
        { label: "Wi-Fi", value: "Wi-Fi 7" },
        { label: "Bluetooth", value: "Bluetooth 6" },
        { label: "Port", value: "USB-C, USB 3 speeds up to 10Gb/s" },
      ],
    },
    {
      label: "Audio",
      rows: [{ label: "Speakers", value: "Stereo speakers with wide stereo playback, Spatial Audio" }],
    },
    {
      label: "Dimensions",
      rows: [
        { label: "Size", value: "163.4 × 78.0 × 8.75 mm" },
        { label: "Weight", value: "233 g" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "iPhone 17 Pro Max, USB-C to USB-C Cable" }],
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
      label: "Performance",
      rows: [{ label: "Chip", value: "Apple A19, 6-core CPU" }],
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
      label: "Battery",
      rows: [{ label: "Video Playback", value: "Up to 26 hours" }],
    },
    {
      label: "Design",
      rows: [
        { label: "Build", value: "Aluminum frame, Ceramic Shield front and back" },
        { label: "Water Resistance", value: "IP68 (6m for up to 30 minutes)" },
        { label: "Colours", value: "Black, White" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Cellular", value: "5G (sub-6GHz), eSIM" },
        { label: "Wi-Fi", value: "Wi-Fi 6" },
        { label: "Bluetooth", value: "Bluetooth 5.3" },
        { label: "Port", value: "USB-C (USB 2 speeds)" },
      ],
    },
    {
      label: "Dimensions",
      rows: [
        { label: "Size", value: "146.7 × 71.5 × 7.8 mm" },
        { label: "Weight", value: "167 g" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "iPhone 17e, USB-C to USB-C Cable" }],
    },
  ],
  // ------------------------------------------------------- iPhone 18 (new)
  "iphone-18-pro": [
    {
      label: "Performance",
      rows: [{ label: "Chip", value: "Apple A20 Pro" }],
    },
    {
      label: "Camera",
      rows: [{ label: "Rear System", value: "48MP variable-aperture main camera" }],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "iPhone 18 Pro, USB-C to USB-C Cable" }],
    },
  ],
  "iphone-18-pro-max": [
    {
      label: "Performance",
      rows: [{ label: "Chip", value: "Apple A20 Pro" }],
    },
    {
      label: "Camera",
      rows: [{ label: "Rear System", value: "48MP variable-aperture main camera" }],
    },
    {
      label: "Storage",
      rows: [{ label: "Configurations", value: "Starts at 256GB" }],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "iPhone 18 Pro Max, USB-C to USB-C Cable" }],
    },
  ],
  "iphone-duo": [
    {
      label: "Design",
      rows: [{ label: "Form Factor", value: "Apple's first foldable iPhone, book-style folding display" }],
    },
    {
      label: "Storage",
      rows: [{ label: "Configurations", value: "Starts at 256GB" }],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "iPhone Duo, USB-C to USB-C Cable" }],
    },
  ],
  // -------------------------------------------------------------- MacBook
  "macbook-neo": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "13\" Liquid Retina" },
        { label: "Resolution", value: "2408 × 1506" },
        { label: "Brightness", value: "400 nits, True Tone, wide colour (P3)" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Apple A18 Pro — an iPhone-class chip, not an M-series chip" },
        { label: "Memory", value: "8GB unified memory (single configuration)" },
        { label: "Storage", value: "256GB or 512GB SSD" },
      ],
    },
    {
      label: "Battery",
      rows: [{ label: "Battery Life", value: "Up to 16 hours of video playback" }],
    },
    {
      label: "Design",
      rows: [
        { label: "Build", value: "Aluminum unibody, fanless design" },
        { label: "Colours", value: "Silver, Sky Blue" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Wi-Fi", value: "Wi-Fi 6" },
        { label: "Bluetooth", value: "Bluetooth 5.3" },
        { label: "Ports", value: "2× USB-C (USB 3 speeds), headphone jack" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "MacBook Neo, 30W USB-C Power Adapter, USB-C Charge Cable" }],
    },
  ],
  "macbook-air": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "13.6\" or 15.3\" Liquid Retina" },
        { label: "Resolution", value: "2560 × 1664 (13\") or 2880 × 1864 (15\")" },
        { label: "Brightness", value: "500 nits, True Tone, wide colour (P3)" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Apple M5 — 10-core CPU (4 performance + 6 efficiency)" },
        { label: "GPU", value: "8-core or 10-core GPU, 16-core Neural Engine" },
        { label: "Memory", value: "16GB, 24GB, or 32GB unified memory" },
        { label: "Storage", value: "256GB up to 2TB SSD" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Battery Life", value: "Up to 18 hours" },
        { label: "Charging", value: "35W or 70W USB-C power adapter, MagSafe 3" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Build", value: "1.24cm thin, aluminum unibody" },
        { label: "Colours", value: "Midnight, Starlight, Space Grey, Sky Blue" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Wi-Fi", value: "Wi-Fi 6E" },
        { label: "Bluetooth", value: "Bluetooth 5.3" },
        { label: "Ports", value: "2× Thunderbolt / USB4, MagSafe 3, headphone jack" },
      ],
    },
    {
      label: "Audio",
      rows: [{ label: "Sound", value: "4-speaker sound system with Spatial Audio, 3-mic array" }],
    },
    {
      label: "Dimensions",
      rows: [
        { label: "13\"", value: "304.1 × 215.0 × 11.3 mm, 1.24 kg" },
        { label: "15\"", value: "340.4 × 237.3 × 11.5 mm, 1.51 kg" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "MacBook Air, 35W/70W USB-C Power Adapter, USB-C to MagSafe 3 Cable" }],
    },
  ],
  "macbook-pro-14": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "14.2\" Liquid Retina XDR" },
        { label: "Resolution", value: "3024 × 1964" },
        { label: "Brightness", value: "Up to 1600 nits peak HDR, 1000 nits sustained, ProMotion up to 120Hz" },
      ],
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
      label: "Battery",
      rows: [{ label: "Battery Life", value: "Up to 24 hours" }],
    },
    {
      label: "Design",
      rows: [
        { label: "Cooling", value: "Vapor-chamber cooling on Pro/Max configurations" },
        { label: "Colours", value: "Space Black, Silver" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Wi-Fi", value: "Wi-Fi 6E" },
        { label: "Bluetooth", value: "Bluetooth 5.3" },
        { label: "Ports", value: "3× Thunderbolt, HDMI, SDXC card slot, MagSafe 3, headphone jack" },
      ],
    },
    {
      label: "Audio",
      rows: [{ label: "Sound", value: "6-speaker system with force-cancelling woofers, Spatial Audio, studio-quality 3-mic array" }],
    },
    {
      label: "Dimensions",
      rows: [{ label: "Size", value: "312.6 × 221.2 × 15.5 mm, from 1.55 kg" }],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "MacBook Pro 14\", USB-C Power Adapter, USB-C Charge Cable" }],
    },
  ],
  "macbook-pro-16": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "16.2\" Liquid Retina XDR" },
        { label: "Resolution", value: "3456 × 2234" },
        { label: "Brightness", value: "Up to 1600 nits peak HDR, 1000 nits sustained, ProMotion up to 120Hz" },
      ],
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
    {
      label: "Design",
      rows: [
        { label: "Cooling", value: "Vapor-chamber cooling" },
        { label: "Colours", value: "Space Black, Silver" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Wi-Fi", value: "Wi-Fi 6E" },
        { label: "Bluetooth", value: "Bluetooth 5.3" },
        { label: "Ports", value: "3× Thunderbolt, HDMI, SDXC card slot, MagSafe 3, headphone jack" },
      ],
    },
    {
      label: "Audio",
      rows: [{ label: "Sound", value: "6-speaker system with force-cancelling woofers, Spatial Audio" }],
    },
    {
      label: "Dimensions",
      rows: [{ label: "Size", value: "355.7 × 248.1 × 16.8 mm, from 2.14 kg" }],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "MacBook Pro 16\", USB-C Power Adapter, USB-C Charge Cable" }],
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
      label: "Design",
      rows: [{ label: "Build", value: "10 × 10 × 5 cm aluminum unibody" }],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Wi-Fi", value: "Wi-Fi 6E" },
        { label: "Bluetooth", value: "Bluetooth 5.3" },
        { label: "Ports", value: "Thunderbolt 4 (2–3 ports), HDMI 2.1, Gigabit/10Gb Ethernet option, 2× USB-A" },
        { label: "Displays", value: "Supports up to three displays" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "Mac mini, Power Cord" }],
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
      label: "Design",
      rows: [{ label: "Build", value: "19.7 × 19.7 × 9.5 cm aluminum enclosure" }],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Wi-Fi", value: "Wi-Fi 6E" },
        { label: "Bluetooth", value: "Bluetooth 5.3" },
        { label: "Ports", value: "Thunderbolt 5, 10Gb Ethernet, HDMI, SDXC card slot" },
        { label: "Displays", value: "Supports up to eight displays" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "Mac Studio, Power Cord" }],
    },
  ],
  // ------------------------------------------------------------------ iPad
  "ipad-air": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "11\" or 13\" Liquid Retina" },
        { label: "Refresh Rate", value: "60Hz, True Tone, wide colour (P3), anti-reflective coating" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Apple M3 — 8-core CPU, up to 10-core GPU" },
        { label: "Neural Engine", value: "16-core Neural Engine" },
      ],
    },
    {
      label: "Camera",
      rows: [
        { label: "Rear", value: "12MP Wide, ƒ/1.8" },
        { label: "Front", value: "12MP Center Stage, ƒ/2.4, landscape" },
      ],
    },
    {
      label: "Battery",
      rows: [{ label: "Battery Life", value: "Up to 10 hours of surfing the web or watching video" }],
    },
    {
      label: "Design",
      rows: [{ label: "Colours", value: "Space Grey, Blue, Purple, Starlight" }],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Wi-Fi", value: "Wi-Fi 6E, or 5G cellular option" },
        { label: "Port", value: "USB-C, USB 3 speeds" },
        { label: "Biometrics", value: "Touch ID" },
        { label: "Accessories", value: "Apple Pencil Pro and Magic Keyboard support" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "iPad Air, USB-C Charge Cable" }],
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
        { label: "Neural Engine", value: "16-core Neural Engine" },
      ],
    },
    {
      label: "Camera",
      rows: [
        { label: "Rear", value: "12MP Wide, ƒ/1.8" },
        { label: "Front", value: "12MP Center Stage, ƒ/2.4" },
      ],
    },
    {
      label: "Battery",
      rows: [{ label: "Battery Life", value: "Up to 10 hours of surfing the web or watching video" }],
    },
    {
      label: "Design",
      rows: [{ label: "Colours", value: "Space Grey, Blue, Purple, Starlight" }],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Wi-Fi", value: "Wi-Fi 6E, or 5G cellular option" },
        { label: "Biometrics", value: "Touch ID" },
        { label: "Accessories", value: "Apple Pencil Pro support" },
      ],
    },
    {
      label: "Dimensions",
      rows: [{ label: "Size", value: "195.4 × 134.8 × 6.3 mm, 293 g (Wi-Fi)" }],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "iPad mini, USB-C Charge Cable" }],
    },
  ],
  "ipad-pro": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "11\" or 13\" tandem OLED Ultra Retina XDR" },
        { label: "Refresh Rate", value: "ProMotion, up to 120Hz" },
        { label: "Brightness", value: "Up to 1600 nits peak HDR" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Apple M5 — 10-core CPU, 10-core GPU with Neural Accelerators" },
        { label: "Neural Engine", value: "16-core Neural Engine" },
      ],
    },
    {
      label: "Camera",
      rows: [
        { label: "Rear", value: "12MP Wide + 10MP Ultra Wide" },
        { label: "Front", value: "12MP Center Stage" },
        { label: "Biometrics", value: "Face ID" },
      ],
    },
    {
      label: "Battery",
      rows: [{ label: "Battery Life", value: "Up to 10 hours of surfing the web or watching video" }],
    },
    {
      label: "Design",
      rows: [
        { label: "Thickness", value: "5.1mm (11\") or 5.3mm (13\"), aluminum unibody" },
        { label: "Colours", value: "Space Black, Silver" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Wi-Fi", value: "Wi-Fi 7, or 5G cellular option" },
        { label: "Port", value: "Thunderbolt / USB4" },
        { label: "Accessories", value: "Apple Pencil Pro and Magic Keyboard support" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "iPad Pro, USB-C Charge Cable" }],
    },
  ],
  // ---------------------------------------------------------- Apple Watch
  "apple-watch-se-3": [
    {
      label: "Display",
      rows: [{ label: "Type", value: "Always-On Retina LTPO OLED, 40mm or 44mm case" }],
    },
    {
      label: "Performance",
      rows: [{ label: "Chip", value: "Apple S10" }],
    },
    {
      label: "Battery",
      rows: [{ label: "Battery Life", value: "Up to 18 hours, fast charging support" }],
    },
    {
      label: "Design",
      rows: [
        { label: "Build", value: "Aluminum case, IP6X dust resistance" },
        { label: "Water Resistance", value: "WR50 (50 metres)" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Cellular", value: "Optional 5G cellular" },
        { label: "Bluetooth", value: "Bluetooth 5.3" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "Apple Watch SE 3, Sport Band, USB-C Magnetic Charging Cable" }],
    },
  ],
  "apple-watch-series-11": [
    {
      label: "Display",
      rows: [{ label: "Type", value: "Always-On Retina LTPO OLED, 42mm or 46mm case, up to 2000 nits" }],
    },
    {
      label: "Performance",
      rows: [{ label: "Chip", value: "Apple S10" }],
    },
    {
      label: "Health",
      rows: [
        { label: "Sensors", value: "ECG, Blood Oxygen, Hypertension notifications, Sleep Score, Sleep Apnea notifications" },
      ],
    },
    {
      label: "Battery",
      rows: [{ label: "Battery Life", value: "Up to 24 hours, up to 42 hours in Low Power Mode" }],
    },
    {
      label: "Design",
      rows: [
        { label: "Build", value: "Aluminum or Titanium case" },
        { label: "Water Resistance", value: "WR50, IP6X dust resistance" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Cellular", value: "Optional 5G cellular" },
        { label: "Bluetooth", value: "Bluetooth 5.3, second-gen Ultra Wideband" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "Apple Watch Series 11, Sport Band, USB-C Magnetic Charging Cable" }],
    },
  ],
  "apple-watch-series-12": [
    {
      label: "Design",
      rows: [{ label: "Note", value: "Announced by Apple on 2026-09-09 — full spec sheet not yet published" }],
    },
  ],
  "apple-watch-ultra-3": [
    {
      label: "Display",
      rows: [{ label: "Type", value: "1.9\" Always-On Retina LTPO OLED, up to 3000 nits, 49mm titanium case" }],
    },
    {
      label: "Performance",
      rows: [{ label: "Chip", value: "Apple S10" }],
    },
    {
      label: "Health",
      rows: [
        { label: "Sensors", value: "ECG, Blood Oxygen, Depth gauge, Hypertension notifications, Sleep Apnea notifications" },
      ],
    },
    {
      label: "Battery",
      rows: [{ label: "Battery Life", value: "Up to 42 hours normal use, up to 90 hours in Low Power Mode" }],
    },
    {
      label: "Design",
      rows: [
        { label: "Build", value: "Titanium case, sapphire crystal front" },
        { label: "Water Resistance", value: "WR100 (100 metres), MIL-STD-810H tested" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Cellular", value: "5G cellular" },
        { label: "GPS", value: "Dual-frequency GPS, second-gen Ultra Wideband" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "Apple Watch Ultra 3, Ocean Band, USB-C Magnetic Charging Cable" }],
    },
  ],
  "apple-watch-ultra-4": [
    {
      label: "Design",
      rows: [{ label: "Note", value: "Announced by Apple on 2026-09-09 — full spec sheet not yet published" }],
    },
  ],
  // ------------------------------------------------------------- AirPods
  "airpods-4": [
    {
      label: "Audio",
      rows: [
        { label: "Chip", value: "Apple H2" },
        { label: "Features", value: "Adaptive Audio, Personalized Spatial Audio with dynamic head tracking, Transparency mode; Active Noise Cancellation on the ANC model" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Battery Life", value: "Up to 5 hours listening (4 hours with ANC enabled)" },
        { label: "Case", value: "USB-C charging case, up to 20 additional hours (30 hours on the ANC model)" },
        { label: "Fast Charge", value: "5 minutes in the case for about 1 hour of listening" },
      ],
    },
    {
      label: "Design",
      rows: [{ label: "Water Resistance", value: "IP54 dust, sweat and water resistant (earbuds and case)" }],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Bluetooth", value: "Bluetooth 5.3" },
        { label: "Wireless Charging", value: "Supported on the ANC model" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "AirPods 4, USB-C Charging Case, USB-C Charge Cable" }],
    },
  ],
  "airpods-5": [
    {
      label: "Audio",
      rows: [{ label: "Note", value: "Announced by Apple on 2026-09-09 — full spec sheet not yet published" }],
    },
  ],
  // ---------------------------------------------------------- Accessories
  "studio-display": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "27\" 5K Retina" },
        { label: "Resolution", value: "5120 × 2880" },
        { label: "Brightness", value: "600 nits, True Tone, wide colour (P3)" },
      ],
    },
    {
      label: "Camera",
      rows: [{ label: "Front", value: "12MP Center Stage ultra-wide, with Desk View" }],
    },
    {
      label: "Audio",
      rows: [
        { label: "Speakers", value: "Six-speaker system with force-cancelling woofers, Spatial Audio" },
        { label: "Microphones", value: "Studio-quality three-mic array" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Upstream", value: "Thunderbolt / USB-C, up to 96W charging" },
        { label: "Downstream", value: "3× USB-C ports" },
      ],
    },
    {
      label: "Design",
      rows: [{ label: "Stand Options", value: "Tilt-adjustable stand, height-adjustable stand, or VESA mount adapter" }],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "Studio Display, Thunderbolt Cable, 96W USB-C Power Adapter" }],
    },
  ],
  "power-adapter-20w": [
    {
      label: "Performance",
      rows: [{ label: "Output", value: "20W USB-C Power Delivery" }],
    },
    {
      label: "Compatibility",
      rows: [{ label: "Works With", value: "iPhone, iPad and AirPods" }],
    },
  ],
  "usb-c-cable": [
    {
      label: "Design",
      rows: [{ label: "Length", value: "1 metre, USB-C to USB-C" }],
    },
    {
      label: "Performance",
      rows: [{ label: "Charging", value: "Supports fast charging and data transfer" }],
    },
  ],
};
