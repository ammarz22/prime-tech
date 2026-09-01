import type { Metadata } from "next";
import { SavedProductsClient } from "@/components/saved/saved-products-client";

export const metadata: Metadata = {
  title: "Saved Products",
};

export default function SavedProductsPage() {
  return <SavedProductsClient />;
}
