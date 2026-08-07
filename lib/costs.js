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

  // --- The next collection ---
  // The nine "Style" rings were all $1.60 in the cart. The copper open
  // rings ranged $0.92–$1.10; only two could be matched to their style
  // code with certainty, so the rest use $1.10 — the top of that range,
  // which understates profit rather than overstating it.
  "ring-crown-v": 160,
  "ring-double-butterfly": 160,
  "ring-flower-branch": 160,
  "ring-bypass-butterfly": 160,
  "ring-pink-cluster": 160,
  "ring-starry-flower": 160,
  "ring-beaded-star": 160,
  "ring-square-drop": 160,
  "ring-teardrop-bow": 160,
  "ring-leaf-branch-gold": 110,
  "ring-wave-gold": 110,
  "ring-cross-star-gold": 110,
  "ring-butterfly-silver": 110,
  "ring-chain-silver": 110,
  "ring-bead-silver": 97,
  "ring-multilayer-silver": 110,
  "cross-necklace-gold": 144,
  "cross-necklace-silver": 136,
  // Not identified in the cart yet
  "huggie-hoops-five-stone": null,
  "huggie-hoops-four-stone": null,
  "solitaire-studs": null,
  "halo-bracelet-gold": null,
  "halo-bracelet-rose-gold": null,
  "halo-bracelet-silver": null,
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
