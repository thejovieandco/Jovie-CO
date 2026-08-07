import { notFound } from "next/navigation";
import { products, getProductByHandle, formatPrice, NEXT_COLLECTION_DATES } from "../../../lib/products";
import ProductViewer from "../../../components/ProductViewer";
import PurchasePanel from "../../../components/PurchasePanel";
import RelatedProducts from "../../../components/RelatedProducts";

export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}

export function generateMetadata({ params }) {
  const product = getProductByHandle(params.handle);
  if (!product) return {};
  return {
    title: `${product.name} | Jovie & Co`,
    description: product.description,
  };
}

export default function ProductPage({ params }) {
  const product = getProductByHandle(params.handle);
  if (!product) return notFound();

  return (
    <div className="container">
      <div className="product-detail">
        {product.image ? (
          <ProductViewer src={product.image} alt={product.name} />
        ) : (
          <div className="product-detail-photo">
            <div className="ph-label">Product photo — {product.name}</div>
          </div>
        )}
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <div className="product-detail-price">{formatPrice(product.price)}</div>
          <p className="desc">{product.description}</p>
          <ul>
            {product.details.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
          {product.comingSoon ? (
            <p style={{ fontSize: 13, color: "#6f6d66", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Coming Soon — Arriving {NEXT_COLLECTION_DATES}
            </p>
          ) : (
            <PurchasePanel handle={product.handle} initial={product.stock ?? null} />
          )}
        </div>
      </div>
      <RelatedProducts handle={product.handle} />
    </div>
  );
}
