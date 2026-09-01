"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateVariantsAction } from "@/lib/actions/generate-variants";

/** Bulk-creates draft variant rows for every combination of the entered
 * option values — the admin then fills in price/availability per row using
 * the existing variant table below. */
export function VariantGenerator({ productId }: { productId: string }) {
  const [colours, setColours] = useState("");
  const [storages, setStorages] = useState("");
  const [chips, setChips] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleGenerate() {
    setPending(true);
    setMessage(null);
    const result = await generateVariantsAction(productId, { colours, storages, chips });
    setPending(false);
    if (!result.success) {
      setMessage({ type: "error", text: result.error ?? "Something went wrong." });
      return;
    }
    setMessage({ type: "success", text: `Created ${result.created} new variant${result.created === 1 ? "" : "s"}.` });
    setColours("");
    setStorages("");
    setChips("");
  }

  return (
    <div className="rounded-2xl border border-ink/8">
      <div className="border-b border-ink/8 px-5 py-3">
        <p className="flex items-center gap-1.5 text-sm font-medium">
          <Sparkles className="size-3.5 text-brand" />
          Generate Variants
        </p>
        <p className="mt-0.5 text-xs text-ink/45">
          Enter comma-separated option values — every combination is created as a draft (price on request, coming
          soon) for you to fill in below.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="gen-colours">Colours</Label>
          <Input id="gen-colours" placeholder="Black, White, Blue" value={colours} onChange={(e) => setColours(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="gen-storages">Storage</Label>
          <Input id="gen-storages" placeholder="256GB, 512GB" value={storages} onChange={(e) => setStorages(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="gen-chips">Chip (optional)</Label>
          <Input id="gen-chips" placeholder="M5, M5 Pro" value={chips} onChange={(e) => setChips(e.target.value)} />
        </div>
      </div>
      <div className="flex items-center gap-3 border-t border-ink/8 px-5 py-3">
        <Button size="sm" variant="outline" className="gap-1.5" onClick={handleGenerate} disabled={pending}>
          {pending ? <Loader2 className="size-3.5 animate-spin" /> : <Sparkles className="size-3.5" />}
          Generate
        </Button>
        {message && (
          <p className={`text-xs ${message.type === "error" ? "text-destructive" : "text-emerald-600"}`}>{message.text}</p>
        )}
      </div>
    </div>
  );
}
