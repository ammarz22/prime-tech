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
  starlight: "#f0e6d8",
  midnight: "#1b1b1f",
  "deep blue": "#1c3a5e",
  "mist blue": "#a9c4d8",
  sage: "#a8b79a",
  lavender: "#cdb9e0",
  "cosmic orange": "#d76b3c",
  "soft pink": "#f0c9cf",
  "titanium silverblue": "#9fb2c2",
  "titanium whitesilver": "#e8e6e1",
  "titanium gray": "#6d6d70",
  "titanium black": "#3a3a3c",
  "cobalt violet": "#4b3f6b",
  "sky blue": "#a9c9dc",
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
