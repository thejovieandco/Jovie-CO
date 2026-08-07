"use client";

import { useAllStock } from "./useStock";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

// What is genuinely still available from the founding collection. Sold-out
// pieces drop out once live Stripe stock arrives, so the section can never
// advertise something that cannot be shipped.
export default function FinalPieces({ products }) {
  const remaining = useAllStock();

  const available = products.filter((p) => {
    if (p.stock == null) return true;
    if (!remaining) return true; // before stock loads, show everything
    return (remaining[p.handle] ?? p.stock) > 0;
  });

  const units = available.reduce((sum, p) => {
    if (p.stock == null) return sum;
    return sum + (remaining ? remaining[p.handle] ?? p.stock : p.stock);
  }, 0);

  if (available.length === 0) return null;

  return (
    <section className="section" id="preview">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="eyebrow">Final Pieces</div>
            <h2>What&rsquo;s Left of the Founding Collection</h2>
            <p>
              {available.length} {available.length === 1 ? "design" : "designs"} still
              here{units > 0 && `, ${units} ${units === 1 ? "piece" : "pieces"} in all`}.
              Most are one of one — when a piece is gone, it is gone for good.
            </p>
          </div>
        </Reveal>
        <div className="grid-4">
          {available.map((p, i) => (
            <Reveal key={p.handle} delay={(i % 4) * 90}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
