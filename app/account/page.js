"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignIn, SignUp, UserButton, useUser } from "@clerk/nextjs";
import { formatPrice } from "../../lib/products";
import { clerkEnabled } from "../../lib/clerk";

// Match the Clerk widgets to the Jovie & Co look
const clerkAppearance = {
  variables: {
    colorPrimary: "#1A1A1A",
    colorText: "#1A1A1A",
    borderRadius: "0px",
    fontFamily: "Manrope, sans-serif",
  },
  elements: {
    card: { boxShadow: "0 24px 60px -18px rgba(26,26,26,0.25)", border: "1px solid rgba(199,161,90,0.45)" },
    headerTitle: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 },
    formButtonPrimary: { textTransform: "uppercase", letterSpacing: "0.14em", fontSize: "11px", fontWeight: 600 },
  },
};

export default function AccountPage() {
  if (!clerkEnabled) {
    return (
      <div className="container">
        <div className="cart-empty">
          <h2 style={{ marginBottom: 16 }}>Accounts are almost here</h2>
          <p style={{ marginBottom: 28 }}>
            We're putting the finishing touches on customer accounts. In the
            meantime, your order confirmations arrive by email.
          </p>
          <Link href="/" className="btn">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return <AccountInner />;
}

function AccountInner() {
  const [mode, setMode] = useState("signin"); // signin | signup

  return (
    <div className="container" style={{ padding: "60px 48px 100px" }}>
      <SignedOut>
        <div className="account-signin">
          <div className="section-head" style={{ marginBottom: 28 }}>
            <div className="eyebrow">Your Account</div>
            <h2>{mode === "signin" ? "Welcome Back" : "Join Jovie & Co"}</h2>
            <p>
              {mode === "signin"
                ? "Sign in to see your orders and track your pieces."
                : "Create an account to keep your orders and story in one place."}
            </p>
          </div>
          <div className="account-toggle">
            <button
              className={mode === "signin" ? "is-active" : ""}
              onClick={() => setMode("signin")}
            >
              Sign In
            </button>
            <button
              className={mode === "signup" ? "is-active" : ""}
              onClick={() => setMode("signup")}
            >
              Create Account
            </button>
          </div>
          <div className="account-signin-widget">
            {mode === "signin" ? (
              <SignIn routing="hash" appearance={clerkAppearance} />
            ) : (
              <SignUp routing="hash" appearance={clerkAppearance} />
            )}
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <AccountDashboard />
      </SignedIn>
    </div>
  );
}

function AccountDashboard() {
  const { user } = useUser();
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        if (data.orders) setOrders(data.orders);
        else setError(data.error || "Couldn't load your orders.");
      })
      .catch(() => setError("Couldn't load your orders."));
  }, []);

  return (
    <>
      <div className="account-head">
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Your Account</div>
          <h1 style={{ fontSize: "clamp(26px,4vw,38px)" }}>
            {user?.firstName ? `Welcome, ${user.firstName}` : "Welcome"}
          </h1>
        </div>
        <UserButton afterSignOutUrl="/" appearance={clerkAppearance} />
      </div>

      <h2 style={{ fontSize: 22, margin: "40px 0 8px" }}>Order History</h2>
      <p style={{ fontSize: 13, color: "#8a8880", marginBottom: 24 }}>
        Orders placed with {user?.primaryEmailAddress?.emailAddress}
      </p>

      {orders === null && !error && <p style={{ color: "#6b6b66" }}>Loading your orders…</p>}
      {error && <p style={{ color: "#b23b3b", fontSize: 14 }}>{error}</p>}
      {orders && orders.length === 0 && (
        <div style={{ padding: "40px 0" }}>
          <p style={{ color: "#6b6b66", marginBottom: 24 }}>
            No orders yet — your story starts with the first piece.
          </p>
          <Link href="/#preview" className="btn">Shop the Collection</Link>
        </div>
      )}
      {orders && orders.length > 0 && (
        <div>
          {orders.map((order) => (
            <div className="order-row" key={order.id}>
              <div>
                <div className="order-date">{order.date}</div>
                <ul className="order-items">
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.quantity} × {item.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-right">
                <span className="order-total">{formatPrice(order.total)}</span>
                <span className={`order-status s-${order.status}`}>{order.statusLabel}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
