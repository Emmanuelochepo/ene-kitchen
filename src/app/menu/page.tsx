import type { Metadata } from "next";
import { HeadlineXl, BodyLg, LabelMd } from "@/components/ui/Typography";
import { MenuGrid } from "@/components/menu/MenuGrid";

export const metadata: Metadata = {
  title: "Menu | Ene's Kitchen",
  description: "Browse authentic Nigerian dishes from Ene's Kitchen, available for same-day delivery.",
};

export default function MenuPage() {
  return (
    <main className="flex-1">
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 pt-16 pb-10 md:pt-24 md:pb-12 text-center flex flex-col items-center gap-4">
        <LabelMd className="text-secondary">Our Menu</LabelMd>
        <HeadlineXl as="h1">Everything we cook, made fresh daily</HeadlineXl>
        <BodyLg className="max-w-xl">
          Browse by category or scroll through the full menu. Every dish is
          prepared to order and ready for same-day delivery across Lagos.
        </BodyLg>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 md:px-12 pb-16 md:pb-24">
        <MenuGrid />
      </section>
    </main>
  );
}
