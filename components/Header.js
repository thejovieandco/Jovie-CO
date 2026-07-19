"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import { PREORDER, PREORDER_SHIP_DATE } from "../lib/products";

export default function Header() {
  const { count } = useCart();

  return (
    <>
      <div className="announce">
        {PREORDER
          ? <>Preorder the Founding Collection &nbsp;·&nbsp; Ships {PREORDER_SHIP_DATE} &nbsp;·&nbsp; Free US Shipping Over $50</>
          : <>The Founding Collection Is Here &nbsp;·&nbsp; Free US Shipping on Orders Over $50</>}
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
