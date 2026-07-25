import { NextResponse } from "next/server";
import { getRemainingStock } from "../../../lib/stock";

// Live remaining stock for every tracked piece. Read by product cards and
// product pages so displayed counts reflect real orders.
export const dynamic = "force-dynamic";

export async function GET() {
  const remaining = await getRemainingStock();
  return NextResponse.json(
    { remaining },
    { headers: { "cache-control": "public, max-age=30" } }
  );
}
