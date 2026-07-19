import Link from "next/link";
import Reveal from "../../../components/Reveal";

export const metadata = {
  title: "Shipping & Returns | Jovie & Co",
  description:
    "Shipping timelines, delivery options, and our 30-day return policy at Jovie & Co.",
};

export default function ShippingReturnsPage() {
  return (
    <div className="container">
      <Reveal>
        <div className="info-page">
          <div className="eyebrow">Customer Care</div>
          <h1>Shipping &amp; Returns</h1>
          <p className="info-lead">
            Every order is packed with care and shipped like it's meant to be kept forever
            — because it is.
          </p>

          <h2>Shipping</h2>
          <h3>Processing</h3>
          <p>
            Orders are processed within 1–3 business days. You'll receive a confirmation
            email when your order is placed and a tracking number as soon as it ships.
          </p>

          <h3>Delivery Options</h3>
          <div className="info-table-wrap">
            <table className="info-table">
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Estimated Delivery</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Standard Shipping (US)</td>
                  <td>5–8 business days</td>
                  <td>$4.95 — free on orders over $50</td>
                </tr>
                <tr>
                  <td>Expedited Shipping (US)</td>
                  <td>2–3 business days</td>
                  <td>$12.95</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Estimated delivery windows begin once your order ships, and don't include
            processing time. During launches and holidays, processing may take a little
            longer — we'll always note it at checkout.
          </p>

          <div className="info-note">
            <strong>International shipping:</strong> we're a young house and currently ship
            within the United States only. International shipping is on our roadmap — join
            the list at the bottom of the page and we'll let you know the moment it opens.
          </div>

          <h2>Returns &amp; Exchanges</h2>
          <p>
            We want you to love your piece. If it isn't right, you may return it within{" "}
            <strong>30 days of delivery</strong> for a full refund or exchange, provided it is:
          </p>
          <ul>
            <li>Unworn and in its original condition</li>
            <li>In its original packaging</li>
            <li>Accompanied by your order number</li>
          </ul>
          <p>
            To start a return, reach out through our <Link href="/pages/contact">contact
            page</Link> with your order number and we'll send you instructions. Once we
            receive and inspect the return, refunds are issued to the original payment
            method within 5–10 business days.
          </p>

          <h3>Damaged or Incorrect Orders</h3>
          <p>
            If your piece arrives damaged, or you received the wrong item, contact us within
            7 days of delivery with a photo and your order number. We'll make it right —
            replacement or refund, your choice, at no cost to you.
          </p>

          <h3>Final Sale</h3>
          <p>
            Earrings are final sale for hygiene reasons unless they arrive damaged or
            defective. Items marked final sale at checkout cannot be returned.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
