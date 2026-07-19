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

          <h2>How to Measure at Home</h2>
          <h3>Option 1 — Measure a ring you own</h3>
          <ol>
            <li>Choose a ring that fits the intended finger comfortably.</li>
            <li>Measure the inside diameter, edge to edge, with a ruler in millimeters.</li>
            <li>Match the measurement to the closest diameter in the chart above.</li>
          </ol>

          <h3>Option 2 — Measure your finger</h3>
          <ol>
            <li>Wrap a thin strip of paper or a piece of string snugly around the base of your finger.</li>
            <li>Mark where it overlaps, then measure that length in millimeters.</li>
            <li>Match the measurement to the closest circumference in the chart above.</li>
          </ol>

          <div className="info-note">
            <strong>Tips for the best fit:</strong> measure at the end of the day when your
            fingers are at their largest, avoid measuring when your hands are cold, and if
            you're between sizes, choose the larger one. Knuckles matter too — the ring has
            to pass over yours comfortably.
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
