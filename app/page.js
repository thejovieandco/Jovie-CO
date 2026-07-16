import Link from "next/link";
import { products } from "../lib/products";
import ProductCard from "../components/ProductCard";
import Newsletter from "../components/Newsletter";

export default function Home() {
  const preview = products;

  return (
    <>
      <section className="hero">
        <div className="hero-photo-note">
          <div className="hero-photo-note">
  <img
    src="/products/item-3.jpg"
    alt="Jovie & Co jewelry"
    style={{ width: "100%", height: "100%", objectFit: "cover" }}
  />
</div>
        <div className="hero-content">
          <div className="hero-eyebrow">Coming Soon</div>
          <h1>Timeless Jewelry.<br />Crafted to Last.</h1>
          <p>
            Inspired by love and designed to celebrate life's most meaningful moments.
            Our first collection is on its way — here's an early look.
          </p>
          <a href="#preview" className="btn">See a Preview</a>
        </div>
      </section>

      <section className="section" id="preview">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">A First Look</div>
            <h2>Coming to the Collection</h2>
            <p>Pricing and full details are on the way — join the list below to be first to shop.</p>
          </div>
          <div className="grid-4">
            {preview.map((p) => <ProductCard key={p.handle} product={p} />)}
          </div>
        </div>
      </section>

      <div className="diamond-divider">
        <span className="line"></span>
        <svg viewBox="0 0 24 24" fill="none"><path d="M12 2 L22 9 L12 22 L2 9 Z" stroke="#C7A15A" strokeWidth="1.4" /></svg>
        <span className="line"></span>
      </div>

      <section className="section" id="story">
        <div className="container story">
          <div className="story-photo"><div className="ph-label">Photography — hands, marble, gold detail</div></div>
          <div className="story-text">
            <div className="eyebrow">Our Story</div>
            <h2>Named for a Daughter<br />Not Yet Born</h2>
            <p>
              Jovie &amp; Co was created with one purpose — to craft timeless jewelry inspired by
              love, family, and the moments that matter most. Named after our future daughter,
              every piece is designed to become part of your story and be treasured for generations.
            </p>
            <Link href="/pages/our-story" className="btn btn-outline">Read Our Story</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Community</div>
            <h2>@jovieandco</h2>
          </div>
        </div>
        <div className="insta-grid">
          {Array.from({ length: 6 }).map((_, i) => <div className="insta-tile" key={i}></div>)}
        </div>
      </section>

      <Newsletter />
    </>
  );
}
