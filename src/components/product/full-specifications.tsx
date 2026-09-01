import { getFullSpecs } from "@/lib/data/product-specs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

/** Renders the detailed, accordion-grouped spec sheet for a product, when
 * verified spec data exists for its slug. */
export function FullSpecifications({ slug }: { slug: string }) {
  const groups = getFullSpecs(slug);
  if (!groups) return null;

  return (
    <div className="border-t border-ink/8 py-14">
      <h2 className="text-xl font-semibold">Full Specifications</h2>
      <p className="mt-1.5 text-sm text-ink/50">Sourced from official manufacturer specifications.</p>

      <Accordion className="mt-8" defaultValue={[groups[0]?.label]}>
        {groups.map((group) => (
          <AccordionItem key={group.label} value={group.label}>
            <AccordionTrigger className="py-4 text-sm font-semibold uppercase tracking-wide text-brand">
              {group.label}
            </AccordionTrigger>
            <AccordionContent className="pb-5">
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
        ))}
      </Accordion>
    </div>
  );
}
