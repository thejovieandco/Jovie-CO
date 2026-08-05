"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

const PLUM = "#1A1418";
const BRASS = "#B08D57";
const CREAM = "#F2EDE6";
const MUTED = "rgba(242,237,230,0.55)";
const LINE = "rgba(176,141,87,0.28)";
// Shared with the studio assistant, so unlocking one unlocks the other
const PIN_KEY = "jovie-assistant-pin";

function money(cents) {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function when(ms) {
  return new Date(ms).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

// Covers the storefront chrome, same as the studio assistant
const page = {
  position: "fixed",
  inset: 0,
  zIndex: 1000,
  overflowY: "auto",
  WebkitOverflowScrolling: "touch",
  background: PLUM,
  color: CREAM,
  fontFamily: "'Manrope', system-ui, sans-serif",
  paddingTop: "env(safe-area-inset-top)",
  paddingBottom: "calc(40px + env(safe-area-inset-bottom))",
  paddingLeft: "env(safe-area-inset-left)",
  paddingRight: "env(safe-area-inset-right)",
};

export default function SalesPage() {
  const [pin, setPin] = useState(null);
  const [ready, setReady] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(PIN_KEY);
      if (saved) setPin(saved);
    } catch {}
    setReady(true);
  }, []);

  const load = useCallback(async (passcode) => {
    if (!passcode) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: passcode }),
      });
      const data = await res.json();
      if (res.status === 401) {
        try {
          window.localStorage.removeItem(PIN_KEY);
        } catch {}
        setPin(null);
        setReport(null);
        setError("Passcode incorrect. Enter it again.");
        return;
      }
      if (!res.ok) {
        setError(data.error || "Couldn't load your sales.");
        return;
      }
      setReport(data);
    } catch {
      setError("Couldn't reach Stripe. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (pin) load(pin);
  }, [pin, load]);

  function savePin(e) {
    e.preventDefault();
    const value = pinInput.trim();
    if (!value) return;
    try {
      window.localStorage.setItem(PIN_KEY, value);
    } catch {}
    setPin(value);
    setPinInput("");
    setError("");
  }

  function lock() {
    try {
      window.localStorage.removeItem(PIN_KEY);
    } catch {}
    setPin(null);
    setReport(null);
    setError("");
  }

  if (!ready) return <div style={page} />;

  if (!pin) {
    return (
      <div
        style={{
          ...page,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <form onSubmit={savePin} style={{ width: "100%", maxWidth: 320, textAlign: "center" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, marginBottom: 6 }}>
            Jovie &amp; Co
          </div>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: BRASS,
              marginBottom: 34,
            }}
          >
            Sales
          </div>
          <input
            type="password"
            inputMode="numeric"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            placeholder="Passcode"
            aria-label="Passcode"
            autoFocus
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              borderBottom: `1px solid ${BRASS}`,
              color: CREAM,
              fontSize: 18,
              textAlign: "center",
              padding: "12px 4px",
              outline: "none",
              letterSpacing: "0.3em",
            }}
          />
          <button
            type="submit"
            style={{
              marginTop: 28,
              width: "100%",
              background: BRASS,
              color: PLUM,
              border: "none",
              padding: 14,
              fontSize: 12,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Enter
          </button>
          {error && <p style={{ color: "#e2a1a1", fontSize: 13, marginTop: 18 }}>{error}</p>}
        </form>
      </div>
    );
  }

  const t = report?.totals;
  const inv = report?.inventory;

  return (
    <div style={page}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px 12px",
          padding: "14px 18px",
          borderBottom: `1px solid ${LINE}`,
          position: "sticky",
          top: 0,
          background: PLUM,
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 20,
            whiteSpace: "nowrap",
          }}
        >
          Jovie &amp; Co <span style={{ color: BRASS }}>Sales</span>
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={() => load(pin)} disabled={loading} style={ghostBtn(loading)}>
            {loading ? "Loading…" : "Refresh"}
          </button>
          <Link href="/assistant" style={{ ...linkBtn, textDecoration: "none" }}>
            Assistant
          </Link>
          <button onClick={lock} style={linkBtn}>
            Lock
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "26px 18px 0" }}>
        {error && (
          <p style={{ color: "#e2a1a1", fontSize: 14, marginBottom: 20 }}>{error}</p>
        )}

        {!report && loading && <p style={{ color: MUTED }}>Reading Stripe…</p>}

        {report && t.orders === 0 && (
          <div style={{ padding: "60px 0", textAlign: "center" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, marginBottom: 10 }}>
              No sales yet
            </div>
            <p style={{ color: MUTED, fontSize: 14 }}>
              {money(inv.startingValue)} of inventory is ready to sell.
            </p>
          </div>
        )}

        {report && t.orders > 0 && (
          <>
            <Row>
              <Stat label="Net payout" value={money(t.net)} big hint="After Stripe fees" />
              <Stat label="Gross revenue" value={money(t.gross)} big />
              <Stat label="Orders" value={String(t.orders)} big />
              <Stat label="Pieces sold" value={String(t.unitsSold)} big />
            </Row>

            <Row>
              <Stat label="Average order" value={money(t.averageOrder)} />
              <Stat
                label={t.feesExact ? "Stripe fees" : "Stripe fees (est.)"}
                value={`−${money(t.fees)}`}
              />
              <Stat label="Shipping collected" value={money(t.shippingCollected)} />
              {t.refunded > 0 && <Stat label="Refunded" value={`−${money(t.refunded)}`} />}
            </Row>

            <Section title="Inventory">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "18px 40px", marginBottom: 18 }}>
                <Inline label="Still in hand" value={`${inv.unitsLeft} pieces`} />
                <Inline label="Worth at retail" value={money(inv.valueLeft)} />
                <Inline label="Sold through" value={`${inv.soldThroughPct}%`} />
                <Inline
                  label="Started with"
                  value={`${inv.startingUnits} pieces · ${money(inv.startingValue)}`}
                />
              </div>
              <div
                style={{
                  height: 6,
                  background: "rgba(242,237,230,0.1)",
                  overflow: "hidden",
                }}
                role="img"
                aria-label={`${inv.soldThroughPct}% of the collection sold`}
              >
                <div
                  style={{
                    width: `${inv.soldThroughPct}%`,
                    height: "100%",
                    background: BRASS,
                    transition: "width .5s ease",
                  }}
                />
              </div>
            </Section>

            {report.bestSellers.length > 0 && (
              <Section title="Best sellers">
                {report.bestSellers.map((p) => (
                  <div key={p.handle} style={listRow}>
                    <span style={{ minWidth: 0 }}>
                      <span style={{ display: "block", fontSize: 15 }}>{p.name}</span>
                      <span style={{ fontSize: 12, color: MUTED }}>
                        {p.sold} sold · {p.left} left
                      </span>
                    </span>
                    <span style={{ color: BRASS, fontVariantNumeric: "tabular-nums" }}>
                      {money(p.revenue)}
                    </span>
                  </div>
                ))}
              </Section>
            )}

            <Section title={`Recent orders (${t.orders})`}>
              {report.orders.map((o) => (
                <div key={o.id} style={{ ...listRow, alignItems: "flex-start" }}>
                  <span style={{ minWidth: 0 }}>
                    <span style={{ display: "block", fontSize: 15 }}>
                      {o.customer || "Customer"}
                    </span>
                    <span style={{ fontSize: 12, color: MUTED, display: "block" }}>
                      {when(o.date)}
                    </span>
                    <span style={{ fontSize: 13, display: "block", marginTop: 4 }}>
                      {o.items.length
                        ? o.items.map((i) => `${i.quantity} × ${i.name}`).join(", ")
                        : "—"}
                    </span>
                    {o.giftNote && (
                      <span style={{ fontSize: 12, color: BRASS, display: "block", marginTop: 4 }}>
                        Gift note: {o.giftNote}
                      </span>
                    )}
                  </span>
                  <span style={{ textAlign: "right", flexShrink: 0 }}>
                    <span style={{ display: "block", fontVariantNumeric: "tabular-nums" }}>
                      {money(o.total)}
                    </span>
                    {o.net != null && (
                      <span style={{ fontSize: 12, color: MUTED }}>{money(o.net)} net</span>
                    )}
                    {o.refunded > 0 && (
                      <span style={{ fontSize: 12, color: "#e2a1a1", display: "block" }}>
                        {money(o.refunded)} refunded
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </Section>

            {report.remaining.length > 0 && (
              <Section title={`Still available (${inv.unitsLeft})`}>
                {report.remaining.map((p) => (
                  <div key={p.handle} style={listRow}>
                    <span style={{ minWidth: 0 }}>
                      <span style={{ display: "block", fontSize: 15 }}>{p.name}</span>
                      <span style={{ fontSize: 12, color: MUTED }}>
                        {p.left} × {money(p.price)}
                      </span>
                    </span>
                    <span style={{ fontVariantNumeric: "tabular-nums" }}>{money(p.value)}</span>
                  </div>
                ))}
              </Section>
            )}

            {report.unmatched.length > 0 && (
              <Section title="Unrecognised items">
                <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.6 }}>
                  These were paid for but don't match anything in the catalog, so
                  they aren't counted above: {report.unmatched.join(", ")}.
                </p>
              </Section>
            )}

            <p style={{ color: MUTED, fontSize: 12, marginTop: 34, lineHeight: 1.7 }}>
              Live from Stripe as of {when(report.generatedAt)}. Net is what Stripe
              pays out after processing fees — it does not subtract what you paid
              your supplier, so it is revenue, not profit.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- small presentational pieces ---------- */

const linkBtn = {
  background: "none",
  border: "none",
  color: BRASS,
  fontSize: 11,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  cursor: "pointer",
  padding: 0,
  fontFamily: "inherit",
};

function ghostBtn(disabled) {
  return {
    background: "transparent",
    color: BRASS,
    border: `1px solid ${BRASS}`,
    borderRadius: 999,
    padding: "6px 12px",
    fontSize: 10,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: 700,
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.5 : 1,
    whiteSpace: "nowrap",
    fontFamily: "inherit",
  };
}

const listRow = {
  display: "flex",
  justifyContent: "space-between",
  gap: 16,
  padding: "13px 0",
  borderBottom: `1px solid rgba(242,237,230,0.07)`,
  fontSize: 15,
};

// Bordered cards with a real gap, so a row with an odd number of stats
// doesn't leave a filled empty cell on narrow screens.
function Row({ children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(146px, 1fr))",
        gap: 10,
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  );
}

function Stat({ label, value, hint, big }) {
  return (
    <div
      style={{
        background: PLUM,
        border: `1px solid ${LINE}`,
        padding: "16px 16px 18px",
      }}
    >
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: BRASS,
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: big ? "clamp(26px, 6vw, 34px)" : "clamp(20px, 4.5vw, 24px)",
          lineHeight: 1.1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </div>
      {hint && <div style={{ fontSize: 11, color: MUTED, marginTop: 6 }}>{hint}</div>}
    </div>
  );
}

function Inline({ label, value }) {
  return (
    <div>
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: BRASS,
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 16 }}>{value}</div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section style={{ marginTop: 34 }}>
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 22,
          fontWeight: 500,
          marginBottom: 14,
          paddingBottom: 10,
          borderBottom: `1px solid ${LINE}`,
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
