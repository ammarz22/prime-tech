import type { FullSpecGroup } from "@/lib/data/apple-full-specs";

/**
 * Detailed technical specifications for the current Samsung Galaxy S25/S26
 * lineup, sourced from Samsung's own spec pages and GSMArena as of
 * 2026-08-24. Same shape as APPLE_FULL_SPECS so both can share one lookup
 * component. Spec facts only — no reviews or marketing copy.
 */
export const SAMSUNG_FULL_SPECS: Record<string, FullSpecGroup[]> = {
  "galaxy-s25": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "6.2\" Dynamic AMOLED 2X" },
        { label: "Refresh Rate", value: "Adaptive, up to 120Hz" },
      ],
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
      rows: [{ label: "Rear System", value: "50MP Wide + 12MP Ultra Wide + 10MP Telephoto" }],
    },
    {
      label: "Battery",
      rows: [{ label: "Capacity", value: "4000 mAh" }],
    },
  ],
  "galaxy-s25-plus": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "6.7\" Dynamic AMOLED 2X" },
        { label: "Refresh Rate", value: "Adaptive, up to 120Hz" },
      ],
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
      rows: [{ label: "Rear System", value: "50MP Wide + 12MP Ultra Wide + 10MP Telephoto" }],
    },
    {
      label: "Battery",
      rows: [{ label: "Battery Life", value: "Up to 30 hours video playback" }],
    },
  ],
  "galaxy-s25-ultra": [
    {
      label: "Display",
      rows: [
        { label: "Size", value: "6.9\" Dynamic AMOLED 2X" },
        { label: "Refresh Rate", value: "Adaptive, up to 120Hz" },
      ],
    },
    {
      label: "Performance",
      rows: [
        { label: "Chip", value: "Snapdragon 8 Elite for Galaxy" },
        { label: "Memory", value: "12GB or 16GB RAM, up to 1TB storage" },
        { label: "Input", value: "Built-in S Pen" },
      ],
    },
    {
      label: "Camera",
      rows: [{ label: "Rear System", value: "200MP Wide + 50MP Telephoto + 10MP Telephoto + 12MP Ultra Wide" }],
    },
    {
      label: "Battery",
      rows: [{ label: "Capacity", value: "5000 mAh" }],
    },
  ],
  "galaxy-s25-edge": [
    {
      label: "Display",
      rows: [{ label: "Size", value: "6.7\" Dynamic AMOLED 2X" }],
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
      rows: [{ label: "Rear System", value: "Dual — Wide + Ultra Wide" }],
    },
    {
      label: "Design & Battery",
      rows: [
        { label: "Thickness", value: "5.8mm — Samsung's thinnest phone to date" },
        { label: "Capacity", value: "3900 mAh" },
      ],
    },
  ],
  "galaxy-s26": [
    {
      label: "Display",
      rows: [{ label: "Size", value: "6.3\" display" }],
    },
    {
      label: "Performance",
      rows: [{ label: "Chip", value: "Exynos 2600" }],
    },
    {
      label: "Camera",
      rows: [{ label: "Rear System", value: "50MP main camera" }],
    },
    {
      label: "Battery",
      rows: [{ label: "Capacity", value: "4300 mAh (typical)" }],
    },
  ],
  "galaxy-s26-plus": [
    {
      label: "Display",
      rows: [{ label: "Size", value: "6.7\" display" }],
    },
    {
      label: "Performance",
      rows: [{ label: "Chip", value: "Exynos 2600" }],
    },
    {
      label: "Camera",
      rows: [{ label: "Rear System", value: "50MP main camera" }],
    },
    {
      label: "Battery",
      rows: [{ label: "Capacity", value: "4900 mAh (typical)" }],
    },
  ],
  "galaxy-s26-ultra": [
    {
      label: "Display",
      rows: [{ label: "Size", value: "6.9\" display" }],
    },
    {
      label: "Performance",
      rows: [{ label: "Chip", value: "Snapdragon 8 Elite Gen 5 for Galaxy" }],
    },
    {
      label: "Camera",
      rows: [{ label: "Rear System", value: "200MP camera system" }],
    },
    {
      label: "Battery",
      rows: [
        { label: "Capacity", value: "5000 mAh (typical)" },
        { label: "Charging", value: "Up to 60W wired" },
      ],
    },
  ],
};
