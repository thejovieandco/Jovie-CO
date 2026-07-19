import Link from "next/link";
import Reveal from "../../../components/Reveal";
import Tilt3D from "../../../components/Tilt3D";

export const metadata = {
  title: "Our Story | Jovie & Co",
  description:
    "Jovie & Co was founded on a simple belief — that the best things we own should outlive us. This is the legacy we're building, one piece at a time.",
};

export default function OurStoryPage() {
  return (
    <>
      <section className="story-hero">
        <div className="container">
          <Reveal>
            <div className="eyebrow">Our Story</div>
            <h1>A Legacy,<br />Not a Label.</h1>
            <p>
              Some jewelry is bought for a season. Ours is made for a lineage.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 70 }}>
        <div className="container story">
          <Reveal className="from-left">
            <Tilt3D className="story-tilt" max={7}>
              <div className="story-photo">
                <img
                  src="/products/twisted-marquise-ring.jpeg"
                  alt="The Twisted Marquise Ring — where the Jovie & Co legacy begins"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </Tilt3D>
          </Reveal>
          <Reveal delay={140} className="from-right">
            <div className="story-text">
              <div className="eyebrow">Where It Begins</div>
              <h2>The First Chapter</h2>
              <p>
                Jovie &amp; Co began with a question: what do we leave behind?
                Not everything we own survives us — but the right things do.
                A ring worn at every milestone. A necklace that shows up in
                photographs across decades. Jewelry, done right, becomes the
                physical memory of a family.
              </p>
              <p>
                So we set out to build a house whose every piece is designed to
                be inherited. Timeless over trendy. Made to be worn hard and
                loved long. That is the standard behind our founding collection,
                and every collection that will follow it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="diamond-divider">
        <span className="line"></span>
        <svg className="diamond-spin" viewBox="0 0 24 24" fill="none"><path d="M12 2 L22 9 L12 22 L2 9 Z" stroke="#C7A15A" strokeWidth="1.4" /></svg>
        <span className="line"></span>
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="eyebrow">The Promise</div>
              <h2>Three Generations From Now</h2>
              <p>
                We measure our work on one timeline: will this piece still matter
                three generations from now? If the answer is no, it doesn't leave
                the atelier. That's the whole philosophy — and the whole brand.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ textAlign: "center" }}>
              <Link href="/#preview" className="btn">See the Founding Collection</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
