import Stripe from "stripe";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { PREORDER, PREORDER_SHIP_DATE } from "../../../lib/products";
import { clerkEnabled } from "../../../lib/clerk";

// Returns the signed-in customer's orders, read straight from Stripe by
// their verified email — no separate database needed.
// Must never be prerendered at build time: it depends on the signed-in user.
export const dynamic = "force-dynamic";

// Tracking numbers are added by hand in the Stripe dashboard after a piece
// ships: open the payment, add metadata `tracking_number` (and optionally
// `carrier`). No separate order database needed.
function trackingLink(number, carrier) {
  const n = String(number).replace(/[\s-]/g, "");
  const c = String(carrier || "").toLowerCase();
  if (c.includes("ups") || /^1Z/i.test(n)) return `https://www.ups.com/track?tracknum=${n}`;
  if (c.includes("fedex") || (!c && /^(\d{12}|\d{15})$/.test(n)))
    return `https://www.fedex.com/fedextrack/?trknbr=${n}`;
  return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${n}`;
}

function carrierName(number, carrier) {
  const n = String(number).replace(/[\s-]/g, "");
  const c = String(carrier || "").trim();
  if (c) return c.toUpperCase();
  if (/^1Z/i.test(n)) return "UPS";
  if (/^(\d{12}|\d{15})$/.test(n)) return "FedEx";
  return "USPS";
}

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
      expand: ["data.line_items", "data.payment_intent"],
    });

    const orders = sessions.data
      .filter((s) => s.payment_status === "paid")
      .map((s) => {
        const meta = { ...(s.metadata || {}), ...(s.payment_intent?.metadata || {}) };
        const number = (meta.tracking_number || meta.tracking || "").trim();
        const tracking = number
          ? {
              number,
              carrier: carrierName(number, meta.carrier),
              url: trackingLink(number, meta.carrier),
            }
          : null;

        return {
          id: s.id,
          date: new Date(s.created * 1000).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          total: s.amount_total,
          status: tracking ? "shipped" : PREORDER ? "preorder" : "processing",
          statusLabel: tracking
            ? "Shipped"
            : PREORDER
            ? `Preorder — ships ${PREORDER_SHIP_DATE}`
            : "Processing",
          tracking,
          items: (s.line_items?.data || []).map((li) => ({
            name: li.description,
            quantity: li.quantity,
          })),
        };
      });

    return NextResponse.json({ orders });
  } catch (err) {
    console.error("Orders lookup failed:", err);
    return NextResponse.json({ error: "Couldn't load your orders." }, { status: 500 });
  }
}
