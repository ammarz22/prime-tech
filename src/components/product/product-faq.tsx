import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { generateProductFaqs } from "@/lib/data/product-faqs";
import type { ProductWithRelations, Branch } from "@/types/database";

export function ProductFaq({ product, branches }: { product: ProductWithRelations; branches: Branch[] }) {
  const faqs = generateProductFaqs(product, branches);
  if (faqs.length === 0) return null;

  return (
    <div className="border-t border-ink/8 py-14">
      <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
      <Accordion className="mt-6" defaultValue={[]}>
        {faqs.map((faq) => (
          <AccordionItem key={faq.question} value={faq.question}>
            <AccordionTrigger className="py-4 text-base">{faq.question}</AccordionTrigger>
            <AccordionContent className="pb-5 leading-relaxed text-ink/60">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
