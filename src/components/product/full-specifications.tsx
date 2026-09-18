import { Cpu, Smartphone, BatteryCharging, Camera, Wifi, Volume2, Ruler, Gift, Sparkles } from "lucide-react";
import { getFullSpecs } from "@/lib/data/product-specs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

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

/** Renders the detailed, accordion-grouped spec sheet for a product, when
 * verified spec data exists for its slug. Groups render in a two-column
 * grid at desktop width — however many real groups this product actually
 * has, never padded out to match a fixed count. */
export function FullSpecifications({ slug }: { slug: string }) {
  const groups = getFullSpecs(slug);
  if (!groups) return null;

  return (
    <div className="border-t border-ink/8 py-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Specifications</h2>
          <p className="mt-1.5 text-sm text-ink/50">Sourced from official manufacturer specifications.</p>
        </div>
      </div>

      <Accordion className="mt-8 grid grid-cols-1 items-start gap-x-8 gap-y-3 sm:grid-cols-2" defaultValue={[]}>
        {groups.map((group) => {
          const Icon = groupIcon(group.label);
          return (
            <AccordionItem key={group.label} value={group.label} className="not-last:border-b-0">
              <AccordionTrigger className="rounded-xl border border-ink/8 px-4 py-3.5 text-sm font-medium text-ink hover:no-underline">
                <span className="flex items-center gap-3">
                  <Icon className="size-4.5 text-ink/50" strokeWidth={1.5} />
                  {group.label}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pt-3">
                <dl className="divide-y divide-ink/6 rounded-2xl border border-ink/8">
                  {group.rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                    >
                      <dt className="shrink-0 text-sm text-ink/50 sm:w-36">{row.label}</dt>
                      <dd className="text-sm font-medium text-ink sm:text-right">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
