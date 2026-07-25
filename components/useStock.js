"use client";

import { useEffect, useState } from "react";

// One shared request per page load, no matter how many cards ask for it.
let pending = null;

function loadStock() {
  if (!pending) {
    pending = fetch("/api/stock")
      .then((res) => (res.ok ? res.json() : { remaining: {} }))
      .then((data) => data.remaining || {})
      .catch(() => ({}));
  }
  return pending;
}

// Returns live units left for a handle, or the fallback until it loads.
export function useStock(handle, fallback) {
  const [left, setLeft] = useState(fallback);

  useEffect(() => {
    let active = true;
    loadStock().then((remaining) => {
      if (active && remaining && handle in remaining) setLeft(remaining[handle]);
    });
    return () => {
      active = false;
    };
  }, [handle]);

  return left;
}
