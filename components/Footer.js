import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo-mark">Jovie &amp; Co</div>
            <p>Jewelry made to be passed down — crafted today, treasured for generations.</p>
            <p className="footer-contact">
              <a href="tel:+14703312618">(470) 331-2618</a>
              <a href="mailto:thejovieandco@gmail.com">thejovieandco@gmail.com</a>
            </p>
            <a
              href="https://www.instagram.com/thejovieandco"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
              aria-label="Jovie & Co on Instagram"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
              </svg>
              @thejovieandco
            </a>
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
              <li><Link href="/pages/our-story">Our Story</Link></li>
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
          <span>Crafted today. Treasured for generations.</span>
        </div>
      </div>
    </footer>
  );
}
