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

  const [speechSupported, setSpeechSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [convoMode, setConvoMode] = useState(false);

  const scrollRef = useRef(null);
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);
  const finalRef = useRef("");
  const sendOnEndRef = useRef(false);

  // Refs mirroring state/functions for use inside long-lived callbacks
  const messagesRef = useRef(messages);
  const pinRef = useRef(pin);
  const convoRef = useRef(convoMode);
  const supportRef = useRef(false);
  const sendRef = useRef(() => {});
  const listenRef = useRef(() => {});
  messagesRef.current = messages;
  pinRef.current = pin;
  convoRef.current = convoMode;

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(PIN_KEY);
      if (saved) setPin(saved);
    } catch {}
    setReady(true);
  }, []);

  // Set up speech recognition once (feature-detected)
  useEffect(() => {
    const SR =
      typeof window !== "undefined" &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SR) return;
    setSpeechSupported(true);
    supportRef.current = true;

    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.continuous = true;

    rec.onresult = (e) => {
      let interim = "";
      let final = finalRef.current;
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const chunk = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += chunk;
        else interim += chunk;
      }
      finalRef.current = final;
      setInput((final + interim).trim());
    };
    rec.onend = () => {
      setListening(false);
      if (sendOnEndRef.current) {
        sendOnEndRef.current = false;
        const text = finalRef.current.trim();
        if (text) sendRef.current(text);
      }
    };
    rec.onerror = () => {
      setListening(false);
      sendOnEndRef.current = false;
    };

    recognitionRef.current = rec;
    return () => {
      try {
        rec.abort();
      } catch {}
    };
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
    stopAudio();
    setPin(null);
    setMessages([]);
    setConvoMode(false);
    setError("");
  }

  function stopAudio() {
    const a = audioRef.current;
    if (a) {
      try {
        a.pause();
      } catch {}
      audioRef.current = null;
    }
    setSpeaking(false);
  }

  function reopenMicIfConvo() {
    if (convoRef.current && supportRef.current) {
      setTimeout(() => listenRef.current(), 250);
    }
  }

  function startListening() {
    const rec = recognitionRef.current;
    if (!rec || listening) return;
    stopAudio();
    finalRef.current = "";
    setInput("");
    setError("");
    try {
      rec.start();
      setListening(true);
    } catch {}
  }
  listenRef.current = startListening;

  function toggleMic() {
    if (listening) {
      // Stop and send whatever was captured
      sendOnEndRef.current = true;
      try {
        recognitionRef.current.stop();
      } catch {}
    } else {
      startListening();
    }
  }

  async function speak(text) {
    if (!text) return reopenMicIfConvo();
    try {
      const res = await fetch("/api/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) {
        // Voice unavailable — reply is already shown as text; keep going
        reopenMicIfConvo();
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      stopAudio();
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => {
        URL.revokeObjectURL(url);
        if (audioRef.current === audio) audioRef.current = null;
        setSpeaking(false);
        reopenMicIfConvo();
      };
      audio.onerror = () => {
        URL.revokeObjectURL(url);
        if (audioRef.current === audio) audioRef.current = null;
        setSpeaking(false);
        reopenMicIfConvo();
      };
      setSpeaking(true);
      await audio.play();
    } catch {
      setSpeaking(false);
      reopenMicIfConvo();
    }
  }

  async function sendMessage(text) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const next = [...messagesRef.current, { role: "user", content }];
    setMessages(next);
    setInput("");
    finalRef.current = "";
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinRef.current, messages: next }),
      });
      const data = await res.json();

      if (res.status === 401) {
        setError("Passcode incorrect. Enter it again.");
        clearPin();
        return;
      }
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        reopenMicIfConvo();
        return;
      }
      setMessages([...next, { role: "assistant", content: data.text }]);
      speak(data.text);
    } catch {
      setError("Couldn't reach the assistant. Please try again.");
      reopenMicIfConvo();
    } finally {
      setLoading(false);
    }
  }
  sendRef.current = sendMessage;

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function onScrollAreaTap() {
    // Tapping during playback interrupts and reopens the mic
    if (speaking) {
      stopAudio();
      startListening();
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

  if (!ready) return <div style={page} />;

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
          gap: 12,
        }}
      >
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, whiteSpace: "nowrap" }}>
          Jovie &amp; Co <span style={{ color: BRASS }}>Assistant</span>
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {speechSupported && (
            <button
              onClick={() => setConvoMode((v) => !v)}
              aria-pressed={convoMode}
              style={{
                background: convoMode ? BRASS : "transparent",
                color: convoMode ? PLUM : BRASS,
                border: `1px solid ${BRASS}`,
                borderRadius: 999,
                padding: "6px 12px",
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 700,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Hands-free {convoMode ? "On" : "Off"}
            </button>
          )}
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
        </div>
      </header>

      <div
        ref={scrollRef}
        onClick={onScrollAreaTap}
        style={{ flex: 1, overflowY: "auto", padding: "20px 18px", cursor: speaking ? "pointer" : "auto" }}
      >
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
        {speaking && (
          <p style={{ color: BRASS, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 8 }}>
            Speaking — tap to interrupt
          </p>
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
          placeholder={listening ? "Listening…" : "Message the assistant…"}
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
        {speechSupported && (
          <button
            onClick={toggleMic}
            aria-label={listening ? "Stop and send" : "Start voice input"}
            style={{
              background: listening ? BRASS : "transparent",
              border: `1px solid ${BRASS}`,
              padding: "10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={listening ? PLUM : BRASS} strokeWidth="1.7">
              <rect x="9" y="3" width="6" height="12" rx="3" />
              <path d="M5 11a7 7 0 0 0 14 0" />
              <path d="M12 18v3" />
            </svg>
          </button>
        )}
        <button
          onClick={() => sendMessage()}
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
            flexShrink: 0,
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
