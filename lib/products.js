// ============================================================
// PRODUCT CATALOG
// price is in CENTS (Stripe requires this). $28.00 = 2800
//
// PREORDER mode: customers can buy now, pieces ship on
// PREORDER_SHIP_DATE. Set PREORDER to false once orders ship
// immediately, and the preorder badges and notes disappear.
//
// comingSoon: true on a product -> shows a "Coming Soon" badge and
// hides the Add to Bag button entirely (not even preorder).
// ============================================================

// Stock is in hand as of the founding collection's arrival, so orders ship
// from inventory. Set PREORDER back to true only if a future drop is sold
// before it lands; the ship date below is used only while it is true.
export const PREORDER = false;
export const PREORDER_SHIP_DATE = "early August";

// The next drop. Set NEXT_COLLECTION to false to hide the announcement
// once it has landed, or update the window as the date firms up.
export const NEXT_COLLECTION = true;
export const NEXT_COLLECTION_DATES = "August 18–24";

// Flip to true the day the new pieces are physically in hand. Every piece
// below in `nextCollection` stops saying "Coming Soon" and becomes buyable,
// and the announcement band turns itself off. Nothing else needs touching.
export const NEW_COLLECTION_LIVE = false;

const founding = [
  {
    handle: "marquise-tennis-bracelet",
    name: "Marquise Tennis Bracelet",
    category: "bracelets",
    price: 3800,
    stock: 1,
    image: "/products/marquise-tennis-bracelet.webp",
    description: "A row of marquise-cut stones set edge to edge in silver-tone metal, for a bracelet that catches light with every movement.",
    details: ["Silver-tone plating", "Adjustable clasp closure"]
  },
  {
    handle: "clover-necklace-green",
    name: "Four Leaf Clover Necklace — Green",
    category: "necklaces",
    price: 2800,
    stock: 1,
    image: "/products/clover-necklace-green.webp",
    description: "A quatrefoil clover pendant in green stone, finished in gold on a fine link chain.",
    details: ["Gold-plated", "Adjustable chain length"]
  },
  {
    handle: "clover-necklace-white",
    name: "Four Leaf Clover Necklace — Champagne",
    category: "necklaces",
    price: 2800,
    stock: 1,
    image: "/products/clover-necklace-champagne.webp",
    description: "The same clover silhouette in warm champagne-toned stones, finished in gold on a fine link chain.",
    details: ["Gold-plated", "Adjustable chain length"]
  },
  {
    handle: "iridescent-butterfly-earrings",
    name: "Iridescent Butterfly Drop Earrings",
    category: "earrings",
    price: 2400,
    stock: 1,
    image: "/products/iridescent-butterfly-earrings.webp",
    description: "Resin butterfly wings with gold flake detail, suspended from a gold huggie hoop.",
    details: ["Gold-plated hoop closure", "Lightweight resin wings"]
  },
  {
    handle: "rainbow-heart-anklet",
    name: "Rainbow Heart Charm Anklet",
    category: "bracelets",
    price: 2200,
    stock: 1,
    image: "/products/rainbow-heart-anklet.webp",
    description: "A row of multicolor crystal hearts in gold settings, sized for the ankle. Part of a matching set with the bracelet and necklace.",
    details: ["21.5cm length", "Gold-plated", "Lobster clasp closure"]
  },
  {
    handle: "rainbow-heart-necklace",
    name: "Rainbow Heart Charm Necklace",
    category: "necklaces",
    price: 3200,
    stock: 1,
    image: "/products/rainbow-heart-necklace.webp",
    description: "A row of multicolor crystal hearts in gold settings. Part of a matching set with the bracelet and anklet.",
    details: ["40.5cm length", "Gold-plated", "Lobster clasp closure"]
  },
  {
    handle: "round-eternity-band",
    name: "Round Eternity Band",
    category: "rings",
    price: 3600,
    stock: 3,
    image: "/products/round-eternity-band.webp",
    description: "Round brilliant-cut stones set in prongs the full way around a polished silver-tone band.",
    details: ["Silver-tone plating", "Available in US 7 and US 9 — we'll email you to confirm your size after checkout"]
  },
  {
    handle: "clover-necklace-black",
    name: "Four Leaf Clover Necklace — Black",
    category: "necklaces",
    price: 2800,
    stock: 1,
    image: "/products/clover-necklace-black.webp",
    description: "The clover silhouette in deep black stones, finished in gold on a fine link chain.",
    details: ["Gold-plated", "Adjustable chain length"]
  },
  {
    handle: "butterfly-pendant-silver",
    name: "Iridescent Butterfly Pendant Necklace — Silver Chain",
    category: "necklaces",
    price: 2800,
    stock: 1,
    image: "/products/butterfly-pendant-silver.webp",
    description: "A hand-painted resin butterfly pendant with a pave crystal body, on a delicate silver-tone chain.",
    details: ["Silver-tone chain", "Lobster clasp closure"]
  },
  {
    handle: "opal-flower-charm-bracelet",
    name: "Opal Flower Charm Bracelet",
    category: "bracelets",
    price: 2600,
    stock: 1,
    image: "/products/opal-flower-charm-bracelet.webp",
    description: "A delicate chain bracelet with opal-effect beads and crystal flower charms scattered along its length.",
    details: ["Silver-tone chain", "Lobster clasp closure"]
  },
  {
    handle: "layered-chain-bracelet",
    name: "Layered Chain Bracelet",
    category: "bracelets",
    price: 2400,
    stock: 1,
    image: "/products/layered-chain-bracelet.webp",
    description: "Two fine chains worn together, one with a crystal circle charm, for an easy layered look with no extra effort.",
    details: ["Silver-tone chain", "Lobster clasp closure"]
  },
  {
    handle: "halo-station-tennis-bracelet",
    name: "Halo Station Tennis Bracelet",
    category: "bracelets",
    price: 4200,
    // Started at 2. One sold off-platform, so Stripe cannot subtract it —
    // the starting count is lowered here instead.
    stock: 1,
    image: "/products/halo-station-tennis-bracelet.webp",
    description: "A classic crystal tennis bracelet with a single halo-set station stone as its centerpiece.",
    details: ["Silver-tone plating", "Box clasp with safety"]
  },
  {
    handle: "twisted-marquise-ring",
    name: "Twisted Marquise Ring",
    category: "rings",
    price: 3000,
    stock: 1,
    image: "/products/twisted-marquise-ring.jpeg",
    description: "A marquise-cut stone set across an open, twisted gold band. Adjustable, so one size fits most.",
    details: ["Gold-plated stainless steel", "Adjustable, open-back band", "Waterproof and hypoallergenic"]
  },
  {
    handle: "rainbow-heart-bracelet",
    name: "Rainbow Heart Charm Bracelet",
    category: "bracelets",
    price: 2600,
    stock: 1,
    image: "/products/rainbow-heart-bracelet.webp",
    description: "A row of multicolor crystal hearts in gold settings. Part of a matching set with the anklet and necklace.",
    details: ["17.5cm length", "Gold-plated", "Lobster clasp closure"]
  },
  {
    handle: "butterfly-pendant-gold",
    name: "Iridescent Butterfly Pendant Necklace — Gold Chain",
    category: "necklaces",
    price: 2800,
    stock: 1,
    image: "/products/butterfly-pendant-gold.webp",
    description: "A hand-painted resin butterfly pendant with a pave crystal body, on a delicate gold-tone chain.",
    details: ["Gold-plated chain", "Lobster clasp closure"]
  },
  {
    handle: "clover-necklace-red",
    name: "Four Leaf Clover Necklace — Red",
    category: "necklaces",
    price: 2800,
    stock: 1,
    image: "/products/clover-necklace-red.webp",
    description: "The clover silhouette in deep red stones, finished in gold on a fine link chain.",
    details: ["Gold-plated", "Adjustable chain length"]
  },
  {
    handle: "celestial-moon-star-bracelet",
    name: "Celestial Moon & Star Bracelet",
    category: "bracelets",
    price: 2600,
    stock: 1,
    image: "/products/celestial-moon-star-bracelet.webp",
    description: "An enamel crescent moon charm surrounded by scattered star links, on a fine silver-tone chain.",
    details: ["Silver-tone chain", "Lobster clasp closure"]
  }
];

// ============================================================
// THE NEXT COLLECTION — arriving August 18–24
//
// Stock figures are what was ordered. Count the box when it lands and
// correct any that differ before flipping NEW_COLLECTION_LIVE to true.
// ============================================================

const nextCollection = [
  // --- Adjustable rings, 18K gold plated brass with zircon -------
  {
    handle: "ring-crown-v",
    name: "Crown V Ring",
    category: "rings",
    price: 2400,
    stock: 2,
    image: "/products/ring-crown-v.webp",
    description: "A slender V of pink and clear zircon that sits like a small crown across the finger. Adjustable, so it finds its own fit.",
    details: ["18K gold-plated brass", "Zircon inlaid", "Adjustable open band"]
  },
  {
    handle: "ring-double-butterfly",
    name: "Double Butterfly Ring",
    category: "rings",
    price: 2400,
    stock: 2,
    image: "/products/ring-double-butterfly.webp",
    description: "Two butterflies in pink zircon, caught mid-flight along a fine gold band.",
    details: ["18K gold-plated brass", "Zircon inlaid", "Adjustable open band"]
  },
  {
    handle: "ring-flower-branch",
    name: "Flower Branch Ring",
    category: "rings",
    price: 2400,
    stock: 2,
    image: "/products/ring-flower-branch.webp",
    description: "An open band that ends in two flowering stems, one reaching past the other.",
    details: ["18K gold-plated brass", "Zircon inlaid", "Adjustable open band"]
  },
  {
    handle: "ring-bypass-butterfly",
    name: "Bypass Butterfly Ring",
    category: "rings",
    price: 2400,
    stock: 2,
    image: "/products/ring-bypass-butterfly.webp",
    description: "The band passes itself rather than closing, with butterflies and pink stones scattered where the ends meet.",
    details: ["18K gold-plated brass", "Zircon inlaid", "Adjustable open band"]
  },
  {
    handle: "ring-pink-cluster",
    name: "Pink Cluster Ring",
    category: "rings",
    price: 2400,
    stock: 2,
    image: "/products/ring-pink-cluster.webp",
    description: "A gathered cluster of pink and clear stones, set close so the whole ring reads as one soft bloom.",
    details: ["18K gold-plated brass", "Zircon inlaid", "Adjustable open band"]
  },
  {
    handle: "ring-starry-flower",
    name: "Starry Flower Ring",
    category: "rings",
    price: 2400,
    stock: 2,
    image: "/products/ring-starry-flower.webp",
    description: "Flowers worked across a doubled band, so a single ring wears like a stack.",
    details: ["18K gold-plated brass", "Zircon inlaid", "Adjustable open band"]
  },
  {
    handle: "ring-beaded-star",
    name: "Beaded Star Ring",
    category: "rings",
    price: 2400,
    stock: 2,
    image: "/products/ring-beaded-star.webp",
    description: "A beaded gold band with a small opal-toned flower and a scatter of pink stones.",
    details: ["18K gold-plated brass", "Zircon inlaid", "Adjustable open band"]
  },
  {
    handle: "ring-square-drop",
    name: "Square Drop Ring",
    category: "rings",
    price: 2400,
    stock: 2,
    image: "/products/ring-square-drop.webp",
    description: "Two beaded bands with a square-cut stone suspended between them, so it moves as your hand does.",
    details: ["18K gold-plated brass", "Zircon inlaid", "Adjustable open band"]
  },
  {
    handle: "ring-teardrop-bow",
    name: "Teardrop Bow Ring",
    category: "rings",
    price: 2400,
    stock: 2,
    image: "/products/ring-teardrop-bow.webp",
    description: "A pink bow tied at the centre of a plain gold band. Quiet, and a little bit sweet.",
    details: ["18K gold-plated brass", "Zircon inlaid", "Adjustable open band"]
  },

  // --- Open rings, copper with zircon and pearl ------------------
  {
    handle: "ring-leaf-branch-gold",
    name: "Leaf Branch Ring — Gold",
    category: "rings",
    price: 2400,
    stock: 1,
    image: "/products/ring-leaf-branch-gold.webp",
    description: "A vine of stone-set leaves that wraps the finger and stops just short of closing.",
    details: ["Gold-plated copper", "Zircon inlaid", "Adjustable open band"]
  },
  {
    handle: "ring-wave-gold",
    name: "Wave Ring — Gold",
    category: "rings",
    price: 2400,
    stock: 1,
    image: "/products/ring-wave-gold.webp",
    description: "One twisted band and one smooth, crossing in a single wave. Nothing on it but the shape.",
    details: ["Gold-plated copper", "Adjustable open band"]
  },
  {
    handle: "ring-cross-star-gold",
    name: "Cross Star Ring — Gold",
    category: "rings",
    price: 2400,
    stock: 1,
    image: "/products/ring-cross-star-gold.webp",
    description: "A four-point star set with zircon, raised off a fine gold band.",
    details: ["Gold-plated copper", "Zircon inlaid", "Adjustable open band"]
  },
  {
    handle: "ring-butterfly-silver",
    name: "Butterfly Ring — Silver",
    category: "rings",
    price: 2400,
    stock: 1,
    image: "/products/ring-butterfly-silver.webp",
    description: "A single butterfly in baguette-cut zircon, perched high on a slim silver band.",
    details: ["Silver-tone copper", "Zircon inlaid", "Adjustable open band"]
  },
  {
    handle: "ring-chain-silver",
    name: "Chain Link Ring — Silver",
    category: "rings",
    price: 2400,
    stock: 1,
    image: "/products/ring-chain-silver.webp",
    description: "Interlocking links worked into a band, half of them stone-set, half left plain.",
    details: ["Silver-tone copper", "Zircon inlaid", "Adjustable open band"]
  },
  {
    handle: "ring-bead-silver",
    name: "Beaded Pavé Ring — Silver",
    category: "rings",
    price: 2400,
    stock: 1,
    image: "/products/ring-bead-silver.webp",
    description: "A row of fine beads along one edge and pavé stones along the other.",
    details: ["Silver-tone copper", "Zircon inlaid", "Adjustable open band"]
  },
  {
    handle: "ring-multilayer-silver",
    name: "Double Line Ring — Silver",
    category: "rings",
    price: 2400,
    stock: 1,
    image: "/products/ring-multilayer-silver.webp",
    description: "Two pavé lines that cross at the front and leave the band open at the back.",
    details: ["Silver-tone copper", "Zircon inlaid", "Adjustable open band"]
  },

  // --- Cross pendants -------------------------------------------
  {
    handle: "cross-necklace-gold",
    name: "Ornate Cross Necklace — Gold",
    category: "necklaces",
    price: 2800,
    stock: 2,
    image: "/products/cross-necklace-gold.webp",
    description: "A cross with a stone-set square at its centre, hung on a fine gold chain.",
    details: ["Gold-plated stainless steel", "Zircon inlaid", "Adjustable chain length"]
  },
  {
    handle: "cross-necklace-silver",
    name: "Hollow Cross Necklace — Silver",
    category: "necklaces",
    price: 2800,
    stock: 2,
    image: "/products/cross-necklace-silver.webp",
    description: "An open-worked cross with flared ends, cut through so the light passes behind it.",
    details: ["Stainless steel", "Zircon inlaid", "Adjustable chain length"]
  },

  // --- Earrings --------------------------------------------------
  {
    handle: "huggie-hoops-five-stone",
    name: "Five Stone Huggie Hoops",
    category: "earrings",
    price: 3400,
    stock: 2,
    image: "/products/huggie-hoops-five-stone.webp",
    description: "Five graduated stones curved along a small hoop that sits close to the ear. Real sterling silver, not plating.",
    details: ["925 sterling silver", "Zircon inlaid", "Hinged huggie closure", "Sold as a pair"]
  },
  {
    handle: "huggie-hoops-four-stone",
    name: "Four Stone Huggie Hoops",
    category: "earrings",
    price: 3400,
    stock: 2,
    image: "/products/huggie-hoops-four-stone.webp",
    description: "A row of four stones with a scalloped edge beneath. Small enough for a second piercing, finished enough for a first.",
    details: ["925 sterling silver", "Zircon inlaid", "Hinged huggie closure", "Sold as a pair"]
  },
  {
    handle: "solitaire-studs",
    name: "Solitaire Studs",
    category: "earrings",
    price: 2600,
    stock: 2,
    image: "/products/solitaire-studs.webp",
    description: "One round stone in a six-prong setting. The pair you keep reaching for when nothing else is right.",
    details: ["925 sterling silver posts", "Six-prong setting", "Sold as a pair"]
  },

  // --- Halo bracelets --------------------------------------------
  {
    handle: "halo-bracelet-gold",
    name: "Halo Bracelet — Gold",
    category: "bracelets",
    price: 2800,
    stock: 2,
    image: "/products/halo-bracelet-gold.webp",
    description: "A round stone ringed in pavé at the centre of a slim chain, so it sits face-up on the wrist.",
    details: ["Gold-tone alloy", "Zircon inlaid", "Lobster clasp with extender"]
  },
  {
    handle: "halo-bracelet-rose-gold",
    name: "Halo Bracelet — Rose Gold",
    category: "bracelets",
    price: 2800,
    stock: 2,
    image: "/products/halo-bracelet-rose-gold.webp",
    description: "The same halo centre in a warmer rose finish, for a softer read against the skin.",
    details: ["Rose gold-tone alloy", "Zircon inlaid", "Lobster clasp with extender"]
  },
  {
    handle: "halo-bracelet-silver",
    name: "Halo Bracelet — Silver",
    category: "bracelets",
    price: 2800,
    stock: 2,
    image: "/products/halo-bracelet-silver.webp",
    description: "The halo bracelet in bright silver — the plainest of the three, and the easiest to wear daily.",
    details: ["Silver-tone alloy", "Zircon inlaid", "Lobster clasp with extender"]
  }
];

// Until the new pieces are in hand they show as Coming Soon and cannot be
// bought. One flag above turns the whole drop live.
export const foundingProducts = founding.map((p) => ({ ...p, collection: "founding" }));
export const nextProducts = nextCollection.map((p) => ({
  ...p,
  collection: "next",
  comingSoon: !NEW_COLLECTION_LIVE,
}));

export const products = [...foundingProducts, ...nextProducts];

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

// Pieces from the same family (the rainbow heart set, the clover colours,
// the butterfly chains) make the most natural suggestions; same-category
// pieces fill any remaining slots.
function familyKey(name) {
  return name
    .split("—")[0]
    .replace(/\b(Necklace|Bracelet|Anklet|Ring|Earrings|Band|Pendant|Drop|Charm)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function getRelatedProducts(handle, limit = 4) {
  const product = getProductByHandle(handle);
  if (!product) return [];
  const family = familyKey(product.name);
  const others = products.filter((p) => p.handle !== handle);

  const sameSet = others.filter((p) => familyKey(p.name) === family);
  const sameCategory = others.filter(
    (p) => familyKey(p.name) !== family && p.category === product.category
  );
  const everythingElse = others.filter(
    (p) => familyKey(p.name) !== family && p.category !== product.category
  );

  return {
    items: [...sameSet, ...sameCategory, ...everythingElse].slice(0, limit),
    isSet: sameSet.length > 0,
  };
}
