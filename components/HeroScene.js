"use client";

import { useEffect, useRef } from "react";
import Tilt3D from "./Tilt3D";

// Fixed positions so the server and client render the same particles.
const SPARKS = [
  { x: 8, y: 22, s: 5, d: 0 }, { x: 16, y: 68, s: 3, d: 2.1 },
  { x: 26, y: 38, s: 4, d: 4.3 }, { x: 34, y: 80, s: 3, d: 1.2 },
  { x: 44, y: 16, s: 5, d: 3.4 }, { x: 52, y: 58, s: 3, d: 5.6 },
  { x: 61, y: 30, s: 4, d: 0.8 }, { x: 68, y: 74, s: 5, d: 2.9 },
  { x: 76, y: 20, s: 3, d: 4.9 }, { x: 84, y: 52, s: 4, d: 1.7 },
  { x: 91, y: 34, s: 3, d: 3.8 }, { x: 95, y: 70, s: 5, d: 0.4 },
];

export default function HeroScene() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function onMove(e) {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--mx", x.toFixed(4));
      el.style.setProperty("--my", y.toFixed(4));
    }
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="hero hero-3d" ref={ref}>
      <div className="hero-depth hero-depth-glow" aria-hidden="true" />
      <div className="hero-sparks" aria-hidden="true">
        {SPARKS.map((p, i) => (
          <span
            key={i}
            className="spark"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.s,
              height: p.s,
              animationDelay: `${p.d}s`,
            }}
          />
        ))}
      </div>

      <div className="container hero-3d-grid">
        <div className="hero-content hero-layer-text">
          <div className="hero-eyebrow">The Founding Collection</div>
          <h1>Crafted Today.<br />Treasured for<br />Generations.</h1>
          <p>
            Every piece we make is designed to outlive the moment it marks —
            jewelry meant to be worn, loved, and one day passed on.
            Our first collection is almost here.
          </p>
          <div className="hero-actions">
            <a href="#preview" className="btn">See the Collection</a>
            <a href="/pages/our-story" className="btn btn-outline">The Legacy</a>
          </div>
        </div>

        <div className="hero-layer-art" aria-hidden="false">
          <div className="hero-ring-halo" aria-hidden="true" />
          <Tilt3D className="hero-ring-card" max={14}>
            <img
              src="/products/twisted-marquise-ring.jpeg"
              alt="Twisted Marquise Ring — from the Jovie & Co founding collection"
            />
          </Tilt3D>
          <div className="hero-float-chip chip-a">Est. to be inherited</div>
          <div className="hero-float-chip chip-b">The Founding 18</div>
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
