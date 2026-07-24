export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout/", "/account", "/assistant", "/api/"],
    },
    sitemap: "https://jovieandco.com/sitemap.xml",
  };
}
