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
    comingSoon: true,
    image: "/products/item-1.jpg",
    description: "A row of marquise-cut stones set edge to edge in silver-tone metal, for a bracelet that catches light with every movement.",
    details: ["Silver-tone plating", "Adjustable clasp closure"]
  },
  {
    handle: "clover-necklace-green",
    name: "Four Leaf Clover Necklace — Green",
    category: "necklaces",
    price: 2800,
    comingSoon: true,
    image: "/products/item-2.jpg",
    description: "A quatrefoil clover pendant in green stone, finished in gold on a fine link chain.",
    details: ["Gold-plated", "Adjustable chain length"]
  },
  {
    handle: "clover-necklace-white",
    name: "Four Leaf Clover Necklace — Champagne",
    category: "necklaces",
    price: 2800,
    comingSoon: true,
    image: "/products/item-3.jpg",
    description: "The same clover silhouette in warm champagne-toned stones, finished in gold on a fine link chain.",
    details: ["Gold-plated", "Adjustable chain length"]
  },
  {
    handle: "iridescent-butterfly-earrings",
    name: "Iridescent Butterfly Drop Earrings",
    category: "earrings",
    price: 2400,
    comingSoon: true,
    image: "/products/item-4.jpg",
    description: "Resin butterfly wings with gold flake detail, suspended from a gold huggie hoop.",
    details: ["Gold-plated hoop closure", "Lightweight resin wings"]
  },
  {
    handle: "rainbow-heart-anklet",
    name: "Rainbow Heart Charm Anklet",
    category: "bracelets",
    price: 2200,
    comingSoon: true,
    image: "/products/item-5.jpg",
    description: "A row of multicolor crystal hearts in gold settings, sized for the ankle. Part of a matching set with the bracelet and necklace.",
    details: ["21.5cm length", "Gold-plated", "Lobster clasp closure"]
  },
  {
    handle: "rainbow-heart-necklace",
    name: "Rainbow Heart Charm Necklace",
    category: "necklaces",
    price: 3200,
    comingSoon: true,
    image: "/products/item-6.jpg",
    description: "A row of multicolor crystal hearts in gold settings. Part of a matching set with the bracelet and anklet.",
    details: ["40.5cm length", "Gold-plated", "Lobster clasp closure"]
  },
  {
    handle: "channel-set-eternity-band",
    name: "Channel-Set Eternity Band",
    category: "rings",
    price: 3000,
    comingSoon: true,
    image: "/products/item-7.jpg",
    description: "Princess-cut stones set flush in a polished silver-tone channel band, for everyday stacking or wear on its own.",
    details: ["Silver-tone plating", "Sizes available: see listing"]
  },
  {
    handle: "round-eternity-band",
    name: "Round Eternity Band",
    category: "rings",
    price: 3600,
    comingSoon: true,
    image: "/products/item-8.jpg",
    description: "Round brilliant-cut stones set in prongs the full way around a polished silver-tone band.",
    details: ["Silver-tone plating", "Sizes available: see listing"]
  },
  {
    handle: "clover-necklace-black",
    name: "Four Leaf Clover Necklace — Black",
    category: "necklaces",
    price: 2800,
    comingSoon: true,
    image: "/products/item-9.jpg",
    description: "The clover silhouette in deep black stones, finished in gold on a fine link chain.",
    details: ["Gold-plated", "Adjustable chain length"]
  },
  {
    handle: "butterfly-pendant-silver",
    name: "Iridescent Butterfly Pendant Necklace — Silver Chain",
    category: "necklaces",
    price: 2800,
    comingSoon: true,
    image: "/products/item-10.jpg",
    description: "A hand-painted resin butterfly pendant with a pave crystal body, on a delicate silver
