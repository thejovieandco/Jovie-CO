"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "../../../components/CartProvider";

export default function CheckoutSuccess() {
  const { clearCart, loaded } = useCart();

  // Wait for the saved cart to load before clearing, otherwise the
  // load overwrites the clear and the bag comes back.
  useEffect(() => {
    if (loaded) clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  return (
    <div className="container" style={{ padding: "120px 48px", textAlign: "center" }}>
      <h1 style={{ marginBottom: 20 }}>Thank You</h1>
      <p style={{ color: "#4a4a46", maxWidth: 440, margin: "0 auto 32px" }}>
        Your order has been placed. A confirmation email is on its way, and your
        piece will be prepared with care before it ships.
      </p>
      <Link href="/" className="btn">Continue Shopping</Link>
    </div>
  );
}
