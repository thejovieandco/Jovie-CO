import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo-mark">Jovie &amp; Co</div>
            <p>Timeless jewelry inspired by love, family, and the moments that matter most.</p>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              <li><Link href="/collections/rings">Rings</Link></li>
              <li><Link href="/collections/necklaces">Necklaces</Link></li>
              <li><Link href="/collections/earrings">Earrings</Link></li>
              <li><Link href="/collections/bracelets">Bracelets</Link></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/#story">Our Story</Link></li>
              <li><Link href="/pages/sustainability">Sustainability</Link></li>
              <li><Link href="/pages/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4>Customer Care</h4>
            <ul>
              <li><Link href="/pages/shipping-returns">Shipping &amp; Returns</Link></li>
              <li><Link href="/pages/ring-sizing">Ring Sizing</Link></li>
              <li><Link href="/pages/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Jovie &amp; Co. All rights reserved.</span>
          <span>Crafted with love, for love.</span>
        </div>
      </div>
    </footer>
  );
}
