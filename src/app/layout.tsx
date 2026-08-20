import type { Metadata, Viewport } from "next";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";

export const viewport: Viewport = {
  themeColor: "#042419",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ene-kitchen.vercel.app"),
  title: {
    default: "Ene's Kitchen — Authentic Nigerian Cuisine, Lagos",
    template: "%s | Ene's Kitchen",
  },
  description: "Authentic, premium Nigerian cuisine for daily dining and special events. Same-day delivery across Lagos. Order jollof rice, pepper soup, grills and more.",
  keywords: ["Nigerian food", "food delivery Lagos", "jollof rice", "Nigerian cuisine", "catering Lagos", "authentic Nigerian food", "Ene's Kitchen"],
  authors: [{ name: "Ene's Kitchen" }],
  creator: "Ene's Kitchen",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ene's Kitchen",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon-32x32.png",
  },
  openGraph: {
    title: "Ene's Kitchen — Authentic Nigerian Cuisine, Lagos",
    description: "Authentic, premium Nigerian cuisine for daily dining and special events. Same-day delivery across Lagos.",
    url: "https://ene-kitchen.vercel.app",
    siteName: "Ene's Kitchen",
    locale: "en_NG",
    type: "website",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Ene's Kitchen — Authentic Nigerian Cuisine",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ene's Kitchen — Authentic Nigerian Cuisine, Lagos",
    description: "Authentic, premium Nigerian cuisine for daily dining and special events. Same-day delivery across Lagos.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-surface text-on-surface font-body">
        <CartProvider>
          {children}
        </CartProvider>
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
