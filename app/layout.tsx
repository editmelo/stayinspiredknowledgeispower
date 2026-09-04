import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Instrument_Sans } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CartProvider from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";
import { org } from "@/lib/content";
import { getSquareConfig } from "@/lib/square";
import "./globals.css";

/* Bodoni carries the fashion side of the brand; Instrument Sans does the reading. */
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Stay Inspired Knowledge Is Power — Break the stigma out loud",
    template: "%s · Stay Inspired Knowledge Is Power",
  },
  description:
    "Founded by Miriam D. Rivera. Mental health and substance use awareness through art, fashion and speaking — funding the William Rivera Memorial Scholarship Fund.",
  keywords: [
    "mental health awareness",
    "substance use resources",
    "break the stigma",
    "William Rivera Memorial Scholarship",
    "Miriam D. Rivera speaker",
    "Indiana mental health",
  ],
  openGraph: {
    title: "Stay Inspired Knowledge Is Power",
    description:
      "Art, fashion and lived experience that break the stigma around mental illness and addiction — and fund a scholarship for students who grew up in it.",
    siteName: org.name,
    type: "website",
    locale: "en_US",
  },
};

/* Matches --color-ink, so mobile browser chrome sits flush with the page. */
export const viewport: Viewport = {
  themeColor: "#121013",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  /* Read once on the server: the cart only appears when it can actually sell. */
  const squareReady = getSquareConfig() !== null;

  return (
    <html lang="en" className={`${bodoni.variable} ${instrument.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <CartProvider enabled={squareReady}>
          <a href="#main" className="skip">
            Skip to content
          </a>
          <Nav />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
