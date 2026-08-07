import Link from "next/link";
import Reveal from "./Reveal";
import { NEXT_COLLECTION_DATES } from "../lib/products";

// Announces the next drop without pretending it can be bought yet.
export default function NextCollection() {
  return (
    <section className="section legacy-band next-collection">
      <div className="container">
        <Reveal>
          <div className="section-head" style={{ marginBottom: 0 }}>
            <div className="eyebrow" style={{ color: "var(--gold)" }}>
              Arriving {NEXT_COLLECTION_DATES}
            </div>
            <h2 style={{ color: "var(--white)" }}>The Next Collection</h2>
            <p style={{ color: "rgba(250,250,248,0.66)", maxWidth: 520 }}>
              New pieces land between {NEXT_COLLECTION_DATES}. Until then, what you
              see above is everything we have — and once the founding collection is
              gone, it will not be made again.
            </p>
            <div className="next-collection-actions">
              <Link href="#preview" className="btn">
                Shop What&rsquo;s Left
              </Link>
              <Link href="#newsletter" className="btn btn-outline next-collection-alt">
                Get Notified
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
