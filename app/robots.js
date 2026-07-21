export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout/", "/account", "/api/"],
    },
    sitemap: "https://jovieandco.com/sitemap.xml",
  };
}
