"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const WELCOME =
  "Welcome to Jovie & Co. I'm an AI assistant — I can help you find a piece, or with sizing, shipping, and delivery times. For anything about an existing order, email thejovieandco@gmail.com and a person will reply.";
const SUGGESTIONS = [
  "Help me choose a necklace",
  "How does ring sizing work?",
  "How quickly will my order arrive?",
];

export default function ConciergeChat() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, loading, open]);

  // The private owner assistant is a full-screen tool — no customer widget there
  if (pathname && pathname.startsWith("/assistant")) return null;

  async function send(text) {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }
      setMessages([...next, { role: "assistant", content: data.text }]);
    } catch {
      setError("Couldn't reach the concierge. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {!open && (
        <button className="concierge-launcher" onClick={() => setOpen(true)} aria-label="Chat with our concierge">
          <span className="concierge-orb" aria-hidden="true" />
          <span className="lbl">Concierge</span>
        </button>
      )}

      {open && (
        <div className="concierge-panel" role="dialog" aria-label="Jovie & Co concierge">
          <div className="concierge-head">
            <div>
              <div className="t">Jovie &amp; Co</div>
              <div className="s">AI Concierge</div>
            </div>
            <button className="concierge-close" onClick={() => setOpen(false)} aria-label="Close chat">
              ×
            </button>
          </div>

          <div className="concierge-body" ref={bodyRef}>
            <div className="concierge-msg-bot">{WELCOME}</div>
            {messages.length === 0 && (
              <div className="concierge-suggest">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}
            {messages.map((m, i) =>
              m.role === "user" ? (
                <div className="concierge-msg-user" key={i}>
                  <div>{m.content}</div>
                </div>
              ) : (
                <div className="concierge-msg-bot" key={i}>
                  {m.content}
                </div>
              )
            )}
            {loading && (
              <div className="concierge-msg-bot" style={{ opacity: 0.55 }}>
                Typing…
              </div>
            )}
            {error && <p style={{ color: "#b23b3b", fontSize: 13, marginTop: 8 }}>{error}</p>}
          </div>

          <div className="concierge-input">
            <label htmlFor="concierge-message" className="visually-hidden">
              Message the Jovie &amp; Co AI concierge
            </label>
            <textarea
              id="concierge-message"
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask us anything…"
            />
            <button onClick={() => send()} disabled={loading || !input.trim()}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
