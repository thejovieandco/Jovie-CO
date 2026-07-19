import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getProductByHandle } from "../../../lib/products";

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

    const line_items = items.map(({ handle, quantity }) => {
      const product = getProductByHandle(handle);
      if (!product) throw new Error(`Unknown product: ${handle}`);
      return {
        quantity,
        price_data: {
          currency: "usd",
          unit_amount: product.price,
          product_data: { name: product.name },
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
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: standardAmount, currency: "usd" },
            display_name: standardAmount === 0 ? "Standard Shipping — Free" : "Standard Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 8 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 1495, currency: "usd" },
            display_name: "Express Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 2 },
              maximum: { unit: "business_day", value: 3 },
            },
          },
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
