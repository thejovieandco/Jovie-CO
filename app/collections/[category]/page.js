import { getProductsByCategory } from "../../../lib/products";
import ProductCard from "../../../components/ProductCard";

export function generateStaticParams() {
  return [
    { category: "rings" },
    { category: "necklaces" },
    { category: "earrings" },
    { category: "bracelets" },
  ];
}

export function generateMetadata({ params }) {
  const name = params.category.charAt(0).toUpperCase() + params.category.slice(1);
  return { title: `${name} | Jovie & Co` };
}

export default function CollectionPage({ params }) {
  const products = getProductsByCategory(params.category);
  const name = params.category.charAt(0).toUpperCase() + params.category.slice(1);

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Collection</div>
          <h2>{name}</h2>
        </div>
        {products.length > 0 ? (
          <div className="grid-4">
            {products.map((p) => <ProductCard key={p.handle} product={p} />)}
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "#6b6b66" }}>
            No products in this collection yet.
          </p>
        )}
      </div>
    </section>
  );
}
