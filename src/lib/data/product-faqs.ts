import type { ProductWithRelations, Branch } from "@/types/database";

export interface ProductFaq {
  question: string;
  answer: string;
}

function unique<T>(values: (T | null | undefined)[]): T[] {
  return Array.from(new Set(values.filter((v): v is T => Boolean(v))));
}

/**
 * Category-aware, templated FAQ built entirely from the product's own
 * real data (variants, availability, branches) — never an invented claim
 * about warranty terms or exact box contents we haven't confirmed.
 */
export function generateProductFaqs(product: ProductWithRelations, branches: Branch[]): ProductFaq[] {
  const faqs: ProductFaq[] = [];

  const storageOptions = unique(product.variants.map((v) => v.storage));
  if (storageOptions.length > 0) {
    faqs.push({
      question: "What storage options are available?",
      answer: `${product.name} is available in ${storageOptions.join(", ")}. Exact availability per configuration is confirmed at enquiry.`,
    });
  }

  const colourOptions = unique(product.variants.map((v) => v.colour));
  if (colourOptions.length > 0) {
    faqs.push({
      question: "What colours are available?",
      answer: `${colourOptions.join(", ")}. Confirm current colour stock with Prime Tech at enquiry.`,
    });
  }

  faqs.push({
    question: "What is included in the box?",
    answer: `${product.name} ships in the manufacturer's standard retail packaging. Ask Prime Tech at enquiry to confirm exact box contents for your configuration.`,
  });

  const availability = product.variants[0]?.availability;
  faqs.push({
    question: "Is this product currently available?",
    answer:
      availability === "in_stock"
        ? `Yes — ${product.name} is currently in stock at Prime Tech.`
        : availability === "out_of_stock"
          ? `${product.name} is temporarily out of stock. Enquire to be notified when it's back.`
          : `Availability is confirmed at enquiry — reach out and Prime Tech will let you know current stock for ${product.name}.`,
  });

  faqs.push({
    question: "What warranty applies?",
    answer: `Prime Tech honours the manufacturer's standard warranty on ${product.name}. Ask at enquiry for full terms.`,
  });

  if (branches.length > 0) {
    const names = branches.map((b) => b.name).join(", ");
    faqs.push({
      question: "Where can I collect the product?",
      answer: `Select a preferred branch when you enquire. Prime Tech branches: ${names}.`,
    });
  }

  return faqs;
}
