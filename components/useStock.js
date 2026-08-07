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

// The whole { handle: unitsLeft } map, or null until it arrives. Shares the
// same single request as useStock, so asking for both costs nothing extra.
export function useAllStock() {
  const [remaining, setRemaining] = useState(null);

  useEffect(() => {
    let active = true;
    loadStock().then((data) => {
      if (active) setRemaining(data || {});
    });
    return () => {
      active = false;
    };
  }, []);

  return remaining;
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
