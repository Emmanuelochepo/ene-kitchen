import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";
import { ClosedBanner } from "@/components/layout/ClosedBanner";
import { CookieConsent } from "@/components/ui/CookieConsent";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <ClosedBanner />
      <Header />
      <div className="flex-1 flex flex-col">{children}</div>
      <Footer />
      <WhatsAppWidget />
      <CookieConsent />
    </>
  );
}
