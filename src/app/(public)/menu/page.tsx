import { Suspense } from "react";
import type { Metadata } from "next";
import { HeadlineXl, BodyLg, LabelMd } from "@/components/ui/Typography";
import { MenuGrid } from "@/components/menu/MenuGrid";

export const metadata: Metadata = {
  title: "Menu",
  description: "Browse authentic Nigerian dishes from Ene's Kitchen — jollof rice, pepper soup, grills and more. Same-day delivery across Lagos.",
};

export default function MenuPage() {
  return (
    <main className="flex-1">
      <section className="max-w-[1200px] mx-auto px-5 md:px-12 pt-12 pb-8 md:pt-20 md:pb-10 text-center flex flex-col items-center gap-3">
        <LabelMd className="text-secondary">Our Menu</LabelMd>
        <HeadlineXl as="h1">Everything we cook, made fresh daily</HeadlineXl>
        <BodyLg className="max-w-xl">
          Browse by category or search for your favourite dish. Every item is
          prepared to order and ready for same-day delivery across Lagos.
        </BodyLg>
      </section>
      <section className="max-w-[1200px] mx-auto px-5 md:px-12 pb-16 md:pb-24">
        <Suspense fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-surface-container-lowest rounded-lg overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-surface-container-high" />
                <div className="p-5 flex flex-col gap-3">
                  <div className="h-4 bg-surface-container-high rounded w-3/4" />
                  <div className="h-3 bg-surface-container-high rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        }>
          <MenuGrid />
        </Suspense>
      </section>
    </main>
  );
}
