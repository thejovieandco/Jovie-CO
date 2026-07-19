"use client";

import { useState } from "react";

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="newsletter">
      <div className="container">
        <div className="eyebrow">Stay Connected</div>
        <h2>Be Part of the Legacy</h2>
        <p>New pieces, private sales, and the story as it unfolds — straight to your inbox.</p>
        {submitted ? (
          <p style={{ color: "#C7A15A" }}>You're on the list. Welcome.</p>
        ) : (
          <form className="news-form" onSubmit={handleSubmit}>
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  );
}
