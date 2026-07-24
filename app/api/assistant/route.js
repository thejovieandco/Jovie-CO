export const runtime = "edge";

const SYSTEM_PROMPT = `You are the private studio assistant for Jovie & Co, a luxury jewelry brand whose pieces are made to be worn, loved, and passed down.

Voice: warm but restrained, unhurried, quietly confident. Lean into heirloom and legacy themes when it fits. Never use hype, exclamation marks, or emoji.

You help with:
- Product copy and descriptions
- Pricing math, including markup and Stripe fees (Stripe US charges 2.9% + $0.30 per successful card transaction)
- Customer emails and replies
- Practical site, operations, and launch work

Keep every answer tight and turnkey: deliver the finished thing, not a menu of options and no preamble. For pricing, show the final numbers plainly. For copy and emails, return text that can be used exactly as written.`;

export async function POST(request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const expectedPin = process.env.ASSISTANT_PIN;

  if (!apiKey || !expectedPin) {
    return Response.json(
      { error: "The assistant isn't configured yet." },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  const { pin, messages } = body || {};

  if (typeof pin !== "string" || pin !== expectedPin) {
    return Response.json({ error: "Incorrect passcode." }, { status: 401 });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "No messages to send." }, { status: 400 });
  }

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
        max_tokens: 1500,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Anthropic error:", res.status, detail);
      return Response.json(
        { error: "The assistant couldn't respond. Please try again." },
        { status: 502 }
      );
    }

    const data = await res.json();
    const text = (data.content || [])
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    return Response.json({ text });
  } catch (err) {
    console.error("Assistant request failed:", err);
    return Response.json(
      { error: "The assistant couldn't respond. Please try again." },
      { status: 502 }
    );
  }
}
