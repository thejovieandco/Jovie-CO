"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../../components/CartProvider";
import { getProductByHandle, formatPrice } from "../../lib/products";

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const lineItems = items
    .map((item) => ({ ...item, product: getProductByHandle(item.handle) }))
    .filter((item) => item.product);

  const subtotal = lineItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lineItems.map((i) => ({ handle: i.handle, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch (e) {
      setError("Couldn't reach checkout. Please try again.");
      setLoading(false);
    }
  }

  if (lineItems.length === 0) {
    return (
      <div className="container">
        <div className="cart-empty">
          <h2 style={{ marginBottom: 16 }}>Your bag is empty</h2>
          <Link href="/" className="btn">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "60px 48px 100px" }}>
      <h1 style={{ marginBottom: 40 }}>Your Bag</h1>

      {lineItems.map((item) => (
        <div className="cart-row" key={item.handle}>
          <div className="cart-row-photo">
            {item.product.image && (
              <img
                src={item.product.image}
                alt={item.product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </div>
          <div>
            <Link href={`/products/${item.handle}`} style={{ fontFamily: "Cormorant Garamond", fontSize: 19 }}>
              {item.product.name}
            </Link>
            <div style={{ fontSize: 13, color: "#6b6b66", marginTop: 4 }}>
              {formatPrice(item.product.price)}
            </div>
          </div>
          <div className="cart-qty">
            <button onClick={() => updateQuantity(item.handle, item.quantity - 1)}>−</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.handle, item.quantity + 1)}>+</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
            <span>{formatPrice(item.product.price * item.quantity)}</span>
            <button
              onClick={() => removeItem(item.handle)}
              style={{ background: "none", border: "none", fontSize: 12, color: "#8a8880", cursor: "pointer" }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="cart-summary">
        <div className="cart-summary-row">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="cart-summary-row" style={{ color: "#8a8880" }}>
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </div>
        {error && <p style={{ color: "#b23b3b", fontSize: 13, marginBottom: 12 }}>{error}</p>}
        <button className="btn" style={{ width: "100%" }} onClick={handleCheckout} disabled={loading}>
          {loading ? "Redirecting…" : "Checkout"}
        </button>
      </div>
    </div>
  );
}
