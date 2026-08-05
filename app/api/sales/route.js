import { NextResponse } from "next/server";
import { getSalesReport } from "../../../lib/sales";

// Owner-only. Guarded by the same passcode as the studio assistant, and
// never cached — this is real revenue data.
export const dynamic = "force-dynamic";

export async function POST(request) {
  const expectedPin = (process.env.ASSISTANT_PIN || "").trim();
  if (!expectedPin) {
    return NextResponse.json(
      { error: "Set ASSISTANT_PIN in your environment to use the sales page." },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  if (typeof body?.pin !== "string" || body.pin !== expectedPin) {
    return NextResponse.json({ error: "Incorrect passcode." }, { status: 401 });
  }

  try {
    const report = await getSalesReport();
    if (!report.ok) {
      return NextResponse.json({ error: report.reason }, { status: 503 });
    }
    return NextResponse.json(report, {
      headers: { "cache-control": "no-store" },
    });
  } catch (err) {
    console.error("Sales report failed:", err);
    return NextResponse.json(
      { error: "Couldn't reach Stripe. Please try again." },
      { status: 502 }
    );
  }
}
