export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout/", "/account", "/api/"],
    },
    sitemap: "https://thejovieandco.com/sitemap.xml",
  };
}
