import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "../components/CartProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EmailPopup from "../components/EmailPopup";
import { clerkEnabled, clerkPublishableKey } from "../lib/clerk";

export const metadata = {
  metadataBase: new URL("https://thejovieandco.com"),
  title: "Jovie & Co | Jewelry Made to Be Passed Down",
  description:
    "Crafted today, treasured for generations. Every Jovie & Co piece is designed to outlive the moment it marks — jewelry made to become a legacy.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Jovie & Co | Jewelry Made to Be Passed Down",
    description:
      "Crafted today, treasured for generations. Preorder the founding collection — eighteen pieces made to be kept.",
    url: "https://thejovieandco.com",
    siteName: "Jovie & Co",
    type: "website",
    images: [
      {
        url: "/products/twisted-marquise-ring.jpeg",
        width: 899,
        height: 900,
        alt: "The Twisted Marquise Ring from the Jovie & Co founding collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jovie & Co | Jewelry Made to Be Passed Down",
    description:
      "Crafted today, treasured for generations. Preorder the founding collection.",
    images: ["/products/twisted-marquise-ring.jpeg"],
  },
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
      <body>
        {clerkEnabled ? (
          <ClerkProvider publishableKey={clerkPublishableKey}>{content}</ClerkProvider>
        ) : (
          content
        )}
      </body>
    </html>
  );
}
