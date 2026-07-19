import Link from "next/link";

export const metadata = {
  title: "Checkout Canceled | Jovie & Co",
};

export default function CheckoutCancel() {
  return (
    <div className="container" style={{ padding: "120px 48px", textAlign: "center" }}>
      <h1 style={{ marginBottom: 20 }}>Checkout Canceled</h1>
      <p style={{ color: "#4a4a46", maxWidth: 440, margin: "0 auto 32px" }}>
        No charge was made, and your bag is saved exactly as you left it —
        whenever you're ready.
      </p>
      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        <Link href="/cart" className="btn">Return to Bag</Link>
        <Link href="/" className="btn btn-outline">Continue Shopping</Link>
      </div>
    </div>
  );
}
