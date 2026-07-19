import Link from "next/link";
import Reveal from "../../../components/Reveal";

export const metadata = {
  title: "Contact Us | Jovie & Co",
  description:
    "Questions about an order, sizing, or a piece from the collection? Get in touch with Jovie & Co.",
};

export default function ContactPage() {
  return (
    <div className="container">
      <Reveal>
        <div className="info-page">
          <div className="eyebrow">We're Here</div>
          <h1>Contact Us</h1>
          <p className="info-lead">
            A question about a piece, an order, or the story behind the house — we'd love
            to hear from you.
          </p>

          <h2>Email</h2>
          <p>
            The fastest way to reach us is email:{" "}
            <a href="mailto:thejovieandco@gmail.com">thejovieandco@gmail.com</a>
          </p>
          <p>
            We answer every message ourselves and typically respond within 1–2 business
            days. For order questions, include your order number so we can help right away.
          </p>

          <h2>Social</h2>
          <p>
            Follow along as the founding collection comes to life on Instagram:{" "}
            <a href="https://www.instagram.com/thejovieandco" target="_blank" rel="noopener noreferrer">
              @thejovieandco
            </a>
          </p>

          <h2>Common Questions</h2>
          <ul>
            <li>
              <strong>Sizing help</strong> — see our{" "}
              <Link href="/pages/ring-sizing">Ring Sizing Guide</Link>, or write to us and
              we'll walk you through it.
            </li>
            <li>
              <strong>Shipping &amp; returns</strong> — timelines and our 30-day policy are
              on the <Link href="/pages/shipping-returns">Shipping &amp; Returns</Link> page.
            </li>
            <li>
              <strong>Collection launch</strong> — join the list at the bottom of any page
              to be first to know when pieces become available.
            </li>
          </ul>

          <div className="info-note">
            Jovie &amp; Co is a small house at the very start of its story. Every email is
            read by the founders — thank you for your patience, and for being here at the
            beginning.
          </div>
        </div>
      </Reveal>
    </div>
  );
}
