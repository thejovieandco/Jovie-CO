"use client";

import { useEffect, useRef, useState } from "react";

const PLUM = "#1A1418";
const BRASS = "#B08D57";
const CREAM = "#F2EDE6";
const PIN_KEY = "jovie-assistant-pin";

export default function AssistantPage() {
  const [pin, setPin] = useState(null);
  const [ready, setReady] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(PIN_KEY);
      if (saved) setPin(saved);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  function savePin(e) {
    e.preventDefault();
    const value = pinInput.trim();
    if (!value) return;
    try {
      window.localStorage.setItem(PIN_KEY, value);
    } catch {}
    setPin(value);
    setPinInput("");
    setError("");
  }

  function clearPin() {
    try {
      window.localStorage.removeItem(PIN_KEY);
    } catch {}
    setPin(null);
    setMessages([]);
    setError("");
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin, messages: next }),
      });
      const data = await res.json();

      if (res.status === 401) {
        setError("Passcode incorrect. Enter it again.");
        clearPin();
        return;
      }
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }
      setMessages([...next, { role: "assistant", content: data.text }]);
    } catch {
      setError("Couldn't reach the assistant. Please try again.");
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

  const page = {
    minHeight: "100dvh",
    background: PLUM,
    color: CREAM,
    fontFamily: "'Manrope', system-ui, sans-serif",
    display: "flex",
    flexDirection: "column",
    paddingTop: "env(safe-area-inset-top)",
    paddingBottom: "env(safe-area-inset-bottom)",
  };

  if (!ready) {
    return <div style={page} />;
  }

  // --- Passcode gate ---
  if (!pin) {
    return (
      <div style={{ ...page, alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <form onSubmit={savePin} style={{ width: "100%", maxWidth: 320, textAlign: "center" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, marginBottom: 6 }}>
            Jovie &amp; Co
          </div>
          <div style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: BRASS, marginBottom: 34 }}>
            Studio Assistant
          </div>
          <input
            type="password"
            inputMode="numeric"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            placeholder="Passcode"
            autoFocus
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              borderBottom: `1px solid ${BRASS}`,
              color: CREAM,
              fontSize: 18,
              textAlign: "center",
              padding: "12px 4px",
              outline: "none",
              letterSpacing: "0.3em",
            }}
          />
          <button
            type="submit"
            style={{
              marginTop: 28,
              width: "100%",
              background: BRASS,
              color: PLUM,
              border: "none",
              padding: "14px",
              fontSize: 12,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Enter
          </button>
          {error && <p style={{ color: "#e2a1a1", fontSize: 13, marginTop: 18 }}>{error}</p>}
        </form>
      </div>
    );
  }

  // --- Chat ---
  return (
    <div style={page}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 18px",
          borderBottom: `1px solid rgba(176,141,87,0.28)`,
        }}
      >
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20 }}>
          Jovie &amp; Co <span style={{ color: BRASS }}>Assistant</span>
        </span>
        <button
          onClick={clearPin}
          style={{
            background: "none",
            border: "none",
            color: BRASS,
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Lock
        </button>
      </header>

      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "20px 18px" }}>
        {messages.length === 0 && (
          <p style={{ color: "rgba(242,237,230,0.5)", fontSize: 14, textAlign: "center", marginTop: 40 }}>
            Product copy, pricing, customer emails, site work — ask away.
          </p>
        )}
        {messages.map((m, i) =>
          m.role === "user" ? (
            <div key={i} style={{ display: "flex", justifyContent: "flex-end", margin: "14px 0" }}>
              <div
                style={{
                  background: BRASS,
                  color: PLUM,
                  padding: "10px 14px",
                  borderRadius: "2px",
                  maxWidth: "82%",
                  fontSize: 15,
                  lineHeight: 1.5,
                  whiteSpace: "pre-wrap",
                }}
              >
                {m.content}
              </div>
            </div>
          ) : (
            <div
              key={i}
              style={{
                borderLeft: `1px solid ${BRASS}`,
                paddingLeft: 14,
                margin: "14px 0",
                maxWidth: "92%",
                fontSize: 15,
                lineHeight: 1.6,
                whiteSpace: "pre-wrap",
                color: CREAM,
              }}
            >
              {m.content}
            </div>
          )
        )}
        {loading && (
          <div style={{ borderLeft: `1px solid ${BRASS}`, paddingLeft: 14, margin: "14px 0", color: "rgba(242,237,230,0.5)", fontSize: 14 }}>
            Thinking…
          </div>
        )}
        {error && <p style={{ color: "#e2a1a1", fontSize: 13, marginTop: 10 }}>{error}</p>}
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          padding: "12px 14px",
          borderTop: `1px solid rgba(176,141,87,0.28)`,
          alignItems: "flex-end",
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Message the assistant…"
          rows={1}
          style={{
            flex: 1,
            background: "rgba(242,237,230,0.06)",
            border: `1px solid rgba(176,141,87,0.35)`,
            color: CREAM,
            fontSize: 15,
            padding: "11px 12px",
            outline: "none",
            resize: "none",
            fontFamily: "inherit",
            maxHeight: 140,
          }}
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          style={{
            background: BRASS,
            color: PLUM,
            border: "none",
            padding: "12px 18px",
            fontSize: 12,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 700,
            cursor: loading || !input.trim() ? "default" : "pointer",
            opacity: loading || !input.trim() ? 0.5 : 1,
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
