import Stripe from "stripe";
import { products } from "./products";

// Live inventory without a database: Stripe is the source of truth.
// Every paid checkout session is tallied against each product's starting
// stock, so ordering a piece automatically reduces what's available.
//
// Two ways a session is read, in order of preference:
//   1. session.metadata.items — written at checkout, no extra API call
//   2. listLineItems(session.id) — for orders placed before metadata
//      existed, matching the line item description to the product name
//
// Expanding line_items inside a list call is unreliable, so it is not used.

const CACHE_MS = 60_000;
let cache = { at: 0, result: null };

function nameToHandle() {
  return new Map(products.map((p) => [p.name, p.handle]));
}

function knownHandles() {
  return new Set(products.map((p) => p.handle));
}

export function encodeItemsMetadata(items) {
  // Compact so it fits Stripe's 500-character metadata value limit
  const packed = JSON.stringify(items.map((i) => ({ h: i.handle, q: i.quantity })));
  return packed.length <= 480 ? packed : "";
}

function decodeItemsMetadata(metadata) {
  const raw = metadata?.items;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

async function fetchSoldCounts() {
  const key = (process.env.STRIPE_SECRET_KEY || "").trim();
  if (!key) return { sold: {}, ok: false, reason: "STRIPE_SECRET_KEY is not set" };

  const stripe = new Stripe(key, { apiVersion: "2024-06-20" });
  const lookup = nameToHandle();
  const valid = knownHandles();

  const sold = {};
  const unmatched = new Set();
  let paidSessions = 0;
  let countedUnits = 0;
  let startingAfter;

  for (let page = 0; page < 5; page++) {
    const res = await stripe.checkout.sessions.list({
      limit: 100,
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    });

    for (const session of res.data) {
      if (session.payment_status !== "paid") continue;
      paidSessions++;

      const fromMeta = decodeItemsMetadata(session.metadata);
      if (fromMeta) {
        for (const entry of fromMeta) {
          const handle = entry?.h;
          const qty = Number(entry?.q) || 0;
          if (valid.has(handle)) {
            sold[handle] = (sold[handle] || 0) + qty;
            countedUnits += qty;
          } else if (handle) {
            unmatched.add(handle);
          }
        }
        continue;
      }

      // Older order — read its line items directly
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        limit: 50,
      });
      for (const item of lineItems.data) {
        const handle = lookup.get(item.description);
        if (handle) {
          sold[handle] = (sold[handle] || 0) + (item.quantity || 0);
          countedUnits += item.quantity || 0;
        } else if (item.description) {
          unmatched.add(item.description);
        }
      }
    }

    if (!res.has_more || res.data.length === 0) break;
    startingAfter = res.data[res.data.length - 1].id;
  }

  return {
    sold,
    ok: true,
    paidSessions,
    countedUnits,
    unmatched: [...unmatched],
  };
}

export async function getStockReport({ fresh = false } = {}) {
  if (!fresh && cache.result && Date.now() - cache.at < CACHE_MS) {
    return cache.result;
  }
  try {
    const result = await fetchSoldCounts();
    cache = { at: Date.now(), result };
    return result;
  } catch (err) {
    console.error("Stock lookup failed:", err);
    // Surface the failure instead of quietly reporting full stock
    return (
      cache.result || { sold: {}, ok: false, reason: err?.message || "Stripe request failed" }
    );
  }
}

export async function getSoldCounts(options) {
  return (await getStockReport(options)).sold;
}

// { handle: unitsStillAvailable } for every product that tracks stock
export async function getRemainingStock(options) {
  const { sold } = await getStockReport(options);
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
  const { sold } = await getStockReport(options);
  return Math.max(0, product.stock - (sold[handle] || 0));
}
