"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

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
      {added ? "Added to Bag" : "Add to Bag"}
    </button>
  );
}
