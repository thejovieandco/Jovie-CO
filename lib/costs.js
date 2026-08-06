// ============================================================
// WHAT YOU PAID YOUR SUPPLIER, PER PIECE, IN CENTS
//
// $4.50 = 450.  Leave a piece as null if you don't know it yet.
//
// Fill these in and the sales page (/sales) switches from showing
// revenue to showing real profit: margin per piece, total profit,
// and what a restock would actually cost and return.
//
// If you only know one average figure for the whole collection,
// put that same number on every line — it is still far more useful
// than nothing.
// ============================================================

export const COSTS = {
  "marquise-tennis-bracelet": null,
  "clover-necklace-green": null,
  "clover-necklace-white": null,
  "clover-necklace-black": null,
  "clover-necklace-red": null,
  "iridescent-butterfly-earrings": null,
  "butterfly-pendant-silver": null,
  "butterfly-pendant-gold": null,
  "rainbow-heart-anklet": null,
  "rainbow-heart-bracelet": null,
  "rainbow-heart-necklace": null,
  "round-eternity-band": null,
  "twisted-marquise-ring": null,
  "opal-flower-charm-bracelet": null,
  "layered-chain-bracelet": null,
  "halo-station-tennis-bracelet": null,
  "celestial-moon-star-bracelet": null,
};

export function costOf(handle) {
  const value = COSTS[handle];
  return typeof value === "number" && value > 0 ? value : null;
}

// True once at least one piece has a cost recorded, so the sales page
// knows whether it can talk about profit at all.
export function hasAnyCosts() {
  return Object.values(COSTS).some((c) => typeof c === "number" && c > 0);
}
