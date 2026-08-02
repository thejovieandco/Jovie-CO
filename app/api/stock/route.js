import { NextResponse } from "next/server";
import { getStockReport } from "../../../lib/stock";
import { products } from "../../../lib/products";

// Live remaining stock for every tracked piece. Read by product cards and
// product pages so displayed counts reflect real orders.
// Add ?debug=1 to see what Stripe actually returned when a count looks wrong.
export const dynamic = "force-dynamic";

export async function GET(request) {
  const report = await getStockReport();

  const remaining = {};
  for (const product of products) {
    if (product.stock == null) continue;
    remaining[product.handle] = Math.max(
      0,
      product.stock - (report.sold[product.handle] || 0)
    );
  }

  const debug = new URL(request.url).searchParams.get("debug");
  const body = debug
    ? {
        remaining,
        diagnostics: {
          connectedToStripe: report.ok,
          reason: report.reason ?? null,
          paidSessionsFound: report.paidSessions ?? 0,
          unitsCounted: report.countedUnits ?? 0,
          sold: report.sold,
          unrecognisedItems: report.unmatched ?? [],
        },
      }
    : { remaining };

  return NextResponse.json(body, {
    headers: { "cache-control": "no-store" },
  });
}
