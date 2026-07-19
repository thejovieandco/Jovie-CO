import Link from "next/link";
import Reveal from "../../../components/Reveal";

export const metadata = {
  title: "Privacy Policy | Jovie & Co",
  description: "How Jovie & Co collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <div className="container">
      <Reveal>
        <div className="info-page">
          <div className="eyebrow">Your Trust</div>
          <h1>Privacy Policy</h1>
          <p className="info-lead">
            We collect only what we need to serve you, and we never sell it. Ever.
          </p>

          <h2>Information We Collect</h2>
          <ul>
            <li>
              <strong>Order information</strong> — your name, shipping address, and email,
              used to fulfill and deliver your order and send order updates.
            </li>
            <li>
              <strong>Payment information</strong> — payments are processed securely by
              Stripe. Your card details go directly to Stripe and are never stored on our
              servers.
            </li>
            <li>
              <strong>Email list</strong> — if you join our list, we store your email to
              send launch news, early access, and occasional updates.
            </li>
            <li>
              <strong>Basic usage data</strong> — standard technical information (such as
              browser type and pages visited) that helps us keep the site working well.
            </li>
          </ul>

          <h2>How We Use It</h2>
          <ul>
            <li>To process and ship your orders and respond to your messages</li>
            <li>To send emails you've asked for — every one includes an unsubscribe link</li>
            <li>To improve the site and our collections</li>
          </ul>

          <h2>What We Never Do</h2>
          <ul>
            <li>We never sell or rent your personal information</li>
            <li>We never share your data with third parties beyond the services required to run the store (such as payment processing and shipping)</li>
            <li>We never email you marketing you didn't sign up for</li>
          </ul>

          <h2>Your Choices</h2>
          <p>
            You can unsubscribe from our emails at any time using the link in any message.
            You may also request a copy of the personal information we hold about you, or
            ask us to delete it, by reaching out through our{" "}
            <Link href="/pages/contact">contact page</Link>. We'll respond within 30 days.
          </p>

          <h2>Cookies</h2>
          <p>
            We use only the cookies needed for the site to function — such as remembering
            what's in your cart. We don't use third-party advertising trackers.
          </p>

          <h2>Updates to This Policy</h2>
          <p>
            As the house grows, this policy may evolve. Any changes will be posted on this
            page. Questions are always welcome at{" "}
            <a href="mailto:thejovieandco@gmail.com">thejovieandco@gmail.com</a>.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
