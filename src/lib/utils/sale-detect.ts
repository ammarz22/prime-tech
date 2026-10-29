import type { SaleKind } from "@/types/database";

/** Words that mean "this is an accessory", even when a phone name appears in the text. */
const ACCESSORY_WORDS =
  /\b(case|cover|protector|protecter|protection|temper(ed)?|glass|film|charger|charging|adapter|adaptor|cable|cord|earbuds?|earphones?|headphones?|airpods?|buds|watch|band|strap|power\s?bank|stand|holder|mount|pencil|keyboard|mouse|dongle|memory\s?card|sd\s?card|sim|screen)\b/i;

const PHONE_NAMES =
  /\b(i\s?phone|galaxy\s?(s|z|a|m|note|fold|flip)?\s?\d+|samsung\s+(s|z|a)\d+|pixel\s?\d+|one\s?plus|xiaomi|redmi|poco|oppo|vivo|realme|huawei|honor|nothing\s?phone)\b/i;

/**
 * Looks at an invoice line and decides whether it is a phone or an accessory.
 * An IMEI always means a phone; accessory words ("cover", "charger"…) win over
 * a phone name in the text ("iPhone 17 Pro case"); a bare phone name is a phone;
 * everything else is an accessory.
 */
export function detectSaleKind(desc: string): SaleKind {
  const text = desc ?? "";
  if (/\bimei\b/i.test(text)) return "phone";
  if (ACCESSORY_WORDS.test(text)) return "accessory";
  if (PHONE_NAMES.test(text)) return "phone";
  return "accessory";
}

/** Picks the closest accessory type from the settings list (falls back to "Other" or blank). */
export function guessAccessoryType(desc: string, types: string[]): string {
  const rules: [RegExp, RegExp][] = [
    [/\b(case|cover)\b/i, /case|cover/i],
    [/\b(protector|protecter|temper(ed)?|glass|film|screen)\b/i, /protector|screen/i],
    [/\b(charger|adapter|adaptor|charging)\b/i, /charger|adapter/i],
    [/\b(cable|cord)\b/i, /cable/i],
    [/\b(earbuds?|earphones?|headphones?|airpods?|buds)\b/i, /ear|head|buds/i],
    [/\bpower\s?bank\b/i, /power\s?bank/i],
    [/\b(watch|band|strap)\b/i, /watch/i],
    [/\b(memory\s?card|sd\s?card)\b/i, /memory/i],
    [/\b(stand|holder|mount)\b/i, /stand|holder/i],
  ];
  for (const [wordsInDesc, typeName] of rules) {
    if (wordsInDesc.test(desc)) {
      const match = types.find((t) => typeName.test(t));
      if (match) return match;
    }
  }
  return types.find((t) => /^other$/i.test(t)) ?? "";
}

export interface ParsedPhone {
  model: string;
  storage: string;
  colour: string;
  modelNo: string;
  serialNo: string;
  imei: string;
}

/**
 * Reads the standard phone line the invoices use:
 * `iPhone 17 Pro 256GB – Silver | Model A3256 | Serial No. DKF092HGWL | IMEI: 355175317979863`.
 * Anything it can't make sense of just stays in `model`.
 */
export function parsePhoneDescription(desc: string): ParsedPhone {
  const parts = (desc ?? "").split("|").map((p) => p.trim()).filter(Boolean);
  const head = parts[0] ?? "";

  const out: ParsedPhone = { model: head, storage: "", colour: "", modelNo: "", serialNo: "", imei: "" };

  const [namePart, ...colourParts] = head.split(/\s[–—-]\s/);
  out.colour = colourParts.join(" - ").trim();
  const storage = namePart.match(/\b(\d{2,4}\s?(?:GB|TB))\b/i);
  if (storage) {
    out.storage = storage[1].replace(/\s+/g, "").toUpperCase();
    out.model = namePart.replace(storage[0], "").replace(/\s{2,}/g, " ").trim();
  } else {
    out.model = namePart.trim();
  }

  for (const part of parts.slice(1)) {
    const imei = part.match(/^IMEI\s*\d?\s*[:.]?\s*(.+)$/i);
    const serial = part.match(/^Serial(?:\s*No\.?)?\s*[:.]?\s*(.+)$/i);
    const model = part.match(/^Model(?:\s*No\.?)?\s*[:.]?\s*(.+)$/i);
    if (imei) out.imei = imei[1].trim();
    else if (serial) out.serialNo = serial[1].trim();
    else if (model) out.modelNo = model[1].trim();
  }

  return out;
}
