"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { PREORDER, PREORDER_SHIP_DATE } from "../lib/products";

const MENU_LINKS = [
  { href: "/collections/rings", label: "Rings" },
  { href: "/collections/necklaces", label: "Necklaces" },
  { href: "/collections/earrings", label: "Earrings" },
  { href: "/collections/bracelets", label: "Bracelets" },
  { href: "/pages/our-story", label: "Our Story" },
  { href: "/pages/ring-sizing", label: "Ring Sizing" },
  { href: "/pages/contact", label: "Contact" },
  { href: "/cart", label: "Cart" },
];

export default function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  // Lock page scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="announce">
        {PREORDER
          ? <>Preorder the Founding Collection &nbsp;·&nbsp; Ships {PREORDER_SHIP_DATE} &nbsp;·&nbsp; Free US Shipping Over $50</>
          : <>The Founding Collection Is Here &nbsp;·&nbsp; Free US Shipping on Orders Over $50</>}
      </div>
      <header>
        <div className="nav-wrap">
          <div className="nav-side">
            <button
              className={`hamburger${open ? " is-open" : ""}`}
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <div className="nav-left">
              <Link href="/collections/rings">Rings</Link>
              <Link href="/collections/necklaces">Necklaces</Link>
              <Link href="/collections/earrings">Earrings</Link>
            </div>
          </div>
          <Link href="/" className="logo-mark">
            Jovie &amp; Co
            <small>Jewelry</small>
          </Link>
          <div className="nav-right">
            <Link href="/#reviews">Reviews</Link>
            <Link href="/cart" className="cart-link">
              Cart{count > 0 ? ` (${count})` : ""}
            </Link>
          </div>
        </div>
      </header>

      <div
        className={`drawer-backdrop${open ? " is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <nav className={`drawer${open ? " is-open" : ""}`} aria-label="Main menu">
        <div className="drawer-head">
          <span className="drawer-brand">Jovie &amp; Co</span>
        </div>
        <ul>
          {MENU_LINKS.map((link, i) => (
            <li key={link.href} style={{ transitionDelay: open ? `${80 + i * 40}ms` : "0ms" }}>
              <Link href={link.href} onClick={() => setOpen(false)}>
                {link.label}
                {link.href === "/cart" && count > 0 ? ` (${count})` : ""}
              </Link>
            </li>
          ))}
        </ul>
        <div className="drawer-foot">Crafted today. Treasured for generations.</div>
      </nav>
    </>
  );
}
