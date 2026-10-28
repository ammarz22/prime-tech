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
 * iPhone 18 Pro, iPhone 18 Pro Max, iPhone Duo, Apple Watch Series 12,
 * Apple Watch Ultra 4, AirPods 5, AirPods Pro 3, the 2026 iMac (Apple M6) and
 * iPad (A16) were added from Apple's own spec pages (apple.com/iphone-18-pro/
 * specs, /iphone-duo/specs, /apple-watch-series-12/specs, /apple-watch-ultra-4/
 * specs, /airpods-5/specs, /airpods-pro/specs, /imac/specs, /ipad-10.9/specs)
 * on 2026-10-28. AirPods 4 battery figures were corrected against Apple Support.
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
      label: "Display",
      rows: [
        { label: "Size", value: "6.3\" all-screen OLED" },
        { label: "Resolution", value: "2622 × 1206 at 460 ppi" },
        { label: "Refresh Rate", value: "ProMotion, up to 120Hz" },
        { label: "Brightness", value: "Up to 3000 nits peak outdoor brightness" },
        { label: "Durability", value: "Ceramic Shield 2 front, Ceramic Shield back" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Apple A20 Pro, 6-core CPU (2 super cores + 4 efficiency cores)" },
        { label: "GPU", value: "7-core GPU with Neural Accelerators, hardware-accelerated ray tracing" },
        { label: "Neural Engine", value: "Dual 16-core Neural Engine" },
        { label: "Storage", value: "256GB, 512GB, 1TB or 2TB" },
      ],
    },
    {
      label: "Camera",
      rows: [
        { label: "Rear System", value: "48MP Fusion — Main (24 mm, variable aperture ƒ/1.48–ƒ/4.0), Telephoto (100 mm, ƒ/2.8), Ultra Wide (13 mm, ƒ/2.2)" },
        { label: "Optical Zoom", value: "2x optical zoom out, 4x optical, and an 8x optical-quality telephoto crop (200 mm); digital zoom up to 40x" },
        { label: "Front Camera", value: "18MP Center Stage, ƒ/1.9" },
        { label: "Video", value: "4K Dolby Vision up to 120fps; ProRes RAW and Apple Log 2" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Video Playback", value: "Up to 36 hours" },
        { label: "Typical Use", value: "Up to 24 hours" },
        { label: "Streamed Video", value: "Up to 33 hours" },
        { label: "Fast Charge", value: "Up to 50% in around 15 minutes with a 60W-capable adapter (sold separately)" },
        { label: "Wireless", value: "MagSafe and Qi2, each up to 25W" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Build", value: "Aluminum unibody, Ceramic Shield 2 front, Ceramic Shield back" },
        { label: "Water Resistance", value: "IP68 (6m for up to 30 minutes)" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Cellular", value: "5G (sub-6GHz and mmWave), Gigabit LTE, dual eSIM only (no physical SIM)" },
        { label: "Wi-Fi", value: "Wi-Fi 7 (802.11be)" },
        { label: "Bluetooth", value: "Bluetooth 6" },
        { label: "Other", value: "Apple C2 modem, second-generation Ultra Wideband, NFC, Thread" },
        { label: "Satellite", value: "Emergency SOS, Roadside Assistance, Messages and Find My via satellite" },
        { label: "Port", value: "USB-C, USB 3 speeds up to 10Gb/s" },
      ],
    },
    {
      label: "Dimensions",
      rows: [
        { label: "Size", value: "150.0 × 71.9 × 8.75 mm" },
        { label: "Weight", value: "211 g" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [
        { label: "Included", value: "iPhone 18 Pro, USB-C Charge Cable (1 m)" },
      ],
    },
  ],
  "iphone-18-pro-max": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "6.9\" all-screen OLED" },
        { label: "Resolution", value: "2868 × 1320 at 460 ppi" },
        { label: "Refresh Rate", value: "ProMotion, up to 120Hz" },
        { label: "Brightness", value: "Up to 3000 nits peak outdoor brightness" },
        { label: "Durability", value: "Ceramic Shield 2 front, Ceramic Shield back" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Apple A20 Pro, 6-core CPU (2 super cores + 4 efficiency cores)" },
        { label: "GPU", value: "7-core GPU with Neural Accelerators, hardware-accelerated ray tracing" },
        { label: "Neural Engine", value: "Dual 16-core Neural Engine" },
        { label: "Storage", value: "256GB, 512GB, 1TB or 2TB" },
      ],
    },
    {
      label: "Camera",
      rows: [
        { label: "Rear System", value: "48MP Fusion — Main (24 mm, variable aperture ƒ/1.48–ƒ/4.0), Telephoto (100 mm, ƒ/2.8), Ultra Wide (13 mm, ƒ/2.2)" },
        { label: "Optical Zoom", value: "2x optical zoom out, 4x optical, and an 8x optical-quality telephoto crop (200 mm); digital zoom up to 40x" },
        { label: "Front Camera", value: "18MP Center Stage, ƒ/1.9" },
        { label: "Video", value: "4K Dolby Vision up to 120fps; ProRes RAW and Apple Log 2" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Video Playback", value: "Up to 45 hours" },
        { label: "Typical Use", value: "Up to 30 hours" },
        { label: "Streamed Video", value: "Up to 40 hours" },
        { label: "Fast Charge", value: "Up to 50% in around 15 minutes with a 60W-capable adapter (sold separately)" },
        { label: "Wireless", value: "MagSafe and Qi2, each up to 25W" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Build", value: "Aluminum unibody, Ceramic Shield 2 front, Ceramic Shield back" },
        { label: "Water Resistance", value: "IP68 (6m for up to 30 minutes)" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Cellular", value: "5G (sub-6GHz and mmWave), Gigabit LTE, dual eSIM only (no physical SIM)" },
        { label: "Wi-Fi", value: "Wi-Fi 7 (802.11be)" },
        { label: "Bluetooth", value: "Bluetooth 6" },
        { label: "Other", value: "Apple C2 modem, second-generation Ultra Wideband, NFC, Thread" },
        { label: "Satellite", value: "Emergency SOS, Roadside Assistance, Messages and Find My via satellite" },
        { label: "Port", value: "USB-C, USB 3 speeds up to 10Gb/s" },
      ],
    },
    {
      label: "Dimensions",
      rows: [
        { label: "Size", value: "163.4 × 78.0 × 8.75 mm" },
        { label: "Weight", value: "249 g" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [
        { label: "Included", value: "iPhone 18 Pro Max, USB-C Charge Cable (1 m)" },
      ],
    },
  ],
  "iphone-duo": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "7.6\" foldable OLED inner display, 5.4\" OLED outer display" },
        { label: "Resolution", value: "Inner 1878 × 2670 at 430 ppi; outer 1398 × 2034 at 460 ppi" },
        { label: "Refresh Rate", value: "ProMotion, up to 120Hz on both displays" },
        { label: "Brightness", value: "1000 nits typical, 1600 nits HDR peak, 3000 nits peak outdoor brightness" },
        { label: "Durability", value: "Ceramic Shield 2 front, Ceramic Shield back" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Apple A20 Pro, 6-core CPU (2 performance + 4 efficiency cores)" },
        { label: "GPU", value: "7-core GPU with Neural Accelerators, hardware-accelerated ray tracing" },
        { label: "Neural Engine", value: "Dual 16-core Neural Engine" },
        { label: "Storage", value: "256GB, 512GB, 1TB or 2TB" },
      ],
    },
    {
      label: "Camera",
      rows: [
        { label: "Rear System", value: "48MP Fusion Main (26 mm, ƒ/1.6) + 12MP 2x Telephoto (52 mm, ƒ/1.6) + 48MP Fusion Ultra Wide (13 mm, ƒ/2.2)" },
        { label: "Front Camera", value: "Outer: 12MP Center Stage, ƒ/2.2. Inner: under-display camera, ƒ/1.8" },
        { label: "Video", value: "4K Dolby Vision up to 120fps; Cinematic mode up to 4K at 60fps" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Video Playback", value: "Up to 44 hours (outer display), up to 31 hours (inner display)" },
        { label: "Typical Use", value: "Up to 24 hours" },
        { label: "Fast Charge", value: "Around 50% in about 20 minutes with a 60W-capable adapter (sold separately)" },
        { label: "Wireless", value: "MagSafe and Qi2, each up to 25W" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Build", value: "Titanium foldable design with a 3D-printed hinge cover in 100% recycled titanium" },
        { label: "Water Resistance", value: "IP68 (6m for up to 30 minutes)" },
        { label: "Colours", value: "Night Sky, Star White" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Cellular", value: "5G (sub-6GHz and mmWave), Gigabit LTE, dual eSIM only (no physical SIM)" },
        { label: "Wi-Fi", value: "Wi-Fi 7" },
        { label: "Bluetooth", value: "Bluetooth 6" },
        { label: "Other", value: "Apple C2 modem, second-generation Ultra Wideband, NFC, Thread" },
        { label: "Satellite", value: "Emergency SOS, Roadside Assistance, Messages and Find My via satellite" },
        { label: "Port", value: "USB-C, USB 3 speeds up to 10Gb/s" },
      ],
    },
    {
      label: "Dimensions",
      rows: [
        { label: "Open", value: "164.6 × 117.8 × 5.2 mm" },
        { label: "Closed", value: "84.1 × 117.8 × 11.3 mm" },
        { label: "Weight", value: "254 g" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [
        { label: "Included", value: "iPhone Duo, USB-C Charge Cable (1 m)" },
      ],
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
        { label: "Resolution", value: "11-inch: 2360 × 1640; 13-inch: 2732 × 2048 (264 ppi)" },
        { label: "Brightness", value: "11-inch: 500 nits; 13-inch: 600 nits. P3 wide colour, True Tone" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Apple M4, 8-core CPU (3 performance + 5 efficiency), 9-core GPU" },
        { label: "Neural Engine", value: "16-core Neural Engine" },
        { label: "Memory", value: "12GB unified memory" },
        { label: "Storage", value: "128GB, 256GB, 512GB or 1TB" },
      ],
    },
    {
      label: "Camera",
      rows: [
        { label: "Rear", value: "12MP Wide, ƒ/1.8, 4K video up to 60fps" },
        { label: "Front", value: "12MP Center Stage, ƒ/2.0, 1080p video" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Battery Life", value: "Up to 10 hours of web browsing or video on Wi-Fi (up to 9 hours on cellular)" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Colours", value: "Blue, Purple, Starlight, Space Gray" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Wireless", value: "Wi-Fi 7, Bluetooth 6, Thread" },
        { label: "Cellular", value: "Wi-Fi + Cellular models: 5G (sub-6GHz), Gigabit LTE, eSIM only (no physical SIM)" },
        { label: "Port", value: "USB-C, USB 3 speeds up to 10Gb/s" },
        { label: "Apple Pencil", value: "Supports Apple Pencil Pro and Apple Pencil (USB-C), sold separately" },
      ],
    },
    {
      label: "Dimensions",
      rows: [
        { label: "Size", value: "11-inch: 247.6 × 178.5 × 6.1 mm; 13-inch: 280.6 × 214.9 × 6.1 mm" },
        { label: "Weight", value: "11-inch: 464 g (Wi-Fi), 465 g (cellular); 13-inch: 616 g (Wi-Fi), 617 g (cellular)" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [
        { label: "Included", value: "iPad Air, USB-C Charge Cable (1 m), 20W USB-C Power Adapter" },
      ],
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
      label: "Display",
      rows: [
        { label: "Size", value: "42mm or 46mm case, Always-On Retina LTPO3 OLED" },
        { label: "Resolution", value: "42mm: 374 × 446; 46mm: 416 × 496 (326 ppi)" },
        { label: "Brightness", value: "Up to 2000 nits peak" },
        { label: "Glass", value: "Ceramic Shield 2 on aluminum cases; sapphire crystal on titanium and ceramic cases" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Apple S11, 64-bit dual-core processor, 4-core Neural Engine" },
        { label: "Storage", value: "64GB" },
      ],
    },
    {
      label: "Health",
      rows: [
        { label: "Sensors", value: "Health Sensing System — second-generation electrical heart sensor, always-on optical heart sensor, blood oxygen sensor, temperature sensor" },
        { label: "Other Sensors", value: "Compass, always-on altimeter, high-g accelerometer, gyroscope, ambient light sensor, depth gauge (6m), water temperature sensor" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Battery Life", value: "Up to 24 hours normal use, up to 38 hours in Low Power Mode" },
        { label: "Workouts", value: "Up to 10 hours of workout tracking" },
        { label: "Fast Charge", value: "About 80% in roughly 30 minutes" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Build", value: "Aluminum (Dark Bronze, Light Gold, Black, Space Gray), titanium (Radiant Gold, Natural) or ceramic (Pearl White, Night Blue) case" },
        { label: "Water Resistance", value: "50 metres (ISO 22810:2010), IP6X dust resistance" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Cellular", value: "Optional 5G RedCap and LTE" },
        { label: "Wi-Fi", value: "Wi-Fi 4 (802.11n), 2.4GHz and 5GHz" },
        { label: "Bluetooth", value: "Bluetooth 5.3, second-generation Ultra Wideband" },
        { label: "GPS", value: "Precision L1 GPS" },
        { label: "Compatibility", value: "iPhone 11 or later running iOS 27 or later" },
      ],
    },
    {
      label: "Dimensions",
      rows: [
        { label: "Size", value: "42mm: 42 × 37 × 9.7 mm; 46mm: 46 × 40 × 9.7 mm (aluminum and titanium)" },
        { label: "Weight", value: "Aluminum GPS: 32.2 g (42mm), 39.5 g (46mm); titanium: 36.5 g (42mm), 44.9 g (46mm)" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [
        { label: "Included", value: "Apple Watch Series 12, Band, Apple Watch Magnetic Fast Charger to USB-C Cable (1 m)" },
      ],
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
      label: "Display",
      rows: [
        { label: "Size", value: "49mm case, Always-On Retina LTPO3 OLED" },
        { label: "Resolution", value: "422 × 514 (326 ppi)" },
        { label: "Brightness", value: "Up to 3000 nits peak" },
        { label: "Glass", value: "Flat sapphire crystal" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Apple S11, 64-bit dual-core processor, 4-core Neural Engine" },
        { label: "Storage", value: "64GB" },
      ],
    },
    {
      label: "Health",
      rows: [
        { label: "Sensors", value: "Second-generation electrical heart sensor, always-on optical heart sensor, blood oxygen sensor, temperature sensor" },
        { label: "Other Sensors", value: "Depth gauge, water temperature sensor, compass, always-on altimeter, high-g accelerometer, gyroscope, ambient light sensor" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Battery Life", value: "Up to 50 hours normal use, up to 84 hours in Low Power Mode" },
        { label: "Workouts", value: "Up to 18 hours (standard), 25 hours (Extended), 45 hours (Max Extended)" },
        { label: "Fast Charge", value: "About 80% in around 45 minutes" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Build", value: "Grade 5 titanium case in Natural or Black" },
        { label: "Water Resistance", value: "100 metres (ISO 22810:2010); recreational scuba to 40m with a compatible app; IP6X dust resistance" },
        { label: "Durability", value: "Tested to MIL-STD 810H" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Cellular", value: "Optional RedCap and LTE" },
        { label: "Wi-Fi", value: "Wi-Fi 4 (802.11n), 2.4GHz and 5GHz" },
        { label: "Bluetooth", value: "Bluetooth 5.3, second-generation Ultra Wideband" },
        { label: "GPS", value: "Dual-frequency GPS" },
        { label: "Compatibility", value: "iPhone 11 or later running iOS 27 or later" },
      ],
    },
    {
      label: "Dimensions",
      rows: [
        { label: "Size", value: "49 × 44 × 12 mm" },
        { label: "Weight", value: "63.0 g (Natural), 63.1 g (Black)" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [
        { label: "Included", value: "Apple Watch Ultra 4, Band, Apple Watch Magnetic Fast Charger to USB-C Cable (1 m)" },
      ],
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
        { label: "Battery Life", value: "Up to 5 hours listening (up to 4 hours with ANC on)" },
        { label: "Case", value: "Up to 30 hours total with the USB-C charging case (up to 20 hours with ANC on)" },
        { label: "Fast Charge", value: "5 minutes in the case for about 1 hour of listening" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Water Resistance", value: "IP54 dust, sweat and water resistant (earbuds and case)" },
      ],
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
      rows: [
        { label: "Included", value: "AirPods 4, USB-C Charging Case, USB-C Charge Cable" },
      ],
    },
  ],
  "airpods-5": [
    {
      label: "Audio",
      rows: [
        { label: "Chip", value: "Apple H2" },
        { label: "Noise Control", value: "Active Noise Cancellation, Adaptive Audio, Transparency, Conversation Awareness, Voice Isolation" },
        { label: "Sound", value: "Custom high-excursion Apple driver and high dynamic range amplifier, Personalized Spatial Audio with dynamic head tracking, Adaptive EQ" },
        { label: "Sensors", value: "Dual beamforming microphones, inward-facing microphone, optical in-ear sensor, motion- and speech-detecting accelerometers, force sensor" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Battery Life", value: "Up to 4 hours with ANC on, up to 6 hours with noise control off (5 and 7 hours with the Wireless Charging Case model)" },
        { label: "Case", value: "Up to 20 hours total with ANC on (22 hours with the Wireless Charging Case)" },
        { label: "Fast Charge", value: "5 minutes in the case for about 1 hour of listening" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Water Resistance", value: "IP57 dust, sweat and water resistant (not permanent; may decrease with wear)" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Bluetooth", value: "Bluetooth 5.3" },
        { label: "Charging", value: "USB-C case; the Wireless Charging Case model also charges with an Apple Watch charger or Qi-certified chargers" },
        { label: "Models", value: "AirPods 5; AirPods 5 with Wireless Charging Case" },
      ],
    },
    {
      label: "Dimensions",
      rows: [
        { label: "Earbud", value: "30.2 × 18.3 × 18.1 mm, 4.3 g" },
        { label: "Charging Case", value: "46.2 × 50.1 × 21.2 mm, 32.3 g (34.7 g for the Wireless Charging Case)" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [
        { label: "Included", value: "AirPods 5, USB-C Charging Case, documentation" },
      ],
    },
  ],
  "airpods-pro-3": [
    {
      label: "Audio",
      rows: [
        { label: "Chip", value: "Apple H2 (earbuds); second-generation Ultra Wideband chip in the MagSafe Charging Case" },
        { label: "Noise Control", value: "Active Noise Cancellation, Adaptive Audio, Transparency mode, Voice Isolation" },
        { label: "Sound", value: "Custom high-excursion Apple driver and high dynamic range amplifier, Personalized Spatial Audio with dynamic head tracking, Adaptive EQ" },
        { label: "Sensors", value: "Heart rate sensor for workouts, skin-detect sensor, dual beamforming microphones, inward-facing microphone, motion- and speech-detecting accelerometers" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Battery Life", value: "Up to 8 hours with ANC on (up to 7.5 hours with Spatial Audio and head tracking, up to 6.5 hours with heart rate sensing)" },
        { label: "Case", value: "Up to 24 hours total with ANC on" },
        { label: "Fast Charge", value: "5 minutes in the case for around 1 hour of listening" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Water Resistance", value: "IP57 dust, sweat and water resistant (earbuds and case)" },
        { label: "Ear Tips", value: "Silicone, five sizes (XXS, XS, S, M, L)" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Bluetooth", value: "Bluetooth 5.3" },
        { label: "Charging", value: "MagSafe Charging Case (USB-C) — works with MagSafe, Apple Watch and Qi-certified chargers or USB-C; includes a speaker for Find My" },
      ],
    },
    {
      label: "Dimensions",
      rows: [
        { label: "Earbud", value: "30.9 × 19.2 × 27.0 mm, 5.55 g" },
        { label: "Charging Case", value: "47.2 × 62.2 × 21.8 mm, 43.99 g" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [
        { label: "Included", value: "AirPods Pro 3, MagSafe Charging Case (USB-C), five sizes of silicone ear tips, documentation (USB-C Charge Cable sold separately)" },
      ],
    },
  ],
  "imac": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "24\" 4.5K Retina display (23.5\" actual diagonal)" },
        { label: "Resolution", value: "4480 × 2520 at 218 ppi" },
        { label: "Brightness", value: "500 nits, P3 wide colour, True Tone, 1 billion colours; nano-texture glass optional on the 12-core model" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Apple M6 with a 10-core or 12-core CPU and matching GPU" },
        { label: "Neural Engine", value: "Dual 16-core Neural Engine, Neural Accelerators, hardware-accelerated ray tracing" },
        { label: "Memory", value: "16GB unified memory (10-core: up to 24GB; 12-core: up to 32GB)" },
        { label: "Storage", value: "256GB SSD (10-core: up to 1TB; 12-core: up to 2TB)" },
      ],
    },
    {
      label: "Camera",
      rows: [
        { label: "Front", value: "12MP Center Stage camera with Desk View support, 1080p HD video" },
      ],
    },
    {
      label: "Audio",
      rows: [
        { label: "Speakers", value: "Six-speaker system with force-cancelling woofers, Spatial Audio for Dolby Atmos" },
        { label: "Microphones", value: "Three-mic array with beamforming; 3.5mm headphone jack" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Ports", value: "10-core: two Thunderbolt / USB 4 ports; 12-core: four Thunderbolt 4 ports and 2.5Gb Ethernet" },
        { label: "Wireless", value: "Wi-Fi 7, Bluetooth 6, Thread, Apple N1 wireless chip" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Colours", value: "Blue, Purple, Pink, Orange, Yellow, Green, Silver" },
      ],
    },
    {
      label: "Dimensions",
      rows: [
        { label: "Size", value: "Width 54.7 cm, height 46.1 cm" },
        { label: "Weight", value: "4.42 kg (10-core), 4.44 kg (12-core)" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [
        { label: "Included", value: "iMac, Magic Keyboard (with Touch ID on the 12-core model), Magic Mouse, 143W power adapter, 2m power cord, USB-C charge cable" },
      ],
    },
  ],
  "ipad-11": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "11\" Liquid Retina IPS display" },
        { label: "Resolution", value: "2360 × 1640 at 264 ppi" },
        { label: "Brightness", value: "500 nits, True Tone, fingerprint-resistant coating" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Apple A16, 5-core CPU, 4-core GPU, 16-core Neural Engine" },
        { label: "Storage", value: "128GB, 256GB or 512GB" },
      ],
    },
    {
      label: "Camera",
      rows: [
        { label: "Rear", value: "12MP Wide, ƒ/1.8, Smart HDR 4, 4K video up to 60fps" },
        { label: "Front", value: "12MP landscape Center Stage camera, ƒ/2.4, 1080p video" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Battery Life", value: "Up to 10 hours of web browsing or video on Wi-Fi (up to 9 hours on cellular)" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Wireless", value: "Wi-Fi 6 (802.11ax), Bluetooth 5.3; Wi-Fi + Cellular models add 5G (sub-6GHz) and Gigabit LTE (eSIM only)" },
        { label: "Port", value: "USB-C, Smart Connector" },
        { label: "Apple Pencil", value: "Supports Apple Pencil (USB-C); Apple Pencil (1st generation) with a USB-C to Apple Pencil Adapter" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Colours", value: "Silver, Blue, Pink, Yellow" },
      ],
    },
    {
      label: "Dimensions",
      rows: [
        { label: "Size", value: "248.6 × 179.5 × 7 mm" },
        { label: "Weight", value: "477 g (Wi-Fi), 481 g (Wi-Fi + Cellular)" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [
        { label: "Included", value: "iPad, USB-C Charge Cable (1 m), 20W USB-C Power Adapter" },
      ],
    },
  ],
  "airpods-max": [
    {
      label: "Audio",
      rows: [
        { label: "Chip", value: "Apple H2 headphone chip in each ear cup" },
        { label: "Noise Control", value: "Active Noise Cancellation, Transparency mode, Adaptive Audio, Conversation Awareness, Voice Isolation" },
        { label: "Sound", value: "Apple-designed dynamic driver with a custom high dynamic range amplifier, Personalized Spatial Audio with dynamic head tracking, Adaptive EQ, Personalized Volume" },
        { label: "Microphones", value: "Nine microphones — eight for Active Noise Cancellation and three for voice pickup" },
        { label: "Sensors", value: "Optical, position, case-detect and accelerometer sensors in each ear cup; gyroscope in the left ear cup" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Battery Life", value: "Up to 20 hours of listening time on a single charge with Active Noise Cancellation on" },
        { label: "Fast Charge", value: "5 minutes of charging for around 1.5 hours of listening" },
        { label: "Case", value: "Smart Case keeps the battery in an ultra-low-power state while stored" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Controls", value: "Digital Crown (volume, play/pause, calls, Siri, skip) and a listening mode button" },
        { label: "Colours", value: "Midnight, Starlight, Blue, Purple, Orange" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Bluetooth", value: "Bluetooth 5.3" },
        { label: "Wired", value: "USB-C — Lossless Audio and ultra-low-latency audio over a wired USB-C connection with compatible content" },
      ],
    },
    {
      label: "Dimensions",
      rows: [
        { label: "Size", value: "168.6 × 83.4 × 187.3 mm" },
        { label: "Weight", value: "386.2 g headphones, 134.5 g Smart Case" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [
        { label: "Included", value: "AirPods Max 2, Smart Case, USB-C Charge Cable, documentation" },
      ],
    },
  ],
  "apple-watch-hermes": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "42mm or 46mm case, Always-On Retina LTPO3 OLED" },
        { label: "Resolution", value: "42mm: 374 × 446; 46mm: 416 × 496 (326 ppi)" },
        { label: "Brightness", value: "Up to 2000 nits peak" },
        { label: "Glass", value: "Sapphire crystal" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Apple S11, 64-bit dual-core processor, 4-core Neural Engine" },
        { label: "Storage", value: "64GB" },
      ],
    },
    {
      label: "Health",
      rows: [
        { label: "Sensors", value: "Health Sensing System — second-generation electrical heart sensor, always-on optical heart sensor, blood oxygen sensor, temperature sensor" },
        { label: "Other Sensors", value: "Compass, always-on altimeter, high-g accelerometer, gyroscope, ambient light sensor, depth gauge (6m), water temperature sensor" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Battery Life", value: "Up to 24 hours normal use, up to 38 hours in Low Power Mode" },
        { label: "Workouts", value: "Up to 10 hours of workout tracking" },
        { label: "Fast Charge", value: "About 80% in roughly 30 minutes" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Build", value: "Titanium case with a Hermès band" },
        { label: "Water Resistance", value: "50 metres (ISO 22810:2010), IP6X dust resistance" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Cellular", value: "Optional 5G RedCap and LTE" },
        { label: "Wi-Fi", value: "Wi-Fi 4 (802.11n), 2.4GHz and 5GHz" },
        { label: "Bluetooth", value: "Bluetooth 5.3, second-generation Ultra Wideband" },
        { label: "GPS", value: "Precision L1 GPS" },
        { label: "Compatibility", value: "iPhone 11 or later running iOS 27 or later" },
      ],
    },
    {
      label: "Dimensions",
      rows: [
        { label: "Size", value: "42mm: 42 × 37 × 9.7 mm; 46mm: 46 × 40 × 9.7 mm" },
        { label: "Weight", value: "Titanium: 36.5 g (42mm), 44.9 g (46mm)" },
      ],
    },
  ],
  "apple-pencil": [
    {
      label: "Design",
      rows: [
        { label: "Length", value: "155 mm" },
        { label: "Diameter", value: "8.9 mm" },
        { label: "Weight", value: "20.5 g" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Features", value: "Pixel-perfect precision, low latency, tilt sensitivity; hover on select iPad Pro and iPad Air models" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Pairing", value: "Bluetooth, via the USB-C connector" },
        { label: "Charging", value: "Pairs and charges with a USB-C Charge Cable; attaches magnetically to the side of iPad for storage" },
      ],
    },
    {
      label: "Compatibility",
      rows: [
        { label: "iPad Pro", value: "13-inch (M5, M4); 12.9-inch (3rd–6th generation); 11-inch (M5, M4, 1st–4th generation)" },
        { label: "iPad Air", value: "13-inch (M4, M3, M2); 11-inch (M4, M3, M2); 4th and 5th generation" },
        { label: "iPad / iPad mini", value: "iPad (A16), iPad (10th generation), iPad mini (A17 Pro and A20 Pro), iPad mini (6th generation)" },
        { label: "Requires", value: "iPadOS 17.1.1 or later" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [
        { label: "Included", value: "Apple Pencil (USB-C)" },
      ],
    },
  ],
  "apple-pencil-pro": [
    {
      label: "Design",
      rows: [
        { label: "Length", value: "166 mm" },
        { label: "Diameter", value: "8.9 mm" },
        { label: "Weight", value: "19.15 g" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Features", value: "Squeeze to switch tools, barrel roll, haptic feedback, hover, double tap, pressure and tilt sensitivity, Find My support" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Pairing", value: "Bluetooth" },
        { label: "Charging", value: "Attaches, pairs and charges magnetically on the side of iPad" },
      ],
    },
    {
      label: "Compatibility",
      rows: [
        { label: "iPad Pro", value: "13-inch (M5, M4); 11-inch (M5, M4)" },
        { label: "iPad Air", value: "13-inch (M4, M3, M2); 11-inch (M4, M3, M2)" },
        { label: "iPad mini", value: "iPad mini (A17 Pro and A20 Pro)" },
        { label: "Requires", value: "iPadOS 17.5 or later" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [
        { label: "Included", value: "Apple Pencil Pro" },
      ],
    },
  ],
  "magic-keyboard-air": [
    {
      label: "Design",
      rows: [
        { label: "Models", value: "11-inch and 13-inch, each in White or Black" },
        { label: "Build", value: "Floating cantilever hinge with multiple viewing angles; folds into a case that protects the front and back of iPad" },
        { label: "Keys", value: "14-key function row, scissor mechanism with 1 mm key travel" },
        { label: "Trackpad", value: "Large glass trackpad with Multi-Touch gesture and iPadOS cursor support" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Connector", value: "USB-C with pass-through charging for the iPad Air, freeing the iPad's own port" },
      ],
    },
    {
      label: "Compatibility",
      rows: [
        { label: "11-inch", value: "iPad Air 11-inch (M4, M3, M2); iPad Air (5th and 4th generation)" },
        { label: "13-inch", value: "iPad Air 13-inch (M4, M3, M2)" },
        { label: "Requires", value: "iPadOS 18.3 or later" },
      ],
    },
  ],
  "magic-keyboard-pro": [
    {
      label: "Design",
      rows: [
        { label: "Models", value: "11-inch and 13-inch, each in White or Black" },
        { label: "Build", value: "Floating cantilever hinge, machined aluminum hinge and aluminum palm rest; folds into a case that protects iPad" },
        { label: "Keys", value: "Backlit keys, 14-key function row, scissor mechanism with 1 mm key travel" },
        { label: "Trackpad", value: "Large glass trackpad with haptic feedback and Multi-Touch gesture support" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Connector", value: "USB-C with pass-through charging" },
      ],
    },
    {
      label: "Compatibility",
      rows: [
        { label: "11-inch", value: "iPad Pro 11-inch (M5 and M4)" },
        { label: "13-inch", value: "iPad Pro 13-inch (M5 and M4)" },
        { label: "Requires", value: "iPadOS 17.4 or later" },
      ],
    },
  ],
  "magic-keyboard-folio": [
    {
      label: "Design",
      rows: [
        { label: "Build", value: "Two-piece design — a detachable keyboard and a back panel that attach magnetically, with an adjustable stand" },
        { label: "Keys", value: "14-key function row, scissor mechanism with 1 mm key travel" },
        { label: "Trackpad", value: "Large click-anywhere trackpad with Multi-Touch gesture and iPadOS cursor support" },
      ],
    },
    {
      label: "Compatibility",
      rows: [
        { label: "Works With", value: "iPad (A16) and iPad (10th generation)" },
        { label: "Requires", value: "iPadOS 18.3 or later" },
      ],
    },
  ],
  "magsafe-charger": [
    {
      label: "Design",
      rows: [
        { label: "Cable", value: "1 m, Model A3502" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Charging", value: "Magnetically aligned MagSafe wireless charging for compatible iPhone models" },
        { label: "Power Adapter", value: "Requires a USB-C power adapter (sold separately)" },
      ],
    },
  ],
  "power-adapter-40w": [
    {
      label: "Performance",
      rows: [
        { label: "Output", value: "40W sustained, up to 60W maximum, adjustable voltage supply" },
        { label: "Port", value: "One USB-C" },
        { label: "Input", value: "100–240V AC, 50–60Hz, single phase" },
        { label: "Model", value: "A3351" },
      ],
    },
    {
      label: "Compatibility",
      rows: [
        { label: "Fast Charging", value: "Apple says iPhone 18 Pro, iPhone 18 Pro Max and iPhone Duo fast charge with a 60W-or-higher adapter and a 60W-rated USB-C cable; iPhone 17 models need at least 40W" },
      ],
    },
  ],
  "power-adapter-35w-dual": [
    {
      label: "Performance",
      rows: [
        { label: "Output", value: "35W maximum combined across two USB-C ports" },
        { label: "Ports", value: "Two USB-C" },
        { label: "Power Sharing", value: "Mac laptop + iPhone or iPad: up to 17.5W each. iPhone + iPad: up to 17.5W each. Mac laptop or iPhone + Apple Watch or AirPods: up to 27.5W and 7.5W" },
      ],
    },
    {
      label: "Compatibility",
      rows: [
        { label: "Works With", value: "iPhone, iPad, Apple Watch, AirPods and Mac; recommended for MacBook Air and MacBook Neo" },
      ],
    },
  ],
  "usb-c-cable-240w": [
    {
      label: "Design",
      rows: [
        { label: "Length", value: "2 m" },
        { label: "Connectors", value: "USB-C on both ends" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Charging", value: "Up to 240W" },
        { label: "Data", value: "USB 2 speeds for syncing and data transfer" },
      ],
    },
  ],
  "usb-c-cable-60w": [
    {
      label: "Design",
      rows: [
        { label: "Length", value: "1 m" },
        { label: "Connectors", value: "USB-C on both ends" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Charging", value: "Up to 60W" },
        { label: "Data", value: "USB 2 speeds for syncing and data transfer" },
      ],
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
