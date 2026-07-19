import { notFound } from "next/navigation";
import { products, getProductByHandle, formatPrice, PREORDER, PREORDER_SHIP_DATE } from "../../../lib/products";
import AddToCartButton from "../../../components/AddToCartButton";

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
        <div className="product-detail-photo">
          {product.image ? (
            <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div className="ph-label">Product photo — {product.name}</div>
          )}
        </div>
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <div className="product-detail-price">{formatPrice(product.price)}</div>
          <p className="desc">{product.description}</p>
          <ul>
            {product.details.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
          {product.comingSoon ? (
            <p style={{ fontSize: 13, color: "#8a8880", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Coming Soon — Available {PREORDER_SHIP_DATE}
            </p>
          ) : (
            <>
              <AddToCartButton handle={product.handle} />
              {PREORDER && (
                <p style={{ fontSize: 13, color: "#A8823E", letterSpacing: "0.05em", textTransform: "uppercase", marginTop: 16 }}>
                  Preorder — Ships {PREORDER_SHIP_DATE}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
