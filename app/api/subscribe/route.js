import { NextResponse } from "next/server";

// Signups fan out to two destinations:
//  1. Mailchimp — the campaign list. Needs env vars in the hosting dashboard:
//     MAILCHIMP_API_KEY     (Account & billing -> Extras -> API keys)
//     MAILCHIMP_AUDIENCE_ID (Audience -> Settings -> Audience name and defaults)
//  2. Formspree — emails each signup to the owner's inbox. Paste the form
//     endpoint below once created, e.g. "https://formspree.io/f/abcd1234".
//     Not a secret. Leave "" to skip.
// The subscriber sees success if at least one destination accepts them.
const FORMSPREE_ENDPOINT = "";

async function sendToFormspree(email) {
  if (!FORMSPREE_ENDPOINT) return false;
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email, source: "website signup" }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function sendToMailchimp(email) {
  // Trim to survive stray spaces/newlines from pasting on a phone
  const key = (process.env.MAILCHIMP_API_KEY || "").trim();
  const listId = (process.env.MAILCHIMP_AUDIENCE_ID || "").trim();
  if (!key || !listId) return { configured: false };

  const dc = key.split("-")[1];
  if (!dc) {
    console.error("MAILCHIMP_API_KEY has no data-center suffix (expected something like xxxx-us21)");
    return {
      configured: true,
      ok: false,
      error: "Setup issue: the API key looks incomplete — it should end in something like -us21.",
    };
  }

  try {
    const res = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${key}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_address: email, status: "subscribed", tags: ["website"] }),
    });
    const data = await res.json();

    if (res.ok) return { configured: true, ok: true, message: "You're on the list. Welcome." };
    if (data.title === "Member Exists")
      return { configured: true, ok: true, message: "You're already on the list — welcome back." };
    if (data.title === "Invalid Resource")
      return { configured: true, ok: false, badEmail: true, error: "That email doesn't look right — double-check it?" };

    console.error("Mailchimp error:", res.status, data.title, data.detail);
    if (res.status === 401)
      return { configured: true, ok: false, error: "Setup issue: Mailchimp rejected the API key — re-copy MAILCHIMP_API_KEY." };
    if (res.status === 404)
      return { configured: true, ok: false, error: "Setup issue: audience not found — re-copy MAILCHIMP_AUDIENCE_ID." };
    return { configured: true, ok: false, error: "Couldn't add you right now — please try again." };
  } catch (err) {
    console.error("Mailchimp request failed:", err);
    return { configured: true, ok: false, error: "Couldn't add you right now — please try again." };
  }
}

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const [mailchimp, formspreeOk] = await Promise.all([
      sendToMailchimp(email),
      sendToFormspree(email),
    ]);

    if (mailchimp.configured && mailchimp.ok) {
      return NextResponse.json({ message: mailchimp.message });
    }
    if (mailchimp.badEmail) {
      return NextResponse.json({ error: mailchimp.error }, { status: 400 });
    }
    // Mailchimp failed or isn't set up — Formspree can still save the signup
    if (formspreeOk) {
      return NextResponse.json({ message: "You're on the list. Welcome." });
    }
    if (mailchimp.configured) {
      return NextResponse.json({ error: mailchimp.error }, { status: 500 });
    }
    return NextResponse.json(
      { error: "The list isn't connected yet — please try again soon." },
      { status: 500 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Couldn't add you right now — please try again." },
      { status: 500 }
    );
  }
}
