"use client";

import { useEffect, useRef } from "react";
import { useLocalIds } from "@/hooks/use-local-ids";

/** Fires once per mount to log this product view on this device. */
export function ViewTracker({ productId }: { productId: string }) {
  const { add } = useLocalIds("primetech:recently-viewed", { max: 12 });
  const recorded = useRef(false);

  useEffect(() => {
    if (recorded.current) return;
    recorded.current = true;
    add(productId);
    // `add` is stable enough for this fire-once effect; re-running on every
    // identity change would just re-record the same view.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return null;
}
