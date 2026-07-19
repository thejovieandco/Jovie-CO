import "./globals.css";
import { CartProvider } from "../components/CartProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Jovie & Co | Jewelry Made to Be Passed Down",
  description:
    "Crafted today, treasured for generations. Every Jovie & Co piece is designed to outlive the moment it marks — jewelry made to become a legacy.",
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
