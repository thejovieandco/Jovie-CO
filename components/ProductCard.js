import Link from "next/link";
import { formatPrice } from "../lib/products";
import Tilt3D from "./Tilt3D";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.handle}`} className="product-card">
      <Tilt3D className="product-tilt" max={9}>
        <div className="product-photo">
          {product.comingSoon && (
            <span className="tag" style={{ background: "#1A1A1A", color: "#FAFAF8" }}>Coming Soon</span>
          )}
          {!product.comingSoon && product.tag && <span className="tag">{product.tag}</span>}
          {product.image ? (
            <img src={product.image} alt={product.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div className="ph-label">Product photo — {product.name}</div>
          )}
        </div>
      </Tilt3D>
      <div className="product-name">{product.name}</div>
      <div className="product-price">{formatPrice(product.price)}</div>
    </Link>
  );
}
