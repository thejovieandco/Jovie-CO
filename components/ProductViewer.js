"use client";

import { useRef, useState } from "react";

// Jewelry inspection viewer.
// Desktop: the photo tilts in 3D toward the cursor and a magnifying
// loupe follows it to show stone-level detail.
// Touch: tap to zoom in at that spot, drag to pan, tap again to zoom out.
export default function ProductViewer({ src, alt }) {
  const frameRef = useRef(null);
  const touchMoved = useRef(false);
  const [lens, setLens] = useState(null);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  function pointToPercent(clientX, clientY) {
    const rect = frameRef.current.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((clientY - rect.top) / rect.height) * 100));
    return { x, y };
  }

  // --- Desktop: tilt + loupe ---
  function handleMove(e) {
    const el = frameRef.current;
    if (!el || zoom) return;
    const { x, y } = pointToPercent(e.clientX, e.clientY);
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

  // --- Touch: tap to zoom, drag to pan ---
  function handleTouchStart() {
    touchMoved.current = false;
  }

  function handleTouchMove(e) {
    touchMoved.current = true;
    if (!zoom) return;
    const t = e.touches[0];
    setOrigin(pointToPercent(t.clientX, t.clientY));
  }

  function handleTouchEnd(e) {
    if (touchMoved.current) return; // it was a pan, not a tap
    if (zoom) {
      setZoom(false);
    } else {
      const t = e.changedTouches[0];
      setOrigin(pointToPercent(t.clientX, t.clientY));
      setZoom(true);
    }
  }

  return (
    <div className="viewer-wrap">
      <div
        className={`viewer-frame${zoom ? " is-zoomed" : ""}`}
        ref={frameRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={src}
          alt={alt}
          className="viewer-img"
          style={{
            transform: zoom ? "scale(2.6)" : "none",
            transformOrigin: `${origin.x}% ${origin.y}%`,
          }}
        />
        {lens && !zoom && (
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
            {zoom ? <path d="M8 11h6" /> : <path d="M8 11h6M11 8v6" />}
          </svg>
          {zoom ? "Tap to close" : "Inspect"}
        </span>
      </div>
      <p className="viewer-hint">
        <span className="hint-desktop">Move to turn the piece · hover to magnify the detail</span>
        <span className="hint-mobile">Tap to zoom · drag to explore · tap again to close</span>
      </p>
    </div>
  );
}
