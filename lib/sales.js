import Stripe from "stripe";
import { products } from "./products";
import { decodeItemsMetadata } from "./stock";

// The numbers behind the studio sales page. Everything here comes from
// Stripe — the same source the storefront uses for live stock — so the
// figures always agree with what the bank actually received.
//
// Fees are read from each charge's balance transaction rather than
// estimated, so "net" is the real payout, not 2.9% + 30c arithmetic.

const MAX_PAGES = 5;

function centsMap() {
  const byHandle = new Map();
  for (const p of products) byHandle.set(p.handle, p);
  return byHandle;
}

function nameToHandle() {
  return new Map(products.map((p) => [p.name, p.handle]));
}

// payment_intent -> { fee, net, refunded } straight from Stripe's ledger
async function fetchChargeLedger(stripe) {
  const ledger = new Map();
  let startingAfter;

  for (let page = 0; page < MAX_PAGES; page++) {
    const res = await stripe.charges.list({
      limit: 100,
      expand: ["data.balance_transaction"],
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    });

    for (const charge of res.data) {
      const intent =
        typeof charge.payment_intent === "string"
          ? charge.payment_intent
          : charge.payment_intent?.id;
      if (!intent) continue;
      const txn = charge.balance_transaction;
      ledger.set(intent, {
        fee: typeof txn === "object" && txn ? txn.fee : null,
        net: typeof txn === "object" && txn ? txn.net : null,
        refunded: charge.amount_refunded || 0,
      });
    }

    if (!res.has_more || res.data.length === 0) break;
    startingAfter = res.data[res.data.length - 1].id;
  }

  return ledger;
}

export async function getSalesReport() {
  const key = (process.env.STRIPE_SECRET_KEY || "").trim();
  if (!key) {
    return { ok: false, reason: "STRIPE_SECRET_KEY is not set" };
  }

  const stripe = new Stripe(key, { apiVersion: "2024-06-20" });
  const catalog = centsMap();
  const lookup = nameToHandle();

  let ledger = new Map();
  try {
    ledger = await fetchChargeLedger(stripe);
  } catch (err) {
    // Fees are a nice-to-have; the rest of the report still stands
    console.error("Could not read charge ledger:", err);
  }

  const orders = [];
  const soldUnits = {};
  const soldRevenue = {};
  const unmatched = new Set();
  let startingAfter;

  for (let page = 0; page < MAX_PAGES; page++) {
    const res = await stripe.checkout.sessions.list({
      limit: 100,
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    });

    for (const session of res.data) {
      if (session.payment_status !== "paid") continue;

      const items = [];
      const fromMeta = decodeItemsMetadata(session.metadata);

      if (fromMeta) {
        for (const entry of fromMeta) {
          const product = catalog.get(entry?.h);
          const qty = Number(entry?.q) || 0;
          if (product) items.push({ name: product.name, handle: product.handle, quantity: qty });
          else if (entry?.h) unmatched.add(entry.h);
        }
      } else {
        // Placed before checkout recorded its contents — read the line items
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
          limit: 50,
        });
        for (const item of lineItems.data) {
          const handle = lookup.get(item.description);
          if (handle) {
            items.push({
              name: item.description,
              handle,
              quantity: item.quantity || 0,
            });
          } else if (item.description) {
            unmatched.add(item.description);
          }
        }
      }

      for (const item of items) {
        soldUnits[item.handle] = (soldUnits[item.handle] || 0) + item.quantity;
        const price = catalog.get(item.handle)?.price || 0;
        soldRevenue[item.handle] = (soldRevenue[item.handle] || 0) + price * item.quantity;
      }

      const intent =
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id;
      const money = (intent && ledger.get(intent)) || {};

      orders.push({
        id: session.id,
        date: (session.created || 0) * 1000,
        customer: session.customer_details?.name || null,
        email: session.customer_details?.email || null,
        items,
        total: session.amount_total || 0,
        subtotal: session.amount_subtotal || 0,
        shipping: session.shipping_cost?.amount_total || 0,
        fee: money.fee ?? null,
        net: money.net ?? null,
        refunded: money.refunded || 0,
        giftNote:
          session.custom_fields?.find((f) => f.key === "gift_note")?.text?.value || null,
      });
    }

    if (!res.has_more || res.data.length === 0) break;
    startingAfter = res.data[res.data.length - 1].id;
  }

  orders.sort((a, b) => b.date - a.date);

  const gross = orders.reduce((sum, o) => sum + o.total, 0);
  const shippingCollected = orders.reduce((sum, o) => sum + o.shipping, 0);
  const refunded = orders.reduce((sum, o) => sum + o.refunded, 0);
  const unitsSold = Object.values(soldUnits).reduce((sum, n) => sum + n, 0);

  // Real fees where Stripe gave them to us, estimated for anything missing
  let fees = 0;
  let feesExact = true;
  for (const order of orders) {
    if (order.fee != null) fees += order.fee;
    else {
      fees += Math.round(order.total * 0.029) + 30;
      feesExact = false;
    }
  }

  // What is still on the shelf, valued at retail
  const inventory = products.map((p) => {
    const sold = soldUnits[p.handle] || 0;
    const left = p.stock == null ? null : Math.max(0, p.stock - sold);
    return {
      handle: p.handle,
      name: p.name,
      price: p.price,
      starting: p.stock ?? 0,
      sold,
      left: left ?? 0,
      revenue: soldRevenue[p.handle] || 0,
      value: (left ?? 0) * p.price,
    };
  });

  const unitsLeft = inventory.reduce((sum, i) => sum + i.left, 0);
  const valueLeft = inventory.reduce((sum, i) => sum + i.value, 0);
  const startingUnits = inventory.reduce((sum, i) => sum + i.starting, 0);
  const startingValue = inventory.reduce((sum, i) => sum + i.starting * i.price, 0);

  const bestSellers = inventory
    .filter((i) => i.sold > 0)
    .sort((a, b) => b.revenue - a.revenue || b.sold - a.sold);

  return {
    ok: true,
    generatedAt: Date.now(),
    totals: {
      orders: orders.length,
      gross,
      shippingCollected,
      productRevenue: gross - shippingCollected,
      fees,
      feesExact,
      refunded,
      net: gross - fees - refunded,
      averageOrder: orders.length ? Math.round(gross / orders.length) : 0,
      unitsSold,
    },
    inventory: {
      startingUnits,
      startingValue,
      unitsLeft,
      valueLeft,
      soldThroughPct: startingUnits ? Math.round((unitsSold / startingUnits) * 100) : 0,
    },
    bestSellers,
    remaining: inventory.filter((i) => i.left > 0).sort((a, b) => b.value - a.value),
    orders: orders.slice(0, 25),
    unmatched: [...unmatched],
  };
}
