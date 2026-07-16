import "./globals.css";
import { CartProvider } from "../components/CartProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Jovie & Co | Timeless Jewelry, Crafted to Last",
  description:
    "Inspired by love and designed to celebrate life's most meaningful moments. Every piece is crafted to be treasured for generations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
