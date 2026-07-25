import Stripe from "stripe";
import { products } from "./products";

// Live inventory without a database: Stripe is the source of truth.
// Every paid checkout session is tallied against each product's starting
// stock, so ordering a piece automatically reduces what's available.

const CACHE_MS = 60_000;
let cache = { at: 0, sold: null };

function nameToHandle() {
  return new Map(products.map((p) => [p.name, p.handle]));
}

async function fetchSoldCounts() {
  const key = (process.env.STRIPE_SECRET_KEY || "").trim();
  if (!key) return {};

  const stripe = new Stripe(key, { apiVersion: "2024-06-20" });
  const lookup = nameToHandle();
  const sold = {};

  let startingAfter;
  // Cap the walk so a large order history can't stall a page load
  for (let page = 0; page < 5; page++) {
    const res = await stripe.checkout.sessions.list({
      limit: 100,
      expand: ["data.line_items"],
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    });

    for (const session of res.data) {
      if (session.payment_status !== "paid") continue;
      for (const item of session.line_items?.data || []) {
        // Line items carry the product name as their description
        const handle = lookup.get(item.description);
        if (handle) sold[handle] = (sold[handle] || 0) + (item.quantity || 0);
      }
    }

    if (!res.has_more || res.data.length === 0) break;
    startingAfter = res.data[res.data.length - 1].id;
  }

  return sold;
}

export async function getSoldCounts({ fresh = false } = {}) {
  if (!fresh && cache.sold && Date.now() - cache.at < CACHE_MS) {
    return cache.sold;
  }
  try {
    const sold = await fetchSoldCounts();
    cache = { at: Date.now(), sold };
    return sold;
  } catch (err) {
    console.error("Stock lookup failed:", err);
    // Fall back to the last good read, or to no sales recorded
    return cache.sold || {};
  }
}

// { handle: unitsStillAvailable } for every product that tracks stock
export async function getRemainingStock(options) {
  const sold = await getSoldCounts(options);
  const remaining = {};
  for (const product of products) {
    if (product.stock == null) continue;
    remaining[product.handle] = Math.max(0, product.stock - (sold[product.handle] || 0));
  }
  return remaining;
}

export async function getRemainingFor(handle, options) {
  const product = products.find((p) => p.handle === handle);
  if (!product || product.stock == null) return null;
  const sold = await getSoldCounts(options);
  return Math.max(0, product.stock - (sold[handle] || 0));
}
