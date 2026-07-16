"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "jovie-cart";

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
          i.handle === handle ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { handle, quantity }];
    });
  }

  function removeItem(handle) {
    setItems((prev) => prev.filter((i) => i.handle !== handle));
  }

  function updateQuantity(handle, quantity) {
    if (quantity <= 0) return removeItem(handle);
    setItems((prev) =>
      prev.map((i) => (i.handle === handle ? { ...i, quantity } : i))
    );
  }

  function clearCart() {
    setItems([]);
  }

  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, count }}
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
