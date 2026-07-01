import type { Metadata } from "next";
import Image from "next/image";
import { HeadlineXl, HeadlineLg, HeadlineMd, BodyLg, BodyMd, LabelMd } from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: "About | Ene's Kitchen",
  description: "The story behind Ene's Kitchen — premium Nigerian cuisine built on family recipes and uncompromising quality.",
};

const VALUES = [
  {
    title: "Authenticity",
    description:
      "Every recipe is rooted in tradition. We don't adapt our food to suit a trend — we cook the way it's always been done, with the time and patience it deserves.",
  },
  {
    title: "Quality Ingredients",
    description:
      "We source fresh, locally grown produce and premium meats. No shortcuts, no frozen shortcuts — every dish starts from scratch, every single day.",
  },
  {
    title: "Meticulous Preparation",
    description:
      "From slow-cooked stews to carefully grilled proteins, every dish is given the attention it needs. We believe the difference is always in the details.",
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 pt-16 pb-16 md:pt-24 md:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="flex flex-col gap-6 order-2 lg:order-1 text-center lg:text-left items-center lg:items-start">
          <LabelMd className="text-secondary">Our Story</LabelMd>
          <HeadlineXl as="h1">
            Built around a family table
          </HeadlineXl>
          <BodyLg>
            Ene&apos;s Kitchen started the way most good food does — not in a commercial kitchen,
            but at home, for people who mattered. What began as Sunday cooking for family
            gradually became something more: a reputation, a demand, and eventually, a calling.
          </BodyLg>
          <BodyLg>
            Today we prepare authentic Nigerian dishes for daily delivery and special occasions
            across Lagos. The kitchen has grown, but the approach hasn&apos;t changed — every
            dish is still cooked with the same intention as that first Sunday meal.
          </BodyLg>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-overlay w-full max-w-md mx-auto lg:max-w-none">
            <Image
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85"
              alt="Chef preparing Nigerian food in the kitchen"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface-container-low">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="text-center flex flex-col items-center gap-4 mb-12 md:mb-16">
            <LabelMd className="text-secondary">What We Stand For</LabelMd>
            <HeadlineLg as="h2">Three things we never compromise on</HeadlineLg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {VALUES.map((value) => (
              <div key={value.title} className="flex flex-col gap-4 text-center md:text-left items-center md:items-start">
                <div className="w-12 h-1 rounded-full bg-secondary" />
                <HeadlineMd as="h3">{value.title}</HeadlineMd>
                <BodyMd>{value.description}</BodyMd>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kitchen visual */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="relative aspect-[21/9] rounded-lg overflow-hidden shadow-raised w-full">
          <Image
            src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1600&q=85"
            alt="Fresh ingredients laid out in the kitchen"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
            <div className="text-center px-6">
              <HeadlineLg as="p" className="text-inverse-on-surface max-w-xl mx-auto">
                &ldquo;We cook the way it&apos;s always been done — with time, patience, and care.&rdquo;
              </HeadlineLg>
              <BodyMd className="text-inverse-on-surface/80 mt-3">— Ene, Founder</BodyMd>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
