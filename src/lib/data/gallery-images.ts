/** Curated product-page galleries: tight, square, white-background photos rebuilt from the cleanest source images.
 * `colour` matches the product variant colour; `lead` images always show first. Products not listed use their database images. */
export interface CuratedGalleryImage {
  url: string;
  colour: string | null;
  lead?: boolean;
}

export const CURATED_GALLERIES: Record<string, CuratedGalleryImage[]> = {
  "airpods-4": [
    { url: "/gallery/airpods-4/1.jpg", colour: null },
    { url: "/gallery/airpods-4/2.jpg", colour: null },
    { url: "/gallery/airpods-4/3.jpg", colour: null },
  ],
  "airpods-max": [
    { url: "/gallery/airpods-max/1.jpg", colour: "Starlight" },
    { url: "/gallery/airpods-max/2.jpg", colour: "Sky Blue" },
    { url: "/gallery/airpods-max/3.jpg", colour: "Purple" },
    { url: "/gallery/airpods-max/4.jpg", colour: "Midnight" },
    { url: "/gallery/airpods-max/5.jpg", colour: "Orange" },
    { url: "/gallery/airpods-max/6.jpg", colour: null },
  ],
  "apple-watch-se-3": [
    { url: "/gallery/apple-watch-se-3/1.jpg", colour: "Midnight" },
    { url: "/gallery/apple-watch-se-3/2.jpg", colour: null },
  ],
  "apple-watch-series-11": [
    { url: "/gallery/apple-watch-series-11/1.jpg", colour: null, lead: true },
    { url: "/gallery/apple-watch-series-11/2.jpg", colour: "Aluminum — Jet Black" },
    { url: "/gallery/apple-watch-series-11/3.jpg", colour: "Aluminum — Rose Gold" },
    { url: "/gallery/apple-watch-series-11/4.jpg", colour: "Aluminum — Silver" },
    { url: "/gallery/apple-watch-series-11/5.jpg", colour: "Aluminum — Space Gray" },
    { url: "/gallery/apple-watch-series-11/6.jpg", colour: "Titanium — Gold" },
    { url: "/gallery/apple-watch-series-11/7.jpg", colour: "Titanium — Natural" },
    { url: "/gallery/apple-watch-series-11/8.jpg", colour: "Titanium — Slate" },
  ],
  "apple-watch-ultra-3": [
    { url: "/gallery/apple-watch-ultra-3/1.jpg", colour: null },
  ],
  "galaxy-buds3-fe": [
    { url: "/gallery/galaxy-buds3-fe/1.jpg", colour: "Black" },
    { url: "/gallery/galaxy-buds3-fe/2.jpg", colour: "Gray" },
  ],
  "galaxy-buds4": [
    { url: "/gallery/galaxy-buds4/1.jpg", colour: "Black" },
    { url: "/gallery/galaxy-buds4/2.jpg", colour: "White" },
  ],
  "galaxy-buds4-pro": [
    { url: "/gallery/galaxy-buds4-pro/1.jpg", colour: "Black" },
    { url: "/gallery/galaxy-buds4-pro/2.jpg", colour: "Pink Gold" },
    { url: "/gallery/galaxy-buds4-pro/3.jpg", colour: "White" },
  ],
  "galaxy-s25": [
    { url: "/gallery/galaxy-s25/1.jpg", colour: "Blue Black" },
    { url: "/gallery/galaxy-s25/2.jpg", colour: "Coral Red" },
    { url: "/gallery/galaxy-s25/3.jpg", colour: "Icy Blue" },
    { url: "/gallery/galaxy-s25/4.jpg", colour: "Mint" },
    { url: "/gallery/galaxy-s25/5.jpg", colour: "Navy" },
    { url: "/gallery/galaxy-s25/6.jpg", colour: "Pink Gold" },
    { url: "/gallery/galaxy-s25/7.jpg", colour: "Silver Shadow" },
    { url: "/gallery/galaxy-s25/8.jpg", colour: null },
  ],
  "galaxy-s25-edge": [
    { url: "/gallery/galaxy-s25-edge/1.jpg", colour: "Titanium Icy Blue" },
    { url: "/gallery/galaxy-s25-edge/2.jpg", colour: "Titanium Jet Black" },
    { url: "/gallery/galaxy-s25-edge/3.jpg", colour: "Titanium Silver" },
    { url: "/gallery/galaxy-s25-edge/4.jpg", colour: null },
  ],
  "galaxy-s25-ultra": [
    { url: "/gallery/galaxy-s25-ultra/1.jpg", colour: "Titanium Silverblue" },
    { url: "/gallery/galaxy-s25-ultra/2.jpg", colour: "Titanium Whitesilver" },
    { url: "/gallery/galaxy-s25-ultra/3.jpg", colour: "Titanium Gray" },
    { url: "/gallery/galaxy-s25-ultra/4.jpg", colour: "Titanium Black" },
    { url: "/gallery/galaxy-s25-ultra/5.jpg", colour: "Titanium Jadegreen" },
    { url: "/gallery/galaxy-s25-ultra/6.jpg", colour: "Titanium Jetblack" },
    { url: "/gallery/galaxy-s25-ultra/7.jpg", colour: "Titanium Pinkgold" },
  ],
  "galaxy-s26": [
    { url: "/gallery/galaxy-s26/1.jpg", colour: "Black" },
    { url: "/gallery/galaxy-s26/2.jpg", colour: "Cobalt Violet" },
    { url: "/gallery/galaxy-s26/3.jpg", colour: "Pink Gold" },
    { url: "/gallery/galaxy-s26/4.jpg", colour: "Silver Shadow" },
    { url: "/gallery/galaxy-s26/5.jpg", colour: "Sky Blue" },
    { url: "/gallery/galaxy-s26/6.jpg", colour: "White" },
  ],
  "galaxy-s26-ultra": [
    { url: "/gallery/galaxy-s26-ultra/1.jpg", colour: "Black" },
    { url: "/gallery/galaxy-s26-ultra/2.jpg", colour: "White" },
    { url: "/gallery/galaxy-s26-ultra/3.jpg", colour: "Cobalt Violet" },
    { url: "/gallery/galaxy-s26-ultra/4.jpg", colour: "Sky Blue" },
    { url: "/gallery/galaxy-s26-ultra/5.jpg", colour: "Pink Gold" },
    { url: "/gallery/galaxy-s26-ultra/6.jpg", colour: "Silver Shadow" },
  ],
  "galaxy-tab-s11": [
    { url: "/gallery/galaxy-tab-s11/1.jpg", colour: "Gray" },
    { url: "/gallery/galaxy-tab-s11/2.jpg", colour: "Silver" },
  ],
  "galaxy-tab-s11-ultra": [
    { url: "/gallery/galaxy-tab-s11-ultra/1.jpg", colour: "Gray" },
    { url: "/gallery/galaxy-tab-s11-ultra/2.jpg", colour: "Silver" },
  ],
  "galaxy-watch-ultra2": [
    { url: "/gallery/galaxy-watch-ultra2/1.jpg", colour: null },
    { url: "/gallery/galaxy-watch-ultra2/2.jpg", colour: null },
  ],
  "galaxy-watch8-classic": [
    { url: "/gallery/galaxy-watch8-classic/1.jpg", colour: "Black" },
    { url: "/gallery/galaxy-watch8-classic/2.jpg", colour: "White" },
  ],
  "galaxy-watch9": [
    { url: "/gallery/galaxy-watch9/1.jpg", colour: "Cream (40mm)" },
    { url: "/gallery/galaxy-watch9/2.jpg", colour: "Graphite (40mm)" },
    { url: "/gallery/galaxy-watch9/3.jpg", colour: "Graphite (44mm)" },
    { url: "/gallery/galaxy-watch9/4.jpg", colour: "Silver (44mm)" },
  ],
  "ipad-11": [
    { url: "/gallery/ipad-11/1.jpg", colour: "Blue" },
    { url: "/gallery/ipad-11/2.jpg", colour: "Yellow" },
    { url: "/gallery/ipad-11/3.jpg", colour: "Pink" },
    { url: "/gallery/ipad-11/4.jpg", colour: "Silver" },
    { url: "/gallery/ipad-11/5.jpg", colour: null },
  ],
  "ipad-air": [
    { url: "/gallery/ipad-air/1.jpg", colour: "Blue" },
    { url: "/gallery/ipad-air/2.jpg", colour: "Blue" },
    { url: "/gallery/ipad-air/3.jpg", colour: "Purple" },
    { url: "/gallery/ipad-air/4.jpg", colour: "Purple" },
    { url: "/gallery/ipad-air/5.jpg", colour: "Space Grey" },
    { url: "/gallery/ipad-air/6.jpg", colour: "Space Grey" },
    { url: "/gallery/ipad-air/7.jpg", colour: "Starlight" },
    { url: "/gallery/ipad-air/8.jpg", colour: "Starlight" },
    { url: "/gallery/ipad-air/9.jpg", colour: null },
  ],
  "ipad-mini": [
    { url: "/gallery/ipad-mini/1.jpg", colour: null },
    { url: "/gallery/ipad-mini/2.jpg", colour: null },
    { url: "/gallery/ipad-mini/3.jpg", colour: null },
    { url: "/gallery/ipad-mini/4.jpg", colour: null },
    { url: "/gallery/ipad-mini/5.jpg", colour: null },
  ],
  "ipad-pro": [
    { url: "/gallery/ipad-pro/1.jpg", colour: "Space Black" },
    { url: "/gallery/ipad-pro/2.jpg", colour: "Space Black" },
    { url: "/gallery/ipad-pro/3.jpg", colour: "Space Black" },
    { url: "/gallery/ipad-pro/4.jpg", colour: "Silver" },
    { url: "/gallery/ipad-pro/5.jpg", colour: "Silver" },
    { url: "/gallery/ipad-pro/6.jpg", colour: "Silver" },
    { url: "/gallery/ipad-pro/7.jpg", colour: null },
  ],
  "iphone-17": [
    { url: "/gallery/iphone-17/1.jpg", colour: "Black" },
    { url: "/gallery/iphone-17/2.jpg", colour: "White" },
    { url: "/gallery/iphone-17/3.jpg", colour: "Mist Blue" },
    { url: "/gallery/iphone-17/4.jpg", colour: "Sage" },
    { url: "/gallery/iphone-17/5.jpg", colour: "Lavender" },
    { url: "/gallery/iphone-17/6.jpg", colour: null },
  ],
  "iphone-17-pro": [
    { url: "/gallery/iphone-17-pro/1.jpg", colour: "Silver" },
    { url: "/gallery/iphone-17-pro/2.jpg", colour: "Cosmic Orange" },
    { url: "/gallery/iphone-17-pro/3.jpg", colour: "Deep Blue" },
    { url: "/gallery/iphone-17-pro/4.jpg", colour: null },
  ],
  "iphone-17-pro-max": [
    { url: "/gallery/iphone-17-pro-max/1.jpg", colour: "Silver" },
    { url: "/gallery/iphone-17-pro-max/2.jpg", colour: "Cosmic Orange" },
    { url: "/gallery/iphone-17-pro-max/3.jpg", colour: "Deep Blue" },
    { url: "/gallery/iphone-17-pro-max/4.jpg", colour: null },
  ],
  "mac-mini": [
    { url: "/gallery/mac-mini/1.jpg", colour: null },
    { url: "/gallery/mac-mini/2.jpg", colour: null },
  ],
  "mac-studio": [
    { url: "/gallery/mac-studio/1.jpg", colour: null },
    { url: "/gallery/mac-studio/2.jpg", colour: null },
  ],
  "macbook-air": [
    { url: "/gallery/macbook-air/1.jpg", colour: "Starlight" },
    { url: "/gallery/macbook-air/2.jpg", colour: "Midnight" },
    { url: "/gallery/macbook-air/3.jpg", colour: null },
    { url: "/gallery/macbook-air/4.jpg", colour: null },
    { url: "/gallery/macbook-air/5.jpg", colour: null },
    { url: "/gallery/macbook-air/6.jpg", colour: null },
  ],
  "studio-display": [
    { url: "/gallery/studio-display/1.jpg", colour: null },
    { url: "/gallery/studio-display/2.jpg", colour: null },
  ],
};
