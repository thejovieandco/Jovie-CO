import Link from "next/link";
import Reveal from "./Reveal";
import ProductCard from "./ProductCard";
import { NEXT_COLLECTION_DATES, NEW_COLLECTION_LIVE } from "../lib/products";

// The coming drop, shown rather than described. Pieces render as Coming
// Soon until NEW_COLLECTION_LIVE is turned on, so nothing here can be
// bought before it is physically in hand.
export default function NextCollection({ products = [] }) {
  if (products.length === 0) return null;

  return (
    <section className="section legacy-band next-collection" id="next">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="eyebrow" style={{ color: "var(--gold)" }}>
              {NEW_COLLECTION_LIVE ? "Now Available" : `Arriving ${NEXT_COLLECTION_DATES}`}
            </div>
            <h2 style={{ color: "var(--white)" }}>The Next Collection</h2>
            <p style={{ color: "rgba(250,250,248,0.66)", maxWidth: 520 }}>
              {NEW_COLLECTION_LIVE
                ? `${products.length} new pieces, here now.`
                : `${products.length} new pieces land between ${NEXT_COLLECTION_DATES}. Until then, the founding collection above is everything we have — and once it is gone, it will not be made again.`}
            </p>
            {!NEW_COLLECTION_LIVE && (
              <div className="next-collection-actions">
                <Link href="#preview" className="btn">
                  Shop What&rsquo;s Left
                </Link>
                <Link href="#newsletter" className="btn btn-outline next-collection-alt">
                  Tell Me When It Lands
                </Link>
              </div>
            )}
          </div>
        </Reveal>
        <div className="grid-4">
          {products.map((p, i) => (
            <Reveal key={p.handle} delay={(i % 4) * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
