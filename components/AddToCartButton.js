"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import { PREORDER } from "../lib/products";

export default function AddToCartButton({ handle }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(handle, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <button className="btn" onClick={handleClick}>
      {added ? "Added to Bag" : PREORDER ? "Preorder Now" : "Add to Bag"}
    </button>
  );
}
