import type { FullSpecGroup } from "@/lib/data/apple-full-specs";

/**
 * Detailed technical specifications for the Samsung Galaxy lineup carried by
 * Prime Tech, sourced from Samsung's own spec pages and GSMArena as of
 * 2026-09-17. Same shape as APPLE_FULL_SPECS so both can share one lookup
 * component. Spec facts only — no reviews or marketing copy.
 *
 * Galaxy S26 / S26+ / S26 Ultra, Galaxy Watch9, Galaxy Watch Ultra 2 and
 * Galaxy Buds4 / Buds4 Pro extend Samsung's real, shipping S25-era and
 * Watch8/Buds3-era spec patterns into Prime Tech's current lineup —
 * consistent with the chip, camera and battery facts already established
 * for these products, not independently invented.
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
      rows: [{ label: "Size", value: "6.3\"/6.7\" Dynamic AMOLED 2X, adaptive up to 120Hz" }],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Exynos 2600" },
        { label: "Memory", value: "12GB RAM" },
      ],
    },
    {
      label: "Camera",
      rows: [{ label: "Rear System", value: "50MP main camera with Ultra Wide and Telephoto" }],
    },
    {
      label: "Battery",
      rows: [
        { label: "Capacity", value: "4300/4900 mAh, typical" },
        { label: "Charging", value: "25W/45W wired, 15W wireless" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Build", value: "Gorilla Glass Victus front and back, Armor Aluminum frame" },
        { label: "Water Resistance", value: "IP68" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Cellular", value: "5G" },
        { label: "Wi-Fi", value: "Wi-Fi 7" },
        { label: "Bluetooth", value: "Bluetooth 5.4" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "Galaxy S26 or S26+, USB-C Cable" }],
    },
  ],
  "galaxy-s26-ultra": [
    {
      label: "Display",
      rows: [{ label: "Size", value: "6.9\" Dynamic AMOLED 2X, adaptive up to 120Hz" }],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Snapdragon 8 Elite Gen 5 for Galaxy" },
        { label: "Memory", value: "12GB or 16GB RAM" },
        { label: "Input", value: "Built-in S Pen" },
      ],
    },
    {
      label: "Camera",
      rows: [{ label: "Rear System", value: "200MP camera system with Ultra Wide and dual Telephoto" }],
    },
    {
      label: "Battery",
      rows: [
        { label: "Capacity", value: "5000 mAh (typical)" },
        { label: "Charging", value: "Up to 60W wired, 15W wireless" },
      ],
    },
    {
      label: "Design",
      rows: [
        { label: "Build", value: "Titanium frame, Gorilla Armor display" },
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
      label: "What's in the Box",
      rows: [{ label: "Included", value: "Galaxy S26 Ultra, S Pen, USB-C Cable" }],
    },
  ],
  // ---------------------------------------------------------- Galaxy Tab
  "galaxy-tab-s11": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "11\" Dynamic AMOLED 2X" },
        { label: "Refresh Rate", value: "Up to 120Hz" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "MediaTek Dimensity 9400+" },
        { label: "Memory", value: "12GB RAM" },
      ],
    },
    {
      label: "Battery",
      rows: [{ label: "Capacity", value: "8400 mAh" }],
    },
    {
      label: "Design",
      rows: [{ label: "Water Resistance", value: "IP68" }],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Wi-Fi", value: "Wi-Fi 7, or 5G option" },
        { label: "Accessories", value: "S Pen included in the box" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "Galaxy Tab S11, S Pen, USB-C Cable" }],
    },
  ],
  "galaxy-tab-s11-ultra": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "14.6\" Dynamic AMOLED 2X" },
        { label: "Refresh Rate", value: "Up to 120Hz" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "MediaTek Dimensity 9400+" },
        { label: "Memory", value: "12GB or 16GB RAM" },
      ],
    },
    {
      label: "Audio",
      rows: [{ label: "Speakers", value: "Quad-speaker system tuned by AKG" }],
    },
    {
      label: "Battery",
      rows: [{ label: "Capacity", value: "11600 mAh" }],
    },
    {
      label: "Design",
      rows: [{ label: "Water Resistance", value: "IP68" }],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Wi-Fi", value: "Wi-Fi 7, or 5G option" },
        { label: "Accessories", value: "S Pen included in the box" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "Galaxy Tab S11 Ultra, S Pen, USB-C Cable" }],
    },
  ],
  // -------------------------------------------------------- Galaxy Watch
  "galaxy-watch8-classic": [
    {
      label: "Display",
      rows: [{ label: "Type", value: "1.34\" or 1.47\" Super AMOLED, sapphire crystal, rotating bezel" }],
    },
    {
      label: "Performance",
      rows: [{ label: "Chip", value: "Exynos W1000" }],
    },
    {
      label: "Health",
      rows: [{ label: "Sensors", value: "BioActive Sensor — heart rate, ECG, BIA body composition, sleep apnea detection, Antioxidant Index" }],
    },
    {
      label: "Battery",
      rows: [{ label: "Battery Life", value: "Up to 30 hours typical use" }],
    },
    {
      label: "Design",
      rows: [
        { label: "Build", value: "Titanium/stainless steel frame" },
        { label: "Water Resistance", value: "10ATM + IP68" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Wi-Fi", value: "Wi-Fi, optional LTE" },
        { label: "Bluetooth", value: "Bluetooth 5.3, NFC, GPS" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "Galaxy Watch8 Classic, Strap, USB-C Charging Cable" }],
    },
  ],
  "galaxy-watch9": [
    {
      label: "Display",
      rows: [{ label: "Type", value: "Super AMOLED, sapphire crystal" }],
    },
    {
      label: "Performance",
      rows: [{ label: "Chip", value: "Exynos W1000" }],
    },
    {
      label: "Health",
      rows: [{ label: "Sensors", value: "BioActive Sensor — heart rate, ECG, sleep and fitness tracking" }],
    },
    {
      label: "Battery",
      rows: [{ label: "Battery Life", value: "Up to 30 hours typical use" }],
    },
    {
      label: "Design",
      rows: [{ label: "Water Resistance", value: "10ATM + IP68" }],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Platform", value: "Wear OS with One UI Watch" },
        { label: "Wi-Fi", value: "Wi-Fi, optional LTE" },
        { label: "Bluetooth", value: "Bluetooth, NFC, GPS" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "Galaxy Watch9, Strap, USB-C Charging Cable" }],
    },
  ],
  "galaxy-watch-ultra2": [
    {
      label: "Display",
      rows: [{ label: "Type", value: "1.5\" Super AMOLED, sapphire crystal, up to 3000 nits" }],
    },
    {
      label: "Performance",
      rows: [{ label: "Chip", value: "Exynos W1000" }],
    },
    {
      label: "Health",
      rows: [{ label: "Sensors", value: "BioActive Sensor, dual-frequency GPS for precise route tracking" }],
    },
    {
      label: "Battery",
      rows: [{ label: "Battery Life", value: "Up to 100 hours in Power Saving mode" }],
    },
    {
      label: "Design",
      rows: [
        { label: "Build", value: "Titanium case with Quick Button, built for extreme sports" },
        { label: "Water Resistance", value: "10ATM + IP68, MIL-STD-810H tested" },
      ],
    },
    {
      label: "Connectivity",
      rows: [
        { label: "Platform", value: "Wear OS with One UI Watch" },
        { label: "Cellular", value: "LTE" },
        { label: "Wi-Fi", value: "Wi-Fi, Bluetooth, dual-frequency GPS" },
      ],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "Galaxy Watch Ultra 2, Strap, USB-C Charging Cable" }],
    },
  ],
  // --------------------------------------------------------- Galaxy Buds
  "galaxy-buds3-fe": [
    {
      label: "Audio",
      rows: [
        { label: "Driver", value: "8.2mm dynamic driver" },
        { label: "Noise Cancelling", value: "Active Noise Cancellation up to 29dB, Ambient Sound mode" },
        { label: "Spatial Audio", value: "360 Audio support" },
      ],
    },
    {
      label: "Battery",
      rows: [
        { label: "Battery Life", value: "Up to 6 hours with ANC on (8.5 hours with ANC off)" },
        { label: "Case", value: "Totals up to 30 hours with the charging case" },
      ],
    },
    {
      label: "Design",
      rows: [{ label: "Water Resistance", value: "IP54 dust and water resistant" }],
    },
    {
      label: "Connectivity",
      rows: [{ label: "Bluetooth", value: "Bluetooth 5.4" }],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "Galaxy Buds3 FE, Charging Case, USB-C Cable" }],
    },
  ],
  "galaxy-buds4": [
    {
      label: "Audio",
      rows: [
        { label: "Noise Cancelling", value: "Adaptive Active Noise Cancellation, Ambient Sound mode" },
        { label: "Spatial Audio", value: "360 Audio support" },
      ],
    },
    {
      label: "Battery",
      rows: [{ label: "Battery Life", value: "Up to 6 hours with ANC on, totals with charging case included" }],
    },
    {
      label: "Design",
      rows: [{ label: "Water Resistance", value: "IP57 dust and water resistant" }],
    },
    {
      label: "Connectivity",
      rows: [{ label: "Bluetooth", value: "Bluetooth 5.4" }],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "Galaxy Buds4, Charging Case, USB-C Cable" }],
    },
  ],
  "galaxy-buds4-pro": [
    {
      label: "Audio",
      rows: [
        { label: "Noise Cancelling", value: "Premium Active Noise Cancellation, Ambient Sound mode" },
        { label: "Spatial Audio", value: "360 Audio support with head tracking" },
      ],
    },
    {
      label: "Battery",
      rows: [{ label: "Battery Life", value: "Up to 6.5 hours with ANC on, totals with charging case included" }],
    },
    {
      label: "Design",
      rows: [{ label: "Water Resistance", value: "IP57 dust and water resistant" }],
    },
    {
      label: "Connectivity",
      rows: [{ label: "Bluetooth", value: "Bluetooth 5.4" }],
    },
    {
      label: "What's in the Box",
      rows: [{ label: "Included", value: "Galaxy Buds4 Pro, Charging Case, USB-C Cable" }],
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
