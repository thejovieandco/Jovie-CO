"use client";

import { useEffect, useState } from "react";

const DISMISS_KEY = "jovie-popup-dismissed";
const SUBSCRIBED_KEY = "jovie-subscribed";
const DISMISS_DAYS = 7;

// Email capture pop-up. Shows once, a few seconds after arriving.
// Never shows again after subscribing; waits a week after a dismissal.
// Stays away from the cart and checkout so it can't interrupt a purchase.
export default function EmailPopup() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      if (window.localStorage.getItem(SUBSCRIBED_KEY)) return;
      const dismissed = Number(window.localStorage.getItem(DISMISS_KEY) || 0);
      if (Date.now() - dismissed < DISMISS_DAYS * 24 * 3600 * 1000) return;
    } catch (e) {
      // storage unavailable — fall through and show once
    }
    const timer = setTimeout(() => {
      const path = window.location.pathname;
      if (path.startsWith("/cart") || path.startsWith("/checkout")) return;
      setOpen(true);
    }, 5500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") dismiss();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function dismiss() {
    setOpen(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch (e) {}
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.elements.email.value.trim();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("done");
        setMessage(data.message || "You're on the list. Welcome.");
        try {
          window.localStorage.setItem(SUBSCRIBED_KEY, "1");
        } catch (err) {}
        setTimeout(() => setOpen(false), 2600);
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong — please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the list — please try again.");
    }
  }

  if (!open) return null;

  return (
    <div className="popup-backdrop" onClick={dismiss}>
      <div
        className="popup"
        role="dialog"
        aria-modal="true"
        aria-label="Join the Jovie & Co list"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="popup-close" onClick={dismiss} aria-label="Close">
          ×
        </button>
        <svg className="popup-diamond" viewBox="0 0 24 24" fill="none">
          <path d="M12 2 L22 9 L12 22 L2 9 Z" stroke="#C7A15A" strokeWidth="1.4" />
        </svg>
        <div className="popup-eyebrow">Jovie &amp; Co</div>
        <h3>Be Part of the Legacy</h3>
        <p>
          Early access to new pieces, private sales, and first word when
          preorders ship — straight to your inbox.
        </p>
        {status === "done" ? (
          <p className="popup-success">{message}</p>
        ) : (
          <>
            <form className="popup-form" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                required
                disabled={status === "loading"}
              />
              <button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Joining…" : "Join the List"}
              </button>
            </form>
            {status === "error" && <p className="popup-error">{message}</p>}
            <button className="popup-skip" onClick={dismiss}>
              No thanks
            </button>
          </>
        )}
      </div>
    </div>
  );
}
