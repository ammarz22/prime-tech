import { Cpu, Smartphone, BatteryCharging, Camera, Wifi, Volume2, Ruler, Gift, Sparkles } from "lucide-react";
import { getFullSpecs } from "@/lib/data/product-specs";

/** Picks an icon for a spec group by its real label — purely presentational,
 * never affects what fact is shown. */
function groupIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes("display")) return Smartphone;
  if (l.includes("camera")) return Camera;
  if (l.includes("performance") || l.includes("chip")) return Cpu;
  if (l.includes("battery")) return BatteryCharging;
  if (l.includes("connectivity") || l.includes("network")) return Wifi;
  if (l.includes("audio") || l.includes("sound")) return Volume2;
  if (l.includes("dimension") || l.includes("design")) return Ruler;
  if (l.includes("box")) return Gift;
  return Sparkles;
}

/**
 * The reference design's 4-icon highlight strip — but built from whatever
 * real verified spec groups this specific product actually has (the first
 * row of each), rather than always forcing exactly 4 tiles. A product with
 * 3 verified groups shows 3; one with none shows nothing, never a
 * fabricated "Weight: —" filler.
 */
export function ProductHighlightRow({ slug }: { slug: string }) {
  const groups = getFullSpecs(slug);
  if (!groups || groups.length === 0) return null;

  const tiles = groups.map((group) => ({ ...group.rows[0], groupLabel: group.label })).filter((t) => t.label);
  if (tiles.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4 border-t border-ink/8 py-8 sm:grid-cols-4">
      {tiles.map((tile) => {
        const Icon = groupIcon(tile.groupLabel);
        return (
          <div key={tile.groupLabel} className="flex items-start gap-3">
            <Icon className="mt-0.5 size-5 shrink-0 text-brand" strokeWidth={1.5} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">{tile.value.split(" — ")[0].split(",")[0]}</p>
              <p className="text-xs text-ink/50">{tile.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
