import Link from "next/link";
import Reveal from "../../../components/Reveal";

export const metadata = {
  title: "Sustainability | Jovie & Co",
  description:
    "Jewelry made to be kept is sustainability in its oldest form. How Jovie & Co thinks about materials, packaging, and permanence.",
};

export default function SustainabilityPage() {
  return (
    <div className="container">
      <Reveal>
        <div className="info-page">
          <div className="eyebrow">Our Responsibility</div>
          <h1>Sustainability</h1>
          <p className="info-lead">
            The most sustainable piece of jewelry is the one that never gets thrown away.
          </p>

          <h2>Made to Be Kept</h2>
          <p>
            Fast fashion treats jewelry as disposable — worn a season, tarnished, replaced.
            We build against that. Every Jovie &amp; Co piece is designed around timeless
            silhouettes and durable construction, because a piece that's passed down is a
            piece that never becomes waste. Longevity isn't just our brand promise; it's
            our environmental one.
          </p>

          <h2>Materials That Endure</h2>
          <ul>
            <li>
              <strong>Stainless and titanium steel bases</strong> — hypoallergenic,
              resistant to tarnish, and built for daily wear over decades.
            </li>
            <li>
              <strong>Quality plating</strong> — gold and silver-tone finishes sealed to
              withstand real life, not just the unboxing.
            </li>
            <li>
              <strong>Considered stones</strong> — lab-created crystals and zirconia that
              deliver lasting brilliance without the footprint of newly mined gems.
            </li>
          </ul>

          <h2>Packaging</h2>
          <p>
            Our packaging is designed to be minimal and reusable — a keepsake box worth
            keeping for the piece it protects, with recyclable paper filler and no
            single-use plastic wherever we can avoid it. As we grow, we'll keep tightening
            this: less material, more recycled content.
          </p>

          <h2>Small by Design</h2>
          <p>
            We produce in small, deliberate quantities rather than mass runs. Small batches
            mean less overproduction, less deadstock, and more attention on every piece
            that leaves our hands.
          </p>

          <h2>An Honest Note</h2>
          <p>
            We're a young house, and we won't pretend to be perfect. What we promise is
            direction: every decision — materials, packaging, production — gets weighed
            against the same question that drives our designs: <em>will this still make
            sense three generations from now?</em> If you have ideas or questions, we
            genuinely want them — <Link href="/pages/contact">write to us</Link>.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
