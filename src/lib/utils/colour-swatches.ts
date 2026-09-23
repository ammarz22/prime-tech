/**
 * Approximate real-world hex swatches for known Apple/Samsung colour names,
 * so colour pills can show an actual colour dot rather than text alone.
 * Exact matches first, then a keyword fallback for names not in the table
 * (e.g. a future colour) — always an honest approximation of the named
 * colour family, never an invented one.
 */
const EXACT_SWATCHES: Record<string, string> = {
  black: "#1d1d1f",
  white: "#f5f5f0",
  silver: "#e3e4e5",
  gold: "#f0e2ce",
  graphite: "#54524f",
  "space grey": "#55565a",
  "space gray": "#55565a",
  "space black": "#3a3a3c",
  starlight: "#f0e6d8",
  midnight: "#1b1b1f",
  "deep blue": "#1c3a5e",
  "mist blue": "#a9c4d8",
  sage: "#a8b79a",
  lavender: "#cdb9e0",
  "cosmic orange": "#d76b3c",
  "soft pink": "#f0c9cf",
  // Samsung — matched to the finishes shown in the product photos
  "titanium silverblue": "#aab8cc",
  "titanium whitesilver": "#e6e3dd",
  "titanium gray": "#b5b1a8",
  "titanium black": "#34363a",
  "titanium jadegreen": "#a9bfa8",
  "titanium jetblack": "#262a30",
  "titanium pinkgold": "#e9cdbf",
  "titanium icy blue": "#cfd9ea",
  "titanium jet black": "#1f2124",
  "titanium silver": "#dcdcde",
  "pink gold": "#ecd0c0",
  "silver shadow": "#a5a7ab",
  "blue black": "#262b36",
  "coral red": "#e8635a",
  "icy blue": "#cdd9ee",
  mint: "#b9e0cc",
  navy: "#22335a",
  "cobalt violet": "#5a4f86",
  "sky blue": "#a9d0e6",
  gray: "#8e9095",
  grey: "#8e9095",
  "cream (40mm)": "#efe6d6",
  "graphite (40mm)": "#3a3b3e",
  "graphite (44mm)": "#3a3b3e",
  "silver (44mm)": "#d6d8da",
  // Apple Watch aluminum/titanium finish tiers (Series 11 & 12)
  "aluminum — jet black": "#2b2b2d",
  "aluminum — rose gold": "#e8bfae",
  "aluminum — silver": "#e3e4e5",
  "aluminum — space gray": "#55565a",
  "aluminum — olive": "#6e6650",
  "aluminum — slate": "#8a8d90",
  "titanium — gold": "#c8a86a",
  "titanium — natural": "#c9c2b6",
  "titanium — slate": "#6d6d70",
  "natural titanium": "#c9c2b6",
  "black titanium": "#3a3a3c",
  // Apple Watch Series 12 Ceramic
  "ceramic — white": "#f0ece4",
  "ceramic — blue": "#9eabc6",
  // MacBook Neo
  blush: "#e7c9c2",
  citrus: "#e8c05a",
  indigo: "#4b4f7a",
  // iPhone 18 series
  "glacier blue": "#a9c4d8",
  burgundy: "#5c2331",
  "deep black": "#161717",
  // iPhone Duo
  "star white": "#ece8e0",
  "night sky": "#20222b",
  // iMac (2026 colourways)
  blue: "#5a8fd6",
  purple: "#a98fc7",
  pink: "#f0a8b8",
  yellow: "#f0d060",
  green: "#8fbf8a",
  // iPhone Air
  "light gold": "#e8dcc4",
  // Apple Watch Hermès
  noir: "#1d1d1f",
};

const KEYWORD_SWATCHES: [RegExp, string][] = [
  [/black|midnight|graphite/i, "#1d1d1f"],
  [/white|starlight/i, "#f0ece4"],
  [/silver|titanium/i, "#d6d8da"],
  [/gold/i, "#f0e2ce"],
  [/blue/i, "#3f6fa8"],
  [/green|sage/i, "#8a9a7a"],
  [/pink/i, "#eec7cf"],
  [/purple|violet|lavender/i, "#8e7ab5"],
  [/orange/i, "#d76b3c"],
  [/red/i, "#a8342a"],
  [/yellow/i, "#e8c96b"],
];

export function getColourSwatch(colourName: string | null | undefined): string | null {
  if (!colourName) return null;
  const key = colourName.trim().toLowerCase();
  if (EXACT_SWATCHES[key]) return EXACT_SWATCHES[key];
  for (const [pattern, hex] of KEYWORD_SWATCHES) {
    if (pattern.test(key)) return hex;
  }
  return null;
}
