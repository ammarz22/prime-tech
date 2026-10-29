import { LIST_PAGE_SIZE } from "@/lib/db/sales";

type RawParams = { [key: string]: string | string[] | undefined };

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

/** Reads `?q=`, `?limit=` and `?new=1` for the sales list pages. */
export function parseListParams(params: RawParams) {
  const q = (first(params.q) ?? "").trim().slice(0, 100);
  const requested = Number(first(params.limit));
  const limit = Number.isFinite(requested) && requested >= LIST_PAGE_SIZE ? Math.min(Math.floor(requested), 2000) : LIST_PAGE_SIZE;
  const autoNew = first(params.new) === "1";
  return { q, limit, autoNew };
}
