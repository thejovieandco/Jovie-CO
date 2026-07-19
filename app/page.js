import Link from "next/link";
import { products } from "../lib/products";
import ProductCard from "../components/ProductCard";
import Newsletter from "../components/Newsletter";
import HeroScene from "../components/HeroScene";
import Reveal from "../components/Reveal";
import Tilt3D from "../components/Tilt3D";

export default function Home() {
  const preview = products;

  return (
    <>
      <HeroScene />

      <section className="section" id="preview">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="eyebrow">A First Look</div>
              <h2>The Founding Collection</h2>
              <p>Eighteen pieces, each made to be kept. Pricing and full details are on the way — join the list below to be first to shop.</p>
            </div>
          </Reveal>
          <div className="grid-4">
            {preview.map((p, i) => (
              <Reveal key={p.handle} delay={(i % 4) * 90}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="diamond-divider">
        <span className="line"></span>
        <svg className="diamond-spin" viewBox="0 0 24 24" fill="none"><path d="M12 2 L22 9 L12 22 L2 9 Z" stroke="#C7A15A" strokeWidth="1.4" /></svg>
        <span className="line"></span>
      </div>

      <section className="section" id="story">
        <div className="container story">
          <Reveal>
            <Tilt3D className="story-tilt" max={7}>
              <div className="story-photo">
                <img
                  src="/products/twisted-marquise-ring.jpeg"
                  alt="The Twisted Marquise Ring — the first piece of the Jovie & Co legacy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </Tilt3D>
          </Reveal>
          <Reveal delay={140}>
            <div className="story-text">
              <div className="eyebrow">Our Story</div>
              <h2>Built to Be<br />Passed Down</h2>
              <p>
                Jovie &amp; Co was founded on a simple belief — that the best things
                we own should outlive us. Every piece we craft is the first chapter
                of a longer story: worn today, remembered tomorrow, and handed to
                the next generation as proof of where it all began.
              </p>
              <Link href="/pages/our-story" className="btn btn-outline">Read the Legacy</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section legacy-band">
        <div className="container">
          <Reveal>
            <div className="section-head" style={{ marginBottom: 40 }}>
              <div className="eyebrow" style={{ color: "var(--gold)" }}>The Jovie Standard</div>
              <h2 style={{ color: "var(--white)" }}>What a Legacy Is Made Of</h2>
            </div>
          </Reveal>
          <div className="grid-3 legacy-grid">
            {[
              { t: "Made to Last", d: "Materials chosen for decades of wear, not seasons of trend — plated, sealed, and finished to endure." },
              { t: "Made to Mean", d: "Every design begins with a moment worth marking. A piece should say something long after the day it was given." },
              { t: "Made to Pass On", d: "Timeless silhouettes that will feel as right on the next wrist as they do on yours." },
            ].map((item, i) => (
              <Reveal key={item.t} delay={i * 120}>
                <div className="legacy-card">
                  <svg viewBox="0 0 24 24" fill="none" className="legacy-diamond"><path d="M12 2 L22 9 L12 22 L2 9 Z" stroke="#C7A15A" strokeWidth="1.2" /></svg>
                  <h3>{item.t}</h3>
                  <p>{item.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingBottom: 60 }}>
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="eyebrow">Community</div>
              <h2>
                <a
                  href="https://www.instagram.com/thejovieandco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="insta-handle"
                >
                  @thejovieandco
                </a>
              </h2>
              <p>Follow along as the first collection comes to life.</p>
            </div>
          </Reveal>
        </div>
        <div className="insta-grid">
          {[
            "clover-necklace-green.webp",
            "celestial-moon-star-bracelet.webp",
            "butterfly-pendant-gold.webp",
            "halo-station-tennis-bracelet.webp",
            "clover-necklace-red.webp",
            "iridescent-butterfly-earrings.webp",
          ].map((img, i) => (
            <a
              className="insta-tile"
              key={i}
              href="https://www.instagram.com/thejovieandco"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Jovie & Co on Instagram"
            >
              <img src={`/products/${img}`} alt="Jovie & Co jewelry" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <span className="insta-overlay" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </section>

      <Newsletter />
    </>
  );
}
