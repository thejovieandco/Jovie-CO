import Link from "next/link";
import Reveal from "./Reveal";
import { PREORDER, PREORDER_SHIP_DATE } from "../lib/products";

// Native <details> so the accordion is keyboard accessible and works
// without JavaScript. Answers must stay true to the shipping, returns,
// and materials claims made elsewhere on the site.
const QUESTIONS = [
  {
    q: "When will my order arrive?",
    a: PREORDER
      ? `The founding collection is on preorder and ships ${PREORDER_SHIP_DATE}. Once your piece is on its way you'll get a tracking number by email, and standard delivery runs 3–8 business days from there.`
      : "Orders are packed within 1–3 business days. Standard delivery takes 3–8 business days, priority 2–5.",
  },
  {
    q: "What are the pieces made of?",
    a: "Gold-plated and silver-tone finishes over stainless steel, set with cubic zirconia, crystal, resin, or enamel depending on the design. Every product page lists that piece's exact materials.",
  },
  {
    q: "How do I care for my jewelry?",
    a: "Take pieces off before swimming, showering, or exercising, and put them on after perfume and lotion. Wipe with a soft dry cloth and store somewhere dry and out of direct sunlight. Treated this way, plated jewelry keeps its finish for years.",
  },
  {
    q: "I don't know my ring size — what should I do?",
    a: "Our sizing guide walks you through measuring at home in about two minutes, using either a ring you already own or a strip of paper. A few of our rings are adjustable and fit most hands without sizing at all.",
    link: { href: "/pages/ring-sizing", label: "See the ring sizing guide" },
  },
  {
    q: "Can I return something?",
    a: "Yes — within 30 days of delivery, as long as the piece is unworn and in its original packaging. Earrings are final sale for hygiene reasons unless they arrive damaged. Write to us and we'll send return instructions.",
    link: { href: "/pages/shipping-returns", label: "Read the full policy" },
  },
  {
    q: "Where do you ship?",
    a: "Within the United States for now. Standard shipping is $5.95, and free on orders of $50 and over. We'd like to ship further afield as we grow — join the list and we'll say so when we do.",
  },
  {
    q: "Is my payment secure?",
    a: "Payments run through Stripe, the same processor used by millions of businesses. Your card details go straight to Stripe and are never stored on our servers or seen by us.",
  },
];

export default function FAQ() {
  return (
    <section className="section faq-section" id="faq">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="eyebrow">Good to Know</div>
            <h2>Questions, Answered</h2>
            <p>
              Anything we haven't covered, write to us at{" "}
              <a href="mailto:thejovieandco@gmail.com" className="faq-mail">
                thejovieandco@gmail.com
              </a>{" "}
              — a person will reply.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="faq-list">
            {QUESTIONS.map(({ q, a, link }) => (
              <details className="faq-item" key={q}>
                <summary>
                  <span>{q}</span>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </summary>
                <div className="faq-answer">
                  <p>{a}</p>
                  {link && <Link href={link.href}>{link.label}</Link>}
                </div>
              </details>
            ))}
          </div>
        </Reveal>

        <Reveal delay={160}>
          <ul className="trust-row">
            <li>
              <strong>Secure checkout</strong>
              Card details handled by Stripe
            </li>
            <li>
              <strong>Free US shipping</strong>
              On orders of $50 and over
            </li>
            <li>
              <strong>30-day returns</strong>
              On unworn pieces
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
