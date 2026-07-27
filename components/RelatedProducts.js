import { getRelatedProducts } from "../lib/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

// Several pieces are designed as matching sets, so those come first and get
// a heading that says so. Otherwise this falls back to the same category.
export default function RelatedProducts({ handle }) {
  const { items, isSet } = getRelatedProducts(handle, 4);
  if (items.length === 0) return null;

  return (
    <section className="section related-section">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="eyebrow">{isSet ? "Wears Together" : "Also in the Collection"}</div>
            <h2>{isSet ? "Complete the Set" : "You May Also Like"}</h2>
            <p>Two pieces bring your order to free US shipping.</p>
          </div>
        </Reveal>
        <div className="grid-4">
          {items.map((p, i) => (
            <Reveal key={p.handle} delay={(i % 4) * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
