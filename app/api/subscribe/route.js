import { NextResponse } from "next/server";

// Adds a subscriber to the Mailchimp audience.
// Requires two environment variables (set in the hosting dashboard):
//   MAILCHIMP_API_KEY      - Account & billing -> Extras -> API keys
//   MAILCHIMP_AUDIENCE_ID  - Audience -> Settings -> Audience name and defaults
export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const key = process.env.MAILCHIMP_API_KEY;
    const listId = process.env.MAILCHIMP_AUDIENCE_ID;
    if (!key || !listId) {
      return NextResponse.json(
        { error: "The list isn't connected yet — please try again soon." },
        { status: 500 }
      );
    }

    // The data center is the suffix of the API key, e.g. "us21"
    const dc = key.split("-")[1];
    const res = await fetch(
      `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${key}`).toString("base64")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
          tags: ["website"],
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      return NextResponse.json({ message: "You're on the list. Welcome." });
    }
    if (data.title === "Member Exists") {
      return NextResponse.json({ message: "You're already on the list — welcome back." });
    }
    if (data.title === "Invalid Resource") {
      return NextResponse.json(
        { error: "That email doesn't look right — double-check it?" },
        { status: 400 }
      );
    }

    console.error("Mailchimp error:", data.title, data.detail);
    return NextResponse.json(
      { error: "Couldn't add you right now — please try again." },
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
