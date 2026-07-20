import Stripe from "stripe";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { PREORDER, PREORDER_SHIP_DATE } from "../../../lib/products";
import { clerkEnabled } from "../../../lib/clerk";

// Returns the signed-in customer's orders, read straight from Stripe by
// their verified email — no separate database needed.
export async function GET() {
  try {
    if (!clerkEnabled) {
      return NextResponse.json({ error: "Accounts aren't enabled yet." }, { status: 501 });
    }
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Orders aren't available yet." }, { status: 501 });
    }

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Please sign in." }, { status: 401 });
    }
    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) {
      return NextResponse.json({ error: "No email on your account." }, { status: 400 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });

    const sessions = await stripe.checkout.sessions.list({
      customer_details: { email },
      limit: 20,
      expand: ["data.line_items"],
    });

    const orders = sessions.data
      .filter((s) => s.payment_status === "paid")
      .map((s) => ({
        id: s.id,
        date: new Date(s.created * 1000).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        total: s.amount_total,
        status: PREORDER ? "preorder" : "processing",
        statusLabel: PREORDER ? `Preorder — ships ${PREORDER_SHIP_DATE}` : "Processing",
        items: (s.line_items?.data || []).map((li) => ({
          name: li.description,
          quantity: li.quantity,
        })),
      }));

    return NextResponse.json({ orders });
  } catch (err) {
    console.error("Orders lookup failed:", err);
    return NextResponse.json({ error: "Couldn't load your orders." }, { status: 500 });
  }
}
