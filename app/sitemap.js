import { products } from "../lib/products";

const BASE = "https://thejovieandco.com";

export default function sitemap() {
  const staticPages = [
    "",
    "/pages/our-story",
    "/pages/ring-sizing",
    "/pages/shipping-returns",
    "/pages/contact",
    "/pages/sustainability",
    "/pages/privacy",
    "/collections/rings",
    "/collections/necklaces",
    "/collections/earrings",
    "/collections/bracelets",
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${BASE}${path}`,
      lastModified: new Date(),
    })),
    ...products.map((p) => ({
      url: `${BASE}/products/${p.handle}`,
      lastModified: new Date(),
    })),
  ];
}
