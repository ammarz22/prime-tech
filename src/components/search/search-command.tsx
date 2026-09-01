"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Loader2, Smartphone, Laptop, Tablet, Watch, Headphones, Package } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { searchAction, type SearchResult } from "@/lib/actions/search";

const QUICK_LINKS = [
  { label: "Products", href: "/products" },
  { label: "Apple", href: "/products/apple" },
  { label: "Samsung Galaxy", href: "/products/samsung" },
  { label: "iPhone 18 Pre-Order", href: "/iphone-18-preorder" },
  { label: "Services", href: "/services" },
  { label: "Visit Us", href: "/branches" },
];

const CATEGORY_ICONS: Record<string, typeof Smartphone> = {
  iphone: Smartphone,
  "galaxy-s25": Smartphone,
  "galaxy-s26": Smartphone,
  mac: Laptop,
  ipad: Tablet,
  "apple-watch": Watch,
  airpods: Headphones,
  "apple-accessories": Package,
};

function iconFor(categorySlug: string | null) {
  return (categorySlug && CATEGORY_ICONS[categorySlug]) || Smartphone;
}

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const isTyping = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;

      if (e.key === "/" && !isTyping) {
        e.preventDefault();
        setOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, []);

  const runSearch = useCallback((term: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!term.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      const data = await searchAction(term);
      setResults(data);
      setLoading(false);
    }, 250);
  }, []);

  function handleValueChange(value: string) {
    setQuery(value);
    runSearch(value);
  }

  function goTo(href: string) {
    setOpen(false);
    setQuery("");
    setResults([]);
    router.push(href);
  }

  const groupedResults = results.reduce<Record<string, SearchResult[]>>((groups, result) => {
    const key = result.brandName ?? "Products";
    (groups[key] ??= []).push(result);
    return groups;
  }, {});

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex items-center gap-2 rounded-full border border-current/15 px-3.5 py-2 text-sm text-current/70 transition hover:border-current/30 hover:text-current"
        aria-label="Search Prime Tech"
      >
        <Search className="size-4" aria-hidden />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden rounded border border-current/20 px-1.5 py-0.5 text-[10px] font-medium sm:inline">
          /
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen} title="Search Prime Tech" description="Search products, brands and categories">
        <CommandInput
          placeholder="Search Prime Tech..."
          value={query}
          onValueChange={handleValueChange}
        />
        <CommandList>
          {loading && (
            <div className="flex items-center justify-center gap-2 py-6 text-sm text-ink/50">
              <Loader2 className="size-4 animate-spin" /> Searching…
            </div>
          )}

          {!loading && query.trim() && results.length === 0 && (
            <CommandEmpty>No products found for &ldquo;{query}&rdquo;.</CommandEmpty>
          )}

          {!loading &&
            results.length > 0 &&
            Object.entries(groupedResults).map(([brandName, group]) => (
              <CommandGroup key={brandName} heading={brandName}>
                {group.map((result) => {
                  const Icon = iconFor(result.categorySlug);
                  return (
                    <CommandItem
                      key={result.id}
                      value={result.name}
                      onSelect={() =>
                        goTo(
                          result.productGroup === "APPLE"
                            ? `/products/apple/product/${result.slug}`
                            : `/products/${result.slug}`,
                        )
                      }
                      className="gap-3"
                    >
                      <Icon className="size-4 text-ink/40" aria-hidden />
                      <div className="flex flex-col">
                        <span className="font-medium">{result.name}</span>
                        {result.shortDescription && (
                          <span className="text-xs text-ink/50">{result.shortDescription}</span>
                        )}
                      </div>
                      <ArrowRight className="ml-auto size-3.5 text-ink/30" aria-hidden />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ))}

          {!query.trim() && (
            <CommandGroup heading="Quick Links">
              {QUICK_LINKS.map((link) => (
                <CommandItem key={link.href} value={link.label} onSelect={() => goTo(link.href)}>
                  {link.label}
                  <ArrowRight className="ml-auto size-3.5 text-ink/30" aria-hidden />
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
