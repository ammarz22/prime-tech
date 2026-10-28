import type { FullSpecGroup } from "@/lib/data/apple-full-specs";

/**
 * Detailed technical specifications for the Samsung Galaxy lineup carried by
 * Prime Tech. Same shape as APPLE_FULL_SPECS so both can share one lookup
 * component. Spec facts only — no reviews or marketing copy.
 *
 * Galaxy S25 / S25 Ultra were sourced from Samsung's spec pages and GSMArena on
 * 2026-09-17. Galaxy S26 / S26 Ultra, Galaxy Tab S11 / S11 Ultra, Galaxy Watch8
 * Classic, Watch9, Watch Ultra 2, Buds3 FE, Buds4 and Buds4 Pro were re-checked
 * against Samsung's own product, spec and support pages on 2026-10-28; any figure
 * Samsung doesn't publish (or that its regional pages disagree on) is left out
 * rather than estimated.
 */
export const SAMSUNG_FULL_SPECS: Record<string, FullSpecGroup[]> = {
  // -------------------------------------------------------- Galaxy Phones
  "galaxy-s25": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "6.2\"/6.7\" Dynamic AMOLED 2X" },
        { label: "Refresh Rate", value: "Adaptive, up to 120Hz" },
        { label: "Brightness", value: "Up to 2600 nits peak" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Snapdragon 8 Elite for Galaxy" },
        { label: "Memory", value: "12GB RAM, up to 512GB storage" },
      ],
    },
    {
      label: "Camera",
      rows: [
        { label: "Rear System", value: "50MP Wide (OIS) + 12MP Ultra Wide + 10MP Telephoto (3x)" },
        { label: "Front Camera", value: "12MP, ƒ/2.2" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Capacity", value: "4000/4900 mAh" },
        { label: "Charging", value: "25W/45W wired, 15W wireless" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Build", value: "Gorilla Glass Victus 2 front and back, Armor Aluminum frame" },
        { label: "Water Resistance", value: "IP68" },
        { label: "Colours", value: "Navy, Icyblue, Mint, Silver Shadow" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Cellular", value: "5G" },
        { label: "Wi-Fi", value: "Wi-Fi 7" },
        { label: "Bluetooth", value: "Bluetooth 5.4" },
        { label: "Other", value: "NFC, Ultra Wideband" },
      ],
    },
    {
      label: "Dimensions",
      rows: [
        { label: "S25", value: "146.9 × 70.5 × 7.2 mm, 162 g" },
        { label: "S25+", value: "158.4 × 75.8 × 7.3 mm, 190 g" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "Galaxy S25 or S25+, USB-C Cable" }],
    },
  ],
  "galaxy-s25-ultra": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "6.9\" Dynamic AMOLED 2X" },
        { label: "Resolution", value: "1440 × 3120" },
        { label: "Refresh Rate", value: "Adaptive, up to 120Hz, up to 2600 nits" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Snapdragon 8 Elite for Galaxy" },
        { label: "Memory", value: "12GB or 16GB RAM · up to 1TB storage" },
        { label: "Input", value: "Built-in S Pen" },
      ],
    },
    {
      label: "Camera",
      rows: [
        { label: "Rear System", value: "200MP Wide + 50MP Telephoto (5x) + 10MP Telephoto (3x) + 12MP Ultra Wide" },
        { label: "Front Camera", value: "12MP" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Capacity", value: "5000 mAh" },
        { label: "Charging", value: "45W wired, 15W wireless" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Build", value: "Titanium frame, Corning Gorilla Armor 2 flat display" },
        { label: "Water Resistance", value: "IP68" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Cellular", value: "5G" },
        { label: "Wi-Fi", value: "Wi-Fi 7" },
        { label: "Bluetooth", value: "Bluetooth 5.4" },
        { label: "Other", value: "NFC, Ultra Wideband" },
      ],
    },
    {
      label: "Dimensions",
      rows: [
        { label: "Size", value: "162.8 × 77.6 × 8.2 mm" },
        { label: "Weight", value: "218 g" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "Galaxy S25 Ultra, S Pen, USB-C Cable" }],
    },
  ],
  "galaxy-s25-edge": [
    {
      label: "Display",
      rows: [{ label: "Size", value: "6.7\" Dynamic AMOLED 2X, adaptive up to 120Hz" }],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Snapdragon 8 Elite for Galaxy" },
        { label: "Memory", value: "12GB RAM" },
      ],
    },
    {
      label: "Camera",
      rows: [{ label: "Rear System", value: "200MP Wide + 12MP Ultra Wide" }],
    },
    {
      label: "Battery",
      rows: [
        { label: "Capacity", value: "3900 mAh" },
        { label: "Charging", value: "25W wired" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Thickness", value: "5.8mm — Samsung's thinnest phone to date" },
        { label: "Build", value: "Titanium frame" },
        { label: "Water Resistance", value: "IP68" },
      ],
    },
    {
      label: "Dimensions",
      rows: [
        { label: "Size", value: "158.2 × 75.6 × 5.8 mm" },
        { label: "Weight", value: "163 g" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "Galaxy S25 Edge, USB-C Cable" }],
    },
  ],
  "galaxy-s26": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "6.3\" FHD+ (S26) or 6.7\" QHD+ (S26+) Dynamic AMOLED 2X" },
        { label: "Refresh Rate", value: "Adaptive, up to 120Hz" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Exynos 2600 (chipset varies by region)" },
        { label: "Memory", value: "12GB RAM" },
        { label: "Storage", value: "256GB or 512GB" },
      ],
    },
    {
      label: "Camera",
      rows: [
        { label: "Rear System", value: "50MP Wide + 12MP Ultra Wide + 10MP 3x Telephoto (30x Space Zoom)" },
        { label: "Front Camera", value: "12MP" },
        { label: "Video", value: "FHD/4K up to 60fps, 8K at 30fps" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Capacity", value: "4,300 mAh (S26), 4,900 mAh (S26+)" },
        { label: "Charging", value: "S26: up to 25W wired, up to 15W wireless. S26+: up to 45W wired, up to 20W wireless" },
        { label: "Wireless PowerShare", value: "Supported" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Cellular", value: "5G" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [
        { label: "Included", value: "Galaxy S26 or S26+, USB-C Cable" },
      ],
    },
  ],
  "galaxy-s26-ultra": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "6.9\" QHD+ Dynamic AMOLED 2X with built-in Privacy Display" },
        { label: "Refresh Rate", value: "Adaptive, 1–120Hz" },
        { label: "Brightness", value: "Up to 2600 nits peak" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Snapdragon 8 Elite Gen 5 for Galaxy" },
        { label: "Memory", value: "12GB RAM (256GB or 512GB) or 16GB RAM (1TB)" },
        { label: "Input", value: "Built-in S Pen" },
      ],
    },
    {
      label: "Camera",
      rows: [
        { label: "Rear System", value: "200MP Wide + 50MP Ultra Wide + 10MP 3x Telephoto + 50MP Telephoto (100x Space Zoom)" },
        { label: "Front Camera", value: "12MP" },
        { label: "Video", value: "FHD/4K up to 120fps, 8K at 30fps" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Capacity", value: "5,000 mAh (typical), up to 31 hours of video playback" },
        { label: "Charging", value: "Super Fast Charging 3.0 up to 60W wired; Super Fast Wireless Charging up to 25W" },
        { label: "Wireless PowerShare", value: "Supported" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Build", value: "Armor Aluminum frame, Corning Gorilla Armor 2 glass" },
        { label: "Water Resistance", value: "IP68" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Cellular", value: "5G" },
      ],
    },
    {
      label: "Dimensions",
      rows: [
        { label: "Thickness", value: "7.9 mm" },
        { label: "Weight", value: "214 g" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [
        { label: "Included", value: "Galaxy S26 Ultra, S Pen, USB-C Cable" },
      ],
    },
  ],
  // ---------------------------------------------------------- Galaxy Tab
  "galaxy-tab-s11": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "11\" Dynamic AMOLED 2X" },
        { label: "Refresh Rate", value: "120Hz adaptive" },
        { label: "Brightness", value: "Up to 1600 nits peak (HDR), 1000 nits in High Brightness Mode" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "MediaTek Dimensity 9400+" },
        { label: "Memory", value: "12GB RAM" },
        { label: "Storage", value: "128GB, 256GB or 512GB, microSD up to 2TB (sold separately)" },
      ],
    },
    {
      label: "Camera",
      rows: [
        { label: "Rear", value: "13MP" },
        { label: "Front", value: "12MP Ultra Wide" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Capacity", value: "8,400 mAh, up to 18 hours of video playback" },
        { label: "Charging", value: "Super Fast Charging" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Water Resistance", value: "IP68" },
        { label: "Thickness", value: "5.5 mm" },
        { label: "Weight", value: "1.03 lb" },
        { label: "Colours", value: "Gray, Silver" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Wi-Fi", value: "Wi-Fi 6E" },
        { label: "Accessories", value: "S Pen included in the box (IP68, no wireless charging slot)" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [
        { label: "Included", value: "Galaxy Tab S11, S Pen, quick start guide, SIM/microSD ejection pin, USB Type-C data cable" },
      ],
    },
  ],
  "galaxy-tab-s11-ultra": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "14.6\" Dynamic AMOLED 2X" },
        { label: "Resolution", value: "2960 × 1848" },
        { label: "Refresh Rate", value: "120Hz adaptive" },
        { label: "Brightness", value: "Up to 1600 nits peak (HDR), 1000 nits in High Brightness Mode" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "MediaTek Dimensity 9400+" },
        { label: "Memory", value: "12GB or 16GB RAM" },
        { label: "Storage", value: "256GB, 512GB or 1TB, microSD up to 2TB (sold separately)" },
      ],
    },
    {
      label: "Camera",
      rows: [
        { label: "Rear", value: "13MP + 8MP Ultra Wide" },
        { label: "Front", value: "12MP Ultra Wide" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Capacity", value: "11,600 mAh, up to 23 hours of video playback" },
        { label: "Charging", value: "Super Fast Charging" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Water Resistance", value: "IP68" },
        { label: "Thickness", value: "5.1 mm" },
        { label: "Weight", value: "1.53 lb" },
        { label: "Colours", value: "Gray, Silver" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Wi-Fi", value: "Wi-Fi 7" },
        { label: "Accessories", value: "S Pen included in the box (IP68, no wireless charging slot)" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [
        { label: "Included", value: "Galaxy Tab S11 Ultra, S Pen, quick start guide, SIM/microSD ejection pin, USB Type-C data cable" },
      ],
    },
  ],
  // -------------------------------------------------------- Galaxy Watch
  "galaxy-watch8-classic": [
    {
      label: "Display",
      rows: [
        { label: "Type", value: "1.3\" (438 × 438) Super AMOLED, up to 3000 nits, sapphire crystal, rotating bezel" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Exynos W1000" },
        { label: "Memory", value: "2GB RAM, 64GB storage" },
      ],
    },
    {
      label: "Health",
      rows: [
        { label: "Sensors", value: "BioActive Sensor — heart rate, ECG, BIA body composition, sleep apnea detection (health features vary by market)" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Battery Life", value: "445 mAh; up to 30 hours with Always On Display, up to 40 hours with it off" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Water Resistance", value: "5ATM + IP68, MIL-STD-810H" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Wi-Fi", value: "Wi-Fi, optional LTE" },
        { label: "Bluetooth", value: "Bluetooth 5.3, NFC, dual-band L1 + L5 GPS" },
      ],
    },
    {
      label: "Dimensions",
      rows: [
        { label: "Size", value: "46.0 × 46.4 × 10.6 mm (46mm)" },
        { label: "Weight", value: "63.5 g" },
      ],
    },
  ],
  "galaxy-watch9": [
    {
      label: "Display",
      rows: [
        { label: "Type", value: "40mm: 1.34\" (438 × 438); 44mm: 1.47\" (480 × 480) Super AMOLED, up to 3000 nits, sapphire crystal" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Snapdragon Wear Elite" },
        { label: "Memory", value: "2GB RAM, 32GB storage" },
      ],
    },
    {
      label: "Health",
      rows: [
        { label: "Sensors", value: "Upgraded BioActive Sensor — heart rate, heart rate variability, respiratory rate, skin temperature, blood oxygen during sleep, sleep apnea risk detection, blood pressure monitoring" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Battery Life", value: "390 mAh (40mm) / 445 mAh (44mm); up to 30 hours with Always On Display" },
        { label: "Charging", value: "WPC-based wireless charging" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Build", value: "Aluminium case" },
        { label: "Water Resistance", value: "5ATM + IP68, MIL-STD-810H" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Platform", value: "Wear OS 7 with One UI Watch" },
        { label: "Wi-Fi", value: "Wi-Fi, optional LTE" },
        { label: "Other", value: "NFC, dual-frequency GPS" },
      ],
    },
    {
      label: "Dimensions",
      rows: [
        { label: "Size", value: "40mm: 40.4 × 42.7 × 8.6 mm; 44mm: 43.7 × 46.0 × 8.6 mm" },
        { label: "Weight", value: "31.5 g (40mm), 34.0 g (44mm)" },
      ],
    },
  ],
  "galaxy-watch-ultra2": [
    {
      label: "Display",
      rows: [
        { label: "Type", value: "1.52\" (498 × 498) Super AMOLED, up to 5000 nits" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Snapdragon Wear Elite" },
        { label: "Memory", value: "2GB RAM, 64GB storage" },
      ],
    },
    {
      label: "Health",
      rows: [
        { label: "Sensors", value: "Upgraded BioActive Sensor — blood pressure measurement, blood oxygen monitoring for sleep apnea risk detection, PPG-based Vascular Load tracking" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Battery Life", value: "800 mAh; up to 60 hours with Always On Display" },
        { label: "Charging", value: "Fast Charging, up to 40% in around 30 minutes" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Build", value: "Titanium case" },
        { label: "Water Resistance", value: "10ATM + IP69K, EN13319 dive certified, MIL-STD-810H" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Platform", value: "Wear OS with One UI Watch" },
        { label: "Other", value: "Wi-Fi, NFC, dual-frequency GPS, optional LTE" },
      ],
    },
    {
      label: "Dimensions",
      rows: [
        { label: "Size", value: "47.1 × 47.4 × 10.7 mm (47mm)" },
        { label: "Weight", value: "61.5 g" },
      ],
    },
  ],
  // --------------------------------------------------------- Galaxy Buds
  "galaxy-buds3-fe": [
    {
      label: "Audio",
      rows: [
        { label: "Driver", value: "1-way 11mm dynamic driver, single amplifier" },
        { label: "Noise Cancelling", value: "Active Noise Cancellation" },
        { label: "Spatial Audio", value: "360 Audio support" },
        { label: "Codecs", value: "AAC, SBC, SSC (Samsung Seamless Codec)" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Battery Life", value: "Up to 6 hours with ANC on (up to 8.5 hours with ANC off)" },
        { label: "Case", value: "Up to 24 hours total with ANC on (up to 30 hours with ANC off)" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Water Resistance", value: "IP54 dust and water resistant" },
        { label: "Weight", value: "About 5 g per earbud, about 41.8 g case" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Bluetooth", value: "Bluetooth 5.4, Auto Switch" },
        { label: "Charging", value: "Wireless charging not supported" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [
        { label: "Included", value: "Galaxy Buds3 FE, Charging Case (charging cable not included)" },
      ],
    },
  ],
  "galaxy-buds4": [
    {
      label: "Audio",
      rows: [
        { label: "Driver", value: "1-way 11mm dynamic driver, single amplifier" },
        { label: "Noise Cancelling", value: "Active Noise Cancellation with Adaptive ANC" },
        { label: "Spatial Audio", value: "360 Audio with head tracking" },
        { label: "Codecs", value: "SSC-UHQ (24-bit/96kHz), SSC, AAC, SBC, LC3" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Battery Life", value: "Up to 5 hours with ANC on (up to 6 hours with ANC off)" },
        { label: "Case", value: "Up to 24 hours total with ANC on (up to 30 hours with ANC off)" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Water Resistance", value: "IP54 dust and water resistant (earbuds only)" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Bluetooth", value: "Bluetooth 6.1, LE Audio, Auracast" },
        { label: "Charging", value: "Wireless-charging case" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [
        { label: "Included", value: "Galaxy Buds4, Charging Case, Quick Start Guide (charger and USB Type-C cable not included)" },
      ],
    },
  ],
  "galaxy-buds4-pro": [
    {
      label: "Audio",
      rows: [
        { label: "Driver", value: "2-way speaker (woofer and tweeter), dual amplifiers" },
        { label: "Noise Cancelling", value: "Adaptive Active Noise Cancellation" },
        { label: "Spatial Audio", value: "360 Audio with head tracking" },
        { label: "Codecs", value: "Samsung Seamless Codec up to 24-bit/96kHz" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Battery Life", value: "Up to 6 hours with ANC on (up to 7 hours with ANC off)" },
        { label: "Case", value: "Up to 26 hours total with ANC on (up to 30 hours with ANC off)" },
        { label: "Capacity", value: "61 mAh per earbud, 530 mAh case" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Water Resistance", value: "IP57 dust and water resistant" },
        { label: "Weight", value: "5.1 g per earbud" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Bluetooth", value: "Bluetooth 6.1, LE Audio, Auto Switch" },
        { label: "Charging", value: "Wired and wireless charging" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [
        { label: "Included", value: "Galaxy Buds4 Pro, Charging Case, ear tips (S/M/L); USB Type-C cable not included" },
      ],
    },
  ],
  // ---------------------------------------------------------- Accessories
  "accessories-25w-power-adapter": [
    {
      label: "Performance",
      rows: [{ label: "Output", value: "25W USB-C Power Delivery / Super Fast Charging" }],
    },
    {
      label: "Compatibility",
      rows: [{ label: "Works With", value: "Galaxy phones, tablets and other USB-C devices" }],
    },
  ],
  "accessories-galaxy-smarttag2": [
    {
      label: "Design",
      rows: [{ label: "Battery", value: "Replaceable CR2032 battery, up to 500 days typical use" }],
    },
    {
      label: "Connectivity",
      rows: [{ label: "Network", value: "Bluetooth Low Energy, Ultra Wideband precision finding, Galaxy Find network" }],
    },
  ],
  "accessories-s-pen-tab-s11": [
    {
      label: "Design",
      rows: [{ label: "Compatibility", value: "Galaxy Tab S11 series" }],
    },
    {
      label: "Performance",
      rows: [{ label: "Features", value: "Pressure-sensitive tip, low-latency Bluetooth-free pairing" }],
    },
  ],
};
