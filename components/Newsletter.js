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
        <p>Early access to the founding collection, private sales, and the story as it unfolds.</p>
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
