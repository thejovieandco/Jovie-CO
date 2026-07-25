import {
  products,
  formatPrice,
  PREORDER,
  PREORDER_SHIP_DATE,
} from "../../../lib/products";

export const runtime = "edge";

// Public customer-facing shopping concierge. Uses the same
// ANTHROPIC_API_KEY as the owner assistant. Because this endpoint is
// public it enforces light abuse guards (history cap, message length,
// modest max_tokens) so a stranger can't run up large bills.
function buildSystemPrompt() {
  const catalog = products
    .map((p) => `- ${p.name} (${p.category}, ${formatPrice(p.price)}): ${p.description}`)
    .join("\n");

  const shipping = PREORDER
    ? `The founding collection is on PREORDER right now — every order ships ${PREORDER_SHIP_DATE}.`
    : `Pieces are in stock and ship within a few business days.`;

  return `You are the shopping concierge for Jovie & Co, a luxury jewelry brand whose pieces are made to be worn, loved, and passed down.

Voice: warm, gracious, unhurried, quietly confident. Lean into heirloom and legacy themes when it fits. No hype, no exclamation marks, no emoji. Keep replies short and genuinely useful — usually a sentence or three.

You help customers discover pieces, understand materials and care, ring sizing, shipping and returns, and preorder timing. Recommend specific pieces by name and price when it helps them decide.

${shipping}

Shipping & returns: We ship within the United States only. Standard shipping (USPS Ground Advantage) is $5.95 and arrives in 3–8 business days — free on orders of $50 and over. Priority shipping (USPS Priority Mail) is $12.95 and arrives in 2–5 business days. Both windows include 1–3 days of processing, and every order ships tracked. 30-day returns on unworn pieces in original packaging. Earrings are final sale for hygiene.

Ring sizing: offered in US sizes. Suggest measuring the inside diameter of a ring they already own (in millimeters), or wrapping a strip of paper around the finger and measuring it, and point them to the Ring Sizing page.

The current collection:
${catalog}

Rules:
- Only reference the pieces, prices, and policies given above. Never invent products, prices, or promises.
- For anything about an existing order, a return, or a delay, direct them to email thejovieandco@gmail.com or call/text (470) 331-2618.
- Never discuss internal costs, margins, or business operations.
- If asked something unrelated to jewelry or the store, gently steer back.`;
}

export async function POST(request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Chat isn't available right now." }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  let { messages } = body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "No messages to send." }, { status: 400 });
  }

  // Abuse guards: keep only recent turns, clamp each message length
  messages = messages.slice(-12).map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m?.content || "").slice(0, 2000),
  }));

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 700,
        system: buildSystemPrompt(),
        messages,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Concierge error:", res.status, detail);
      return Response.json({ error: "Sorry — I couldn't respond just now." }, { status: 502 });
    }

    const data = await res.json();
    const text = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    return Response.json({ text });
  } catch (err) {
    console.error("Concierge request failed:", err);
    return Response.json({ error: "Sorry — I couldn't respond just now." }, { status: 502 });
  }
}
