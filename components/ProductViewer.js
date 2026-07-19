"use client";

import { useRef, useState } from "react";

// Jewelry inspection viewer: the photo tilts in 3D toward the cursor
// like a piece turned under light, and a magnifying loupe follows the
// cursor to show stone-level detail. Falls back to a plain photo on
// touch devices.
export default function ProductViewer({ src, alt }) {
  const frameRef = useRef(null);
  const [lens, setLens] = useState(null);

  function handleMove(e) {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLens({ x, y });
    el.style.setProperty("--rx", `${(0.5 - y / 100) * 9}deg`);
    el.style.setProperty("--ry", `${(x / 100 - 0.5) * 9}deg`);
  }

  function handleLeave() {
    const el = frameRef.current;
    setLens(null);
    if (el) {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    }
  }

  return (
    <div className="viewer-wrap">
      <div
        className="viewer-frame"
        ref={frameRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <img src={src} alt={alt} />
        {lens && (
          <div
            className="viewer-lens"
            aria-hidden="true"
            style={{
              left: `${lens.x}%`,
              top: `${lens.y}%`,
              backgroundImage: `url(${src})`,
              backgroundPosition: `${lens.x}% ${lens.y}%`,
            }}
          />
        )}
        <span className="viewer-badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          Inspect
        </span>
      </div>
      <p className="viewer-hint">Move to turn the piece · hover to magnify the detail</p>
    </div>
  );
}
