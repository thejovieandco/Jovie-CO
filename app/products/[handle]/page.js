import { notFound } from "next/navigation";
import { products, getProductByHandle, formatPrice, PREORDER, PREORDER_SHIP_DATE } from "../../../lib/products";
import AddToCartButton from "../../../components/AddToCartButton";
import ProductViewer from "../../../components/ProductViewer";

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
            <p style={{ fontSize: 13, color: "#8a8880", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Coming Soon — Available {PREORDER_SHIP_DATE}
            </p>
          ) : (
            <>
              {product.stock > 0 && product.stock <= 3 && (
                <p style={{ fontSize: 13, color: "#A8823E", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 14, fontWeight: 600 }}>
                  {product.stock === 1 ? "Only 1 available" : `Only ${product.stock} available`}
                </p>
              )}
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
