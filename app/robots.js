export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout/", "/account", "/assistant", "/sales", "/api/"],
    },
    sitemap: "https://jovieandco.com/sitemap.xml",
  };
}
