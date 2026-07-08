import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { UtensilsCrossed, ShieldCheck, Heart, BadgeCheck, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeadlineXl, HeadlineLg, HeadlineMd, BodyLg, BodyMd, LabelMd } from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: "About | Ene's Kitchen",
  description: "The story behind Ene's Kitchen — premium Nigerian cuisine built on family recipes and uncompromising quality.",
};

const PILLARS = [
  {
    icon: BadgeCheck,
    title: "Authenticity",
    description: "We honor traditional recipes passed down through generations, ensuring every bite carries the soul of Nigerian culinary heritage.",
    featured: true,
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "From farm-fresh produce to premium cuts of meat, we never compromise on the quality of our ingredients.",
    featured: false,
  },
  {
    icon: Users,
    title: "Community",
    description: "Ene's Kitchen is a space for gathering. We believe that a great meal is the shortest distance between two strangers.",
    featured: false,
  },
];

const BADGES = [
  { icon: UtensilsCrossed, label: "Fresh ingredients" },
  { icon: ShieldCheck, label: "Cooked from scratch" },
  { icon: Heart, label: "Made with love" },
];

export default function AboutPage() {
  return (
    <main className="flex-1">

      {/* ── Hero ── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* Left — chef photo with overlay card */}
        <div className="relative w-full max-w-md mx-auto lg:max-w-none order-2 lg:order-1">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-overlay">
            <Image
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85"
              alt="Chef Ene in the kitchen"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </div>

          {/* Floating year card */}
          <div className="absolute bottom-6 left-4 right-12 md:right-auto md:left-auto md:-right-6 lg:-right-8 bg-surface-container-lowest rounded-lg shadow-overlay p-4 md:p-5 max-w-[220px]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                <UtensilsCrossed size={15} className="text-on-secondary-container" />
              </div>
              <HeadlineMd as="span" className="text-[18px] md:text-[20px]">2015</HeadlineMd>
            </div>
            <BodyMd className="text-[12px] md:text-[13px] leading-relaxed">
              Cooking with passion since 2015 in the heart of the city.
            </BodyMd>
          </div>
        </div>

        {/* Right — copy */}
        <div className="flex flex-col gap-5 order-1 lg:order-2 text-center lg:text-left items-center lg:items-start">
          <LabelMd className="text-secondary">Our Heritage</LabelMd>

          <HeadlineXl as="h1" className="max-w-sm lg:max-w-none">
            Crafting Memories Through Flavor.
          </HeadlineXl>

          {/* Blockquote */}
          <blockquote className="border-l-4 border-secondary pl-4 text-left">
            <BodyLg className="italic text-on-surface text-[14px] md:text-[16px] leading-relaxed">
              &ldquo;Food is the most primitive form of comfort. At Ene&apos;s Kitchen, we don&apos;t
              just serve meals; we share our home and our history.&rdquo;
            </BodyLg>
          </blockquote>

          <BodyMd className="text-left max-w-lg">
            Born from a lifelong obsession with the vibrant markets of Lagos and the aromatic
            kitchens of my childhood, Ene&apos;s Kitchen began as a private supper club for
            friends who craved more than just &ldquo;dining out.&rdquo;
          </BodyMd>

          <BodyMd className="text-left max-w-lg">
            Today, we maintain that same intimacy. Every spice is hand-selected, every sauce
            is reduced for hours, and every plate tells a story of tradition reimagined for
            the discerning modern host.
          </BodyMd>

          {/* Badge pills */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {BADGES.map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-2 border border-outline-variant rounded-full px-4 py-2">
                <Icon size={14} className="text-secondary shrink-0" />
                <BodyMd as="span" className="text-on-surface text-[13px] font-medium">{label}</BodyMd>
              </span>
            ))}
          </div>

          <Link href="/menu">
            <Button variant="primary">Explore Our Menu</Button>
          </Link>
        </div>
      </section>

      {/* ── Pillars ── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 pb-16 md:pb-24">
        <HeadlineLg as="h2" className="text-center mb-10 md:mb-12">
          The Pillars of Our Kitchen
        </HeadlineLg>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map(({ icon: Icon, title, description, featured }) => (
            <div
              key={title}
              className={`rounded-lg p-7 md:p-8 flex flex-col gap-4 ${
                featured
                  ? "bg-primary text-inverse-on-surface"
                  : "bg-surface-container-lowest shadow-raised"
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                featured ? "bg-inverse-on-surface/10" : "bg-primary-fixed"
              }`}>
                <Icon size={20} className={featured ? "text-inverse-on-surface" : "text-primary"} />
              </div>
              <HeadlineMd
                as="h3"
                className={`text-[18px] md:text-[20px] ${featured ? "text-inverse-on-surface" : ""}`}
              >
                {title}
              </HeadlineMd>
              <BodyMd className={featured ? "text-inverse-on-surface/80" : ""}>
                {description}
              </BodyMd>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
