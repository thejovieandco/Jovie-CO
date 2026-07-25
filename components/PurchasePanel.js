"use client";

import AddToCartButton from "./AddToCartButton";
import { useStock } from "./useStock";
import { PREORDER, PREORDER_SHIP_DATE } from "../lib/products";

const gold = {
  fontSize: 13,
  color: "#A8823E",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  fontWeight: 600,
};

// Availability and the buy button on a product page, driven by live stock.
export default function PurchasePanel({ handle, initial }) {
  const left = useStock(handle, initial);
  const soldOut = left != null && left <= 0;

  if (soldOut) {
    return (
      <>
        <p style={{ ...gold, color: "#8a8880", marginBottom: 10 }}>Sold out</p>
        <p style={{ fontSize: 14, color: "#4a4a46", maxWidth: 420 }}>
          This piece has found its home. Write to us at{" "}
          <a href="mailto:thejovieandco@gmail.com" style={{ color: "#A8823E" }}>
            thejovieandco@gmail.com
          </a>{" "}
          and we'll let you know if another becomes available.
        </p>
      </>
    );
  }

  return (
    <>
      {left != null && left <= 3 && (
        <p style={{ ...gold, marginBottom: 14 }}>
          {left === 1 ? "Only 1 available" : `Only ${left} available`}
        </p>
      )}
      <AddToCartButton handle={handle} />
      {PREORDER && (
        <p style={{ ...gold, marginTop: 16, fontWeight: 400 }}>
          Preorder — Ships {PREORDER_SHIP_DATE}
        </p>
      )}
    </>
  );
}
