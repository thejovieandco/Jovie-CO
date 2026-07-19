import Link from "next/link";
import Reveal from "../../../components/Reveal";

export const metadata = {
  title: "Ring Sizing Guide | Jovie & Co",
  description:
    "Find your perfect ring size with the Jovie & Co sizing chart and at-home measuring guide.",
};

const SIZES = [
  { us: "4", diameter: "14.9", circumference: "46.7" },
  { us: "4.5", diameter: "15.3", circumference: "48.0" },
  { us: "5", diameter: "15.7", circumference: "49.3" },
  { us: "5.5", diameter: "16.1", circumference: "50.6" },
  { us: "6", diameter: "16.5", circumference: "51.9" },
  { us: "6.5", diameter: "16.9", circumference: "53.1" },
  { us: "7", diameter: "17.3", circumference: "54.4" },
  { us: "7.5", diameter: "17.7", circumference: "55.7" },
  { us: "8", diameter: "18.1", circumference: "57.0" },
  { us: "8.5", diameter: "18.5", circumference: "58.3" },
  { us: "9", diameter: "19.0", circumference: "59.5" },
  { us: "9.5", diameter: "19.4", circumference: "60.8" },
  { us: "10", diameter: "19.8", circumference: "62.1" },
];

export default function RingSizingPage() {
  return (
    <div className="container">
      <Reveal>
        <div className="info-page">
          <div className="eyebrow">Customer Care</div>
          <h1>Ring Sizing Guide</h1>
          <p className="info-lead">
            A piece meant to be worn for generations should fit perfectly from day one.
          </p>

          <h2>Size Chart</h2>
          <p>
            Measurements are of the inside of the ring. If you already own a ring that
            fits well, measure its inside diameter and match it to the chart below.
          </p>
          <div className="info-table-wrap">
            <table className="info-table">
              <thead>
                <tr>
                  <th>US Size</th>
                  <th>Inside Diameter (mm)</th>
                  <th>Inside Circumference (mm)</th>
                </tr>
              </thead>
              <tbody>
                {SIZES.map((s) => (
                  <tr key={s.us}>
                    <td>{s.us}</td>
                    <td>{s.diameter}</td>
                    <td>{s.circumference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>How to Find Your Size at Home</h2>
          <p>
            You'll need about two minutes and either a ring you already own or a strip of
            paper and a ruler. Both methods below work with the chart above.
          </p>

          <span className="method-label">Method 1 — Use a Ring You Own</span>
          <h3>The most accurate option</h3>
          <ul className="step-list">
            <li>
              <span className="step-num">1</span>
              <p><strong>Pick the right ring.</strong> Choose one that fits the exact finger
              you're shopping for — sizes differ between fingers and even between hands.</p>
            </li>
            <li>
              <span className="step-num">2</span>
              <p><strong>Measure the inside.</strong> Lay the ring on a ruler and measure the
              inside of the band, edge to edge across the widest point, in millimeters. Don't
              include the metal itself.</p>
            </li>
            <li>
              <span className="step-num">3</span>
              <p><strong>Match to the chart.</strong> Find the closest number in the
              &ldquo;Inside Diameter&rdquo; column above — that row is your US size.</p>
            </li>
          </ul>

          <span className="method-label">Method 2 — Measure Your Finger</span>
          <h3>No ring? Use paper or string</h3>
          <ul className="step-list">
            <li>
              <span className="step-num">1</span>
              <p><strong>Cut a thin strip.</strong> Use a strip of paper about 5mm wide (or a
              piece of non-stretchy string) — wide ribbon or stretchy material will throw off
              the measurement.</p>
            </li>
            <li>
              <span className="step-num">2</span>
              <p><strong>Wrap and mark.</strong> Wrap it around the base of your finger, snug
              but not tight — it should slide over your knuckle with slight resistance. Mark
              the exact point where the end overlaps.</p>
            </li>
            <li>
              <span className="step-num">3</span>
              <p><strong>Measure the length.</strong> Unroll it flat and measure from the end
              to your mark in millimeters.</p>
            </li>
            <li>
              <span className="step-num">4</span>
              <p><strong>Match to the chart.</strong> Find the closest number in the
              &ldquo;Inside Circumference&rdquo; column above — that row is your US size.</p>
            </li>
          </ul>

          <div className="info-note">
            <strong>Tips for the best fit:</strong> measure at the end of the day when your
            fingers are at their largest, avoid measuring when your hands are cold, and
            repeat the measurement two or three times to make sure it's consistent. If
            you're between sizes, choose the larger one — and remember the ring has to pass
            over your knuckle comfortably.
          </div>

          <h2>Adjustable Pieces</h2>
          <p>
            Some of our rings, like the <Link href="/products/twisted-marquise-ring">Twisted
            Marquise Ring</Link>, feature an open, adjustable band designed to fit most —
            no sizing needed. Each product page notes whether a piece is adjustable or
            offered in fixed sizes.
          </p>

          <h2>Still Unsure?</h2>
          <p>
            We're happy to help you find your size — reach out through our{" "}
            <Link href="/pages/contact">contact page</Link> and we'll walk you through it.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
