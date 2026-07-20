"use client";

import { useState } from "react";

export default function Newsletter() {
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [message, setMessage] = useState("");

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
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong — please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the list — please try again.");
    }
  }

  return (
    <section className="newsletter">
      <div className="container">
        <div className="eyebrow">Stay Connected</div>
        <h2>Be Part of the Legacy</h2>
        <p>New pieces, private sales, and the story as it unfolds — straight to your inbox.</p>
        {status === "done" ? (
          <p style={{ color: "#C7A15A" }}>{message}</p>
        ) : (
          <>
            <form className="news-form" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                required
                disabled={status === "loading"}
              />
              <button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Joining…" : "Subscribe"}
              </button>
            </form>
            {status === "error" && (
              <p style={{ color: "#e2a1a1", fontSize: 13, marginTop: 14 }}>{message}</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
