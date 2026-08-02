import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getProductByHandle, PREORDER, PREORDER_SHIP_DATE } from "../../../lib/products";
import { getRemainingStock, encodeItemsMetadata } from "../../../lib/stock";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

export async function POST(request) {
  try {
    const { items } = await request.json();

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe isn't configured yet. Add STRIPE_SECRET_KEY to your environment variables." },
        { status: 500 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
    }

    // Check live availability (starting stock minus everything already
    // sold through Stripe) so a piece can never be sold twice.
    const remaining = await getRemainingStock({ fresh: true });
    const unavailable = [];
    for (const { handle, quantity } of items) {
      const product = getProductByHandle(handle);
      if (!product || product.stock == null) continue;
      const left = remaining[handle] ?? product.stock;
      if (left <= 0) unavailable.push(`${product.name} is sold out`);
      else if (quantity > left) unavailable.push(`Only ${left} left of ${product.name}`);
    }
    if (unavailable.length > 0) {
      return NextResponse.json(
        { error: `${unavailable.join(". ")}. Please update your bag.` },
        { status: 409 }
      );
    }

    const line_items = items.map(({ handle, quantity }) => {
      const product = getProductByHandle(handle);
      if (!product) throw new Error(`Unknown product: ${handle}`);
      const left = remaining[handle];
      const capped = left != null ? Math.min(quantity, left) : quantity;
      return {
        quantity: capped,
        price_data: {
          currency: "usd",
          unit_amount: product.price,
          product_data: {
            name: product.name,
            ...(PREORDER && { description: `Preorder — ships ${PREORDER_SHIP_DATE}` }),
          },
        },
      };
    });

    const origin = request.headers.get("origin") || "http://localhost:3000";

    // Free standard shipping on orders of $50+ — keep in sync with the
    // announcement bar in components/Header.js
    const subtotal = line_items.reduce(
      (sum, li) => sum + li.price_data.unit_amount * li.quantity,
      0
    );
    const standardAmount = subtotal >= 5000 ? 0 : 595;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      // Record exactly which pieces were bought so inventory can be counted
      // without depending on matching product names later.
      metadata: { items: encodeItemsMetadata(items) },
      // US only — international rates are several times these, so shipping
      // abroad at a domestic rate would lose money on every order.
      shipping_address_collection: { allowed_countries: ["US"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: standardAmount, currency: "usd" },
            display_name: standardAmount === 0 ? "Standard Shipping — Free" : "Standard Shipping",
            // USPS Ground Advantage (2–5 business days) plus 1–3 days handling
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 8 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 1295, currency: "usd" },
            display_name: "Priority Shipping",
            // USPS Priority Mail (1–3 business days) plus 1–3 days handling
            delivery_estimate: {
              minimum: { unit: "business_day", value: 2 },
              maximum: { unit: "business_day", value: 5 },
            },
          },
        },
      ],
      // Jewelry is often bought as a gift — collect the message at checkout
      // so it can be hand-written on a card before the piece ships.
      custom_fields: [
        {
          key: "gift_note",
          label: { type: "custom", custom: "Gift note (optional)" },
          type: "text",
          optional: true,
          text: { maximum_length: 200 },
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Checkout failed. Please try again." }, { status: 500 });
  }
}
