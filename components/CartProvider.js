"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getProductByHandle } from "../lib/products";

const CartContext = createContext(null);
const STORAGE_KEY = "jovie-cart";

// Never let the bag hold more of a piece than we have in stock.
function maxStock(handle) {
  const product = getProductByHandle(handle);
  return product?.stock ?? 99;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch (e) {
      // ignore malformed storage
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, loaded]);

  function addItem(handle, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.handle === handle);
      if (existing) {
        return prev.map((i) =>
          i.handle === handle
            ? { ...i, quantity: Math.min(i.quantity + quantity, maxStock(handle)) }
            : i
        );
      }
      return [...prev, { handle, quantity: Math.min(quantity, maxStock(handle)) }];
    });
  }

  function removeItem(handle) {
    setItems((prev) => prev.filter((i) => i.handle !== handle));
  }

  function updateQuantity(handle, quantity) {
    if (quantity <= 0) return removeItem(handle);
    const clamped = Math.min(quantity, maxStock(handle));
    setItems((prev) =>
      prev.map((i) => (i.handle === handle ? { ...i, quantity: clamped } : i))
    );
  }

  function clearCart() {
    setItems([]);
  }

  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, count, loaded }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
