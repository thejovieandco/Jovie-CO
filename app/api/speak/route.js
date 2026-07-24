export const runtime = "edge";

// Text-to-speech proxy. Streams ElevenLabs audio back to the client
// while keeping ELEVENLABS_API_KEY server-side (never sent to browser).
export async function POST(request) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;

  if (!apiKey || !voiceId) {
    return Response.json({ error: "Voice isn't configured yet." }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  const text = typeof body?.text === "string" ? body.text.trim() : "";
  if (!text) {
    return Response.json({ error: "No text to speak." }, { status: 400 });
  }

  try {
    const upstream = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "content-type": "application/json",
          accept: "audio/mpeg",
        },
        body: JSON.stringify({ text, model_id: "eleven_turbo_v2_5" }),
      }
    );

    if (!upstream.ok || !upstream.body) {
      const detail = await upstream.text().catch(() => "");
      console.error("ElevenLabs error:", upstream.status, detail);
      return Response.json({ error: "Voice generation failed." }, { status: 502 });
    }

    return new Response(upstream.body, {
      headers: {
        "content-type": "audio/mpeg",
        "cache-control": "no-store",
      },
    });
  } catch (err) {
    console.error("Speak request failed:", err);
    return Response.json({ error: "Voice generation failed." }, { status: 502 });
  }
}
