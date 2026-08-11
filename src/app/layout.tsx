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
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Ene's Kitchen",
    template: "%s | Ene's Kitchen",
  },
  description: "Authentic, premium Nigerian cuisine for daily dining and special events. Same-day delivery across Lagos.",
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
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon-32x32.png",
  },
  openGraph: {
    title: "Ene's Kitchen",
    description: "Authentic, premium Nigerian cuisine for daily dining and special events.",
    type: "website",
    locale: "en_NG",
    siteName: "Ene's Kitchen",
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
