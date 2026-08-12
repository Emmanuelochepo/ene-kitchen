import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HeadlineLg, BodyLg, BodyMd, LabelMd } from "@/components/ui/Typography";
import { CheckCircle2 } from "lucide-react";

const PROMISES = [
  "Every dish cooked from scratch daily",
  "No preservatives or shortcuts",
  "Sourced from local markets",
  "Packed and sealed for freshness",
];

export function BrandIntro() {
  return (
    <section className="bg-surface-container-low">
      <div className="max-w-[1200px] mx-auto px-5 md:px-12 py-14 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* Image side */}
          <div className="relative w-full max-w-sm mx-auto lg:max-w-none">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-overlay">
              <Image
                src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1200&q=85"
                alt="Fresh ingredients"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
            {/* Floating stat */}
            <div className="absolute bottom-4 left-4 right-4 bg-surface-container-lowest/95 backdrop-blur-sm rounded-xl p-4">
              <p className="font-display font-bold text-[28px] text-secondary leading-none">2015</p>
              <BodyMd className="text-on-surface text-[13px]">Cooking with passion since 2015 in the heart of Lagos.</BodyMd>
            </div>
          </div>

          {/* Text side */}
          <div className="flex flex-col gap-5 text-center lg:text-left items-center lg:items-start">
            <LabelMd className="text-secondary bg-secondary/10 px-4 py-1.5 rounded-full">
              Our Story
            </LabelMd>
            <HeadlineLg as="h2">
              A kitchen built on family recipes
            </HeadlineLg>
            <BodyLg>
              Ene&apos;s Kitchen started the way most good food does — at home,
              for people who mattered. What began as Sunday cooking for family
              became a reputation, a demand, and eventually, a calling.
            </BodyLg>
            <BodyLg>
              Every dish is still cooked with the same intention as that first
              meal. We believe premium doesn&apos;t mean unfamiliar — it means
              doing the familiar exceptionally well.
            </BodyLg>

            <div className="flex flex-col gap-2.5 w-full">
              {PROMISES.map((p) => (
                <div key={p} className="flex items-center gap-3">
                  <CheckCircle2 size={17} className="text-secondary shrink-0" />
                  <BodyMd className="text-on-surface text-[14px]">{p}</BodyMd>
                </div>
              ))}
            </div>

            <Link href="/about">
              <Button variant="secondary">Our Full Story</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
