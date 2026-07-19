// ============================================================
// PRODUCT CATALOG
// price is in CENTS (Stripe requires this). $28.00 = 2800
//
// comingSoon: true -> shows a "Coming Soon" badge, hides the
// Add to Bag button. Remove the line once the piece is in hand
// and ready to ship, and checkout opens for it.
// ============================================================

export const products = [
  {
    handle: "marquise-tennis-bracelet",
    name: "Marquise Tennis Bracelet",
    category: "bracelets",
    price: 3800,
    image: "/products/marquise-tennis-bracelet.webp",
    description: "A row of marquise-cut stones set edge to edge in silver-tone metal, for a bracelet that catches light with every movement.",
    details: ["Silver-tone plating", "Adjustable clasp closure"]
  },
  {
    handle: "clover-necklace-green",
    name: "Four Leaf Clover Necklace — Green",
    category: "necklaces",
    price: 2800,
    image: "/products/clover-necklace-green.webp",
    description: "A quatrefoil clover pendant in green stone, finished in gold on a fine link chain.",
    details: ["Gold-plated", "Adjustable chain length"]
  },
  {
    handle: "clover-necklace-white",
    name: "Four Leaf Clover Necklace — Champagne",
    category: "necklaces",
    price: 2800,
    image: "/products/clover-necklace-champagne.webp",
    description: "The same clover silhouette in warm champagne-toned stones, finished in gold on a fine link chain.",
    details: ["Gold-plated", "Adjustable chain length"]
  },
  {
    handle: "iridescent-butterfly-earrings",
    name: "Iridescent Butterfly Drop Earrings",
    category: "earrings",
    price: 2400,
    image: "/products/iridescent-butterfly-earrings.webp",
    description: "Resin butterfly wings with gold flake detail, suspended from a gold huggie hoop.",
    details: ["Gold-plated hoop closure", "Lightweight resin wings"]
  },
  {
    handle: "rainbow-heart-anklet",
    name: "Rainbow Heart Charm Anklet",
    category: "bracelets",
    price: 2200,
    image: "/products/rainbow-heart-anklet.webp",
    description: "A row of multicolor crystal hearts in gold settings, sized for the ankle. Part of a matching set with the bracelet and necklace.",
    details: ["21.5cm length", "Gold-plated", "Lobster clasp closure"]
  },
  {
    handle: "rainbow-heart-necklace",
    name: "Rainbow Heart Charm Necklace",
    category: "necklaces",
    price: 3200,
    image: "/products/rainbow-heart-necklace.webp",
    description: "A row of multicolor crystal hearts in gold settings. Part of a matching set with the bracelet and anklet.",
    details: ["40.5cm length", "Gold-plated", "Lobster clasp closure"]
  },
  {
    handle: "channel-set-eternity-band",
    name: "Channel-Set Eternity Band",
    category: "rings",
    price: 3000,
    image: "/products/channel-set-eternity-band.webp",
    description: "Princess-cut stones set flush in a polished silver-tone channel band, for everyday stacking or wear on its own.",
    details: ["Silver-tone plating", "Sizes available: see listing"]
  },
  {
    handle: "round-eternity-band",
    name: "Round Eternity Band",
    category: "rings",
    price: 3600,
    image: "/products/round-eternity-band.webp",
    description: "Round brilliant-cut stones set in prongs the full way around a polished silver-tone band.",
    details: ["Silver-tone plating", "Sizes available: see listing"]
  },
  {
    handle: "clover-necklace-black",
    name: "Four Leaf Clover Necklace — Black",
    category: "necklaces",
    price: 2800,
    image: "/products/clover-necklace-black.webp",
    description: "The clover silhouette in deep black stones, finished in gold on a fine link chain.",
    details: ["Gold-plated", "Adjustable chain length"]
  },
  {
    handle: "butterfly-pendant-silver",
    name: "Iridescent Butterfly Pendant Necklace — Silver Chain",
    category: "necklaces",
    price: 2800,
    image: "/products/butterfly-pendant-silver.webp",
    description: "A hand-painted resin butterfly pendant with a pave crystal body, on a delicate silver-tone chain.",
    details: ["Silver-tone chain", "Lobster clasp closure"]
  },
  {
    handle: "opal-flower-charm-bracelet",
    name: "Opal Flower Charm Bracelet",
    category: "bracelets",
    price: 2600,
    image: "/products/opal-flower-charm-bracelet.webp",
    description: "A delicate chain bracelet with opal-effect beads and crystal flower charms scattered along its length.",
    details: ["Silver-tone chain", "Lobster clasp closure"]
  },
  {
    handle: "layered-chain-bracelet",
    name: "Layered Chain Bracelet",
    category: "bracelets",
    price: 2400,
    image: "/products/layered-chain-bracelet.webp",
    description: "Two fine chains worn together, one with a crystal circle charm, for an easy layered look with no extra effort.",
    details: ["Silver-tone chain", "Lobster clasp closure"]
  },
  {
    handle: "halo-station-tennis-bracelet",
    name: "Halo Station Tennis Bracelet",
    category: "bracelets",
    price: 4200,
    image: "/products/halo-station-tennis-bracelet.webp",
    description: "A classic crystal tennis bracelet with a single halo-set station stone as its centerpiece.",
    details: ["Silver-tone plating", "Box clasp with safety"]
  },
  {
    handle: "twisted-marquise-ring",
    name: "Twisted Marquise Ring",
    category: "rings",
    price: 3000,
    image: "/products/twisted-marquise-ring.jpeg",
    description: "A marquise-cut stone set across an open, twisted gold band. Adjustable, so one size fits most.",
    details: ["Gold-plated stainless steel", "Adjustable, open-back band", "Waterproof and hypoallergenic"]
  },
  {
    handle: "rainbow-heart-bracelet",
    name: "Rainbow Heart Charm Bracelet",
    category: "bracelets",
    price: 2600,
    image: "/products/rainbow-heart-bracelet.webp",
    description: "A row of multicolor crystal hearts in gold settings. Part of a matching set with the anklet and necklace.",
    details: ["17.5cm length", "Gold-plated", "Lobster clasp closure"]
  },
  {
    handle: "butterfly-pendant-gold",
    name: "Iridescent Butterfly Pendant Necklace — Gold Chain",
    category: "necklaces",
    price: 2800,
    image: "/products/butterfly-pendant-gold.webp",
    description: "A hand-painted resin butterfly pendant with a pave crystal body, on a delicate gold-tone chain.",
    details: ["Gold-plated chain", "Lobster clasp closure"]
  },
  {
    handle: "clover-necklace-red",
    name: "Four Leaf Clover Necklace — Red",
    category: "necklaces",
    price: 2800,
    image: "/products/clover-necklace-red.webp",
    description: "The clover silhouette in deep red stones, finished in gold on a fine link chain.",
    details: ["Gold-plated", "Adjustable chain length"]
  },
  {
    handle: "celestial-moon-star-bracelet",
    name: "Celestial Moon & Star Bracelet",
    category: "bracelets",
    price: 2600,
    image: "/products/celestial-moon-star-bracelet.webp",
    description: "An enamel crescent moon charm surrounded by scattered star links, on a fine silver-tone chain.",
    details: ["Silver-tone chain", "Lobster clasp closure"]
  }
];

export function getProductByHandle(handle) {
  return products.find((p) => p.handle === handle);
}

export function getProductsByCategory(category) {
  return products.filter((p) => p.category === category);
}

export function formatPrice(cents) {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}
