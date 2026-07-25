"use client";

import { useStock } from "./useStock";

// Scarcity line under a product card, kept honest by live Stripe data.
export default function StockNote({ handle, initial }) {
  const left = useStock(handle, initial);

  if (left == null) return null;
  if (left <= 0) return <div className="stock-note is-out">Sold out</div>;
  if (left > 3) return null;
  return <div className="stock-note">Only {left} left</div>;
}
