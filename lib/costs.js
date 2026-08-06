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

// Filled in from Everful wholesale pricing. Each of these was matched by
// its supplier specification, not by name alone — the rainbow heart set by
// its 17+5cm / 21+5cm / 40+5cm lengths, the eternity band by its US 7 and
// US 9 sizing, the marquise ring by its style code JDR0211015-7.
export const COSTS = {
  "marquise-tennis-bracelet": null,
  "clover-necklace-green": 111,
  "clover-necklace-white": 111,
  "clover-necklace-black": 111,
  "clover-necklace-red": 111,
  "iridescent-butterfly-earrings": null,
  "butterfly-pendant-silver": null,
  "butterfly-pendant-gold": null,
  "rainbow-heart-anklet": 144,
  "rainbow-heart-bracelet": 118,
  "rainbow-heart-necklace": 241,
  "round-eternity-band": 445,
  "twisted-marquise-ring": 380,
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
