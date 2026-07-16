"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function Header() {
  const { count } = useCart();

  return (
    <>
      <div className="announce">
        New Collection Coming Soon &nbsp;·&nbsp; Join the List Below to Be First to Know
      </div>
      <header>
        <div className="nav-wrap">
          <div className="nav-left">
            <Link href="/collections/rings">Rings</Link>
            <Link href="/collections/necklaces">Necklaces</Link>
            <Link href="/collections/earrings">Earrings</Link>
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
    </>
  );
}
