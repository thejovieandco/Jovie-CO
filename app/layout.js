import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "../components/CartProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EmailPopup from "../components/EmailPopup";

const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export const metadata = {
  title: "Jovie & Co | Jewelry Made to Be Passed Down",
  description:
    "Crafted today, treasured for generations. Every Jovie & Co piece is designed to outlive the moment it marks — jewelry made to become a legacy.",
};

export default function RootLayout({ children }) {
  const content = (
    <CartProvider>
      <Header />
      {children}
      <Footer />
      <EmailPopup />
    </CartProvider>
  );

  return (
    <html lang="en">
      <body>{clerkEnabled ? <ClerkProvider>{content}</ClerkProvider> : content}</body>
    </html>
  );
}
