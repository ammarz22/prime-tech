import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";
import { getProducts } from "@/lib/db/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/products",
    "/products/apple",
    "/products/samsung",
    "/products/compare",
    "/iphone-18-preorder",
    "/services",
    "/about",
    "/contact",
    "/branches",
    "/help-me-choose",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  const products = await getProducts({ limit: 200 });
  const productRoutes = products.map((p) => ({
    url: `${siteConfig.url}${p.product_group === "APPLE" ? "/products/apple/product" : "/products"}/${p.slug}`,
    lastModified: p.updated_at,
  }));

  return [...staticRoutes, ...productRoutes];
}
