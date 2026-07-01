import type { Metadata } from "next";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";

export const metadata: Metadata = {
  title: "Ene's Kitchen",
  description: "Authentic, premium Nigerian cuisine for daily dining and special events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-surface text-on-surface font-body">
        <AnnouncementBar />
        <Header />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
